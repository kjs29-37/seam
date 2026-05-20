import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const navItems = [
  { label: "Overview", href: "/tailor/dashboard", icon: "🏠" },
  { label: "Enquiries", href: "/tailor/dashboard/enquiries", icon: "✉️" },
  { label: "Messages", href: "/messages", icon: "💬" },
  { label: "Active Orders", href: "/tailor/dashboard/orders", icon: "📦" },
  { label: "Quotes Sent", href: "/tailor/dashboard/quotes", icon: "📋" },
  { label: "Earnings", href: "/tailor/dashboard/earnings", icon: "💷" },
  { label: "Portfolio", href: "/tailor/dashboard/portfolio", icon: "🖼️" },
  { label: "Reviews", href: "/tailor/dashboard/reviews", icon: "⭐" },
  { label: "My Profile", href: "/tailor/dashboard/profile", icon: "👤" },
];

const labels: Record<string, string> = {
  enquiries: "Enquiries",
  orders: "Active Orders",
  quotes: "Quotes Sent",
  earnings: "Earnings",
  portfolio: "Portfolio",
  reviews: "Reviews",
  profile: "My Profile",
  verification: "Verification",
};

export default async function TailorSubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = slug[0] ?? "";
  const title = labels[page] ?? "Coming Soon";

  return (
    <DashboardLayout role="tailor" navItems={navItems}>
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
        <div className="h-14 w-14 bg-[#f7f5f0] rounded-full flex items-center justify-center text-2xl mb-5 border border-[#e6e3da]">
          🧵
        </div>
        <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">Coming Soon</p>
        <h1 className="font-display text-[1.6rem] font-bold text-[#0f0e0b] mb-3">{title}</h1>
        <p className="text-[0.88rem] text-[#6b6757] max-w-sm leading-[1.7] mb-8">
          This section is being built. Check back soon — it&apos;ll be ready before you know it.
        </p>
        <Link
          href="/tailor/dashboard"
          className="border border-[#d0ccbf] text-[#1c1b17] text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-6 py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
}
