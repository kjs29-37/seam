type Props = {
  tailor: string;
  garmentData: { garmentType: string; description: string; deadline: string; budgetMin: string; budgetMax: string; fitPreference: string };
  measurementData: Record<string, string>;
  consultationRequested: boolean;
  consultationNotes: string;
  onConsultationToggle: () => void;
  onConsultationNotesChange: (v: string) => void;
};

const labelClass = "block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2";
const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

export default function Step4Review({
  tailor,
  garmentData,
  measurementData,
  consultationRequested,
  consultationNotes,
  onConsultationToggle,
  onConsultationNotesChange,
}: Props) {
  const filledMeasurements = Object.entries(measurementData).filter(([, v]) => v);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[1.5rem] font-bold text-[#0f0e0b] mb-1">Review & Submit</h2>
        <p className="text-[0.86rem] text-[#6b6757]">
          Check your enquiry details before sending to the tailor.
        </p>
      </div>

      {/* Summary cards */}
      <div className="space-y-3">
        {/* Tailor */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
          <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-2">Sending to</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#f7f5f0] rounded-[6px] flex items-center justify-center text-xl">🧵</div>
            <div>
              <p className="font-display text-[1rem] font-bold text-[#0f0e0b]">{tailor}</p>
              <p className="text-[0.75rem] text-[#6b6757]">Verified Tailor · SEAM Platform</p>
            </div>
          </div>
        </div>

        {/* Garment */}
        <div className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
          <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-3">Garment Details</p>
          <div className="space-y-0">
            {[
              { label: "Type", value: garmentData.garmentType || "—" },
              { label: "Fit", value: garmentData.fitPreference || "—" },
              { label: "Budget", value: garmentData.budgetMin && garmentData.budgetMax ? `£${garmentData.budgetMin} – £${garmentData.budgetMax}` : "—" },
              { label: "Deadline", value: garmentData.deadline || "—" },
            ].map((row) => (
              <div key={row.label} className="flex gap-4 py-2.5 border-b border-[#f0ede6] last:border-0 text-[0.84rem]">
                <span className="text-[0.65rem] font-bold tracking-[0.06em] uppercase text-[#6b6757] min-w-[80px] shrink-0 pt-0.5">{row.label}</span>
                <span className="text-[#1c1b17]">{row.value}</span>
              </div>
            ))}
            {garmentData.description && (
              <div className="pt-3">
                <p className="text-[0.65rem] font-bold tracking-[0.06em] uppercase text-[#6b6757] mb-1">Description</p>
                <p className="text-[0.84rem] text-[#1c1b17] leading-[1.6]">{garmentData.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Measurements summary */}
        {filledMeasurements.length > 0 && (
          <div className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
            <p className="text-[0.62rem] font-bold tracking-[0.12em] uppercase text-[#6b6757] mb-3">
              Measurements ({filledMeasurements.length} provided)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filledMeasurements.map(([key, value]) => (
                <div key={key} className="bg-[#f7f5f0] rounded-[4px] px-3 py-2">
                  <p className="text-[0.6rem] font-bold tracking-[0.06em] uppercase text-[#9c9886]">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p className="text-[0.84rem] font-semibold text-[#0f0e0b]">{value} cm</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Consultation request */}
      <div className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.84rem] font-semibold text-[#0f0e0b]">Request a consultation?</p>
            <p className="text-[0.78rem] text-[#6b6757] mt-0.5">
              The tailor will confirm a video call via Google Meet, Zoom or WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onConsultationToggle}
            className={`shrink-0 w-11 h-6 rounded-full border transition-colors relative ${
              consultationRequested ? "bg-[#0f0e0b] border-[#0f0e0b]" : "bg-white border-[#d0ccbf]"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white border transition-transform ${
                consultationRequested ? "translate-x-5 border-white shadow" : "translate-x-0.5 border-[#d0ccbf]"
              }`}
            />
          </button>
        </div>

        {consultationRequested && (
          <div className="mt-4 pt-4 border-t border-[#e6e3da]">
            <label className={labelClass}>Preferred times (optional)</label>
            <textarea
              rows={2}
              placeholder="e.g. Weekday evenings UK time, or weekend mornings..."
              value={consultationNotes}
              onChange={(e) => onConsultationNotesChange(e.target.value)}
              className={`${inputClass} resize-none`}
            />
          </div>
        )}
      </div>

      {/* Escrow notice */}
      <div className="bg-[#e8f2ec] border border-[#c0d9c8] rounded-[6px] p-5 text-[0.82rem] text-[#1a5c38] leading-[1.65]">
        <p className="font-semibold mb-1">🔒 How SEAM protects you</p>
        <p>
          Once you accept a quote and pay, your funds are held securely in escrow by SEAM.
          The tailor is only paid after you receive your garment and the issue window closes.
          You have full recourse if anything goes wrong.
        </p>
      </div>
    </div>
  );
}
