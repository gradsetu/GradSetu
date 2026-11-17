'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface SaveAspirantOnboardingPayload {
  preferredCourse: string;
  targetAdmissionYear: string;
  entranceExams: string[];
  expectedBudget: string;
  preferredBranch: string;
  hostelPreference: 'yes' | 'no' | 'flexible';
  city?: string;
  currentEducationLevel?: string;
}

export async function saveAspirantOnboarding(payload: SaveAspirantOnboardingPayload) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // In guest or local demo mode, return success without failing
      return { success: true, isGuest: true };
    }

    const targetYearNum = parseInt(payload.targetAdmissionYear, 10) || 2026;

    const { error } = await supabase
      .from('aspirant_profiles')
      .upsert({
        id: user.id,
        target_year: targetYearNum,
        budget: payload.expectedBudget,
        preferred_course: payload.preferredCourse,
        preferred_branch: payload.preferredBranch,
        entrance_exams: payload.entranceExams,
        hostel_preference: payload.hostelPreference,
        city: payload.city || null,
        current_education_level: payload.currentEducationLevel || null,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/aspirant/dashboard');
    revalidatePath('/aspirant/profile');
    return { success: true, isGuest: false };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to save aspirant goals',
    };
  }
}

