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
  const writerFirstName = note?.writer?.firstName?.trim() ?? "";
  const writerLastName = note?.writer?.lastName?.trim() ?? "";
  const writerName = `${writerFirstName} ${writerLastName}`.trim();
  const writerInitials =
    `${writerFirstName.at(0) ?? ""}${writerLastName.at(0) ?? ""}` || "—";

  return (
    <ModalWrapper>
      <div className="flex max-h-[85dvh] w-[min(100%,35rem)] flex-col overflow-hidden rounded-2xl bg-surface">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4 sm:px-7.5">
          <div className="flex items-start gap-2.5">
            <div className="size-10 rounded-full bg-accent-soft flex justify-center items-center">
              <span className="type-label font-semibold text-accent">
                {writerInitials}
              </span>
            </div>
            <div className="">
              <p className="type-label font-semibold">
                {t("doctorName", {
                  name: writerName || "—",
                })}
              </p>
              <p className="type-meta text-content-placeholder">
                {formatDate(note?.updatedAt ?? "", locale)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-surface-neutral transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-content-subtle" width="16" height="16" />
          </button>
        </div>
        <p className="type-body min-h-0 w-full flex-1 overflow-y-auto whitespace-pre-wrap p-5 overscroll-contain sm:p-7.5">
          {note?.content}
        </p>
      </div>
    </ModalWrapper>
  );
};

export default ViewNoteModal;
