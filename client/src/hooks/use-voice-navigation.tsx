import { useState, useCallback } from "react";

export function useVoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(
    typeof window !== 'undefined' && 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  );

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isSupported]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const handleVoiceCommand = (command: string) => {
    const commands = {
      'home': () => scrollToSection('home'),
      'about': () => scrollToSection('about'),
      'projects': () => scrollToSection('projects'),
      'skills': () => scrollToSection('skills'),
      'analytics': () => scrollToSection('analytics'),
      'contact': () => scrollToSection('contact'),
      'top': () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    };

    Object.entries(commands).forEach(([keyword, action]) => {
      if (command.includes(keyword)) {
        action();
      }
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
}

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
