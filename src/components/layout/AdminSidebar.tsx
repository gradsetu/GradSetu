'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  UserCheck, 
  FileCheck2, 
  School, 
  CalendarDays, 
  CreditCard, 
  MessageSquare, 
  BarChart3, 
  LifeBuoy, 
  Settings, 
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function AdminSidebar() {
  const pathname = usePathname();
  const { mentors, logout } = useApp();

  const pendingCount = mentors.filter(m => m.verificationStatus === 'pending').length;

  const links = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'All Users', href: '/admin/users', icon: Users },
    { label: 'Aspirants', href: '/admin/aspirants', icon: GraduationCap },
    { label: 'Mentors', href: '/admin/mentors', icon: UserCheck },
    { 
      label: 'Mentor Verification', 
      href: '/admin/verifications', 
      icon: FileCheck2,
      badge: pendingCount > 0 ? `${pendingCount}` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    { label: 'Colleges', href: '/admin/colleges', icon: School },
    { label: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Reviews', href: '/admin/reviews', icon: MessageSquare },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Support Tickets', href: '/admin/support', icon: LifeBuoy },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-slate-900 text-slate-100 flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
          <ShieldAlert size={18} />
        </div>
        <div>
          <span className="font-bold text-base tracking-tight text-white block leading-none">
            GradSetu Admin
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
            Command Center
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/admin/dashboard' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${link.badgeColor}`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-semibold text-white">
            RK
          </div>
          <div className="truncate">
            <div className="text-sm font-medium text-white truncate">Rajesh Kumar</div>
            <div className="text-[11px] text-slate-400">Super Administrator</div>
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign out"
          className="p-1.5 text-slate-400 hover:text-red-400 transition"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

