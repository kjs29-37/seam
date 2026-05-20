import { redirect } from "next/navigation";
import { tailors } from "@/lib/mock-tailors";
import EnquiryFormClient from "./EnquiryFormClient";

export default async function NewEnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ tailor?: string }>;
}) {
  const { tailor: tailorId } = await searchParams;
  if (!tailorId) redirect("/tailors");

  const tailor = tailors.find((t) => t.id === tailorId);
  if (!tailor) redirect("/tailors");

  return <EnquiryFormClient tailorId={tailor.id} tailorName={tailor.studioName} responseTime={tailor.responseTime} />;
}
