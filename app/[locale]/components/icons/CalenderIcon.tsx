export const Calender = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
        className={className}
      >
        <path
          fill="currentColor"
          d="M9 16.875c-4.342 0-7.875-3.533-7.875-7.875S4.657 1.125 9 1.125c4.342 0 7.875 3.532 7.875 7.875 0 4.342-3.533 7.875-7.875 7.875M9 2.25A6.755 6.755 0 0 0 2.25 9 6.755 6.755 0 0 0 9 15.75 6.755 6.755 0 0 0 15.75 9 6.755 6.755 0 0 0 9 2.25"
        />
        <path
          fill="currentColor"
          d="M11.25 11.813a.55.55 0 0 1-.293-.08l-2.812-1.687a.56.56 0 0 1-.27-.483v-4.5c0-.316.248-.563.563-.563S9 4.747 9 5.063v4.185l2.543 1.518a.565.565 0 0 1-.293 1.047"
        />
      </svg>
    </div>
  );
};
