import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Risk Analysis",
    default: "Glossary | Risk Analysis",
  },
  description:
    "The Risk Analysis Glossary from the Society for Risk Analysis - Society for Risk Analysis",
  keywords: ["glossary", "risk", "terminology", "analysis"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
