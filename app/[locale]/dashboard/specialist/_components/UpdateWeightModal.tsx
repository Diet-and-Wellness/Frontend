"use client";

import { ChangeEvent, useState } from "react";
import { profileApi } from "@/app/[locale]/api/endpoints/profile.api";
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/app/[locale]/hooks/useMe";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();
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
      <div className="flex max-h-[85dvh] w-[min(100%,27.5rem)] flex-col overflow-hidden rounded-2xl bg-surface border border-line">
        <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3 sm:px-5">
          <p className="type-card-title font-semibold">
            {t("dashboard.updateClientProgress")}
          </p>
          <button
            onClick={onClose}
            className="hover:bg-surface-neutral transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-content-subtle" width="16" height="16" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 overscroll-contain sm:p-5">
          <p className="type-label font-semibold text-content-muted">{name}</p>

          <div className="flex justify-between px-3.5 py-2.5 bg-line-soft border border-line rounded-xl">
            <p className="type-label">{t("dashboard.startingWeight")}</p>
            <p className="type-label font-semibold">{startWeight ?? 0} Kg</p>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="" className="type-label">
              Current Weight
            </label>
            <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-line-strong focus-within:ring-brand focus-within:ring-2 rounded-xl">
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
                placeholder={t("dashboard.numbersOnly")}
              />
              <p className="type-label text-content-muted">
                {t("calculators.kg")}
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-line bg-surface p-4 sm:p-5">
          <button
            disabled={isSaveDisabled}
            onClick={updateWeight}
            className={`
            rounded-full
            h-12
            type-control
            font-semibold
            mt-3.5
            transition-colors
            w-full
            ${
              isSaveDisabled
                ? "bg-line-strong text-content-subtle cursor-not-allowed"
                : "bg-accent text-white hover:bg-accent-hover cursor-pointer"
            }
          `}
          >
            {updateWeightMutation.isPending ? (
              <div className="flex justify-center items-center">
                <Spinner spinnerSize={30} />
              </div>
            ) : (
              <p className="">{t("dashboard.saveUpdate")}</p>
            )}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UpdateWeightModal;
