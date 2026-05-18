export default function TailorsPage() {
  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Page hero */}
      <div className="text-center border-b border-[#e6e3da] bg-white py-12 px-6">
        <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">Discover</p>
        <h1 className="font-display text-[2.4rem] font-black tracking-[-0.01em] uppercase text-[#0f0e0b]">
          Browse Tailors
        </h1>
        <p className="mt-2 text-[#6b6757] text-[0.88rem]">
          Verified tailors from around the world — coming soon
        </p>
      </div>

      <div className="mx-auto max-w-[1280px] px-8 py-20">
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-16 text-center">
          <div className="mx-auto max-w-md">
            <p className="font-display text-[3rem] mb-6">🧵</p>
            <h2 className="font-display text-[1.6rem] font-bold text-[#0f0e0b] mb-4">
              Tailor marketplace coming soon
            </h2>
            <p className="text-[#6b6757] text-[0.88rem] leading-[1.7] mb-8">
              We&apos;re onboarding our first cohort of verified tailors. Join the waitlist
              and be first to browse when we launch.
            </p>
            <a
              href="/auth/signup"
              className="inline-block bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity"
            >
              Request Early Access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
