import { NextRequest, NextResponse } from 'next/server';
import { LiveCollegeCrawlerService } from '@/services/liveCollegeCrawler';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('query') || searchParams.get('name');

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'A valid college name query is required (?q=...)', code: 'INVALID_QUERY' },
        { status: 400 }
      );
    }

    const college = await LiveCollegeCrawlerService.searchAndCrawlCollege(query);

    return NextResponse.json({
      success: true,
      college,
      message: `Successfully crawled and indexed ${college.name} from the internet`,
    });
  } catch (error: any) {
    console.error('Error crawling college:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to crawl college from internet', code: 'CRAWL_FAILED' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const query = body.query || body.name || body.q;

    if (!query || String(query).trim().length < 2) {
      return NextResponse.json(
        { error: 'A valid college name query is required in request body', code: 'INVALID_QUERY' },
        { status: 400 }
      );
    }

    const college = await LiveCollegeCrawlerService.searchAndCrawlCollege(String(query));

    return NextResponse.json({
      success: true,
      college,
      message: `Successfully crawled and indexed ${college.name} from the internet`,
    });
  } catch (error: any) {
    console.error('Error crawling college:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to crawl college from internet', code: 'CRAWL_FAILED' },
      { status: 500 }
    );
  }
}

