export interface GetAllPublishedRecipesRequest {
  page?: number;
  limit?: number;
  lang?: string;
}

export interface RecipesCategory {
  category: string;
}

export interface Slug {
  slug: string;
}

export interface RecipeId {
  id: string;
}

export interface Recipe {
  title: string;
  description: string;
  content: string;
  category: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  langauge: string;
  tags: string[];
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
  }[];
  instructions: {
    step: number;
    description: string;
  }[];
  attachment: File;
}

export interface RecipeId {
  id: string;
}

export interface UpdateRecipeStatusRequest {
  isHidden: boolean;
}
