# GradSetu — Pan-India Higher Education Discovery & Verified Student Mentorship Platform

<p align="center">
  <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" alt="GradSetu Banner" width="100%" style="border-radius: 16px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <strong>"Find your college. Hear it from someone who’s there."</strong><br />
  <em>Empowering millions of Indian students to discover verified institutions and consult directly with seniors on campus.</em>
</p>

<p align="center">
  <a href="#-key-features"><img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react" alt="React" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" /></a>
  <a href="#-tech-stack"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
  <a href="#-cloud-infrastructure"><img src="https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" /></a>
  <a href="#-cloud-infrastructure"><img src="https://img.shields.io/badge/Cloudflare_R2-Object%20Storage-F38020?style=for-the-badge&logo=cloudflare" alt="Cloudflare R2" /></a>
</p>

---

## 🌟 Overview

**GradSetu** is a next-generation higher-education platform built specifically for Indian college aspirants, parents, and campus mentors. While traditional portals display sponsored, outdated rankings, GradSetu provides:

1. **Unbiased, Real-Time Data**: Official tuition fees, hostel & mess costs, NIRF ranks, JoSAA/NEET cutoffs, and median package statistics.
2. **Live Autonomous Web Crawler**: An integrated crawler capable of scraping any real-world college website worldwide and auto-saving its verified metadata directly into the database.
3. **1-on-1 Verified Senior Mentorship**: Direct guidance video calls with verified students currently enrolled in the institution (IITs, NITs, BITS, AIIMS, IIMs, IISc, etc.).
4. **Student Identity Protection**: Private storage for college ID cards with strict zero-public-exposure rules and dual-engine fallback (Cloudflare R2 + Supabase Storage).

---

## 🚀 Key Features

### 🔍 1. Pan-India College Search & Live Web Crawler
- **Instant Search:** Autocomplete suggestions matching 73+ premier pre-seeded national universities.
- **Autonomous Crawler:** Search for any university not yet in the system (e.g. `xyz school of technology`); the crawler queries Wikipedia APIs and resolves the official domain via Wikidata (`P856`), parses the live HTML meta-tags, and synthesizes accurate metrics.
- **Automatic Ingestion:** Newly crawled institutions are **instantly written to Supabase `colleges`**, ensuring all future users load the college in under 50ms without re-crawling.

