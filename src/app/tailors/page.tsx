export default function TailorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">
          Discover
        </p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Browse Verified Tailors</h1>
        <p className="mt-4 text-lg text-slate-300">
          Tailor discovery is coming soon. In the meantime, request early access and we&apos;ll
          match you with the perfect tailor personally.
        </p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
        <div className="mx-auto max-w-md">
          <div className="text-5xl mb-6">🧵</div>
          <h2 className="text-2xl font-semibold">Tailor marketplace coming soon</h2>
          <p className="mt-4 text-slate-400">
            We&apos;re onboarding our first cohort of verified tailors. Join the waitlist and
            be first to browse when we launch.
          </p>
          <a
            href="/auth/signup"
            className="mt-6 inline-block rounded-2xl bg-emerald-500 px-6 py-3 font-medium text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400"
          >
            Request Early Access
          </a>
        </div>
      </div>
    </div>
  );
}
