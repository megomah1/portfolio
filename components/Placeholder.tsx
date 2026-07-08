type PlaceholderProps = {
  label: string;
  className?: string;
  aspect?: string;
};

export default function Placeholder({ label, className = "", aspect = "aspect-[4/3]" }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`TODO: ${label}`}
      className={`${aspect} ${className} flex items-center justify-center rounded-xl border border-dashed border-line bg-surface p-4 text-center`}
    >
      <span className="text-xs leading-relaxed text-ink-3">
        TODO: image
        <br />
        {label}
      </span>
    </div>
  );
}
