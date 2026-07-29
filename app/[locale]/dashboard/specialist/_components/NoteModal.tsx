"use client";

import { ChangeEvent, useState } from "react";
import { notesApi } from "@/app/[locale]/api/endpoints/notes.api";
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import PenIcon from "@/app/[locale]/components/icons/Pen";
import SaveIcon from "@/app/[locale]/components/icons/SaveIcon";
import TrashIcon from "@/app/[locale]/components/icons/TrashIcon";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/app/[locale]/hooks/useMe";
import { AnimatePresence } from "framer-motion";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import TrashIllustrator from "@/app/[locale]/components/icons/TrashIllustrator";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useTranslations } from "next-intl";

const NoteModal = ({
  customerId,
  noteId,
  currentNote,
  onClose,
}: {
  customerId: string;
  noteId: string | null;
  currentNote: string | null;
  onClose: () => void;
}) => {
  const t = useTranslations("dashboard");
  const queryClient = useQueryClient();

  const { data: me } = useMe();

  const [note, setNote] = useState(currentNote ?? "");
  const [mode, setMode] = useState(!!currentNote ? "view" : "edit");
  const [showAlertModal, setShowAlertModal] = useState(false);

  const validateCustomersList = () => {
    queryClient.invalidateQueries({ queryKey: ["customers", me.id] });
    onClose();
  };

  const addNoteHandler = () => {
    createNoteMutation.mutate();
  };

  const updateNoteHandler = () => {
    editNoteMutation.mutate();
  };

  const deleteNoteHandler = () => {
    deleteNoteMutation.mutate();
  };

  const createNoteMutation = useMutation({
    mutationFn: async () => {
      await notesApi.createNote({
        customer_id: customerId,
        content: note,
      });
    },
    onSuccess: validateCustomersList,
  });

  const editNoteMutation = useMutation({
    mutationFn: async () => {
      await notesApi.updateNote(noteId ?? "", note);
    },
    onSuccess: validateCustomersList,
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async () => {
      await notesApi.deleteNote(noteId ?? "");
    },
    onSuccess: validateCustomersList,
  });

  const noteChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const saveBtnDisabled =
    note.length === 0 ||
    editNoteMutation.isPending ||
    createNoteMutation.isPending ||
    note === currentNote;

  const isLoading = editNoteMutation.isPending || createNoteMutation.isPending;

  return (
    <ModalWrapper>
      <AnimatePresence mode="wait">
        {showAlertModal && (
          <AlertModal
            key="logout-modal"
            illustrator={<TrashIllustrator />}
            note={t("deleteNoteConfirmation")}
            confirmBtnTitle={t("confirmDelete")}
            confirm={deleteNoteHandler}
            closeModal={() => setShowAlertModal(false)}
            pending={deleteNoteMutation.isPending}
          />
        )}
      </AnimatePresence>

      <div className="flex w-[min(100%,35rem)] flex-col gap-3.5 rounded-2xl bg-[#FFFEFD] px-4 py-5 sm:px-7.5">
        <div className="flex justify-between items-center">
          <p className="type-card-title font-medium text-gray-900">{t("note")}</p>
          <button
            disabled={isLoading}
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-500" width="16" height="16" />
          </button>
        </div>

        {mode === "view" ? (
          <p className="type-body max-h-50 w-full overflow-y-auto whitespace-pre-wrap">
            {currentNote}
          </p>
        ) : (
          <textarea
            value={note}
            onChange={noteChangeHandler}
            placeholder={t("addNote")}
            className="min-h-50 w-full resize-none rounded-2xl p-3.5 text-base outline-none ring ring-[#D5D5D5] transition-all duration-150 placeholder:text-[#D5D5D5] focus:ring-2 focus:ring-[#4D8E32]"
          />
        )}

        <div className="flex justify-between items-center mt-2.5">
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2.5">
              {!!currentNote && (
                <button
                  disabled={isLoading}
                  onClick={() => setShowAlertModal(true)}
                  className="size-10 rounded-full flex justify-center items-center cursor-pointer bg-red-50"
                >
                  <TrashIcon
                    width={22}
                    height={22}
                    className="text-[#DC2626]"
                  />
                </button>
              )}
              {mode === "view" && (
                <button
                  onClick={() => setMode("edit")}
                  className="size-10 rounded-full flex justify-center items-center cursor-pointer bg-gray-100"
                >
                  <PenIcon className="text-[#4F4F4F]" />
                </button>
              )}
            </div>
            {mode == "edit" && (
              <button
                disabled={saveBtnDisabled}
                onClick={!!currentNote ? updateNoteHandler : addNoteHandler}
                className={`px-5 h-10 rounded-full flex justify-center items-center gap-4 ${isLoading || saveBtnDisabled ? "bg-gray-300 text-gray-500" : ""} ${saveBtnDisabled ? "cursor-not-allowed" : "cursor-pointer"} bg-[#4e8e321a] transition-colors duration-150`}
              >
                {isLoading ? (
                  <Spinner spinnerSize={25} />
                ) : (
                  <div className="flex items-center gap-2.5">
                    <p className="type-control font-medium">{t("save")}</p>
                    <SaveIcon
                      className={`shrink-0 ${saveBtnDisabled ? "text-gray-500" : "text-[#4D8E32]"}`}
                    />
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default NoteModal;
