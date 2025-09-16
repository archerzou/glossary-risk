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

    const data = signUpSchema.parse(rawData);

    const res = await auth.api.signUpEmail({
      body: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    return { ok: true, userId: res.user?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create user";
    return { ok: false, error: message as string };
  }
}

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export async function signIn(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const data = signInSchema.parse(rawData);

  const res = await auth.api.signInEmail({
    body: {
      email: data.email,
      password: data.password,
    },
  });

  return { ok: true, userId: res.user?.id };
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
  await auth.api.signOut({ headers: {} });
  return { ok: true };
}
