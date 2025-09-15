'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GlossaryTerm } from '@/lib/db/schema';
import { useGlossaryStore } from '@/lib/store/glossary';

interface GlossaryListProps {
  initialTerms: GlossaryTerm[];
}

export function GlossaryList({ initialTerms }: GlossaryListProps) {
  const {
    searchTerm,
    selectedCategory,
    setTerms,
    setSearchTerm,
    setSelectedCategory,
    filteredTerms,
  } = useGlossaryStore();

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
  }, [filteredTerms]);

  const categories = Array.from(new Set(initialTerms.map(term => term.category)));

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search terms or definitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Terms List */}
      <div className="space-y-8">
        {Object.keys(groupedTerms)
          .sort()
          .map((letter) => (
            <div key={letter} className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">
                {letter}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupedTerms[letter].map((term) => (
                  <Card key={term.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-blue-700">
                        {term.term}
                      </CardTitle>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full w-fit">
                        {term.category}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {term.definition}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>

      {Object.keys(groupedTerms).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No terms found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}