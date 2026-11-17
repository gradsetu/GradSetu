import { createClient } from '@/lib/supabase/server';
import { Review } from '@/types';
import { initialReviews } from '@/data/reviews';

export async function getReviewsForMentor(mentorId: string): Promise<Review[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('mentor_id', mentorId)
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return initialReviews.filter((r) => r.mentorId === mentorId);
    }

    return data.map((r) => ({
      id: r.id,
      mentorId: r.mentor_id,
      aspirantId: r.aspirant_id || undefined,
      aspirantName: r.aspirant_name,
      aspirantAvatar: r.aspirant_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: Number(r.rating),
      comment: r.comment,
      date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      isModerated: Boolean(r.is_moderated),
      isVisible: Boolean(r.is_visible),
    }));
  } catch {
    return initialReviews.filter((r) => r.mentorId === mentorId);
  }
}

export async function submitReview(payload: {
  mentorId: string;
  aspirantId?: string;
  aspirantName: string;
  aspirantAvatar?: string;
  rating: number;
  comment: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      mentor_id: payload.mentorId,
      aspirant_id: payload.aspirantId || null,
      aspirant_name: payload.aspirantName,
      aspirant_avatar: payload.aspirantAvatar || null,
      rating: payload.rating,
      comment: payload.comment,
      is_moderated: true,
      is_visible: true,
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

