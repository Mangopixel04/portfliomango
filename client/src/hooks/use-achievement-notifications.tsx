import { useState, useEffect, useCallback, useRef } from 'react';
import { Achievement } from '@/lib/types/gamification';

interface NotificationItem {
  id: string;
  achievement: Achievement;
  timestamp: number;
}

interface UseAchievementNotificationsReturn {
  notifications: NotificationItem[];
  showNotification: (achievement: Achievement) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  activeNotification: NotificationItem | null;
}

export function useAchievementNotifications(): UseAchievementNotificationsReturn {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeNotification, setActiveNotification] = useState<NotificationItem | null>(null);
  const queueRef = useRef<NotificationItem[]>([]);
  const processingRef = useRef(false);

  // Process notification queue
  const processQueue = useCallback(() => {
    if (processingRef.current || queueRef.current.length === 0 || activeNotification) {
      return;
    }

    processingRef.current = true;
    const nextNotification = queueRef.current.shift();
    
    if (nextNotification) {
      setActiveNotification(nextNotification);
      
      // Auto-dismiss after 5.5 seconds (slightly longer than animation)
      setTimeout(() => {
        setActiveNotification(null);
        processingRef.current = false;
        
        // Process next notification after a brief delay
        setTimeout(() => {
          processQueue();
        }, 300);
      }, 5500);
    } else {
      processingRef.current = false;
    }
  }, [activeNotification]);

  // Show notification function
  const showNotification = useCallback((achievement: Achievement) => {
    const notification: NotificationItem = {
      id: `achievement-${achievement.id}-${Date.now()}`,
      achievement,
      timestamp: Date.now()
    };

    // Add to notifications history
    setNotifications(prev => [notification, ...prev].slice(0, 50)); // Keep last 50
    
    // Add to queue for display
    queueRef.current.push(notification);
    
    // Process queue
    processQueue();
  }, [processQueue]);

  // Dismiss specific notification
  const dismissNotification = useCallback((id: string) => {
    if (activeNotification?.id === id) {
      setActiveNotification(null);
      processingRef.current = false;
      
      // Process next notification after brief delay
      setTimeout(() => {
        processQueue();
      }, 100);
    }
    
    // Remove from queue if it's still there
    queueRef.current = queueRef.current.filter(n => n.id !== id);
    
    // Remove from history
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, [activeNotification, processQueue]);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setActiveNotification(null);
    queueRef.current = [];
    processingRef.current = false;
  }, []);

  // Listen for achievement unlock events from the gamification context
  useEffect(() => {
    const handleAchievementUnlocked = (event: CustomEvent<Achievement>) => {
      showNotification(event.detail);
    };

    // Listen for the custom event dispatched by the gamification system
    window.addEventListener('achievementUnlocked', handleAchievementUnlocked as EventListener);

    return () => {
      window.removeEventListener('achievementUnlocked', handleAchievementUnlocked as EventListener);
    };
  }, [showNotification]);

  // Process queue when it changes
  useEffect(() => {
    processQueue();
  }, [processQueue]);

  return {
    notifications,
    showNotification,
    dismissNotification,
    clearAllNotifications,
    activeNotification
  };
}