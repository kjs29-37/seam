// @ts-nocheck — types regenerated from Supabase after running: npx supabase gen types typescript
import { createClient } from "./server";
import type { Profile, TailorWithDetails, OrderWithParties } from "@/types/database";

// ── Auth ─────────────────────────────────────────────────────

// Fast: reads JWT from cookie — no network call.
// Use this for display-only data (names, role in UI).
export async function getSession() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Secure: validates token with Supabase auth server — one network call.
// Use this when you need to trust the user identity (before writing to DB).
export async function getUser(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return profile;
}

// ── Tailors ──────────────────────────────────────────────────

export async function getTailors() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tailors")
    .select(`
      *,
      tailor_specialisms ( specialism ),
      tailor_garment_categories ( category ),
      portfolio_items ( * )
    `)
    .order("featured", { ascending: false })
    .order("rating", { ascending: false });

  if (error || !data) return [];

  return data.map((t) => ({
    ...t,
    specialisms: t.tailor_specialisms.map((s: { specialism: string }) => s.specialism),
    garment_categories: t.tailor_garment_categories.map((c: { category: string }) => c.category),
    portfolio: t.portfolio_items,
    reviews: [],
  })) as TailorWithDetails[];
}

export async function getTailor(id: string): Promise<TailorWithDetails | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tailors")
    .select(`
      *,
      tailor_specialisms ( specialism ),
      tailor_garment_categories ( category ),
      portfolio_items ( * ),
      reviews ( * )
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    ...data,
    specialisms: data.tailor_specialisms.map((s: { specialism: string }) => s.specialism),
    garment_categories: data.tailor_garment_categories.map((c: { category: string }) => c.category),
    portfolio: data.portfolio_items,
    reviews: data.reviews,
  } as TailorWithDetails;
}

// ── Orders ───────────────────────────────────────────────────

export async function getOrder(id: string): Promise<OrderWithParties | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      tailor:tailors ( id, studio_name, location ),
      customer:profiles ( id, full_name ),
      milestones:order_milestones ( * )
    `)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return {
    ...data,
    milestones: (data.milestones as typeof data.milestones).sort(
      (a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order
    ),
  } as unknown as OrderWithParties;
}

export async function getCustomerOrders(customerId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select(`*, tailor:tailors ( studio_name, location )`)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getTailorOrders(tailorId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("orders")
    .select(`*, customer:profiles ( full_name )`)
    .eq("tailor_id", tailorId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ── Enquiries ────────────────────────────────────────────────

export async function getCustomerEnquiries(customerId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enquiries")
    .select(`*, tailor:tailors ( studio_name )`)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getTailorEnquiries(tailorId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("enquiries")
    .select(`*, customer:profiles ( full_name )`)
    .eq("tailor_id", tailorId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ── Quotes ───────────────────────────────────────────────────

export async function getCustomerQuotes(customerId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quotes")
    .select(`*, tailor:tailors ( studio_name ), enquiry:enquiries ( garment_type )`)
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ── Messages ─────────────────────────────────────────────────

export async function getConversations(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select(`
      *,
      tailor:tailors ( studio_name ),
      order:orders ( garment_type ),
      messages ( body, created_at, sender_id )
    `)
    .or(`customer_id.eq.${userId}`)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getMessages(conversationId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  return data ?? [];
}

// ── Reviews ──────────────────────────────────────────────────

export async function getTailorReviews(tailorId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .eq("tailor_id", tailorId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ── Disputes ─────────────────────────────────────────────────

export async function getDispute(id: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("disputes")
    .select(`*, order:orders ( garment_type, amount, currency ), events:dispute_events ( * )`)
    .eq("id", id)
    .single();
  return data;
}

export async function getOpenDisputes() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("disputes")
    .select(`*, order:orders ( garment_type, amount, currency, customer_id, tailor_id )`)
    .in("status", ["open", "under_review"])
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ── Applications ─────────────────────────────────────────────

export async function getPendingApplications() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tailor_applications")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true });
  return data ?? [];
}
