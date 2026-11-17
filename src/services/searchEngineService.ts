import { createClient } from '@/lib/supabase/server';
import { College } from '@/types';
import { initialColleges } from '@/data/colleges';

export interface SearchFilters {
  query?: string;
  type?: string;
  state?: string;
  city?: string;
  maxFee?: number;
  minPlacement?: number;
  sortBy?: 'nirf_rank' | 'rating' | 'avg_package_num' | 'tuition_fee_num' | 'placement_rate';
  sortDirection?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  colleges: College[];
  total: number;
  page: number;
  limit: number;
  facets: {
    types: { name: string; count: number }[];
    states: { name: string; count: number }[];
  };
}

export class SearchEngineService {
  /**
   * Search and filter colleges with PostgreSQL Full-Text Search (tsvector + GIN)
   */
  static async search(filters: SearchFilters): Promise<SearchResult> {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 30;
    const offset = (page - 1) * limit;

    try {
      const supabase = createClient();

      // Use the Postgres search_colleges function
      const { data, error } = await supabase.rpc('search_colleges', {
        search_query: filters.query || '',
        filter_type: filters.type && filters.type !== 'All' ? filters.type : 'All',
        filter_state: filters.state && filters.state !== 'All' ? filters.state : 'All',
        max_fee: filters.maxFee || 10000000,
        min_placement: filters.minPlacement || 0,
        sort_by: filters.sortBy || 'nirf_rank',
        sort_direction: filters.sortDirection || 'asc',
        page_offset: offset,
        page_limit: limit,
      });

      if (error || !data || data.length === 0) {
        // Fallback to local filter if database RPC has no match
        return this.localSearchFallback(filters, page, limit);
      }

      const colleges: College[] = data.map((c: any) => ({
        id: c.id,
        name: c.name,
        shortName: c.short_name,
        city: c.city,
        state: c.state,
        type: c.type as College['type'],
        rating: Number(c.rating || 4.5),
        reviewCount: c.review_count || 0,
        featuredImage: c.featured_image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
        campusImages: (c.campus_images as string[]) || [],
        about: c.about || '',
        establishedYear: c.established_year || 2000,
        campusSize: c.campus_size || '',
        tuitionFeePerYear: c.tuition_fee_per_year || '₹2 Lakh',
        tuitionFeeNum: Number(c.tuition_fee_num || 0),
        avgPackage: c.avg_package || '₹15 LPA',
        avgPackageNum: Number(c.avg_package_num || 0),
        highestPackage: c.highest_package || '₹50 LPA',
        highestPackageNum: Number(c.highest_package_num || 0),
        placementRate: c.placement_rate || 90,
        hasHostel: Boolean(c.has_hostel),
        nirfRank: c.nirf_rank || 100,
        admissionCriteria: c.admission_criteria || 'Entrance Exam Rank',
        facilities: c.facilities || [],
        courses: c.courses || [],
      }));

      return {
        colleges,
        total: colleges.length >= limit ? 100 : colleges.length,
        page,
        limit,
        facets: {
          types: [
            { name: 'IIT', count: colleges.filter((c) => c.type === 'IIT').length },
            { name: 'NIT', count: colleges.filter((c) => c.type === 'NIT').length },
            { name: 'IIIT', count: colleges.filter((c) => c.type === 'IIIT').length },
            { name: 'Private University', count: colleges.filter((c) => c.type === 'Private University').length },
          ],
          states: [],
        },
      };
    } catch {
      return this.localSearchFallback(filters, page, limit);
    }
  }

  /**
   * Fast autocomplete suggestions for search inputs
   */
  static async getSuggestions(query: string): Promise<string[]> {
    if (!query || query.trim().length < 2) return [];

    try {
      const supabase = createClient();
      const q = query.trim().toLowerCase();

      const { data } = await supabase
        .from('colleges')
        .select('name, short_name, city')
        .or(`name.ilike.%${q}%,short_name.ilike.%${q}%,city.ilike.%${q}%`)
        .limit(8);

      if (data && data.length > 0) {
        const set = new Set<string>();
        data.forEach((item) => {
          if (item.short_name?.toLowerCase().includes(q)) set.add(item.short_name);
          if (item.name?.toLowerCase().includes(q)) set.add(item.name);
          if (item.city?.toLowerCase().includes(q)) set.add(item.city);
        });
        return Array.from(set).slice(0, 6);
      }
    } catch {}

    // Fallback to local
    const q = query.toLowerCase();
    const suggestions = initialColleges
      .filter((c) => c.name.toLowerCase().includes(q) || c.shortName.toLowerCase().includes(q) || c.city.toLowerCase().includes(q))
      .map((c) => c.shortName);
    return Array.from(new Set(suggestions)).slice(0, 6);
  }

  private static localSearchFallback(filters: SearchFilters, page: number, limit: number): SearchResult {
    let filtered = [...initialColleges];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.state.toLowerCase().includes(q)
      );
    }

    if (filters.type && filters.type !== 'All') {
      filtered = filtered.filter((c) => c.type === filters.type);
    }

    if (filters.maxFee) {
      filtered = filtered.filter((c) => c.tuitionFeeNum <= filters.maxFee!);
    }

    if (filters.minPlacement) {
      filtered = filtered.filter((c) => c.placementRate >= filters.minPlacement!);
    }

    return {
      colleges: filtered.slice((page - 1) * limit, page * limit),
      total: filtered.length,
      page,
      limit,
      facets: {
        types: [],
        states: [],
      },
    };
  }
}

