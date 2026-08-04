export const APP_NAME = "Project Tinubu Legacy Archive";
export const APP_SHORT_NAME = "PTLA";
export const APP_DESCRIPTION =
  "Nigeria's first centralized digital archive documenting every verified Federal Government project, programme, and intervention from 2023–2030.";

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Interactive Map", href: "/map" },
  { label: "Sectors", href: "/sectors" },
  { label: "Media Gallery", href: "/gallery" },
  { label: "Timeline", href: "/timeline" },
  { label: "Reports", href: "/reports" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SECTORS = [
  { id: "infrastructure", name: "Infrastructure", icon: "Building2", color: "#006B3C" },
  { id: "healthcare", name: "Healthcare", icon: "HeartPulse", color: "#E11D48" },
  { id: "education", name: "Education", icon: "GraduationCap", color: "#2563EB" },
  { id: "agriculture", name: "Agriculture", icon: "Wheat", color: "#16A34A" },
  { id: "housing", name: "Housing", icon: "Home", color: "#D97706" },
  { id: "transportation", name: "Transportation", icon: "Train", color: "#7C3AED" },
  { id: "water", name: "Water", icon: "Droplets", color: "#0891B2" },
  { id: "technology", name: "Technology", icon: "Cpu", color: "#4F46E5" },
  { id: "power", name: "Power", icon: "Zap", color: "#EAB308" },
  { id: "security", name: "Security", icon: "Shield", color: "#DC2626" },
  { id: "social-investment", name: "Social Investment", icon: "Users", color: "#DB2777" },
  { id: "environment", name: "Environment", icon: "Leaf", color: "#059669" },
] as const;

export const NIGERIAN_STATES = [
  { name: "Abia", code: "AB", lat: 5.4527, lng: 7.5248, projects: 142, budget: 45_000_000_000, completion: 68 },
  { name: "Adamawa", code: "AD", lat: 9.3265, lng: 12.3984, projects: 98, budget: 32_000_000_000, completion: 55 },
  { name: "Akwa Ibom", code: "AK", lat: 4.9057, lng: 7.8537, projects: 156, budget: 58_000_000_000, completion: 72 },
  { name: "Anambra", code: "AN", lat: 6.2209, lng: 6.9370, projects: 134, budget: 42_000_000_000, completion: 75 },
  { name: "Bauchi", code: "BA", lat: 10.3158, lng: 9.8442, projects: 112, budget: 38_000_000_000, completion: 52 },
  { name: "Bayelsa", code: "BY", lat: 4.7719, lng: 6.0699, projects: 87, budget: 28_000_000_000, completion: 61 },
  { name: "Benue", code: "BE", lat: 7.3369, lng: 8.7404, projects: 105, budget: 35_000_000_000, completion: 58 },
  { name: "Borno", code: "BO", lat: 11.8311, lng: 13.1510, projects: 178, budget: 72_000_000_000, completion: 45 },
  { name: "Cross River", code: "CR", lat: 5.8702, lng: 8.5980, projects: 96, budget: 30_000_000_000, completion: 63 },
  { name: "Delta", code: "DE", lat: 5.5320, lng: 5.8982, projects: 148, budget: 52_000_000_000, completion: 70 },
  { name: "Ebonyi", code: "EB", lat: 6.2649, lng: 8.0137, projects: 89, budget: 26_000_000_000, completion: 66 },
  { name: "Edo", code: "ED", lat: 6.3350, lng: 5.6037, projects: 121, budget: 40_000_000_000, completion: 71 },
  { name: "Ekiti", code: "EK", lat: 7.6233, lng: 5.2209, projects: 76, budget: 22_000_000_000, completion: 69 },
  { name: "Enugu", code: "EN", lat: 6.5244, lng: 7.5086, projects: 108, budget: 34_000_000_000, completion: 74 },
  { name: "FCT", code: "FC", lat: 9.0579, lng: 7.4951, projects: 312, budget: 185_000_000_000, completion: 78 },
  { name: "Gombe", code: "GO", lat: 10.2897, lng: 11.1673, projects: 82, budget: 24_000_000_000, completion: 54 },
  { name: "Imo", code: "IM", lat: 5.4920, lng: 7.0260, projects: 115, budget: 36_000_000_000, completion: 67 },
  { name: "Jigawa", code: "JI", lat: 12.2280, lng: 9.5616, projects: 94, budget: 29_000_000_000, completion: 56 },
  { name: "Kaduna", code: "KD", lat: 10.5105, lng: 7.4165, projects: 186, budget: 68_000_000_000, completion: 64 },
  { name: "Kano", code: "KN", lat: 12.0022, lng: 8.5920, projects: 224, budget: 82_000_000_000, completion: 62 },
  { name: "Katsina", code: "KT", lat: 12.9908, lng: 7.6018, projects: 132, budget: 44_000_000_000, completion: 53 },
  { name: "Kebbi", code: "KE", lat: 12.4539, lng: 4.1975, projects: 78, budget: 23_000_000_000, completion: 51 },
  { name: "Kogi", code: "KO", lat: 7.7337, lng: 6.6906, projects: 102, budget: 33_000_000_000, completion: 59 },
  { name: "Kwara", code: "KW", lat: 8.9669, lng: 4.3874, projects: 88, budget: 27_000_000_000, completion: 65 },
  { name: "Lagos", code: "LA", lat: 6.5244, lng: 3.3792, projects: 428, budget: 245_000_000_000, completion: 82 },
  { name: "Nasarawa", code: "NA", lat: 8.4998, lng: 8.1997, projects: 72, budget: 21_000_000_000, completion: 60 },
  { name: "Niger", code: "NI", lat: 9.6000, lng: 6.5500, projects: 96, budget: 31_000_000_000, completion: 57 },
  { name: "Ogun", code: "OG", lat: 7.1608, lng: 3.3481, projects: 164, budget: 56_000_000_000, completion: 73 },
  { name: "Ondo", code: "ON", lat: 7.2507, lng: 5.2100, projects: 98, budget: 30_000_000_000, completion: 64 },
  { name: "Osun", code: "OS", lat: 7.5629, lng: 4.5200, projects: 86, budget: 25_000_000_000, completion: 68 },
  { name: "Oyo", code: "OY", lat: 7.3775, lng: 3.9470, projects: 142, budget: 48_000_000_000, completion: 71 },
  { name: "Plateau", code: "PL", lat: 9.8965, lng: 8.8583, projects: 104, budget: 35_000_000_000, completion: 62 },
  { name: "Rivers", code: "RI", lat: 4.8156, lng: 7.0498, projects: 198, budget: 78_000_000_000, completion: 76 },
  { name: "Sokoto", code: "SO", lat: 13.0059, lng: 5.2476, projects: 92, budget: 28_000_000_000, completion: 50 },
  { name: "Taraba", code: "TA", lat: 7.9994, lng: 10.7739, projects: 84, budget: 26_000_000_000, completion: 48 },
  { name: "Yobe", code: "YO", lat: 12.2939, lng: 11.4390, projects: 76, budget: 24_000_000_000, completion: 46 },
  { name: "Zamfara", code: "ZA", lat: 12.1708, lng: 6.2375, projects: 68, budget: 20_000_000_000, completion: 44 },
] as const;

export const STATS = {
  totalProjects: 4827,
  statesCovered: 37,
  lgasCovered: 774,
  totalBudget: 2_450_000_000_000,
  completedProjects: 1842,
  ongoingProjects: 2456,
  beneficiaries: 48_500_000,
} as const;

export const TIMELINE_YEARS = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030] as const;

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ha", label: "Hausa" },
  { code: "yo", label: "Yoruba" },
  { code: "ig", label: "Igbo" },
] as const;
