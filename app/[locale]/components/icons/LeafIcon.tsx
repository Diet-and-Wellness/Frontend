export const Leaf = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="none"
        viewBox="0 0 12 12"
      >
        <g
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          clipPath="url(#a)"
        >
          <path d="M5.5 10a3.5 3.5 0 0 1-.6-6.95C7.75 2.5 8.5 2.24 9.5 1c.5 1 1 2.09 1 4 0 2.75-2.39 5-5 5" />
          <path d="M1 10.5c0-1.5.925-2.68 2.54-3C4.75 7.26 6 6.5 6.5 6" />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="currentColor" d="M0 0h12v12H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
