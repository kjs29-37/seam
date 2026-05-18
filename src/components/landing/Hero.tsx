import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at top right, rgba(16,185,129,0.12), transparent 30%),
            radial-gradient(circle at bottom left, rgba(59,130,246,0.08), transparent 30%)
          `,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-200">
              Premium remote tailoring, worldwide
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              The world&apos;s tailors,{" "}
              <span className="text-emerald-400">at your fingertips.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              SEAM connects you with verified tailors from around the world. Order
              custom clothing from anywhere — no fittings, no flights, just beautifully
              made garments delivered to your door.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup?role=customer"
                className="rounded-2xl bg-emerald-500 px-6 py-3 text-center font-medium text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
              >
                Join as Customer
              </Link>
              <Link
                href="/auth/signup?role=tailor"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center font-medium text-white transition hover:bg-white/10"
              >
                Join as Tailor
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-2xl border border-white/10 px-6 py-3 text-center font-medium text-slate-400 transition hover:text-white"
              >
                See How It Works
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm text-slate-400">Active Order</p>
                  <h3 className="text-xl font-semibold">Bespoke Suit — Nairobi Studio</h3>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-200">
                  In Production
                </span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                  <p className="text-sm text-slate-400">Payment</p>
                  <p className="mt-2 text-lg font-semibold">Held in Escrow</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                  <p className="text-sm text-slate-400">Tailor Rating</p>
                  <p className="mt-2 text-lg font-semibold">4.9 ★</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-800/70 p-4">
                  <p className="text-sm text-slate-400">Est. Delivery</p>
                  <p className="mt-2 text-lg font-semibold">14 days</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-emerald-400/5 p-4">
                <p className="text-sm text-emerald-300">
                  Your payment is held securely by SEAM and will only be released to the tailor after delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
