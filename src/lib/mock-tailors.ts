export type Tailor = {
  id: string;
  studioName: string;
  location: string;
  country: string;
  verified: boolean;
  featured: boolean;
  profileImage: string;
  bio: string;
  specialisms: string[];
  garmentCategories: string[];
  priceMin: number;
  priceMax: number;
  currency: string;
  deliveryWeeks: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  portfolio: { id: string; title: string; garmentType: string; emoji: string }[];
  reviews: { id: string; customer: string; rating: number; comment: string; date: string }[];
};

export const tailors: Tailor[] = [
  {
    id: "hanoi-silk",
    studioName: "Hanoi Silk Atelier",
    location: "Hanoi, Vietnam",
    country: "Vietnam",
    verified: true,
    featured: true,
    profileImage: "",
    bio: "Master silk tailors in the heart of Hanoi's Old Quarter. Specialising in the iconic Vietnamese Áo Dài and bespoke silk garments for women worldwide. Each piece is hand-cut from premium Vietnamese silk sourced directly from artisan weavers in Hà Đông.",
    specialisms: ["Áo Dài", "Silk Dresses", "Evening Wear", "Bridal", "Blouses"],
    garmentCategories: ["Women"],
    priceMin: 150,
    priceMax: 900,
    currency: "£",
    deliveryWeeks: "4–6",
    rating: 4.9,
    reviewCount: 118,
    responseTime: "<2h",
    portfolio: [
      { id: "p1", title: "Traditional Áo Dài in Ivory Silk", garmentType: "Áo Dài", emoji: "👘" },
      { id: "p2", title: "Modern Áo Dài with Embroidery", garmentType: "Áo Dài", emoji: "👘" },
      { id: "p3", title: "Silk Bridal Gown", garmentType: "Bridal", emoji: "👗" },
      { id: "p4", title: "Silk Evening Dress", garmentType: "Evening Wear", emoji: "👗" },
      { id: "p5", title: "Embroidered Blouse", garmentType: "Blouse", emoji: "👚" },
      { id: "p6", title: "Silk Wedding Áo Dài Set", garmentType: "Bridal", emoji: "👰" },
    ],
    reviews: [
      { id: "r1", customer: "Sophie L.", rating: 5, comment: "My Áo Dài was absolutely breathtaking. The silk quality and embroidery were beyond anything I expected — perfect fit on the first try.", date: "2 weeks ago" },
      { id: "r2", customer: "Mei T.", rating: 5, comment: "Wore my custom silk gown to a black-tie event and received countless compliments. Flawless remote tailoring process.", date: "1 month ago" },
      { id: "r3", customer: "Clara B.", rating: 4, comment: "Beautiful craftsmanship. Small adjustment needed but it was handled professionally and quickly.", date: "6 weeks ago" },
    ],
  },
  {
    id: "saigon-bespoke",
    studioName: "Saigon Bespoke Co.",
    location: "Ho Chi Minh City, Vietnam",
    country: "Vietnam",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Ho Chi Minh City's premier men's tailoring studio. Renowned for sharp, well-priced bespoke suits crafted from premium Vietnamese and imported fabrics. Over 20 years dressing international clients from our Ben Thanh workshop.",
    specialisms: ["Suits", "Shirts", "Trousers", "Blazers", "Casual Wear"],
    garmentCategories: ["Men"],
    priceMin: 120,
    priceMax: 650,
    currency: "£",
    deliveryWeeks: "3–5",
    rating: 4.7,
    reviewCount: 74,
    responseTime: "<4h",
    portfolio: [
      { id: "p1", title: "Slim 2-Piece Business Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p2", title: "3-Piece Wedding Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p3", title: "Slim Oxford Dress Shirt", garmentType: "Shirt", emoji: "👔" },
      { id: "p4", title: "Tailored Linen Trousers", garmentType: "Trousers", emoji: "👖" },
    ],
    reviews: [
      { id: "r1", customer: "Tom H.", rating: 5, comment: "Best value bespoke suit I've ever had. The fabric selection was impressive and the fit was impeccable.", date: "3 weeks ago" },
      { id: "r2", customer: "Daniel F.", rating: 4, comment: "Very professional communication. The shirts came out perfectly — ordering more.", date: "2 months ago" },
    ],
  },
  {
    id: "bangkok-tailors",
    studioName: "Bangkok Classic Tailors",
    location: "Bangkok, Thailand",
    country: "Thailand",
    verified: true,
    featured: true,
    profileImage: "",
    bio: "One of Bangkok's most respected bespoke tailoring houses, with 25 years crafting suits and formal wear for international clients from our Sukhumvit workshop. Renowned for exceptional fabric quality, precise construction, and a seamless remote fitting process.",
    specialisms: ["Suits", "Shirts", "Blazers", "Trousers", "Evening Wear"],
    garmentCategories: ["Men", "Women"],
    priceMin: 200,
    priceMax: 1200,
    currency: "£",
    deliveryWeeks: "5–8",
    rating: 4.8,
    reviewCount: 97,
    responseTime: "<3h",
    portfolio: [
      { id: "p1", title: "Double-Breasted Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p2", title: "3-Piece Morning Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p3", title: "Slim Evening Blazer", garmentType: "Blazer", emoji: "🧥" },
      { id: "p4", title: "Women's Power Suit", garmentType: "Suit", emoji: "👔" },
      { id: "p5", title: "Business Dress Shirt", garmentType: "Shirt", emoji: "👔" },
      { id: "p6", title: "Tailored Wool Trousers", garmentType: "Trousers", emoji: "👖" },
    ],
    reviews: [
      { id: "r1", customer: "James O.", rating: 5, comment: "Absolutely exceptional. The suit arrived perfectly fitted — remarkable for remote tailoring. Will use again for every formal occasion.", date: "2 weeks ago" },
      { id: "r2", customer: "Richard P.", rating: 5, comment: "The double-breasted suit is extraordinary. Finest wool I've felt at this price point.", date: "1 month ago" },
      { id: "r3", customer: "Marcus T.", rating: 4, comment: "Very professional process. Minor adjustment needed but handled swiftly.", date: "6 weeks ago" },
    ],
  },
  {
    id: "silom-couture",
    studioName: "Silom Couture House",
    location: "Bangkok, Thailand",
    country: "Thailand",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Specialists in Thai silk couture. Creating stunning occasion wear and formal dresses from hand-woven Thai silk sourced directly from artisan weavers in Chiang Mai. Each garment is a wearable expression of centuries-old Thai textile tradition.",
    specialisms: ["Thai Silk", "Evening Wear", "Occasion Wear", "Dresses", "Bridal"],
    garmentCategories: ["Women"],
    priceMin: 250,
    priceMax: 1400,
    currency: "£",
    deliveryWeeks: "6–8",
    rating: 4.6,
    reviewCount: 52,
    responseTime: "<6h",
    portfolio: [
      { id: "p1", title: "Thai Silk Evening Gown", garmentType: "Evening Wear", emoji: "👗" },
      { id: "p2", title: "Silk Occasion Dress", garmentType: "Dress", emoji: "👗" },
      { id: "p3", title: "Bridal Silk Gown", garmentType: "Bridal", emoji: "👰" },
    ],
    reviews: [
      { id: "r1", customer: "Priya S.", rating: 5, comment: "The Thai silk evening gown was absolutely stunning. Received endless compliments at the gala.", date: "5 weeks ago" },
    ],
  },
  {
    id: "dhaka-threads",
    studioName: "Dhaka Thread Co.",
    location: "Dhaka, Bangladesh",
    country: "Bangladesh",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Contemporary tailoring from the garment capital of the world. We specialise in lightweight cotton and muslin pieces — breathable, beautifully crafted and sustainably made. Kurtas, salwar kameez, and casual wear for the modern global wardrobe.",
    specialisms: ["Kurta", "Salwar Kameez", "Cotton Shirts", "Casual Wear", "Linen Trousers"],
    garmentCategories: ["Men", "Women", "Unisex"],
    priceMin: 70,
    priceMax: 400,
    currency: "£",
    deliveryWeeks: "3–5",
    rating: 4.5,
    reviewCount: 43,
    responseTime: "<8h",
    portfolio: [
      { id: "p1", title: "Block-Print Kurta", garmentType: "Kurta", emoji: "👘" },
      { id: "p2", title: "Cotton Salwar Kameez Set", garmentType: "Salwar Kameez", emoji: "👗" },
      { id: "p3", title: "Muslin Casual Shirt", garmentType: "Shirt", emoji: "👔" },
      { id: "p4", title: "Linen Palazzo Trousers", garmentType: "Trousers", emoji: "👖" },
    ],
    reviews: [
      { id: "r1", customer: "Aisha M.", rating: 5, comment: "The muslin kurta is the softest, most breathable garment I own. Impeccable finish.", date: "1 month ago" },
      { id: "r2", customer: "Ben K.", rating: 4, comment: "Great quality cotton shirts, well-priced. Communication was excellent throughout.", date: "6 weeks ago" },
    ],
  },
  {
    id: "old-dhaka-stitch",
    studioName: "Old Dhaka Stitch",
    location: "Dhaka, Bangladesh",
    country: "Bangladesh",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Preserving the centuries-old tradition of Dhaka muslin embroidery. Our master artisans hand-embroider each garment using nakshi kantha and jamdani techniques passed through generations — creating wearable heirlooms for the diaspora and beyond.",
    specialisms: ["Embroidery", "Sarees", "Salwar Kameez", "Bridal", "Occasion Wear"],
    garmentCategories: ["Women"],
    priceMin: 160,
    priceMax: 900,
    currency: "£",
    deliveryWeeks: "6–10",
    rating: 4.4,
    reviewCount: 31,
    responseTime: "<12h",
    portfolio: [
      { id: "p1", title: "Nakshi Kantha Embroidered Saree", garmentType: "Saree", emoji: "🥻" },
      { id: "p2", title: "Jamdani Occasion Dress", garmentType: "Dress", emoji: "👗" },
      { id: "p3", title: "Embroidered Bridal Lehenga", garmentType: "Bridal", emoji: "👰" },
    ],
    reviews: [
      { id: "r1", customer: "Nadia R.", rating: 5, comment: "The hand embroidery on my saree is extraordinary — like wearing a painting. Truly an heirloom piece.", date: "3 weeks ago" },
    ],
  },
];
