'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GraduationCap, ArrowRight, Check, X, Loader2, Search, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { saveAspirantOnboarding } from '@/actions/aspirantActions';

// ─── Course → Branch master data ─────────────────────────────────────────────
const COURSE_BRANCH_MAP: Record<string, string[]> = {
  'B.Tech / B.E. (Engineering)': ['Computer Science and Engineering','Information Technology','Artificial Intelligence & Machine Learning','Data Science','Electronics and Communication Engineering','Electrical Engineering','Mechanical Engineering','Civil Engineering','Chemical Engineering','Aerospace Engineering','Biotechnology Engineering','Cyber Security'],
  'M.Tech / M.E. (Engineering)': ['Computer Science and Engineering','VLSI Design','Embedded Systems','Power Systems','Structural Engineering','Thermal Engineering','Control Systems','Robotics','Nanotechnology'],
  'B.Sc (Science)': ['Physics','Chemistry','Mathematics','Biology','Computer Science','Statistics','Biotechnology','Microbiology','Biochemistry','Environmental Science'],
  'M.Sc (Science)': ['Physics','Chemistry','Mathematics','Biology','Computer Science','Statistics','Biotechnology','Data Science','Neuroscience'],
  'MBBS (Medical)': ['General Medicine','Surgery','Paediatrics','Gynaecology & Obstetrics','Orthopaedics','Cardiology','Neurology','Psychiatry','Dermatology','Radiology'],
  'BDS (Dental)': ['Oral Surgery','Orthodontics','Periodontics','Endodontics','Prosthodontics','Oral Pathology','Paediatric Dentistry'],
  'B.Pharm / M.Pharm (Pharmacy)': ['Pharmaceutics','Pharmacology','Pharmaceutical Chemistry','Clinical Pharmacy','Industrial Pharmacy'],
  'MBA / PGDM (Management)': ['Finance','Marketing','Human Resources','Operations Management','Business Analytics','IT Management','Supply Chain Management','Entrepreneurship','International Business'],
  'BBA / BMS (Business)': ['General Management','Finance','Marketing','Human Resources','Entrepreneurship','International Business','Digital Marketing'],
  'LLB / BA LLB (Law)': ['Corporate Law','Criminal Law','Constitutional Law','Intellectual Property Law','International Law','Cyber Law','Tax Law','Environmental Law','Family Law'],
  'B.Arch (Architecture)': ['Urban Design','Landscape Architecture','Interior Architecture','Sustainable Design','Heritage Conservation'],
  'B.Des / M.Des (Design)': ['Product Design','Communication Design','Interaction / UX Design','Fashion Design','Animation and Multimedia','Game Design'],
  'B.Ed / M.Ed (Education)': ['Elementary Education','Secondary Education','Special Education','Educational Technology','Guidance and Counselling'],
  'B.Com / M.Com (Commerce)': ['Accounting and Finance','Taxation','Banking and Insurance','E-Commerce','Business Economics','Cost Accounting'],
  'BCA / MCA (Computer Applications)': ['Software Development','Database Management','Network Administration','Cyber Security','Data Analytics','Mobile Application Development'],
  'B.A. / M.A. (Arts & Humanities)': ['English Literature','History','Political Science','Sociology','Psychology','Economics','Philosophy','Geography','Journalism and Mass Communication'],
};

const ALL_COURSES = Object.keys(COURSE_BRANCH_MAP);

