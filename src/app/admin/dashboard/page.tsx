import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: "🏠" },
  { label: "Tailor Verification", href: "/admin/dashboard/verification", icon: "✅" },
  { label: "Users", href: "/admin/dashboard/users", icon: "👥" },
  { label: "Orders", href: "/admin/dashboard/orders", icon: "📦" },
  { label: "Payments & Escrow", href: "/admin/dashboard/payments", icon: "💷" },
  { label: "Enquiries", href: "/admin/dashboard/enquiries", icon: "✉️" },
  { label: "Disputes", href: "/admin/dashboard/disputes", icon: "⚠️" },
  { label: "Community", href: "/admin/dashboard/community", icon: "🌐" },
  { label: "Metrics", href: "/admin/dashboard/metrics", icon: "📊" },
];

const pendingTailors = [
  { id: "T-041", name: "Accra Threads Studio", location: "Accra, Ghana", applied: "2 days ago", specialisms: ["Kente", "Suits", "Agbada"] },
  { id: "T-042", name: "Dakar Couture House", location: "Dakar, Senegal", applied: "4 days ago", specialisms: ["Evening Wear", "Bridal"] },
  { id: "T-043", name: "Kampala Stitch Co.", location: "Kampala, Uganda", applied: "5 days ago", specialisms: ["Shirts", "Trousers", "Casual"] },
];

const recentOrders = [
  { id: "ORD-001", customer: "Jane D.", tailor: "Lagos Bespoke Studio", garment: "2-Piece Suit", status: "in_production", amount: "£380" },
  { id: "ORD-002", customer: "Kofi A.", tailor: "Lagos Bespoke Studio", garment: "Kente Kaftan", status: "shipped", amount: "£210" },
  { id: "ORD-003", customer: "Amara K.", tailor: "Cairo Bespoke", garment: "Linen Shirt", status: "delivered", amount: "£95" },
  { id: "ORD-004", customer: "Fatima M.", tailor: "Nairobi Tailors Co.", garment: "Wedding Dress", status: "issue_raised", amount: "£820" },
];

const openDisputes = [
  { id: "DIS-001", order: "ORD-004", customer: "Fatima M.", issue: "Measurement discrepancy — bust 4cm off", raised: "1 day ago", amount: "£820" },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin" navItems={navItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">SEAM platform overview — concierge operations</p>
        </div>

        {/* Platform metrics */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Customers" value={128} sub="+12 this week" />
          <StatCard label="Verified Tailors" value={34} sub="3 pending approval" accent />
          <StatCard label="Active Orders" value={19} />
          <StatCard label="Total GMV" value="£24,850" sub="Lifetime platform value" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Enquiries (30d)" value={67} />
          <StatCard label="Quotes Accepted" value={41} sub="61% acceptance rate" />
          <StatCard label="Avg Order Value" value="£312" />
          <StatCard label="Open Disputes" value={1} accent sub="Needs attention" />
        </div>

        {/* Pending Tailor Verification */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Pending Tailor Verification</h2>
            <span className="rounded-full bg-amber-400/15 px-3 py-1 text-xs text-amber-300">
              {pendingTailors.length} awaiting review
            </span>
          </div>
          <div className="space-y-3">
            {pendingTailors.map((t) => (
              <div key={t.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{t.name}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{t.location} · Applied {t.applied}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {t.specialisms.map((s) => (
                        <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400">
                      Approve
                    </button>
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5">
                      Reject
                    </button>
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Disputes */}
        {openDisputes.length > 0 && (
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Open Disputes</h2>
            <div className="space-y-3">
              {openDisputes.map((d) => (
                <div key={d.id} className="rounded-2xl border border-red-400/20 bg-red-400/5 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">{d.issue}</p>
                      <p className="mt-0.5 text-sm text-slate-400">
                        {d.customer} · {d.order} · Raised {d.raised}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-white">{d.amount}</span>
                      <StatusBadge status="dispute_under_review" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400">
                      Release Payment
                    </button>
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/5">
                      Pause Payment
                    </button>
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5">
                      Issue Refund
                    </button>
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5">
                      View Full Dispute
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Orders */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Orders</h2>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-5 py-3 text-left font-medium text-slate-400">Order</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-400">Customer</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-400 hidden md:table-cell">Tailor</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-400 hidden lg:table-cell">Garment</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-400">Amount</th>
                  <th className="px-5 py-3 text-left font-medium text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition">
                    <td className="px-5 py-4 text-slate-300">{order.id}</td>
                    <td className="px-5 py-4 text-white">{order.customer}</td>
                    <td className="px-5 py-4 text-slate-300 hidden md:table-cell">{order.tailor}</td>
                    <td className="px-5 py-4 text-slate-300 hidden lg:table-cell">{order.garment}</td>
                    <td className="px-5 py-4 font-medium text-white">{order.amount}</td>
                    <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
