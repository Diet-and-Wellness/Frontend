export interface GetCategoriesRequest {
  page?: number;
  limit?: number;
}

export interface CategoryType {
  type: string;
}

export interface Slug {
  slug: string;
}

export interface CategoryId {
  categoryId: string;
}

export interface CreateCategoryRequest {
  name: string;
  displayName: string;
  arDisplayName: string;
  description: string;
  type: string;
  order: number;
}

export interface UpdateCategoryRequest {
  order: number;
}

export interface UpdateCategoryStatusRequest {
  isActive: boolean;
}

export interface CategoryOrderUpdate {
  id: string;
  order: number;
}

export interface UpdateCategoriesOrderRequest {
  updates: CategoryOrderUpdate[];
}