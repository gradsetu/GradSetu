'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Eye, EyeOff, Lock, Mail, ArrowRight, Shield, UserCheck, Loader2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { signIn } from '@/actions/authActions';

export default function LoginPage() {
  const router = useRouter();
  const { loginAs, switchRole } = useApp();

  const [identifier, setIdentifier] = useState('sumitstar369@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const emailLower = identifier.trim().toLowerCase();

    if (!emailLower || !password) {
      setError('Please enter both your email address and password');
      return;
    }

    setLoading(true);

    try {
      const res = await signIn({ email: emailLower, password });

      if (res.success && res.data) {
        loginAs(emailLower, res.data.role);
        switchRole(res.data.role);
        // Full navigation ensures cookie is committed to browser and middleware recognizes it
        window.location.href = res.data.redirectTo;
        return;
      }

      setError(res.error || 'Failed to sign in. Please try again.');
    } catch {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (email: string, pass: string) => {
    setIdentifier(email);
    setPassword(pass);
    setLoading(true);
    try {
      const res = await signIn({ email, password: pass });
      if (res.success && res.data) {
        loginAs(email, res.data.role);
        switchRole(res.data.role);
        window.location.href = res.data.redirectTo;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-text-primary">
            GradSetu
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          Enter your details to sign in to your GradSetu account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-2xl shadow-sm">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-status-error text-xs rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="name@example.com or +91..."
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-text-primary">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
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

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center text-xs text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary mr-2"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 mt-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins for fast testing */}
          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-[11px] font-semibold text-text-secondary mb-2 text-center uppercase tracking-wider">
              1-Click Demo Accounts
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('ananya@example.com', 'password123')}
                className="py-1.5 px-2 bg-slate-50 hover:bg-primary-light hover:text-primary text-text-primary border border-border rounded-lg text-xs font-medium text-center transition"
              >
                Aspirant
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('ritik@example.com', 'password123')}
                className="py-1.5 px-2 bg-slate-50 hover:bg-primary-light hover:text-primary text-text-primary border border-border rounded-lg text-xs font-medium text-center transition"
              >
                Mentor
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@gradsetu.com', 'password123')}
                className="py-1.5 px-2 bg-slate-50 hover:bg-primary-light hover:text-primary text-text-primary border border-border rounded-lg text-xs font-medium text-center transition"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-text-secondary">
            New to GradSetu?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
