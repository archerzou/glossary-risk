import { GlossaryList } from "@/components/glossary-list";
import { Header } from "@/components/glossary/Header";
import { AlphabetNav } from "@/components/glossary/AlphabetNav";
import { SearchBar } from "@/components/glossary/SearchBar";
import { GlossaryTerm } from "@/lib/db/schema";

const TERMS: GlossaryTerm[] = [
  { id: "1", term: "Alpha", definition: "Excess return over benchmark", category: "metrics", createdAt: new Date(), updatedAt: new Date() },
  { id: "2", term: "Beta", definition: "Sensitivity to market movements", category: "metrics", createdAt: new Date(), updatedAt: new Date() },
  { id: "3", term: "Credit Risk", definition: "Risk of loss from a borrower failing to repay", category: "credit", createdAt: new Date(), updatedAt: new Date() },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <Header />
      <SearchBar />
      <AlphabetNav />
      <GlossaryList initialTerms={TERMS} />
    </div>
  );
}
