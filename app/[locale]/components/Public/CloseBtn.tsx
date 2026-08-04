import { useTranslations } from "next-intl";
import CloseIcon from "../icons/CloseIcon";

export const CloseBtn = ({
  onClose,
  disabled,
}: {
  onClose: () => void;
  disabled?: boolean;
}) => {
  const t = useTranslations();

  return (
    <button
      type="button"
      aria-label={t("analysis.close")}
      disabled={disabled}
      onClick={onClose}
      className="hover:bg-surface-neutral transition-colors duration-150 p-3 rounded-full cursor-pointer place-self-end"
    >
      <CloseIcon className="text-content-muted" height="16" width="16" />
    </button>
  );
};
