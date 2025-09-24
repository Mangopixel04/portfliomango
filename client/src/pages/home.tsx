import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Analytics from "@/components/sections/analytics";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen" data-testid="home-page">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Analytics />
      <Contact />
      
      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-4">Alex Chen</div>
            <p className="text-muted-foreground mb-6">Creating the future of web experiences</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-sitemap">Sitemap</a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">© 2024 Alex Chen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
