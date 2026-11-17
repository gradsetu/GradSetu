import { User, AspirantProfile } from '@/types';

export const initialUsers: User[] = [
  {
    id: 'user-aspirant-ananya',
    name: 'Ananya Verma',
    email: 'ananya@example.com',
    phone: '+91 98765 00001',
    role: 'aspirant',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-05T08:00:00Z',
    status: 'active'
  },
  {
    id: 'user-mentor-ritik',
    name: 'Ritik Sharma',
    email: 'ritik@example.com',
    phone: '+91 98765 43210',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-01-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'user-mentor-kabir',
    name: 'Kabir Singh',
    email: 'kabir@example.com',
    phone: '+91 98333 44556',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    createdAt: '2026-02-01T11:45:00Z',
    status: 'active'
  },
  {
    id: 'user-admin-rajesh',
    name: 'Admin Rajesh Kumar',
    email: 'admin@gradsetu.com',
    phone: '+91 98000 99999',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    createdAt: '2025-12-01T00:00:00Z',
    status: 'active'
  }
];

export const initialAspirantProfile: AspirantProfile = {
  userId: 'user-aspirant-ananya',
  name: 'Ananya Verma',
  email: 'ananya@example.com',
  phone: '+91 98765 00001',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
  city: 'Jaipur',
  currentEducationLevel: 'Class 12 Completed',
  qualification: 'CBSE Class XII - PCM',
  stream: 'Science (PCM)',
  academicScore: '94.2%',
  preferredCourse: 'B.Tech / Engineering',
  preferredBranch: 'Computer Science and Engineering',
  targetAdmissionYear: '2026',
  entranceExams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
  expectedBudget: '₹5 Lakh - ₹15 Lakh',
  hostelPreference: 'yes',
  careerInterests: ['Software Engineering', 'Artificial Intelligence', 'Data Science'],
  shortlistedCollegeIds: ['iit-delhi', 'iit-bombay', 'nit-trichy']
};

