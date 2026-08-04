
import { Shield, Eye, Globe, Award, Users, Database } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";

const values = [
  { icon: Shield, title: "Trust", description: "Every project is verified through a rigorous multi-stage approval process before publication." },
  { icon: Eye, title: "Transparency", description: "Complete budget breakdowns, contractor details, and progress reports are publicly accessible." },
  { icon: Globe, title: "National Pride", description: "Celebrating Nigeria's development journey and preserving it for future generations." },
  { icon: Award, title: "Excellence", description: "Maintaining the highest standards of documentation, accuracy, and presentation." },
  { icon: Users, title: "Citizen Engagement", description: "Empowering citizens to provide feedback, report inaccuracies, and track project impact." },
  { icon: Database, title: "Historical Preservation", description: "Building a permanent digital archive of Nigeria's federal development from 2023–2030." },
];

export function AboutPageContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">About</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Project Tinubu Legacy Archive
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
          The Project Tinubu Legacy Archive (PTLA) is Nigeria&apos;s first centralized
          digital archive documenting every verified Federal Government project,
          programme, and intervention from 2023 to 2030. Built with cutting-edge
          technology and designed to the highest standards of government transparency,
          PTLA ensures that every citizen can access, verify, and engage with
          Nigeria&apos;s development story.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <div className="relative overflow-hidden rounded-3xl hero-gradient p-12 text-white">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="mt-4 max-w-2xl text-white/80 leading-relaxed">
            To preserve Nigeria&apos;s progress through comprehensive, verified, and
            accessible documentation of every federal government project — fostering
            accountability, citizen engagement, and national pride.
          </p>
        </div>
      </FadeIn>

      <StaggerChildren className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <StaggerItem key={value.title}>
            <Card className="p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <FadeIn delay={0.2} className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Project Workflow</h2>
        <div className="flex flex-wrap items-center gap-4">
          {["Draft", "Review", "Verification", "Approval", "Published"].map(
            (step, i) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {i + 1}
                  </div>
                  <span className="font-medium">{step}</span>
                </div>
                {i < 4 && (
                  <div className="hidden sm:block h-px w-8 bg-border" />
                )}
              </div>
            )
          )}
        </div>
      </FadeIn>
    </div>
  );
}

export { AboutPageContent as AboutContent };
