import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Building2, Briefcase, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { NIGERIAN_STATES } from "@/lib/constants";

const typeIcons = {
  project: FolderOpen,
  state: MapPin,
  ministry: Building2,
  contractor: Briefcase,
};

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<
    { id: string; type: keyof typeof typeIcons; title: string; subtitle: string; href: string }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const projectResults = MOCK_PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.ministry.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q)
    )
      .slice(0, 4)
      .map((p) => ({
        id: p.id,
        type: "project" as const,
        title: p.title,
        subtitle: `${p.state} · ${p.sector}`,
        href: `/projects/${p.slug}`,
      }));

    const stateResults = NIGERIAN_STATES.filter((s) =>
      s.name.toLowerCase().includes(q)
    )
      .slice(0, 3)
      .map((s) => ({
        id: s.code,
        type: "state" as const,
        title: s.name,
        subtitle: `${s.projects} projects`,
        href: `/map?state=${s.name}`,
      }));

    setResults([...projectResults, ...stateResults]);
  }, [query]);

  const handleSelect = (href: string) => {
    navigate(href);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder="Search projects, states, ministries..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-10 pr-20 md:w-72"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 select-none items-center gap-1 rounded-md border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      {open && (query || results.length > 0) && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-2 w-full min-w-[320px] rounded-2xl glass-panel p-2 shadow-xl md:w-96">
            {results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {results.map((result) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSelect(result.href)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-accent"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{result.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {result.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : query ? (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found for &ldquo;{query}&rdquo;
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
