import { Review, PaymentTransaction } from '@/types';

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    mentorId: 'mentor-ritik-sharma',
    aspirantName: 'Rohan Mehra',
    aspirantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    comment: 'Ritik gave super clear advice on CSE vs M&C at IIT Delhi. He answered all my questions about hostel facilities and coding culture honestly. Worth every rupee!',
    date: '20 Jan 2026',
    isModerated: true,
    isVisible: true
  },
  {
    id: 'rev-2',
    mentorId: 'mentor-ritik-sharma',
    aspirantName: 'Pooja Sharma',
    aspirantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    comment: 'Helped me understand the JoSAA preference order so much better. Very humble and approachable senior.',
    date: '18 Jan 2026',
    isModerated: true,
    isVisible: true
  },
  {
    id: 'rev-3',
    mentorId: 'mentor-ishita-gupta',
    aspirantName: 'Ananya Verma',
    aspirantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    rating: 5,
    comment: 'Ishita di was amazing! She explained how ECE students prepare for software roles and how the workload feels across 4 years. Huge confidence booster.',
    date: '16 Jan 2026',
    isModerated: true,
    isVisible: true
  }
];

export const initialPayments: PaymentTransaction[] = [
  {
    id: 'TXN-GS-98231',
    bookingId: 'bkg-101',
    aspirantName: 'Ananya Verma',
    mentorName: 'Ritik Sharma',
    amount: 299,
    method: 'UPI',
    status: 'paid',
    date: '2026-01-25T14:30:00Z'
  },
  {
    id: 'TXN-GS-98104',
    bookingId: 'bkg-102',
    aspirantName: 'Ananya Verma',
    mentorName: 'Ishita Gupta',
    amount: 349,
    method: 'Card',
    status: 'paid',
    date: '2026-01-14T11:00:00Z'
  }
];

