const measurements = [
  { field: "height", label: "Height", unit: "cm", placeholder: "e.g. 178" },
  { field: "chest", label: "Chest / Bust", unit: "cm", placeholder: "e.g. 96" },
  { field: "waist", label: "Waist", unit: "cm", placeholder: "e.g. 82" },
  { field: "hips", label: "Hips", unit: "cm", placeholder: "e.g. 100" },
  { field: "shoulder", label: "Shoulder Width", unit: "cm", placeholder: "e.g. 44" },
  { field: "sleeve", label: "Sleeve Length", unit: "cm", placeholder: "e.g. 62" },
  { field: "neck", label: "Neck", unit: "cm", placeholder: "e.g. 38" },
  { field: "trouserLength", label: "Trouser Length", unit: "cm", placeholder: "e.g. 78" },
  { field: "inseam", label: "Inseam", unit: "cm", placeholder: "e.g. 81" },
];

type MeasurementData = Record<string, string>;

type Props = {
  data: MeasurementData;
  notes: string;
  onChange: (field: string, value: string) => void;
  onNotesChange: (v: string) => void;
};

const labelClass = "block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2";
const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

export default function Step3Measurements({ data, notes, onChange, onNotesChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[1.5rem] font-bold text-[#0f0e0b] mb-1">Your Measurements</h2>
        <p className="text-[0.86rem] text-[#6b6757]">
          Accurate measurements are essential for a great fit. All measurements are in centimetres.
          Your data is private and only shared with the tailor after you submit an enquiry.
        </p>
      </div>

      <div className="bg-[#faf4e1] border border-[#c49a2a]/30 rounded-[6px] p-4 text-[0.78rem] text-[#8b6914]">
        <strong>How to measure:</strong> Use a soft tape measure held snug but not tight.
        Measure at the widest point for chest, waist, and hips. Stand straight with feet together.
      </div>

      {/* Measurement grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {measurements.map((m) => (
          <div key={m.field}>
            <label className={labelClass}>{m.label}</label>
            <div className="relative">
              <input
                type="number"
                placeholder={m.placeholder}
                value={data[m.field] ?? ""}
                onChange={(e) => onChange(m.field, e.target.value)}
                className={`${inputClass} pr-14`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.75rem] text-[#9c9886] font-medium">
                {m.unit}
              </span>
            </div>
          </div>
        ))}

        {/* Weight — optional */}
        <div>
          <label className={labelClass}>Weight (optional)</label>
          <div className="relative">
            <input
              type="number"
              placeholder="e.g. 75"
              value={data.weight ?? ""}
              onChange={(e) => onChange("weight", e.target.value)}
              className={`${inputClass} pr-14`}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[0.75rem] text-[#9c9886] font-medium">
              kg
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Measurement Notes (optional)</label>
        <textarea
          rows={3}
          placeholder="e.g. I have broad shoulders, slightly longer right arm, prefer extra room in the chest..."
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* 3D scan placeholder */}
      <div className="border border-[#e6e3da] rounded-[6px] p-5 flex items-center gap-4 bg-white">
        <div className="h-10 w-10 bg-[#f7f5f0] rounded-[6px] flex items-center justify-center text-xl shrink-0">
          📱
        </div>
        <div>
          <p className="text-[0.82rem] font-semibold text-[#1c1b17]">Phone-based 3D body scan — coming soon</p>
          <p className="text-[0.75rem] text-[#6b6757] mt-0.5">
            We&apos;re working on a mobile scan feature for precise digital measurements. For now, please use a tape measure.
          </p>
        </div>
      </div>
    </div>
  );
}
