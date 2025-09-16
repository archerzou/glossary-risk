'use server';

import { z } from 'zod';
import { hash, compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { account, user } from '@/lib/db/schema';
import { createSession, destroySession, getCurrentSession } from './index';
import { and, eq } from 'drizzle-orm';

const signUpSchema = z.object({
  name: z.string().trim().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(input: z.infer<typeof signUpSchema>) {
  const data = signUpSchema.parse(input);

  const existing = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.email, data.email),
  });
  if (existing) {
    throw new Error('Email is already in use');
  }

  const passwordHash = await hash(data.password, 12);

  const [createdUser] = await db
    .insert(user)
    .values({
      email: data.email,
      name: data.name,
    })
    .returning();

  await db.insert(account).values({
    userId: createdUser.id,
    accountId: data.email,
    password: passwordHash,
  });

  await createSession(createdUser.id, 1000 * 60 * 60 * 24 * 30);

  return { ok: true, userId: createdUser.id };
}

export async function signIn(input: z.infer<typeof signInSchema>) {
  const data = signInSchema.parse(input);

  const [u] = await db.select().from(user).where(eq(user.email, data.email)).limit(1);
  if (!u) {
    throw new Error('Invalid email or password');
  }

  const [acc] = await db
    .select()
    .from(account)
    .where(and(eq(account.userId, u.id), eq(account.accountId, data.email)))
    .limit(1);

  if (!acc || !acc.password) {
    throw new Error('Invalid email or password');
  }

  const valid = await compare(data.password, acc.password);
  if (!valid) {
    throw new Error('Invalid email or password');
  }

  await createSession(u.id, 1000 * 60 * 60 * 24 * 30);

  return { ok: true, userId: u.id };
}

export async function signOut() {
  const sess = await getCurrentSession();
  if (!sess) return { ok: true };

  await destroySession(sess.token);
  return { ok: true };
}
