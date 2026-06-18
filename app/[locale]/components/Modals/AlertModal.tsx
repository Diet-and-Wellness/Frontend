import CloseIcon from "../icons/CloseIcon";
import Spinner from "../Public/LoadingSpinner";
import ModalWrapper from "../Public/ModalWrapper";

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
  return (
    <ModalWrapper>
      <div className="bg-[#FFFEFD] p-7.5 rounded-2xl max-w-90 relative">
        <div className="flex justify-end absolute right-3 top-3">
          <button
            onClick={closeModal}
            className="hover:bg-gray-100 transition-colors duration-200 justify-end place-self-end p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-600" height="16" width="16" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          {illustrator}
          <p className="text-center text-[#4F4F4F] font-light text-[20px]">
            {note}
          </p>
          <div className="flex flex-col gap-2.5 w-full">
            <button
              disabled={pending}
              onClick={confirm}
              className="bg-[#DC2626] w-full min-h-11 rounded-full text-[#FDFDFD] font-medium cursor-pointer flex justify-center items-center"
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
              className="bg-[#FFFEFD] w-full min-h-11 rounded-full text-black border border-[#E1E7EF] font-medium cursor-pointer"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default AlertModal;
