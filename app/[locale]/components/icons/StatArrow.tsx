"use client";

const StatArrow = ({
  className = "",
  strokeWidth = "1.667",
}: {
  className?: string;
  strokeWidth?: string;
}) => {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="m22 7-8.5 8.5-5-5L2 17"
        />

        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M16 7h6v6"
        />
      </svg>
    </span>
  );
};

export default StatArrow;
