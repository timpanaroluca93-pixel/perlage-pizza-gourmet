type StatCardProps = {
  label: string;
  value: string | number;
  subtitle?: string;
};

export default function StatCard({ label, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-white/50">{label}</p>

      <p className="mt-2 text-3xl text-[#D2B07A]">{value}</p>

      {subtitle && (
        <p className="mt-2 text-xs text-white/35">{subtitle}</p>
      )}
    </div>
  );
}