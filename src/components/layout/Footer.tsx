import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <GraduationCap size={20} />
              </div>
              <span className="font-bold text-lg tracking-tight text-text-primary">
                GradSetu
              </span>
            </Link>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              Find your college. Hear it from someone who’s there. India’s dedicated student mentorship and transparent college discovery network.
            </p>
            <div className="text-xs text-text-secondary">
              © {new Date().getFullYear()} GradSetu Technologies Pvt. Ltd. All rights reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/aspirant/colleges" className="text-text-secondary hover:text-primary transition-colors">
                  Top Colleges
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="text-text-secondary hover:text-primary transition-colors">
                  Find Student Mentors
                </Link>
              </li>
              <li>
                <Link href="/aspirant/compare" className="text-text-secondary hover:text-primary transition-colors">
                  Compare Universities
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-text-secondary hover:text-primary transition-colors">
                  How GradSetu Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
              For Students
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/signup/mentor" className="text-text-secondary hover:text-primary transition-colors">
                  Become a Mentor
                </Link>
              </li>
              <li>
                <Link href="/onboarding/mentor" className="text-text-secondary hover:text-primary transition-colors">
                  Student Verification
                </Link>
              </li>
              <li>
                <Link href="/mentor/dashboard" className="text-text-secondary hover:text-primary transition-colors">
                  Mentor Portal
                </Link>
              </li>
              <li>
                <Link href="/aspirant/dashboard" className="text-text-secondary hover:text-primary transition-colors">
                  Aspirant Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-3">
              Trust & Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-text-secondary">Privacy Policy</span>
              </li>
              <li>
                <span className="text-text-secondary">Terms of Service</span>
              </li>
              <li>
                <span className="text-text-secondary">ID Verification Code</span>
              </li>
              <li>
                <span className="text-text-secondary">help@gradsetu.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

