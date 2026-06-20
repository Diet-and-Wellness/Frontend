"use client";

import Image from "next/image";
import DateIcon from "../icons/Date";
import PenIcon from "../icons/Pen";
import TrashIcon from "../icons/TrashIcon";
import { BlogResponse } from "../../api/types/blogs.types";
import { formatDate } from "../../utils/formateDate";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Blog = ({
  type,
  blog,
  showDeleteBlogModal,
}: {
  type: string;
  blog: BlogResponse;
  showDeleteBlogModal: () => void;
}) => {
  const t = useTranslations();

  return (
    <div className="flex max-w-full h-fit flex-col overflow-hidden rounded-4xl border border-[#EDEDED] transition-shadow duration-200 hover:shadow-lg bg-[#FFFEFD]">
      <div className="overflow-hidden w-full">
        <Image
          width={400}
          height={60}
          src="/images/blog-img.webp"
          alt="blog image"
          className="h-full w-full object-cover object-center transition-transform duration-300 scale-105 hover:scale-110"
        />
      </div>

      <div className="flex flex-col items-start gap-2.5 p-5">
        {type === "landing" && (
          <div className="flex flex-row gap-5 items-center">
            <p className="text-[#3E7228] text-[16px] md:text-[18px] font-medium">
              {formatDate(blog.createdAt)}
            </p>
            <div className="bg-[#E99532] rounded-lg py-0.75 px-3 flex flex-row justify-center items-center gap-1">
              <Image
                width={16}
                height={16}
                src="/icons/eye.svg"
                alt="Eye icon"
                className="h-3 w-3 lg:h-4 lg:w-4"
              />
              <p className="text-white font-medium text-[11px] md:text-[12px] lg:text-[13px] leading-3">
                {`${blog.estimatedReadTime} min Read`}
              </p>
            </div>
          </div>
        )}

        <h5 className="line-clamp-1 text-[16px] font-semibold md:text-[18px] lg:text-[20px]">
          {blog.title}
        </h5>

        <p className="line-clamp-3 text-[12px] text-[#4F4F4F] md:text-[14px] lg:text-[16px]">
          {blog.description}
        </p>

        {type === "landing" && (
          <Link
            href={`/blogs/${blog.slug}`}
            className="group hover:bg-[#2E551E] transition-colors duration-400 mt-2 py-2 px-6 lg:px-8 rounded-full border-2 border-[#2E551E]"
          >
            <span className="text-[#2E551E] font-bold text-center text-[14px] md:text-[18px] group-hover:text-white transition-colors duration-400">
              {t("blogs.readMore")}
            </span>
          </Link>
        )}
      </div>

      {type === "dashboard" && (
        <div className="flex justify-between items-center px-5 py-3 border-t border-t-[#E1E7EF]">
          <div className="flex gap-3 items-center">
            <DateIcon className="text-[#4F4F4F]" />
            <p className="text-[#4F4F4F] text-[15px]">
              {formatDate(blog.createdAt)}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <button className="size-10 rounded-full flex justify-center items-center hover:bg-gray-200 cursor-pointer">
              <PenIcon className="text-[#4F4F4F]" />
            </button>
            <button
              onClick={showDeleteBlogModal}
              className="size-10 rounded-full flex justify-center items-center hover:bg-red-100 cursor-pointer"
            >
              <TrashIcon className="text-[#DC2626]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
