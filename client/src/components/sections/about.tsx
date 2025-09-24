import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MagneticElement from "@/components/ui/magnetic-element";
import { Play, Calendar, MapPin, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 relative" data-testid="about-section">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8" data-testid="about-title">
              <span className="gradient-text">About</span> Me
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="about-description-1">
              I'm a passionate full-stack developer specializing in creating immersive web experiences that push the boundaries of what's possible. With expertise in modern frameworks, 3D graphics, and AI integration, I transform complex ideas into elegant, user-centered solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="about-description-2">
              My approach combines technical excellence with creative vision, resulting in applications that not only function flawlessly but also inspire and engage users at every interaction.
            </p>
            
            {/* Interactive Timeline */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4" data-testid="journey-title">Journey</h3>
              
              <div className="timeline-item" data-testid="timeline-item-senior">
                <Card className="glassmorphism">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Senior Full-Stack Developer
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3" />
                      TechCorp Inc. • 
                      <Calendar className="h-3 w-3" />
                      2022 - Present
                    </p>
                    <p className="mt-2">Leading development of next-generation web applications with advanced 3D visualization and AI integration.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="timeline-item" data-testid="timeline-item-architect">
                <Card className="glassmorphism">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Frontend Architect
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3" />
                      StartupXYZ • 
                      <Calendar className="h-3 w-3" />
                      2020 - 2022
                    </p>
                    <p className="mt-2">Built scalable frontend architecture serving 1M+ users with real-time features and advanced analytics.</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="timeline-item" data-testid="timeline-item-developer">
                <Card className="glassmorphism">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Web Developer
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3" />
                      Digital Agency • 
                      <Calendar className="h-3 w-3" />
                      2018 - 2020
                    </p>
                    <p className="mt-2">Developed premium websites and applications for Fortune 500 clients with focus on performance and UX.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Interactive Code Playground */}
            <div className="code-block" data-testid="code-playground">
              <div className="code-header">
                <div className="code-dot bg-red-500" />
                <div className="code-dot bg-yellow-500" />
                <div className="code-dot bg-green-500" />
                <span className="text-sm font-mono ml-2">live-coding-demo.js</span>
              </div>
              <div className="p-4 font-mono text-sm space-y-1" data-testid="code-content">
                <div className="text-purple-400">// Real-time 3D Particle System</div>
                <div>
                  <span className="text-blue-400">const </span>
                  <span className="text-yellow-400">scene</span>
                  <span className="text-white"> = </span>
                  <span className="text-green-400">new </span>
                  <span className="text-blue-400">THREE.Scene</span>
                  <span className="text-white">();</span>
                </div>
                <div>
                  <span className="text-blue-400">const </span>
                  <span className="text-yellow-400">particles</span>
                  <span className="text-white"> = </span>
                  <span className="text-green-400">new </span>
                  <span className="text-blue-400">ParticleSystem</span>
                  <span className="text-white">{"{"}</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">count: </span>
                  <span className="text-orange-400">10000</span>
                  <span className="text-white">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">animation: </span>
                  <span className="text-green-400">'floating'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">interactivity: </span>
                  <span className="text-orange-400">true</span>
                </div>
                <div className="text-white">{"};"};</div>
                <div className="text-purple-400 mt-2">// AI-Powered Interactions</div>
                <div>
                  <span className="text-blue-400">const </span>
                  <span className="text-yellow-400">ai</span>
                  <span className="text-white"> = </span>
                  <span className="text-green-400">new </span>
                  <span className="text-blue-400">AIAssistant</span>
                  <span className="text-white">{"{"}</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">model: </span>
                  <span className="text-green-400">'gpt-4'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-red-400">context: </span>
                  <span className="text-green-400">'portfolio'</span>
                </div>
                <div className="text-white">{"};"};</div>
              </div>
            </div>

            {/* Screen Recording Demo */}
            <Card className="glassmorphism" data-testid="screen-recording-demo">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Play className="text-primary mr-2 h-5 w-5" />
                  Screen Recording Demo
                </h3>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <MagneticElement>
                    <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors" data-testid="button-start-recording">
                      <Play className="mr-2 h-4 w-4" />
                      Start Recording Process
                    </Button>
                  </MagneticElement>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
