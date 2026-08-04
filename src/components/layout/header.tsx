import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Landmark } from "lucide-react";
import { APP_SHORT_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sectors", href: "/sectors" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          // Always clean white on mobile for maximum readability as requested, glass/white on desktop
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-2.5"
            : "bg-white lg:bg-transparent lg:py-4 py-2.5 border-b border-gray-100 lg:border-none shadow-xs lg:shadow-none"
        )}
      >
        <div className="mx-auto flex h-14 lg:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <Link
            to="/"
            className="group flex items-center gap-3 shrink-0"
            aria-label="PTLA home"
          >
            {/* Green Squircle with Gold Landmark/Building Icon */}
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#006B3C] shadow-md shadow-emerald-950/20 transition-transform duration-200 group-hover:scale-105">
              <Landmark className="h-6 w-6 text-[#C59B27]" />
            </div>

            {/* Typography */}
            <div className="flex flex-col justify-center">
              <p
                className={cn(
                  "text-lg font-black tracking-tight leading-none transition-colors duration-300",
                  scrolled
                    ? "text-[#006B3C]"
                    : "text-[#006B3C] lg:text-white"
                )}
              >
                {APP_SHORT_NAME}
              </p>
              <p
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider leading-tight mt-0.5 transition-colors duration-300",
                  scrolled
                    ? "text-[#B38E2A]"
                    : "text-[#B38E2A] lg:text-amber-300/90"
                )}
              >
                Tinubu Legacy Archive
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav
            className="hidden lg:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                    scrolled
                      ? isActive
                        ? "text-[#006B3C] font-bold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      : isActive
                        ? "text-white font-bold"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={cn(
                        "absolute bottom-0 left-3 right-3 h-0.5 rounded-full",
                        scrolled ? "bg-[#006B3C]" : "bg-white"
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right side controls ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Explore Archive CTA Button — Desktop */}
            <Link
              to="/projects"
              className={cn(
                "hidden lg:inline-flex items-center rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-px",
                scrolled
                  ? "border-[#006B3C] text-[#006B3C] hover:bg-[#006B3C] hover:text-white shadow-xs"
                  : "border-white text-white hover:bg-white hover:text-[#006B3C]"
              )}
            >
              Explore Archive
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={cn(
                "flex items-center justify-center rounded-xl p-2 transition-colors duration-200 lg:hidden touch-manipulation",
                scrolled
                  ? "text-slate-800 hover:bg-gray-100 active:bg-gray-200"
                  : "text-slate-800 lg:text-white hover:bg-gray-100 lg:hover:bg-white/10 active:bg-gray-200"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="h-6 w-6 text-slate-800" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="h-6 w-6 text-slate-800" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer + Backdrop ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#006B3C]">
                    <Landmark className="h-5 w-5 text-[#C59B27]" />
                  </div>
                  <div>
                    <p className="text-base font-black text-[#006B3C]">
                      {APP_SHORT_NAME}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#B38E2A]">
                      Tinubu Legacy Archive
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-3 py-4" role="navigation">
                <ul className="space-y-1">
                  {NAV_LINKS.map((item, i) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-150",
                            isActive
                              ? "bg-emerald-50 text-[#006B3C] font-bold"
                              : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                          )}
                        >
                          {isActive && (
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#006B3C] shrink-0" />
                          )}
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer CTA */}
              <div className="border-t border-gray-100 p-4">
                <Link
                  to="/projects"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-[#006B3C] px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#005530] active:bg-[#004225] transition-colors"
                >
                  Explore Archive
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
