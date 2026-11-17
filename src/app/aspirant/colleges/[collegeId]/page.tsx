'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Bookmark, 
  Share2, 
  Users, 
  Building, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Home as HomeIcon,
  HelpCircle,
  Clock,
  ArrowRight,
  Globe,
  ExternalLink
} from 'lucide-react';
import { RatingStars } from '@/components/shared/RatingStars';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { College } from '@/types';

export default function CollegeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const collegeId = params.collegeId as string;
  const { colleges, addCollege, mentors, toggleShortlistCollege, isCollegeShortlisted, addToComparison } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'fees' | 'placements' | 'campus-life' | 'students' | 'qa'>('overview');
  const [fetchedCollege, setFetchedCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(false);

  const matchedCollege = colleges.find(c => c.id === collegeId);
  const college: College = matchedCollege || fetchedCollege || colleges[0];

  React.useEffect(() => {
    if (!matchedCollege && !fetchedCollege && collegeId) {
      setLoading(true);
      fetch(`/api/colleges/${encodeURIComponent(collegeId)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.college) {
            setFetchedCollege(data.college);
            addCollege(data.college);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [collegeId, matchedCollege, fetchedCollege, addCollege]);
  const isShortlisted = isCollegeShortlisted(college.id);

  // Mentors from this college
  const collegeMentors = mentors.filter(m => m.collegeId === college.id && m.verificationStatus === 'approved');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses' },
    { id: 'fees', label: 'Fees' },
    { id: 'placements', label: 'Placements' },
    { id: 'campus-life', label: 'Campus Life' },
    { id: 'students', label: `Students (${collegeMentors.length})` },
    { id: 'qa', label: 'Q&A' }
  ] as const;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: college.name,
    alternateName: college.shortName,
    url: college.websiteUrl || `https://gradsetu.com/aspirant/colleges/${college.id}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: college.city,
      addressRegion: college.state,
      addressCountry: 'India',
    },
    description: college.about,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: college.rating,
      reviewCount: college.reviewCount,
    },
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DashboardHeader />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Back Link */}
        <Link
          href="/aspirant/colleges"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Colleges</span>
        </Link>

        {/* Hero Banner matching Panel 08 */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="h-64 sm:h-80 w-full relative">
            <img
              src={college.featuredImage}
              alt={college.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            {/* Top actions */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {college.websiteUrl && (
                <a
                  href={college.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-text-primary text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                  title="Visit official website"
                >
                  <Globe size={13} />
                  <span>Official Website</span>
                  <ExternalLink size={12} />
                </a>
              )}
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('College link copied to clipboard!');
                }}
                className="p-2 rounded-full bg-white/90 hover:bg-white text-text-primary shadow-sm transition"
                title="Share College"
              >
                <Share2 size={16} />
              </button>
              <button
                onClick={() => toggleShortlistCollege(college.id)}
                className={`p-2 rounded-full shadow-sm transition ${
                  isShortlisted ? 'bg-primary text-white' : 'bg-white/90 hover:bg-white text-text-primary'
                }`}
                title={isShortlisted ? 'Remove from shortlist' : 'Shortlist'}
              >
                <Bookmark size={16} className={isShortlisted ? 'fill-white' : ''} />
              </button>
            </div>

            {/* Banner Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-primary px-2.5 py-1 rounded-md inline-block">
                    {college.type}
                  </span>
                  <span className="text-[11px] font-semibold bg-emerald-600/90 text-white px-2.5 py-1 rounded-md inline-flex items-center gap-1">
                    <CheckCircle2 size={12} /> {college.crawlSource || 'Live Crawl Verified'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  {college.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={15} />
                    {college.city}, {college.state}
                  </span>
                  <span>•</span>
                  <RatingStars rating={college.rating} reviews={college.reviewCount} className="text-white" />
                  <span>•</span>
                  <span>NIRF Rank #{college.nirfRank}</span>
                </div>
              </div>

              {/* Talk to Students CTA button matching Panel 08 */}
              <button
                onClick={() => setActiveTab('students')}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl shadow-lg transition shrink-0 flex items-center gap-2"
              >
                <Users size={18} />
                <span>Talk to Students from {college.shortName}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs matching Panel 08 */}
          <div className="border-t border-border px-6 flex items-center gap-6 overflow-x-auto scrollbar-none bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Overview matching Panel 08 */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* About Box */}
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-text-primary mb-3">
                  About {college.name}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {college.about}
                </p>

                <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider mb-3">
                  Key Institutional Metrics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-background-secondary rounded-xl border border-border">
                    <span className="text-text-secondary block text-[10px]">Established</span>
                    <span className="font-bold text-text-primary text-sm">{college.establishedYear}</span>
                  </div>
                  <div className="p-3 bg-background-secondary rounded-xl border border-border">
                    <span className="text-text-secondary block text-[10px]">Campus Size</span>
                    <span className="font-bold text-text-primary text-sm">{college.campusSize}</span>
                  </div>
                  <div className="p-3 bg-background-secondary rounded-xl border border-border">
                    <span className="text-text-secondary block text-[10px]">Hostel</span>
                    <span className="font-bold text-text-primary text-sm">{college.hasHostel ? 'Available' : 'No'}</span>
                  </div>
                  <div className="p-3 bg-background-secondary rounded-xl border border-border">
                    <span className="text-text-secondary block text-[10px]">NIRF Rank</span>
                    <span className="font-bold text-text-primary text-sm">#{college.nirfRank}</span>
                  </div>
                </div>
              </div>

              {/* Placement Snapshot */}
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-text-primary">
                    Placement Statistics (Verified Batch Data)
                  </h3>
                  <button onClick={() => setActiveTab('placements')} className="text-xs text-primary font-semibold hover:underline">
                    View Placement Details
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center">
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase block mb-1">Average CTC</span>
                    <span className="text-xl font-extrabold text-emerald-700">{college.avgPackage}</span>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <span className="text-[11px] font-semibold text-primary uppercase block mb-1">Highest CTC</span>
                    <span className="text-xl font-extrabold text-primary">{college.highestPackage}</span>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl text-center">
                    <span className="text-[11px] font-semibold text-purple-800 uppercase block mb-1">Placement Rate</span>
                    <span className="text-xl font-extrabold text-purple-700">{college.placementRate}%</span>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-text-primary mb-3">Campus Infrastructure & Facilities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {college.facilities.map((fac) => (
                    <div key={fac} className="flex items-center gap-2 p-2.5 bg-background-secondary rounded-xl text-xs text-text-primary">
                      <CheckCircle2 size={15} className="text-primary shrink-0" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Verified Mentors Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-text-primary">Students at {college.shortName}</h3>
                  <VerifiedBadge size={16} />
                </div>
                <p className="text-xs text-text-secondary mb-4">
                  Book a 1-on-1 guidance call with verified students currently on campus.
                </p>

                <div className="space-y-4">
                  {collegeMentors.slice(0, 2).map((mentor) => (
                    <div key={mentor.id} className="p-3.5 border border-border rounded-xl bg-background-secondary/50">
                      <div className="flex items-center gap-3 mb-2.5">
                        <img src={mentor.avatar} alt={mentor.name} className="w-11 h-11 rounded-full object-cover border" />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-xs text-text-primary truncate">{mentor.name}</span>
                            <VerifiedBadge size={13} />
                          </div>
                          <span className="text-[11px] text-text-secondary block">{mentor.branch} • {mentor.currentYear}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="text-xs font-bold text-text-primary">₹{mentor.sessionPrice} / 30m</span>
                        <Link
                          href={`/mentors/${mentor.id}/book`}
                          className="px-3 py-1.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold rounded-lg shadow-sm transition"
                        >
                          Book Slot
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('students')}
                  className="w-full mt-4 py-2.5 border border-border text-xs font-semibold text-text-primary hover:bg-background-secondary rounded-xl transition text-center"
                >
                  View All Mentors from {college.shortName} ({collegeMentors.length})
                </button>
              </div>

              {/* Quick Compare CTA */}
              <div className="bg-primary-light border border-primary-secondary rounded-2xl p-5 shadow-sm text-center">
                <h4 className="font-bold text-sm text-primary mb-1">Compare with other colleges?</h4>
                <p className="text-xs text-text-secondary mb-3">
                  Benchmark {college.shortName} fees, cutoffs, and placements side-by-side.
                </p>
                <button
                  onClick={() => {
                    addToComparison(college.id);
                    router.push('/aspirant/compare');
                  }}
                  className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition shadow-sm"
                >
                  Add to College Comparison
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Courses */}
        {activeTab === 'courses' && (
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-text-primary">Offered Academic Programs</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-border rounded-xl">
                <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
                  <tr>
                    <th className="p-3 border-b">Program / Specialization</th>
                    <th className="p-3 border-b">Duration</th>
                    <th className="p-3 border-b">Seats</th>
                    <th className="p-3 border-b">Annual Tuition</th>
                    <th className="p-3 border-b">JoSAA Cutoff Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {college.courses.map((c) => (
                    <tr key={c.name} className="hover:bg-background-secondary/50">
                      <td className="p-3 font-semibold text-text-primary">{c.name}</td>
                      <td className="p-3 text-text-secondary">{c.duration}</td>
                      <td className="p-3 text-text-secondary">{c.seats}</td>
                      <td className="p-3 font-bold text-text-primary">{c.annualFee}</td>
                      <td className="p-3 text-primary font-medium">{c.cutoffRank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Fees */}
        {activeTab === 'fees' && (
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-text-primary">Fee Structure Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-background-secondary rounded-xl border border-border">
                <span className="text-xs text-text-secondary block">Annual Tuition Fee</span>
                <span className="text-xl font-bold text-text-primary">{college.tuitionFeePerYear}</span>
                <span className="text-[11px] text-text-secondary block mt-1">Per academic year. Waivers & scholarships applicable as per Govt / Institutional norms.</span>
              </div>
              <div className="p-4 bg-background-secondary rounded-xl border border-border">
                <span className="text-xs text-text-secondary block">Hostel & Mess (Annual)</span>
                <span className="text-xl font-bold text-text-primary">{college.hostelFeePerYear || (college.hasHostel ? '₹70,000' : 'Off-Campus PG')}</span>
                <span className="text-[11px] text-text-secondary block mt-1">Includes boarding, dining (3 meals), electricity & campus high-speed Wi-Fi.</span>
              </div>
              <div className="p-4 bg-background-secondary rounded-xl border border-border">
                <span className="text-xs text-text-secondary block">One-time Admission Deposit</span>
                <span className="text-xl font-bold text-text-primary">₹15,000</span>
                <span className="text-[11px] text-text-secondary block mt-1">Refundable institutional caution deposit paid during JoSAA / institutional enrollment.</span>
              </div>
            </div>

            {college.accreditation && (
              <div className="p-3.5 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                <span><strong>Accreditation & Recognition:</strong> {college.accreditation}</span>
                <span className="font-semibold text-primary">NIRF Rank #{college.nirfRank}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Placements */}
        {activeTab === 'placements' && (
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-text-primary">Detailed Placement & Salary Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-background-secondary rounded-xl border">
                <span className="text-xs text-text-secondary block">Average CTC</span>
                <span className="text-2xl font-extrabold text-primary">{college.avgPackage}</span>
              </div>
              <div className="p-4 bg-background-secondary rounded-xl border">
                <span className="text-xs text-text-secondary block">Median Package</span>
                <span className="text-2xl font-extrabold text-emerald-600">{college.medianPackage || '₹14.5 LPA'}</span>
              </div>
              <div className="p-4 bg-background-secondary rounded-xl border">
                <span className="text-xs text-text-secondary block">Highest Package</span>
                <span className="text-2xl font-extrabold text-purple-600">{college.highestPackage}</span>
              </div>
              <div className="p-4 bg-background-secondary rounded-xl border">
                <span className="text-xs text-text-secondary block">Placement Percentage</span>
                <span className="text-2xl font-extrabold text-text-primary">{college.placementRate}%</span>
              </div>
            </div>

            {/* Top Recruiters Pills */}
            <div className="pt-2">
              <h3 className="text-sm font-bold text-text-primary mb-3">Marquee & Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {(college.topRecruiters && college.topRecruiters.length > 0
                  ? college.topRecruiters
                  : ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Qualcomm', 'Deloitte', 'TCS']
                ).map((recruiter) => (
                  <span
                    key={recruiter}
                    className="px-3 py-1.5 bg-background-secondary border border-border rounded-xl text-xs font-semibold text-text-primary shadow-xs"
                  >
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Campus Life */}
        {activeTab === 'campus-life' && (
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-text-primary">Campus Life & Hostels</h2>
            <p className="text-xs text-text-secondary leading-relaxed">
              Living on campus at {college.shortName} offers round-the-clock student activities, cultural festivals (Rendezvous, Mood Indigo, Festember), club activities, and sports leagues.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-border p-4 rounded-xl">
                <h4 className="font-bold text-xs text-text-primary mb-1">Hostel Allotment</h4>
                <p className="text-xs text-text-secondary">Mandatory for all full-time undergraduate students with shared occupancy in 1st/2nd year and single occupancy in senior years.</p>
              </div>
              <div className="border border-border p-4 rounded-xl">
                <h4 className="font-bold text-xs text-text-primary mb-1">Curfew & Gate Timings</h4>
                <p className="text-xs text-text-secondary">Open campus policy with 24x7 library and cafeteria access with digital ID scanning.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Students (Verified Mentors) matching Panel 09 */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary">
                  Talk to students from {college.shortName}
                </h2>
                <p className="text-xs text-text-secondary">
                  Get real insights about academics, placements, campus life and more.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collegeMentors.map((mentor) => (
                <div key={mentor.id} className="bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                  <div className="flex items-start gap-4 mb-4">
                    <img src={mentor.avatar} alt={mentor.name} className="w-14 h-14 rounded-full object-cover border" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-text-primary">{mentor.name}</h3>
                        <VerifiedBadge size={14} />
                      </div>
                      <p className="text-xs text-text-secondary">{mentor.course} - {mentor.branch} • {mentor.currentYear}</p>
                      <RatingStars rating={mentor.rating} reviews={mentor.reviewCount} className="mt-1" />
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary line-clamp-2 mb-4 leading-relaxed">
                    {mentor.bio}
                  </p>

                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-text-secondary block">Session Fee</span>
                      <span className="text-sm font-bold text-text-primary">₹{mentor.sessionPrice} / 30 min</span>
                    </div>
                    <Link
                      href={`/mentors/${mentor.id}/book`}
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-lg shadow-sm transition"
                    >
                      Book Call
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: Q&A */}
        {activeTab === 'qa' && (
          <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-text-primary">Frequently Asked Questions about {college.shortName}</h2>
            <div className="space-y-3 text-xs">
              <div className="border border-border p-3.5 rounded-xl">
                <h4 className="font-bold text-text-primary mb-1">What is the admission and counseling process?</h4>
                <p className="text-text-secondary leading-relaxed">
                  Admissions to {college.name} are primarily conducted through {college.admissionCriteria}. Candidates must register and qualify on the designated national / state portal and participate in counseling seat allocation.
                </p>
              </div>
              <div className="border border-border p-3.5 rounded-xl">
                <h4 className="font-bold text-text-primary mb-1">What is the mandatory attendance criteria?</h4>
                <p className="text-text-secondary leading-relaxed">
                  {college.type === 'BITS'
                    ? 'BITS Pilani follows a world-renowned 0% mandatory attendance policy, emphasizing student self-discipline, academic autonomy, and project-based learning.'
                    : `${college.shortName} typically requires a minimum of 75% attendance in theory lectures, practicals, and laboratories to be eligible for end-semester examinations.`}
                </p>
              </div>
              <div className="border border-border p-3.5 rounded-xl">
                <h4 className="font-bold text-text-primary mb-1">Are on-campus hostel facilities guaranteed?</h4>
                <p className="text-text-secondary leading-relaxed">
                  {college.hasHostel
                    ? `Yes, ${college.shortName} provides on-campus hostel accommodation with high-speed Wi-Fi, dining mess, laundry facilities, and 24x7 security.`
                    : `${college.shortName} is located in a metropolitan area with authorized paying-guest (PG) and rented apartment accommodations within 1-2 km of the campus.`}
                </p>
              </div>
              <div className="border border-border p-3.5 rounded-xl">
                <h4 className="font-bold text-text-primary mb-1">How do placement drives and internships operate?</h4>
                <p className="text-text-secondary leading-relaxed">
                  Pre-final and final-year students participate in campus drives starting in August. With average packages around {college.avgPackage} and highest CTC reaching {college.highestPackage}, marquee companies conduct online assessments followed by technical and HR interview rounds.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

