import { GameState, VisitorStats, GAME_STATE_STORAGE_KEY, VISITOR_STATS_STORAGE_KEY } from '../types/gamification';
import { createAchievements } from './achievements';

// Utility functions for localStorage persistence
export class GameStorage {
  
  // Custom serializer for dates and sets
  private static serialize(obj: any): string {
    return JSON.stringify(obj, (key, value) => {
      if (value instanceof Date) {
        return { __type: 'Date', value: value.toISOString() };
      }
      if (value instanceof Set) {
        return { __type: 'Set', value: Array.from(value) };
      }
      return value;
    });
  }

  // Custom deserializer for dates and sets
  private static deserialize(str: string): any {
    return JSON.parse(str, (key, value) => {
      if (value && typeof value === 'object' && value.__type) {
        switch (value.__type) {
          case 'Date':
            return new Date(value.value);
          case 'Set':
            return new Set(value.value);
          default:
            return value;
        }
      }
      return value;
    });
  }

  // Save game state to localStorage
  static saveGameState(gameState: GameState): void {
    try {
      const serialized = this.serialize(gameState);
      localStorage.setItem(GAME_STATE_STORAGE_KEY, serialized);
    } catch (error) {
      console.warn('Failed to save game state to localStorage:', error);
    }
  }

  // Load game state from localStorage
  static loadGameState(): GameState | null {
    try {
      const stored = localStorage.getItem(GAME_STATE_STORAGE_KEY);
      if (!stored) return null;
      
      const gameState = this.deserialize(stored);
      
      // Validate the loaded state structure
      if (this.isValidGameState(gameState)) {
        return gameState;
      } else {
        console.warn('Invalid game state structure in localStorage, creating new state');
        localStorage.removeItem(GAME_STATE_STORAGE_KEY);
        return null;
      }
    } catch (error) {
      console.warn('Failed to load game state from localStorage:', error);
      localStorage.removeItem(GAME_STATE_STORAGE_KEY);
      return null;
    }
  }

  // Save visitor stats separately for faster access
  static saveVisitorStats(visitorStats: VisitorStats): void {
    try {
      const serialized = this.serialize(visitorStats);
      localStorage.setItem(VISITOR_STATS_STORAGE_KEY, serialized);
    } catch (error) {
      console.warn('Failed to save visitor stats to localStorage:', error);
    }
  }

  // Load visitor stats from localStorage
  static loadVisitorStats(): VisitorStats | null {
    try {
      const stored = localStorage.getItem(VISITOR_STATS_STORAGE_KEY);
      if (!stored) return null;
      
      const visitorStats = this.deserialize(stored);
      
      if (this.isValidVisitorStats(visitorStats)) {
        return visitorStats;
      } else {
        console.warn('Invalid visitor stats structure in localStorage');
        localStorage.removeItem(VISITOR_STATS_STORAGE_KEY);
        return null;
      }
    } catch (error) {
      console.warn('Failed to load visitor stats from localStorage:', error);
      localStorage.removeItem(VISITOR_STATS_STORAGE_KEY);
      return null;
    }
  }

  // Clear all gamification data
  static clearAllData(): void {
    try {
      localStorage.removeItem(GAME_STATE_STORAGE_KEY);
      localStorage.removeItem(VISITOR_STATS_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to clear gamification data:', error);
    }
  }

  // Validate game state structure
  private static isValidGameState(state: any): state is GameState {
    return (
      state &&
      typeof state === 'object' &&
      // Visitor stats validation
      state.visitorStats &&
      this.isValidVisitorStats(state.visitorStats) &&
      // Arrays validation
      Array.isArray(state.achievements) &&
      Array.isArray(state.sectionProgress) &&
      Array.isArray(state.unlockedAchievements) &&
      // Interaction stats validation
      state.interactionStats &&
      typeof state.interactionStats === 'object' &&
      typeof state.interactionStats.buttonClicks === 'number' &&
      typeof state.interactionStats.linkClicks === 'number' &&
      typeof state.interactionStats.formSubmissions === 'number' &&
      typeof state.interactionStats.skillHovers === 'number' &&
      typeof state.interactionStats.projectViews === 'number' &&
      typeof state.interactionStats.scrollDepth === 'number' &&
      typeof state.interactionStats.magneticInteractions === 'number' &&
      typeof state.interactionStats.voiceCommands === 'number' &&
      // Numeric fields validation
      typeof state.totalPoints === 'number' &&
      typeof state.level === 'number' &&
      typeof state.experiencePoints === 'number' &&
      typeof state.experienceToNextLevel === 'number' &&
      // Boolean validation
      typeof state.isFirstTimeUser === 'boolean' &&
      // Date validation
      state.sessionStartTime instanceof Date
    );
  }

  // Validate visitor stats structure
  private static isValidVisitorStats(stats: any): stats is VisitorStats {
    return (
      stats &&
      typeof stats === 'object' &&
      typeof stats.totalVisits === 'number' &&
      stats.totalVisits >= 0 &&
      stats.firstVisit instanceof Date &&
      stats.lastVisit instanceof Date &&
      typeof stats.totalTimeSpent === 'number' &&
      stats.totalTimeSpent >= 0 &&
      typeof stats.consecutiveVisits === 'number' &&
      stats.consecutiveVisits >= 0 &&
      stats.currentSessionStart instanceof Date &&
      stats.uniqueDaysVisited instanceof Set &&
      typeof stats.returningVisitor === 'boolean'
    );
  }

  // Create initial game state
  static createInitialGameState(): GameState {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    return {
      visitorStats: {
        totalVisits: 1,
        firstVisit: now,
        lastVisit: now,
        totalTimeSpent: 0,
        consecutiveVisits: 1,
        currentSessionStart: now,
        uniqueDaysVisited: new Set([today]),
        returningVisitor: false
      },
      achievements: createAchievements(),
      sectionProgress: [],
      interactionStats: {
        buttonClicks: 0,
        linkClicks: 0,
        formSubmissions: 0,
        skillHovers: 0,
        projectViews: 0,
        scrollDepth: 0,
        magneticInteractions: 0,
        voiceCommands: 0
      },
      totalPoints: 0,
      level: 1,
      experiencePoints: 0,
      experienceToNextLevel: 100,
      unlockedAchievements: [],
      isFirstTimeUser: true,
      sessionStartTime: now
    };
  }

  // Update visitor stats for returning visitor
  static updateVisitorStatsForReturn(existingStats: VisitorStats): VisitorStats {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    // Check if this is a consecutive visit (visited yesterday)
    const isConsecutive = existingStats.uniqueDaysVisited.has(yesterday);
    
    return {
      ...existingStats,
      totalVisits: existingStats.totalVisits + 1,
      lastVisit: now,
      consecutiveVisits: isConsecutive ? existingStats.consecutiveVisits + 1 : 1,
      currentSessionStart: now,
      uniqueDaysVisited: new Set([...Array.from(existingStats.uniqueDaysVisited), today]),
      returningVisitor: true
    };
  }

  // Migrate old data format if needed
  static migrateDataIfNeeded(): void {
    try {
      // Check for old format data and migrate if necessary
      const oldData = localStorage.getItem('portfolio_game_data'); // hypothetical old key
      if (oldData && !localStorage.getItem(GAME_STATE_STORAGE_KEY)) {
        console.log('Migrating old gamification data...');
        // Migration logic would go here
        localStorage.removeItem('portfolio_game_data');
      }
    } catch (error) {
      console.warn('Error during data migration:', error);
    }
  }
}