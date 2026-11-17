'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Clock, Calendar, Check, Plus, Trash2 } from 'lucide-react';

export default function MentorAvailabilityPage() {
  const { currentUser, mentors, updateMentorAvailability } = useApp();

  const activeMentor = mentors.find(m => m.userId === currentUser?.id || m.id === 'mentor-ritik-sharma') || mentors[0];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDays, setSelectedDays] = useState<string[]>(activeMentor.availableDays);
  const [slots, setSlots] = useState<string[]>(activeMentor.availableTimeSlots);
  const [newSlot, setNewSlot] = useState('05:00 PM');
  const [saved, setSaved] = useState(false);

  const toggleDay = (d: string) => {
    setSelectedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  };

  const addSlot = () => {
    if (!slots.includes(newSlot)) {
      setSlots([...slots, newSlot]);
    }
  };

  const removeSlot = (s: string) => {
    setSlots(slots.filter(x => x !== s));
  };

  const handleSave = () => {
    updateMentorAvailability(activeMentor.id, selectedDays, slots);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Manage Availability" subtitle="Set your available call days and time slots" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {saved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
              <Check size={16} />
              <span>Availability updated! Changes reflected in public booking panel.</span>
            </div>
          )}

          <div>
            <h2 className="text-base font-bold text-text-primary mb-1">Available Days</h2>
            <p className="text-xs text-text-secondary mb-3">Select days when you can take 30-min calls without clashing with your classes.</p>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => {
                const isSelected = selectedDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-4 py-2 text-xs font-semibold rounded-xl border transition ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-sm'
                        : 'border-border bg-white text-text-secondary hover:bg-background-secondary'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h2 className="text-base font-bold text-text-primary mb-1">Available Time Slots</h2>
            <p className="text-xs text-text-secondary mb-3">Active time slots offered to aspirants during booking.</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {slots.map((s) => (
                <div key={s} className="flex items-center gap-2 px-3 py-1.5 bg-primary-light border border-primary-secondary rounded-lg text-xs font-bold text-primary">
                  <span>{s}</span>
                  <button type="button" onClick={() => removeSlot(s)} className="hover:text-primary-dark">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 max-w-xs">
              <input
                type="text"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
                placeholder="e.g. 05:00 PM"
                className="px-3 py-1.5 text-xs border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary flex-1"
              />
              <button
                type="button"
                onClick={addSlot}
                className="px-3 py-1.5 bg-background-secondary border border-border hover:bg-slate-200 text-text-primary text-xs font-semibold rounded-lg"
              >
                + Add Slot
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-sm transition"
            >
              Save Schedule
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

