const garmentTypes = [
  "Suit (2-piece)", "Suit (3-piece)", "Blazer", "Trousers / Pants",
  "Shirt", "Dress", "Gown / Evening Wear", "Bridal / Wedding Dress",
  "Áo Dài", "Salwar Kameez / Kurta", "Thai Silk Dress",
  "Jacket / Coat", "Casual Wear", "Other",
];

const fitPreferences = ["Slim fit", "Regular fit", "Relaxed fit", "Oversized", "Not sure — tailor to advise"];

type Props = {
  data: {
    garmentType: string;
    description: string;
    deadline: string;
    budgetMin: string;
    budgetMax: string;
    fitPreference: string;
  };
  onChange: (field: string, value: string) => void;
};

const labelClass = "block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-[#6b6757] mb-2";
const inputClass = "w-full px-4 py-3 border border-[#d0ccbf] rounded-[6px] text-[0.9rem] bg-[#fdfcf9] text-[#1c1b17] placeholder:text-[#9c9886] focus:outline-none focus:border-[#8b6914] focus:ring-2 focus:ring-[#8b6914]/10 transition";

export default function Step1Garment({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[1.5rem] font-bold text-[#0f0e0b] mb-1">Garment Details</h2>
        <p className="text-[0.86rem] text-[#6b6757]">Tell us what you&apos;d like made and give the tailor as much detail as possible.</p>
      </div>

      {/* Garment type */}
      <div>
        <label className={labelClass}>Garment Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {garmentTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange("garmentType", type)}
              className={`px-3 py-2.5 text-[0.78rem] font-medium rounded-[6px] border text-left transition ${
                data.garmentType === type
                  ? "border-[#8b6914] bg-[#faf4e1] text-[#8b6914]"
                  : "border-[#d0ccbf] bg-white text-[#6b6757] hover:bg-[#f7f5f0]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Describe the garment</label>
        <textarea
          rows={4}
          placeholder="Describe the style, fabric preferences, colour, occasion, any specific details you want included..."
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Fit preference */}
      <div>
        <label className={labelClass}>Fit Preference</label>
        <div className="flex flex-wrap gap-2">
          {fitPreferences.map((fit) => (
            <button
              key={fit}
              type="button"
              onClick={() => onChange("fitPreference", fit)}
              className={`px-4 py-2 text-[0.78rem] font-medium rounded-full border transition ${
                data.fitPreference === fit
                  ? "border-[#8b6914] bg-[#faf4e1] text-[#8b6914]"
                  : "border-[#d0ccbf] bg-white text-[#6b6757] hover:bg-[#f7f5f0]"
              }`}
            >
              {fit}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className={labelClass}>Budget Range (£)</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              placeholder="Min e.g. 200"
              value={data.budgetMin}
              onChange={(e) => onChange("budgetMin", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Max e.g. 500"
              value={data.budgetMax}
              onChange={(e) => onChange("budgetMax", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className={labelClass}>When do you need it by?</label>
        <input
          type="date"
          value={data.deadline}
          onChange={(e) => onChange("deadline", e.target.value)}
          className={inputClass}
        />
        <p className="mt-1.5 text-[0.72rem] text-[#9c9886]">
          Allow at least 4 weeks for production. Rush orders may incur additional cost.
        </p>
      </div>
    </div>
  );
}
