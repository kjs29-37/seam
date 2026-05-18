const trustItems = [
  {
    title: "Verified Tailors Only",
    description:
      "Every tailor on SEAM is manually reviewed and approved before appearing on the platform.",
  },
  {
    title: "Escrow-Protected Payments",
    description:
      "Your payment is held securely and only released after delivery, giving you full protection.",
  },
  {
    title: "Issue Resolution Window",
    description:
      "After delivery you have a protected window to raise concerns. We mediate on your behalf.",
  },
  {
    title: "Full Order Traceability",
    description:
      "Track your garment from production through quality check to shipping — always in the loop.",
  },
];

const escrowSteps = [
  "Customer pays → funds held securely in escrow by SEAM",
  "Tailor produces and ships the garment",
  "Customer receives delivery and has time to review",
  "No issues raised → payment released to tailor",
];

export default function TrustSection() {
  return (
    <section className="border-b border-[#e6e3da] bg-[#fdfcf9]">
      <div className="mx-auto max-w-[1280px] px-8 py-20">
        {/* Heading */}
        <div className="text-center mb-3">
          <h2 className="font-display text-[1.9rem] font-bold tracking-[-0.02em]">
            Built on Trust
          </h2>
        </div>
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="block flex-1 max-w-[60px] h-px bg-[#c49a2a]" />
          <span className="font-display text-[0.75rem] text-[#8b6914] tracking-[0.12em] uppercase">
            Why SEAM
          </span>
          <span className="block flex-1 max-w-[60px] h-px bg-[#c49a2a]" />
        </div>

        {/* Trust pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[6px] overflow-hidden mb-10">
          {trustItems.map((item) => (
            <div key={item.title} className="bg-white p-7 hover:bg-[#f7f5f0] transition-colors">
              <h3 className="font-display text-[1.05rem] font-bold text-[#0f0e0b] mb-3">
                {item.title}
              </h3>
              <p className="text-[0.82rem] text-[#6b6757] leading-[1.7]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Escrow strip */}
        <div className="bg-[#0f0e0b] text-white rounded-[6px] px-12 py-12 flex flex-col lg:flex-row gap-10 lg:items-center lg:justify-between">
          <div className="max-w-sm">
            <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#c49a2a] mb-3">
              Escrow Protection
            </p>
            <h3 className="font-display text-[1.4rem] font-bold mb-4">
              Your money moves only when you&apos;re satisfied.
            </h3>
            <p className="text-[0.86rem] text-white/60 leading-[1.7]">
              SEAM holds every payment in escrow until the garment is delivered and the
              issue window closes. Tailors only get paid when the job is done right.
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:w-[420px]">
            {escrowSteps.map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 border border-white/10 rounded-[6px] px-4 py-3 text-[0.84rem] text-white/80"
              >
                <span className="text-[#c49a2a] mt-0.5 shrink-0">—</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
