'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/context/AppContext';
import { 
  GraduationCap, 
  Users, 
  Search, 
  CheckCircle, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  School
} from 'lucide-react';
import { RatingStars } from '@/components/shared/RatingStars';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';

export default function LandingPage() {
  const router = useRouter();
  const { colleges, mentors } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const approvedMentors = mentors.filter(m => m.verificationStatus === 'approved');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/aspirant/colleges?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/aspirant/colleges');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary-secondary text-primary text-xs font-semibold">
                <Sparkles size={14} className="text-primary" />
                <span>Real Students. Real College Insights.</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.15]">
                Find your college.<br />
                <span className="text-primary">Hear it from someone who’s there.</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                Explore colleges, talk to verified students, compare your options and make a confident decision.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative flex items-center max-w-xl">
                <div className="relative w-full">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search college, course or city..."
                    className="w-full pl-11 pr-28 py-3.5 bg-background-secondary border border-border rounded-xl text-sm text-text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white font-medium text-sm px-5 py-2.5 rounded-lg transition shadow-sm"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Two CTA Action Cards matching panel 01 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-xl">
                {/* Aspirant Card */}
                <Link
                  href="/aspirant/colleges"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-primary text-white hover:bg-primary-dark transition shadow-sm group"
                >
                  <div className="w-11 h-11 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">I’m an Aspirant</div>
                    <div className="text-xs text-white/80">Find & Compare Colleges</div>
                  </div>
                  <ArrowRight size={16} className="ml-auto opacity-70 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Mentor Card */}
                <Link
                  href="/signup/mentor"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-primary-secondary hover:border-primary text-text-primary transition shadow-sm group"
                >
                  <div className="w-11 h-11 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                    <Users size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">I’m a College Student</div>
                    <div className="text-xs text-text-secondary">Become a Mentor & Guide</div>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-slate-400 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                </Link>
              </div>
            </div>

            {/* Right Hero Image matching panel 01 */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-slate-100 aspect-[4/3] sm:aspect-[5/4] relative">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                    alt="Indian university students smiling together on campus"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Trust Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-border shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-text-primary">100% ID Verified Mentors</div>
                        <div className="text-[11px] text-text-secondary">Verified through official college ID cards</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary">Learn more</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Stats Bar matching panel 01 */}
          <div className="mt-16 pt-8 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">65,460+</div>
              <div className="text-xs sm:text-sm font-medium text-text-secondary">Colleges Covered</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">7,200+</div>
              <div className="text-xs sm:text-sm font-medium text-text-secondary">Verified Students</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">10,000+</div>
              <div className="text-xs sm:text-sm font-medium text-text-secondary">Guidance Calls</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">4.8/5</div>
              <div className="text-xs sm:text-sm font-medium text-text-secondary">Student Rating</div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
              Simple 4-Step Process
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              How GradSetu Works
            </p>
            <p className="text-sm text-text-secondary mt-2">
              From college discovery to authentic 1-on-1 senior advice in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-base mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-text-primary mb-2">Explore Colleges</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Browse detailed placement packages, fees, hostels, cutoffs, and campus facilities across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-base mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-text-primary mb-2">Discover Verified Mentors</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Connect with active seniors currently studying in your target branch and university.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-base mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-text-primary mb-2">Book a Guidance Call</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Schedule a 30-minute private 1-on-1 video call to get uncensored answers about exams, hostels, and culture.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-base mb-4">
                4
              </div>
              <h3 className="font-bold text-base text-text-primary mb-2">Make an Informed Decision</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Compare colleges side-by-side and export downloadable comparison reports for your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Colleges Section */}
      <section className="py-16 md:py-24 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                Top Institutions
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Featured Colleges
              </p>
            </div>
            <Link
              href="/aspirant/colleges"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition"
            >
              <span>Explore all colleges</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {colleges.slice(0, 3).map((college) => (
              <div
                key={college.id}
                className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:border-primary-secondary transition flex flex-col"
              >
                <div className="h-44 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={college.featuredImage}
                    alt={college.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 px-2 py-0.5 rounded text-xs font-semibold text-text-primary shadow-sm">
                    {college.type}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-bold text-base text-text-primary line-clamp-1">
                        {college.name}
                      </h3>
                    </div>
                    <p className="text-xs text-text-secondary mb-3">
                      {college.city}, {college.state}
                    </p>

                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-border text-xs">
                      <RatingStars rating={college.rating} reviews={college.reviewCount} />
                      <span className="text-text-secondary font-medium">NIRF #{college.nirfRank}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="bg-background-secondary p-2 rounded-lg">
                        <span className="text-text-secondary block text-[10px]">Avg. Package</span>
                        <span className="font-bold text-text-primary">{college.avgPackage}</span>
                      </div>
                      <div className="bg-background-secondary p-2 rounded-lg">
                        <span className="text-text-secondary block text-[10px]">Tuition (Yr)</span>
                        <span className="font-bold text-text-primary">{college.tuitionFeePerYear}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/aspirant/colleges/${college.id}`}
                    className="w-full text-center py-2.5 bg-primary-light hover:bg-primary-secondary text-primary font-semibold text-xs rounded-lg transition"
                  >
                    View College Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors Section matching Panel 09 & 10 */}
      <section className="py-16 md:py-24 bg-background-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-1">
                Verified Students
              </h2>
              <p className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Talk to Seniors on Campus
              </p>
            </div>
            <Link
              href="/mentors"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition"
            >
              <span>View all mentors</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {approvedMentors.slice(0, 3).map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white border border-border rounded-xl p-5 shadow-sm hover:border-primary-secondary transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-full object-cover border border-border"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h3 className="font-bold text-sm text-text-primary truncate">
                          {mentor.name}
                        </h3>
                        <VerifiedBadge size={15} />
                      </div>
                      <p className="text-xs text-text-secondary truncate">
                        {mentor.course} - {mentor.branch}
                      </p>
                      <p className="text-xs font-medium text-primary truncate">
                        {mentor.collegeName} • {mentor.currentYear}
                      </p>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {mentor.expertise.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium bg-background-secondary text-text-secondary px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <div>
                    <RatingStars rating={mentor.rating} reviews={mentor.reviewCount} />
                    <span className="text-xs font-bold text-text-primary mt-0.5 block">
                      ₹{mentor.sessionPrice} <span className="font-normal text-[11px] text-text-secondary">/ 30 min</span>
                    </span>
                  </div>
                  <Link
                    href={`/mentors/${mentor.id}/book`}
                    className="bg-primary hover:bg-primary-dark text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
                  >
                    Book Call
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Banner */}
      <section className="py-14 bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary">
            Student Identity Verification Guarantee
          </h2>
          <p className="text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Every student mentor on GradSetu must provide an authentic College Identity Card or Bonafide Certificate before taking guidance sessions. Private identity documents are manually audited and never displayed publicly.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

