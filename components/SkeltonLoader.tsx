import React from "react";

interface SkeletonProps {
  rows?: number; 
  className?: string; 
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ rows = 1, className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex justify-between items-center border-b py-3 last:border-none">
          <div>
            <div className="h-4 w-16 bg-gray-300 rounded-md mb-1"></div>
            <div className="h-3 w-28 bg-gray-200 rounded-md"></div>
          </div>
          <div className="h-4 w-20 bg-gray-300 rounded-md"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
