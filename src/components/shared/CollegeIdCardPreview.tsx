'use client';

import React, { useState } from 'react';
import { ShieldCheck, Award, QrCode } from 'lucide-react';

interface CollegeIdCardPreviewProps {
  studentName: string;
  collegeName: string;
  enrollmentNumber: string;
  course: string;
  branch: string;
  academicYear: string;
  avatarUrl: string;
}

export function CollegeIdCardPreview({
  studentName,
  collegeName,
  enrollmentNumber,
  course,
  branch,
  academicYear,
  avatarUrl
}: CollegeIdCardPreviewProps) {
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');

  return (
    <div className="space-y-3">
      {/* Front / Back Toggle Buttons */}
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setViewSide('front')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
            viewSide === 'front'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Card Front
        </button>
        <button
          type="button"
          onClick={() => setViewSide('back')}
          className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
            viewSide === 'back'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Card Back
        </button>
      </div>

      {/* Realistic ID Card Container */}
      <div className="w-full max-w-sm mx-auto aspect-[1.58/1] rounded-2xl border-2 border-slate-300 shadow-md bg-white text-slate-900 overflow-hidden relative select-none font-sans">
        
        {viewSide === 'front' ? (
          <div className="h-full flex flex-col justify-between p-4 bg-slate-50 relative">
            {/* Top College Header Strip */}
            <div className="border-b border-blue-900/20 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-800 text-white flex items-center justify-center font-serif font-black text-xs">
                  🎓
                </div>
                <div>
                  <div className="font-extrabold text-[11px] uppercase tracking-tight text-blue-900 leading-tight">
                    {collegeName}
                  </div>
                  <div className="text-[8px] font-semibold tracking-widest text-slate-500 uppercase">
                    Student Identity Card
                  </div>
                </div>
              </div>
              <div className="text-[9px] font-bold text-blue-900 border border-blue-900/30 px-1 rounded">
                VALID 2027
              </div>
            </div>

            {/* Middle Content */}
            <div className="flex items-center gap-3.5 my-auto">
              <div className="relative shrink-0">
                <img
                  src={avatarUrl}
                  alt={studentName}
                  className="w-16 h-20 rounded-lg object-cover border-2 border-slate-300 shadow-xs"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-0.5">
                  <ShieldCheck size={10} />
                </span>
              </div>

              <div className="space-y-0.5 text-[10px] leading-tight flex-1 min-w-0">
                <div>
                  <span className="text-[8px] text-slate-400 block font-bold uppercase">Name</span>
                  <span className="font-extrabold text-slate-900 text-xs block truncate">{studentName}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 block font-bold uppercase">Roll / Enrollment No.</span>
                  <span className="font-mono font-bold text-blue-800 text-[11px] block">{enrollmentNumber}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 block font-bold uppercase">Program & Branch</span>
                  <span className="font-semibold text-slate-700 block truncate">{course} - {branch}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-400 block font-bold uppercase">Batch / Year</span>
                  <span className="font-medium text-slate-600 block">{academicYear} (Undergraduate)</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar with Barcode */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-500">
              <div className="font-mono tracking-widest text-[9px] font-semibold text-slate-800">
                ||| | |||| | ||| || ||| | |||
              </div>
              <div className="text-right">
                <span className="font-serif italic text-[9px] text-slate-700 block">Registrar Signature</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col justify-between p-4 bg-slate-50 text-[9px] text-slate-600 leading-snug">
            <div className="space-y-1 border-b pb-2">
              <div className="font-bold text-slate-800 uppercase text-[10px]">Terms & Institutional Instructions</div>
              <p className="text-[8px] text-slate-500">
                1. This card is non-transferable and must be produced upon demand by campus security or library staff.
              </p>
              <p className="text-[8px] text-slate-500">
                2. If found, please return to the Office of the Dean of Student Affairs, {collegeName}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[8px] my-auto">
              <div>
                <span className="font-bold text-slate-700 block">Emergency Contact</span>
                <span>+91 11 2659 1000</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Blood Group</span>
                <span className="font-bold text-red-600">B+ Positive</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Hostel Residence</span>
                <span>Kumaon Hostel, Room 214</span>
              </div>
              <div>
                <span className="font-bold text-slate-700 block">Date of Issue</span>
                <span>15 August 2023</span>
              </div>
            </div>

            <div className="pt-2 border-t flex items-center justify-between text-[8px] text-slate-400">
              <span>Security Barcode Verified</span>
              <span className="font-mono">ID-SEC-2023-A99</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

