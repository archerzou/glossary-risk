import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const glossaryTerms = pgTable('glossary_terms', {
  id: uuid('id').defaultRandom().primaryKey(),
  term: text('term').notNull(),
  definition: text('definition').notNull(),
  category: text('category').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type GlossaryTerm = typeof glossaryTerms.$inferSelect;
export type NewGlossaryTerm = typeof glossaryTerms.$inferInsert;