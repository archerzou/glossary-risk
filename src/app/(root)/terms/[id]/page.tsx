import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteTerm, getTermById } from "@/lib/actions/terms";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/DeleteDialog";
import { BackButton } from "@/components/BackButton";
import { Pencil, Square } from "lucide-react";
import parse from "html-react-parser";
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

  async function onDelete() {
    "use server";
    await deleteTerm(id);
    redirect("/");
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <header className="flex items-end justify-between">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">{term.term}</h1>
        <div className="flex items-center gap-3">
          <Link href={`/terms/edit/${id}`}>
            <Button variant="outline">
              <Pencil />
              Edit
            </Button>
          </Link>
          <form action={onDelete}>
            <DeleteDialog />
          </form>
        </div>
      </header>

      <hr className="mt-6 border-border" />

      <section className="mt-8">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Square className="text-foreground/80" />
          <span>Definition</span>
        </div>
        <div className="mt-4 prose max-w-none">{parse(term.definition)}</div>
      </section>

      <footer className="mt-16 border-t border-border pt-4">
        <BackButton />
      </footer>
    </div>
  );
}