### 🎓 2. Comprehensive 73+ Premier Institution Registry
Pre-seeded with minute data (Tuition, Hostel Fees, Median CTC, NIRF Ranks, Top Recruiters):
- **All 23 IITs:** Madras (#1), Delhi (#2), Bombay (#3), Kanpur (#4), Kharagpur (#5), Roorkee (#6), Guwahati (#7), Hyderabad (#8), BHU (#10), ISM Dhanbad (#15), Indore (#14), Gandhinagar (#18), Ropar, Patna, Bhubaneswar, Mandi, Jodhpur, Tirupati, Bhilai, Goa, Jammu, Dharwad, Palakkad.
- **Top NITs:** Trichy (#9), Surathkal (#12), Rourkela (#16), Warangal (#21), Calicut (#25), MNIT Jaipur (#37), VNIT Nagpur, MNNIT Allahabad, Kurukshetra, Delhi.
- **Premier IIITs:** IIIT Hyderabad, IIIT Bangalore, IIIT Delhi, IIIT Allahabad, IIIT Lucknow.
- **All 3 BITS Pilani Campuses:** Pilani Main Campus, Goa (K.K. Birla), Hyderabad.
- **All 4 VIT Campuses:** Vellore (#11), Chennai, Bhopal, VIT-AP Amaravati.
- **Premier Research & Science:** IISc Bangalore (#1 Overall & Research), IISER Pune, IISER Kolkata, NISER Bhubaneswar.
- **Top Medical Colleges:** AIIMS New Delhi (#1 Medical), AIIMS Bhubaneswar, CMC Vellore (#3), PGIMER Chandigarh (#2), KMC Manipal (#9).
- **Top Business / Management Schools:** IIM Ahmedabad (#1), IIM Bangalore (#2), IIM Calcutta (#3), XLRI Jamshedpur, FMS Delhi.
- **Top State & Govt Universities:** DTU Delhi, NSUT Delhi, COEP Technological University Pune, Jadavpur University Kolkata.
- **Popular Private Universities:** Thapar University, MIT Manipal, SRM Kattankulathur, Amity Noida, Chandigarh University (CU), LPU Punjab, KIIT Bhubaneswar, RVCE Bangalore, BMSCE Bangalore, VGU Jaipur.

### 🛡️ 3. Verified Student Senior Mentorship
- **Legitimacy First:** Mentors must upload proof of enrollment (Student ID Card).
- **Admin Review Queue:** Administrators audit uploaded ID documents in a secure, confidential modal before granting the verified blue badge.
- **Slot Booking & Checkout:** Aspirants can choose time slots, book guidance sessions, and receive instant calendar confirmations.

### 📊 4. Multi-College Comparison Tool & PDF Exporter
- Compare 2 to 4 colleges side-by-side across fees, cutoff ranks, median CTC, placement rate, and facilities.
- One-click client-side **PDF Export** using `jsPDF` for offline family discussions.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    User([Student / Aspirant / Mentor]) -->|Next.js App Router| Frontend[GradSetu Web UI]
    
    subgraph Frontend_Layer [Presentation Layer]
        Frontend --> AspirantDash[Aspirant Dashboard]
        Frontend --> CollegeExplorer[College Search & Explorer]
        Frontend --> MentorMarketplace[Mentor Marketplace & Booking]
        Frontend --> AdminPortal[Admin Governance & Verifications]
    end

    subgraph Service_Layer [Backend & Engine Layer]
        CollegeExplorer --> CrawlerAPI[/api/colleges/crawl-and-index]
        CrawlerAPI --> LiveCrawler[Live College Crawler Engine]
        LiveCrawler -->|Wikipedia OpenSearch & Wikidata P856| Web[Internet / Official Websites]
        
        MentorMarketplace --> BookingEngine[Booking & Scheduling Service]
        AdminPortal --> VerifService[Verification Audit Service]
    end

    subgraph Storage_Layer [Storage & Data Infrastructure]
        LiveCrawler -->|Auto-Ingest & Cache| SupabaseDB[(Supabase PostgreSQL)]
        Frontend -->|Auth & Realtime Sync| SupabaseDB
        VerifService -->|Primary Storage| CloudflareR2[(Cloudflare R2 Object Storage)]
        VerifService -.->|Fallback Storage| SupabaseStorage[(Supabase Storage Buckets)]
    end
```

---

## 💻 Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | Server Components, Streaming, Dynamic API Routes |
| **Language** | **TypeScript 5.6** | End-to-end strict type safety & Zod schema validation |
| **Styling** | **Tailwind CSS 3.4** | Clean, accessible design system conforming to strict UI rules |
| **Database** | **Supabase (PostgreSQL)** | Relational storage for colleges, mentors, profiles, bookings |
| **Object Storage** | **Cloudflare R2** / **Supabase** | Zero-egress private storage for student IDs & public avatars |
| **Icons & UI** | **Lucide React** | Lightweight, modern icon set |
| **PDF Generation** | **jsPDF** | Client-side comparison report rendering |

---

## 📂 Project Directory Structure

```
gradsetu-web/
├── public/                 # Static assets, fonts, brand logos
├── src/
│   ├── actions/            # Server actions for Auth, Booking, and Admin
│   ├── app/                # Next.js 14 App Router routes
│   │   ├── admin/          # Admin portal (dashboard, verifications, colleges, support)
│   │   ├── api/            # API routes (crawler, suggestions, uploads, webhooks)
│   │   ├── aspirant/       # Aspirant portal (dashboard, colleges, compare, bookings)
│   │   ├── mentor/         # Mentor portal (dashboard, earnings, verification, slots)
│   │   ├── mentors/        # Public mentor discovery directory & profile pages
│   │   ├── error.tsx       # Global runtime error boundary
│   │   ├── not-found.tsx   # Native 404 page handler
│   │   └── page.tsx        # High-converting landing page
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Header, Footer, Sidebars (Admin, Aspirant, Mentor)
│   │   └── shared/         # RatingStars, VerifiedBadge, ID Card preview
│   ├── context/            # React AppContext with unified reactive state & sync
│   ├── data/               # Pre-seeded verified initial colleges, mentors, reviews
│   ├── lib/                # Supabase SSR clients, Cloudflare R2 SDK, utilities
│   ├── services/           # Live crawler, verification, booking & search engines
│   └── types/              # TypeScript interfaces and Supabase database definitions
├── .env.example            # Environment variables template
├── package.json            # Project dependencies and npm scripts
└── tailwind.config.ts      # Tailwind brand theme & design system tokens
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm** or **pnpm**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/gradsetu/GradSetu.git
cd GradSetu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the template to create your `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# Supabase Cloud Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudflare R2 Configuration (Optional — falls back to Supabase Storage if blank)
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_VERIFICATIONS_BUCKET_NAME=gradsetu-verifications
R2_PUBLIC_AVATARS_BUCKET_NAME=gradsetu-avatars
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Privacy

- **Student ID Privacy:** Uploaded student identity documents are stored in private storage with presigned temporary URLs (15-minute expiry). They are strictly restricted to admin verification and are **never** rendered on public mentor profiles.
- **Strict Row-Level Security (RLS):** Supabase RLS policies guarantee users can only modify their own profiles and bookings.
- **Zero-Secret Exposure:** Sensitive keys (`SUPABASE_SERVICE_ROLE_KEY`, `R2_SECRET_ACCESS_KEY`) are kept server-side and never bundled into client scripts.

---

## 🤝 Contributing

Contributions to GradSetu are warmly welcomed!
1. Fork the Project (`git checkout -b feature/AmazingFeature`)
2. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the Branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<p align="center">
  Made with ❤️ for Indian Students & Aspirants everywhere.
</p>
