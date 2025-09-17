"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useGlossaryStore } from "@/lib/store/glossary";
import type { Term } from "@/lib/db/schema";

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export function AlphabetNav() {
  const { setSelectedLetter, selectedLetter, clearSearch } = useGlossaryStore();
  const { terms, searchTerm } = useGlossaryStore();

  const availability = useMemo(() => {
    const counts: Record<string, number> = {};
    LETTERS.forEach((l) => (counts[l] = 0));
    const filteredBySearch = (terms as Term[]).filter((t: Term) => {
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q)
      );
    });
    filteredBySearch.forEach((t: Term) => {
      const l = t.term.charAt(0).toUpperCase();
      if (counts[l] !== undefined) counts[l] += 1;
    });
    return counts;
  }, [terms, searchTerm]);

  return (
    <div className="rounded-lg border p-2 bg-card overflow-x-auto">
      <div className="flex items-center gap-1 min-w-[640px] md:min-w-0">
        {LETTERS.map((l) => {
          const isActive = selectedLetter === l;
          const disabled = availability[l] === 0;
          return (
            <Button
              key={l}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={
                disabled
                  ? "text-muted-foreground opacity-50 cursor-not-allowed"
                  : isActive
                  ? ""
                  : "text-blue-600"
              }
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                clearSearch();
                setSelectedLetter(l);
                const el = document.getElementById(`letter-${l}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {l}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
