import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import express from "express";
import multer from "multer";
import mammoth from "mammoth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for file uploads
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
  });

  // Serve blog data
  app.use("/blogs", express.static("client/public/blogs"));

  // Text extraction from files (PDF, DOCX, TXT)
  app.post("/api/text/extract", upload.single("file"), async (req: Request, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = req.file as Express.Multer.File;
      let extractedText = "";

      // Extract text based on file type
      if (file.mimetype === "application/pdf") {
        // Dynamically import pdf-parse for ES module compatibility
        const { default: pdfParse } = await import("pdf-parse");
        const pdfData = await pdfParse(file.buffer);
        extractedText = pdfData.text;
      } else if (
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        extractedText = result.value;
      } else if (file.mimetype === "text/plain") {
        extractedText = file.buffer.toString("utf-8");
      } else {
        return res.status(400).json({ error: "Unsupported file type. Please upload PDF, DOCX, or TXT files." });
      }

      // Limit text length to prevent abuse
      if (extractedText.length > 100000) {
        extractedText = extractedText.substring(0, 100000);
      }

      res.json({ text: extractedText });
    } catch (error) {
      console.error("Text extraction error:", error);
      res.status(500).json({ error: "Failed to extract text from file" });
    }
  });

  // Text summarization using HuggingFace API
  app.post("/api/summarize", async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "No text provided" });
      }

      const apiKey = process.env.HUGGINGFACE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Server configuration error: API key not configured" });
      }

      // Limit text length
      const maxLength = 8000;
      const textToSummarize = text.length > maxLength ? text.substring(0, maxLength) : text;

      // Call HuggingFace API
      const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: textToSummarize,
            parameters: {
              max_length: 150,
              min_length: 30,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("HuggingFace API error:", errorData);
        return res.status(response.status).json({ 
          error: errorData.error || "Failed to summarize text",
          details: errorData
        });
      }

      const result = await response.json();
      
      // Handle model loading state
      if (result.error && result.error.includes("loading")) {
        return res.status(503).json({ 
          error: "Model is loading. Please try again in a few seconds.",
          loading: true
        });
      }

      res.json({ summary: result[0]?.summary_text || result });
    } catch (error) {
      console.error("Summarization error:", error);
      res.status(500).json({ error: "Failed to summarize text" });
    }
  });

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
      { url: "/tools/text-summarizer", priority: "0.9", changefreq: "weekly" },
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
