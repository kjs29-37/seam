type Props = {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
};

export default function StatCard({ label, value, sub, accent }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${accent ? "text-emerald-400" : "text-white"}`}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}
