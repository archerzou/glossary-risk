"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mode = "sign-in" | "sign-up";
type FormValues = { name?: string; email: string; password: string };

export default function AuthForm({
  mode = "sign-in",
  className,
  onSubmitAction,
}: {
  mode?: Mode;
  className?: string;
  onSubmitAction?: (formData: FormData) => Promise<{ ok?: boolean; error?: string } | undefined | null>;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const handle = async (data: FormValues) => {
    if (!onSubmitAction) return;
    setServerError(null);
    const fd = new FormData();
    if (mode === "sign-up" && data.name) fd.append("name", data.name);
    fd.append("email", data.email);
    fd.append("password", data.password);

    const result = await onSubmitAction(fd);
    if (result?.ok) {
      router.push("/");
    } else if (result && "error" in result && result.error) {
      setServerError(result.error);
    }
  };

  const title = mode === "sign-in" ? "Sign In" : "Sign Up";
  const submitLabel = mode === "sign-in" ? "Sign In" : "Register";
  const switchText =
    mode === "sign-in" ? (
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
        <form onSubmit={handleSubmit(handle)} className="space-y-4">
          {mode === "sign-up" && (
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                aria-invalid={!!errors.name || undefined}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
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
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              placeholder="••••••••"
              aria-invalid={!!errors.password || undefined}
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Min 8 characters" },
              })}
            />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {submitLabel}
          </Button>
          {serverError && (
            <p className="text-sm text-destructive" role="alert">
              {serverError}
            </p>
          )}
          <p className="text-sm text-muted-foreground">{switchText}</p>
        </form>
      </CardContent>
    </Card>
  );
}
