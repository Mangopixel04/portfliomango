import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useVoiceNavigation } from "@/hooks/use-voice-navigation";

export default function VoiceNavigation() {
  const [isListening, setIsListening] = useState(false);
  const { startListening, stopListening, isSupported } = useVoiceNavigation();

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      setIsListening(false);
    } else {
      startListening();
      setIsListening(true);
    }
  };

  if (!isSupported) return null;

  return (
    <Button
      onClick={toggleListening}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full z-50 transition-all duration-300 ${
        isListening 
          ? 'bg-accent hover:bg-accent/90 pulse-glow' 
          : 'bg-primary hover:bg-primary/90'
      }`}
      data-testid="voice-navigation-button"
    >
      {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
    </Button>
  );
}
