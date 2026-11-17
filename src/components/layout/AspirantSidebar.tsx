'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Search, 
  Users, 
  Layers, 
  Calendar, 
  Bookmark, 
  UserCircle, 
  Settings, 
  GraduationCap,
  LogOut 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function AspirantSidebar() {
  const pathname = usePathname();
  const { currentUser, logout, aspirantProfile } = useApp();

  const links = [
    { label: 'Home', href: '/aspirant/dashboard', icon: Home },
    { label: 'Explore Colleges', href: '/aspirant/colleges', icon: Search },
    { label: 'Find Mentors', href: '/mentors', icon: Users },
    { label: 'Compare Colleges', href: '/aspirant/compare', icon: Layers },
    { label: 'My Bookings', href: '/aspirant/bookings', icon: Calendar },
    { label: 'Shortlist', href: '/aspirant/shortlist', icon: Bookmark },
    { label: 'My Profile', href: '/aspirant/profile', icon: UserCircle },
    { label: 'Settings', href: '/aspirant/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-border bg-white flex flex-col h-screen sticky top-0">
      {/* Brand */}
      <div className="p-6 border-b border-border flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
          <GraduationCap size={20} />
        </div>
        <span className="font-bold text-lg tracking-tight text-text-primary">
          GradSetu
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/aspirant/dashboard' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile */}
      <div className="p-4 border-t border-border flex items-center justify-between">
        <Link href="/aspirant/profile" className="flex items-center gap-3 min-w-0">
          <img
            src={currentUser?.avatar || aspirantProfile.avatar}
            alt={aspirantProfile.name}
            className="w-9 h-9 rounded-full object-cover border border-border"
          />
          <div className="truncate">
            <div className="text-sm font-semibold text-text-primary truncate">
              {currentUser?.name || aspirantProfile.name}
            </div>
            <div className="text-xs text-text-secondary">Aspirant</div>
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

