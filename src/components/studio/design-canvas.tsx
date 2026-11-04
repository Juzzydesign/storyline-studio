"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RenameDialog } from "@/components/studio/rename-dialog";
import { useProjects } from "@/lib/projects-context";

interface DesignCanvasProps {
  projectId: string;
  designId: string;
}

export function DesignCanvas({ projectId, designId }: DesignCanvasProps) {
  const router = useRouter();
  const { ready, getDesign, updateDesign, deleteDesign } = useProjects();
  const result = getDesign(projectId, designId);
  const [renaming, setRenaming] = useState(false);

  if (!ready) {
    return (
      <div className="flex h-[calc(100dvh-3.5rem)] flex-col lg:h-dvh">
        <div className="h-14 border-b border-black/5 bg-white/70" />
        <div className="flex-1 animate-pulse bg-white" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center px-5 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Design not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          This page may have been deleted.
        </p>
        <Button
          className="mt-6 rounded-xl"
          render={<Link href={`/project/${projectId}`} />}
        >
          Back to project
        </Button>
      </div>
    );
  }

  const { project, design } = result;

  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col lg:h-dvh">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b border-black/5 bg-white/80 px-3 backdrop-blur-xl sm:px-5">
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-lg lg:hidden"
          render={<Link href={`/project/${projectId}`} />}
        >
          <ArrowLeft className="size-4" />
          <span className="sr-only">Back</span>
        </Button>

        <nav className="hidden min-w-0 items-center gap-1.5 text-sm text-muted-foreground lg:flex">
          <Link href="/" className="hover:text-foreground transition-colors">
            Library
          </Link>
          <ChevronRight className="size-3.5 opacity-50" />
          <Link
            href={`/project/${projectId}`}
            className="truncate hover:text-foreground transition-colors"
          >
            {project.name}
          </Link>
          <ChevronRight className="size-3.5 opacity-50" />
          <span className="truncate text-foreground">{design.name}</span>
        </nav>

        <p className="min-w-0 flex-1 truncate text-[15px] font-medium lg:hidden">
          {design.name}
        </p>

        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="rounded-lg" />
              }
            >
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Design actions</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl">
              <DropdownMenuItem
                className="rounded-lg"
                onClick={() => setRenaming(true)}
              >
                <Pencil className="size-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="rounded-lg"
                onClick={() => {
                  if (window.confirm(`Delete “${design.name}”?`)) {
                    deleteDesign(projectId, designId);
                    router.push(`/project/${projectId}`);
                  }
                }}
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="relative flex-1 overflow-auto bg-[#F2F2F7] p-4 sm:p-8">
        <div
          className="mx-auto flex min-h-full w-full max-w-5xl flex-col rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        >
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
            <div className="mb-5 size-16 rounded-2xl border border-dashed border-black/15 bg-white/80" />
            <h2 className="text-xl font-semibold tracking-tight">
              Blank canvas
            </h2>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              This is your empty design page. Drop in ideas, layouts, and
              assets for {project.name}.
            </p>
          </div>
        </div>
      </div>

      <RenameDialog
        open={renaming}
        onOpenChange={setRenaming}
        title="Rename Design"
        initialName={design.name}
        onSave={(name) => updateDesign(projectId, designId, { name })}
      />
    </div>
  );
}
