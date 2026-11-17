import { College } from '@/types';

export const initialColleges: College[] = [
  {
    "id": "iit-madras",
    "name": "Indian Institute of Technology Madras",
    "shortName": "IIT Madras",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "IIT",
    "rating": 4.9,
    "reviewCount": 3820,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Madras is nationally ranked #1 Overall and #1 in Engineering by NIRF. Spread over 630 acres of lush forest campus in Chennai, it houses world-leading research parks, the Robert Bosch Centre for Data Science and AI, and top innovation hubs.",
    "establishedYear": 1959,
    "campusSize": "630 Acres",
    "tuitionFeePerYear": "₹2.1 Lakh",
    "tuitionFeeNum": 210000,
    "avgPackage": "₹26.4 LPA",
    "avgPackageNum": 26.4,
    "medianPackage": "₹19.5 LPA",
    "medianPackageNum": 19.5,
    "highestPackage": "₹2.5 CPA",
    "highestPackageNum": 250,
    "placementRate": 98,
    "hasHostel": true,
    "hostelFeePerYear": "₹75,000",
    "nirfRank": 1,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "IITM Research Park",
      "Supercomputing Facility",
      "20 Hostels",
      "Olympic Swimming Pool",
      "Open Air Theatre",
      "Central Library"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 87,
        "annualFee": "₹2,10,000",
        "cutoffRank": "AIR 1 - 148"
      },
      {
        "name": "B.Tech in Electrical Engineering",
        "duration": "4 Years",
        "seats": 110,
        "annualFee": "₹2,10,000",
        "cutoffRank": "AIR 150 - 610"
      },
      {
        "name": "B.Tech in Mechanical Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹2,10,000",
        "cutoffRank": "AIR 800 - 1800"
      },
      {
        "name": "B.Tech in Aerospace Engineering",
        "duration": "4 Years",
        "seats": 50,
        "annualFee": "₹2,10,000",
        "cutoffRank": "AIR 1500 - 3200"
      },
      {
        "name": "BS in Data Science & Applications",
        "duration": "4 Years",
        "seats": 200,
        "annualFee": "₹1,00,000",
        "cutoffRank": "IITM Qualifier Test"
      }
    ],
    "websiteUrl": "https://www.iitm.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Apple",
      "Goldman Sachs",
      "Qualcomm",
      "McKinsey & Co"
    ],
    "accreditation": "Institute of National Importance | IoE"
  },
  {
    "id": "iit-delhi",
    "name": "Indian Institute of Technology Delhi",
    "shortName": "IIT Delhi",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "IIT",
    "rating": 4.8,
    "reviewCount": 3450,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Delhi, located in Hauz Khas, New Delhi, is renowned for world-class technical education, breakthrough deep-tech startup incubation, and premier campus recruitment.",
    "establishedYear": 1961,
    "campusSize": "320 Acres",
    "tuitionFeePerYear": "₹2.5 Lakh",
    "tuitionFeeNum": 250000,
    "avgPackage": "₹25.8 LPA",
    "avgPackageNum": 25.8,
    "medianPackage": "₹20.0 LPA",
    "medianPackageNum": 20,
    "highestPackage": "₹2.4 CPA",
    "highestPackageNum": 240,
    "placementRate": 98,
    "hasHostel": true,
    "hostelFeePerYear": "₹80,000",
    "nirfRank": 2,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "High Performance Computing Lab",
      "13 Hostels",
      "Central Library with 300k+ books",
      "Sports Complex",
      "Student Activity Center"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 115,
        "annualFee": "₹2,50,000",
        "cutoffRank": "AIR 1 - 118"
      },
      {
        "name": "B.Tech in Mathematics and Computing",
        "duration": "4 Years",
        "seats": 90,
        "annualFee": "₹2,50,000",
        "cutoffRank": "AIR 150 - 320"
      },
      {
        "name": "B.Tech in Electrical Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹2,50,000",
        "cutoffRank": "AIR 250 - 580"
      }
    ],
    "websiteUrl": "https://home.iitd.ac.in",
    "topRecruiters": [
      "Jane Street",
      "Uber",
      "Microsoft",
      "Google",
      "Texas Instruments"
    ],
    "accreditation": "Institute of National Importance | IoE"
  },
  {
    "id": "iit-bombay",
    "name": "Indian Institute of Technology Bombay",
    "shortName": "IIT Bombay",
    "city": "Mumbai",
    "state": "Maharashtra",
    "type": "IIT",
    "rating": 4.8,
    "reviewCount": 3600,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Bombay in Powai, Mumbai, is India's most preferred destination for JEE toppers, featuring cutting-edge labs, top faculty, and an unbeatable entrepreneurship ecosystem (SINE).",
    "establishedYear": 1958,
    "campusSize": "550 Acres",
    "tuitionFeePerYear": "₹2.3 Lakh",
    "tuitionFeeNum": 230000,
    "avgPackage": "₹27.2 LPA",
    "avgPackageNum": 27.2,
    "medianPackage": "₹21.5 LPA",
    "medianPackageNum": 21.5,
    "highestPackage": "₹3.6 CPA",
    "highestPackageNum": 360,
    "placementRate": 97,
    "hasHostel": true,
    "hostelFeePerYear": "₹84,000",
    "nirfRank": 3,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Powai Lake View",
      "SINE Incubator",
      "Olympic Size Pool",
      "18 Hostels",
      "Tinkerers' Lab"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 171,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 1 - 67"
      },
      {
        "name": "B.Tech in Electrical Engineering",
        "duration": "4 Years",
        "seats": 115,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 100 - 450"
      },
      {
        "name": "B.Tech in Mechanical Engineering",
        "duration": "4 Years",
        "seats": 160,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 500 - 1500"
      }
    ],
    "websiteUrl": "https://www.iitb.ac.in",
    "topRecruiters": [
      "Qualcomm",
      "Rubrik",
      "Jane Street",
      "Optiver",
      "Blackstone"
    ],
    "accreditation": "Institute of National Importance | IoE"
  },
  {
    "id": "iit-kanpur",
    "name": "Indian Institute of Technology Kanpur",
    "shortName": "IIT Kanpur",
    "city": "Kanpur",
    "state": "Uttar Pradesh",
    "type": "IIT",
    "rating": 4.8,
    "reviewCount": 3100,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Kanpur is renowned for its academic rigor, airstrip on campus, world-class computer science program, and premier aeronautical research facility.",
    "establishedYear": 1959,
    "campusSize": "1055 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹24.5 LPA",
    "avgPackageNum": 24.5,
    "medianPackage": "₹19.0 LPA",
    "medianPackageNum": 19,
    "highestPackage": "₹2.1 CPA",
    "highestPackageNum": 210,
    "placementRate": 96,
    "hasHostel": true,
    "hostelFeePerYear": "₹70,000",
    "nirfRank": 4,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Private Airstrip & Glider Club",
      "Supercomputer PARAM Sanganak",
      "National Wind Tunnel Facility"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 129,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 100 - 230"
      },
      {
        "name": "B.Tech in Electrical Engineering",
        "duration": "4 Years",
        "seats": 140,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 500 - 1200"
      }
    ],
    "websiteUrl": "https://www.iitk.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Goldman Sachs",
      "Airbus",
      "Tower Research"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-kharagpur",
    "name": "Indian Institute of Technology Kharagpur",
    "shortName": "IIT Kharagpur",
    "city": "Kharagpur",
    "state": "West Bengal",
    "type": "IIT",
    "rating": 4.8,
    "reviewCount": 4200,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Kharagpur is the oldest and largest IIT in India, spread over 2100 acres. Offers the widest range of engineering, law, and medical programs with an alumni network second to none.",
    "establishedYear": 1951,
    "campusSize": "2100 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹23.5 LPA",
    "avgPackageNum": 23.5,
    "medianPackage": "₹18.5 LPA",
    "medianPackageNum": 18.5,
    "highestPackage": "₹2.6 CPA",
    "highestPackageNum": 260,
    "placementRate": 95,
    "hasHostel": true,
    "hostelFeePerYear": "₹68,000",
    "nirfRank": 5,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Largest Campus in Asia (2100 Acres)",
      "Technology Students Gymkhana",
      "22 Halls of Residence",
      "Nehru Museum of Science"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 150,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 150 - 350"
      },
      {
        "name": "B.Tech in Electronics & Electrical Communication",
        "duration": "4 Years",
        "seats": 130,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 600 - 1400"
      }
    ],
    "websiteUrl": "https://www.iitkgp.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Amazon",
      "Honeywell",
      "Schlumberger"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-roorkee",
    "name": "Indian Institute of Technology Roorkee",
    "shortName": "IIT Roorkee",
    "city": "Roorkee",
    "state": "Uttarakhand",
    "type": "IIT",
    "rating": 4.7,
    "reviewCount": 2900,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Incepted in 1847 as Thomason College of Civil Engineering, IIT Roorkee boasts a 175-year legacy of engineering marvels and scenic Himalayan foothills campus.",
    "establishedYear": 1847,
    "campusSize": "365 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹22.8 LPA",
    "avgPackageNum": 22.8,
    "medianPackage": "₹18.0 LPA",
    "medianPackageNum": 18,
    "highestPackage": "₹1.8 CPA",
    "highestPackageNum": 180,
    "placementRate": 94,
    "hasHostel": true,
    "hostelFeePerYear": "₹65,000",
    "nirfRank": 6,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Historic Senate House",
      "Supercomputer PARAM Ganga",
      "MGCL Central Library",
      "Olympic Sports Complex"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 110,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 250 - 450"
      },
      {
        "name": "B.Tech in Data Science & Artificial Intelligence",
        "duration": "4 Years",
        "seats": 40,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 400 - 800"
      }
    ],
    "websiteUrl": "https://www.iitr.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Amazon",
      "Goldman Sachs",
      "Oracle",
      "Texas Instruments"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-guwahati",
    "name": "Indian Institute of Technology Guwahati",
    "shortName": "IIT Guwahati",
    "city": "Guwahati",
    "state": "Assam",
    "type": "IIT",
    "rating": 4.8,
    "reviewCount": 2600,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Guwahati, situated on the picturesque banks of the Brahmaputra River, is celebrated for having India’s most scenic campus and leading Nanotech research centres.",
    "establishedYear": 1994,
    "campusSize": "700 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹21.6 LPA",
    "avgPackageNum": 21.6,
    "medianPackage": "₹17.0 LPA",
    "medianPackageNum": 17,
    "highestPackage": "₹1.6 CPA",
    "highestPackageNum": 160,
    "placementRate": 93,
    "hasHostel": true,
    "hostelFeePerYear": "₹62,000",
    "nirfRank": 7,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Param-Kamrupa Supercomputing Facility",
      "Brahmaputra Viewpoints",
      "Centre for Nanotechnology"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 115,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 350 - 650"
      },
      {
        "name": "B.Tech in Data Science & Artificial Intelligence",
        "duration": "4 Years",
        "seats": 35,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 600 - 950"
      }
    ],
    "websiteUrl": "https://www.iitg.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Uber",
      "Qualcomm",
      "Amazon"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-hyderabad",
    "name": "Indian Institute of Technology Hyderabad",
    "shortName": "IIT Hyderabad",
    "city": "Hyderabad",
    "state": "Telangana",
    "type": "IIT",
    "rating": 4.8,
    "reviewCount": 2100,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Hyderabad is the fastest-rising 2nd generation IIT, featuring radiant cooling architecture, Japan collaboration, and first-in-India B.Tech in Artificial Intelligence.",
    "establishedYear": 2008,
    "campusSize": "576 Acres",
    "tuitionFeePerYear": "₹2.3 Lakh",
    "tuitionFeeNum": 230000,
    "avgPackage": "₹23.2 LPA",
    "avgPackageNum": 23.2,
    "medianPackage": "₹18.0 LPA",
    "medianPackageNum": 18,
    "highestPackage": "₹1.9 CPA",
    "highestPackageNum": 190,
    "placementRate": 94,
    "hasHostel": true,
    "hostelFeePerYear": "₹75,000",
    "nirfRank": 8,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "TiHAN Autonomous Navigation Testbed",
      "Radiant Cooling Hostels",
      "JICA Friendship Project Labs"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 70,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 400 - 670"
      },
      {
        "name": "B.Tech in Artificial Intelligence",
        "duration": "4 Years",
        "seats": 35,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 500 - 850"
      }
    ],
    "websiteUrl": "https://www.iith.ac.in",
    "topRecruiters": [
      "Qualcomm",
      "Oracle",
      "Microsoft",
      "Toyota",
      "Sony Japan"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-bhu",
    "name": "Indian Institute of Technology (BHU) Varanasi",
    "shortName": "IIT (BHU)",
    "city": "Varanasi",
    "state": "Uttar Pradesh",
    "type": "IIT",
    "rating": 4.7,
    "reviewCount": 2800,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Founded in 1919 by Mahamana Pandit Madan Mohan Malaviya, IIT (BHU) Varanasi combines a century of academic prestige with modern engineering excellence.",
    "establishedYear": 1919,
    "campusSize": "1300 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹21.9 LPA",
    "avgPackageNum": 21.9,
    "medianPackage": "₹17.0 LPA",
    "medianPackageNum": 17,
    "highestPackage": "₹1.7 CPA",
    "highestPackageNum": 170,
    "placementRate": 92,
    "hasHostel": true,
    "hostelFeePerYear": "₹60,000",
    "nirfRank": 10,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Historic BHU Heritage Campus",
      "Central Discovery Centre",
      "Extensive Sports Ground"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 125,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 600 - 1050"
      },
      {
        "name": "B.Tech in Electronics Engineering",
        "duration": "4 Years",
        "seats": 110,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 1200 - 2800"
      }
    ],
    "websiteUrl": "https://www.iitbhu.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Uber",
      "Amazon",
      "NVIDIA",
      "Tata Motors"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-indore",
    "name": "Indian Institute of Technology Indore",
    "shortName": "IIT Indore",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "type": "IIT",
    "rating": 4.6,
    "reviewCount": 1700,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Indore is situated in Simrol, Madhya Pradesh. Renowned for its high-impact research output, world-class astronomy instruments, and rapid rise in NIRF rankings.",
    "establishedYear": 2009,
    "campusSize": "501 Acres",
    "tuitionFeePerYear": "₹2.3 Lakh",
    "tuitionFeeNum": 230000,
    "avgPackage": "₹21.2 LPA",
    "avgPackageNum": 21.2,
    "medianPackage": "₹16.5 LPA",
    "medianPackageNum": 16.5,
    "highestPackage": "₹1.1 CPA",
    "highestPackageNum": 110,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹72,000",
    "nirfRank": 14,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Sophisticated Instrument Centre",
      "Modern Studio Hostels",
      "Center of Astronomy"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 80,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 900 - 1400"
      },
      {
        "name": "B.Tech in Electrical Engineering",
        "duration": "4 Years",
        "seats": 80,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 2200 - 3900"
      }
    ],
    "websiteUrl": "https://www.iiti.ac.in",
    "topRecruiters": [
      "Amazon",
      "Microsoft",
      "Walmart",
      "Goldman Sachs"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-ism-dhanbad",
    "name": "Indian Institute of Technology (ISM) Dhanbad",
    "shortName": "IIT (ISM)",
    "city": "Dhanbad",
    "state": "Jharkhand",
    "type": "IIT",
    "rating": 4.6,
    "reviewCount": 2500,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Formerly Indian School of Mines, IIT (ISM) Dhanbad is Asia’s premier institute for mining, petroleum, and earth sciences, now expanded to all core branches of engineering.",
    "establishedYear": 1926,
    "campusSize": "393 Acres",
    "tuitionFeePerYear": "₹2.1 Lakh",
    "tuitionFeeNum": 210000,
    "avgPackage": "₹18.5 LPA",
    "avgPackageNum": 18.5,
    "medianPackage": "₹14.0 LPA",
    "medianPackageNum": 14,
    "highestPackage": "₹1.2 CPA",
    "highestPackageNum": 120,
    "placementRate": 90,
    "hasHostel": true,
    "hostelFeePerYear": "₹62,000",
    "nirfRank": 15,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Longwall Mining Mine Simulator",
      "Geological Museum",
      "Central Library (Asia’s largest technical library)"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 130,
        "annualFee": "₹2,10,000",
        "cutoffRank": "AIR 1500 - 3200"
      },
      {
        "name": "B.Tech in Petroleum Engineering",
        "duration": "4 Years",
        "seats": 90,
        "annualFee": "₹2,10,000",
        "cutoffRank": "AIR 5000 - 9500"
      }
    ],
    "websiteUrl": "https://www.iitism.ac.in",
    "topRecruiters": [
      "Schlumberger",
      "ONGC",
      "Microsoft",
      "Google",
      "Cairn India"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-gandhinagar",
    "name": "Indian Institute of Technology Gandhinagar",
    "shortName": "IIT Gandhinagar",
    "city": "Gandhinagar",
    "state": "Gujarat",
    "type": "IIT",
    "rating": 4.7,
    "reviewCount": 1600,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Gandhinagar sits along the Sabarmati River and is celebrated for progressive 5-week Foundation Programs, 5-star GRIHA green campus, and Maker Bhavan.",
    "establishedYear": 2008,
    "campusSize": "400 Acres",
    "tuitionFeePerYear": "₹2.3 Lakh",
    "tuitionFeeNum": 230000,
    "avgPackage": "₹20.4 LPA",
    "avgPackageNum": 20.4,
    "medianPackage": "₹15.8 LPA",
    "medianPackageNum": 15.8,
    "highestPackage": "₹1.0 CPA",
    "highestPackageNum": 100,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹74,000",
    "nirfRank": 18,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "GRIHA 5-Star Green Campus",
      "Maker Bhavan",
      "Sports Complex with Squash Courts"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 60,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 1200 - 2100"
      }
    ],
    "websiteUrl": "https://www.iitgn.ac.in",
    "topRecruiters": [
      "Amazon",
      "Texas Instruments",
      "ITC",
      "Goldman Sachs"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-ropar",
    "name": "Indian Institute of Technology Ropar",
    "shortName": "IIT Ropar",
    "city": "Rupnagar",
    "state": "Punjab",
    "type": "IIT",
    "rating": 4.6,
    "reviewCount": 1450,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Ropar is located on the banks of the Sutlej River. High citation count per faculty and top modern research facilities.",
    "establishedYear": 2008,
    "campusSize": "525 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹19.8 LPA",
    "avgPackageNum": 19.8,
    "medianPackage": "₹16.0 LPA",
    "medianPackageNum": 16,
    "highestPackage": "₹85 LPA",
    "highestPackageNum": 85,
    "placementRate": 90,
    "hasHostel": true,
    "hostelFeePerYear": "₹66,000",
    "nirfRank": 22,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "TBIF Technology Business Incubator",
      "Sutlej Riverfront Campus",
      "Advanced Manufacturing Center"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 75,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 1500 - 2400"
      }
    ],
    "websiteUrl": "https://www.iitrpr.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Arcesium",
      "Samsung R&D"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-patna",
    "name": "Indian Institute of Technology Patna",
    "shortName": "IIT Patna",
    "city": "Patna",
    "state": "Bihar",
    "type": "IIT",
    "rating": 4.6,
    "reviewCount": 1600,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Patna in Bihta features a 501-acre residential campus with stellar placement growth, NLP research lab, and incubation centre supported by MeitY.",
    "establishedYear": 2008,
    "campusSize": "501 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹20.1 LPA",
    "avgPackageNum": 20.1,
    "medianPackage": "₹15.2 LPA",
    "medianPackageNum": 15.2,
    "highestPackage": "₹1.3 CPA",
    "highestPackageNum": 130,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹64,000",
    "nirfRank": 34,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "AI-NLP-ML Research Lab",
      "Incubation Centre IIT Patna",
      "Central Instrumentation Facility"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 80,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 2200 - 3200"
      },
      {
        "name": "B.Tech in Artificial Intelligence and Data Science",
        "duration": "4 Years",
        "seats": 50,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 2800 - 4100"
      }
    ],
    "websiteUrl": "https://www.iitp.ac.in",
    "topRecruiters": [
      "Google",
      "Amazon",
      "Atlassian",
      "DE Shaw",
      "Adobe"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-bhubaneswar",
    "name": "Indian Institute of Technology Bhubaneswar",
    "shortName": "IIT Bhubaneswar",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "type": "IIT",
    "rating": 4.5,
    "reviewCount": 1300,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Bhubaneswar in Argul features a serene campus near Barunei Hill with specialized ocean science, civil structural labs, and modern student hostels.",
    "establishedYear": 2008,
    "campusSize": "936 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹18.2 LPA",
    "avgPackageNum": 18.2,
    "medianPackage": "₹14.5 LPA",
    "medianPackageNum": 14.5,
    "highestPackage": "₹64 LPA",
    "highestPackageNum": 64,
    "placementRate": 88,
    "hasHostel": true,
    "hostelFeePerYear": "₹62,000",
    "nirfRank": 27,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Barunei Hill Campus",
      "Centre for Climate Change",
      "Pushpagiri Lecture Hall Complex"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 65,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 2400 - 3500"
      }
    ],
    "websiteUrl": "https://www.iitbbs.ac.in",
    "topRecruiters": [
      "Amazon",
      "Media.net",
      "Oracle",
      "Goldman Sachs"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-mandi",
    "name": "Indian Institute of Technology Mandi",
    "shortName": "IIT Mandi",
    "city": "Mandi",
    "state": "Himachal Pradesh",
    "type": "IIT",
    "rating": 4.5,
    "reviewCount": 1200,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Mandi in Kamand Valley is nestled in the scenic Himalayas, famous for bioX and material sciences and stunning mountain hiking trails around campus.",
    "establishedYear": 2009,
    "campusSize": "538 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹19.4 LPA",
    "avgPackageNum": 19.4,
    "medianPackage": "₹15.0 LPA",
    "medianPackageNum": 15,
    "highestPackage": "₹60 LPA",
    "highestPackageNum": 60,
    "placementRate": 88,
    "hasHostel": true,
    "hostelFeePerYear": "₹65,000",
    "nirfRank": 33,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Himalayan Valley Campus",
      "Advanced Materials Research Centre",
      "Design Innovation Center"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 70,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 2600 - 3800"
      }
    ],
    "websiteUrl": "https://www.iitmandi.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Uber",
      "Amazon",
      "Adobe"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-jodhpur",
    "name": "Indian Institute of Technology Jodhpur",
    "shortName": "IIT Jodhpur",
    "city": "Jodhpur",
    "state": "Rajasthan",
    "type": "IIT",
    "rating": 4.5,
    "reviewCount": 1100,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Jodhpur operates from an expansive desert-resilient smart campus on NH 65, leading multidisciplinary AI and sensor research.",
    "establishedYear": 2008,
    "campusSize": "852 Acres",
    "tuitionFeePerYear": "₹2.3 Lakh",
    "tuitionFeeNum": 230000,
    "avgPackage": "₹18.8 LPA",
    "avgPackageNum": 18.8,
    "medianPackage": "₹14.8 LPA",
    "medianPackageNum": 14.8,
    "highestPackage": "₹61 LPA",
    "highestPackageNum": 61,
    "placementRate": 89,
    "hasHostel": true,
    "hostelFeePerYear": "₹68,000",
    "nirfRank": 28,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Smart Campus Microgrid",
      "Solar Energy Park",
      "Center for Artificial Intelligence"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 80,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 2400 - 3600"
      },
      {
        "name": "B.Tech in Artificial Intelligence & Data Science",
        "duration": "4 Years",
        "seats": 50,
        "annualFee": "₹2,30,000",
        "cutoffRank": "AIR 3000 - 4400"
      }
    ],
    "websiteUrl": "https://www.iitj.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Morgan Stanley",
      "Barclays"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-tirupati",
    "name": "Indian Institute of Technology Tirupati",
    "shortName": "IIT Tirupati",
    "city": "Tirupati",
    "state": "Andhra Pradesh",
    "type": "IIT",
    "rating": 4.4,
    "reviewCount": 850,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Tirupati is a 3rd generation IIT in the Yerpedu foothills with state-of-the-art permanent campus facilities and strong JoSAA placement record.",
    "establishedYear": 2015,
    "campusSize": "548 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹17.5 LPA",
    "avgPackageNum": 17.5,
    "medianPackage": "₹14.0 LPA",
    "medianPackageNum": 14,
    "highestPackage": "₹52 LPA",
    "highestPackageNum": 52,
    "placementRate": 86,
    "hasHostel": true,
    "hostelFeePerYear": "₹60,000",
    "nirfRank": 59,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Yerpedu Smart Campus",
      "Modern Innovation Labs",
      "Cricket & Football Grounds"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 50,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 3500 - 4800"
      }
    ],
    "websiteUrl": "https://www.iittp.ac.in",
    "topRecruiters": [
      "Amazon",
      "Adobe",
      "L&T",
      "TCS Research"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-palakkad",
    "name": "Indian Institute of Technology Palakkad",
    "shortName": "IIT Palakkad",
    "city": "Palakkad",
    "state": "Kerala",
    "type": "IIT",
    "rating": 4.4,
    "reviewCount": 780,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Palakkad features a permanent campus at Kanjikode with eco-friendly infrastructure and cutting-edge data science and robotics research.",
    "establishedYear": 2015,
    "campusSize": "504 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹16.8 LPA",
    "avgPackageNum": 16.8,
    "medianPackage": "₹13.5 LPA",
    "medianPackageNum": 13.5,
    "highestPackage": "₹46 LPA",
    "highestPackageNum": 46,
    "placementRate": 85,
    "hasHostel": true,
    "hostelFeePerYear": "₹60,000",
    "nirfRank": 64,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Western Ghats Campus",
      "Advanced Computing Facility",
      "Robotics Hub"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 45,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 4500 - 5800"
      }
    ],
    "websiteUrl": "https://www.iitpkd.ac.in",
    "topRecruiters": [
      "Texas Instruments",
      "Qualcomm",
      "Arista Networks",
      "Marvell"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-jammu",
    "name": "Indian Institute of Technology Jammu",
    "shortName": "IIT Jammu",
    "city": "Jammu",
    "state": "Jammu & Kashmir",
    "type": "IIT",
    "rating": 4.3,
    "reviewCount": 650,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Jammu is located at Jagti, Jammu, offering modern Himalayan infrastructure, tunnel engineering research, and smart campus facilities.",
    "establishedYear": 2016,
    "campusSize": "400 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹16.2 LPA",
    "avgPackageNum": 16.2,
    "medianPackage": "₹13.0 LPA",
    "medianPackageNum": 13,
    "highestPackage": "₹53 LPA",
    "highestPackageNum": 53,
    "placementRate": 84,
    "hasHostel": true,
    "hostelFeePerYear": "₹58,000",
    "nirfRank": 62,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Jagti Main Campus",
      "Tunneling Research Lab",
      "Sports Complex"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 40,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 4800 - 6200"
      }
    ],
    "websiteUrl": "https://www.iitjammu.ac.in",
    "topRecruiters": [
      "Amazon",
      "Infosys",
      "Cognizant",
      "L&T"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-dharwad",
    "name": "Indian Institute of Technology Dharwad",
    "shortName": "IIT Dharwad",
    "city": "Dharwad",
    "state": "Karnataka",
    "type": "IIT",
    "rating": 4.3,
    "reviewCount": 600,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Dharwad in Karnataka operates from an eco-friendly 470-acre permanent campus, known for aerospace and IoT sensor research.",
    "establishedYear": 2016,
    "campusSize": "470 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹15.8 LPA",
    "avgPackageNum": 15.8,
    "medianPackage": "₹12.5 LPA",
    "medianPackageNum": 12.5,
    "highestPackage": "₹42 LPA",
    "highestPackageNum": 42,
    "placementRate": 83,
    "hasHostel": true,
    "hostelFeePerYear": "₹58,000",
    "nirfRank": 89,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "New Permanent Campus",
      "IoT Maker Space",
      "Hostels with Dining Hall"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 45,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 5000 - 6500"
      }
    ],
    "websiteUrl": "https://www.iitdh.ac.in",
    "topRecruiters": [
      "AirAsia",
      "Wipro",
      "Capgemini",
      "Texas Instruments"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-bhilai",
    "name": "Indian Institute of Technology Bhilai",
    "shortName": "IIT Bhilai",
    "city": "Bhilai",
    "state": "Chhattisgarh",
    "type": "IIT",
    "rating": 4.3,
    "reviewCount": 550,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Bhilai in Kutelabhata, Durg, has a brand-new campus inaugurated by the Prime Minister, featuring modern academic complexes and fast-growing placements.",
    "establishedYear": 2016,
    "campusSize": "432 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹15.2 LPA",
    "avgPackageNum": 15.2,
    "medianPackage": "₹12.0 LPA",
    "medianPackageNum": 12,
    "highestPackage": "₹48 LPA",
    "highestPackageNum": 48,
    "placementRate": 82,
    "hasHostel": true,
    "hostelFeePerYear": "₹56,000",
    "nirfRank": 73,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Inaugurated PM-Class Smart Campus",
      "AI and Quantum Lab",
      "Central Dining"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 40,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 5200 - 6800"
      }
    ],
    "websiteUrl": "https://www.iitbhilai.ac.in",
    "topRecruiters": [
      "Amazon",
      "L&T Infotech",
      "Cognizant",
      "MAQ Software"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iit-goa",
    "name": "Indian Institute of Technology Goa",
    "shortName": "IIT Goa",
    "city": "Farmagudi",
    "state": "Goa",
    "type": "IIT",
    "rating": 4.2,
    "reviewCount": 500,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIT Goa operates from Farmagudi, Ponda, offering high quality faculty mentorship, strong algorithmic programming culture, and active student clubs.",
    "establishedYear": 2016,
    "campusSize": "150 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹16.5 LPA",
    "avgPackageNum": 16.5,
    "medianPackage": "₹13.2 LPA",
    "medianPackageNum": 13.2,
    "highestPackage": "₹44 LPA",
    "highestPackageNum": 44,
    "placementRate": 85,
    "hasHostel": true,
    "hostelFeePerYear": "₹60,000",
    "nirfRank": 90,
    "admissionCriteria": "JEE Advanced Rank via JoSAA Counseling",
    "facilities": [
      "Farmagudi Transit Campus",
      "Coding Hub",
      "Sports Center"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 35,
        "annualFee": "₹2,20,000",
        "cutoffRank": "AIR 4200 - 5500"
      }
    ],
    "websiteUrl": "https://www.iitgoa.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Google",
      "Intel",
      "Amazon"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "nit-trichy",
    "name": "National Institute of Technology Tiruchirappalli",
    "shortName": "NIT Trichy",
    "city": "Tiruchirappalli",
    "state": "Tamil Nadu",
    "type": "NIT",
    "rating": 4.8,
    "reviewCount": 3100,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NIT Trichy is ranked #1 among all NITs in India (NIRF #9 Overall). Sprawled across 800 acres in Thuvakudi, it is renowned for world-class technical education, Festember, and top-tier campus recruitment.",
    "establishedYear": 1964,
    "campusSize": "800 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹18.4 LPA",
    "avgPackageNum": 18.4,
    "medianPackage": "₹15.0 LPA",
    "medianPackageNum": 15,
    "highestPackage": "₹52.8 LPA",
    "highestPackageNum": 52.8,
    "placementRate": 95,
    "hasHostel": true,
    "hostelFeePerYear": "₹55,000",
    "nirfRank": 9,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Octagon Computer Center",
      "22 Hostels",
      "Hospital",
      "Swimming Pool",
      "Central Library"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 119,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 1200 - 4500"
      },
      {
        "name": "B.Tech in Electrical and Electronics Engineering",
        "duration": "4 Years",
        "seats": 115,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 5000 - 9000"
      }
    ],
    "websiteUrl": "https://www.nitt.edu",
    "topRecruiters": [
      "Microsoft",
      "Google",
      "Qualcomm",
      "Goldman Sachs",
      "Morgan Stanley"
    ],
    "accreditation": "Institute of National Importance | NBA Tier-1"
  },
  {
    "id": "nit-surathkal",
    "name": "National Institute of Technology Karnataka, Surathkal",
    "shortName": "NIT Surathkal",
    "city": "Mangalore",
    "state": "Karnataka",
    "type": "NIT",
    "rating": 4.8,
    "reviewCount": 2900,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NIT Surathkal has a private beach on the Arabian Sea coast, NIRF #12 Engineering rank, and top placements with a median salary comparable to top IITs.",
    "establishedYear": 1960,
    "campusSize": "295 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹19.2 LPA",
    "avgPackageNum": 19.2,
    "medianPackage": "₹15.5 LPA",
    "medianPackageNum": 15.5,
    "highestPackage": "₹54.5 LPA",
    "highestPackageNum": 54.5,
    "placementRate": 96,
    "hasHostel": true,
    "hostelFeePerYear": "₹58,000",
    "nirfRank": 12,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Private Beachfront & Lighthouse",
      "Central Research Facility",
      "Swimming Pool"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 115,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 1400 - 3200"
      },
      {
        "name": "B.Tech in Information Technology",
        "duration": "4 Years",
        "seats": 110,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 2800 - 4600"
      }
    ],
    "websiteUrl": "https://www.nitk.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Uber",
      "Amazon",
      "Sprinklr"
    ],
    "accreditation": "Institute of National Importance | NBA Tier-1"
  },
  {
    "id": "nit-rourkela",
    "name": "National Institute of Technology Rourkela",
    "shortName": "NIT Rourkela",
    "city": "Rourkela",
    "state": "Odisha",
    "type": "NIT",
    "rating": 4.7,
    "reviewCount": 2600,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NIT Rourkela is spread over 1200 acres in Odisha, making it one of the largest engineering campuses in India with top research output and extensive sports facilities.",
    "establishedYear": 1961,
    "campusSize": "1200 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹16.8 LPA",
    "avgPackageNum": 16.8,
    "medianPackage": "₹13.5 LPA",
    "medianPackageNum": 13.5,
    "highestPackage": "₹52.0 LPA",
    "highestPackageNum": 52,
    "placementRate": 93,
    "hasHostel": true,
    "hostelFeePerYear": "₹54,000",
    "nirfRank": 16,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Biju Patnaik Central Library",
      "Dilip Tirkey Hockey Stadium",
      "TIIR Innovation Centre"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 110,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 2800 - 5500"
      }
    ],
    "websiteUrl": "https://www.nitrkl.ac.in",
    "topRecruiters": [
      "Qualcomm",
      "Amazon",
      "Tata Steel",
      "Barclays"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "nit-warangal",
    "name": "National Institute of Technology Warangal",
    "shortName": "NIT Warangal",
    "city": "Warangal",
    "state": "Telangana",
    "type": "NIT",
    "rating": 4.7,
    "reviewCount": 2750,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Inaugurated by Pandit Jawaharlal Nehru in 1959 as the first Regional Engineering College in India, NIT Warangal is a pioneer in technical excellence.",
    "establishedYear": 1959,
    "campusSize": "256 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹17.8 LPA",
    "avgPackageNum": 17.8,
    "medianPackage": "₹14.2 LPA",
    "medianPackageNum": 14.2,
    "highestPackage": "₹88 LPA",
    "highestPackageNum": 88,
    "placementRate": 94,
    "hasHostel": true,
    "hostelFeePerYear": "₹56,000",
    "nirfRank": 21,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "1.8k Ultra Mega Hostel",
      "Siemens Centre of Excellence",
      "Innovation & Incubation Centre"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 1800 - 3800"
      }
    ],
    "websiteUrl": "https://www.nitw.ac.in",
    "topRecruiters": [
      "DE Shaw",
      "Microsoft",
      "Qualcomm",
      "Salesforce"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "nit-calicut",
    "name": "National Institute of Technology Calicut",
    "shortName": "NIT Calicut",
    "city": "Kozhikode",
    "state": "Kerala",
    "type": "NIT",
    "rating": 4.7,
    "reviewCount": 2400,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NIT Calicut in Chathamangalam features a green Western Ghats backdrop, ranked #25 in NIRF, and produces top coders and VLSI engineers.",
    "establishedYear": 1961,
    "campusSize": "300 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹16.5 LPA",
    "avgPackageNum": 16.5,
    "medianPackage": "₹13.2 LPA",
    "medianPackageNum": 13.2,
    "highestPackage": "₹50 LPA",
    "highestPackageNum": 50,
    "placementRate": 92,
    "hasHostel": true,
    "hostelFeePerYear": "₹52,000",
    "nirfRank": 25,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "TBI Technology Business Incubator",
      "Central Computer Centre",
      "Ragam Cultural Fest"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 110,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 3500 - 6200"
      }
    ],
    "websiteUrl": "https://www.nitc.ac.in",
    "topRecruiters": [
      "Oracle",
      "Texas Instruments",
      "Cisco",
      "Goldman Sachs"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "mnit-jaipur",
    "name": "Malaviya National Institute of Technology Jaipur",
    "shortName": "MNIT Jaipur",
    "city": "Jaipur",
    "state": "Rajasthan",
    "type": "NIT",
    "rating": 4.6,
    "reviewCount": 2200,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "MNIT Jaipur is located in the heart of Jaipur on JLN Marg, featuring Prabha Bhawan (Asia’s largest academic building) and exceptional core and IT placements.",
    "establishedYear": 1963,
    "campusSize": "317 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹15.8 LPA",
    "avgPackageNum": 15.8,
    "medianPackage": "₹12.5 LPA",
    "medianPackageNum": 12.5,
    "highestPackage": "₹64 LPA",
    "highestPackageNum": 64,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹54,000",
    "nirfRank": 37,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Prabha Bhawan",
      "Materials Research Centre",
      "Student Activity Centre"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 115,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 3800 - 5800"
      }
    ],
    "websiteUrl": "https://www.mnit.ac.in",
    "topRecruiters": [
      "Amazon",
      "Apple",
      "De Shaw",
      "Flipkart"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "vnit-nagpur",
    "name": "Visvesvaraya National Institute of Technology Nagpur",
    "shortName": "VNIT Nagpur",
    "city": "Nagpur",
    "state": "Maharashtra",
    "type": "NIT",
    "rating": 4.6,
    "reviewCount": 2000,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "VNIT Nagpur is situated in the centre of India, known for heavy industry ties, strong mechanical and metallurgy departments, and high placement ratios.",
    "establishedYear": 1960,
    "campusSize": "215 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹15.2 LPA",
    "avgPackageNum": 15.2,
    "medianPackage": "₹12.0 LPA",
    "medianPackageNum": 12,
    "highestPackage": "₹64 LPA",
    "highestPackageNum": 64,
    "placementRate": 90,
    "hasHostel": true,
    "hostelFeePerYear": "₹55,000",
    "nirfRank": 41,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Centre of Excellence in Applied AI",
      "Mega Hostel Complex",
      "Auditorium"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 115,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 4500 - 7200"
      }
    ],
    "websiteUrl": "https://vnit.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Goldman Sachs",
      "L&T",
      "Siemens"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "mnnit-allahabad",
    "name": "Motilal Nehru National Institute of Technology Allahabad",
    "shortName": "MNNIT Allahabad",
    "city": "Prayagraj",
    "state": "Uttar Pradesh",
    "type": "NIT",
    "rating": 4.6,
    "reviewCount": 2300,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "MNNIT Allahabad is famous for its legendary coding culture, record-breaking CSE and IT placements, and alumni leadership in Silicon Valley.",
    "establishedYear": 1961,
    "campusSize": "222 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹17.1 LPA",
    "avgPackageNum": 17.1,
    "medianPackage": "₹13.8 LPA",
    "medianPackageNum": 13.8,
    "highestPackage": "₹1.35 CPA",
    "highestPackageNum": 135,
    "placementRate": 93,
    "hasHostel": true,
    "hostelFeePerYear": "₹52,000",
    "nirfRank": 49,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Computer Centre with 24x7 LAN",
      "Executive Development Centre",
      "Sports Pavilion"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 180,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 2500 - 4800"
      }
    ],
    "websiteUrl": "https://www.mnnit.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Atlassian",
      "Amazon",
      "Qualcomm"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "nit-kurukshetra",
    "name": "National Institute of Technology Kurukshetra",
    "shortName": "NIT Kurukshetra",
    "city": "Kurukshetra",
    "state": "Haryana",
    "type": "NIT",
    "rating": 4.5,
    "reviewCount": 1900,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NIT Kurukshetra is located close to NCR, providing students direct access to Delhi tech hubs and top MNC recruiters.",
    "establishedYear": 1963,
    "campusSize": "300 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹15.4 LPA",
    "avgPackageNum": 15.4,
    "medianPackage": "₹12.2 LPA",
    "medianPackageNum": 12.2,
    "highestPackage": "₹51 LPA",
    "highestPackageNum": 51,
    "placementRate": 89,
    "hasHostel": true,
    "hostelFeePerYear": "₹50,000",
    "nirfRank": 50,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "CCN High-Speed Network",
      "Golden Jubilee Administrative Block",
      "Swimming Pool"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 4500 - 7500"
      }
    ],
    "websiteUrl": "https://www.nitkkr.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Amazon",
      "Adobe",
      "Flipkart"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "nit-delhi",
    "name": "National Institute of Technology Delhi",
    "shortName": "NIT Delhi",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "NIT",
    "rating": 4.5,
    "reviewCount": 1100,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NIT Delhi operates from its brand new permanent campus on GT Karnal Road, New Delhi, showing rapid growth in placements and cutoff ranks.",
    "establishedYear": 2010,
    "campusSize": "51 Acres",
    "tuitionFeePerYear": "₹1.5 Lakh",
    "tuitionFeeNum": 150000,
    "avgPackage": "₹16.5 LPA",
    "avgPackageNum": 16.5,
    "medianPackage": "₹13.0 LPA",
    "medianPackageNum": 13,
    "highestPackage": "₹82 LPA",
    "highestPackageNum": 82,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹60,000",
    "nirfRank": 51,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "New GT Karnal Road Campus",
      "Modern Computing Infrastructure",
      "Student Gym"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 60,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 5200 - 8500"
      },
      {
        "name": "B.Tech in Artificial Intelligence & Data Science",
        "duration": "4 Years",
        "seats": 30,
        "annualFee": "₹1,50,000",
        "cutoffRank": "AIR 6500 - 9800"
      }
    ],
    "websiteUrl": "https://nitdelhi.ac.in",
    "topRecruiters": [
      "Atlassian",
      "Adobe",
      "Amazon",
      "Intuit"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iiit-hyderabad",
    "name": "International Institute of Information Technology, Hyderabad",
    "shortName": "IIIT Hyderabad",
    "city": "Hyderabad",
    "state": "Telangana",
    "type": "IIIT",
    "rating": 4.9,
    "reviewCount": 2950,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIIT Hyderabad is globally revered for computer science research, world finals ACM-ICPC coding teams, Kohli Center on Intelligent Systems, and average CTC rivaling top IITs.",
    "establishedYear": 1998,
    "campusSize": "66 Acres",
    "tuitionFeePerYear": "₹3.6 Lakh",
    "tuitionFeeNum": 360000,
    "avgPackage": "₹32.0 LPA",
    "avgPackageNum": 32,
    "medianPackage": "₹30.0 LPA",
    "medianPackageNum": 30,
    "highestPackage": "₹1.02 CPA",
    "highestPackageNum": 102,
    "placementRate": 99,
    "hasHostel": true,
    "hostelFeePerYear": "₹72,000",
    "nirfRank": 55,
    "admissionCriteria": "JEE Main Rank via IIITH Portal / UGEE Exam",
    "facilities": [
      "Kohli Center on Intelligent Systems (KCIS)",
      "CIE Technology Incubator",
      "High-Speed Compute Clusters"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 150,
        "annualFee": "₹3,60,000",
        "cutoffRank": "AIR 500 - 1600 (JEE Main)"
      },
      {
        "name": "B.Tech in Electronics and Communication Engineering",
        "duration": "4 Years",
        "seats": 90,
        "annualFee": "₹3,60,000",
        "cutoffRank": "AIR 2000 - 4200 (JEE Main)"
      }
    ],
    "websiteUrl": "https://www.iiit.ac.in",
    "topRecruiters": [
      "Google",
      "Apple",
      "Meta",
      "Microsoft",
      "Bloomberg",
      "Tower Research"
    ],
    "accreditation": "Deemed University | NAAC A++"
  },
  {
    "id": "iiit-bangalore",
    "name": "International Institute of Information Technology Bangalore",
    "shortName": "IIIT Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "IIIT",
    "rating": 4.8,
    "reviewCount": 1800,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIIT Bangalore is located in Electronics City, Bengaluru, surrounded by global tech headquarters. Offers iM.Tech in CSE and ECE with median packages upwards of ₹24 LPA.",
    "establishedYear": 1999,
    "campusSize": "9 Acres",
    "tuitionFeePerYear": "₹3.8 Lakh",
    "tuitionFeeNum": 380000,
    "avgPackage": "₹26.5 LPA",
    "avgPackageNum": 26.5,
    "medianPackage": "₹24.0 LPA",
    "medianPackageNum": 24,
    "highestPackage": "₹65 LPA",
    "highestPackageNum": 65,
    "placementRate": 98,
    "hasHostel": true,
    "hostelFeePerYear": "₹84,000",
    "nirfRank": 74,
    "admissionCriteria": "JEE Main Score via IIITB Portal",
    "facilities": [
      "Electronics City Silicon Valley Hub",
      "MOSIP Open Source Lab",
      "Modern AC Hostels"
    ],
    "courses": [
      {
        "name": "Integrated M.Tech in Computer Science and Engineering",
        "duration": "5 Years",
        "seats": 150,
        "annualFee": "₹3,80,000",
        "cutoffRank": "AIR 3500 - 7500"
      }
    ],
    "websiteUrl": "https://www.iiitb.ac.in",
    "topRecruiters": [
      "Cisco",
      "Qualcomm",
      "Intel",
      "Amazon",
      "Adobe"
    ],
    "accreditation": "Deemed University | NAAC A+"
  },
  {
    "id": "iiit-delhi",
    "name": "Indraprastha Institute of Information Technology Delhi",
    "shortName": "IIIT Delhi",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "IIIT",
    "rating": 4.7,
    "reviewCount": 1950,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIIT-Delhi in Okhla, New Delhi, is recognized for its world-class faculty, top CS/AI publications, and specialized CS branches with design and biosciences.",
    "establishedYear": 2008,
    "campusSize": "25 Acres",
    "tuitionFeePerYear": "₹4.2 Lakh",
    "tuitionFeeNum": 420000,
    "avgPackage": "₹23.7 LPA",
    "avgPackageNum": 23.7,
    "medianPackage": "₹18.5 LPA",
    "medianPackageNum": 18.5,
    "highestPackage": "₹51.3 LPA",
    "highestPackageNum": 51.3,
    "placementRate": 95,
    "hasHostel": true,
    "hostelFeePerYear": "₹80,000",
    "nirfRank": 75,
    "admissionCriteria": "JAC Delhi Counseling via JEE Main",
    "facilities": [
      "R&D Building",
      "Design Innovation Lab",
      "Swimming Pool and Gymnasium"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹4,20,000",
        "cutoffRank": "AIR 5000 - 12000"
      },
      {
        "name": "B.Tech in CS & Artificial Intelligence",
        "duration": "4 Years",
        "seats": 60,
        "annualFee": "₹4,20,000",
        "cutoffRank": "AIR 4000 - 9500"
      }
    ],
    "websiteUrl": "https://www.iiitd.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Goldman Sachs",
      "LinkedIn",
      "Amazon"
    ],
    "accreditation": "State University | NAAC A"
  },
  {
    "id": "iiit-allahabad",
    "name": "Indian Institute of Information Technology Allahabad",
    "shortName": "IIIT Allahabad",
    "city": "Prayagraj",
    "state": "Uttar Pradesh",
    "type": "IIIT",
    "rating": 4.7,
    "reviewCount": 2200,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIIT Allahabad at Jhalwa is a government-funded Institute of National Importance known for exceptional competitive programming and high placement averages.",
    "establishedYear": 1999,
    "campusSize": "100 Acres",
    "tuitionFeePerYear": "₹1.8 Lakh",
    "tuitionFeeNum": 180000,
    "avgPackage": "₹25.8 LPA",
    "avgPackageNum": 25.8,
    "medianPackage": "₹22.0 LPA",
    "medianPackageNum": 22,
    "highestPackage": "₹1.2 CPA",
    "highestPackageNum": 120,
    "placementRate": 96,
    "hasHostel": true,
    "hostelFeePerYear": "₹55,000",
    "nirfRank": 87,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Penman Auditorium",
      "Computer Center Complex",
      "Robotics and AI Lab"
    ],
    "courses": [
      {
        "name": "B.Tech in Information Technology",
        "duration": "4 Years",
        "seats": 275,
        "annualFee": "₹1,80,000",
        "cutoffRank": "AIR 3800 - 5500"
      }
    ],
    "websiteUrl": "https://www.iiita.ac.in",
    "topRecruiters": [
      "Amazon",
      "Google",
      "Atlassian",
      "Flipkart",
      "DE Shaw"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iiit-lucknow",
    "name": "Indian Institute of Information Technology Lucknow",
    "shortName": "IIIT Lucknow",
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "type": "IIIT",
    "rating": 4.6,
    "reviewCount": 1100,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIIT Lucknow in Chak Ganjaria IT City has emerged as one of the fastest growing IIITs in India, consistently delivering average packages above ₹25 LPA.",
    "establishedYear": 2015,
    "campusSize": "50 Acres",
    "tuitionFeePerYear": "₹2.4 Lakh",
    "tuitionFeeNum": 240000,
    "avgPackage": "₹26.0 LPA",
    "avgPackageNum": 26,
    "medianPackage": "₹23.5 LPA",
    "medianPackageNum": 23.5,
    "highestPackage": "₹59 LPA",
    "highestPackageNum": 59,
    "placementRate": 97,
    "hasHostel": true,
    "hostelFeePerYear": "₹62,000",
    "nirfRank": 95,
    "admissionCriteria": "JEE Main Rank via JoSAA / CSAB Counseling",
    "facilities": [
      "Chak Ganjaria IT City Campus",
      "Modern Computer Labs",
      "Sports Ground"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 75,
        "annualFee": "₹2,40,000",
        "cutoffRank": "AIR 5500 - 9500"
      }
    ],
    "websiteUrl": "https://iiitl.ac.in",
    "topRecruiters": [
      "Amazon",
      "Microsoft",
      "Flipkart",
      "Media.net"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "bits-pilani",
    "name": "Birla Institute of Technology and Science, Pilani (Main Campus)",
    "shortName": "BITS Pilani",
    "city": "Pilani",
    "state": "Rajasthan",
    "type": "BITS",
    "rating": 4.8,
    "reviewCount": 3300,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "BITS Pilani Main Campus is celebrated for its meritocratic culture, 0% mandatory attendance policy, Practice School internship model, and producing unicorn founders.",
    "establishedYear": 1964,
    "campusSize": "328 Acres",
    "tuitionFeePerYear": "₹5.4 Lakh",
    "tuitionFeeNum": 540000,
    "avgPackage": "₹20.8 LPA",
    "avgPackageNum": 20.8,
    "medianPackage": "₹17.0 LPA",
    "medianPackageNum": 17,
    "highestPackage": "₹1.3 CPA",
    "highestPackageNum": 130,
    "placementRate": 96,
    "hasHostel": true,
    "hostelFeePerYear": "₹60,000",
    "nirfRank": 20,
    "admissionCriteria": "BITSAT Examination Merit List",
    "facilities": [
      "0% Attendance Policy",
      "Pilani Clock Tower",
      "Practice School System",
      "Student Activity Centre"
    ],
    "courses": [
      {
        "name": "B.E. in Computer Science",
        "duration": "4 Years",
        "seats": 150,
        "annualFee": "₹5,40,000",
        "cutoffRank": "BITSAT Score 330+"
      },
      {
        "name": "B.E. in Electronics and Communication",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹5,40,000",
        "cutoffRank": "BITSAT Score 290+"
      },
      {
        "name": "M.Sc (Dual Degree) in Economics + B.E.",
        "duration": "5 Years",
        "seats": 100,
        "annualFee": "₹5,40,000",
        "cutoffRank": "BITSAT Score 270+"
      }
    ],
    "websiteUrl": "https://www.bits-pilani.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Apple",
      "NVIDIA",
      "McKinsey & Co",
      "Bain & Co"
    ],
    "accreditation": "Institute of Eminence (IoE) | NAAC A"
  },
  {
    "id": "bits-goa",
    "name": "BITS Pilani, K K Birla Goa Campus",
    "shortName": "BITS Goa",
    "city": "Zuarinagar",
    "state": "Goa",
    "type": "BITS",
    "rating": 4.8,
    "reviewCount": 2400,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "BITS Goa is set in the lush green hills of Zuarinagar, Goa, offering BITS Pilani's premier curriculum, Waves cultural fest, and world-class tech placements.",
    "establishedYear": 2004,
    "campusSize": "180 Acres",
    "tuitionFeePerYear": "₹5.4 Lakh",
    "tuitionFeeNum": 540000,
    "avgPackage": "₹20.2 LPA",
    "avgPackageNum": 20.2,
    "medianPackage": "₹16.5 LPA",
    "medianPackageNum": 16.5,
    "highestPackage": "₹1.1 CPA",
    "highestPackageNum": 110,
    "placementRate": 95,
    "hasHostel": true,
    "hostelFeePerYear": "₹62,000",
    "nirfRank": 23,
    "admissionCriteria": "BITSAT Examination Merit List",
    "facilities": [
      "Lush Hilltop Campus",
      "Supercomputing Facility",
      "Medical Centre",
      "Auditorium Complex"
    ],
    "courses": [
      {
        "name": "B.E. in Computer Science",
        "duration": "4 Years",
        "seats": 140,
        "annualFee": "₹5,40,000",
        "cutoffRank": "BITSAT Score 310+"
      },
      {
        "name": "B.E. in Electronics and Instrumentation",
        "duration": "4 Years",
        "seats": 110,
        "annualFee": "₹5,40,000",
        "cutoffRank": "BITSAT Score 265+"
      }
    ],
    "websiteUrl": "https://www.bits-pilani.ac.in/goa",
    "topRecruiters": [
      "Microsoft",
      "Google",
      "Amazon",
      "Morgan Stanley"
    ],
    "accreditation": "Institute of Eminence (IoE)"
  },
  {
    "id": "bits-hyderabad",
    "name": "BITS Pilani, Hyderabad Campus",
    "shortName": "BITS Hyderabad",
    "city": "Hyderabad",
    "state": "Telangana",
    "type": "BITS",
    "rating": 4.7,
    "reviewCount": 2200,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "BITS Hyderabad in Jawaharnagar boasts a sprawling 200-acre modern campus with dedicated pharmacy, biotech, and computer science research complexes.",
    "establishedYear": 2008,
    "campusSize": "200 Acres",
    "tuitionFeePerYear": "₹5.4 Lakh",
    "tuitionFeeNum": 540000,
    "avgPackage": "₹19.8 LPA",
    "avgPackageNum": 19.8,
    "medianPackage": "₹16.2 LPA",
    "medianPackageNum": 16.2,
    "highestPackage": "₹1.05 CPA",
    "highestPackageNum": 105,
    "placementRate": 94,
    "hasHostel": true,
    "hostelFeePerYear": "₹62,000",
    "nirfRank": 24,
    "admissionCriteria": "BITSAT Examination Merit List",
    "facilities": [
      "TBI Incubator",
      "Animal House for Pharma Research",
      "Cricket & Football Stadium"
    ],
    "courses": [
      {
        "name": "B.E. in Computer Science",
        "duration": "4 Years",
        "seats": 140,
        "annualFee": "₹5,40,000",
        "cutoffRank": "BITSAT Score 305+"
      }
    ],
    "websiteUrl": "https://www.bits-pilani.ac.in/hyderabad",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Oracle",
      "Qualcomm",
      "Deloitte"
    ],
    "accreditation": "Institute of Eminence (IoE)"
  },
  {
    "id": "vit-vellore",
    "name": "Vellore Institute of Technology, Vellore (Main Campus)",
    "shortName": "VIT Vellore",
    "city": "Vellore",
    "state": "Tamil Nadu",
    "type": "Private University",
    "rating": 4.6,
    "reviewCount": 4800,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "VIT Vellore is ranked #11 in Engineering by NIRF. Known for the Flexible Credit System (FFCS), massive campus recruiting drives with 900+ visiting companies, and international tie-ups.",
    "establishedYear": 1984,
    "campusSize": "372 Acres",
    "tuitionFeePerYear": "₹2.9 - 4.9 Lakh (Category 1-5)",
    "tuitionFeeNum": 290000,
    "avgPackage": "₹9.9 LPA",
    "avgPackageNum": 9.9,
    "medianPackage": "₹8.5 LPA",
    "medianPackageNum": 8.5,
    "highestPackage": "₹1.02 CPA",
    "highestPackageNum": 102,
    "placementRate": 90,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,10,000 - 1,80,000 (AC/Non-AC)",
    "nirfRank": 11,
    "admissionCriteria": "VITEEE Examination Rank & Counseling",
    "facilities": [
      "Fully Flexible Credit System (FFCS)",
      "Anna Auditorium",
      "24 Hostels (AC/Non-AC)",
      "Swimming Pool"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 1200,
        "annualFee": "₹1,98,000 (Cat 1)",
        "cutoffRank": "VITEEE Rank < 7,500"
      },
      {
        "name": "B.Tech in CSE (Information Security)",
        "duration": "4 Years",
        "seats": 300,
        "annualFee": "₹1,98,000 (Cat 1)",
        "cutoffRank": "VITEEE Rank < 12,000"
      }
    ],
    "websiteUrl": "https://vit.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Amazon",
      "AppDynamics",
      "Motorq",
      "DE Shaw",
      "TCS Ninja/Digital"
    ],
    "accreditation": "Institute of Eminence (IoE) | NAAC A++ (3.66)"
  },
  {
    "id": "vit-chennai",
    "name": "Vellore Institute of Technology, Chennai Campus",
    "shortName": "VIT Chennai",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Private University",
    "rating": 4.5,
    "reviewCount": 3100,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "VIT Chennai in Vandalur-Kelambakkam Road features modern architecture, centralized placements with Vellore, and top robotics and AI laboratories.",
    "establishedYear": 2010,
    "campusSize": "192 Acres",
    "tuitionFeePerYear": "₹2.9 - 4.9 Lakh (Category 1-5)",
    "tuitionFeeNum": 290000,
    "avgPackage": "₹9.4 LPA",
    "avgPackageNum": 9.4,
    "medianPackage": "₹8.0 LPA",
    "medianPackageNum": 8,
    "highestPackage": "₹75 LPA",
    "highestPackageNum": 75,
    "placementRate": 89,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,20,000",
    "nirfRank": 17,
    "admissionCriteria": "VITEEE Examination Rank & Counseling",
    "facilities": [
      "Netaji Subhas Chandra Bose Academic Block",
      "Modern AC Hostels",
      "Vibrance Fest"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 800,
        "annualFee": "₹1,98,000 (Cat 1)",
        "cutoffRank": "VITEEE Rank < 14,000"
      }
    ],
    "websiteUrl": "https://chennai.vit.ac.in",
    "topRecruiters": [
      "Amazon",
      "Microsoft",
      "Qualcomm",
      "Infosys"
    ],
    "accreditation": "NAAC A++"
  },
  {
    "id": "vit-bhopal",
    "name": "VIT Bhopal University",
    "shortName": "VIT Bhopal",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "type": "Private University",
    "rating": 4.3,
    "reviewCount": 1600,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "VIT Bhopal in Ashta is India’s first 100% legacy-free Future-Ready Campus, offering specialized AI, Gaming, and Cyber Security degree programs with centralized VIT placements.",
    "establishedYear": 2017,
    "campusSize": "250 Acres",
    "tuitionFeePerYear": "₹2.5 Lakh",
    "tuitionFeeNum": 250000,
    "avgPackage": "₹8.5 LPA",
    "avgPackageNum": 8.5,
    "medianPackage": "₹7.2 LPA",
    "medianPackageNum": 7.2,
    "highestPackage": "₹59 LPA",
    "highestPackageNum": 59,
    "placementRate": 86,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,00,000",
    "nirfRank": 85,
    "admissionCriteria": "VITEEE Rank & Counseling",
    "facilities": [
      "Gaming & Animation Studio",
      "Centralized VIT Placement Cell",
      "Modern Hostels"
    ],
    "courses": [
      {
        "name": "B.Tech in CSE (Gaming Technology)",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹1,98,000",
        "cutoffRank": "VITEEE Rank < 40,000"
      },
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 600,
        "annualFee": "₹1,98,000",
        "cutoffRank": "VITEEE Rank < 30,000"
      }
    ],
    "websiteUrl": "https://vitbhopal.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Amazon",
      "Cognizant",
      "Wipro"
    ],
    "accreditation": "Private State University"
  },
  {
    "id": "vit-ap",
    "name": "VIT-AP University, Amaravati",
    "shortName": "VIT-AP",
    "city": "Amaravati",
    "state": "Andhra Pradesh",
    "type": "Private University",
    "rating": 4.3,
    "reviewCount": 1500,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "VIT-AP is situated in the new capital city of Amaravati, Andhra Pradesh. Built with green architecture, it shares unified placements across all VIT campuses.",
    "establishedYear": 2017,
    "campusSize": "200 Acres",
    "tuitionFeePerYear": "₹2.5 Lakh",
    "tuitionFeeNum": 250000,
    "avgPackage": "₹8.6 LPA",
    "avgPackageNum": 8.6,
    "medianPackage": "₹7.4 LPA",
    "medianPackageNum": 7.4,
    "highestPackage": "₹63 LPA",
    "highestPackageNum": 63,
    "placementRate": 87,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,05,000",
    "nirfRank": 88,
    "admissionCriteria": "VITEEE Rank & Counseling",
    "facilities": [
      "Sarvepalli Radhakrishnan Academic Block",
      "Ananya Cultural Center",
      "Unified Placements"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 600,
        "annualFee": "₹1,98,000",
        "cutoffRank": "VITEEE Rank < 28,000"
      }
    ],
    "websiteUrl": "https://vitap.ac.in",
    "topRecruiters": [
      "Amazon",
      "Intel",
      "Morgan Stanley",
      "TCS"
    ],
    "accreditation": "Private State University"
  },
  {
    "id": "iisc-bangalore",
    "name": "Indian Institute of Science, Bengaluru",
    "shortName": "IISc Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "Research & Science",
    "rating": 4.95,
    "reviewCount": 4100,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Indian Institute of Science (IISc) Bengaluru is India's #1 Ranked University and premier research institution, founded in 1909 with the vision of Jamsetji Tata and Swami Vivekananda.",
    "establishedYear": 1909,
    "campusSize": "440 Acres",
    "tuitionFeePerYear": "₹35,000",
    "tuitionFeeNum": 35000,
    "avgPackage": "₹28.5 LPA",
    "avgPackageNum": 28.5,
    "medianPackage": "₹25.0 LPA",
    "medianPackageNum": 25,
    "highestPackage": "₹86 LPA",
    "highestPackageNum": 86,
    "placementRate": 98,
    "hasHostel": true,
    "hostelFeePerYear": "₹40,000",
    "nirfRank": 1,
    "admissionCriteria": "JEE Advanced (Top 250) / KVPY / NEET / GATE",
    "facilities": [
      "Historic Faculty Hall",
      "Supercomputer PARAM Pravega (3.3 PFLOPS)",
      "CeNSE Nanotechnology Centre"
    ],
    "courses": [
      {
        "name": "Bachelor of Science (Research) - BS",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹35,000",
        "cutoffRank": "JEE Adv AIR < 250"
      },
      {
        "name": "B.Tech in Mathematics and Computing",
        "duration": "4 Years",
        "seats": 52,
        "annualFee": "₹2,20,000",
        "cutoffRank": "JEE Adv AIR < 350"
      }
    ],
    "websiteUrl": "https://iisc.ac.in",
    "topRecruiters": [
      "Google DeepMind",
      "Microsoft Research",
      "ISRO",
      "Apple",
      "AstraZeneca"
    ],
    "accreditation": "Institute of Eminence (IoE) | NIRF #1"
  },
  {
    "id": "iiser-pune",
    "name": "Indian Institute of Science Education and Research Pune",
    "shortName": "IISER Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "type": "Research & Science",
    "rating": 4.8,
    "reviewCount": 1600,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IISER Pune is an autonomous research institution under MoE, Govt. of India. Dedicated to integrated fundamental science education and world-class doctoral research.",
    "establishedYear": 2006,
    "campusSize": "98 Acres",
    "tuitionFeePerYear": "₹45,000",
    "tuitionFeeNum": 45000,
    "avgPackage": "₹14.2 LPA",
    "avgPackageNum": 14.2,
    "medianPackage": "₹12.0 LPA",
    "medianPackageNum": 12,
    "highestPackage": "₹38 LPA",
    "highestPackageNum": 38,
    "placementRate": 85,
    "hasHostel": true,
    "hostelFeePerYear": "₹36,000",
    "nirfRank": 26,
    "admissionCriteria": "IISER Aptitude Test (IAT) / JEE Advanced",
    "facilities": [
      "National Facility for Gene Function",
      "Laser Cooling & Trapping Lab",
      "Modern Residential Complex"
    ],
    "courses": [
      {
        "name": "BS-MS Dual Degree in Natural Sciences",
        "duration": "5 Years",
        "seats": 288,
        "annualFee": "₹45,000",
        "cutoffRank": "IAT Merit Rank < 500"
      }
    ],
    "websiteUrl": "https://www.iiserpune.ac.in",
    "topRecruiters": [
      "Global PhD programs (MIT, Stanford, Max Planck)",
      "Dr. Reddy’s",
      "Biocon",
      "TCS Research"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "iiser-kolkata",
    "name": "Indian Institute of Science Education and Research Kolkata",
    "shortName": "IISER Kolkata",
    "city": "Mohanpur",
    "state": "West Bengal",
    "type": "Research & Science",
    "rating": 4.7,
    "reviewCount": 1400,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IISER Kolkata in Mohanpur is a premier science teaching and research institute specializing in chemical sciences, space physics (CESSI), and biological systems.",
    "establishedYear": 2006,
    "campusSize": "201 Acres",
    "tuitionFeePerYear": "₹45,000",
    "tuitionFeeNum": 45000,
    "avgPackage": "₹13.5 LPA",
    "avgPackageNum": 13.5,
    "medianPackage": "₹11.5 LPA",
    "medianPackageNum": 11.5,
    "highestPackage": "₹34 LPA",
    "highestPackageNum": 34,
    "placementRate": 84,
    "hasHostel": true,
    "hostelFeePerYear": "₹36,000",
    "nirfRank": 39,
    "admissionCriteria": "IISER Aptitude Test (IAT) Merit",
    "facilities": [
      "Center of Excellence in Space Sciences India (CESSI)",
      "Cryo-EM Lab",
      "Green Residential Campus"
    ],
    "courses": [
      {
        "name": "BS-MS Dual Degree Program",
        "duration": "5 Years",
        "seats": 250,
        "annualFee": "₹45,000",
        "cutoffRank": "IAT Merit Rank < 800"
      }
    ],
    "websiteUrl": "https://www.iiserkol.ac.in",
    "topRecruiters": [
      "ISRO",
      "Max Planck Institutes",
      "Shell",
      "Pfizer"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "niser-bhubaneswar",
    "name": "National Institute of Science Education and Research",
    "shortName": "NISER Bhubaneswar",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "type": "Research & Science",
    "rating": 4.8,
    "reviewCount": 1500,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NISER is an autonomous research institution under Department of Atomic Energy (DAE), Govt. of India. Affiliated with Homi Bhabha National Institute with 100% DISHA scholarship.",
    "establishedYear": 2007,
    "campusSize": "300 Acres",
    "tuitionFeePerYear": "₹18,000 (with ₹60,000/yr INSPIRE Scholarship)",
    "tuitionFeeNum": 18000,
    "avgPackage": "₹15.0 LPA",
    "avgPackageNum": 15,
    "medianPackage": "₹13.0 LPA",
    "medianPackageNum": 13,
    "highestPackage": "₹36 LPA",
    "highestPackageNum": 36,
    "placementRate": 88,
    "hasHostel": true,
    "hostelFeePerYear": "₹24,000",
    "nirfRank": 35,
    "admissionCriteria": "National Entrance Screening Test (NEST)",
    "facilities": [
      "BARC Nuclear Science Link",
      "Jatni Permanent Campus",
      "Full DAE Scholarship to all students"
    ],
    "courses": [
      {
        "name": "Integrated 5-Year M.Sc in Physical/Chemical/Bio/Math Sciences",
        "duration": "5 Years",
        "seats": 200,
        "annualFee": "₹18,000",
        "cutoffRank": "NEST Examination Rank < 300"
      }
    ],
    "websiteUrl": "https://www.niser.ac.in",
    "topRecruiters": [
      "Bhabha Atomic Research Centre (BARC)",
      "CERN Geneva",
      "TIFR",
      "DESY Germany"
    ],
    "accreditation": "DAE Center of Excellence | HBNI"
  },
  {
    "id": "aiims-delhi",
    "name": "All India Institute of Medical Sciences, New Delhi",
    "shortName": "AIIMS New Delhi",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "Medical",
    "rating": 4.95,
    "reviewCount": 4900,
    "featuredImage": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "AIIMS New Delhi is India's undisputed #1 ranked Medical Institute by NIRF. Known for cutting-edge medical care, pioneering surgeries, and an annual MBBS fee of just ₹1,628 including hostel.",
    "establishedYear": 1956,
    "campusSize": "115 Acres",
    "tuitionFeePerYear": "₹1,628 (Total 5-Year Fee)",
    "tuitionFeeNum": 1628,
    "avgPackage": "₹18.0 LPA (Resident Doctors Stipend & Packages)",
    "avgPackageNum": 18,
    "medianPackage": "₹16.5 LPA",
    "medianPackageNum": 16.5,
    "highestPackage": "₹35 LPA",
    "highestPackageNum": 35,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,000",
    "nirfRank": 1,
    "admissionCriteria": "NEET UG All India Rank (AIR 1 - 55)",
    "facilities": [
      "2500+ Bed Multi-specialty Hospital",
      "National Trauma Centre",
      "Dr. BR Ambedkar IRCH",
      "Hostel for 100% Students"
    ],
    "courses": [
      {
        "name": "MBBS - Bachelor of Medicine and Bachelor of Surgery",
        "duration": "5.5 Years",
        "seats": 125,
        "annualFee": "₹1,628",
        "cutoffRank": "NEET AIR 1 - 55"
      },
      {
        "name": "B.Sc (Hons) Nursing",
        "duration": "4 Years",
        "seats": 96,
        "annualFee": "₹1,000",
        "cutoffRank": "AIIMS Nursing Entrance"
      }
    ],
    "websiteUrl": "https://www.aiims.edu",
    "topRecruiters": [
      "AIIMS Residency",
      "Apollo Hospitals",
      "Max Healthcare",
      "NHS UK",
      "Mayo Clinic (Fellowships)"
    ],
    "accreditation": "Institute of National Importance | NIRF #1 Medical"
  },
  {
    "id": "aiims-bhubaneswar",
    "name": "All India Institute of Medical Sciences Bhubaneswar",
    "shortName": "AIIMS Bhubaneswar",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "type": "Medical",
    "rating": 4.8,
    "reviewCount": 2200,
    "featuredImage": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "AIIMS Bhubaneswar is the top-performing 2nd generation AIIMS in India (NIRF #15 Medical), delivering exceptional surgical care and medical research.",
    "establishedYear": 2012,
    "campusSize": "100 Acres",
    "tuitionFeePerYear": "₹5,856 (Total Course Fee)",
    "tuitionFeeNum": 5856,
    "avgPackage": "₹15.6 LPA",
    "avgPackageNum": 15.6,
    "medianPackage": "₹14.0 LPA",
    "medianPackageNum": 14,
    "highestPackage": "₹28 LPA",
    "highestPackageNum": 28,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,500",
    "nirfRank": 15,
    "admissionCriteria": "NEET UG All India Rank",
    "facilities": [
      "1000-Bed Super Specialty Hospital",
      "Trauma & Emergency Care",
      "Skill Simulation Lab"
    ],
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 Years",
        "seats": 125,
        "annualFee": "₹5,856",
        "cutoffRank": "NEET AIR 200 - 550"
      }
    ],
    "websiteUrl": "https://aiimsbhubaneswar.nic.in",
    "topRecruiters": [
      "Fortis Healthcare",
      "Manipal Hospitals",
      "Apollo Hospitals"
    ],
    "accreditation": "Institute of National Importance"
  },
  {
    "id": "cmc-vellore",
    "name": "Christian Medical College, Vellore",
    "shortName": "CMC Vellore",
    "city": "Vellore",
    "state": "Tamil Nadu",
    "type": "Medical",
    "rating": 4.9,
    "reviewCount": 3400,
    "featuredImage": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "CMC Vellore is ranked #3 in India for Medical Education. Renowned globally for ethical medicine, subsidized quality care, and world-class clinical training since 1900.",
    "establishedYear": 1900,
    "campusSize": "200 Acres",
    "tuitionFeePerYear": "₹52,830",
    "tuitionFeeNum": 52830,
    "avgPackage": "₹16.5 LPA",
    "avgPackageNum": 16.5,
    "medianPackage": "₹15.0 LPA",
    "medianPackageNum": 15,
    "highestPackage": "₹32 LPA",
    "highestPackageNum": 32,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "₹40,000",
    "nirfRank": 3,
    "admissionCriteria": "NEET UG Rank + Institutional Aptitude Interview",
    "facilities": [
      "Bagayam Green Campus",
      "3000-Bed Hospital Network",
      "Ida Scudder Archives"
    ],
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 Years",
        "seats": 100,
        "annualFee": "₹52,830",
        "cutoffRank": "NEET AIR < 250"
      }
    ],
    "websiteUrl": "https://www.cmch-vellore.edu",
    "topRecruiters": [
      "Christian Hospital Network",
      "Apollo",
      "Global Medical Foundations"
    ],
    "accreditation": "NAAC A++ | NIRF #3 Medical"
  },
  {
    "id": "pgimer-chandigarh",
    "name": "Postgraduate Institute of Medical Education and Research",
    "shortName": "PGIMER Chandigarh",
    "city": "Chandigarh",
    "state": "Chandigarh",
    "type": "Medical",
    "rating": 4.9,
    "reviewCount": 2900,
    "featuredImage": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "PGIMER Chandigarh is ranked #2 in Medical across India by NIRF. An apex tertiary care and research institute providing cutting-edge post-graduate and super-specialty medical training.",
    "establishedYear": 1962,
    "campusSize": "277 Acres",
    "tuitionFeePerYear": "₹3,500",
    "tuitionFeeNum": 3500,
    "avgPackage": "₹19.0 LPA",
    "avgPackageNum": 19,
    "medianPackage": "₹17.5 LPA",
    "medianPackageNum": 17.5,
    "highestPackage": "₹38 LPA",
    "highestPackageNum": 38,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "₹12,000",
    "nirfRank": 2,
    "admissionCriteria": "INI-CET / INI-SS / NEET PG Entrance",
    "facilities": [
      "Advanced Eye Centre",
      "Advanced Cardiac Centre",
      "National Level Organ Transplant Centre"
    ],
    "courses": [
      {
        "name": "MD / MS Super Specialty",
        "duration": "3 Years",
        "seats": 350,
        "annualFee": "₹3,500",
        "cutoffRank": "INI-CET AIR < 100"
      },
      {
        "name": "B.Sc Medical Technology",
        "duration": "3 Years",
        "seats": 80,
        "annualFee": "₹5,000",
        "cutoffRank": "PGIMER Entrance"
      }
    ],
    "websiteUrl": "https://pgimer.edu.in",
    "topRecruiters": [
      "Top Tertiary Hospitals",
      "International Fellowships"
    ],
    "accreditation": "Institute of National Importance | NIRF #2"
  },
  {
    "id": "kmc-manipal",
    "name": "Kasturba Medical College, Manipal",
    "shortName": "KMC Manipal",
    "city": "Manipal",
    "state": "Karnataka",
    "type": "Medical",
    "rating": 4.8,
    "reviewCount": 2500,
    "featuredImage": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "KMC Manipal was India’s first self-financing private medical college, ranked consistently in top 10 medical colleges in India, recognized by the General Medical Council (GMC) of UK.",
    "establishedYear": 1953,
    "campusSize": "313 Acres",
    "tuitionFeePerYear": "₹17.8 Lakh",
    "tuitionFeeNum": 1780000,
    "avgPackage": "₹14.0 LPA",
    "avgPackageNum": 14,
    "medianPackage": "₹12.5 LPA",
    "medianPackageNum": 12.5,
    "highestPackage": "₹30 LPA",
    "highestPackageNum": 30,
    "placementRate": 98,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,20,000",
    "nirfRank": 9,
    "admissionCriteria": "NEET UG All India Counseling",
    "facilities": [
      "Shirdi Sai Baba Cancer Hospital",
      "Simulation Centre",
      "Health Sciences Library"
    ],
    "courses": [
      {
        "name": "MBBS",
        "duration": "5.5 Years",
        "seats": 250,
        "annualFee": "₹17,80,000",
        "cutoffRank": "NEET AIR 20,000 - 55,000"
      }
    ],
    "websiteUrl": "https://manipal.edu/kmc-manipal.html",
    "topRecruiters": [
      "Manipal Health Enterprises",
      "Apollo Hospitals",
      "NHS UK"
    ],
    "accreditation": "IoE (MAHE) | NAAC A++"
  },
  {
    "id": "iim-ahmedabad",
    "name": "Indian Institute of Management Ahmedabad",
    "shortName": "IIM Ahmedabad",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "type": "IIM",
    "rating": 4.95,
    "reviewCount": 3800,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIM Ahmedabad (WIMWI) is ranked #1 in Management by NIRF and is India’s foremost business school. Celebrated for its Louis Kahn brick architecture, Harvard-style Case Study pedagogy, and global CXO alumni.",
    "establishedYear": 1961,
    "campusSize": "102 Acres",
    "tuitionFeePerYear": "₹12.5 Lakh (₹25 Lakh Total Course)",
    "tuitionFeeNum": 1250000,
    "avgPackage": "₹34.3 LPA",
    "avgPackageNum": 34.3,
    "medianPackage": "₹31.5 LPA",
    "medianPackageNum": 31.5,
    "highestPackage": "₹1.15 CPA",
    "highestPackageNum": 115,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "Included in Tuition",
    "nirfRank": 1,
    "admissionCriteria": "CAT Percentile (99.5%ile+) followed by AWT-PI",
    "facilities": [
      "Louis Kahn Heritage Campus",
      "Vikram Sarabhai Library",
      "CIIE Startup Incubator"
    ],
    "courses": [
      {
        "name": "MBA / PGP - Post Graduate Programme in Management",
        "duration": "2 Years",
        "seats": 395,
        "annualFee": "₹12,50,000",
        "cutoffRank": "CAT > 99.6 %ile"
      },
      {
        "name": "PGP-FABM (Food & Agri-Business)",
        "duration": "2 Years",
        "seats": 45,
        "annualFee": "₹11,50,000",
        "cutoffRank": "CAT > 96 %ile"
      }
    ],
    "websiteUrl": "https://www.iima.ac.in",
    "topRecruiters": [
      "McKinsey & Company",
      "Boston Consulting Group (BCG)",
      "Bain & Co",
      "Goldman Sachs",
      "Blackstone"
    ],
    "accreditation": "EQUIS Accredited | Institute of National Importance | NIRF #1"
  },
  {
    "id": "iim-bangalore",
    "name": "Indian Institute of Management Bangalore",
    "shortName": "IIM Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "IIM",
    "rating": 4.9,
    "reviewCount": 3500,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIM Bangalore on Bannerghatta Road is known for stone-clad architecture designed by B.V. Doshi, deep ties with Bangalore’s tech ecosystem, and top consulting and product management placements.",
    "establishedYear": 1973,
    "campusSize": "100 Acres",
    "tuitionFeePerYear": "₹12.2 Lakh",
    "tuitionFeeNum": 1220000,
    "avgPackage": "₹35.3 LPA",
    "avgPackageNum": 35.3,
    "medianPackage": "₹33.0 LPA",
    "medianPackageNum": 33,
    "highestPackage": "₹1.10 CPA",
    "highestPackageNum": 110,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "Included in Tuition",
    "nirfRank": 2,
    "admissionCriteria": "CAT Percentile (99.4%ile+) + WAT/PI",
    "facilities": [
      "B.V. Doshi Stone Campus",
      "NSRCEL Entrepreneurship Hub",
      "World-Class Executive Hostels"
    ],
    "courses": [
      {
        "name": "MBA / PGP - Post Graduate Programme in Management",
        "duration": "2 Years",
        "seats": 480,
        "annualFee": "₹12,25,000",
        "cutoffRank": "CAT > 99.5 %ile"
      }
    ],
    "websiteUrl": "https://www.iimb.ac.in",
    "topRecruiters": [
      "Oliver Wyman",
      "Strategy&",
      "Amazon",
      "Microsoft",
      "Bain & Co"
    ],
    "accreditation": "EQUIS | AACSB | NIRF #2 Management"
  },
  {
    "id": "iim-calcutta",
    "name": "Indian Institute of Management Calcutta",
    "shortName": "IIM Calcutta",
    "city": "Kolkata",
    "state": "West Bengal",
    "type": "IIM",
    "rating": 4.9,
    "reviewCount": 3300,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "IIM Calcutta in Joka is India's oldest IIM, world-famous as the \"Finance Campus of India\". Triple Crown accredited (AACSB, AMBA, EQUIS) with unbeatable investment banking placements.",
    "establishedYear": 1961,
    "campusSize": "135 Acres",
    "tuitionFeePerYear": "₹13.5 Lakh",
    "tuitionFeeNum": 1350000,
    "avgPackage": "₹35.0 LPA",
    "avgPackageNum": 35,
    "medianPackage": "₹33.6 LPA",
    "medianPackageNum": 33.6,
    "highestPackage": "₹1.20 CPA",
    "highestPackageNum": 120,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "Included in Tuition",
    "nirfRank": 3,
    "admissionCriteria": "CAT Percentile (99.5%ile+) + WAT/PI",
    "facilities": [
      "7 Scenic Lakes on Campus",
      "Financial Research and Trading Lab",
      "Triple Crown Accreditation"
    ],
    "courses": [
      {
        "name": "MBA - Master of Business Administration",
        "duration": "2 Years",
        "seats": 460,
        "annualFee": "₹13,50,000",
        "cutoffRank": "CAT > 99.5 %ile"
      }
    ],
    "websiteUrl": "https://www.iimcal.ac.in",
    "topRecruiters": [
      "Avendus Capital",
      "Goldman Sachs",
      "Morgan Stanley",
      "Barclays",
      "BCG"
    ],
    "accreditation": "Triple Crown (AACSB, AMBA, EQUIS) | NIRF #3"
  },
  {
    "id": "xlri-jamshedpur",
    "name": "XLRI – Xavier School of Management, Jamshedpur",
    "shortName": "XLRI Jamshedpur",
    "city": "Jamshedpur",
    "state": "Jharkhand",
    "type": "Management / B-School",
    "rating": 4.8,
    "reviewCount": 2900,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "XLRI Jamshedpur, established in 1949, is India's oldest and most prestigious private business school. Celebrated as the undisputed champion for HR (Human Resources) & Business Management in the Asia-Pacific region.",
    "establishedYear": 1949,
    "campusSize": "50 Acres",
    "tuitionFeePerYear": "₹13.0 Lakh",
    "tuitionFeeNum": 1300000,
    "avgPackage": "₹32.7 LPA",
    "avgPackageNum": 32.7,
    "medianPackage": "₹30.0 LPA",
    "medianPackageNum": 30,
    "highestPackage": "₹1.10 CPA",
    "highestPackageNum": 110,
    "placementRate": 100,
    "hasHostel": true,
    "hostelFeePerYear": "₹80,000",
    "nirfRank": 9,
    "admissionCriteria": "XAT (Xavier Aptitude Test) Percentile > 96%ile",
    "facilities": [
      "Tata Auditorium",
      "Sir Jehangir Ghandy Library",
      "International Exchange Hostels"
    ],
    "courses": [
      {
        "name": "PGDM in Human Resource Management (HRM)",
        "duration": "2 Years",
        "seats": 180,
        "annualFee": "₹13,000,00",
        "cutoffRank": "XAT > 94 %ile"
      },
      {
        "name": "PGDM in Business Management (BM)",
        "duration": "2 Years",
        "seats": 180,
        "annualFee": "₹13,00,000",
        "cutoffRank": "XAT > 96 %ile"
      }
    ],
    "websiteUrl": "https://www.xlri.ac.in",
    "topRecruiters": [
      "Hindustan Unilever (HUL)",
      "P&G",
      "ITC",
      "TAS",
      "McKinsey & Co"
    ],
    "accreditation": "AACSB | AMBA | NIRF Top 10"
  },
  {
    "id": "fms-delhi",
    "name": "Faculty of Management Studies, University of Delhi",
    "shortName": "FMS Delhi",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "Management / B-School",
    "rating": 4.8,
    "reviewCount": 3100,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "FMS Delhi is renowned as the highest ROI business school in the world. With an entire 2-year MBA fee of just ₹2 Lakh and average placement of ₹34.1 LPA.",
    "establishedYear": 1954,
    "campusSize": "North Campus DU",
    "tuitionFeePerYear": "₹1.0 Lakh (₹2 Lakh Total Course)",
    "tuitionFeeNum": 100000,
    "avgPackage": "₹34.1 LPA",
    "avgPackageNum": 34.1,
    "medianPackage": "₹31.0 LPA",
    "medianPackageNum": 31,
    "highestPackage": "₹1.23 CPA",
    "highestPackageNum": 123,
    "placementRate": 100,
    "hasHostel": false,
    "hostelFeePerYear": "DU Hostels / PG nearby",
    "nirfRank": 8,
    "admissionCriteria": "CAT Percentile (99.2%ile+) + Extempore & PI",
    "facilities": [
      "Delhi University North Campus Infrastructure",
      "FMS SP Jain Centre",
      "Rich 70-Year Alumni Network"
    ],
    "courses": [
      {
        "name": "Full Time Master of Business Administration (MBA)",
        "duration": "2 Years",
        "seats": 251,
        "annualFee": "₹1,00,000",
        "cutoffRank": "CAT > 99.3 %ile"
      }
    ],
    "websiteUrl": "https://fms.edu",
    "topRecruiters": [
      "Amazon",
      "Google",
      "BCG",
      "HUL",
      "Morgan Stanley",
      "Nomura"
    ],
    "accreditation": "University of Delhi | NAAC A++"
  },
  {
    "id": "dtu-delhi",
    "name": "Delhi Technological University (formerly DCE)",
    "shortName": "DTU",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "State University",
    "rating": 4.7,
    "reviewCount": 3800,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Established in 1941 as Delhi Polytechnic (later Delhi College of Engineering - DCE), DTU is a premier state government university known for outstanding tech placements and automotive teams (Defiance, Raftaar).",
    "establishedYear": 1941,
    "campusSize": "164 Acres",
    "tuitionFeePerYear": "₹2.2 Lakh",
    "tuitionFeeNum": 220000,
    "avgPackage": "₹17.3 LPA",
    "avgPackageNum": 17.3,
    "medianPackage": "₹14.0 LPA",
    "medianPackageNum": 14,
    "highestPackage": "₹1.8 CPA",
    "highestPackageNum": 180,
    "placementRate": 92,
    "hasHostel": true,
    "hostelFeePerYear": "₹62,000",
    "nirfRank": 29,
    "admissionCriteria": "JAC Delhi Counseling via JEE Main",
    "facilities": [
      "BR Ambedkar Auditorium",
      "Central Library with 3 Lakh Books",
      "14 Hostels",
      "Sports Arena"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 480,
        "annualFee": "₹2,19,000",
        "cutoffRank": "JEE Main CRL 4,000 - 14,000"
      },
      {
        "name": "B.Tech in Software Engineering",
        "duration": "4 Years",
        "seats": 180,
        "annualFee": "₹2,19,000",
        "cutoffRank": "JEE Main CRL 9,000 - 18,000"
      }
    ],
    "websiteUrl": "https://dtu.ac.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Apple",
      "Atlassian",
      "Goldman Sachs",
      "Texas Instruments"
    ],
    "accreditation": "State University | NAAC A"
  },
  {
    "id": "nsut-delhi",
    "name": "Netaji Subhas University of Technology (formerly NSIT)",
    "shortName": "NSUT",
    "city": "New Delhi",
    "state": "Delhi",
    "type": "State University",
    "rating": 4.6,
    "reviewCount": 3200,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "NSUT in Dwarka, New Delhi, is recognized across India for stellar computer science and AI graduates, active societies, and proximity to Gurgaon tech park.",
    "establishedYear": 1983,
    "campusSize": "145 Acres",
    "tuitionFeePerYear": "₹2.3 Lakh",
    "tuitionFeeNum": 230000,
    "avgPackage": "₹16.8 LPA",
    "avgPackageNum": 16.8,
    "medianPackage": "₹13.5 LPA",
    "medianPackageNum": 13.5,
    "highestPackage": "₹1.06 CPA",
    "highestPackageNum": 106,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹65,000",
    "nirfRank": 60,
    "admissionCriteria": "JAC Delhi Counseling via JEE Main",
    "facilities": [
      "Dwarka Green Campus",
      "Incubation and Innovation Foundation",
      "Cricket Ground & Gym"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 360,
        "annualFee": "₹2,29,000",
        "cutoffRank": "JEE Main CRL 5,000 - 16,000"
      },
      {
        "name": "B.Tech in Computer Science with AI",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹2,29,000",
        "cutoffRank": "JEE Main CRL 4,500 - 13,000"
      }
    ],
    "websiteUrl": "https://www.nsut.ac.in",
    "topRecruiters": [
      "Microsoft",
      "Uber",
      "Amazon",
      "Sprinklr",
      "DE Shaw"
    ],
    "accreditation": "State University | NAAC A"
  },
  {
    "id": "coep-pune",
    "name": "COEP Technological University, Pune",
    "shortName": "COEP Pune",
    "city": "Pune",
    "state": "Maharashtra",
    "type": "State University",
    "rating": 4.7,
    "reviewCount": 3100,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Incepted in 1854, COEP Pune is the 3rd oldest engineering institute in Asia. Alma mater of Bharat Ratna Sir M. Visvesvaraya, with boat club on the Mula river and premier placements.",
    "establishedYear": 1854,
    "campusSize": "36 Acres",
    "tuitionFeePerYear": "₹95,000",
    "tuitionFeeNum": 95000,
    "avgPackage": "₹11.8 LPA",
    "avgPackageNum": 11.8,
    "medianPackage": "₹9.5 LPA",
    "medianPackageNum": 9.5,
    "highestPackage": "₹50.5 LPA",
    "highestPackageNum": 50.5,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹42,000",
    "nirfRank": 73,
    "admissionCriteria": "MHT CET / JEE Main via DTE Maharashtra Counseling",
    "facilities": [
      "COEP Boat Club (Mula River)",
      "Historic Heritage Main Building",
      "Maker Space & Robotics Lab"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Engineering",
        "duration": "4 Years",
        "seats": 150,
        "annualFee": "₹95,000",
        "cutoffRank": "MHT CET > 99.85 %ile"
      },
      {
        "name": "B.Tech in Mechanical Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹95,000",
        "cutoffRank": "MHT CET > 98.2 %ile"
      }
    ],
    "websiteUrl": "https://www.coep.org.in",
    "topRecruiters": [
      "Goldman Sachs",
      "Credit Suisse",
      "Tata Motors",
      "Mercedes Benz",
      "Mastercard"
    ],
    "accreditation": "Unitary State University | NBA Tier-1"
  },
  {
    "id": "jadavpur-university",
    "name": "Jadavpur University, Faculty of Engineering & Technology",
    "shortName": "Jadavpur University",
    "city": "Kolkata",
    "state": "West Bengal",
    "type": "State University",
    "rating": 4.8,
    "reviewCount": 3600,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Jadavpur University FET is legendary for offering world-class engineering education at an unbelievable annual tuition fee of just ₹2,400 with international packages exceeding ₹1 Crore.",
    "establishedYear": 1906,
    "campusSize": "68 Acres",
    "tuitionFeePerYear": "₹2,400",
    "tuitionFeeNum": 2400,
    "avgPackage": "₹15.8 LPA",
    "avgPackageNum": 15.8,
    "medianPackage": "₹13.0 LPA",
    "medianPackageNum": 13,
    "highestPackage": "₹1.8 CPA",
    "highestPackageNum": 180,
    "placementRate": 95,
    "hasHostel": true,
    "hostelFeePerYear": "₹15,000",
    "nirfRank": 10,
    "admissionCriteria": "WBJEE Rank (Top 150 for CSE)",
    "facilities": [
      "Open Campus Culture",
      "High performance CAD/CAM Labs",
      "TEQIP Supported Research Hub"
    ],
    "courses": [
      {
        "name": "B.E. in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 64,
        "annualFee": "₹2,400",
        "cutoffRank": "WBJEE GMR < 120"
      },
      {
        "name": "B.E. in Information Technology",
        "duration": "4 Years",
        "seats": 60,
        "annualFee": "₹2,400",
        "cutoffRank": "WBJEE GMR < 300"
      }
    ],
    "websiteUrl": "https://www.jaduniv.edu.in",
    "topRecruiters": [
      "Google",
      "Texas Instruments",
      "Amazon",
      "Schlumberger",
      "PwC"
    ],
    "accreditation": "State University | NAAC A | NIRF #10"
  },
  {
    "id": "thapar-patiala",
    "name": "Thapar Institute of Engineering and Technology, Patiala",
    "shortName": "Thapar University",
    "city": "Patiala",
    "state": "Punjab",
    "type": "Private University",
    "rating": 4.6,
    "reviewCount": 3400,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "TIET Patiala is one of India's oldest and premier private institutions, partnering with Trinity College Dublin and boasting world-class European architecture and exceptional placements.",
    "establishedYear": 1956,
    "campusSize": "250 Acres",
    "tuitionFeePerYear": "₹4.2 Lakh",
    "tuitionFeeNum": 420000,
    "avgPackage": "₹12.2 LPA",
    "avgPackageNum": 12.2,
    "medianPackage": "₹10.0 LPA",
    "medianPackageNum": 10,
    "highestPackage": "₹55 LPA",
    "highestPackageNum": 55,
    "placementRate": 91,
    "hasHostel": true,
    "hostelFeePerYear": "₹85,000",
    "nirfRank": 20,
    "admissionCriteria": "JEE Main Score / 10+2 PCM Merit",
    "facilities": [
      "Nava Nalanda Central Library",
      "Experiential Learning Centre",
      "AC Hostels with Ensuite Bathrooms"
    ],
    "courses": [
      {
        "name": "B.E. in Computer Engineering (COE)",
        "duration": "4 Years",
        "seats": 720,
        "annualFee": "₹4,40,000",
        "cutoffRank": "JEE Main CRL < 38,000"
      }
    ],
    "websiteUrl": "https://www.thapar.edu",
    "topRecruiters": [
      "Amazon",
      "DE Shaw",
      "Apple",
      "JPMorgan Chase",
      "Zomato"
    ],
    "accreditation": "Deemed to be University | NAAC A+"
  },
  {
    "id": "mit-manipal",
    "name": "Manipal Institute of Technology, MAHE Manipal",
    "shortName": "MIT Manipal",
    "city": "Manipal",
    "state": "Karnataka",
    "type": "Private University",
    "rating": 4.7,
    "reviewCount": 3800,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Alma mater of Microsoft CEO Satya Nadella and Nokia ex-CEO Rajeev Suri, MIT Manipal combines cosmopolitan student culture with premier global engineering opportunities.",
    "establishedYear": 1957,
    "campusSize": "313 Acres",
    "tuitionFeePerYear": "₹3.9 Lakh",
    "tuitionFeeNum": 390000,
    "avgPackage": "₹12.5 LPA",
    "avgPackageNum": 12.5,
    "medianPackage": "₹10.5 LPA",
    "medianPackageNum": 10.5,
    "highestPackage": "₹54 LPA",
    "highestPackageNum": 54,
    "placementRate": 92,
    "hasHostel": true,
    "hostelFeePerYear": "₹95,000",
    "nirfRank": 61,
    "admissionCriteria": "MET (Manipal Entrance Test) & Counseling",
    "facilities": [
      "Marena Indoor Sports Complex",
      "Formula Student Team Labs",
      "24x7 Library"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 240,
        "annualFee": "₹4,10,000",
        "cutoffRank": "MET Rank < 1200"
      },
      {
        "name": "B.Tech in Data Science and Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹3,90,000",
        "cutoffRank": "MET Rank < 3500"
      }
    ],
    "websiteUrl": "https://manipal.edu/mit.html",
    "topRecruiters": [
      "Microsoft",
      "Amazon",
      "Cisco",
      "Qualcomm",
      "Deloitte"
    ],
    "accreditation": "Institute of Eminence (IoE) | NAAC A++"
  },
  {
    "id": "srm-chennai",
    "name": "SRM Institute of Science and Technology, Kattankulathur",
    "shortName": "SRM KTR",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "type": "Private University",
    "rating": 4.5,
    "reviewCount": 4200,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "SRM KTR is a mega-university campus of 250 acres in Chennai with 50,000+ students, launch of its own satellite SRMSAT, and 1000+ recruiters on campus.",
    "establishedYear": 1985,
    "campusSize": "250 Acres",
    "tuitionFeePerYear": "₹3.5 - 4.5 Lakh",
    "tuitionFeeNum": 350000,
    "avgPackage": "₹8.8 LPA",
    "avgPackageNum": 8.8,
    "medianPackage": "₹7.5 LPA",
    "medianPackageNum": 7.5,
    "highestPackage": "₹1.0 CPA",
    "highestPackageNum": 100,
    "placementRate": 88,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,15,000",
    "nirfRank": 28,
    "admissionCriteria": "SRMJEEE Rank & Direct Counseling",
    "facilities": [
      "Tech Park 15 Floors",
      "SRM Medical Hospital",
      "Indoor AC Auditoriums"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 1800,
        "annualFee": "₹4,50,000",
        "cutoffRank": "SRMJEEE Rank < 9,500"
      }
    ],
    "websiteUrl": "https://www.srmist.edu.in",
    "topRecruiters": [
      "Amazon",
      "PayPal",
      "TCS Ninja/Digital",
      "Wipro",
      "Optum"
    ],
    "accreditation": "NAAC A++ | Category-1 University"
  },
  {
    "id": "amity-noida",
    "name": "Amity University, Noida",
    "shortName": "Amity Noida",
    "city": "Noida",
    "state": "Uttar Pradesh",
    "type": "Private University",
    "rating": 4.3,
    "reviewCount": 3900,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Amity University Noida features a massive hi-tech campus on Expressway with top global tie-ups, 300+ degree programs, and an active business incubator.",
    "establishedYear": 2005,
    "campusSize": "110 Acres",
    "tuitionFeePerYear": "₹3.4 Lakh",
    "tuitionFeeNum": 340000,
    "avgPackage": "₹6.8 LPA",
    "avgPackageNum": 6.8,
    "medianPackage": "₹5.8 LPA",
    "medianPackageNum": 5.8,
    "highestPackage": "₹61.75 LPA",
    "highestPackageNum": 61.75,
    "placementRate": 85,
    "hasHostel": true,
    "hostelFeePerYear": "₹90,000 - 1,60,000",
    "nirfRank": 57,
    "admissionCriteria": "Amity JEE / 10+2 Merit + Interview",
    "facilities": [
      "Shooting Range & Horse Riding",
      "Central Air-Conditioned Classrooms",
      "Amity Innovation Incubator"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 600,
        "annualFee": "₹3,80,000",
        "cutoffRank": "12th Marks > 80%"
      }
    ],
    "websiteUrl": "https://www.amity.edu",
    "topRecruiters": [
      "Palo Alto",
      "Amazon",
      "Cisco",
      "Accenture",
      "Capgemini"
    ],
    "accreditation": "NAAC A+ | WASC (USA)"
  },
  {
    "id": "chandigarh-university",
    "name": "Chandigarh University (CU)",
    "shortName": "Chandigarh University",
    "city": "Mohali",
    "state": "Punjab",
    "type": "Private University",
    "rating": 4.4,
    "reviewCount": 3600,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Chandigarh University in Mohali is accredited NAAC A+ and recognized by QS Asia Rankings. Noted for high patent filings, CUCET scholarships, and heavy MNC recruitment.",
    "establishedYear": 2012,
    "campusSize": "200 Acres",
    "tuitionFeePerYear": "₹1.8 - 2.6 Lakh",
    "tuitionFeeNum": 180000,
    "avgPackage": "₹7.5 LPA",
    "avgPackageNum": 7.5,
    "medianPackage": "₹6.2 LPA",
    "medianPackageNum": 6.2,
    "highestPackage": "₹54.75 LPA",
    "highestPackageNum": 54.75,
    "placementRate": 88,
    "hasHostel": true,
    "hostelFeePerYear": "₹90,000",
    "nirfRank": 45,
    "admissionCriteria": "CUCET Entrance Examination & 10+2 Merit",
    "facilities": [
      "Discovery Science Centers",
      "High-Speed Wi-Fi",
      "Gym and Sports Arenas"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 1200,
        "annualFee": "₹2,10,000",
        "cutoffRank": "CUCET Score > 60%"
      }
    ],
    "websiteUrl": "https://www.cuchd.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Amazon",
      "IBM",
      "Cognizant"
    ],
    "accreditation": "NAAC A+ | NIRF #45"
  },
  {
    "id": "lpu-punjab",
    "name": "Lovely Professional University (LPU)",
    "shortName": "LPU Punjab",
    "city": "Phagwara",
    "state": "Punjab",
    "type": "Private University",
    "rating": 4.3,
    "reviewCount": 4500,
    "featuredImage": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "LPU in Phagwara on GT Road is one of India's largest single-campus universities with 600+ acres, hosting 35,000+ students from 50+ countries with world-class sports facilities (Olympic Olympians alumni).",
    "establishedYear": 2005,
    "campusSize": "600 Acres",
    "tuitionFeePerYear": "₹2.4 Lakh",
    "tuitionFeeNum": 240000,
    "avgPackage": "₹7.2 LPA",
    "avgPackageNum": 7.2,
    "medianPackage": "₹6.0 LPA",
    "medianPackageNum": 6,
    "highestPackage": "₹64 LPA",
    "highestPackageNum": 64,
    "placementRate": 86,
    "hasHostel": true,
    "hostelFeePerYear": "₹80,000 - 1,50,000",
    "nirfRank": 50,
    "admissionCriteria": "LPUNEST Entrance & Scholarship Exam",
    "facilities": [
      "Olympic-Standard Swimming Complex",
      "Uni-Mall Shopping Centre",
      "600-Acre Smart City Campus"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 1500,
        "annualFee": "₹2,40,000",
        "cutoffRank": "LPUNEST Merit"
      }
    ],
    "websiteUrl": "https://www.lpu.in",
    "topRecruiters": [
      "Google",
      "Microsoft",
      "Amazon",
      "Cognizant",
      "Bosch"
    ],
    "accreditation": "NAAC A++ | UGC"
  },
  {
    "id": "kiit-bhubaneswar",
    "name": "Kalinga Institute of Industrial Technology (KIIT)",
    "shortName": "KIIT University",
    "city": "Bhubaneswar",
    "state": "Odisha",
    "type": "Private University",
    "rating": 4.6,
    "reviewCount": 3100,
    "featuredImage": "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "KIIT Bhubaneswar is an Institution of Eminence in Eastern India with 25 sprawling campuses, KIMS multi-specialty hospital, and 100% placement track record for eligible students.",
    "establishedYear": 1992,
    "campusSize": "400 Acres (25 Interconnected Campuses)",
    "tuitionFeePerYear": "₹3.5 Lakh",
    "tuitionFeeNum": 350000,
    "avgPackage": "₹8.5 LPA",
    "avgPackageNum": 8.5,
    "medianPackage": "₹7.2 LPA",
    "medianPackageNum": 7.2,
    "highestPackage": "₹63 LPA",
    "highestPackageNum": 63,
    "placementRate": 90,
    "hasHostel": true,
    "hostelFeePerYear": "₹85,000",
    "nirfRank": 16,
    "admissionCriteria": "KIITEE Examination (Zero Application Fee)",
    "facilities": [
      "KIMS Multi-specialty Hospital",
      "KIIT Stadium (BCCI Approved)",
      "25 AC Campuses"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 1200,
        "annualFee": "₹3,85,000",
        "cutoffRank": "KIITEE Score > 85%"
      }
    ],
    "websiteUrl": "https://kiit.ac.in",
    "topRecruiters": [
      "HighRadius",
      "Deloitte",
      "Amazon",
      "Capgemini",
      "Accenture"
    ],
    "accreditation": "Institution of Eminence | NAAC A++ (3.56)"
  },
  {
    "id": "rvce-bangalore",
    "name": "R.V. College of Engineering (RVCE)",
    "shortName": "RVCE Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "Private University",
    "rating": 4.7,
    "reviewCount": 2900,
    "featuredImage": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "RVCE Bangalore on Mysore Road is considered the premier private engineering college in Karnataka, rivaling top NITs for CSE placements with median packages of ₹14 LPA.",
    "establishedYear": 1963,
    "campusSize": "51 Acres",
    "tuitionFeePerYear": "₹1.0 Lakh (KCET) / ₹3.5 Lakh (COMEDK)",
    "tuitionFeeNum": 250000,
    "avgPackage": "₹15.4 LPA",
    "avgPackageNum": 15.4,
    "medianPackage": "₹13.8 LPA",
    "medianPackageNum": 13.8,
    "highestPackage": "₹62 LPA",
    "highestPackageNum": 62,
    "placementRate": 96,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,10,000",
    "nirfRank": 89,
    "admissionCriteria": "KCET (Karnataka) / COMEDK UGET Rank",
    "facilities": [
      "Centre of Excellence in Macroelectronics",
      "Proximity to Bengaluru Tech Corridor",
      "Modern Labs"
    ],
    "courses": [
      {
        "name": "B.E. in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 180,
        "annualFee": "₹2,60,000",
        "cutoffRank": "COMEDK Rank < 400 | KCET < 250"
      },
      {
        "name": "B.E. in Information Science and Engineering",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹2,60,000",
        "cutoffRank": "COMEDK Rank < 650"
      }
    ],
    "websiteUrl": "https://rvce.edu.in",
    "topRecruiters": [
      "Atlassian",
      "Microsoft",
      "Cisco",
      "Texas Instruments",
      "Amazon"
    ],
    "accreditation": "Autonomous | NAAC A+"
  },
  {
    "id": "bmsce-bangalore",
    "name": "B.M.S. College of Engineering (BMSCE)",
    "shortName": "BMSCE Bangalore",
    "city": "Bangalore",
    "state": "Karnataka",
    "type": "Private University",
    "rating": 4.6,
    "reviewCount": 2600,
    "featuredImage": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Incepted in 1946 in Basavanagudi, Bengaluru, BMSCE was India’s first private engineering college. Known for stellar academic pedigree and strong tech placements.",
    "establishedYear": 1946,
    "campusSize": "15 Acres (City Center)",
    "tuitionFeePerYear": "₹1.0 Lakh (KCET) / ₹3.2 Lakh (COMEDK)",
    "tuitionFeeNum": 240000,
    "avgPackage": "₹11.2 LPA",
    "avgPackageNum": 11.2,
    "medianPackage": "₹9.5 LPA",
    "medianPackageNum": 9.5,
    "highestPackage": "₹50 LPA",
    "highestPackageNum": 50,
    "placementRate": 92,
    "hasHostel": true,
    "hostelFeePerYear": "₹1,00,000",
    "nirfRank": 100,
    "admissionCriteria": "COMEDK / KCET Counseling",
    "facilities": [
      "Basavanagudi City Campus",
      "Platinum Jubilee Block",
      "Hostels"
    ],
    "courses": [
      {
        "name": "B.E. in Computer Science and Engineering",
        "duration": "4 Years",
        "seats": 180,
        "annualFee": "₹2,40,000",
        "cutoffRank": "COMEDK Rank < 800"
      }
    ],
    "websiteUrl": "https://bmsce.ac.in",
    "topRecruiters": [
      "Amazon",
      "Robert Bosch",
      "Dell",
      "Oracle"
    ],
    "accreditation": "Autonomous | NAAC A++"
  },
  {
    "id": "vgu-jaipur",
    "name": "Vivekananda Global University (VGU)",
    "shortName": "VGU Jaipur",
    "city": "Jaipur",
    "state": "Rajasthan",
    "type": "Private University",
    "rating": 4.5,
    "reviewCount": 1650,
    "featuredImage": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "campusImages": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "about": "Vivekananda Global University (VGU) in Jaipur is accredited NAAC A+ with a 45-acre campus, leading innovation in AI & Robotics, agricultural sciences, and strong regional industry internships.",
    "establishedYear": 2012,
    "campusSize": "45 Acres",
    "tuitionFeePerYear": "₹1.5 - 2.2 Lakh",
    "tuitionFeeNum": 180000,
    "avgPackage": "₹6.5 LPA",
    "avgPackageNum": 6.5,
    "medianPackage": "₹5.5 LPA",
    "medianPackageNum": 5.5,
    "highestPackage": "₹54 LPA",
    "highestPackageNum": 54,
    "placementRate": 88,
    "hasHostel": true,
    "hostelFeePerYear": "₹75,000",
    "nirfRank": 105,
    "admissionCriteria": "VGUCET / JEE Main / CUET Merit",
    "facilities": [
      "Robotics & AI Center",
      "Incubation Centre (ACIC-VGU)",
      "Modern AC Classrooms",
      "Hostel Facility"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science and Engineering (AI & ML)",
        "duration": "4 Years",
        "seats": 180,
        "annualFee": "₹1,80,000",
        "cutoffRank": "Merit / VGUCET"
      },
      {
        "name": "B.Tech in Cloud Technology & Information Security",
        "duration": "4 Years",
        "seats": 120,
        "annualFee": "₹1,60,000",
        "cutoffRank": "Merit List"
      },
      {
        "name": "BCA in Cyber Security & Data Analytics",
        "duration": "3 Years",
        "seats": 90,
        "annualFee": "₹95,000",
        "cutoffRank": "12th Merit"
      }
    ],
    "websiteUrl": "https://vgu.ac.in",
    "topRecruiters": [
      "TCS",
      "Infosys",
      "Wipro",
      "Amazon",
      "IBM",
      "Tech Mahindra"
    ],
    "accreditation": "Private University | NAAC A+"
  }
];
