"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";
type FormValues = { name?: string; email: string; password: string };

export function AuthForm({ mode = "signin", className }: { mode?: Mode; className?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(mode, data);
  };

  const title = mode === "signin" ? "Sign In" : "Sign Up";
  const submitLabel = mode === "signin" ? "Sign In" : "Register";
  const switchText =
    mode === "signin" ? (
      <>
        need to create an account?{" "}
        <Link className="underline underline-offset-4" href="/sign-up">
          Sign up.
        </Link>
      </>
    ) : (
      <>
        already have an account?{" "}
        <Link className="underline underline-offset-4" href="/sign-in">
          Sign in.
        </Link>
      </>
    );

  return (
    <Card className={cn("shadow-[0_10px_25px_-10px_rgba(0,0,0,0.15)]", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" type="text" placeholder="Your name" aria-invalid={!!errors.name || undefined} {...register("name")} />
            </div>
          )}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email || undefined}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="••••••••"
              aria-invalid={!!errors.password || undefined}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {submitLabel}
          </Button>
          <p className="text-sm text-muted-foreground">{switchText}</p>
        </form>
      </CardContent>
    </Card>
  );
}
