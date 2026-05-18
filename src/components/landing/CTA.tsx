import Link from "next/link";

export default function CTA() {
  return (
    <section className="border-t border-white/10 bg-slate-900/70">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
          Get Started
        </p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Your perfect garment is one enquiry away.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Join SEAM today and discover what&apos;s possible when the world&apos;s best
          tailors are just a message away — with your payment protected every step.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/auth/signup?role=customer"
            className="rounded-2xl bg-emerald-500 px-6 py-3 font-medium text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
          >
            Join as Customer
          </Link>
          <Link
            href="/auth/signup?role=tailor"
            className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
          >
            Apply as Tailor
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-2xl border border-white/10 px-6 py-3 font-medium text-slate-400 transition hover:text-white"
          >
            Request Early Access
          </Link>
        </div>
      </div>
    </section>
  );
}
