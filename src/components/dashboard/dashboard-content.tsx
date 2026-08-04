
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { NIGERIAN_STATES, SECTORS, STATS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/animations/animated-counter";

const stateData = NIGERIAN_STATES.slice(0, 10)
  .sort((a, b) => b.projects - a.projects)
  .map((s) => ({ name: s.name, projects: s.projects, budget: s.budget / 1e9 }));

const SECTOR_COUNTS = [620, 410, 380, 295, 270, 245, 210, 198, 175, 162, 140, 122];
const sectorData = SECTORS.map((s, i) => ({
  name: s.name,
  value: SECTOR_COUNTS[i] ?? 100,
  color: s.color,
}));

const monthlyProgress = [
  { month: "Jan", completed: 120, ongoing: 340 },
  { month: "Feb", completed: 145, ongoing: 355 },
  { month: "Mar", completed: 168, ongoing: 370 },
  { month: "Apr", completed: 190, ongoing: 385 },
  { month: "May", completed: 215, ongoing: 400 },
  { month: "Jun", completed: 240, ongoing: 420 },
  { month: "Jul", completed: 265, ongoing: 435 },
  { month: "Aug", completed: 290, ongoing: 450 },
  { month: "Sep", completed: 310, ongoing: 465 },
  { month: "Oct", completed: 335, ongoing: 480 },
  { month: "Nov", completed: 360, ongoing: 495 },
  { month: "Dec", completed: 385, ongoing: 510 },
];

const budgetAllocation = [
  { name: "Infrastructure", value: 35 },
  { name: "Healthcare", value: 15 },
  { name: "Education", value: 12 },
  { name: "Agriculture", value: 10 },
  { name: "Power", value: 10 },
  { name: "Other", value: 18 },
];

const COLORS = ["#006B3C", "#008751", "#00A65A", "#4ADE80", "#86EFAC", "#BBF7D0"];

export function DashboardPageContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Dashboard</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Real-time insights into federal government project performance across Nigeria.
        </p>
      </FadeIn>

      <StaggerChildren className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Projects", value: STATS.totalProjects },
          { label: "Total Budget", value: STATS.totalBudget, format: "currency" },
          { label: "Completion Rate", value: 62, suffix: "%" },
          { label: "Beneficiaries", value: STATS.beneficiaries },
        ].map((metric) => (
          <StaggerItem key={metric.label}>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold text-primary">
                {metric.format === "currency" ? (
                  formatCurrency(metric.value)
                ) : (
                  <>
                    <AnimatedCounter value={metric.value} />
                    {metric.suffix}
                  </>
                )}
              </p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Projects per State</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="projects" fill="#006B3C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Card>
            <CardHeader>
              <CardTitle>Budget Allocation by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {budgetAllocation.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="completed" stackId="1" fill="#006B3C" stroke="#006B3C" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="ongoing" stackId="1" fill="#4ADE80" stroke="#4ADE80" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.25}>
          <Card>
            <CardHeader>
              <CardTitle>Projects by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectorData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {sectorData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
