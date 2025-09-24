import { Button } from "@/components/ui/button";
import Typewriter from "@/components/ui/typewriter";
import ParticleBackground from "@/components/ui/particle-background";
import MagneticElement from "@/components/ui/magnetic-element";
import { Play, Rocket, ChevronDown, Box } from "lucide-react";

export default function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative hero-gradient flex items-center justify-center overflow-hidden" data-testid="hero-section">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Static Particles */}
      <div className="absolute inset-0">
        <div className="particle" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="particle" style={{ top: '30%', left: '80%', animationDelay: '1s' }} />
        <div className="particle" style={{ top: '60%', left: '20%', animationDelay: '2s' }} />
        <div className="particle" style={{ top: '80%', left: '70%', animationDelay: '3s' }} />
        <div className="particle" style={{ top: '40%', left: '50%', animationDelay: '4s' }} />
      </div>

      {/* 3D Interactive Hero Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="floating-element">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight" data-testid="hero-title">
            <span className="gradient-text">Advanced</span><br />
            <span className="text-foreground">Portfolio</span><br />
            <Typewriter 
              words={['Experience', 'Innovation', 'Excellence', 'Future']}
              className="text-accent"
            />
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-description">
          Crafting cutting-edge web experiences with 3D interactions, AI integration, and premium design systems
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <MagneticElement>
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all"
              data-testid="button-explore-work"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Explore My Work
            </Button>
          </MagneticElement>
          <MagneticElement>
            <Button 
              variant="outline"
              size="lg"
              className="border border-border text-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-card transition-all"
              data-testid="button-watch-demo"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </MagneticElement>
        </div>

        {/* 3D WebGL Canvas Placeholder */}
        <div className="glassmorphism rounded-2xl p-8 max-w-4xl mx-auto" data-testid="webgl-showcase">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Box className="h-16 w-16 text-primary mb-4 floating-element mx-auto" />
              <p className="text-lg font-medium" data-testid="webgl-title">3D Interactive WebGL Scene</p>
              <p className="text-sm text-muted-foreground mt-2" data-testid="webgl-subtitle">Three.js + Particle Systems</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button 
          onClick={scrollToNext}
          className="animate-bounce cursor-pointer"
          data-testid="scroll-indicator"
        >
          <ChevronDown className="h-8 w-8 text-primary" />
        </button>
      </div>
    </section>
  );
}
