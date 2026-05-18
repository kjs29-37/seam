import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[#fdfcf9]">
      <div className="mx-auto max-w-[1280px] px-8 py-24 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#c49a2a]" />
          <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#8b6914]">
            Get Started
          </span>
          <span className="block w-8 h-px bg-[#c49a2a]" />
        </div>

        <h2 className="font-display font-black tracking-[-0.02em] text-[#0f0e0b] mb-6"
          style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
          Your perfect garment is{" "}
          <em className="italic font-normal text-[#8b6914]">one enquiry away.</em>
        </h2>

        <p className="max-w-lg mx-auto text-[#6b6757] text-[0.95rem] leading-[1.75] mb-10">
          Join SEAM today and discover what&apos;s possible when the world&apos;s best tailors
          are just a message away — with your payment protected every step.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/signup?role=customer"
            className="bg-[#0f0e0b] text-white text-[0.78rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity"
          >
            Join as Customer
          </Link>
          <Link
            href="/auth/signup?role=tailor"
            className="border border-[#d0ccbf] text-[#1c1b17] text-[0.78rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
          >
            Apply as Tailor
          </Link>
          <Link
            href="/auth/signup"
            className="text-[#6b6757] text-[0.78rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 hover:text-[#1c1b17] transition"
          >
            Request Early Access
          </Link>
        </div>
      </div>
    </section>
  );
}
