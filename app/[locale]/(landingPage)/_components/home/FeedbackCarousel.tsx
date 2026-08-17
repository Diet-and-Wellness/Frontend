"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import type { FeedbackResponse } from "../../../api/types/feedback.types";

export type FeedbackWithScreenshot = FeedbackResponse & {
  attachmentUrl: string;
};

type FeedbackCarouselProps = {
  feedbacks: FeedbackWithScreenshot[];
  isLoading: boolean;
  isError: boolean;
  emptyLabel: string;
  errorLabel: string;
  previousLabel: string;
  nextLabel: string;
  imageAlt: (position: number) => string;
  positionLabel: (position: number, total: number) => string;
};

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 42 : -42,
    scale: 0.97,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -42 : 42,
    scale: 0.97,
  }),
};

const IPhoneFrame = ({ children }: { children: ReactNode }) => (
  <div className="relative w-full max-w-78 px-1.5">
    <span
      aria-hidden="true"
      className="absolute inset-s-0 top-[22%] h-10 w-1 rounded-s-full bg-neutral-800 shadow-sm"
    />
    <span
      aria-hidden="true"
      className="absolute inset-s-0 top-[31%] h-16 w-1 rounded-s-full bg-neutral-800 shadow-sm"
    />
    <span
      aria-hidden="true"
      className="absolute inset-e-0 top-[27%] h-20 w-1 rounded-e-full bg-neutral-800 shadow-sm"
    />

    <div className="relative aspect-12/25 overflow-hidden rounded-[52px] border-[5px] border-neutral-950 bg-neutral-950 p-1.5 shadow-[0_34px_75px_rgba(25,42,18,0.3),0_10px_24px_rgba(25,42,18,0.2)] ring-1 ring-white/25">
      <div className="pointer-events-none absolute inset-1.25 z-40 rounded-[46px] ring-1 ring-inset ring-white/15" />

      <div className="relative size-full overflow-hidden rounded-[44px] bg-white">
        {children}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-s-1/2 top-2.5 z-40 flex h-7 w-24 -translate-x-1/2 items-center justify-end rounded-full bg-neutral-950 px-2.5 shadow-sm"
        >
          <span className="size-1.5 rounded-full bg-sky-950 ring-1 ring-sky-400/25" />
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2.5 inset-s-1/2 z-40 h-1 w-24 -translate-x-1/2 rounded-full bg-neutral-950/80"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 inset-s-0 z-30 w-px bg-white/35"
        />
      </div>
    </div>
  </div>
);

