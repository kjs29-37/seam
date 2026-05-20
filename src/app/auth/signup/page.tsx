"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

function SignupForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [role, setRole]           = useState<"customer" | "tailor">(roleParam === "tailor" ? "tailor" : "customer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [done, setDone]           = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !password) return;
    setLoading(true);

    // Demo: register as a session with the entered details
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // For demo signup, try matching a demo account first; if not, create a guest session
      body: JSON.stringify({ email, password, name: `${firstName} ${lastName}`.trim(), role, signup: true }),
    });

    if (res.ok) {
      window.location.href = role === "tailor" ? "/apply" : "/customer/dashboard";
    } else {
      // Not a demo account — still show success for UX
      setDone(true);
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-[#fdfcf9] px-6">
        <div className="max-w-md text-center">
          <div className="h-16 w-16 bg-[#e8f2ec] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
          <h1 className="font-display text-[2rem] font-bold text-[#0f0e0b] mb-3">Account Created</h1>
          <p className="text-[#6b6757] text-[0.9rem] leading-[1.75] mb-8">
            This is a demo — use the demo accounts on the sign-in page to explore the platform.
          </p>
          <Link href="/auth/login" className="bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-16 bg-[#fdfcf9]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">Join SEAM</p>
          <h1 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-[#0f0e0b]">Create Account</h1>
        </div>

        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          {/* Role toggle */}
          <div className="flex bg-[#f7f5f0] rounded-[6px] p-1 mb-6">
            {(["customer", "tailor"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2 text-[0.75rem] font-semibold tracking-[0.06em] uppercase rounded-[4px] transition ${role === r ? "bg-white text-[#0f0e0b] shadow-sm" : "text-[#6b6757]"}`}
              >
                {r === "customer" ? "Customer" : "Tailor"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">First Name</label>
                <input type="text" placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Last Name</label>
                <input type="text" placeholder="Davidson" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} autoComplete="new-password" />
            </div>

            <button
              type="submit"
              disabled={loading || !firstName || !email || !password}
              className="w-full bg-[#0f0e0b] text-white text-[0.78rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {loading ? <><span className="animate-spin text-[1rem]">◌</span> Creating…</> : "Create Account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-[0.84rem] text-[#6b6757]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#8b6914] font-medium hover:underline underline-offset-2">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfcf9]" />}>
      <SignupForm />
    </Suspense>
  );
}
