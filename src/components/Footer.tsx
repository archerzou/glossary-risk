"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Twitter, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#8B1538] to-[#600e11] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start">
              <Image
                src="/logo-footer.svg"
                alt="SRA Logo"
                width={120}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <div className="space-y-2 text-sm">
              <p>950 Herndon Parkway</p>
              <p>Suite 450</p>
              <p>Herndon, VA 20170</p>
              <p className="pt-2">703-790-1745</p>
            </div>
            <div className="space-y-2 text-sm">
              <p>© Copyright {currentYear}, Society for Risk Analysis. All rights reserved.</p>
              <Link href="#" className="underline hover:no-underline">
                Privacy Policy
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-end gap-4">
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
            
            <div className="text-right space-y-2">
              <div className="space-y-1 text-sm font-semibold uppercase tracking-wide">
                <Link href="#" className="block hover:underline">
                  RISK ANALYSIS INTRODUCTION
                </Link>
                <Link href="#" className="block hover:underline">
                  RISK ANALYSIS SPECIALTY GROUPS
                </Link>
                <Link href="#" className="block hover:underline">
                  RESOURCES
                </Link>
                <Link href="#" className="block hover:underline">
                  NEWS
                </Link>
                <Link href="#" className="block hover:underline">
                  EVENTS AND WEBINARS
                </Link>
                <Link href="#" className="block hover:underline">
                  MEMBERSHIP
                </Link>
                <Link href="#" className="block hover:underline">
                  JOURNAL
                </Link>
                <Link href="#" className="block hover:underline">
                  ABOUT SRA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
