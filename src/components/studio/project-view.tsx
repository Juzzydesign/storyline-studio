"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CaseStudy,
  CaseStudyTabs,
  CASE_STUDY_TABS,
} from "@/components/studio/case-study";
import { TextAnimationStudio } from "@/components/studio/text-animation-studio";
import { useProjects } from "@/lib/projects-context";
import type { Project } from "@/lib/types";

interface ProjectViewProps {
  projectId: string;
}

const CANVAS: Record<string, string> = {
  onboarding: "rounded-2xl bg-white ring-black/[0.04]",
  analytics: "rounded-[28px] bg-white ring-black/[0.04]",
  search: "rounded-none bg-[#F4F7FB] ring-[#D7DEE8]",
};

function showsCaseStudy(project: Project) {
  return /case\s*stud/i.test(project.name);
}

function showsTextAnimation(project: Project) {
  return /text\s*animation/i.test(project.name);
}

export function ProjectView({ projectId }: ProjectViewProps) {
  const { ready, getProject } = useProjects();
  const project = getProject(projectId);
  const [activeExampleId, setActiveExampleId] = useState(CASE_STUDY_TABS[0].id);

  if (!ready) {
    return <div className="min-h-dvh bg-[#F2F2F7]" />;
  }

  if (!project) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col items-center justify-center bg-white px-5 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Project not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          This folder may have been deleted.
        </p>
        <Button className="mt-6 rounded-xl" render={<Link href="/" />}>
          Back to Library
        </Button>
      </div>
    );
  }

  const showCaseStudy = showsCaseStudy(project);
  const showTextAnimation = showsTextAnimation(project);
  const canvas = CANVAS[activeExampleId] ?? CANVAS.onboarding;

  return (
    <div className="min-h-dvh bg-[#F2F2F7]">
      <nav className="relative flex items-center px-5 py-4 text-sm text-muted-foreground sm:px-8">
        <div className="flex min-w-0 items-center gap-1.5">
          <Link href="/" className="transition-colors hover:text-foreground">
            Library
          </Link>
          <ChevronRight className="size-3.5 opacity-50" />
          <span className="truncate text-foreground">{project.name}</span>
        </div>

        {showCaseStudy ? (
          <div className="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center">
            <div className="pointer-events-auto">
              <CaseStudyTabs
                activeId={activeExampleId}
                onChange={setActiveExampleId}
              />
            </div>
          </div>
        ) : null}
      </nav>

      {showCaseStudy ? (
        <div className="px-4 pb-16 sm:px-8">
          <div className={`overflow-hidden shadow-sm ring-1 ${canvas}`}>
            <CaseStudy activeId={activeExampleId} />
          </div>
        </div>
      ) : showTextAnimation ? (
        <TextAnimationStudio />
      ) : (
        <div className="min-h-[calc(100dvh-57px)] bg-white" />
      )}
    </div>
  );
}
