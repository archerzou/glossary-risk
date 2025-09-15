"use client";

import { BookText } from "lucide-react";

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-secondary text-secondary-foreground p-2">
          <BookText className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
          <p className="text-muted-foreground mt-1 max-w-3xl">
            A curated vocabulary of digital marketing concepts across Content Marketing,
            SEO, and Artificial Intelligence. Search by keyword, filter by category, or
            browse alphabetically.
          </p>
        </div>
      </div>
      <div className="h-px bg-border mt-6" />
    </header>
  );
}
