const steps = [
  {
    number: "01",
    title: "Discover a Tailor",
    description:
      "Browse verified tailors from around the world. Filter by garment type, region, price range, and rating.",
  },
  {
    number: "02",
    title: "Submit Your Brief",
    description:
      "Upload inspiration images, submit your measurements, describe the garment, and request a consultation.",
  },
  {
    number: "03",
    title: "Accept & Pay Securely",
    description:
      "Receive a detailed quote, accept it, and pay through SEAM. Your payment is held in escrow until delivery.",
  },
  {
    number: "04",
    title: "Track & Receive",
    description:
      "Follow your order through production and shipping. Review or report any issues within the protection window.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-[#e6e3da] bg-white">
      <div className="mx-auto max-w-[1280px] px-8 py-20">
        {/* Heading */}
        <div className="text-center mb-3">
          <h2 className="font-display text-[1.9rem] font-bold tracking-[-0.02em]">
            How It Works
          </h2>
        </div>
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className="block flex-1 max-w-[60px] h-px bg-[#c49a2a]" />
          <span className="font-display text-[0.75rem] text-[#8b6914] tracking-[0.12em] uppercase">
            The Process
          </span>
          <span className="block flex-1 max-w-[60px] h-px bg-[#c49a2a]" />
        </div>

        {/* Steps grid with 1px border gaps (Harrods style) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[6px] overflow-hidden"
        >
          {steps.map((step) => (
            <div key={step.number} className="bg-white p-8 hover:bg-[#f7f5f0] transition-colors">
              <div className="text-[0.68rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-4">
                {step.number}
              </div>
              <h3 className="font-display text-[1.15rem] font-bold text-[#0f0e0b] mb-3">
                {step.title}
              </h3>
              <p className="text-[0.84rem] text-[#6b6757] leading-[1.7]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
