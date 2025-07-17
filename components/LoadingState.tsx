'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Loading skeleton component that matches the final card dimensions
 * Provides visual feedback during data fetching
 */
const LoadingState: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Loading blog posts">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="bg-white border border-purple-200 rounded-lg shadow-md animate-pulse">
          <CardHeader className="p-4">
            <Skeleton className="h-48 w-full rounded-md bg-purple-100" />
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20 bg-purple-100" />
              <Skeleton className="h-4 w-16 bg-purple-100" />
            </div>
            <Skeleton className="h-6 w-3/4 bg-purple-100" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-purple-100" />
              <Skeleton className="h-4 w-full bg-purple-100" />
              <Skeleton className="h-4 w-2/3 bg-purple-100" />
            </div>
          </CardContent>
        </Card>
      ))}
      <span className="sr-only">Loading blog posts...</span>
    </div>
  );
};

export default React.memo(LoadingState);