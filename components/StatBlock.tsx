export default function StatBlock({
  value,
  unit,
  label,
}: {
  value: string;
  unit?: string;
  label: string;
}) {
  return (
    <div className="border-t border-line py-6 first:border-t-0 sm:border-l sm:border-t-0 sm:py-0 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
      <p className="font-display text-4xl font-semibold text-ink">
        {value}
        {unit && <span className="ml-1 font-mono text-lg font-normal text-ink-2">{unit}</span>}
      </p>
      <p className="mt-2 text-sm text-ink-2">{label}</p>
    </div>
  );
}
