"use client";

import { QuoteIcon } from "@/app/[locale]/components/icons/QuoteIcon";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type ReviewCardProps = {
  reviewText: string;
  reviewerName: string;
  reviewerAge: string;
};

const ReviewCard = ({
  reviewText,
  reviewerName,
  reviewerAge,
}: ReviewCardProps) => (
  <div className="flex w-full max-w-130 flex-col justify-between gap-5 rounded-3xl border border-white/70 bg-surface-raised/30 p-5 shadow-xl backdrop-blur-2xl sm:p-6">
    <div className="flex flex-col gap-5">
      <QuoteIcon />
      <p className="text-base font-medium leading-relaxed text-content/90">
        {reviewText}
      </p>
    </div>

    <div>
      <p className="font-bold text-content-strong">{reviewerName}</p>
      <p className="text-content mt-1.5">{reviewerAge}</p>
    </div>
  </div>
);

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 55 : -55,
    scale: 0.98,
  }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -55 : 55,
    scale: 0.98,
  }),
};

const Review = () => {
  const t = useTranslations();
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const reviews = (t.raw("contactUs.reviews") as ReviewCardProps[]).map(
    (review, index) => ({
      id: `contact-review-${index}`,
      ...review,
    }),
  );

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 4800);

    return () => window.clearInterval(interval);
  }, [isPaused, prefersReducedMotion, reviews.length]);

  const move = (nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex(
      (current) => (current + nextDirection + reviews.length) % reviews.length,
    );
  };

  const select = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeReview = reviews[activeIndex];

  return (
    <div
      role="region"
      aria-label={t("contactUs.reviewCarouselLabel")}
      data-active-review={activeIndex + 1}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="relative flex w-full flex-col items-center justify-center gap-5 overflow-hidden px-4 py-6 sm:px-7"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeReview.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: prefersReducedMotion ? 0 : 0.48,
            ease: [0.22, 1, 0.36, 1],
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={(_, info) => {
            if (info.offset.x < -45 || info.velocity.x < -450) move(1);
            if (info.offset.x > 45 || info.velocity.x > 450) move(-1);
            setIsPaused(false);
          }}
          className="w-full max-w-130 cursor-grab active:cursor-grabbing"
        >
          <ReviewCard {...activeReview} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center gap-2.5">
        {reviews.map((review, index) => (
          <motion.button
            key={review.id}
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => select(index)}
            aria-label={t("contactUs.reviewPosition", {
              position: index + 1,
              total: reviews.length,
            })}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2.5 cursor-pointer rounded-full transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-contrast ${
              index === activeIndex
                ? "w-8 bg-brand-contrast"
                : "w-2.5 bg-brand-contrast/40 hover:bg-brand-contrast/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
