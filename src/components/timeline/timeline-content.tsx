import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TIMELINE_YEARS } from "@/lib/constants";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TimelinePageContent() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  const yearProjects = MOCK_PROJECTS.filter((p) => {
    const year = new Date(p.startDate).getFullYear();
    return year <= selectedYear;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Timeline</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Development Timeline</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Track Nigeria&apos;s federal development journey from 2023 to 2030, year by year.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 hidden md:block" />
          <div className="flex gap-2 overflow-x-auto pb-4 md:justify-between md:gap-0">
            {TIMELINE_YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "relative flex flex-col items-center gap-2 min-w-[80px] transition-all duration-300",
                  selectedYear === year ? "scale-110" : "opacity-60 hover:opacity-100"
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2 transition-all duration-300 z-10",
                    selectedYear === year
                      ? "bg-primary border-primary shadow-lg shadow-primary/30"
                      : "bg-background border-border"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-semibold",
                    selectedYear === year ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">{selectedYear} Projects</h2>
            <p className="text-sm text-muted-foreground">
              {yearProjects.length} projects active
            </p>
          </div>

          <div className="space-y-4">
            {yearProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/projects/${project.slug}`}>
                  <Card className="flex items-center gap-6 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg border-border bg-card">
                    <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.state} · {project.sector.replace(/_/g, " ")}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-primary text-sm">
                        {formatCurrency(project.budget)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {project.progress}% complete
                      </p>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
