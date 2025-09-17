"use client";

import { TermForm } from "@/components/Term-Form";
import { getTermById, upsertTerm } from "@/lib/mock/terms";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function ClientEditTerm({ id }: { id: string }) {
  const router = useRouter();
  const term = useMemo(() => getTermById(id), [id]);

  return (
    <TermForm
      mode="edit"
      defaultValues={
        term
          ? { term: term.term, definition: term.definition, categoryId: term.categoryId }
          : {}
      }
      onSubmit={(values) => {
        upsertTerm({ id, ...values });
        router.push(`/terms/${id}`);
      }}
      title="Edit Term"
      submitLabel="Save"
    />
  );
}
