import { useEffect } from "react";
import { prefetchTools } from "@/lib/prefetch";

const BATCH_SIZE = 5; // tools to prefetch per idle slot
const INTER_BATCH_DELAY_MS = 1500; // wait between batches

export function useIdlePrefetch(paths: string[]): void {
  useEffect(() => {
    if (paths.length === 0) return;

    // Work off a copy so we can shift() without mutating the original
    const queue = [...paths];
    let idleHandle = 0;
    let timerHandle = 0;
    let stopped = false;

    const processBatch = (deadline?: { timeRemaining: () => number; didTimeout: boolean }) => {
      if (stopped) return;

      // Drain as many items as the idle budget allows (at least 1 even on timeout)
      let count = 0;
      while (
        queue.length > 0 &&
        (count === 0 || !deadline || deadline.timeRemaining() > 5)
      ) {
        const batch: string[] = [];
        for (let i = 0; i < BATCH_SIZE && queue.length > 0; i++) {
          batch.push(queue.shift()!);
          count++;
        }
        prefetchTools(batch);
        if (deadline && deadline.timeRemaining() <= 5) break;
      }

      if (queue.length > 0) {
        // Schedule the next batch after a short wait so we don't monopolise the thread
        timerHandle = window.setTimeout(scheduleNextBatch, INTER_BATCH_DELAY_MS) as unknown as number;
      }
    };

    const scheduleNextBatch = () => {
      if (stopped || queue.length === 0) return;
      if ("requestIdleCallback" in window) {
        idleHandle = (window as any).requestIdleCallback(processBatch, { timeout: 4000 });
      } else {
        // Safari fallback — just use a timer
        timerHandle = window.setTimeout(() => processBatch(), 500) as unknown as number;
      }
    };

    // Wait for the page to be fully loaded before kicking off the first batch
    const start = () => {
      // Small extra delay so the current page's own assets finish first
      timerHandle = window.setTimeout(scheduleNextBatch, 2000) as unknown as number;
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
