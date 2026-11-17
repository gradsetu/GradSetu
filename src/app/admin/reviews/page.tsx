'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { RatingStars } from '@/components/shared/RatingStars';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminReviewsPage() {
  const { reviews, toggleReviewVisibility } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Review Moderation" subtitle="Audit aspirant testimonials and mentor ratings" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Mentorship Reviews ({reviews.length})</h1>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">Aspirant</th>
                <th className="p-4 border-b">Rating</th>
                <th className="p-4 border-b">Review Comment</th>
                <th className="p-4 border-b">Date</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-background-secondary/30">
                  <td className="p-4 font-bold text-text-primary flex items-center gap-2">
                    <img src={r.aspirantAvatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <span>{r.aspirantName}</span>
                  </td>
                  <td className="p-4"><RatingStars rating={r.rating} /></td>
                  <td className="p-4 text-text-secondary max-w-md italic">"{r.comment}"</td>
                  <td className="p-4 text-text-secondary">{r.date}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      r.isVisible ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-status-error'
                    }`}>
                      {r.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleReviewVisibility(r.id)}
                      className="px-3 py-1 border border-border rounded-lg text-text-secondary hover:text-text-primary text-xs font-semibold"
                    >
                      {r.isVisible ? 'Hide' : 'Unhide'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

