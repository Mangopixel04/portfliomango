import React from 'react';
import { AchievementNotification } from './achievement-notification';
import { useAchievementNotifications } from '@/hooks/use-achievement-notifications';

export function AchievementNotificationProvider() {
  const { activeNotification, dismissNotification } = useAchievementNotifications();

  return (
    <>
      {activeNotification && (
        <AchievementNotification
          achievement={activeNotification.achievement}
          isVisible={true}
          onClose={() => dismissNotification(activeNotification.id)}
        />
      )}
    </>
  );
}