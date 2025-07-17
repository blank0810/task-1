'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  /** Error message to display */
  error: string;
  /** Retry function callback */
  onRetry: () => void;
}

/**
 * Error state component with retry functionality
 * Provides user-friendly error display with accessibility features
 */
const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]" role="alert" aria-live="polite">
      <Card className="bg-white border border-red-200 rounded-lg shadow-md max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
          </div>
          <CardTitle className="text-red-700">Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600" id="error-message">
            {error}
          </p>
          <Button
            onClick={onRetry}
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white transition-all duration-300 transform hover:scale-105"
            aria-describedby="error-message"
          >
            <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default React.memo(ErrorState);