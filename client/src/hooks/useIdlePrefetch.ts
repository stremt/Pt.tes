import { useEffect } from "react";
import { useLocation } from "wouter";
import { prefetchTools } from "@/lib/prefetch";

// ── Module-level globals (survive re-renders and route changes) ────────────
const BATCH_SIZE = 20;
const BYTE_LIMIT = 3 * 1024 * 1024; // 3 MB
const INTER_BATCH_DELAY_MS = 2000;   // pause between batches

let queue: string[] = [];         // remaining tools not yet prefetched
let bytesUsed = 0;                // actual network bytes tracked by observer
let paused = false;               // true when 3 MB limit hit
let running = false;              // true while a batch cycle is in progress
let observerReady = false;        // PerformanceObserver set up once globally
let initialized = false;          // queue populated exactly once

// ── Byte tracking via PerformanceObserver ─────────────────────────────────
function setupObserver() {
  if (observerReady || typeof PerformanceObserver === "undefined") return;
  observerReady = true;

  try {
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const e = entry as PerformanceResourceTiming;
        // Only count our own hashed asset chunks, transferSize=0 means cache hit
        if (
          e.initiatorType === "script" &&
          e.name.includes("/assets/") &&
          e.transferSize > 0
        ) {
          bytesUsed += e.transferSize;
        }
      }
    });
    obs.observe({ type: "resource", buffered: true });
  } catch {
    // Observer not supported — byte cap won't fire but everything else works
  }
}

// ── Core batch loop ───────────────────────────────────────────────────────
function runLoop() {
  if (running || paused || queue.length === 0) return;
  running = true;

  const step = () => {
    // Re-check limit each step (bytes accumulate asynchronously)
    if (bytesUsed >= BYTE_LIMIT) {
      paused = true;
      running = false;
      return;
    }

    if (queue.length === 0) {
      running = false;
      return;
    }

    // Take next batch of 20
    const batch = queue.splice(0, BATCH_SIZE);
    prefetchTools(batch);

    // Schedule next batch after a delay, but only during idle time
    setTimeout(() => {
      if (paused || queue.length === 0) {
        running = false;
        return;
      }

      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(step, { timeout: 5000 });
      } else {
        // Safari fallback
        setTimeout(step, 500);
      }
    }, INTER_BATCH_DELAY_MS);
  };

  // Kick off the first step during idle time
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(step, { timeout: 5000 });
  } else {
    setTimeout(step, 500);
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────
/**
 * Rolling prefetch loop.
 *
 * - Initialises the queue from `allTools` on first call
 * - Starts (or resumes) the loop on every route change
 * - Pauses automatically when 3 MB of data has been downloaded
 * - Resumes the next time the user navigates anywhere
 * - Already-prefetched tools are silently skipped (module cache hit)
 */
export function useIdlePrefetch(allTools: string[]): void {
  const [location] = useLocation();

  // One-time setup — runs only on first mount
  useEffect(() => {
    setupObserver();
    if (!initialized && allTools.length > 0) {
      initialized = true;
      queue = [...allTools];
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-trigger on every navigation
  useEffect(() => {
    // Safety: populate queue if setup effect hasn't fired yet
    if (!initialized && allTools.length > 0) {
      initialized = true;
      queue = [...allTools];
    }

    // Every navigation un-pauses the 3 MB gate so we can resume.
    // The step() function re-checks bytesUsed and will re-pause if still over.
    if (paused) {
      paused = false;
    }

    // Wait 2 s after navigation so the new page's own assets load first
    const timer = setTimeout(() => {
      runLoop();
    }, 2000);

    return () => clearTimeout(timer);
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps
}
