"use client";

import Image from "next/image";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const Features = () => {
  const t = useTranslations("features");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const featuresList = [
    {
      title: t("healthAssessment.title"),
      points: t.raw("healthAssessment.points"),
      img: "/images/FreeTools.webp",
      checkPointIcon: "/icons/checkpoint_green.svg",
      imgStyle: "md:w-55 md:end-0 md:-top-20 lg:w-90 lg:end-5 lg:-top-30",
      bgStyle: "bg-[var(--color-palette-cbe4c0)]",
      textStyle: "text-brand-deep",
    },
    {
      title: t("personalizedPlan.title"),
      points: t.raw("personalizedPlan.points"),
      img: "/images/PrivateSpecialist.webp",
      checkPointIcon: "/icons/checkpoint_white.svg",
      imgStyle: "md:w-70 md:end-0 md:-top-25 lg:w-120 lg:end-0 lg:-top-30",
      bgStyle: "bg-brand",
      textStyle: "text-white",
    },
    {
      title: t("ongoingSupport.title"),
      points: t.raw("ongoingSupport.points"),
      img: "/images/HelpAndSupport.webp",
      checkPointIcon: "/icons/checkpoint_white.svg",
      imgStyle:
        "md:w-50 md:end-0 md:-bottom-30 lg:w-80 lg:end-0 lg:-bottom-40",
      bgStyle: "bg-brand-hover",
      textStyle: "text-white",
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1 }}
        className="mt-20 max-w-xl lg:max-w-2xl mx-auto text-center px-10 lg:px-4"
      >
        <h2 className="type-display font-medium text-content">
          {t("exploreOurFeatures")}
        </h2>

        <p className="type-body-lg mt-5 text-content">
          {t("healthGuidanceDescription")}
        </p>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="max-w-fit mx-auto mt-7.5"
        >
          <Image
            src="/icons/arrow-down.svg"
            alt="arrow down"
            width={84}
            height={84}
            className="w-15 h-15 lg:w-18 lg:h-18 xl:w-21 xl:h-21"
          />
        </motion.div>
      </motion.div>

      {/* Cards */}
      <div className="relative px-5 md:px-7.5">
        {featuresList.map((feature, index) => {
          const targetScale = 1 - (featuresList.length - index) * 0.03;
          return (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              progress={scrollYProgress}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
};

type featurePropType = {
  title: string;
  points: string[];
  img: string;
  imgStyle: string;
  bgStyle: string;
  checkPointIcon: string;
  textStyle: string;
};

type CardProps = {
  feature: featurePropType;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
};

const FeatureCard = ({
  feature,
  index,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.4, 1]);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-10 flex h-screen items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
          willChange: "transform",
        }}
        className={`
          relative
          origin-top
          max-w-full
          md:max-w-7xl
          p-6 pb-8
          md:p-12
          lg:p-15
          rounded-3xl
          shadow-2xl
          w-full
          h-fit
          transform-gpu
          overflow-hidden
          ${feature.bgStyle}
        `}
      >
        {/* Content */}
        <div className="feature-card-content relative z-10 flex max-w-4xl flex-col justify-center gap-7 md:max-w-[62%] lg:gap-10">
          <h3
            className={`type-display font-bold ${feature.textStyle}`}
          >
            {feature.title}
          </h3>

          <ul className="flex flex-col gap-4 md:gap-5 lg:gap-8">
            {feature.points.map((point, index) => (
              <li key={index} className="flex flex-row gap-3 items-start">
                <Image
                  src={feature.checkPointIcon}
                  alt="feature"
                  width={700}
                  height={600}
                  className="w-5 h-7 lg:w-6 lg:h-7 xl:w-9.5 xl:h-8"
                />

                <p
                  className={`text-base font-medium sm:text-lg lg:text-xl xl:text-[24px] ${feature.textStyle}`}
                >
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <motion.div
          style={{
            scale: imageScale,
            willChange: "transform",
          }}
          className="pointer-events-none relative mt-5 w-full place-self-center md:absolute md:inset-0 md:mt-0"
        >
          <Image
            src={feature.img}
            alt="feature"
            width={400}
            height={200}
            className={`
              mx-auto
              md:absolute
              z-20
              h-36 sm:h-44
              w-auto
              md:h-auto
              transform-gpu
              md:place-self-end
              ${feature.imgStyle}
            `}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Features;
