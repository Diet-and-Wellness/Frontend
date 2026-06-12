import { useQuery } from "@tanstack/react-query";
import { blogsApi } from "../api/endpoints/blogs.api";

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
  });
};

const getBlogBySlug = async (slug: string) => {
  const { data } = await blogsApi.getBlogsBySlug(slug);
  return data ?? {};
};
