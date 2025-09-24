import { useState, useEffect } from "react";

export function useTypewriter(words: string[], speed = 100, deleteSpeed = 50, pauseTime = 1000) {
  const [currentText, setCurrentText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % words.length);
        }
      } else {
        setCurrentText(currentWord.slice(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, wordIndex, isDeleting, words, speed, deleteSpeed, pauseTime]);

  return { currentText, isDeleting };
}
