export type Term = {
  id: string;
  term: string;
  definition: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = { id: string; name: string };

export const CATEGORIES: Category[] = [
  { id: "1", name: "Basic concept" },
  { id: "2", name: "Process" },
  { id: "3", name: "Metric" },
];
