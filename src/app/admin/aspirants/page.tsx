'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';

export default function AdminAspirantsPage() {
  const { aspirantProfile } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Aspirant Profiles" subtitle="Review aspirant preferences, test scores, and goals" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Active Aspirants</h1>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">Aspirant</th>
                <th className="p-4 border-b">City</th>
                <th className="p-4 border-b">Current Level</th>
                <th className="p-4 border-b">Score / Stream</th>
                <th className="p-4 border-b">Preferred Course</th>
                <th className="p-4 border-b">Target Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-background-secondary/30">
                <td className="p-4 flex items-center gap-3">
                  <img src={aspirantProfile.avatar} alt={aspirantProfile.name} className="w-8 h-8 rounded-full object-cover border" />
                  <div>
                    <div className="font-bold text-text-primary">{aspirantProfile.name}</div>
                    <div className="text-[11px] text-text-secondary">{aspirantProfile.email}</div>
                  </div>
                </td>
                <td className="p-4 text-text-secondary">{aspirantProfile.city}</td>
                <td className="p-4 text-text-secondary">{aspirantProfile.currentEducationLevel}</td>
                <td className="p-4 font-semibold text-text-primary">{aspirantProfile.academicScore} ({aspirantProfile.stream})</td>
                <td className="p-4 text-primary font-medium">{aspirantProfile.preferredCourse}</td>
                <td className="p-4 font-bold text-text-primary">{aspirantProfile.targetAdmissionYear}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

