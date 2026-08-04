
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftRight, Search, Plus, X, ExternalLink,
  CheckCircle2, Clock, AlertCircle, TrendingUp, MapPin,
  Building2, DollarSign, Users, Calendar, BarChart3,
} from "lucide-react";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ProjectCard } from "@/types";

const statusIcons = {
  COMPLETED: { icon: CheckCircle2, color: "text-green-600" },
  ONGOING: { icon: Clock, color: "text-blue-600" },
  PLANNED: { icon: AlertCircle, color: "text-amber-600" },
};

const SECTOR_COLORS: Record<string, string> = {
  INFRASTRUCTURE: "#006B3C",
  HEALTHCARE: "#E11D48",
  EDUCATION: "#2563EB",
  AGRICULTURE: "#16A34A",
  HOUSING: "#D97706",
  TRANSPORTATION: "#7C3AED",
  WATER: "#0891B2",
  TECHNOLOGY: "#4F46E5",
  POWER: "#EAB308",
  SECURITY: "#DC2626",
  SOCIAL_INVESTMENT: "#DB2777",
  ENVIRONMENT: "#059669",
};

function ProjectSelector({
  label,
  selected,
  onSelect,
  exclude,
}: {
  label: string;
  selected: ProjectCard | null;
  onSelect: (p: ProjectCard | null) => void;
  exclude: string | null;
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () =>
      MOCK_PROJECTS.filter(
        (p) =>
          p.id !== exclude &&
          (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.sector.includes(search.toUpperCase()))
      ),
    [search, exclude]
  );

  if (selected) {
    return (
      <div className="relative">
        <div className="absolute -top-3 left-4 z-10">
          <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
            {label}
          </span>
        </div>
        <Card className="relative p-5 border-2 border-primary/30">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-7 w-7"
            onClick={() => onSelect(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="relative h-40 rounded-xl overflow-hidden mb-4">
            <img src={selected.imageUrl} alt={selected.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="rounded-full px-2 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: SECTOR_COLORS[selected.sector] }}>
                {selected.sector.replace(/_/g, " ")}
              </span>
            </div>
          </div>
          <h3 className="font-bold text-sm leading-snug">{selected.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{selected.state} · {selected.lga}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -top-3 left-4 z-10">
        <span className="rounded-full bg-muted px-3 py-0.5 text-xs font-semibold text-muted-foreground">
          {label}
        </span>
      </div>
      <Card
        className="border-2 border-dashed border-muted-foreground/30 p-5 cursor-pointer hover:border-primary/50 transition-colors"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Click to select a project</p>
        </div>
      </Card>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 z-50 bg-background border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search projects..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y">
              {filtered.map((project) => (
                <button
                  key={project.id}
                  className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors"
                  onClick={() => { onSelect(project); setOpen(false); setSearch(""); }}
                >
                  <p className="text-sm font-medium line-clamp-1">{project.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {project.state} · {project.sector.replace(/_/g, " ")} · {project.progress}% complete
                  </p>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-muted-foreground py-6">No projects found</p>
              )}
            </div>
            <div className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CompareRow({
  label,
  icon: Icon,
  a,
  b,
  highlight,
}: {
  label: string;
  icon: typeof MapPin;
  a: React.ReactNode;
  b: React.ReactNode;
  highlight?: "a" | "b" | null;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b last:border-0 items-center">
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {label}
      </div>
      <div className={`text-sm text-center rounded-lg px-3 py-2 ${highlight === "a" ? "bg-primary/10 font-semibold text-primary" : ""}`}>
        {a}
      </div>
      <div className={`text-sm text-center rounded-lg px-3 py-2 ${highlight === "b" ? "bg-primary/10 font-semibold text-primary" : ""}`}>
        {b}
      </div>
    </div>
  );
}

export function ProjectCompareContent() {
  const [projectA, setProjectA] = useState<ProjectCard | null>(MOCK_PROJECTS[0]);
  const [projectB, setProjectB] = useState<ProjectCard | null>(MOCK_PROJECTS[7]);

  const budgetWinner = projectA && projectB
    ? projectA.budget < projectB.budget ? "a" : projectB.budget < projectA.budget ? "b" : null
    : null;
  const progressWinner = projectA && projectB
    ? projectA.progress > projectB.progress ? "a" : projectB.progress > projectA.progress ? "b" : null
    : null;
  const benefWinner = projectA && projectB
    ? (projectA.beneficiaries ?? 0) > (projectB.beneficiaries ?? 0) ? "a" : (projectB.beneficiaries ?? 0) > (projectA.beneficiaries ?? 0) ? "b" : null
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Comparison Tool</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Compare Projects</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Select any two federal projects to compare them side-by-side across budget, progress, sector, and impact.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-8 sm:grid-cols-2 mb-8 relative">
          <ProjectSelector
            label="Project A"
            selected={projectA}
            onSelect={setProjectA}
            exclude={projectB?.id ?? null}
          />
          <div className="hidden sm:flex absolute inset-y-0 left-1/2 -translate-x-1/2 items-center z-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary shadow-lg">
              <ArrowLeftRight className="h-5 w-5 text-primary" />
            </div>
          </div>
          <ProjectSelector
            label="Project B"
            selected={projectB}
            onSelect={setProjectB}
            exclude={projectA?.id ?? null}
          />
        </div>
      </FadeIn>

      <AnimatePresence>
        {projectA && projectB && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-3 gap-4 px-5 py-4 bg-muted/40 border-b">
                <p className="text-xs font-semibold text-muted-foreground">Metric</p>
                <p className="text-xs font-semibold text-center text-primary">Project A</p>
                <p className="text-xs font-semibold text-center text-primary">Project B</p>
              </div>

              <div className="px-5">
                <CompareRow
                  label="State" icon={MapPin}
                  a={projectA.state} b={projectB.state}
                />
                <CompareRow
                  label="Sector" icon={BarChart3}
                  a={<span className="rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: `${SECTOR_COLORS[projectA.sector]}20`, color: SECTOR_COLORS[projectA.sector] }}>{projectA.sector.replace(/_/g, " ")}</span>}
                  b={<span className="rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: `${SECTOR_COLORS[projectB.sector]}20`, color: SECTOR_COLORS[projectB.sector] }}>{projectB.sector.replace(/_/g, " ")}</span>}
                />
                <CompareRow
                  label="Ministry" icon={Building2}
                  a={<span className="text-xs">{projectA.ministry}</span>}
                  b={<span className="text-xs">{projectB.ministry}</span>}
                />
                <CompareRow
                  label="Budget" icon={DollarSign}
                  a={<span className="font-semibold">{formatCurrency(projectA.budget)}</span>}
                  b={<span className="font-semibold">{formatCurrency(projectB.budget)}</span>}
                  highlight={budgetWinner === "a" ? "a" : budgetWinner === "b" ? "b" : null}
                />
                <CompareRow
                  label="Progress" icon={TrendingUp}
                  a={
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold">{projectA.progress}%</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${projectA.progress}%` }} />
                      </div>
                    </div>
                  }
                  b={
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold">{projectB.progress}%</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${projectB.progress}%` }} />
                      </div>
                    </div>
                  }
                  highlight={progressWinner}
                />
                <CompareRow
                  label="Status" icon={CheckCircle2}
                  a={(() => {
                    const SI = statusIcons[projectA.status as keyof typeof statusIcons] ?? statusIcons.ONGOING;
                    return <span className={`flex items-center justify-center gap-1 text-xs ${SI.color}`}><SI.icon className="h-3 w-3" />{projectA.status}</span>;
                  })()}
                  b={(() => {
                    const SI = statusIcons[projectB.status as keyof typeof statusIcons] ?? statusIcons.ONGOING;
                    return <span className={`flex items-center justify-center gap-1 text-xs ${SI.color}`}><SI.icon className="h-3 w-3" />{projectB.status}</span>;
                  })()}
                />
                <CompareRow
                  label="Beneficiaries" icon={Users}
                  a={projectA.beneficiaries ? formatNumber(projectA.beneficiaries) : "—"}
                  b={projectB.beneficiaries ? formatNumber(projectB.beneficiaries) : "—"}
                  highlight={benefWinner}
                />
                <CompareRow
                  label="Start Date" icon={Calendar}
                  a={new Date(projectA.startDate).toLocaleDateString("en-NG", { month: "short", year: "numeric" })}
                  b={new Date(projectB.startDate).toLocaleDateString("en-NG", { month: "short", year: "numeric" })}
                />
                <CompareRow
                  label="Contractor" icon={Building2}
                  a={<span className="text-xs">{projectA.contractor ?? "—"}</span>}
                  b={<span className="text-xs">{projectB.contractor ?? "—"}</span>}
                />
              </div>

              {/* Footer links */}
              <div className="grid grid-cols-2 gap-4 p-5 border-t bg-muted/20">
                <Link to={`/projects/${projectA.slug}`} className="flex items-center justify-center gap-2 rounded-xl border p-3 hover:bg-accent transition-colors text-sm font-medium">
                  <ExternalLink className="h-4 w-4" />
                  View Project A
                </Link>
                <Link to={`/projects/${projectB.slug}`} className="flex items-center justify-center gap-2 rounded-xl border p-3 hover:bg-accent transition-colors text-sm font-medium">
                  <ExternalLink className="h-4 w-4" />
                  View Project B
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {(!projectA || !projectB) && (
        <FadeIn>
          <div className="mt-8 rounded-2xl border-2 border-dashed border-muted-foreground/20 p-16 text-center">
            <ArrowLeftRight className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Select two projects above to see a side-by-side comparison.</p>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
