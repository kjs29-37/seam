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
    id: "lagos-bespoke",
    studioName: "Lagos Bespoke Studio",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    verified: true,
    featured: true,
    profileImage: "",
    bio: "Award-winning atelier specialising in contemporary African formalwear. We blend traditional Yoruba craftsmanship with modern silhouettes to create garments that travel the world.",
    specialisms: ["Suits", "Agbada", "Kaftans", "Trousers", "Shirts"],
    garmentCategories: ["Men", "Unisex"],
    priceMin: 180,
    priceMax: 900,
    currency: "£",
    deliveryWeeks: "4–6",
    rating: 4.9,
    reviewCount: 142,
    responseTime: "<2h",
    portfolio: [
      { id: "p1", title: "3-Piece Wedding Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p2", title: "Embroidered Agbada", garmentType: "Agbada", emoji: "👘" },
      { id: "p3", title: "Slim-Fit Kaftan", garmentType: "Kaftan", emoji: "🥻" },
      { id: "p4", title: "Linen Summer Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p5", title: "Ankara Shirt", garmentType: "Shirt", emoji: "👔" },
      { id: "p6", title: "Senator Outfit", garmentType: "Traditional", emoji: "👘" },
    ],
    reviews: [
      { id: "r1", customer: "James O.", rating: 5, comment: "Absolutely exceptional. The suit fit perfectly on the first try — remarkable for remote tailoring.", date: "2 weeks ago" },
      { id: "r2", customer: "Kofi A.", rating: 5, comment: "My agbada was stunning. Delivered exactly as described and on time.", date: "1 month ago" },
      { id: "r3", customer: "Marcus T.", rating: 4, comment: "Very professional process. Minor adjustment needed but handled quickly.", date: "6 weeks ago" },
    ],
  },
  {
    id: "nairobi-tailors",
    studioName: "Nairobi Tailors Co.",
    location: "Nairobi, Kenya",
    country: "Kenya",
    verified: true,
    featured: true,
    profileImage: "",
    bio: "East Africa's premier bespoke house. Specialising in bridal and occasion wear with over 15 years of experience dressing clients across four continents.",
    specialisms: ["Bridal", "Evening Wear", "Dresses", "Suits"],
    garmentCategories: ["Women", "Men"],
    priceMin: 250,
    priceMax: 1400,
    currency: "£",
    deliveryWeeks: "6–10",
    rating: 4.8,
    reviewCount: 89,
    responseTime: "<4h",
    portfolio: [
      { id: "p1", title: "Beaded Bridal Gown", garmentType: "Bridal", emoji: "👗" },
      { id: "p2", title: "Silk Evening Dress", garmentType: "Evening Wear", emoji: "👗" },
      { id: "p3", title: "Kitenge Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p4", title: "Reception Gown", garmentType: "Bridal", emoji: "👰" },
    ],
    reviews: [
      { id: "r1", customer: "Amara K.", rating: 5, comment: "My wedding dress was a dream. Every detail was exactly as I described.", date: "3 weeks ago" },
      { id: "r2", customer: "Priya M.", rating: 5, comment: "The evening dress was extraordinary. True couture quality.", date: "2 months ago" },
    ],
  },
  {
    id: "accra-threads",
    studioName: "Accra Threads",
    location: "Accra, Ghana",
    country: "Ghana",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Contemporary Ghanaian fashion house rooted in kente tradition. We create garments that celebrate African heritage for the global citizen.",
    specialisms: ["Kente", "Kaba & Slit", "Shirts", "Casual Wear"],
    garmentCategories: ["Men", "Women", "Unisex"],
    priceMin: 120,
    priceMax: 600,
    currency: "£",
    deliveryWeeks: "3–5",
    rating: 4.7,
    reviewCount: 63,
    responseTime: "<6h",
    portfolio: [
      { id: "p1", title: "Kente Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p2", title: "Kaba & Slit Set", garmentType: "Traditional", emoji: "👗" },
      { id: "p3", title: "Print Shirt", garmentType: "Shirt", emoji: "👔" },
      { id: "p4", title: "Dashiki Dress", garmentType: "Dress", emoji: "👗" },
    ],
    reviews: [
      { id: "r1", customer: "Ama D.", rating: 5, comment: "The kente fabric quality was outstanding. Shipped faster than expected.", date: "1 month ago" },
      { id: "r2", customer: "Ben F.", rating: 4, comment: "Beautiful work. Great communication throughout.", date: "6 weeks ago" },
    ],
  },
  {
    id: "dakar-couture",
    studioName: "Dakar Couture House",
    location: "Dakar, Senegal",
    country: "Senegal",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Senegalese haute couture with a French-influenced edge. Specialising in women's occasion wear and bespoke boubous for the modern woman.",
    specialisms: ["Boubou", "Evening Wear", "Occasion Wear", "Dresses"],
    garmentCategories: ["Women"],
    priceMin: 200,
    priceMax: 800,
    currency: "£",
    deliveryWeeks: "5–8",
    rating: 4.6,
    reviewCount: 41,
    responseTime: "<8h",
    portfolio: [
      { id: "p1", title: "Grand Boubou", garmentType: "Traditional", emoji: "👘" },
      { id: "p2", title: "Occasion Dress", garmentType: "Dress", emoji: "👗" },
      { id: "p3", title: "Silk Evening Gown", garmentType: "Evening Wear", emoji: "👗" },
    ],
    reviews: [
      { id: "r1", customer: "Fatou B.", rating: 5, comment: "Absolutely beautiful work. The boubou was exactly what I envisioned.", date: "5 weeks ago" },
    ],
  },
  {
    id: "cairo-bespoke",
    studioName: "Cairo Bespoke",
    location: "Cairo, Egypt",
    country: "Egypt",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Masters of Egyptian cotton tailoring. We craft lightweight, breathable garments for warm-weather occasions with a refined Mediterranean sensibility.",
    specialisms: ["Shirts", "Linen Suits", "Trousers", "Casual Wear"],
    garmentCategories: ["Men"],
    priceMin: 90,
    priceMax: 500,
    currency: "£",
    deliveryWeeks: "3–5",
    rating: 4.5,
    reviewCount: 28,
    responseTime: "<12h",
    portfolio: [
      { id: "p1", title: "Egyptian Cotton Shirt", garmentType: "Shirt", emoji: "👔" },
      { id: "p2", title: "Linen Summer Suit", garmentType: "Suit", emoji: "🤵" },
      { id: "p3", title: "Slim Linen Trousers", garmentType: "Trousers", emoji: "👖" },
    ],
    reviews: [
      { id: "r1", customer: "Ahmed R.", rating: 5, comment: "The finest linen shirts I've ever worn. Truly exceptional cotton quality.", date: "3 weeks ago" },
    ],
  },
  {
    id: "kampala-stitch",
    studioName: "Kampala Stitch Co.",
    location: "Kampala, Uganda",
    country: "Uganda",
    verified: true,
    featured: false,
    profileImage: "",
    bio: "Ugandan craftsmanship meeting contemporary streetwear. We make bold, statement garments that celebrate African print culture for the younger generation.",
    specialisms: ["Shirts", "Trousers", "Casual Wear", "Streetwear"],
    garmentCategories: ["Men", "Women", "Unisex"],
    priceMin: 80,
    priceMax: 350,
    currency: "£",
    deliveryWeeks: "3–4",
    rating: 4.4,
    reviewCount: 19,
    responseTime: "<24h",
    portfolio: [
      { id: "p1", title: "Print Bomber Jacket", garmentType: "Jacket", emoji: "🧥" },
      { id: "p2", title: "Ankara Joggers", garmentType: "Casual", emoji: "👖" },
      { id: "p3", title: "Statement Shirt", garmentType: "Shirt", emoji: "👔" },
    ],
    reviews: [
      { id: "r1", customer: "David N.", rating: 4, comment: "Great communication, bold designs. Will order again.", date: "1 month ago" },
    ],
  },
];
