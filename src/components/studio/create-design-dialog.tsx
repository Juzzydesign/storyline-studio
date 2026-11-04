"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FilePlus2 } from "lucide-react";
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

interface CreateDesignDialogProps {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDesignDialog({
  projectId,
  open,
  onOpenChange,
}: CreateDesignDialogProps) {
  const router = useRouter();
  const { createDesign } = useProjects();
  const [name, setName] = useState("");
  const pendingHref = useRef<string | null>(null);

  function reset() {
    setName("");
  }

  function createAndQueueNavigation() {
    const design = createDesign(projectId, name || "Untitled Design");
    if (!design) return false;
    pendingHref.current = `/project/${projectId}/design/${design.id}`;
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
            New Design
          </DialogTitle>
          <DialogDescription>
            Start a blank page for a new YouTube asset.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 px-5 py-5">
          <Label htmlFor="design-name">Name</Label>
          <Input
            id="design-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. End screen layout"
            className="h-11 rounded-xl text-[15px]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && createAndQueueNavigation()) {
                handleOpenChange(false);
              }
            }}
          />
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
            render={<Button type="button" className="rounded-xl" />}
            onClick={() => {
              createAndQueueNavigation();
            }}
          >
            <FilePlus2 data-icon="inline-start" />
            Create Design
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
