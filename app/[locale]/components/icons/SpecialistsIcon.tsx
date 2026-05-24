const SpecialistsIcon = ({
  className = "",
  strokeWidth = "1.333",
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
          d="M18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M10 15H6a4 4 0 0 0-4 4v2M21.7 16.4l-.9-.3M15.2 13.9l-.9-.3M16.6 18.7l.3-.9M19.1 12.2l.3-.9M19.6 18.7l-.4-1M16.8 12.3l-.4-1M14.3 16.6l1-.4M20.7 13.8l1-.4"
        />
      </svg>
    </span>
  );
};

export default SpecialistsIcon;
