export type UserRole = 'aspirant' | 'mentor' | 'admin';

export type VerificationStatus = 
  | 'not_submitted'
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'resubmission_required';

export type BookingStatus = 'confirmed' | 'completed' | 'cancelled' | 'pending';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  status: 'active' | 'suspended';
}

export interface AspirantProfile {
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  currentEducationLevel: string;
  qualification: string;
  stream: string;
  academicScore: string;
  preferredCourse: string;
  preferredBranch: string;
  targetAdmissionYear: string;
  entranceExams: string[];
  expectedBudget: string;
  hostelPreference: 'yes' | 'no' | 'flexible';
  careerInterests: string[];
  shortlistedCollegeIds: string[];
}

export interface MentorProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  collegeId: string;
  collegeName: string;
  collegeLocation: string;
  state: string;
  course: string;
  branch: string;
  currentYear: string;
  graduationYear: string;
  enrollmentNumber: string;
  bio: string;
  expertise: string[];
  sessionPrice: number; // e.g. 299 in INR
  sessionDuration: number; // minutes (e.g. 30)
  rating: number;
  reviewCount: number;
  totalSessions: number;
  totalEarnings: number;
  verificationStatus: VerificationStatus;
  verificationDocumentUrl?: string;
  verificationRemarks?: string;
  verificationSubmittedAt?: string;
  availableDays: string[]; // e.g. ['Monday', 'Wednesday', 'Friday', 'Saturday']
  availableTimeSlots: string[]; // e.g. ['11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM']
  isPubliclyListed: boolean;
}

export interface College {
  id: string;
  name: string;
  shortName: string;
  city: string;
  state: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'BITS' | 'AIIMS' | 'IIM' | 'Law University' | 'Central University' | 'State University' | 'Private University' | string;
  rating: number;
  reviewCount: number;
  featuredImage: string;
  campusImages: string[];
  about: string;
  establishedYear: number;
  campusSize: string;
  tuitionFeePerYear: string; // e.g. "₹2.5 Lakh"
  tuitionFeeNum: number; // 250000
  avgPackage: string; // e.g. "₹25.8 LPA"
  avgPackageNum: number; // 25.8
  highestPackage: string; // e.g. "₹1.4 CPA"
  highestPackageNum: number; // 140
  placementRate: number; // e.g. 98
  hasHostel: boolean;
  courses: {
    name: string;
    duration: string;
    seats: number;
    annualFee: string;
    cutoffRank: string;
  }[];
  facilities: string[];
  admissionCriteria: string;
  nirfRank: number;
  websiteUrl?: string;
  lastCrawledAt?: string;
  crawlSource?: string;
  medianPackage?: string;
  medianPackageNum?: number;
  hostelFeePerYear?: string;
  topRecruiters?: string[];
  accreditation?: string;
  campusAddress?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface Booking {
  id: string;
  aspirantId: string;
  aspirantName: string;
  aspirantAvatar?: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  collegeName: string;
  course: string;
  sessionType: string;
  date: string; // "Wed, 29 Jan 2026"
  time: string; // "04:00 PM"
  durationMinutes: number;
  amount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  meetLink?: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  aspirantName: string;
  mentorName: string;
  amount: number;
  method: 'UPI' | 'Card' | 'Net Banking';
  status: PaymentStatus;
  date: string;
}

export interface Review {
  id: string;
  mentorId: string;
  aspirantId?: string;
  aspirantName: string;
  aspirantAvatar: string;
  rating: number;
  comment: string;
  date: string;
  isModerated: boolean;
  isVisible: boolean;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved';
  assignedAdmin?: string;
  createdAt: string;
}

