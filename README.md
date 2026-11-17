# GradSetu (V1) — Indian Education Discovery & Verified Student Mentorship Platform

> **Brand Message:** *Find your college. Hear it from someone who’s there.*

GradSetu is a complete, responsive education technology platform connecting students exploring higher education in India with verified college seniors currently studying at premier universities (IITs, NITs, BITS Pilani, IIITs, etc.).

---

## 🎨 Visual Identity & Strict Design System

Following the visual source of truth from the provided UI/UX reference design:
- **Primary Blue:** `#2563EB`
- **Dark Blue:** `#1D4ED8`
- **Light Blue:** `#EFF6FF`
- **Secondary Blue:** `#DBEAFE`
- **Page Background:** `#FFFFFF`
- **Secondary Background:** `#F8FAFC`
- **Primary Text:** `#111827`
- **Secondary Text:** `#64748B`
- **Borders:** `#E2E8F0`
- **Strict Visual Restraints:** Zero gradients, zero neon colors, zero floating animations, clean Inter typography, and authentic photography.

---

## 🚀 Key Modules & 16 Visual Reference Flows

1. **01. Landing Page (`/`):** Full hero with student search, stats bar (65,460+ Colleges, 7,200+ Mentors), 4-step How It Works, featured colleges and mentors, trust guarantee.
2. **02. Choose Role (`/signup`):** Stepper with dual selectable cards (*I'm an Aspirant* vs *I'm a College Student*).
3. **03. Aspirant Onboarding (`/onboarding/aspirant`):** Stream survey, target admission year, multi-select entrance exam pills, expected annual budget.
4. **04. Student (Mentor) Onboarding (`/onboarding/mentor`):** Full legal name, college selection, branch, year, enrollment number, and profile photo.
5. **05. Student Verification (`/onboarding/mentor` Step 2):** Secure college ID card upload, drag-and-drop, preview, trust badges, and privacy notice.
6. **06. Aspirant Dashboard (`/aspirant/dashboard`):** Personalized welcome (*Ananya Verma*), 3 primary action cards (*Explore Colleges, Talk to Seniors, Compare Colleges*), 5-step progress track, upcoming calls.
7. **07. Explore Colleges (`/aspirant/colleges`):** Multi-filter search (fees, placement %, category pills, NIRF rank), college cards with average CTC and bookmarking.
8. **08. College Details (`/aspirant/colleges/[collegeId]`):** Hero banner, *"Talk to Students"* CTA button, 7 detailed tabs (*Overview, Courses, Fees, Placements, Campus Life, Students, Q&A*).
9. **09. Mentor Marketplace (`/mentors`):** Public directory of **admin-approved** mentors with verified badges, branch filters, ratings, and fee per 30 minutes.
10. **10. Mentor Public Profile (`/mentors/[mentorId]`):** Verified senior bio, guidance topics, experience, reviews, and sticky booking card. Private student ID documents are protected and never displayed here.
11. **11. Book a Guidance Call (`/mentors/[mentorId]/book`):** Mentor summary, calendar date chips, time slot selection, and checkout navigation.
12. **12. Confirm & Pay (`/aspirant/checkout/[bookingId]`):** Booking summary, simulated payment options (*UPI, Card, Net Banking*), instant booking creation upon confirmation.
13. **13. My Bookings (`/aspirant/bookings`):** Tabs for Upcoming (*Confirmed* badge, *Join Call*, *Reschedule* modal, cancel) and Completed sessions.
14. **14. Compare Colleges (`/aspirant/compare`):** 2 to 4 colleges compared side-by-side with calculated highlights (*Most Affordable, Highest Avg CTC, Top Placement*).
15. **15. Comparison Report (`/aspirant/compare/report`):** Shareable summary with **working client-side PDF export** and link sharing for parents.
16. **16. Student (Mentor) Dashboard (`/mentor/dashboard`):** Mentorship summary (*24 Total Sessions, ₹7,176 Total Earnings, 4.9★ Rating*), upcoming sessions with *Join* button, and live verification status.

### 🛡️ Admin Portal (`/admin/...`)
- **Dashboard:** Platform metrics, user growth, gross revenue, pending audit queue.
- **Mentor Verification Management (`/admin/verifications`):** Confidential document viewer modal to inspect uploaded student ID cards with one-click **Approve**, **Reject** (with required audit remark), or **Request Resubmission**.
- **Management Modules:** Users, Aspirants, Mentors, Colleges (with Add/Delete), Bookings, Payments, Reviews Moderation, Reports, and Support Tickets.

---

## ⚡ Unified Reactive State

State is managed by `AppContext` backed by `localStorage` persistence:
- An Admin approving a student's verification immediately publishes them to `/mentors` with a blue verified badge and allows booking.
- An Aspirant booking a session instantly updates Aspirant Bookings, Mentor Bookings, Mentor Earnings, and Admin Transactions.
- A sticky **Demo Control Bar** at the top allows instant switching between Aspirant (*Ananya*), Mentor (*Ritik*), and Admin (*Rajesh*).

---

## 💻 Running the Application

To run locally outside the sandbox with network access:

```bash
# Install dependencies (if not already installed)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

