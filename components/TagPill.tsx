export default function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-tint px-3 py-1 text-sm font-medium text-accent">
      {children}
    </span>
  );
}
