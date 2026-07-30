import { useTranslations } from "next-intl";
import ThemeSwitch from "@/app/[locale]/components/Theme/ThemeSwitch";

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
    <header className="mx-auto flex w-full max-w-260 items-center justify-between gap-4 border-b border-b-line px-4 py-4 sm:px-5 sm:py-5">
      <h2 className="type-card-title font-medium text-content">{title}</h2>
      <div className="flex shrink-0 items-center gap-3">
        <ThemeSwitch />
        <button
          onClick={onClose}
          className="type-control shrink-0 font-semibold text-accent cursor-pointer"
        >
          {closeLabel ?? t("cancel")}
        </button>
      </div>
    </header>
  );
};

export default AssessmentHeader;
