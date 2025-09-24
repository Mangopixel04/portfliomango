import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MagneticElement from "@/components/ui/magnetic-element";
import { Box, Brain, Server, Cloud, ChartLine } from "lucide-react";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  percentage: number;
  icon: typeof Box | (() => JSX.Element);
  color: string;
  technologies: string[];
}

const skills: Skill[] = [
  {
    name: "3D & WebGL",
    percentage: 95,
    icon: Box,
    color: "text-primary",
    technologies: ["Three.js", "WebGL", "Blender", "GSAP"]
  },
  {
    name: "AI Integration",
    percentage: 88,
    icon: Brain,
    color: "text-accent",
    technologies: ["OpenAI API", "TensorFlow.js", "ML5.js"]
  },
  {
    name: "Frontend",
    percentage: 98,
    icon: () => <span className="text-2xl">⚛️</span>,
    color: "text-green-500",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind"]
  },
  {
    name: "Backend",
    percentage: 92,
    icon: Server,
    color: "text-purple-500",
    technologies: ["Node.js", "Python", "PostgreSQL", "Redis"]
  },
  {
    name: "DevOps",
    percentage: 85,
    icon: Cloud,
    color: "text-orange-500",
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD"]
  },
  {
    name: "Analytics",
    percentage: 90,
    icon: ChartLine,
    color: "text-pink-500",
    technologies: ["D3.js", "Chart.js", "Real-time Data", "WebSockets"]
  }
];

export default function Skills() {
  const [animatedPercentages, setAnimatedPercentages] = useState<number[]>(new Array(skills.length).fill(0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate skill bars
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedPercentages(prev => {
                  const newPercentages = [...prev];
                  newPercentages[index] = skill.percentage;
                  return newPercentages;
                });
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

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
                    <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
                    <div className="space-y-3">
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          style={{ width: `${animatedPercentages[index]}%` }}
                          data-testid={`skill-progress-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Proficiency</span>
                        <span className="font-semibold">{animatedPercentages[index]}%</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {skill.technologies.map((tech) => (
                          <Badge 
                            key={tech} 
                            variant="secondary" 
                            className="text-xs"
                            data-testid={`tech-badge-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
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
