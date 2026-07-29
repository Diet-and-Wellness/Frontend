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
        <div className="relative flex min-h-80 flex-col items-center justify-center gap-2 overflow-hidden rounded-[20px] p-5 text-center sm:p-8 lg:min-h-180 lg:rounded-[40px] lg:p-10">
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
              className="relative z-10 text-xl text-center text-white sm:text-2xl lg:text-4xl xl:text-5xl"
            >
              {t("aboutUs.enjoyableLiving")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative z-10 text-3xl font-bold leading-tight text-center text-white sm:text-4xl lg:text-5xl xl:text-6xl"
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
            className="type-section-title font-bold"
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
            className="type-body"
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
            <h4 className="type-card-title font-semibold">
              {t("aboutUs.weHelpOurClientsTo")}
            </h4>
            <ul className="type-body flex flex-col gap-0.5 lg:gap-1">
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
            className="type-body font-light"
          >
            {t("aboutUs.gradualChangesDescription")}
          </motion.p>

          {/* Paragraph 3 */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="type-body font-semibold"
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
            className="type-control mt-5 w-full rounded-4xl bg-[#3a6b26e0] py-3 font-medium text-white cursor-pointer sm:w-80"
          >
            {t("aboutUs.getStartedNow")}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsPage;
