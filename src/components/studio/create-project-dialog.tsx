"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjects } from "@/lib/projects-context";
import { PROJECT_COLORS, type ProjectColor } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
}: CreateProjectDialogProps) {
  const router = useRouter();
  const { createProject } = useProjects();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState<ProjectColor>("blue");
  const pendingHref = useRef<string | null>(null);

  function reset() {
    setName("");
    setDescription("");
    setColor("blue");
  }

  function createAndQueueNavigation() {
    if (!name.trim()) return false;
    const project = createProject({ name, description, color });
    pendingHref.current = `/project/${project.id}`;
    return true;
  }

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    if (!next) {
      reset();
      const href = pendingHref.current;
      pendingHref.current = null;
      if (href) router.replace(href);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 rounded-2xl border-0 p-0 sm:max-w-md">
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            New Project
          </DialogTitle>
          <DialogDescription>
            Create a folder for assets you&apos;ll use in a Storyline video.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-5 py-5">
          <div className="space-y-2">
            <Label htmlFor="project-name">Name</Label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Thumbnail System"
              className="h-11 rounded-xl text-[15px]"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && createAndQueueNavigation()) {
                  handleOpenChange(false);
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Input
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional notes"
              className="h-11 rounded-xl text-[15px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2.5">
              {(Object.keys(PROJECT_COLORS) as ProjectColor[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setColor(key)}
                  className={cn(
                    "size-8 rounded-full transition-transform",
                    PROJECT_COLORS[key].bg,
                    color === key
                      ? "scale-110 ring-2 ring-offset-2 ring-foreground/25"
                      : "opacity-80 hover:opacity-100"
                  )}
                  aria-label={PROJECT_COLORS[key].label}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mx-0 mb-0 gap-2 rounded-b-2xl border-t border-black/5 bg-[#F7F7F8] px-5 py-4 sm:justify-end">
          <DialogClose
            render={
              <Button type="button" variant="ghost" className="rounded-xl" />
            }
          >
            Cancel
          </DialogClose>
          <DialogClose
            disabled={!name.trim()}
            render={
              <Button
                type="button"
                className="rounded-xl"
                disabled={!name.trim()}
              />
            }
            onClick={() => {
              createAndQueueNavigation();
            }}
          >
            <FolderPlus data-icon="inline-start" />
            Create Project
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
