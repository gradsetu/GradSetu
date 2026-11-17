'use client';

import React from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { useApp } from '@/context/AppContext';
import { Shield, ArrowRight, Lock } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isHydrated } = useApp();

  if (isHydrated && (!currentUser || currentUser.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 text-white">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-xl space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto shadow-xs border border-amber-500/20">
            <Shield size={28} />
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Admin Access Required
            </h1>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              This administrative area is restricted to authorized GradSetu staff and verification officers.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/login"
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <span>Sign In with Admin Account</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-700 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <Lock size={12} className="text-slate-400" />
            <span>Restricted Administration Console</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background-secondary">
      <div className="hidden md:block shrink-0">
        <AdminSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
}

