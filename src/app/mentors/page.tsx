'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { Search, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { RatingStars } from '@/components/shared/RatingStars';

export default function MentorMarketplacePage() {
  const { mentors, colleges } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating'>('recommended');

  const branches = ['All', 'Computer Science', 'Electronics', 'Mechanical', 'Chemical', 'Electrical'];

  // Only admin approved mentors are shown in public marketplace!
  const approvedMentors = useMemo(() => {
    return mentors.filter(m => m.verificationStatus === 'approved');
  }, [mentors]);

  const filteredMentors = useMemo(() => {
    let result = approvedMentors.filter((m) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.collegeName.toLowerCase().includes(q) ||
        m.branch.toLowerCase().includes(q);

      const matchesBranch = selectedBranch === 'All' || m.branch.toLowerCase().includes(selectedBranch.toLowerCase());
      const matchesCollege = selectedCollege === 'All' || m.collegeId === selectedCollege;

      return matchesSearch && matchesBranch && matchesCollege;
    });

    if (sortBy === 'price_low') {
      result.sort((a, b) => a.sessionPrice - b.sessionPrice);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.sessionPrice - a.sessionPrice);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [approvedMentors, searchQuery, selectedBranch, selectedCollege, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background-secondary">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Header matching Panel 09 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Verified Student Mentors
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} />
                100% ID Audited
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Talk to students from premier colleges
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              Get real insights about academics, placements, campus life, hostels and entrance preparation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentor, college, branch..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-border rounded-xl text-text-primary focus:outline-none focus:border-primary shadow-sm"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-white border border-border rounded-xl text-text-primary font-medium shadow-sm"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Sort: Highest Rating</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Branch Filters matching Panel 09 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {branches.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
                selectedBranch === b
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white border border-border text-text-secondary hover:text-text-primary'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Mentor Cards List matching Panel 09 */}
        <div className="space-y-4">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:border-primary-secondary transition flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="flex items-start gap-4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full object-cover border border-border shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/mentors/${mentor.id}`}
                      className="font-bold text-base text-text-primary hover:text-primary transition"
                    >
                      {mentor.name}
                    </Link>
                    <VerifiedBadge size={16} />
                  </div>

                  <p className="text-xs text-text-secondary font-medium">
                    {mentor.course} - {mentor.branch} • <span className="text-primary font-semibold">{mentor.collegeName}</span> • {mentor.currentYear}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mentor.expertise.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium bg-background-secondary text-text-secondary px-2.5 py-0.5 rounded-md border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-text-secondary pt-1 line-clamp-1 max-w-2xl">
                    {mentor.bio}
                  </p>
                </div>
              </div>

              {/* Right Pricing & Actions matching Panel 09 */}
              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-border shrink-0 gap-3">
                <div className="text-left md:text-right">
                  <RatingStars rating={mentor.rating} reviews={mentor.reviewCount} />
                  <div className="text-base font-extrabold text-text-primary mt-1">
                    ₹{mentor.sessionPrice} <span className="text-xs font-normal text-text-secondary">/ 30 min</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/mentors/${mentor.id}`}
                    className="px-3.5 py-2 border border-border text-xs font-semibold text-text-secondary hover:text-text-primary rounded-xl transition"
                  >
                    View Profile
                  </Link>

                  <Link
                    href={`/mentors/${mentor.id}/book`}
                    className="px-5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-sm transition"
                  >
                    Book Call
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="bg-white border border-border rounded-2xl p-12 text-center max-w-md mx-auto">
            <Search size={32} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-base text-text-primary">No verified mentors found</h3>
            <p className="text-xs text-text-secondary mt-1 mb-4">
              Try choosing another branch or clearing your search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBranch('All');
                setSelectedCollege('All');
              }}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

