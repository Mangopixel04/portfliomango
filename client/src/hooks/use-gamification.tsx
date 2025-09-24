import { useCallback, useEffect, useRef } from 'react';
import { useGameContext } from '../contexts/GameContext';
import { InteractionStats } from '../lib/types/gamification';

// Main gamification hook for components
export function useGamification() {
  const context = useGameContext();
  
  return {
    // State accessors
    gameState: context.gameState,
    progress: context.progress,
    achievements: context.gameState.achievements,
    unlockedAchievements: context.getUnlockedAchievements(),
    totalPoints: context.getTotalPoints(),
    currentLevel: context.getCurrentLevel(),
    experienceProgress: context.getExperienceProgress(),
    visitorStats: context.gameState.visitorStats,
    sectionProgress: context.gameState.sectionProgress,
    interactionStats: context.gameState.interactionStats,
    
    // Actions
    trackSectionVisit: context.trackSectionVisit,
    trackInteraction: context.trackInteraction,
    trackTimeSpent: context.trackTimeSpent,
    trackProjectView: context.trackProjectView,
    trackFormSubmission: context.trackFormSubmission,
    unlockAchievement: context.unlockAchievement,
    resetProgress: context.resetProgress,
    
    // Helpers
    isAchievementUnlocked: context.isAchievementUnlocked,
    isFirstTimeUser: context.gameState.isFirstTimeUser,
    
    // Event dispatcher for custom events
    dispatchGameEvent: context.dispatchGameEvent
  };
}

// Hook for tracking section visibility and time spent
export function useSectionTracking(sectionId: string, sectionName: string) {
  const { trackSectionVisit, trackTimeSpent } = useGamification();
  const startTimeRef = useRef<number | null>(null);
  const hasTrackedVisitRef = useRef(false);

  // Track section visit when component mounts or becomes visible
  const trackVisit = useCallback(() => {
    if (!hasTrackedVisitRef.current) {
      trackSectionVisit(sectionId, sectionName);
      hasTrackedVisitRef.current = true;
      startTimeRef.current = Date.now();
    }
  }, [sectionId, sectionName, trackSectionVisit]);

  // Track time spent when component unmounts or becomes invisible
  const trackTime = useCallback(() => {
    if (startTimeRef.current) {
      const timeSpent = (Date.now() - startTimeRef.current) / 1000; // Convert to seconds
      if (timeSpent > 1) { // Only track if spent more than 1 second
        trackTimeSpent(sectionId, timeSpent);
      }
      startTimeRef.current = null;
    }
  }, [sectionId, trackTimeSpent]);

  // Set up intersection observer for automatic tracking
  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackVisit();
          } else {
            trackTime();
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      trackTime(); // Track time when component unmounts
    };
  }, [sectionId, trackVisit, trackTime]);

  return { trackVisit, trackTime };
}

// Hook for tracking interactions on interactive elements
export function useInteractionTracking() {
  const { trackInteraction } = useGamification();

  const trackClick = useCallback((type: 'button' | 'link' = 'button') => {
    const statType = type === 'button' ? 'buttonClicks' : 'linkClicks';
    trackInteraction(statType as keyof InteractionStats);
  }, [trackInteraction]);

  const trackHover = useCallback((type: 'skill' | 'magnetic' = 'skill') => {
    const statType = type === 'skill' ? 'skillHovers' : 'magneticInteractions';
    trackInteraction(statType as keyof InteractionStats);
  }, [trackInteraction]);

  const trackScroll = useCallback((depth: number) => {
    // Update scroll depth if it's the deepest scroll so far
    trackInteraction('scrollDepth', Math.round(depth));
  }, [trackInteraction]);

  const trackVoiceCommand = useCallback(() => {
    trackInteraction('voiceCommands');
  }, [trackInteraction]);

  return {
    trackClick,
    trackHover,
    trackScroll,
    trackVoiceCommand
  };
}

// Hook for tracking project-specific interactions
export function useProjectTracking() {
  const { trackProjectView } = useGamification();
  const { trackClick: trackInteractionClick } = useInteractionTracking();

  const viewProject = useCallback((projectId: string) => {
    trackProjectView(projectId);
  }, [trackProjectView]);

  const clickProjectDemo = useCallback((projectId: string) => {
    trackInteractionClick('button');
    // Could add project-specific tracking here if needed
  }, [trackInteractionClick]);

  const clickProjectCode = useCallback((projectId: string) => {
    trackInteractionClick('link');
    // Could add project-specific tracking here if needed
  }, [trackInteractionClick]);

  return {
    viewProject,
    clickProjectDemo,
    clickProjectCode
  };
}

// Hook for form tracking
export function useFormTracking() {
  const { trackFormSubmission } = useGamification();
  const { trackClick } = useInteractionTracking();

  const submitForm = useCallback((formType: string) => {
    trackFormSubmission(formType);
    trackClick('button'); // Also count as button click
  }, [trackFormSubmission, trackClick]);

  return { submitForm };
}

// Hook for achievement notifications (can be extended for UI notifications)
export function useAchievementNotifications() {
  const { achievements, unlockedAchievements } = useGamification();
  const previousUnlockedRef = useRef<string[]>([]);

  useEffect(() => {
    const newUnlocks = unlockedAchievements.filter(
      id => !previousUnlockedRef.current.includes(id)
    );

    if (newUnlocks.length > 0) {
      // Here you could trigger notifications, toasts, animations, etc.
      newUnlocks.forEach(achievementId => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          console.log(`🏆 Achievement Unlocked: ${achievement.title} - ${achievement.description}`);
          // You could dispatch a custom event here for UI components to listen to
          window.dispatchEvent(new CustomEvent('achievementUnlocked', {
            detail: achievement
          }));
        }
      });
    }

    previousUnlockedRef.current = unlockedAchievements;
  }, [unlockedAchievements, achievements]);

  return {
    latestUnlocks: unlockedAchievements.slice(-5), // Get the 5 most recent unlocks
    totalUnlocked: unlockedAchievements.length
  };
}

// Hook for progress analytics
export function useProgressAnalytics() {
  const { progress, gameState } = useGamification();

  const analytics = {
    completionRate: progress.overall,
    sectionCompletionRates: progress.sections,
    achievementRate: progress.achievements,
    interactionRate: progress.interactions,
    timeSpentTotal: gameState.visitorStats.totalTimeSpent,
    averageTimePerVisit: gameState.visitorStats.totalVisits > 0 
      ? gameState.visitorStats.totalTimeSpent / gameState.visitorStats.totalVisits 
      : 0,
    mostVisitedSections: gameState.sectionProgress
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 3)
      .map(s => ({ name: s.sectionName, visits: s.visits })),
    engagementScore: Math.round(
      (progress.overall + progress.interactions + (gameState.visitorStats.totalVisits * 10)) / 3
    )
  };

  return analytics;
}

// Development helper hook (should not be used in production)
export function useGamificationDebug() {
  const { resetProgress, unlockAchievement, achievements } = useGamification();

  if (process.env.NODE_ENV !== 'development') {
    console.warn('useGamificationDebug should only be used in development');
    return {};
  }

  const unlockAllAchievements = useCallback(() => {
    achievements.forEach(achievement => {
      if (!achievement.isUnlocked) {
        unlockAchievement(achievement.id);
      }
    });
  }, [achievements, unlockAchievement]);

  return {
    resetProgress,
    unlockAllAchievements,
    unlockSpecificAchievement: unlockAchievement
  };
}