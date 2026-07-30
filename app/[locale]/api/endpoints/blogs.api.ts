import apiClient from "../index";
import type {
  BlogId,
  GetAllPublishedBlogsRequest,
  GetAllBlogsRequest,
  UpdateBlogStatusRequest,
  CategoryId,
  Slug,
} from "../types/blogs.types";

export const blogsApi = {
  getAllPublishedBlogs: (params: GetAllPublishedBlogsRequest) => {
    return apiClient.get("/articles", {
      params,
    });
  },
  getBlogsByCategory: (categoryId: CategoryId) => {
    return apiClient.get(`/articles/category/${categoryId}`);
  },
  getBlogsBySlug: (slug: Slug) => {
    return apiClient.get(`/articles/slug/${slug}/`);
  },
  getBlogsById: (blogId: BlogId) => {
    return apiClient.get(`/articles/${blogId}`);
  },
  createNewBlog: (data: FormData) => {
    return apiClient.post("/articles/admin", data);
  },
  getAllBlogs: (params: GetAllBlogsRequest) => {
    return apiClient.get("/articles/admin", {
      params: {
        status: "all",
        ...params,
      },
    });
  },
  updateBlog: (blogId: BlogId, data: FormData) => {
    return apiClient.put(`/articles/admin/${blogId}`, data);
  },
  deleteBlog: (blogId: BlogId) => {
    return apiClient.delete(`/articles/admin/${blogId}`);
  },
  updateBlogStatus: (blogId: BlogId, params: UpdateBlogStatusRequest) => {
    return apiClient.patch(`/articles/admin/${blogId}/status`, {
      params,
    });
  },
};
