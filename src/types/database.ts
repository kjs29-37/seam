export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "customer" | "tailor" | "admin";
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      tailors: {
        Row: {
          id: string;
          user_id: string;
          studio_name: string;
          location: string;
          country: string | null;
          region: string | null;
          bio: string;
          verified: boolean;
          featured: boolean;
          price_min: number;
          price_max: number;
          currency: string;
          delivery_weeks: number;
          response_time: string;
          rating: number;
          review_count: number;
          years_experience: number | null;
          website: string | null;
          instagram: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tailors"]["Row"], "id" | "created_at" | "rating" | "review_count">;
        Update: Partial<Database["public"]["Tables"]["tailors"]["Insert"]>;
      };
      portfolio_items: {
        Row: {
          id: string;
          tailor_id: string;
          title: string;
          garment_type: string;
          image_url: string | null;
          emoji: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["portfolio_items"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["portfolio_items"]["Insert"]>;
      };
      tailor_specialisms: {
        Row: { tailor_id: string; specialism: string };
        Insert: Database["public"]["Tables"]["tailor_specialisms"]["Row"];
        Update: Partial<Database["public"]["Tables"]["tailor_specialisms"]["Row"]>;
      };
      tailor_garment_categories: {
        Row: { tailor_id: string; category: string };
        Insert: Database["public"]["Tables"]["tailor_garment_categories"]["Row"];
        Update: Partial<Database["public"]["Tables"]["tailor_garment_categories"]["Row"]>;
      };
      enquiries: {
        Row: {
          id: string;
          customer_id: string;
          tailor_id: string;
          garment_type: string;
          description: string | null;
          fit_preference: string | null;
          budget_min: number | null;
          budget_max: number | null;
          deadline: string | null;
          inspiration_notes: string | null;
          measurements: Json | null;
          measurement_notes: string | null;
          consultation_requested: boolean;
          consultation_notes: string | null;
          status: "sent" | "quote_received" | "accepted" | "declined" | "expired";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["enquiries"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["enquiries"]["Insert"]>;
      };
      quotes: {
        Row: {
          id: string;
          enquiry_id: string;
          tailor_id: string;
          customer_id: string;
          amount: number;
          currency: string;
          delivery_weeks: number;
          notes: string | null;
          status: "sent" | "accepted" | "declined" | "expired" | "revised";
          expires_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["quotes"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["quotes"]["Insert"]>;
      };
      orders: {
        Row: {
          id: string;
          quote_id: string | null;
          customer_id: string;
          tailor_id: string;
          garment_type: string;
          description: string | null;
          amount: number;
          tailor_payout: number;
          currency: string;
          status: "pending_payment" | "in_production" | "shipped" | "delivered" | "issue_window" | "completed" | "disputed" | "cancelled";
          escrow_status: "unpaid" | "held" | "released" | "refunded" | "paused";
          stripe_payment_intent_id: string | null;
          tracking_number: string | null;
          tracking_carrier: string | null;
          paid_at: string | null;
          shipped_at: string | null;
          delivered_at: string | null;
          issue_window_close_at: string | null;
          completed_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      order_milestones: {
        Row: {
          id: string;
          order_id: string;
          label: string;
          description: string;
          completed_at: string | null;
          sort_order: number;
        };
        Insert: Omit<Database["public"]["Tables"]["order_milestones"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["order_milestones"]["Insert"]>;
      };
      conversations: {
        Row: {
          id: string;
          customer_id: string;
          tailor_id: string;
          order_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["conversations"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          body: string;
          read_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["messages"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: string;
          order_id: string;
          customer_id: string;
          tailor_id: string;
          overall_rating: number;
          fit_rating: number | null;
          quality_rating: number | null;
          communication_rating: number | null;
          delivery_rating: number | null;
          comment: string;
          display_name: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["reviews"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["reviews"]["Insert"]>;
      };
      disputes: {
        Row: {
          id: string;
          order_id: string;
          raised_by: string;
          issue: string;
          customer_detail: string;
          tailor_response: string | null;
          admin_notes: string | null;
          status: "open" | "under_review" | "resolved_release" | "resolved_refund" | "resolved_partial";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["disputes"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["disputes"]["Insert"]>;
      };
      tailor_applications: {
        Row: {
          id: string;
          studio_name: string;
          owner_name: string;
          email: string;
          phone: string | null;
          location: string;
          region: string | null;
          bio: string;
          specialisms: string[];
          garment_categories: string[];
          price_min: number | null;
          price_max: number | null;
          years_experience: number | null;
          website: string | null;
          instagram: string | null;
          status: "pending" | "approved" | "rejected";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tailor_applications"]["Row"], "id" | "created_at" | "status">;
        Update: Partial<Database["public"]["Tables"]["tailor_applications"]["Insert"]>;
      };
    };
  };
};

// Convenience row types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Tailor = Database["public"]["Tables"]["tailors"]["Row"];
export type PortfolioItem = Database["public"]["Tables"]["portfolio_items"]["Row"];
export type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
export type Quote = Database["public"]["Tables"]["quotes"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderMilestone = Database["public"]["Tables"]["order_milestones"]["Row"];
export type Conversation = Database["public"]["Tables"]["conversations"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type Review = Database["public"]["Tables"]["reviews"]["Row"];
export type Dispute = Database["public"]["Tables"]["disputes"]["Row"];
export type TailorApplication = Database["public"]["Tables"]["tailor_applications"]["Row"];

// Extended types with joins
export type TailorWithDetails = Tailor & {
  specialisms: string[];
  garment_categories: string[];
  portfolio: PortfolioItem[];
  reviews: Review[];
};

export type OrderWithParties = Order & {
  tailor: Pick<Tailor, "id" | "studio_name" | "location">;
  customer: Pick<Profile, "id" | "full_name">;
  milestones: OrderMilestone[];
};
