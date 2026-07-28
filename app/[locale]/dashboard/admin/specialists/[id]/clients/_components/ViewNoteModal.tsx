import { LastNote } from "@/app/[locale]/api/types/profile.types";
import { formatDate } from "@/app/[locale]/utils/formateDate"; 
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";

const ViewNoteModal = ({
  note,
  onClose,
}: {
  note: LastNote | null;
  onClose: () => void;
}) => {
  return (
    <ModalWrapper>
      <div className="bg-[#FFFEFD] p-7.5 max-w-140 rounded-2xl flex flex-col gap-3.5">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-2.5">
            <div className="size-10 rounded-full bg-[#FCEFE0] flex justify-center items-center">
              <span className="text-[#E99532] text-[16px] font-semibold">
                {note?.writer.firstName.at(0)}
                {note?.writer.lastName.at(0)}
              </span>
            </div>
            <div className="">
              <p className="text-[16px] font-semibold">
                Dr. {note?.writer.firstName} {note?.writer.lastName}
              </p>
              <p className="text-[#A4A4A4] text-[13px]">
                {formatDate(note?.updatedAt ?? "")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-500" width="16" height="16" />
          </button>
        </div>
        <p className="w-125 max-h-100 overflow-scroll whitespace-pre-wrap">
          {note?.content}
        </p>
      </div>
    </ModalWrapper>
  );
};

export default ViewNoteModal;
