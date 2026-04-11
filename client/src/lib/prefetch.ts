/**
 * Tool import map + prefetch helpers.
 *
 * Calling import() for an already-loaded module is a no-op (browser module
 * registry cache). So it's safe to call these for tools the user may have
 * already visited — no double-download, no wasted bandwidth.
 */

const prefetched = new Set<string>();

export const toolImportMap: Record<string, () => Promise<any>> = {
  "/tools/temp-mail": () => import("@/pages/tools/TempMail"),
  "/tools/password-generator": () => import("@/pages/tools/PasswordGenerator"),
  "/tools/image-compressor": () => import("@/pages/tools/ImageCompressor"),
  "/tools/qr-maker": () => import("@/pages/tools/QRMaker"),
  "/tools/json-formatter": () => import("@/pages/tools/JSONFormatter"),
  "/tools/word-counter": () => import("@/pages/tools/WordCounter"),
  "/tools/text-case-converter": () => import("@/pages/tools/TextCaseConverter"),
  "/tools/password-strength-checker": () => import("@/pages/tools/PasswordStrengthChecker"),
  "/tools/url-encoder": () => import("@/pages/tools/URLEncoder"),
  "/tools/base64-encoder": () => import("@/pages/tools/Base64Encoder"),
  "/tools/color-picker": () => import("@/pages/tools/ColorPicker"),
  "/tools/image-resizer": () => import("@/pages/tools/ImageResizer"),
  "/tools/barcode-generator": () => import("@/pages/tools/BarcodeGenerator"),
  "/tools/pdf-merger": () => import("@/pages/tools/PDFMerger"),
  "/tools/pdf-splitter": () => import("@/pages/tools/PDFSplitter"),
  "/tools/image-to-pdf": () => import("@/pages/tools/ImageToPDF"),
  "/tools/pdf-to-image": () => import("@/pages/tools/PDFToImage"),
  "/tools/regex-tester": () => import("@/pages/tools/RegexTester"),
  "/tools/markdown-editor": () => import("@/pages/tools/MarkdownEditor"),
  "/tools/hex-rgb-converter": () => import("@/pages/tools/HexRgbConverter"),
  "/tools/gradient-generator": () => import("@/pages/tools/GradientGenerator"),
  "/tools/color-palette-generator": () => import("@/pages/tools/ColorPaletteGenerator"),
  "/tools/emi-calculator": () => import("@/pages/tools/EMICalculator"),
  "/tools/age-calculator": () => import("@/pages/tools/AgeCalculator"),
  "/tools/bmi-calculator": () => import("@/pages/tools/BMICalculator"),
  "/tools/loan-calculator": () => import("@/pages/tools/LoanCalculator"),
  "/tools/text-summarizer": () => import("@/pages/tools/TextSummarizer"),
  "/tools/invoice-generator": () => import("@/pages/tools/InvoiceGenerator"),
  "/tools/uuid-generator": () => import("@/pages/tools/UUIDGenerator"),
  "/tools/hash-generator": () => import("@/pages/tools/HashGenerator"),
  "/tools/text-encrypt-decrypt": () => import("@/pages/tools/TextEncryptDecrypt"),
  "/tools/image-cropper": () => import("@/pages/tools/ImageCropper"),
  "/tools/username-generator": () => import("@/pages/tools/UsernameGenerator"),
  "/tools/random-number-generator": () => import("@/pages/tools/RandomNumberGenerator"),
  "/tools/code-beautifier": () => import("@/pages/tools/CodeBeautifier"),
  "/tools/text-to-speech": () => import("@/pages/tools/TextToSpeech"),
  "/tools/timer-stopwatch": () => import("@/pages/tools/TimerStopwatch"),
  "/tools/expense-tracker": () => import("@/pages/tools/ExpenseTracker"),
  "/tools/todo-list": () => import("@/pages/tools/TodoList"),
  "/tools/percentage-calculator": () => import("@/pages/tools/PercentageCalculator"),
  // Extended set — prefetched in batch 2
  "/tools/pdf-compressor": () => import("@/pages/tools/PDFCompressor"),
  "/tools/pdf-watermark-adder": () => import("@/pages/tools/PDFWatermarkAdder"),
  "/tools/image-to-base64": () => import("@/pages/tools/ImageToBase64"),
  "/tools/jpg-to-png": () => import("@/pages/tools/JPGtoPNG"),
  "/tools/png-to-jpg": () => import("@/pages/tools/PNGtoJPG"),
  "/tools/exif-remover": () => import("@/pages/tools/ExifRemover"),
  "/tools/csv-viewer": () => import("@/pages/tools/CSVViewer"),
  "/tools/text-diff": () => import("@/pages/tools/TextDiff"),
  "/tools/text-cleaner": () => import("@/pages/tools/TextCleaner"),
  "/tools/favicon-generator": () => import("@/pages/tools/FaviconGenerator"),
  "/tools/html-beautifier": () => import("@/pages/tools/HTMLBeautifier"),
  "/tools/css-minifier": () => import("@/pages/tools/CSSMinifier"),
  "/tools/text-reverser": () => import("@/pages/tools/TextReverser"),
  "/tools/pdf-password-remover": () => import("@/pages/tools/PDFPasswordRemover"),
  "/tools/text-to-file": () => import("@/pages/tools/TextToFile"),
  "/tools/receipt-generator": () => import("@/pages/tools/ReceiptGenerator"),
};

