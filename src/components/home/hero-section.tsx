import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

const SLIDES = [
  { src: "/hero-1.png", alt: "President Tinubu — official portrait" },
  { src: "/hero-2.png", alt: "President Tinubu — state address" },
  { src: "/hero-3.png", alt: "President Tinubu — cabinet meeting" },
];

const TRUST_BADGES = [
  { label: "GEO-TAGGED LOGS" },
  { label: "OPEN AUDITS" },
  { label: "PUBLIC RECORDS" },
];

const SLIDE_DURATION = 5000; // ms

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + SLIDES.length) % SLIDES.length);
    },
    []
  );

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "8%" : "-8%",
      opacity: 0,
      scale: 1.04,
    }),
    center: {
      x: "0%",
      opacity: 1,
      scale: 1.08, // Ken Burns — slow zoom-in while active
      transition: {
        x: { duration: 0.8, ease: "easeOut" },
        opacity: { duration: 0.8, ease: "easeOut" },
        scale: { duration: SLIDE_DURATION / 1000 + 1, ease: "linear" },
      } as const,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-8%" : "8%",
      opacity: 0,
      transition: { duration: 0.7, ease: "easeIn" },
    }) as const,
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ── Slideshow background ── */}
      <div className="absolute inset-0">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={current}
            className="absolute inset-0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <img
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/55 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30 z-10" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 mx-auto w-full max-w-4xl px-4 pt-24 pb-32 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Preserving Nigeria's
          <br />
          Progress for Generations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-sm text-white/80 sm:text-base md:text-lg leading-relaxed"
        >
          A centralized, immutable digital archive documenting verified Federal
          Government projects, programmes, and policy interventions from
          2023–2030. Built to foster trust, transparency, and public
          accountability.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-600 active:bg-emerald-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-emerald-900/40 hover:shadow-xl"
          >
            Explore Projects
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 active:bg-white/30 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-white" />
            Learn More
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.55 }}
          className="mt-12"
        >
          <div className="mb-5 h-px bg-white/20" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Slide controls ── */}
      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-2 bg-emerald-400"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
        <motion.div
          key={current}
          className="h-full bg-emerald-400"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
        />
      </div>
    </section>
  );
}
