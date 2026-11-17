import { createClient } from '@/lib/supabase/server';
import { College } from '@/types';
import { initialColleges } from '@/data/colleges';

export async function getColleges(): Promise<College[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .order('nirf_rank', { ascending: true });

    if (error || !data || data.length === 0) {
      return initialColleges;
    }

    return data.map((c) => ({
      id: c.id,
      name: c.name,
      shortName: c.short_name,
      city: c.city,
      state: c.state,
      type: c.type as College['type'],
      rating: Number(c.rating),
      reviewCount: c.review_count || 0,
      featuredImage: c.featured_image || '',
      campusImages: (c.campus_images as unknown as string[]) || [],
      about: c.about || '',
      establishedYear: c.established_year || 2000,
      campusSize: c.campus_size || '',
      tuitionFeePerYear: c.tuition_fee_per_year || '',
      tuitionFeeNum: Number(c.tuition_fee_num || 0),
      avgPackage: c.avg_package || '',
      avgPackageNum: Number(c.avg_package_num || 0),
      highestPackage: c.highest_package || '',
      highestPackageNum: Number(c.highest_package_num || 0),
      placementRate: c.placement_rate || 0,
      hasHostel: Boolean(c.has_hostel),
      nirfRank: c.nirf_rank || 0,
      admissionCriteria: c.admission_criteria || '',
      facilities: c.facilities || [],
      courses: (c.courses as unknown as College['courses']) || [],
      websiteUrl: c.website_url || undefined,
      lastCrawledAt: c.last_crawled_at || undefined,
      crawlSource: c.crawl_source || undefined,
    }));
  } catch {
    return initialColleges;
  }
}

export async function getCollegeById(id: string): Promise<College | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return initialColleges.find((c) => c.id === id) || null;
    }

    return {
      id: data.id,
      name: data.name,
      shortName: data.short_name,
      city: data.city,
      state: data.state,
      type: data.type as College['type'],
      rating: Number(data.rating),
      reviewCount: data.review_count || 0,
      featuredImage: data.featured_image || '',
      campusImages: (data.campus_images as unknown as string[]) || [],
      about: data.about || '',
      establishedYear: data.established_year || 2000,
      campusSize: data.campus_size || '',
      tuitionFeePerYear: data.tuition_fee_per_year || '',
      tuitionFeeNum: Number(data.tuition_fee_num || 0),
      avgPackage: data.avg_package || '',
      avgPackageNum: Number(data.avg_package_num || 0),
      highestPackage: data.highest_package || '',
      highestPackageNum: Number(data.highest_package_num || 0),
      placementRate: data.placement_rate || 0,
      hasHostel: Boolean(data.has_hostel),
      nirfRank: data.nirf_rank || 0,
      admissionCriteria: data.admission_criteria || '',
      facilities: data.facilities || [],
      courses: (data.courses as unknown as College['courses']) || [],
      websiteUrl: data.website_url || undefined,
      lastCrawledAt: data.last_crawled_at || undefined,
      crawlSource: data.crawl_source || undefined,
    };
  } catch {
    return initialColleges.find((c) => c.id === id) || null;
  }
}

