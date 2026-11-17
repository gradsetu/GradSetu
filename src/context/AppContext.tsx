'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  AspirantProfile, 
  MentorProfile, 
  College, 
  Booking, 
  PaymentTransaction, 
  Review, 
  SupportTicket, 
  UserRole,
  VerificationStatus
} from '@/types';
import { initialColleges } from '@/data/colleges';
import { initialMentors } from '@/data/mentors';
import { initialUsers, initialAspirantProfile } from '@/data/users';
import { initialBookings } from '@/data/bookings';
import { initialReviews, initialPayments } from '@/data/reviews';
import { createClient as createBrowserSupabase } from '@/lib/supabase/client';

interface AppContextType {
  isHydrated: boolean;
  currentUser: User | null;
  currentRole: UserRole;
  aspirantProfile: AspirantProfile;
  mentors: MentorProfile[];
  colleges: College[];
  bookings: Booking[];
  payments: PaymentTransaction[];
  reviews: Review[];
  supportTickets: SupportTicket[];
  comparisonCollegeIds: string[];
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  loginAs: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  
  // Aspirant actions
  updateAspirantProfile: (profile: Partial<AspirantProfile>) => void;
  toggleShortlistCollege: (collegeId: string) => void;
  isCollegeShortlisted: (collegeId: string) => boolean;
  addToComparison: (collegeId: string) => boolean;
  removeFromComparison: (collegeId: string) => void;
  clearComparison: () => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt'>) => Booking;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  completeBooking: (bookingId: string) => void;
  addReview: (mentorId: string, rating: number, comment: string) => void;
  
  // Mentor actions
  updateMentorProfile: (mentorId: string, updates: Partial<MentorProfile>) => void;
  submitMentorOnboarding: (data: Partial<MentorProfile>, docPreview?: string) => void;
  updateMentorAvailability: (mentorId: string, days: string[], slots: string[]) => void;
  
