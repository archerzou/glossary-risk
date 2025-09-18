import type { Metadata } from "next";
import { getTermById } from "@/lib/actions/terms";
import ParseHTML from "@/components/ParseHTML";
export const dynamic = 'force-dynamic';


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getTermById(id);
  return {
    title: data ? data.term.term : "Term",
    description: data ? `Definition for ${data.term.term}` : "Glossary term",
    keywords: data ? [data.term.term, "glossary", "risk", "definition"] : ["glossary", "risk"],
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getTermById(id);
  if (!data) {
    return <div className="prose max-w-none"><h1>Term not found</h1></div>;
  }
  const term = data.term;
  return (
    <article className="prose max-w-none">
      <h1 className="text-3xl font-semibold">{term.term}</h1>
      <div className="mt-4"><ParseHTML data={term.definition} /></div>
    </article>
  );
}
