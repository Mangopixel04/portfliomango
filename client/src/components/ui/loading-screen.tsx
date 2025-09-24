import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setOpacity(0);
    }, 1500);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-background flex items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
      data-testid="loading-screen"
    >
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4" data-testid="loading-spinner" />
        <p className="text-lg font-medium" data-testid="loading-text-main">Initializing Portfolio...</p>
        <div className="mt-2 text-sm text-muted-foreground" data-testid="loading-text-sub">Loading 3D Assets & AI Systems</div>
      </div>
    </div>
  );
}
