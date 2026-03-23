# Pixocraft — Multi-Tool Web Application

## Overview
Pixocraft (tools.pixocraft.in) is India's largest browser-based static tool hub with 200+ free tools covering text, image, PDF, coding, productivity, calculators, and more. No signup, no tracking, 100% private — all processing happens in the browser.

## Project Stats
- **Total .tsx/.ts files**: ~584
- **Total Lines of Code**: ~1,67,492 (frontend: ~1,66,131 + backend: ~1,361)
- **Main Tool Pages**: ~258
- **Longtail SEO Pages**: ~115
- **Reusable Components**: ~69
- **Total Pages**: ~483

## Tech Stack
- **Frontend**: React + Vite, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js (minimal — only for serving; no server-side data processing)
- **Routing**: Wouter
- **State/Data**: TanStack Query (React Query v5)
- **Forms**: React Hook Form + Zod
- **SEO**: react-helmet-async with structured data (JSON-LD), Open Graph, canonical URLs
- **Icons**: Lucide React, react-icons/si

## Key Architecture
- **100% browser-based** — no server-side tool processing whatsoever
- **No login / auth** — fully anonymous, zero tracking
- **MemStorage** for any transient backend state
- Signature tool has two implementations:
  - `SignaturePadWidget.tsx` — shared widget used by all longtail SEO pages via `SignatureToolSection.tsx`
  - `SignaturePadTool.tsx` (2,773 lines) — standalone main signature tool page (duplicate logic, must be updated separately)

## Project Structure
```
client/src/
├── components/           # 69 reusable components
│   ├── ui/               # Shadcn UI primitives
│   ├── SignaturePadWidget.tsx   # Shared signature widget (longtail pages)
│   ├── SignatureToolSection.tsx # Wrapper linking longtail → widget
│   ├── Breadcrumb.tsx           # Mobile-optimized breadcrumb
│   └── PDFSignatureTool.tsx
├── pages/
│   ├── Home.tsx                 # Homepage (863 lines)
│   ├── Tools.tsx                # Tools listing page
│   └── tools/
│       ├── SignaturePadTool.tsx # Main signature tool (2,773 lines — standalone)
│       ├── QRMaker.tsx          # QR tool (1,950 lines)
│       ├── CSVViewer.tsx        # CSV viewer (1,272 lines)
│       ├── MP4toMP3.tsx         # Media tools
│       ├── [200+ other tools]
│       └── longtail/            # 115 SEO longtail pages
│           ├── SignatureForContracts.tsx
│           ├── [109 more longtail pages]
│           └── text-to-file/    # 5 text-to-file variant pages
├── lib/
│   ├── tools.ts         # Tools data/registry (1,890 lines)
│   ├── random-data.ts   # Random data utilities (1,463 lines)
│   ├── queryClient.ts   # TanStack Query + apiRequest setup
│   └── seo.ts           # SEO structured data utilities
└── index.css            # Tailwind + custom CSS variables (491 lines)

server/
├── routes.ts            # API routes (thin, uses storage)
├── storage.ts           # MemStorage + IStorage interface
└── vite.ts              # Vite dev server (DO NOT MODIFY)

shared/
└── schema.ts            # Drizzle schema + Zod types
```

## Biggest Files (by lines)
| File | Lines |
|---|---|
| `SignaturePadTool.tsx` | 2,773 |
| `QRMaker.tsx` | 1,950 |
| `tools.ts` | 1,890 |
| `SignaturePadWidget.tsx` | 1,467 |
| `random-data.ts` | 1,463 |
| `CSVViewer.tsx` | 1,272 |
| `MP4toMP3.tsx` | 1,267 |
| `App.tsx` | 1,024 |
| `Home.tsx` | 863 |

## Tool Categories
- **Text Tools**: Case converter, text cleaner, word counter, text diff, morse code, etc.
- **Image Tools**: Compressor, cropper, resizer, background remover, blur, grayscale, etc.
- **PDF Tools**: Merger, splitter, compressor, watermark, password remover, PDF to image, etc.
- **Signature Tool**: Draw, type, or upload signature with background removal + branded download
- **QR Code Tools**: QR maker + 20+ longtail QR pages (for events, business, social, etc.)
- **Calculators**: BMI, EMI, mortgage, loan, age, percentage, compound interest, etc.
- **Code Tools**: HTML/CSS/JS beautifier & minifier, JSON formatter, Base64 encoder, etc.
- **Media Tools**: MP4 to MP3, GIF compressor, video to GIF, audio noise remover, etc.
- **Productivity**: Notes app, todo list, expense tracker, invoice generator, countdown timer, etc.
- **SEO Tools**: Meta tag generator, Open Graph preview, sitemap XML, UTM builder, etc.

## SEO Strategy
- Every tool page has unique `<title>`, `<meta description>`, Open Graph tags
- Breadcrumb + FAQ structured data (JSON-LD) on tool pages
- ~115 longtail pages targeting specific search queries (e.g. "signature for contracts", "QR code for restaurants")
- Canonical URLs set on all pages

## Important Rules / User Preferences
- **PC/desktop layout must NEVER be touched** — only mobile (< 768px / `md` breakpoint) can be adjusted
- `sm` breakpoint in Tailwind = 640px default (NOT customized in this project — `sm` under `borderRadius` is different)
- All longtail signature pages use `SignaturePadWidget` — changes there propagate to all ~55 longtail sig pages automatically
- `SignaturePadTool.tsx` is a **fully standalone duplicate** — any widget changes must be manually mirrored there
- Branded download filename: `signature-by-pixocraft.{ext}`
- Background removal uses: HARD threshold=110 (fully transparent), SOFT=200 (feathered), RGB×t² to prevent white spill
- Drag & drop: uses `dragCounter` ref + `pointer-events-none` on children + window-level prevention

## Recent Changes
- Mobile hero fix: `hidden sm:*` → `hidden md:*` on all 55 longtail pages
- Breadcrumb: shows last 2 items with `…` on mobile
- Background removal: upgraded to distance-from-white algorithm
- Drag & drop: fixed with `<div>` + dragCounter ref approach
- Branded downloads: `signature-by-pixocraft.png/.jpg`
- Homepage trust badge grid: bottom 2 cards ("Zero Tracking", "0ms Delay") centered at sm breakpoint using `sm:grid-cols-6` trick
