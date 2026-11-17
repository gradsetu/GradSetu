'use server';

import { createClient } from '@/lib/supabase/server';
import { VerificationStatus } from '@/types';
import { revalidatePath } from 'next/cache';

export async function updateMentorVerificationAudit(
  mentorId: string,
  status: VerificationStatus,
  remarks?: string
) {
  try {
    const supabase = createClient();

    // Verify current user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: 'Unauthorized: No active admin session' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return { success: false, error: 'Forbidden: Admin privilege required' };
    }

    // 1. Update student_verifications status
    await supabase
      .from('student_verifications')
      .update({
        status: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending',
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', mentorId);

    // 2. Update mentor_profiles
    const isPublic = status === 'approved';
    await supabase
      .from('mentor_profiles')
      .update({
        verification_status: status,
        verification_remarks: remarks || null,
        is_publicly_listed: isPublic,
        updated_at: new Date().toISOString(),
      })
      .eq('id', mentorId);

    revalidatePath('/admin/verifications');
    revalidatePath('/mentors');
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update verification audit',
    };
  }
}

