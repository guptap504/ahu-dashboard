import { createFileRoute } from "@tanstack/react-router";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";

import { ahuDeployments } from "../data/ahu-data";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="@container/main flex flex-1 flex-col gap-2 overflow-auto">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={ahuDeployments} />
          </div>
        </div>
      </div>
    </div>
  );
}
