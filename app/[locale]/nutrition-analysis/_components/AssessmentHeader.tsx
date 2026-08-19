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
    <header className="mx-auto flex w-full max-w-260 items-center justify-between gap-4 border-b border-b-line px-4 py-4 sm:px-5 sm:py-5">
      <h2 className="type-card-title font-medium text-content">{title}</h2>
      <div className="flex shrink-0 items-center gap-3 md:gap-5">
        <button
          onClick={onClose}
          className="
            shrink-0 cursor-pointer
            items-center
            rounded-none
            border border-transparent
            bg-transparent
            p-0
            font-medium
            text-accent
            transition-colors

            md:rounded-full
            md:border-line
            md:bg-surface-muted
            md:px-5
            md:py-1.5
            md:hover:border-brand
          "
        >
          {closeLabel ?? t("cancel")}
        </button>
      </div>
    </header>
  );
};

export default AssessmentHeader;
