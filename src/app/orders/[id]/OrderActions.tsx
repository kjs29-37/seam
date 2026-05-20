"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Demo: actions update local state only (no DB)

const issueTypes = [
  "Wrong measurements / poor fit",
  "Different fabric than agreed",
  "Quality not as described",
  "Missing details (buttons, pockets, etc.)",
  "Damaged on arrival",
  "Other",
];

interface Props {
  orderId: string;
  status: string;
  issueWindowCloseAt: string | null;
  tailorProfileId: string;
}

export default function OrderActions({ orderId, status, issueWindowCloseAt, tailorProfileId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [issueType, setIssueType] = useState(issueTypes[0]);
  const [customerDetail, setCustomerDetail] = useState("");

  async function handleConfirmDelivery() {
    setLoading("confirm");
    await new Promise((r) => setTimeout(r, 600));
    router.refresh();
    setLoading(null);
  }

  async function handleApprove() {
    setLoading("approve");
    await new Promise((r) => setTimeout(r, 600));
    router.refresh();
    setLoading(null);
  }

  async function handleRaiseDispute() {
    if (!customerDetail.trim()) return;
    setLoading("dispute");
    await new Promise((r) => setTimeout(r, 600));
    router.push(`/disputes/DIS-001`);
  }

  const isIssueWindow = status === "issue_window";
  const isShipped = status === "shipped";
  const canReview = status === "issue_window" || status === "completed";

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-[0.78rem] text-red-600 bg-red-50 border border-red-200 rounded-[4px] px-4 py-2.5">{error}</p>
      )}

      {/* Confirm Delivery */}
      {isShipped && (
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
          <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Awaiting Delivery</p>
          <p className="text-[0.8rem] text-[#6b6757] mb-4 leading-[1.5]">
            Once you receive your garment, confirm delivery to start your 7-day issue window.
          </p>
          <button
            onClick={handleConfirmDelivery}
            disabled={loading === "confirm"}
            className="w-full bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading === "confirm" && <span className="animate-spin">◌</span>}
            Confirm Delivery
          </button>
        </div>
      )}

      {/* Issue window — approve or raise */}
      {isIssueWindow && !showDisputeForm && (
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6 space-y-3">
          <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-2">Issue Window Open</p>
          {issueWindowCloseAt && (
            <p className="text-[0.8rem] text-[#6b6757] mb-4 leading-[1.5]">
              You have until{" "}
              <strong className="text-[#0f0e0b]">
                {new Date(issueWindowCloseAt).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
              </strong>{" "}
              to raise any issues.
            </p>
          )}
          <button
            onClick={handleApprove}
            disabled={loading === "approve"}
            className="w-full bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading === "approve" && <span className="animate-spin">◌</span>}
            Approve & Release Payment
          </button>
          <button
            onClick={() => setShowDisputeForm(true)}
            className="w-full border border-red-200 text-red-700 text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:bg-red-50 transition"
          >
            Raise an Issue
          </button>
        </div>
      )}

      {/* Dispute form */}
      {isIssueWindow && showDisputeForm && (
        <div className="bg-white border border-red-200 rounded-[6px] p-6 space-y-4">
          <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-red-700">Raise an Issue</p>
          <div>
            <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Issue Type</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#d0ccbf] rounded-[6px] text-[0.84rem] bg-[#fdfcf9] text-[#1c1b17] focus:outline-none focus:border-red-400"
            >
              {issueTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Describe the issue</label>
            <textarea
              rows={4}
              placeholder="Please describe the problem in detail…"
              value={customerDetail}
              onChange={(e) => setCustomerDetail(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#d0ccbf] rounded-[6px] text-[0.84rem] bg-[#fdfcf9] text-[#1c1b17] focus:outline-none focus:border-red-400 resize-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRaiseDispute}
              disabled={!customerDetail.trim() || loading === "dispute"}
              className="flex-1 bg-red-700 text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading === "dispute" && <span className="animate-spin">◌</span>}
              Submit Dispute
            </button>
            <button
              onClick={() => setShowDisputeForm(false)}
              className="border border-[#d0ccbf] text-[#6b6757] text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-4 py-3 rounded-[6px] hover:bg-[#f7f5f0] transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Leave review */}
      {canReview && (
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
          <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Your experience</p>
          <p className="text-[0.8rem] text-[#6b6757] mb-4 leading-[1.5]">
            Share your feedback to help other customers discover this tailor.
          </p>
          <Link
            href={`/orders/${orderId}/review`}
            className="flex items-center justify-center w-full bg-[#8b6914] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3 rounded-[6px] hover:opacity-80 transition-opacity"
          >
            Leave a Review ★
          </Link>
        </div>
      )}

      {/* Contact */}
      <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
        <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Need help?</p>
        <div className="space-y-2">
          <Link
            href={`/tailors/${tailorProfileId}`}
            className="flex items-center justify-center w-full border border-[#d0ccbf] text-[#1c1b17] text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
          >
            View Tailor Profile
          </Link>
          <Link
            href="/messages"
            className="flex items-center justify-center w-full border border-[#d0ccbf] text-[#6b6757] text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
          >
            Message Tailor
          </Link>
        </div>
      </div>
    </div>
  );
}
