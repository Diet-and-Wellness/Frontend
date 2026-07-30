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
      className={`cursor-pointer p-2.5 text-base font-medium sm:text-lg ${isActive ? "text-accent shadow-[0_2px_0_0_var(--color-palette-e99532)]" : "text-content-muted"} transition-all duration-300`}
    >
      {label}
    </button>
  );
};

export default Tab;
