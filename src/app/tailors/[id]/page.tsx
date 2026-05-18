import { tailors } from "@/lib/mock-tailors";
import { notFound } from "next/navigation";
import Link from "next/link";

function StarRating({ rating, large }: { rating: number; large?: boolean }) {
  return (
    <span className={large ? "text-[1.1rem]" : "text-[0.85rem]"} style={{ color: "#8b6914" }}>
      {"★".repeat(Math.floor(rating))}
      <span style={{ color: "#d0ccbf" }}>{"★".repeat(5 - Math.floor(rating))}</span>
    </span>
  );
}

export default function TailorProfilePage({ params }: { params: { id: string } }) {
  const tailor = tailors.find((t) => t.id === params.id);
  if (!tailor) notFound();

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-3">
        <div className="mx-auto max-w-[1280px] flex items-center gap-2 text-[0.75rem] text-[#6b6757]">
          <Link href="/" className="hover:text-[#1c1b17] transition">Home</Link>
          <span className="text-[#d0ccbf]">›</span>
          <Link href="/tailors" className="hover:text-[#1c1b17] transition">Browse Tailors</Link>
          <span className="text-[#d0ccbf]">›</span>
          <span className="text-[#1c1b17] font-medium">{tailor.studioName}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-8 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-start">

          {/* Left — profile content */}
          <div>
            {/* Studio header */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
              <div className="flex items-start justify-between gap-6 mb-6">
                <div className="h-20 w-20 rounded-[6px] bg-[#f7f5f0] border border-[#e6e3da] flex items-center justify-center text-4xl shrink-0">
                  🧵
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display text-[1.8rem] font-bold text-[#0f0e0b] leading-tight">
                      {tailor.studioName}
                    </h1>
                    {tailor.verified && (
                      <span className="text-[0.6rem] font-bold tracking-[0.06em] uppercase text-[#1a5c38] bg-[#e8f2ec] border border-[#c0d9c8] px-2.5 py-0.5 rounded-full">
                        Verified ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[0.85rem] text-[#6b6757] mb-3">{tailor.location}</p>
                  <div className="flex items-center gap-3">
                    <StarRating rating={tailor.rating} large />
                    <span className="text-[0.85rem] font-semibold text-[#0f0e0b]">{tailor.rating}</span>
                    <span className="text-[0.82rem] text-[#6b6757]">({tailor.reviewCount} reviews)</span>
                    <span className="text-[#d0ccbf]">·</span>
                    <span className="text-[0.82rem] text-[#6b6757]">Responds {tailor.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Key specs */}
              <div className="grid grid-cols-3 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[4px] overflow-hidden">
                {[
                  { label: "Starting Price", value: `${tailor.currency}${tailor.priceMin}` },
                  { label: "Delivery", value: `${tailor.deliveryWeeks} weeks` },
                  { label: "Response", value: tailor.responseTime },
                ].map((s) => (
                  <div key={s.label} className="bg-[#f7f5f0] px-5 py-4">
                    <p className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#6b6757]">{s.label}</p>
                    <p className="font-display text-[1.1rem] font-bold text-[#0f0e0b] mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                About the Studio
              </h2>
              <p className="text-[0.9rem] text-[#1c1b17] leading-[1.75]">{tailor.bio}</p>

              <div className="mt-6">
                <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Specialisms</p>
                <div className="flex flex-wrap gap-2">
                  {tailor.specialisms.map((s) => (
                    <span key={s} className="text-[0.72rem] font-medium text-[#6b6757] bg-[#f7f5f0] border border-[#e6e3da] rounded-full px-3 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757] mb-3">Serves</p>
                <div className="flex flex-wrap gap-2">
                  {tailor.garmentCategories.map((c) => (
                    <span key={c} className="text-[0.72rem] font-medium text-[#1c1b17] bg-white border border-[#d0ccbf] rounded-full px-3 py-1">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                Portfolio
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[4px] overflow-hidden">
                {tailor.portfolio.map((item) => (
                  <div key={item.id} className="bg-[#f7f5f0] hover:bg-[#f0ede6] transition-colors">
                    <div className="aspect-square flex items-center justify-center text-4xl border-b border-[#e6e3da]">
                      {item.emoji}
                    </div>
                    <div className="p-3">
                      <p className="text-[0.6rem] font-bold tracking-[0.08em] uppercase text-[#9c9886]">{item.garmentType}</p>
                      <p className="font-display text-[0.84rem] font-bold text-[#0f0e0b] leading-tight mt-0.5">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8">
              <h2 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                Reviews ({tailor.reviewCount})
              </h2>
              <div className="space-y-0">
                {tailor.reviews.map((r, i) => (
                  <div key={r.id} className={`py-5 ${i < tailor.reviews.length - 1 ? "border-b border-[#e6e3da]" : ""}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#0f0e0b] flex items-center justify-center font-display text-[0.75rem] font-bold text-white">
                          {r.customer[0]}
                        </div>
                        <span className="text-[0.85rem] font-semibold text-[#0f0e0b]">{r.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={r.rating} />
                        <span className="text-[0.72rem] text-[#9c9886]">{r.date}</span>
                      </div>
                    </div>
                    <p className="text-[0.86rem] text-[#1c1b17] leading-[1.65] pl-11">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — sticky CTA panel */}
          <div className="lg:sticky lg:top-[100px]">
            <div className="bg-white border border-[#e6e3da] rounded-[6px] overflow-hidden mb-4">
              <div className="bg-[#0f0e0b] px-6 py-5">
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-white/50 mb-1">Ready to order?</p>
                <p className="font-display text-[1.2rem] font-bold text-white">Start your enquiry</p>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  href={`/enquiry/new?tailor=${tailor.id}`}
                  className="flex items-center justify-center w-full bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:opacity-80 transition-opacity"
                >
                  Request a Quote
                </Link>
                <Link
                  href={`/enquiry/new?tailor=${tailor.id}`}
                  className="flex items-center justify-center w-full border border-[#d0ccbf] text-[#1c1b17] text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
                >
                  Message / Enquire
                </Link>
                <button className="flex items-center justify-center w-full border border-[#d0ccbf] text-[#6b6757] text-[0.75rem] font-semibold tracking-[0.06em] uppercase py-3.5 rounded-[6px] hover:bg-[#f7f5f0] transition">
                  Book Consultation
                </button>
              </div>
              <div className="px-6 pb-5">
                <div className="bg-[#f7f5f0] border border-[#e6e3da] rounded-[4px] p-4 text-[0.78rem] text-[#6b6757] leading-[1.6]">
                  <span className="font-semibold text-[#1a5c38]">🔒 Escrow protected.</span> Your payment is
                  held securely by SEAM and only released after delivery.
                </div>
              </div>
            </div>

            {/* Detail specs */}
            <div className="bg-white border border-[#e6e3da] rounded-[6px] p-6">
              <h3 className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-4 pb-3 border-b border-[#e6e3da]">
                Studio Details
              </h3>
              <div className="space-y-0">
                {[
                  { label: "Location", value: tailor.location },
                  { label: "Price Range", value: `${tailor.currency}${tailor.priceMin} – ${tailor.currency}${tailor.priceMax}` },
                  { label: "Production Time", value: `${tailor.deliveryWeeks} weeks` },
                  { label: "Response Time", value: tailor.responseTime },
                  { label: "Rating", value: `${tailor.rating} ★ (${tailor.reviewCount} reviews)` },
                  { label: "Serves", value: tailor.garmentCategories.join(", ") },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4 py-3 border-b border-[#e6e3da] last:border-0 text-[0.82rem]">
                    <span className="text-[0.65rem] font-bold tracking-[0.06em] uppercase text-[#6b6757] min-w-[100px] shrink-0 pt-0.5">
                      {row.label}
                    </span>
                    <span className="text-[#1c1b17]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return tailors.map((t) => ({ id: t.id }));
}
