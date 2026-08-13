"use client";

import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { formatDate } from "@/app/[locale]/utils/formateDate";
import {
  BlogDetailsSkeleton,
  CardGridSkeleton,
} from "@/app/[locale]/components/Public/Skeletons";
import { useBlog } from "@/app/[locale]/hooks/useBlog";
import ViewIcon from "@/app/[locale]/components/icons/ViewIcon";
import { useBlogs } from "@/app/[locale]/hooks/useBlogs";
import { BlogResponse } from "@/app/[locale]/api/types/blogs.types";
import Blog from "@/app/[locale]/components/Blogs/Blog";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Eye } from "@/app/[locale]/components/icons/Eye";

const getRecommendationScore = (value: string) => {
  let score = 0;

  for (let index = 0; index < value.length; index += 1) {
    score = (score * 31 + value.charCodeAt(index)) >>> 0;
  }

  return score;
};

const BlogDetails = () => {
  const t = useTranslations("blogs");
  const pathname = usePathname();
  const splittedPathname = pathname.split("/");
  const slug = splittedPathname[splittedPathname.length - 1];

  const { data: blog, isLoading } = useBlog(slug);

  const { data: blogs, isLoading: isBlogsLoading } = useBlogs();

  const recommendedBlogs = useMemo(() => {
    return blogs
      .filter((candidate: BlogResponse) => candidate.slug !== slug)
      .map((candidate: BlogResponse) => ({
        blog: candidate,
        score: getRecommendationScore(`${slug}:${candidate.id}`),
      }))
      .sort((first, second) => first.score - second.score)
      .slice(0, 3)
      .map(({ blog: candidate }) => candidate);
  }, [blogs, slug]);

  return (
    <section className="min-h-screen min-w-full">
      {blog && (
        <Image
          alt=""
          src={blog?.imageUrl}
          width={1000}
          height={1000}
          quality={100}
          className="mx-auto mt-20 min-h-80 max-h-170 w-[92.5%] max-w-[92.5%] rounded-4xl bg-(--color-palette-f4f4f2) object-cover md:min-h-120 md:w-[75%] lg:mt-25 lg:min-h-140"
        />
      )}

      {isLoading ? (
        <BlogDetailsSkeleton />
      ) : (
        <div className="flex flex-col gap-7.5 w-[90%] md:max-w-[70%] mx-auto py-7.5 lg:py-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              <p className="type-body-lg font-medium text-brand-dark">
                {formatDate(blog.createdAt)}
              </p>

              <div className="bg-accent rounded-lg py-1 px-2 flex flex-row justify-center items-center gap-1">
                <Eye className="h-3.5 w-3.5 lg:h-4.5 lg:w-4.5" />
                <p className="type-meta font-medium leading-3">
                  {t("minutesRead", { count: blog.estimatedReadTime })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <p className="type-body font-medium text-content-muted">
                {t("viewedBy", { count: blog.viewCount })}
              </p>
              <ViewIcon />
            </div>
          </div>

          <h5 className="type-page-title font-semibold">{blog.title}</h5>

          <p className="type-body-lg max-w-6xl font-medium text-content-muted">
            {blog.description}
          </p>

          <p className="type-body max-w-6xl whitespace-pre-wrap text-content-muted">
            {blog.content}
          </p>

          {isBlogsLoading ? (
            <CardGridSkeleton cards={3} className="mt-10" />
          ) : (
            recommendedBlogs.length > 0 && (
              <div className="mt-10 max-w-full mx-auto">
                <h4 className="type-card-title mb-5 font-medium text-brand-dark lg:mb-10">
                  {t("youMayAlsoLike")}
                </h4>
                <div className="w-full grid place-self-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5 md:gap-5 lg:gap-7.5 justify-between">
                  {recommendedBlogs.map((blog: BlogResponse) => (
                    <Blog key={blog.id} type="landing" blog={blog} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
