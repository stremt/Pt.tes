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
        // Stable chunk names improve cache hit rate across deploys
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        manualChunks(id) {
          // Vendor: React core — shared by every route
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/scheduler/")) {
            return "vendor-react";
          }
          // Vendor: Routing + Query
          if (id.includes("node_modules/wouter") || id.includes("node_modules/@tanstack/react-query")) {
            return "vendor-router";
          }
          // Vendor: Radix UI primitives (used by every shadcn component)
          if (id.includes("node_modules/@radix-ui/")) {
            return "vendor-radix";
          }
          // Vendor: Icons — large, shared across all pages
          if (id.includes("node_modules/lucide-react") || id.includes("node_modules/react-icons")) {
            return "vendor-icons";
          }
          // Vendor: PDF libraries — only used on PDF tools
          if (id.includes("node_modules/pdfjs-dist") || id.includes("node_modules/pdf-lib") || id.includes("node_modules/jspdf")) {
            return "vendor-pdf";
          }
          // Vendor: QR code library
          if (id.includes("node_modules/qrcode")) {
            return "vendor-qr";
          }
          // Vendor: Everything else from node_modules
          if (id.includes("node_modules/")) {
            return "vendor-misc";
          }
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
