import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Risk Analysis",
    default: "Glossary | Risk Analysis",
  },
  description:
    "The Risk Analysis Glossary of risk-related terminology offers different perspectives and a systematic separation between overall qualitative concepts and their measurements",
  keywords: ["glossary", "risk", "terminology", "analysis"],
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
