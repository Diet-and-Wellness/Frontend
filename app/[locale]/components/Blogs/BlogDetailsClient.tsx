"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { formatDate } from "@/app/[locale]/utils/formateDate";
import {
  BlogDetailsSkeleton,
  CardGridSkeleton,
} from "@/app/[locale]/components/Public/Skeletons";
import { useBlog } from "@/app/[locale]/hooks/useBlog";
import ViewIcon from "@/app/[locale]/components/icons/ViewIcon";
import { useBlogs } from "@/app/[locale]/hooks/useBlogs";
import type { BlogResponse } from "@/app/[locale]/api/types/blogs.types";
import Blog from "@/app/[locale]/components/Blogs/Blog";
import { Eye } from "../icons/Eye";

const getRecommendationScore = (value: string) => {
  let score = 0;

  for (let index = 0; index < value.length; index += 1) {
    score = (score * 31 + value.charCodeAt(index)) >>> 0;
  }

  return score;
};

type BlogDetailsClientProps = {
  slug: string;
  initialBlog: BlogResponse;
};

const BlogDetailsClient = ({ slug, initialBlog }: BlogDetailsClientProps) => {
  const t = useTranslations("blogs");

  const { data: blog = initialBlog, isLoading } = useBlog(slug);

  const { data: blogs = [], isLoading: isBlogsLoading } = useBlogs();

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

  if (isLoading && !blog) {
    return <BlogDetailsSkeleton />;
  }

  return (
    <section className="min-h-screen min-w-full">
      <Image
        alt={blog.title}
        src={blog.imageUrl}
        width={1200}
        height={630}
        quality={100}
        priority
        className="mx-auto mt-20 min-h-80 max-h-170 w-[92.5%] max-w-[92.5%] rounded-4xl bg-(--color-palette-f4f4f2) object-cover md:min-h-120 md:w-[75%] lg:mt-25 lg:min-h-140"
      />

      <div className="mx-auto flex w-[90%] flex-col gap-7.5 py-7.5 md:max-w-[70%] lg:py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <p className="type-body-lg font-medium text-brand-dark">
              {formatDate(blog.createdAt)}
            </p>

            <div className="flex items-center justify-center gap-1 rounded-lg bg-accent px-2 py-1">
              <Eye className="h-4 w-4 lg:h-5 lg:w-5" />
              <p className="type-meta font-medium leading-3 text-accent-contrast">
                {t("minutesRead", {
                  count: blog.estimatedReadTime,
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <p className="type-body font-medium text-content-muted">
              {t("viewedBy", {
                count: blog.viewCount,
              })}
            </p>

            <ViewIcon />
          </div>
        </div>

        <h1 className="type-page-title font-semibold text-content">
          {blog.title}
        </h1>

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
            <div className="mx-auto mt-10 max-w-full">
              <h2 className="type-card-title mb-5 font-medium text-brand-dark lg:mb-10">
                {t("youMayAlsoLike")}
              </h2>

              <div className="grid w-full grid-cols-1 gap-7.5 place-self-center md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-7.5">
                {recommendedBlogs.map((recommendedBlog: BlogResponse) => (
                  <Blog
                    key={recommendedBlog.id}
                    type="landing"
                    blog={recommendedBlog}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default BlogDetailsClient;
