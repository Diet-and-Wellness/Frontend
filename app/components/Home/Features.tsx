"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { motion } from "framer-motion";

const featuresList = [
  {
    title: "Health Assessment",
    points: [
      "We carefully review your data to understand your body and needs.",
      "This includes your lifestyle, food preferences, and health details.",
      "So we can identify your exact nutritional requirements.",
    ],
    img: "/icons/FreeTools.svg",
    checkPointIcon: "/icons/checkpoint_green.svg",
    imgStyle: "w-0 md:w-60 md:right-0 md:top-10 lg:w-90 lg:right-0 lg:top-10",
    bgStyle: "bg-[#CBE4C0]",
    textStyle: "text-[#2E551E]",
  },
  {
    title: "Personalized Plan",
    points: [
      "Get a meal plan tailored specifically for you within 24 hours.",
      "Based on your health condition, lifestyle, and preferences.",
      "Designed to be easy to follow and fit your daily routine.",
    ],
    img: "/icons/PrivateSpecialist.svg",
    checkPointIcon: "/icons/checkpoint_white.svg",
    imgStyle: "w-0 md:w-85 md:right-0 md:top-5 lg:w-120 lg:right-0 lg:top-10",
    bgStyle: "bg-[#4D8E32]",
    textStyle: "text-white",
  },
  {
    title: "Ongoing Support",
    points: [
      "We continuously track your progress and body changes.",
      "Your plan is adjusted whenever needed to keep you on track.",
      "With ongoing guidance and support throughout your journey.",
    ],
    img: "/icons/HelpAndSupport.svg",
    checkPointIcon: "/icons/checkpoint_white.svg",
    imgStyle:
      "w-0 md:w-80 md:-right-20 md:-bottom-20 lg:w-120 lg:-right-20 lg:-bottom-30",
    bgStyle: "bg-[#3A6B26] overflow-hidden",
    textStyle: "text-white",
  },
];

const Features = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".stacking-card");
    const spacer = 40;

    cards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: `center-=${index * spacer} center`,
        endTrigger: ".stacking",
        end: `bottom center`,
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const scaleValue = 0.9 + index * 0.04;

      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: `top center`,
          end: `bottom center`,
          scrub: true,
        },
        scale: scaleValue,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="mt-20 max-w-xl lg:max-w-2xl mx-auto text-center px-10 lg:px-4"
      >
        <h2 className="font-medium text-3xl text-black md:text-5xl lg:text-6xl">
          Explore Our Features
        </h2>

        <p className="text-base md:text-xl mt-5 text-black">
          Find practical tips, expert advice, and easy guidance to help you
          improve your diet and live a healthier life.
        </p>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="max-w-fit mx-auto mt-7.5"
        >
          <Image
            src={"/icons/arrow-down.svg"}
            alt="arrow down"
            width={84}
            height={84}
            className="w-15 h-15 lg:w-18 lg:h-18 xl:w-21 xl:h-21"
          />
        </motion.div>
      </motion.div>

      {/* Stacking */}
      <div className="stacking px-5 md:px-7.5">
        {featuresList.map((feature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>

      <div className="h-40 md:h-60"></div>
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

const FeatureCard = ({ feature }: { feature: featurePropType }) => {
  return (
    <div
      className={`stacking-card
        relative
        max-w-6xl
        p-7.5
        md:p-12
        lg:p-15
        mx-auto
        my-[20vh]
        rounded-3xl
        shadow-xl w-full ${feature.bgStyle}`}
    >
      {/* Content */}
      <div className="flex flex-col gap-7 lg:gap-10 max-w-4xl justify-center">
        <h3
          className={`text-2xl md:text-3xl lg:text-[45px] xl:text-[60px] font-bold ${feature.textStyle}`}
        >
          {feature.title}
        </h3>
        <ul className="flex flex-col gap-3 md:gap-5 lg:gap-8">
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
                className={`text-[17px] md:text-[18px] lg:text-[20px] xl:text-[25px] font-medium ${feature.textStyle}`}
              >
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <Image
        src={feature.img}
        alt="feature"
        width={400}
        height={200}
        className={`
        absolute
        z-20 
        h-auto
        ${feature.imgStyle}
    `}
      />
    </div>
  );
};

export default Features;
