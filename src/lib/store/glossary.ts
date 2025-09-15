import { create } from 'zustand';
import { GlossaryTerm } from '../db/schema';

interface GlossaryState {
  terms: GlossaryTerm[];
  searchTerm: string;
  selectedCategory: string;
  selectedLetter: string | null;
  setTerms: (terms: GlossaryTerm[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedLetter: (letter: string | null) => void;
  clearSearch: () => void;
  filteredTerms: () => GlossaryTerm[];
}

export const useGlossaryStore = create<GlossaryState>((set, get) => ({
  terms: [],
  searchTerm: '',
  selectedCategory: 'all',
  selectedLetter: null,
  setTerms: (terms) => set({ terms }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedLetter: (selectedLetter) => set({ selectedLetter }),
  clearSearch: () => set({ searchTerm: '' }),
  filteredTerms: () => {
    const { terms, searchTerm, selectedCategory, selectedLetter } = get();
    return terms
      .filter((term) => {
        const matchesLetter =
          !selectedLetter || term.term.charAt(0).toUpperCase() === selectedLetter;
        const matchesSearch =
          !searchTerm ||
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === 'all' || term.category === selectedCategory;
        return matchesLetter && matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  },
}));
