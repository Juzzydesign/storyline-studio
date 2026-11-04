"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ProjectsProvider } from "@/lib/projects-context";
import { StudioUIProvider } from "@/lib/studio-ui-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <ProjectsProvider>
        <StudioUIProvider>{children}</StudioUIProvider>
      </ProjectsProvider>
    </TooltipProvider>
  );
}
