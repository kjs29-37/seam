export type OrderStatus =
  | "pending_payment"
  | "in_production"
  | "shipped"
  | "delivered"
  | "issue_window"
  | "completed"
  | "disputed"
  | "cancelled";

export type EscrowStatus = "unpaid" | "held" | "released" | "refunded" | "paused";

export type Milestone = {
  label: string;
  description: string;
  date?: string;
  status: "completed" | "current" | "pending";
};

export type Order = {
  id: string;
  tailorId: string;
  tailorName: string;
  tailorLocation: string;
  customerId: string;
  customerName: string;
  garmentType: string;
  description: string;
  fitPreference: string;
  amount: number;
  tailorPayout: number;
  currency: string;
  status: OrderStatus;
  escrowStatus: EscrowStatus;
  createdAt: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  issueWindowCloseAt?: string;
  completedAt?: string;
  trackingNumber?: string;
  trackingCarrier?: string;
  milestones: Milestone[];
};

export const orders: Order[] = [
  {
    id: "ORD-001",
    tailorId: "lagos-bespoke",
    tailorName: "Lagos Bespoke Studio",
    tailorLocation: "Lagos, Nigeria",
    customerId: "cust-001",
    customerName: "Jane Davidson",
    garmentType: "2-Piece Suit",
    description: "Classic navy 2-piece suit with slim cut, notched lapel. Navy wool-blend fabric.",
    fitPreference: "Slim Fit",
    amount: 380,
    tailorPayout: 342,
    currency: "£",
    status: "in_production",
    escrowStatus: "held",
    createdAt: "12 May 2026",
    paidAt: "12 May 2026",
    milestones: [
      { label: "Order Placed", description: "Enquiry accepted and order confirmed", date: "12 May 2026", status: "completed" },
      { label: "Payment Received", description: "£380 held securely in SEAM escrow", date: "12 May 2026", status: "completed" },
      { label: "In Production", description: "Tailor has begun cutting and sewing your garment", date: "14 May 2026", status: "current" },
      { label: "Shipped", description: "Garment dispatched with tracking number", status: "pending" },
      { label: "Delivered", description: "You confirm receipt of your garment", status: "pending" },
      { label: "Completed", description: "7-day issue window closed, payment released to tailor", status: "pending" },
    ],
  },
  {
    id: "ORD-002",
    tailorId: "accra-threads",
    tailorName: "Accra Threads",
    tailorLocation: "Accra, Ghana",
    customerId: "cust-001",
    customerName: "Jane Davidson",
    garmentType: "Kente Kaftan",
    description: "Traditional kente-print kaftan with embroidered collar in gold thread.",
    fitPreference: "Relaxed Fit",
    amount: 210,
    tailorPayout: 189,
    currency: "£",
    status: "shipped",
    escrowStatus: "held",
    createdAt: "2 May 2026",
    paidAt: "2 May 2026",
    shippedAt: "14 May 2026",
    trackingNumber: "DHL-7734920011",
    trackingCarrier: "DHL Express",
    milestones: [
      { label: "Order Placed", description: "Enquiry accepted and order confirmed", date: "2 May 2026", status: "completed" },
      { label: "Payment Received", description: "£210 held securely in SEAM escrow", date: "2 May 2026", status: "completed" },
      { label: "In Production", description: "Tailor cut and sewed your kaftan", date: "5 May 2026", status: "completed" },
      { label: "Shipped", description: "Dispatched via DHL Express · DHL-7734920011", date: "14 May 2026", status: "current" },
      { label: "Delivered", description: "You confirm receipt of your garment", status: "pending" },
      { label: "Completed", description: "7-day issue window closed, payment released to tailor", status: "pending" },
    ],
  },
  {
    id: "ORD-003",
    tailorId: "nairobi-tailors",
    tailorName: "Nairobi Tailors Co.",
    tailorLocation: "Nairobi, Kenya",
    customerId: "cust-002",
    customerName: "Kofi Asante",
    garmentType: "Ankara Blouse",
    description: "Ankara print blouse with puff sleeves and contrasting button placket.",
    fitPreference: "Regular Fit",
    amount: 140,
    tailorPayout: 126,
    currency: "£",
    status: "issue_window",
    escrowStatus: "held",
    createdAt: "22 Apr 2026",
    paidAt: "22 Apr 2026",
    shippedAt: "1 May 2026",
    deliveredAt: "11 May 2026",
    issueWindowCloseAt: "18 May 2026",
    trackingNumber: "UPS-889002341",
    trackingCarrier: "UPS",
    milestones: [
      { label: "Order Placed", description: "Enquiry accepted and order confirmed", date: "22 Apr 2026", status: "completed" },
      { label: "Payment Received", description: "£140 held securely in SEAM escrow", date: "22 Apr 2026", status: "completed" },
      { label: "In Production", description: "Tailor cut and sewed your blouse", date: "25 Apr 2026", status: "completed" },
      { label: "Shipped", description: "Dispatched via UPS · UPS-889002341", date: "1 May 2026", status: "completed" },
      { label: "Delivered", description: "Garment received and confirmed", date: "11 May 2026", status: "current" },
      { label: "Completed", description: "Issue window closes 18 May — payment released if no issues raised", status: "pending" },
    ],
  },
];

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}
