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
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="place-self-center mx-auto"
        >
          <Spinner borderColor="#4D8E32" spinnerSize={60} />
        </motion.div>
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
                note="Are you sure you want to delete this feedback?"
                confirmBtnTitle="Yes, delete"
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

          <motion.div variants={itemVariants} className="flex justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Feedback Management</h2>
              <p className="text-xl font-light text-[#4F4F4F]">
                Manage WhatsApp client reviews for the main landing page.
              </p>
            </div>

            <div>
              <p className="px-7.5 text-[20px] font-medium">
                {feedbackList.length} / {MAX_FEEDBACKS_COUNT} Slots
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
      className="rounded-2xl overflow-hidden max-h-110 relative bg-white border border-[#E1E7EF]"
    >
      <div className="relative">
        <div className="relative w-full h-110 overflow-hidden">
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

      <div className="flex flex-col gap-3 bg-white absolute bottom-0 left-0 right-0 p-3.5 rounded-t-2xl">
        <div className="flex gap-2.5">
          <Tag label={feedback.crop} />
          <Tag label={feedback.theme} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <EyeIcon />
            <p className="text-[#4F4F4F] text-[16px]">
              Visible on landing page
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
      <p className="text-[#4F4F4F] text-[16px]">{label}</p>
    </motion.div>
  );
};

const EmptyFeedbackState = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-center items-center gap-2.5 max-w-120 mx-auto mt-5 p-10 border border-[#E1E7EF] rounded-2xl"
    >
      <div className="size-30 rounded-full bg-[#FDF4EB] flex justify-center items-center">
        <CameraIcon />
      </div>

      <p className="text-[25px] font-bold text-center">
        Your Feedback Gallery is Empty
      </p>

      <p className="text-[16px] text-center">
        Upload up to 6 WhatsApp reviews to showcase your success.
      </p>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        className="w-full mt-5 px-7.5 min-h-12.5 bg-[#E99532] rounded-full text-white font-semibold text-lg cursor-pointer"
      >
        Add Feedback
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
  return (
    <motion.button
      className="rounded-2xl overflow-hidden w-full h-110 p-5 border-2 border-dashed border-[#4F4F4F] flex flex-col justify-center items-center gap-2.5 cursor-pointer"
      onClick={handleClick}
    >
      <div className="size-17.5 flex justify-center items-center bg-white rounded-full border-2 border-dashed border-[#4F4F4F]">
        <PulseIcon />
      </div>

      <p className="text-[16px] font-semibold mt-2.5">Add New Feedback</p>

      <p className="text-[#4F4F4F] text-[16px]">
        {remainingSlots} slots remaining
      </p>
    </motion.button>
  );
};
