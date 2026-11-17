'use server';

import { createClient } from '@/lib/supabase/server';
import { College } from '@/types';
import { revalidatePath } from 'next/cache';

export async function addCollegeToDatabase(college: College) {
  try {
    const supabase = createClient();
    const { error } = await supabase.from('colleges').insert({
      id: college.id,
      name: college.name,
      short_name: college.shortName,
      city: college.city,
      state: college.state,
      type: college.type,
      rating: college.rating,
      review_count: college.reviewCount,
      featured_image: college.featuredImage,
      campus_images: college.campusImages,
      about: college.about,
      established_year: college.establishedYear,
      campus_size: college.campusSize,
      tuition_fee_per_year: college.tuitionFeePerYear,
      tuition_fee_num: college.tuitionFeeNum,
      avg_package: college.avgPackage,
      avg_package_num: college.avgPackageNum,
      highest_package: college.highestPackage,
      highest_package_num: college.highestPackageNum,
      placement_rate: college.placementRate,
      has_hostel: college.hasHostel,
      nirf_rank: college.nirfRank,
      admission_criteria: college.admissionCriteria,
      facilities: college.facilities,
      courses: college.courses,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/colleges');
    revalidatePath('/aspirant/colleges');
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to add college to database',
    };
  }
}

export async function deleteCollegeFromDatabase(collegeId: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from('colleges')
      .delete()
      .eq('id', collegeId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/colleges');
    revalidatePath('/aspirant/colleges');
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to delete college from database',
    };
  }
}

