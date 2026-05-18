import Link from "next/link";

export default function Hero() {
  return (
    <section className="text-center border-b border-[#e6e3da] bg-[#fdfcf9]" style={{ padding: "88px 32px 72px" }}>
      <div className="mx-auto max-w-[1280px]">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-[#c49a2a]" />
          <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#8b6914]">
            Premium Remote Tailoring
          </span>
          <span className="block w-8 h-px bg-[#c49a2a]" />
        </div>

        {/* Headline */}
        <h1 className="font-display font-black tracking-[-0.03em] leading-[1.0] text-[#0f0e0b] mb-6"
          style={{ fontSize: "clamp(3.2rem, 6vw, 5.8rem)" }}>
          The world&apos;s tailors,{" "}
          <em className="font-normal italic text-[#8b6914]">at your fingertips.</em>
        </h1>

        <p className="max-w-[480px] mx-auto text-[#6b6757] text-[1rem] leading-[1.75] font-light mb-10">
          SEAM connects you with verified tailors from around the world. Order custom
          clothing from anywhere — with your payment protected every step of the way.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
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
            href="#how-it-works"
            className="text-[#6b6757] text-[0.78rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 hover:text-[#1c1b17] transition"
          >
            How It Works →
          </Link>
        </div>

        {/* Stats pill */}
        <div className="inline-flex items-center border border-[#d0ccbf] rounded-full px-9 py-4 gap-7 bg-white">
          {[
            { num: "200+", label: "Verified Tailors" },
            null,
            { num: "50+", label: "Countries" },
            null,
            { num: "100%", label: "Escrow Protected" },
          ].map((item, i) =>
            item ? (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display text-[1.5rem] font-bold text-[#0f0e0b] leading-none">
                  {item.num}
                </span>
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.08em] text-[#6b6757] mt-1">
                  {item.label}
                </span>
              </div>
            ) : (
              <div key={i} className="w-px h-9 bg-[#e6e3da]" />
            )
          )}
        </div>
      </div>
    </section>
  );
}
