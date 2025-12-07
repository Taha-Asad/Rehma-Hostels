// app/hooks/useAudit.ts
"use client";

import { useState, useTransition } from "react";
import { AuditData } from "../../types/analytics";
import { runCustomAudit } from "@/actions/dashboard/audit.action";

export const useAudit = () => {
  const [data, setData] = useState<AuditData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending] = useTransition();

  const runAudit = async (url: string) => {
    setError(null);
    try {
      const result = await runCustomAudit(url);

      if (result.success) {
        setData(result.data!);
      } else {
        setError(result.error || "Audit failed");
      }
    } catch (err) {
      setError("Audit failed: " + (err as Error).message);
    }
  };

  return {
    data,
    error,
    loading: isPending,
    runAudit,
  };
};
