import { db } from '@/lib/db';
import { glossaryTerms } from '@/lib/db/schema';
import { GlossaryList } from '@/components/glossary-list';

export default async function Home() {

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Risk Analysis Glossary
        </h1>
        <p className="text-lg text-gray-600">
          Offer different perspectives and a systematic separation between overall qualitative concepts and their measurements.
        </p>
      </header>
    </div>
  );
}
