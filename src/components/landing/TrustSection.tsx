const trustItems = [
  {
    title: "Verified Tailors Only",
    description:
      "Every tailor on SEAM is manually reviewed and approved by our team before appearing on the platform.",
  },
  {
    title: "Escrow-Protected Payments",
    description:
      "Your payment is held securely and only released after delivery, giving you full protection on every order.",
  },
  {
    title: "Issue Resolution Window",
    description:
      "After delivery, you have a protected window to raise any concerns. We mediate and resolve on your behalf.",
  },
  {
    title: "Full Order Traceability",
    description:
      "Track your garment from production through quality check to shipping. You're never left in the dark.",
  },
];

export default function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
          Why SEAM
        </p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Built on trust, from payment to delivery.
        </h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Remote tailoring requires a new kind of trust. SEAM is designed from the
          ground up to protect both customers and tailors at every step.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 leading-7 text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-slate-900 to-blue-500/10 p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
              Escrow Protection
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              Your money moves only when you&apos;re satisfied.
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-300">
              SEAM holds every payment in escrow until the garment is delivered and the
              issue window closes. Tailors only get paid when the job is done right.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Customer pays → funds held securely in escrow",
              "Tailor produces and ships the garment",
              "Customer receives delivery and has time to review",
              "No issues raised → payment released to tailor",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
