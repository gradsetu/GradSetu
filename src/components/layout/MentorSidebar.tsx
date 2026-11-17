'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  User, 
  Video, 
  Calendar, 
  CreditCard, 
  Clock, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function MentorSidebar() {
  const pathname = usePathname();
  const { currentUser, logout, mentors } = useApp();

  // Find active mentor
  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];

  const links = [
    { label: 'Dashboard', href: '/mentor/dashboard', icon: Home },
    { label: 'My Profile', href: '/mentor/profile', icon: User },
    { label: 'Guidance Sessions', href: '/mentor/sessions', icon: Video },
    { label: 'Bookings', href: '/mentor/bookings', icon: Calendar },
    { label: 'Earnings', href: '/mentor/earnings', icon: CreditCard },
    { label: 'Availability', href: '/mentor/availability', icon: Clock },
    { 
      label: 'Verification', 
      href: '/mentor/verification', 
      icon: ShieldCheck,
      badge: activeMentor.verificationStatus === 'approved' ? 'Verified' : 'Pending'
    },
    { label: 'Students', href: '/mentor/students', icon: Users },
    { label: 'Settings', href: '/mentor/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-white flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
            <GraduationCap size={20} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight text-text-primary block leading-none">
              GradSetu
            </span>
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider">
              Mentor Portal
            </span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/mentor/dashboard' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  link.badge === 'Verified'
                    ? isActive ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
                    : isActive ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-700'
                }`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <Link href="/mentor/profile" className="flex items-center gap-3 min-w-0">
          <img
            src={activeMentor.avatar}
            alt={activeMentor.name}
            className="w-9 h-9 rounded-full object-cover border border-border"
          />
          <div className="truncate">
            <div className="text-sm font-semibold text-text-primary truncate">
              {activeMentor.name}
            </div>
            <div className="text-xs text-text-secondary truncate">{activeMentor.collegeName}</div>
          </div>
        </Link>
        <button
          onClick={logout}
          title="Sign out"
          className="p-1.5 text-text-secondary hover:text-status-error hover:bg-red-50 rounded-md transition"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

