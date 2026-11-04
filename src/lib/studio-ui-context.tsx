"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface StudioUIContextValue {
  createProjectOpen: boolean;
  openCreateProject: () => void;
  setCreateProjectOpen: (open: boolean) => void;
}

const StudioUIContext = createContext<StudioUIContextValue | null>(null);

export function StudioUIProvider({ children }: { children: ReactNode }) {
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const openCreateProject = useCallback(() => {
    setCreateProjectOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      createProjectOpen,
      openCreateProject,
      setCreateProjectOpen,
    }),
    [createProjectOpen, openCreateProject]
  );

  return (
    <StudioUIContext.Provider value={value}>{children}</StudioUIContext.Provider>
  );
}

export function useStudioUI() {
  const ctx = useContext(StudioUIContext);
  if (!ctx) {
    throw new Error("useStudioUI must be used within StudioUIProvider");
  }
  return ctx;
}
