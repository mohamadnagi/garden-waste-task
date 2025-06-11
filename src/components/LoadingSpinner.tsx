
import React from 'react';
import { Loader2, Zap } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <div className="mt-8 text-center space-y-2">
          <p className="text-foreground font-mono font-bold">INITIALIZING SYSTEM</p>
          <div className="flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></span>
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></span>
          </div>
          <p className="text-muted-foreground text-sm font-mono">Loading skip configurations...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
