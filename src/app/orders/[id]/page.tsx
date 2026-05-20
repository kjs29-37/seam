import { getOrder } from "@/lib/supabase/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/StatusBadge";
import OrderActions from "./OrderActions";
import type { OrderMilestone } from "@/types/database";

const escrowLabels: Record<string, string> = {
  unpaid: "Awaiting Payment",
  held: "Held in Escrow",
  released: "Released to Tailor",
  refunded: "Refunded",
  paused: "Paused (Dispute)",
};

const escrowColors: Record<string, string> = {
  unpaid: "text-[#8b6914] bg-[#faf4e1] border-[#c49a2a]/30",
  held: "text-blue-700 bg-blue-50 border-blue-200",
  released: "text-[#1a5c38] bg-[#e8f2ec] border-[#c0d9c8]",
  refunded: "text-[#6b6757] bg-[#f7f5f0] border-[#e6e3da]",
  paused: "text-red-700 bg-red-50 border-red-200",
};

function milestoneStatus(milestones: OrderMilestone[], index: number): "completed" | "current" | "pending" {
  if (milestones[index].completed_at) return "completed";
  const firstIncomplete = milestones.findIndex((m) => !m.completed_at);
  return firstIncomplete === index ? "current" : "pending";
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const isShipped = ["shipped", "delivered", "issue_window", "completed"].includes(order.status);
  const shortId = order.id.slice(0, 8).toUpperCase();

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-3">
        <div className="mx-auto max-w-[1000px] flex items-center gap-2 text-[0.75rem] text-[#6b6757]">
          <Link href="/" className="hover:text-[#1c1b17] transition">Home</Link>
          <span className="text-[#d0ccbf]">›</span>
          <Link href="/customer/dashboard" className="hover:text-[#1c1b17] transition">Dashboard</Link>
          <span className="text-[#d0ccbf]">›</span>
          <span className="text-[#1c1b17] font-medium">Order {shortId}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-6 py-10">
        {/* Order header */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914] mb-1">{shortId}</p>
              <h1 className="font-display text-[1.8rem] font-bold text-[#0f0e0b] leading-tight">{order.garment_type}</h1>
              <p className="text-[0.85rem] text-[#6b6757] mt-1">
                by {order.tailor.studio_name} · {order.tailor.location}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={order.status} />
              <span className={`inline-flex items-center border rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.04em] uppercase ${escrowColors[order.escrow_status] ?? escrowColors.held}`}>
                {escrowLabels[order.escrow_status] ?? order.escrow_status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[4px] overflow-hidden">
            {[
              { label: "Order Total", value: `${order.currency}${order.amount}` },
              { label: "Tailor Payout", value: `${order.currency}${order.tailor_payout}` },
              { label: "Order Date", value: new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
            ].map((s) => (
              <div key={s.label} className="bg-[#f7f5f0] px-5 py-4">
                <p className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#6b6757]">{s.label}</p>
                <p className="font-display text-[1rem] font-bold text-[#0f0e0b] mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
          {/* Left — tracker + details */}
          <div className="space-y-6">
            {/* Milestone tracker */}
            {order.milestones.length > 0 && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
                <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-6 pb-3 border-b border-[#e6e3da]">
                  Order Progress
                </h2>
                <div className="relative">
                  <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#e6e3da]" />
                  <div className="space-y-0">
                    {order.milestones.map((m, i) => {
                      const ms = milestoneStatus(order.milestones, i);
                      const date = m.completed_at
                        ? new Date(m.completed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
                        : null;
                      return (
                        <div key={m.id} className="relative flex gap-4 pb-6 last:pb-0">
                          <div className={`relative z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            ms === "completed" ? "bg-[#0f0e0b] border-[#0f0e0b]"
                            : ms === "current" ? "bg-[#8b6914] border-[#8b6914]"
                            : "bg-white border-[#d0ccbf]"
                          }`}>
                            {ms === "completed" && (
                              <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                            {ms === "current" && <div className="h-2 w-2 rounded-full bg-white" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-[0.88rem] font-semibold leading-tight ${ms === "pending" ? "text-[#9c9886]" : "text-[#0f0e0b]"}`}>
                                {m.label}
                              </p>
                              {date && <span className="text-[0.72rem] text-[#9c9886] shrink-0">{date}</span>}
                            </div>
                            <p className={`text-[0.8rem] mt-0.5 leading-[1.5] ${ms === "pending" ? "text-[#c0bcb2]" : "text-[#6b6757]"}`}>
                              {m.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Garment description */}
            {order.description && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
                <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                  Garment Description
                </h2>
                <p className="text-[0.88rem] text-[#1c1b17] leading-[1.7]">{order.description}</p>
              </div>
            )}

            {/* Tracking */}
            {isShipped && order.tracking_number && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
                <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                  Shipping & Tracking
                </h2>
                <div className="space-y-0">
                  {[
                    { label: "Carrier", value: order.tracking_carrier },
                    { label: "Tracking No.", value: order.tracking_number },
                    { label: "Shipped", value: order.shipped_at ? new Date(order.shipped_at).toLocaleDateString("en-GB") : null },
                    { label: "Delivered", value: order.delivered_at ? new Date(order.delivered_at).toLocaleDateString("en-GB") : "In transit" },
                  ].map((row) => (
                    <div key={row.label} className="flex gap-4 py-2.5 border-b border-[#f0ede6] last:border-0 text-[0.84rem]">
                      <span className="text-[0.65rem] font-bold tracking-[0.06em] uppercase text-[#6b6757] min-w-[100px] shrink-0 pt-0.5">{row.label}</span>
                      <span className="text-[#1c1b17] font-mono">{row.value ?? "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — escrow + actions */}
          <div className="space-y-4 lg:sticky lg:top-[100px]">
            {/* Escrow card */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] overflow-hidden">
              <div className="bg-[#0f0e0b] px-6 py-5">
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/50 mb-1">Escrow</p>
                <p className="font-display text-[1.1rem] font-bold text-white">
                  {escrowLabels[order.escrow_status] ?? order.escrow_status}
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-2 mb-5">
                  {[
                    { label: "Paid by customer", value: `${order.currency}${order.amount}` },
                    { label: "Platform fee", value: `${order.currency}${order.amount - order.tailor_payout}` },
                    { label: "Tailor payout", value: `${order.currency}${order.tailor_payout}` },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-[0.82rem]">
                      <span className="text-[#6b6757]">{row.label}</span>
                      <span className={`font-medium ${row.label === "Tailor payout" ? "text-[#0f0e0b]" : "text-[#1c1b17]"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#f7f5f0] border border-[#e6e3da] rounded-[4px] p-4 text-[0.78rem] text-[#6b6757] leading-[1.6]">
                  <span className="font-semibold text-[#1a5c38]">🔒 Funds secure.</span> Payment will be released to the tailor once your 7-day issue window closes with no disputes.
                </div>
              </div>
            </div>

            {/* Action buttons (client component) */}
            <OrderActions
              orderId={order.id}
              status={order.status}
              issueWindowCloseAt={order.issue_window_close_at}
              tailorProfileId={order.tailor.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
