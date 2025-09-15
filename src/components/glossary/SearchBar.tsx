"use client";

import { useGlossaryStore } from "@/lib/store/glossary";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";

export function SearchBar() {
  const { searchTerm, setSearchTerm, clearSearch, clearSelectedLetter } = useGlossaryStore();

  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        {searchTerm ? (
          <Button
            variant="outline"
            size="icon"
            aria-label="Clear search"
            onClick={() => {
              clearSearch();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        ) : null}
        <Button
          variant="secondary"
          onClick={() => {
            clearSelectedLetter();
          }}
          aria-label="Show all results"
        >
          Show All
        </Button>
      </div>
    </div>
  );
}
