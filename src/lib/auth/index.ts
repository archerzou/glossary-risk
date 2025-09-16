'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
import { hash, compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { account, session, user } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { AUTH_COOKIE_NAME } from './constants';

async function getCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;

  const [sess] = await db
    .select()
    .from(session)
    .where(eq(session.token, token))
    .limit(1);

  if (!sess) return null;
  if (sess.expiresAt && sess.expiresAt < new Date()) {
    await db.delete(session).where(eq(session.id, sess.id));
    cookieStore.delete(AUTH_COOKIE_NAME);
    return null;
  }
  return sess;
}

export async function getCurrentUser() {
  const sess = await getCurrentSession();
  if (!sess) return null;

  const [u] = await db.select().from(user).where(eq(user.id, sess.userId)).limit(1);
  if (!u) return null;

  return { id: u.id, email: u.email, name: u.name ?? null };
}

async function createSession(userId: string, ttlMs: number, userAgent?: string | null, ipAddress?: string | null) {
  const token = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + ttlMs);

  await db.insert(session).values({
    userId,
    token,
    userAgent: userAgent ?? undefined,
    ipAddress: ipAddress ?? undefined,
    expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    expires: expiresAt,
  });

  return token;
}

async function destroySession(token: string) {
  const cookieStore = await cookies();
  await db.delete(session).where(eq(session.token, token));
  cookieStore.delete(AUTH_COOKIE_NAME);
}

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
