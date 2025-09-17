import { db } from '../src/lib/db';
import { categories, terms } from '../src/lib/db/schema/glossary-schema';

const CATEGORY_NAMES = [
  'basic concepts',
  'related concepts',
  'risk management actions',
] as const;

const seedTerms = [
  { term: 'Risk', definition: 'The possibility of loss or injury.', category: 'basic concepts' },
  { term: 'Uncertainty', definition: 'Lack of sureness about outcomes.', category: 'basic concepts' },
  { term: 'Exposure', definition: 'Degree to which an entity is at risk.', category: 'basic concepts' },
  { term: 'Hedge', definition: 'An investment to reduce adverse price movements.', category: 'risk management actions' },
  { term: 'Diversification', definition: 'Spread investments to reduce risk.', category: 'risk management actions' },
  { term: 'Mitigation', definition: 'Actions to reduce severity or likelihood.', category: 'risk management actions' },
  { term: 'Correlation', definition: 'Statistical relationship between variables.', category: 'related concepts' },
  { term: 'Volatility', definition: 'Measure of price variation over time.', category: 'related concepts' },
  { term: 'Beta', definition: 'Sensitivity of returns relative to market.', category: 'related concepts' },
  { term: 'Value at Risk (VaR)', definition: 'Max loss over a period at confidence level.', category: 'related concepts' },
] as const;

async function seed() {
  console.log('Seeding database...');

  try {
    const inserted = await db
      .insert(categories)
      .values(CATEGORY_NAMES.map((name) => ({ name })))
      .onConflictDoNothing({ target: categories.name })
      .returning({ id: categories.id, name: categories.name });

    const allCats = inserted.length
      ? inserted
      : await db
          .select({ id: categories.id, name: categories.name })
          .from(categories);

    const catMap = allCats.reduce<Record<string, string>>((acc, c) => {
      acc[c.name] = c.id;
      return acc;
    }, {});

    const termRows = seedTerms.map((t) => ({
      term: t.term,
      definition: t.definition,
      categoryId: catMap[t.category],
    }));

    console.log(`Categories: ${Object.keys(catMap).join(', ')}`);
    console.log(`Inserting ${termRows.length} terms...`);

    await db.insert(terms).values(termRows);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
