import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviews?: number;
  className?: string;
  size?: number;
}

export function RatingStars({ rating, reviews, className = '', size = 14 }: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className="flex items-center gap-1 font-semibold text-text-primary text-sm">
        <Star size={size} className="fill-amber-400 text-amber-400" />
        {rating > 0 ? rating.toFixed(1) : 'New'}
      </span>
      {reviews !== undefined && reviews > 0 && (
        <span className="text-xs text-text-secondary">
          ({reviews > 1000 ? `${(reviews / 1000).toFixed(1)}k` : reviews})
        </span>
      )}
    </div>
  );
}

