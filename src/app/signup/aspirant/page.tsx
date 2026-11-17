'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { signUpAspirant } from '@/actions/authActions';

export default function AspirantSignUpPage() {
  const router = useRouter();
  const { loginAs, switchRole, updateAspirantProfile } = useApp();

  const [fullName, setFullName] = useState('Ananya Verma');
  const [email, setEmail] = useState('ananya@example.com');
  const [phone, setPhone] = useState('+91 98765 00001');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);

    try {
      const res = await signUpAspirant({
        fullName,
        email,
        phone,
        password,
      });

      if (!res.success && res.error && !res.error.includes('already registered')) {
        setError(res.error);
        setLoading(false);
        return;
      }

      loginAs(email, 'aspirant');
      switchRole('aspirant');
      updateAspirantProfile({
        name: fullName,
        email: email,
        phone: phone,
      });

      router.push('/onboarding/aspirant');
    } catch {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
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
          Create Aspirant Account
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Find the right college and connect directly with verified seniors.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-2xl shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-status-error text-xs rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ananya Verma"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-3 pr-10 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
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
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-start text-xs text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-border text-primary focus:ring-primary mr-2"
                />
                <span>
                  I accept the <span className="text-primary hover:underline">Terms of Service</span> and <span className="text-primary hover:underline">Privacy Policy</span>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