function CourseSelect({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const filtered = ALL_COURSES.filter(c => c.toLowerCase().includes(search.toLowerCase()));
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary hover:border-slate-300 transition">
        <span className={value ? 'text-text-primary' : 'text-text-secondary'}>{value || 'Select course...'}</span>
        <ChevronDown size={16} className={`text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-lg">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter courses..." className="w-full pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:border-primary" />
            </div>
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map(c => (
              <li key={c}><button type="button" onClick={() => { onChange(c); setOpen(false); setSearch(''); }} className={`w-full text-left px-4 py-2 text-xs hover:bg-primary-light transition ${value === c ? 'bg-primary-light text-primary font-semibold' : 'text-text-primary'}`}>{value === c && <Check size={11} className="inline mr-1" />}{c}</button></li>
            ))}
            {filtered.length === 0 && <li className="px-4 py-2 text-xs text-text-secondary">No matches</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

function BranchSelect({ course, value, onChange }: { course: string; value: string; onChange: (b: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const branches = COURSE_BRANCH_MAP[course] || [];
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  if (!course) return null;
  const filtered = branches.filter(b => b.toLowerCase().includes(search.toLowerCase()));
  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-semibold text-text-primary mb-1">Preferred Branch / Specialization</label>
      <button type="button" onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary hover:border-slate-300 transition">
        <span className={value ? 'text-text-primary' : 'text-text-secondary'}>{value || 'Select branch...'}</span>
        <ChevronDown size={16} className={`text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-lg">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter branches..." className="w-full pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:border-primary" />
            </div>
          </div>
          <ul className="max-h-48 overflow-y-auto py-1">
            {filtered.map(b => <li key={b}><button type="button" onClick={() => { onChange(b); setOpen(false); setSearch(''); }} className={`w-full text-left px-4 py-2 text-xs hover:bg-primary-light transition ${value === b ? 'bg-primary-light text-primary font-semibold' : 'text-text-primary'}`}>{value === b && <Check size={11} className="inline mr-1" />}{b}</button></li>)}
            {filtered.length === 0 && <li className="px-4 py-2 text-xs text-text-secondary">No matches</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function AspirantOnboardingPage() {
  const router = useRouter();
  const { aspirantProfile, updateAspirantProfile } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(2);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [preferredCourse, setPreferredCourse] = useState(aspirantProfile.preferredCourse || 'B.Tech / B.E. (Engineering)');
  const [targetAdmissionYear, setTargetAdmissionYear] = useState(aspirantProfile.targetAdmissionYear || '2026');
  const [entranceExams, setEntranceExams] = useState<string[]>(aspirantProfile.entranceExams || ['JEE Main', 'JEE Advanced']);
  const [expectedBudget, setExpectedBudget] = useState(aspirantProfile.expectedBudget || '₹5 Lakh - ₹15 Lakh');
  const [preferredBranch, setPreferredBranch] = useState(aspirantProfile.preferredBranch || 'Computer Science and Engineering');
  const [hostelPreference, setHostelPreference] = useState<'yes' | 'no' | 'flexible'>(aspirantProfile.hostelPreference || 'yes');

  const availableExams = ['JEE Main', 'JEE Advanced', 'BITSAT', 'NEET', 'CUET', 'VITEEE', 'MHT-CET', 'COMEDK'];

  const toggleExam = (exam: string) => {
    if (entranceExams.includes(exam)) {
      setEntranceExams(entranceExams.filter(e => e !== exam));
    } else {
      setEntranceExams([...entranceExams, exam]);
    }
  };

  const handleNext = async () => {
    if (currentStep === 2) {
      setCurrentStep(3); // Review step
    } else if (currentStep === 3) {
      setIsSubmitting(true);
      // Update local state
      updateAspirantProfile({
        preferredCourse,
        targetAdmissionYear,
        entranceExams,
        expectedBudget,
        preferredBranch,
        hostelPreference,
      });

      // Persist to Supabase backend
      await saveAspirantOnboarding({
        preferredCourse,
        targetAdmissionYear,
        entranceExams,
        expectedBudget,
        preferredBranch,
        hostelPreference,
      });

      setIsSubmitting(false);
      router.push('/aspirant/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
              <GraduationCap size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-text-primary">
              GradSetu
            </span>
          </Link>

          {/* Stepper matching panel 03 */}
          <div className="flex items-center justify-center max-w-md mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                <Check size={14} className="stroke-[3]" />
              </div>
              <span className="text-[11px] font-medium text-primary mt-1.5">Your Details</span>
            </div>

            <div className="flex-1 h-0.5 bg-primary mx-3"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {currentStep > 2 ? <Check size={14} className="stroke-[3]" /> : '2'}
              </div>
              <span className={`text-[11px] font-medium mt-1.5 ${currentStep >= 2 ? 'text-primary' : 'text-slate-400'}`}>
                Goals & Preferences
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${currentStep >= 3 ? 'bg-primary' : 'bg-slate-200'}`}></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                3
              </div>
              <span className={`text-[11px] font-medium mt-1.5 ${currentStep >= 3 ? 'text-primary' : 'text-slate-400'}`}>
                Review
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="bg-white border border-border rounded-2xl shadow-sm p-6 sm:p-10">
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                  Tell us about your goals
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  This helps us show the most relevant colleges and mentors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Course — searchable dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Preferred Course / Field *
                  </label>
                  <CourseSelect value={preferredCourse} onChange={c => { setPreferredCourse(c); setPreferredBranch(''); }} />
                </div>

                {/* Target Year */}
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    Target Admission Year *
                  </label>
                  <select
                    value={targetAdmissionYear}
                    onChange={(e) => setTargetAdmissionYear(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>

              {/* Branch — appears after course selected */}
              {preferredCourse && (
                <BranchSelect course={preferredCourse} value={preferredBranch} onChange={setPreferredBranch} />
              )}

              {/* Entrance Exams */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Entrance Exam (if any) *
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {entranceExams.map((exam) => (
                    <span
                      key={exam}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-light text-primary border border-primary-secondary rounded-lg text-xs font-medium"
                    >
                      <span>{exam}</span>
                      <button
                        type="button"
                        onClick={() => toggleExam(exam)}
                        className="hover:text-primary-dark"
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="text-[11px] text-text-secondary mb-1">Click to add/remove:</div>
                <div className="flex flex-wrap gap-1.5">
                  {availableExams.filter(e => !entranceExams.includes(e)).map((exam) => (
                    <button
                      key={exam}
                      type="button"
                      onClick={() => toggleExam(exam)}
                      className="px-2.5 py-1 bg-background-secondary hover:bg-slate-200 text-text-secondary text-xs rounded border border-border transition"
                    >
                      + {exam}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">
                  Expected Budget (per year) *
                </label>
                <select
                  value={expectedBudget}
                  onChange={(e) => setExpectedBudget(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="Under ₹3 Lakh">Under ₹3 Lakh</option>
                  <option value="₹3 Lakh - ₹5 Lakh">₹3 Lakh - ₹5 Lakh</option>
                  <option value="₹5 Lakh - ₹15 Lakh">₹5 Lakh - ₹15 Lakh</option>
                  <option value="₹15 Lakh+">₹15 Lakh+</option>
                </select>
              </div>

              {/* Preferred Branch — dropdown tied to course */}
              {preferredCourse && (
                <BranchSelect course={preferredCourse} value={preferredBranch} onChange={setPreferredBranch} />
              )}

              {/* Hostel */}
              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">
                  Hostel Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['yes', 'no', 'flexible'] as const).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setHostelPreference(pref)}
                      className={`py-2 text-xs font-medium rounded-lg border text-center capitalize transition ${
                        hostelPreference === pref
                          ? 'border-primary bg-primary-light text-primary font-semibold'
                          : 'border-border bg-white text-text-secondary hover:bg-background-secondary'
                      }`}
                    >
                      {pref === 'yes' ? 'Required' : pref === 'no' ? 'Day Scholar' : 'Flexible'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                  Review Your Preferences
                </h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">
                  Verify your choices. You can always update these in your settings.
                </p>
              </div>

              <div className="bg-background-secondary rounded-xl p-5 space-y-3 text-xs sm:text-sm divide-y divide-border">
                <div className="flex justify-between py-1.5">
                  <span className="text-text-secondary">Target Stream / Course:</span>
                  <span className="font-semibold text-text-primary">{preferredCourse}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-text-secondary">Target Admission Year:</span>
                  <span className="font-semibold text-text-primary">{targetAdmissionYear}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-text-secondary">Entrance Exams:</span>
                  <span className="font-semibold text-text-primary">{entranceExams.join(', ') || 'None'}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-text-secondary">Annual Budget:</span>
                  <span className="font-semibold text-text-primary">{expectedBudget}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-text-secondary">Preferred Branch:</span>
                  <span className="font-semibold text-text-primary">{preferredBranch}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-text-secondary">Hostel:</span>
                  <span className="font-semibold text-text-primary capitalize">{hostelPreference}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center gap-2"
                >
                  <span>Finish & Go to Dashboard</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

