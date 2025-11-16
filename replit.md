# Pixocraft Tools

## Overview

Pixocraft Tools is a comprehensive multi-tool web platform offering 175+ free, privacy-focused online utilities. The application is built as a single-page application (SPA) with a React frontend and Express backend, featuring production-ready SEO optimization with comprehensive schema.org markup, dynamic sitemap generation, and Indian market keyword targeting.

The project targets the domain `tools.pixocraft.in` and emphasizes organic search visibility through structured data, breadcrumb navigation, sitelinks search box integration, and a comprehensive sitemap covering all 175+ tools.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript
- Vite as the build tool and development server
- Wouter for client-side routing
- TanStack Query (React Query) for data fetching and state management
- Tailwind CSS for styling with custom design system
- shadcn/ui component library (Radix UI primitives)

**Design System:**
- Typography: Inter (primary), JetBrains Mono (monospace)
- Styling approach: Hybrid utility-first system inspired by Linear and Material Design
- Component variants using class-variance-authority
- Custom color system with CSS variables for theme support
- Responsive grid layouts with mobile-first approach

**Routing Strategy:**
- Client-side routing with Wouter
- Static routes for tools (`/tools/[tool-name]`)
- Dynamic blog routes (`/blogs/:slug`)
- SEO optimization through custom `useSEO` hook that manages meta tags and structured data

**State Management:**
- React Query for server state and caching
- React Hook Form with Zod validation for form handling
- Local component state for UI interactions

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- Custom Vite middleware integration for development
- Static file serving for production builds

**API Structure:**
- RESTful endpoints under `/api` prefix
- Contact form submission endpoint (`POST /api/contact`)
- Text summarization endpoint (`POST /api/summarize`) - uses HuggingFace API
- Text extraction from files (`POST /api/text/extract`) - supports PDF, DOCX, TXT
- Dynamic sitemap generation (`GET /sitemap.xml`)
- Blog data served as static JSON files

**Development vs Production:**
- Development: Vite dev server with HMR
- Production: Pre-built static assets served by Express
- Replit-specific plugins for development tooling

### Data Storage

**Current Implementation:**
- In-memory storage using `MemStorage` class
- Contact messages stored temporarily in Map structure
- No persistent database currently configured

**Schema Definition:**
- Zod schemas in `shared/schema.ts` for runtime validation
- TypeScript types derived from Zod schemas
- Drizzle ORM configured for PostgreSQL (ready for database integration)

**Database Configuration (Prepared but Not Active):**
- Drizzle Kit configured with PostgreSQL dialect
- Schema file: `shared/schema.ts`
- Migration output directory: `./migrations`
- Connection via `DATABASE_URL` environment variable
- Neon serverless driver specified in dependencies

### SEO and Content Strategy

**Comprehensive SEO Implementation (November 2025):**
- Custom `useSEO` hook for managing document metadata with schema.org integration
- Dynamic title, description, keywords per page optimized for Indian market
- Canonical URLs and Open Graph tags for all pages
- Production-ready structured data generators in `client/src/lib/seo.tsx`:
  - `generateWebPageSchema()` - Basic WebPage markup for all pages
  - `generateSoftwareApplicationSchema()` - Tool-specific application schema
  - `generateBreadcrumbSchema()` - Breadcrumb navigation schema
  - `generateItemListSchema()` - Tool collection schema for listings
  - `generateSitelinkSearchActionSchema()` - Google sitelinks search box
- Reusable `<Breadcrumb>` component with automatic schema injection
- All schemas follow Google's guidelines (no fabricated ratings/reviews)

**Sitemap System:**
- Comprehensive XML sitemap at `/sitemap.xml` with 184 URLs:
  - 175+ tool pages (priority: 0.9, weekly updates)
  - 6 static pages (homepage, tools, blogs, about, contact, privacy)
  - 3 blog posts (priority: 0.7, monthly updates)
- Production-ready implementation with embedded tool paths
- Robots.txt configured at `/robots.txt` pointing to sitemap
- **Maintenance Note:** Tool paths are embedded in `server/routes.ts` sitemap handler. When adding new tools, update the `toolPaths` array to keep sitemap in sync.

**Blog System:**
- JSON-based content storage (`client/public/blogs/data.json`)
- Structured content with type-safe schema
- Support for various content blocks (headings, paragraphs, lists, code, images)
- Related tools linking for cross-promotion

### Component Architecture

**Layout Components:**
- Sticky header with navigation
- Responsive mobile menu (hamburger)
- Footer with quick links and branding
- Floating feedback button (appears on all pages, opens user's email client)

**Page Structure:**
- Homepage: Hero + tool grid + blog preview
- Tools listing: Categorized tool cards
- Individual tool pages: Unique layouts per tool
- Blog listing and detail pages
- Static pages (About, Contact, Privacy)

**UI Components:**
- 40+ shadcn/ui components (buttons, cards, forms, dialogs, etc.)
- Consistent styling through component variants
- Accessibility features via Radix UI primitives
- Form components with react-hook-form integration

## External Dependencies

### Third-Party Services

**Email Service:**
- Temp Mail tool integrates with Mail.tm API
- Feedback system uses mailto: links to open user's email client
- Support email: support@pixocraft.in
- Contact form available on Contact page
- Floating feedback button available on all pages (via FeedbackButton component)

**Analytics and Tracking:**
- No analytics services currently integrated
- Privacy-first approach mentioned in Privacy Policy

### NPM Packages

**Core Framework:**
- `express` - Web server
- `react` and `react-dom` - UI framework
- `vite` - Build tool and dev server
- `wouter` - Routing library

**Database and ORM:**
- `drizzle-orm` and `drizzle-kit` - Database ORM
- `@neondatabase/serverless` - PostgreSQL driver
- `connect-pg-simple` - PostgreSQL session store

**UI and Styling:**
- `tailwindcss` - Utility-first CSS framework
- `@radix-ui/*` - Accessible UI component primitives (40+ packages)
- `class-variance-authority` and `clsx` - Class name utilities
- `lucide-react` - Icon library

**Forms and Validation:**
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation integration

**Data Fetching:**
- `@tanstack/react-query` - Server state management
- `axios` - HTTP client

**Tool-Specific Libraries:**
- `qrcode` - QR code generation
- `browser-image-compression` - Image compression
- Date utilities and other tool-specific packages

**Development Tools:**
- `tsx` - TypeScript execution
- `esbuild` - JavaScript bundler for production
- Replit-specific plugins for development environment

### Build and Deployment

**Build Process:**
- Frontend: Vite bundles React app to `dist/public`
- Backend: esbuild bundles Express server to `dist`
- TypeScript compilation checking via `tsc`

**Environment Variables:**
- `DATABASE_URL` - PostgreSQL connection string (required for Drizzle)
- `HUGGINGFACE_API_KEY` - API key for AI text summarization feature (required for text summarizer tool)
- `NODE_ENV` - Environment flag (development/production)
- `REPL_ID` - Replit environment detection

**Hosting Considerations:**
- Designed for static hosting with API server
- Session support prepared but not fully implemented
- No authentication system currently active