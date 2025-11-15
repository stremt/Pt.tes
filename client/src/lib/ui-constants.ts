/**
 * Shared UI constants and patterns for consistent tool design
 */

// Textarea heights
export const TEXTAREA_HEIGHTS = {
  SMALL: 'min-h-[150px] max-h-[150px]',
  MEDIUM: 'min-h-[200px] max-h-[200px]',
  LARGE: 'min-h-[300px] max-h-[300px]',
  XLARGE: 'min-h-[400px] max-h-[400px]',
} as const;

// Scrollable textarea/output classes
export const SCROLLABLE_OUTPUT = 'overflow-y-auto break-words whitespace-pre-wrap';

// Loading states
export const LOADING_MESSAGES = {
  PROCESSING: 'Processing...',
  ENCRYPTING: 'Encrypting your text...',
  DECRYPTING: 'Decrypting your text...',
  CONVERTING: 'Converting...',
  COMPRESSING: 'Compressing...',
  EXTRACTING: 'Extracting text...',
  RENDERING: 'Rendering pages...',
  GENERATING: 'Generating...',
} as const;

// Common button labels
export const BUTTON_LABELS = {
  CLEAR_ALL: 'Clear All',
  RESET: 'Reset',
  COPY: 'Copy',
  COPIED: 'Copied!',
  DOWNLOAD: 'Download',
  UPLOAD: 'Upload File',
  PROCESS: 'Process',
  CONVERT: 'Convert',
  GENERATE: 'Generate',
} as const;

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  SMALL: 1024 * 1024, // 1MB
  MEDIUM: 5 * 1024 * 1024, // 5MB
  LARGE: 10 * 1024 * 1024, // 10MB
  XLARGE: 50 * 1024 * 1024, // 50MB
} as const;

// Password strength levels
export const PASSWORD_STRENGTH = {
  VERY_WEAK: { label: 'Very Weak', color: 'text-red-600', bgColor: 'bg-red-600' },
  WEAK: { label: 'Weak', color: 'text-orange-600', bgColor: 'bg-orange-600' },
  FAIR: { label: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-600' },
  GOOD: { label: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-600' },
  STRONG: { label: 'Strong', color: 'text-green-600', bgColor: 'bg-green-600' },
} as const;

// Common error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'File size exceeds the maximum limit',
  INVALID_FILE_TYPE: 'Invalid file type',
  NO_FILE_SELECTED: 'Please select a file',
  NO_TEXT_ENTERED: 'Please enter some text',
  CONVERSION_FAILED: 'Conversion failed',
  PROCESSING_FAILED: 'Processing failed',
  BROWSER_NOT_SUPPORTED: 'This feature is not supported in your browser',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  COPIED: 'Copied to clipboard',
  DOWNLOADED: 'Download started',
  PROCESSED: 'Processing complete',
  CONVERTED: 'Conversion successful',
  GENERATED: 'Generated successfully',
} as const;

// Common CSS classes for consistent styling
export const COMMON_CLASSES = {
  OUTPUT_BOX: `${TEXTAREA_HEIGHTS.MEDIUM} ${SCROLLABLE_OUTPUT} rounded-md border border-input bg-muted/50 px-3 py-2 text-sm`,
  DROPZONE: 'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors',
  FILE_INFO_CARD: 'bg-muted/50 rounded-lg p-4',
  LOADING_CONTAINER: 'flex items-center justify-center gap-2',
} as const;

/**
 * Format file size to human-readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
