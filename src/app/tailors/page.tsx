import Link from "next/link";
import { tailors } from "@/lib/mock-tailors";

const garmentFilters = ["All", "Men", "Women", "Unisex"];
const regionFilters = ["All Regions", "West Africa", "East Africa", "North Africa"];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-[#8b6914] text-[0.8rem]">
      {"★".repeat(Math.floor(rating))}
      <span className="text-[#d0ccbf]">{"★".repeat(5 - Math.floor(rating))}</span>
    </span>
  );
}

export default function TailorsPage() {
  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Page hero */}
      <div className="text-center border-b border-[#e6e3da] bg-white py-12 px-6">
        <p className="text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[#8b6914] mb-2">
          Discover
        </p>
        <h1 className="font-display text-[2.4rem] font-black tracking-[-0.01em] uppercase text-[#0f0e0b]">
          Browse Tailors
        </h1>
        <p className="mt-2 text-[#6b6757] text-[0.88rem]">
          {tailors.length} verified tailors worldwide
        </p>
      </div>

      <div className="mx-auto max-w-[1280px] px-8 py-12">
        <div className="flex gap-12">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-[120px] space-y-6">
              {/* Garment type */}
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#6b6757] pb-2 border-b border-[#e6e3da] mb-0">
                  Garment Type
                </p>
                <ul>
                  {garmentFilters.map((f) => (
                    <li key={f} className="border-b border-[#e6e3da]">
                      <button className={`flex w-full items-center justify-between py-2.5 text-[0.84rem] transition-colors ${f === "All" ? "text-[#0f0e0b] font-semibold" : "text-[#6b6757] hover:text-[#1c1b17]"}`}>
                        {f}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Region */}
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#6b6757] pb-2 border-b border-[#e6e3da] mb-0">
                  Region
                </p>
                <ul>
                  {regionFilters.map((f) => (
                    <li key={f} className="border-b border-[#e6e3da]">
                      <button className={`flex w-full items-center justify-between py-2.5 text-[0.84rem] transition-colors ${f === "All Regions" ? "text-[#0f0e0b] font-semibold" : "text-[#6b6757] hover:text-[#1c1b17]"}`}>
                        {f}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price range */}
              <div>
                <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#6b6757] pb-2 border-b border-[#e6e3da] mb-0">
                  Price Range
                </p>
                <ul>
                  {["Any budget", "Under £200", "£200–£500", "£500+"].map((f) => (
                    <li key={f} className="border-b border-[#e6e3da]">
                      <button className={`flex w-full items-center justify-between py-2.5 text-[0.84rem] transition-colors ${f === "Any budget" ? "text-[#0f0e0b] font-semibold" : "text-[#6b6757] hover:text-[#1c1b17]"}`}>
                        {f}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#e6e3da]">
              <p className="text-[0.82rem] text-[#6b6757]">
                Showing <strong className="text-[#1c1b17]">{tailors.length}</strong> tailors
              </p>
              <select className="text-[0.78rem] border border-[#d0ccbf] rounded-[4px] px-3 py-1.5 bg-white text-[#1c1b17] focus:outline-none focus:border-[#8b6914]">
                <option>Recommended</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Featured row */}
            <div className="mb-2">
              <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#8b6914] mb-3">
                Featured Tailors
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[6px] overflow-hidden mb-8">
                {tailors.filter((t) => t.featured).map((tailor) => (
                  <Link
                    key={tailor.id}
                    href={`/tailors/${tailor.id}`}
                    className="bg-white hover:bg-[#f7f5f0] transition-colors flex flex-col cursor-pointer"
                  >
                    {/* Image placeholder */}
                    <div className="h-[200px] bg-[#f7f5f0] flex items-center justify-center border-b border-[#e6e3da]">
                      <span className="text-5xl">🧵</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#8b6914]">
                            Featured
                          </p>
                          <h3 className="font-display text-[1.05rem] font-bold text-[#0f0e0b] leading-tight">
                            {tailor.studioName}
                          </h3>
                        </div>
                        {tailor.verified && (
                          <span className="shrink-0 text-[0.6rem] font-bold tracking-[0.06em] uppercase text-[#1a5c38] bg-[#e8f2ec] px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-[0.78rem] text-[#6b6757] mb-3">{tailor.location}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <StarRating rating={tailor.rating} />
                        <span className="text-[0.75rem] text-[#6b6757]">
                          {tailor.rating} ({tailor.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tailor.specialisms.slice(0, 3).map((s) => (
                          <span key={s} className="text-[0.62rem] font-medium text-[#6b6757] bg-[#f7f5f0] border border-[#e6e3da] rounded-full px-2.5 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[0.78rem] text-[#6b6757]">
                          From <strong className="text-[#0f0e0b]">{tailor.currency}{tailor.priceMin}</strong>
                        </span>
                        <span className="text-[0.72rem] font-semibold tracking-[0.04em] uppercase text-[#8b6914]">
                          View Profile →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* All tailors grid */}
            <p className="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-3">
              All Tailors
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[6px] overflow-hidden">
              {tailors.map((tailor) => (
                <Link
                  key={tailor.id}
                  href={`/tailors/${tailor.id}`}
                  className="bg-white hover:bg-[#f7f5f0] transition-colors flex flex-col cursor-pointer"
                >
                  <div className="aspect-[4/3] bg-[#f7f5f0] flex items-center justify-center border-b border-[#e6e3da]">
                    <span className="text-4xl">🧵</span>
                  </div>
                  <div className="p-5">
                    <p className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#9c9886] mb-0.5">
                      {tailor.location}
                    </p>
                    <h3 className="font-display text-[0.95rem] font-bold text-[#0f0e0b] mb-1 leading-tight">
                      {tailor.studioName}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-2">
                      <StarRating rating={tailor.rating} />
                      <span className="text-[0.72rem] text-[#9c9886]">({tailor.reviewCount})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tailor.specialisms.slice(0, 2).map((s) => (
                        <span key={s} className="text-[0.6rem] font-medium text-[#6b6757] bg-[#f7f5f0] border border-[#e6e3da] rounded-full px-2 py-0.5">
                          {s}
                        </span>
                      ))}
                    </div>
                    <p className="text-[0.75rem] text-[#6b6757]">
                      From <strong className="text-[#0f0e0b]">{tailor.currency}{tailor.priceMin}</strong>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
