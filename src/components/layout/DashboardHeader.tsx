'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  Home, 
  Layers, 
  Users, 
  Calendar, 
  Bookmark, 
  UserCircle, 
  Settings, 
  GraduationCap, 
  LogOut,
  Video,
  CreditCard,
  Clock,
  ShieldCheck,
  FileCheck2,
  School,
  BarChart3,
  LifeBuoy
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: any;
  badge?: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const pathname = usePathname();
  const { currentUser, currentRole, logout, aspirantProfile, mentors } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const pendingCount = mentors.filter(m => m.verificationStatus === 'pending').length;

  const aspirantLinks: NavItem[] = [
    { label: 'Home', href: '/aspirant/dashboard', icon: Home },
    { label: 'Explore Colleges', href: '/aspirant/colleges', icon: Search },
    { label: 'Find Mentors', href: '/mentors', icon: Users },
    { label: 'Compare Colleges', href: '/aspirant/compare', icon: Layers },
    { label: 'My Bookings', href: '/aspirant/bookings', icon: Calendar },
    { label: 'Shortlist', href: '/aspirant/shortlist', icon: Bookmark },
    { label: 'My Profile', href: '/aspirant/profile', icon: UserCircle },
    { label: 'Settings', href: '/aspirant/settings', icon: Settings },
  ];

  const mentorLinks: NavItem[] = [
    { label: 'Dashboard', href: '/mentor/dashboard', icon: Home },
    { label: 'My Profile', href: '/mentor/profile', icon: UserCircle },
    { label: 'Guidance Sessions', href: '/mentor/sessions', icon: Video },
    { label: 'Bookings', href: '/mentor/bookings', icon: Calendar },
    { label: 'Earnings', href: '/mentor/earnings', icon: CreditCard },
    { label: 'Availability', href: '/mentor/availability', icon: Clock },
    { label: 'Verification', href: '/mentor/verification', icon: ShieldCheck },
    { label: 'Students', href: '/mentor/students', icon: Users },
    { label: 'Settings', href: '/mentor/settings', icon: Settings },
  ];

  const adminLinks: NavItem[] = [
    { label: 'Overview', href: '/admin/dashboard', icon: Home },
    { label: 'All Users', href: '/admin/users', icon: Users },
    { label: 'Aspirants', href: '/admin/aspirants', icon: GraduationCap },
    { label: 'Mentors', href: '/admin/mentors', icon: Users },
    { label: 'Mentor Verification', href: '/admin/verifications', icon: FileCheck2, badge: pendingCount > 0 ? `${pendingCount}` : undefined },
    { label: 'Colleges', href: '/admin/colleges', icon: School },
    { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Reviews', href: '/admin/reviews', icon: Users },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
    { label: 'Support Tickets', href: '/admin/support', icon: LifeBuoy },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const currentLinks = currentRole === 'admin' ? adminLinks : currentRole === 'mentor' ? mentorLinks : aspirantLinks;

  return (
    <>
      <header className="bg-white border-b border-border px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        
        {/* Left: Mobile Hamburger & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-secondary transition"
            aria-label="Open mobile menu"
          >
            <Menu size={20} />
          </button>

          <div>
            {title && (
              <h1 className="text-base sm:text-lg font-bold text-text-primary tracking-tight line-clamp-1">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-[11px] sm:text-xs text-text-secondary line-clamp-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search (Desktop) */}
          <div className="relative hidden lg:block">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search colleges, courses, topics..."
              className="w-56 pl-9 pr-3 py-1.5 text-xs bg-background-secondary border border-border rounded-lg text-text-primary placeholder:text-slate-400 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg relative transition"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-border rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border font-semibold text-xs text-text-primary flex items-center justify-between">
                  <span>Notifications</span>
                  <span className="text-[10px] text-primary font-bold">Mark all read</span>
                </div>
                <div className="divide-y divide-border text-xs max-h-60 overflow-y-auto">
                  <div className="px-4 py-2.5 hover:bg-background-secondary transition">
                    <div className="font-semibold text-text-primary text-xs">Upcoming Mentorship Call</div>
                    <div className="text-text-secondary text-[11px] mt-0.5">Wed, 29 Jan at 4:00 PM with Ritik Sharma</div>
                  </div>
                  <div className="px-4 py-2.5 hover:bg-background-secondary transition">
                    <div className="font-semibold text-text-primary text-xs">College cutoffs updated</div>
                    <div className="text-text-secondary text-[11px] mt-0.5">JoSAA opening and closing ranks for IIT Delhi are live.</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-border">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
              alt={currentUser?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-border shrink-0"
            />
            <div className="hidden sm:block text-left text-xs">
              <div className="font-semibold text-text-primary leading-tight truncate max-w-[120px]">
                {currentUser?.name || 'User'}
              </div>
              <div className="text-[10px] text-text-secondary capitalize">
                {currentRole}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Menu */}
          <div className="relative w-72 max-w-[80%] bg-white h-full flex flex-col z-10 shadow-xl">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <span className="font-bold text-base tracking-tight text-text-primary block leading-none">
                    GradSetu
                  </span>
                  <span className="text-[10px] text-primary font-semibold uppercase tracking-wider capitalize">
                    {currentRole} Portal
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-text-secondary hover:text-text-primary rounded-md"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {currentLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href || (link.href !== `/${currentRole}/dashboard` && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
                      isActive
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                      <span>{link.label}</span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom User & Logout */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-background-secondary/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <div className="truncate">
                  <div className="text-xs font-bold text-text-primary truncate">{currentUser?.name || 'User'}</div>
                  <div className="text-[10px] text-text-secondary capitalize">{currentRole}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileDrawerOpen(false);
                }}
                className="p-1.5 text-text-secondary hover:text-status-error rounded-md"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
