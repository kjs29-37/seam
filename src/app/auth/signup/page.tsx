import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-16 bg-[#fdfcf9]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">Join SEAM</p>
          <h1 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-[#0f0e0b]">Create Account</h1>
        </div>

        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          {/* Role toggle */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button className="border-2 border-[#0f0e0b] bg-[#0f0e0b] text-white rounded-[6px] px-4 py-3 text-[0.72rem] font-semibold tracking-[0.06em] uppercase transition">
              I&apos;m a Customer
            </button>
            <button className="border border-[#d0ccbf] text-[#6b6757] rounded-[6px] px-4 py-3 text-[0.72rem] font-semibold tracking-[0.06em] uppercase hover:bg-[#f7f5f0] transition">
              I&apos;m a Tailor
            </button>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                  First Name
                </label>
                <input
                  placeholder="Jane"
                  className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition"
                />
              </div>
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                  Last Name
                </label>
                <input
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition"
              />
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0f0e0b] text-white text-[0.78rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:opacity-80 transition-opacity mt-2"
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[0.84rem] text-[#6b6757]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#8b6914] font-medium hover:underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
