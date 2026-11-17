'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Users, Layers, Calendar, Video, Clock, ShieldCheck, UserCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { currentRole } = useApp();

  const aspirantTabs = [
    { label: 'Home', href: '/aspirant/dashboard', icon: Home },
    { label: 'Colleges', href: '/aspirant/colleges', icon: Search },
    { label: 'Mentors', href: '/mentors', icon: Users },
    { label: 'Compare', href: '/aspirant/compare', icon: Layers },
    { label: 'Bookings', href: '/aspirant/bookings', icon: Calendar },
  ];

  const mentorTabs = [
    { label: 'Home', href: '/mentor/dashboard', icon: Home },
    { label: 'Sessions', href: '/mentor/sessions', icon: Video },
    { label: 'Schedule', href: '/mentor/availability', icon: Clock },
    { label: 'Verification', href: '/mentor/verification', icon: ShieldCheck },
    { label: 'Profile', href: '/mentor/profile', icon: UserCircle },
  ];

  const tabs = currentRole === 'mentor' ? mentorTabs : aspirantTabs;

  // Don't show on admin or onboarding pages
  if (currentRole === 'admin' || pathname.startsWith('/onboarding') || pathname.startsWith('/signup') || pathname === '/login') {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 px-2 py-1.5 flex items-center justify-around shadow-lg safe-area-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href || (tab.href !== `/${currentRole}/dashboard` && pathname.startsWith(tab.href));

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition ${
              isActive
                ? 'text-primary font-bold'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon size={18} className={isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'} />
            <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