/**
 * Prefetch a single tool's JS chunk.
 * Safe to call multiple times — skipped if already requested.
 */
export function prefetchTool(path: string): void {
  if (prefetched.has(path)) return;
  const importFn = toolImportMap[path];
  if (!importFn) return;
  prefetched.add(path);
  // Trigger JS chunk download (Vite/rollup handles deduplication)
  importFn().catch(() => {});
}

/**
 * Prefetch a batch of tools by path.
 * Any path that is already being/has been fetched is skipped automatically.
 */
export function prefetchTools(paths: string[]): void {
  paths.forEach(prefetchTool);
}

/**
 * Ordered list of routes to prefetch during idle time.
 *
 * First 20 = batch 1 (highest traffic).
 * Next 20  = batch 2 (fired after batch 1 completes + inter-batch delay).
 */
export const TOP_TOOLS: string[] = [
  // ── Batch 1 ──────────────────────────────────────────────────────────────
  "/tools/temp-mail",
  "/tools/password-generator",
  "/tools/image-compressor",
  "/tools/qr-maker",
  "/tools/json-formatter",
  "/tools/word-counter",
  "/tools/text-case-converter",
  "/tools/password-strength-checker",
  "/tools/base64-encoder",
  "/tools/color-picker",
  "/tools/image-resizer",
  "/tools/pdf-merger",
  "/tools/emi-calculator",
  "/tools/age-calculator",
  "/tools/bmi-calculator",
  "/tools/invoice-generator",
  "/tools/hash-generator",
  "/tools/username-generator",
  "/tools/random-number-generator",
  "/tools/todo-list",

  // ── Batch 2 ──────────────────────────────────────────────────────────────
  "/tools/pdf-compressor",
  "/tools/pdf-watermark-adder",
  "/tools/image-to-base64",
  "/tools/jpg-to-png",
  "/tools/png-to-jpg",
  "/tools/exif-remover",
  "/tools/csv-viewer",
  "/tools/text-diff",
  "/tools/text-cleaner",
  "/tools/favicon-generator",
  "/tools/html-beautifier",
  "/tools/css-minifier",
  "/tools/text-reverser",
  "/tools/pdf-password-remover",
  "/tools/text-to-file",
  "/tools/receipt-generator",
  "/tools/percentage-calculator",
  "/tools/markdown-editor",
  "/tools/regex-tester",
  "/tools/text-summarizer",
];
