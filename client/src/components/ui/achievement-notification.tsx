import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Achievement } from '@/lib/types/gamification';

interface AchievementNotificationProps {
  achievement: Achievement;
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}

export function AchievementNotification({ 
  achievement, 
  isVisible, 
  onClose, 
  className 
}: AchievementNotificationProps) {
  // Auto-dismiss after 5 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'exploration':
        return '🗺️';
      case 'interaction':
        return '🎮';
      case 'engagement':
        return '❤️';
      case 'social':
        return '📧';
      case 'completion':
        return '🏆';
      default:
        return '🎯';
    }
  };

  const getCategoryColor = (category: Achievement['category']) => {
    switch (category) {
      case 'exploration':
        return 'from-blue-500 to-cyan-500';
      case 'interaction':
        return 'from-purple-500 to-pink-500';
      case 'engagement':
        return 'from-green-500 to-emerald-500';
      case 'social':
        return 'from-orange-500 to-red-500';
      case 'completion':
        return 'from-yellow-500 to-amber-500';
      default:
        return 'from-primary to-accent';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ 
            opacity: 0, 
            x: 300, 
            scale: 0.8,
            rotateY: -45 
          }}
          animate={{ 
            opacity: 1, 
            x: 0, 
            scale: 1,
            rotateY: 0 
          }}
          exit={{ 
            opacity: 0, 
            x: 300, 
            scale: 0.8,
            rotateY: 45 
          }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 300,
            duration: 0.6 
          }}
          className={cn(
            "fixed top-4 right-4 z-[200] max-w-sm",
            "pointer-events-auto cursor-pointer group",
            className
          )}
          onClick={onClose}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative overflow-hidden rounded-lg border border-border/50",
              "bg-gradient-to-br from-card/90 to-card/60",
              "backdrop-filter backdrop-blur-xl",
              "shadow-2xl shadow-black/50",
              "p-4 pr-12",
              "transform-gpu"
            )}
          >
            {/* Gradient overlay */}
            <div 
              className={cn(
                "absolute inset-0 opacity-10",
                "bg-gradient-to-br",
                getCategoryColor(achievement.category)
              )}
            />
            
            {/* Achievement content */}
            <div className="relative z-10">
              {/* Header with icon and close button */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* Achievement icon */}
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    className={cn(
                      "flex items-center justify-center",
                      "w-12 h-12 rounded-full",
                      "bg-gradient-to-br",
                      getCategoryColor(achievement.category),
                      "text-white text-xl font-bold",
                      "shadow-lg"
                    )}
                  >
                    {achievement.icon || getCategoryIcon(achievement.category)}
                  </motion.div>
                  
                  {/* Trophy indicator */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <Trophy className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                </div>
                
                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className={cn(
                    "absolute top-2 right-2",
                    "p-1 rounded-full",
                    "text-muted-foreground hover:text-foreground",
                    "hover:bg-muted/20",
                    "transition-colors duration-200",
                    "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* Achievement unlocked text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-2"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Achievement Unlocked
                  </span>
                </div>
              </motion.div>
              
              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-bold text-foreground mb-1 leading-tight"
              >
                {achievement.title}
              </motion.h3>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-muted-foreground mb-3 leading-relaxed"
              >
                {achievement.description}
              </motion.p>
              
              {/* Points section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    "bg-gradient-to-r",
                    getCategoryColor(achievement.category),
                    "text-white"
                  )}>
                    +{achievement.points} XP
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Tap to dismiss
                </div>
              </motion.div>
            </div>
            
            {/* Animated progress bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 5, ease: "linear" }}
              className={cn(
                "absolute bottom-0 left-0 h-1",
                "bg-gradient-to-r",
                getCategoryColor(achievement.category),
                "origin-left"
              )}
              style={{ width: '100%' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}