"use client";

import { useState } from "react";
import Link from "next/link";
import StepIndicator from "@/components/enquiry/StepIndicator";
import Step1Garment from "@/components/enquiry/Step1Garment";
import Step2Inspiration from "@/components/enquiry/Step2Inspiration";
import Step3Measurements from "@/components/enquiry/Step3Measurements";
import Step4Review from "@/components/enquiry/Step4Review";
import { submitEnquiry } from "@/lib/supabase/actions";
import type { TailorWithDetails } from "@/types/database";

interface Props {
  tailor: TailorWithDetails;
}

export default function EnquiryFormClient({ tailor }: Props) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [garment, setGarment] = useState({
    garmentType: "",
    description: "",
    deadline: "",
    budgetMin: "",
    budgetMax: "",
    fitPreference: "",
  });

  const [inspirationNotes, setInspirationNotes] = useState("");
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [measurementNotes, setMeasurementNotes] = useState("");
  const [consultationRequested, setConsultationRequested] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState("");

  function handleGarmentChange(field: string, value: string) {
    setGarment((prev) => ({ ...prev, [field]: value }));
  }

  function handleMeasurementChange(field: string, value: string) {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
  }

  function canProceed() {
    if (step === 1) return garment.garmentType !== "";
    return true;
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    const result = await submitEnquiry({
      tailorId: tailor.id,
      garmentType: garment.garmentType,
      description: garment.description,
      fitPreference: garment.fitPreference,
      budgetMin: garment.budgetMin ? parseFloat(garment.budgetMin) : null,
      budgetMax: garment.budgetMax ? parseFloat(garment.budgetMax) : null,
      deadline: garment.deadline || null,
      inspirationNotes,
      measurements,
      measurementNotes,
      consultationRequested,
      consultationNotes,
    });
    if (result.error) {
      setSubmitError(result.error);
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-[#fdfcf9] px-6">
        <div className="max-w-md text-center">
          <div className="h-16 w-16 bg-[#e8f2ec] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="font-display text-[2rem] font-bold text-[#0f0e0b] mb-3">Enquiry Sent!</h1>
          <p className="text-[#6b6757] text-[0.9rem] leading-[1.75] mb-8">
            Your enquiry has been sent to{" "}
            <strong className="text-[#1c1b17]">{tailor.studio_name}</strong>. They typically respond{" "}
            {tailor.response_time}. You&apos;ll receive a notification when they reply with a quote.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/customer/dashboard"
              className="bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:opacity-80 transition-opacity"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/tailors"
              className="border border-[#d0ccbf] text-[#1c1b17] text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3.5 rounded-[6px] hover:bg-[#f7f5f0] transition"
            >
              Browse More Tailors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfcf9] min-h-screen">
      <div className="border-b border-[#e6e3da] bg-white px-8 py-4">
        <div className="mx-auto max-w-[780px] flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914]">New Enquiry</p>
            <p className="text-[0.9rem] font-semibold text-[#0f0e0b]">{tailor.studio_name}</p>
          </div>
          <Link href={`/tailors/${tailor.id}`} className="text-[0.75rem] text-[#6b6757] hover:text-[#1c1b17] transition">
            ← Back to profile
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[780px] px-6 py-10">
        <StepIndicator current={step} />

        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
          {step === 1 && <Step1Garment data={garment} onChange={handleGarmentChange} />}
          {step === 2 && <Step2Inspiration notes={inspirationNotes} onNotesChange={setInspirationNotes} />}
          {step === 3 && (
            <Step3Measurements
              data={measurements}
              notes={measurementNotes}
              onChange={handleMeasurementChange}
              onNotesChange={setMeasurementNotes}
            />
          )}
          {step === 4 && (
            <Step4Review
              tailor={tailor.studio_name}
              garmentData={garment}
              measurementData={measurements}
              consultationRequested={consultationRequested}
              consultationNotes={consultationNotes}
              onConsultationToggle={() => setConsultationRequested((v) => !v)}
              onConsultationNotesChange={setConsultationNotes}
            />
          )}
        </div>

        {submitError && (
          <p className="text-[0.78rem] text-red-600 bg-red-50 border border-red-200 rounded-[4px] px-4 py-2.5 mb-4">{submitError}</p>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="border border-[#d0ccbf] text-[#6b6757] text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-6 py-3 rounded-[6px] hover:bg-[#f7f5f0] transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Back
          </button>

          <p className="text-[0.72rem] text-[#9c9886]">Step {step} of 4</p>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(4, s + 1))}
              disabled={!canProceed()}
              className="bg-[#0f0e0b] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-6 py-3 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-[#8b6914] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3 rounded-[6px] hover:opacity-80 transition-opacity disabled:opacity-40 flex items-center gap-2"
            >
              {submitting && <span className="animate-spin">◌</span>}
              Send Enquiry →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
