// Local type aliases — mirrors the Prisma enums without requiring @prisma/client
export type ProjectStatus = "PLANNED" | "ONGOING" | "COMPLETED" | "SUSPENDED";
export type Sector =
  | "INFRASTRUCTURE"
  | "HEALTHCARE"
  | "EDUCATION"
  | "AGRICULTURE"
  | "HOUSING"
  | "TRANSPORTATION"
  | "WATER"
  | "TECHNOLOGY"
  | "POWER"
  | "SECURITY"
  | "SOCIAL_INVESTMENT"
  | "ENVIRONMENT";
export type UserRole = "ADMIN" | "EDITOR" | "VIEWER";

export interface ProjectCard {
  id: string;
  title: string;
  slug: string;
  description: string;
  budget: number;
  state: string;
  lga: string;
  sector: Sector;
  status: ProjectStatus;
  progress: number;
  imageUrl: string;
  ministry: string;
  startDate: string;
  completionDate?: string;
  contractor?: string;
  beneficiaries?: number;
}

export interface StateData {
  name: string;
  code: string;
  lat: number;
  lng: number;
  projects: number;
  budget: number;
  completion: number;
}

export interface TimelineEvent {
  year: number;
  projects: {
    id: string;
    title: string;
    sector: string;
    status: string;
    budget: number;
  }[];
}

export interface DashboardMetric {
  label: string;
  value: number | string;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

export interface SearchResult {
  id: string;
  type: "project" | "ministry" | "contractor" | "state";
  title: string;
  subtitle: string;
  href: string;
}

export interface FeedbackSubmission {
  id: string;
  projectId: string;
  type: "feedback" | "inaccuracy" | "evidence";
  message: string;
  status: "pending" | "reviewed" | "resolved";
  createdAt: string;
}

export interface MediaItem {
  id: string;
  type: "photo" | "video" | "drone" | "document" | "before-after" | "virtual-tour";
  title: string;
  url: string;
  thumbnail?: string;
  projectTitle?: string;
  sector?: string;
  state?: string;
}
