const AddNoteIcon = ({ className }: { className: string }) => {
  return (
    <div className={`${className} min-w-4.5 min-h-4.5`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M8.5 10.5H9.5V7.5H12.5V6.5H9.5V3.5H8.5V6.5H5.5V7.5H8.5V10.5ZM0 17.077V0H18V14H3.077L0 17.077ZM2.65 13H17V1H1V14.644L2.65 13Z"
          fill="black"
        />
      </svg>
    </div>
  );
};

export default AddNoteIcon;
