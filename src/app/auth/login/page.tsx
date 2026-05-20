"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

const roleDestinations: Record<string, string> = {
  customer: "/customer/dashboard",
  tailor:   "/tailor/dashboard",
  admin:    "/admin/dashboard",
};

const demoAccounts = [
  { label: "Admin",    email: "admin1@seam.com",   password: "admin123",    icon: "🔑" },
  { label: "Customer", email: "customer@seam.com",  password: "customer123", icon: "👤" },
  { label: "Tailor",   email: "tailor@seam.com",    password: "tailor123",   icon: "🧵" },
];

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg ?? "Invalid email or password");
      setLoading(false);
      return;
    }

    const { role } = await res.json();
    window.location.href = redirectTo ?? roleDestinations[role] ?? "/customer/dashboard";
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-16 bg-[#fdfcf9]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">Welcome Back</p>
          <h1 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-[#0f0e0b]">Sign In</h1>
        </div>

        {/* Demo accounts */}
        <div className="bg-[#faf4e1] border border-[#c49a2a]/40 rounded-[6px] p-4 mb-5">
          <p className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#8b6914] mb-3">Demo Accounts — click to fill</p>
          <div className="flex gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.label}
                type="button"
                onClick={() => { setEmail(acc.email); setPassword(acc.password); setError(""); }}
                className="flex-1 flex flex-col items-center gap-1 bg-white border border-[#c49a2a]/30 rounded-[6px] px-2 py-2.5 hover:bg-[#fdf8ec] transition text-center"
              >
                <span className="text-base">{acc.icon}</span>
                <span className="text-[0.68rem] font-bold text-[#8b6914]">{acc.label}</span>
                <span className="text-[0.6rem] text-[#9c9886] font-mono">{acc.email}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} autoComplete="current-password" />
            </div>

            {error && (
              <p className="text-[0.78rem] text-red-600 bg-red-50 border border-red-200 rounded-[4px] px-4 py-2.5">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f0e0b] text-white text-[0.78rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {loading ? <><span className="animate-spin text-[1rem]">◌</span> Signing in…</> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[0.84rem] text-[#6b6757]">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[#8b6914] font-medium hover:underline underline-offset-2">Sign up</Link>
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
