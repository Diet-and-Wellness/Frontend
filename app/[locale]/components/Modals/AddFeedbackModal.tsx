"use client";

import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import FullScreenshotIcon from "../icons/FullScreenshotIcon ";
import CroppedScreenshotIcon from "../icons/CroppedScreenshotIcon";
import UploadIcon from "../icons/UploadIcon";
import CloseIcon from "../icons/CloseIcon";

import Switch from "../Dashboard/Switch";
import ModalWrapper from "../Public/ModalWrapper";
import Image from "next/image";
import { Feedback } from "../../api/types/feedback.types";
import Spinner from "../Public/LoadingSpinner";

const AddFeedbackModal = ({
  onUploadFeedback,
  pending,
  closeModal,
}: {
  onUploadFeedback: ({ theme, crop, attachment }: Feedback) => void;
  pending: boolean;
  closeModal: () => void;
}) => {
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

  const { getRootProps, getInputProps, open } = useDropzone({
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
      <div className="min-h-[85vh] min-w-150 bg-[#FFFEFD] p-7.5 rounded-2xl flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h4 className="text-[26px] font-bold">Upload Feedback</h4>

          <button
            onClick={closeModal}
            className="hover:bg-gray-100 transition-colors duration-150 p-3 rounded-full cursor-pointer"
          >
            <CloseIcon className="text-gray-600" width="18" height="18" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-[20px]">Screenshot Type</p>

          <div className="grid grid-cols-2 gap-5">
            <ScreenshotTypeCard
              selected={screenshotType === "full"}
              selectHandler={() => setScreenshotType("full")}
              title="Full Screenshot"
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
              title="Cropped Screenshot"
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

        <div className="flex justify-between items-center mt-5">
          <p className="text-[20px]">Select Theme</p>

          <div className="flex items-center gap-4">
            <p className="text-[20px] font-medium">Dark Mode</p>

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
          className="mt-2.5 p-5 rounded-2xl border border-dashed border-[#4F4F4F] flex flex-col justify-center items-center gap-3"
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

              <p className="text-lg font-semibold">{attachment.name}</p>

              <p className="text-[#4F4F4F]">
                {(attachment.size / 1024 / 1024).toFixed(2)}
                {" MB"}
              </p>

              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="px-8 py-2 rounded-full border border-[#E1E7EF] cursor-pointer"
              >
                Remove Image
              </button>
            </>
          ) : (
            <>
              <div className="size-17.5 rounded-full flex justify-center items-center bg-[#FDF4EB]">
                <UploadIcon />
              </div>

              <p className="text-[20px] mt-2">Drag and drop your image here</p>

              <p className="text-[16px] text-[#4F4F4F]">
                PNG, JPG or WEBP up to 5MB
              </p>

              <button
                type="button"
                onClick={open}
                className="px-12 py-2 rounded-full border border-[#E1E7EF] text-[16px] font-semibold cursor-pointer mt-2"
              >
                Browse Files
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
          className={`w-full mt-5 px-7.5 min-h-12.5 rounded-full text-white font-semibold text-lg flex justify-center items-center ${pending || attachment === null ? "cursor-not-allowed bg-[#ffc481]" : "cursor-pointer bg-[#E99532]"} `}
        >
          {pending ? (
            <Spinner spinnerSize={30} />
          ) : (
            <p className="">Upload Feedback</p>
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
        className={`text-[20px] ${
          selected ? "text-[#8C591E] font-semibold" : "text-black"
        }`}
      >
        {title}
      </p>
    </button>
  );
};

export default AddFeedbackModal;
