
import {
  FolderOpen,
  MapPin,
  Building,
  Wallet,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { AnimatedCounter } from "@/components/animations/animated-counter";
import { StaggerChildren, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsData {
  totalProjects: number;
  statesCovered: number;
  lgasCovered: number;
  totalBudget: number;
  completedProjects: number;
  ongoingProjects: number;
  beneficiaries: number;
}

interface StatsSectionProps {
  stats?: StatsData;
}

export function StatsSection({ stats }: StatsSectionProps) {
  const data = stats || {
    totalProjects: 4827,
    statesCovered: 37,
    lgasCovered: 774,
    totalBudget: 28450000000000,
    completedProjects: 1542,
    ongoingProjects: 2841,
    beneficiaries: 180000000,
  };

  const statItems = [
    {
      label: "Total Projects",
      value: data.totalProjects,
      icon: FolderOpen,
      color: "text-primary dark:text-emerald-400",
      bg: "bg-primary/10 dark:bg-emerald-500/10",
      glow: "group-hover:shadow-emerald-500/10",
    },
    {
      label: "States Covered",
      value: data.statesCovered,
      icon: MapPin,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
      glow: "group-hover:shadow-blue-500/10",
    },
    {
      label: "LGAs Covered",
      value: data.lgasCovered,
      icon: Building,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
      glow: "group-hover:shadow-purple-500/10",
    },
    {
      label: "Total Budget",
      value: data.totalBudget,
      icon: Wallet,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
      format: "currency" as const,
      glow: "group-hover:shadow-amber-500/10",
    },
    {
      label: "Completed",
      value: data.completedProjects,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
      glow: "group-hover:shadow-emerald-500/10",
    },
    {
      label: "Ongoing",
      value: data.ongoingProjects,
      icon: Clock,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-500/10",
      glow: "group-hover:shadow-orange-500/10",
    },
    {
      label: "Beneficiaries",
      value: data.beneficiaries,
      icon: Users,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10",
      format: "number" as const,
      glow: "group-hover:shadow-rose-500/10",
    },
  ];

  return (
    <section className="relative py-16 z-20 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl">
        <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {statItems.map((stat) => (
            <StaggerItem key={stat.label}>
              <Card className={`group relative p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border-white/20 dark:border-white/10 ${stat.glow} glass-card`}>
                {/* Micro-animation glow overlay */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {stat.format === "currency" ? (
                    formatCurrency(stat.value)
                  ) : stat.format === "number" ? (
                    formatNumber(stat.value)
                  ) : (
                    <AnimatedCounter value={stat.value} />
                  )}
                </p>
                
                <p className="mt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
