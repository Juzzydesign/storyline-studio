"use client";

import { useMemo, useState } from "react";
import { FolderPlus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/studio/project-card";
import { RenameDialog } from "@/components/studio/rename-dialog";
import { useProjects } from "@/lib/projects-context";
import { useStudioUI } from "@/lib/studio-ui-context";
import type { Project } from "@/lib/types";

export function LibraryView() {
  const { projects, ready, updateProject, deleteProject } = useProjects();
  const { openCreateProject } = useStudioUI();
  const [query, setQuery] = useState("");
  const [renaming, setRenaming] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [projects, query]);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 lg:py-12">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            Creative hub
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Library
          </h1>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Organize Storyline Design YouTube assets into project folders.
          </p>
        </div>

        <Button
          className="h-11 rounded-xl px-4"
          onClick={openCreateProject}
        >
          <FolderPlus data-icon="inline-start" />
          New Project
        </Button>
      </div>

      <div className="relative mb-8 max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects"
          className="h-11 rounded-xl bg-white pl-10 text-[15px] shadow-sm ring-1 ring-black/[0.04] border-transparent"
        />
      </div>

      {!ready ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-56 animate-pulse rounded-2xl bg-white/70 ring-1 ring-black/[0.04]"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-20 text-center shadow-sm ring-1 ring-black/[0.04]">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#F2F2F7]">
            <FolderPlus className="size-6 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight">
            {query ? "No matching projects" : "No projects yet"}
          </h2>
          <p className="mt-2 max-w-sm text-[15px] text-muted-foreground">
            {query
              ? "Try a different search term."
              : "Create a project folder to start collecting designs for your next video."}
          </p>
          {!query ? (
            <Button
              className="mt-6 h-11 rounded-xl"
              onClick={openCreateProject}
            >
              <FolderPlus data-icon="inline-start" />
              Create your first project
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onRename={setRenaming}
              onDelete={(p) => {
                if (
                  window.confirm(
                    `Delete “${p.name}”? This removes all designs in the folder.`
                  )
                ) {
                  deleteProject(p.id);
                }
              }}
            />
          ))}
        </div>
      )}

      <RenameDialog
        open={!!renaming}
        onOpenChange={(open) => {
          if (!open) setRenaming(null);
        }}
        title="Rename Project"
        initialName={renaming?.name ?? ""}
        onSave={(name) => {
          if (renaming) updateProject(renaming.id, { name });
        }}
      />
    </div>
  );
}
