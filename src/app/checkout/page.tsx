"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { tailors } from "@/lib/mock-tailors";

const quoteData: Record<string, { garment: string; amount: number; tailorId: string; quoteId: string }> = {
  "QT-001": { garment: "Wedding Dress", amount: 620, tailorId: "nairobi-tailors", quoteId: "QT-001" },
  "QT-002": { garment: "Evening Gown", amount: 450, tailorId: "dakar-couture", quoteId: "QT-002" },
};

const platformFee = (amount: number) => Math.round(amount * 0.05);

function CheckoutForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const quoteId = searchParams.get("quote") ?? "QT-001";
  const tailorId = searchParams.get("tailor") ?? "lagos-bespoke";

  const tailor = tailors.find((t) => t.id === tailorId) ?? tailors[0];
  const quote = quoteData[quoteId] ?? { garment: "Bespoke Garment", amount: 380, tailorId, quoteId };

  const fee = platformFee(quote.amount);
  const total = quote.amount + fee;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [paying, setPaying] = useState(false);

  function formatCard(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  }
  function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + " / " + digits.slice(2);
    return digits;
  }

  async function handlePay() {
    if (!name || cardNumber.replace(/\s/g, "").length < 16 || expiry.length < 4 || cvc.length < 3) return;
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1800));
    router.push("/orders/ORD-001?paid=1");
  }

  const ready = name && cardNumber.replace(/\s/g, "").length === 16 && expiry.length >= 4 && cvc.length >= 3;

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-4">
        <div className="mx-auto max-w-[900px] flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914]">Secure Checkout</p>
            <p className="text-[0.9rem] font-semibold text-[#0f0e0b]">Complete your payment</p>
          </div>
          <Link href="/customer/dashboard" className="text-[0.75rem] text-[#6b6757] hover:text-[#1c1b17] transition">
            ← Dashboard
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[900px] px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">

          {/* Left — payment form */}
          <div className="space-y-6">
            {/* Escrow notice */}
            <div className="bg-[#e8f2ec] border border-[#c0d9c8] rounded-[6px] p-5">
              <p className="text-[0.82rem] font-semibold text-[#1a5c38] mb-1">🔒 Your payment is escrow-protected</p>
              <p className="text-[0.78rem] text-[#1a5c38] leading-[1.6]">
                SEAM holds your funds securely. The tailor is only paid after you receive and approve your garment.
                You have a 7-day issue window after delivery.
              </p>
            </div>

            {/* Card form */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-6 pb-3 border-b border-[#e6e3da]">
                Card Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Davidson"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePay}
                disabled={!ready || paying}
                className="mt-6 w-full bg-[#0f0e0b] text-white text-[0.78rem] font-semibold tracking-[0.06em] uppercase py-4 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {paying ? (
                  <>
                    <span className="animate-spin text-[1rem]">◌</span>
                    Processing payment…
                  </>
                ) : (
                  <>🔒 Pay £{total.toLocaleString()} securely</>
                )}
              </button>

              <p className="mt-4 text-center text-[0.72rem] text-[#9c9886]">
                Powered by Stripe · 256-bit SSL encryption · PCI DSS compliant
              </p>
            </div>

            {/* Billing address placeholder */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                Billing Address
              </h2>
              <p className="text-[0.82rem] text-[#9c9886]">Saved address: 14 Blossom St, London E1 6PL, UK</p>
              <button className="mt-3 text-[0.75rem] text-[#8b6914] hover:underline">Use a different address</button>
            </div>
          </div>

          {/* Right — order summary */}
          <div className="lg:sticky lg:top-[100px] space-y-4">
            <div className="bg-white border border-[#e6e3da] rounded-[6px] overflow-hidden">
              <div className="bg-[#0f0e0b] px-6 py-5">
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/50 mb-1">Order Summary</p>
                <p className="font-display text-[1.1rem] font-bold text-white">{quote.garment}</p>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#e6e3da]">
                  <div className="h-10 w-10 bg-[#f7f5f0] rounded-[6px] flex items-center justify-center text-xl shrink-0">🧵</div>
                  <div>
                    <p className="text-[0.84rem] font-semibold text-[#0f0e0b]">{tailor.studioName}</p>
                    <p className="text-[0.72rem] text-[#6b6757]">{tailor.location}</p>
                  </div>
                </div>

                <div className="space-y-0">
                  {[
                    { label: "Garment price", value: `£${quote.amount}` },
                    { label: "Platform fee (5%)", value: `£${fee}` },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-[#f0ede6] text-[0.84rem]">
                      <span className="text-[#6b6757]">{row.label}</span>
                      <span className="text-[#1c1b17]">{row.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-[0.85rem] font-bold text-[#0f0e0b]">Total</span>
                    <span className="font-display text-[1.3rem] font-bold text-[#0f0e0b]">£{total}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f7f5f0] border border-[#e6e3da] rounded-[6px] p-5 space-y-3">
              <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757]">What happens next</p>
              {[
                "Payment held in escrow by SEAM",
                "Tailor begins production",
                "Garment shipped to you",
                "7-day issue window after delivery",
                "Funds released to tailor if no issues",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3 text-[0.78rem] text-[#6b6757]">
                  <span className="h-4 w-4 shrink-0 rounded-full border border-[#8b6914] text-[#8b6914] flex items-center justify-center text-[0.55rem] font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfcf9]" />}>
      <CheckoutForm />
    </Suspense>
  );
}
