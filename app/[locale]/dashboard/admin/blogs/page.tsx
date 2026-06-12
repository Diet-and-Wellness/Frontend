"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { blogsApi } from "@/app/[locale]/api/endpoints/blogs.api";
import Blog from "@/app/[locale]/components/Blogs/Blog";
import PlusIcon from "@/app/[locale]/components/icons/PlusIcon";
import { BlogResponse } from "@/app/[locale]/api/types/blogs.types";
import Spinner from "@/app/[locale]/components/Public/LoadingSpinner";

const BlogsPage = () => {
  const queryClient = useQueryClient();

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
    <section className="flex w-full flex-col gap-10">
      <div className="flex justify-between items-start">
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
      </div>

      {isLoading ? (
        <div className="place-self-center my-25">
          <Spinner spinnerSize={50} borderColor="#4D8E32" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-">
          {blogs?.map((blog: BlogResponse) => (
            <Blog key={blog.id} type="dashboard" blog={blog} />
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogsPage;
