import { Achievement } from '../types/gamification';

// Initial achievement definitions
export const INITIAL_ACHIEVEMENTS: Omit<Achievement, 'unlockedAt' | 'isUnlocked'>[] = [
  // Exploration Achievements
  {
    id: 'first_visitor',
    title: 'Welcome Explorer',
    description: 'Visited the portfolio for the first time',
    icon: '🎯',
    category: 'exploration',
    points: 10,
    requirements: [
      {
        type: 'section_visit',
        target: 'home',
        threshold: 1,
        currentValue: 0
      }
    ]
  },
  {
    id: 'section_explorer',
    title: 'Section Explorer',
    description: 'Visited all main sections of the portfolio',
    icon: '🗺️',
    category: 'exploration',
    points: 50,
    requirements: [
      {
        type: 'section_visit',
        target: 'hero',
        threshold: 1,
        currentValue: 0
      },
      {
        type: 'section_visit',
        target: 'about',
        threshold: 1,
        currentValue: 0
      },
      {
        type: 'section_visit',
        target: 'skills',
        threshold: 1,
        currentValue: 0
      },
      {
        type: 'section_visit',
        target: 'projects',
        threshold: 1,
        currentValue: 0
      },
      {
        type: 'section_visit',
        target: 'contact',
        threshold: 1,
        currentValue: 0
      }
    ]
  },
  {
    id: 'deep_diver',
    title: 'Deep Diver',
    description: 'Spent over 5 minutes exploring the portfolio',
    icon: '🏊‍♂️',
    category: 'exploration',
    points: 30,
    requirements: [
      {
        type: 'time_spent',
        target: 'total',
        threshold: 300, // 5 minutes in seconds
        currentValue: 0
      }
    ]
  },
  {
    id: 'marathon_reader',
    title: 'Marathon Reader',
    description: 'Spent over 15 minutes exploring the portfolio',
    icon: '📚',
    category: 'exploration',
    points: 75,
    requirements: [
      {
        type: 'time_spent',
        target: 'total',
        threshold: 900, // 15 minutes in seconds
        currentValue: 0
      }
    ]
  },

  // Interaction Achievements
  {
    id: 'first_click',
    title: 'First Click',
    description: 'Clicked your first interactive element',
    icon: '👆',
    category: 'interaction',
    points: 5,
    requirements: [
      {
        type: 'interaction_count',
        target: 'buttonClicks',
        threshold: 1,
        currentValue: 0
      }
    ]
  },
  {
    id: 'interaction_master',
    title: 'Interaction Master',
    description: 'Performed 25 interactions with the portfolio',
    icon: '🎮',
    category: 'interaction',
    points: 60,
    requirements: [
      {
        type: 'interaction_count',
        target: 'total_interactions',
        threshold: 25,
        currentValue: 0
      }
    ]
  },
  {
    id: 'skill_investigator',
    title: 'Skill Investigator',
    description: 'Hovered over 10 different skills',
    icon: '🔍',
    category: 'interaction',
    points: 25,
    requirements: [
      {
        type: 'skill_hover',
        target: 'skills',
        threshold: 10,
        currentValue: 0
      }
    ]
  },
  {
    id: 'project_enthusiast',
    title: 'Project Enthusiast',
    description: 'Viewed all featured projects',
    icon: '🚀',
    category: 'interaction',
    points: 40,
    requirements: [
      {
        type: 'project_view',
        target: 'all_projects',
        threshold: 4, // Based on the 4 projects in the projects section
        currentValue: 0
      }
    ]
  },
  {
    id: 'magnetic_master',
    title: 'Magnetic Master',
    description: 'Interacted with 15 magnetic elements',
    icon: '🧲',
    category: 'interaction',
    points: 35,
    requirements: [
      {
        type: 'interaction_count',
        target: 'magneticInteractions',
        threshold: 15,
        currentValue: 0
      }
    ]
  },

  // Engagement Achievements
  {
    id: 'returning_visitor',
    title: 'Returning Visitor',
    description: 'Came back to visit the portfolio again',
    icon: '🔄',
    category: 'engagement',
    points: 20,
    requirements: [
      {
        type: 'consecutive_visits',
        target: 'total',
        threshold: 2,
        currentValue: 0
      }
    ]
  },
  {
    id: 'loyal_visitor',
    title: 'Loyal Visitor',
    description: 'Visited the portfolio 5 times',
    icon: '❤️',
    category: 'engagement',
    points: 50,
    requirements: [
      {
        type: 'consecutive_visits',
        target: 'total',
        threshold: 5,
        currentValue: 0
      }
    ]
  },
  {
    id: 'speed_reader',
    title: 'Speed Reader',
    description: 'Visited all sections in under 2 minutes',
    icon: '⚡',
    category: 'engagement',
    points: 45,
    requirements: [
      {
        type: 'time_spent',
        target: 'all_sections_fast',
        threshold: 120, // 2 minutes max
        currentValue: 0
      }
    ]
  },

  // Social Achievements
  {
    id: 'contact_initiator',
    title: 'Contact Initiator',
    description: 'Submitted the contact form',
    icon: '📧',
    category: 'social',
    points: 100,
    requirements: [
      {
        type: 'contact_form',
        target: 'contact',
        threshold: 1,
        currentValue: 0
      }
    ]
  },
  {
    id: 'voice_commander',
    title: 'Voice Commander',
    description: 'Used voice navigation features',
    icon: '🎤',
    category: 'social',
    points: 40,
    requirements: [
      {
        type: 'interaction_count',
        target: 'voiceCommands',
        threshold: 3,
        currentValue: 0
      }
    ]
  },

  // Completion Achievements
  {
    id: 'completionist',
    title: 'Completionist',
    description: 'Achieved 100% completion of the portfolio experience',
    icon: '🏆',
    category: 'completion',
    points: 200,
    requirements: [
      {
        type: 'section_visit',
        target: 'all_sections_complete',
        threshold: 100, // 100% completion
        currentValue: 0
      }
    ]
  },
  {
    id: 'achievement_hunter',
    title: 'Achievement Hunter',
    description: 'Unlocked 75% of all achievements',
    icon: '🏅',
    category: 'completion',
    points: 150,
    requirements: [
      {
        type: 'interaction_count',
        target: 'achievements_unlocked',
        threshold: 75, // 75% of achievements
        currentValue: 0
      }
    ]
  }
];

