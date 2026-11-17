'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { RatingStars } from '@/components/shared/RatingStars';

export default function AdminMentorsPage() {
  const { mentors } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Mentor Management" subtitle="Manage mentor listings, fees, and verification compliance" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Mentors Directory ({mentors.length})</h1>
          <Link
            href="/admin/verifications"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Go to ID Verification Audit
          </Link>
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">Mentor</th>
                <th className="p-4 border-b">Institution</th>
                <th className="p-4 border-b">Branch & Year</th>
                <th className="p-4 border-b">Fee / Call</th>
                <th className="p-4 border-b">Rating</th>
                <th className="p-4 border-b">Sessions</th>
                <th className="p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mentors.map((m) => (
                <tr key={m.id} className="hover:bg-background-secondary/30">
                  <td className="p-4 flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover border" />
                    <div>
                      <div className="font-bold text-text-primary flex items-center gap-1">
                        <span>{m.name}</span>
                        {m.verificationStatus === 'approved' && <VerifiedBadge size={13} />}
                      </div>
                      <div className="text-[11px] text-text-secondary">{m.email}</div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-text-primary">{m.collegeName}</td>
                  <td className="p-4 text-text-secondary">{m.branch} ({m.currentYear})</td>
                  <td className="p-4 font-bold text-text-primary">₹{m.sessionPrice}</td>
                  <td className="p-4"><RatingStars rating={m.rating} reviews={m.reviewCount} /></td>
                  <td className="p-4 font-semibold text-text-primary">{m.totalSessions}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      m.verificationStatus === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {m.verificationStatus}
                    </span>
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

