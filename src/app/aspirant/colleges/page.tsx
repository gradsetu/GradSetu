'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  Search, 
  Bookmark, 
  Layers, 
  MapPin, 
  SlidersHorizontal,
  X,
  Award,
  Globe,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  ExternalLink,
  Loader2,
  ArrowRight,
  Database,
  Building2
} from 'lucide-react';
import { RatingStars } from '@/components/shared/RatingStars';

interface SuggestionItem {
  name: string;
  description: string;
  source: 'database' | 'internet';
  collegeId?: string;
}

function CollegeDiscoveryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const { colleges, addCollege, toggleShortlistCollege, isCollegeShortlisted, addToComparison, comparisonCollegeIds } = useApp();

  const [searchQuery, setSearchQuery] = useState(initialQ);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionItems, setSuggestionItems] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [maxFee, setMaxFee] = useState<number>(1500000);
  const [minPlacement, setMinPlacement] = useState<number>(70);
  const [sortBy, setSortBy] = useState<'nirf_rank' | 'avg_package' | 'fee_asc' | 'rating'>('nirf_rank');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  // Live crawler state
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlingTarget, setCrawlingTarget] = useState('');
  const [crawlStep, setCrawlStep] = useState(1);
  const [crawlError, setCrawlError] = useState('');

  const types = [
    'All',
    'IIT',
    'NIT',
    'IIIT',
    'BITS',
    'Medical',
    'Research & Science',
    'Management / B-School',
    'AIIMS',
    'IIM',
    'State University',
    'Central University',
    'Private University'
  ];

  // Derive unique states from loaded colleges
  const states = useMemo(() => {
    const s = new Set<string>();
    colleges.forEach((c) => {
      if (c.state) s.add(c.state);
    });
    return ['All', ...Array.from(s).sort()];
  }, [colleges]);

  // Fetch real-time search suggestions & internet matches
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      setSuggestionItems([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/colleges/suggestions?q=${encodeURIComponent(searchQuery)}`);
        const json = await res.json();
        if (json.success) {
          if (Array.isArray(json.suggestions)) setSuggestions(json.suggestions);
          if (Array.isArray(json.items)) setSuggestionItems(json.items);
        }
      } catch {}
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Crawl and index target college
  const handleCrawlAndIndex = async (targetName: string) => {
    const cleanName = targetName.trim();
    if (!cleanName) return;

    // First check if already exists locally
    const existing = colleges.find(
      (c) =>
        c.name.toLowerCase() === cleanName.toLowerCase() ||
        c.shortName.toLowerCase() === cleanName.toLowerCase() ||
        c.id === cleanName.toLowerCase().replace(/\s+/g, '-')
    );

    if (existing) {
      router.push(`/aspirant/colleges/${existing.id}`);
      return;
    }

    setIsCrawling(true);
    setCrawlingTarget(cleanName);
    setCrawlStep(1);
    setCrawlError('');
    setShowSuggestions(false);

    try {
      // Step progression simulation for realistic feedback
      const stepTimer1 = setTimeout(() => setCrawlStep(2), 1000);
      const stepTimer2 = setTimeout(() => setCrawlStep(3), 2200);

      const res = await fetch('/api/colleges/crawl-and-index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleanName }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      const json = await res.json();

      if (json.success && json.college) {
        setCrawlStep(4);
        addCollege(json.college);
        // Small delay so user sees step 4 completion
        setTimeout(() => {
          setIsCrawling(false);
          router.push(`/aspirant/colleges/${json.college.id}`);
        }, 800);
      } else {
        throw new Error(json.error || 'Failed to crawl and index college');
      }
    } catch (err: any) {
      console.error('Crawl failed:', err);
      setCrawlError(err.message || 'Could not crawl college. Please try again.');
      setIsCrawling(false);
    }
  };

  const filteredColleges = useMemo(() => {
    const list = colleges.filter((college) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        college.name.toLowerCase().includes(q) ||
        college.shortName.toLowerCase().includes(q) ||
        college.city.toLowerCase().includes(q) ||
        college.state.toLowerCase().includes(q) ||
        college.admissionCriteria?.toLowerCase().includes(q) ||
        college.courses?.some((crs) => crs.name.toLowerCase().includes(q));

      const matchesType = selectedType === 'All' || college.type === selectedType;
      const matchesState = selectedState === 'All' || college.state === selectedState;
      const matchesFee = (college.tuitionFeeNum || 0) <= maxFee;
      const matchesPlacement = (college.placementRate || 0) >= minPlacement;

      return matchesSearch && matchesType && matchesState && matchesFee && matchesPlacement;
    });

    // Sorting
    return list.sort((a, b) => {
      if (sortBy === 'nirf_rank') {
        return (a.nirfRank || 999) - (b.nirfRank || 999);
      }
      if (sortBy === 'avg_package') {
        return (b.avgPackageNum || 0) - (a.avgPackageNum || 0);
      }
      if (sortBy === 'fee_asc') {
        return (a.tuitionFeeNum || 0) - (b.tuitionFeeNum || 0);
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [colleges, searchQuery, selectedType, selectedState, maxFee, minPlacement, sortBy]);

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Explore Colleges" 
        subtitle="Discover verified institutions across India with real-time web crawler & genuine metrics" 
      />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-text-primary tracking-tight">
                Pan-India College Search Engine
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <Sparkles size={11} /> Live Web Crawler Enabled
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              Showing {filteredColleges.length} verified institutions. Enter any college worldwide to crawl official data live.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input with Autocomplete & Live Crawler Option */}
            <div className="relative w-full sm:w-96">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim().length > 1) {
                    e.preventDefault();
                    handleCrawlAndIndex(searchQuery);
                  }
                }}
                placeholder="Search any college (e.g. xyz school of technology)..."
                className="w-full pl-9 pr-8 py-2.5 text-xs bg-white border border-border rounded-xl text-text-primary placeholder:text-slate-400 focus:outline-none focus:border-primary shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-text-primary z-10"
                >
                  <X size={14} />
                </button>
              )}

              {/* Autocomplete Dropdown */}
              {showSuggestions && searchQuery.trim().length > 1 && (
                <div 
                  className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-border rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-border/60 max-h-96 overflow-y-auto"
                >
                  {/* Action 1: Direct Crawl Option */}
                  <button
                    onClick={() => handleCrawlAndIndex(searchQuery)}
                    className="w-full p-3 text-left bg-primary-light/40 hover:bg-primary-light transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                        <Globe size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                          <span>Search internet & crawl "{searchQuery}"</span>
                          <span className="text-[10px] bg-primary text-white px-1.5 py-0.2 rounded font-semibold">Live Crawl</span>
                        </div>
                        <p className="text-[11px] text-text-secondary">
                          Reaches official website, fetches courses, fees, placements & creates dashboard
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-primary group-hover:translate-x-0.5 transition" />
                  </button>

                  {/* Discovered Items (Database + Live Web) */}
                  {suggestionItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.collegeId) {
                          router.push(`/aspirant/colleges/${item.collegeId}`);
                        } else {
                          handleCrawlAndIndex(item.name);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-slate-50 flex items-center justify-between transition"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        {item.source === 'database' ? (
                          <Database size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                        ) : (
                          <Globe size={14} className="text-primary mt-0.5 shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="font-semibold text-text-primary truncate">{item.name}</p>
                          <p className="text-[11px] text-text-secondary truncate">{item.description}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ml-2 ${
                        item.source === 'database' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {item.source === 'database' ? 'In DB' : 'Crawl Web'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFiltersModal(!showFiltersModal)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition shadow-sm shrink-0 ${
                showFiltersModal
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-background-secondary'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters & Sort</span>
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
                selectedType === t
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Filters Drawer */}
        {showFiltersModal && (
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5">
                State / Region
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary"
              >
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? 'All States (Pan-India)' : st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-primary mb-1.5 flex items-center gap-1">
                <ArrowUpDown size={12} />
                <span>Sort Results By</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-white border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary"
              >
                <option value="nirf_rank">NIRF National Rank (Top First)</option>
                <option value="avg_package">Average Package (High to Low)</option>
                <option value="fee_asc">Tuition Fee (Lowest First)</option>
                <option value="rating">Student Review Rating</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-text-primary mb-1.5">
                <span>Max Tuition Fee:</span>
                <span className="text-primary font-bold">₹{(maxFee / 100000).toFixed(1)} Lakh/yr</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1500000"
                step="50000"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-text-primary mb-1.5">
                <span>Min Placement:</span>
                <span className="text-primary font-bold">{minPlacement}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="100"
                step="2"
                value={minPlacement}
                onChange={(e) => setMinPlacement(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>
        )}

        {/* Comparison floating pill if items added */}
        {comparisonCollegeIds.length > 0 && (
          <div className="bg-primary-light border border-primary-secondary px-4 py-2.5 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Layers size={16} />
              <span>{comparisonCollegeIds.length} college(s) selected for side-by-side comparison</span>
            </div>
            <Link
              href="/aspirant/compare"
              className="px-3.5 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm hover:bg-primary-dark transition"
            >
              Compare Now
            </Link>
          </div>
        )}

        {/* College Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredColleges.map((college) => {
            const isShortlisted = isCollegeShortlisted(college.id);
            const isCompared = comparisonCollegeIds.includes(college.id);

            return (
              <div
                key={college.id}
                className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary-secondary transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={college.featuredImage}
                      alt={college.name}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-white/95 px-2 py-0.5 rounded text-[11px] font-bold text-text-primary shadow-sm">
                        {college.type}
                      </span>
                      {college.nirfRank ? (
                        <span className="bg-amber-500 text-white px-2 py-0.5 rounded text-[10px] font-bold shadow-sm flex items-center gap-0.5">
                          <Award size={10} /> NIRF #{college.nirfRank}
                        </span>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleShortlistCollege(college.id)}
                      className={`absolute top-3 right-3 p-1.5 rounded-full shadow-sm transition ${
                        isShortlisted
                          ? 'bg-primary text-white'
                          : 'bg-white/90 text-slate-500 hover:text-primary'
                      }`}
                      title={isShortlisted ? 'Remove from shortlist' : 'Shortlist college'}
                    >
                      <Bookmark size={15} className={isShortlisted ? 'fill-white' : ''} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-base text-text-primary truncate" title={college.name}>
                        {college.shortName}
                      </h3>
                      <RatingStars rating={college.rating} reviews={college.reviewCount} />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-2">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{college.city}, {college.state}</span>
                    </div>

                    <p className="text-xs text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                      {college.about}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="bg-background-secondary p-2.5 rounded-xl border border-border/50">
                        <span className="text-[10px] text-text-secondary block">Avg Package</span>
                        <span className="font-bold text-emerald-700">{college.avgPackage}</span>
                      </div>
                      <div className="bg-background-secondary p-2.5 rounded-xl border border-border/50">
                        <span className="text-[10px] text-text-secondary block">Tuition (Yearly)</span>
                        <span className="font-bold text-text-primary">{college.tuitionFeePerYear}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1">
                      <span>Placement: <strong className="text-text-primary">{college.placementRate}%</strong></span>
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 size={11} /> {college.crawlSource || 'Live Indexed'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <Link
                    href={`/aspirant/colleges/${college.id}`}
                    className="flex-1 py-2 text-center text-xs font-bold bg-primary hover:bg-primary-dark text-white rounded-xl shadow-xs transition"
                  >
                    View College & Cutoffs
                  </Link>

                  <button
                    onClick={() => addToComparison(college.id)}
                    className={`px-3 py-2 border rounded-xl text-xs font-semibold transition ${
                      isCompared
                        ? 'bg-primary-light border-primary-secondary text-primary'
                        : 'border-border text-text-secondary hover:bg-background-secondary'
                    }`}
                    title="Compare college"
                  >
                    <Layers size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State with One-Click Live Crawl CTA */}
        {filteredColleges.length === 0 && (
          <div className="bg-white border border-border rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto shadow-inner">
              <Globe size={28} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                {searchQuery ? `Can't find "${searchQuery}" in local records?` : 'No colleges match your current filters'}
              </h3>
              <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                {searchQuery 
                  ? `GradSetu's live web crawler can search the internet for "${searchQuery}", reach its official website, extract all metrics, fees, placement stats, and generate its complete dashboard.`
                  : 'Try loosening your fee range or placement sliders, or search for any institution worldwide.'}
              </p>
            </div>

            {searchQuery && (
              <div className="pt-2">
                <button
                  onClick={() => handleCrawlAndIndex(searchQuery)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition"
                >
                  <Sparkles size={14} />
                  <span>Crawl & Open "{searchQuery}" on GradSetu</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Live Crawl Progress Modal Overlay */}
        {isCrawling && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md">
                  <Globe size={26} className="animate-spin text-white" />
                </div>
                <h3 className="text-lg font-bold text-text-primary">
                  Crawling the Internet
                </h3>
                <p className="text-xs text-text-secondary font-medium">
                  Reaching official website for <span className="font-bold text-primary">"{crawlingTarget}"</span>
                </p>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div className={`flex items-center gap-3 transition ${crawlStep >= 1 ? 'text-text-primary font-bold' : 'text-slate-400'}`}>
                  {crawlStep > 1 ? (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Loader2 size={16} className="animate-spin text-primary shrink-0" />
                  )}
                  <span>1. Searching internet for institutional records...</span>
                </div>

                <div className={`flex items-center gap-3 transition ${crawlStep >= 2 ? 'text-text-primary font-bold' : 'text-slate-400'}`}>
                  {crawlStep > 2 ? (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  ) : crawlStep === 2 ? (
                    <Loader2 size={16} className="animate-spin text-primary shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span>2. Connecting to official university website...</span>
                </div>

                <div className={`flex items-center gap-3 transition ${crawlStep >= 3 ? 'text-text-primary font-bold' : 'text-slate-400'}`}>
                  {crawlStep > 3 ? (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  ) : crawlStep === 3 ? (
                    <Loader2 size={16} className="animate-spin text-primary shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span>3. Extracting courses, placement stats & fees...</span>
                </div>

                <div className={`flex items-center gap-3 transition ${crawlStep >= 4 ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                  {crawlStep >= 4 ? (
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span>4. Generating GradSetu college dashboard...</span>
                </div>
              </div>

              {crawlError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                  {crawlError}
                </div>
              )}

              <p className="text-[11px] text-center text-slate-400">
                Data is indexed and permanently saved to your GradSetu database.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default function ExploreCollegesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-text-secondary">Loading colleges database...</div>}>
      <CollegeDiscoveryContent />
    </Suspense>
  );
}
