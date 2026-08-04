import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { SectorsPreview } from "@/components/home/sectors-preview";
import { TrustSection } from "@/components/home/trust-section";
import { CTASection } from "@/components/home/cta-section";
import { ProjectsPageContent } from "@/components/projects/projects-page-content";
import { ProjectDetailContent } from "@/components/projects/project-detail-content";
import { MapPageContent } from "@/components/map/map-page-content";
import { SectorsListContent, SectorDetailContent } from "@/components/sectors/sectors-content";
import { TimelinePageContent } from "@/components/timeline/timeline-content";
import { GalleryContent } from "@/components/gallery/gallery-content";
import { ReportsContent } from "@/components/reports/reports-content";
import { AboutContent } from "@/components/about/about-content";
import { ContactContent } from "@/components/contact/contact-content";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { useParams, Navigate } from "react-router-dom";

function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = MOCK_PROJECTS.find((p) => p.slug === slug);
  if (!project) return <Navigate to="/projects" replace />;
  return <ProjectDetailContent project={project} />;
}

function SectorDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <SectorDetailContent sectorId={id ?? ""} />;
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <SectorsPreview />
      <TrustSection />
      <CTASection />
    </>
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-primary">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">Page not found</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPageContent />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/map" element={<MapPageContent />} />
          <Route path="/sectors" element={<SectorsListContent />} />
          <Route path="/sectors/:id" element={<SectorDetailPage />} />
          <Route path="/timeline" element={<TimelinePageContent />} />
          <Route path="/gallery" element={<GalleryContent />} />
          <Route path="/reports" element={<ReportsContent />} />
          <Route path="/about" element={<AboutContent />} />
          <Route path="/contact" element={<ContactContent />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
