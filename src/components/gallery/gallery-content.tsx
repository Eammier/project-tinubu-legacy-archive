
import { useState } from "react";
import { Search, Camera, Video, FileText, Plane, ArrowLeftRight } from "lucide-react";
import { MOCK_PROJECTS } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/animations/fade-in";

const categories = [
  { id: "all", label: "All", icon: Camera },
  { id: "photos", label: "Photos", icon: Camera },
  { id: "videos", label: "Videos", icon: Video },
  { id: "drone", label: "Drone", icon: Plane },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "before-after", label: "Before & After", icon: ArrowLeftRight },
];

export function GalleryContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const mediaItems = MOCK_PROJECTS.flatMap((p, i) => [
    {
      id: `${p.id}-photo`,
      type: "photos" as const,
      title: p.title,
      url: p.imageUrl,
      projectTitle: p.title,
      sector: p.sector,
      state: p.state,
      span: i % 5 === 0 ? "col-span-2 row-span-2" : "",
    },
  ]);

  const filtered = mediaItems.filter(
    (item) =>
      (category === "all" || item.type === category) &&
      (!search || item.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Media Gallery</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Visual Archive</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Photos, videos, drone footage, and documents from verified government projects.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </FadeIn>

      <StaggerChildren className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px]">
        {filtered.map((item) => (
          <StaggerItem key={item.id} className={item.span}>
            <div className="group relative h-full overflow-hidden rounded-2xl cursor-pointer">
              <img
                src={item.url}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium text-white line-clamp-1">{item.title}</p>
                <p className="text-xs text-white/70">{item.state}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </div>
  );
}

export { GalleryContent as GalleryPageContent };

