import type { ReactNode } from "react";
import Header from "@/components/Header";

export default function RootGroupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-1">{children}</main>
    </div>
  );
}
