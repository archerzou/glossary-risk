"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <p className="text-base leading-relaxed text-foreground/80">{definition}</p>
      </CardContent>
    </Card>
  );
}
