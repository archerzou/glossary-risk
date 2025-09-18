"use server";

import { db } from "@/lib/db";
import { terms, insertTermSchema, type Term } from "@/lib/db/schema";
import { and, desc, eq, ilike, ne } from "drizzle-orm";
import { z } from "zod";

export type TermDetails = {
  term: Term & { category?: { id: string; name: string } };
  relatedTerms: Term[];
  crossReferences: Term[];
};

export async function getTerms(): Promise<Term[]> {
  const rows = await db.select().from(terms).orderBy(desc(terms.createdAt));
  return rows;
}

export async function getTermById(termId: string): Promise<TermDetails | null> {
  const id = z.string().uuid().parse(termId);

  const t = await db.query.terms.findFirst({
    where: eq(terms.id, id),
    with: {
      category: true,
    },
  });

  if (!t) return null;

  const relatedTerms = await db
    .select()
    .from(terms)
    .where(and(eq(terms.categoryId, t.categoryId), ne(terms.id, t.id)));

  const crossReferences = await db
    .select()
    .from(terms)
    .where(ilike(terms.definition, `%${t.term}%`));

  const crossRefsFiltered = crossReferences.filter((r) => r.id !== t.id);

  const categoryData = t.category
    ? { id: t.category.id, name: t.category.name }
    : undefined;

  const base: Term = {
    id: t.id,
    term: t.term,
    definition: t.definition,
    categoryId: t.categoryId,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };

  return {
    term: { ...base, category: categoryData },
    relatedTerms,
    crossReferences: crossRefsFiltered,
  };
}

export async function createTerm(input: unknown): Promise<{ id: string }> {
  const parsed = insertTermSchema.parse(input);
  const toInsert = {
    ...parsed,
    id: parsed.id ?? crypto.randomUUID(),
    createdAt: parsed.createdAt ?? new Date(),
    updatedAt: parsed.updatedAt ?? new Date(),
  };

  const [inserted] = await db.insert(terms).values(toInsert).returning({ id: terms.id });
  return { id: inserted.id };
}

export async function editTerm(termId: string, input: unknown): Promise<{ id: string }> {
  const id = z.string().uuid().parse(termId);
  const updateSchema = insertTermSchema
    .pick({ term: true, definition: true, categoryId: true })
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, "At least one field must be provided");
  const data = updateSchema.parse(input);

  const [updated] = await db
    .update(terms)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(terms.id, id))
    .returning({ id: terms.id });

  return { id: updated.id };
}

export async function deleteTerm(termId: string): Promise<{ id: string }> {
  const id = z.string().uuid().parse(termId);
  const [deleted] = await db.delete(terms).where(eq(terms.id, id)).returning({ id: terms.id });
  return { id: deleted.id };
}
