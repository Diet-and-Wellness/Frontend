const Tab = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`type-control p-2.5 cursor-pointer ${isActive ? "text-[#E99532] shadow-[0_2px_0_0_#E99532]" : "text-[#4F4F4F]"} transition-all duration-300`}
    >
      {label}
    </button>
  );
};

export default Tab;
