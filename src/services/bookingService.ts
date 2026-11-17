import { createClient } from '@/lib/supabase/server';
import { Booking, BookingStatus, PaymentStatus } from '@/types';
import { initialBookings } from '@/data/bookings';

export interface CreateBookingPayload {
  aspirantId: string;
  aspirantName: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar?: string;
  collegeName: string;
  course: string;
  sessionType: string;
  date: string;
  time: string;
  durationMinutes: number;
  amount: number;
  paymentMethod?: string;
}

export async function createBookingRecord(payload: CreateBookingPayload): Promise<Booking> {
  const supabase = createClient();
  const meetLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      aspirant_id: payload.aspirantId,
      mentor_id: payload.mentorId,
      college_name: payload.collegeName,
      course: payload.course,
      session_type: payload.sessionType,
      session_date: payload.date,
      session_time: payload.time,
      duration_minutes: payload.durationMinutes,
      amount: payload.amount,
      status: 'confirmed',
      payment_status: 'paid',
      payment_method: payload.paymentMethod || 'UPI',
      meet_link: meetLink,
    })
    .select('*')
    .single();

  if (error || !data) {
    throw new Error(error ? error.message : 'Failed to create booking in database');
  }

  return {
    id: data.id,
    aspirantId: data.aspirant_id,
    aspirantName: payload.aspirantName,
    mentorId: data.mentor_id,
    mentorName: payload.mentorName,
    mentorAvatar: payload.mentorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    collegeName: data.college_name || '',
    course: data.course || '',
    sessionType: data.session_type,
    date: data.session_date,
    time: data.session_time,
    durationMinutes: data.duration_minutes || 30,
    amount: data.amount || 299,
    status: data.status as BookingStatus,
    paymentStatus: data.payment_status as PaymentStatus,
    paymentMethod: data.payment_method || undefined,
    transactionId: data.transaction_id || undefined,
    meetLink: data.meet_link || undefined,
    createdAt: data.created_at,
  };
}

export async function getBookingsForUser(userId: string): Promise<Booking[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .or(`aspirant_id.eq.${userId},mentor_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialBookings;
    }

    return data.map((b) => ({
      id: b.id,
      aspirantId: b.aspirant_id,
      aspirantName: 'Aspirant',
      mentorId: b.mentor_id,
      mentorName: 'Senior Mentor',
      mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      collegeName: b.college_name || '',
      course: b.course || '',
      sessionType: b.session_type,
      date: b.session_date,
      time: b.session_time,
      durationMinutes: b.duration_minutes || 30,
      amount: b.amount || 299,
      status: b.status as BookingStatus,
      paymentStatus: b.payment_status as PaymentStatus,
      paymentMethod: b.payment_method || undefined,
      transactionId: b.transaction_id || undefined,
      meetLink: b.meet_link || undefined,
      createdAt: b.created_at,
    }));
  } catch {
    return initialBookings;
  }
}

