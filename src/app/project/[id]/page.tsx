import { Suspense } from "react";
import { ProjectView } from "@/components/studio/project-view";

function ProjectFallback() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
      <div className="h-10 w-48 animate-pulse rounded-xl bg-white/70" />
      <div className="mt-8 h-64 animate-pulse rounded-3xl bg-white/70" />
    </div>
  );
}

async function ProjectPageContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProjectView projectId={id} />;
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectPageContent params={params} />
    </Suspense>
  );
}
