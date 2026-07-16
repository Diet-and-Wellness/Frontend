import { useQuery } from "@tanstack/react-query";
import { blogsApi } from "../api/endpoints/blogs.api";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["landingBlogs"],
    queryFn: getAllBlogs,
  });
};

const getAllBlogs = async () => {
  const { data } = await blogsApi.getAllPublishedBlogs({});
  return data?.data ?? [];
};
