"use client";

import Link from "next/link";
import { Folder, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RelativeTime } from "@/components/studio/relative-time";
import { PROJECT_COLORS, type Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onRename: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectCard({ project, onRename, onDelete }: ProjectCardProps) {
  const color = PROJECT_COLORS[project.color];
  const designCount = project.designs.length;

  return (
    <div className="group relative">
      <Link
        href={`/project/${project.id}`}
        className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/[0.04] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99]"
      >
        <div
          className={cn(
            "mb-4 flex aspect-[4/3] items-center justify-center rounded-xl",
            color.soft
          )}
        >
          <Folder
            className={cn("size-14", color.icon)}
            strokeWidth={1.25}
            fill="currentColor"
            fillOpacity={0.12}
          />
        </div>

        <div className="pr-8">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-foreground">
            {project.name}
          </h3>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {designCount === 0
              ? "Empty folder"
              : `${designCount} design${designCount === 1 ? "" : "s"}`}
            <span className="mx-1.5 text-black/20">·</span>
            <RelativeTime iso={project.updatedAt} />
          </p>
        </div>
      </Link>

      <div className="absolute top-3 right-3 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-lg bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur"
              />
            }
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Project actions</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 rounded-xl">
            <DropdownMenuItem
              className="rounded-lg"
              onClick={() => onRename(project)}
            >
              <Pencil className="size-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="rounded-lg"
              onClick={() => onDelete(project)}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
