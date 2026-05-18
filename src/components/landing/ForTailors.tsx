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
    <section id="for-tailors" className="border-y border-white/10 bg-slate-900/60">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
              For Tailors
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Grow your craft beyond your city.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              SEAM gives talented tailors a global storefront. Create your profile,
              showcase your portfolio, and receive enquiries from customers worldwide —
              all managed through a simple, professional dashboard.
            </p>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-200"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-xs text-emerald-300">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/auth/signup?role=tailor"
                className="inline-block rounded-2xl bg-emerald-500 px-6 py-3 font-medium text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Apply as a Tailor
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-400/20 flex items-center justify-center text-2xl">
                  🧵
                </div>
                <div>
                  <p className="font-semibold">Lagos Bespoke Studio</p>
                  <p className="text-sm text-slate-400">Lagos, Nigeria · Verified ✓</p>
                </div>
                <span className="ml-auto rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">
                  Active
                </span>
              </div>
              <div className="mt-5 grid gap-4 grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-center">
                  <p className="text-sm text-slate-400">Rating</p>
                  <p className="mt-1 text-xl font-semibold">4.8★</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-center">
                  <p className="text-sm text-slate-400">Orders</p>
                  <p className="mt-1 text-xl font-semibold">142</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4 text-center">
                  <p className="text-sm text-slate-400">Response</p>
                  <p className="mt-1 text-xl font-semibold">&lt;2h</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-slate-400">Specialisms</p>
                <div className="flex flex-wrap gap-2">
                  {["Suits", "Agbada", "Shirts", "Trousers", "Kaftans"].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
