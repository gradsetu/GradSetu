'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  Clock, 
  School, 
  CalendarDays, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export default function AdminDashboardPage() {
  const { mentors, colleges, bookings, payments } = useApp();

  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);
  const pendingMentors = mentors.filter(m => m.verificationStatus === 'pending');
  const approvedMentors = mentors.filter(m => m.verificationStatus === 'approved');

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Admin Control Center" 
        subtitle="Platform metrics, identity verification audit queue, and financial monitoring" 
      />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Top Pending Alert if any */}
        {pendingMentors.length > 0 && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-amber-900 shadow-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle size={20} className="text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-xs">
                  {pendingMentors.length} Student ID Verification(s) Pending Review
                </span>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Action required: Review uploaded student ID documents to authorize public mentor listing.
                </p>
              </div>
            </div>
            <Link
              href="/admin/verifications"
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Open Audit Queue →
            </Link>
          </div>
        )}

        {/* 8 Stats Metrics Grid matching Section 19 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-text-secondary uppercase block">Total Aspirants</span>
            <div className="text-2xl font-black text-text-primary mt-1">1,480+</div>
            <span className="text-[10px] text-emerald-600 font-semibold">+18% this week</span>
          </div>

          <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-text-secondary uppercase block">Verified Mentors</span>
            <div className="text-2xl font-black text-primary mt-1">{approvedMentors.length}</div>
            <span className="text-[10px] text-text-secondary">{mentors.length} total registered</span>
          </div>

          <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-text-secondary uppercase block">Pending ID Audits</span>
            <div className="text-2xl font-black text-amber-600 mt-1">{pendingMentors.length}</div>
            <span className="text-[10px] text-amber-700 font-semibold">Requires admin signoff</span>
          </div>

          <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
            <span className="text-[11px] font-semibold text-text-secondary uppercase block">Total Revenue (Gross)</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
            <span className="text-[10px] text-emerald-600 font-semibold">From {bookings.length} guidance calls</span>
          </div>
        </div>

        {/* Pending Verifications Queue Preview */}
        <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-text-primary">
                Pending Student Verification Queue
              </h2>
              <p className="text-xs text-text-secondary">
                Students awaiting identity audit before becoming active mentors
              </p>
            </div>
            <Link href="/admin/verifications" className="text-xs font-semibold text-primary hover:underline">
              View All ({pendingMentors.length})
            </Link>
          </div>

          {pendingMentors.length > 0 ? (
            <div className="divide-y divide-border">
              {pendingMentors.map((m) => (
                <div key={m.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <div className="font-bold text-xs text-text-primary">{m.name}</div>
                      <div className="text-[11px] text-text-secondary">{m.collegeName} • {m.branch} ({m.currentYear})</div>
                      <div className="text-[10px] font-mono text-slate-500">ID: {m.enrollmentNumber}</div>
                    </div>
                  </div>

                  <Link
                    href="/admin/verifications"
                    className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition self-start sm:self-center"
                  >
                    Audit ID Document
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-text-secondary">
              No pending verifications. All student mentor applications have been processed.
            </div>
          )}
        </div>

        {/* Recent Bookings & Payments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-text-primary">Recent Mentorship Bookings</h3>
              <Link href="/admin/bookings" className="text-xs text-primary font-semibold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {bookings.slice(0, 3).map((b) => (
                <div key={b.id} className="p-3 border rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-text-primary">{b.aspirantName} → {b.mentorName}</span>
                    <span className="text-text-secondary block text-[11px]">{b.date} • {b.time}</span>
                  </div>
                  <span className="font-extrabold text-emerald-700">₹{b.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-text-primary">Colleges Managed</h3>
              <Link href="/admin/colleges" className="text-xs text-primary font-semibold hover:underline">
                Manage Colleges
              </Link>
            </div>
            <div className="space-y-3">
              {colleges.slice(0, 3).map((c) => (
                <div key={c.id} className="p-3 border rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-text-primary">{c.shortName}</span>
                    <span className="text-text-secondary block text-[11px]">{c.city}, {c.state}</span>
                  </div>
                  <span className="text-primary font-semibold">{c.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

