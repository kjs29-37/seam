// @ts-nocheck — Supabase types pending: npx supabase gen types typescript
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { getPendingApplications, getOpenDisputes } from "@/lib/supabase/queries";
import AdminVerificationActions from "./AdminVerificationActions";

const navItems = [
  { label: "Overview", href: "/admin/dashboard", icon: "🏠" },
  { label: "Tailor Verification", href: "/admin/dashboard/verification", icon: "✅" },
  { label: "Users", href: "/admin/dashboard/users", icon: "👥" },
  { label: "Orders", href: "/admin/dashboard/orders", icon: "📦" },
  { label: "Payments & Escrow", href: "/admin/dashboard/payments", icon: "💷" },
  { label: "Disputes", href: "/admin/dashboard/disputes", icon: "⚠️" },
  { label: "Community", href: "/admin/dashboard/community", icon: "🌐" },
  { label: "Metrics", href: "/admin/dashboard/metrics", icon: "📊" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Jane D.", tailor: "Lagos Bespoke Studio", garment: "2-Piece Suit", status: "in_production", amount: "£380" },
  { id: "ORD-002", customer: "Kofi A.", tailor: "Lagos Bespoke Studio", garment: "Kente Kaftan", status: "shipped", amount: "£210" },
  { id: "ORD-003", customer: "Amara K.", tailor: "Cairo Bespoke", garment: "Linen Shirt", status: "delivered", amount: "£95" },
  { id: "ORD-004", customer: "Fatima M.", tailor: "Nairobi Tailors Co.", garment: "Wedding Dress", status: "issue_raised", amount: "£820" },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}

export default async function AdminDashboard() {
  const [pendingApplications, openDisputes] = await Promise.all([
    getPendingApplications(),
    getOpenDisputes(),
  ]);

  return (
    <DashboardLayout role="admin" navItems={navItems}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <p className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#8b6914]">Admin</p>
          <h1 className="font-display text-[1.8rem] font-bold text-[#0f0e0b] leading-tight">Platform Overview</h1>
          <p className="text-[0.85rem] text-[#6b6757] mt-1">SEAM concierge operations — live platform data</p>
        </div>

        {/* Platform metrics — row 1 */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Customers" value={128} sub="+12 this week" />
          <StatCard label="Verified Tailors" value={34} sub={`${pendingApplications.length} pending approval`} accent={pendingApplications.length > 0} />
          <StatCard label="Active Orders" value={19} />
          <StatCard label="Total GMV" value="£24,850" sub="Lifetime platform value" />
        </div>

        {/* Platform metrics — row 2 */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Enquiries (30d)" value={67} />
          <StatCard label="Quotes Accepted" value={41} sub="61% acceptance rate" />
          <StatCard label="Avg Order Value" value="£312" />
          <StatCard label="Open Disputes" value={openDisputes.length} accent={openDisputes.length > 0} sub={openDisputes.length > 0 ? "Needs attention" : "All clear"} />
        </div>

        {/* Pending Tailor Verification */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757]">Pending Tailor Verification</h2>
            <span className="text-[0.6rem] font-bold tracking-[0.06em] uppercase text-[#8b6914] bg-[#faf4e1] border border-[#c49a2a]/30 px-2.5 py-0.5 rounded-full">
              {pendingApplications.length} awaiting review
            </span>
          </div>

          {pendingApplications.length === 0 ? (
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 text-center">
              <p className="text-[0.84rem] text-[#6b6757]">No pending applications — all caught up.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApplications.map((app) => (
                <div key={app.id} className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-[1rem] font-bold text-[#0f0e0b]">{app.studio_name}</p>
                      <p className="text-[0.78rem] text-[#6b6757] mt-0.5">
                        {app.location}
                        {app.owner_name ? ` · ${app.owner_name}` : ""}
                        {" · Applied "}
                        {timeAgo(app.created_at)}
                      </p>
                      {app.email && (
                        <p className="text-[0.72rem] text-[#9c9886] mt-0.5">{app.email}</p>
                      )}
                      {Array.isArray(app.specialisms) && app.specialisms.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {app.specialisms.map((s: string) => (
                            <span key={s} className="text-[0.65rem] font-medium text-[#6b6757] bg-[#f7f5f0] border border-[#e6e3da] rounded-full px-2.5 py-0.5">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                      {app.bio && (
                        <p className="text-[0.78rem] text-[#6b6757] mt-3 leading-[1.6] line-clamp-2 max-w-xl">
                          {app.bio}
                        </p>
                      )}
                    </div>
                    <AdminVerificationActions applicationId={app.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Open Disputes */}
        {openDisputes.length > 0 && (
          <section>
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4">Open Disputes</h2>
            <div className="space-y-3">
              {openDisputes.map((d) => (
                <div key={d.id} className="bg-white border border-red-200 rounded-[6px] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status="dispute_under_review" />
                        <span className="text-[0.72rem] text-[#9c9886]">
                          {d.id.slice(0, 8).toUpperCase()} · Raised {timeAgo(d.created_at)}
                        </span>
                      </div>
                      <p className="font-display text-[1rem] font-bold text-[#0f0e0b]">
                        {d.issue ?? "Dispute raised"}
                      </p>
                      <p className="text-[0.78rem] text-[#6b6757] mt-0.5">
                        {d.order?.garment_type ?? "Order"}
                        {d.order?.amount ? ` · £${d.order.amount}` : ""}
                      </p>
                    </div>
                    {d.order?.amount && (
                      <p className="font-display text-[1.4rem] font-bold text-[#0f0e0b]">
                        £{d.order.amount}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-[#1a5c38] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2.5 rounded-[6px] hover:opacity-80 transition-opacity">
                      Release Payment
                    </button>
                    <button className="bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2.5 rounded-[6px] hover:opacity-80 transition-opacity">
                      Pause Escrow
                    </button>
                    <button className="border border-red-200 text-red-700 text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2.5 rounded-[6px] hover:bg-red-50 transition">
                      Issue Refund
                    </button>
                    <Link
                      href={`/disputes/${d.id}`}
                      className="border border-[#d0ccbf] text-[#6b6757] text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
                    >
                      View Full Dispute
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recent Orders */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757]">Recent Orders</h2>
            <Link href="/admin/dashboard/orders" className="text-[0.72rem] text-[#8b6914] hover:underline">View all</Link>
          </div>
          <div className="bg-white border border-[#e6e3da] rounded-[6px] overflow-hidden">
            <table className="w-full text-[0.84rem]">
              <thead>
                <tr className="border-b border-[#e6e3da] bg-[#f7f5f0]">
                  <th className="px-5 py-3 text-left text-[0.62rem] font-bold tracking-[0.08em] uppercase text-[#6b6757]">Order</th>
                  <th className="px-5 py-3 text-left text-[0.62rem] font-bold tracking-[0.08em] uppercase text-[#6b6757]">Customer</th>
                  <th className="px-5 py-3 text-left text-[0.62rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] hidden md:table-cell">Tailor</th>
                  <th className="px-5 py-3 text-left text-[0.62rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] hidden lg:table-cell">Garment</th>
                  <th className="px-5 py-3 text-left text-[0.62rem] font-bold tracking-[0.08em] uppercase text-[#6b6757]">Amount</th>
                  <th className="px-5 py-3 text-left text-[0.62rem] font-bold tracking-[0.08em] uppercase text-[#6b6757]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e3da]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#fdfcf9] transition">
                    <td className="px-5 py-4 font-mono text-[0.78rem] text-[#6b6757]">{order.id}</td>
                    <td className="px-5 py-4 text-[#1c1b17] font-medium">{order.customer}</td>
                    <td className="px-5 py-4 text-[#6b6757] hidden md:table-cell">{order.tailor}</td>
                    <td className="px-5 py-4 text-[#6b6757] hidden lg:table-cell">{order.garment}</td>
                    <td className="px-5 py-4 font-semibold text-[#0f0e0b]">{order.amount}</td>
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
