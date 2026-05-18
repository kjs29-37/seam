"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navLinks = [
  { label: "Browse Tailors", href: "/tailors" },
  { label: "Community", href: "/community" },
];

const dashboardLinks: Record<string, string> = {
  customer: "/customer/dashboard",
  tailor: "/tailor/dashboard",
  admin: "/admin/dashboard",
};

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single<{ role: string }>();
        setRole(profile?.role ?? "customer");
      }
      setReady(true);
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single<{ role: string }>();
        setRole(profile?.role ?? "customer");
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setRole(null);
    router.push("/");
    router.refresh();
  }

  const dashboardHref = role ? (dashboardLinks[role] ?? "/customer/dashboard") : "/customer/dashboard";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e6e3da]">
      <div className="bg-[#0f0e0b] text-white/70 text-center text-[0.7rem] tracking-[0.12em] uppercase py-2 px-6">
        Verified tailors worldwide — escrow-protected payments on every order
      </div>

      <div className="mx-auto max-w-[1280px] px-8 h-[72px] grid grid-cols-3 items-center">
        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#6b6757] px-5 h-[72px] flex items-center border-b-2 border-transparent hover:text-[#1c1b17] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Centre logo */}
        <div className="flex justify-center">
          <Link href="/" className="flex flex-col items-center">
            <span className="font-display text-[1.65rem] font-bold tracking-[-0.02em] text-[#0f0e0b] leading-none">
              SEAM
            </span>
            <span className="text-[0.55rem] tracking-[0.2em] uppercase text-[#6b6757] mt-0.5">
              Bespoke, Worldwide
            </span>
          </Link>
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center justify-end gap-1">
          {ready && role ? (
            <>
              <Link
                href={dashboardHref}
                className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#6b6757] px-4 h-[72px] flex items-center hover:text-[#1c1b17] transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="ml-2 border border-[#d0ccbf] text-[#1c1b17] text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
              >
                Sign Out
              </button>
            </>
          ) : ready ? (
            <>
              <Link
                href="/apply"
                className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#6b6757] px-4 h-[72px] flex items-center border-b-2 border-transparent hover:text-[#1c1b17] transition-colors"
              >
                Apply as Tailor
              </Link>
              <Link
                href="/auth/login"
                className="text-[0.75rem] font-medium tracking-[0.08em] uppercase text-[#6b6757] px-4 h-[72px] flex items-center hover:text-[#1c1b17] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="ml-2 bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 rounded-[6px] hover:opacity-80 transition-opacity"
              >
                Get Started
              </Link>
            </>
          ) : null}
        </div>

        {/* Mobile */}
        <div className="flex justify-end md:hidden col-span-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="p-2 text-[#1c1b17] hover:bg-[#f7f5f0] rounded transition">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-[#e6e3da] w-72">
              <div className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium tracking-[0.06em] uppercase text-[#6b6757] hover:text-[#1c1b17] py-3 border-b border-[#e6e3da] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {!role && (
                  <Link href="/apply" onClick={() => setOpen(false)} className="text-sm font-medium tracking-[0.06em] uppercase text-[#6b6757] hover:text-[#1c1b17] py-3 border-b border-[#e6e3da] transition-colors">
                    Apply as Tailor
                  </Link>
                )}
                <div className="pt-6 flex flex-col gap-3">
                  {role ? (
                    <>
                      <Link href={dashboardHref} onClick={() => setOpen(false)} className="border border-[#d0ccbf] rounded-[6px] px-4 py-3 text-center text-sm font-medium text-[#1c1b17] hover:bg-[#f7f5f0] transition">
                        Dashboard
                      </Link>
                      <button onClick={() => { setOpen(false); handleSignOut(); }} className="bg-[#0f0e0b] text-white rounded-[6px] px-4 py-3 text-center text-sm font-semibold tracking-[0.04em] hover:opacity-80 transition">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setOpen(false)} className="border border-[#d0ccbf] rounded-[6px] px-4 py-3 text-center text-sm font-medium text-[#1c1b17] hover:bg-[#f7f5f0] transition">
                        Sign In
                      </Link>
                      <Link href="/auth/signup" onClick={() => setOpen(false)} className="bg-[#0f0e0b] text-white rounded-[6px] px-4 py-3 text-center text-sm font-semibold tracking-[0.04em] hover:opacity-80 transition">
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
