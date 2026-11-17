'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Bell, Lock, Shield, Check } from 'lucide-react';

export default function AspirantSettingsPage() {
  const { logout } = useApp();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Settings" subtitle="Account preferences, privacy and alert configuration" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-text-primary">Notification Settings</h2>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <span className="font-semibold text-text-primary block">Guidance Call Reminders</span>
                <span className="text-text-secondary">Receive Google Meet link & 15-min reminder before session</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="accent-primary"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <div>
                <span className="font-semibold text-text-primary block">SMS & WhatsApp Alerts</span>
                <span className="text-text-secondary">Instant booking confirmations and mentor updates</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="accent-primary"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-bold text-text-primary mb-3">Security & Privacy</h3>
            <p className="text-xs text-text-secondary mb-4">
              Your profile is private. Mentors only see your name, target course, and guidance questions during sessions.
            </p>
            <button
              onClick={() => {
                alert('Security settings saved.');
              }}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Update Preferences
            </button>
          </div>

          <div className="pt-6 border-t border-border">
            <button
              onClick={logout}
              className="px-4 py-2 border border-red-300 text-status-error hover:bg-red-50 text-xs font-bold rounded-lg transition"
            >
              Sign Out of GradSetu
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

