"use client";

import Image from "next/image";
import ModalWrapper from "../Public/ModalWrapper";
import CloseIcon from "../icons/CloseIcon";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GenderCard from "../Public/GenderCard";
import CTA from "../Public/CTAFreeToolsResult";

const pageVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
} as const;

interface IdealWeightResult {
  idealWeight: number;
  idealWeightRange: {
    min: number;
    max: number;
  };
  difference: number;
  action: "Gaining" | "Losing" | "Maintaining";
  status: "above" | "below" | "healthy";
}

type Gender = "male" | "female";

const IBW = ({
  onClose,
  onGetFullAnalysis,
}: {
  onClose: () => void;
  onGetFullAnalysis: () => void;
}) => {
  const [showResult, setShowResult] = useState(false);
  const [ibwResult, setIbwResult] = useState<IdealWeightResult | null>(null);

  const showResultHandler = (ibwResult: IdealWeightResult) => {
    setIbwResult(ibwResult);
    setShowResult(true);
  };

  const tryAgainHandler = () => {
    setShowResult(false);
  };

  return (
    <ModalWrapper>
      <motion.div
        layout
        className="p-7.5 bg-[#FFFEFD] rounded-2xl min-w-100 flex flex-col gap-5"
      >
        <div className="flex justify-between items-center gap-7.5">
          <div className="size-12 flex justify-center items-center rounded-2xl bg-[#C8DCBF]">
            <Image
              src={"/icons/weightCalc.svg"}
              alt=""
              width={30}
              height={30}
            />
          </div>
          <p className="text-[20px] font-semibold text-center">
            Perfect Weight Calculator
          </p>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 transition-colors duration-200 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-500" width="16" height="16" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {showResult ? (
            <IbwResult
              ibwResult={ibwResult}
              tryAgainHandler={tryAgainHandler}
              onGetFullAnalysis={onGetFullAnalysis}
            />
          ) : (
            <IbwForm showResultHandler={showResultHandler} />
          )}
        </AnimatePresence>
      </motion.div>
    </ModalWrapper>
  );
};

const IbwForm = ({
  showResultHandler,
}: {
  showResultHandler: (IbwResult: IdealWeightResult) => void;
}) => {
  const [heightCm, setHeightCm] = useState(0);
  const [weightKg, setWeightKg] = useState(0);
  const [gender, setGender] = useState<Gender>("male");

  const heightChangeHandler = (value: number) => {
    if (value < 0 || value > 300) {
      return;
    }
    setHeightCm(value);
  };

  const weightChangeHandler = (value: number) => {
    if (value < 0 || value > 300) {
      return;
    }
    setWeightKg(value);
  };

  const calculateIdealWeightResult = () => {
    const heightInches = heightCm / 2.54;
    const inchesOverFiveFeet = Math.max(0, heightInches - 60);

    const idealWeight =
      (gender === "male" ? 50 : 45.5) + inchesOverFiveFeet * 2.3;

    const roundedIdeal = Number(idealWeight.toFixed(1));

    const difference = Number(Math.abs(weightKg - roundedIdeal).toFixed(1));

    let action: IdealWeightResult["action"] = "Maintaining";
    let status: IdealWeightResult["status"] = "healthy";

    if (weightKg > roundedIdeal) {
      action = "Losing";
      status = "above";
    } else if (weightKg < roundedIdeal) {
      action = "Gaining";
      status = "below";
    }

    showResultHandler({
      idealWeight: roundedIdeal,

      idealWeightRange: {
        min: Number((roundedIdeal - 2).toFixed(1)),
        max: Number((roundedIdeal + 2).toFixed(1)),
      },

      difference,
      action,
      status,
    });
  };

  const showResultBtnActive = !!heightCm && !!weightKg;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-7.5"
    >
      <div className="flex flex-col gap-5">
        <div className="w-full flex gap-5 justify-between items-center">
          <GenderCard
            selectGenderHandler={() => setGender("male")}
            gender="Male"
            isSelected={gender === "male"}
          />
          <GenderCard
            selectGenderHandler={() => setGender("female")}
            gender="Female"
            isSelected={gender === "female"}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="text-[16px] font-medium">
            Height
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={250}
              onChange={(event) =>
                heightChangeHandler(Number(event.target.value))
              }
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full outline-none"
              placeholder="Enter your height"
            />
            <p className="text-[#4F4F4F] text-[16px]">cm</p>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="" className="text-[16px] font-medium">
            Weight
          </label>
          <div className="px-3.5 py-2.5 flex items-center gap-2.5 ring ring-gray-300 focus-within:ring-[#4D8E32] focus-within:ring-2 rounded-xl">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={250}
              onChange={(event) =>
                weightChangeHandler(Number(event.target.value))
              }
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full outline-none"
              placeholder="Enter your weight"
            />
            <p className="text-[#4F4F4F] text-[16px]">kg</p>
          </div>
        </div>
      </div>

      <button
        disabled={!showResultBtnActive}
        onClick={calculateIdealWeightResult}
        className={`
            rounded-full
            h-12
            text-[16px]
            font-semibold
            mt-2.5
            transition-colors 
            ${showResultBtnActive ? "bg-[#4D8E32] text-white hover:bg-[#337516] cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"}
            }
            `}
      >
        <p className="">See Result</p>
      </button>
    </motion.div>
  );
};

const IbwResult = ({
  ibwResult,
  tryAgainHandler,
  onGetFullAnalysis,
}: {
  ibwResult: IdealWeightResult | null;
  tryAgainHandler: () => void;
  onGetFullAnalysis: () => void;
}) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-5 items-center"
    >
      <p className="text-[#4F4F4F] text-[18px] font-medium">
        Ideal Weight Range (IBM)
      </p>
      <p className="text-[32px] text-[#4D8E32] font-semibold">
        {ibwResult?.idealWeightRange.min} — {ibwResult?.idealWeightRange.max} kg
      </p>
      <div className="w-full bg-[#EDF4EB] px-7.5 py-4 rounded-2xl border border-[#4D8E32] flex flex-col justify-center items-center gap-1.5">
        <p className="text-[18px] font-medium">Ideal Weight</p>
        <p className="text-[#4D8E32] font-bold text-[18px]">
          {ibwResult?.idealWeight} <span>kg</span>
        </p>
      </div>

      <div className="mb-5 w-full bg-[#FDF4EB] px-7.5 py-4 rounded-2xl border border-[#E99532] flex flex-col justify-center items-center gap-1.5">
        <p className="text-[18px] font-medium text-[#4D8E32]">
          You’re {ibwResult?.difference} kg {ibwResult?.status} your ideal
          weight
        </p>
        <p className="font-medium text-[#4F4F4F] text-[16px]">
          {ibwResult?.action} about {ibwResult?.difference} kg can help you
          achieve a healthier weight.
        </p>
      </div>

      <CTA
        tryAgainHanlder={tryAgainHandler}
        getFullAssessment={onGetFullAnalysis}
      />
    </motion.div>
  );
};

export default IBW;
