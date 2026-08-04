import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import type { ProjectCard } from "@/types";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProjectCardComponentProps {
  project: ProjectCard;
}

export function ProjectCardComponent({ project }: ProjectCardComponentProps) {
  return (
    <Link to={`/projects/${project.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-border bg-card">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 right-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${getStatusColor(project.status)}`}
            >
              {getStatusLabel(project.status)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            {project.sector.replace(/_/g, " ")}
          </p>
          <h3 className="mt-1 font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {project.state} · {project.lga}
          </div>
          <p className="mt-3 text-lg font-bold text-primary">
            {formatCurrency(project.budget)}
          </p>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
