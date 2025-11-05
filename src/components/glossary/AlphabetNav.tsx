"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useGlossaryStore } from "@/lib/store/glossary";
import type { Term } from "@/lib/db/schema";

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export function AlphabetNav() {
  const { setSelectedLetter, selectedLetter, clearSearch, clearSelectedLetter } = useGlossaryStore();
  const { terms, searchTerm, selectedCategoryId } = useGlossaryStore();

  const availability = useMemo(() => {
    const counts: Record<string, number> = {};
    LETTERS.forEach((l) => (counts[l] = 0));
    const filteredBySearchAndCategory = (terms as Term[]).filter((t: Term) => {
      const matchesSearch = !searchTerm || 
        t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategoryId || t.categoryId === selectedCategoryId;
      return matchesSearch && matchesCategory;
    });
    filteredBySearchAndCategory.forEach((t: Term) => {
      const l = t.term.charAt(0).toUpperCase();
      if (counts[l] !== undefined) counts[l] += 1;
    });
    return counts;
  }, [terms, searchTerm, selectedCategoryId]);

  return (
    <div className="rounded-lg border p-2 bg-card overflow-x-auto">
      <div className="flex items-center gap-1 min-w-[640px] md:min-w-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            clearSelectedLetter();
          }}
          aria-label="Show all results"
          className="mr-1"
        >
          All
        </Button>
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
