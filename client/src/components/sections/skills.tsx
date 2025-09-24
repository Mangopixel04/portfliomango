import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MagneticElement from "@/components/ui/magnetic-element";
import PortfolioProgress from "@/components/ui/portfolio-progress";
import { Box, Brain, Server, Cloud, ChartLine } from "lucide-react";

interface SkillData {
  name: string;
  percentage: number;
  icon: typeof Box | (() => JSX.Element);
  color: string;
  progressColor: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  technologies: string[];
}

const skills: SkillData[] = [
  {
    name: "3D & WebGL",
    percentage: 95,
    icon: Box,
    color: "text-primary",
    progressColor: "primary",
    technologies: ["Three.js", "WebGL", "Blender", "GSAP"]
  },
  {
    name: "AI Integration", 
    percentage: 88,
    icon: Brain,
    color: "text-accent",
    progressColor: "accent",
    technologies: ["OpenAI API", "TensorFlow.js", "ML5.js"]
  },
  {
    name: "Frontend",
    percentage: 98,
    icon: () => <span className="text-2xl">⚛️</span>,
    color: "text-green-500",
    progressColor: "success",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind"]
  },
  {
    name: "Backend",
    percentage: 92,
    icon: Server,
    color: "text-purple-500", 
    progressColor: "secondary",
    technologies: ["Node.js", "Python", "PostgreSQL", "Redis"]
  },
  {
    name: "DevOps",
    percentage: 85,
    icon: Cloud,
    color: "text-orange-500",
    progressColor: "warning",
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    name: "Analytics",
    percentage: 90,
    icon: ChartLine,
    color: "text-pink-500",
    progressColor: "danger",
    technologies: ["D3.js", "Chart.js", "Real-time Data", "WebSockets"]
  }
];

export default function Skills() {

  return (
    <section id="skills" className="py-20 bg-muted/20" data-testid="skills-section">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-16" data-testid="skills-title">
          <span className="gradient-text">Skills</span> & Expertise
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <MagneticElement key={skill.name}>
                <Card className="glassmorphism h-full" data-testid={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-current/20 rounded-lg flex items-center justify-center mb-4 ${skill.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-6">{skill.name}</h3>
                    
                    {/* Enhanced Progress Bar */}
                    <PortfolioProgress
                      value={skill.percentage}
                      label="Proficiency"
                      color={skill.progressColor}
                      size="md"
                      animated={true}
                      glowEffect={true}
                      particleEffect={true}
                      delay={index * 200}
                      className="mb-4"
                    />

                    <div className="flex flex-wrap gap-1 mt-4">
                      {skill.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs hover:bg-primary/20 transition-colors"
                          data-testid={`tech-badge-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </MagneticElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}
