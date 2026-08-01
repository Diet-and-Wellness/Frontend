import CloseIcon from "../icons/CloseIcon";
import Spinner from "../Public/LoadingSpinner";
import ModalWrapper from "../Public/ModalWrapper";
import { useTranslations } from "next-intl";

const AlertModal = ({
  note,
  confirmBtnTitle,
  confirm,
  closeModal,
  illustrator,
  pending,
}: {
  note: string;
  confirmBtnTitle: string;
  confirm: () => void;
  closeModal: () => void;
  illustrator: React.ReactNode;
  pending: boolean;
}) => {
  const t = useTranslations("dashboard");
  return (
    <ModalWrapper>
      <div className="relative flex max-h-[85dvh] w-[clamp(18rem,90vw,25rem)] flex-col overflow-hidden rounded-2xl bg-surface sm:w-[min(100%,22.5rem)] border border-line">
        <div className="absolute inset-e-3 top-3 z-10 flex justify-end">
          <button
            onClick={closeModal}
            className="hover:bg-surface-neutral transition-colors duration-200 justify-end place-self-end p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-content-muted" height="16" width="16" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col items-center gap-5 overflow-y-auto overscroll-contain p-5 pb-3 sm:p-7.5 sm:pb-4">
          {illustrator}
          <p className="type-body-lg text-center font-light text-content-muted">
            {note}
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2.5 bg-surface p-5 pt-3 sm:px-7.5 sm:pb-7.5 sm:pt-4">
            <button
              disabled={pending}
              onClick={confirm}
              className="type-control flex min-h-11 w-full items-center justify-center rounded-full bg-danger font-medium text-surface-raised cursor-pointer"
            >
              {pending ? (
                <Spinner spinnerSize={25} />
              ) : (
                <p className="">{confirmBtnTitle}</p>
              )}
            </button>
            <button
              disabled={pending}
              onClick={closeModal}
              className="type-control min-h-11 w-full rounded-full border border-line bg-surface font-medium text-content cursor-pointer"
            >
              {t("cancel")}
            </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AlertModal;
