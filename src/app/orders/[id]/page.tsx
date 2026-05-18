import { orders, getOrder } from "@/lib/mock-orders";
import { notFound } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/StatusBadge";

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

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrder(id);
  if (!order) notFound();

  const isIssueWindow = order.status === "issue_window";
  const isShipped = order.status === "shipped" || order.status === "delivered" || order.status === "issue_window" || order.status === "completed";

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-3">
        <div className="mx-auto max-w-[1000px] flex items-center gap-2 text-[0.75rem] text-[#6b6757]">
          <Link href="/" className="hover:text-[#1c1b17] transition">Home</Link>
          <span className="text-[#d0ccbf]">›</span>
          <Link href="/customer/dashboard" className="hover:text-[#1c1b17] transition">Dashboard</Link>
          <span className="text-[#d0ccbf]">›</span>
          <span className="text-[#1c1b17] font-medium">Order {order.id}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-6 py-10">
        {/* Order header */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914] mb-1">{order.id}</p>
              <h1 className="font-display text-[1.8rem] font-bold text-[#0f0e0b] leading-tight">{order.garmentType}</h1>
              <p className="text-[0.85rem] text-[#6b6757] mt-1">by {order.tailorName} · {order.tailorLocation}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={order.status} />
              <span className={`inline-flex items-center border rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.04em] uppercase ${escrowColors[order.escrowStatus]}`}>
                {escrowLabels[order.escrowStatus]}
              </span>
            </div>
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[4px] overflow-hidden">
            {[
              { label: "Order Total", value: `${order.currency}${order.amount}` },
              { label: "Tailor Payout", value: `${order.currency}${order.tailorPayout}` },
              { label: "Order Date", value: order.createdAt },
              { label: "Fit", value: order.fitPreference },
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
            {/* Status tracker */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-6 pb-3 border-b border-[#e6e3da]">
                Order Progress
              </h2>

              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#e6e3da]" />

                <div className="space-y-0">
                  {order.milestones.map((m, i) => (
                    <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                      {/* Dot */}
                      <div className={`relative z-10 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        m.status === "completed"
                          ? "bg-[#0f0e0b] border-[#0f0e0b]"
                          : m.status === "current"
                          ? "bg-[#8b6914] border-[#8b6914]"
                          : "bg-white border-[#d0ccbf]"
                      }`}>
                        {m.status === "completed" && (
                          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {m.status === "current" && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-[0.88rem] font-semibold leading-tight ${
                            m.status === "pending" ? "text-[#9c9886]" : "text-[#0f0e0b]"
                          }`}>{m.label}</p>
                          {m.date && (
                            <span className="text-[0.72rem] text-[#9c9886] shrink-0">{m.date}</span>
                          )}
                        </div>
                        <p className={`text-[0.8rem] mt-0.5 leading-[1.5] ${
                          m.status === "pending" ? "text-[#c0bcb2]" : "text-[#6b6757]"
                        }`}>{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Garment description */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                Garment Description
              </h2>
              <p className="text-[0.88rem] text-[#1c1b17] leading-[1.7]">{order.description}</p>
            </div>

            {/* Tracking info */}
            {isShipped && order.trackingNumber && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
                <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                  Shipping & Tracking
                </h2>
                <div className="space-y-0">
                  {[
                    { label: "Carrier", value: order.trackingCarrier },
                    { label: "Tracking No.", value: order.trackingNumber },
                    { label: "Shipped", value: order.shippedAt },
                    { label: "Delivered", value: order.deliveredAt ?? "In transit" },
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

          {/* Right — actions + escrow */}
          <div className="space-y-4 lg:sticky lg:top-[100px]">
            {/* Escrow status card */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] overflow-hidden">
              <div className="bg-[#0f0e0b] px-6 py-5">
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/50 mb-1">Escrow</p>
                <p className="font-display text-[1.1rem] font-bold text-white">{escrowLabels[order.escrowStatus]}</p>
              </div>
              <div className="p-6">
                <div className="space-y-2 mb-5">
                  {[
                    { label: "Paid by customer", value: `${order.currency}${order.amount}` },
                    { label: "Platform fee", value: `${order.currency}${order.amount - order.tailorPayout}` },
                    { label: "Tailor payout", value: `${order.currency}${order.tailorPayout}` },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-[0.82rem]">
                      <span className="text-[#6b6757]">{row.label}</span>
                      <span className={`font-medium ${row.label === "Tailor payout" ? "text-[#0f0e0b]" : "text-[#1c1b17]"}`}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#f7f5f0] border border-[#e6e3da] rounded-[4px] p-4 text-[0.78rem] text-[#6b6757] leading-[1.6]">
                  <span className="font-semibold text-[#1a5c38]">🔒 Funds secure.</span> Payment will be released to the tailor once your 7-day issue window closes with no disputes.
                </div>
              </div>
            </div>

            {/* Action buttons */}
            {isIssueWindow && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6 space-y-3">
                <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-2">Issue Window Open</p>
                <p className="text-[0.8rem] text-[#6b6757] mb-4 leading-[1.5]">
                  You have until <strong className="text-[#0f0e0b]">{order.issueWindowCloseAt}</strong> to raise any issues with your garment.
                </p>
                <button className="w-full bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity">
                  Approve & Release Payment
                </button>
                <button className="w-full border border-red-200 text-red-700 text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:bg-red-50 transition">
                  Raise an Issue
                </button>
              </div>
            )}

            {order.status === "shipped" && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
                <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Awaiting Delivery</p>
                <p className="text-[0.8rem] text-[#6b6757] mb-4 leading-[1.5]">
                  Once you receive your garment, confirm delivery to start your 7-day issue window.
                </p>
                <button className="w-full bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity">
                  Confirm Delivery
                </button>
              </div>
            )}

            {/* Leave review — shown for delivered / issue_window / completed */}
            {(order.status === "issue_window" || order.status === "completed") && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
                <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Your experience</p>
                <p className="text-[0.8rem] text-[#6b6757] mb-4 leading-[1.5]">
                  Share your feedback to help other customers discover this tailor.
                </p>
                <Link
                  href={`/orders/${order.id}/review`}
                  className="flex items-center justify-center w-full bg-[#8b6914] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity"
                >
                  Leave a Review ★
                </Link>
              </div>
            )}

            {/* Contact tailor */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
              <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Need help?</p>
              <div className="space-y-2">
                <Link
                  href={`/tailors/${order.tailorId}`}
                  className="flex items-center justify-center w-full border border-[#d0ccbf] text-[#1c1b17] text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
                >
                  View Tailor Profile
                </Link>
                <button className="flex items-center justify-center w-full border border-[#d0ccbf] text-[#6b6757] text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition">
                  Message Tailor
                </button>
                <button className="flex items-center justify-center w-full border border-[#d0ccbf] text-[#6b6757] text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition">
                  Contact SEAM Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}
