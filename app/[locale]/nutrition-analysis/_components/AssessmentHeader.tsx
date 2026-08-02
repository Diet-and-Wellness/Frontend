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
      <div className="flex shrink-0 items-center gap-3 md:gap-5">
        <ThemeSwitch />
        <button
          onClick={onClose}
          className="shrink-0 cursor-pointer items-center rounded-full border border-line bg-surface-muted px-5 py-1.5 text-accent font-medium transition-colors hover:border-brand"
        >
          {closeLabel ?? t("cancel")}
        </button>
      </div>
    </header>
  );
};

export default AssessmentHeader;
