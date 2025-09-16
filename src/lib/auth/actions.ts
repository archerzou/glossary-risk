'use server';

import { z } from 'zod';
import { hash, compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { account, user } from '@/lib/db/schema';
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

export async function signUp(formData: FormData) {
  const raw = {
    name: formData.get('name') as string | undefined,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  const data = signUpSchema.parse(raw);

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

  return { ok: true, userId: createdUser.id };
}

export async function signIn(formData: FormData) {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  const data = signInSchema.parse(raw);

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

  return { ok: true, userId: u.id };
}

export async function signOut() {
  return { ok: true };
}
