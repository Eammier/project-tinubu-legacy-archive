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
  type LucideIcon,
} from "lucide-react";
import { SECTORS } from "@/lib/constants";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
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
};

export function SectorsPreview() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Sectors
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Impact Across Every Sector
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From infrastructure to healthcare, explore government interventions
            organized by sector for complete transparency.
          </p>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {SECTORS.map((sector) => {
            const Icon = iconMap[sector.icon];
            return (
              <StaggerItem key={sector.id}>
                <Link to={`/sectors/${sector.id}`}>
                  <Card className="group flex flex-col items-center p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-border bg-card">
                    <div
                      className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${sector.color}15` }}
                    >
                      <Icon
                        className="h-7 w-7 transition-colors"
                        style={{ color: sector.color }}
                      />
                    </div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {sector.name}
                    </p>
                  </Card>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
