'use client';

import { useEffect, useState } from 'react';
import { GlossaryTerm } from '@/lib/db/schema';
import { useGlossaryStore } from '@/lib/store/glossary';
import { TermCard } from './glossary/term-card';

interface GlossaryListProps {
  initialTerms: GlossaryTerm[];
}

export function GlossaryList({ initialTerms }: GlossaryListProps) {
  const { setTerms, filteredTerms } = useGlossaryStore();
  const { searchTerm, selectedLetter } = useGlossaryStore();

  const [groupedTerms, setGroupedTerms] = useState<Record<string, GlossaryTerm[]>>({});

  useEffect(() => {
    setTerms(initialTerms);
  }, [initialTerms, setTerms]);

  useEffect(() => {
    const filtered = filteredTerms();
    const grouped = filtered.reduce((acc, term) => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(term);
      return acc;
    }, {} as Record<string, GlossaryTerm[]>);
    setGroupedTerms(grouped);
  }, [filteredTerms, searchTerm, selectedLetter]);

  return (
    <div className="space-y-8">
      {Object.keys(groupedTerms)
        .sort()
        .map((letter) => (
          <section key={letter} id={`letter-${letter}`} className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-bold border-b pb-2">{letter}</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {groupedTerms[letter].map((term) => (
                <TermCard
                  key={term.id}
                  term={term.term}
                  definition={term.definition}
                />
              ))}
            </div>
          </section>
        ))}

      {Object.keys(groupedTerms).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No terms found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
