import { useTranslations } from "next-intl";

const AssessmentHeader = ({
  title,
  onClose,
  closeLabel,
}: {
  title: string;
  onClose: () => void;
  closeLabel?: string;
}) => {
  const t = useTranslations("dashboard");
  return (
    <header className="mx-auto flex w-full max-w-260 items-center justify-between gap-4 border-b border-b-[#E1E7EF] px-4 py-4 sm:px-5 sm:py-5">
      <h2 className="type-card-title font-medium text-[#111827]">{title}</h2>
      <button
        onClick={onClose}
        className="type-control shrink-0 font-semibold text-[#E99532] cursor-pointer"
      >
        {closeLabel ?? t("cancel")}
      </button>
    </header>
  );
};

export default AssessmentHeader;
