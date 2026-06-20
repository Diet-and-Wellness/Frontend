"use client";

import { feedbackApi } from "@/app/[locale]/api/endpoints/feedback.api";
import {
  Feedback,
  FeedbackResponse,
} from "@/app/[locale]/api/types/feedback.types";
import Switch from "@/app/[locale]/components/Dashboard/Switch";
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
import AddFeedbackModal from "@/app/[locale]/components/Modals/AddFeedbackModal";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";

type DeleteModalState = {
  isOpen: boolean;
  selectedFeedbackId: string;
};

const MAX_FEEDBACKS_COUNT = 6;

const FeedbackManagementPage = () => {
  const queryClient = useQueryClient();

  const [deleteModalState, setDeleteModalState] = useState<DeleteModalState>({
    isOpen: false,
    selectedFeedbackId: "",
  });

  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);

  const showAddFeedbackModal = () => {
    setIsFeedbackModalVisible(true);
  };

  const hideAddFeedbackModal = () => {
    setIsFeedbackModalVisible(false);
  };

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
    setDeleteModalState({
      isOpen: true,
      selectedFeedbackId: id,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModalState({
      isOpen: false,
      selectedFeedbackId: "",
    });
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
        <div className="place-self-center mx-auto">
          <Spinner borderColor="#4D8E32" spinnerSize={60} />
        </div>
      ) : (
        <section className="w-full flex flex-col gap-10">
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

          <div className="flex justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Feedback Management</h2>
              <p className="text-xl font-light text-[#4F4F4F]">
                Manage WhatsApp client reviews for the main landing page.
              </p>
            </div>
            <div className="">
              <p className="px-7.5 text-[20px] font-medium">
                {feedbackList.length} / {MAX_FEEDBACKS_COUNT} Slots
              </p>
              <div className="h-2 w-full bg-[#FCEFE0] rounded-full mt-2.5">
                <div
                  className={`h-full rounded-full bg-[#E99532]`}
                  style={{
                    width: `${(feedbackList.length / MAX_FEEDBACKS_COUNT) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {feedbackList.length ? (
            <div className="flex flex-wrap gap-5">
              {feedbackList.length === MAX_FEEDBACKS_COUNT || (
                <AddFeedbackCard
                  remainingSlots={MAX_FEEDBACKS_COUNT - feedbackList.length}
                  handleClick={showAddFeedbackModal}
                />
              )}
              {feedbackList.map((feedback) => (
                <FeedbackCard
                  key={feedback.id}
                  feedback={feedback}
                  onDelete={() => openDeleteModal(feedback.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyFeedbackState handleClick={showAddFeedbackModal} />
          )}
        </section>
      )}
    </>
  );
};

export default FeedbackManagementPage;

type FeedbackCardProps = {
  feedback: FeedbackResponse;
  onDelete: () => void;
};

const FeedbackCard = ({ feedback, onDelete }: FeedbackCardProps) => {
  const feedbackShownStatusMutation = useMutation({
    mutationFn: async () => {
      await feedbackApi.updateFeedbackStatus(feedback.id, { isHidden: false });
    },
  });

  const feedbackHiddenStatusMutation = useMutation({
    mutationFn: async () => {
      await feedbackApi.updateFeedbackStatus(feedback.id, { isHidden: true });
    },
  });

  return (
    <div className="rounded-2xl overflow-hidden max-w-75 max-h-95 relative bg-white">
      <div className="relative">
        <Image
          src={feedback.attachmentUrl ?? ""}
          alt="feedback"
          width={300}
          height={600}
          className="w-full min-h-95 object-cover object-top"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/70 flex justify-center"
        >
          <button
            onClick={onDelete}
            className="size-14 rounded-full bg-[#ffe7e7] flex justify-center items-center mt-30 cursor-pointer"
          >
            <TrashIcon className="text-[#DC2626]" />
          </button>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3 bg-white absolute bottom-0 left-0 right-0 p-3.5 rounded-2xl border border-[#E1E7EF]">
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
    </div>
  );
};

const Tag = ({ label }: { label: string }) => {
  return (
    <div
      className={`px-5 rounded-full border w-fit ${"bg-[#FCEFE0] border-[#E99532]"}`}
    >
      <p className="text-[#4F4F4F] text-[16px]">{label}</p>
    </div>
  );
};

const EmptyFeedbackState = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2.5 max-w-120 mx-auto mt-5 p-10 border border-[#E1E7EF] rounded-2xl">
      <div className="size-30 rounded-full bg-[#FDF4EB] flex justify-center items-center">
        <CameraIcon />
      </div>

      <p className="text-[25px] font-bold text-center">
        Your Feedback Gallery is Empty
      </p>

      <p className="text-[16px] text-center">
        Upload up to 6 WhatsApp reviews to showcase your success.
      </p>

      <button
        onClick={handleClick}
        className="w-full mt-5 px-7.5 min-h-12.5 bg-[#E99532] rounded-full text-white font-semibold text-lg cursor-pointer"
      >
        Add Feedback
      </button>
    </div>
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
    <button
      onClick={handleClick}
      className="rounded-2xl overflow-hidden w-75 h-95 p-5 border-2 border-dashed border-[#4F4F4F] flex flex-col justify-center items-center gap-2.5 cursor-pointer"
    >
      <div className="size-17.5 flex justify-center items-center bg-white rounded-full border-2 border-dashed border-[#4F4F4F]">
        <PulseIcon />
      </div>

      <p className="text-[16px] font-semibold mt-2.5">Add New Feedback</p>

      <p className="text-[#4F4F4F] text-[16px]">
        {remainingSlots} slots remaining
      </p>
    </button>
  );
};
