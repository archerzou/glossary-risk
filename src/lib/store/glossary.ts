import { create } from 'zustand';
import { GlossaryTerm } from '../db/schema';

interface GlossaryState {
  terms: GlossaryTerm[];
  searchTerm: string;
  selectedCategory: string;
  setTerms: (terms: GlossaryTerm[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  filteredTerms: () => GlossaryTerm[];
}

export const useGlossaryStore = create<GlossaryState>((set, get) => ({
  terms: [],
  searchTerm: '',
  selectedCategory: 'all',
  setTerms: (terms) => set({ terms }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  filteredTerms: () => {
    const { terms, searchTerm, selectedCategory } = get();
    return terms
      .filter((term) => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  },
}));