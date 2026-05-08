"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    title: "Fill the Assessment Form",
    desc: "Complete a quick form to help us understand your lifestyle, preferences, and health.",
  },
  {
    title: "Get Your Personalized Plan",
    desc: "Receive a meal plan tailored to your routine and food preferences within 24 hours.",
  },
  {
    title: "Follow & Stay Consistent",
    desc: "Start your plan easily with a routine that fits your day, so you can stay consistent.",
  },
];

const GetStarted = () => {
  return (
    <section className="">
      <div
        className="
        max-w-[90%] mx-auto 
        mb-20 
        flex flex-col-reverse md:flex-row 
        bg-[#E99532] bg-none
        md:bg-[url('/icons/bgImg_2.svg')] bg-no-repeat md:bg-size-[500px] lg:bg-size-[680px] xl:bg-size-[775px] bg-bottom md:bg-top-left 
        rounded-4xl overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="self-center md:self-end max-w-75 lg:max-w-100 xl:max-w-120"
        >
          <Image
            src={"/images/man.webp"}
            alt="man img"
            width={4000}
            height={715}
            className="w-full"
          />
        </motion.div>

        <div className="flex flex-col-reverse md:flex-row">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="self-center mb-0 md:mb-25 max-w-25 md:max-w-40 md:self-end"
          >
            <Image
              src={"/icons/decorative-arrow.svg"}
              alt="arrow"
              width={10}
              height={10}
              className="w-full scale-x-[-1] rotate-90 md:scale-y-[1] md:-rotate-90"
            />
          </motion.div>

          <div className="px-7.5 pb-0 pt-10 md:py-12 flex flex-col justify-between items-start gap-5">
            <h3 className="font-bold text-white text-[32px] lg:text-[36px] xl:text-[48px] max-w-120 leading-10 lg:leading-12 xl:leading-14">
              The Only Thing You’ll Lose is Weight
            </h3>

            <p className="font-semibold text-white text-[20px] lg:text-[22px] xl:text-[25px]">
              How to get started?
            </p>

            <ul className="max-w-full lg:max-w-xl flex flex-col gap-5">
              {steps.map((step, index) => (
                <Step key={index} title={step.title} desc={step.desc} />
              ))}
            </ul>

            <Link
              href="/signin"
              className="block w-full py-3 bg-white mt-5 xl:mt-7.5 rounded-full text-center"
            >
              <span className="text-[#E99532] font-bold lg:text-[18px] xl:text-[20px]">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Step = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <li>
      <h4 className="font-semibold text-black/60 text-[18px] lg:text-[20px] xl:text-[25px]">
        {title}
      </h4>
      <p className="font-medium text-white text-[14px] lg:text-[18px] xl:text-[20px]">
        {desc}
      </p>
    </li>
  );
};

export default GetStarted;
