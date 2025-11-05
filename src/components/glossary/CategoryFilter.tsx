"use client";

import { useEffect, useState, useMemo } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlossaryStore } from "@/lib/store/glossary";
import { getCategories } from "@/lib/actions/categories";
import type { Category, Term } from "@/lib/db/schema";

export function CategoryFilter() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setSelectedCategoryId, selectedCategoryId, clearSelectedCategory } = useGlossaryStore();
  const { terms, searchTerm, selectedLetter } = useGlossaryStore();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  const availability = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach((c) => (counts[c.id] = 0));
    
    const filteredByOtherFilters = (terms as Term[]).filter((t: Term) => {
      const matchesSearch = !searchTerm || 
        t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLetter = !selectedLetter || 
        t.term.charAt(0).toUpperCase() === selectedLetter;
      return matchesSearch && matchesLetter;
    });
    
    filteredByOtherFilters.forEach((t: Term) => {
      if (counts[t.categoryId] !== undefined) {
        counts[t.categoryId] += 1;
      }
    });
    
    return counts;
  }, [terms, searchTerm, selectedLetter, categories]);

  return (
    <div className="rounded-lg border p-4 bg-card">
      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <Button
          variant={selectedCategoryId === null ? "default" : "outline"}
          size="default"
          onClick={() => {
            clearSelectedCategory();
          }}
          aria-label="Show all categories"
          className="transition-all hover:scale-105"
        >
          All Categories
        </Button>
        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;
          const disabled = availability[category.id] === 0;
          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "outline"}
              size="default"
              className={
                disabled
                  ? "text-muted-foreground opacity-50 cursor-not-allowed"
                  : "transition-all hover:scale-105"
              }
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                setSelectedCategoryId(category.id);
              }}
              aria-label={`Filter by ${category.name}`}
            >
              {category.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
