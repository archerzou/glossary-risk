"use client";

import { TermForm } from "@/components/Term-Form";
import { upsertTerm } from "@/lib/mock/terms";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
      <TermForm
          mode="create"
          onSubmit={(values) => {
            const id = crypto.randomUUID();
            upsertTerm({ id, ...values });
            router.push(`/terms/${id}`);
          }}
          title="Create a Term"
          submitLabel="Submit"
      />
  );
}
