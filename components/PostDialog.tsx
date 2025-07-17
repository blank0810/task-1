'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Star, 
  Calendar, 
  Tag, 
  Building2, 
  Hash,
  Eye,
  X,
  ExternalLink
} from 'lucide-react';
import { BlogPost } from '@/types/post';

interface PostDialogProps {
  /** Blog post data to display */
  post: BlogPost;
  /** Dialog open state */
  open: boolean;
  /** Function to close dialog */
  onClose: () => void;
}

/**
 * Dialog component for displaying detailed blog post information
 * Includes full accessibility support and responsive design
 */
export const PostDialog: React.FC<PostDialogProps> = ({ post, open, onClose }) => {
  /**
   * Handle escape key press
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

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

    // Fill remaining stars
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="h-4 w-4 text-gray-300"
          aria-hidden="true"
        />
      );
    }

    return stars;
  };

  /**
   * Generate mock additional content for demonstration
   */
  const generateAdditionalContent = () => {
    const publishDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const readTime = Math.floor(Math.random() * 10) + 3;
    const views = Math.floor(Math.random() * 10000) + 500;
    
    return {
      publishDate: publishDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      readTime: `${readTime} min read`,
      views: views.toLocaleString(),
      tags: ['Technology', 'Innovation', 'Design', 'Development'].slice(0, Math.floor(Math.random() * 3) + 2),
      fullDescription: `${post.description}\n\nThis comprehensive article explores the latest trends and innovations in the field. Our expert analysis provides valuable insights that can help you stay ahead of the curve.\n\nKey highlights include:\n• In-depth technical analysis\n• Real-world case studies\n• Expert recommendations\n• Future outlook and predictions\n\nWhether you're a beginner or an experienced professional, this article offers something valuable for everyone in the community.`
    };
  };

  const additionalContent = generateAdditionalContent();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] p-0 gap-0 bg-white border border-purple-200"
        aria-describedby="dialog-description"
      >
        {/* Header with image */}
        <div className="relative">
          <div className="h-64 w-full overflow-hidden rounded-t-lg">
            <img
              src={post.imageUrl}
              alt={`Featured image for ${post.title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/800x300/7c3aed/ffffff?text=Post+${post.id}`;
              }}
            />
          </div>
          
          {/* Close button overlay */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {/* Category badge overlay */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
              <Tag className="h-3 w-3 mr-1" />
              {post.category}
            </Badge>
          </div>
        </div>

        {/* Scrollable content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Header */}
            <DialogHeader className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                  {post.title.replace('...', '')}
                </DialogTitle>
                <div className="flex items-center space-x-1 flex-shrink-0" aria-label={`Rating: ${post.rating} out of 5 stars`}>
                  {renderStars(post.rating)}
                  <span className="text-sm text-gray-600 ml-2">({post.rating})</span>
                </div>
              </div>
              
              <DialogDescription id="dialog-description" className="text-base text-gray-600 leading-relaxed">
                {additionalContent.fullDescription}
              </DialogDescription>
            </DialogHeader>

            <Separator />

            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Author:</span>
                <span>{post.brand}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Published:</span>
                <span>{additionalContent.publishDate}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Eye className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Views:</span>
                <span>{additionalContent.views}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Hash className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Article ID:</span>
                <span>#{post.id}</span>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {additionalContent.tags.map((tag, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reading info */}
            <div className="bg-purple-50 rounded-lg p-4 space-y-2">
              <h3 className="text-lg font-semibold text-purple-900">Reading Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-purple-700">
                  <span className="font-medium">Estimated reading time:</span>
                  <span>{additionalContent.readTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-purple-700">
                  <span className="font-medium">Difficulty level:</span>
                  <span>Intermediate</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button 
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white flex-1"
                onClick={() => {
                  // Simulate opening full article
                  console.log(`Opening full article for post ${post.id}`);
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Full Article
              </Button>
              
              <Button 
                variant="outline" 
                className="border-purple-200 text-purple-700 hover:bg-purple-50 flex-1"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};