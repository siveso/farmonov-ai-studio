import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // admin, user
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Posts table for blog articles
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(), // Array of tag strings
  author: text("author").notNull().default("Akram Farmonov"),
  featuredImage: text("featured_image"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  readTime: integer("read_time"), // in minutes
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Projects table for portfolio
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description"),
  category: text("category").notNull(), // Web Sayt, Telegram Bot, AI Chatbot, Avtomatlashtirish
  technologies: text("technologies").array(),
  features: text("features").array(),
  results: json("results"), // JSON object for metrics like traffic, sales, etc.
  images: text("images").array(),
  client: text("client"),
  year: text("year"),
  duration: text("duration"),
  featured: boolean("featured").default(false),
  liveUrl: text("live_url"),
  caseStudyUrl: text("case_study_url"),
  githubUrl: text("github_url"),
  telegramUrl: text("telegram_url"),
  testimonial: json("testimonial"), // JSON object with client testimonial
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  features: text("features").array(),
  pricing: json("pricing"), // JSON object with from, average, premium pricing
  timeline: text("timeline"),
  technologies: text("technologies").array(),
  icon: text("icon"), // Icon name from lucide-react
  color: text("color").default("primary"), // primary, secondary, accent
  popular: boolean("popular").default(false),
  active: boolean("active").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Leads table for contact form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  businessType: text("business_type"),
  serviceType: text("service_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  message: text("message"),
  source: text("source").default("contact_form"), // contact_form, telegram, referral
  status: text("status").default("new"), // new, contacted, qualified, converted, closed
  priority: text("priority").default("medium"), // low, medium, high
  notes: text("notes"),
  followUpDate: timestamp("follow_up_date"),
  convertedAt: timestamp("converted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Blog scheduler table for automated posting
export const blogScheduler = pgTable("blog_scheduler", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id),
  scheduledAt: timestamp("scheduled_at").notNull(),
  executed: boolean("executed").default(false),
  executedAt: timestamp("executed_at"),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Analytics table for tracking
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  userAgent: text("user_agent"),
  referer: text("referer"),
  ip: text("ip"),
  country: text("country"),
  device: text("device"), // mobile, desktop, tablet
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

// Create insert schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
  likes: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  priority: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  timestamp: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
