const CloseIcon = ({
  className,
  width = "20",
  height = "20",
}: {
  className: string;
  width?: string;
  height?: string;
}) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 17 17"
        fill="none"
      >
        <path
          d="M1.02537 15.8765L15.8612 1.01392M1 1L15.8533 15.8452"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CloseIcon;
