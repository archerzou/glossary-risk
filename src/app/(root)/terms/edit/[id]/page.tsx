import { TermForm } from "@/components/Term-Form";
import { getTermById, editTerm } from "@/lib/actions/terms";
import { getCategories } from "@/lib/actions/categories";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic';


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getTermById(id);
  const categories = await getCategories();

  const defaultValues = data
    ? { term: data.term.term, definition: data.term.definition, categoryId: data.term.categoryId }
    : { term: "", definition: "", categoryId: "" };

  async function onSubmit(values: { term?: string; definition?: string; categoryId?: string }) {
    "use server";
    await editTerm(id, values);
    redirect(`/terms/${id}`);
  }

  return (
    <TermForm
      mode="edit"
      defaultValues={defaultValues}
      onSubmitAction={onSubmit}
      title="Edit Term"
      submitLabel="Save"
      categories={categories.map(c => ({ id: c.id, name: c.name }))}
    />
  );
}
