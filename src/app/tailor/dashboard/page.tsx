import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { getSession } from "@/lib/supabase/queries";

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

const newEnquiries = [
  {
    id: "ENQ-012",
    customer: "James O.",
    garment: "3-Piece Wedding Suit",
    budget: "£400–£600",
    deadline: "8 weeks",
    date: "Today",
  },
  {
    id: "ENQ-013",
    customer: "Amara K.",
    garment: "Aso-Oke Gown",
    budget: "£250–£350",
    deadline: "6 weeks",
    date: "Yesterday",
  },
];

const activeOrders = [
  {
    id: "ORD-001",
    customer: "Jane D.",
    garment: "2-Piece Suit",
    status: "in_production",
    payout: "£342",
    payoutStatus: "pending",
    dueIn: "12 days",
  },
  {
    id: "ORD-002",
    customer: "Kofi A.",
    garment: "Kente Kaftan",
    status: "shipped",
    payout: "£189",
    payoutStatus: "pending",
    dueIn: "Awaiting delivery",
  },
  {
    id: "ORD-003",
    customer: "Fatima M.",
    garment: "Ankara Blouse",
    status: "issue_window",
    payout: "£124",
    payoutStatus: "eligible",
    dueIn: "Issue window: 4 days left",
  },
];

export default async function TailorDashboard() {
  const session = await getSession();
  const name = (session?.user?.user_metadata?.full_name as string | undefined) ?? "Your Studio";

  return (
    <DashboardLayout role="tailor" navItems={navItems}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#8b6914]">Tailor Studio</p>
            <h1 className="font-display text-[1.8rem] font-bold text-[#0f0e0b] leading-tight">{name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[0.78rem] text-[#6b6757]">Tailor Account</span>
              <span className="text-[0.6rem] font-bold tracking-[0.06em] uppercase text-[#1a5c38] bg-[#e8f2ec] border border-[#c0d9c8] px-2 py-0.5 rounded-full">✓ Active</span>
            </div>
          </div>
          <Link
            href="/tailor/dashboard/profile"
            className="shrink-0 border border-[#d0ccbf] text-[#1c1b17] text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
          >
            Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="New Enquiries" value={2} accent sub="Needs response" />
          <StatCard label="Active Orders" value={3} />
          <StatCard label="Pending Payout" value="£655" sub="Across 3 orders" />
          <StatCard label="Rating" value="4.8 ★" sub="From 42 reviews" />
        </div>

        {/* New Enquiries */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757]">New Enquiries</h2>
            <Link href="/tailor/dashboard/enquiries" className="text-[0.72rem] text-[#8b6914] hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {newEnquiries.map((e) => (
              <div key={e.id} className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-display text-[1rem] font-bold text-[#0f0e0b]">{e.garment}</p>
                    <p className="text-[0.78rem] text-[#6b6757] mt-0.5">From {e.customer} · {e.date} · {e.id}</p>
                  </div>
                  <span className="text-[0.6rem] font-bold tracking-[0.06em] uppercase text-[#8b6914] bg-[#faf4e1] border border-[#c49a2a]/30 px-2.5 py-0.5 rounded-full shrink-0">
                    New
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 text-[0.82rem] text-[#6b6757] mb-4">
                  <span>Budget <span className="font-semibold text-[#1c1b17]">{e.budget}</span></span>
                  <span>Deadline <span className="font-semibold text-[#1c1b17]">{e.deadline}</span></span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:opacity-80 transition-opacity">
                    View Brief &amp; Quote
                  </button>
                  <button className="border border-[#d0ccbf] text-[#6b6757] text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Orders */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757]">Active Orders</h2>
            <Link href="/tailor/dashboard/orders" className="text-[0.72rem] text-[#8b6914] hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-display text-[1rem] font-bold text-[#0f0e0b]">{order.garment}</p>
                    <p className="text-[0.78rem] text-[#6b6757] mt-0.5">For {order.customer} · {order.id}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex flex-wrap gap-6 text-[0.82rem] text-[#6b6757] mb-3">
                  <span>Payout <span className="font-semibold text-[#0f0e0b]">{order.payout}</span></span>
                  <span className="text-[#6b6757]">{order.dueIn}</span>
                </div>
                {order.payoutStatus === "eligible" && (
                  <div className="bg-[#e8f2ec] border border-[#c0d9c8] rounded-[4px] p-3 text-[0.78rem] text-[#1a5c38]">
                    ✓ Eligible for payout release — awaiting SEAM admin confirmation.
                  </div>
                )}
                <Link
                  href={`/orders/${order.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[#8b6914] hover:underline"
                >
                  View order →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* How payouts work */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
          <h3 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
            How Payouts Work
          </h3>
          <div className="space-y-2">
            {[
              "Customer pays → funds held securely in escrow by SEAM",
              "You produce and ship the garment",
              "Customer has a 7-day issue window after delivery",
              "No issues raised → SEAM releases payment to you",
            ].map((step, i) => (
              <div key={step} className="flex items-start gap-3 text-[0.82rem] text-[#6b6757]">
                <span className="h-5 w-5 shrink-0 rounded-full border border-[#8b6914] text-[#8b6914] flex items-center justify-center text-[0.6rem] font-bold mt-0.5">
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
