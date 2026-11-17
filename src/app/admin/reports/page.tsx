'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { BarChart3, TrendingUp, Users, Calendar, Award } from 'lucide-react';

export default function AdminReportsPage() {
  const { mentors, colleges, bookings, payments } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Analytics & Growth Reports" subtitle="Platform metrics, call volumes, and mentor onboarding velocity" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Platform Performance & Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-2">
            <span className="text-xs font-semibold text-text-secondary uppercase">Guidance Call Conversion</span>
            <div className="text-3xl font-extrabold text-primary">84.2%</div>
            <p className="text-xs text-text-secondary">Of aspirants who search a college schedule a senior guidance call within 7 days.</p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-2">
            <span className="text-xs font-semibold text-text-secondary uppercase">Average Mentor Rating</span>
            <div className="text-3xl font-extrabold text-amber-500">4.85 ★</div>
            <p className="text-xs text-text-secondary">Across 100% verified student consultations with 0 fake reviews reported.</p>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-2">
            <span className="text-xs font-semibold text-text-secondary uppercase">Average Verification Turnaround</span>
            <div className="text-3xl font-extrabold text-emerald-600">4.2 Hrs</div>
            <p className="text-xs text-text-secondary">From college ID submission to admin audit decision.</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-text-primary">Top Demanded College Insights</h2>
          <div className="space-y-3 text-xs">
            {colleges.map((col, idx) => (
              <div key={col.id} className="flex items-center justify-between p-3 bg-background-secondary rounded-xl">
                <span className="font-bold text-text-primary">#{idx + 1} {col.name} ({col.shortName})</span>
                <span className="font-semibold text-primary">{Math.floor(800 - idx * 110)} Discovery Searches this month</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

