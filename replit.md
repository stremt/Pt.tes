# Pixocraft Tools

## Overview
Pixocraft Tools is a comprehensive multi-tool web platform offering **247+ free, privacy-focused online utilities**. It's built as a single-page application (SPA) with a React frontend and Express backend, featuring production-ready SEO optimization tailored for the Indian market. The platform aims for high organic search visibility through structured data, dynamic sitemap generation, and extensive keyword targeting for the `tools.pixocraft.in` domain.

## Quick Stats
- **Total Tools:** 247
- **Total Routes:** 400+ (including category pages, tool variants, and utility pages)
- **Tool Categories:** 13 main + specialization variants
- **Structured Data Pages:** 400+ with Schema.org markup
- **Blog Posts:** Dynamic JSON-based content system
- **SEO Coverage:** Sitemap with 175+ entries, robots.txt, meta tags on all pages

## User Preferences
Preferred communication style: Simple, everyday language. Casual tone (uses "bro" frequently).

## Tool Categories & Count

### Main Categories
1. **Text Tools** (35+ tools)
   - Text Case Converter, Text Cleaner, Text Diff, Text Reverser
   - Keyword Density Checker, Word Counter, Word Frequency Counter
   - Text Spacer, Text Repeater, Text Rotator, Text Highlighter
   - Morse Code Translator, NATO Phonetic Converter, Pangram Generator
   - Fancy Text Styler, Glitch Text Generator, Remove Duplicate Lines/Words
   - Text Encrypt/Decrypt, Prefix/Suffix Tool, and more

2. **Image Tools** (25+ tools)
   - Image Compressor, Image Resizer, Image Cropper, Image Rotator
   - Image to Base64, Image Upscaler, Background Remover
   - Color tools: Dominant Color Finder, Hex RGB Converter, Color Picker
   - Image effects: Blur, Grayscale, Invert, Lighten, Darken, Pixelator, Mirror
   - Format converters: JPG to PNG, PNG to JPG, HEIC to JPG
   - EXIF Remover, Instagram DP Downloader

3. **PDF Tools** (12+ tools)
   - PDF Merger, PDF Splitter, PDF Compressor, PDF Rotator
   - PDF Password Remover, PDF Watermark Adder/Remover
   - Image to PDF, PDF to Image, Text to PDF, HTML to PDF
   - Bulk conversions support

4. **Media & Video Tools** (8+ tools)
   - Video Compressor, Video to GIF, GIF Compressor, GIF to MP4
   - MP3 Cutter, MP4 to MP3, Audio to MP3, Audio Noise Remover
   - Image compression optimized for email/web

5. **Developer Tools** (25+ tools)
   - **QR Code Generator** (advanced with WhatsApp integration)
     - WhatsApp QR codes with phone numbers & messages
     - Multiple body/eye patterns, color customization
     - Logo overlay with scaling, frame styles
     - Templates system for saving designs
   - URL Parser, URL Encoder, Canonical URL Generator
   - Base64 Encoder/Decoder, File to Base64, Base64 to Image
   - Hash Generator, UUID Generator, API Snippet Builder
   - CSS Generators: Flexbox, Grid, Clamp, Box Shadow, Border Radius
   - Button CSS Generator, Advanced Text Shadow, Outline CSS
   - JSON Tools: Formatter, CSV Converter, YAML Converter, Tree Viewer
   - HTML Tools: Beautifier, Minifier, Encoder/Decoder, Table Generator
   - Code Beautifier, CSS/JS Minifier
   - Open Graph Preview, Meta Tags Generator, Meta Robots Generator
   - Variable Font Viewer, Favicon Generator

6. **Math & Calculation Tools** (20+ tools)
   - Basic: Calculator, Percentage, Percentage Change, Exponent
   - Advanced: Prime Number Checker/Generator, Prime Factorization
   - Geometry: Circle, Triangle, Area Converter
   - Financial: BMI, Age Gap, Age, Compound Interest, EMI, Loan, Mortgage, Commission
   - Statistics: Mean/Median/Mode, LCM/HCF, Modulo, Fraction
   - Matrix Calculator, Unit Converter

