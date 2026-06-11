import apiClient from "../index";
import type {
  BlogId,
  GetAllPublishedBlogsRequest,
  UpdateBlogStatusRequest,
  CategoryId,
  Slug,
  BlogRequest,
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
  createNewBlog: (data: BlogRequest) => {
    return apiClient.post("/articles/admin", data);
  },
  getAllBlogs: () => {
    return apiClient.get("/articles/admin?status=all");
  },
  updateBlog: (blogId: BlogId) => {
    return apiClient.put(`/articles/admin/${blogId}`);
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
