"use client";

import { useEffect, useState } from "react";
import { formatAbsoluteDate, formatRelativeDate } from "@/lib/format";

export function RelativeTime({ iso }: { iso: string }) {
  const [label, setLabel] = useState(() => formatAbsoluteDate(iso));

  useEffect(() => {
    setLabel(formatRelativeDate(iso));
  }, [iso]);

  return <span>{label}</span>;
}
