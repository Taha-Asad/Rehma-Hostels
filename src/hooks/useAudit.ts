// app/hooks/useAudit.ts
"use client";

import { useState, useTransition } from "react";
import { AuditData } from "../../types/analytics";
import { runCustomAudit } from "@/actions/dashboard/audit.action";

export const useAudit = () => {
  const [data, setData] = useState<AuditData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const runAudit = async (url: string) => {
    startTransition(async () => {
      setError(null);
      const result = await runCustomAudit(url);

      if (result.success) {
        setData(result.data!);
      } else {
        setError(result.error || "Audit failed");
      }
    });
  };

  return {
    data,
    error,
    loading: isPending,
    runAudit,
  };
};
