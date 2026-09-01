// Small stroke icons, sized by font (1em) and coloured by currentColor so they
// sit naturally in the tab bar and buttons. Kept inline to avoid an icon dep.

type P = { className?: string };
const base = "h-[1.25em] w-[1.25em]";

function svg(children: React.ReactNode, className?: string) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${base} ${className ?? ""}`}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export const HomeIcon = ({ className }: P) =>
  svg(
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
    </>,
    className
  );

export const PulseIcon = ({ className }: P) =>
  svg(<path d="M3 12h4l2.5-6 4 12 2.5-6H21" />, className);

export const MicIcon = ({ className }: P) =>
  svg(
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4M9 21h6" />
    </>,
    className
  );

export const ChartIcon = ({ className }: P) =>
  svg(
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>,
    className
  );

export const GearIcon = ({ className }: P) =>
  svg(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </>,
    className
  );

export const PlayIcon = ({ className }: P) =>
  svg(<path d="M7 5l12 7-12 7V5z" fill="currentColor" stroke="none" />, className);

export const PauseIcon = ({ className }: P) =>
  svg(
    <>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
    </>,
    className
  );

export const CheckIcon = ({ className }: P) => svg(<path d="M5 12.5 10 17l9-10" />, className);

export const CloseIcon = ({ className }: P) =>
  svg(<path d="M6 6l12 12M18 6 6 18" />, className);

export const ChevronRight = ({ className }: P) => svg(<path d="M9 5l7 7-7 7" />, className);

export const TrashIcon = ({ className }: P) =>
  svg(
    <>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M6 7l1 13h10l1-13" />
    </>,
    className
  );

export const ArrowUpRight = ({ className }: P) =>
  svg(<path d="M7 17 17 7M8 7h9v9" />, className);
