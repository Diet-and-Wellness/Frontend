"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { BlogResponse } from "../../api/types/blogs.types";
import Blog from "../../components/Blogs/Blog";
import { CardGridSkeleton, Skeleton } from "../../components/Public/Skeletons";
import { useBlogs } from "../../hooks/useBlogs";
import Spinner from "../../components/Public/LoadingSpinner";

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

  const {
    data: blogs,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBlogs();

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
        bg-accent-softer
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
            text-accent-dark
            text-3xl sm:text-4xl md:text-5xl lg:text-[80px]
            font-bold
            mb-2 lg:mb-5
          "
          >
            {t("blogs.ourBlogs")}
          </motion.h3>

          <motion.p
            variants={textVariant}
            className="
            text-brand-ink
            text-xl sm:text-2xl md:text-[30px] lg:text-[38px]
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

      {isLoading ? (
        <div className="mt-10 max-w-[90%] mx-auto">
          <Skeleton className="mb-5 h-9 w-55 lg:mb-10" />
          <CardGridSkeleton cards={6} />
        </div>
      ) : (
        <div className="mt-10 lg:mt-15 max-w-[90%] mx-auto">
          <h4 className="type-section-title mb-5 font-medium text-brand-dark lg:mb-10">
            {t("blogs.featuredBlogs")}
          </h4>
          <div className="w-full grid place-self-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 md:gap-5 lg:gap-7.5 justify-between">
            {blogs?.map((blog: BlogResponse) => (
              <Blog key={blog.id} type="landing" blog={blog} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && hasNextPage && (
        <button
          type="button"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="place-self-center mt-10 md:mt-15 lg:mt-20 px-8 lg:px-10 py-2 lg:py-2.5 flex flex-row gap-1 lg:gap-2 justify-center items-center rounded-4xl cursor-pointer hover:bg-[var(--color-palette-e994322b)] border-2 border-accent transition-colors duration-200"
        >
          {isFetchingNextPage ? (
            <Spinner spinnerSize={24} />
          ) : (
            <>
              <p className="type-control font-semibold text-accent">
                {t("blogs.showMore")}
              </p>
              <Image
                alt=""
                src={"/icons/plus-orange.svg"}
                width={24}
                height={24}
                className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
              />
            </>
          )}
        </button>
      )}
    </section>
  );
};

export default BlogPage;
