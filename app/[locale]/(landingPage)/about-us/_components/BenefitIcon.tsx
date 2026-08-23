import type { ReactNode } from "react";

const iconPaths: ReactNode[] = [
  <g key="weight">
    <path d="M7 20h10M8.5 20l1-8h5l1 8M9.5 12a2.5 2.5 0 0 1 5 0" />
    <path d="M6 4h12a2 2 0 0 1 2 2v3H4V6a2 2 0 0 1 2-2Z" />
  </g>,
  <g key="habits">
    <path d="M4 12a8 8 0 1 0 2.34-5.66M6.34 3v3.34h3.34" />
    <path d="m8.25 12 2.25 2.25 4.5-4.5" />
  </g>,
  <g key="digestion">
    <path d="M19.5 4.5C13 4.5 7 7.5 7 13a5 5 0 0 0 5 5c5.5 0 8.5-6 8.5-12.5v-1Z" />
    <path d="M4 20c2.5-5 6-8 11-10" />
  </g>,
  <g key="health">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5C2 10.8 3.5 12.55 5 14l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </g>,
];

const BenefitIcon = ({ index }: { index: number }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-7"
  >
    {iconPaths[index]}
  </svg>
);

export default BenefitIcon;
