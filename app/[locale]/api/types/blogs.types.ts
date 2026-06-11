export interface GetAllPublishedBlogsRequest {
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface CategoryId {
  id: string;
}

export type Slug = string;

export type BlogId = string;

export interface BlogResponse {
  id: string;
  title: string;
  description: string;
  content: string;
  language: string;

  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  category: {
    id: string;
    name: string;
    displayName: string;
    arDisplayName: string;
  };

  tags: string[];

  viewCount: number;
  estimatedReadTime: number;

  imageUrl: string | null;
  slug: string;

  createdAt: string;
  updatedAt: string;
}

export interface BlogRequest {
  title: string;
  description: string;
  content: string;
  language: string;
  category: string;
  tags: string[];
  estimatedReadTime: number;
  imageUrl: string | null;
}

export interface UpdateBlogStatusRequest {
  isHidden: boolean;
}
