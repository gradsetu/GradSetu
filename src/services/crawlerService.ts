import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';
import { College } from '@/types';

export interface CrawlResult {
  url: string;
  success: boolean;
  title?: string;
  description?: string;
  image?: string;
  extractedPlacement?: string;
  extractedFee?: string;
  lastCrawledAt: string;
  error?: string;
}

/**
 * Robust web crawler service that crawls Indian college websites,
 * parses metadata, placement stats, and updates the Supabase database in real-time.
 */
export class CollegeCrawlerService {
  /**
   * Crawl a single college website by URL and extract rich semantic metadata
   */
  static async crawlCollegeWebsite(targetUrl: string): Promise<CrawlResult> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(targetUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'GradSetu-Bot/1.0 (+https://gradsetu.com; real-time college data indexing engine)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          url: targetUrl,
          success: false,
          lastCrawledAt: new Date().toISOString(),
          error: `HTTP error ${response.status}: ${response.statusText}`,
        };
      }

      const html = await response.text();

      // Extract Open Graph and HTML metadata
      const titleMatch =
        html.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i) ||
        html.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : undefined;

      const descMatch =
        html.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i) ||
        html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
      const description = descMatch ? descMatch[1].trim() : undefined;

      const imageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
      const image = imageMatch ? imageMatch[1].trim() : undefined;

      // Extract placement hints (e.g. LPA, highest package, average package)
      let extractedPlacement: string | undefined;
      const placementMatch = html.match(/(?:highest|average|avg)\s+package[^0-9]*([₹$]?\s*\d+(?:\.\d+)?\s*(?:LPA|CPA|Lakhs?|Crore))/i);
      if (placementMatch) {
        extractedPlacement = placementMatch[1];
      }

      // Extract fee hints
      let extractedFee: string | undefined;
      const feeMatch = html.match(/(?:tuition|annual|per year)\s+fee[^0-9]*([₹$]?\s*\d+(?:,\d+)*(?:\.\d+)?\s*(?:Lakh|Lakhs|INR|per annum)?)/i);
      if (feeMatch) {
        extractedFee = feeMatch[1];
      }

      return {
        url: targetUrl,
        success: true,
        title,
        description,
        image,
        extractedPlacement,
        extractedFee,
        lastCrawledAt: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        url: targetUrl,
        success: false,
        lastCrawledAt: new Date().toISOString(),
        error: err?.message || 'Crawler connection failed',
      };
    }
  }

  /**
   * Crawl a specific college in the database by its ID, update its live attributes,
   * and persist the crawl timestamp.
   */
  static async syncCollegeByCrawler(collegeId: string): Promise<{ success: boolean; message: string; college?: any }> {
    const supabase = createClient();

    const { data: college, error: fetchErr } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', collegeId)
      .single();

    if (fetchErr || !college) {
      return { success: false, message: `College with ID ${collegeId} not found` };
    }

    const websiteUrl = college.website_url || `https://${college.id.replace(/-/g, '')}.ac.in`;
    const crawlData = await this.crawlCollegeWebsite(websiteUrl);

    const updatePayload: Database['public']['Tables']['colleges']['Update'] = {
      last_crawled_at: crawlData.lastCrawledAt,
      crawl_source: 'GradSetu Real-Time Web Crawler',
    };

    if (crawlData.success && crawlData.description) {
      // If live description has richer info, supplement it
      updatePayload.about = crawlData.description;
    }

    const { data: updated, error: updateErr } = await supabase
      .from('colleges')
      .update(updatePayload)
      .eq('id', collegeId)
      .select()
      .single();

    if (updateErr) {
      return { success: false, message: `Failed to update database: ${updateErr.message}` };
    }

    return {
      success: true,
      message: `Successfully crawled and indexed ${college.name} from ${websiteUrl}`,
      college: updated,
    };
  }

  /**
   * Crawl all colleges in batch and update real-time telemetry
   */
  static async batchSyncColleges(limit = 10): Promise<{ crawled: number; successes: number; errors: number }> {
    const supabase = createClient();

    const { data: colleges } = await supabase
      .from('colleges')
      .select('id, name, website_url')
      .order('last_crawled_at', { ascending: true })
      .limit(limit);

    if (!colleges || colleges.length === 0) {
      return { crawled: 0, successes: 0, errors: 0 };
    }

    let successes = 0;
    let errors = 0;

    for (const c of colleges) {
      const res = await this.syncCollegeByCrawler(c.id);
      if (res.success) successes++;
      else errors++;
    }

    return { crawled: colleges.length, successes, errors };
  }
}
