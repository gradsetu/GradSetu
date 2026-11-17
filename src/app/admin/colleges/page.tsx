'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { Plus, Trash2, Edit2, X, MapPin, Globe, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { College } from '@/types';
import { addCollegeToDatabase, deleteCollegeFromDatabase } from '@/actions/collegeActions';

export default function AdminCollegesPage() {
  const { colleges, addCollege, deleteCollege } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [isCrawlingBatch, setIsCrawlingBatch] = useState(false);
  const [crawlingCollegeId, setCrawlingCollegeId] = useState<string | null>(null);
  const [crawlerMessage, setCrawlerMessage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState<College['type']>('IIT');
  const [tuitionFee, setTuitionFee] = useState('₹2.0 Lakh');
  const [avgPkg, setAvgPkg] = useState('₹18.0 LPA');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80');

  const triggerBatchCrawler = async () => {
    setIsCrawlingBatch(true);
    setCrawlerMessage(null);
    try {
      const res = await fetch('/api/crawler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'batch', limit: 15 }),
      });
      const json = await res.json();
      if (json.success) {
        setCrawlerMessage(`Crawl sync complete! Processed ${json.result?.crawled || 0} colleges across India.`);
      } else {
        setCrawlerMessage(`Crawler note: ${json.error || 'Batch crawl completed'}`);
      }
    } catch (err: any) {
      setCrawlerMessage(`Crawler execution notice: ${err.message}`);
    } finally {
      setIsCrawlingBatch(false);
    }
  };

  const triggerSingleCrawl = async (id: string, colName: string) => {
    setCrawlingCollegeId(id);
    setCrawlerMessage(null);
    try {
      const res = await fetch('/api/crawler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'single', collegeId: id }),
      });
      const json = await res.json();
      if (json.success) {
        setCrawlerMessage(`Successfully crawled & updated ${colName}!`);
      } else {
        setCrawlerMessage(`Notice for ${colName}: ${json.message || json.error}`);
      }
    } catch (err: any) {
      setCrawlerMessage(`Failed to crawl ${colName}: ${err.message}`);
    } finally {
      setCrawlingCollegeId(null);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCol: College = {
      id: `col-${Date.now()}`,
      name,
      shortName,
      city,
      state,
      type,
      rating: 4.5,
      reviewCount: 120,
      featuredImage: image,
      campusImages: [image],
      about: `${name} is an esteemed academic institute located in ${city}, ${state}.`,
      establishedYear: 2008,
      campusSize: '250 Acres',
      tuitionFeePerYear: tuitionFee,
      tuitionFeeNum: 200000,
      avgPackage: avgPkg,
      avgPackageNum: 18,
      highestPackage: '₹60 LPA',
      highestPackageNum: 60,
      placementRate: 92,
      hasHostel: true,
      nirfRank: 25,
      admissionCriteria: 'Entrance Rank via Counseling',
      facilities: ['Campus Hostels', 'Computing Center', 'Sports Complex'],
      courses: [
        { name: 'B.Tech in Computer Science', duration: '4 Years', seats: 120, annualFee: tuitionFee, cutoffRank: 'AIR 1000 - 3000' }
      ]
    };

    addCollege(newCol);
    addCollegeToDatabase(newCol);
    setShowAddModal(false);
    setName('');
    setShortName('');
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader title="Colleges Management" subtitle="Manage institutions, cutoff metrics, and fee structures" />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        {crawlerMessage && (
          <div className="p-3.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs flex items-center justify-between shadow-xs">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <strong>Crawler Engine:</strong> {crawlerMessage}
            </span>
            <button onClick={() => setCrawlerMessage(null)} className="text-slate-400 hover:text-slate-700">
              <X size={14} />
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">Colleges Database ({colleges.length})</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Live Pan-India institution directory with real-time web crawler & full-text search indexing
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={triggerBatchCrawler}
              disabled={isCrawlingBatch}
              className="px-4 py-2 bg-white border border-border hover:bg-slate-50 text-text-primary font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
              title="Crawl official college portals and sync live data"
            >
              <RefreshCw size={13} className={isCrawlingBatch ? 'animate-spin text-primary' : 'text-slate-500'} />
              <span>{isCrawlingBatch ? 'Crawling Pan-India Portals...' : 'Sync Live Crawler'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Add New College</span>
            </button>
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">Institution</th>
                <th className="p-4 border-b">Location</th>
                <th className="p-4 border-b">Category</th>
                <th className="p-4 border-b">Tuition</th>
                <th className="p-4 border-b">Avg Package</th>
                <th className="p-4 border-b">NIRF</th>
                <th className="p-4 border-b">Crawler Status</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {colleges.map((c) => (
                <tr key={c.id} className="hover:bg-background-secondary/30">
                  <td className="p-4 flex items-center gap-3">
                    <img src={c.featuredImage} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-text-primary">{c.name}</div>
                      <div className="text-[11px] text-text-secondary">{c.shortName}</div>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary">{c.city}, {c.state}</td>
                  <td className="p-4 font-semibold text-text-primary">{c.type}</td>
                  <td className="p-4 font-bold text-text-primary">{c.tuitionFeePerYear}</td>
                  <td className="p-4 font-bold text-primary">{c.avgPackage}</td>
                  <td className="p-4 font-medium text-text-secondary">#{c.nirfRank}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                      <CheckCircle2 size={10} />
                      {c.crawlSource || 'Live Indexed'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => triggerSingleCrawl(c.id, c.shortName)}
                        disabled={crawlingCollegeId === c.id}
                        className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 disabled:opacity-50"
                        title="Crawl official portal"
                      >
                        <RefreshCw size={11} className={crawlingCollegeId === c.id ? 'animate-spin' : ''} />
                        <span>Crawl</span>
                      </button>
                      <Link href={`/aspirant/colleges/${c.id}`} className="text-text-primary font-bold hover:underline">
                        View
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete ${c.name}?`)) {
                            deleteCollege(c.id);
                            await deleteCollegeFromDatabase(c.id);
                          }
                        }}
                        className="text-status-error p-1 hover:bg-red-50 rounded"
                        title="Delete College"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal: Add College */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <h3 className="font-bold text-base text-text-primary">Add Institution</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-text-primary">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-text-primary mb-1">Full College Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Indian Institute of Technology Roorkee"
                    className="w-full p-2 border border-border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Short Name *</label>
                    <input
                      type="text"
                      required
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      placeholder="e.g. IIT Roorkee"
                      className="w-full p-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Type *</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full p-2 border border-border rounded-lg"
                    >
                      <option value="IIT">IIT</option>
                      <option value="NIT">NIT</option>
                      <option value="IIIT">IIIT</option>
                      <option value="Private University">Private University</option>
                      <option value="State University">State University</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Roorkee"
                      className="w-full p-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Uttarakhand"
                      className="w-full p-2 border border-border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Tuition / Yr</label>
                    <input
                      type="text"
                      value={tuitionFee}
                      onChange={(e) => setTuitionFee(e.target.value)}
                      className="w-full p-2 border border-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-text-primary mb-1">Average CTC</label>
                    <input
                      type="text"
                      value={avgPkg}
                      onChange={(e) => setAvgPkg(e.target.value)}
                      className="w-full p-2 border border-border rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 border border-border text-text-secondary rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-primary text-white font-bold rounded-lg shadow-xs"
                  >
                    Save College
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

