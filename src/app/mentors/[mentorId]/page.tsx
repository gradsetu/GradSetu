'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Share2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MessageSquare, 
  GraduationCap, 
  Award, 
  BookOpen,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { RatingStars } from '@/components/shared/RatingStars';

export default function MentorPublicProfilePage() {
  const router = useRouter();
  const params = useParams();
  const mentorId = params.mentorId as string;
  const { mentors, reviews } = useApp();

  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'reviews'>('about');

  const mentor = mentors.find(m => m.id === mentorId) || mentors[0];
  const mentorReviews = reviews.filter(r => r.mentorId === mentor.id && r.isVisible);

  return (
    <div className="min-h-screen flex flex-col bg-background-secondary">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Breadcrumb matching Panel 10 */}
        <Link
          href="/mentors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Mentors</span>
        </Link>

        {/* Profile Header Box matching Panel 10 */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-5">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-border"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-text-primary">
                    {mentor.name}
                  </h1>
                  {mentor.verificationStatus === 'approved' ? (
                    <VerifiedBadge size={20} showText />
                  ) : (
                    <span className="text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-semibold">
                      Under Review
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-text-secondary">
                  {mentor.course} - {mentor.branch} • <span className="text-primary">{mentor.collegeName}</span> • {mentor.currentYear}
                </p>

                <div className="flex items-center gap-4 text-xs text-text-secondary pt-1">
                  <RatingStars rating={mentor.rating} reviews={mentor.reviewCount} />
                  <span>•</span>
                  <span>{mentor.totalSessions}+ Guidance Calls Conducted</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-start">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Profile URL copied to clipboard!');
                }}
                className="p-2.5 rounded-xl border border-border hover:bg-background-secondary text-text-secondary transition"
                title="Share Mentor Profile"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Columns: Tabs & Booking Card matching Panel 10 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Tabs Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tabs */}
            <div className="bg-white border border-border rounded-xl px-4 flex items-center gap-6 shadow-sm">
              <button
                onClick={() => setActiveTab('about')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                  activeTab === 'about'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('experience')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                  activeTab === 'experience'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Experience & Topics
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
                  activeTab === 'reviews'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Reviews ({mentorReviews.length})
              </button>
            </div>

            {/* Tab 1: About */}
            {activeTab === 'about' && (
              <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-base font-bold text-text-primary mb-3">About Me</h2>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {mentor.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
                    Areas of Expertise & Advice
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-primary-light text-primary border border-primary-secondary rounded-lg text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
                    What we can discuss during the call:
                  </h3>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Realistic workload, grading curves and branch difficulty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>JoSAA choice filling and branch vs college tradeoffs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Campus life, mess quality, hostel rules, clubs and sports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>Summer internships, software prep and placement realities</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Experience */}
            {activeTab === 'experience' && (
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-text-primary">Academic & Campus Journey</h2>
                <div className="space-y-4 border-l-2 border-primary-secondary pl-4 text-xs">
                  <div>
                    <span className="font-bold text-text-primary block text-sm">3rd Year Computer Science Undergraduate</span>
                    <span className="text-text-secondary">{mentor.collegeName} • 2023 - Present</span>
                    <p className="text-text-secondary mt-1">Maintaining 9.1 CGPA. Core member of developer student clubs and competitive programming cell.</p>
                  </div>
                  <div>
                    <span className="font-bold text-text-primary block text-sm">JEE Advanced Preparation & JoSAA Counseling</span>
                    <span className="text-text-secondary">All India Rank Holder</span>
                    <p className="text-text-secondary mt-1">Cracked JEE on first attempt. Thoroughly evaluated choices between IIT Bombay Electrical vs IIT Delhi CSE.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-text-primary">Aspirant Feedback & Ratings</h2>
                <div className="divide-y divide-border">
                  {mentorReviews.map((rev) => (
                    <div key={rev.id} className="py-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={rev.aspirantAvatar} alt={rev.aspirantName} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="font-bold text-xs text-text-primary block">{rev.aspirantName}</span>
                            <span className="text-[10px] text-text-secondary">{rev.date}</span>
                          </div>
                        </div>
                        <RatingStars rating={rev.rating} />
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed pl-10">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Sticky Booking Card matching Panel 10 */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="text-base font-bold text-text-primary">
                  Book a Guidance Call
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Private 1-on-1 video call over Google Meet
                </p>
              </div>

              <div className="p-4 bg-background-secondary rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Duration</span>
                  <span className="font-semibold text-text-primary flex items-center gap-1">
                    <Clock size={13} className="text-primary" />
                    30 Minutes
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Session Fee</span>
                  <span className="text-lg font-extrabold text-text-primary">
                    ₹{mentor.sessionPrice}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary shrink-0" />
                  <span>Available on: {mentor.availableDays.slice(0, 3).join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary shrink-0" />
                  <span>Typical slots: {mentor.availableTimeSlots.slice(0, 2).join(', ')}</span>
                </div>
              </div>

              {mentor.verificationStatus === 'approved' ? (
                <Link
                  href={`/mentors/${mentor.id}/book`}
                  className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-sm transition text-center block"
                >
                  Book a Slot
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full py-3 bg-slate-200 text-slate-500 font-bold text-sm rounded-xl cursor-not-allowed text-center"
                >
                  Verification Pending
                </button>
              )}

              <div className="pt-2 border-t border-border flex items-center justify-center gap-2 text-[11px] text-text-secondary">
                <Lock size={12} className="text-slate-400" />
                <span>Simulated Secure Payment Flow</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

