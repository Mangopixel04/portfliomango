import { useRef, useState, useEffect } from "react";

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setTransform(`translate(${deltaX}px, ${deltaY}px)`);
    };

    const handleMouseLeave = () => {
      setTransform("");
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return { ref, transform };
}
