import { Link } from "react-router-dom";
import { useState } from "react";
import {
  MapPin,
  Calendar,
  Building2,
  Users,
  Share2,
  Download,
  MessageSquare,
  ArrowLeft,
  ExternalLink,
  ArrowLeftRight,
  CheckCircle,
  Loader2,
  Flag,
  FileUp,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { ProjectCard } from "@/types";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCardComponent } from "@/components/projects/project-card";
import { BeforeAfterSlider } from "@/components/projects/before-after-slider";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

const feedbackTypeOptions = [
  { value: "FEEDBACK", label: "General Feedback", icon: MessageSquare },
  { value: "INACCURACY", label: "Report Inaccuracy", icon: Flag },
  { value: "EVIDENCE", label: "Submit Evidence", icon: FileUp },
];

interface ProjectDetailContentProps {
  project: ProjectCard;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const related = MOCK_PROJECTS.filter(
    (p) => p.sector === project.sector && p.id !== project.id
  ).slice(0, 3);

  // Feedback form state
  const [fbType, setFbType] = useState("FEEDBACK");
  const [fbMessage, setFbMessage] = useState("");
  const [fbEvidence, setFbEvidence] = useState("");
  const [fbSubmitting, setFbSubmitting] = useState(false);
  const [fbResult, setFbResult] = useState<{ id: string; status: string } | null>(null);
  const [fbError, setFbError] = useState("");

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFbSubmitting(true);
    setFbError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.slug, type: fbType, message: fbMessage, evidenceUrl: fbEvidence }),
      });
      const data = await res.json();
      if (data.success) {
        setFbResult({ id: data.id, status: data.status });
      } else {
        setFbError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setFbError("Network error. Please try again.");
    }
    setFbSubmitting(false);
  };

  const projectUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://ptla.gov.ng/projects/${project.slug}`;

  return (
    <div>
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-between">
              <Link
                to="/projects"
                className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
              <Link
                to={`/projects/compare?a=${project.slug}`}
                className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors border border-white/30 rounded-full px-3 py-1 backdrop-blur-sm hover:bg-white/10"
              >
                <ArrowLeftRight className="h-3 w-3" />
                Compare
              </Link>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(project.status)}`}
            >
              {getStatusLabel(project.status)}
            </span>
            <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-1 text-sm">
                <MapPin className="h-4 w-4" />
                {project.state}, {project.lga}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Building2 className="h-4 w-4" />
                {project.ministry}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <FadeIn>
              <div>
                <h2 className="text-xl font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Project Progress</h3>
                  <span className="text-2xl font-bold text-primary">
                    {project.progress}%
                  </span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Tabs defaultValue="timeline">
                <TabsList>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="feedback">Feedback</TabsTrigger>
                </TabsList>
                <TabsContent value="timeline" className="mt-4">
                  <Card className="p-6">
                    <div className="space-y-6">
                      {[
                        { date: project.startDate, title: "Project Initiated", desc: "Official project commencement" },
                        { date: "2024-06-01", title: "Phase 1 Complete", desc: "Initial infrastructure phase delivered" },
                        { date: "2025-01-01", title: "Mid-term Review", desc: "Progress assessment and budget review" },
                        ...(project.completionDate
                          ? [{ date: project.completionDate, title: "Project Completed", desc: "Final delivery and handover" }]
                          : [{ date: "2026-12-31", title: "Expected Completion", desc: "Projected completion date" }]),
                      ].map((event, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                            {i < 3 && <div className="w-px flex-1 bg-border min-h-[40px]" />}
                          </div>
                          <div className="pb-4">
                            <p className="text-xs text-muted-foreground">
                              {formatDate(event.date)}
                            </p>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="documents" className="mt-4">
                  <Card className="p-6">
                    <div className="space-y-3">
                      {["Budget Allocation Document", "Environmental Impact Assessment", "Contract Agreement", "Completion Report"].map(
                        (doc) => (
                          <div
                            key={doc}
                            className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-accent"
                          >
                            <div className="flex items-center gap-3">
                              <Download className="h-5 w-5 text-primary" />
                              <span className="text-sm font-medium">{doc}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="gallery" className="mt-4 space-y-4">
                  <BeforeAfterSlider
                    beforeUrl="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1200&q=80"
                    afterUrl={project.imageUrl}
                    beforeLabel="Before Construction"
                    afterLabel="Current Progress"
                  />
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {[project.imageUrl, ...MOCK_PROJECTS.slice(0, 5).map((p) => p.imageUrl)].map(
                      (url, i) => (
                        <div key={i} className="relative aspect-video overflow-hidden rounded-xl">
                          <img src={url} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
                        </div>
                      )
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="feedback" className="mt-4">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-1">Public Feedback Portal</h3>
                    <p className="text-sm text-muted-foreground mb-5">
                      Share your experience, report inaccuracies, or submit evidence about this project.
                    </p>
                    <AnimatePresence mode="wait">
                      {fbResult ? (
                        <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 py-8 text-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-7 w-7 text-green-600" />
                          </div>
                          <h4 className="font-semibold">Submitted Successfully</h4>
                          <p className="text-sm text-muted-foreground">Tracking ID: <span className="font-mono text-xs font-bold">{fbResult.id}</span></p>
                          <p className="text-xs text-muted-foreground">Visit the <Link to="/contact" className="text-primary underline">Contact page</Link> to track your submission status.</p>
                          <Button variant="outline" size="sm" onClick={() => { setFbResult(null); setFbMessage(""); }}>Submit Another</Button>
                        </motion.div>
                      ) : (
                        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleFeedbackSubmit} className="space-y-4">
                          <div className="grid grid-cols-3 gap-2">
                            {feedbackTypeOptions.map((ft) => (
                              <button key={ft.value} type="button" onClick={() => setFbType(ft.value)}
                                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-all ${
                                  fbType === ft.value ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/40"
                                }`}>
                                <ft.icon className="h-4 w-4" />
                                {ft.label}
                              </button>
                            ))}
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1.5 block">Your Message</label>
                            <textarea
                              className="flex min-h-[100px] w-full rounded-xl border border-input bg-white/60 dark:bg-white/5 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              placeholder="Describe your feedback or the issue..."
                              value={fbMessage}
                              onChange={(e) => setFbMessage(e.target.value)}
                              required
                            />
                          </div>
                          {fbType === "EVIDENCE" && (
                            <div>
                              <label className="text-sm font-medium mb-1.5 block">Evidence URL</label>
                              <Input placeholder="https://..." value={fbEvidence} onChange={(e) => setFbEvidence(e.target.value)} />
                            </div>
                          )}
                          {fbError && <p className="text-sm text-destructive">{fbError}</p>}
                          <Button variant="premium" className="w-full" disabled={fbSubmitting}>
                            {fbSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
                            {fbSubmitting ? "Submitting..." : "Submit Feedback"}
                          </Button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </Card>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <Card className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatCurrency(project.budget)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sector</p>
                  <p className="font-medium">
                    {project.sector.replace(/_/g, " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(project.startDate)}
                  </p>
                </div>
                {project.contractor && (
                  <div>
                    <p className="text-sm text-muted-foreground">Contractor</p>
                    <p className="font-medium">{project.contractor}</p>
                  </div>
                )}
                {project.beneficiaries && (
                  <div>
                    <p className="text-sm text-muted-foreground">Beneficiaries</p>
                    <p className="font-medium flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {project.beneficiaries.toLocaleString()}
                    </p>
                  </div>
                )}
              </Card>
            </FadeIn>

            <FadeIn delay={0.15}>
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Share Project</h3>
                <div className="flex justify-center mb-4">
                  <QRCodeSVG
                    value={`https://ptla.gov.ng/projects/${project.slug}`}
                    size={120}
                    bgColor="transparent"
                    fgColor="currentColor"
                    className="text-foreground"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4" />
                  Share Project
                </Button>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card className="p-6">
                <h3 className="font-semibold mb-2">Impact Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Jobs Created</span>
                    <span className="font-medium">2,400+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Communities Served</span>
                    <span className="font-medium">48</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Economic Impact</span>
                    <span className="font-medium">₦12.5B</span>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>

        {related.length > 0 && (
          <FadeIn className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <ProjectCardComponent key={p.id} project={p} />
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
