
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Clock, Send, AlertTriangle, Upload,
  CheckCircle, Search, Loader2, MessageSquare, Flag, FileUp,
} from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const contactInfo = [
  { icon: MapPin, title: "Address", content: "Federal Secretariat, Central Business District, Abuja, FCT, Nigeria" },
  { icon: Mail, title: "Email", content: "info@ptla.gov.ng" },
  { icon: Phone, title: "Phone", content: "+234 (0) 9 123 4567" },
  { icon: Clock, title: "Office Hours", content: "Monday – Friday, 8:00 AM – 4:00 PM WAT" },
];

const feedbackTypes = [
  { value: "FEEDBACK", label: "General Feedback", icon: MessageSquare, color: "text-blue-500" },
  { value: "INACCURACY", label: "Report Inaccuracy", icon: Flag, color: "text-amber-500" },
  { value: "EVIDENCE", label: "Submit Evidence", icon: FileUp, color: "text-green-600" },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  REVIEWED: "bg-blue-100 text-blue-800 border-blue-200",
  RESOLVED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
};

export function ContactPageContent() {
  // Contact form state
  const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Feedback form state
  const [feedbackForm, setFeedbackForm] = useState({ projectId: "", type: "FEEDBACK", message: "", evidenceUrl: "" });
  const [feedbackResult, setFeedbackResult] = useState<{ id: string; status: string } | null>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  // Track submission state
  const [trackId, setTrackId] = useState("");
  const [trackResult, setTrackResult] = useState<null | {
    id: string; status: string; type: string; message: string; response: string | null;
    project: { title: string; slug: string } | null; createdAt: string;
  }>(null);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setContactSent(true);
    setContactLoading(false);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackLoading(true);
    setFeedbackError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackForm),
      });
      const data = await res.json();
      if (data.success) {
        setFeedbackResult({ id: data.id, status: data.status });
      } else {
        setFeedbackError(data.error || "Submission failed. Please try again.");
      }
    } catch {
      setFeedbackError("Network error. Please try again.");
    }
    setFeedbackLoading(false);
  };

  const handleTrack = async () => {
    if (!trackId.trim()) return;
    setTrackLoading(true);
    setTrackError("");
    setTrackResult(null);
    try {
      const res = await fetch(`/api/feedback/track?id=${encodeURIComponent(trackId.trim())}`);
      const data = await res.json();
      if (res.ok && data.id) {
        setTrackResult(data);
      } else {
        setTrackError(data.error || "Submission not found. Please check your ID.");
      }
    } catch {
      setTrackError("Network error. Please try again.");
    }
    setTrackLoading(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Get in Touch</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Have questions, feedback, or want to report an inaccuracy? Use the tabs below.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-10">
        <Tabs defaultValue="contact">
          <TabsList className="mb-8">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
            <TabsTrigger value="track">Track Submission</TabsTrigger>
          </TabsList>

          {/* ── Contact Tab ─────────────────────────────── */}
          <TabsContent value="contact">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
                {contactSent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Message Sent!</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Thank you for reaching out. Our team will respond within 2–3 working days.
                    </p>
                    <Button variant="outline" onClick={() => setContactSent(false)}>Send Another</Button>
                  </motion.div>
                ) : (
                  <form className="space-y-4" onSubmit={handleContactSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">First Name</label>
                        <Input placeholder="John" value={contactForm.firstName} onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })} required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                        <Input placeholder="Doe" value={contactForm.lastName} onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })} required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email</label>
                      <Input type="email" placeholder="john@example.com" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Subject</label>
                      <Input placeholder="How can we help?" value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Message</label>
                      <textarea
                        className="flex min-h-[120px] w-full rounded-xl border border-input bg-white/60 dark:bg-white/5 px-4 py-3 text-sm backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Your message..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button variant="premium" className="w-full" disabled={contactLoading}>
                      {contactLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      {contactLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </Card>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <Card key={item.title} className="flex gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.content}</p>
                    </div>
                  </Card>
                ))}
                <Card className="p-6 bg-destructive/5 border-destructive/20">
                  <h3 className="font-semibold text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Emergency Contacts
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    National Emergency: <strong>112</strong><br />
                    NEMA Hotline: <strong>0800-NEMA-HELP</strong>
                  </p>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── Feedback Tab ────────────────────────────── */}
          <TabsContent value="feedback">
            <div className="grid gap-8 lg:grid-cols-5">
              <Card className="p-8 lg:col-span-3">
                <h2 className="text-xl font-semibold mb-2">Submit Feedback or Report</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Help us improve accuracy. All submissions are reviewed by our moderation team.
                </p>

                <AnimatePresence mode="wait">
                  {feedbackResult ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-4 py-10 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold">Submitted Successfully</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Your submission has been received. Use the tracking ID below to check the status.
                      </p>
                      <div className="rounded-xl border bg-muted/50 px-6 py-4 text-center w-full max-w-xs">
                        <p className="text-xs text-muted-foreground mb-1">Tracking ID</p>
                        <p className="font-mono text-sm font-bold break-all">{feedbackResult.id}</p>
                      </div>
                      <Button variant="outline" onClick={() => setFeedbackResult(null)}>Submit Another</Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-5"
                      onSubmit={handleFeedbackSubmit}
                    >
                      <div>
                        <label className="text-sm font-medium mb-2 block">Type of Submission</label>
                        <div className="grid grid-cols-3 gap-3">
                          {feedbackTypes.map((ft) => (
                            <button
                              key={ft.value}
                              type="button"
                              onClick={() => setFeedbackForm({ ...feedbackForm, type: ft.value })}
                              className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-medium transition-all ${
                                feedbackForm.type === ft.value
                                  ? "border-primary bg-primary/5 text-primary"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <ft.icon className={`h-5 w-5 ${feedbackForm.type === ft.value ? "text-primary" : ft.color}`} />
                              {ft.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Project ID or Slug</label>
                        <Input
                          placeholder="e.g. lagos-calabar-coastal-highway"
                          value={feedbackForm.projectId}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, projectId: e.target.value })}
                          required
                        />
                        <p className="text-xs text-muted-foreground mt-1">Find this in the project URL or description.</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Your Message</label>
                        <textarea
                          className="flex min-h-[130px] w-full rounded-xl border border-input bg-white/60 dark:bg-white/5 px-4 py-3 text-sm backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          placeholder="Describe your feedback, the inaccuracy found, or the evidence you are submitting..."
                          value={feedbackForm.message}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                          required
                        />
                      </div>

                      {feedbackForm.type === "EVIDENCE" && (
                        <div>
                          <label className="text-sm font-medium mb-1.5 block">Evidence URL (optional)</label>
                          <div className="relative">
                            <Upload className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="https://drive.google.com/..."
                              value={feedbackForm.evidenceUrl}
                              onChange={(e) => setFeedbackForm({ ...feedbackForm, evidenceUrl: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                      {feedbackError && (
                        <p className="text-sm text-destructive">{feedbackError}</p>
                      )}

                      <Button variant="premium" className="w-full" disabled={feedbackLoading}>
                        {feedbackLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {feedbackLoading ? "Submitting..." : "Submit Report"}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3">What happens next?</h3>
                  <ol className="space-y-3">
                    {[
                      { step: "01", text: "Your submission is logged with a unique tracking ID." },
                      { step: "02", text: "Our moderation team reviews it within 5 working days." },
                      { step: "03", text: "For verified inaccuracies, the project record is updated." },
                      { step: "04", text: "You receive a response and the status changes to RESOLVED." },
                    ].map((item) => (
                      <li key={item.step} className="flex gap-3 text-sm">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {item.step}
                        </span>
                        <span className="text-muted-foreground pt-0.5">{item.text}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
                <Card className="p-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                  <h3 className="font-semibold text-amber-800 dark:text-amber-400 flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4" />
                    Submission Guidelines
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                    <li>Be specific — cite dates, amounts, or locations where relevant.</li>
                    <li>Attach URLs to evidence (photos, documents, news reports).</li>
                    <li>False or malicious reports may lead to account suspension.</li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ── Track Tab ────────────────────────────────── */}
          <TabsContent value="track">
            <div className="mx-auto max-w-2xl">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-2">Track Your Submission</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Enter the tracking ID you received after submitting your feedback or report.
                </p>

                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-10 font-mono"
                      placeholder="Enter tracking ID..."
                      value={trackId}
                      onChange={(e) => setTrackId(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                    />
                  </div>
                  <Button onClick={handleTrack} disabled={trackLoading || !trackId.trim()}>
                    {trackLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track"}
                  </Button>
                </div>

                {trackError && (
                  <p className="mt-4 text-sm text-destructive">{trackError}</p>
                )}

                <AnimatePresence>
                  {trackResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-xl border p-6 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground font-mono">{trackResult.id}</p>
                          {trackResult.project && (
                            <p className="text-sm font-semibold mt-1">{trackResult.project.title}</p>
                          )}
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusColors[trackResult.status] ?? "bg-muted text-muted-foreground"}`}>
                          {trackResult.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Your submission</p>
                        <p className="text-sm">{trackResult.message}</p>
                      </div>

                      {trackResult.response && (
                        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                          <p className="text-xs text-primary font-semibold mb-1">Official Response</p>
                          <p className="text-sm">{trackResult.response}</p>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        Submitted: {new Date(trackResult.createdAt).toLocaleDateString("en-NG", { dateStyle: "long" })}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
}

export { ContactPageContent as ContactContent };
