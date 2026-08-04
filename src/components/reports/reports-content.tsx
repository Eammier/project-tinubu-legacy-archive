
import { FileText, FileSpreadsheet, Download, BarChart3 } from "lucide-react";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const reports = [
  {
    title: "National Projects Summary 2025",
    description: "Comprehensive overview of all federal projects, budgets, and completion rates.",
    type: "PDF",
    size: "4.2 MB",
    date: "March 2025",
    icon: FileText,
  },
  {
    title: "State-by-State Project Report",
    description: "Detailed breakdown of projects, budgets, and impact metrics for all 37 states.",
    type: "Excel",
    size: "8.7 MB",
    date: "March 2025",
    icon: FileSpreadsheet,
  },
  {
    title: "Sector Analysis Report",
    description: "In-depth analysis of project distribution and performance across all 12 sectors.",
    type: "PDF",
    size: "3.1 MB",
    date: "February 2025",
    icon: FileText,
  },
  {
    title: "Budget Allocation Dataset",
    description: "Open data export of budget allocations, expenditures, and financial tracking.",
    type: "CSV",
    size: "1.5 MB",
    date: "February 2025",
    icon: FileSpreadsheet,
  },
  {
    title: "Quarterly Progress Report Q1 2025",
    description: "Quarterly assessment of project milestones, delays, and corrective actions.",
    type: "PDF",
    size: "5.8 MB",
    date: "April 2025",
    icon: BarChart3,
  },
  {
    title: "Beneficiary Impact Assessment",
    description: "Analysis of direct and indirect beneficiaries across all active projects.",
    type: "PDF",
    size: "2.9 MB",
    date: "January 2025",
    icon: FileText,
  },
];

export function ReportsPageContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Reports</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Download Reports</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Access official reports, datasets, and analytics exports in PDF, Excel, and CSV formats.
        </p>
      </FadeIn>

      <StaggerChildren className="mt-12 grid gap-6 md:grid-cols-2">
        {reports.map((report) => (
          <StaggerItem key={report.title}>
            <Card className="flex gap-5 p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <report.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{report.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-full bg-muted px-2 py-0.5 font-medium">
                    {report.type}
                  </span>
                  <span>{report.size}</span>
                  <span>{report.date}</span>
                </div>
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Download className="h-4 w-4" />
              </Button>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}

export { ReportsPageContent as ReportsContent };
