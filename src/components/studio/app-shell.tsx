"use client";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CreateProjectDialog } from "@/components/studio/create-project-dialog";
import { Sidebar } from "@/components/studio/sidebar";
import { useStudioUI } from "@/lib/studio-ui-context";

function SidebarFallback() {
  return (
    <div className="flex h-full w-full flex-col bg-[#F7F7F8] p-5">
      <div className="mb-6 h-9 w-40 rounded-xl bg-black/5" />
      <div className="mb-5 h-10 rounded-xl bg-black/5" />
      <div className="h-10 rounded-xl bg-white/80 ring-1 ring-black/5" />
    </div>
  );
}

function AppShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { createProjectOpen, openCreateProject, setCreateProjectOpen } =
    useStudioUI();

  const isProjectRoute = pathname.startsWith("/project/");

  if (isProjectRoute) {
    return (
      <>
        {children}
        <CreateProjectDialog
          open={createProjectOpen}
          onOpenChange={setCreateProjectOpen}
        />
      </>
    );
  }

  return (
    <div className="flex min-h-dvh bg-[#F2F2F7]">
      <div className="hidden w-[260px] shrink-0 border-r border-black/5 lg:block">
        <div className="sticky top-0 h-dvh">
          <Suspense fallback={<SidebarFallback />}>
            <Sidebar onCreateProject={openCreateProject} />
          </Suspense>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-black/5 bg-[#F2F2F7]/80 px-4 backdrop-blur-xl lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
          <p className="text-[15px] font-semibold tracking-tight">
            Storyline Studio
          </p>
        </header>

        <main className="flex-1">{children}</main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-[280px] border-r border-black/5 bg-[#F7F7F8] p-0"
          showCloseButton={false}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <Suspense fallback={<SidebarFallback />}>
            <Sidebar
              onCreateProject={() => {
                setMobileOpen(false);
                openCreateProject();
              }}
              onNavigate={() => setMobileOpen(false)}
            />
          </Suspense>
        </SheetContent>
      </Sheet>

      <CreateProjectDialog
        open={createProjectOpen}
        onOpenChange={setCreateProjectOpen}
      />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={<div className="min-h-dvh bg-[#F2F2F7]">{children}</div>}
    >
      <AppShellInner>{children}</AppShellInner>
    </Suspense>
  );
}
