import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { GameState, GameEvent, VisitorStats, SectionProgress, InteractionStats, Progress, Achievement, EXPERIENCE_THRESHOLDS } from '../lib/types/gamification';
import { GameStorage } from '../lib/gamification/storage';
import { updateAchievementProgress, calculateTotalInteractions } from '../lib/gamification/achievements';

// Context type definition
interface GameContextType {
  gameState: GameState;
  progress: Progress;
  dispatchGameEvent: (event: GameEvent) => void;
  trackSectionVisit: (sectionId: string, sectionName: string) => void;
  trackInteraction: (interactionType: keyof InteractionStats, count?: number) => void;
  trackTimeSpent: (sectionId: string, timeSpent: number) => void;
  trackProjectView: (projectId: string) => void;
  trackFormSubmission: (formType: string) => void;
  unlockAchievement: (achievementId: string) => void;
  resetProgress: () => void;
  isAchievementUnlocked: (achievementId: string) => boolean;
  getUnlockedAchievements: () => string[];
  getTotalPoints: () => number;
  getCurrentLevel: () => number;
  getExperienceProgress: () => { current: number; needed: number; percentage: number };
}

// Game state reducer
type GameAction = 
  | { type: 'LOAD_STATE'; payload: GameState }
  | { type: 'UPDATE_VISITOR_STATS'; payload: Partial<VisitorStats> }
  | { type: 'UPDATE_SECTION_PROGRESS'; payload: { sectionId: string; sectionName: string; timeSpent?: number; interaction?: boolean } }
  | { type: 'UPDATE_INTERACTION_STATS'; payload: { type: keyof InteractionStats; count: number } }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: { achievementId: string } }
  | { type: 'UPDATE_ACHIEVEMENTS'; payload: { achievements: Achievement[] } }
  | { type: 'RECALCULATE_PROGRESS' }
  | { type: 'RESET_STATE' };

function gameStateReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload;

    case 'UPDATE_VISITOR_STATS':
      return {
        ...state,
        visitorStats: { ...state.visitorStats, ...action.payload }
      };

    case 'UPDATE_SECTION_PROGRESS': {
      const { sectionId, sectionName, timeSpent = 0, interaction = false } = action.payload;
      const existingSection = state.sectionProgress.find(s => s.sectionId === sectionId);
      const now = new Date();

      let updatedSectionProgress: SectionProgress[];

      if (existingSection) {
        updatedSectionProgress = state.sectionProgress.map(section =>
          section.sectionId === sectionId
            ? {
                ...section,
                visits: section.visits + 1,
                timeSpent: section.timeSpent + timeSpent,
                lastVisited: now,
                interactions: interaction ? section.interactions + 1 : section.interactions
              }
            : section
        );
      } else {
        const newSection: SectionProgress = {
          sectionId,
          sectionName,
          visits: 1,
          timeSpent,
          lastVisited: now,
          interactions: interaction ? 1 : 0,
          completed: false
        };
        updatedSectionProgress = [...state.sectionProgress, newSection];
      }

      return { ...state, sectionProgress: updatedSectionProgress };
    }

    case 'UPDATE_INTERACTION_STATS': {
      const { type, count } = action.payload;
      return {
        ...state,
        interactionStats: {
          ...state.interactionStats,
          [type]: state.interactionStats[type] + count
        }
      };
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const { achievementId } = action.payload;
      const achievement = state.achievements.find(a => a.id === achievementId);
      
      if (!achievement || achievement.isUnlocked) {
        return state;
      }

      const updatedAchievements = state.achievements.map(a =>
        a.id === achievementId
          ? { ...a, isUnlocked: true, unlockedAt: new Date() }
          : a
      );

      const newTotalPoints = state.totalPoints + achievement.points;
      const newExperiencePoints = state.experiencePoints + achievement.points;
      
      // Calculate new level
      let newLevel = state.level;
      let experienceToNextLevel = state.experienceToNextLevel;
      
      if (newLevel < EXPERIENCE_THRESHOLDS.length) {
        while (newLevel < EXPERIENCE_THRESHOLDS.length && newExperiencePoints >= EXPERIENCE_THRESHOLDS[newLevel]) {
          newLevel++;
        }
        experienceToNextLevel = newLevel < EXPERIENCE_THRESHOLDS.length 
          ? EXPERIENCE_THRESHOLDS[newLevel] - newExperiencePoints
          : 0;
      }

      // Dispatch custom event for achievement notification system
      const unlockedAchievement = { ...achievement, isUnlocked: true, unlockedAt: new Date() };
      window.dispatchEvent(new CustomEvent('achievementUnlocked', { 
        detail: unlockedAchievement 
      }));

      return {
        ...state,
        achievements: updatedAchievements,
        unlockedAchievements: [...state.unlockedAchievements, achievementId],
        totalPoints: newTotalPoints,
        experiencePoints: newExperiencePoints,
        level: newLevel,
        experienceToNextLevel
      };
    }

    case 'UPDATE_ACHIEVEMENTS': {
      const { achievements } = action.payload;
      
      // Find newly unlocked achievements
      const newlyUnlocked = achievements.filter(achievement => 
        achievement.isUnlocked && !state.unlockedAchievements.includes(achievement.id)
      );

      // If there are newly unlocked achievements, update points and levels
      if (newlyUnlocked.length > 0) {
        const pointsToAdd = newlyUnlocked.reduce((total, achievement) => total + achievement.points, 0);
        const newTotalPoints = state.totalPoints + pointsToAdd;
        const newExperiencePoints = state.experiencePoints + pointsToAdd;
        
        // Calculate new level
        let newLevel = state.level;
        let experienceToNextLevel = state.experienceToNextLevel;
        
        if (newLevel < EXPERIENCE_THRESHOLDS.length) {
          while (newLevel < EXPERIENCE_THRESHOLDS.length && newExperiencePoints >= EXPERIENCE_THRESHOLDS[newLevel]) {
            newLevel++;
          }
          experienceToNextLevel = newLevel < EXPERIENCE_THRESHOLDS.length 
            ? EXPERIENCE_THRESHOLDS[newLevel] - newExperiencePoints
            : 0;
        }

        const newUnlockedAchievements = [
          ...state.unlockedAchievements,
          ...newlyUnlocked.map(a => a.id)
        ];

        // Dispatch custom events for newly unlocked achievements
        newlyUnlocked.forEach(achievement => {
          window.dispatchEvent(new CustomEvent('achievementUnlocked', {
            detail: achievement
          }));
        });

        return {
          ...state,
          achievements,
          unlockedAchievements: newUnlockedAchievements,
          totalPoints: newTotalPoints,
          experiencePoints: newExperiencePoints,
          level: newLevel,
          experienceToNextLevel
        };
      }

      // No new unlocks, just update achievements
      return {
        ...state,
        achievements
      };
    }

    case 'RECALCULATE_PROGRESS': {
      // This action is no longer needed since progress is calculated in useMemo
      // Progress is automatically recalculated whenever gameState changes
      // Keeping this for backward compatibility but it's essentially a no-op
      return state;
    }

    case 'RESET_STATE':
      return GameStorage.createInitialGameState();

    default:
      return state;
  }
}

// Create context
const GameContext = createContext<GameContextType | null>(null);

