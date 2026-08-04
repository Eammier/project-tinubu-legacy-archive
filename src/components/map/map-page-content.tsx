import { useState } from "react";
import { NIGERIAN_STATES } from "@/lib/constants";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { NigeriaMap } from "@/components/map/nigeria-map";

export function MapPageContent() {
  const [selectedState, setSelectedState] = useState<
    (typeof NIGERIAN_STATES)[number] | null
  >(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
      <FadeIn>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Interactive Map
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Nigeria Project Map
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Click any state to explore projects, budgets, completion rates, and
            impact metrics.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-3">
        <FadeIn className="lg:col-span-2" delay={0.1}>
          <Card className="overflow-hidden p-2 border-border bg-card">
            <NigeriaMap
              selectedState={selectedState}
              onStateSelect={setSelectedState}
            />
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="space-y-4">
            {selectedState ? (
              <Card className="p-6 border-border bg-card">
                <h2 className="text-2xl font-bold">{selectedState.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  State Code: {selectedState.code}
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Projects</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(selectedState.projects)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(selectedState.budget)}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">
                        {selectedState.completion}%
                      </span>
                    </div>
                    <Progress value={selectedState.completion} />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 border-border bg-card">
                <h3 className="font-semibold">Select a State</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Click on any marker on the map to view detailed project
                  information for that state.
                </p>
              </Card>
            )}

            <Card className="p-6 border-border bg-card">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total States</span>
                  <span className="font-medium">37</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Projects</span>
                  <span className="font-medium">4,827</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">National Budget</span>
                  <span className="font-medium">₦2.45T</span>
                </div>
              </div>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
