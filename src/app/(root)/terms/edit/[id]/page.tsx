"use client";

import { TermForm } from "@/components/Term-Form";
import { getTermById, upsertTerm } from "@/lib/mock/terms";
import { useRouter } from "next/navigation";
import { useMemo } from "react";


export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const term = useMemo(() => getTermById(params.id), [params.id]);

  return (
      <TermForm
          mode="edit"
          defaultValues={
            term
                ? { term: term.term, definition: term.definition, categoryId: term.categoryId }
                : {}
          }
          onSubmit={(values) => {
            upsertTerm({ id: params.id, ...values });
            router.push(`/terms/${params.id}`);
          }}
          title="Edit Term"
          submitLabel="Save"
      />
  );
}