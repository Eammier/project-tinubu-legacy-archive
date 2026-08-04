import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NIGERIAN_STATES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const createIcon = (completion: number, isSelected: boolean) => {
  const color =
    completion >= 70 ? "#006B3C" : completion >= 50 ? "#D97706" : "#DC2626";
  const size = isSelected ? 34 : 26;
  const shadow = isSelected ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.2)";
  
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: 3.5px solid white;
      border-radius: 50%;
      box-shadow: 0 4px 12px ${shadow};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    ">
      ${isSelected ? `<div style="width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 1.5s infinite;"></div>` : ""}
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

function MapController({
  selectedState,
}: {
  selectedState: (typeof NIGERIAN_STATES)[number] | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedState) {
      map.flyTo([selectedState.lat, selectedState.lng], 7.5, { duration: 1.2 });
    }
  }, [selectedState, map]);

  return null;
}

interface NigeriaMapProps {
  selectedState: (typeof NIGERIAN_STATES)[number] | null;
  onStateSelect: (state: (typeof NIGERIAN_STATES)[number]) => void;
}

export function NigeriaMap({ selectedState, onStateSelect }: NigeriaMapProps) {
  const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
  const attribution = '&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  return (
    <div className="relative overflow-hidden rounded-xl border border-border">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
      `}} />
      <MapContainer
        center={[9.082, 8.6753]}
        zoom={6}
        className="h-[500px] w-full"
        scrollWheelZoom={true}
      >
        <TileLayer attribution={attribution} url={tileUrl} />
        <MapController selectedState={selectedState} />
        {NIGERIAN_STATES.map((state) => {
          const isSelected = selectedState?.code === state.code;
          return (
            <Marker
              key={state.code}
              position={[state.lat, state.lng]}
              icon={createIcon(state.completion, isSelected)}
              eventHandlers={{
                click: () => onStateSelect(state),
              }}
            >
              <Popup>
                <div className="p-1 min-w-[150px]">
                  <p className="font-bold text-sm text-foreground">{state.name} State</p>
                  <div className="mt-2 space-y-1 text-xs text-muted-foreground border-t pt-1.5 border-border">
                    <div className="flex justify-between">
                      <span>Projects:</span>
                      <span className="font-semibold text-foreground">{state.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Budget:</span>
                      <span className="font-semibold text-foreground">{formatCurrency(state.budget)}</span>
                    </div>
                    <div className="flex justify-between text-primary font-medium mt-1">
                      <span>Completion:</span>
                      <span>{state.completion}%</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
