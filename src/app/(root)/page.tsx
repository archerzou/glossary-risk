import { GlossaryList } from "@/components/glossary-list";
import { AlphabetNav } from "@/components/glossary/AlphabetNav";
import { CategoryFilter } from "@/components/glossary/CategoryFilter";
import { SearchBar } from "@/components/glossary/SearchBar";
import { getTerms } from "@/lib/actions/terms";
export const dynamic = 'force-dynamic';


export default async function Home() {
  const terms = await getTerms();

  return (
    <div className="space-y-6">
      <SearchBar />
      <AlphabetNav />
      <CategoryFilter />
      <GlossaryList initialTerms={terms} />
    </div>
  );
}
