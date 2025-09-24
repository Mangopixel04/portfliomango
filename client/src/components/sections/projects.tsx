import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MagneticElement from "@/components/ui/magnetic-element";
import { ExternalLink, Github, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveDemo?: string;
  github?: string;
  caseStudy?: string;
}

const projects: Project[] = [
  {
    id: "3d-dashboard",
    title: "3D Analytics Dashboard",
    description: "Real-time data visualization platform with interactive 3D charts, WebGL rendering, and AI-powered insights. Features live user tracking and predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["Three.js", "D3.js", "WebSockets", "AI/ML"],
    liveDemo: "#",
    github: "#"
  },
  {
    id: "ai-ecommerce",
    title: "AI Shopping Experience",
    description: "Next-generation e-commerce platform with AI product recommendations, voice search, AR try-on features, and personalized shopping experiences.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["Next.js", "OpenAI", "WebRTC", "AR.js"],
    liveDemo: "#",
    caseStudy: "#"
  },
  {
    id: "collaboration-tool",
    title: "Collaborative Workspace",
    description: "Advanced collaboration platform with real-time editing, video conferencing, screen sharing, and AI-powered meeting transcription and summarization.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["React", "WebRTC", "Socket.io", "Speech API"],
    liveDemo: "#",
    github: "#"
  },
  {
    id: "learning-platform",
    title: "3D Learning Platform",
    description: "Immersive educational platform featuring interactive 3D models, virtual labs, gamified learning paths, and AI tutoring assistants.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
    tags: ["Three.js", "WebXR", "Vue.js", "TensorFlow"],
    liveDemo: "#",
    github: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20" data-testid="projects-section">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-16" data-testid="projects-title">
          Featured <span className="gradient-text">Projects</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <MagneticElement key={project.id}>
              <Card className="project-card glassmorphism overflow-hidden h-full" data-testid={`project-${project.id}`}>
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    data-testid={`project-image-${project.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex gap-2">
                      {project.liveDemo && (
                        <Button size="sm" className="bg-primary text-primary-foreground" data-testid={`button-demo-${project.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Demo
                        </Button>
                      )}
                      {project.github && (
                        <Button size="sm" variant="outline" data-testid={`button-github-${project.id}`}>
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4" data-testid={`project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`project-description-${project.id}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6" data-testid={`project-tags-${project.id}`}>
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="bg-primary/20 text-primary hover:bg-primary/30"
                        data-testid={`tag-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${project.id}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    {project.liveDemo && (
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid={`button-live-demo-${project.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                    {project.github && (
                      <Button variant="outline" data-testid={`button-view-code-${project.id}`}>
                        <Github className="h-4 w-4 mr-2" />
                        View Code
                      </Button>
                    )}
                    {project.caseStudy && (
                      <Button variant="outline" data-testid={`button-case-study-${project.id}`}>
                        Case Study
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </MagneticElement>
          ))}
        </div>
      </div>
    </section>
  );
}
