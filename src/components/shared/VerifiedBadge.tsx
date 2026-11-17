import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function VerifiedBadge({ className = '', size = 16, showText = false }: VerifiedBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 text-primary ${className}`} title="Verified Student Mentor">
      <CheckCircle2 size={size} className="fill-primary text-white" />
      {showText && <span className="text-xs font-semibold text-primary">Verified Student</span>}
    </span>
  );
}

