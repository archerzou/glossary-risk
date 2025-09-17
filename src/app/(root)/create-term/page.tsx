import type { Metadata } from "next";
import { ClientCreateTerm } from "./client";

export const metadata: Metadata = {
  title: "Create Term",
  description: "Create a new glossary term",
};

export default function Page() {
  return <ClientCreateTerm />;
}
