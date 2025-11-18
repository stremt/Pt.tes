import { z } from "zod";

// Blog post schema
export const blogContentItemSchema = z.object({
  type: z.enum(["h1", "h2", "h3", "h4", "h5", "h6", "p", "ul", "ol", "code", "image", "blockquote"]),
  text: z.string().optional(),
  items: z.array(z.string()).optional(),
  src: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  language: z.string().optional(),
  id: z.string().optional(),
});

export const blogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  featuredImage: z.string().optional(),
  views: z.number().default(0),
  readingTime: z.number().optional(),
  meta: z.object({
    description: z.string(),
    keywords: z.string(),
  }),
  content: z.array(blogContentItemSchema),
  relatedTools: z.array(z.string()).optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogContentItem = z.infer<typeof blogContentItemSchema>;

export const blogCommentSchema = z.object({
  id: z.string(),
  postSlug: z.string(),
  author: z.string(),
  email: z.string().optional(),
  content: z.string(),
  date: z.string(),
  replies: z.array(z.any()).optional(),
});

export type BlogComment = z.infer<typeof blogCommentSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Temp mail schemas
export const tempMailAccountSchema = z.object({
  address: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const tempMailAuthSchema = z.object({
  address: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TempMailAccount = z.infer<typeof tempMailAccountSchema>;
export type TempMailAuth = z.infer<typeof tempMailAuthSchema>;

// Tool metadata
export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: "privacy" | "utility" | "generator" | "media" | "pdf" | "image" | "developer" | "ai" | "text" | "math" | "productivity" | "color";
  keywords: string[];
}
