'use server';

import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { account, session, user } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

const AUTH_COOKIE_NAME = 'auth_session';

export async function getCurrentSession() {
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

export async function createSession(userId: string, ttlMs: number, userAgent?: string | null, ipAddress?: string | null) {
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

export async function destroySession(token: string) {
  const cookieStore = await cookies();
  await db.delete(session).where(eq(session.token, token));
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function getAccountByEmail(email: string) {
  const [u] = await db.select().from(user).where(eq(user.email, email)).limit(1);
  if (!u) return null;

  const [acc] = await db
    .select()
    .from(account)
    .where(and(eq(account.userId, u.id), eq(account.accountId, email)))
    .limit(1);

  if (!acc) return null;

  return { user: u, account: acc };
}

export { AUTH_COOKIE_NAME };
