import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { CollegeCrawlerService } from '@/services/crawlerService';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const CrawlRequestSchema = z.object({
  action: z.enum(['single', 'batch', 'url']),
  collegeId: z.string().optional(),
  url: z.string().url().optional(),
  limit: z.number().min(1).max(50).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    // Ensure user is authorized (admin or internal system caller)
    // If authenticated, check if role is admin
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        return NextResponse.json(
          { error: 'Unauthorized: Admin privileges required to execute web crawler', code: 'FORBIDDEN' },
          { status: 403 }
        );
      }
    }

    const body = await req.json();
    const validation = CrawlRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues.map((e: z.ZodIssue) => e.message).join(', '),
          code: 'VALIDATION_ERROR',
        },
        { status: 400 }
      );
    }

    const { action, collegeId, url, limit } = validation.data;

    if (action === 'url' && url) {
      const result = await CollegeCrawlerService.crawlCollegeWebsite(url);
      return NextResponse.json({ success: true, data: result });
    }

    if (action === 'single') {
      if (!collegeId) {
        return NextResponse.json(
          { error: 'collegeId is required for single crawl action', code: 'MISSING_PARAM' },
          { status: 400 }
        );
      }
      const syncResult = await CollegeCrawlerService.syncCollegeByCrawler(collegeId);
      return NextResponse.json(syncResult);
    }

    if (action === 'batch') {
      const batchResult = await CollegeCrawlerService.batchSyncColleges(limit || 15);
      return NextResponse.json({ success: true, result: batchResult });
    }

    return NextResponse.json(
      { error: 'Invalid action provided', code: 'INVALID_ACTION' },
      { status: 400 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Crawler process execution error', code: 'CRAWLER_ERROR' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return NextResponse.json(
        { error: 'Missing target URL parameter (?url=...)', code: 'MISSING_URL' },
        { status: 400 }
      );
    }

    const result = await CollegeCrawlerService.crawlCollegeWebsite(targetUrl);
    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to crawl URL', code: 'CRAWL_FAILED' },
      { status: 500 }
    );
  }
}
