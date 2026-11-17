'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface RecordBookingPayload {
  mentorId: string;
  collegeName: string;
  course: string;
  sessionType: string;
  date: string;
  time: string;
  durationMinutes: number;
  amount: number;
  paymentMethod: string;
}

export async function recordBookingTransaction(payload: RecordBookingPayload) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: true, isGuest: true };
    }

    const meetLink = `https://meet.google.com/gs-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        aspirant_id: user.id,
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
        payment_method: payload.paymentMethod,
        meet_link: meetLink,
      })
      .select('id, meet_link, created_at')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/aspirant/bookings');
    revalidatePath('/mentor/bookings');
    revalidatePath('/mentor/dashboard');
    return { success: true, isGuest: false, bookingId: data.id, meetLink: data.meet_link };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to record booking transaction',
    };
  }
}

