'use client';

import React from 'react';
import { usePostsData } from '@/hooks/usePostsData';
import PostCard from './PostCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';

/**
 * Main container component for displaying blog post cards
 * Handles data fetching, loading states, and error management
 */
const PostCardList: React.FC = () => {
  const { posts, loading, error, retry } = usePostsData();

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error) {
    return <ErrorState error={error} onRetry={retry} />;
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
      </div>
    );
  }

  return (
    <main role="main" aria-label="Blog posts">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Screen reader summary */}
      <div className="sr-only" aria-live="polite">
        Displaying {posts.length} blog posts
      </div>
    </main>
  );
};

export default React.memo(PostCardList);