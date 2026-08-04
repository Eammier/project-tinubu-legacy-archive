
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeUrl: string;
  afterUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeUrl,
  afterUrl,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => { if (dragging) updatePosition(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => updatePosition(e.touches[0].clientX);

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden rounded-2xl cursor-col-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (background) */}
      <div className="absolute inset-0">
        <img src={afterUrl} alt={afterLabel} className="h-full w-full object-cover" />
        <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {afterLabel}
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div className="relative h-full" style={{ width: containerRef.current?.offsetWidth ?? 600 }}>
          <img src={beforeUrl} alt={beforeLabel} className="h-full w-full object-cover" />
        </div>
        <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${position}%` }}
      >
        {/* Handle */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl cursor-col-resize z-20"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <ArrowLeftRight className="h-5 w-5 text-gray-700" />
        </div>
      </div>
    </div>
  );
}
