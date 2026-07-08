export default function TodoBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-sienna/40 bg-sienna-tint p-6 text-sm text-ink">
      <p className="font-semibold text-sienna">TODO — content not available</p>
      <p className="mt-1 leading-relaxed text-ink-2">{children}</p>
    </div>
  );
}
