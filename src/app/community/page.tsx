import Link from "next/link";

type Look = {
  id: string;
  emoji: string;
  garmentType: string;
  title: string;
  tailorName: string;
  tailorId: string;
  location: string;
  price: string;
  tags: string[];
  featured?: boolean;
};

const looks: Look[] = [
  {
    id: "l1", emoji: "🤵", garmentType: "Suit",
    title: "The Bangkok Double-Breasted", tailorName: "Bangkok Classic Tailors",
    tailorId: "bangkok-tailors", location: "Bangkok, Thailand", price: "From £380",
    tags: ["Suits", "Menswear", "Formal"], featured: true,
  },
  {
    id: "l2", emoji: "👘", garmentType: "Áo Dài",
    title: "Ivory Silk Wedding Áo Dài", tailorName: "Hanoi Silk Atelier",
    tailorId: "hanoi-silk", location: "Hanoi, Vietnam", price: "From £280",
    tags: ["Wedding", "Womenswear", "Silk"], featured: true,
  },
  {
    id: "l3", emoji: "👗", garmentType: "Evening Wear",
    title: "Thai Silk Evening Gown", tailorName: "Silom Couture House",
    tailorId: "silom-couture", location: "Bangkok, Thailand", price: "From £250",
    tags: ["Thai Silk", "Womenswear", "Evening"],
  },
  {
    id: "l4", emoji: "🥻", garmentType: "Saree",
    title: "Nakshi Kantha Embroidered Saree", tailorName: "Old Dhaka Stitch",
    tailorId: "old-dhaka-stitch", location: "Dhaka, Bangladesh", price: "From £200",
    tags: ["Traditional", "Womenswear", "Embroidery"],
  },
  {
    id: "l5", emoji: "👔", garmentType: "Shirt",
    title: "Slim-Fit Oxford Dress Shirt", tailorName: "Saigon Bespoke Co.",
    tailorId: "saigon-bespoke", location: "Ho Chi Minh City, Vietnam", price: "From £120",
    tags: ["Shirts", "Menswear", "Business"],
  },
  {
    id: "l6", emoji: "👘", garmentType: "Kurta",
    title: "Block-Print Indigo Kurta Set", tailorName: "Dhaka Thread Co.",
    tailorId: "dhaka-threads", location: "Dhaka, Bangladesh", price: "From £95",
    tags: ["Kurta", "Menswear", "Casual"],
  },
  {
    id: "l7", emoji: "🤵", garmentType: "Suit",
    title: "3-Piece Morning Suit", tailorName: "Bangkok Classic Tailors",
    tailorId: "bangkok-tailors", location: "Bangkok, Thailand", price: "From £520",
    tags: ["Suits", "Menswear", "Wedding"],
  },
  {
    id: "l8", emoji: "👗", garmentType: "Bridal",
    title: "Embroidered Bridal Lehenga", tailorName: "Old Dhaka Stitch",
    tailorId: "old-dhaka-stitch", location: "Dhaka, Bangladesh", price: "From £480",
    tags: ["Bridal", "Womenswear", "Embroidery"],
  },
  {
    id: "l9", emoji: "👘", garmentType: "Áo Dài",
    title: "Modern Áo Dài with Lotus Embroidery", tailorName: "Hanoi Silk Atelier",
    tailorId: "hanoi-silk", location: "Hanoi, Vietnam", price: "From £150",
    tags: ["Áo Dài", "Womenswear", "Silk"],
  },
];

const categories = ["All", "Suits", "Wedding", "Silk", "Womenswear", "Menswear", "Shirts", "Evening"];

