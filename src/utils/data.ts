// ────────────────────────────────────────────
// ALL STATIC DATA
// ────────────────────────────────────────────

export const projects = [
  {
    id: 1,
    index: "01",
    name: "MindGuard",
    subtitle: "Student Early-Risk Portal",
    starred: true,
    description:
      "AI-powered full-stack mental health portal for students. Predicts at-risk students using behavioral pattern analysis.",
    tech: ["JavaScript", "Node.js", "MongoDB", "REST APIs"],
    github: "https://github.com/sujayraj42/mindguard",
    year: "2026",
  },
  {
    id: 2,
    index: "02",
    name: "Quiz App",
    subtitle: "Interactive Learning Platform",
    starred: true,
    description:
      "Full-stack quiz app with MongoDB, real-time scoring, 20+ categories, quiz history & analytics.",
    tech: ["Node.js", "Express", "MongoDB", "JavaScript"],
    github: "https://github.com/sujayraj42/quizz-app",
    year: "2026",
  },
  {
    id: 3,
    index: "03",
    name: "TaskMaster REST API Engine",
    subtitle: "",
    starred: false,
    description:
      "High-performance Node.js/Express backend. JWT auth, role-based access control, MySQL, pagination.",
    tech: ["Node.js", "Express", "MySQL", "JWT"],
    github: "https://github.com/sujayraj42",
    year: "2026",
  },
  {
    id: 4,
    index: "04",
    name: "MediCare",
    subtitle: "Healthcare App",
    starred: false,
    description:
      "Cross-platform Ionic healthcare app with appointment booking, patient reports, multi-page architecture.",
    tech: ["Ionic", "Angular", "HTML5", "CSS3"],
    github: "https://github.com/sujayraj42",
    year: "2026",
  },
  {
    id: 5,
    index: "05",
    name: "Real-Time Weather Dashboard",
    subtitle: "",
    starred: false,
    description:
      "Weather app with OpenWeatherMap API, geolocation, 7-day forecast, dynamic backgrounds.",
    tech: ["JavaScript", "Tailwind CSS", "REST APIs"],
    github: "https://github.com/sujayraj42",
    year: "2026",
  },
  {
    id: 6,
    index: "06",
    name: "Personal Portfolio v1",
    subtitle: "",
    starred: false,
    description:
      "Premium vanilla JS portfolio. Zero frameworks. Particle system via OffscreenCanvas + Web Worker.",
    tech: ["HTML5", "CSS3", "JavaScript ES2025+", "Canvas API"],
    live: "https://port2-nine-swart.vercel.app/",
    github: "https://github.com/sujayraj42/port2",
    year: "2026",
  },
  {
    id: 7,
    index: "07",
    name: "OAKWood's Furniture Website",
    subtitle: "",
    starred: false,
    description:
      "Modern furniture e-commerce UI. CSS animations, responsive grid, interactive product showcase.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    live: "https://oakwood-furniture.vercel.app/",
    github: "https://github.com/sujayraj42/OAKWood-s-Furniture-Website",
    year: "2024",
  },
  {
    id: 8,
    index: "08",
    name: "Explore Varanasi",
    subtitle: "The Spiritual Capital",
    starred: false,
    description:
      "Cultural tourism site. Lightbox gallery, Google Maps API integration, Kashi Vishwanath, Sarnath.",
    tech: ["Bootstrap 5", "HTML5", "CSS3", "Google Maps API"],
    live: "https://sujayraj42.github.io/Explore-Varanasi---The-Spiritual-Capital/",
    github: "https://github.com/sujayraj42/Explore-Varanasi---The-Spiritual-Capital",
    year: "2024",
  },
];

export const certifications = [
  {
    id: 1,
    name: "Introduction to Web Development",
    issuer: "UC Davis",
    platform: "Coursera",
    date: "June 2025",
    credentialId: "MNQQHK6QJ1SO",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/MNQQHK6QJ1SO",
    accent: "primary",
  },
  {
    id: 2,
    name: "Interactivity with JavaScript",
    issuer: "University of Michigan",
    platform: "Coursera",
    date: "2025",
    credentialId: null,
    verifyUrl: null,
    accent: "secondary",
  },
  {
    id: 3,
    name: "C for Everyone: Programming Fundamentals",
    issuer: "UC Santa Cruz",
    platform: "Coursera",
    date: "2025",
    credentialId: null,
    verifyUrl: null,
    accent: "tertiary",
  },
  {
    id: 4,
    name: "Technical Support Fundamentals",
    issuer: "Google",
    platform: "Coursera",
    date: "June 2025",
    credentialId: "5EFFZDVAOXU6",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/5EFFZDVAOXU6",
    accent: "primary",
  },
  {
    id: 5,
    name: "Student Volunteer Recognition",
    issuer: "LPU",
    platform: "Freshmen Induction 2025",
    date: "2025",
    credentialId: null,
    verifyUrl: null,
    accent: "secondary",
  },
];

