import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import LoadingScreen from "@/components/ui/loading-screen";
import CustomCursor from "@/components/ui/custom-cursor";
import ScrollIndicator from "@/components/ui/scroll-indicator";
import ThemeSwitcher from "@/components/ui/theme-switcher";
import VoiceNavigation from "@/components/ui/voice-navigation";
import ChatbotWidget from "@/components/ui/chatbot-widget";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Global UI Components */}
        <LoadingScreen />
        <CustomCursor />
        <ScrollIndicator />
        <ThemeSwitcher />
        <VoiceNavigation />
        <ChatbotWidget />
        
        {/* Main Application */}
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
