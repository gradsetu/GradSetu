'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, Users, ArrowRight, Check } from 'lucide-react';

export default function SignUpRoleSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'aspirant' | 'mentor'>('aspirant');

  const handleContinue = () => {
    if (selectedRole === 'aspirant') {
      router.push('/signup/aspirant');
    } else {
      router.push('/signup/mentor');
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
            <GraduationCap size={24} />
          </div>
          <span className="font-bold text-2xl tracking-tight text-text-primary">
            GradSetu
          </span>
        </Link>

        {/* Stepper matching panel 02 */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
            1
          </div>
          <div className="w-10 h-0.5 bg-border"></div>
          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 text-xs font-bold flex items-center justify-center">
            2
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Join GradSetu
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Choose how you want to use GradSetu
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 border border-border rounded-2xl shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Aspirant */}
            <div
              onClick={() => setSelectedRole('aspirant')}
              className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all flex flex-col justify-between ${
                selectedRole === 'aspirant'
                  ? 'border-primary bg-primary-light/40 shadow-sm'
                  : 'border-border hover:border-slate-300 bg-white'
              }`}
            >
              <div className="absolute top-4 right-4">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedRole === 'aspirant'
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedRole === 'aspirant' && <Check size={12} className="stroke-[3]" />}
                </div>
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
                  <GraduationCap size={26} />
                </div>
                <h3 className="font-bold text-base text-text-primary mb-1">
                  I’m an Aspirant
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  I want to explore colleges, talk to seniors and find the right fit.
                </p>
              </div>
            </div>

            {/* Card 2: College Student */}
            <div
              onClick={() => setSelectedRole('mentor')}
              className={`relative cursor-pointer p-6 rounded-xl border-2 transition-all flex flex-col justify-between ${
                selectedRole === 'mentor'
                  ? 'border-primary bg-primary-light/40 shadow-sm'
                  : 'border-border hover:border-slate-300 bg-white'
              }`}
            >
              <div className="absolute top-4 right-4">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedRole === 'mentor'
                      ? 'border-primary bg-primary text-white'
                      : 'border-slate-300'
                  }`}
                >
                  {selectedRole === 'mentor' && <Check size={12} className="stroke-[3]" />}
                </div>
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="font-bold text-base text-text-primary mb-1">
                  I’m a College Student
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  I study in a college and want to guide aspirants.
                </p>
              </div>
            </div>

          </div>

          <button
            onClick={handleContinue}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <span>Continue</span>
            <ArrowRight size={16} />
          </button>

          <div className="text-center text-xs text-text-secondary pt-2 border-t border-border">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

