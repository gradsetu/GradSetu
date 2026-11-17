'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { LifeBuoy, CheckCircle2, Clock } from 'lucide-react';

export default function AdminSupportPage() {
  const { supportTickets, updateTicketStatus } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Support & Helpdesk" subtitle="Manage inquiries, verification issues, and user queries" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Support Tickets ({supportTickets.length})</h1>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">Ticket ID</th>
                <th className="p-4 border-b">User</th>
                <th className="p-4 border-b">Subject & Query</th>
                <th className="p-4 border-b">Priority</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {supportTickets.map((t) => (
                <tr key={t.id} className="hover:bg-background-secondary/30">
                  <td className="p-4 font-mono font-bold text-text-primary">{t.id}</td>
                  <td className="p-4">
                    <span className="font-bold text-text-primary block">{t.userName}</span>
                    <span className="text-[10px] text-text-secondary capitalize">{t.userRole}</span>
                  </td>
                  <td className="p-4 max-w-sm">
                    <span className="font-semibold text-text-primary block">{t.subject}</span>
                    <span className="text-text-secondary text-[11px]">{t.message}</span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      t.priority === 'high' ? 'bg-red-50 text-status-error' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      t.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={t.status}
                      onChange={(e) => updateTicketStatus(t.id, e.target.value as any)}
                      className="p-1 border border-border rounded-lg text-xs"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

