export const Badge = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="none"
        viewBox="0 0 16 16"
        className={className}
      >
        <g stroke="currentColor" strokeWidth="1.067" clipPath="url(#a)">
          <path
            fill="transparent"
            d="M7.014 1.75a1.333 1.333 0 0 1 1.972 0l.68.747c.267.293.651.452 1.048.434l1.009-.047c.785-.037 1.43.61 1.394 1.394l-.047 1.009c-.019.396.14.78.434 1.048l.747.68c.58.529.58 1.443 0 1.972l-.747.68a1.33 1.33 0 0 0-.434 1.048l.047 1.009c.037.784-.61 1.43-1.394 1.394l-1.009-.047a1.33 1.33 0 0 0-1.048.434l-.68.747c-.53.58-1.443.58-1.972 0l-.68-.747a1.33 1.33 0 0 0-1.048-.434l-1.009.047a1.333 1.333 0 0 1-1.394-1.394l.047-1.01c.019-.396-.14-.78-.434-1.047l-.747-.68a1.333 1.333 0 0 1 0-1.972l.747-.68c.293-.267.453-.652.434-1.048l-.047-1.01a1.333 1.333 0 0 1 1.394-1.393l1.01.047c.396.018.78-.14 1.047-.434z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 8 1.333 1.333L10 6.666"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h16v16H0z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
