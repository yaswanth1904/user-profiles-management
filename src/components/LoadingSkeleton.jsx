import React from 'react';

export const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const SkeletonCard = () => (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-white/40 p-6 animate-pulse shadow-xl relative overflow-hidden">
      {/* Moderate gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-200/4 to-gray-300/3 rounded-full blur-2xl"></div>
      <div className="flex items-center space-x-4 relative z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-gray-300 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gradient-to-r from-slate-200 to-gray-300 rounded-lg w-3/4"></div>
          <div className="h-3 bg-gradient-to-r from-slate-200 to-gray-300 rounded-lg w-1/2"></div>
          <div className="h-3 bg-gradient-to-r from-slate-200 to-gray-300 rounded-lg w-1/4"></div>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-2 relative z-10">
        <div className="h-8 bg-gradient-to-r from-slate-200 to-gray-300 rounded-lg w-16"></div>
        <div className="h-8 bg-gradient-to-r from-slate-200 to-gray-300 rounded-lg w-16"></div>
      </div>
    </div>
  );

  const SkeletonList = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-3 bg-gray-300 rounded w-48"></div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  const SkeletonTable = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="px-6 py-4 border-b border-gray-200 last:border-b-0">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'list':
        return <SkeletonList />;
      case 'table':
        return <SkeletonTable />;
      case 'card':
      default:
        return <SkeletonCard />;
    }
  };

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};
