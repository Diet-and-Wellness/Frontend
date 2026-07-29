import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { BlogRequest, BlogResponse } from "@/app/[locale]/api/types/blogs.types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { detectLanguage } from "@/app/[locale]/utils/detectLanguage";
import { calculateReadTime } from "@/app/[locale]/utils/calculateReadTime";
import { blogsApi } from "@/app/[locale]/api/endpoints/blogs.api";
import { useDropzone } from "react-dropzone";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";
import Image from "next/image";
import UploadIcon from "@/app/[locale]/components/icons/UploadIcon";
import { useTranslations } from "next-intl";

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
} as const;

const BlogForm = ({ mood, blog }: { mood: string; blog?: BlogResponse }) => {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const queryClient = useQueryClient();

  const [attachment, setAttachment] = useState<File | null>(null);
  const [hideCurrentImage, setHideCurrentImage] = useState(false);

  const previewUrl = useMemo(() => {
    if (attachment) {
      return URL.createObjectURL(attachment);
    }

    if (mood === "edit" && !hideCurrentImage) {
      return blog?.imageUrl ?? null;
    }

    return null;
  }, [attachment, blog?.imageUrl, mood, hideCurrentImage]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<BlogRequest>({
    mode: "onChange",
  });

  const backToMainBlogsPage = () => {
    router.replace("/dashboard/admin/blogs");
  };

  const postBlog = async (blogData: BlogRequest) => {
    await addNewBlogMutation.mutateAsync(blogData);
  };

  const addNewBlogMutation = useMutation({
    mutationFn: async (blogData: BlogRequest) => {
      const blogLang = detectLanguage(
        `${blogData.title} ${blogData.description} ${blogData.content}`,
      );

      const estimatedReadTime = calculateReadTime(blogData.content, blogLang);

      const formData = new FormData();

      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("content", blogData.content);
      formData.append("language", blogLang);
      formData.append("estimatedReadTime", estimatedReadTime.toString());

      if (attachment) {
        formData.append("attachment", attachment);
      }

      if (mood === "new") {
        await blogsApi.createNewBlog(formData);
      } else {
        await blogsApi.updateBlog(blog?.id ?? "", formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publishedBlogs"] });
      setAttachment(null);
      reset();
      backToMainBlogsPage();
    },
  });

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    noClick: true,

    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (!file) return;

      setAttachment(file);
      setHideCurrentImage(false);
    },
  });

  useEffect(() => {
    if (!blog) return;

    reset({
      title: blog.title,
      description: blog.description,
      content: blog.content,
    });
  }, [blog, reset]);

  const canPublish =
    isValid && !!previewUrl && !isSubmitting && !addNewBlogMutation.isPending;

  return (
    <motion.div
      variants={item}
      className="mt-6 flex flex-col items-stretch gap-6 sm:mt-10 lg:flex-row lg:items-start lg:gap-10"
    >
      <form
        action=""
        onSubmit={handleSubmit(postBlog)}
        className="flex w-full flex-col gap-5 rounded-2xl border border-[#E1E7EF] bg-[#FFFEFD] p-5 sm:gap-7.5 sm:p-7.5"
      >
        <div className="flex flex-col gap-2.5">
          <label htmlFor="blogTitle" className="type-label font-bold">
            {t("blogTitle")}
          </label>
          <input
            type="text"
            placeholder={t("blogTitle")}
            id="blogTitle"
            {...register("title", { required: true })}
            className="border-none outline-none ring ring-[#D5D5D5] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#4D8E32] transition-all duration-150"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="blogDescription" className="type-label font-bold">
            {t("blogDescription")}
          </label>
          <input
            type="text"
            placeholder={t("blogDescription")}
            id="blogDescription"
            {...register("description", { required: true })}
            className="border-none outline-none ring ring-[#D5D5D5] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#4D8E32] transition-all duration-150"
          />
        </div>

        <div className="flex flex-col gap-2.5 max-h-80">
          <label htmlFor="blogContent" className="type-label font-bold">
            {t("blogContent")}
          </label>
          <textarea
            id="blogContent"
            placeholder={t("blogContent")}
            {...register("content", { required: true })}
            className="resize-none border-none outline-none ring ring-[#D5D5D5] h-80 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#4D8E32] transition-all duration-150"
          />
        </div>

        <button
          type="submit"
          disabled={!canPublish}
          className={`${!canPublish ? "cursor-not-allowed bg-gray-300 text-gray-500" : "cursor-pointer bg-[#E99532]"} type-control mt-4 flex h-13 items-center justify-center rounded-4xl font-medium text-white`}
        >
          {addNewBlogMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            t("publish")
          )}
        </button>
      </form>
      <div
        {...getRootProps()}
        className={`order-first w-full rounded-2xl border-2 border-dashed p-5 sm:p-7.5 lg:order-0 lg:min-w-100 ${isDragActive ? "ring-5 ring-[#4D8E32]/70 border-transparent" : "border-[#4F4F4F]"} flex flex-col justify-center items-center gap-3 bg-[#FFFEFD]`}
      >
        <input {...getInputProps()} />

        {previewUrl ? (
          <>
            <div className="ring-3 ring-[#4D8E32] rounded-2xl overflow-hidden max-h-50 max-w-full min-h-30">
              <Image
                src={previewUrl ?? ""}
                alt="Preview"
                width={500}
                height={500}
                className="max-w-full max-h-50 rounded-xl object-cover"
                unoptimized
              />
            </div>

            <p className="text-lg font-semibold text-center text-[#4D8E32]">
              {t("imageSelected")}
            </p>

            {attachment && (
              <p className="text-[#4F4F4F]">
                {(attachment.size / 1024 / 1024).toFixed(2)}
                {" MB"}
              </p>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setAttachment(null);
                setHideCurrentImage(true);
              }}
              className="px-8 py-2 rounded-full border border-[#E1E7EF] cursor-pointer"
            >
              {t("removeImage")}
            </button>
          </>
        ) : (
          <>
            <div className="size-17.5 rounded-full flex justify-center items-center bg-[#FDF4EB]">
              <UploadIcon />
            </div>

            <p className="type-card-title mt-2 text-center">{t("dragDropImage")}</p>

            <p className="type-label text-center text-[#4F4F4F]">
              {t("imageFormats")}
            </p>

            <button
              type="button"
              onClick={open}
              className="type-control mt-2 rounded-full border border-[#E1E7EF] px-12 py-2 font-semibold cursor-pointer"
            >
              {t("browseFiles")}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BlogForm;
