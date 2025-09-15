"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  term: string;
  category: string;
  definition: string;
};

export function TermCard({ term, category, definition }: Props) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{term}</CardTitle>
        <div className="text-xs text-muted-foreground bg-secondary rounded-full px-2 py-1 w-fit">
          {category}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-foreground/80">{definition}</p>
      </CardContent>
    </Card>
  );
}
