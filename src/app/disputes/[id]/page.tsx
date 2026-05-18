import { notFound } from "next/navigation";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/StatusBadge";

type DisputeEvent = {
  actor: string;
  role: "customer" | "tailor" | "admin";
  action: string;
  detail?: string;
  date: string;
};

type Dispute = {
  id: string;
  orderId: string;
  customer: string;
  tailor: string;
  garment: string;
  amount: number;
  currency: string;
  status: string;
  raisedAt: string;
  issue: string;
  customerDetail: string;
  tailorResponse?: string;
  adminNotes?: string;
  timeline: DisputeEvent[];
};

const disputes: Record<string, Dispute> = {
  "DIS-001": {
    id: "DIS-001",
    orderId: "ORD-004",
    customer: "Fatima Malik",
    tailor: "Nairobi Tailors Co.",
    garment: "Wedding Dress",
    amount: 820,
    currency: "£",
    status: "dispute_under_review",
    raisedAt: "17 May 2026",
    issue: "Measurement discrepancy — bust 4cm off",
    customerDetail:
      "The dress arrived and the bust measurement is 4cm larger than my submitted measurements. I provided 88cm and the garment measures 92cm. The dress cannot be worn as-is for my wedding. I am requesting either a full remake or partial refund to cover local alterations.",
    tailorResponse:
      "We followed the measurements provided exactly. Some ease is added by default for structured garments. We are willing to offer a partial refund of £80 to cover alteration costs.",
    adminNotes: "Reviewing photos submitted by customer. Measurements match spec sheet on file. Tailor's ease allowance may not have been communicated clearly.",
    timeline: [
      { actor: "Fatima Malik", role: "customer", action: "Raised dispute", detail: "Measurement discrepancy — bust 4cm off", date: "17 May 2026, 09:14" },
      { actor: "SEAM", role: "admin", action: "Escrow paused", detail: "£820 held pending resolution", date: "17 May 2026, 09:15" },
      { actor: "Nairobi Tailors Co.", role: "tailor", action: "Submitted response", detail: "Offered £80 partial refund", date: "17 May 2026, 14:30" },
      { actor: "SEAM Admin", role: "admin", action: "Under review", detail: "Reviewing photo evidence and spec sheet", date: "18 May 2026, 10:00" },
    ],
  },
};

const roleColors: Record<string, string> = {
  customer: "bg-blue-50 text-blue-700 border-blue-200",
  tailor: "bg-[#faf4e1] text-[#8b6914] border-[#c49a2a]/30",
  admin: "bg-[#f7f5f0] text-[#6b6757] border-[#e6e3da]",
};

