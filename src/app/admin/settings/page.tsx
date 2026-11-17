'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Shield, RotateCcw } from 'lucide-react';

export default function AdminSettingsPage() {
  const { resetAllData, logout } = useApp();
  const [platformFee, setPlatformFee] = useState('10');
  const [requireIdCheck, setRequireIdCheck] = useState(true);

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="System Configuration" subtitle="Platform rules, verification parameters, and database state" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-text-primary">Platform & Verification Parameters</h2>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <span className="font-semibold text-text-primary block">Strict Student ID Audit Gate</span>
                <span className="text-text-secondary">Require admin signoff on college ID before any student can appear in public mentor search</span>
              </div>
              <input
                type="checkbox"
                checked={requireIdCheck}
                onChange={(e) => setRequireIdCheck(e.target.checked)}
                className="accent-primary"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <span className="font-semibold text-text-primary block">Platform Commission (%)</span>
                <span className="text-text-secondary">Simulated take rate on guidance calls</span>
              </div>
              <input
                type="number"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
                className="w-20 p-1.5 border border-border rounded-lg text-text-primary font-bold text-center"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-bold text-text-primary mb-1">State Reset (Demo Mode)</h3>
            <p className="text-xs text-text-secondary mb-3">
              Reset all mock bookings, simulated verification requests, and college records back to initial factory data.
            </p>
            <button
              onClick={() => {
                if (confirm('Reset all demo state to defaults?')) {
                  resetAllData();
                  alert('Data reset successfully.');
                  window.location.reload();
                }
              }}
              className="px-4 py-2 border border-border hover:bg-background-secondary text-text-primary text-xs font-bold rounded-lg transition flex items-center gap-1.5"
            >
              <RotateCcw size={14} />
              <span>Reset State to Initial Defaults</span>
            </button>
          </div>

          <div className="pt-4 border-t border-border flex justify-between items-center">
            <button
              onClick={() => alert('Platform settings saved.')}
              className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Save Configuration
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 border border-red-300 text-status-error hover:bg-red-50 text-xs font-bold rounded-lg transition"
            >
              Sign Out of Admin
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

