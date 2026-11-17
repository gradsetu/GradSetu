'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background-secondary flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mb-4 text-2xl font-bold">
        !
      </div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h1>
      <p className="text-xs text-text-secondary max-w-md mb-6 leading-relaxed">
        An unexpected error occurred while loading this page. Please try refreshing or return to the home screen.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <RefreshCw size={14} />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border hover:bg-background-secondary text-text-primary text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Home size={14} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}

