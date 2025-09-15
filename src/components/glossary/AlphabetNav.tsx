"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlossaryStore } from "@/lib/store/glossary";

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export function AlphabetNav() {
  const { setSelectedLetter, selectedLetter, clearSearch } = useGlossaryStore();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop);
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).id;
          const letter = id.replace("letter-", "");
          setActive(letter);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    LETTERS.forEach((l) => {
      const el = document.getElementById(`letter-${l}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedLetter === null) return;
    setActive(selectedLetter);
  }, [selectedLetter]);

  return (
    <div className="rounded-lg border p-2 bg-card overflow-x-auto">
      <div className="flex items-center gap-1 min-w-[640px] md:min-w-0">
        {LETTERS.map((l) => {
          const isActive = active === l || selectedLetter === l;
          return (
            <Button
              key={l}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              className={isActive ? "" : "text-muted-foreground"}
              onClick={() => {
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
