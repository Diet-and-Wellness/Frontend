const Collapse = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M16.2249 16.2249C16.8813 15.5685 17.25 14.6783 17.25 13.75V4.25C17.25 3.32174 16.8813 2.4315 16.2249 1.77513C15.5685 1.11875 14.6783 0.75 13.75 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V13.75C0.75 14.6783 1.11875 15.5685 1.77513 16.2249C2.4315 16.8813 3.32174 17.25 4.25 17.25H13.75C14.6783 17.25 15.5685 16.8813 16.2249 16.2249Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 1V17" stroke="currentColor" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default Collapse;
