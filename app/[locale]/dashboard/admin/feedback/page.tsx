"use client";

import { feedbackApi } from "@/app/[locale]/api/endpoints/feedback.api";
import {
  Feedback,
  FeedbackResponse,
} from "@/app/[locale]/api/types/feedback.types";
import Switch from "../../_components/Switch";
import CameraIcon from "@/app/[locale]/components/icons/CameraIcon";
import EyeIcon from "@/app/[locale]/components/icons/EyeIcon";
import PulseIcon from "@/app/[locale]/components/icons/PulseIcon";
import TrashIcon from "@/app/[locale]/components/icons/TrashIcon";
import TrashIllustrator from "@/app/[locale]/components/icons/TrashIllustrator";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AddFeedbackModal from "./_components/AddFeedbackModal";
import { FeedbackManagementSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import { useTranslations } from "next-intl";

type DeleteModalState = {
  isOpen: boolean;
  selectedFeedbackId: string;
};

const MAX_FEEDBACKS_COUNT = 6;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
} as const;

const FeedbackManagementPage = () => {
  const t = useTranslations("dashboard");
  const queryClient = useQueryClient();

  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    isOpen: false,
    selectedFeedbackId: "",
  });

  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);

  const showAddFeedbackModal = () => setIsFeedbackModalVisible(true);
  const hideAddFeedbackModal = () => setIsFeedbackModalVisible(false);

  const getFeedbacks = async (): Promise<FeedbackResponse[]> => {
    const { data } = await feedbackApi.getAllFeedbacks({ page: 1, limit: 20 });
    return data.data ?? [];
  };

  const { data: feedbackList = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: getFeedbacks,
  });

  const deleteFeedbackMutation = useMutation({
    mutationFn: async () => {
      await feedbackApi.deleteFeedback(deleteModalState.selectedFeedbackId);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      closeDeleteModal();
    },
  });

  const openDeleteModal = (id: string) => {
    setDeleteModalState({ isOpen: true, selectedFeedbackId: id });
  };

  const closeDeleteModal = () => {
    setDeleteModalState({ isOpen: false, selectedFeedbackId: "" });
  };

  const uploadMutation = useMutation({
    mutationFn: async (data: Feedback) => {
      await feedbackApi.createFeedback(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      hideAddFeedbackModal();
    },
  });

  return (
    <>
      {isLoading ? (
        <FeedbackManagementSkeleton />
      ) : (
        <motion.section
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="w-full flex flex-col gap-10"
        >
          <AnimatePresence>
            {deleteModalState.isOpen && (
              <AlertModal
                key="delete-feedback-modal"
                illustrator={<TrashIllustrator />}
                note={t("deleteFeedbackConfirmation")}
                confirmBtnTitle={t("confirmDelete")}
                confirm={() => deleteFeedbackMutation.mutate()}
                closeModal={closeDeleteModal}
                pending={deleteFeedbackMutation.isPending}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isFeedbackModalVisible && (
              <AddFeedbackModal
                onUploadFeedback={({ theme, crop, attachment }: Feedback) =>
                  uploadMutation.mutate({ theme, crop, attachment })
                }
                pending={uploadMutation.isPending}
                closeModal={hideAddFeedbackModal}
              />
            )}
          </AnimatePresence>

          <motion.div variants={itemVariants} className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="type-page-title mb-3 font-bold sm:mb-4">{t("feedbackManagement")}</h2>
              <p className="type-body-lg font-light text-[#4F4F4F]">
                {t("feedbackDescription")}
              </p>
            </div>

            <div className="w-full sm:w-52">
              <p className="type-card-title px-0 font-medium sm:px-7.5">
                {t("slots", { used: feedbackList.length, total: MAX_FEEDBACKS_COUNT })}
              </p>

              <div
                className={`h-2 w-full ${feedbackList.length < MAX_FEEDBACKS_COUNT ? "bg-[#FCEFE0]" : "bg-[#E4EEE0]"} rounded-full mt-2.5 overflow-hidden`}
              >
                <motion.div
                  className={`h-full ${feedbackList.length < MAX_FEEDBACKS_COUNT ? "bg-[#E99532]" : "bg-[#4D8E32]"} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(feedbackList.length / MAX_FEEDBACKS_COUNT) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {feedbackList.length ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {feedbackList.length < MAX_FEEDBACKS_COUNT && (
                <motion.div variants={itemVariants}>
                  <AddFeedbackCard
                    remainingSlots={MAX_FEEDBACKS_COUNT - feedbackList.length}
                    handleClick={showAddFeedbackModal}
                  />
                </motion.div>
              )}

              <AnimatePresence>
                {feedbackList.map((feedback) => (
                  <motion.div
                    key={feedback.id}
                    layout
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <FeedbackCard
                      feedback={feedback}
                      onDelete={() => openDeleteModal(feedback.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <EmptyFeedbackState handleClick={showAddFeedbackModal} />
            </motion.div>
          )}
        </motion.section>
      )}
    </>
  );
};

export default FeedbackManagementPage;

const FeedbackCard = ({
  feedback,
  onDelete,
}: {
  feedback: FeedbackResponse;
  onDelete: () => void;
}) => {
  const t = useTranslations("dashboard");
  const queryClient = useQueryClient();

  const feedbackShownStatusMutation = useMutation({
    mutationFn: async () => {
      await feedbackApi.updateFeedbackStatus(feedback.id, {
        isHidden: false,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });

  const feedbackHiddenStatusMutation = useMutation({
    mutationFn: async () => {
      await feedbackApi.updateFeedbackStatus(feedback.id, {
        isHidden: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });

  return (
    <motion.div
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative max-h-110 overflow-hidden rounded-2xl border border-[#E1E7EF] bg-white"
    >
      <div className="relative">
        <div className="relative h-85 w-full overflow-hidden sm:h-110">
          <Image
            src={feedback.attachmentUrl}
            alt="feedback"
            fill
            className="object-cover object-top"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/70 flex justify-center"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            className="size-14 rounded-full bg-[#ffe7e7] flex justify-center items-center mt-40 cursor-pointer"
          >
            <TrashIcon className="text-[#DC2626]" />
          </motion.button>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3 bg-white absolute bottom-0 inset-s-0 inset-e-0 p-3.5 rounded-t-2xl">
        <div className="flex gap-2.5">
          <Tag label={feedback.crop} />
          <Tag label={feedback.theme} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <EyeIcon />
            <p className="type-label text-[#4F4F4F]">
              {t("visibleOnLanding")}
            </p>
          </div>

          <Switch
            isOn={!feedback.isHidden}
            activate={feedbackShownStatusMutation.mutate}
            deactivate={feedbackHiddenStatusMutation.mutate}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Tag = ({ label }: { label: string }) => {
  return (
    <motion.div className="px-5 rounded-full border w-fit bg-[#FCEFE0] border-[#E99532]">
      <p className="type-label text-[#4F4F4F]">{label}</p>
    </motion.div>
  );
};

const EmptyFeedbackState = ({ handleClick }: { handleClick: () => void }) => {
  const t = useTranslations("dashboard");
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto mt-5 flex max-w-120 flex-col items-center justify-center gap-2.5 rounded-2xl border border-[#E1E7EF] p-5 sm:p-10"
    >
      <div className="size-30 rounded-full bg-[#FDF4EB] flex justify-center items-center">
        <CameraIcon />
      </div>

      <p className="type-card-title text-center font-bold">
        {t("feedbackGalleryEmpty")}
      </p>

      <p className="type-label text-center">
        {t("feedbackGalleryDescription")}
      </p>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        className="w-full mt-5 px-7.5 min-h-12.5 bg-[#E99532] rounded-full text-white font-semibold text-lg cursor-pointer"
      >
        {t("addFeedback")}
      </motion.button>
    </motion.div>
  );
};

const AddFeedbackCard = ({
  remainingSlots,
  handleClick,
}: {
  remainingSlots: number;
  handleClick: () => void;
}) => {
  const t = useTranslations("dashboard");
  return (
    <motion.button
      className="rounded-2xl overflow-hidden w-full h-110 p-5 border-2 border-dashed border-[#4F4F4F] flex flex-col justify-center items-center gap-2.5 cursor-pointer"
      onClick={handleClick}
    >
      <div className="size-17.5 flex justify-center items-center bg-white rounded-full border-2 border-dashed border-[#4F4F4F]">
        <PulseIcon />
      </div>

      <p className="type-label mt-2.5 font-semibold">{t("uploadFeedback")}</p>

      <p className="type-label text-[#4F4F4F]">
        {t("slotsRemaining", { count: remainingSlots })}
      </p>
    </motion.button>
  );
};
