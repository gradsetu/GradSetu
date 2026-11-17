'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Users, Mail, Calendar, MessageSquare } from 'lucide-react';

export default function MentorStudentsPage() {
  const { currentUser, mentors, bookings } = useApp();

  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];
  const mentorBookings = bookings.filter(b => b.mentorId === activeMentor.id);

  // Unique aspirants
  const uniqueAspirants = Array.from(new Set(mentorBookings.map(b => b.aspirantName))).map(name => {
    return mentorBookings.find(b => b.aspirantName === name)!;
  });

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="My Guided Students" subtitle="Directory of aspirants who have booked sessions with you" />

      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Consulted Aspirants ({uniqueAspirants.length})</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uniqueAspirants.map((student) => (
            <div key={student.aspirantId} className="bg-white border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={student.aspirantAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
                  alt={student.aspirantName}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-bold text-sm text-text-primary">{student.aspirantName}</h3>
                  <p className="text-xs text-text-secondary">Aspirant for {activeMentor.course}</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Last Call: {student.date}</p>
                </div>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                Active Student
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

