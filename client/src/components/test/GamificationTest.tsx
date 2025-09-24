import React from 'react';
import { useGamification, useInteractionTracking, useAchievementNotifications } from '../../hooks/use-gamification';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Test component to verify gamification system works
export function GamificationTest() {
  const {
    gameState,
    progress,
    achievements,
    totalPoints,
    currentLevel,
    experienceProgress,
    trackSectionVisit,
    trackInteraction,
    unlockAchievement,
    isFirstTimeUser
  } = useGamification();

  const { trackClick } = useInteractionTracking();
  const { latestUnlocks, totalUnlocked } = useAchievementNotifications();

  // Test functions
  const handleTestSectionVisit = () => {
    trackSectionVisit('test-section', 'Test Section');
  };

  const handleTestButtonClick = () => {
    trackClick('button');
  };

  const handleTestAchievementUnlock = () => {
    unlockAchievement('first_click');
  };

  const handleTestInteraction = () => {
    trackInteraction('magneticInteractions');
  };

  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold">🎮 Gamification System Test</h2>
      
      {/* Current Status */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Current Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{currentLevel}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalUnlocked}</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{progress.overall}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
          
          {isFirstTimeUser && (
            <Badge variant="outline" className="mt-4">First Time User</Badge>
          )}
          
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">
              Experience: {experienceProgress.current} / {experienceProgress.current + experienceProgress.needed}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${experienceProgress.percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Test Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={handleTestSectionVisit} variant="outline">
              Track Section Visit
            </Button>
            <Button onClick={handleTestButtonClick} variant="outline">
              Track Button Click
            </Button>
            <Button onClick={handleTestInteraction} variant="outline">
              Track Interaction
            </Button>
            <Button onClick={handleTestAchievementUnlock} variant="outline">
              Unlock Achievement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visitor Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Visitor Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium">Total Visits</div>
              <div className="text-muted-foreground">{gameState.visitorStats.totalVisits}</div>
            </div>
            <div>
              <div className="font-medium">Total Time</div>
              <div className="text-muted-foreground">{Math.round(gameState.visitorStats.totalTimeSpent / 60)}m</div>
            </div>
            <div>
              <div className="font-medium">Consecutive Visits</div>
              <div className="text-muted-foreground">{gameState.visitorStats.consecutiveVisits}</div>
            </div>
            <div>
              <div className="font-medium">Unique Days</div>
              <div className="text-muted-foreground">{gameState.visitorStats.uniqueDaysVisited.size}</div>
            </div>
            <div>
              <div className="font-medium">Returning Visitor</div>
              <div className="text-muted-foreground">{gameState.visitorStats.returningVisitor ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interaction Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Interaction Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {Object.entries(gameState.interactionStats).map(([key, value]) => (
              <div key={key}>
                <div className="font-medium">{key}</div>
                <div className="text-muted-foreground">{value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">🏆 Unlocked Achievements ({unlockedAchievements.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement) => (
                <div key={achievement.id} className="border rounded-lg p-4 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      <Badge variant="secondary" className="mt-1">
                        {achievement.points} points
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locked Achievements */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">🔒 Locked Achievements ({lockedAchievements.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.slice(0, 6).map((achievement) => (
              <div key={achievement.id} className="border rounded-lg p-4 opacity-60">
                <div className="flex items-center gap-3">
                  <span className="text-2xl grayscale">{achievement.icon}</span>
                  <div>
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Progress: {achievement.requirements.map(req => 
                        `${req.currentValue}/${req.threshold}`
                      ).join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Local Storage Test */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">🗄️ Local Storage Test</h3>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Game State Key:</strong> portfolio_gamification_state
            </div>
            <div>
              <strong>Visitor Stats Key:</strong> portfolio_visitor_stats
            </div>
            <div>
              <strong>Storage Size:</strong> {
                localStorage.getItem('portfolio_gamification_state')?.length || 0
              } characters
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                console.log('Game State:', localStorage.getItem('portfolio_gamification_state'));
                console.log('Visitor Stats:', localStorage.getItem('portfolio_visitor_stats'));
              }}
            >
              Log Storage to Console
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}