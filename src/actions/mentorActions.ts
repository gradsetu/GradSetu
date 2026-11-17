'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface SaveMentorOnboardingPayload {
  collegeId: string;
  collegeName: string;
  course: string;
  branch: string;
  currentYear: string;
  enrollmentNumber: string;
  bio: string;
  sessionPrice: number;
  expertise: string[];
  availableDays: string[];
  availableTimeSlots: string[];
  verificationDocumentPath?: string;
}

export async function saveMentorOnboarding(payload: SaveMentorOnboardingPayload) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: true, isGuest: true };
    }

    const { error } = await supabase
      .from('mentor_profiles')
      .upsert({
        id: user.id,
        college_id: payload.collegeId || null,
        college_name: payload.collegeName,
        course: payload.course,
        branch: payload.branch,
        current_year: payload.currentYear,
        enrollment_number: payload.enrollmentNumber,
        bio: payload.bio,
        session_price: payload.sessionPrice || 299,
        expertise: payload.expertise || [],
        available_days: payload.availableDays || [],
        available_time_slots: payload.availableTimeSlots || [],
        verification_status: payload.verificationDocumentPath ? 'pending' : 'not_submitted',
        verification_document_url: payload.verificationDocumentPath || null,
        verification_submitted_at: payload.verificationDocumentPath ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/mentor/profile');
    revalidatePath('/mentor/verification');
    revalidatePath('/mentors');
    return { success: true, isGuest: false };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to save mentor onboarding profile',
    };
  }
}

