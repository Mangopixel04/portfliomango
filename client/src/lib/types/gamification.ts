// Gamification Type Definitions
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'exploration' | 'interaction' | 'engagement' | 'social' | 'completion';
  points: number;
  unlockedAt?: Date;
  isUnlocked: boolean;
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type: 'section_visit' | 'time_spent' | 'interaction_count' | 'consecutive_visits' | 'project_view' | 'contact_form' | 'skill_hover';
  target: string; // section id, interaction type, etc.
  threshold: number; // minimum value to unlock
  currentValue: number; // current progress
}

export interface VisitorStats {
  totalVisits: number;
  firstVisit: Date;
  lastVisit: Date;
  totalTimeSpent: number; // in seconds
  consecutiveVisits: number;
  currentSessionStart: Date;
  uniqueDaysVisited: Set<string>; // date strings in YYYY-MM-DD format
  returningVisitor: boolean;
}

export interface SectionProgress {
  sectionId: string;
  sectionName: string;
  visits: number;
  timeSpent: number; // in seconds
  lastVisited: Date;
  interactions: number;
  completed: boolean;
}

export interface InteractionStats {
  buttonClicks: number;
  linkClicks: number;
  formSubmissions: number;
  skillHovers: number;
  projectViews: number;
  scrollDepth: number; // percentage of page scrolled
  magneticInteractions: number;
  voiceCommands: number;
}

export interface GameState {
  visitorStats: VisitorStats;
  achievements: Achievement[];
  sectionProgress: SectionProgress[];
  interactionStats: InteractionStats;
  totalPoints: number;
  level: number;
  experiencePoints: number;
  experienceToNextLevel: number;
  unlockedAchievements: string[];
  isFirstTimeUser: boolean;
  sessionStartTime: Date;
}

export interface Progress {
  overall: number; // 0-100 percentage
  sections: { [sectionId: string]: number };
  achievements: number; // percentage of achievements unlocked
  interactions: number; // interaction completion score
}

// Events that can trigger achievement checks
export type GameEvent = 
  | { type: 'SECTION_VISIT'; payload: { sectionId: string; sectionName: string } }
  | { type: 'INTERACTION'; payload: { interactionType: keyof InteractionStats; count?: number } }
  | { type: 'TIME_SPENT'; payload: { sectionId: string; timeSpent: number } }
  | { type: 'SESSION_START'; payload: {} }
  | { type: 'SESSION_END'; payload: {} }
  | { type: 'PROJECT_VIEW'; payload: { projectId: string } }
  | { type: 'FORM_SUBMIT'; payload: { formType: string } }
  | { type: 'ACHIEVEMENT_UNLOCK'; payload: { achievementId: string } };

// localStorage keys
export const GAME_STATE_STORAGE_KEY = 'portfolio_gamification_state';
export const VISITOR_STATS_STORAGE_KEY = 'portfolio_visitor_stats';

// Achievement categories for organization
export const ACHIEVEMENT_CATEGORIES = {
  exploration: 'Explorer',
  interaction: 'Interaction Master', 
  engagement: 'Engagement Expert',
  social: 'Social Connector',
  completion: 'Completionist'
} as const;

// Level progression
export const EXPERIENCE_THRESHOLDS = [
  0,    // Level 1
  100,  // Level 2  
  250,  // Level 3
  500,  // Level 4
  1000, // Level 5
  2000, // Level 6
  3500, // Level 7
  5500, // Level 8
  8000, // Level 9
  12000 // Level 10
];