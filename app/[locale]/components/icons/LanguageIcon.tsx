const LanguageIcon = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3.5 12h17M12 3c2.2 2.45 3.25 5.45 3.25 9S14.2 18.55 12 21M12 3C9.8 5.45 8.75 8.45 8.75 12S9.8 18.55 12 21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

export default LanguageIcon;
