"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogsApi } from "@/app/[locale]/api/endpoints/blogs.api";
import Blog from "@/app/[locale]/components/Blogs/Blog";
import PlusIcon from "@/app/[locale]/components/icons/PlusIcon";
import { BlogResponse } from "@/app/[locale]/api/types/blogs.types";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import TrashIllustrator from "@/app/[locale]/components/icons/TrashIllustrator";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
} as const;

const item = {
  hidden: { opacity: 0, y: 25, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
} as const;

const BlogsPage = () => {
  const [deleteBlogState, setDeleteBlogState] = useState({
    isOpen: false,
    selectedBlogId: "",
  });

  const queryClient = useQueryClient();

  const deleteBlogMutation = useMutation({
    mutationFn: async (blogId: string) => {
      await blogsApi.deleteBlog(blogId);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboardStat"] }),
      ]);
      closeDeleteBlogModal();
    },
  });

  const deleteBlog = async () => {
    deleteBlogMutation.mutate(deleteBlogState.selectedBlogId);
  };

  const closeDeleteBlogModal = () => {
    setDeleteBlogState({
      isOpen: false,
      selectedBlogId: "",
    });
  };

  const showDeleteBlogModal = (blogId: string) => {
    setDeleteBlogState({
      isOpen: true,
      selectedBlogId: blogId,
    });
  };

  const getPublishedBlogs = async () => {
    const { data } = await blogsApi.getAllBlogs();
    return data?.data ?? [];
  };

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: getPublishedBlogs,
  });

  const postBlog = async () => {
    await blogsApi.createNewBlog({
      title: "The Benefits of Meal Planning for a Healthier Life",
      description:
        "Meal planning is a simple yet powerful habit that helps you make healthier food choices, save time, and reduce unnecessary stress during busy weeks. With a little preparation, you can stay consistent with your nutrition goals.",
      content:
        "Planning your meals ahead of time can significantly improve your eating habits and overall lifestyle. By deciding what to eat in advance, you reduce the temptation to rely on unhealthy fast food or skip meals altogether. Meal planning also helps you manage portion sizes, stick to a balanced diet, and minimize food waste. Preparing ingredients or meals in batches can save valuable time during the week while making healthy eating more convenient and sustainable. Whether your goal is weight management, better energy levels, or improved wellness, creating a weekly meal plan is a practical step toward long-term success.",
      category: "6a13f7d2083e8a7fa5a3936e",
      tags: ["meal-planning", "nutrition", "healthy-living", "diet"],
      estimatedReadTime: 5,
      language: "en",
      imageUrl: null,
    });

    queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      variants={container}
      className="flex w-full flex-col gap-10"
    >
      <AnimatePresence mode="wait">
        {deleteBlogState.isOpen && (
          <AlertModal
            key="delete-blog-modal"
            illustrator={<TrashIllustrator />}
            note={"Are you sure you want to delete this blog"}
            confirmBtnTitle={"Yes, delete"}
            confirm={deleteBlog}
            closeModal={closeDeleteBlogModal}
            pending={deleteBlogMutation.isPending}
          />
        )}
      </AnimatePresence>

      <motion.div variants={item} className="flex justify-between items-start">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Content & Blogs</h2>
          <p className="text-xl font-light text-[#4F4F4F]">
            Manage wellness articles and content.
          </p>
        </div>

        <button
          onClick={postBlog}
          className="px-5 py-2.5 rounded-full bg-[#E99532] cursor-pointer hover:bg-[#e28010] transition duration-150 flex"
        >
          <PlusIcon className="text-white" />
          <p className="text-[#FFFEFD] text-[16px] font-medium">Add Blog</p>
        </button>
      </motion.div>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="place-self-center my-50"
        >
          <Spinner spinnerSize={60} borderColor="#4D8E32" />
        </motion.div>
      ) : (
        <motion.div
          layout
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {blogs?.map((blog: BlogResponse) => (
            <motion.div
              key={blog.id}
              variants={item}
              layout
              transition={{
                layout: { duration: 0.25 },
              }}
            >
              <Blog
                type="dashboard"
                blog={blog}
                showDeleteBlogModal={() => showDeleteBlogModal(blog.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default BlogsPage;
