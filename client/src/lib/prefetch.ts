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
};

export function prefetchTool(path: string): void {
  if (prefetched.has(path)) return;
  const importFn = toolImportMap[path];
  if (!importFn) return;
  prefetched.add(path);
  importFn().catch(() => {});
}

export function prefetchTools(paths: string[]): void {
  paths.forEach(prefetchTool);
}

export const TOP_TOOLS = [
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
];
