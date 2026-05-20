"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

function getCookie(name: string): string | undefined {
  return document.cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith(name + "="))?.split("=")[1];
}

const criteria = [
  { key: "fit", label: "Fit & Accuracy" },
  { key: "quality", label: "Craftsmanship & Quality" },
  { key: "communication", label: "Communication" },
  { key: "delivery", label: "Delivery Speed" },
];

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-[1.6rem] transition-transform hover:scale-110 focus:outline-none"
          style={{ color: star <= (hover || value) ? "#8b6914" : "#d0ccbf" }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function LeaveReviewPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [overall, setOverall] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [publicName, setPublicName] = useState("");
  const [dashboardHref, setDashboardHref] = useState("/customer/dashboard");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const name = getCookie("seam_name") ?? "";
    const role = getCookie("seam_role") ?? "";
    // Abbreviate to "First L." for display name default
    const parts = decodeURIComponent(name).split(" ");
    const abbreviated = parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
    setPublicName(abbreviated);
    setDashboardHref(
      role === "tailor" ? "/tailor/dashboard" :
      role === "admin"  ? "/admin/dashboard"  :
      "/customer/dashboard"
    );
  }, []);

  function setRating(key: string, val: number) {
    setRatings((prev) => ({ ...prev, [key]: val }));
  }

  const canSubmit = overall > 0 && comment.trim().length >= 20;

  async function handleSubmit() {
    if (!canSubmit) return;
    setSubmitted(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push(`/orders/${orderId}?reviewed=1`);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fdfcf9] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="h-16 w-16 bg-[#e8f2ec] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">⭐</div>
          <h1 className="font-display text-[2rem] font-bold text-[#0f0e0b] mb-3">Review Submitted</h1>
          <p className="text-[#6b6757] text-[0.9rem] leading-[1.75] mb-8">
            Thank you for your feedback. It helps other customers find trusted tailors on SEAM.
          </p>
          <Link
            href={dashboardHref}
            className="bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-4">
        <div className="mx-auto max-w-[700px] flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914]">Leave a Review</p>
            <p className="text-[0.9rem] font-semibold text-[#0f0e0b]">Order {orderId}</p>
          </div>
          <Link href={`/orders/${orderId}`} className="text-[0.75rem] text-[#6b6757] hover:text-[#1c1b17] transition">
            ← Back to order
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[700px] px-6 py-10 space-y-6">
        {/* Overall rating */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <h2 className="font-display text-[1.4rem] font-bold text-[#0f0e0b] mb-1">Overall Rating</h2>
          <p className="text-[0.85rem] text-[#6b6757] mb-6">How was your overall experience with this tailor?</p>
          <StarPicker value={overall} onChange={setOverall} />
          {overall > 0 && (
            <p className="mt-2 text-[0.78rem] text-[#8b6914]">
              {["", "Poor", "Below average", "Good", "Very good", "Excellent"][overall]}
            </p>
          )}
        </div>

        {/* Category ratings */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-6 pb-3 border-b border-[#e6e3da]">
            Rate by Category
          </h2>
          <div className="space-y-5">
            {criteria.map((c) => (
              <div key={c.key} className="flex items-center justify-between gap-4">
                <p className="text-[0.88rem] font-medium text-[#1c1b17] w-44 shrink-0">{c.label}</p>
                <StarPicker value={ratings[c.key] ?? 0} onChange={(v) => setRating(c.key, v)} />
              </div>
            ))}
          </div>
        </div>

        {/* Written review */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
            Written Review
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                Your review <span className="text-[#9c9886] font-normal normal-case tracking-normal">(min. 20 characters)</span>
              </label>
              <textarea
                rows={5}
                placeholder="Describe your experience — the fit, quality, communication, delivery speed, and anything that stood out..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition resize-none"
              />
              <p className="mt-1.5 text-right text-[0.72rem] text-[#9c9886]">{comment.length} characters</p>
            </div>

            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                Display name
              </label>
              <input
                type="text"
                value={publicName}
                onChange={(e) => setPublicName(e.target.value)}
                className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition"
              />
              <p className="mt-1.5 text-[0.72rem] text-[#9c9886]">This is how your name appears on the tailor&apos;s profile.</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/orders/${orderId}`}
            className="border border-[#d0ccbf] text-[#6b6757] text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-6 py-3 rounded-[6px] hover:bg-[#f7f5f0] transition"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="bg-[#8b6914] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Submit Review →
          </button>
        </div>
      </div>
    </div>
  );
}
