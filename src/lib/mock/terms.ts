import type { Term } from "@/lib/types/term";

export const mockTerms: Term[] = [
  {
    id: "1",
    term: "Risk",
    categoryId: "1",
    definition: "<p>Definition of Risk – this is a demo definition</p>",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    term: "Exposure",
    categoryId: "3",
    definition: "<p>Potential financial loss or negative outcome</p>",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function getTermById(id: string) {
  return mockTerms.find((t) => t.id === id) || null;
}

export function upsertTerm(input: {
  id: string;
  term: string;
  definition: string;
  categoryId: string;
}) {
  const idx = mockTerms.findIndex((t) => t.id === input.id);
  const now = new Date();
  if (idx === -1) {
    const term: Term = {
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    mockTerms.push(term);
  } else {
    mockTerms[idx] = { ...mockTerms[idx], ...input, updatedAt: now };
  }
  return input.id;
}
