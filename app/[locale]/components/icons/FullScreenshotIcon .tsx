const FullScreenshotIcon = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="75"
        height="75"
        viewBox="0 0 75 75"
        fill="none"
      >
        <path
          d="M12.5 28.125V18.75C12.5 17.0924 13.1585 15.5027 14.3306 14.3306C15.5027 13.1585 17.0924 12.5 18.75 12.5H28.125M62.5 46.875V56.25C62.5 57.9076 61.8415 59.4973 60.6694 60.6694C59.4973 61.8415 57.9076 62.5 56.25 62.5H46.875M46.875 12.5H56.25C57.9076 12.5 59.4973 13.1585 60.6694 14.3306C61.8415 15.5027 62.5 17.0924 62.5 18.75V28.125M28.125 62.5H18.75C17.0924 62.5 15.5027 61.8415 14.3306 60.6694C13.1585 59.4973 12.5 57.9076 12.5 56.25V46.875"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default FullScreenshotIcon;
