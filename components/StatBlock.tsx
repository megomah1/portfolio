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
    <div className="border-t border-zinc-200 py-6 first:border-t-0 sm:border-l sm:border-t-0 sm:py-0 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
      <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        {value}
        {unit && <span className="ml-1 text-lg font-mono font-normal text-zinc-500 dark:text-zinc-400">{unit}</span>}
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}
