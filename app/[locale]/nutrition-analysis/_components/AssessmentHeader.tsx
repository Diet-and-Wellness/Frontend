const AssessmentHeader = ({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) => {
  return (
    <header className="mx-auto max-w-260 border-b border-b-[#E1E7EF] flex justify-between items-center py-5">
      <h2 className="text-[#111827] text-[20px] font-medium">{title}</h2>
      <button
        onClick={onClose}
        className="text-[#E99532] text-[18px] font-semibold cursor-pointer"
      >
        Close
      </button>
    </header>
  );
};

export default AssessmentHeader;
