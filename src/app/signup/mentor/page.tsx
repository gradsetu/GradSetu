'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function MentorSignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('Kabir Singh');
  const [email, setEmail] = useState('kabir.s@pilani.bits-pilani.ac.in');
  const [phone, setPhone] = useState('+91 98333 44556');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Proceed to multi-step onboarding
    router.push(`/onboarding/mentor?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
  };

  return (
    <div className="min-h-screen bg-background-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-text-primary">
            GradSetu
          </span>
        </Link>
        <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
          Join as a College Student Mentor
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Share your journey, help aspirants make informed decisions, and earn per session.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-2xl shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-status-error text-xs rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-5 p-3.5 bg-primary-light border border-primary-secondary rounded-xl flex items-start gap-3">
            <ShieldCheck size={20} className="text-primary shrink-0 mt-0.5" />
            <div className="text-xs text-text-primary">
              <span className="font-bold">Student Verification Required:</span> You will need to upload your college ID card or bonafide document in the next step.
            </div>
          </div>

          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="As printed on your college ID card"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
              <p className="text-[11px] text-text-secondary mt-1">
                Enter your name exactly as it appears on your college identity card.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                College or Personal Email *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@college.ac.in or name@gmail.com"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3 pr-10 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-text-primary"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 mt-2"
            >
              <span>Continue to Verification</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-text-secondary">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

