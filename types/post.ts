/**
 * Product/Post data structure from the API
 */
export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

/**
 * API response structure
 */
export interface ApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Transformed post data for display
 */
export interface BlogPost {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  brand: string;
  rating: number;
}

/**
 * Hook return type for data fetching
 */
export interface UsePostsDataReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}