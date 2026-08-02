"use client";

import { blogsApi } from "@/app/[locale]/api/endpoints/blogs.api";
import BlogForm from "../../_components/BlogForm";
import RightArrowIcon from "@/app/[locale]/components/icons/RightArrowIcon";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { BlogFormSkeleton } from "@/app/[locale]/components/Public/Skeletons";
import { BackButton } from "../../../_components/BackToBtn";

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

const EditBlogPage = () => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const backToMainBlogsPage = () => {
    router.replace("/dashboard/admin/blogs");
  };

  const { data: blog, isLoading } = useQuery({
    queryKey: ["editedBlog", id],
    queryFn: async () => {
      const { data } = await blogsApi.getBlogsById(id);
      return data;
    },
    gcTime: 0,
    enabled: !!id,
  });

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      <motion.div
        variants={item}
        className="flex flex-col items-stretch gap-5 sm:flex-row sm:items-start sm:justify-between"
      >
        <div className="flex flex-col gap-3">
          <div className="type-body-lg flex items-center gap-2">
            <p className="text-content-placeholder">{t("contentAndBlogs")}</p>
            <RightArrowIcon />
            <p>{t("editBlogBreadcrumb")}</p>
          </div>
          <h3 className="type-page-title font-bold">{t("editBlog")}</h3>
          <p className="type-body-lg text-content-muted">{t("manageBlogs")}</p>
        </div>
        <BackButton
          text={t("backToBlogs")}
          clickHandler={backToMainBlogsPage}
        />
      </motion.div>
      {isLoading ? (
        <BlogFormSkeleton />
      ) : (
        blog && <BlogForm mood="edit" blog={blog} />
      )}
    </motion.div>
  );
};

export default EditBlogPage;
