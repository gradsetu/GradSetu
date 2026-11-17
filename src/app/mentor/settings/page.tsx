'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';

export default function MentorSettingsPage() {
  const { logout } = useApp();
  const [googleCalendarSync, setGoogleCalendarSync] = useState(true);

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Mentor Settings" subtitle="Account, payout bank details, and calendar sync" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-text-primary">Payout & Banking Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-text-primary mb-1">UPI ID for Payouts</label>
              <input
                type="text"
                defaultValue="ritik.sharma@okaxis"
                className="w-full p-2 border border-border rounded-lg text-text-primary"
              />
            </div>
            <div>
              <label className="block font-semibold text-text-primary mb-1">Bank Account / IFSC</label>
              <input
                type="text"
                defaultValue="HDFC0001234 ••••••• 9812"
                className="w-full p-2 border border-border rounded-lg text-text-primary"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-bold text-text-primary mb-2">Calendar Integration</h3>
            <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={googleCalendarSync}
                onChange={(e) => setGoogleCalendarSync(e.target.checked)}
                className="accent-primary"
              />
              <span>Automatically sync confirmed guidance calls to Google Calendar</span>
            </label>
          </div>

          <div className="pt-6 border-t border-border flex justify-between items-center">
            <button
              onClick={() => alert('Settings saved.')}
              className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Save Preferences
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 border border-red-300 text-status-error hover:bg-red-50 text-xs font-bold rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

