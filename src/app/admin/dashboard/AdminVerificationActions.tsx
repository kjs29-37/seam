"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveApplication, rejectApplication } from "@/lib/supabase/actions";

export default function AdminVerificationActions({ applicationId }: { applicationId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [done, setDone] = useState<"approved" | "rejected" | null>(null);
  const [error, setError] = useState("");

  async function handleApprove() {
    setLoading("approve");
    setError("");
    const result = await approveApplication(applicationId);
    if (result.error) {
      setError(result.error);
      setLoading(null);
    } else {
      setDone("approved");
      router.refresh();
    }
  }

  async function handleReject() {
    setLoading("reject");
    setError("");
    const result = await rejectApplication(applicationId);
    if (result.error) {
      setError(result.error);
      setLoading(null);
    } else {
      setDone("rejected");
      router.refresh();
    }
  }

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
    <div className="flex flex-col gap-2">
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
      {error && <p className="text-[0.68rem] text-red-600">{error}</p>}
    </div>
  );
}
