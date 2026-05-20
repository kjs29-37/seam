"use client";

import { useState } from "react";
import Link from "next/link";

const specialismOptions = [
  "Suits & Blazers", "Shirts & Tops", "Trousers & Chinos", "Evening Wear",
  "Wedding & Bridal", "Traditional / Cultural", "Dresses & Gowns", "Outerwear & Coats",
  "Children's Wear", "Alterations & Repairs", "Áo Dài", "Thai Silk",
  "Salwar Kameez", "Embroidery & Handcraft",
];

const garmentOptions = [
  "Menswear", "Womenswear", "Unisex / Gender-neutral", "Children", "Wedding",
];

const regionOptions = [
  "Vietnam", "Thailand", "Bangladesh", "Southeast Asia",
  "South Asia", "UK & Europe", "North America", "Other",
];

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`text-[0.72rem] font-medium border rounded-full px-3 py-1.5 transition ${
        checked
          ? "bg-[#0f0e0b] text-white border-[#0f0e0b]"
          : "bg-white text-[#6b6757] border-[#d0ccbf] hover:border-[#8b6914] hover:text-[#8b6914]"
      }`}
    >
      {label}
    </button>
  );
}

const labelClass = "block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2";
const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

export default function ApplyPage() {
  const [form, setForm] = useState({
    studioName: "", ownerName: "", email: "", phone: "",
    location: "", region: "",
    bio: "", website: "", instagram: "",
    priceMin: "", priceMax: "",
    yearsExperience: "",
  });
  const [specialisms, setSpecialisms] = useState<string[]>([]);
  const [garments, setGarments] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  function toggleSpecialism(s: string) {
    setSpecialisms((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }
  function toggleGarment(g: string) {
    setGarments((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  }

  const canSubmit = form.studioName && form.ownerName && form.email && form.location && form.bio && specialisms.length > 0 && agreed;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fdfcf9] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="h-16 w-16 bg-[#e8f2ec] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">🧵</div>
          <h1 className="font-display text-[2rem] font-bold text-[#0f0e0b] mb-3">Application Submitted</h1>
          <p className="text-[#6b6757] text-[0.9rem] leading-[1.75] mb-8">
            Thank you for applying to SEAM. Our team will review your application and get back to you within 3–5 business days.
            You&apos;ll receive a confirmation email at <strong className="text-[#1c1b17]">{form.email}</strong>.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity"
            >
              Back to SEAM
            </Link>
            <Link
              href="/tailors"
              className="border border-[#d0ccbf] text-[#1c1b17] text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
            >
              Browse Verified Tailors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Header */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-6">
        <div className="mx-auto max-w-[780px]">
          <p className="text-[0.62rem] font-bold tracking-[0.15em] uppercase text-[#8b6914] mb-1">Apply to SEAM</p>
          <h1 className="font-display text-[2rem] font-bold text-[#0f0e0b] leading-tight">Join as a Verified Tailor</h1>
          <p className="text-[0.88rem] text-[#6b6757] mt-2 max-w-xl leading-[1.6]">
            SEAM connects skilled tailors across Southeast and South Asia with customers worldwide. All applications are reviewed individually by our team.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[780px] px-6 py-10 space-y-6">
        {/* What to expect */}
        <div className="bg-[#faf4e1] border border-[#c49a2a]/30 rounded-[6px] p-5">
          <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#8b6914] mb-3">What happens after you apply</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Application review", body: "Our team reviews your profile and portfolio within 3–5 days." },
              { step: "2", title: "Verification call", body: "A short video call with a SEAM concierge to verify your studio." },
              { step: "3", title: "Go live", body: "Your profile is published and customers can start sending enquiries." },
            ].map((s) => (
              <div key={s.step} className="text-[0.8rem]">
                <p className="font-bold text-[#8b6914] mb-1">Step {s.step}: {s.title}</p>
                <p className="text-[#6b6757] leading-[1.5]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Studio details */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-6 pb-3 border-b border-[#e6e3da]">
            Studio Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Studio Name *</label>
              <input type="text" placeholder="e.g. Bangkok Classic Tailors" value={form.studioName} onChange={(e) => update("studioName", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Your Full Name *</label>
              <input type="text" placeholder="e.g. Nguyen Van An" value={form.ownerName} onChange={(e) => update("ownerName", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email Address *</label>
              <input type="email" placeholder="you@studio.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone (with country code)</label>
              <input type="tel" placeholder="+84 90 123 4567" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City, Country *</label>
              <input type="text" placeholder="e.g. Hanoi, Vietnam" value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Region</label>
              <select value={form.region} onChange={(e) => update("region", e.target.value)} className={`${inputClass} appearance-none`}>
                <option value="">Select region…</option>
                {regionOptions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Years of Experience</label>
              <input type="number" placeholder="e.g. 8" value={form.yearsExperience} onChange={(e) => update("yearsExperience", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* Specialisms */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
            Specialisms *
          </h2>
          <p className="text-[0.82rem] text-[#6b6757] mb-4">Select all that apply to your studio.</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {specialismOptions.map((s) => (
              <Checkbox key={s} label={s} checked={specialisms.includes(s)} onChange={() => toggleSpecialism(s)} />
            ))}
          </div>

          <h3 className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Garment Categories</h3>
          <div className="flex flex-wrap gap-2">
            {garmentOptions.map((g) => (
              <Checkbox key={g} label={g} checked={garments.includes(g)} onChange={() => toggleGarment(g)} />
            ))}
          </div>
        </div>

        {/* Bio & pricing */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-6 pb-3 border-b border-[#e6e3da]">
            About Your Studio
          </h2>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Studio Bio *</label>
              <textarea
                rows={5}
                placeholder="Describe your studio, your craft, your background, and what makes your work distinctive. Customers read this before enquiring."
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                className={`${inputClass} resize-none`}
              />
              <p className="mt-1.5 text-right text-[0.72rem] text-[#9c9886]">{form.bio.length} / 600</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Starting Price (£)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9c9886] text-[0.9rem]">£</span>
                  <input type="number" placeholder="150" value={form.priceMin} onChange={(e) => update("priceMin", e.target.value)} className={`${inputClass} pl-8`} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Maximum Price (£)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9c9886] text-[0.9rem]">£</span>
                  <input type="number" placeholder="2000" value={form.priceMax} onChange={(e) => update("priceMax", e.target.value)} className={`${inputClass} pl-8`} />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Website (optional)</label>
                <input type="url" placeholder="https://yourstudio.com" value={form.website} onChange={(e) => update("website", e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Instagram (optional)</label>
                <input type="text" placeholder="@yourstudio" value={form.instagram} onChange={(e) => update("instagram", e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Terms and submit */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
          <div className="flex items-start gap-3 mb-6">
            <button
              type="button"
              onClick={() => setAgreed((v) => !v)}
              className={`mt-0.5 h-5 w-5 shrink-0 rounded border-2 flex items-center justify-center transition ${agreed ? "bg-[#0f0e0b] border-[#0f0e0b]" : "border-[#d0ccbf]"}`}
            >
              {agreed && <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </button>
            <p className="text-[0.82rem] text-[#6b6757] leading-[1.6]">
              I confirm that the information I have provided is accurate. I agree to SEAM&apos;s{" "}
              <Link href="#" className="text-[#8b6914] hover:underline">Tailor Terms & Conditions</Link>
              {" "}and understand that all payments from customers are processed through SEAM&apos;s escrow system.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-[0.75rem] text-[#6b6757] hover:text-[#1c1b17] transition">
              ← Cancel
            </Link>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={!canSubmit}
              className="bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Submit Application →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
