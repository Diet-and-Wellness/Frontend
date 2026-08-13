import Image from "next/image";
import DateIcon from "../icons/Date";
import PenIcon from "../icons/Pen";
import TrashIcon from "../icons/TrashIcon";
import { BlogResponse } from "../../api/types/blogs.types";
import { formatDate } from "../../utils/formateDate";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Eye } from "../icons/Eye";

const Blog = ({
  type,
  blog,
  showDeleteBlogModal,
}: {
  type: string;
  blog: BlogResponse;
  showDeleteBlogModal?: () => void;
}) => {
  const t = useTranslations();

  return (
    <div className="flex max-w-full h-fit flex-col overflow-hidden rounded-4xl border border-line-soft transition-shadow duration-200 hover:shadow-lg bg-surface">
      <div className="overflow-hidden w-full">
        <Image
          width={400}
          height={60}
          src={blog.imageUrl}
          alt="blog image"
          className="max-h-60 w-full object-cover object-top transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-col items-start gap-2.5 p-5">
        {type === "landing" && (
          <div className="flex flex-row gap-5 items-center">
            <p className="type-label font-medium text-brand-dark">
              {formatDate(blog.createdAt)}
            </p>
            <div className="bg-accent text- rounded-lg py-0.75 px-3 flex flex-row justify-center items-center gap-1">
              <Eye className="h-3.5 w-3.5 lg:h-4.5 lg:w-4.5" />
              <p className="type-meta font-medium leading-3">
                {t("blogs.minutesRead", { count: blog.estimatedReadTime })}
              </p>
            </div>
          </div>
        )}

        <h5 className="line-clamp-1 text-[1.0625rem] leading-[1.3] font-semibold sm:text-[1.1875rem] md:text-xl lg:text-[1.375rem]">
          {blog.title}
        </h5>

        <p className="type-body line-clamp-3 text-content-muted">
          {blog.description}
        </p>

        {type === "landing" && (
          <Link
            href={`/blogs/${blog.slug}`}
            className="group hover:bg-brand-deep transition-colors duration-400 mt-2 py-2 px-6 lg:px-8 rounded-full border-2 border-brand-deep"
          >
            <span className="type-control text-center font-bold text-brand-deep group-hover:text-white transition-colors duration-400">
              {t("blogs.readMore")}
            </span>
          </Link>
        )}
      </div>

      {type === "dashboard" && (
        <div className="flex justify-between items-center px-5 py-3 border-t border-t-line">
          <div className="flex gap-3 items-center">
            <DateIcon className="text-content-muted" />
            <p className="type-label text-content-muted">
              {formatDate(blog.createdAt)}
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <Link
              href={`/dashboard/admin/blogs/${blog.id}/edit-blog`}
              className="size-10 rounded-full flex justify-center items-center hover:bg-line-soft cursor-pointer"
            >
              <PenIcon className="text-content-muted" />
            </Link>
            <button
              onClick={showDeleteBlogModal}
              className="size-10 rounded-full flex justify-center items-center hover:bg-danger-soft cursor-pointer"
            >
              <TrashIcon className="text-danger" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
