import apiClient from "../index";
import type {
  Recipe,
  GetAllPublishedRecipesRequest,
  RecipeId,
  RecipesCategory,
  Slug,
  UpdateRecipeStatusRequest,
} from "../types/recipes.types";

export const recipesApi = {
  getAllPublishedRecipes: (params: GetAllPublishedRecipesRequest) => {
    return apiClient.get("/recipes?page=1&limit=10&lang=all", {
      params,
    });
  },
  getRecipesByCategory: (recipesCategory: RecipesCategory) => {
    return apiClient.get(`/recipes/category/${recipesCategory}`);
  },
  getRecipesBySlug: (slug: Slug) => {
    return apiClient.get(`/recipes/${slug}/chicken-tikka-masala`);
  },
  getRecipesById: (recipeId: RecipeId) => {
    return apiClient.get(`/recipes/${recipeId}`);
  },
  createNewRecipe: (data: Recipe) => {
    return apiClient.post("/recipes/admin/", data);
  },
  getAllRecipes: () => {
    return apiClient.get(`/recipes/admin?status=all&lang=all`);
  },
  updateRecipe: (recipeId: RecipeId, data: Recipe) => {
    return apiClient.put(`recipes/admin/${recipeId}`, data);
  },
  deleteRecipe: (recipeId: RecipeId) => {
    return apiClient.delete(`recipes/admin/${recipeId}`);
  },
  updateRecipeStatus: (recipeId: RecipeId, data: UpdateRecipeStatusRequest) => {
    return apiClient.patch(`recipes/admin/${recipeId}/status`, data);
  },
  
};
