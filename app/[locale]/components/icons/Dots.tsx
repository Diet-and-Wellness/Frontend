const Dots = ({ className = "" }: { className: string }) => {
  return (
    <span className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3"
        height="19"
        viewBox="0 0 3 19"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 3C2.32842 3 3 2.32842 3 1.5C3 0.671578 2.32842 0 1.5 0C0.671578 0 0 0.671578 0 1.5C0 2.32842 0.671578 3 1.5 3ZM1.5 19C2.32842 19 3 18.3284 3 17.5C3 16.6716 2.32842 16 1.5 16C0.671578 16 0 16.6716 0 17.5C0 18.3284 0.671578 19 1.5 19ZM1.5 11C2.32842 11 3 10.3284 3 9.50002C3 8.67159 2.32842 8.00002 1.5 8.00002C0.671578 8.00002 0 8.67159 0 9.50002C0 10.3284 0.671578 11 1.5 11Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
};

export default Dots;