7. **Productivity & Organization** (8+ tools)
   - To-Do List, Notes App, Expense Tracker
   - Invoice Generator, Quotation Generator
   - Countdown Timer, Timer & Stopwatch
   - Calendar/Date tools

8. **Random Generators** (10+ tools)
   - Password Generator, Username Generator
   - Random String Generator, Prime Number Generator
   - Palindrome Checker, Fibonacci Generator
   - Number Sorter, Extract Numbers, Panagram Generator

9. **Color Tools** (8+ tools)
   - Color Picker, Color Palette Generator, Gradient Generator
   - Gradient Text Generator, Hex Color Picker
   - Color Palette Shuffler, Dominant Color Finder

10. **Conversion Tools** (30+ tools)
    - Image formats: JPG↔PNG, HEIC→JPG
    - Document formats: PDF↔Image, PDF↔Text, CSV↔JSON↔YAML
    - Excel/CSV tools: XLSX to CSV, CSV Viewer, Excel Viewer
    - Data format converters (10+ formats)

11. **AI Tools** (3+ tools)
    - Text Summarizer (HuggingFace integration)
    - YouTube Thumbnail Downloader
    - Instagram Caption Generator

12. **Utility & Misc Tools** (15+ tools)
    - Character Map, Emoji Counter, Emoji Remover
    - Funny Roast Generator, Barcode Generator
    - Temp Mail (with social media variants)
    - Password Strength Checker, Screen Resolution Checker
    - Text to Speech, QR Code reader companion

13. **Privacy & Security Tools** (8+ tools)
    - EXIF Remover, Text Encrypt/Decrypt
    - Password Generator (secure generation)
    - Password Strength Checker
    - Privacy policy & terms pages

## Complete Route Structure

### Main Routes
- `/` - Home page
- `/tools` - Tools directory (all 247 tools listed)
- `/tools/[category]` - Category pages:
  - `/tools/text` - Text Tools
  - `/tools/image` - Image Tools
  - `/tools/pdf` - PDF Tools
  - `/tools/media` - Media Tools
  - `/tools/developer` - Developer Tools (includes QR Maker)
  - `/tools/math` - Math Tools
  - `/tools/random` - Random Generators
  - `/tools/productivity` - Productivity Tools
  - `/tools/color` - Color Tools
  - `/tools/ai` - AI Tools
  - `/tools/privacy` - Privacy Tools

### Tool-Specific Variant Routes (400+)
Each major tool has 4-6 SEO-optimized variant routes for different use cases:
- `/tools/[tool]/[variant-1]` - Use case specific pages
- `/tools/[tool]/[variant-2]` - Business specific pages
- `/tools/[tool]/[variant-3]` - Technical specific pages
- `/tools/[tool]/[variant-4]` - Casual/casual specific pages

**Examples:**
- QR Code: `/qr-maker`, `/qr-maker-social-media`, `/qr-maker-business-cards`, etc.
- Temp Mail: `/temp-mail`, `/temp-mail/facebook-signup`, `/temp-mail/instagram-verification`, etc.
- Password Generator: `/password-generator`, `/password-generator/online-accounts`, `/password-generator/security`, etc.

