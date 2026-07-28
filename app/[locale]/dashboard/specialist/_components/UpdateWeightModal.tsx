"use client";

import { ChangeEvent, useState } from "react";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/app/[locale]/hooks/useMe";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";

const UpdateWeightModal = ({
  customerId,
  startWeight,
  currentWeight,
  name,
  onClose,
}: {
  customerId: string;
  startWeight: number;
  currentWeight: number;
  name: string;
  onClose: () => void;
}) => {
  const [weight, setWeight] = useState(String(currentWeight ?? startWeight));

  const queryClient = useQueryClient();

  const updateWeight = () => {
    updateWeightMutation.mutate();
  };

  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      setWeight("");
      return;
    }

    const number = Number(value);

    if (Number.isNaN(number)) return;

    if (number < 0 || number > 250) {
      return;
    }

    setWeight(value);
  };

  const { data: me } = useMe();

  const updateWeightMutation = useMutation({
    mutationFn: async () => {
      await profileApi.updateWeight(customerId, Number(weight));
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["customers", me.id] });
      onClose();
    },
  });

  const isSaveDisabled =
    weight === "" ||
    weight === String(currentWeight) ||
    updateWeightMutation.isPending;

  return (
    <ModalWrapper>
      <div className="bg-[#FFFEFD] p-5 rounded-2xl min-w-110 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-semibold">Update Client Progress</p>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-500" width="16" height="16" />
          </button>
        </div>

        <p className="text-[#4F4F4F] text-[16px] font-semibold">{name}</p>

        <div className="flex justify-between px-3.5 py-2.5 bg-[#EDEDED] border border-[#E1E7EF] rounded-xl">
          <p className="text-[16px]">Starting Weight</p>
          <p className="text-[16px] font-semibold">{startWeight ?? 0} Kg</p>
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="" className="text-[16px]">
            Current Weight
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
            <input
              type="number"
              step="0.1"
              inputMode="decimal"
              min={0}
              max={250}
              disabled={updateWeightMutation.isPending}
              value={weight}
              onChange={handleWeightChange}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full outline-none"
              placeholder="Enter numbers only (e.g. 80)"
            />
            <p className="text-[#4F4F4F] text-[16px]">kg</p>
          </div>
        </div>

        <button
          disabled={isSaveDisabled}
          onClick={updateWeight}
          className={`
          rounded-full
          h-12
          text-[16px]
          font-semibold
          mt-3.5
          transition-colors
          ${
            isSaveDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#E99532] text-white hover:bg-[#d98622] cursor-pointer"
          }
        `}
        >
          {updateWeightMutation.isPending ? (
            <div className="flex justify-center items-center">
              <Spinner spinnerSize={30} />
            </div>
          ) : (
            <p className="">Save Update</p>
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};

export default UpdateWeightModal;
