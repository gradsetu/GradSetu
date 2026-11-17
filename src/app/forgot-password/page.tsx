'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
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
          Reset Password
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Enter your registered email address to receive password reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-2xl shadow-sm">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-base font-bold text-text-primary">
                Instructions Sent!
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                If an account exists with <span className="font-semibold text-text-primary">{email}</span>, we have sent password reset instructions to your inbox.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="w-full inline-block py-2.5 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg shadow-sm transition"
                >
                  Return to Login
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-lg shadow-sm transition"
              >
                Send Reset Link
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-primary transition"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

