import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { initialColleges } from '@/data/colleges';
import { College } from '@/types';
import { Database } from '@/types/supabase';

export const dynamic = 'force-dynamic';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrojmecjnqkgvrhzdeam.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createSupabaseClient<Database>(url, key);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  const collegeId = params.collegeId;

  // 1. Try local list
  const localMatch = initialColleges.find((c) => c.id === collegeId);
  if (localMatch) {
    return NextResponse.json({ success: true, college: localMatch });
  }

  // 2. Query Supabase
  try {
    const supabase = getSupabase();
    const { data: dbCollege, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', collegeId)
      .maybeSingle();

    if (dbCollege) {
      const college: College = {
        id: dbCollege.id,
        name: dbCollege.name,
        shortName: dbCollege.short_name,
        city: dbCollege.city,
        state: dbCollege.state,
        type: dbCollege.type as College['type'],
        rating: Number(dbCollege.rating || 4.5),
        reviewCount: dbCollege.review_count || 0,
        featuredImage: dbCollege.featured_image || 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1200',
        campusImages: (dbCollege.campus_images as string[]) || [],
        about: dbCollege.about || '',
        establishedYear: dbCollege.established_year || 2000,
        campusSize: dbCollege.campus_size || '',
        tuitionFeePerYear: dbCollege.tuition_fee_per_year || '₹2 Lakh',
        tuitionFeeNum: Number(dbCollege.tuition_fee_num || 0),
        avgPackage: dbCollege.avg_package || '₹12 LPA',
        avgPackageNum: Number(dbCollege.avg_package_num || 0),
        medianPackage: (dbCollege as any).median_package || undefined,
        medianPackageNum: Number((dbCollege as any).median_package_num || 0),
        highestPackage: dbCollege.highest_package || '₹40 LPA',
        highestPackageNum: Number(dbCollege.highest_package_num || 0),
        placementRate: dbCollege.placement_rate || 88,
        hasHostel: Boolean(dbCollege.has_hostel),
        hostelFeePerYear: (dbCollege as any).hostel_fee_per_year || undefined,
        nirfRank: dbCollege.nirf_rank || 100,
        admissionCriteria: dbCollege.admission_criteria || 'Entrance Examination',
        facilities: dbCollege.facilities || [],
        courses: (dbCollege.courses as unknown as College['courses']) || [],
        websiteUrl: dbCollege.website_url || undefined,
        topRecruiters: (dbCollege as any).top_recruiters || [],
        accreditation: (dbCollege as any).accreditation || undefined,
        lastCrawledAt: dbCollege.last_crawled_at || undefined,
        crawlSource: dbCollege.crawl_source || undefined,
      };

      return NextResponse.json({ success: true, college });
    }
  } catch (err: any) {
    console.warn('Database college fetch error:', err);
  }

  return NextResponse.json(
    { error: `College with ID ${collegeId} not found`, code: 'NOT_FOUND' },
    { status: 404 }
  );
}
