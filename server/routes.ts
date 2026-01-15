import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, tempMailAccountSchema, tempMailAuthSchema } from "@shared/schema";
import express from "express";
import multer from "multer";
import mammoth from "mammoth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Soft 404 Redirects for legacy/missing tools
  app.get("/tools/text-analyzer", (req, res) => res.redirect(301, "/tools/word-counter"));
  app.get("/tools/url-shortener", (req, res) => res.redirect(301, "/tools/url-encoder"));

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
        const pdfParse = (await import("pdf-parse")) as any;
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

  // JavaScript minification
  app.post("/api/minify/js", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ error: "No code provided" });
      }

      const { minify } = await import("terser");
      const result = await minify(code);
      
      if (!result.code) {
        return res.status(500).json({ error: "Minification failed" });
      }

      res.json({ code: result.code });
    } catch (error) {
      console.error("JS minification error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Minification failed" });
    }
  });

  // CSS minification
  app.post("/api/minify/css", async (req, res) => {
    try {
      const { code } = req.body;
      if (!code) {
        return res.status(400).json({ error: "No code provided" });
      }

      const CleanCSS = (await import("clean-css")).default;
      const cleaner = new CleanCSS({});
      const result = cleaner.minify(code);

      if (result.errors && result.errors.length > 0) {
        return res.status(400).json({ error: result.errors.join(", ") });
      }

      res.json({ code: result.styles });
    } catch (error) {
      console.error("CSS minification error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Minification failed" });
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

  // Temp Mail API Proxy Routes
  app.get("/api/tempmail/domains", async (req, res) => {
    try {
      const response = await fetch("https://api.mail.tm/domains");
      
      if (!response.ok) {
        return res.status(response.status).json({ 
          error: "Failed to fetch domains from mail service" 
        });
      }
      
      const contentLength = response.headers.get("content-length");
      if (response.status === 204 || contentLength === "0") {
        return res.json({ "@type": "hydra:Collection", "hydra:member": [] });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Temp mail domains error:", error);
      res.status(500).json({ error: "Failed to fetch domains" });
    }
  });

  app.post("/api/tempmail/account", async (req, res) => {
    try {
      const validatedData = tempMailAccountSchema.parse(req.body);
      
      const response = await fetch("https://api.mail.tm/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
        return res.status(response.status).json({ 
          error: "Account creation failed" 
        });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Temp mail account creation error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: error.message 
        });
      }
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.post("/api/tempmail/token", async (req, res) => {
    try {
      const validatedData = tempMailAuthSchema.parse(req.body);
      
      const response = await fetch("https://api.mail.tm/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });
      
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
        return res.status(response.status).json({ 
          error: "Authentication failed" 
        });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Temp mail token error:", error);
      if (error instanceof Error && error.name === "ZodError") {
        return res.status(400).json({ 
          error: "Invalid request data",
          details: error.message 
        });
      }
      res.status(500).json({ error: "Failed to get token" });
    }
  });

  app.get("/api/tempmail/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "No authorization token provided" });
      }

      const response = await fetch("https://api.mail.tm/me", {
        headers: {
          Authorization: authHeader,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          return res.status(401).json({ 
            error: "Invalid or expired token" 
          });
        }
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
        return res.status(response.status).json({ 
          error: "Failed to fetch account info" 
        });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Temp mail me error:", error);
      res.status(500).json({ error: "Failed to fetch account info" });
    }
  });

  app.get("/api/tempmail/messages", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "No authorization token provided" });
      }

      const response = await fetch("https://api.mail.tm/messages", {
        headers: {
          Authorization: authHeader,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          return res.status(401).json({ 
            error: "Invalid or expired token",
            shouldClearSession: true
          });
        }
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
        return res.status(response.status).json({ 
          error: "Failed to fetch messages" 
        });
      }
      
      const contentLength = response.headers.get("content-length");
      if (response.status === 204 || contentLength === "0") {
        return res.json({ "@type": "hydra:Collection", "hydra:member": [] });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Temp mail messages error:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.get("/api/tempmail/messages/:id", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "No authorization token provided" });
      }

      const { id } = req.params;
      const response = await fetch(`https://api.mail.tm/messages/${id}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          return res.status(401).json({ 
            error: "Invalid or expired token",
            shouldClearSession: true
          });
        }
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          return res.status(response.status).json(errorData);
        }
        return res.status(response.status).json({ 
          error: "Failed to fetch message" 
        });
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Temp mail message fetch error:", error);
      res.status(500).json({ error: "Failed to fetch message" });
    }
  });

  // Generate sitemap.xml - Comprehensive sitemap with ALL 175+ tools for maximum SEO coverage
  app.get("/sitemap.xml", (req, res) => {
    const baseUrl = "https://tools.pixocraft.in";
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Redirect missing tools to avoid soft 404s
    const soft404Redirects: Record<string, string> = {
      "/tools/text-analyzer": "/tools/word-counter",
      "/tools/url-shortener": "/tools/url-encoder"
    };

    // ... handle redirects in middleware or separately, but for sitemap we just exclude them or ensure they point to valid paths
    
    // Static pages
    const staticPages = [
      { url: "", priority: "1.0", changefreq: "weekly" }, // homepage
      { url: "/tools", priority: "0.9", changefreq: "weekly" },
      { url: "/blogs", priority: "0.8", changefreq: "daily" },
      { url: "/about", priority: "0.6", changefreq: "monthly" },
      { url: "/contact", priority: "0.6", changefreq: "monthly" },
      { url: "/privacy", priority: "0.5", changefreq: "monthly" },
    ];

    // COMPREHENSIVE Tool pages - All 175+ tools for maximum SEO coverage
    const toolPaths = [
      "/tools/temp-mail", "/tools/password-generator", "/tools/qr-maker", "/tools/image-compressor",
      "/tools/text-case-converter", "/tools/word-counter", "/tools/json-formatter", "/tools/url-encoder",
      "/tools/color-picker", "/tools/username-generator", "/tools/password-strength-checker", "/tools/text-summarizer",
      "/tools/image-resizer", "/tools/base64-encoder", "/tools/barcode-generator", "/tools/json-csv-converter",
      "/tools/json-yaml-converter", "/tools/code-beautifier", "/tools/css-minifier", "/tools/js-minifier",
      "/tools/html-beautifier", "/tools/regex-tester", "/tools/markdown-editor", "/tools/api-snippet-builder",
      "/tools/text-differ", "/tools/image-to-base64", "/tools/base64-to-image", "/tools/hex-rgb-converter",
      "/tools/color-palette-generator", "/tools/gradient-generator", "/tools/box-shadow-generator", "/tools/border-radius-generator",
      "/tools/image-cropper", "/tools/random-number-generator", "/tools/favicon-generator", "/tools/file-to-base64",
      "/tools/html-encoder-decoder", "/tools/emoji-remover", "/tools/text-repeater", "/tools/sentence-case-converter",
      "/tools/utm-builder", "/tools/meta-tag-generator", "/tools/og-preview", "/tools/timer-stopwatch",
      "/tools/invoice-generator", "/tools/receipt-generator", "/tools/quotation-generator", "/tools/area-converter",
      "/tools/commission-calculator", "/tools/emi-calculator", "/tools/percentage-calculator", "/tools/age-calculator",
      "/tools/time-difference-calculator", "/tools/time-difference-calculator/payroll-billing",
      "/tools/time-difference-calculator/online-duration", "/tools/time-difference-calculator/project-tracking",
      "/tools/time-difference-calculator/work-hours",
      "/tools/time-difference-calculator", "/tools/expense-tracker", "/tools/text-to-speech", "/tools/speech-to-text",
      "/tools/unit-converter", "/tools/pdf-merger", "/tools/pdf-splitter", "/tools/pdf-rotator",
      "/tools/pdf-to-image", "/tools/image-to-pdf", "/tools/character-map", "/tools/ascii-converter",
      "/tools/text-diff", "/tools/days-calculator", "/tools/stopwatch", "/tools/countdown-timer",
      "/tools/currency-formatter", "/tools/loan-calculator", "/tools/mortgage-calculator", "/tools/tip-calculator",
      "/tools/average-calculator", "/tools/random-string-generator", "/tools/fraction-calculator", "/tools/roman-numeral-converter",
      "/tools/text-cleaner", "/tools/text-encrypt-decrypt", "/tools/hash-generator", "/tools/number-sorter",
      "/tools/pay-split-calculator", "/tools/matrix-calculator", "/tools/case-randomizer", "/tools/title-case-converter",
      "/tools/slug-generator", "/tools/morse-code-translator", "/tools/nato-phonetic-converter", "/tools/superscript-generator",
      "/tools/subscript-generator", "/tools/glitch-text-generator", "/tools/word-frequency-counter", "/tools/text-spacer",
      "/tools/random-emoji-generator", "/tools/dominant-color-finder", "/tools/image-pixelator", "/tools/image-blur-tool",
      "/tools/exif-remover", "/tools/gradient-text-generator", "/tools/button-css-generator", "/tools/flexbox-playground",
      "/tools/css-grid-generator", "/tools/outline-css-generator", "/tools/variable-font-viewer", "/tools/random-hex-color",
      "/tools/palette-shuffler", "/tools/advanced-box-shadow", "/tools/text-highlight-generator", "/tools/fancy-text-generator",
      "/tools/ascii-art-generator", "/tools/symbol-combiner", "/tools/text-rotator", "/tools/pangram-checker",
      "/tools/random-word-generator", "/tools/json-tree-viewer", "/tools/css-clamp-generator", "/tools/css-animation-generator",
      "/tools/html-minifier", "/tools/extract-numbers", "/tools/remove-numbers", "/tools/image-darken-tool",
      "/tools/image-lighten-tool", "/tools/image-mirror-tool", "/tools/image-invert-tool", "/tools/image-grayscale-tool",
      "/tools/image-rotate-tool", "/tools/signature-pad-tool", "/tools/prime-number-checker", "/tools/prime-number-generator",
      "/tools/prime-factorization", "/tools/lcm-hcf-calculator", "/tools/ratio-simplifier", "/tools/percentage-change-calculator",
      "/tools/mean-median-mode-calculator", "/tools/triangle-area-calculator", "/tools/circle-calculator", "/tools/fibonacci-generator",
      "/tools/quadratic-solver", "/tools/modulo-calculator", "/tools/exponent-calculator", "/tools/simple-interest-calculator",
      "/tools/compound-interest-calculator", "/tools/age-gap-calculator", "/tools/height-converter", "/tools/random-animal-generator",
      "/tools/random-object-generator", "/tools/random-fake-address", "/tools/random-movie-suggestion", "/tools/random-hindi-name",
      "/tools/random-tech-stack", "/tools/random-startup-idea", "/tools/random-riddle", "/tools/random-task",
      "/tools/random-superhero-name", "/tools/random-truth-dare", "/tools/random-motivational-quote", "/tools/pdf-compressor",
      "/tools/pdf-password-remover", "/tools/pdf-watermark-adder", "/tools/pdf-watermark-remover", "/tools/heic-to-jpg",
      "/tools/jpg-to-png", "/tools/png-to-jpg", "/tools/video-to-gif", "/tools/gif-compressor",
      "/tools/mp3-cutter", "/tools/audio-to-mp3", "/tools/video-compressor", "/tools/background-remover",
      "/tools/image-upscaler", "/tools/excel-to-pdf", "/tools/excel-viewer", "/tools/html-to-pdf",
      "/tools/audio-noise-remover", "/tools/gif-to-mp4", "/tools/mp4-to-mp3",
      "/tools/text", "/tools/image", "/tools/pdf", "/tools/media", "/tools/developer",
      "/tools/math", "/tools/random", "/tools/productivity", "/tools/color", "/tools/ai", "/tools/privacy"
    ];
    
    const toolPages = toolPaths.map(path => ({
      url: path,
      priority: "0.9",
      changefreq: "weekly"
    }));

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
