"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import parse from "html-react-parser";

type Props = {
  id: string;
  term: string;
  definition: string;
};

export function TermCard({ id, term, definition }: Props) {
  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg">
          <Link 
            href={`/terms/${id}`} 
            className="hover:underline transition-colors"
            style={{ color: 'var(--sra-primary-red)' }}
          >
            {term}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
          <div className="max-w-none text-foreground/80">{parse(definition)}</div>
      </CardContent>
    </Card>
  );
}
