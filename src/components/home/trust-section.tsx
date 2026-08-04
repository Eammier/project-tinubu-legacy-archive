import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Eye, Globe, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Verified & Trusted",
    description:
      "Every project goes through a multi-agency verification process before publication, ensuring maximum accuracy.",
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description:
      "Full budget breakdowns, contractor details, timelines, and progress reports are accessible to every citizen.",
  },
  {
    icon: Globe,
    title: "Nationwide Coverage",
    description:
      "Documenting projects across all 36 states and 774 LGAs, leaving no community behind in the development record.",
  },
  {
    icon: Award,
    title: "Historical Preservation",
    description:
      "Building a permanent, tamper-proof digital archive of Nigeria's development journey from 2023 to 2030.",
  },
];

const steps = [
  {
    number: "01",
    title: "Project Submission",
    desc: "Ministries and government agencies submit project metrics, budgets, and contractor details.",
  },
  {
    number: "02",
    title: "Independent Review",
    desc: "PTLA administrators and independent reviewers audit the documents and request clarification.",
  },
  {
    number: "03",
    title: "Citizen Feedback Loop",
    desc: "Public reviews, ground photos, and inaccuracy reports are cross-referenced with official records.",
  },
  {
    number: "04",
    title: "Immutable Archiving",
    desc: "The project record is finalized, signed off, and stored permanently in the digital archive.",
  },
];

export function TrustSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="left">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Why PTLA
              </p>
              <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Built on Trust,
                <br />
                Powered by Verification
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                The Project Tinubu Legacy Archive is Nigeria&apos;s commitment to open governance. Every naira spent, every project delivered, and every life impacted — documented for posterity.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full shadow-lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link to="/projects">
                    Explore All Projects
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <Card className="p-6 md:p-8 glass-panel border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">Official Project Archiving Protocol</h3>
                </div>
                
                <div className="space-y-4">
                  {steps.map((step, idx) => {
                    const isSelected = activeStep === idx;
                    return (
                      <div
                        key={step.number}
                        onMouseEnter={() => setActiveStep(idx)}
                        onClick={() => setActiveStep(idx)}
                        className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-primary/5 border-primary shadow-lg shadow-primary/5"
                            : "border-transparent hover:bg-muted/40"
                        }`}
                      >
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          {step.number}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm leading-none text-foreground">{step.title}</h4>
                          {isSelected && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="text-xs text-muted-foreground mt-2 leading-relaxed"
                            >
                              {step.desc}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 border-t border-border pt-16">
          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-border bg-card">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-base text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}
