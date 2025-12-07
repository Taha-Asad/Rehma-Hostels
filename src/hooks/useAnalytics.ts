// app/hooks/useAnalytics.ts
"use client";

import { useState, useEffect, useCallback, useTransition } from "react";
import { AnalyticsState } from "../../types/analytics";
import {
  getAnalyticsData,
  getTopPages,
  getRealTimeData,
} from "@/actions/dashboard/analytics.action";
import { getAuditData } from "@/actions/dashboard/audit.action";

export const useAnalytics = (refreshInterval = 30000) => {
  const [state, setState] = useState<AnalyticsState>({
    data: null,
    topPages: [],
    realTime: null,
    audit: null,
    loading: true,
    error: null,
  });

  const [isPending, startTransition] = useTransition();

  const fetchAllData = useCallback(async () => {
    startTransition(async () => {
      try {
        const [analyticsResult, topPagesResult, realTimeResult, auditResult] =
          await Promise.all([
            getAnalyticsData(),
            getTopPages(),
            getRealTimeData(),
            getAuditData(),
          ]);

        setState({
          data: analyticsResult.success ? analyticsResult.data! : null,
          topPages: topPagesResult.success ? topPagesResult.data! : [],
          realTime: realTimeResult.success ? realTimeResult.data! : null,
          audit: auditResult.success ? auditResult.data! : null,
          loading: false,
          error:
            analyticsResult.error ||
            topPagesResult.error ||
            realTimeResult.error ||
            null,
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to fetch analytics data",
        }));
      }
    });
  }, []);

  useEffect(() => {
    fetchAllData();

    const interval = setInterval(fetchAllData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchAllData, refreshInterval]);

  return {
    ...state,
    isPending,
    refetch: fetchAllData,
  };
};
