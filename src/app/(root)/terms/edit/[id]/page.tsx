import type { Metadata } from "next";
import { ClientEditTerm } from "./client";

export const metadata: Metadata = {
  title: "Edit Term",
  description: "Edit glossary term",
};

export default function Page({ params }: { params: { id: string } }) {
  return <ClientEditTerm id={params.id} />;
}
