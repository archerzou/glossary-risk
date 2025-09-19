export type Term = {
  id: string;
  term: string;
  definition: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = { id: string; name: string };
