'use client';

import React from 'react';
import Link from 'next/link';
import { AspirantSidebar } from '@/components/layout/AspirantSidebar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { useApp } from '@/context/AppContext';
import { GraduationCap, ArrowRight, Lock } from 'lucide-react';

export default function AspirantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isHydrated, loginAs, switchRole } = useApp();

  // If client state is loaded and user is not authenticated as an aspirant
  if (isHydrated && !currentUser) {
    return (
      <div className="min-h-screen bg-background-secondary flex flex-col justify-center items-center p-4">
        <div className="bg-white border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-sm space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap size={28} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">
              Sign In to Aspirant Portal
            </h1>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              Log in to manage your college shortlists, 1-on-1 mentor guidance calls, and university comparison matrices.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/login"
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Log In</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/signup/aspirant"
              className="w-full py-2.5 px-4 border border-border hover:bg-background-secondary text-text-primary font-bold text-xs rounded-xl transition block text-center"
            >
              Create New Aspirant Account
            </Link>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-center gap-1.5 text-[11px] text-text-secondary">
            <Lock size={12} className="text-slate-400" />
            <span>Verified Student Access • Protected by GradSetu</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background-secondary">
      <div className="hidden md:block shrink-0">
        <AspirantSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen pb-16 md:pb-0">
        {children}
        <MobileBottomNav />
      </div>
    </div>
  );
}

