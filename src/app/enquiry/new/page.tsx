import { getTailor } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import EnquiryFormClient from "./EnquiryFormClient";

export default async function NewEnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ tailor?: string }>;
}) {
  const { tailor: tailorId } = await searchParams;
  if (!tailorId) redirect("/tailors");

  const tailor = await getTailor(tailorId);
  if (!tailor) redirect("/tailors");

  return <EnquiryFormClient tailor={tailor} />;
}
