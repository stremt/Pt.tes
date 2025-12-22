/**
 * Version Manager - Handles cache invalidation and app updates
 * Automatically updates service worker cache when app version changes
 * while preserving user data in localStorage
 */

const VERSION_KEY = 'pixocraft_app_version';
const CURRENT_VERSION = '1.0.0';

// Define which tools have storage structure changes
// Add toolId here if its localStorage schema changed and needs reset
const TOOLS_WITH_BREAKING_CHANGES = new Set<string>([
  // Example: 'expense-tracker', 'notes-app'
]);

interface VersionCheckResult {
  isNewVersion: boolean;
  oldVersion: string | null;
  currentVersion: string;
  clearedTools: string[];
}

/**
 * Check if app version has changed and perform necessary cache updates
 * Automatically clears service worker cache but preserves tool data
 */
export async function checkAndHandleVersionChange(): Promise<VersionCheckResult> {
  const storedVersion = localStorage.getItem(VERSION_KEY);
  const isNewVersion = storedVersion !== CURRENT_VERSION;
  const clearedTools: string[] = [];

  if (isNewVersion) {
    console.log(`🔄 App updated: ${storedVersion || 'fresh install'} → ${CURRENT_VERSION}`);

    // Clear service worker caches to get fresh assets
    try {
      const cacheNames = await caches.keys();
      const cleared = await Promise.all(
        cacheNames.map(name => caches.delete(name))
      );
      const deletedCount = cleared.filter(Boolean).length;
      console.log(`✅ Cleared ${deletedCount} service worker cache(s)`);
    } catch (error) {
      console.log('ℹ️  Service workers not available (static hosting is fine)');
    }

    // Clear localStorage for tools with breaking changes
    TOOLS_WITH_BREAKING_CHANGES.forEach(toolId => {
      const storageKey = `pixocraft_${toolId}`;
      localStorage.removeItem(storageKey);
      clearedTools.push(toolId);
    });

    if (clearedTools.length > 0) {
      console.log(`🗑️  Reset data for tools with breaking changes: ${clearedTools.join(', ')}`);
    }

    // Update stored version
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    console.log(`✅ Version updated to ${CURRENT_VERSION}`);

    // Optional: Reload page to show updated version
    // This ensures users see the latest assets
    // Uncomment if you want automatic page reload on version change
    // window.location.reload();
  }

  return {
    isNewVersion,
    oldVersion: storedVersion,
    currentVersion: CURRENT_VERSION,
    clearedTools,
  };
}

/**
 * Register a tool as having a breaking storage change
 * Call this when you change a tool's localStorage schema
 * 
 * Example: registerBreakingChange('expense-tracker')
 * This will clear that tool's data on next app load
 */
export function registerBreakingChange(toolId: string): void {
  TOOLS_WITH_BREAKING_CHANGES.add(toolId);
  console.log(`⚠️  Registered breaking change for: ${toolId}`);
}

/**
 * Get current app version
 */
export function getAppVersion(): string {
  return CURRENT_VERSION;
}

/**
 * Manually trigger a version check (useful for debugging)
 */
export function debugVersionStatus(): void {
  const stored = localStorage.getItem(VERSION_KEY);
  console.group('📊 Version Status');
  console.log('Current Version:', CURRENT_VERSION);
  console.log('Stored Version:', stored || 'not set');
  console.log('Is New Version:', stored !== CURRENT_VERSION);
  console.log('Tools with breaking changes:', Array.from(TOOLS_WITH_BREAKING_CHANGES));
  console.groupEnd();
}
