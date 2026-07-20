"use client";

import BlogForm from "@/app/[locale]/components/Blogs/BlogForm";
import ArrowIcon from "@/app/[locale]/components/icons/ArrowIcon";
import RightArrowIcon from "@/app/[locale]/components/icons/RightArrowIcon";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
} as const;

const AddNewBlogPage = () => {
  const router = useRouter();

  const backToMainBlogsPage = () => {
    router.replace("/dashboard/admin/blogs");
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <motion.div variants={item} className="flex justify-between items-start">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <p className="text-[#A4A4A4] text-[20px]">Content & blogs</p>
            <RightArrowIcon />
            <p className="text-[20px]">Add blog</p>
          </div>
          <h3 className="font-bold text-[30px]">Add New Blog</h3>
          <p className="text-[#4F4F4F] text-[20px]">
            Manage wellness blogs and content.
          </p>
        </div>
        <button
          onClick={backToMainBlogsPage}
          className="flex items-center gap-3 px-5 py-2 border border-[#E1E7EF] cursor-pointer rounded-full bg-[#FFFEFD]"
        >
          <ArrowIcon />
          <p className="text-[16px] font-semibold">Back to Blogs</p>
        </button>
      </motion.div>

      <BlogForm mood="new" />
    </motion.div>
  );
};

export default AddNewBlogPage;
