'use client';

import { useState, useEffect, useCallback } from 'react';
import { ApiResponse, BlogPost, UsePostsDataReturn } from '@/types/post';

/**
 * Custom hook for fetching and managing blog post data
 * Implements retry mechanism, error handling, and data transformation
 */
export const usePostsData = (): UsePostsDataReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  /**
   * Transforms API product data to blog post format
   */
  const transformApiData = useCallback((apiData: ApiResponse): BlogPost[] => {
    return apiData.products.slice(0, 10).map((product) => ({
      id: product.id,
      title: product.title.length > 60 ? `${product.title.substring(0, 60)}...` : product.title,
      description: product.description.length > 150 
        ? `${product.description.substring(0, 150)}... Read more...`
        : product.description,
      imageUrl: `https://placehold.co/400x200?text=Post+${product.id}`,
      category: product.category,
      brand: product.brand,
      rating: product.rating
    }));
  }, []);

  /**
   * Fetches data from the API with error handling and retry logic
   */
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Minimum loading duration to prevent flicker
      const minLoadingPromise = new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch('https://dummyjson.com/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      // Validate data structure
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Invalid data structure received from API');
      }

      await minLoadingPromise;
      
      const transformedPosts = transformApiData(data);
      setPosts(transformedPosts);
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      // Exponential backoff for retries
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchPosts();
        }, delay);
      }
    } finally {
      setLoading(false);
    }
  }, [transformApiData, retryCount]);

  /**
   * Manual retry function for user-triggered retries
   */
  const retry = useCallback(() => {
    setRetryCount(0);
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    retry
  };
};