"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderOpen,
  LayoutGrid,
  Plus,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useProjects } from "@/lib/projects-context";
import { PROJECT_COLORS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onCreateProject: () => void;
  onNavigate?: () => void;
}

export function Sidebar({ onCreateProject, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { projects, ready } = useProjects();
  const recent = projects.slice(0, 6);

  return (
    <aside className="flex h-full w-full flex-col bg-[#F7F7F8]">
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-4">
        <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
          <Sparkles className="size-4" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold tracking-tight">
            Storyline Studio
          </p>
          <p className="truncate text-xs text-muted-foreground">
            YouTube assets
          </p>
        </div>
      </div>

      <div className="px-3">
        <Button
          onClick={onCreateProject}
          className="h-10 w-full justify-start gap-2 rounded-xl bg-foreground text-background hover:bg-foreground/90"
        >
          <Plus className="size-4" />
          New Project
        </Button>
      </div>

      <nav className="mt-5 space-y-1 px-3">
        <Link
          href="/"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors",
            pathname === "/"
              ? "bg-white text-foreground shadow-sm ring-1 ring-black/5"
              : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
          )}
        >
          <LayoutGrid className="size-4" strokeWidth={1.75} />
          Library
        </Link>
      </nav>

      <Separator className="mx-5 my-4 w-auto bg-black/5" />

      <div className="flex items-center justify-between px-5 pb-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Recent
        </p>
      </div>

      <ScrollArea className="flex-1 px-3 pb-4">
        <div className="space-y-0.5">
          {!ready ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">
              No projects yet
            </p>
          ) : (
            recent.map((project) => {
              const active = pathname.startsWith(`/project/${project.id}`);
              return (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] transition-colors",
                    active
                      ? "bg-white text-foreground shadow-sm ring-1 ring-black/5"
                      : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
                  )}
                >
                  <FolderOpen
                    className={cn(
                      "size-4 shrink-0",
                      PROJECT_COLORS[project.color].icon
                    )}
                    strokeWidth={1.75}
                  />
                  <span className="truncate font-medium">{project.name}</span>
                </Link>
              );
            })
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-black/5 px-5 py-4">
        <p className="text-xs text-muted-foreground">
          Private editorial workspace
        </p>
      </div>
    </aside>
  );
}
