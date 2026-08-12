import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ViewBlogsCta = () => {
  const router = useRouter();
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
      className="flex w-full flex-col gap-5 rounded-3xl bg-(--color-palette-f8debf) p-5 md:max-w-75"
    >
      <Image
        src="/images/cardHeader.webp"
        alt="Card Header"
        width={233}
        height={88}
        className="rounded-xl w-full"
      />

      <p className="type-label font-medium">
        {t("hero.getToKnowMoreAboutYourBody")}
      </p>

      <motion.button
        onClick={() => router.push("/blogs")}
        whileTap={{ scale: 0.95 }}
        className="type-control pointer-events-auto rounded-full bg-accent px-10 py-2 font-bold text-white transition-all duration-300 hover:bg-accent-hover cursor-pointer"
      >
        {t("hero.viewBlogs")}
      </motion.button>
    </motion.div>
  );
};
