const PlusIcon = ({ className }: { className: string }) => {
  return (
    <div className={`w-7 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          d="M14.0007 5.83398V22.1673M5.83398 14.0007H22.1673"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default PlusIcon;
