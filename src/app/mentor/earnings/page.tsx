'use client';

import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { CreditCard, TrendingUp, Download, ArrowUpRight } from 'lucide-react';

export default function MentorEarningsPage() {
  const { currentUser, mentors, payments } = useApp();

  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];
  const mentorPayments = payments.filter(p => p.mentorName === activeMentor.name);

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Earnings & Payouts" subtitle="Track session income, platform credits, and direct bank transfers" />

      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">Earnings Overview</h1>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <span className="text-xs text-text-secondary font-medium block">Total Lifetime Earnings</span>
            <span className="text-3xl font-extrabold text-text-primary mt-1 block">
              ₹{activeMentor.totalEarnings.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp size={13} /> 100% Payout Rate
            </span>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <span className="text-xs text-text-secondary font-medium block">Available Balance (Ready for Payout)</span>
            <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">
              ₹{(activeMentor.totalEarnings * 0.4).toFixed(0)}
            </span>
            <button
              onClick={() => alert('Simulated payout request of ₹' + (activeMentor.totalEarnings * 0.4).toFixed(0) + ' initiated to registered UPI/Bank!')}
              className="mt-2 text-xs text-primary font-bold hover:underline block"
            >
              Withdraw to Bank Account →
            </button>
          </div>

          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
            <span className="text-xs text-text-secondary font-medium block">Average Fee / Call</span>
            <span className="text-3xl font-extrabold text-text-primary mt-1 block">
              ₹{activeMentor.sessionPrice}
            </span>
            <span className="text-[11px] text-text-secondary mt-1 block">Per 30-minute consultation</span>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-sm text-text-primary">Recent Transactions & Earnings</h3>
            <span className="text-xs text-text-secondary">{mentorPayments.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
                <tr>
                  <th className="p-4 border-b">Txn ID</th>
                  <th className="p-4 border-b">Aspirant</th>
                  <th className="p-4 border-b">Amount</th>
                  <th className="p-4 border-b">Method</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mentorPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-background-secondary/40">
                    <td className="p-4 font-mono text-[11px] text-text-secondary">{p.id}</td>
                    <td className="p-4 font-bold text-text-primary">{p.aspirantName}</td>
                    <td className="p-4 font-extrabold text-emerald-700">₹{p.amount}</td>
                    <td className="p-4 text-text-secondary">{p.method}</td>
                    <td className="p-4">
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                        PAID
                      </span>
                    </td>
                    <td className="p-4 text-text-secondary">
                      {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

