import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    notation: amount >= 1_000_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-NG", {
    notation: num >= 1_000_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(num);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    COMPLETED: "bg-emerald-500",
    ONGOING: "bg-blue-500",
    PLANNED: "bg-amber-500",
    SUSPENDED: "bg-red-500",
    DRAFT: "bg-gray-400",
    REVIEW: "bg-purple-500",
    VERIFICATION: "bg-orange-500",
    APPROVED: "bg-teal-500",
    PUBLISHED: "bg-emerald-500",
  };
  return colors[status] || "bg-gray-400";
}

export function getStatusLabel(status: string): string {
  return status.charAt(0) + status.slice(1).toLowerCase().replace(/_/g, " ");
}
