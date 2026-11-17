'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-secondary flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-4 text-2xl font-bold">
        404
      </div>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h1>
      <p className="text-xs text-text-secondary max-w-md mb-6 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Home size={14} />
          <span>Go to Home</span>
        </Link>
        <Link
          href="/aspirant/colleges"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-border hover:bg-background-secondary text-text-primary text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <ArrowLeft size={14} />
          <span>Explore Colleges</span>
        </Link>
      </div>
    </div>
  );
}

