import { useInfiniteQuery } from "@tanstack/react-query";
import { blogsApi } from "../api/endpoints/blogs.api";
import type { BlogResponse } from "../api/types/blogs.types";
import { parsePaginatedResponse } from "../utils/pagination";

export const useBlogs = () => {
  const query = useInfiniteQuery({
    queryKey: ["landingBlogs"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getBlogsPage(pageParam),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNextPage ? pages.length + 1 : undefined,
  });

  return {
    ...query,
    data: query.data?.pages.flatMap((page) => page.items) ?? [],
  };
};

const getBlogsPage = async (page: number) => {
  const { data } = await blogsApi.getAllPublishedBlogs({
    page,
    limit: 6,
  });

  return parsePaginatedResponse<BlogResponse>(data, page, 6);
};
