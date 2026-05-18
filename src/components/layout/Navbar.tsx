"use client";

import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Tailors", href: "#for-tailors" },
  { label: "Browse Tailors", href: "/tailors" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          SEAM
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="rounded-2xl px-4 py-2 text-sm text-slate-300 transition hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-2xl bg-emerald-500 px-5 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
          >
            Get Started
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden rounded-lg p-2 text-white hover:bg-white/10 transition">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-slate-950 border-white/10 text-white w-72">
            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-slate-300 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                <Link
                  href="/auth/login"
                  className="rounded-2xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-2xl bg-emerald-500 px-4 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
