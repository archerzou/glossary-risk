import type { Metadata } from "next";
import { getTermById } from "@/lib/mock/terms";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const t = getTermById(params.id);
  return {
    title: t ? t.term : "Term",
    description: t ? `Definition for ${t.term}` : "Glossary term",
    keywords: t ? [t.term, "glossary", "risk", "definition"] : ["glossary", "risk"],
  };
}

export default function Page({ params }: { params: { id: string } }) {
  const term = getTermById(params.id);
  if (!term) {
    return <div className="prose max-w-none"><h1>Term not found</h1></div>;
  }
  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-semibold">{term.term}</h1>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: term.definition }} />
    </article>
  );
}
