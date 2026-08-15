import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const ViewFeedbackCta = () => {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex w-full flex-col gap-3 md:w-fit"
    >
      <p className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent">
        700+
      </p>

      <p className="type-body-lg font-bold tracking-wider text-(--color-palette-b2b2b2)">
        {t("hero.clientsTrustUs")}
      </p>

      <motion.button
        onClick={() => {
          document.getElementById("feedbacks")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }}
        whileTap={{ scale: 0.95 }}
        className="type-control pointer-events-auto rounded-full border-2 border-accent px-10 py-2.5 font-bold text-accent transition-all duration-300 hover:bg-accent hover:text-accent-contrast cursor-pointer"
      >
        {t("hero.viewFeedback")}
      </motion.button>
    </motion.div>
  );
};
