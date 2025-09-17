import { GlossaryList } from "@/components/glossary-list";
import { AlphabetNav } from "@/components/glossary/AlphabetNav";
import { SearchBar } from "@/components/glossary/SearchBar";
import { Term } from "@/lib/db/schema";
import {getCurrentUser} from "@/lib/auth/actions";

const TERMS: Term[] = [];

export default async function Home() {
    const user = await getCurrentUser();

    console.log('user', user);
  return (
    <div className="space-y-6">
      <SearchBar />
      <AlphabetNav />
      <GlossaryList initialTerms={TERMS} />
    </div>
  );
}
