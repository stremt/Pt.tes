import { useEffect } from "react";
import { prefetchTools } from "@/lib/prefetch";

export function useIdlePrefetch(paths: string[]): void {
  useEffect(() => {
    if (paths.length === 0) return;

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(
        () => prefetchTools(paths),
        { timeout: 3000 }
      );
      return () => (window as any).cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => prefetchTools(paths), 2000);
      return () => clearTimeout(id);
    }
  }, []);
}
