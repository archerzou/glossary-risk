"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import parse from "html-react-parser";

type Props = {
  term: string;
  definition: string;
};

export function TermCard({ term, definition }: Props) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{term}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-none prose-ol:list-decimal prose-ul:list-disc text-foreground/80">{parse(definition)}</div>
      </CardContent>
    </Card>
  );
}
