const FeedbackIcon = ({
  className = "",
  strokeWidth = "1.5",
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
        <g clipPath="url(#a)">
          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            clipPath="url(#b)"
          >
            <path d="M16.472 12.91a3.6 3.6 0 0 0 .436-2.69c-.456-2.081-2.979-2.932-4.55-1.537-.125.11-.235.237-.357.363-.123-.127-.233-.253-.358-.363-1.572-1.395-4.094-.544-4.55 1.537a3.6 3.6 0 0 0 .437 2.69c.796 1.29 2.045 2.315 3.298 3.24a1.98 1.98 0 0 0 2.345 0c1.254-.925 2.502-1.95 3.298-3.24M6.71 17.491a.447.447 0 0 0-.252-.673c-1.475-.443-3.425-.675-4.38-.768a.477.477 0 0 0-.524.525c.096.922.33 2.782.772 4.357a.454.454 0 0 0 .684.266c1.358-.872 2.833-2.35 3.7-3.707M17.29 6.507a.448.448 0 0 0 .251.673c1.475.443 3.425.675 4.38.768a.477.477 0 0 0 .524-.525c-.096-.921-.33-2.782-.772-4.357a.454.454 0 0 0-.684-.265c-1.357.871-2.833 2.35-3.7 3.706z" />
            <path d="M19.047 4.382A10.3 10.3 0 0 0 11.895 1.5a10.3 10.3 0 0 0-7.35 3.075A10.52 10.52 0 0 0 1.5 12m3.453 7.619a10.3 10.3 0 0 0 7.152 2.881 10.3 10.3 0 0 0 7.35-3.075A10.52 10.52 0 0 0 22.5 12" />
          </g>
        </g>
        <defs>
          <clipPath id="a">
            <path fill="none" d="M0 0h24v24H0z" />
          </clipPath>
          <clipPath id="b">
            <path fill="none" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
};

export default FeedbackIcon;
