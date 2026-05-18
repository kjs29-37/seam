"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

type NavItem = { label: string; href: string; icon: string };
type Props = { role: "customer" | "tailor" | "admin"; navItems: NavItem[]; children: React.ReactNode };

export default function DashboardLayout({ role, navItems, children }: Props) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleLabel =
    role === "customer" ? "Customer" : role === "tailor" ? "Tailor Studio" : "Admin";

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[220px] flex-col border-r border-[#e6e3da] bg-white pt-16 transition-transform lg:static lg:translate-x-0 lg:pt-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-[#e6e3da] px-6 py-5">
          <p className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#8b6914]">
            {roleLabel}
          </p>
          <p className="mt-0.5 text-[0.78rem] text-[#6b6757]">Dashboard</p>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 text-[0.82rem] border-b border-[#e6e3da] transition-colors ${
                      active
                        ? "text-[#0f0e0b] font-semibold border-b-[#8b6914]"
                        : "text-[#6b6757] hover:text-[#1c1b17] hover:bg-[#f7f5f0]"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    {item.label}
                    {active && <span className="ml-auto w-0.5 h-4 bg-[#8b6914] rounded-full" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-[#e6e3da] px-6 py-4">
          <Link href="/" className="text-[0.75rem] text-[#6b6757] hover:text-[#1c1b17] transition">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center gap-4 border-b border-[#e6e3da] bg-white px-6 py-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-[#6b6757] hover:bg-[#f7f5f0] rounded transition"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-[0.82rem] font-semibold text-[#1c1b17] tracking-[0.04em] uppercase">{roleLabel} Dashboard</span>
        </div>
        <main className="flex-1 overflow-y-auto bg-[#fdfcf9] px-6 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
