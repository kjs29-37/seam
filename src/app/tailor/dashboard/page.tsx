import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/tailor/dashboard", icon: "🏠" },
  { label: "Enquiries", href: "/tailor/dashboard/enquiries", icon: "✉️" },
  { label: "Active Orders", href: "/tailor/dashboard/orders", icon: "📦" },
  { label: "Quotes Sent", href: "/tailor/dashboard/quotes", icon: "💬" },
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
    status: "delivered",
    payout: "£124",
    payoutStatus: "eligible",
    dueIn: "Issue window: 4 days left",
  },
];

export default function TailorDashboard() {
  return (
    <DashboardLayout role="tailor" navItems={navItems}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Lagos Bespoke Studio</h1>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-slate-400">Verified Tailor</span>
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-300">✓ Active</span>
            </div>
          </div>
          <Link
            href="/tailor/dashboard/profile"
            className="rounded-2xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
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
          <h2 className="mb-4 text-lg font-semibold text-white">New Enquiries</h2>
          <div className="space-y-3">
            {newEnquiries.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{e.garment}</p>
                    <p className="mt-0.5 text-sm text-slate-400">From {e.customer} · {e.date}</p>
                  </div>
                  <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs text-amber-300">New</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-400">
                  <span>Budget <span className="text-slate-300">{e.budget}</span></span>
                  <span>Deadline <span className="text-slate-300">{e.deadline}</span></span>
                  <span>Ref <span className="text-slate-300">{e.id}</span></span>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-xl bg-emerald-500 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400">
                    View Brief &amp; Quote
                  </button>
                  <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-400 transition hover:bg-white/5">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Orders */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-white">Active Orders</h2>
          <div className="space-y-3">
            {activeOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{order.garment}</p>
                    <p className="mt-0.5 text-sm text-slate-400">For {order.customer} · {order.id}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-400">
                  <span>Payout <span className="text-white font-medium">{order.payout}</span></span>
                  <span>Status <span className="text-slate-300 capitalize">{order.payoutStatus}</span></span>
                  <span className="text-slate-300">{order.dueIn}</span>
                </div>
                {order.payoutStatus === "eligible" && (
                  <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm text-emerald-300">
                    This order is eligible for payout release — awaiting SEAM admin confirmation.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Escrow reminder */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold text-white">How payouts work</h3>
          <div className="mt-4 space-y-2">
            {[
              "Customer pays → funds held securely in escrow by SEAM",
              "You produce and ship the garment",
              "Customer has a 7-day issue window after delivery",
              "No issues raised → SEAM releases payment to you",
            ].map((step) => (
              <div key={step} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
                <span className="mt-0.5 text-emerald-400">✓</span>
                {step}
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
