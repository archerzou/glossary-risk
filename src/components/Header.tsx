"use client";

import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";

export function Header() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("demo-signed-in") : null;
    if (saved) setSignedIn(saved === "1");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("demo-signed-in", signedIn ? "1" : "0");
    }
  }, [signedIn]);

  return (
    <header className="w-full border-b bg-background">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold tracking-tight">
          Glossary
        </Link>
        <div className="flex items-center gap-3">
          {!signedIn ? (
            <Link href="/sign-in" className="text-sm underline underline-offset-4">
              LogIn
            </Link>
          ) : (
            <button
              aria-label="User menu"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border bg-secondary text-secondary-foreground"
            >
              <FiUser className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            aria-label="Toggle sign-in state for demo"
            className="hidden"
            onClick={() => setSignedIn((s) => !s)}
          />
        </div>
      </div>
    </header>
  );
}
