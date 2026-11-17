'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  Plus, 
  X, 
  FileText, 
  Check, 
  MapPin, 
  Award, 
  ArrowRight, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { RatingStars } from '@/components/shared/RatingStars';

export default function CompareCollegesPage() {
  const router = useRouter();
  const { colleges, comparisonCollegeIds, removeFromComparison, addToComparison } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);

  const selectedColleges = colleges.filter(c => comparisonCollegeIds.includes(c.id));

  // Compute calculated metrics
  const lowestFeeCollege = [...selectedColleges].sort((a, b) => a.tuitionFeeNum - b.tuitionFeeNum)[0];
  const highestAvgPkgCollege = [...selectedColleges].sort((a, b) => b.avgPackageNum - a.avgPackageNum)[0];
  const highestPlacementCollege = [...selectedColleges].sort((a, b) => b.placementRate - a.placementRate)[0];
  const highestRatingCollege = [...selectedColleges].sort((a, b) => b.rating - a.rating)[0];

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Compare Colleges" 
        subtitle="Unbiased side-by-side matrix of cutoffs, packages, and fees" 
      />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Header matching Panel 14 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Compare Colleges
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Compare multiple colleges side by side and choose the best fit.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {selectedColleges.length > 0 && (
              <Link
                href="/aspirant/compare/report"
                className="px-4 py-2 bg-primary-light border border-primary-secondary text-primary hover:bg-primary-secondary text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-sm"
              >
                <FileText size={15} />
                <span>Export Report</span>
              </Link>
            )}

            <button
              type="button"
              disabled={selectedColleges.length >= 4}
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Add College ({selectedColleges.length}/4)</span>
            </button>
          </div>
        </div>

        {/* Highlight Insights Bar */}
        {selectedColleges.length >= 2 && (
          <div className="bg-white border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-1.5 mb-3 text-xs font-bold text-text-primary uppercase tracking-wider">
              <Sparkles size={15} className="text-primary" />
              <span>Comparison Highlights & Data Verdicts</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <span className="text-[10px] text-emerald-800 font-semibold block uppercase">Most Affordable</span>
                <span className="font-bold text-emerald-900 text-sm mt-0.5 block">{lowestFeeCollege?.shortName}</span>
                <span className="text-[11px] text-emerald-700">{lowestFeeCollege?.tuitionFeePerYear}/yr</span>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <span className="text-[10px] text-primary font-semibold block uppercase">Highest Average CTC</span>
                <span className="font-bold text-blue-900 text-sm mt-0.5 block">{highestAvgPkgCollege?.shortName}</span>
                <span className="text-[11px] text-primary">{highestAvgPkgCollege?.avgPackage}</span>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl">
                <span className="text-[10px] text-purple-800 font-semibold block uppercase">Top Placement Rate</span>
                <span className="font-bold text-purple-900 text-sm mt-0.5 block">{highestPlacementCollege?.shortName}</span>
                <span className="text-[11px] text-purple-700">{highestPlacementCollege?.placementRate}% placed</span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <span className="text-[10px] text-amber-800 font-semibold block uppercase">Highest Rated</span>
                <span className="font-bold text-amber-900 text-sm mt-0.5 block">{highestRatingCollege?.shortName}</span>
                <span className="text-[11px] text-amber-700">★ {highestRatingCollege?.rating} / 5</span>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Table matching Panel 14 */}
        {selectedColleges.length > 0 ? (
          <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="sm:hidden px-4 py-2 bg-primary-light/60 border-b border-primary-secondary text-[11px] font-semibold text-primary flex items-center justify-between">
              <span>Swipe horizontally to compare colleges →</span>
              <span>{selectedColleges.length} selected</span>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full text-left text-xs border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-border bg-background-secondary/60">
                    <th className="p-4 w-40 sm:w-48 font-bold text-text-secondary uppercase tracking-wider text-[11px] sticky left-0 bg-background-secondary/90 backdrop-blur-xs z-10 border-r border-border/50">
                      Colleges
                    </th>
                    {selectedColleges.map((c) => (
                      <th key={c.id} className="p-4 min-w-[180px] sm:min-w-[200px] align-top">
                        <div className="relative group">
                          <button
                            type="button"
                            onClick={() => removeFromComparison(c.id)}
                            className="absolute -top-1 -right-1 p-1 bg-white border border-border rounded-full hover:bg-red-50 hover:text-red-600 transition shadow-xs"
                            title="Remove college"
                          >
                            <X size={13} />
                          </button>
                          <img
                            src={c.featuredImage}
                            alt={c.name}
                            className="w-full h-24 rounded-xl object-cover mb-2 border border-border"
                          />
                          <h3 className="font-bold text-sm text-text-primary">{c.shortName}</h3>
                          <p className="text-[11px] text-text-secondary">{c.city}, {c.state}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {/* Row: Location */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Location</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 text-text-primary font-medium">
                        {c.city}, {c.state}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Tuition Fees */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Tuition Fees (per year)</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 font-bold text-text-primary text-sm">
                        {c.tuitionFeePerYear}
                        {c.id === lowestFeeCollege.id && (
                          <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                            Lowest
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Avg Package */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Avg. Package</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 font-bold text-primary text-sm">
                        {c.avgPackage}
                        {c.id === highestAvgPkgCollege.id && (
                          <span className="ml-2 text-[10px] bg-blue-100 text-primary px-1.5 py-0.5 rounded font-bold">
                            Highest
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Highest Package */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Highest Package</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 font-bold text-text-primary">
                        {c.highestPackage}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Placement Rate */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Placement Rate</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 font-bold text-text-primary">
                        {c.placementRate}%
                      </td>
                    ))}
                  </tr>

                  {/* Row: Hostel */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Hostel Available</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 text-emerald-700 font-bold">
                        {c.hasHostel ? 'Yes' : 'No'}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Student Rating */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Student Rating</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <RatingStars rating={c.rating} reviews={c.reviewCount} />
                      </td>
                    ))}
                  </tr>

                  {/* Row: Institutional Type & Rank */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Institutional Category</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 font-medium text-text-primary">
                        {c.type} (NIRF #{c.nirfRank})
                      </td>
                    ))}
                  </tr>

                  {/* Row: Admission Criteria */}
                  <tr className="hover:bg-background-secondary/40">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-white z-10 border-r border-border/50">Admission Pathway</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4 text-text-secondary">
                        {c.admissionCriteria}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Action Buttons */}
                  <tr className="bg-background-secondary/30">
                    <td className="p-4 font-semibold text-text-secondary sticky left-0 bg-background-secondary/50 z-10 border-r border-border/50">Action</td>
                    {selectedColleges.map((c) => (
                      <td key={c.id} className="p-4">
                        <Link
                          href={`/aspirant/colleges/${c.id}`}
                          className="w-full text-center py-2 px-3 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-lg transition block shadow-sm"
                        >
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-border rounded-2xl p-12 text-center max-w-md mx-auto">
            <h3 className="font-bold text-base text-text-primary">No colleges in comparison</h3>
            <p className="text-xs text-text-secondary mt-1 mb-4">
              Click &quot;Add College&quot; above to select up to 4 colleges to compare side-by-side.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg"
            >
              Select Colleges
            </button>
          </div>
        )}

        {/* Modal to Add College */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-text-primary">Add College to Compare</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-text-primary">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto divide-y divide-border">
                {colleges.map((col) => {
                  const isAdded = comparisonCollegeIds.includes(col.id);
                  return (
                    <div key={col.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={col.featuredImage} alt={col.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="font-semibold text-xs text-text-primary">{col.shortName}</div>
                          <div className="text-[10px] text-text-secondary">{col.city}, {col.state}</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() => {
                          addToComparison(col.id);
                          setShowAddModal(false);
                        }}
                        className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                          isAdded
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-primary-dark'
                        }`}
                      >
                        {isAdded ? 'Added' : '+ Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

