import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { BlogRequest, BlogResponse } from "../../api/types/blogs.types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { detectLanguage } from "../../utils/detectLanguage";
import { calculateReadTime } from "../../utils/calculateReadTime";
import { blogsApi } from "../../api/endpoints/blogs.api";
import { useDropzone } from "react-dropzone";
import Spinner from "../Public/LoadingSpinner";
import Image from "next/image";
import UploadIcon from "../icons/UploadIcon";

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
      className="mt-10 flex justify-between items-start gap-10"
    >
      <form
        action=""
        onSubmit={handleSubmit(postBlog)}
        className="p-7.5 bg-[#FFFEFD] border border-[#E1E7EF] rounded-2xl flex flex-col gap-7.5 w-full"
      >
        <div className="flex flex-col gap-2.5">
          <label htmlFor="blogTitle" className="text-[16px] font-bold">
            Blog Title
          </label>
          <input
            type="text"
            placeholder="Blog Name..."
            id="blogTitle"
            {...register("title", { required: true })}
            className="border-none outline-none ring ring-[#D5D5D5] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4D8E32]"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label htmlFor="blogDescription" className="text-[16px] font-bold">
            Blog Description
          </label>
          <input
            type="text"
            placeholder="Blog Description..."
            id="blogDescription"
            {...register("description", { required: true })}
            className="border-none outline-none ring ring-[#D5D5D5] rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4D8E32]"
          />
        </div>

        <div className="flex flex-col gap-2.5 max-h-80">
          <label htmlFor="blogContent" className="text-[16px] font-bold">
            Blog Content
          </label>
          <textarea
            id="blogContent"
            placeholder="Blog Content..."
            {...register("content", { required: true })}
            className="resize-none border-none outline-none ring ring-[#D5D5D5] h-80 rounded-md px-3 py-2 focus:ring-2 focus:ring-[#4D8E32]"
          />
        </div>

        <button
          type="submit"
          disabled={!canPublish}
          className={`${!canPublish ? "cursor-not-allowed bg-[#ffc481]" : "cursor-pointer bg-[#E99532]"} mt-4 text-white text-[18px] font-medium rounded-4xl h-13 flex justify-center items-center`}
        >
          {addNewBlogMutation.isPending ? (
            <Spinner spinnerSize={30} />
          ) : (
            "Publish"
          )}
        </button>
      </form>
      <div
        {...getRootProps()}
        className={`min-w-100 p-7.5 rounded-2xl border-2 border-dashed ${isDragActive ? "ring-5 ring-[#4D8E32]/70 border-transparent" : "border-[#4F4F4F]"} flex flex-col justify-center items-center gap-3 bg-[#FFFEFD]`}
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
              Image selected successfully
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
              Remove Image
            </button>
          </>
        ) : (
          <>
            <div className="size-17.5 rounded-full flex justify-center items-center bg-[#FDF4EB]">
              <UploadIcon />
            </div>

            <p className="text-[20px] mt-2">Drag and drop your image here</p>

            <p className="text-[16px] text-[#4F4F4F]">
              PNG, JPG or WEBP up to 5MB
            </p>

            <button
              type="button"
              onClick={open}
              className="px-12 py-2 rounded-full border border-[#E1E7EF] text-[16px] font-semibold cursor-pointer mt-2"
            >
              Browse Files
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BlogForm;
