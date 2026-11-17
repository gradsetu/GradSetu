'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  CreditCard, 
  Star, 
  Video, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export default function MentorDashboardPage() {
  const { currentUser, mentors, bookings, reviews } = useApp();

  // Find active mentor
  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];

  const mentorBookings = bookings.filter(b => b.mentorId === activeMentor.id);
  const upcomingSessions = mentorBookings.filter(b => b.status === 'confirmed');
  const recentReviews = reviews.filter(r => r.mentorId === activeMentor.id);

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Mentor Dashboard" 
        subtitle="Manage your sessions, schedule, and aspirant consultations" 
      />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Verification Status Banner */}
        {activeMentor.verificationStatus === 'pending' && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs">Student Identity Verification Pending</h4>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Your college ID card has been submitted. Our admin audit team is verifying your student enrollment. You will be visible on the public marketplace once approved.
                </p>
              </div>
            </div>
            <Link
              href="/mentor/verification"
              className="px-3.5 py-1.5 bg-amber-600 text-white font-bold text-xs rounded-xl self-start sm:self-center shadow-xs"
            >
              View Document Status
            </Link>
          </div>
        )}

        {activeMentor.verificationStatus === 'rejected' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-status-error">
            <div className="flex items-start gap-3">
              <XCircle size={20} className="shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-xs">Student Verification Rejected</h4>
                <p className="text-[11px] text-red-700 mt-0.5">
                  Reason: {activeMentor.verificationRemarks || 'Uploaded document was unreadable or expired. Please upload a clear photo of your student identity card.'}
                </p>
              </div>
            </div>
            <Link
              href="/mentor/verification"
              className="px-3.5 py-1.5 bg-status-error text-white font-bold text-xs rounded-xl self-start sm:self-center shadow-xs"
            >
              Resubmit ID
            </Link>
          </div>
        )}

        {activeMentor.verificationStatus === 'approved' && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span><strong>Verified Student Mentor:</strong> Your profile is active and publicly listed in the marketplace.</span>
            </div>
            <Link href={`/mentors/${activeMentor.id}`} className="font-bold text-emerald-700 hover:underline">
              View Public Profile →
            </Link>
          </div>
        )}

        {/* Welcome Header matching Panel 16 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Welcome back, {activeMentor.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Your mentorship summary at {activeMentor.collegeName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white border border-border px-3 py-1.5 rounded-xl font-semibold text-text-primary shadow-xs">
              Fee: ₹{activeMentor.sessionPrice} / 30m
            </span>
          </div>
        </div>

        {/* 3 Stat Cards matching Panel 16 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Sessions */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <Users size={26} />
            </div>
            <div>
              <div className="text-3xl font-black text-text-primary tracking-tight">
                {activeMentor.totalSessions}
              </div>
              <div className="text-xs font-semibold text-text-secondary mt-0.5">
                Total Sessions
              </div>
            </div>
          </div>

          {/* Card 2: Total Earnings */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CreditCard size={26} />
            </div>
            <div>
              <div className="text-3xl font-black text-text-primary tracking-tight">
                ₹{activeMentor.totalEarnings.toLocaleString('en-IN')}
              </div>
              <div className="text-xs font-semibold text-text-secondary mt-0.5">
                Total Earnings
              </div>
            </div>
          </div>

          {/* Card 3: Avg Rating */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Star size={26} className="fill-amber-400" />
            </div>
            <div>
              <div className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-1.5">
                {activeMentor.rating > 0 ? activeMentor.rating.toFixed(1) : 'New'}
                <span className="text-amber-400 text-xl">★</span>
              </div>
              <div className="text-xs font-semibold text-text-secondary mt-0.5">
                Avg. Rating ({activeMentor.reviewCount} reviews)
              </div>
            </div>
          </div>
        </div>

        {/* Section: Upcoming Sessions matching Panel 16 */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary">
                Upcoming Sessions
              </h2>
              <p className="text-xs text-text-secondary">
                Next scheduled guidance calls with prospective aspirants
              </p>
            </div>
            <Link href="/mentor/sessions" className="text-xs font-semibold text-primary hover:underline">
              View All ({upcomingSessions.length})
            </Link>
          </div>

          {upcomingSessions.length > 0 ? (
            <div className="divide-y divide-border">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={session.aspirantAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
                      alt={session.aspirantName}
                      className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-text-primary">{session.aspirantName}</h3>
                      <p className="text-xs text-text-secondary">College Guidance • 30min</p>
                      <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                        <Calendar size={13} className="text-primary" />
                        <span className="font-medium text-text-primary">{session.date} • {session.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={session.meetLink || 'https://meet.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                    >
                      <Video size={14} />
                      <span>Join</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-text-secondary">
              No sessions scheduled for today. Check your availability settings to open more call slots.
            </div>
          )}
        </div>

        {/* Recent Feedback & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-text-primary mb-3">Recent Aspirant Feedback</h3>
            <div className="space-y-3">
              {recentReviews.slice(0, 2).map((r) => (
                <div key={r.id} className="p-3 bg-background-secondary rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary">{r.aspirantName}</span>
                    <span className="text-amber-500 font-bold">★ {r.rating}.0</span>
                  </div>
                  <p className="text-text-secondary italic">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-sm text-text-primary mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/mentor/availability" className="p-3 border rounded-xl hover:bg-background-secondary transition block font-semibold text-text-primary">
                📅 Manage Availability
              </Link>
              <Link href="/mentor/earnings" className="p-3 border rounded-xl hover:bg-background-secondary transition block font-semibold text-text-primary">
                💰 View Bank Payouts
              </Link>
              <Link href="/mentor/verification" className="p-3 border rounded-xl hover:bg-background-secondary transition block font-semibold text-text-primary">
                🛡️ ID Document Status
              </Link>
              <Link href="/mentor/profile" className="p-3 border rounded-xl hover:bg-background-secondary transition block font-semibold text-text-primary">
                ✏️ Edit Bio & Pricing
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

