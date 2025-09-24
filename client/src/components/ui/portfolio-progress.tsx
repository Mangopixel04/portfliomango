import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface PortfolioProgressProps {
  value: number;
  label: string;
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  showLabel?: boolean;
  animated?: boolean;
  glowEffect?: boolean;
  particleEffect?: boolean;
  className?: string;
  delay?: number;
}

const colorClasses = {
  primary: "from-blue-500 via-blue-600 to-blue-700 shadow-blue-500/50",
  secondary: "from-gray-500 via-gray-600 to-gray-700 shadow-gray-500/50", 
  accent: "from-cyan-500 via-cyan-600 to-cyan-700 shadow-cyan-500/50",
  success: "from-green-500 via-green-600 to-green-700 shadow-green-500/50",
  warning: "from-yellow-500 via-yellow-600 to-yellow-700 shadow-yellow-500/50",
  danger: "from-red-500 via-red-600 to-red-700 shadow-red-500/50"
};

const sizeClasses = {
  sm: "h-2",
  md: "h-4", 
  lg: "h-6"
};

export default function PortfolioProgress({
  value,
  label,
  color = "primary",
  size = "md",
  showValue = true,
  showLabel = true,
  animated = true,
  glowEffect = true,
  particleEffect = false,
  className,
  delay = 0
}: PortfolioProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(progressRef, { once: true });

  // Animate progress value
  useEffect(() => {
    if (isInView && animated) {
      const timer = setTimeout(() => {
        const duration = 2000;
        const interval = 50;
        const steps = duration / interval;
        const increment = value / steps;
        
        let currentValue = 0;
        const animationInterval = setInterval(() => {
          currentValue += increment;
          if (currentValue >= value) {
            currentValue = value;
            clearInterval(animationInterval);
          }
          setAnimatedValue(Math.round(currentValue));
        }, interval);

        return () => clearInterval(animationInterval);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!animated) {
      setAnimatedValue(value);
    }
  }, [isInView, animated, value, delay]);

  // Generate particles for effect
  useEffect(() => {
    if (particleEffect && animatedValue > 0) {
      const newParticles = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 20
      }));
      setParticles(newParticles);
    }
  }, [particleEffect, animatedValue]);

  const progressWidth = animated ? animatedValue : value;

  return (
    <div className={cn("w-full space-y-3", className)} ref={progressRef} data-testid="portfolio-progress">
      {/* Label and Value */}
      {(showLabel || showValue) && (
        <div className="flex justify-between items-center">
          {showLabel && (
            <motion.span 
              className="text-sm font-medium text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: delay }}
              data-testid="progress-label"
            >
              {label}
            </motion.span>
          )}
          {showValue && (
            <motion.span 
              className="text-sm font-bold"
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: delay }}
              data-testid="progress-value"
            >
              {animatedValue}%
            </motion.span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div className={cn(
        "relative w-full bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-muted/50",
        sizeClasses[size]
      )}>
        {/* Background Glow Effect */}
        {glowEffect && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse" />
        )}

        {/* Progress Bar */}
        <motion.div
          className={cn(
            "relative h-full rounded-full bg-gradient-to-r",
            colorClasses[color],
            glowEffect && "shadow-lg"
          )}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progressWidth}%` } : { width: 0 }}
          transition={{ 
            duration: 2, 
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          data-testid="progress-bar"
        >
          {/* Inner Glow */}
          {glowEffect && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-full" />
          )}

          {/* Animated Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "200%" } : {}}
            transition={{ 
              duration: 1.5, 
              delay: delay + 0.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />

          {/* Particle Effects */}
          {particleEffect && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{ 
                left: `${particle.x}%`, 
                top: `${particle.y}%` 
              }}
              animate={{
                y: [-5, -15, -5],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Pulse Effect on Complete */}
        {progressWidth >= 100 && glowEffect && (
          <motion.div
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-r opacity-50",
              colorClasses[color]
            )}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Success Message */}
      {progressWidth >= 100 && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="text-xs text-success font-semibold">✨ Mastered!</span>
        </motion.div>
      )}
    </div>
  );
}