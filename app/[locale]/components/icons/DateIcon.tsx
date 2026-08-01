export const Date = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
        className={className}
      >
        <path
          stroke="currentColor"
          d="M14.25 4.5H3.75A1.5 1.5 0 0 0 2.25 6v8.25a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5Z"
        />
        <path
          fill="currentColor"
          d="M2.25 7.5c0-1.415 0-2.121.44-2.56.439-.44 1.146-.44 2.56-.44h7.5c1.415 0 2.121 0 2.56.44.44.439.44 1.145.44 2.56z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          d="M5.25 2.25V4.5m7.5-2.25V4.5"
        />
      </svg>
    </div>
  );
};