export default function CommunityPage() {
  const featured = looks.filter((l) => l.featured);
  const rest = looks.filter((l) => !l.featured);

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      {/* Hero header */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-12 text-center">
        <div className="mx-auto max-w-[780px]">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-[#c49a2a]" />
            <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-[#8b6914]">
              Made on SEAM
            </span>
            <span className="block w-8 h-px bg-[#c49a2a]" />
          </div>
          <h1 className="font-display text-[2.6rem] font-bold tracking-[-0.02em] text-[#0f0e0b] leading-tight mb-4">
            Community Lookbook
          </h1>
          <p className="text-[#6b6757] text-[0.95rem] leading-[1.75] max-w-xl mx-auto">
            Every garment here was made to order by a verified SEAM tailor. Browse for inspiration,
            then find the tailor who made it.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-[#e6e3da] bg-white sticky top-[118px] z-10 px-8 py-3">
        <div className="mx-auto max-w-[1280px] flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`shrink-0 text-[0.72rem] font-semibold tracking-[0.06em] uppercase px-4 py-2 rounded-full border transition ${
                i === 0
                  ? "bg-[#0f0e0b] text-white border-[#0f0e0b]"
                  : "border-[#d0ccbf] text-[#6b6757] hover:border-[#8b6914] hover:text-[#8b6914]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-8 py-12">
        {/* Featured */}
        <div className="mb-10">
          <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[#8b6914] mb-6">Featured Looks</p>
          <div className="grid sm:grid-cols-2 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[6px] overflow-hidden">
            {featured.map((look) => (
              <div key={look.id} className="bg-white hover:bg-[#fdfcf9] transition-colors group">
                <div className="aspect-[4/3] bg-[#f7f5f0] flex items-center justify-center text-8xl border-b border-[#e6e3da]">
                  {look.emoji}
                </div>
                <div className="p-6">
                  <p className="text-[0.62rem] font-bold tracking-[0.1em] uppercase text-[#9c9886] mb-1">{look.garmentType}</p>
                  <h3 className="font-display text-[1.2rem] font-bold text-[#0f0e0b] leading-tight mb-3">{look.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {look.tags.map((tag) => (
                      <span key={tag} className="text-[0.65rem] font-medium text-[#6b6757] bg-[#f7f5f0] border border-[#e6e3da] rounded-full px-2.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[0.78rem] font-semibold text-[#1c1b17]">{look.tailorName}</p>
                      <p className="text-[0.72rem] text-[#6b6757]">{look.location} · {look.price}</p>
                    </div>
                    <Link
                      href={`/tailors/${look.tailorId}`}
                      className="text-[0.72rem] font-semibold text-[#8b6914] border border-[#c49a2a]/40 px-3 py-1.5 rounded-[4px] hover:bg-[#faf4e1] transition"
                    >
                      View Tailor →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All looks */}
        <div>
          <p className="text-[0.62rem] font-bold tracking-[0.14em] uppercase text-[#6b6757] mb-6">All Looks ({looks.length})</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e6e3da] border border-[#e6e3da] rounded-[6px] overflow-hidden">
            {rest.map((look) => (
              <div key={look.id} className="bg-white hover:bg-[#fdfcf9] transition-colors">
                <div className="aspect-square bg-[#f7f5f0] flex items-center justify-center text-6xl border-b border-[#e6e3da]">
                  {look.emoji}
                </div>
                <div className="p-5">
                  <p className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-[#9c9886] mb-0.5">{look.garmentType}</p>
                  <h3 className="font-display text-[0.95rem] font-bold text-[#0f0e0b] leading-tight mb-2">{look.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {look.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[0.62rem] font-medium text-[#6b6757] bg-[#f7f5f0] border border-[#e6e3da] rounded-full px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-[0.75rem] font-semibold text-[#1c1b17]">{look.tailorName}</p>
                      <p className="text-[0.7rem] text-[#6b6757]">{look.price}</p>
                    </div>
                    <Link
                      href={`/tailors/${look.tailorId}`}
                      className="shrink-0 text-[0.68rem] font-semibold text-[#8b6914] hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 border border-[#e6e3da] rounded-[6px] p-10 text-center bg-white">
          <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase text-[#8b6914] mb-3">Get your own</p>
          <h2 className="font-display text-[1.8rem] font-bold text-[#0f0e0b] mb-4">Commission something unique</h2>
          <p className="text-[#6b6757] text-[0.9rem] leading-[1.75] max-w-sm mx-auto mb-8">
            Browse our verified tailors and send your first enquiry — it takes under 5 minutes.
          </p>
          <Link
            href="/tailors"
            className="bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity"
          >
            Browse Tailors
          </Link>
        </div>
      </div>
    </div>
  );
}