export const education = [
  {
    id: 1,
    degree: "BCA",
    institution: "Lovely Professional University",
    range: "2023–Present",
    detail: "Full Stack Web Development · 83.75% · IN PROGRESS",
    url: "https://www.lpu.in/",
    active: true,
  },
  {
    id: 2,
    degree: "Advance Diploma in Computer Application",
    institution: "Parmar Commercial Institute",
    range: "2022–2023",
    detail: "",
    url: null,
    active: false,
  },
  {
    id: 3,
    degree: "Higher Secondary (12th) — CBSE Science",
    institution: "D.Y. Patil Pushpalata Patil International School",
    range: "2022",
    detail: "",
    url: null,
    active: false,
  },
  {
    id: 4,
    degree: "Secondary School (10th) — CBSE",
    institution: "New Era High School",
    range: "2020",
    detail: "",
    url: null,
    active: false,
  },
];

export const events = [
  {
    id: 1,
    name: "8th Chhatra Sansad India Conclave",
    role: "Stage Manager",
    stat: "20,000+",
    statLabel: "attendees",
    reactions: "165",
    speakers: [
      "Smriti Irani",
      "Khan Sir",
      "Dr. V Narayanan (ISRO)",
      "Jaya Kishori",
      "Temjen Imna Along",
    ],
  },
  {
    id: 2,
    name: "International Women's Day Celebration — LPU · March 8, 2025",
    role: "Stage Manager",
    stat: "88+",
    statLabel: "reactions",
    reactions: "88",
    speakers: ["Dr. Rashmi Mittal (Pro Chancellor, LPU)"],
  },
  {
    id: 3,
    name: "Youth Talk ft. Gaurav Taneja (FlyingBeast) — LPU",
    role: "Stage Manager",
    stat: "157",
    statLabel: "reactions",
    reactions: "157",
    speakers: ["Gaurav Taneja (YouTuber, pilot)"],
  },
  {
    id: 4,
    name: "Gita Olympiad Prize Distribution — LPU",
    role: "Event Lead",
    stat: "229",
    statLabel: "reactions",
    reactions: "229",
    speakers: ["Bhakt Bhagwat", "H.G. Dr. Vrindavan Chandra Das"],
  },
];

export const skills = {
  languages: [
    { name: "HTML5", level: 90, desc: "Semantic markup & accessibility" },
    { name: "CSS3", level: 85, desc: "Animations, Grid, Flexbox & more" },
    { name: "JavaScript", level: 88, desc: "ES2025+, DOM, async patterns" },
    { name: "C", level: 70, desc: "Fundamentals & memory basics" },
  ],
  frameworks: [
    "Bootstrap 5",
    "Tailwind CSS",
    "Ionic",
    "Node.js",
    "Express",
    "Git & GitHub",
    "VS Code",
    "Figma",
    "npm",
    "Netlify",
    "Google Maps API",
  ],
  backendLines: [
    "> tech stack: Node.js · Express · MySQL · MongoDB · REST APIs",
    "> status: learning...",
    "> python: basic",
    "> jwt: ✓ implemented",
  ],
  softSkills: [
    { name: "Team Leadership", size: "large" },
    { name: "Public Speaking", size: "large" },
    { name: "Stage Management", size: "large" },
    { name: "Mentoring", size: "medium" },
    { name: "Volunteer Management", size: "medium" },
    { name: "Adaptability", size: "medium" },
    { name: "Critical Thinking", size: "medium" },
    { name: "Time Management", size: "small" },
    { name: "Event Coordination", size: "small" },
  ],
};

export const aboutStats = [
  { value: "500+", label: "Connections" },
  { value: "1,000+", label: "Followers" },
  { value: "4", label: "Events Led" },
  { value: "20K+", label: "Attendees" },
];

export const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK", href: "#work" },
  { label: "EVENTS", href: "#events" },
  { label: "CERTS", href: "#certs" },
  { label: "EDUCATION", href: "#education" },
  { label: "CONTACT", href: "#contact" },
];
