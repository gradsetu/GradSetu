'use client';

import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  ArrowRight,
  Check,
  UploadCloud,
  FileText,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Search,
  ChevronDown,
  X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { saveMentorOnboarding } from '@/actions/mentorActions';

// ─── Course → Branch master data ─────────────────────────────────────────────
const COURSE_BRANCH_MAP: Record<string, string[]> = {
  'B.Tech / B.E. (Engineering)': [
    'Computer Science and Engineering',
    'Information Technology',
    'Artificial Intelligence & Machine Learning',
    'Data Science',
    'Electronics and Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Biotechnology Engineering',
    'Industrial Engineering',
    'Robotics and Automation',
    'Cyber Security',
    'Internet of Things (IoT)',
  ],
  'M.Tech / M.E. (Engineering)': [
    'Computer Science and Engineering',
    'VLSI Design',
    'Embedded Systems',
    'Power Systems',
    'Structural Engineering',
    'Thermal Engineering',
    'Control Systems',
    'Robotics',
    'Nanotechnology',
    'Environmental Engineering',
  ],
  'B.Sc (Science)': [
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'Computer Science',
    'Statistics',
    'Biotechnology',
    'Microbiology',
    'Biochemistry',
    'Environmental Science',
  ],
  'M.Sc (Science)': [
    'Physics',
    'Chemistry',
    'Mathematics',
    'Biology',
    'Computer Science',
    'Statistics',
    'Biotechnology',
    'Microbiology',
    'Data Science',
    'Neuroscience',
  ],
  'MBBS (Medical)': [
    'General Medicine',
    'Surgery',
    'Paediatrics',
    'Gynaecology & Obstetrics',
    'Orthopaedics',
    'Cardiology',
    'Neurology',
    'Psychiatry',
    'Dermatology',
    'Radiology',
  ],
  'BDS (Dental)': [
    'Oral Surgery',
    'Orthodontics',
    'Periodontics',
    'Endodontics',
    'Prosthodontics',
    'Oral Pathology',
    'Oral Medicine',
    'Paediatric Dentistry',
  ],
  'B.Pharm / M.Pharm (Pharmacy)': [
    'Pharmaceutics',
    'Pharmacology',
    'Pharmaceutical Chemistry',
    'Pharmacognosy',
    'Clinical Pharmacy',
    'Industrial Pharmacy',
    'Drug Regulatory Affairs',
  ],
  'MBA / PGDM (Management)': [
    'Finance',
    'Marketing',
    'Human Resources',
    'Operations Management',
    'Business Analytics',
    'Information Technology Management',
    'Supply Chain Management',
    'Entrepreneurship',
    'International Business',
    'Healthcare Management',
  ],
  'BBA / BMS (Business)': [
    'General Management',
    'Finance',
    'Marketing',
    'Human Resources',
    'Entrepreneurship',
    'International Business',
    'Digital Marketing',
    'Retail Management',
  ],
  'LLB / BA LLB (Law)': [
    'Corporate Law',
    'Criminal Law',
    'Constitutional Law',
    'Intellectual Property Law',
    'International Law',
    'Cyber Law',
    'Tax Law',
    'Environmental Law',
    'Family Law',
    'Human Rights Law',
  ],
  'LLM (Law)': [
    'Corporate and Commercial Law',
    'Criminal Law',
    'Constitutional and Administrative Law',
    'International Trade Law',
    'Intellectual Property Rights',
    'Human Rights and International Humanitarian Law',
  ],
  'B.Arch (Architecture)': [
    'Urban Design',
    'Landscape Architecture',
    'Interior Architecture',
    'Sustainable Design',
    'Heritage Conservation',
    'Industrial Design',
  ],
  'B.Des / M.Des (Design)': [
    'Product Design',
    'Communication Design',
    'Interaction / UX Design',
    'Fashion Design',
    'Textile Design',
    'Animation and Multimedia',
    'Game Design',
    'Jewellery Design',
  ],
  'B.Ed / M.Ed (Education)': [
    'Elementary Education',
    'Secondary Education',
    'Special Education',
    'Educational Technology',
    'Guidance and Counselling',
  ],
  'B.Com / M.Com (Commerce)': [
    'Accounting and Finance',
    'Taxation',
    'Banking and Insurance',
    'E-Commerce',
    'Business Economics',
    'Cost Accounting',
  ],
  'CA / CMA / CS (Professional)': [
    'Chartered Accountancy (CA)',
    'Cost and Management Accountancy (CMA)',
    'Company Secretary (CS)',
  ],
  'BCA / MCA (Computer Applications)': [
    'Software Development',
    'Database Management',
    'Network Administration',
    'Cyber Security',
    'Data Analytics',
    'Mobile Application Development',
  ],
  'B.A. / M.A. (Arts & Humanities)': [
    'English Literature',
    'History',
    'Political Science',
    'Sociology',
    'Psychology',
    'Economics',
    'Philosophy',
    'Geography',
    'Hindi / Regional Language',
    'Journalism and Mass Communication',
  ],
  'BHM (Hotel Management)': [
    'Food Production',
    'Food and Beverage Service',
    'Front Office Management',
    'Housekeeping',
    'Hospitality Business Management',
  ],
  'BPT / MPT (Physiotherapy)': [
    'Musculoskeletal & Sports',
    'Neurology',
    'Paediatrics',
    'Cardiopulmonary',
    'Geriatrics',
  ],
  'B.Voc / Diploma (Vocational)': [
    'Web Development',
    'Mobile App Development',
    'Graphic Design',
    'Electrical Technology',
    'Mechanical Technology',
    'Fashion Technology',
    'Culinary Arts',
    'Automotive Technology',
  ],
};

