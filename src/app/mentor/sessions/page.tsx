'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Video, Calendar, Clock, CheckCircle2, X } from 'lucide-react';

export default function MentorSessionsPage() {
  const { currentUser, mentors, bookings } = useApp();

  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];
  const mentorBookings = bookings.filter(b => b.mentorId === activeMentor.id);

  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredSessions = mentorBookings.filter(b => {
    if (filter === 'upcoming') return b.status === 'confirmed';
    if (filter === 'completed') return b.status === 'completed';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Guidance Sessions" subtitle="View and join your 1-on-1 calls with aspirants" />

      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Guidance Sessions</h1>
          <div className="flex gap-2 bg-white border border-border p-1 rounded-xl text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold ${filter === 'all' ? 'bg-primary text-white' : 'text-text-secondary'}`}
            >
              All ({mentorBookings.length})
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg font-bold ${filter === 'upcoming' ? 'bg-primary text-white' : 'text-text-secondary'}`}
            >
              Upcoming ({mentorBookings.filter(b => b.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-lg font-bold ${filter === 'completed' ? 'bg-primary text-white' : 'text-text-secondary'}`}
            >
              Completed ({mentorBookings.filter(b => b.status === 'completed').length})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredSessions.map((s) => (
            <div key={s.id} className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src={s.aspirantAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'} alt={s.aspirantName} className="w-12 h-12 rounded-full object-cover border" />
                <div>
                  <h3 className="font-bold text-sm text-text-primary">{s.aspirantName}</h3>
                  <p className="text-xs text-text-secondary">College Guidance • {s.durationMinutes} Minutes</p>
                  <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                    <span className="flex items-center gap-1 font-semibold text-text-primary">
                      <Calendar size={13} className="text-primary" /> {s.date} • {s.time}
                    </span>
                    <span className="text-emerald-700 font-bold">Earned ₹{s.amount}</span>
                  </div>
                </div>
              </div>

              <div>
                {s.status === 'confirmed' ? (
                  <a
                    href={s.meetLink || 'https://meet.google.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <Video size={14} />
                    <span>Join Google Meet</span>
                  </a>
                ) : (
                  <span className="text-xs font-bold text-slate-500 uppercase">Completed</span>
                )}
              </div>
            </div>
          ))}

          {filteredSessions.length === 0 && (
            <div className="bg-white border border-border rounded-2xl p-10 text-center text-xs text-text-secondary">
              No sessions found in this view.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

