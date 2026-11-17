'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';

export default function AdminBookingsPage() {
  const { bookings } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Bookings Registry" subtitle="Global record of all mentorship calls" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Mentorship Bookings ({bookings.length})</h1>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">Booking ID</th>
                <th className="p-4 border-b">Aspirant</th>
                <th className="p-4 border-b">Mentor</th>
                <th className="p-4 border-b">Institution</th>
                <th className="p-4 border-b">Date & Slot</th>
                <th className="p-4 border-b">Amount</th>
                <th className="p-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-background-secondary/30">
                  <td className="p-4 font-mono text-[11px] text-text-secondary">{b.id}</td>
                  <td className="p-4 font-bold text-text-primary">{b.aspirantName}</td>
                  <td className="p-4 font-bold text-primary">{b.mentorName}</td>
                  <td className="p-4 text-text-secondary">{b.collegeName}</td>
                  <td className="p-4 text-text-secondary font-medium">{b.date} • {b.time}</td>
                  <td className="p-4 font-extrabold text-emerald-700">₹{b.amount}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {b.status}
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

