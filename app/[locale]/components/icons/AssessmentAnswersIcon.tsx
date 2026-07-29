const AssessmentAnswersIcon = ({ className = "" }: { className?: string }) => {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8 3H6.8C5.806 3 5 3.806 5 4.8V19.2C5 20.194 5.806 21 6.8 21H17.2C18.194 21 19 20.194 19 19.2V4.8C19 3.806 18.194 3 17.2 3H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 3.5C9 2.672 9.672 2 10.5 2H13.5C14.328 2 15 2.672 15 3.5V5H9V3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 10L10 11.5L12.5 9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.5 10H16.5M14.5 13.5H16.5M8.5 16.5H16.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

export default AssessmentAnswersIcon;
