'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';

export default function AdminPaymentsPage() {
  const { payments } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Payments & Transactions" subtitle="Financial audit log of student bookings" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Financial Transactions ({payments.length})</h1>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">Txn ID</th>
                <th className="p-4 border-b">Booking Ref</th>
                <th className="p-4 border-b">Aspirant</th>
                <th className="p-4 border-b">Mentor</th>
                <th className="p-4 border-b">Amount</th>
                <th className="p-4 border-b">Method</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-background-secondary/30">
                  <td className="p-4 font-mono font-bold text-text-primary">{p.id}</td>
                  <td className="p-4 font-mono text-[11px] text-text-secondary">{p.bookingId}</td>
                  <td className="p-4 text-text-primary font-semibold">{p.aspirantName}</td>
                  <td className="p-4 text-primary font-semibold">{p.mentorName}</td>
                  <td className="p-4 font-extrabold text-emerald-700">₹{p.amount}</td>
                  <td className="p-4 text-text-secondary">{p.method}</td>
                  <td className="p-4">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                      SUCCESS
                    </span>
                  </td>
                  <td className="p-4 text-text-secondary">
                    {new Date(p.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
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

