import { createClient } from '@/lib/supabase/server';
import { MentorProfile, VerificationStatus } from '@/types';
import { initialMentors } from '@/data/mentors';

export async function getMentors(): Promise<MentorProfile[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('mentor_profiles')
      .select(`
        *,
        profiles:id (
          full_name
        )
      `)
      .order('rating', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialMentors;
    }

    return data.map((m) => ({
      id: m.id,
      userId: m.id,
      name: m.profiles?.full_name || 'Verified Mentor',
      email: '',
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      collegeId: m.college_id || '',
      collegeName: m.college_name || '',
      collegeLocation: m.college_location || '',
      state: m.state || '',
      course: m.course || '',
      branch: m.branch || '',
      currentYear: m.current_year || '',
      graduationYear: m.graduation_year || '',
      enrollmentNumber: m.enrollment_number || '',
      bio: m.bio || '',
      expertise: m.expertise || [],
      sessionPrice: m.session_price || 299,
      sessionDuration: m.session_duration || 30,
      rating: Number(m.rating || 5.0),
      reviewCount: m.review_count || 0,
      totalSessions: m.total_sessions || 0,
      totalEarnings: m.total_earnings || 0,
      verificationStatus: (m.verification_status as VerificationStatus) || 'not_submitted',
      verificationDocumentUrl: m.verification_document_url || undefined,
      verificationRemarks: m.verification_remarks || undefined,
      verificationSubmittedAt: m.verification_submitted_at || undefined,
      availableDays: m.available_days || ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      availableTimeSlots: m.available_time_slots || ['11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
      isPubliclyListed: m.is_publicly_listed ?? true,
    }));
  } catch {
    return initialMentors;
  }
}

export async function updateMentorVerificationStatus(
  mentorId: string,
  status: VerificationStatus,
  remarks?: string
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('mentor_profiles')
    .update({
      verification_status: status,
      verification_remarks: remarks,
      updated_at: new Date().toISOString(),
    })
    .eq('id', mentorId);

  if (error) {
    throw new Error(error.message);
  }
  return true;
}

