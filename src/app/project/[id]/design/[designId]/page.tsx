import { Suspense } from "react";
import { DesignCanvas } from "@/components/studio/design-canvas";

function DesignFallback() {
  return (
    <div className="flex h-[calc(100dvh-3.5rem)] flex-col lg:h-dvh">
      <div className="h-14 border-b border-black/5 bg-white/70" />
      <div className="flex-1 animate-pulse bg-white" />
    </div>
  );
}

async function DesignPageContent({
  params,
}: {
  params: Promise<{ id: string; designId: string }>;
}) {
  const { id, designId } = await params;
  return <DesignCanvas projectId={id} designId={designId} />;
}

export default function DesignPage({
  params,
}: {
  params: Promise<{ id: string; designId: string }>;
}) {
  return (
    <Suspense fallback={<DesignFallback />}>
      <DesignPageContent params={params} />
    </Suspense>
  );
}
