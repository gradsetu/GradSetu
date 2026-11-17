import { NextRequest, NextResponse } from 'next/server';
import { SearchEngineService } from '@/services/searchEngineService';
import { initialColleges } from '@/data/colleges';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim() || '';

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        suggestions: [],
        items: [],
      });
    }

    const qLower = query.toLowerCase();
    const suggestionsSet = new Set<string>();
    const items: Array<{
      name: string;
      description: string;
      source: 'database' | 'internet';
      collegeId?: string;
    }> = [];

    // 1. Search local & DB suggestions
    const dbSuggestions = await SearchEngineService.getSuggestions(query);
    dbSuggestions.forEach((s) => suggestionsSet.add(s));

    // Match local colleges for rich cards in dropdown
    for (const c of initialColleges) {
      if (
        c.name.toLowerCase().includes(qLower) ||
        c.shortName.toLowerCase().includes(qLower) ||
        c.city.toLowerCase().includes(qLower)
      ) {
        items.push({
          name: c.name,
          description: `${c.city}, ${c.state} • ${c.type} (NIRF #${c.nirfRank || 'Ranked'})`,
          source: 'database',
          collegeId: c.id,
        });
        suggestionsSet.add(c.name);
        suggestionsSet.add(c.shortName);
        if (items.length >= 5) break;
      }
    }

    // 2. Query Wikipedia OpenSearch live for matching colleges worldwide
    try {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=8&namespace=0&format=json&origin=*`;
      const res = await fetch(wikiUrl, {
        headers: {
          'User-Agent': 'GradSetuEducationApp/1.0 (contact@gradsetu.com)',
        },
        signal: AbortSignal.timeout(3000),
      });

      if (res.ok) {
        const data = await res.json();
        const titles: string[] = data[1] || [];
        const descriptions: string[] = data[2] || [];

        const eduKeywords = [
          'university', 'college', 'institute', 'school', 'academy', 'campus',
          'technology', 'engineering', 'science', 'medical', 'management'
        ];

        titles.forEach((title, i) => {
          const desc = descriptions[i] || '';
          const combined = `${title} ${desc}`.toLowerCase();
          const isEdu = eduKeywords.some((k) => combined.includes(k)) || title.toLowerCase().includes(qLower);

          if (isEdu && !items.some((item) => item.name.toLowerCase() === title.toLowerCase())) {
            suggestionsSet.add(title);
            items.push({
              name: title,
              description: desc ? desc.slice(0, 80) + '...' : 'Educational Institution (Live Web Discovery)',
              source: 'internet',
            });
          }
        });
      }
    } catch {}

    return NextResponse.json({
      success: true,
      suggestions: Array.from(suggestionsSet).slice(0, 6),
      items: items.slice(0, 8),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to fetch suggestions', code: 'SUGGESTIONS_FAILED' },
      { status: 500 }
    );
  }
}
