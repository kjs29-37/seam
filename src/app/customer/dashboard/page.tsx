import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Link from "next/link";

const navItems = [
  { label: "Overview", href: "/customer/dashboard", icon: "🏠" },
  { label: "My Orders", href: "/customer/dashboard/orders", icon: "📦" },
  { label: "Enquiries", href: "/customer/dashboard/enquiries", icon: "✉️" },
  { label: "Quotes", href: "/customer/dashboard/quotes", icon: "💬" },
  { label: "Measurements", href: "/customer/dashboard/measurements", icon: "📏" },
  { label: "Inspiration", href: "/customer/dashboard/inspiration", icon: "🖼️" },
  { label: "Reviews", href: "/customer/dashboard/reviews", icon: "⭐" },
  { label: "Profile", href: "/customer/dashboard/profile", icon: "👤" },
];

const activeOrders = [
  {
    id: "ORD-001",
    tailor: "Lagos Bespoke Studio",
    garment: "2-Piece Suit",
    status: "in_production",
    payment: "held_in_escrow",
    amount: "£380",
    eta: "12 days",
  },
  {
    id: "ORD-002",
    tailor: "Accra Threads",
    garment: "Kente Kaftan",
    status: "shipped",
    payment: "held_in_escrow",
    amount: "£210",
    eta: "3 days",
  },
];

const recentQuotes = [
  {
    id: "QT-001",
    tailor: "Nairobi Tailors Co.",
    garment: "Wedding Dress",
    amount: "£620",
    status: "sent",
    expires: "2 days",
  },
  {
    id: "QT-002",
    tailor: "Dakar Couture",
    garment: "Evening Gown",
    amount: "£450",
    status: "accepted",
    expires: null,
  },
];

const recentEnquiries = [
  {
    id: "ENQ-001",
    tailor: "Nairobi Tailors Co.",
    garment: "Wedding Dress",
    status: "quote_received",
    date: "2 days ago",
  },
  {
    id: "ENQ-002",
    tailor: "Cairo Bespoke",
    garment: "Linen Shirt",
    status: "enquiry_sent",
    date: "5 days ago",
  },
];

export default function CustomerDashboard() {
  return (
    <DashboardLayout role="customer" navItems={navItems}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">Welcome back, Jane</h1>
            <p className="mt-1 text-sm text-slate-400">Here&apos;s what&apos;s happening with your orders.</p>
          </div>
          <Link
            href="/tailors"
            className="rounded-2xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
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
                    <p className="mt-0.5 text-sm text-slate-400">{order.tailor}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusBadge status={order.status} />
                    <StatusBadge status={order.payment} />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                  <span>Order <span className="text-slate-300">{order.id}</span></span>
                  <span>Amount <span className="text-slate-300">{order.amount}</span></span>
                  <span>Est. delivery <span className="text-slate-300">{order.eta}</span></span>
                </div>
                <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm text-emerald-300">
                  Your payment is held securely in escrow and will be released after delivery.
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quotes & Enquiries side by side */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Quotes */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Recent Quotes</h2>
            <div className="space-y-3">
              {recentQuotes.map((q) => (
                <div
                  key={q.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-white">{q.garment}</p>
                      <p className="mt-0.5 text-sm text-slate-400">{q.tailor}</p>
                    </div>
                    <StatusBadge status={q.status} />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">{q.amount}</span>
                    {q.expires && (
                      <span className="text-xs text-amber-400">Expires in {q.expires}</span>
                    )}
                  </div>
                  {q.status === "sent" && (
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 rounded-xl bg-emerald-500 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400">
                        Accept
                      </button>
                      <button className="flex-1 rounded-xl border border-white/10 py-2 text-sm text-slate-300 transition hover:bg-white/5">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Recent Enquiries */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Recent Enquiries</h2>
            <div className="space-y-3">
              {recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-white">{e.garment}</p>
                      <p className="mt-0.5 text-sm text-slate-400">{e.tailor}</p>
                    </div>
                    <StatusBadge status={e.status} />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">Sent {e.date}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Measurement profile prompt */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white">Complete your measurement profile</h3>
              <p className="mt-1 text-sm text-slate-400">
                Saved measurements are attached automatically to every new enquiry.
              </p>
            </div>
            <Link
              href="/customer/dashboard/measurements"
              className="shrink-0 rounded-xl border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              Add Measurements
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
