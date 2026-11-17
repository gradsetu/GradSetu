'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export default function MentorBookingsPage() {
  const { currentUser, mentors, bookings } = useApp();

  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];
  const mentorBookings = bookings.filter(b => b.mentorId === activeMentor.id);

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Booking Requests" subtitle="Manage bookings made by aspirants" />

      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">All Booking Requests</h1>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
                <tr>
                  <th className="p-4 border-b">Aspirant</th>
                  <th className="p-4 border-b">Scheduled Date & Time</th>
                  <th className="p-4 border-b">Duration</th>
                  <th className="p-4 border-b">Amount</th>
                  <th className="p-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mentorBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-background-secondary/40">
                    <td className="p-4 font-bold text-text-primary flex items-center gap-2.5">
                      <img src={b.aspirantAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <span>{b.aspirantName}</span>
                    </td>
                    <td className="p-4 text-text-secondary font-medium">{b.date} • {b.time}</td>
                    <td className="p-4 text-text-secondary">{b.durationMinutes} mins</td>
                    <td className="p-4 font-bold text-emerald-700">₹{b.amount}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

