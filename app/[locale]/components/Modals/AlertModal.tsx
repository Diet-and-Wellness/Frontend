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
      <div className="relative w-[clamp(18rem,90vw,25rem)] rounded-2xl bg-[#FFFEFD] p-5 sm:w-[min(100%,22.5rem)] sm:p-7.5">
        <div className="flex justify-end absolute end-3 top-3">
          <button
            onClick={closeModal}
            className="hover:bg-gray-100 transition-colors duration-200 justify-end place-self-end p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-600" height="16" width="16" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          {illustrator}
          <p className="type-body-lg text-center font-light text-[#4F4F4F]">
            {note}
          </p>
          <div className="flex flex-col gap-2.5 w-full">
            <button
              disabled={pending}
              onClick={confirm}
              className="type-control flex min-h-11 w-full items-center justify-center rounded-full bg-[#DC2626] font-medium text-[#FDFDFD] cursor-pointer"
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
              className="type-control min-h-11 w-full rounded-full border border-[#E1E7EF] bg-[#FFFEFD] font-medium text-black cursor-pointer"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AlertModal;
