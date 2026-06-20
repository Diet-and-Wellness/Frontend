const CroppedScreenshotIcon = ({ className }: { className: string }) => {
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
          d="M46.875 59.375V53.125C46.875 51.4674 47.5335 49.8777 48.7056 48.7056C49.8777 47.5335 51.4674 46.875 53.125 46.875H59.375M46.875 15.625V21.875C46.875 23.5326 47.5335 25.1223 48.7056 26.2944C49.8777 27.4665 51.4674 28.125 53.125 28.125H59.375M15.625 46.875H21.875C23.5326 46.875 25.1223 47.5335 26.2944 48.7056C27.4665 49.8777 28.125 51.4674 28.125 53.125V59.375M15.625 28.125H21.875C23.5326 28.125 25.1223 27.4665 26.2944 26.2944C27.4665 25.1223 28.125 23.5326 28.125 21.875V15.625"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default CroppedScreenshotIcon;
