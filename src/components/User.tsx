"use client";

import Link from "next/link";
import { FiUser } from "react-icons/fi";

type User = { id: string; name?: string | null; email?: string | null } | null;

export default function User({
  user,
  signOutAction,
}: {
  user: User;
  signOutAction?: (fd: FormData) => void | Promise<void>;
}) {
  const displayName = user?.name ?? user?.email ?? "User";
  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          Glossary
        </Link>
        <div className="flex items-center gap-3">
          {!user ? (
            <Link href="/sign-in" className="text-sm underline underline-offset-4">
              LogIn
            </Link>
          ) : (
            <details className="relative">
              <summary className="list-none cursor-pointer inline-flex items-center gap-2 px-3 h-9 rounded-full border bg-secondary text-secondary-foreground">
                <FiUser className="h-4 w-4" />
                <span className="hidden sm:inline max-w-48 truncate">{displayName}</span>
              </summary>
              <div className="absolute right-0 mt-2 min-w-40 rounded-md border bg-popover text-popover-foreground shadow-md z-50">
                <div className="px-3 py-2 text-sm text-muted-foreground truncate max-w-64">{displayName}</div>
                <div className="border-t" />
                <form action={signOutAction} className="p-1">
                  <button
                    type="submit"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </details>
          )}
        </div>
      </div>
    </header>
  );
}
