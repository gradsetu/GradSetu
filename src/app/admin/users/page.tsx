'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { initialUsers } from '@/data/users';
import { Search, Shield, User, GraduationCap, UserCheck } from 'lucide-react';

export default function AdminUsersPage() {
  const { currentRole } = useApp();
  const [search, setSearch] = useState('');

  const usersList = initialUsers.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="User Management" subtitle="System directory of all registered accounts" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Registered Users</h1>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="px-3 py-1.5 text-xs border border-border rounded-lg bg-white w-64"
          />
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">User</th>
                <th className="p-4 border-b">Role</th>
                <th className="p-4 border-b">Phone</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Registration Date</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-background-secondary/30">
                  <td className="p-4 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border" />
                    <div>
                      <div className="font-bold text-text-primary">{u.name}</div>
                      <div className="text-[11px] text-text-secondary">{u.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize font-semibold text-text-primary">{u.role}</span>
                  </td>
                  <td className="p-4 text-text-secondary">{u.phone}</td>
                  <td className="p-4">
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold uppercase">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-text-secondary">
                    {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Simulated edit for user ${u.name}`)}
                      className="px-2.5 py-1 text-xs text-primary font-semibold hover:underline"
                    >
                      Edit
                    </button>
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

