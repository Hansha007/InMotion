import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { getAnalyticsData } from "../../data/analyticsData";

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ children }) {
  const [timeRange, setTimeRange] = useState("7days");
  const [customDates, setCustomDates] = useState({
    startDate: "2026-03-01",
    endDate: "2026-03-05"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Compute analytics data dynamically based on timeRange
  const analyticsData = useMemo(() => {
    return getAnalyticsData(timeRange);
  }, [timeRange]);

  // Simulate smooth data fetch transition on filter change
  const handleTimeRangeChange = (newRange) => {
    if (newRange === timeRange) return;
    setIsLoading(true);
    setTimeRange(newRange);
    setTimeout(() => {
      setIsLoading(false);
    }, 240);
  };

  const handleApplyCustomDates = (dates) => {
    setCustomDates(dates);
    setIsLoading(true);
    setTimeRange("custom");
    setTimeout(() => {
      setIsLoading(false);
    }, 240);
  };

  const retryLoad = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const value = {
    timeRange,
    setTimeRange: handleTimeRangeChange,
    customDates,
    applyCustomDates: handleApplyCustomDates,
    data: analyticsData,
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    retryLoad
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
