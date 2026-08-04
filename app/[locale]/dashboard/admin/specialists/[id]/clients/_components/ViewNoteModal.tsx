import { LastNote } from "@/app/[locale]/api/types/profile.types";
import { formatDate } from "@/app/[locale]/utils/formateDate";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useLocale, useTranslations } from "next-intl";
import { CloseBtn } from "@/app/[locale]/components/Public/CloseBtn";

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
      <div className="flex max-h-[85dvh] w-[min(100%,32rem)] flex-col overflow-hidden rounded-2xl bg-surface border border-line">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-start gap-2.5">
            <div className="size-9.5 md:size-10 rounded-full bg-accent-soft flex justify-center items-center">
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
          <CloseBtn onClose={onClose} />
        </div>
        <p className="type-body min-h-0 w-full flex-1 overflow-y-auto whitespace-pre-wrap p-5 overscroll-contain">
          {note?.content}
        </p>
      </div>
    </ModalWrapper>
  );
};

export default ViewNoteModal;
