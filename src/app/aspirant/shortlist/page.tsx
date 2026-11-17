'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Bookmark, MapPin, Trash2, Layers, Search, ArrowRight } from 'lucide-react';
import { RatingStars } from '@/components/shared/RatingStars';

export default function ShortlistPage() {
  const { colleges, aspirantProfile, toggleShortlistCollege, addToComparison } = useApp();

  const shortlistedColleges = colleges.filter(c => 
    aspirantProfile.shortlistedCollegeIds.includes(c.id)
  );

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Saved Colleges" 
        subtitle="Manage and track your shortlisted target universities" 
      />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              My Shortlist ({shortlistedColleges.length})
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Colleges you have saved for upcoming admission cycles.
            </p>
          </div>

          <Link
            href="/aspirant/colleges"
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition shadow-sm"
          >
            + Add More Colleges
          </Link>
        </div>

        {shortlistedColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shortlistedColleges.map((college) => (
              <div
                key={college.id}
                className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 w-full relative">
                    <img src={college.featuredImage} alt={college.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleShortlistCollege(college.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white text-red-500 hover:bg-red-50 rounded-full shadow-sm transition"
                      title="Remove from shortlist"
                    >
                      <Trash2 size={15} />
                    </button>
                    <span className="absolute bottom-3 left-3 bg-white/95 px-2 py-0.5 rounded text-[10px] font-bold text-text-primary">
                      {college.type}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-bold text-base text-text-primary truncate">{college.shortName}</h3>
                      <RatingStars rating={college.rating} reviews={college.reviewCount} />
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-3">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{college.city}, {college.state}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div className="p-2 bg-background-secondary rounded-lg">
                        <span className="text-[10px] text-text-secondary block">Avg Package</span>
                        <span className="font-bold text-text-primary">{college.avgPackage}</span>
                      </div>
                      <div className="p-2 bg-background-secondary rounded-lg">
                        <span className="text-[10px] text-text-secondary block">Tuition / yr</span>
                        <span className="font-bold text-text-primary">{college.tuitionFeePerYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => addToComparison(college.id)}
                    className="py-2 text-xs font-semibold rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-background-secondary transition flex items-center justify-center gap-1"
                  >
                    <Layers size={13} />
                    <span>Compare</span>
                  </button>

                  <Link
                    href={`/aspirant/colleges/${college.id}`}
                    className="py-2 text-xs font-semibold rounded-lg bg-primary hover:bg-primary-dark text-white text-center transition shadow-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-border rounded-2xl p-12 text-center max-w-md mx-auto">
            <Bookmark size={32} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-base text-text-primary">Your shortlist is empty</h3>
            <p className="text-xs text-text-secondary mt-1 mb-4">
              Explore colleges and click the bookmark icon on any college card to save it here.
            </p>
            <Link
              href="/aspirant/colleges"
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg inline-block"
            >
              Explore Colleges
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}

