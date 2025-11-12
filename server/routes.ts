import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve blog data
  app.use("/blogs", express.static("client/public/blogs"));

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store contact message
      const message = await storage.createContactMessage(validatedData);
      
      // In a real app, you would send an email notification here
      // For now, we'll just log it and return success
      console.log("Contact message received:", message);
      
      res.json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid form data" 
      });
    }
  });

  // Generate sitemap.xml
  app.get("/sitemap.xml", async (req, res) => {
    const baseUrl = "https://tools.pixocraft.in";
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Static pages
    const staticPages = [
      { url: "", priority: "1.0", changefreq: "weekly" }, // homepage
      { url: "/tools", priority: "0.9", changefreq: "weekly" },
      { url: "/blogs", priority: "0.8", changefreq: "daily" },
      { url: "/about", priority: "0.6", changefreq: "monthly" },
      { url: "/contact", priority: "0.6", changefreq: "monthly" },
      { url: "/privacy", priority: "0.5", changefreq: "monthly" },
    ];

    // Tool pages
    const toolPages = [
      { url: "/tools/temp-mail", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/password-generator", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/qr-maker", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/image-compressor", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/text-case-converter", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/word-counter", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/json-formatter", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/url-encoder", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/color-picker", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/username-generator", priority: "0.9", changefreq: "weekly" },
      { url: "/tools/password-strength-checker", priority: "0.9", changefreq: "weekly" },
    ];

    // Blog posts (dynamically loaded)
    const blogPages = [
      { url: "/blogs/what-is-temp-mail", priority: "0.7", changefreq: "monthly" },
      { url: "/blogs/password-security-best-practices", priority: "0.7", changefreq: "monthly" },
      { url: "/blogs/qr-codes-marketing-guide", priority: "0.7", changefreq: "monthly" },
    ];

    const allPages = [...staticPages, ...toolPages, ...blogPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemap);
  });

  // Serve robots.txt
  app.get("/robots.txt", (req, res) => {
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://tools.pixocraft.in/sitemap.xml`;

    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);
  return httpServer;
}