const ALL_COURSES = Object.keys(COURSE_BRANCH_MAP);

// ─── Live College Search Hook ─────────────────────────────────────────────────
function useCollegeSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ name: string; description: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  const search = useCallback((q: string) => {
    clearTimeout(debounceRef.current);
    if (!q || q.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/colleges/live-search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setResults(data.results || []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  }, []);

  return { query, setQuery, results, loading, open, setOpen, search };
}

// ─── CollegeSearchInput Component ────────────────────────────────────────────
function CollegeSearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string) => void;
}) {
  const { query, setQuery, results, loading, open, setOpen, search } = useCollegeSearch();
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with value from parent
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [setOpen]);

  const handleInputChange = (val: string) => {
    setQuery(val);
    onChange(val); // Immediately update parent form so typed name is always saved
    search(val);
  };

  const handleSelectCollege = (name: string) => {
    setQuery(name);
    onChange(name);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            if (query.trim().length >= 2) {
              search(query);
              setOpen(true);
            }
          }}
          placeholder="Search college / university worldwide..."
          className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
        />
        {loading && (
          <Loader2 size={15} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-primary" />
        )}
        {!loading && query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onChange('');
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-0.5 rounded"
            title="Clear"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-[100] mt-1.5 w-full bg-white border border-border rounded-xl shadow-2xl max-h-64 overflow-y-auto divide-y divide-slate-100">
          {results.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectCollege(r.name)}
              className="w-full text-left px-4 py-2.5 hover:bg-primary-light transition flex flex-col group"
            >
              <div className="text-sm font-semibold text-text-primary group-hover:text-primary flex items-center justify-between">
                <span>{r.name}</span>
                <span className="text-[10px] uppercase font-normal tracking-wide px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 group-hover:bg-primary group-hover:text-white">
                  Select
                </span>
              </div>
              {r.description && (
                <div className="text-xs text-text-secondary truncate mt-0.5">
                  {r.description}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {open && !loading && results.length === 0 && query.trim().length >= 2 && (
        <div className="absolute z-[100] mt-1.5 w-full bg-white border border-border rounded-xl shadow-xl p-3 text-xs text-text-secondary">
          No matches found online. Your custom college name <strong>&quot;{query}&quot;</strong> will be saved.
        </div>
      )}
    </div>
  );
}

// ─── CourseSelect Component ───────────────────────────────────────────────────
function CourseSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (course: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = ALL_COURSES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary hover:border-slate-300 transition"
      >
        <span className={value ? 'text-text-primary' : 'text-text-secondary'}>
          {value || 'Select course...'}
        </span>
        <ChevronDown size={16} className={`text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-lg">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filter courses..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map(c => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => { onChange(c); setOpen(false); setSearch(''); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-primary-light transition ${value === c ? 'bg-primary-light text-primary font-semibold' : 'text-text-primary'}`}
                >
                  {value === c && <Check size={12} className="inline mr-1.5" />}
                  {c}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-xs text-text-secondary">No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── BranchSelect Component ───────────────────────────────────────────────────
function BranchSelect({
  course,
  value,
  onChange,
}: {
  course: string;
  value: string;
  onChange: (branch: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  const branches = COURSE_BRANCH_MAP[course] || [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset branch when course changes
  useEffect(() => { onChange(''); }, [course]); // eslint-disable-line

  if (!course) return null;

  const filtered = branches.filter(b => b.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-semibold text-text-primary mb-1">Branch / Specialization *</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary hover:border-slate-300 transition"
      >
        <span className={value ? 'text-text-primary' : 'text-text-secondary'}>
          {value || 'Select branch...'}
        </span>
        <ChevronDown size={16} className={`text-text-secondary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-border rounded-xl shadow-lg">
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filter branches..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map(b => (
              <li key={b}>
                <button
                  type="button"
                  onClick={() => { onChange(b); setOpen(false); setSearch(''); }}
                  className={`w-full text-left px-4 py-2 text-xs hover:bg-primary-light transition ${value === b ? 'bg-primary-light text-primary font-semibold' : 'text-text-primary'}`}
                >
                  {value === b && <Check size={12} className="inline mr-1.5" />}
                  {b}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-4 py-2 text-xs text-text-secondary">No matches</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function MentorOnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { submitMentorOnboarding, switchRole } = useApp();

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [rawFile, setRawFile] = useState<File | null>(null);

  // Step 1
  const [fullName, setFullName] = useState(searchParams.get('name') || 'Kabir Singh');
  const [email, setEmail] = useState(searchParams.get('email') || 'kabir.s@pilani.bits-pilani.ac.in');
  const [phone, setPhone] = useState(searchParams.get('phone') || '+91 98333 44556');
  const [collegeName, setCollegeName] = useState('BITS Pilani');
  const [course, setCourse] = useState('B.Tech / B.E. (Engineering)');
  const [branch, setBranch] = useState('Mechanical Engineering');
  const [year, setYear] = useState('2nd Year');
  const [enrollmentNumber, setEnrollmentNumber] = useState('2024A4PS0124P');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80');

  // Step 2
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; preview: string } | null>({
    name: 'bits_pilani_student_id_card.png',
    size: '1.8 MB',
    preview: 'https://images.unsplash.com/photo-1589330694653-dad6d3240e2b?auto=format&fit=crop&w=600&q=80',
  });
  const [consentConfirmed, setConsentConfirmed] = useState(true);

  // Step 3
  const [bio, setBio] = useState('BITSian studying Mechanical Engineering with a minor in Data Science. Happy to share unfiltered insights on BITSAT preparation, dual-degree cutoffs, and campus culture.');
  const [sessionPrice, setSessionPrice] = useState(249);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>(['College Admission', 'Entrance Preparation', 'Academics', 'Hostel and Campus Life']);
  const [availableDays, setAvailableDays] = useState<string[]>(['Tuesday', 'Thursday', 'Saturday', 'Sunday']);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>(['04:00 PM', '06:00 PM', '08:00 PM']);

  const allExpertiseOptions = ['College Admission', 'Course Selection', 'Branch Selection', 'Academics', 'Entrance Preparation', 'Placements', 'Internships', 'Hostel and Campus Life', 'College Experience'];
  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const slotsList = ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'];

  const toggleExpertise = (item: string) => setSelectedExpertise(prev => prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]);
  const toggleDay = (day: string) => setAvailableDays(prev => prev.includes(day) ? prev.filter(x => x !== day) : [...prev, day]);
  const toggleSlot = (slot: string) => setAvailableTimeSlots(prev => prev.includes(slot) ? prev.filter(x => x !== slot) : [...prev, slot]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRawFile(file);
      setUploadedFile({ name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, preview: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    let r2DocumentPath = '';
    if (rawFile) {
      try {
        const formData = new FormData();
        formData.append('file', rawFile);
        formData.append('collegeName', collegeName);
        const res = await fetch('/api/upload-verification', { method: 'POST', body: formData });
        if (res.ok) { const json = await res.json(); r2DocumentPath = json.data?.documentR2Path || ''; }
      } catch (err) { console.warn('R2 upload failed:', err); }
    }

    // Derive a slug-like collegeId from the name
    const collegeId = collegeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'other';

    await saveMentorOnboarding({ collegeId, collegeName, course, branch, currentYear: year, enrollmentNumber, bio, sessionPrice, expertise: selectedExpertise, availableDays, availableTimeSlots, verificationDocumentPath: r2DocumentPath });
    submitMentorOnboarding({ name: fullName, email, phone, collegeId, collegeName, course, branch, currentYear: year, enrollmentNumber, bio, avatar, sessionPrice, expertise: selectedExpertise, availableDays, availableTimeSlots }, r2DocumentPath || uploadedFile?.preview || '/mock-docs/sample-id.png');

    setSubmitting(false);
    switchRole('mentor');
    router.push('/mentor/verification');
  };

  return (
    <div className="min-h-screen bg-background-secondary py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
              <GraduationCap size={22} />
            </div>
            <span className="font-bold text-xl tracking-tight text-text-primary">GradSetu</span>
          </Link>

          {/* Stepper */}
          <div className="flex items-center justify-between max-w-lg mx-auto px-2">
            {[{ num: 1, label: 'Profile' }, { num: 2, label: 'Verification' }, { num: 3, label: 'Set Guidance' }, { num: 4, label: 'Review' }].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${step === s.num ? 'bg-primary text-white ring-4 ring-primary-light' : step > s.num ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {step > s.num ? <Check size={14} className="stroke-[3]" /> : s.num}
                  </div>
                  <span className={`text-[11px] font-medium mt-1.5 ${step >= s.num ? 'text-primary' : 'text-slate-400'}`}>{s.label}</span>
                </div>
                {idx < 3 && <div className={`flex-1 h-0.5 mx-2 ${step > idx + 1 ? 'bg-primary' : 'bg-slate-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl shadow-sm p-6 sm:p-10">

          {/* ── STEP 1: Profile ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">Create your mentor profile</h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Tell aspirants about you and your college experience.</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4 py-2 border-b border-border pb-5">
                <img src={avatar} alt={fullName} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
                <div>
                  <button
                    type="button"
                    onClick={() => { const newAv = prompt('Enter image URL:', avatar); if (newAv) setAvatar(newAv); }}
                    className="px-3 py-1.5 text-xs font-semibold border border-border rounded-lg hover:bg-background-secondary text-text-primary transition"
                  >
                    Change Photo
                  </button>
                  <p className="text-[11px] text-text-secondary mt-1">Clear front-facing profile picture recommended.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Full Name *</label>
                  <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary" />
                  <p className="text-[11px] text-text-secondary mt-1">Enter name as it appears on your college identity card.</p>
                </div>

                {/* ── COLLEGE SEARCH (live internet search) ── */}
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">
                    College / University *
                    <span className="ml-1.5 text-[10px] font-normal text-primary bg-primary-light px-1.5 py-0.5 rounded-full">Live Search</span>
                  </label>
                  <CollegeSearchInput
                    value={collegeName}
                    onChange={name => setCollegeName(name)}
                  />
                  <p className="text-[11px] text-text-secondary mt-1">Type to search any college/university worldwide in real-time.</p>
                </div>

                {/* ── COURSE (dropdown) ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">Course *</label>
                    <CourseSelect value={course} onChange={c => { setCourse(c); setBranch(''); }} />
                  </div>

                  {/* ── BRANCH (appears after course selected) ── */}
                  {course && (
                    <BranchSelect course={course} value={branch} onChange={setBranch} />
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Current Academic Year *</label>
                  <select value={year} onChange={e => setYear(e.target.value)} className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary">
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                    <option>5th Year / Dual Degree</option>
                  </select>
                </div>

                {/* Enrollment */}
                <div>
                  <label className="block text-xs font-semibold text-text-primary mb-1">Enrollment Number / Roll Number *</label>
                  <input type="text" required value={enrollmentNumber} onChange={e => setEnrollmentNumber(e.target.value)} placeholder="e.g. 2024A4PS0124P" className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary" />
                  <p className="text-[11px] text-text-secondary mt-1">Required for manual identity verification against college records.</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="button" onClick={() => setStep(2)} className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center gap-2">
                  <span>Next: Verify Student Identity</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Verification ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">Verify your student identity</h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Upload a valid college ID / bonafide / fee receipt to get verified.</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-6 sm:p-8 text-center bg-background-secondary/50">
                {uploadedFile ? (
                  <div className="space-y-4">
                    <div className="max-w-xs mx-auto border border-border rounded-lg overflow-hidden shadow-sm bg-white">
                      <img src={uploadedFile.preview} alt="Uploaded Student ID" className="w-full h-40 object-cover" />
                      <div className="p-3 text-left flex items-center justify-between">
                        <div className="truncate pr-2">
                          <p className="text-xs font-semibold text-text-primary truncate">{uploadedFile.name}</p>
                          <p className="text-[10px] text-text-secondary">{uploadedFile.size}</p>
                        </div>
                        <button type="button" onClick={() => setUploadedFile(null)} className="text-status-error hover:bg-red-50 p-1 rounded" title="Remove file">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <label className="cursor-pointer text-xs font-semibold text-primary hover:underline">
                      Replace File
                      <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} />
                    </label>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto"><UploadCloud size={24} /></div>
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary">Upload College ID / Bonafide / Fee Receipt</h4>
                      <p className="text-xs text-text-secondary mt-0.5">PDF, JPG or PNG (Max 5 MB)</p>
                    </div>
                    <label className="inline-block mt-2 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark cursor-pointer transition shadow-sm">
                      Choose File
                      <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} />
                    </label>
                  </div>
                )}
              </div>

              <div className="bg-primary-light/50 border border-primary-secondary rounded-xl p-4 space-y-2.5">
                {[['Your document is private and secure.', 'Never displayed on your public profile.'], ['Manually verified by GradSetu team.', 'Usually audited within 24 hours.'], ['Only verified students can take paid guidance sessions.', 'Ensures high trust for aspirants.']].map(([bold, rest], i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-text-primary">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>{bold}</strong> {rest}</span>
                  </div>
                ))}
              </div>

              <div>
                <label className="flex items-start text-xs text-text-secondary cursor-pointer">
                  <input type="checkbox" checked={consentConfirmed} onChange={e => setConsentConfirmed(e.target.checked)} className="mt-0.5 rounded border-border text-primary focus:ring-primary mr-2" />
                  <span>I confirm that the information and document provided belong to me and accurately represent my student status.</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-border">
                <button type="button" onClick={() => setStep(1)} className="px-4 py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition">Back</button>
                <button type="button" disabled={!uploadedFile || !consentConfirmed} onClick={() => setStep(3)} className="px-6 py-2.5 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center gap-2">
                  <span>Next: Set Guidance & Pricing</span><ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Guidance ── */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">Set Guidance Topics & Pricing</h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Define what you want to guide aspirants on and set your session fee.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Short Biography / Mentor Intro *</label>
                <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell students about your JEE/entrance rank, college clubs, and what you can answer..." className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-2">Guidance Categories (Select all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allExpertiseOptions.map(topic => {
                    const isSelected = selectedExpertise.includes(topic);
                    return (
                      <button key={topic} type="button" onClick={() => toggleExpertise(topic)} className={`text-xs py-2 px-2.5 rounded-lg border text-left transition ${isSelected ? 'border-primary bg-primary-light text-primary font-semibold' : 'border-border bg-white text-text-secondary hover:bg-background-secondary'}`}>
                        {isSelected ? '✓ ' : '+ '}{topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1">Session Fee (30-min 1-on-1 Call)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[199, 299, 399].map(fee => (
                    <button key={fee} type="button" onClick={() => setSessionPrice(fee)} className={`py-2 text-sm rounded-lg border text-center font-bold transition ${sessionPrice === fee ? 'border-primary bg-primary text-white shadow-sm' : 'border-border bg-white text-text-primary hover:border-slate-300'}`}>
                      ₹{fee}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">Available Days for Calls</label>
                <div className="flex flex-wrap gap-1.5">
                  {daysList.map(day => {
                    const isSelected = availableDays.includes(day);
                    return (
                      <button key={day} type="button" onClick={() => toggleDay(day)} className={`text-xs px-3 py-1.5 rounded-lg border transition ${isSelected ? 'border-primary bg-primary text-white font-medium' : 'border-border bg-white text-text-secondary hover:bg-background-secondary'}`}>
                        {day.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary mb-1.5">Available Time Slots</label>
                <div className="flex flex-wrap gap-1.5">
                  {slotsList.map(slot => {
                    const isSelected = availableTimeSlots.includes(slot);
                    return (
                      <button key={slot} type="button" onClick={() => toggleSlot(slot)} className={`text-xs px-3 py-1.5 rounded-lg border transition ${isSelected ? 'border-primary bg-primary-light text-primary font-semibold' : 'border-border bg-white text-text-secondary hover:bg-background-secondary'}`}>
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-border">
                <button type="button" onClick={() => setStep(2)} className="px-4 py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition">Back</button>
                <button type="button" onClick={() => setStep(4)} className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-sm transition flex items-center gap-2">
                  <span>Next: Review Application</span><ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 4: Review ── */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">Review & Submit Application</h1>
                <p className="text-xs sm:text-sm text-text-secondary mt-1">Please verify your details before submitting for official verification.</p>
              </div>

              <div className="bg-background-secondary rounded-xl p-5 space-y-3 text-xs sm:text-sm divide-y divide-border">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <img src={avatar} alt={fullName} className="w-10 h-10 rounded-full object-cover border" />
                    <div>
                      <div className="font-bold text-text-primary">{fullName}</div>
                      <div className="text-xs text-text-secondary">{email} • {phone}</div>
                    </div>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="text-primary hover:underline text-xs font-semibold">Edit</button>
                </div>
                <div className="flex justify-between py-2"><span className="text-text-secondary">College / University:</span><span className="font-semibold text-text-primary">{collegeName}</span></div>
                <div className="flex justify-between py-2"><span className="text-text-secondary">Course:</span><span className="font-semibold text-text-primary">{course}</span></div>
                <div className="flex justify-between py-2"><span className="text-text-secondary">Branch:</span><span className="font-semibold text-text-primary">{branch} ({year})</span></div>
                <div className="flex justify-between py-2"><span className="text-text-secondary">Enrollment Number:</span><span className="font-semibold text-text-primary">{enrollmentNumber}</span></div>
                <div className="flex justify-between py-2"><span className="text-text-secondary">ID Document:</span><span className="font-semibold text-emerald-600 flex items-center gap-1"><FileText size={14} />{uploadedFile?.name || 'Attached'}</span></div>
                <div className="flex justify-between py-2"><span className="text-text-secondary">Fee per 30-min call:</span><span className="font-bold text-primary">₹{sessionPrice}</span></div>
                <div className="py-2">
                  <span className="text-text-secondary block mb-1">Expertise:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedExpertise.map(e => <span key={e} className="bg-white border px-2 py-0.5 rounded text-[10px] text-text-primary">{e}</span>)}
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                <div><strong>Verification Notice:</strong> Upon submission, your profile will be marked as <span className="font-bold underline">Pending Verification</span>. You will appear in the public mentor marketplace once the GradSetu admin team validates your student ID document.</div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-border">
                <button type="button" onClick={() => setStep(3)} className="px-4 py-2 text-text-secondary hover:text-text-primary text-sm font-medium transition">Back</button>
                <button type="button" disabled={submitting} onClick={handleSubmit} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition flex items-center gap-2 disabled:opacity-70">
                  {submitting ? <><Loader2 size={18} className="animate-spin" /><span>Submitting...</span></> : <><span>Submit for Verification</span><ShieldCheck size={18} /></>}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function MentorOnboardingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading onboarding...</div>}>
      <MentorOnboardingContent />
    </Suspense>
  );
}
