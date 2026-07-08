export default function TodoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-amber-400 bg-amber-50 p-6 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
      <p className="font-semibold">TODO — content not available</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}
