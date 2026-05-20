"use client";

import { useState } from "react";

export default function AdminVerificationActions({ applicationId }: { applicationId: string }) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [done, setDone] = useState<"approved" | "rejected" | null>(null);

  async function handleApprove() {
    setLoading("approve");
    await new Promise((r) => setTimeout(r, 600));
    setDone("approved");
    setLoading(null);
  }

  async function handleReject() {
    setLoading("reject");
    await new Promise((r) => setTimeout(r, 600));
    setDone("rejected");
    setLoading(null);
  }

  // suppress unused var warning for demo
  void applicationId;

  if (done === "approved") {
    return (
      <span className="text-[0.72rem] font-semibold text-[#1a5c38] bg-[#e8f2ec] border border-[#c0d9c8] px-3 py-1.5 rounded-[6px]">
        ✓ Approved
      </span>
    );
  }

  if (done === "rejected") {
    return (
      <span className="text-[0.72rem] font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-1.5 rounded-[6px]">
        ✕ Rejected
      </span>
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={handleApprove}
        disabled={!!loading}
        className="bg-[#1a5c38] text-white text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center gap-1.5"
      >
        {loading === "approve" && <span className="animate-spin inline-block">◌</span>}
        Approve
      </button>
      <button
        onClick={handleReject}
        disabled={!!loading}
        className="border border-red-200 text-red-700 text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2 rounded-[6px] hover:bg-red-50 transition disabled:opacity-40 flex items-center gap-1.5"
      >
        {loading === "reject" && <span className="animate-spin inline-block">◌</span>}
        Reject
      </button>
    </div>
  );
}
