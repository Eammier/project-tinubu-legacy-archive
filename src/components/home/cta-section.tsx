import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MailCheck, Loader2, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 1200));
    setSubscribed(true);
    setLoading(false);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <FadeIn>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(234,179,8,0.15),transparent_40%)]" />

          <div className="relative z-10 grid gap-12 px-8 py-20 lg:grid-cols-2 lg:items-center lg:px-16 text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-amber-400" />
                Quarterly Progress Briefs
              </div>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight">
                Explore Nigeria&apos;s Development Journey
              </h2>
              <p className="max-w-xl text-lg text-white/80 leading-relaxed">
                From the bustling streets of Lagos to the serene landscapes of Taraba — discover how federal investments are transforming lives across the nation.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-white text-emerald-900 hover:bg-slate-100 font-semibold rounded-full shadow-lg"
                  asChild
                >
                  <Link to="/map">
                    Open Interactive Map
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 font-semibold rounded-full"
                  asChild
                >
                  <Link to="/timeline">View Project Timeline</Link>
                </Button>
              </div>
            </div>

            {/* Interactive Subscription */}
            <div className="relative flex justify-center">
              <Card className="w-full max-w-md p-6 bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl text-white">
                <h3 className="font-bold text-lg mb-2">Subscribe for Updates</h3>
                <p className="text-xs text-white/70 mb-5 leading-relaxed">
                  Join over 45,000 citizens receiving official quarterly digests, verified project launches, and audit briefs directly in their inbox.
                </p>

                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-3 py-6 text-center"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <MailCheck className="h-6 w-6 text-amber-400" />
                      </div>
                      <h4 className="font-bold text-sm">Successfully Subscribed!</h4>
                      <p className="text-xs text-white/60">
                        You will receive our next quarterly newsletter starting next month.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubscribe} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white rounded-xl h-11"
                        />
                      </div>
                      {error && <p className="text-xs text-red-300">{error}</p>}
                      
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-emerald-900 hover:bg-slate-100 font-bold h-11 rounded-xl shadow-lg"
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Join the Mailing List"
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
                
                <p className="text-[10px] text-white/40 text-center mt-4 leading-none">
                  FGN Privacy Assurance: We never sell or share your data.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
