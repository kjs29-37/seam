import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const navItems = [
  { label: "Overview", href: "/customer/dashboard", icon: "🏠" },
  { label: "My Orders", href: "/customer/dashboard/orders", icon: "📦" },
  { label: "Messages", href: "/messages", icon: "💬" },
  { label: "Enquiries", href: "/customer/dashboard/enquiries", icon: "✉️" },
  { label: "Quotes", href: "/customer/dashboard/quotes", icon: "📋" },
  { label: "Measurements", href: "/customer/dashboard/measurements", icon: "📏" },
  { label: "Inspiration", href: "/customer/dashboard/inspiration", icon: "🖼️" },
  { label: "Reviews", href: "/customer/dashboard/reviews", icon: "⭐" },
  { label: "Profile", href: "/customer/dashboard/profile", icon: "👤" },
];

const labels: Record<string, string> = {
  orders: "My Orders",
  enquiries: "Enquiries",
  quotes: "Quotes",
  measurements: "Measurements",
  inspiration: "Inspiration Board",
  reviews: "My Reviews",
  profile: "Profile",
};

export default async function CustomerSubPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const page = slug[0] ?? "";
  const title = labels[page] ?? "Coming Soon";

  return (
    <DashboardLayout role="customer" navItems={navItems}>
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
          href="/customer/dashboard"
          className="border border-[#d0ccbf] text-[#1c1b17] text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-6 py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </DashboardLayout>
  );
}
