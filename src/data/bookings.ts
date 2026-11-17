import { Booking } from '@/types';

export const initialBookings: Booking[] = [
  {
    id: 'bkg-101',
    aspirantId: 'user-aspirant-ananya',
    aspirantName: 'Ananya Verma',
    aspirantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    mentorId: 'mentor-ritik-sharma',
    mentorName: 'Ritik Sharma',
    mentorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    collegeName: 'IIT Delhi',
    course: 'B.Tech - CSE',
    sessionType: '1-on-1 Guidance Call',
    date: 'Wed, 29 Jan',
    time: '4:00 PM',
    durationMinutes: 30,
    amount: 299,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    transactionId: 'TXN-GS-98231',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    createdAt: '2026-01-25T14:30:00Z'
  },
  {
    id: 'bkg-102',
    aspirantId: 'user-aspirant-ananya',
    aspirantName: 'Ananya Verma',
    aspirantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    mentorId: 'mentor-ishita-gupta',
    mentorName: 'Ishita Gupta',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    collegeName: 'IIT Delhi',
    course: 'B.Tech - ECE',
    sessionType: '1-on-1 Guidance Call',
    date: 'Fri, 16 Jan',
    time: '5:30 PM',
    durationMinutes: 30,
    amount: 349,
    status: 'completed',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    transactionId: 'TXN-GS-98104',
    meetLink: 'https://meet.google.com/xyz-uvwx-rst',
    createdAt: '2026-01-14T11:00:00Z'
  }
];

