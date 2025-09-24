import { useTypewriter } from "@/hooks/use-typewriter";

interface TypewriterProps {
  words: string[];
  className?: string;
}

export default function Typewriter({ words, className = "" }: TypewriterProps) {
  const { currentText, isDeleting } = useTypewriter(words);

  return (
    <span 
      className={`typewriter ${className}`}
      data-testid="typewriter"
    >
      {currentText}
    </span>
  );
}
