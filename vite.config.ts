import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    ...(process.env.NODE_ENV !== "production"
      ? [runtimeErrorOverlay()]
      : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks(id) {
          // ── React core — needed by every route ────────────────────────────
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/") ||
            id.includes("node_modules/use-sync-external-store/")
          ) {
            return "vendor-react";
          }

          // ── Routing + data-fetching ────────────────────────────────────────
          if (
            id.includes("node_modules/wouter") ||
            id.includes("node_modules/@tanstack/react-query")
          ) {
            return "vendor-router";
          }

          // ── Radix UI primitives (every shadcn component) ──────────────────
          if (id.includes("node_modules/@radix-ui/")) {
            return "vendor-radix";
          }

          // ── Icons ─────────────────────────────────────────────────────────
          if (
            id.includes("node_modules/lucide-react") ||
            id.includes("node_modules/react-icons")
          ) {
            return "vendor-icons";
          }

          // ── Tiny UI utilities used by every shadcn component ─────────────
          // These are pulled in via @/lib/utils.ts → tailwind-merge/clsx, and
          // class-variance-authority for button/badge variants. They're tiny
          // (~15 KB total) but were dragging in all 3 MB of vendor-misc.
          if (
            id.includes("node_modules/tailwind-merge") ||
            id.includes("node_modules/clsx") ||
            id.includes("node_modules/class-variance-authority") ||
            id.includes("node_modules/@floating-ui/") ||
            id.includes("node_modules/tslib")
          ) {
            return "vendor-ui-utils";
          }

          // ── Helmet (react-helmet-async + its tiny deps) ───────────────────
          // Isolate this so the entry chunk only loads ~15 KB, NOT the 5 MB
          // vendor-misc that it used to drag in transitively.
          // NOTE: use-sync-external-store is intentionally kept in vendor-react
          // so it always resolves before Radix UI / floating-ui load.
          if (
            id.includes("node_modules/react-helmet-async") ||
            id.includes("node_modules/react-side-effect")
          ) {
            return "vendor-helmet";
          }

          // ── PDF libraries — only used on PDF tool pages (lazy) ────────────
          if (
            id.includes("node_modules/pdfjs-dist") ||
            id.includes("node_modules/pdf-lib") ||
            id.includes("node_modules/jspdf")
          ) {
            return "vendor-pdf";
          }

          // ── Heavy libraries that are ONLY used inside lazy tool pages ─────
          // Keep them out of vendor-misc so that even if something pulls
          // vendor-misc in eagerly, these giants are NOT included.
          if (
            id.includes("node_modules/@zxcvbn-ts/") ||
            id.includes("node_modules/zxcvbn")
          ) {
            return "vendor-zxcvbn";
          }

          if (
            id.includes("node_modules/xlsx") ||
            id.includes("node_modules/exceljs")
          ) {
            return "vendor-xlsx";
          }

          if (id.includes("node_modules/mammoth")) {
            return "vendor-mammoth";
          }

          if (id.includes("node_modules/jszip")) {
            return "vendor-jszip";
          }

          if (
            id.includes("node_modules/highlight.js") ||
            id.includes("node_modules/prismjs") ||
            id.includes("node_modules/refractor") ||
            id.includes("node_modules/react-syntax-highlighter")
          ) {
            return "vendor-highlight";
          }

          if (
            id.includes("node_modules/marked") ||
            id.includes("node_modules/dompurify") ||
            id.includes("node_modules/turndown")
          ) {
            return "vendor-markdown";
          }

          // ── Zod — eagerly needed via @shared/schema → lib/tools ──────────
          // Isolate so the entry only loads a tiny ~15 KB zod chunk, NOT all
          // of vendor-misc which can be 3+ MB.
          if (id.includes("node_modules/zod")) {
            return "vendor-zod";
          }

          // ── Framer Motion — only used in specific tool pages ──────────────
          if (
            id.includes("node_modules/framer-motion") ||
            id.includes("node_modules/@motionone/")
          ) {
            return "vendor-motion";
          }

          // ── QR code ───────────────────────────────────────────────────────
          if (id.includes("node_modules/qrcode")) {
            return "vendor-qr";
          }

          // ── Everything else from node_modules ─────────────────────────────
          // After splitting out the heavyweights, this chunk will be small.
          if (id.includes("node_modules/")) {
            return "vendor-misc";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
