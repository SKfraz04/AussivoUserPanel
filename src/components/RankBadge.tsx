
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { RankTier } from '@/utils/rankUtils';

interface RankBadgeProps {
  rank: RankTier;
  showLevel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RankBadge = ({ rank, showLevel = true, size = 'md', className = '' }: RankBadgeProps) => {
  const sizeClasses = {
    sm: 'text-xs py-0 px-1.5',
    md: 'text-sm py-0.5 px-2',
    lg: 'text-base py-1 px-3'
  };

  return (
    <Badge 
      className={`bg-gradient-to-r ${rank.color} border-none hover:opacity-90 ${sizeClasses[size]} ${className}`}
    >
      {showLevel && <span className="mr-1">{rank.level}:</span>}
      <span className="mr-1">{rank.badge}</span>
      {rank.title}
    </Badge>
  );
};

export default RankBadge;
