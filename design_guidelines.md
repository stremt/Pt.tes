# Pixocraft Tools Design Guidelines

## Design Approach
**Hybrid Utility-First System** drawing from Linear's clean productivity aesthetic and Material Design's functional patterns. Each tool maintains unique micro-layouts while sharing a cohesive design language optimized for speed and SEO.

## Typography System

**Font Stack:**
- Primary: Inter (via Google Fonts CDN)
- Monospace: JetBrains Mono (for technical displays, code)

**Hierarchy:**
- H1: 2.5rem (40px) - font-weight: 700 - Tool titles, page headers
- H2: 2rem (32px) - font-weight: 600 - Section headers
- H3: 1.5rem (24px) - font-weight: 600 - Subsections, card titles
- Body: 1rem (16px) - font-weight: 400 - Primary content
- Small: 0.875rem (14px) - font-weight: 400 - Metadata, labels
- Button: 0.9375rem (15px) - font-weight: 500 - CTAs

## Layout System

**Spacing Primitives:** Tailwind units 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6, p-8
- Section spacing: py-16, py-24 (desktop), py-12 (mobile)
- Card gaps: gap-6, gap-8
- Inline spacing: space-x-4, space-y-6

**Grid System:**
- Homepage tools: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Blog listing: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Tool features: grid-cols-1 md:grid-cols-2
- Max-width containers: max-w-7xl for full sections, max-w-4xl for tool interfaces

## Component Library

### Navigation
- Sticky header with blur backdrop
- Logo left, navigation center/right
- Links: Tools (dropdown), Blogs, About, Contact
- Mobile: Hamburger menu with slide-out panel

### Homepage
- Hero: 60vh height, centered headline + subtitle + primary CTA
- Tool Cards Grid: Icon + title + description + "Use Tool" link, hover lift effect
- "Popular Tools" section highlighting top 3 tools
- Blog preview: 3 latest articles in cards
- Trust indicators: "Fast • Free • No Signup Required"

### Tool Pages (Unique Layouts Per Tool)

**Temp Mail:**
- Split layout: Generator left (40%), Inbox right (60%)
- Prominent email display with copy button
- Live inbox with auto-refresh indicator
- Message list with sender/subject/time
- Message detail panel with raw view option

**Password Generator:**
- Centered card layout (max-w-2xl)
- Large password display box
- Slider controls for length
- Toggle switches for options (uppercase, symbols, numbers)
- Strength meter visualization
- Generate + Copy buttons side-by-side

**QR Code Maker:**
- Two-column: Input form left, preview right
- Input type tabs (Text, URL, Contact)
- Real-time QR code preview
- Download button below QR display
- Size/format options

**Image Compressor:**
- Upload zone (large dropzone or file input)
- Before/After comparison slider
- File size reduction stats (prominent)
- Quality slider with percentage
- Download compressed image button

### Universal Tool Page Elements
- Breadcrumb navigation
- "How It Works" section (3-step visual guide)
- "Why Use This Tool" benefits (grid of 3-4 cards with icons)
- FAQ accordion (minimum 5 questions)
- Related Tools section (3 cards)
- CTA to explore more tools

### Blog System

**Blog Listing:**
- Hero: "Pixocraft Blog" + subtitle
- Featured post (large card, top)
- Grid of posts (card format): thumbnail + title + date + excerpt + "Read More"
- Category filter tabs

**Blog Post:**
- Hero: Title + author + date + reading time
- max-w-prose content area
- Rich formatting support
- Image placeholders with captions
- Code block styling (if applicable)
- Related posts footer (3 cards)
- Internal tool links (CTA boxes)

### Forms (Contact Page)
- Single column (max-w-2xl centered)
- Fields: Name, Email (default: support@pixocraft.in context), Subject, Message
- Floating labels or top-aligned labels
- Clear focus states with outline
- Submit button (full-width on mobile, right-aligned on desktop)
- Contact info sidebar on desktop: Email, response time

### Footer
- Three-column layout (desktop), stacked (mobile)
- Column 1: Pixocraft Tools logo + tagline "Smart, Fast, and Free Online Tools"
- Column 2: Quick links (All Tools, Blogs, About, Privacy, Sitemap)
- Column 3: Contact (support@pixocraft.in) + social icons
- Bottom bar: Copyright © 2025 Pixocraft Tools • Part of Pixocraft.in

## Interaction Patterns

**Buttons:**
- Primary: Solid, medium rounded corners (rounded-lg), px-6 py-3
- Secondary: Outlined, same padding
- Icon buttons: Square, p-2, icon centered
- Hover: Subtle lift (translate-y-[-2px]) + shadow increase
- States clearly defined for all contexts

**Cards:**
- Rounded corners (rounded-xl)
- Subtle border
- Hover: Gentle lift (translate-y-[-4px]) + shadow
- Padding: p-6 to p-8

**Inputs:**
- Rounded (rounded-lg)
- Border on all states
- px-4 py-3 padding
- Focus: Outline ring
- Labels: mb-2 spacing

**Animations:** Minimal
- Page transitions: None (SEO priority)
- Hover effects: Transform + shadow (duration-200)
- Loading states: Simple spinner or skeleton
- No scroll animations or parallax

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus visible on all focusable elements
- Alt text for all images (SEO critical)
- Semantic HTML structure
- Color contrast WCAG AA minimum

## Images

**Homepage Hero:**
- Abstract tech/tool illustration or geometric pattern background
- Lightweight, optimized for fast load
- Overlayed with gradient for text readability

**Tool Cards:**
- Icon representation for each tool (use icon library, not images)

**Blog Posts:**
- Featured image per post (16:9 ratio, 1200x675px placeholder)
- Article thumbnails (same ratio, 600x338px)
- Content images as needed per JSON

**About Page:**
- Optional: Team/office photo or brand illustration
- Focus on simplicity

No custom photo backgrounds on tool pages - keep functional and fast.

## SEO-Specific Design Elements
- Clear, readable typography (no decorative fonts for content)
- Generous line-height (1.6-1.8 for body text)
- Visual hierarchy that matches heading tags
- Prominent CTAs that match user intent
- Internal link styling (underline on hover, distinct from body text)
- Breadcrumbs styled subtly but visible

## Tool-Specific Differentiation
While maintaining cohesive brand:
- Temp Mail: Email-client aesthetic (Gmail/Outlook inspired list)
- Password: Security-focused, bold typography
- QR Code: Visual preview emphasis, artistic
- Image Compressor: Before/after comparison focus

Each tool has unique hero treatment and primary interface layout while sharing footer, nav, FAQ, and related tools sections.