export const Diamond = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          fill="currentColor"
          d="M7.984 0H2.666a.67.67 0 0 0-.596.37l-2 4a.67.67 0 0 0 .063.697l5.99 7.986a.667.667 0 0 0 1.086.002l5.99-7.988a.67.67 0 0 0 .063-.699l-2-4A.67.67 0 0 0 10.666 0zM7.52 1.333 8.408 4H4.925l.888-2.667zM9.813 4l-.888-2.667h1.33L11.587 4zM8.408 5.333 6.666 10.56 4.925 5.333zm.19 3.647 1.215-3.647h1.52zm-3.864 0L2 5.333h1.52zM3.52 4H1.745l1.333-2.667h1.33z"
        />
      </svg>
    </div>
  );
};
