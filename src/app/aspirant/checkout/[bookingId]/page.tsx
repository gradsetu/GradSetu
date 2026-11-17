'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Loader2 
} from 'lucide-react';
import { recordBookingTransaction } from '@/actions/bookingActions';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mentors, createBooking, currentUser, aspirantProfile } = useApp();

  const mentorId = searchParams.get('mentorId') || 'mentor-ritik-sharma';
  const selectedDate = searchParams.get('date') || 'Wed, 29 Jan';
  const selectedTime = searchParams.get('time') || '4:00 PM';
  const amountStr = searchParams.get('amount') || '299';
  const amount = Number(amountStr);

  const mentor = mentors.find(m => m.id === mentorId) || mentors[0];

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = async () => {
    setIsProcessing(true);

    const paymentMethodLabel = paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : 'Net Banking';

    // Persist booking to Supabase
    const dbRes = await recordBookingTransaction({
      mentorId: mentor.id,
      collegeName: mentor.collegeName,
      course: mentor.branch,
      sessionType: '1-on-1 Guidance Call',
      date: selectedDate,
      time: selectedTime,
      durationMinutes: 30,
      amount: amount,
      paymentMethod: paymentMethodLabel,
    });

    const activeMeetLink = (dbRes && 'meetLink' in dbRes && dbRes.meetLink) || 'https://meet.google.com/gs-mentor-session';

    // Create confirmed booking in app state
    createBooking({
      aspirantId: currentUser?.id || 'user-aspirant-ananya',
      aspirantName: currentUser?.name || aspirantProfile.name,
      aspirantAvatar: currentUser?.avatar || aspirantProfile.avatar,
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorAvatar: mentor.avatar,
      collegeName: mentor.collegeName,
      course: mentor.branch,
      sessionType: '1-on-1 Guidance Call',
      date: selectedDate,
      time: selectedTime,
      durationMinutes: 30,
      amount: amount,
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: paymentMethodLabel,
      meetLink: activeMeetLink,
    });

    setIsProcessing(false);
    setIsSuccess(true);

    setTimeout(() => {
      router.push('/aspirant/bookings');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Confirm & Pay" subtitle="Secure checkout for your mentorship guidance call" />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-6">
        
        {/* Back Link */}
        <Link
          href={`/mentors/${mentor.id}/book`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Slot Selection</span>
        </Link>

        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Confirm & Pay
        </h1>

        {/* Two Columns matching Panel 12 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Booking Summary matching Panel 12 */}
          <div className="md:col-span-5 bg-white border border-border rounded-2xl p-6 shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider">
              Booking Summary
            </h2>

            <div className="flex items-center gap-3.5 pb-4 border-b border-border">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-bold text-sm text-text-primary">{mentor.name}</h3>
                <p className="text-xs text-text-secondary">{mentor.collegeName} • 1-on-1 Guidance Call</p>
              </div>
            </div>

            <div className="space-y-3 text-xs divide-y divide-border">
              <div className="flex justify-between py-1.5">
                <span className="text-text-secondary">Duration</span>
                <span className="font-semibold text-text-primary">30 Minutes</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-text-secondary">Date & Time</span>
                <span className="font-semibold text-text-primary">{selectedDate} • {selectedTime}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-text-secondary">Convenience Fee</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between py-2 pt-3">
                <span className="text-sm font-bold text-text-primary">Total Payable Amount</span>
                <span className="text-lg font-extrabold text-primary">₹{amount}</span>
              </div>
            </div>

            <div className="p-3 bg-background-secondary rounded-xl text-[11px] text-text-secondary flex items-start gap-2">
              <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>100% money-back guarantee if the mentor does not attend the scheduled call.</span>
            </div>
          </div>

          {/* Right: Payment Method matching Panel 12 */}
          <div className="md:col-span-7 bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-text-primary uppercase tracking-wider">
                Pay Using
              </label>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-background-secondary border rounded-lg text-[11px] font-semibold text-text-secondary">
                <Lock size={12} className="text-primary" />
                <span>Simulated Gateway</span>
              </div>
            </div>

            {/* Payment Method Radio Options matching Panel 12 */}
            <div className="space-y-3">
              
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary-light/30'
                    : 'border-border hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Smartphone size={20} className="text-primary" />
                    <div>
                      <span className="font-bold text-xs text-text-primary block">UPI (GPay / PhonePe / Paytm / BHIM)</span>
                      <span className="text-[10px] text-text-secondary">Instant confirmation, zero convenience fees</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="accent-primary"
                  />
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-3 pt-3 border-t border-border/60">
                    <label className="block text-[11px] font-semibold text-text-primary mb-1">
                      Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okaxis"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                )}
              </div>

              {/* Debit/Credit Card */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary-light/30'
                    : 'border-border hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-primary" />
                    <div>
                      <span className="font-bold text-xs text-text-primary block">Debit / Credit Card</span>
                      <span className="text-[10px] text-text-secondary">Visa, MasterCard, RuPay</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-primary"
                  />
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-3 pt-3 border-t border-border/60 space-y-2 text-xs">
                    <div>
                      <label className="block text-[10px] text-text-secondary mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-border rounded-lg text-text-primary"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Net Banking */}
              <div
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'netbanking'
                    ? 'border-primary bg-primary-light/30'
                    : 'border-border hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Building2 size={20} className="text-primary" />
                    <div>
                      <span className="font-bold text-xs text-text-primary block">Net Banking</span>
                      <span className="text-[10px] text-text-secondary">SBI, HDFC, ICICI, Axis, PNB</span>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'netbanking'}
                    onChange={() => setPaymentMethod('netbanking')}
                    className="accent-primary"
                  />
                </div>
              </div>

            </div>

            {/* Pay Button */}
            <button
              type="button"
              disabled={isProcessing || isSuccess}
              onClick={handlePay}
              className="w-full py-3.5 bg-primary hover:bg-primary-dark disabled:opacity-75 text-white font-bold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Processing Payment Simulation...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={18} className="text-white" />
                  <span>Payment Confirmed! Redirecting...</span>
                </>
              ) : (
                <span>Pay ₹{amount}</span>
              )}
            </button>

            <p className="text-[11px] text-center text-text-secondary">
              Demo Mode: No real funds are debited. This registers a verified booking across Aspirant, Mentor, and Admin portals.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

