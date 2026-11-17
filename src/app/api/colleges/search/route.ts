import { NextRequest, NextResponse } from 'next/server';
import { SearchEngineService, SearchFilters } from '@/services/searchEngineService';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get('q') || undefined;
    const type = searchParams.get('type') || undefined;
    const state = searchParams.get('state') || undefined;
    const city = searchParams.get('city') || undefined;
    const maxFee = searchParams.get('maxFee') ? Number(searchParams.get('maxFee')) : undefined;
    const minPlacement = searchParams.get('minPlacement') ? Number(searchParams.get('minPlacement')) : undefined;
    const sortBy = (searchParams.get('sortBy') as any) || undefined;
    const sortDirection = (searchParams.get('sortDirection') as any) || undefined;
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 30;

    const filters: SearchFilters = {
      query,
      type,
      state,
      city,
      maxFee,
      minPlacement,
      sortBy,
      sortDirection,
      page,
      limit,
    };

    const results = await SearchEngineService.search(filters);

    return NextResponse.json({
      success: true,
      ...results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Search execution failed', code: 'SEARCH_FAILED' },
      { status: 500 }
    );
  }
}

