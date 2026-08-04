import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectCard } from "@/types";

const SECTOR_THEMES: Record<string, { color: string; border: string; bg: string }> = {
  INFRASTRUCTURE: { color: "text-[#006B3C]", border: "border-[#006B3C]/20", bg: "bg-[#006B3C]/10" },
  HEALTHCARE: { color: "text-[#E11D48]", border: "border-[#E11D48]/20", bg: "bg-[#E11D48]/10" },
  EDUCATION: { color: "text-[#2563EB]", border: "border-[#2563EB]/20", bg: "bg-[#2563EB]/10" },
  AGRICULTURE: { color: "text-[#16A34A]", border: "border-[#16A34A]/20", bg: "bg-[#16A34A]/10" },
  HOUSING: { color: "text-[#D97706]", border: "border-[#D97706]/20", bg: "bg-[#D97706]/10" },
  TRANSPORTATION: { color: "text-[#7C3AED]", border: "border-[#7C3AED]/20", bg: "bg-[#7C3AED]/10" },
  WATER: { color: "text-[#0891B2]", border: "border-[#0891B2]/20", bg: "bg-[#0891B2]/10" },
  TECHNOLOGY: { color: "text-[#4F46E5]", border: "border-[#4F46E5]/20", bg: "bg-[#4F46E5]/10" },
  POWER: { color: "text-[#EAB308]", border: "border-[#EAB308]/20", bg: "bg-[#EAB308]/10" },
  SECURITY: { color: "text-[#DC2626]", border: "border-[#DC2626]/20", bg: "bg-[#DC2626]/10" },
  SOCIAL_INVESTMENT: { color: "text-[#DB2777]", border: "border-[#DB2777]/20", bg: "bg-[#DB2777]/10" },
  ENVIRONMENT: { color: "text-[#059669]", border: "border-[#059669]/20", bg: "bg-[#059669]/10" },
};

interface FeaturedProjectsProps {
  initialProjects?: ProjectCard[];
}

export function FeaturedProjects({ initialProjects }: FeaturedProjectsProps) {
  const allProjects = initialProjects || MOCK_PROJECTS;
  
  const [selectedSector, setSelectedSector] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const availableSectors = useMemo(() => {
    const sectors = new Set<string>();
    allProjects.forEach(p => {
      if (p.sector) sectors.add(p.sector);
    });
    return ["ALL", ...Array.from(sectors)];
  }, [allProjects]);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchSector = selectedSector === "ALL" || project.sector === selectedSector;
      const matchSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.lga.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSector && matchSearch;
    }).slice(0, 6);
  }, [allProjects, selectedSector, searchQuery]);

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Federal Interventions
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Transforming Nigeria, One Project at a Time
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore verified federal government projects making a real impact across all 36 states and the FCT.
          </p>
        </FadeIn>

        {/* Dynamic Filters Area */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row pb-6 border-b border-border">
          {/* Sector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none w-full md:w-auto -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            {availableSectors.slice(0, 7).map((sector) => {
              const isActive = selectedSector === sector;
              return (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {sector.replace(/_/g, " ")}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, state, LGA..."
              className="pl-10 text-sm rounded-full bg-white/60 dark:bg-black/20 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Animated Project Grid */}
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const theme = SECTOR_THEMES[project.sector] || { color: "text-primary", border: "border-primary/20", bg: "bg-primary/10" };
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/projects/${project.slug}`}>
                    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl glass-panel relative border border-border">
                      <div className={`h-1.5 w-full bg-current ${theme.color}`} />
                      
                      <div className="relative h-48 overflow-hidden bg-muted">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        <div className="absolute top-3 right-3 flex gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white ${getStatusColor(project.status)} shadow-lg shadow-black/10`}
                          >
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                        
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-sm`}>
                            {project.sector.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 text-foreground">
                          {project.title}
                        </h3>
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                          <span>{project.state} · {project.lga}</span>
                        </div>
                        
                        <div className="mt-auto pt-5">
                          <div className="flex items-baseline justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Budget</span>
                            <span className="text-lg font-extrabold text-primary">
                              {formatCurrency(project.budget)}
                            </span>
                          </div>
                          
                          <div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span className="font-semibold text-foreground">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center rounded-3xl border border-dashed border-muted-foreground/30 bg-muted/20">
            <p className="text-lg text-muted-foreground">No projects match the selected filter or search query.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSelectedSector("ALL"); setSearchQuery(""); }}>
              Reset Filters
            </Button>
          </div>
        )}

        <FadeIn className="mt-16 text-center">
          <Button size="lg" className="rounded-full shadow-lg" asChild>
            <Link to="/projects">
              View All Archive Projects
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
