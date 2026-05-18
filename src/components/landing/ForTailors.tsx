import Link from "next/link";

const benefits = [
  "Reach customers you could never access locally",
  "Receive structured digital briefs with measurements and inspiration",
  "Manage quotes, orders, and payments in one dashboard",
  "Get paid securely after every completed order",
  "Build your reputation with verified reviews",
  "Appear on a growing global marketplace",
];

export default function ForTailors() {
  return (
    <section id="for-tailors" className="border-b border-[#e6e3da] bg-white">
      <div className="mx-auto max-w-[1280px] px-8 py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-3">
              For Tailors
            </p>
            <h2 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-[#0f0e0b] mb-5">
              Grow your craft<br />beyond your city.
            </h2>
            <p className="text-[#6b6757] text-[0.95rem] leading-[1.75] mb-8">
              SEAM gives talented tailors a global storefront. Create your profile,
              showcase your portfolio, and receive enquiries from customers worldwide —
              all managed through a professional dashboard.
            </p>

            <ul className="space-y-2 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 border-b border-[#e6e3da] py-3 text-[0.86rem] text-[#1c1b17]">
                  <span className="text-[#8b6914] font-bold mt-0.5 shrink-0">—</span>
                  {b}
                </li>
              ))}
            </ul>

            <Link
              href="/auth/signup?role=tailor"
              className="inline-flex items-center bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-7 py-3 rounded-[6px] hover:opacity-80 transition-opacity"
            >
              Apply as a Tailor
            </Link>
          </div>

          {/* Mock tailor card */}
          <div className="border border-[#e6e3da] rounded-[6px] overflow-hidden">
            <div className="bg-[#f7f5f0] px-6 py-5 border-b border-[#e6e3da] flex items-center justify-between">
              <div>
                <p className="font-display text-[1.1rem] font-bold text-[#0f0e0b]">Lagos Bespoke Studio</p>
                <p className="text-[0.78rem] text-[#6b6757] mt-0.5">Lagos, Nigeria</p>
              </div>
              <span className="text-[0.62rem] font-bold tracking-[0.08em] uppercase text-[#1a5c38] bg-[#e8f2ec] px-3 py-1 rounded-full">
                Verified ✓
              </span>
            </div>
            <div className="bg-white p-6">
              <div className="grid grid-cols-3 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[4px] overflow-hidden mb-5">
                {[
                  { label: "Rating", value: "4.8 ★" },
                  { label: "Orders", value: "142" },
                  { label: "Response", value: "<2h" },
                ].map((s) => (
                  <div key={s.label} className="bg-white p-4 text-center">
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.08em] text-[#6b6757]">{s.label}</p>
                    <p className="font-display text-[1.2rem] font-bold text-[#0f0e0b] mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Specialisms</p>
              <div className="flex flex-wrap gap-2">
                {["Suits", "Agbada", "Shirts", "Trousers", "Kaftans"].map((s) => (
                  <span
                    key={s}
                    className="text-[0.65rem] font-medium text-[#6b6757] bg-[#f7f5f0] border border-[#e6e3da] rounded-full px-3 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[#e6e3da]">
                <p className="text-[0.72rem] text-[#6b6757] italic">
                  &quot;Starting from £180 · 4–6 weeks production · Worldwide shipping&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
