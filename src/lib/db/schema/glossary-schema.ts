import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const terms = pgTable('terms', {
  id: uuid('id').defaultRandom().primaryKey(),
  term: text('term').notNull(),
  definition: text('definition').notNull(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => categories.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  terms: many(terms),
}));

export const termsRelations = relations(terms, ({ one }) => ({
  category: one(categories, {
    fields: [terms.categoryId],
    references: [categories.id],
  }),
}));

export const insertCategorySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  createdAt: z.date().optional(),
});

export const selectCategorySchema = insertCategorySchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
});

export const insertTermSchema = z.object({
  id: z.string().uuid().optional(),
  term: z.string().min(1),
  definition: z.string().min(1),
  categoryId: z.string().uuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const selectTermSchema = insertTermSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Term = typeof terms.$inferSelect;
export type NewTerm = typeof terms.$inferInsert;
