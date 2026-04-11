import { useEffect } from "react";
import { prefetchTools } from "@/lib/prefetch";

/**
 * Loops through each batch of tool paths one at a time during browser idle.
 *
 * Flow:
 *   page load → 2 s delay → Batch 1 → 2 s delay → Batch 2 → ... → Batch N → done
 *
 * Each batch is fired inside a requestIdleCallback so it never blocks user
 * interaction. Already-prefetched tools are skipped automatically.
 */
export function useIdlePrefetch(batches: string[][]): void {
  useEffect(() => {
    if (!batches.length) return;

    let batchIndex = 0;
    let idleHandle = 0;
    let timerHandle = 0;
    let stopped = false;

    const runNextBatch = () => {
      if (stopped || batchIndex >= batches.length) return;

      const batch = batches[batchIndex];
      batchIndex++;

      // Fire every import in this batch
      prefetchTools(batch);

      // If more batches remain, wait then schedule via idle callback
      if (batchIndex < batches.length) {
        timerHandle = window.setTimeout(scheduleIdle, 2000) as unknown as number;
      }
    };

    const scheduleIdle = () => {
      if (stopped || batchIndex >= batches.length) return;

      if ("requestIdleCallback" in window) {
        idleHandle = (window as any).requestIdleCallback(runNextBatch, { timeout: 5000 });
      } else {
        // Safari fallback
        timerHandle = window.setTimeout(runNextBatch, 800) as unknown as number;
      }
    };

    // Wait for full page load + 2 s before kicking off the first batch
    const start = () => {
      timerHandle = window.setTimeout(scheduleIdle, 2000) as unknown as number;
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      stopped = true;
      window.removeEventListener("load", start);
      if (idleHandle) (window as any).cancelIdleCallback(idleHandle);
      if (timerHandle) clearTimeout(timerHandle);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
