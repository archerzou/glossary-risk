import { TermForm } from "@/components/Term-Form";
import { createTerm } from "@/lib/actions/terms";
import { getCategories } from "@/lib/actions/categories";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';


export default async function Page() {
  const categories = await getCategories();

  async function onSubmit(values: { term: string; definition: string; categoryId: string }) {
    "use server";
    const { id } = await createTerm(values);
    redirect(`/terms/${id}`);
  }

  return (
    <TermForm
      mode="create"
      onSubmit={onSubmit}
      title="Create a Term"
      submitLabel="Submit"
      categories={categories.map(c => ({ id: c.id, name: c.name }))}
    />
  );
}
