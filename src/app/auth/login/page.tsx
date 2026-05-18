"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

const demoAccounts = [
  { role: "customer", label: "Customer", email: "jane@demo.com", dest: "/customer/dashboard" },
  { role: "tailor", label: "Tailor Studio", email: "lagos@demo.com", dest: "/tailor/dashboard" },
  { role: "admin", label: "Admin", email: "admin@seam.co", dest: "/admin/dashboard" },
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const match = demoAccounts.find((a) => a.email === email.trim().toLowerCase());
    if (!match) {
      setError("No account found. Try a demo account below.");
      setLoading(false);
      return;
    }
    router.push(redirectTo ?? match.dest);
  }

  function loginAs(account: typeof demoAccounts[number]) {
    router.push(redirectTo ?? account.dest);
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-16 bg-[#fdfcf9]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">Welcome Back</p>
          <h1 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-[#0f0e0b]">Sign In</h1>
        </div>

        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                autoComplete="email"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757]">Password</label>
                <button type="button" className="text-[0.72rem] text-[#8b6914] hover:underline">Forgot password?</button>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-[0.78rem] text-red-600 bg-red-50 border border-red-200 rounded-[4px] px-4 py-2.5">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f0e0b] text-white text-[0.78rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {loading && <span className="animate-spin text-[1rem]">◌</span>}
              Sign In
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-[#e6e3da]">
            <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#9c9886] mb-3">Demo — sign in as</p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((a) => (
                <button
                  key={a.role}
                  type="button"
                  onClick={() => loginAs(a)}
                  className="border border-[#d0ccbf] text-[#6b6757] text-[0.68rem] font-semibold tracking-[0.06em] uppercase py-2.5 rounded-[6px] hover:bg-[#f7f5f0] hover:border-[#8b6914] hover:text-[#8b6914] transition"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[0.84rem] text-[#6b6757]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[#8b6914] font-medium hover:underline underline-offset-2">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfcf9]" />}>
      <LoginForm />
    </Suspense>
  );
}
