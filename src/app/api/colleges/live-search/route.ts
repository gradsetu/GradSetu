import { NextRequest, NextResponse } from 'next/server';
import { initialColleges } from '@/data/colleges';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const qLower = q.toLowerCase();
  const resultsMap = new Map<string, { name: string; description: string; source: string }>();

  // 1. First, search local high-reputation colleges (instant response)
  for (const c of initialColleges) {
    if (
      c.name.toLowerCase().includes(qLower) ||
      c.shortName.toLowerCase().includes(qLower) ||
      c.city.toLowerCase().includes(qLower)
    ) {
      resultsMap.set(c.name.toLowerCase(), {
        name: c.name,
        description: `${c.city}, ${c.state} · ${c.type} (NIRF #${c.nirfRank || 'Top'})`,
        source: 'local',
      });
    }
  }

  // 2. Search Wikipedia API live on the internet
  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(q)}&limit=12&namespace=0&format=json&origin=*`;

    const res = await fetch(wikiUrl, {
      headers: {
        'User-Agent': 'GradSetuEducationApp/1.0 (https://gradsetu.com; contact@gradsetu.com)',
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      const titles: string[] = data[1] || [];
      const descriptions: string[] = data[2] || [];

      const eduKeywords = [
        'university',
        'college',
        'institute',
        'school',
        'academy',
        'campus',
        'vidyapeeth',
        'polytechnic',
        'education',
        'degree',
        'faculty',
        'engineering',
        'medical',
        'iit',
        'nit',
        'iiit',
        'iim',
        'bits',
        'aiims',
      ];

      titles.forEach((title, i) => {
        const desc = descriptions[i] || '';
        const combined = `${title} ${desc}`.toLowerCase();

        // Check if looks like educational institution or matches query well
        const isEdu =
          eduKeywords.some((k) => combined.includes(k)) ||
          title.toLowerCase().includes(qLower);

        if (isEdu && !resultsMap.has(title.toLowerCase())) {
          resultsMap.set(title.toLowerCase(), {
            name: title,
            description: desc || 'Higher Education Institution',
            source: 'live',
          });
        }
      });
    }
  } catch (err) {
    console.warn('Wikipedia search fetch error:', err);
  }

  // 3. Fallback: Always ensure the exact typed query is available if not already in results
  if (!resultsMap.has(qLower)) {
    resultsMap.set(qLower, {
      name: q,
      description: 'Custom College / University (Select to use)',
      source: 'custom',
    });
  }

  const finalResults = Array.from(resultsMap.values()).slice(0, 10);

  return NextResponse.json({ results: finalResults });
}
