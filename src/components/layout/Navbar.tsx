'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, currentRole, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Colleges', href: '/aspirant/colleges' },
    { label: 'Mentors', href: '/mentors' },
    { label: 'Compare', href: '/aspirant/compare' },
    { label: 'How It Works', href: '/#how-it-works' },
  ];

  const getDashboardLink = () => {
    if (currentRole === 'admin') return '/admin/dashboard';
    if (currentRole === 'mentor') return '/mentor/dashboard';
    return '/aspirant/dashboard';
  };

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
              <GraduationCap size={22} className="stroke-[2.2]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-text-primary">
              GradSetu
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link
                  href={getDashboardLink()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-background-secondary transition text-xs font-semibold text-text-primary"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{currentUser.name}</span>
                </Link>
                <Link
                  href={getDashboardLink()}
                  className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-xs font-medium text-text-secondary hover:text-status-error transition px-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-text-primary hover:text-primary transition-colors px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary hover:bg-primary-dark text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-secondary hover:text-text-primary p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pt-3 pb-5 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-text-secondary hover:text-primary py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {currentUser ? (
              <div className="space-y-2">
                <Link
                  href={getDashboardLink()}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-primary text-white font-medium py-2.5 rounded-lg block"
                >
                  Go to Dashboard ({currentUser.name})
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center border border-border text-text-secondary hover:text-status-error font-medium py-2 rounded-lg block text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-border text-text-primary font-medium py-2 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-primary text-white font-medium py-2 rounded-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