// Helper function to create achievement instances
export function createAchievements(): Achievement[] {
  return INITIAL_ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    isUnlocked: false,
    requirements: achievement.requirements.map(req => ({ ...req }))
  }));
}

// Achievement unlock logic helpers
export function checkAchievementRequirements(achievement: Achievement): boolean {
  return achievement.requirements.every(req => req.currentValue >= req.threshold);
}

export function updateAchievementProgress(
  achievements: Achievement[],
  requirementType: string,
  target: string,
  value: number
): Achievement[] {
  return achievements.map(achievement => {
    if (achievement.isUnlocked) return achievement;

    const updatedRequirements = achievement.requirements.map(req => {
      if (req.type === requirementType && (req.target === target || req.target === 'total' || target === 'all')) {
        return { ...req, currentValue: Math.max(req.currentValue, value) };
      }
      return req;
    });

    const updatedAchievement = { ...achievement, requirements: updatedRequirements };
    
    // Check if achievement should be unlocked
    if (checkAchievementRequirements(updatedAchievement)) {
      return {
        ...updatedAchievement,
        isUnlocked: true,
        unlockedAt: new Date()
      };
    }

    return updatedAchievement;
  });
}

// Calculate total interaction count for achievements
export function calculateTotalInteractions(interactionStats: any): number {
  return Object.values(interactionStats).reduce((total: number, value: any) => {
    return total + (typeof value === 'number' ? value : 0);
  }, 0);
}