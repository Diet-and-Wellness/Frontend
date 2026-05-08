"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const RealStories = () => {
  return (
    <section className="my-25">
      <div className="gap-10 md:gap-15 lg:gap-25 max-w-[90%] mx-auto flex flex-col">
        {/* Header */}
        <div className="relative flex flex-col lg:flex-row justify-between gap-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-3xl flex flex-col gap-2 md:gap-5"
          >
            <h4 className="text-[28px] md:text-[50px] lg:text-[60px] font-semibold leading-tight">
              Real results. Real stories.
            </h4>
            <p className="text-[20px] md:text-[25px] leading-6 md:leading-8 font-light max-w-[85%] ms:max-w-2xl">
              Hear from real clients who transformed their bodies with us,
              improved their relationship with food, and embraced a healthier,
              more balanced lifestyle that truly
            </p>
          </motion.div>

          {/* Quote Image */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute right-0 top-0 pointer-events-none"
          >
            <Image
              src="/icons/qouteTop.svg"
              alt="qoute"
              width={315}
              height={200}
              className="w-50 md:w-60 lg:w-75 h-auto"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div
          className="
          bg-none md:bg-[url('/icons/decorationBgImg_1.svg')]
          w-full
          bg-center bg-cover bg-no-repeat
          bg-[#C8DCBF]
          rounded-3xl md:rounded-[60px]
          px-8 py-12 md:p-12
          flex flex-col-reverse md:flex-row
          justify-between
          items-center md:items-start
          gap-8 md:gap-10
        "
        >
          {/* Text Side */}
          <div className="flex flex-col items-start max-w-xl">
            <div className="flex flex-col gap-5 md:gap-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src="/icons/qouteTop.svg"
                  alt="qoute"
                  width={105}
                  height={65}
                  className="rotate-180 w-20 md:w-30 h-auto"
                />
              </motion.div>
              <p className="flex flex-col text-[#4F4F4F] font-medium text-[18px] md:text-[20px] lg:text-[25px] gap-5 md:gap-7">
                <span>
                  These are real stories from people who booked sessions with
                  our nutrition specialists and experienced life-changing
                  transformations.
                </span>
                <span>
                  Be one of them — book your session with a nutrition expert
                  today!
                </span>
              </p>
            </div>

            {/* CTA */}
            <div className="w-full flex flex-col md:flex-row items-center gap-5 md:gap-7 lg:gap-10 mt-7">
              <button
                className="
                w-full
                px-7 md:px-12 
                py-3 
                rounded-full 
                text-white
                cursor-pointer 
                text-[14px] md:text-[16px] lg:text-[18px] 
                font-medium 
                bg-[#4D8E32] 
                hover:bg-[#347716] 
                transition-colors duration-300
                whitespace-nowrap
              "
              >
                Book with a Specialist
              </button>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/icons/pointer.svg"
                  alt="pointer"
                  width={190}
                  height={150}
                  className="w-20 md:w-32 lg:w-44 h-auto rotate-45 md:rotate-0"
                />
              </motion.div>
            </div>
          </div>

          {/* Image Side */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            whileHover={{ y: -10 }} // subtle parallax feel
          >
            <Image
              src="/images/ScreenShot.png"
              alt="Screenshot"
              width={260}
              height={500}
              className="min-w-50 w-65 lg:w-70 h-auto mx-0 md:mx-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RealStories;
