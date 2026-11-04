"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  initialName: string;
  onSave: (name: string) => void;
}

export function RenameDialog({
  open,
  onOpenChange,
  title,
  description,
  initialName,
  onSave,
}: RenameDialogProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (open) setName(initialName);
  }, [open, initialName]);

  function handleSave() {
    if (!name.trim()) return;
    onSave(name.trim());
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 rounded-2xl border-0 p-0 sm:max-w-md">
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-xl font-semibold tracking-tight">
            {title}
          </DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="space-y-2 px-5 py-5">
          <Label htmlFor="rename-field">Name</Label>
          <Input
            id="rename-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl text-[15px]"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
          />
        </div>

        <DialogFooter className="mx-0 mb-0 gap-2 rounded-b-2xl border-t border-black/5 bg-[#F7F7F8] px-5 py-4 sm:justify-end">
          <Button
            variant="ghost"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl"
            disabled={!name.trim()}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
