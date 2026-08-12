import type { ReactNode } from "react";

const iconPaths: ReactNode[] = [
  <g key="weight">
    <path d="M7 20h10M8.5 20l1-8h5l1 8M9.5 12a2.5 2.5 0 0 1 5 0" />
    <path d="M6 4h12a2 2 0 0 1 2 2v3H4V6a2 2 0 0 1 2-2Z" />
  </g>,
  <g key="habits">
    <path d="M20 7v5h-5" />
    <path d="M18.5 15.5A7.5 7.5 0 1 1 19 8l1 4" />
    <path d="m9 12 2 2 4-4" />
  </g>,
  <g key="digestion">
    <path d="M19.5 4.5C13 4.5 7 7.5 7 13a5 5 0 0 0 5 5c5.5 0 8.5-6 8.5-12.5v-1Z" />
    <path d="M4 20c2.5-5 6-8 11-10" />
  </g>,
  <g key="health">
    <path d="M3 12h4l2-5 4 10 2-5h6" />
    <path d="M19.5 5.5A5 5 0 0 0 12 6a5 5 0 0 0-7.5-.5C.5 9.5 4 15 12 20c8-5 11.5-10.5 7.5-14.5Z" />
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
    className="size-6"
  >
    {iconPaths[index]}
  </svg>
);

export default BenefitIcon;
