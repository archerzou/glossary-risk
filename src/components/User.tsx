"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className="w-full relative h-64">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-sra-bg.jpg"
          alt="SRA Background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 bg-white/40 backdrop-blur-sm h-full">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/logo.svg"
                alt="SRA Logo"
                width={60}
                height={60}
                className="h-12 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link href="/" className="text-2xl font-bold tracking-tight" style={{ color: 'var(--sra-primary-red)' }}>
              RISK ANALYSIS GLOSSARY
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {!user ? (
              <Link href="/sign-in" className="text-base font-semibold uppercase tracking-wide" style={{ color: 'var(--sra-dark-red)' }}>
                LOGIN
              </Link>
            ) : (
              <>
                <Link
                  href="/create-term"
                  className="inline-flex items-center rounded-md bg-primary px-3 h-9 text-primary-foreground text-sm hover:opacity-90"
                >
                  Create Term
                </Link>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
