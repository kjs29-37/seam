const statusStyles: Record<string, string> = {
  // Order statuses
  in_production: "bg-blue-400/15 text-blue-300",
  shipped: "bg-purple-400/15 text-purple-300",
  delivered: "bg-emerald-400/15 text-emerald-300",
  completed: "bg-emerald-400/15 text-emerald-300",
  issue_window_open: "bg-amber-400/15 text-amber-300",
  issue_raised: "bg-red-400/15 text-red-300",
  dispute_under_review: "bg-red-400/15 text-red-300",
  payment_released: "bg-emerald-400/15 text-emerald-300",
  quote_received: "bg-amber-400/15 text-amber-300",
  quote_accepted: "bg-blue-400/15 text-blue-300",
  payment_held_in_escrow: "bg-blue-400/15 text-blue-300",
  enquiry_sent: "bg-slate-400/15 text-slate-300",
  cancelled: "bg-red-400/15 text-red-300",
  // Quote statuses
  sent: "bg-amber-400/15 text-amber-300",
  accepted: "bg-emerald-400/15 text-emerald-300",
  rejected: "bg-red-400/15 text-red-300",
  revised: "bg-blue-400/15 text-blue-300",
  expired: "bg-slate-400/15 text-slate-300",
  // Payment statuses
  held_in_escrow: "bg-blue-400/15 text-blue-300",
  released_to_tailor: "bg-emerald-400/15 text-emerald-300",
  refunded: "bg-slate-400/15 text-slate-300",
  // Tailor verification
  pending: "bg-amber-400/15 text-amber-300",
  verified: "bg-emerald-400/15 text-emerald-300",
  rejected_verification: "bg-red-400/15 text-red-300",
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
  rejected_verification: "Rejected",
};

type Props = { status: string };

export default function StatusBadge({ status }: Props) {
  const style = statusStyles[status] ?? "bg-slate-400/15 text-slate-300";
  const label = labelMap[status] ?? status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}
