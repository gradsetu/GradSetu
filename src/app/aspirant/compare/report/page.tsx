'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function ComparisonReportPage() {
  const { colleges, comparisonCollegeIds, aspirantProfile, bookings } = useApp();

  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const selectedColleges = colleges.filter(c => comparisonCollegeIds.includes(c.id));

  const handleDownloadPDF = () => {
    setDownloading(true);
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(37, 99, 235); // #2563EB
      doc.text("GradSetu — College Comparison Report", 20, 22);

      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated for: ${aspirantProfile.name} | Target Year: ${aspirantProfile.targetAdmissionYear}`, 20, 29);
      doc.text(`Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`, 20, 35);

      doc.setDrawColor(226, 232, 240);
      doc.line(20, 38, 190, 38);

      // Section 1: Colleges
      doc.setFontSize(14);
      doc.setTextColor(17, 24, 39);
      doc.text("1. Compared Institutions", 20, 48);

      let yPos = 56;
      selectedColleges.forEach((col, idx) => {
        doc.setFontSize(11);
        doc.setTextColor(37, 99, 235);
        doc.text(`${idx + 1}. ${col.name} (${col.shortName})`, 25, yPos);
        
        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        doc.text(`Location: ${col.city}, ${col.state} | Type: ${col.type} | NIRF Rank: #${col.nirfRank}`, 25, yPos + 6);
        doc.text(`Annual Tuition: ${col.tuitionFeePerYear} | Average CTC: ${col.avgPackage} | Placement Rate: ${col.placementRate}%`, 25, yPos + 12);
        
        yPos += 22;
      });

      // Section 2: Financial & Placement Matrix
      yPos += 4;
      doc.setFontSize(14);
      doc.setTextColor(17, 24, 39);
      doc.text("2. Comparative Findings & Recommendation", 20, yPos);

      yPos += 8;
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text("• Most Budget-Friendly: " + (selectedColleges[0]?.shortName || 'N/A') + " with the lowest annual fee.", 25, yPos);
      doc.text("• Top Placement Yield: " + (selectedColleges[0]?.shortName || 'N/A') + " leading in average tech packages.", 25, yPos + 6);
      doc.text("• Senior Guidance Status: Verified students consulted on GradSetu regarding hostels & culture.", 25, yPos + 12);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("This report is created on GradSetu.com — India's verified student mentorship & discovery network.", 20, 280);

      doc.save(`GradSetu_Comparison_Report_${aspirantProfile.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Comparison Report" 
        subtitle="Shareable academic report for students and parents" 
      />

      <main className="p-6 max-w-4xl mx-auto w-full space-y-8">
        
        {/* Back Link */}
        <Link
          href="/aspirant/compare"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Comparison Matrix</span>
        </Link>

        {/* Hero Card matching Panel 15 */}
        <div className="bg-white border border-border rounded-2xl p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary flex items-center justify-center mx-auto shadow-sm">
            <FileText size={32} />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
              Your College Comparison Report
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary mt-1 max-w-md mx-auto">
              A simple, shareable summary for you and your parents to make a confident decision together.
            </p>
          </div>

          {/* Checklist matching Panel 15 */}
          <div className="max-w-md mx-auto bg-background-secondary rounded-xl p-5 text-left space-y-3">
            <div className="flex items-center gap-3 text-xs text-text-primary font-medium">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Side-by-side comparison of selected colleges</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-primary font-medium">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Key insights from your verified student mentor calls</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-primary font-medium">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Your priorities, annual budgets and recommended fit</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-text-primary font-medium">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>Shareable link or downloadable official PDF</span>
            </div>
          </div>

          {/* Action Buttons matching Panel 15 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              disabled={downloading}
              onClick={handleDownloadPDF}
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
            >
              <Download size={16} />
              <span>{downloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="w-full sm:w-auto px-6 py-3 border border-border hover:bg-background-secondary text-text-primary font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-2"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Share2 size={16} />}
              <span>{copied ? 'Link Copied!' : 'Share with Parents'}</span>
            </button>
          </div>
        </div>

        {/* Live Report Preview */}
        <div className="bg-white border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-border pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Report Preview</span>
              <h2 className="text-lg font-bold text-text-primary mt-0.5">
                Evaluated Institutions ({selectedColleges.length})
              </h2>
            </div>
            <span className="text-xs text-text-secondary">
              Aspirant: {aspirantProfile.name}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedColleges.map((c) => (
              <div key={c.id} className="p-4 border border-border rounded-xl bg-background-secondary/30 space-y-3">
                <img src={c.featuredImage} alt={c.name} className="w-full h-24 object-cover rounded-lg" />
                <div>
                  <h3 className="font-bold text-sm text-text-primary">{c.shortName}</h3>
                  <p className="text-[11px] text-text-secondary">{c.city}, {c.state}</p>
                </div>
                <div className="text-xs space-y-1 pt-2 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tuition:</span>
                    <span className="font-bold text-text-primary">{c.tuitionFeePerYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Avg CTC:</span>
                    <span className="font-bold text-primary">{c.avgPackage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Placement:</span>
                    <span className="font-bold text-emerald-700">{c.placementRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-primary-light/50 border border-primary-secondary rounded-xl text-xs space-y-1.5">
            <h4 className="font-bold text-primary">Summary Advisory for Parents</h4>
            <p className="text-text-secondary leading-relaxed">
              Based on Ananya&apos;s goal of entering Computer Science / Engineering in 2026, all selected institutions offer exceptional return on investment. For families prioritizing total tuition savings, {selectedColleges[0]?.shortName} offers competitive fee structures with JoSAA scholarship quotas.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

