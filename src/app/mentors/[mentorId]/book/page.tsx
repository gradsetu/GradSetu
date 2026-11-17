'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Clock, Calendar, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export default function BookCallPage() {
  const router = useRouter();
  const params = useParams();
  const mentorId = params.mentorId as string;
  const { mentors, createBooking, aspirantProfile } = useApp();

  const mentor = mentors.find(m => m.id === mentorId) || mentors[0];

  const dates = [
    { day: 'Tue', date: '28 Jan', full: 'Tue, 28 Jan' },
    { day: 'Wed', date: '29 Jan', full: 'Wed, 29 Jan' },
    { day: 'Thu', date: '30 Jan', full: 'Thu, 30 Jan' },
    { day: 'Fri', date: '31 Jan', full: 'Fri, 31 Jan' },
    { day: 'Sat', date: '01 Feb', full: 'Sat, 01 Feb' },
  ];

  const timeSlots = [
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '04:00 PM',
    '06:00 PM',
    '07:00 PM'
  ];

  const [selectedDate, setSelectedDate] = useState('Wed, 29 Jan');
  const [selectedTime, setSelectedTime] = useState('04:00 PM');

  const handleProceedToPayment = () => {
    // Generate a temporary pending booking or pass params to checkout
    const tempBookingId = `bkg-temp-${Date.now()}`;
    const searchParams = new URLSearchParams({
      mentorId: mentor.id,
      date: selectedDate,
      time: selectedTime,
      amount: String(mentor.sessionPrice)
    });

    router.push(`/aspirant/checkout/${tempBookingId}?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-secondary">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Back Link */}
        <Link
          href={`/mentors/${mentor.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Profile</span>
        </Link>

        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
            Book a Guidance Call with {mentor.name}
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Choose your preferred date and time for the 30-minute 1-on-1 mentoring session.
          </p>
        </div>

        {/* Two Columns matching Panel 11 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Summary Card matching Panel 11 */}
          <div className="md:col-span-5 bg-white border border-border rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3.5 pb-4 border-b border-border">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-sm text-text-primary">{mentor.name}</h3>
                  <VerifiedBadge size={14} />
                </div>
                <p className="text-xs text-text-secondary">{mentor.collegeName} • {mentor.branch}</p>
                <p className="text-xs text-primary font-medium">{mentor.currentYear}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs divide-y divide-border">
              <div className="flex justify-between py-1">
                <span className="text-text-secondary">Session Type</span>
                <span className="font-semibold text-text-primary">1-on-1 Guidance Call</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-secondary">Duration</span>
                <span className="font-semibold text-text-primary">30 Minutes</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-secondary">Platform</span>
                <span className="font-semibold text-text-primary">Google Meet (Link sent via email)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-text-secondary">Amount</span>
                <span className="text-base font-extrabold text-primary">₹{mentor.sessionPrice}</span>
              </div>
            </div>

            <div className="p-3 bg-primary-light border border-primary-secondary rounded-xl flex items-start gap-2 text-[11px] text-text-primary">
              <ShieldCheck size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Full refund if cancelled at least 2 hours before the scheduled call.</span>
            </div>
          </div>

          {/* Right Selection Card matching Panel 11 */}
          <div className="md:col-span-7 bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
            
            {/* Select Date */}
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
                Select Date
              </label>
              <div className="grid grid-cols-5 gap-2">
                {dates.map((d) => {
                  const isSelected = selectedDate === d.full;
                  return (
                    <button
                      key={d.full}
                      type="button"
                      onClick={() => setSelectedDate(d.full)}
                      className={`py-3 px-2 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-sm'
                          : 'border-border bg-white text-text-primary hover:border-slate-300'
                      }`}
                    >
                      <span className={`text-[11px] font-medium ${isSelected ? 'text-white/80' : 'text-text-secondary'}`}>
                        {d.day}
                      </span>
                      <span className="text-xs font-bold mt-0.5">
                        {d.date}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Time */}
            <div>
              <label className="block text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2.5 px-3 rounded-xl border text-center text-xs font-bold transition ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-sm'
                          : 'border-border bg-white text-text-primary hover:border-slate-300'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Summary Pill */}
            <div className="p-3 bg-background-secondary rounded-xl text-xs text-text-secondary flex items-center justify-between">
              <span>Selected Slot:</span>
              <span className="font-bold text-text-primary">
                {selectedDate} • {selectedTime}
              </span>
            </div>

            {/* Proceed Button */}
            <button
              type="button"
              onClick={handleProceedToPayment}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Pay</span>
              <ArrowRight size={16} />
            </button>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

