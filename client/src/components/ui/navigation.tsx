import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MagneticElement from "./magnetic-element";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism" data-testid="navigation">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold gradient-text">Alex Chen</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <MagneticElement>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="hover:text-primary transition-colors"
                  data-testid="nav-home"
                >
                  Home
                </button>
              </MagneticElement>
              <MagneticElement>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="hover:text-primary transition-colors"
                  data-testid="nav-about"
                >
                  About
                </button>
              </MagneticElement>
              <MagneticElement>
                <button 
                  onClick={() => scrollToSection('projects')} 
                  className="hover:text-primary transition-colors"
                  data-testid="nav-projects"
                >
                  Projects
                </button>
              </MagneticElement>
              <MagneticElement>
                <button 
                  onClick={() => scrollToSection('skills')} 
                  className="hover:text-primary transition-colors"
                  data-testid="nav-skills"
                >
                  Skills
                </button>
              </MagneticElement>
              <MagneticElement>
                <button 
                  onClick={() => scrollToSection('analytics')} 
                  className="hover:text-primary transition-colors"
                  data-testid="nav-analytics"
                >
                  Analytics
                </button>
              </MagneticElement>
              <MagneticElement>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="hover:text-primary transition-colors"
                  data-testid="nav-contact"
                >
                  Contact
                </button>
              </MagneticElement>
            </div>

            <div className="flex items-center space-x-4">
              <MagneticElement>
                <Button 
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  data-testid="button-download-cv"
                >
                  Download CV
                </Button>
              </MagneticElement>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" data-testid="mobile-menu">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-20 left-0 right-0 bg-card border-b border-border p-6">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-projects"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('skills')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-skills"
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('analytics')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-analytics"
              >
                Analytics
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-left hover:text-primary transition-colors"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