// Context provider component
interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, dispatch] = useReducer(gameStateReducer, GameStorage.createInitialGameState());

  // Initialize state from localStorage on mount
  useEffect(() => {
    const initializeGameState = async () => {
      try {
        // Migrate old data if needed
        GameStorage.migrateDataIfNeeded();

        // Load existing state or create new one
        let loadedState = GameStorage.loadGameState();
        
        if (loadedState) {
          // Update visitor stats for returning visitor
          const updatedVisitorStats = GameStorage.updateVisitorStatsForReturn(loadedState.visitorStats);
          loadedState = { ...loadedState, visitorStats: updatedVisitorStats, isFirstTimeUser: false };
        } else {
          // First time visitor
          loadedState = GameStorage.createInitialGameState();
        }

        dispatch({ type: 'LOAD_STATE', payload: loadedState });
      } catch (error) {
        console.error('Error initializing game state:', error);
        dispatch({ type: 'LOAD_STATE', payload: GameStorage.createInitialGameState() });
      }
    };

    initializeGameState();
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (gameState.visitorStats.totalVisits > 0) {
      GameStorage.saveGameState(gameState);
      GameStorage.saveVisitorStats(gameState.visitorStats);
    }
  }, [gameState]);

  // Check achievements when relevant state changes
  useEffect(() => {
    let updatedAchievements = [...gameState.achievements];
    let hasNewUnlocks = false;

    // Check section visit achievements - track individual sections
    gameState.sectionProgress.forEach(section => {
      updatedAchievements = updateAchievementProgress(
        updatedAchievements,
        'section_visit',
        section.sectionId,
        section.visits
      );
    });

    // Check section count achievements (like section_explorer)
    const visitedSections = gameState.sectionProgress.length;
    updatedAchievements = updateAchievementProgress(
      updatedAchievements,
      'section_visit',
      'all_sections',
      visitedSections
    );

    // Check time-based achievements
    const totalTime = gameState.visitorStats.totalTimeSpent + 
      (Date.now() - gameState.visitorStats.currentSessionStart.getTime()) / 1000;
    updatedAchievements = updateAchievementProgress(
      updatedAchievements,
      'time_spent',
      'total',
      totalTime
    );

    // Check interaction-based achievements - individual interaction types
    Object.entries(gameState.interactionStats).forEach(([type, count]) => {
      updatedAchievements = updateAchievementProgress(
        updatedAchievements,
        'interaction_count',
        type,
        count as number
      );
    });

    // Check total interaction achievements
    const totalInteractions = calculateTotalInteractions(gameState.interactionStats);
    updatedAchievements = updateAchievementProgress(
      updatedAchievements,
      'interaction_count',
      'total_interactions',
      totalInteractions
    );

    // Check visit-based achievements
    updatedAchievements = updateAchievementProgress(
      updatedAchievements,
      'consecutive_visits',
      'total',
      gameState.visitorStats.totalVisits
    );

    // Check for new unlocks
    updatedAchievements.forEach(achievement => {
      if (achievement.isUnlocked && !gameState.unlockedAchievements.includes(achievement.id)) {
        hasNewUnlocks = true;
      }
    });

    // Update achievements if there are changes
    if (hasNewUnlocks) {
      dispatch({ type: 'UPDATE_ACHIEVEMENTS', payload: { achievements: updatedAchievements } });
    }
  }, [gameState.sectionProgress, gameState.interactionStats, gameState.visitorStats]);

  // Calculate current progress
  const progress: Progress = React.useMemo(() => {
    const totalSections = 5;
    const visitedSections = gameState.sectionProgress.length;
    const sectionProgressPercentage = (visitedSections / totalSections) * 100;

    const totalAchievements = gameState.achievements.length;
    const unlockedCount = gameState.achievements.filter(a => a.isUnlocked).length;
    const achievementProgressPercentage = totalAchievements > 0 ? (unlockedCount / totalAchievements) * 100 : 0;

    const totalInteractions = calculateTotalInteractions(gameState.interactionStats);
    const interactionProgressPercentage = Math.min((totalInteractions / 50) * 100, 100);

    const overallProgress = (sectionProgressPercentage + achievementProgressPercentage + interactionProgressPercentage) / 3;

    const sectionProgressMap = gameState.sectionProgress.reduce((acc, section) => {
      acc[section.sectionId] = Math.min((section.visits / 3) * 100, 100); // 3 visits = 100%
      return acc;
    }, {} as { [sectionId: string]: number });

    return {
      overall: Math.round(overallProgress),
      sections: sectionProgressMap,
      achievements: Math.round(achievementProgressPercentage),
      interactions: Math.round(interactionProgressPercentage)
    };
  }, [gameState]);

  // Event dispatcher
  const dispatchGameEvent = useCallback((event: GameEvent) => {
    switch (event.type) {
      case 'SECTION_VISIT':
        dispatch({
          type: 'UPDATE_SECTION_PROGRESS',
          payload: { 
            sectionId: event.payload.sectionId, 
            sectionName: event.payload.sectionName 
          }
        });
        break;

      case 'INTERACTION':
        dispatch({
          type: 'UPDATE_INTERACTION_STATS',
          payload: { 
            type: event.payload.interactionType, 
            count: event.payload.count || 1 
          }
        });
        break;

      case 'TIME_SPENT':
        dispatch({
          type: 'UPDATE_SECTION_PROGRESS',
          payload: { 
            sectionId: event.payload.sectionId,
            sectionName: event.payload.sectionId, // Fallback name
            timeSpent: event.payload.timeSpent 
          }
        });
        break;

      case 'PROJECT_VIEW':
        dispatch({
          type: 'UPDATE_INTERACTION_STATS',
          payload: { type: 'projectViews', count: 1 }
        });
        break;

      case 'FORM_SUBMIT':
        dispatch({
          type: 'UPDATE_INTERACTION_STATS',
          payload: { type: 'formSubmissions', count: 1 }
        });
        break;

      case 'ACHIEVEMENT_UNLOCK':
        dispatch({
          type: 'UNLOCK_ACHIEVEMENT',
          payload: { achievementId: event.payload.achievementId }
        });
        break;
    }
  }, []);

  // Convenience methods
  const trackSectionVisit = useCallback((sectionId: string, sectionName: string) => {
    dispatchGameEvent({ type: 'SECTION_VISIT', payload: { sectionId, sectionName } });
  }, [dispatchGameEvent]);

  const trackInteraction = useCallback((interactionType: keyof InteractionStats, count = 1) => {
    dispatchGameEvent({ type: 'INTERACTION', payload: { interactionType, count } });
  }, [dispatchGameEvent]);

  const trackTimeSpent = useCallback((sectionId: string, timeSpent: number) => {
    dispatchGameEvent({ type: 'TIME_SPENT', payload: { sectionId, timeSpent } });
  }, [dispatchGameEvent]);

  const trackProjectView = useCallback((projectId: string) => {
    dispatchGameEvent({ type: 'PROJECT_VIEW', payload: { projectId } });
  }, [dispatchGameEvent]);

  const trackFormSubmission = useCallback((formType: string) => {
    dispatchGameEvent({ type: 'FORM_SUBMIT', payload: { formType } });
  }, [dispatchGameEvent]);

  const unlockAchievement = useCallback((achievementId: string) => {
    dispatchGameEvent({ type: 'ACHIEVEMENT_UNLOCK', payload: { achievementId } });
  }, [dispatchGameEvent]);

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
    GameStorage.clearAllData();
  }, []);

  const isAchievementUnlocked = useCallback((achievementId: string) => {
    return gameState.unlockedAchievements.includes(achievementId);
  }, [gameState.unlockedAchievements]);

  const getUnlockedAchievements = useCallback(() => {
    return gameState.unlockedAchievements;
  }, [gameState.unlockedAchievements]);

  const getTotalPoints = useCallback(() => {
    return gameState.totalPoints;
  }, [gameState.totalPoints]);

  const getCurrentLevel = useCallback(() => {
    return gameState.level;
  }, [gameState.level]);

  const getExperienceProgress = useCallback(() => {
    const current = gameState.experiencePoints;
    const needed = gameState.experienceToNextLevel;
    const total = current + needed;
    const percentage = total > 0 ? (current / total) * 100 : 0;
    
    return { current, needed, percentage };
  }, [gameState.experiencePoints, gameState.experienceToNextLevel]);

  const contextValue: GameContextType = {
    gameState,
    progress,
    dispatchGameEvent,
    trackSectionVisit,
    trackInteraction,
    trackTimeSpent,
    trackProjectView,
    trackFormSubmission,
    unlockAchievement,
    resetProgress,
    isAchievementUnlocked,
    getUnlockedAchievements,
    getTotalPoints,
    getCurrentLevel,
    getExperienceProgress
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the game context
export function useGameContext(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}