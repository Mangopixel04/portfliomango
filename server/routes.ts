import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertAnalyticsEventSchema,
  insertSkillSchema,
  insertProjectSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      res.json({ 
        success: true, 
        message: "Message sent successfully!",
        id: message.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again." 
        });
      }
    }
  });

  // Get all contact messages (admin endpoint)
  app.get("/api/contact/messages", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, data: messages });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch messages" 
      });
    }
  });

  // Update contact message status
  app.patch("/api/contact/messages/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status || !['new', 'read', 'replied'].includes(status)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid status value" 
        });
      }

      const updatedMessage = await storage.updateContactMessageStatus(id, status);
      
      if (!updatedMessage) {
        return res.status(404).json({ 
          success: false, 
          message: "Message not found" 
        });
      }

      res.json({ success: true, data: updatedMessage });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update message status" 
      });
    }
  });

  // Analytics event tracking
  app.post("/api/analytics/events", async (req, res) => {
    try {
      // Extract client information
      const clientInfo = {
        userAgent: req.headers['user-agent'] || '',
        ipAddress: req.ip || req.connection.remoteAddress || '',
        sessionId: req.headers['x-session-id'] as string || '',
      };

      const eventData = {
        ...req.body,
        ...clientInfo,
      };

      const validatedData = insertAnalyticsEventSchema.parse(eventData);
      const event = await storage.createAnalyticsEvent(validatedData);
      
      res.json({ success: true, id: event.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid event data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to track event" 
        });
      }
    }
  });

  // Get analytics metrics
  app.get("/api/analytics/metrics", async (req, res) => {
    try {
      const metrics = await storage.getAnalyticsMetrics();
      res.json({ success: true, data: metrics });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch analytics metrics" 
      });
    }
  });

  // Get analytics events
  app.get("/api/analytics/events", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const events = await storage.getAnalyticsEvents(limit);
      res.json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch analytics events" 
      });
    }
  });

  // Skills management
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json({ success: true, data: skills });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch skills" 
      });
    }
  });

  app.post("/api/skills", async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.json({ success: true, data: skill });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create skill" 
        });
      }
    }
  });

  app.patch("/api/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSkill = await storage.updateSkill(id, req.body);
      
      if (!updatedSkill) {
        return res.status(404).json({ 
          success: false, 
          message: "Skill not found" 
        });
      }

      res.json({ success: true, data: updatedSkill });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update skill" 
      });
    }
  });

  app.delete("/api/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteSkill(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: "Skill not found" 
        });
      }

      res.json({ success: true, message: "Skill deleted successfully" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete skill" 
      });
    }
  });

  // Projects management
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json({ success: true, data: projects });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch projects" 
      });
    }
  });

  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json({ success: true, data: projects });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch featured projects" 
      });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }

      res.json({ success: true, data: project });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch project" 
      });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json({ success: true, data: project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create project" 
        });
      }
    }
  });

  app.patch("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProject = await storage.updateProject(id, req.body);
      
      if (!updatedProject) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }

      res.json({ success: true, data: updatedProject });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to update project" 
      });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: "Project not found" 
        });
      }

      res.json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete project" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      success: true, 
      message: "Portfolio API is running",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Error handling middleware
  app.use((error: any, req: any, res: any, next: any) => {
    console.error('API Error:', error);
    
    if (res.headersSent) {
      return next(error);
    }

    const status = error.status || error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    res.status(status).json({ 
      success: false, 
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
