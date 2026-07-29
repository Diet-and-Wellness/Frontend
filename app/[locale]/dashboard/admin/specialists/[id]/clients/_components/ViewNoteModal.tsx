import { LastNote } from "@/app/[locale]/api/types/profile.types";
import { formatDate } from "@/app/[locale]/utils/formateDate"; 
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useLocale, useTranslations } from "next-intl";

const ViewNoteModal = ({
  note,
  onClose,
}: {
  note: LastNote | null;
  onClose: () => void;
}) => {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  return (
    <ModalWrapper>
      <div className="flex w-[min(100%,35rem)] flex-col gap-3.5 rounded-2xl bg-[#FFFEFD] p-5 sm:p-7.5">
        <div className="flex justify-between items-center">
          <div className="flex items-start gap-2.5">
            <div className="size-10 rounded-full bg-[#FCEFE0] flex justify-center items-center">
              <span className="type-label font-semibold text-[#E99532]">
                {note?.writer.firstName.at(0)}
                {note?.writer.lastName.at(0)}
              </span>
            </div>
            <div className="">
              <p className="type-label font-semibold">
                {t("doctorName", {
                  name: `${note?.writer.firstName ?? ""} ${note?.writer.lastName ?? ""}`.trim(),
                })}
              </p>
              <p className="type-meta text-[#A4A4A4]">
                {formatDate(note?.updatedAt ?? "", locale)}
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
        <p className="type-body max-h-100 w-full overflow-y-auto whitespace-pre-wrap">
          {note?.content}
        </p>
      </div>
    </ModalWrapper>
  );
};

export default ViewNoteModal;
