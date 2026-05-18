const steps = [
  {
    number: "01",
    title: "Discover a Tailor",
    description:
      "Browse verified tailors from around the world. Filter by garment type, region, price range, and rating to find your perfect match.",
  },
  {
    number: "02",
    title: "Submit Your Brief",
    description:
      "Upload inspiration images, submit your measurements, describe the garment, and request a consultation if needed.",
  },
  {
    number: "03",
    title: "Accept & Pay Securely",
    description:
      "Receive a detailed quote from your tailor. Accept it and pay through SEAM — your payment is held in escrow until delivery.",
  },
  {
    number: "04",
    title: "Track & Receive",
    description:
      "Follow your order through production and shipping. Once delivered, review or report any issues within the protection window.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-white/10 bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
              The Process
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Custom clothing, simplified end-to-end.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              SEAM manages the entire journey from discovery to delivery. Every order is
              protected, traceable, and backed by our escrow payment system.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-400">
              No more uncertainty. You always know where your order is, what it cost,
              and what happens if something goes wrong.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/15 text-sm font-semibold text-emerald-200">
                  {step.number}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
