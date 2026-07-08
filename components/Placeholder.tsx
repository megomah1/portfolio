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
      className={`${aspect} ${className} flex items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-center dark:border-zinc-700 dark:bg-zinc-900`}
    >
      <span className="text-xs leading-relaxed text-zinc-400 dark:text-zinc-600">
        TODO: image
        <br />
        {label}
      </span>
    </div>
  );
}
