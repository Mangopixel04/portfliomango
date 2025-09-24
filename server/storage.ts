import { 
  type User, 
  type InsertUser,
  type ContactMessage,
  type InsertContactMessage,
  type AnalyticsEvent,
  type InsertAnalyticsEvent,
  type Skill,
  type InsertSkill,
  type Project,
  type InsertProject
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  updateContactMessageStatus(id: string, status: string): Promise<ContactMessage | undefined>;

  // Analytics
  createAnalyticsEvent(event: InsertAnalyticsEvent): Promise<AnalyticsEvent>;
  getAnalyticsEvents(limit?: number): Promise<AnalyticsEvent[]>;
  getAnalyticsMetrics(): Promise<{
    liveVisitors: number;
    pageViews: number;
    uniqueSessions: number;
    topPages: Array<{ page: string; views: number }>;
  }>;

  // Skills
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<Skill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;

  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactMessages: Map<string, ContactMessage>;
  private analyticsEvents: Map<string, AnalyticsEvent>;
  private skills: Map<string, Skill>;
  private projects: Map<string, Project>;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.analyticsEvents = new Map();
    this.skills = new Map();
    this.projects = new Map();
    
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize with some default skills
    const defaultSkills: Skill[] = [
      {
        id: randomUUID(),
        name: "3D & WebGL",
        category: "Frontend",
        proficiency: 95,
        technologies: ["Three.js", "WebGL", "Blender", "GSAP"],
        isVisible: true,
        sortOrder: 1,
      },
      {
        id: randomUUID(),
        name: "AI Integration",
        category: "AI/ML",
        proficiency: 88,
        technologies: ["OpenAI API", "TensorFlow.js", "ML5.js"],
        isVisible: true,
        sortOrder: 2,
      },
      {
        id: randomUUID(),
        name: "Frontend",
        category: "Frontend",
        proficiency: 98,
        technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
        isVisible: true,
        sortOrder: 3,
      },
      {
        id: randomUUID(),
        name: "Backend",
        category: "Backend",
        proficiency: 92,
        technologies: ["Node.js", "Python", "PostgreSQL", "Redis"],
        isVisible: true,
        sortOrder: 4,
      },
    ];

    defaultSkills.forEach(skill => this.skills.set(skill.id, skill));

    // Initialize with some default projects
    const defaultProjects: Project[] = [
      {
        id: randomUUID(),
        title: "3D Analytics Dashboard",
        description: "Real-time data visualization platform with interactive 3D charts, WebGL rendering, and AI-powered insights.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Three.js", "D3.js", "WebSockets", "AI/ML"],
        liveUrl: "#",
        githubUrl: "#",
        caseStudyUrl: null,
        isFeatured: true,
        sortOrder: 1,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "AI Shopping Experience",
        description: "Next-generation e-commerce platform with AI product recommendations, voice search, AR try-on features.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        technologies: ["Next.js", "OpenAI", "WebRTC", "AR.js"],
        liveUrl: "#",
        githubUrl: null,
        caseStudyUrl: "#",
        isFeatured: true,
        sortOrder: 2,
        createdAt: new Date(),
      },
    ];

    defaultProjects.forEach(project => this.projects.set(project.id, project));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Contact message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      status: "new",
      createdAt: new Date(),
      projectType: insertMessage.projectType ?? null,
      budget: insertMessage.budget ?? null,
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async updateContactMessageStatus(id: string, status: string): Promise<ContactMessage | undefined> {
    const message = this.contactMessages.get(id);
    if (message) {
      message.status = status;
      this.contactMessages.set(id, message);
      return message;
    }
    return undefined;
  }

  // Analytics methods
  async createAnalyticsEvent(insertEvent: InsertAnalyticsEvent): Promise<AnalyticsEvent> {
    const id = randomUUID();
    const event: AnalyticsEvent = {
      ...insertEvent,
      id,
      timestamp: new Date(),
      eventData: insertEvent.eventData ?? null,
      userAgent: insertEvent.userAgent ?? null,
      ipAddress: insertEvent.ipAddress ?? null,
      sessionId: insertEvent.sessionId ?? null,
    };
    this.analyticsEvents.set(id, event);
    return event;
  }

  async getAnalyticsEvents(limit = 100): Promise<AnalyticsEvent[]> {
    return Array.from(this.analyticsEvents.values())
      .sort((a, b) => (b.timestamp?.getTime() ?? 0) - (a.timestamp?.getTime() ?? 0))
      .slice(0, limit);
  }

  async getAnalyticsMetrics() {
    const events = Array.from(this.analyticsEvents.values());
    const pageViews = events.filter(e => e.eventType === 'page_view').length;
    const uniqueSessions = new Set(events.map(e => e.sessionId)).size;
    
    // Simulate live visitors (in a real app, this would be calculated differently)
    const liveVisitors = Math.floor(Math.random() * 2000) + 500;
    
    // Calculate top pages
    const pageViewEvents = events.filter(e => e.eventType === 'page_view');
    const pageCount = new Map<string, number>();
    
    pageViewEvents.forEach(event => {
      try {
        const data = JSON.parse(event.eventData || '{}');
        const page = data.page || '/';
        pageCount.set(page, (pageCount.get(page) || 0) + 1);
      } catch (e) {
        // Ignore invalid JSON
      }
    });

    const topPages = Array.from(pageCount.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);

    return {
      liveVisitors,
      pageViews,
      uniqueSessions,
      topPages,
    };
  }

  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => skill.isVisible)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const skill: Skill = { 
      ...insertSkill, 
      id,
      technologies: insertSkill.technologies ?? null,
      isVisible: insertSkill.isVisible ?? null,
      sortOrder: insertSkill.sortOrder ?? null,
    };
    this.skills.set(id, skill);
    return skill;
  }

  async updateSkill(id: string, skillData: Partial<Skill>): Promise<Skill | undefined> {
    const skill = this.skills.get(id);
    if (skill) {
      const updatedSkill = { ...skill, ...skillData };
      this.skills.set(id, updatedSkill);
      return updatedSkill;
    }
    return undefined;
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skills.delete(id);
  }

  // Projects methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.isFeatured)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date(),
      technologies: insertProject.technologies ?? null,
      sortOrder: insertProject.sortOrder ?? null,
      imageUrl: insertProject.imageUrl ?? null,
      liveUrl: insertProject.liveUrl ?? null,
      githubUrl: insertProject.githubUrl ?? null,
      caseStudyUrl: insertProject.caseStudyUrl ?? null,
      isFeatured: insertProject.isFeatured ?? null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, projectData: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (project) {
      const updatedProject = { ...project, ...projectData };
      this.projects.set(id, updatedProject);
      return updatedProject;
    }
    return undefined;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
