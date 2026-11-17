'use client';

import React from 'react';
import Link from 'next/link';
import { MentorSidebar } from '@/components/layout/MentorSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { useApp } from '@/context/AppContext';
import { UserCheck, ArrowRight, Lock } from 'lucide-react';

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isHydrated } = useApp();

  if (isHydrated && !currentUser) {
    return (
      <div className="min-h-screen bg-background-secondary flex flex-col justify-center items-center p-4">
        <div className="bg-white border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-sm space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <UserCheck size={28} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">
              Sign In to Mentor Portal
            </h1>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              Log in to manage your mentorship sessions, track your earnings, set call availability, and check student ID verification status.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/login"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Log In as Mentor</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/signup/mentor"
              className="w-full py-2.5 px-4 border border-border hover:bg-background-secondary text-text-primary font-bold text-xs rounded-xl transition block text-center"
            >
              Register as New Student Mentor
            </Link>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-center gap-1.5 text-[11px] text-text-secondary">
            <Lock size={12} className="text-slate-400" />
            <span>Encrypted • Verified Student Mentorship</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background-secondary">
      <div className="hidden md:block shrink-0">
        <MentorSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen pb-16 md:pb-0">
        {children}
        <MobileBottomNav />
      </div>
    </div>
  );
}

