import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Alex's AI assistant. How can I help you learn more about his work?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('skills') || input.includes('tech')) {
      return "Alex specializes in React, Three.js, Node.js, and AI integration. He's particularly skilled in creating 3D web experiences and real-time applications.";
    } else if (input.includes('project') || input.includes('work')) {
      return "Alex has worked on cutting-edge projects including 3D analytics dashboards, AI-powered e-commerce platforms, and real-time collaboration tools. Would you like to know more about any specific project?";
    } else if (input.includes('contact') || input.includes('hire')) {
      return "You can reach Alex through the contact form below or email him directly at alex.chen@example.com. He's available for freelance projects and full-time opportunities.";
    } else {
      return "That's an interesting question! Alex is passionate about pushing the boundaries of web technology. Feel free to ask about his projects, skills, or how to get in touch.";
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 z-50"
        data-testid="chatbot-open-button"
      >
        <span className="text-lg">🤖</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 glassmorphism" data-testid="chatbot-widget">
      <CardHeader className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">AI Assistant</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            data-testid="chatbot-close-button"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.isBot
                  ? 'bg-muted p-3 rounded-lg max-w-xs'
                  : 'bg-primary text-primary-foreground p-3 rounded-lg max-w-xs ml-auto'
              }`}
              data-testid={`message-${message.isBot ? 'bot' : 'user'}-${message.id}`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              data-testid="chatbot-input"
            />
            <Button 
              onClick={sendMessage}
              size="sm"
              data-testid="chatbot-send-button"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
