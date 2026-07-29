"use client";

import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import FullScreenshotIcon from "@/app/[locale]/components/icons/FullScreenshotIcon ";
import CroppedScreenshotIcon from "@/app/[locale]/components/icons/CroppedScreenshotIcon";
import UploadIcon from "@/app/[locale]/components/icons/UploadIcon";
import CloseIcon from "@/app/[locale]/components/icons/CloseIcon";

import Switch from "../../../_components/Switch";
import ModalWrapper from "@/app/[locale]/components/Public/ModalWrapper";
import Image from "next/image";
import { Feedback } from "@/app/[locale]/api/types/feedback.types";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { useTranslations } from "next-intl";

const AddFeedbackModal = ({
  onUploadFeedback,
  pending,
  closeModal,
}: {
  onUploadFeedback: ({ theme, crop, attachment }: Feedback) => void;
  pending: boolean;
  closeModal: () => void;
}) => {
  const t = useTranslations("dashboard");
  const [screenshotType, setScreenshotType] = useState<"full" | "cropped">(
    "full",
  );

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const [attachment, setAttachment] = useState<File | null>(null);

  const previewUrl = useMemo(() => {
    if (!attachment) return null;

    return URL.createObjectURL(attachment);
  }, [attachment]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    noClick: true,

    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file) return;

      setAttachment(file);
    },
  });

  return (
    <ModalWrapper>
      <div className="flex max-h-[88vh] w-[min(100%,37.5rem)] flex-col gap-5 overflow-y-auto rounded-2xl bg-[#FFFEFD] p-5 sm:p-7.5">
        <div className="flex items-center justify-between gap-3">
          <h4 className="type-card-title font-bold">{t("uploadFeedback")}</h4>

          <button
            onClick={closeModal}
            className="hover:bg-gray-100 transition-colors duration-150 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-600" width="18" height="18" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <p className="type-body-lg">{t("screenshotType")}</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            <ScreenshotTypeCard
              selected={screenshotType === "full"}
              selectHandler={() => setScreenshotType("full")}
              title={t("fullScreenshot")}
              icon={
                <FullScreenshotIcon
                  className={
                    screenshotType === "full"
                      ? "text-[#E99532]"
                      : "text-[#4F4F4F]"
                  }
                />
              }
            />

            <ScreenshotTypeCard
              selected={screenshotType === "cropped"}
              selectHandler={() => setScreenshotType("cropped")}
              title={t("croppedScreenshot")}
              icon={
                <CroppedScreenshotIcon
                  className={
                    screenshotType === "cropped"
                      ? "text-[#E99532]"
                      : "text-[#4F4F4F]"
                  }
                />
              }
            />
          </div>
        </div>

        <div className="mt-2 flex flex-col items-start gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body-lg">{t("selectTheme")}</p>

          <div className="flex items-center gap-4">
            <p className="type-body-lg font-medium">{t("darkMode")}</p>

            <Switch
              isOn={theme === "dark"}
              activate={() => setTheme("dark")}
              deactivate={() => setTheme("light")}
              activeBgColor="#2C3549"
            />
          </div>
        </div>

        <div
          {...getRootProps()}
          className={`mt-2.5 p-5 rounded-2xl border border-dashed ${isDragActive ? "ring-5 ring-[#4D8E32]/70 border-transparent" : "border-[#4F4F4F]"} border-[#4F4F4F] flex flex-col justify-center items-center gap-3`}
        >
          <input {...getInputProps()} />

          {attachment ? (
            <>
              <div className="ring-3 ring-[#4D8E32] rounded-2xl overflow-hidden max-h-50 min-h-30">
                <Image
                  src={previewUrl ?? ""}
                  alt="Preview"
                  width={500}
                  height={500}
                  className="max-h-80 w-auto rounded-xl object-contain"
                  unoptimized
                />
              </div>

              <p className="type-card-title font-semibold">{attachment.name}</p>

              <p className="type-label text-[#4F4F4F]">
                {(attachment.size / 1024 / 1024).toFixed(2)}
                {" MB"}
              </p>

              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="type-control rounded-full border border-[#E1E7EF] px-8 py-2 cursor-pointer"
              >
                {t("removeImage")}
              </button>
            </>
          ) : (
            <>
              <div className="size-17.5 rounded-full flex justify-center items-center bg-[#FDF4EB]">
                <UploadIcon />
              </div>

              <p className="type-card-title mt-2 text-center">{t("dragDropImage")}</p>

              <p className="type-label text-[#4F4F4F]">
                {t("imageFormats")}
              </p>

              <button
                type="button"
                onClick={open}
                className="type-control mt-2 rounded-full border border-[#E1E7EF] px-12 py-2 font-semibold cursor-pointer"
              >
                {t("browseFiles")}
              </button>
            </>
          )}
        </div>

        <button
          disabled={pending || attachment === null}
          onClick={() =>
            onUploadFeedback({
              theme: theme,
              crop: screenshotType,
              attachment: attachment,
            })
          }
          className={`type-control mt-5 flex min-h-12.5 w-full items-center justify-center rounded-full px-7.5 font-semibold text-white ${pending || attachment === null ? "cursor-not-allowed bg-gray-300 text-gray-500" : "cursor-pointer bg-[#E99532]"} `}
        >
          {pending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">{t("uploadFeedback")}</p>
          )}
        </button>
      </div>
    </ModalWrapper>
  );
};

const ScreenshotTypeCard = ({
  icon,
  title,
  selected,
  selectHandler,
}: {
  icon: React.ReactNode;
  title: string;
  selected: boolean;
  selectHandler: () => void;
}) => {
  return (
    <button
      onClick={selectHandler}
      className={`px-7.5 py-3.5 flex flex-col justify-center items-center gap-2.5 rounded-2xl border transition-all duration-150 cursor-pointer ${
        selected ? "border-[#E99532] bg-[#FCEFE0]" : "border-[#E1E7EF]"
      }`}
    >
      {icon}

      <p
        className={`type-card-title ${
          selected ? "text-[#8C591E] font-semibold" : "text-black"
        }`}
      >
        {title}
      </p>
    </button>
  );
};

export default AddFeedbackModal;
