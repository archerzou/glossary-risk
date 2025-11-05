import { create } from 'zustand';
import { Term } from '../db/schema';

interface GlossaryState {
  terms: Term[];
  searchTerm: string;
  selectedLetter: string | null;
  selectedCategoryId: string | null;
  setTerms: (terms: Term[]) => void;
  setSearchTerm: (term: string) => void;
  setSelectedLetter: (letter: string | null) => void;
  setSelectedCategoryId: (categoryId: string | null) => void;
  clearSearch: () => void;
  clearSelectedLetter: () => void;
  clearSelectedCategory: () => void;
  filteredTerms: () => Term[];
}

export const useGlossaryStore = create<GlossaryState>((set, get) => ({
  terms: [],
  searchTerm: '',
  selectedLetter: null,
  selectedCategoryId: null,
  setTerms: (terms) => set({ terms }),
  setSearchTerm: (searchTerm) =>
    set((state) => ({
      searchTerm,
      selectedLetter: searchTerm ? null : state.selectedLetter,
    })),
  setSelectedLetter: (selectedLetter) => set({ selectedLetter }),
  setSelectedCategoryId: (selectedCategoryId) => set({ selectedCategoryId }),
  clearSearch: () => set({ searchTerm: '' }),
  clearSelectedLetter: () => set({ selectedLetter: null }),
  clearSelectedCategory: () => set({ selectedCategoryId: null }),
  filteredTerms: () => {
    const { terms, searchTerm, selectedLetter, selectedCategoryId } = get();
    return terms
      .filter((term) => {
        const matchesCategory =
          !selectedCategoryId || term.categoryId === selectedCategoryId;
        const matchesLetter =
          !selectedLetter || term.term.charAt(0).toUpperCase() === selectedLetter;
        const matchesSearch =
          !searchTerm ||
          term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesLetter && matchesSearch;
      })
      .sort((a, b) => a.term.localeCompare(b.term));
  },
}));
