'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Eye } from 'lucide-react';
import { BlogPost } from '@/types/post';
import { PostDialog } from './PostDialog';

interface PostCardProps {
  /** Blog post data to display */
  post: BlogPost;
}

/**
 * Individual blog post card component
 * Displays post information with hover effects and accessibility features
 */
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  /**
   * Handles image loading errors with fallback
   */
  const handleImageError = () => {
    setImageError(true);
  };

  /**
   * Handles successful image load
   */
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  /**
   * Renders star rating display
   */
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
          aria-hidden="true"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star
          key="half"
          className="h-4 w-4 fill-yellow-400/50 text-yellow-400"
          aria-hidden="true"
        />
      );
    }

    return stars;
  };

  /**
   * Handles card click to open dialog
   */
  const handleCardClick = () => {
    setDialogOpen(true);
  };

  /**
   * Handles dialog close
   */
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card 
        className="bg-white border border-purple-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group focus-within:ring-2 focus-within:ring-purple-500 focus-within:ring-offset-2"
        role="article"
        tabIndex={0}
        aria-labelledby={`post-title-${post.id}`}
        aria-describedby={`post-description-${post.id}`}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
      <CardHeader className="p-4">
        <div className="relative overflow-hidden rounded-md">
          {!imageLoaded && !imageError && (
            <div className="w-full h-48 bg-purple-100 animate-pulse rounded-md flex items-center justify-center">
              <span className="text-purple-400 text-sm">Loading...</span>
            </div>
          )}
          
          {imageError ? (
            <div className="w-full h-48 bg-gradient-to-r from-purple-600 to-purple-800 rounded-md flex items-center justify-center">
              <span className="text-white text-sm font-medium">Post {post.id}</span>
            </div>
          ) : (
            <img
              src={post.imageUrl}
              alt={`Featured image for ${post.title}`}
              className={`w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          )}
          
          {/* Hover overlay with view icon */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="bg-white rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Eye className="h-5 w-5 text-purple-600" aria-hidden="true" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
          >
            {post.category}
          </Badge>
          <div className="flex items-center space-x-1" aria-label={`Rating: ${post.rating} out of 5 stars`}>
            {renderStars(post.rating)}
            <span className="text-sm text-gray-600 ml-1">({post.rating})</span>
          </div>
        </div>
        
        <h3 
          id={`post-title-${post.id}`}
          className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2"
        >
          {post.title}
        </h3>
        
        <p 
          id={`post-description-${post.id}`}
          className="text-gray-600 text-sm leading-relaxed line-clamp-3"
        >
          {post.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-purple-600 font-medium">
            By {post.brand}
          </span>
          <span className="text-xs text-gray-500">
            Article #{post.id}
          </span>
        </div>
      </CardContent>
    </Card>
    
    <PostDialog 
      post={post}
      open={dialogOpen}
      onClose={handleDialogClose}
    />
    </>
  );
};

export default React.memo(PostCard);