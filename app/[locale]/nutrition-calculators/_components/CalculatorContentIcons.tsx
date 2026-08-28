import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const iconDefaults = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M9 3h6M10 3v5l-5.5 9.2A2.5 2.5 0 0 0 6.65 21h10.7a2.5 2.5 0 0 0 2.15-3.8L14 8V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M12 3 5 6v5c0 4.7 2.9 8.1 7 10 4.1-1.9 7-5.3 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ListChecksIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="m3.5 6.5 1.3 1.3L7 5.5M10 7h10M3.5 12l1.3 1.3L7 11M10 12.5h10M3.5 17.5l1.3 1.3L7 16.5M10 18h10" />
    </svg>
  );
}

export function HelpCircleIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.8 9a2.35 2.35 0 0 1 4.55.8c0 1.8-2.35 2-2.35 3.7M12 17.2h.01" />
    </svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="m8 10 4 4 4-4" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M4 6h7M15 6h5M4 12h3M11 12h9M4 18h9M17 18h3" />
      <circle cx="13" cy="6" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="15" cy="18" r="2" />
    </svg>
  );
}

export function TargetRangeIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3" />
    </svg>
  );
}

export function ChartResultIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      <path d="m4 7 5-3 5 4 6-5" />
    </svg>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M3.5 5.5A3.5 3.5 0 0 1 7 3h4v16H7a3.5 3.5 0 0 0-3.5 2V5.5ZM20.5 5.5A3.5 3.5 0 0 0 17 3h-4v16h4a3.5 3.5 0 0 1 3.5 2V5.5Z" />
    </svg>
  );
}

export function VerifiedIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="m12 2.8 2.2 1.5 2.7-.1.9 2.5 2.2 1.6-.8 2.6.8 2.6-2.2 1.6-.9 2.5-2.7-.1-2.2 1.5-2.2-1.5-2.7.1-.9-2.5-2.2-1.6.8-2.6-.8-2.6 2.2-1.6.9-2.5 2.7.1L12 2.8Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
