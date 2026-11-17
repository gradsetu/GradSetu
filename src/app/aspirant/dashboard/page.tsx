'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Users, 
  Layers, 
  Check, 
  Calendar, 
  ArrowRight, 
  Video, 
  Bookmark, 
  Star 
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { RatingStars } from '@/components/shared/RatingStars';

export default function AspirantDashboardPage() {
  const { aspirantProfile, colleges, mentors, bookings } = useApp();

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const approvedMentors = mentors.filter(m => m.verificationStatus === 'approved');

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Aspirant Portal" 
        subtitle="Manage your college applications, mentorship calls, and comparisons" 
      />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Welcome Section matching Panel 06 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Welcome, {aspirantProfile.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Continue your college journey
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary-light text-primary border border-primary-secondary font-semibold px-3 py-1.5 rounded-full">
              Target Year: {aspirantProfile.targetAdmissionYear}
            </span>
          </div>
        </div>

        {/* 3 Action Cards matching Panel 06 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Explore Colleges */}
          <Link
            href="/aspirant/colleges"
            className="p-6 rounded-2xl bg-blue-50/80 border border-blue-100 hover:border-primary transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Search size={22} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                Explore Colleges
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Discover and shortlist colleges that fit your goals
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-primary gap-1">
              <span>Browse institutions</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Talk to Seniors */}
          <Link
            href="/mentors"
            className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 hover:border-indigo-400 transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Users size={22} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                Talk to Seniors
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Get real insights from verified students on campus
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-indigo-600 gap-1">
              <span>Find verified mentors</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Compare Colleges */}
          <Link
            href="/aspirant/compare"
            className="p-6 rounded-2xl bg-amber-50/70 border border-amber-100 hover:border-amber-400 transition group shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Layers size={22} />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-1">
                Compare Colleges
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Make a better decision with side-by-side matrices
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-amber-700 gap-1">
              <span>Compare rankings & fees</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Your Progress Section matching Panel 06 */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-6">
            Your Progress
          </h2>

          <div className="grid grid-cols-5 gap-2 relative">
            {/* Step 1: Profile (Done) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">
                <Check size={16} className="stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-text-primary mt-2">Profile</span>
              <span className="text-[10px] text-text-secondary">Completed</span>
            </div>

            {/* Step 2: Explore (Done) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">
                <Check size={16} className="stroke-[3]" />
              </div>
              <span className="text-xs font-semibold text-text-primary mt-2">Explore</span>
              <span className="text-[10px] text-text-secondary">3 Shortlisted</span>
            </div>

            {/* Step 3: Talk (Active) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-primary ring-4 ring-primary-light text-white flex items-center justify-center text-xs font-bold shadow-sm animate-pulse">
                3
              </div>
              <span className="text-xs font-bold text-primary mt-2">Talk</span>
              <span className="text-[10px] text-primary">Active Step</span>
            </div>

            {/* Step 4: Compare */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold">
                4
              </div>
              <span className="text-xs font-medium text-text-secondary mt-2">Compare</span>
              <span className="text-[10px] text-slate-400">Next</span>
            </div>

            {/* Step 5: Decide */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 text-slate-500 flex items-center justify-center text-xs font-bold">
                5
              </div>
              <span className="text-xs font-medium text-text-secondary mt-2">Decide</span>
              <span className="text-[10px] text-slate-400">Final</span>
            </div>
          </div>
        </div>

        {/* Upcoming Guidance Sessions Section matching Panel 13 & 16 */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-text-primary">
                Upcoming Mentorship Sessions
              </h2>
              <p className="text-xs text-text-secondary">
                Join your scheduled 1-on-1 guidance calls
              </p>
            </div>
            <Link
              href="/aspirant/bookings"
              className="text-xs font-semibold text-primary hover:underline"
            >
              View All Bookings ({bookings.length})
            </Link>
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="divide-y divide-border">
              {upcomingBookings.map((b) => (
                <div key={b.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={b.mentorAvatar}
                      alt={b.mentorName}
                      className="w-12 h-12 rounded-full object-cover border border-border"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-text-primary">{b.mentorName}</span>
                        <VerifiedBadge size={14} />
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
                          Confirmed
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {b.collegeName} • {b.course}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                        <span className="flex items-center gap-1 font-medium text-text-primary">
                          <Calendar size={13} className="text-primary" />
                          {b.date} • {b.time} ({b.durationMinutes} min)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={b.meetLink || 'https://meet.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-sm transition"
                    >
                      <Video size={14} />
                      <span>Join Call</span>
                    </a>
                    <Link
                      href="/aspirant/bookings"
                      className="px-3.5 py-2 border border-border text-text-secondary hover:text-text-primary text-xs font-medium rounded-lg transition"
                    >
                      Reschedule
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-text-secondary">
              No upcoming guidance calls. Explore verified student mentors to schedule your first session!
            </div>
          )}
        </div>

        {/* Recommended Colleges & Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Colleges */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-text-primary">
                Shortlisted & Top Recommended Colleges
              </h3>
              <Link href="/aspirant/colleges" className="text-xs text-primary font-semibold hover:underline">
                Explore All
              </Link>
            </div>

            <div className="space-y-3">
              {colleges.slice(0, 3).map((c) => (
                <div key={c.id} className="p-3 border border-border rounded-xl flex items-center justify-between hover:bg-background-secondary transition">
                  <div className="flex items-center gap-3">
                    <img src={c.featuredImage} alt={c.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-semibold text-xs text-text-primary">{c.shortName}</h4>
                      <p className="text-[11px] text-text-secondary">{c.city}, {c.state}</p>
                      <span className="text-[10px] font-bold text-primary">Avg: {c.avgPackage}</span>
                    </div>
                  </div>
                  <Link
                    href={`/aspirant/colleges/${c.id}`}
                    className="text-xs text-primary font-semibold px-3 py-1.5 bg-primary-light hover:bg-primary-secondary rounded-lg transition"
                  >
                    Details
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Mentors */}
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-text-primary">
                Verified Seniors Ready to Guide
              </h3>
              <Link href="/mentors" className="text-xs text-primary font-semibold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {approvedMentors.slice(0, 3).map((m) => (
                <div key={m.id} className="p-3 border border-border rounded-xl flex items-center justify-between hover:bg-background-secondary transition">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border" />
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-xs text-text-primary">{m.name}</h4>
                        <VerifiedBadge size={13} />
                      </div>
                      <p className="text-[11px] text-text-secondary">{m.collegeName} • {m.branch}</p>
                      <span className="text-[10px] font-bold text-text-primary">₹{m.sessionPrice} / 30m</span>
                    </div>
                  </div>
                  <Link
                    href={`/mentors/${m.id}/book`}
                    className="text-xs text-white font-semibold px-3 py-1.5 bg-primary hover:bg-primary-dark rounded-lg transition"
                  >
                    Book Call
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

