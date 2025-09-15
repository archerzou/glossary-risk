import { db } from '@/lib/db';
import { glossaryTerms } from '@/lib/db/schema';
import { GlossaryList } from '@/components/glossary-list';

export default async function Home() {
  let terms = [];
  
  try {
    terms = await db.select().from(glossaryTerms).orderBy(glossaryTerms.term);
  } catch (error) {
    console.error('Failed to fetch terms:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Risk Management Glossary
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive definitions of key risk management and financial terms
        </p>
      </header>
      
      <GlossaryList initialTerms={terms} />
    </div>
  );
}