const FeedbackScreenshot = ({
  feedback,
  alt,
}: {
  feedback: FeedbackWithScreenshot;
  alt: string;
}) => {
  const isPartial = feedback.crop.trim().toLowerCase() !== "full";

  if (!isPartial) {
    return (
      <Image
        src={feedback.attachmentUrl}
        alt={alt}
        fill
        sizes="(max-width: 768px) 78vw, 312px"
        className="pointer-events-none object-contain object-top select-none"
      />
    );
  }

  return (
    <div className="absolute inset-0 isolate flex items-center justify-center overflow-hidden">
      <Image
        src={feedback.attachmentUrl}
        alt=""
        fill
        sizes="(max-width: 768px) 78vw, 312px"
        className="pointer-events-none scale-125 object-cover blur-2xl brightness-75 saturate-75 select-none"
      />
      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/18 via-black/8 to-black/24" />
      <div className="absolute inset-x-6 top-14 z-10 h-px bg-white/20" />

      <div
        className={`relative z-20 h-[58%] w-[86%] overflow-hidden rounded-2xl border border-white/65 shadow-[0_22px_60px_rgba(0,0,0,0.38)] ring-1 ring-black/8 ${
          feedback.theme === "dark" ? "bg-neutral-950/95" : "bg-white/95"
        }`}
      >
        <Image
          src={feedback.attachmentUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 68vw, 268px"
          className="pointer-events-none object-contain select-none"
        />
      </div>
    </div>
  );
};

const CarouselArrow = ({ direction }: { direction: "previous" | "next" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    className={`size-5 ${direction === "previous" ? "rtl:rotate-180" : "rotate-180 rtl:rotate-0"}`}
  >
    <path
      d="m12.5 4.5-5.5 5.5 5.5 5.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeedbackCarousel = ({
  feedbacks,
  isLoading,
  isError,
  emptyLabel,
  errorLabel,
  previousLabel,
  nextLabel,
  imageAlt,
  positionLabel,
}: FeedbackCarouselProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const total = feedbacks.length;
  const safeActiveIndex = total > 0 ? activeIndex % total : 0;

  useEffect(() => {
    if (total < 2 || isPaused || prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % total);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion, total]);

  const move = (nextDirection: number) => {
    if (total < 2) return;
    setDirection(nextDirection);
    setActiveIndex((current) => (current + nextDirection + total) % total);
  };

  const select = (index: number) => {
    setDirection(index > safeActiveIndex ? 1 : -1);
    setActiveIndex(index);
  };

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label={emptyLabel}
        className="flex w-full flex-col items-center gap-4"
      >
        <IPhoneFrame>
          <div className="size-full animate-pulse bg-surface-raised/70" />
        </IPhoneFrame>
        <div className="h-2 w-24 animate-pulse rounded-full bg-brand/15" />
      </div>
    );
  }

  if (isError || total === 0) {
    return (
      <div className="flex aspect-9/14 w-full max-w-76 flex-col items-center justify-center rounded-[28px] border border-white/50 bg-surface-raised/72 p-7 text-center shadow-[0_18px_45px_rgba(35,64,22,0.1)] backdrop-blur-sm">
        <span className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="size-7"
          >
            <path
              d="M5 5.5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3v-3H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 10h9M7.5 13.5h5.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <p className="type-body font-semibold text-content-muted">
          {isError ? errorLabel : emptyLabel}
        </p>
      </div>
    );
  }

  const activeFeedback = feedbacks[safeActiveIndex];

  return (
    <div
      className="flex w-full max-w-88 flex-col items-center gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
    >
      <IPhoneFrame>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.figure
            key={activeFeedback.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: prefersReducedMotion ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={total > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -45 || info.velocity.x < -450) move(1);
              if (info.offset.x > 45 || info.velocity.x > 450) move(-1);
            }}
            className={`absolute inset-0 cursor-grab overflow-hidden active:cursor-grabbing ${
              activeFeedback.theme === "dark" ? "bg-neutral-900" : "bg-white"
            }`}
          >
            <FeedbackScreenshot
              feedback={activeFeedback}
              alt={imageAlt(safeActiveIndex + 1)}
            />
          </motion.figure>
        </AnimatePresence>
      </IPhoneFrame>

      <div className="flex w-full items-center justify-between gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => move(-1)}
          disabled={total < 2}
          aria-label={previousLabel}
          className="flex size-9 md:size-10 cursor-pointer items-center justify-center rounded-full border border-brand/15 bg-surface-raised text-brand shadow-sm transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-40"
        >
          <CarouselArrow direction="previous" />
        </motion.button>

        <div className="flex flex-col items-center gap-2">
          <p className="sr-only" aria-live="polite">
            {positionLabel(safeActiveIndex + 1, total)}
          </p>
          <div className="flex items-center justify-center gap-2">
            {feedbacks.map((feedback, index) => (
              <button
                key={feedback.id}
                type="button"
                onClick={() => select(index)}
                aria-label={positionLabel(index + 1, total)}
                aria-current={index === safeActiveIndex ? "true" : undefined}
                className={`h-2 cursor-pointer rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  index === safeActiveIndex
                    ? "w-5 bg-brand"
                    : "w-2 bg-brand/25 hover:bg-brand/45"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => move(1)}
          disabled={total < 2}
          aria-label={nextLabel}
          className="flex size-9 md:size-10 cursor-pointer items-center justify-center rounded-full border border-brand/15 bg-surface-raised text-brand shadow-sm transition-colors hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-default disabled:opacity-40"
        >
          <CarouselArrow direction="next" />
        </motion.button>
      </div>
    </div>
  );
};

export default FeedbackCarousel;
