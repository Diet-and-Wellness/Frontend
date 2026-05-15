"use client";
import Blog from "../../components/Blogs/Blog";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const leftSide = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const imageVariant = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    x: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const textVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

const BlogPage = () => {
  const t = useTranslations();

  return (
    <section className="mb-20">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="
        mt-20 md:mt-30
        max-w-[92.5%] mx-auto
        bg-[#FDF4EB]
        rounded-4xl
        p-7 md:p-15
        grid grid-cols-1 lg:grid-cols-2
        gap-0 lg:gap-5
        justify-center items-center
        overflow-hidden
      "
      >
        {/* Left Side */}
        <motion.div variants={leftSide} className="max-w-lg">
          <motion.h3
            variants={textVariant}
            className="
            text-[#D2862D]
            text-[40px] md:text-[60px] lg:text-[80px]
            font-bold
            mb-2 lg:mb-5
          "
          >
            {t("blogs.ourBlogs")}
          </motion.h3>

          <motion.p
            variants={textVariant}
            className="
            text-[#234016]
            text-[26px] md:text-[30px] lg:text-[38px]
            font-normal
            leading-8.5 md:leading-10 lg:leading-12
          "
          >
            {t("blogs.blogsDescription")}
          </motion.p>
        </motion.div>

        {/* Image */}
        <motion.div variants={imageVariant} className="place-self-center">
          <Image
            width={626}
            height={100}
            src="/icons/blogs-hero-decorative-img.svg"
            alt="Blogs hero section decorative image"
            className="
            h-75 w-auto
            md:h-100
            lg:h-100
          "
          />
        </motion.div>
      </motion.div>

      <div className="mt-10 lg:mt-15 max-w-[90%] mx-auto">
        <h4 className="text-[#3E7228] text-[26px] md:text-[32px] lg:text-[38px] font-medium mb-5 lg:mb-10">
          {t("blogs.featuredBlogs")}
        </h4>
        <div className="grid place-self-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 md:gap-5 lg:gap-7.5 justify-between">
          <Blog type="featured" />
          <Blog type="featured" />
          <Blog type="featured" />
          <Blog type="featured" />
          <Blog type="featured" />
          <Blog type="featured" />
        </div>
      </div>

      <div className="mt-10 lg:mt-15 max-w-[90%] mx-auto">
        <h4 className="text-[#3E7228] text-[26px] md:text-[32px] lg:text-[38px] font-medium mb-5 lg:mb-10">
          {t("blogs.allBlogs")}
        </h4>
        <div className="flex flex-col justify-between gap-10">
          <Blog type="full" />
          <Blog type="full" />
          <Blog type="full" />
        </div>
      </div>

      <button className="place-self-center mt-10 md:mt-15 lg:mt-20 px-8 md:px-10 lg:px-12 py-2 lg:py-3 flex flex-row gap-1 lg:gap-2 justify-center items-center rounded-4xl cursor-pointer hover:bg-[#e994322b] border-2 border-[#E99532] transition-colors duration-200">
        <p className="text-[#E99532] text-[16px] md:text-[18px] lg:text-[20px] font-semibold">
          {t("blogs.showMore")}
        </p>
        <Image
          alt="plus icon"
          src={"/icons/plus-orange.svg"}
          width={28}
          height={28}
          className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
        />
      </button>
    </section>
  );
};

export default BlogPage;
