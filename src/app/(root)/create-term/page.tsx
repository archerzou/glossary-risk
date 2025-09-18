import { TermForm } from "@/components/Term-Form";
import { createTerm } from "@/lib/actions/terms";
import { redirect } from "next/navigation";

export default function Page() {
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
    />
  );
}
