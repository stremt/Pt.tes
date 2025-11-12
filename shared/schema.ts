import { z } from "zod";

// Blog post schema
export const blogContentItemSchema = z.object({
  type: z.enum(["h2", "h3", "p", "ul", "ol", "code", "image"]),
  text: z.string().optional(),
  items: z.array(z.string()).optional(), // for lists
  src: z.string().optional(), // for images
  alt: z.string().optional(), // for images
  caption: z.string().optional(), // for images
});

export const blogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  author: z.string(),
  meta: z.object({
    description: z.string(),
    keywords: z.string(),
  }),
  content: z.array(blogContentItemSchema),
  relatedTools: z.array(z.string()).optional(),
});

export type BlogPost = z.infer<typeof blogPostSchema>;
export type BlogContentItem = z.infer<typeof blogContentItemSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Tool metadata
export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: "privacy" | "utility" | "generator";
  keywords: string[];
}