export default async function DisputeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dispute = disputes[id];
  if (!dispute) notFound();

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-3">
        <div className="mx-auto max-w-[1000px] flex items-center gap-2 text-[0.75rem] text-[#6b6757]">
          <Link href="/admin/dashboard" className="hover:text-[#1c1b17] transition">Admin</Link>
          <span className="text-[#d0ccbf]">›</span>
          <Link href="/admin/dashboard/disputes" className="hover:text-[#1c1b17] transition">Disputes</Link>
          <span className="text-[#d0ccbf]">›</span>
          <span className="text-[#1c1b17] font-medium">{dispute.id}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-6 py-10">
        {/* Dispute header */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914]">{dispute.id}</p>
                <span className="text-[#d0ccbf]">·</span>
                <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#6b6757]">Order {dispute.orderId}</p>
              </div>
              <h1 className="font-display text-[1.7rem] font-bold text-[#0f0e0b] leading-tight">{dispute.issue}</h1>
              <p className="text-[0.85rem] text-[#6b6757] mt-1">Raised {dispute.raisedAt} · {dispute.garment}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={dispute.status} />
              <span className="text-[0.65rem] font-bold tracking-[0.06em] uppercase text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                Escrow Paused
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[4px] overflow-hidden">
            {[
              { label: "Amount at Stake", value: `${dispute.currency}${dispute.amount}` },
              { label: "Customer", value: dispute.customer },
              { label: "Tailor", value: dispute.tailor },
              { label: "Raised", value: dispute.raisedAt },
            ].map((s) => (
              <div key={s.label} className="bg-[#f7f5f0] px-5 py-4">
                <p className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#6b6757]">{s.label}</p>
                <p className="font-display text-[0.95rem] font-bold text-[#0f0e0b] mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px] lg:items-start">
          {/* Left — details and timeline */}
          <div className="space-y-6">
            {/* Customer's account */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                Customer&apos;s Account
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-[#0f0e0b] flex items-center justify-center font-display text-[0.75rem] font-bold text-white">
                  {dispute.customer[0]}
                </div>
                <span className="text-[0.88rem] font-semibold text-[#0f0e0b]">{dispute.customer}</span>
              </div>
              <p className="text-[0.88rem] text-[#1c1b17] leading-[1.7]">{dispute.customerDetail}</p>
            </div>

            {/* Tailor's response */}
            {dispute.tailorResponse && (
              <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
                <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                  Tailor&apos;s Response
                </h2>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-[4px] bg-[#f7f5f0] flex items-center justify-center text-lg">🧵</div>
                  <span className="text-[0.88rem] font-semibold text-[#0f0e0b]">{dispute.tailor}</span>
                </div>
                <p className="text-[0.88rem] text-[#1c1b17] leading-[1.7]">{dispute.tailorResponse}</p>
              </div>
            )}

            {/* Admin notes */}
            {dispute.adminNotes && (
              <div className="bg-[#faf4e1] border border-[#c49a2a]/30 rounded-[6px] p-8">
                <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#8b6914] mb-4 pb-3 border-b border-[#c49a2a]/30">
                  Admin Notes
                </h2>
                <p className="text-[0.88rem] text-[#1c1b17] leading-[1.7]">{dispute.adminNotes}</p>
                <div className="mt-4">
                  <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#8b6914] mb-2">Add Note</label>
                  <textarea
                    rows={3}
                    placeholder="Add an internal note for this dispute..."
                    className="w-full px-4 py-3 border border-[#c49a2a]/40 rounded-[6px] text-[0.88rem] bg-white text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition resize-none"
                  />
                  <button className="mt-2 text-[0.72rem] font-semibold text-[#8b6914] hover:underline">Save note</button>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-6 pb-3 border-b border-[#e6e3da]">
                Dispute Timeline
              </h2>
              <div className="relative">
                <div className="absolute left-[11px] top-3 bottom-3 w-px bg-[#e6e3da]" />
                <div className="space-y-5">
                  {dispute.timeline.map((event, i) => (
                    <div key={i} className="relative flex gap-4">
                      <div className="relative z-10 h-6 w-6 rounded-full bg-[#0f0e0b] flex items-center justify-center shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[0.84rem] font-semibold text-[#0f0e0b]">{event.actor}</span>
                          <span className={`text-[0.6rem] font-bold tracking-[0.06em] uppercase border rounded-full px-2 py-0.5 ${roleColors[event.role]}`}>
                            {event.role}
                          </span>
                          <span className="text-[0.72rem] text-[#9c9886]">{event.date}</span>
                        </div>
                        <p className="text-[0.84rem] text-[#1c1b17]">{event.action}</p>
                        {event.detail && <p className="text-[0.78rem] text-[#6b6757] mt-0.5">{event.detail}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — admin actions */}
          <div className="space-y-4 lg:sticky lg:top-[100px]">
            <div className="bg-white border border-[#e6e3da] rounded-[6px] overflow-hidden">
              <div className="bg-[#0f0e0b] px-6 py-5">
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/50 mb-1">Admin Actions</p>
                <p className="font-display text-[1rem] font-bold text-white">Resolve Dispute</p>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full bg-[#1a5c38] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity">
                  ✓ Release Full Payment to Tailor
                </button>
                <button className="w-full bg-[#0f0e0b] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity">
                  Issue Partial Refund
                </button>
                <button className="w-full border border-red-200 text-red-700 text-[0.72rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:bg-red-50 transition">
                  Issue Full Refund to Customer
                </button>
                <button className="w-full border border-[#d0ccbf] text-[#6b6757] text-[0.72rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:bg-[#f7f5f0] transition">
                  Request More Information
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
              <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Quick Links</p>
              <div className="space-y-2">
                <Link href={`/orders/${dispute.orderId}`} className="block text-[0.78rem] text-[#8b6914] hover:underline">
                  View order {dispute.orderId} →
                </Link>
                <button className="block text-[0.78rem] text-[#8b6914] hover:underline text-left w-full">
                  Message customer →
                </button>
                <button className="block text-[0.78rem] text-[#8b6914] hover:underline text-left w-full">
                  Message tailor →
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
  return [{ id: "DIS-001" }];
}
