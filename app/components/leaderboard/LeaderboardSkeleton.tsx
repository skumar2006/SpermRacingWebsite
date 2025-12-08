import React from 'react';

const SHARED_CLASSES = {
  row: 'grid grid-cols-12 gap-4 px-4 pt-6 pb-2 items-center',
  rank: 'col-span-2 text-gray-500 tracking-tighter text-xs',
  nameSection: 'col-span-6 flex items-center font-thin gap-3 -ml-5',
  scoreSection: 'col-span-4 text-sm',
};

const SkeletonPlayerRow = () => {
  return (
    <div
      className={`${SHARED_CLASSES.row} border-b border-gray-100 animate-pulse`}
    >
      {/* Rank Skeleton */}
      <div className={SHARED_CLASSES.rank}>
        <div className="h-3 bg-gray-200 rounded w-6"></div>
      </div>

      {/* Name and Country Section */}
      <div className={SHARED_CLASSES.nameSection}>
        <div className="flex items-center relative gap-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-4 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Score Section */}
      <div className={`${SHARED_CLASSES.scoreSection} text-right`}>
        <div className="h-4 bg-gray-200 rounded w-12 ml-auto"></div>
      </div>
    </div>
  );
};

interface LeaderboardSkeletonProps {
  count?: number;
}

const LeaderboardSkeleton: React.FC<LeaderboardSkeletonProps> = ({
  count = 5,
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonPlayerRow key={`skeleton-${index}`} />
      ))}
    </>
  );
};

export default LeaderboardSkeleton;