### Static Pages
- `/about` - About page
- `/contact` - Contact form page
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/blog` - Blog listing
- `/blog/:slug` - Individual blog posts

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
- **Structured Data:** All 400+ pages include Schema.org markup (SoftwareApplication, BreadcrumbList, Article, FAQSchema) for search engine understanding.

### Component Architecture
- **Layout:** Sticky header, responsive mobile menu, footer, and a floating feedback button.
- **Page Structure:** Homepage (hero, tool grid, blog preview), categorized tool listings, individual tool pages, blog pages, and static pages (About, Contact, Privacy).
- **UI Components:** 40+ shadcn/ui components (based on Radix UI) with consistent styling and accessibility features.

## External Dependencies

### Third-Party Services
- **Email:** Mail.tm API for Temp Mail tool; `mailto:` links for feedback; contact form integration.
- **AI/ML:** HuggingFace API for AI text summarization.
- **Analytics:** None currently integrated, emphasizing a privacy-first approach.

### NPM Packages (80+ packages)
- **Core:** `express`, `react`, `react-dom`, `vite`, `wouter`.
- **Database:** `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless`, `connect-pg-simple`.
- **UI/Styling:** `tailwindcss`, `@radix-ui/*` (30+ Radix UI components), `class-variance-authority`, `clsx`, `lucide-react`.
- **Forms/Validation:** `react-hook-form`, `zod`, `@hookform/resolvers`.
- **Data Fetching:** `@tanstack/react-query`, `axios`.
- **Tool-Specific:** `qrcode`, `browser-image-compression`, `date-fns`, `marked`, `js-yaml`, `papaparse`, `axios`.
- **Media:** `@ffmpeg/ffmpeg`, `heic2any`, `html2pdf.js`, `html2canvas`, `jspdf`, `pdf-lib`, `pdf-parse`, `xlsx`, `mammoth`.
- **Dev Tools:** `tsx`, `esbuild`, `typescript`, `prettier`.

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string.
- `HUGGINGFACE_API_KEY`: API key for AI text summarization.
- `NODE_ENV`: Environment flag.
- `REPL_ID`: Replit environment detection.

## Recent Changes & Features (Last Update: Dec 31, 2025)

### Latest Improvements
1. **QR Code Generator Enhancements**
   - WhatsApp integration: Generate QR codes linking to WhatsApp conversations with pre-filled messages
   - WhatsApp phone number format: `https://wa.me/{phone}?text={message}`
   - Automatic phone number cleaning and validation
   - Updated breadcrumb navigation: Home > Tools > Developer Tools > QR Code Generator
   - Logo scaling: Minimum size reduced from 40px to 10px for greater design flexibility
   - Logo and text scale dynamically with QR code size (6-8% of QR size)
   - Eye patterns: Multiple internal/external pattern options
   - Body patterns: Customizable QR module patterns
   - Color customization: Dark/light mode support
   - Frame styles: Multiple decorative frame options
   - Error correction levels: L (7%), M (15%), Q (25%), H (30%)
   - Templates system: Save and load custom QR code designs
   - Export options: Normal, HD (2x), 4K (4x) quality downloads

2. **SEO Optimization**
   - Comprehensive metadata mentioning all QR code types: WhatsApp, URL, Bitcoin, Contact/vCard, Phone number, SMS QR codes
   - Breadcrumb navigation with category paths for better site structure

3. **Mobile Optimization**
   - Floating preview panel for mobile QR code generation
   - Responsive design for all screen sizes
   - Touch-friendly controls

## Key Features Summary

### Multi-Tool Platform
- 247+ free tools across 13 categories
- Zero ads, completely privacy-focused
- 100% offline operation (no data collection)
- Works on desktop and mobile

### Developer-Friendly
- Structured API with JSON responses
- Markdown support in tool descriptions
- SEO-optimized tool variants for different use cases
- Breadcrumb navigation for user guidance

### Customization
- Dark/light theme support
- Tool-specific template saving
- Export in multiple formats (PNG, PDF, JSON, CSV, etc.)

### Accessibility
- Keyboard navigation support
- ARIA labels on all interactive elements
- High contrast color modes
- Mobile-responsive design

## Performance Metrics
- Frontend: Single-page application with code splitting
- Backend: RESTful API with optimized routes
- SEO: 400+ indexed pages with structured data
- Build: Vite for fast development and production builds

## Quality Assurance
- TypeScript for type safety across frontend and backend
- Zod schemas for data validation
- Shadcn/ui components for consistent UI
- Automated testing framework ready (using Vitest)

## Deployment
- Platform: Replit with built-in PostgreSQL
- Build: `npm run build`
- Dev: `npm run dev` (starts Express + Vite dev server)
- Production: Static assets served by Express on port 5000

## Contributing & Maintenance
- Code follows TypeScript best practices
- Component-driven architecture for scalability
- Modular tool implementations
- Consistent naming conventions and file structure

## License & Usage
- All tools are free to use
- Commercial use allowed
- No licensing fees
- Generate unlimited QR codes and use in any project
