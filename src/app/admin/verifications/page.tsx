'use client';

import React, { useState } from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { useApp } from '@/context/AppContext';
import { 
  FileCheck2, 
  Check, 
  X, 
  Eye, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';
import { VerifiedBadge } from '@/components/shared/VerifiedBadge';
import { CollegeIdCardPreview } from '@/components/shared/CollegeIdCardPreview';
import { MentorProfile } from '@/types';
import { updateMentorVerificationAudit } from '@/actions/adminActions';

export default function AdminVerificationsPage() {
  const { mentors, verifyMentor } = useApp();

  const [selectedMentorForDoc, setSelectedMentorForDoc] = useState<MentorProfile | null>(null);
  const [rejectingMentor, setRejectingMentor] = useState<MentorProfile | null>(null);
  const [rejectionReason, setRejectionReason] = useState('College ID card appears expired or enrollment number unreadable.');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredMentors = mentors.filter((m) => {
    if (filterStatus === 'all') return true;
    return m.verificationStatus === filterStatus;
  });

  const handleApprove = async (mentor: MentorProfile) => {
    if (confirm(`Authorize and approve ${mentor.name} as a Verified Mentor on GradSetu?\nThis will immediately publish their profile to the public mentor marketplace.`)) {
      verifyMentor(mentor.id, 'approved', 'Verified by Admin against institutional records.');
      await updateMentorVerificationAudit(mentor.id, 'approved', 'Verified by Admin against institutional records.');
    }
  };

  const handleConfirmReject = async () => {
    if (rejectingMentor) {
      verifyMentor(rejectingMentor.id, 'rejected', rejectionReason);
      const mentorId = rejectingMentor.id;
      setRejectingMentor(null);
      await updateMentorVerificationAudit(mentorId, 'rejected', rejectionReason);
    }
  };

  const handleRequestResubmit = async (mentor: MentorProfile) => {
    const remark = prompt('Enter explanation for resubmission request:', 'Please upload a clearer photograph showing both your name and college stamp.');
    if (remark) {
      verifyMentor(mentor.id, 'resubmission_required', remark);
      await updateMentorVerificationAudit(mentor.id, 'resubmission_required', remark);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background-secondary min-h-screen">
      <DashboardHeader 
        title="Mentor Verification Audit" 
        subtitle="Review uploaded student identity cards, verify enrollment, and authorize mentors" 
      />

      <main className="p-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Header & Filter Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Student ID Verification Management
            </h1>
            <p className="text-xs text-text-secondary mt-0.5">
              Auditing student identity cards maintains GradSetu&apos;s trusted marketplace.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-border p-1 rounded-xl text-xs">
            {['all', 'pending', 'approved', 'rejected', 'resubmission_required'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition ${
                  filterStatus === st
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Requests Table */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-background-secondary text-text-secondary uppercase font-semibold">
                <tr>
                  <th className="p-4 border-b">Student Mentor</th>
                  <th className="p-4 border-b">College & Course</th>
                  <th className="p-4 border-b">ID / Roll No</th>
                  <th className="p-4 border-b">Document</th>
                  <th className="p-4 border-b">Submitted</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b text-right">Audit Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border">
                {filteredMentors.map((m) => (
                  <tr key={m.id} className="hover:bg-background-secondary/30 transition">
                    {/* Mentor Info */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border" />
                        <div>
                          <div className="font-bold text-text-primary flex items-center gap-1">
                            <span>{m.name}</span>
                            {m.verificationStatus === 'approved' && <VerifiedBadge size={13} />}
                          </div>
                          <span className="text-[11px] text-text-secondary">{m.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* College */}
                    <td className="p-4">
                      <div className="font-bold text-text-primary">{m.collegeName}</div>
                      <div className="text-[11px] text-text-secondary">{m.course} - {m.branch} ({m.currentYear})</div>
                    </td>

                    {/* ID */}
                    <td className="p-4 font-mono font-semibold text-text-primary">
                      {m.enrollmentNumber}
                    </td>

                    {/* Document Preview Trigger */}
                    <td className="p-4">
                      <button
                        onClick={() => setSelectedMentorForDoc(m)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-primary font-bold rounded-lg border border-primary-secondary transition"
                      >
                        <Eye size={13} />
                        <span>View ID Card</span>
                      </button>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-text-secondary">
                      {m.verificationSubmittedAt ? new Date(m.verificationSubmittedAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short'
                      }) : 'Recent'}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          m.verificationStatus === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : m.verificationStatus === 'pending'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-red-50 text-status-error border border-red-200'
                        }`}
                      >
                        {m.verificationStatus.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {m.verificationStatus !== 'approved' && (
                          <button
                            type="button"
                            onClick={() => handleApprove(m)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-xs transition"
                            title="Approve verification"
                          >
                            Approve
                          </button>
                        )}

                        {m.verificationStatus !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => setRejectingMentor(m)}
                            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-xs transition"
                            title="Reject verification"
                          >
                            Reject
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleRequestResubmit(m)}
                          className="px-2.5 py-1.5 border border-border text-text-secondary hover:text-text-primary rounded-lg transition"
                          title="Request Resubmission"
                        >
                          Request Re-upload
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Confidential ID Document Viewer */}
        {selectedMentorForDoc && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-primary" />
                  <h3 className="font-bold text-sm text-text-primary">
                    Student ID Document Preview: {selectedMentorForDoc.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMentorForDoc(null)}
                  className="text-slate-400 hover:text-text-primary"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Document Image & Smart ID Card Render */}
              <div className="bg-slate-100 border border-border rounded-xl p-3">
                <CollegeIdCardPreview
                  studentName={selectedMentorForDoc.name}
                  collegeName={selectedMentorForDoc.collegeName}
                  enrollmentNumber={selectedMentorForDoc.enrollmentNumber}
                  course={selectedMentorForDoc.course}
                  branch={selectedMentorForDoc.branch}
                  academicYear={selectedMentorForDoc.currentYear}
                  avatarUrl={selectedMentorForDoc.avatar}
                />
              </div>

              {/* Data Verification Checkpoints */}
              <div className="p-3 bg-background-secondary rounded-xl text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Stated Student Name:</span>
                  <span className="font-bold text-text-primary">{selectedMentorForDoc.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Enrollment / Roll No:</span>
                  <span className="font-mono font-bold text-text-primary">{selectedMentorForDoc.enrollmentNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">College / University:</span>
                  <span className="font-bold text-text-primary">{selectedMentorForDoc.collegeName}</span>
                </div>
                {selectedMentorForDoc.verificationDocumentUrl && (
                  <div className="pt-2 border-t border-border flex justify-between items-center">
                    <span className="text-text-secondary">Secure Storage:</span>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          const res = await fetch(`/api/verification-document?key=${encodeURIComponent(selectedMentorForDoc.verificationDocumentUrl!)}`);
                          const data = await res.json();
                          if (data.downloadUrl) {
                            window.open(data.downloadUrl, '_blank');
                          } else {
                            alert(data.error || 'Failed to get document URL');
                          }
                        } catch {
                          alert('Error connecting to Cloudflare R2');
                        }
                      }}
                      className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
                    >
                      <FileText size={13} />
                      <span>Open File via Presigned R2 URL</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Decisions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedMentorForDoc(null)}
                  className="px-4 py-2 border border-border text-xs font-semibold rounded-lg text-text-secondary hover:text-text-primary"
                >
                  Close Preview
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const m = selectedMentorForDoc;
                      setSelectedMentorForDoc(null);
                      setRejectingMentor(m);
                    }}
                    className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg shadow-xs hover:bg-red-700"
                  >
                    Reject ID
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const m = selectedMentorForDoc;
                      setSelectedMentorForDoc(null);
                      handleApprove(m);
                    }}
                    className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-xs hover:bg-emerald-700"
                  >
                    Approve Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Rejection Reason */}
        {rejectingMentor && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-status-error flex items-center gap-1.5">
                  <XCircle size={18} />
                  <span>Reject Student Verification</span>
                </h3>
                <button onClick={() => setRejectingMentor(null)} className="text-slate-400 hover:text-text-primary">
                  <X size={18} />
                </button>
              </div>

              <p className="text-xs text-text-secondary">
                Please provide a clear reason. This will be displayed on {rejectingMentor.name}&apos;s mentor dashboard so they can resubmit the correct document.
              </p>

              <div>
                <label className="block text-xs font-bold text-text-primary mb-1">
                  Rejection Reason / Auditor Remarks *
                </label>
                <textarea
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-2.5 text-xs border border-border rounded-lg text-text-primary focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectingMentor(null)}
                  className="px-3 py-1.5 text-xs text-text-secondary font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

