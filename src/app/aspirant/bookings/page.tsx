'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  Calendar, 
  Clock, 
  Video, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Search 
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export default function MyBookingsPage() {
  const { bookings, cancelBooking, rescheduleBooking } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [reschedulingBookingId, setReschedulingBookingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('Fri, 31 Jan');
  const [newTime, setNewTime] = useState('06:00 PM');

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const currentList = 
    activeTab === 'upcoming' 
      ? upcomingBookings 
      : activeTab === 'completed' 
      ? completedBookings 
      : cancelledBookings;

  const handleConfirmReschedule = () => {
    if (reschedulingBookingId) {
      rescheduleBooking(reschedulingBookingId, newDate, newTime);
      setReschedulingBookingId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="My Bookings" 
        subtitle="Manage your 1-on-1 college guidance sessions" 
      />

      <main className="p-6 max-w-5xl mx-auto w-full space-y-6">
        
        {/* Title & Tabs matching Panel 13 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            My Bookings
          </h1>

          <Link
            href="/mentors"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition"
          >
            + Book Another Guidance Session
          </Link>
        </div>

        {/* Tabs matching Panel 13 */}
        <div className="bg-white border border-border rounded-xl p-1.5 flex items-center gap-2 max-w-md shadow-sm">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'upcoming'
                ? 'bg-primary-light text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'completed'
                ? 'bg-primary-light text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Completed ({completedBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              activeTab === 'cancelled'
                ? 'bg-primary-light text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Cancelled ({cancelledBookings.length})
          </button>
        </div>

        {/* Bookings List matching Panel 13 */}
        <div className="space-y-4">
          {currentList.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border border-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                <img
                  src={booking.mentorAvatar}
                  alt={booking.mentorName}
                  className="w-14 h-14 rounded-full object-cover border border-border shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-text-primary">{booking.mentorName}</h3>
                    <VerifiedBadge size={14} />
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : booking.status === 'completed'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary font-medium">
                    {booking.collegeName} • {booking.course}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary pt-1">
                    <span className="flex items-center gap-1 font-medium text-text-primary">
                      <Calendar size={13} className="text-primary" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-text-primary">
                      <Clock size={13} className="text-primary" />
                      {booking.time} ({booking.durationMinutes} min)
                    </span>
                    <span>Paid ₹{booking.amount}</span>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons matching Panel 13 */}
              <div className="flex items-center gap-2.5 self-end md:self-center">
                {booking.status === 'confirmed' && (
                  <>
                    <a
                      href={booking.meetLink || 'https://meet.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
                    >
                      <Video size={14} />
                      <span>Join Call</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setReschedulingBookingId(booking.id)}
                      className="px-4 py-2 border border-border hover:bg-background-secondary text-text-primary text-xs font-semibold rounded-xl transition"
                    >
                      Reschedule
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Are you sure you want to cancel this guidance call? Full simulated refund will be processed.')) {
                          cancelBooking(booking.id);
                        }
                      }}
                      className="p-2 text-text-secondary hover:text-status-error hover:bg-red-50 rounded-lg transition"
                      title="Cancel booking"
                    >
                      <X size={16} />
                    </button>
                  </>
                )}

                {booking.status === 'completed' && (
                  <Link
                    href={`/mentors/${booking.mentorId}`}
                    className="px-4 py-2 border border-border text-xs font-semibold text-text-primary hover:bg-background-secondary rounded-xl transition"
                  >
                    Leave Review
                  </Link>
                )}
              </div>
            </div>
          ))}

          {currentList.length === 0 && (
            <div className="bg-white border border-border rounded-2xl p-12 text-center max-w-md mx-auto">
              <Calendar size={32} className="mx-auto text-slate-300 mb-3" />
              <h3 className="font-bold text-base text-text-primary">No {activeTab} bookings</h3>
              <p className="text-xs text-text-secondary mt-1 mb-4">
                You do not have any sessions in this section right now.
              </p>
              <Link
                href="/mentors"
                className="inline-block px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg"
              >
                Browse Mentors
              </Link>
            </div>
          )}
        </div>

        {/* Reschedule Modal */}
        {reschedulingBookingId && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-text-primary">Reschedule Call</h3>
                <button onClick={() => setReschedulingBookingId(null)} className="text-slate-400 hover:text-text-primary">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">New Date</label>
                  <select
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg"
                  >
                    <option value="Thu, 30 Jan">Thu, 30 Jan</option>
                    <option value="Fri, 31 Jan">Fri, 31 Jan</option>
                    <option value="Sat, 01 Feb">Sat, 01 Feb</option>
                    <option value="Sun, 02 Feb">Sun, 02 Feb</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-text-primary mb-1">New Time</label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2 border border-border rounded-lg"
                  >
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReschedulingBookingId(null)}
                  className="px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReschedule}
                  className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-primary-dark"
                >
                  Save New Time
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

