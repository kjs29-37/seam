type Step = { number: number; label: string };

const steps: Step[] = [
  { number: 1, label: "Garment" },
  { number: 2, label: "Inspiration" },
  { number: 3, label: "Measurements" },
  { number: 4, label: "Review" },
];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-[0.72rem] font-bold border transition-colors ${
                step.number < current
                  ? "bg-[#0f0e0b] border-[#0f0e0b] text-white"
                  : step.number === current
                  ? "bg-[#8b6914] border-[#8b6914] text-white"
                  : "bg-white border-[#d0ccbf] text-[#9c9886]"
              }`}
            >
              {step.number < current ? "✓" : step.number}
            </div>
            <span
              className={`mt-1.5 text-[0.65rem] font-medium tracking-[0.06em] uppercase whitespace-nowrap ${
                step.number === current ? "text-[#8b6914]" : step.number < current ? "text-[#0f0e0b]" : "text-[#9c9886]"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 h-px mb-5 mx-1 ${step.number < current ? "bg-[#0f0e0b]" : "bg-[#e6e3da]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
