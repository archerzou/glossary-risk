import React from "react";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: {
        template: '%s | Risk Analysis',
        default: 'Glossary | Risk Analysis'
    },
    description: 'The Risk Analysis Glossary of risk-related terminology offers different perspectives and a systematic separation between overall qualitative concepts and their measurements',
    keywords: ['glossary', 'risk', 'terminology', 'analysis'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            {children}
          </body>
      </html>
  );
}
