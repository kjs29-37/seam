const statusStyles: Record<string, string> = {
  in_production: "bg-blue-50 text-blue-700 border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-[#e8f2ec] text-[#1a5c38] border-[#c0d9c8]",
  completed: "bg-[#e8f2ec] text-[#1a5c38] border-[#c0d9c8]",
  issue_window_open: "bg-amber-50 text-amber-700 border-amber-200",
  issue_raised: "bg-red-50 text-red-700 border-red-200",
  dispute_under_review: "bg-red-50 text-red-700 border-red-200",
  payment_released: "bg-[#e8f2ec] text-[#1a5c38] border-[#c0d9c8]",
  quote_received: "bg-amber-50 text-amber-700 border-amber-200",
  quote_accepted: "bg-blue-50 text-blue-700 border-blue-200",
  payment_held_in_escrow: "bg-blue-50 text-blue-700 border-blue-200",
  enquiry_sent: "bg-[#f7f5f0] text-[#6b6757] border-[#e6e3da]",
  cancelled: "bg-red-50 text-red-700 border-red-200",
  sent: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-[#e8f2ec] text-[#1a5c38] border-[#c0d9c8]",
  rejected: "bg-red-50 text-red-700 border-red-200",
  revised: "bg-blue-50 text-blue-700 border-blue-200",
  expired: "bg-[#f7f5f0] text-[#6b6757] border-[#e6e3da]",
  held_in_escrow: "bg-blue-50 text-blue-700 border-blue-200",
  released_to_tailor: "bg-[#e8f2ec] text-[#1a5c38] border-[#c0d9c8]",
  refunded: "bg-[#f7f5f0] text-[#6b6757] border-[#e6e3da]",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  verified: "bg-[#e8f2ec] text-[#1a5c38] border-[#c0d9c8]",
};

const labelMap: Record<string, string> = {
  in_production: "In Production",
  payment_held_in_escrow: "Held in Escrow",
  issue_window_open: "Issue Window",
  dispute_under_review: "Dispute",
  payment_released: "Payment Released",
  released_to_tailor: "Released",
  quote_received: "Quote Received",
  quote_accepted: "Quote Accepted",
  enquiry_sent: "Enquiry Sent",
};

export default function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? "bg-[#f7f5f0] text-[#6b6757] border-[#e6e3da]";
  const label =
    labelMap[status] ??
    status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <span className={`inline-flex items-center border rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-[0.04em] uppercase ${style}`}>
      {label}
    </span>
  );
}
