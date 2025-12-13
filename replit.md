# Pixocraft Tools

## Overview
Pixocraft Tools is a comprehensive multi-tool web platform offering 175+ free, privacy-focused online utilities. It's built as a single-page application (SPA) with a React frontend and Express backend, featuring production-ready SEO optimization tailored for the Indian market. The platform aims for high organic search visibility through structured data, dynamic sitemap generation, and extensive keyword targeting for the `tools.pixocraft.in` domain.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Technology Stack:** React 18, TypeScript, Vite, Wouter (routing), TanStack Query (data fetching), Tailwind CSS, shadcn/ui.
- **Design System:** Inter and JetBrains Mono fonts, hybrid utility-first styling (inspired by Linear/Material Design), custom CSS variable-based color system, responsive mobile-first grid layouts.
- **Routing:** Client-side with Wouter for static (`/tools/[tool-name]`) and dynamic (`/blogs/:slug`) routes, with a custom `useSEO` hook for meta tags and structured data.
- **State Management:** React Query for server state, React Hook Form with Zod for form handling, local component state for UI.

### Backend
- **Server:** Express.js with TypeScript, integrated with Vite middleware for development, serving static files in production.
- **API:** RESTful endpoints under `/api` for contact forms, AI text summarization (HuggingFace API), text extraction from files (PDF, DOCX, TXT), and dynamic sitemap generation. Blog data is served via static JSON files.
- **Development/Production:** Vite dev server with HMR for development; pre-built static assets served by Express in production.

### Data Storage
- **Current:** In-memory storage for temporary data (e.g., contact messages).
- **Schema:** Zod schemas in `shared/schema.ts` for validation, with TypeScript types. Drizzle ORM is configured for PostgreSQL, ready for future database integration.

### SEO and Content Strategy
- **SEO:** Custom `useSEO` hook manages document metadata, schema.org integration (WebPage, SoftwareApplication, Breadcrumb, ItemList, SitelinkSearchAction), dynamic titles/descriptions, canonical URLs, and Open Graph tags.
- **Sitemap:** Comprehensive XML sitemap at `/sitemap.xml` listing 175+ tools, static pages, and blog posts. `robots.txt` points to the sitemap.
- **Blog System:** JSON-based content (`client/public/blogs/data.json`) with type-safe schema and support for rich content blocks.

### Component Architecture
- **Layout:** Sticky header, responsive mobile menu, footer, and a floating feedback button.
- **Page Structure:** Homepage (hero, tool grid, blog preview), categorized tool listings, individual tool pages, blog pages, and static pages (About, Contact, Privacy).
- **UI Components:** 40+ shadcn/ui components (based on Radix UI) with consistent styling and accessibility features.

## External Dependencies

### Third-Party Services
- **Email:** Mail.tm API for Temp Mail tool; `mailto:` links for feedback; contact form integration.
- **AI/ML:** HuggingFace API for AI text summarization.
- **Analytics:** None currently integrated, emphasizing a privacy-first approach.

### NPM Packages
- **Core:** `express`, `react`, `react-dom`, `vite`, `wouter`.
- **Database:** `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`, `connect-pg-simple`.
- **UI/Styling:** `tailwindcss`, `@radix-ui/*`, `class-variance-authority`, `clsx`, `lucide-react`.
- **Forms/Validation:** `react-hook-form`, `zod`, `@hookform/resolvers`.
- **Data Fetching:** `@tanstack/react-query`, `axios`.
- **Tool-Specific:** `qrcode`, `browser-image-compression`, various date utilities.
- **Dev Tools:** `tsx`, `esbuild`.

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string.
- `HUGGINGFACE_API_KEY`: API key for AI text summarization.
- `NODE_ENV`: Environment flag.
- `REPL_ID`: Replit environment detection.