"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/auth";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).max(128);
const nameSchema = z.string().min(1).max(100);

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
});

export async function signUp(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const parsed = signUpSchema.safeParse(rawData);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return { ok: false, error: first?.message || "Invalid sign-up data" };
    }
    const data = parsed.data;

    const res = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      headers: await headers(),
    });

    return { ok: true, userId: res.user?.id };
  } catch {
    return { ok: false, error: "Failed to create user" };
  }
}

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export async function signIn(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const parsed = signInSchema.safeParse(rawData);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return { ok: false, error: first?.message || "Invalid credentials" };
    }
    const data = parsed.data;

    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      headers: await headers(),
    });

    return { ok: true, userId: res.user?.id };
  } catch {
    return { ok: false, error: "Invalid email or password" };
  }
}

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user ?? null;
  } catch {
    return null;
  }
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  return { ok: true };
}
