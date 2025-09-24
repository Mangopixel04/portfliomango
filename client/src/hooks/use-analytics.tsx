import { useEffect } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";

export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page views when location changes
    trackPageView(location);
  }, [location]);

  return null;
}