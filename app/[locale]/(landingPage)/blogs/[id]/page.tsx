import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogDetailsClient from "@/app/[locale]/components/Blogs/BlogDetailsClient";
import type { BlogResponse } from "@/app/[locale]/api/types/blogs.types";

const SITE_URL = "https://diet-n-wellness.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type PageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

type BlogApiResponse = {
  data: BlogResponse;
};

const getBlogBySlug = async (slug: string): Promise<BlogResponse | null> => {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  try {
    const response = await fetch(
      `${API_URL}/blogs/slug/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: 300,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as BlogApiResponse;

    return result.data ?? null;
  } catch {
    return null;
  }
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, id: slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: locale === "ar" ? "المقال غير موجود" : "Blog not found",
    };
  }

  const pageUrl = `${SITE_URL}/${locale}/blogs/${slug}`;

  const imageUrl = blog.imageUrl.startsWith("http")
    ? blog.imageUrl
    : `${SITE_URL}${blog.imageUrl}`;

  return {
    title: blog.title,
    description: blog.description,

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      type: "article",
      url: pageUrl,
      siteName: "Diet and Wellness",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: imageUrl,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { id: slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailsClient slug={slug} initialBlog={blog} />;
}
