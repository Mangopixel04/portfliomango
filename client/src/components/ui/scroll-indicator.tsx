import { useScrollProgress } from "@/hooks/use-scroll-progress";

export default function ScrollIndicator() {
  const progress = useScrollProgress();

  return (
    <div 
      className="scroll-indicator"
      style={{ transform: `scaleX(${progress / 100})` }}
      data-testid="scroll-indicator"
    />
  );
}
