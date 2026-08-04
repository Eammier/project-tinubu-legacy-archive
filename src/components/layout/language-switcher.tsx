
import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const [current, setCurrent] = useState("en");
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors hover:bg-black/5 inherit-color"
        aria-label="Change language"
        style={{ color: "inherit" }}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">
          {LANGUAGES.find((l) => l.code === current)?.label}
        </span>
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl glass-card p-1.5 premium-shadow">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrent(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                  current === lang.code && "bg-accent text-accent-foreground"
                )}
              >
                {lang.label}
                {current === lang.code && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
