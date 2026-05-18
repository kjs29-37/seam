type Props = { label: string; value: string | number; sub?: string; accent?: boolean };

export default function StatCard({ label, value, sub, accent }: Props) {
  return (
    <div className="bg-white border border-[#e6e3da] rounded-[6px] p-5">
      <p className="text-[0.65rem] font-bold tracking-[0.1em] uppercase text-[#6b6757]">{label}</p>
      <p className={`mt-2 font-display text-[1.8rem] font-bold ${accent ? "text-[#8b6914]" : "text-[#0f0e0b]"}`}>
        {value}
      </p>
      {sub && <p className="mt-1 text-[0.72rem] text-[#9c9886]">{sub}</p>}
    </div>
  );
}
