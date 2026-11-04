"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createId, loadProjects, saveProjects } from "@/lib/storage";
import type { Design, Project, ProjectColor } from "@/lib/types";

interface ProjectsContextValue {
  projects: Project[];
  ready: boolean;
  createProject: (input: {
    name: string;
    description?: string;
    color: ProjectColor;
  }) => Project;
  updateProject: (
    id: string,
    patch: Partial<Pick<Project, "name" | "description" | "color">>
  ) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  createDesign: (projectId: string, name?: string) => Design | undefined;
  updateDesign: (
    projectId: string,
    designId: string,
    patch: Partial<Pick<Design, "name">>
  ) => void;
  deleteDesign: (projectId: string, designId: string) => void;
  getDesign: (
    projectId: string,
    designId: string
  ) => { project: Project; design: Design } | undefined;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProjects(loadProjects());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveProjects(projects);
  }, [projects, ready]);

  const createProject = useCallback(
    (input: { name: string; description?: string; color: ProjectColor }) => {
      const now = new Date().toISOString();
      const project: Project = {
        id: createId(),
        name: input.name.trim() || "Untitled Project",
        description: input.description?.trim() || undefined,
        color: input.color,
        createdAt: now,
        updatedAt: now,
        designs: [],
      };
      setProjects((prev) => [project, ...prev]);
      return project;
    },
    []
  );

  const updateProject = useCallback(
    (
      id: string,
      patch: Partial<Pick<Project, "name" | "description" | "color">>
    ) => {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === id
            ? {
                ...project,
                ...patch,
                name: patch.name?.trim() || project.name,
                description:
                  patch.description !== undefined
                    ? patch.description.trim() || undefined
                    : project.description,
                updatedAt: new Date().toISOString(),
              }
            : project
        )
      );
    },
    []
  );

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  }, []);

  const getProject = useCallback(
    (id: string) => projects.find((project) => project.id === id),
    [projects]
  );

  const createDesign = useCallback((projectId: string, name?: string) => {
    const now = new Date().toISOString();
    const design: Design = {
      id: createId(),
      name: name?.trim() || "Untitled Design",
      createdAt: now,
      updatedAt: now,
    };

    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              designs: [design, ...project.designs],
              updatedAt: now,
            }
          : project
      )
    );

    return design;
  }, []);

  const updateDesign = useCallback(
    (
      projectId: string,
      designId: string,
      patch: Partial<Pick<Design, "name">>
    ) => {
      const now = new Date().toISOString();
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                updatedAt: now,
                designs: project.designs.map((design) =>
                  design.id === designId
                    ? {
                        ...design,
                        ...patch,
                        name: patch.name?.trim() || design.name,
                        updatedAt: now,
                      }
                    : design
                ),
              }
            : project
        )
      );
    },
    []
  );

  const deleteDesign = useCallback((projectId: string, designId: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              designs: project.designs.filter((d) => d.id !== designId),
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
  }, []);

  const getDesign = useCallback(
    (projectId: string, designId: string) => {
      const project = projects.find((p) => p.id === projectId);
      if (!project) return undefined;
      const design = project.designs.find((d) => d.id === designId);
      if (!design) return undefined;
      return { project, design };
    },
    [projects]
  );

  const value = useMemo(
    () => ({
      projects,
      ready,
      createProject,
      updateProject,
      deleteProject,
      getProject,
      createDesign,
      updateDesign,
      deleteDesign,
      getDesign,
    }),
    [
      projects,
      ready,
      createProject,
      updateProject,
      deleteProject,
      getProject,
      createDesign,
      updateDesign,
      deleteDesign,
      getDesign,
    ]
  );

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return ctx;
}
