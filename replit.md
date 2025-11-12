# Pixocraft Tools

## Overview

Pixocraft Tools is a multi-tool web platform offering free, privacy-focused online utilities. The application is built as a single-page application (SPA) with a React frontend and Express backend, designed to provide fast, SEO-optimized tools without requiring user registration. The platform currently includes tools like Temp Mail Generator, Password Generator, QR Code Maker, and Image Compressor, with architecture designed for easy expansion.

The project targets the domain `tools.pixocraft.in` and emphasizes organic search visibility through dynamic SEO, unique tool layouts, and a JSON-based blog system.

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

**SEO Implementation:**
- Custom `useSEO` hook for managing document metadata
- Dynamic title, description, keywords per page
- Canonical URLs for all pages
- Open Graph and structured data (JSON-LD) support
- Separate meta tags for blog articles with author and publish time

**Blog System:**
- JSON-based content storage (`client/public/blogs/data.json`)
- Structured content with type-safe schema
- Support for various content blocks (headings, paragraphs, lists, code, images)
- Related tools linking for cross-promotion

**Sitemap Generation:**
- Dynamically generated XML sitemap
- Includes all static pages, tool pages, and blog posts
- Priority and change frequency metadata for SEO

### Component Architecture

**Layout Components:**
- Sticky header with navigation
- Responsive mobile menu (hamburger)
- Footer with quick links and branding

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

**Email Service (Planned):**
- Temp Mail tool integrates with Mail.tm API
- No backend email service currently configured

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
- `NODE_ENV` - Environment flag (development/production)
- `REPL_ID` - Replit environment detection

**Hosting Considerations:**
- Designed for static hosting with API server
- Session support prepared but not fully implemented
- No authentication system currently active