  // Admin actions
  verifyMentor: (mentorId: string, status: VerificationStatus, remarks?: string) => void;
  addCollege: (college: College) => void;
  updateCollege: (collegeId: string, updates: Partial<College>) => void;
  deleteCollege: (collegeId: string) => void;
  toggleReviewVisibility: (reviewId: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  resetAllData: () => void;
}

const STORAGE_KEY = 'gradsetu_v2_store';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Guest / unauthenticated by default
  const [currentRole, setCurrentRole] = useState<UserRole>('aspirant');
  const [aspirantProfile, setAspirantProfile] = useState<AspirantProfile>(initialAspirantProfile);
  const [mentors, setMentors] = useState<MentorProfile[]>(initialMentors);
  const [colleges, setColleges] = useState<College[]>(initialColleges);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [payments, setPayments] = useState<PaymentTransaction[]>(initialPayments);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [comparisonCollegeIds, setComparisonCollegeIds] = useState<string[]>([
    'iit-delhi',
    'iit-bombay',
    'nit-trichy'
  ]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TICK-101',
      userId: 'user-aspirant-ananya',
      userName: 'Ananya Verma',
      userRole: 'aspirant',
      subject: 'Question regarding mock interview schedule',
      message: 'Can I extend my guidance call with Ritik Sharma if we have leftover questions?',
      priority: 'low',
      status: 'open',
      createdAt: '2026-01-26T10:00:00Z'
    },
    {
      id: 'TICK-102',
      userId: 'user-mentor-kabir',
      userName: 'Kabir Singh',
      userRole: 'mentor',
      subject: 'College ID re-verification query',
      message: 'I have uploaded my BITS Pilani smart ID card. How long does verification take?',
      priority: 'medium',
      status: 'in_progress',
      assignedAdmin: 'Rajesh Kumar',
      createdAt: '2026-02-01T12:00:00Z'
    }
  ]);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.currentRole) setCurrentRole(parsed.currentRole);
        if (parsed.aspirantProfile) setAspirantProfile(parsed.aspirantProfile);
        if (parsed.mentors) setMentors(parsed.mentors);
        if (parsed.colleges && Array.isArray(parsed.colleges)) {
          const mergedMap = new Map<string, College>();
          initialColleges.forEach(c => mergedMap.set(c.id, c));
          parsed.colleges.forEach((c: College) => {
            const existing = mergedMap.get(c.id);
            mergedMap.set(c.id, existing ? { ...existing, ...c } : c);
          });
          setColleges(Array.from(mergedMap.values()));
        }
        if (parsed.bookings) setBookings(parsed.bookings);
        if (parsed.payments) setPayments(parsed.payments);
        if (parsed.reviews) setReviews(parsed.reviews);
        if (parsed.comparisonCollegeIds) setComparisonCollegeIds(parsed.comparisonCollegeIds);
        if (parsed.supportTickets) setSupportTickets(parsed.supportTickets);
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    } finally {
      setIsHydrated(true);
    }

    // Live sync with Supabase Auth and Database
    try {
      const supabase = createBrowserSupabase();

      // Sync active session if authenticated
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile) {
                setCurrentUser({
                  id: profile.id,
                  name: profile.full_name || 'GradSetu User',
                  email: session.user.email || '',
                  phone: '',
                  role: profile.role as UserRole,
                  createdAt: profile.created_at,
                  status: 'active',
                });
                setCurrentRole(profile.role as UserRole);
              }
            });
        }
      });

      // Sync live colleges from Supabase
      supabase
        .from('colleges')
        .select('*')
        .order('nirf_rank', { ascending: true })
        .then(({ data }) => {
          if (data && data.length > 0) {
            const dbList: College[] = data.map((c) => ({
              id: c.id,
              name: c.name,
              shortName: c.short_name,
              city: c.city,
              state: c.state,
              type: c.type as College['type'],
              rating: Number(c.rating),
              reviewCount: c.review_count || 0,
              featuredImage: c.featured_image || '',
              campusImages: (c.campus_images as unknown as string[]) || [],
              about: c.about || '',
              establishedYear: c.established_year || 2000,
              campusSize: c.campus_size || '',
              tuitionFeePerYear: c.tuition_fee_per_year || '',
              tuitionFeeNum: Number(c.tuition_fee_num || 0),
              avgPackage: c.avg_package || '',
              avgPackageNum: Number(c.avg_package_num || 0),
              medianPackage: (c as any).median_package || undefined,
              medianPackageNum: Number((c as any).median_package_num || 0),
              highestPackage: c.highest_package || '',
              highestPackageNum: Number(c.highest_package_num || 0),
              placementRate: c.placement_rate || 0,
              hasHostel: Boolean(c.has_hostel),
              hostelFeePerYear: (c as any).hostel_fee_per_year || undefined,
              nirfRank: c.nirf_rank || 0,
              admissionCriteria: c.admission_criteria || '',
              facilities: c.facilities || [],
              courses: (c.courses as unknown as College['courses']) || [],
              websiteUrl: c.website_url || undefined,
              topRecruiters: (c as any).top_recruiters || [],
              accreditation: (c as any).accreditation || undefined,
              lastCrawledAt: c.last_crawled_at || undefined,
              crawlSource: c.crawl_source || undefined,
            }));

            setColleges((prev) => {
              const map = new Map<string, College>();
              prev.forEach(c => map.set(c.id, c));
              dbList.forEach(c => {
                const ex = map.get(c.id);
                map.set(c.id, ex ? { ...ex, ...c } : c);
              });
              return Array.from(map.values());
            });
          }
        });

      // Sync live mentors from Supabase
      supabase
        .from('mentor_profiles')
        .select(`
          *,
          profiles:id (
            full_name
          )
        `)
        .order('rating', { ascending: false })
        .then(({ data }) => {
          if (data && data.length > 0) {
            setMentors(
              data.map((m) => ({
                id: m.id,
                userId: m.id,
                name: (m.profiles as any)?.full_name || 'Verified Mentor',
                email: '',
                phone: '',
                avatar: m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                collegeId: m.college_id || '',
                collegeName: m.college_name || '',
                collegeLocation: m.college_location || '',
                state: m.state || '',
                course: m.course || '',
                branch: m.branch || '',
                currentYear: m.current_year || '',
                graduationYear: m.graduation_year || '',
                enrollmentNumber: m.enrollment_number || '',
                bio: m.bio || '',
                expertise: m.expertise || [],
                sessionPrice: m.session_price || 299,
                sessionDuration: m.session_duration || 30,
                rating: Number(m.rating || 5.0),
                reviewCount: m.review_count || 0,
                totalSessions: m.total_sessions || 0,
                totalEarnings: m.total_earnings || 0,
                verificationStatus: (m.verification_status as VerificationStatus) || 'not_submitted',
                verificationDocumentUrl: m.verification_document_url || undefined,
                verificationRemarks: m.verification_remarks || undefined,
                verificationSubmittedAt: m.verification_submitted_at || undefined,
                availableDays: m.available_days || ['Monday', 'Wednesday', 'Friday', 'Saturday'],
                availableTimeSlots: m.available_time_slots || ['11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'],
                isPubliclyListed: m.is_publicly_listed ?? true,
              }))
            );
          }
        });

      // Sync public reviews from Supabase
      supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data && data.length > 0) {
            setReviews(
              data.map((r) => ({
                id: r.id,
                mentorId: r.mentor_id,
                aspirantId: r.aspirant_id || undefined,
                aspirantName: r.aspirant_name,
                aspirantAvatar: r.aspirant_avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                rating: Number(r.rating),
                comment: r.comment,
                date: new Date(r.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }),
                isModerated: Boolean(r.is_moderated),
                isVisible: Boolean(r.is_visible),
              }))
            );
          }
        });

      // Sync bookings from Supabase
      supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data && data.length > 0) {
            setBookings(
              data.map((b) => ({
                id: b.id,
                aspirantId: b.aspirant_id,
                aspirantName: 'Aspirant',
                aspirantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                mentorId: b.mentor_id,
                mentorName: 'Verified Mentor',
                mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
                collegeName: b.college_name || 'Premier College',
                course: b.course || 'Undergraduate Program',
                sessionType: b.session_type,
                date: b.session_date,
                time: b.session_time,
                durationMinutes: b.duration_minutes || 30,
                amount: b.amount || 299,
                status: (b.status as Booking['status']) || 'pending',
                paymentStatus: (b.payment_status as Booking['paymentStatus']) || 'pending',
                paymentMethod: b.payment_method || undefined,
                transactionId: b.transaction_id || undefined,
                meetLink: b.meet_link || undefined,
                createdAt: b.created_at,
              }))
            );
          }
        });

      // Sync support tickets from Supabase
      supabase
        .from('support_tickets')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data && data.length > 0) {
            setSupportTickets(
              data.map((t) => ({
                id: t.id,
                userId: t.user_id || 'anonymous',
                userName: t.user_name,
                userRole: (t.user_role as UserRole) || 'aspirant',
                subject: t.subject,
                message: t.message,
                priority: (t.priority as 'low' | 'medium' | 'high') || 'medium',
                status: (t.status as 'open' | 'in_progress' | 'resolved') || 'open',
                createdAt: t.created_at,
              }))
            );
          }
        });

      // Listen for auth state changes live
      const { data: authSubscription } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data: profile }) => {
              if (profile) {
                setCurrentUser({
                  id: profile.id,
                  name: profile.full_name || 'GradSetu User',
                  email: session.user.email || '',
                  phone: profile.phone || '',
                  avatar: profile.avatar || undefined,
                  role: profile.role as UserRole,
                  createdAt: profile.created_at,
                  status: 'active',
                });
                setCurrentRole(profile.role as UserRole);
              }
            });
        }
      });

      return () => {
        authSubscription?.subscription?.unsubscribe();
      };
    } catch (e) {
      console.warn('Supabase client hydration sync skipped:', e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToPersist = {
        currentUser,
        currentRole,
        aspirantProfile,
        mentors,
        colleges,
        bookings,
        payments,
        reviews,
        comparisonCollegeIds,
        supportTickets,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToPersist));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [
    isHydrated,
    currentUser,
    currentRole,
    aspirantProfile,
    mentors,
    colleges,
    bookings,
    payments,
    reviews,
    comparisonCollegeIds,
    supportTickets
  ]);

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'aspirant') {
      const user = initialUsers.find(u => u.role === 'aspirant') || null;
      setCurrentUser(user);
    } else if (role === 'mentor') {
      const user = initialUsers.find(u => u.id === 'user-mentor-ritik') || null;
      setCurrentUser(user);
    } else if (role === 'admin') {
      const user = initialUsers.find(u => u.role === 'admin') || null;
      setCurrentUser(user);
    }
  };

  const loginAs = (email: string, role?: UserRole): boolean => {
    const user = initialUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || 
      (role ? {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        phone: '+91 99999 88888',
        role: role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        createdAt: new Date().toISOString(),
        status: 'active' as const
      } : null);

    if (user) {
      setCurrentUser(user);
      setCurrentRole(user.role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      const supabase = createBrowserSupabase();
      supabase.auth.signOut().catch(() => {});
    } catch {}
  };

  const updateAspirantProfile = (profile: Partial<AspirantProfile>) => {
    setAspirantProfile(prev => ({ ...prev, ...profile }));

    try {
      const supabase = createBrowserSupabase();
      if (currentUser?.id) {
        const dbUpdates: Record<string, unknown> = {
          updated_at: new Date().toISOString(),
        };
        if (profile.targetAdmissionYear !== undefined) {
          dbUpdates.target_year = parseInt(profile.targetAdmissionYear, 10);
        }
        if (profile.expectedBudget !== undefined) dbUpdates.budget = profile.expectedBudget;
        if (profile.preferredCourse !== undefined) dbUpdates.preferred_course = profile.preferredCourse;
        if (profile.preferredBranch !== undefined) dbUpdates.preferred_branch = profile.preferredBranch;
        if (profile.entranceExams !== undefined) dbUpdates.entrance_exams = profile.entranceExams;
        if (profile.hostelPreference !== undefined) dbUpdates.hostel_preference = profile.hostelPreference;

        void supabase
          .from('aspirant_profiles')
          .update(dbUpdates as any)
          .eq('id', currentUser.id);
      }
    } catch {}
  };

  const toggleShortlistCollege = (collegeId: string) => {
    setAspirantProfile(prev => {
      const exists = prev.shortlistedCollegeIds.includes(collegeId);
      const updated = exists 
        ? prev.shortlistedCollegeIds.filter(id => id !== collegeId)
        : [...prev.shortlistedCollegeIds, collegeId];
      return { ...prev, shortlistedCollegeIds: updated };
    });
  };

  const isCollegeShortlisted = (collegeId: string) => {
    return aspirantProfile.shortlistedCollegeIds.includes(collegeId);
  };

  const addToComparison = (collegeId: string): boolean => {
    if (comparisonCollegeIds.includes(collegeId)) return true;
    if (comparisonCollegeIds.length >= 4) return false;
    setComparisonCollegeIds(prev => [...prev, collegeId]);
    return true;
  };

  const removeFromComparison = (collegeId: string) => {
    setComparisonCollegeIds(prev => prev.filter(id => id !== collegeId));
  };

  const clearComparison = () => {
    setComparisonCollegeIds([]);
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bkg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);

    // Also add to transactions
    const newTxn: PaymentTransaction = {
      id: newBooking.transactionId || `TXN-GS-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingId: newBooking.id,
      aspirantName: newBooking.aspirantName,
      mentorName: newBooking.mentorName,
      amount: newBooking.amount,
      method: (newBooking.paymentMethod as any) || 'UPI',
      status: 'paid',
      date: new Date().toISOString()
    };
    setPayments(prev => [newTxn, ...prev]);

    // Update mentor total sessions and earnings
    setMentors(prev => prev.map(m => {
      if (m.id === newBooking.mentorId) {
        return {
          ...m,
          totalSessions: m.totalSessions + 1,
          totalEarnings: m.totalEarnings + newBooking.amount
        };
      }
      return m;
    }));

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, date: newDate, time: newTime } : b));
  };

  const completeBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed' } : b));
  };

  const addReview = (mentorId: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      mentorId,
      aspirantId: currentUser?.id || 'user-aspirant-ananya',
      aspirantName: currentUser?.name || 'Ananya Verma',
      aspirantAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200',
      rating,
      comment,
      date: 'Just now',
      isModerated: true,
      isVisible: true
    };
    setReviews(prev => [newRev, ...prev]);

    try {
      const supabase = createBrowserSupabase();
      void supabase.from('reviews').insert({
        mentor_id: mentorId,
        aspirant_id: currentUser?.id || null,
        aspirant_name: newRev.aspirantName,
        aspirant_avatar: newRev.aspirantAvatar,
        rating: newRev.rating,
        comment: newRev.comment,
        is_moderated: true,
        is_visible: true,
      });
    } catch {}

    setMentors(prev => prev.map(m => {
      if (m.id === mentorId) {
        const newCount = m.reviewCount + 1;
        const newRating = Number(((m.rating * m.reviewCount + rating) / newCount).toFixed(1));
        return {
          ...m,
          reviewCount: newCount,
          rating: newRating
        };
      }
      return m;
    }));
  };

  const updateMentorProfile = (mentorId: string, updates: Partial<MentorProfile>) => {
    setMentors(prev => prev.map(m => m.id === mentorId ? { ...m, ...updates } : m));

    try {
      const supabase = createBrowserSupabase();
      const dbUpdates: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
      if (updates.sessionPrice !== undefined) dbUpdates.session_price = updates.sessionPrice;
      if (updates.branch !== undefined) dbUpdates.branch = updates.branch;
      if (updates.currentYear !== undefined) dbUpdates.current_year = updates.currentYear;
      if (updates.verificationStatus !== undefined) dbUpdates.verification_status = updates.verificationStatus;
      if (updates.verificationRemarks !== undefined) dbUpdates.verification_remarks = updates.verificationRemarks;
      if (updates.verificationDocumentUrl !== undefined) dbUpdates.verification_document_url = updates.verificationDocumentUrl;
      if (updates.verificationSubmittedAt !== undefined) dbUpdates.verification_submitted_at = updates.verificationSubmittedAt;

      void supabase
        .from('mentor_profiles')
        .update(dbUpdates as any)
        .eq('id', mentorId);
    } catch {}
  };

  const submitMentorOnboarding = (data: Partial<MentorProfile>, docPreview?: string) => {
    const newMentor: MentorProfile = {
      id: `mentor-${Date.now()}`,
      userId: currentUser?.id || `user-${Date.now()}`,
      name: data.name || 'New Mentor',
      email: data.email || currentUser?.email || 'mentor@example.com',
      phone: data.phone || '+91 98765 00000',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      collegeId: data.collegeId || 'other',
      collegeName: data.collegeName || 'College',
      collegeLocation: data.collegeLocation || 'India',
      state: data.state || 'Delhi',
      course: data.course || 'B.Tech',
      branch: data.branch || 'General',
      currentYear: data.currentYear || '1st Year',
      graduationYear: data.graduationYear || '2027',
      enrollmentNumber: data.enrollmentNumber || 'ENR123456',
      bio: data.bio || '',
      expertise: data.expertise || ['College Admission', 'Academics'],
      sessionPrice: data.sessionPrice || 299,
      sessionDuration: 30,
      rating: 0,
      reviewCount: 0,
      totalSessions: 0,
      totalEarnings: 0,
      verificationStatus: 'pending',
      verificationDocumentUrl: docPreview || '/mock-docs/sample-id.png',
      verificationSubmittedAt: new Date().toISOString(),
      availableDays: data.availableDays || ['Wednesday', 'Saturday', 'Sunday'],
      availableTimeSlots: data.availableTimeSlots || ['04:00 PM', '06:00 PM'],
      isPubliclyListed: false
    };

    setMentors(prev => [newMentor, ...prev]);

    // Also update current user if mentor
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, name: newMentor.name, role: 'mentor' } : null);
    }
  };

  const updateMentorAvailability = (mentorId: string, days: string[], slots: string[]) => {
    setMentors(prev => prev.map(m => m.id === mentorId ? { ...m, availableDays: days, availableTimeSlots: slots } : m));

    try {
      const supabase = createBrowserSupabase();
      void supabase
        .from('mentor_profiles')
        .update({
          available_days: days,
          available_time_slots: slots,
          updated_at: new Date().toISOString(),
        })
        .eq('id', mentorId);
    } catch {}
  };

  const verifyMentor = (mentorId: string, status: VerificationStatus, remarks?: string) => {
    setMentors(prev => prev.map(m => {
      if (m.id === mentorId) {
        return {
          ...m,
          verificationStatus: status,
          verificationRemarks: remarks,
          isPubliclyListed: status === 'approved'
        };
      }
      return m;
    }));
  };

  const addCollege = (college: College) => {
    setColleges(prev => [college, ...prev]);
  };

  const updateCollege = (collegeId: string, updates: Partial<College>) => {
    setColleges(prev => prev.map(c => c.id === collegeId ? { ...c, ...updates } : c));
  };

  const deleteCollege = (collegeId: string) => {
    setColleges(prev => prev.filter(c => c.id !== collegeId));
  };

  const toggleReviewVisibility = (reviewId: string) => {
    setReviews(prev => {
      const target = prev.find(r => r.id === reviewId);
      const nextVisible = target ? !target.isVisible : true;
      try {
        const supabase = createBrowserSupabase();
        void supabase
          .from('reviews')
          .update({ is_visible: nextVisible })
          .eq('id', reviewId);
      } catch {}
      return prev.map(r => r.id === reviewId ? { ...r, isVisible: nextVisible } : r);
    });
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
    try {
      const supabase = createBrowserSupabase();
      void supabase
        .from('support_tickets')
        .update({ status })
        .eq('id', ticketId);
    } catch {}
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
    setCurrentRole('aspirant');
    setAspirantProfile(initialAspirantProfile);
    setMentors(initialMentors);
    setColleges(initialColleges);
    setBookings(initialBookings);
    setPayments(initialPayments);
    setReviews(initialReviews);
    setComparisonCollegeIds(['iit-delhi', 'iit-bombay', 'nit-trichy']);
  };

  return (
    <AppContext.Provider
      value={{
        isHydrated,
        currentUser,
        currentRole,
        aspirantProfile,
        mentors,
        colleges,
        bookings,
        payments,
        reviews,
        supportTickets,
        comparisonCollegeIds,
        setCurrentUser,
        switchRole,
        loginAs,
        logout,
        updateAspirantProfile,
        toggleShortlistCollege,
        isCollegeShortlisted,
        addToComparison,
        removeFromComparison,
        clearComparison,
        createBooking,
        cancelBooking,
        rescheduleBooking,
        completeBooking,
        addReview,
        updateMentorProfile,
        submitMentorOnboarding,
        updateMentorAvailability,
        verifyMentor,
        addCollege,
        updateCollege,
        deleteCollege,
        toggleReviewVisibility,
        updateTicketStatus,
        resetAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

