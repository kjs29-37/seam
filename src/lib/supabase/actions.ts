// @ts-nocheck — types regenerated from Supabase after running: npx supabase gen types typescript
"use server";

import { createClient } from "./server";
import { redirect } from "next/navigation";

// ── Auth ─────────────────────────────────────────────────────

export async function signUp(formData: {
  email: string;
  password: string;
  fullName: string;
  role: "customer" | "tailor";
}) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: { full_name: formData.fullName, role: formData.role },
    },
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message, role: null };
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single<{ role: string }>();
  return { error: null, role: profile?.role ?? "customer" };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

// ── Enquiries ────────────────────────────────────────────────

export async function submitEnquiry(data: {
  tailorId: string;
  garmentType: string;
  description: string;
  fitPreference: string;
  budgetMin: number | null;
  budgetMax: number | null;
  deadline: string | null;
  inspirationNotes: string;
  measurements: Record<string, string>;
  measurementNotes: string;
  consultationRequested: boolean;
  consultationNotes: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", id: null };

  const { data: enquiry, error } = await supabase
    .from("enquiries")
    .insert({
      customer_id: user.id,
      tailor_id: data.tailorId,
      garment_type: data.garmentType,
      description: data.description,
      fit_preference: data.fitPreference,
      budget_min: data.budgetMin,
      budget_max: data.budgetMax,
      deadline: data.deadline,
      inspiration_notes: data.inspirationNotes,
      measurements: data.measurements,
      measurement_notes: data.measurementNotes,
      consultation_requested: data.consultationRequested,
      consultation_notes: data.consultationNotes,
      status: "sent",
    })
    .select("id")
    .single();

  if (error) return { error: error.message, id: null };
  return { error: null, id: enquiry.id };
}

// ── Reviews ──────────────────────────────────────────────────

export async function submitReview(data: {
  orderId: string;
  tailorId: string;
  overallRating: number;
  fitRating?: number;
  qualityRating?: number;
  communicationRating?: number;
  deliveryRating?: number;
  comment: string;
  displayName: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("reviews").insert({
    order_id: data.orderId,
    customer_id: user.id,
    tailor_id: data.tailorId,
    overall_rating: data.overallRating,
    fit_rating: data.fitRating ?? null,
    quality_rating: data.qualityRating ?? null,
    communication_rating: data.communicationRating ?? null,
    delivery_rating: data.deliveryRating ?? null,
    comment: data.comment,
    display_name: data.displayName,
  });

  if (error) return { error: error.message };
  return { error: null };
}

// ── Applications ─────────────────────────────────────────────

export async function submitApplication(data: {
  studioName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  region: string;
  bio: string;
  specialisms: string[];
  garmentCategories: string[];
  priceMin: number | null;
  priceMax: number | null;
  yearsExperience: number | null;
  website: string;
  instagram: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("tailor_applications").insert({
    studio_name: data.studioName,
    owner_name: data.ownerName,
    email: data.email,
    phone: data.phone || null,
    location: data.location,
    region: data.region || null,
    bio: data.bio,
    specialisms: data.specialisms,
    garment_categories: data.garmentCategories,
    price_min: data.priceMin,
    price_max: data.priceMax,
    years_experience: data.yearsExperience,
    website: data.website || null,
    instagram: data.instagram || null,
  });

  if (error) return { error: error.message };
  return { error: null };
}

// ── Messages ─────────────────────────────────────────────────

export async function sendMessage(conversationId: string, body: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    body,
  });

  if (error) return { error: error.message };
  return { error: null };
}

// ── Order actions ─────────────────────────────────────────────

export async function confirmDelivery(orderId: string) {
  const supabase = await createClient();
  const issueWindowCloseAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const { error } = await supabase
    .from("orders")
    .update({
      status: "issue_window",
      delivered_at: new Date().toISOString(),
      issue_window_close_at: issueWindowCloseAt,
    })
    .eq("id", orderId);
  if (error) return { error: error.message };
  return { error: null };
}

export async function raiseDispute(data: {
  orderId: string;
  issue: string;
  customerDetail: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated", id: null };

  const { data: dispute, error } = await supabase
    .from("disputes")
    .insert({
      order_id: data.orderId,
      raised_by: user.id,
      issue: data.issue,
      customer_detail: data.customerDetail,
      status: "open",
    })
    .select("id")
    .single();

  if (error) return { error: error.message, id: null };

  // Pause escrow
  await supabase
    .from("orders")
    .update({ status: "disputed", escrow_status: "paused" })
    .eq("id", data.orderId);

  return { error: null, id: dispute.id };
}

export async function approveAndRelease(orderId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status: "completed", escrow_status: "released", completed_at: new Date().toISOString() })
    .eq("id", orderId);
  if (error) return { error: error.message };
  return { error: null };
}

// ── Admin: Tailor Applications ───────────────────────────────

// Placeholder user_id for approved tailors who haven't created an account yet
const SEED_USER_ID = "00000000-0000-0000-0000-000000000000";

export async function approveApplication(applicationId: string): Promise<{ error: string | null }> {
  const supabase = await createClient();

  // Fetch the application
  const { data: app, error: fetchError } = await supabase
    .from("tailor_applications")
    .select("*")
    .eq("id", applicationId)
    .single();

  if (fetchError || !app) return { error: fetchError?.message ?? "Application not found" };

  // Create the tailor profile
  const { data: tailor, error: tailorError } = await supabase
    .from("tailors")
    .insert({
      user_id: SEED_USER_ID,
      studio_name: app.studio_name,
      location: app.location,
      region: app.region ?? null,
      bio: app.bio ?? "",
      price_min: app.price_min ?? 0,
      price_max: app.price_max ?? 0,
      years_experience: app.years_experience ?? null,
      website: app.website ?? null,
      instagram: app.instagram ?? null,
      verified: true,
    })
    .select("id")
    .single();

  if (tailorError || !tailor) return { error: tailorError?.message ?? "Failed to create tailor profile" };

  // Insert specialisms
  if (Array.isArray(app.specialisms) && app.specialisms.length > 0) {
    await supabase.from("tailor_specialisms").insert(
      app.specialisms.map((s: string) => ({ tailor_id: tailor.id, specialism: s }))
    );
  }

  // Insert garment categories
  if (Array.isArray(app.garment_categories) && app.garment_categories.length > 0) {
    await supabase.from("tailor_garment_categories").insert(
      app.garment_categories.map((c: string) => ({ tailor_id: tailor.id, category: c }))
    );
  }

  // Mark application approved
  const { error: updateError } = await supabase
    .from("tailor_applications")
    .update({ status: "approved" })
    .eq("id", applicationId);

  if (updateError) return { error: updateError.message };
  return { error: null };
}

export async function rejectApplication(applicationId: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("tailor_applications")
    .update({ status: "rejected" })
    .eq("id", applicationId);
  if (error) return { error: error.message };
  return { error: null };
}
