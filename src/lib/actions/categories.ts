"use server";

import { db } from "@/lib/db";
import { categories, insertCategorySchema, type Category } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export async function getCategories(): Promise<Category[]> {
  return db.select().from(categories).orderBy(desc(categories.createdAt));
}

export async function getTCategoryById(categoryId: string): Promise<Category | null> {
  const id = z.string().uuid().parse(categoryId);
  const [c] = await db.select().from(categories).where(eq(categories.id, id));
  return c ?? null;
}

export async function createCategory(input: unknown): Promise<{ id: string }> {
  const parsed = insertCategorySchema.parse(input);
  const toInsert = { ...parsed, id: parsed.id ?? crypto.randomUUID(), createdAt: parsed.createdAt ?? new Date() };
  const [inserted] = await db.insert(categories).values(toInsert).returning({ id: categories.id });
  return { id: inserted.id };
}

export async function deleteCategory(categoryId: string): Promise<{ id: string }> {
  const id = z.string().uuid().parse(categoryId);
  const [deleted] = await db.delete(categories).where(eq(categories.id, id)).returning({ id: categories.id });
  return { id: deleted.id };
}
