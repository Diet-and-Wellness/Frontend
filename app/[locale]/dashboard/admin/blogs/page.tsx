"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { blogsApi } from "@/app/[locale]/api/endpoints/blogs.api";
import Blog from "@/app/[locale]/components/Blogs/Blog";
import PlusIcon from "@/app/[locale]/components/icons/PlusIcon";
import { BlogResponse } from "@/app/[locale]/api/types/blogs.types";
import { CardGridSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import { AnimatePresence, motion } from "framer-motion";
import AlertModal from "@/app/[locale]/components/Modals/AlertModal";
import TrashIllustrator from "@/app/[locale]/components/icons/TrashIllustrator";
import { useState } from "react";
import Link from "next/link";
import EmptyComp from "@/app/[locale]/components/Public/Empty";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dashboard");
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
            note={t("deleteBlogConfirmation")}
            confirmBtnTitle={t("confirmDelete")}
            confirm={deleteBlog}
            closeModal={closeDeleteBlogModal}
            pending={deleteBlogMutation.isPending}
          />
        )}
      </AnimatePresence>

      <motion.div variants={item} className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="type-page-title mb-3 font-bold sm:mb-4">{t("contentAndBlogs")}</h2>
          <p className="type-body-lg font-light text-[#4F4F4F]">
            {t("manageBlogs")}
          </p>
        </div>

        <Link
          href={"/dashboard/admin/blogs/new-blog"}
          className="flex items-center justify-center rounded-full bg-[#E99532] px-5 py-2.5 transition duration-150 hover:bg-[#e28010] sm:w-fit"
        >
          <PlusIcon className="text-white" />
          <p className="type-control font-medium text-[#FFFEFD]">{t("addBlog")}</p>
        </Link>
      </motion.div>

      {isLoading ? (
        <CardGridSkeleton cards={6} />
      ) : blogs.length > 0 ? (
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
      ) : (
        <EmptyComp
          title={t("noBlogsYet")}
          description={t("noBlogsDescription")}
        />
      )}
    </motion.section>
  );
};

export default BlogsPage;
