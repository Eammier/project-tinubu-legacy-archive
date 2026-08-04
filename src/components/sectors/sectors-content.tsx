import { Link } from "react-router-dom";
import {
  Building2,
  HeartPulse,
  GraduationCap,
  Wheat,
  Home,
  Train,
  Droplets,
  Cpu,
  Zap,
  Shield,
  Users,
  Leaf,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SECTORS } from "@/lib/constants";
import { getProjectsBySector } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { ProjectCardComponent } from "@/components/projects/project-card";

const iconMap: Record<string, LucideIcon> = {
  Building2, HeartPulse, GraduationCap, Wheat, Home, Train,
  Droplets, Cpu, Zap, Shield, Users, Leaf,
};

interface SectorDetailContentProps {
  sectorId: string;
}

export function SectorDetailContent({ sectorId }: SectorDetailContentProps) {
  const sector = SECTORS.find((s) => s.id === sectorId);
  if (!sector) return null;

  const projects = getProjectsBySector(sectorId);
  const Icon = iconMap[sector.icon];
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <Link to="/sectors" className="text-sm text-muted-foreground hover:text-primary mb-4 inline-block">
          ← All Sectors
        </Link>
        <div className="flex items-start gap-6">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${sector.color}15` }}
          >
            <Icon className="h-10 w-10" style={{ color: sector.color }} />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{sector.name}</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              {projects.length} verified projects · {formatCurrency(totalBudget)} total budget
            </p>
          </div>
        </div>
      </FadeIn>

      <StaggerChildren className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Projects", value: projects.length.toString() },
          { label: "Total Budget", value: formatCurrency(totalBudget) },
          { label: "Avg. Completion", value: `${Math.round(projects.reduce((s, p) => s + p.progress, 0) / (projects.length || 1))}%` },
        ].map((stat) => (
          <StaggerItem key={stat.label}>
            <Card className="p-6 text-center border-border bg-card">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Projects in {sector.name}</h2>
        {projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCardComponent key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-border bg-card">
            <p className="text-muted-foreground">No projects found in this sector yet.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

export function SectorsListContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Sectors</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Explore by Sector</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Browse federal government projects organized across 12 key sectors of national development.
        </p>
      </FadeIn>

      <StaggerChildren className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECTORS.map((sector) => {
          const Icon = iconMap[sector.icon];
          const projects = getProjectsBySector(sector.id);
          return (
            <StaggerItem key={sector.id}>
              <Link to={`/sectors/${sector.id}`}>
                <Card className="group p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-border bg-card">
                  <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${sector.color}15` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: sector.color }} />
                  </div>
                  <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {sector.name}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {projects.length} projects documented
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </div>
  );
}
