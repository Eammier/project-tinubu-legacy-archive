import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { SECTORS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCardComponent } from "@/components/projects/project-card";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";

export function ProjectsPageContent() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sectorFilter, setSectorFilter] = useState("all");

  const filtered = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.state.toLowerCase().includes(search.toLowerCase()) ||
        p.ministry.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || p.status === statusFilter;
      const matchesSector =
        sectorFilter === "all" ||
        p.sector.toLowerCase().replace(/_/g, "-") === sectorFilter;
      return matchesSearch && matchesStatus && matchesSector;
    });
  }, [search, statusFilter, sectorFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Project Database
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            All Verified Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Browse and search through {MOCK_PROJECTS.length}+ verified federal
            government projects across Nigeria.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, state, ministry..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ONGOING">Ongoing</TabsTrigger>
            <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
            <TabsTrigger value="PLANNED">Planned</TabsTrigger>
          </TabsList>
        </Tabs>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSectorFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              sectorFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            All Sectors
          </button>
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSectorFilter(s.id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                sectorFilter === s.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </FadeIn>

      <p className="mb-6 text-sm text-muted-foreground">
        Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
      </p>

      <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <StaggerItem key={project.id}>
            <ProjectCardComponent project={project} />
          </StaggerItem>
        ))}
      </StaggerChildren>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">
            No projects match your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
