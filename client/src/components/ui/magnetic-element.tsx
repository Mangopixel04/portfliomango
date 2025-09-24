import { ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticElement({ children, className = "" }: MagneticElementProps) {
  const { ref, transform } = useMagnetic();

  return (
    <div
      ref={ref}
      className={`magnetic-element ${className}`}
      style={{ transform }}
      data-testid="magnetic-element"
    >
      {children}
    </div>
  );
}
