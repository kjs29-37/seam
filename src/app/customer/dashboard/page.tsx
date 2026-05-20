import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { getSession } from "@/lib/demo-auth";

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

const activeOrders = [
  {
    id: "ORD-001",
    tailor: "Bangkok Classic Tailors",
    tailorId: "bangkok-tailors",
    garment: "2-Piece Suit",
    status: "in_production",
    escrow: "held",
    amount: "£380",
    eta: "12 days",
  },
  {
    id: "ORD-002",
    tailor: "Hanoi Silk Atelier",
    tailorId: "hanoi-silk",
    garment: "Silk Áo Dài",
    status: "shipped",
    escrow: "held",
    amount: "£210",
    eta: "3 days",
  },
];

const pendingQuotes = [
  {
    id: "QT-001",
    tailor: "Silom Couture House",
    tailorId: "silom-couture",
    garment: "Thai Silk Evening Gown",
    amount: "£620",
    expires: "2 days",
  },
];

const recentEnquiries = [
  {
    id: "ENQ-001",
    tailor: "Silom Couture House",
    garment: "Thai Silk Evening Gown",
    status: "quote_received",
    date: "2 days ago",
  },
  {
    id: "ENQ-002",
    tailor: "Saigon Bespoke Co.",
    garment: "Slim-Fit Dress Shirt",
    status: "enquiry_sent",
    date: "5 days ago",
  },
];

export default async function CustomerDashboard() {
  const session = await getSession();
  const firstName = session?.name?.split(" ")[0] ?? "there";

  return (
    <DashboardLayout role="customer" navItems={navItems}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#8b6914]">Customer</p>
            <h1 className="font-display text-[1.8rem] font-bold text-[#0f0e0b] leading-tight">Welcome back, {firstName}</h1>
            <p className="text-[0.85rem] text-[#6b6757] mt-1">Here&apos;s what&apos;s happening with your orders.</p>
          </div>
          <Link
            href="/tailors"
            className="shrink-0 bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 rounded-[6px] hover:opacity-80 transition-opacity"
          >
            + New Enquiry
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Active Orders" value={2} />
          <StatCard label="Pending Quotes" value={1} sub="Expires in 2 days" accent />
          <StatCard label="Total Spent" value="£590" sub="Across 3 orders" />
          <StatCard label="Reviews Left" value={1} sub="of 2 completed orders" />
        </div>

        {/* Active Orders */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757]">Active Orders</h2>
            <Link href="/customer/dashboard/orders" className="text-[0.72rem] text-[#8b6914] hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="font-display text-[1rem] font-bold text-[#0f0e0b]">{order.garment}</p>
                    <p className="text-[0.78rem] text-[#6b6757] mt-0.5">{order.tailor} · {order.id}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={order.status} />
                    <StatusBadge status={order.escrow === "held" ? "held_in_escrow" : order.escrow} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 text-[0.82rem] text-[#6b6757] mb-4">
                  <span>Amount <span className="font-semibold text-[#1c1b17]">{order.amount}</span></span>
                  <span>Est. delivery <span className="font-semibold text-[#1c1b17]">{order.eta}</span></span>
                </div>
                <div className="bg-[#e8f2ec] border border-[#c0d9c8] rounded-[4px] p-3 text-[0.78rem] text-[#1a5c38] mb-4">
                  🔒 Your payment is held securely in escrow — released after delivery.
                </div>
                <Link
                  href={`/orders/${order.id}`}
                  className="inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[#8b6914] hover:underline"
                >
                  Track order →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Pending Quotes + Recent Enquiries */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Quotes */}
          <section>
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4">Pending Quotes</h2>
            <div className="space-y-3">
              {pendingQuotes.map((q) => (
                <div key={q.id} className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <p className="font-display text-[0.95rem] font-bold text-[#0f0e0b]">{q.garment}</p>
                      <p className="text-[0.75rem] text-[#6b6757] mt-0.5">{q.tailor}</p>
                    </div>
                    <span className="text-[0.65rem] font-bold text-[#8b6914] bg-[#faf4e1] border border-[#c49a2a]/30 rounded-full px-2.5 py-0.5 uppercase tracking-[0.06em] shrink-0">
                      Expires {q.expires}
                    </span>
                  </div>
                  <p className="font-display text-[1.4rem] font-bold text-[#0f0e0b] mb-4">{q.amount}</p>
                  <div className="flex gap-2">
                    <Link
                      href={`/checkout?quote=${q.id}&tailor=${q.tailorId}`}
                      className="flex-1 text-center bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:opacity-80 transition-opacity"
                    >
                      Accept & Pay
                    </Link>
                    <button className="flex-1 border border-[#d0ccbf] text-[#6b6757] text-[0.72rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Enquiries */}
          <section>
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4">Recent Enquiries</h2>
            <div className="space-y-0 bg-white border border-[#e6e3da] rounded-[6px] overflow-hidden">
              {recentEnquiries.map((e, i) => (
                <div
                  key={e.id}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${i < recentEnquiries.length - 1 ? "border-b border-[#e6e3da]" : ""}`}
                >
                  <div>
                    <p className="text-[0.85rem] font-semibold text-[#1c1b17]">{e.garment}</p>
                    <p className="text-[0.75rem] text-[#6b6757]">{e.tailor} · {e.date}</p>
                  </div>
                  <StatusBadge status={e.status} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Measurement profile prompt */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6 flex items-center justify-between gap-6">
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-1">Measurement Profile</p>
            <p className="text-[0.88rem] font-semibold text-[#0f0e0b]">Complete your measurement profile</p>
            <p className="text-[0.8rem] text-[#6b6757] mt-1">Saved measurements are auto-attached to every new enquiry.</p>
          </div>
          <Link
            href="/customer/dashboard/measurements"
            className="shrink-0 border border-[#d0ccbf] text-[#1c1b17] text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-5 py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
          >
            Add Measurements
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
