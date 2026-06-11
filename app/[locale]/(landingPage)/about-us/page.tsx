"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AboutUsPage = () => {
  const t = useTranslations();

  return (
    <section className="min-h-screen pt-25 lg:pt-30 pb-15">
      <div className="max-w-[90%] mx-auto flex flex-col gap-3 lg:gap-10">
        {/* HERO */}
        <div className="relative min-h-80 lg:min-h-180 rounded-[20px] lg:rounded-[40px] overflow-hidden flex flex-col gap-2 justify-center items-center p-10 text-center">
          {/* Animated Background */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/aboutImg.webp"
              alt="About background"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-linear-to-t from-black/40 via-black/20 to-transparent"
          />

          <div className="flex flex-col gap-4 lg:gap-20">
            {/* Content */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative z-10 text-xl sm:text-2xl lg:text-5xl text-white text-center"
            >
              {t("aboutUs.enjoyableLiving")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative z-10 text-2xl sm:text-3xl lg:text-6xl leading-10 font-bold text-white text-center"
            >
              {t("aboutUs.startsWithBalancedNutrition")}
            </motion.p>
          </div>
        </div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="flex flex-col items-start gap-3 lg:gap-5 p-3 md:p-5 lg:p-10 max-w-5xl"
        >
          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-xl lg:text-3xl font-bold min-w-50"
          >
            {t("aboutUs.whatYouShouldKnowAboutDietAndWellness")}
          </motion.p>

          {/* Paragraph 1 */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-[16px] lg:text-xl"
          >
            {t("aboutUs.aboutDietAndWellness")}
          </motion.p>

          {/* List */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col gap-3 mt-3"
          >
            <h4 className="text-[18px] lg:text-xl font-semibold">
              {t("aboutUs.weHelpOurClientsTo")}
            </h4>
            <ul className="text-[16px] lg:text-xl flex flex-col gap-0.5 lg:gap-1">
              {t
                .raw("aboutUs.clientBenefits")
                .map((benefit: string, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
            </ul>
          </motion.div>

          {/* Paragraph 2 */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[16px] lg:text-xl font-light"
          >
            {t("aboutUs.gradualChangesDescription")}
          </motion.p>

          {/* Paragraph 3 */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-[16px] lg:text-xl font-semibold"
          >
            {t("aboutUs.ourGoal")}
          </motion.p>

          {/* Button */}
          <motion.button
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileTap={{ scale: 0.98 }}
            whileHover={{ background: "#3a6b26" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full sm:w-80 mt-5 py-3 text-[16px] lg:text-[20px] rounded-4xl text-white font-medium bg-[#3a6b26e0] cursor-pointer"
          >
            {t("aboutUs.getStartedNow")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsPage;
