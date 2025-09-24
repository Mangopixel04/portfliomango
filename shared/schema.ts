import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type"),
  budget: text("budget"),
  message: text("message").notNull(),
  status: text("status").default("new"), // new, read, replied
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  eventType: text("event_type").notNull(), // page_view, click, interaction
  eventData: text("event_data"), // JSON string
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  sessionId: text("session_id"),
  timestamp: timestamp("timestamp").default(sql`now()`),
});

export const skillsData = pgTable("skills_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  proficiency: integer("proficiency").notNull(), // 0-100
  technologies: text("technologies").array(), // Array of technology names
  isVisible: boolean("is_visible").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  technologies: text("technologies").array(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  caseStudyUrl: text("case_study_url"),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  projectType: true,
  budget: true,
  message: true,
});

export const insertAnalyticsEventSchema = createInsertSchema(analyticsEvents).pick({
  eventType: true,
  eventData: true,
  userAgent: true,
  ipAddress: true,
  sessionId: true,
});

export const insertSkillSchema = createInsertSchema(skillsData).pick({
  name: true,
  category: true,
  proficiency: true,
  technologies: true,
  isVisible: true,
  sortOrder: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  imageUrl: true,
  technologies: true,
  liveUrl: true,
  githubUrl: true,
  caseStudyUrl: true,
  isFeatured: true,
  sortOrder: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type InsertAnalyticsEvent = z.infer<typeof insertAnalyticsEventSchema>;

export type Skill = typeof skillsData.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
