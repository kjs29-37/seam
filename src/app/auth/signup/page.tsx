"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [role, setRole] = useState<"customer" | "tailor">(roleParam === "tailor" ? "tailor" : "customer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName || !email || !password) return;
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: `${firstName} ${lastName}`.trim(), role },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (role === "tailor") {
      router.push("/apply");
    } else {
      router.push("/customer/dashboard");
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-6 py-16 bg-[#fdfcf9]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">Join SEAM</p>
          <h1 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-[#0f0e0b]">Create Account</h1>
        </div>

        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <div className="grid grid-cols-2 gap-2 mb-6">
            {(["customer", "tailor"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-[6px] px-4 py-3 text-[0.72rem] font-semibold tracking-[0.06em] uppercase transition border-2 ${
                  role === r ? "bg-[#0f0e0b] text-white border-[#0f0e0b]" : "border-[#d0ccbf] text-[#6b6757] hover:bg-[#f7f5f0]"
                }`}
              >
                {r === "customer" ? "I'm a Customer" : "I'm a Tailor"}
              </button>
            ))}
          </div>

          {role === "tailor" && (
            <div className="mb-5 bg-[#faf4e1] border border-[#c49a2a]/30 rounded-[4px] p-3 text-[0.78rem] text-[#8b6914] leading-[1.6]">
              Tailor accounts require verification. After signing up you&apos;ll complete a short application form.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">First Name</label>
                <input placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputClass} autoComplete="given-name" />
              </div>
              <div>
                <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Last Name</label>
                <input placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputClass} autoComplete="family-name" />
              </div>
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} autoComplete="email" />
            </div>
            <div>
              <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2">Password</label>
              <input type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} autoComplete="new-password" />
            </div>

            {error && (
              <p className="text-[0.78rem] text-red-600 bg-red-50 border border-red-200 rounded-[4px] px-4 py-2.5">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !firstName || !email || !password}
              className="w-full bg-[#0f0e0b] text-white text-[0.78rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {loading && <span className="animate-spin text-[1rem]">◌</span>}
              {role === "tailor" ? "Continue to Application →" : "Create Account"}
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

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfcf9]" />}>
      <SignupForm />
    </Suspense>
  );
}
