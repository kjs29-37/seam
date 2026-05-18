"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import StepIndicator from "@/components/enquiry/StepIndicator";
import Step1Garment from "@/components/enquiry/Step1Garment";
import Step2Inspiration from "@/components/enquiry/Step2Inspiration";
import Step3Measurements from "@/components/enquiry/Step3Measurements";
import Step4Review from "@/components/enquiry/Step4Review";
import { tailors } from "@/lib/mock-tailors";

function EnquiryForm() {
  const searchParams = useSearchParams();
  const tailorId = searchParams.get("tailor") ?? "lagos-bespoke";
  const tailor = tailors.find((t) => t.id === tailorId) ?? tailors[0];

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

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

  if (submitted) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-[#fdfcf9] px-6">
        <div className="max-w-md text-center">
          <div className="h-16 w-16 bg-[#e8f2ec] rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ✓
          </div>
          <h1 className="font-display text-[2rem] font-bold text-[#0f0e0b] mb-3">
            Enquiry Sent!
          </h1>
          <p className="text-[#6b6757] text-[0.9rem] leading-[1.75] mb-8">
            Your enquiry has been sent to <strong className="text-[#1c1b17]">{tailor.studioName}</strong>.
            They typically respond within {tailor.responseTime}. You&apos;ll receive a notification when they reply with a quote.
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
      {/* Page header */}
      <div className="border-b border-[#e6e3da] bg-white px-8 py-4">
        <div className="mx-auto max-w-[780px] flex items-center justify-between">
          <div>
            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#8b6914]">New Enquiry</p>
            <p className="text-[0.9rem] font-semibold text-[#0f0e0b]">{tailor.studioName}</p>
          </div>
          <Link href={`/tailors/${tailor.id}`} className="text-[0.75rem] text-[#6b6757] hover:text-[#1c1b17] transition">
            ← Back to profile
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[780px] px-6 py-10">
        <StepIndicator current={step} />

        {/* Step content */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-8 mb-6">
          {step === 1 && (
            <Step1Garment data={garment} onChange={handleGarmentChange} />
          )}
          {step === 2 && (
            <Step2Inspiration notes={inspirationNotes} onNotesChange={setInspirationNotes} />
          )}
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
              tailor={tailor.studioName}
              garmentData={garment}
              measurementData={measurements}
              consultationRequested={consultationRequested}
              consultationNotes={consultationNotes}
              onConsultationToggle={() => setConsultationRequested((v) => !v)}
              onConsultationNotesChange={setConsultationNotes}
            />
          )}
        </div>

        {/* Navigation */}
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
              onClick={() => setSubmitted(true)}
              className="bg-[#8b6914] text-white text-[0.75rem] font-semibold tracking-[0.06em] uppercase px-8 py-3 rounded-[6px] hover:opacity-80 transition-opacity"
            >
              Send Enquiry →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NewEnquiryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfcf9]" />}>
      <EnquiryForm />
    </Suspense>
  );
}
