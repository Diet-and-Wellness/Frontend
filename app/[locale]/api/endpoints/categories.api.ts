import apiClient from "../index";
import type {
  CategoryId,
  CategoryType,
  CreateCategoryRequest,
  GetCategoriesRequest,
  Slug,
  UpdateCategoriesOrderRequest,
  UpdateCategoryRequest,
  UpdateCategoryStatusRequest,
} from "../types/categories.types";

export const categoriesApi = {
  getActiveCategories: (params: GetCategoriesRequest) => {
    return apiClient.get("/categories", {
      params,
    });
  },
  getCategoriesByType: (type: CategoryType, params: GetCategoriesRequest) => {
    return apiClient.get(`categories/${type}/article`, {
      params,
    });
  },
  getCategoryBySlug: (slug: Slug) => {
    return apiClient.get(`categories/${slug}/gym`);
  },
  getCategoryById: (categoryId: CategoryId) => {
    return apiClient.get(`categories/${categoryId}`);
  },
  createCategory: (data: CreateCategoryRequest) => {
    return apiClient.post("categories/", data);
  },
  getAllCategories: (params: GetCategoriesRequest) => {
    return apiClient.get("categories/admin/all", {
      params,
    });
  },
  updateCategory: (categoryId: CategoryId, data: UpdateCategoryRequest) => {
    return apiClient.put(`/categories/admin/${categoryId}`, data);
  },
  updateCategoryStatus: (
    categoryId: CategoryId,
    data: UpdateCategoryStatusRequest,
  ) => {
    return apiClient.patch(`/categories/admin/${categoryId}/status`, data);
  },
  deleteCategory: (categoryId: CategoryId) => {
    return apiClient.delete(`/categories/admin/${categoryId}`);
  },
  reorderCategories: (data: UpdateCategoriesOrderRequest) => {
    return apiClient.patch("/categories/admin/reorder", data)
  }
};
