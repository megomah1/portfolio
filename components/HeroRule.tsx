const TICKS = 80;

/* A quiet ruler of tick marks under the hero. On hover the ticks rise in a
   slow travelling ripple (staggered transition delays), felt, not noticed. */
export default function HeroRule() {
  return (
    <div
      aria-hidden
      className="group flex h-5 w-full items-end justify-between border-b border-line pb-1"
    >
      {Array.from({ length: TICKS }, (_, i) => (
        <span
          key={i}
          style={{ transitionDelay: `${(i % 20) * 18}ms` }}
          className="h-[7px] w-px origin-bottom bg-ink-3/40 transition-transform duration-300 ease-out motion-safe:group-hover:scale-y-[1.7]"
        />
      ))}
    </div>
  );
}
