import { useRef, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import {
  PenTool,
  Download,
  Eraser,
  Type,
  Upload,
  Undo2,
  Redo2,
  Trash2,
  ImageIcon,
  FileImage,
  Shield,
  Check,
  Eye,
  Zap,
  Smartphone,
  Star,
  FileText,
  Mail,
  Copy,
  ArrowRight,
  ClipboardCheck,
  Search,
  Maximize2,
  RotateCcw,
  FilePlus2,
  SlidersHorizontal,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { SignDocumentPanel } from "@/components/SignDocumentPanel";

// ─── Font categories ────────────────────────────────────────────────────────
type FontCategory = "signature" | "elegant" | "professional" | "creative" | "handwritten" | "casual" | "rare";

const CATEGORY_LABELS: Record<FontCategory, string> = {
  signature:    "Signature",
  elegant:      "Elegant",
  professional: "Professional",
  creative:     "Creative",
  handwritten:  "Handwritten",
  casual:       "Casual",
  rare:         "Rare",
};

const CATEGORY_COLORS: Record<FontCategory, string> = {
  signature:    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  elegant:      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  professional: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  creative:     "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  handwritten:  "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  casual:       "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  rare:         "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
};

// ─── 70+ visually diverse signature fonts ────────────────────────────────────
const HANDWRITTEN_FONTS: Array<{ label: string; value: string; size: string; category: FontCategory }> = [
  // ── SIGNATURE ──────────────────────────────────────────────────────────
  { label: "Great Vibes",          value: "Great Vibes",          size: "lg", category: "signature" },
  { label: "Allura",               value: "Allura",               size: "lg", category: "signature" },
  { label: "Sacramento",           value: "Sacramento",           size: "lg", category: "signature" },
  { label: "Tangerine",            value: "Tangerine",            size: "xl", category: "signature" },
  { label: "Alex Brush",           value: "Alex Brush",           size: "lg", category: "signature" },
  { label: "Parisienne",           value: "Parisienne",           size: "md", category: "signature" },
  { label: "Qwigley",              value: "Qwigley",              size: "xl", category: "signature" },
  { label: "Mr De Haviland",       value: "Mr De Haviland",       size: "lg", category: "signature" },
  { label: "Engagement",           value: "Engagement",           size: "xl", category: "signature" },
  { label: "Yellowtail",           value: "Yellowtail",           size: "sm", category: "signature" },
  { label: "Norican",              value: "Norican",              size: "md", category: "signature" },
  { label: "Petit Formal Script",  value: "Petit Formal Script",  size: "md", category: "signature" },
  // ── ELEGANT / LUXURY ───────────────────────────────────────────────────
  { label: "Playball",             value: "Playball",             size: "md", category: "elegant" },
  { label: "Rochester",            value: "Rochester",            size: "md", category: "elegant" },
  { label: "Grand Hotel",          value: "Grand Hotel",          size: "md", category: "elegant" },
  { label: "Monsieur La Doulaise", value: "Monsieur La Doulaise", size: "xl", category: "elegant" },
  { label: "Lavishly Yours",       value: "Lavishly Yours",       size: "xl", category: "elegant" },
  { label: "Lovers Quarrel",       value: "Lovers Quarrel",       size: "xl", category: "elegant" },
  { label: "Quintessential",       value: "Quintessential",       size: "md", category: "elegant" },
  // ── PROFESSIONAL ───────────────────────────────────────────────────────
  { label: "Satisfy",              value: "Satisfy",              size: "md", category: "professional" },
  { label: "Marck Script",         value: "Marck Script",         size: "md", category: "professional" },
  { label: "Courgette",            value: "Courgette",            size: "md", category: "professional" },
  { label: "Merienda",             value: "Merienda",             size: "md", category: "professional" },
  { label: "Kaushan Script",       value: "Kaushan Script",       size: "md", category: "professional" },
  { label: "Niconne",              value: "Niconne",              size: "md", category: "professional" },
  // ── CREATIVE / STYLISH ─────────────────────────────────────────────────
  { label: "Pacifico",             value: "Pacifico",             size: "sm", category: "creative" },
  { label: "Lobster",              value: "Lobster",              size: "sm", category: "creative" },
  { label: "Lobster Two",          value: "Lobster Two",          size: "sm", category: "creative" },
  { label: "Berkshire Swash",      value: "Berkshire Swash",      size: "sm", category: "creative" },
  { label: "Righteous",            value: "Righteous",            size: "sm", category: "creative" },
  { label: "Boogaloo",             value: "Boogaloo",             size: "sm", category: "creative" },
  { label: "Ruge Boogie",          value: "Ruge Boogie",          size: "sm", category: "creative" },
  // ── HANDWRITTEN ────────────────────────────────────────────────────────
  { label: "Caveat",               value: "Caveat",               size: "md", category: "handwritten" },
  { label: "Patrick Hand",         value: "Patrick Hand",         size: "md", category: "handwritten" },
  { label: "Indie Flower",         value: "Indie Flower",         size: "md", category: "handwritten" },
  { label: "Shadows Into Light",   value: "Shadows Into Light",   size: "md", category: "handwritten" },
  { label: "Gloria Hallelujah",    value: "Gloria Hallelujah",    size: "sm", category: "handwritten" },
  { label: "Just Another Hand",    value: "Just Another Hand",    size: "md", category: "handwritten" },
  { label: "Gochi Hand",           value: "Gochi Hand",           size: "md", category: "handwritten" },
  // ── CASUAL / FUN ───────────────────────────────────────────────────────
  { label: "Amatic SC",            value: "Amatic SC",            size: "sm", category: "casual" },
  { label: "Rock Salt",            value: "Rock Salt",            size: "sm", category: "casual" },
  { label: "Permanent Marker",     value: "Permanent Marker",     size: "sm", category: "casual" },
  { label: "Cabin Sketch",         value: "Cabin Sketch",         size: "sm", category: "casual" },
  { label: "Dekko",                value: "Dekko",                size: "md", category: "casual" },
  { label: "Itim",                 value: "Itim",                 size: "md", category: "casual" },
  // ── RARE / UNIQUE ──────────────────────────────────────────────────────
  { label: "Euphoria Script",      value: "Euphoria Script",      size: "lg", category: "rare" },
  { label: "Meie Script",          value: "Meie Script",          size: "lg", category: "rare" },
  { label: "Bilbo",                value: "Bilbo",                size: "lg", category: "rare" },
  { label: "Fondamento",           value: "Fondamento",           size: "md", category: "rare" },
  { label: "Rancho",               value: "Rancho",               size: "sm", category: "rare" },
  { label: "Over the Rainbow",     value: "Over the Rainbow",     size: "md", category: "rare" },
  { label: "Give You Glory",       value: "Give You Glory",       size: "md", category: "rare" },
  // ── Extras kept for variety ────────────────────────────────────────────
  { label: "Pinyon Script",        value: "Pinyon Script",        size: "lg", category: "signature" },
  { label: "Dancing Script",       value: "Dancing Script",       size: "md", category: "professional" },
  { label: "Cookie",               value: "Cookie",               size: "md", category: "handwritten" },
  { label: "Italianno",            value: "Italianno",            size: "lg", category: "elegant" },
  { label: "Seaweed Script",       value: "Seaweed Script",       size: "sm", category: "creative" },
  { label: "Handlee",              value: "Handlee",              size: "md", category: "handwritten" },
  { label: "Stalemate",            value: "Stalemate",            size: "lg", category: "rare" },
  { label: "Moon Dance",           value: "Moon Dance",           size: "lg", category: "elegant" },
  { label: "Ms Madi",              value: "Ms Madi",              size: "xl", category: "elegant" },
  { label: "Clicker Script",       value: "Clicker Script",       size: "md", category: "professional" },
  { label: "Rouge Script",         value: "Rouge Script",         size: "lg", category: "signature" },
  { label: "Herr Von Muellerhoff", value: "Herr Von Muellerhoff", size: "xl", category: "rare" },
  { label: "Waterfall",            value: "Waterfall",            size: "lg", category: "elegant" },
  { label: "Kristi",               value: "Kristi",               size: "lg", category: "handwritten" },
  { label: "Bad Script",           value: "Bad Script",           size: "md", category: "handwritten" },
  { label: "Swanky and Moo Moo",   value: "Swanky and Moo Moo",   size: "md", category: "rare" },
  { label: "Dawning of a New Day", value: "Dawning of a New Day", size: "lg", category: "rare" },
  { label: "Nothing You Could Do", value: "Nothing You Could Do", size: "md", category: "handwritten" },
  { label: "La Belle Aurore",      value: "La Belle Aurore",      size: "md", category: "elegant" },
];

// De-duplicate by value (safety guard)
const FONT_MAP = new Map(HANDWRITTEN_FONTS.map((f) => [f.value, f]));
const ALL_FONTS = Array.from(FONT_MAP.values());

// ─── Advanced draw presets (defined outside component so they're stable) ────
type DrawPreset = "default" | "elegant" | "bold" | "quick";
const DRAW_PRESETS: Record<DrawPreset, { width: number; smoothing: number; thinning: number; streamline: number; angle: number }> = {
  default:  { width: 2.5, smoothing: 0.50, thinning: 0.50, streamline: 0.20, angle: 0 },
  elegant:  { width: 6.0, smoothing: 0.75, thinning: 0.50, streamline: 0.20, angle: 0 },
  bold:     { width: 8.0, smoothing: 0.30, thinning: 0.20, streamline: 0.10, angle: 0 },
  quick:    { width: 1.5, smoothing: 0.60, thinning: 0.70, streamline: 0.50, angle: 0 },
};

const TOP_PICKS = ["Great Vibes", "Allura", "Alex Brush", "Sacramento", "Parisienne", "Pacifico", "Caveat", "Yellowtail"];

const FILTER_TABS: Array<{ id: "all" | FontCategory; label: string }> = [
  { id: "all",          label: "All" },
  { id: "signature",    label: "Signature" },
  { id: "elegant",      label: "Elegant" },
  { id: "professional", label: "Professional" },
  { id: "handwritten",  label: "Handwritten" },
  { id: "creative",     label: "Creative" },
];

const RECENTLY_USED_FONT_KEY = "pixocraft_recent_font_v1";

function loadRecentFont(): string | null {
  try { return localStorage.getItem(RECENTLY_USED_FONT_KEY); } catch { return null; }
}
function saveRecentFont(font: string) {
  try { localStorage.setItem(RECENTLY_USED_FONT_KEY, font); } catch {}
}

// Font size px values for card previews and canvas export
const FONT_SIZE: Record<string, { card: string; canvas: number }> = {
  xl: { card: "clamp(32px, 6vw, 54px)", canvas: 82 },
  lg: { card: "clamp(26px, 5vw, 44px)", canvas: 68 },
  md: { card: "clamp(22px, 4vw, 36px)", canvas: 56 },
  sm: { card: "clamp(16px, 3vw, 26px)", canvas: 40 },
};

type Tab = "draw" | "type" | "upload";
type Point = { x: number; y: number };

interface SigHistoryItem {
  id: string;
  pngDataUrl: string;
  jpgDataUrl: string;
  thumbUrl: string;
  label: string;
  savedAt: number;
}

const SIG_HISTORY_KEY = "pixocraft_sig_history_v2";

function loadHistory(): SigHistoryItem[] {
  try {
    const raw = localStorage.getItem(SIG_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function persistHistory(items: SigHistoryItem[]) {
  try {
    localStorage.setItem(SIG_HISTORY_KEY, JSON.stringify(items));
  } catch {}
}

// Logical canvas dimensions (drawing coordinate space)
const CW = 800;
const CH = 260;
// Export scale: internal buffer is EXPORT_SCALE × larger → high-res downloads
const EXPORT_SCALE = 4; // 3200 × 1040 px output

// ─── Apply scale + margin to a canvas ────────────────────────────────────
function buildAdjustedCanvas(
  src: HTMLCanvasElement,
  scalePct: number,
  marginPx: number
): HTMLCanvasElement {
  const scale = scalePct / 100;
  const margin = Math.round(marginPx * EXPORT_SCALE);
  const drawW = Math.round(src.width * scale);
  const drawH = Math.round(src.height * scale);
  const totalW = Math.max(1, drawW + margin * 2);
  const totalH = Math.max(1, drawH + margin * 2);
  const oc = document.createElement("canvas");
  oc.width = totalW;
  oc.height = totalH;
  const ctx = oc.getContext("2d")!;
  ctx.clearRect(0, 0, totalW, totalH);
  ctx.drawImage(src, margin, margin, drawW, drawH);
  return oc;
}

// ─── FontCard: reusable font preview card ─────────────────────────────────
function FontCard({
  font,
  isSelected,
  typedName,
  typeColor,
  onClick,
  badge,
  badgeCls,
}: {
  font: { label: string; value: string; size: string; category: FontCategory };
  isSelected: boolean;
  typedName: string;
  typeColor: string;
  onClick: (v: string) => void;
  badge?: string;
  badgeCls?: string;
}) {
  return (
    <button
      key={font.value}
      onClick={() => onClick(font.value)}
      data-testid={`font-card-${font.value.replace(/ /g, "-")}`}
      className={[
        "relative flex flex-col items-start justify-between w-full px-4 py-3 rounded-xl border transition-all cursor-pointer text-left bg-white dark:bg-zinc-900/60",
        isSelected
          ? "border-primary shadow-sm ring-2 ring-primary/30"
          : "border-border hover-elevate dark:border-zinc-700",
      ].join(" ")}
    >
      {/* Selected check */}
      {isSelected && (
        <span className="absolute top-2 right-2 bg-primary rounded-full p-0.5 z-10">
          <Check className="h-3 w-3 text-primary-foreground" />
        </span>
      )}

      {/* Font preview — always white bg so ink colour is visible in dark mode */}
      <span
        style={{
          fontFamily: `'${font.value}', cursive`,
          fontSize: FONT_SIZE[font.size].card,
          color: typeColor,
          lineHeight: 1.3,
          display: "block",
          minHeight: "44px",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "6px",
          padding: "4px 6px",
        }}
      >
        {typedName || "Your Name"}
      </span>

      {/* Footer row: name + tags */}
      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        <span className="text-[10px] text-muted-foreground font-medium">{font.label}</span>
        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${CATEGORY_COLORS[font.category]}`}>
          {CATEGORY_LABELS[font.category]}
        </span>
        {badge && (
          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${badgeCls}`}>
            {badge}
          </span>
        )}
      </div>
    </button>
  );
}

export default function SignaturePadTool() {
  // ── Active tab ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>("draw");

  // ── Draw tab ──────────────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);
  const [strokeColor, setStrokeColor] = useState("#111111");
  const [strokeWidth, setStrokeWidth] = useState(2.5);
  // Refs for stroke settings so native event handlers always have current values
  const strokeColorRef = useRef(strokeColor);
  const strokeWidthRef = useRef(strokeWidth);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // ── Advanced draw settings ─────────────────────────────────────────────────
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activePreset, setActivePreset] = useState<DrawPreset>("default");
  const [drawSmoothing, setDrawSmoothing] = useState(0.50);
  const [drawThinning, setDrawThinning] = useState(0.50);
  const [drawStreamline, setDrawStreamline] = useState(0.20);
  const [drawAngle, setDrawAngle] = useState(0);
  const drawSmoothingRef = useRef(0.50);
  const drawThinningRef = useRef(0.50);
  const drawStreamlineRef = useRef(0.20);
  const drawAngleRef = useRef(0);
  const streamlinedPosRef = useRef<Point>({ x: 0, y: 0 });
  const currentWidthRef = useRef(2.5);
  const lastTimestampRef = useRef(0);

  // ── Type tab ──────────────────────────────────────────────────────────────
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [typeColor, setTypeColor] = useState("#111111");
  // Font selector state
  const [fontCategory, setFontCategory] = useState<"all" | FontCategory>("all");
  const [fontSearch, setFontSearch] = useState("");
  const [fontSort, setFontSort] = useState<"popular" | "az">("popular");
  const [recentFont, setRecentFont] = useState<string | null>(loadRecentFont);

  // ── Upload tab ────────────────────────────────────────────────────────────
  const uploadCanvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [bgRemoved, setBgRemoved] = useState(false);

  // ── Preview ───────────────────────────────────────────────────────────────
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const liveRafRef = useRef<number | null>(null);

  // ── Resize & Margin ───────────────────────────────────────────────────────
  const [sigScale, setSigScale] = useState(100);   // 50–200 %
  const [sigMargin, setSigMargin] = useState(0);   // 0–60 logical px
  const sigScaleRef = useRef(100);
  const sigMarginRef = useRef(0);

  // ── Gmail copy ────────────────────────────────────────────────────────────
  const [showGmailGuide, setShowGmailGuide] = useState(false);
  const [fallbackHtml, setFallbackHtml] = useState<string | null>(null);
  const [gmailCopied, setGmailCopied] = useState(false);

  // ── Save to history ───────────────────────────────────────────────────────
  const [showSavePrompt, setShowSavePrompt] = useState(false);

  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [dlPage, setDlPage] = useState<"options" | "sign-doc" | "need-sig">("options");
  const [dlSignaturePng, setDlSignaturePng] = useState<string | null>(null);
  const [dlSigAspect, setDlSigAspect] = useState(4);
  const [history, setHistory] = useState<SigHistoryItem[]>(loadHistory);
  const pendingFormatsRef = useRef<{ png: string; jpg: string; thumb: string } | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<SigHistoryItem | null>(null);

  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // ── Load Google Fonts (v2 API: separate family= param per font) ──────────
  useEffect(() => {
    // Remove stale link if present so we always get fresh fonts
    const existing = document.getElementById("sig-gfonts");
    if (existing) existing.remove();

    // Build proper v2 URL: family=Font+Name&family=Font+Name2 ...
    const params = ALL_FONTS.map(
      (f) => `family=${encodeURIComponent(f.value)}`
    ).join("&");
    const link = document.createElement("link");
    link.id = "sig-gfonts";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${params}&display=swap`;
    document.head.appendChild(link);
  }, []);

  // ── Init / reinit draw canvas ─────────────────────────────────────────────
  // Draw canvas is scaled by devicePixelRatio for crisp HiDPI rendering.
  // Export upscales to 4× via drawImage only when saving/downloading.
  const initDrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const physW = CW * dpr;
    const physH = CH * dpr;
    if (canvas.width !== physW || canvas.height !== physH) {
      canvas.width = physW;
      canvas.height = physH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  useEffect(() => {
    initDrawCanvas();
  }, [initDrawCanvas]);

  // Reinit when switching back to draw
  useEffect(() => {
    if (activeTab === "draw") initDrawCanvas();
  }, [activeTab, initDrawCanvas]);

  // ── Keep stroke setting refs in sync with state ───────────────────────────
  useEffect(() => { strokeColorRef.current = strokeColor; }, [strokeColor]);
  useEffect(() => { strokeWidthRef.current = strokeWidth; }, [strokeWidth]);
  useEffect(() => { drawSmoothingRef.current = drawSmoothing; }, [drawSmoothing]);
  useEffect(() => { drawThinningRef.current = drawThinning; }, [drawThinning]);
  useEffect(() => { drawStreamlineRef.current = drawStreamline; }, [drawStreamline]);
  useEffect(() => { drawAngleRef.current = drawAngle; }, [drawAngle]);

  const applyPreset = useCallback((preset: DrawPreset) => {
    const p = DRAW_PRESETS[preset];
    setActivePreset(preset);
    setStrokeWidth(p.width);
    setDrawSmoothing(p.smoothing);
    setDrawThinning(p.thinning);
    setDrawStreamline(p.streamline);
    setDrawAngle(p.angle);
    strokeWidthRef.current = p.width;
    drawSmoothingRef.current = p.smoothing;
    drawThinningRef.current = p.thinning;
    drawStreamlineRef.current = p.streamline;
    drawAngleRef.current = p.angle;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Save imageData for undo (stable ref so draw handler never needs to re-register) ──
  const saveStateRef = useRef<() => void>(() => {});
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev.slice(-19), snap]);
    setRedoStack([]);
  }, []);
  useEffect(() => { saveStateRef.current = saveState; }, [saveState]);

  // ── Native pointer-event drawing with velocity-based stroke width ──────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPt = (e: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      const sx = CW / rect.width;
      const sy = CH / rect.height;
      return {
        x: (e.clientX - rect.left) * sx,
        y: (e.clientY - rect.top) * sy,
      };
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      saveStateRef.current();
      currentWidthRef.current = strokeWidthRef.current;
      lastTimestampRef.current = e.timeStamp;
      const pos = getPt(e);
      streamlinedPosRef.current = pos;
      pointsRef.current = [pos];
      isDrawingRef.current = true;
      setHasDrawn(true);
      const ctx = canvas.getContext("2d")!;
      ctx.strokeStyle = strokeColorRef.current;
      ctx.lineWidth = currentWidthRef.current;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const ctx = canvas.getContext("2d")!;
      const rawPos = getPt(e);

      // Streamline: exponential moving average of input positions
      const sl = drawStreamlineRef.current;
      const filteredPos: Point = {
        x: streamlinedPosRef.current.x * sl + rawPos.x * (1 - sl),
        y: streamlinedPosRef.current.y * sl + rawPos.y * (1 - sl),
      };
      streamlinedPosRef.current = filteredPos;
      const pos = filteredPos;

      pointsRef.current.push(pos);
      const pts = pointsRef.current;

      // Velocity → thinning-based width variation
      const dt = Math.max(1, e.timeStamp - lastTimestampRef.current);
      lastTimestampRef.current = e.timeStamp;
      if (pts.length >= 2) {
        const prev = pts[pts.length - 2];
        const dist = Math.hypot(pos.x - prev.x, pos.y - prev.y);
        const velocity = dist / dt; // logical px per ms

        const base = strokeWidthRef.current;
        const thinning = drawThinningRef.current;

        // Thick (slow stroke) vs thin (fast stroke) — very dramatic range
        const thick = base * (1 + thinning * 1.2);
        const thin  = Math.max(base * (1 - thinning * 0.95), 0.3);
        // Normalise velocity: typical fast stroke ≈ 3 logical px/ms → vel factor 1
        const velFactor = Math.min(velocity / 3, 1);
        let target = thick * (1 - velFactor) + thin * velFactor;

        // Calligraphic angle modulation — much more dramatic (0.1× to 1.0×)
        if (drawAngleRef.current !== 0) {
          const dx = pos.x - prev.x;
          const dy = pos.y - prev.y;
          const strokeAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          const diff = Math.abs(((strokeAngle - drawAngleRef.current + 360) % 360) - 180);
          const angleMultiplier = 0.1 + 0.9 * (diff / 180);
          target *= angleMultiplier;
        }

        // Smoothing: how fast the width catches up to target
        // smoothing=0 → instant (harsh), smoothing=1 → very slow (silky)
        const smoothing = drawSmoothingRef.current;
        const lerpFactor = 0.02 + (1 - smoothing) * 0.88; // 0.02 … 0.90
        currentWidthRef.current = currentWidthRef.current * (1 - lerpFactor) + target * lerpFactor;
        currentWidthRef.current = Math.max(0.3, currentWidthRef.current);
      }

      if (pts.length >= 3) {
        const p1 = pts[pts.length - 2];
        const p2 = pts[pts.length - 1];
        const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        ctx.lineWidth = currentWidthRef.current;
        ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mid.x, mid.y);
      } else {
        ctx.lineWidth = currentWidthRef.current;
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const ctx = canvas.getContext("2d")!;
      const pts = pointsRef.current;
      if (pts.length) {
        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      }
      setPreviewUrl(buildAdjustedCanvas(canvas, sigScaleRef.current, sigMarginRef.current).toDataURL("image/png"));
      isDrawingRef.current = false;
      pointsRef.current = [];
    };

    canvas.addEventListener("pointerdown", onDown, { passive: false });
    canvas.addEventListener("pointermove", onMove, { passive: false });
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  // Re-run when switching back to draw tab so fresh canvas element gets listeners
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // ── Undo / Redo ───────────────────────────────────────────────────────────
  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRedoStack((p) => [...p, current]);
    ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
    setUndoStack((s) => s.slice(0, -1));
    if (undoStack.length === 1) setHasDrawn(false);
  }, [undoStack]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((p) => [...p, current]);
    ctx.putImageData(redoStack[redoStack.length - 1], 0, 0);
    setRedoStack((s) => s.slice(0, -1));
    setHasDrawn(true);
  }, [redoStack]);

  // ── Clear draw canvas ─────────────────────────────────────────────────────
  const clearDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    saveState();
    ctx.clearRect(0, 0, CW, CH);
    setHasDrawn(false);
    setUndoStack([]);
    setRedoStack([]);
  }, [saveState]);

  // ── Render typed signature on a high-res offscreen canvas (4×) ───────────
  const renderTypeCanvas = useCallback(
    (font: string, color: string): HTMLCanvasElement => {
      const BW = CW * EXPORT_SCALE; // 3200
      const BH = CH * EXPORT_SCALE; // 1040
      const oc = document.createElement("canvas");
      oc.width = BW;
      oc.height = BH;
      const ctx = oc.getContext("2d")!;
      ctx.clearRect(0, 0, BW, BH);
      const fontMeta = FONT_MAP.get(font);
      // Multiply canvas size by EXPORT_SCALE for crisp high-res text
      const sizePx = FONT_SIZE[fontMeta?.size ?? "md"].canvas * EXPORT_SCALE;
      ctx.font = `${sizePx}px '${font}', cursive`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName || "Your Name", BW / 2, BH / 2);
      return oc;
    },
    [typedName]
  );

  // ── Keep refs in sync with state ─────────────────────────────────────────
  useEffect(() => { sigScaleRef.current = sigScale; }, [sigScale]);
  useEffect(() => { sigMarginRef.current = sigMargin; }, [sigMargin]);

  // ── Auto live preview: type tab ───────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== "type") return;
    if (!typedName || !selectedFont) { setPreviewUrl(null); return; }
    const raw = renderTypeCanvas(selectedFont, typeColor);
    if (raw) setPreviewUrl(buildAdjustedCanvas(raw, sigScale, sigMargin).toDataURL("image/png"));
  }, [activeTab, typedName, selectedFont, typeColor, renderTypeCanvas, sigScale, sigMargin]);

  // ── Auto live preview: upload tab ────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== "upload") return;
    const canvas = uploadCanvasRef.current;
    if (canvas && uploadedImage) setPreviewUrl(buildAdjustedCanvas(canvas, sigScale, sigMargin).toDataURL("image/png"));
    else if (!uploadedImage) setPreviewUrl(null);
  }, [activeTab, uploadedImage, bgRemoved, sigScale, sigMargin]);

  // ── Auto live preview: draw tab when switching back ───────────────────────
  useEffect(() => {
    if (activeTab !== "draw") return;
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) setPreviewUrl(buildAdjustedCanvas(canvas, sigScale, sigMargin).toDataURL("image/png"));
    else if (!hasDrawn) setPreviewUrl(null);
  }, [activeTab, hasDrawn, sigScale, sigMargin]);

  // ── Upload image (no size limit — show time estimate for large files) ──────
  const [uploadProcessing, setUploadProcessing] = useState(false);
  const [uploadEstimate, setUploadEstimate] = useState<string | null>(null);

  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: "Please upload an image file (PNG, JPG, WebP, etc.)." });
        return;
      }
      // Estimate processing time for large files
      const sizeMB = file.size / (1024 * 1024);
      let estimate: string | null = null;
      if (sizeMB > 50) estimate = "~10–30 seconds";
      else if (sizeMB > 20) estimate = "~5–10 seconds";
      else if (sizeMB > 10) estimate = "~2–5 seconds";
      else if (sizeMB > 5) estimate = "~1–2 seconds";
      setUploadEstimate(estimate);
      setUploadProcessing(true);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setBgRemoved(false);
        setUploadProcessing(false);
        setUploadEstimate(null);
      };
      reader.onerror = () => {
        setUploadProcessing(false);
        setUploadEstimate(null);
        toast({ title: "Upload failed", description: "Could not read the file. Please try again." });
      };
      reader.readAsDataURL(file);
    },
    [toast]
  );

  // ── Draw uploaded image onto upload canvas ────────────────────────────────
  useEffect(() => {
    const canvas = uploadCanvasRef.current;
    if (!canvas || !uploadedImage) return;
    // 4× high-res buffer for crisp exports
    const BW = CW * EXPORT_SCALE;
    const BH = CH * EXPORT_SCALE;
    canvas.width = BW;
    canvas.height = BH;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, BW, BH);
      const ratio = Math.min((BW * 0.85) / img.width, (BH * 0.85) / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      ctx.drawImage(img, (BW - w) / 2, (BH - h) / 2, w, h);
      setPreviewUrl(buildAdjustedCanvas(canvas, sigScaleRef.current, sigMarginRef.current).toDataURL("image/png"));
    };
    img.src = uploadedImage;
  }, [uploadedImage]);

  // ── Remove white background ───────────────────────────────────────────────
  const removeBackground = useCallback(() => {
    const canvas = uploadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 220 && d[i + 1] > 220 && d[i + 2] > 220) d[i + 3] = 0;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(id, 0, 0);
    setBgRemoved(true);
    setPreviewUrl(buildAdjustedCanvas(canvas, sigScaleRef.current, sigMarginRef.current).toDataURL("image/png"));
    toast({ title: "Done!", description: "White background removed." });
  }, [toast]);

  // ── Get the active canvas for export ─────────────────────────────────────
  const getExportCanvas = useCallback((): HTMLCanvasElement | null => {
    if (activeTab === "draw") {
      const display = canvasRef.current;
      if (!display) return null;
      if (!hasDrawn) return null;
      // Upscale the 1× display canvas to 4× for high-res download
      const exp = document.createElement("canvas");
      exp.width = CW * EXPORT_SCALE;
      exp.height = CH * EXPORT_SCALE;
      const ctx = exp.getContext("2d")!;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(display, 0, 0, exp.width, exp.height);
      return exp;
    }
    if (activeTab === "type") {
      if (!selectedFont || !typedName) return null;
      return renderTypeCanvas(selectedFont, typeColor);
    }
    if (activeTab === "upload") return uploadCanvasRef.current;
    return null;
  }, [activeTab, hasDrawn, selectedFont, typedName, typeColor, renderTypeCanvas]);

  // ── Build PNG + JPG + thumb from current canvas ───────────────────────────
  const buildFormats = useCallback((src: HTMLCanvasElement) => {
    // Transparent PNG
    const pngC = document.createElement("canvas");
    pngC.width = src.width; pngC.height = src.height;
    const pngCtx = pngC.getContext("2d")!;
    pngCtx.drawImage(src, 0, 0);
    const id = pngCtx.getImageData(0, 0, pngC.width, pngC.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) d[i + 3] = 0;
    }
    pngCtx.clearRect(0, 0, pngC.width, pngC.height);
    pngCtx.putImageData(id, 0, 0);
    const png = pngC.toDataURL("image/png");

    // White-BG JPG
    const jpgC = document.createElement("canvas");
    jpgC.width = src.width; jpgC.height = src.height;
    const jpgCtx = jpgC.getContext("2d")!;
    jpgCtx.fillStyle = "white";
    jpgCtx.fillRect(0, 0, jpgC.width, jpgC.height);
    jpgCtx.drawImage(src, 0, 0);
    const jpg = jpgC.toDataURL("image/jpeg", 0.92);

    // Small thumbnail (400 × 130 px, white BG)
    const tC = document.createElement("canvas");
    tC.width = 400; tC.height = 130;
    const tCtx = tC.getContext("2d")!;
    tCtx.fillStyle = "white";
    tCtx.fillRect(0, 0, 400, 130);
    tCtx.drawImage(src, 0, 0, 400, 130);
    const thumb = tC.toDataURL("image/jpeg", 0.7);

    return { png, jpg, thumb };
  }, []);

  // ── Download helpers ──────────────────────────────────────────────────────
  const downloadPNG = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) {
      toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." });
      return;
    }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    const formats = buildFormats(src);
    pendingFormatsRef.current = formats;
    const a = document.createElement("a");
    a.href = formats.png;
    a.download = `signature-${Date.now()}.png`;
    a.click();
    toast({ title: "Downloaded!", description: "Saved as transparent PNG." });
    setShowSavePrompt(true);
  }, [getExportCanvas, toast, buildFormats, sigScale, sigMargin]);

  const downloadJPG = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) {
      toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." });
      return;
    }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    const formats = buildFormats(src);
    pendingFormatsRef.current = formats;
    const a = document.createElement("a");
    a.href = formats.jpg;
    a.download = `signature-${Date.now()}.jpg`;
    a.click();
    toast({ title: "Downloaded!", description: "Saved as JPG." });
    setShowSavePrompt(true);
  }, [getExportCanvas, toast, buildFormats, sigScale, sigMargin]);

  const openDownloadDialog = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) {
      setDlPage("need-sig");
      setShowDownloadDialog(true);
      return;
    }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    const aspect = src.width / src.height;
    setDlSigAspect(aspect || 4);
    setDlSignaturePng(src.toDataURL("image/png"));
    setDlPage("options");
    setShowDownloadDialog(true);
  }, [getExportCanvas, sigScale, sigMargin]);

  // ── Preview ───────────────────────────────────────────────────────────────
  const generatePreview = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) {
      toast({ title: "Nothing to preview", description: "Draw, type, or upload a signature first." });
      return;
    }
    setPreviewUrl(buildAdjustedCanvas(raw, sigScale, sigMargin).toDataURL("image/png"));
  }, [getExportCanvas, toast, sigScale, sigMargin]);

  // ── Copy for Gmail ────────────────────────────────────────────────────────
  const copyForGmail = useCallback(async () => {
    const src = getExportCanvas();
    if (!src) {
      toast({ title: "Nothing to copy", description: "Draw, type, or upload a signature first." });
      return;
    }
    const oc = document.createElement("canvas");
    oc.width = src.width;
    oc.height = src.height;
    const ctx = oc.getContext("2d")!;
    ctx.drawImage(src, 0, 0);
    const id = ctx.getImageData(0, 0, oc.width, oc.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) d[i + 3] = 0;
    }
    ctx.clearRect(0, 0, oc.width, oc.height);
    ctx.putImageData(id, 0, 0);
    const displayW = 200;
    const displayH = Math.round(oc.height * (displayW / oc.width));
    const dataUrl = oc.toDataURL("image/png");
    const html = `<img src="${dataUrl}" width="${displayW}" height="${displayH}" alt="Signature" style="display:block;max-width:${displayW}px;height:auto;border:none;outline:none;" />`;

    try { (window as any).gtag?.("event", "copy_signature_clicked", { method: activeTab }); } catch {}

    try {
      if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
        const htmlBlob = new Blob([html], { type: "text/html" });
        const textBlob = new Blob(["[Signature image — paste into Gmail Signature editor]"], { type: "text/plain" });
        await navigator.clipboard.write([new ClipboardItem({ "text/html": htmlBlob, "text/plain": textBlob })]);
        setFallbackHtml(null);
        setGmailCopied(true);
        setShowGmailGuide(true);
        toast({ title: "Signature copied!", description: "Paste it in Gmail Settings → Signature." });
      } else {
        throw new Error("ClipboardItem not supported");
      }
    } catch {
      setFallbackHtml(html);
      setGmailCopied(false);
      setShowGmailGuide(true);
    }
  }, [getExportCanvas, toast, activeTab]);

  const copyFallbackHtml = useCallback(async () => {
    if (!fallbackHtml) return;
    try {
      await navigator.clipboard.writeText(fallbackHtml);
      setGmailCopied(true);
      toast({ title: "HTML copied!", description: "Paste it in Gmail Settings → Signature." });
    } catch {
      toast({ title: "Copy failed", description: "Please select all text in the box and copy manually." });
    }
  }, [fallbackHtml, toast]);

  // ── Save to history ───────────────────────────────────────────────────────
  const saveToHistory = useCallback((formats: { png: string; jpg: string; thumb: string }) => {
    const now = new Date();
    const label = `Signature · ${now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`;
    const item: SigHistoryItem = {
      id: Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4),
      pngDataUrl: formats.png,
      jpgDataUrl: formats.jpg,
      thumbUrl: formats.thumb,
      label,
      savedAt: Date.now(),
    };
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, 12);
      persistHistory(next);
      return next;
    });
    try { (window as any).gtag?.("event", "save_signature_clicked"); } catch {}
    toast({ title: "Saved!", description: "Signature added to your local history." });
  }, [toast]);

  const confirmSaveFromPrompt = useCallback(() => {
    if (pendingFormatsRef.current) {
      saveToHistory(pendingFormatsRef.current);
      pendingFormatsRef.current = null;
    }
    setShowSavePrompt(false);
  }, [saveToHistory]);

  const saveCurrentToHistory = useCallback(() => {
    const src = getExportCanvas();
    if (!src) {
      toast({ title: "Nothing to save", description: "Draw, type, or upload a signature first." });
      return;
    }
    const formats = buildFormats(src);
    saveToHistory(formats);
  }, [getExportCanvas, buildFormats, saveToHistory, toast]);

  const deleteFromHistory = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((h) => h.id !== id);
      persistHistory(next);
      return next;
    });
  }, []);

  const reDownload = useCallback((item: SigHistoryItem, format: "png" | "jpg") => {
    const a = document.createElement("a");
    a.href = format === "png" ? item.pngDataUrl : item.jpgDataUrl;
    a.download = `signature-${format === "png" ? "transparent" : "white"}-${item.id}.${format}`;
    a.click();
  }, []);

  // ── Try signature style shortcut ──────────────────────────────────────────
  const SIGNATURE_STYLES: Array<{ label: string; font: string; sampleName: string }> = [
    { label: "Stylish",      font: "Great Vibes",    sampleName: "Alex Johnson" },
    { label: "Minimal",      font: "Caveat",         sampleName: "Alex Johnson" },
    { label: "Bold",         font: "Pacifico",       sampleName: "Alex Johnson" },
    { label: "Professional", font: "Dancing Script", sampleName: "Alex Johnson" },
  ];
  const trySignatureStyle = useCallback(
    (font: string, sampleName: string) => {
      setActiveTab("type");
      if (!typedName) setTypedName(sampleName);
      setSelectedFont(font);
      setRecentFont(font);
      saveRecentFont(font);
    },
    [typedName]
  );

  const handleFontSelect = useCallback((fontValue: string) => {
    setSelectedFont(fontValue);
    setRecentFont(fontValue);
    saveRecentFont(fontValue);
  }, []);

  // ── SEO ───────────────────────────────────────────────────────────────────
  const CANONICAL = "https://tools.pixocraft.in/tools/signature-pad-tool";
  useSEO({
    title: "Free Online Signature Generator – Draw, Type, Upload PNG | Pixocraft",
    description:
      "Create your digital signature online instantly. Draw, type, or upload and download as transparent PNG or JPG. Free, no signup, 100% private.",
    keywords:
      "online signature generator, free signature maker, digital signature online, handwritten signature generator, e signature maker, create signature online, instant signature download, signature no signup, free e-signature, signature for PDF",
    canonicalUrl: CANONICAL,
  });

  const howItWorks = [
    { step: 1, title: "Choose a Method", description: "Draw with your mouse or finger, type your name in a handwritten font, or upload a photo of your existing signature." },
    { step: 2, title: "Customize", description: "Adjust color, stroke thickness, font style, and more until it looks exactly right." },
    { step: 3, title: "Download Instantly", description: "Export as transparent PNG or white-background JPG — high-resolution (3200×1040 px) and ready to use anywhere." },
  ];

  const benefits = [
    { icon: <PenTool className="h-5 w-5" />, title: "Natural Drawing", description: "Bezier curve smoothing gives hand-drawn strokes a natural, professional look." },
    { icon: <Type className="h-5 w-5" />, title: "50+ Handwritten Fonts", description: "Type your name and instantly preview it in 50+ beautiful calligraphic styles." },
    { icon: <ImageIcon className="h-5 w-5" />, title: "Upload & Clean", description: "Upload a signature photo and remove the white background automatically." },
    { icon: <Shield className="h-5 w-5" />, title: "100% Private", description: "Your signature never leaves your browser. Zero storage, zero uploads, ever." },
  ];

  const faqs = [
    {
      question: "Is my signature stored anywhere?",
      answer: "No. This tool is entirely client-side. Your signature data never leaves your browser and is never sent to any server. We do not store, log, or transmit any signature you create.",
    },
    {
      question: "Is an online digital signature legally valid?",
      answer: "In many countries, yes. Electronic signatures are legally recognized under laws such as the US ESIGN Act, EU eIDAS Regulation, and India's IT Act 2000. However, legal validity depends on context and jurisdiction — for high-stakes documents, consider a qualified electronic signature service.",
    },
    {
      question: "Is an online signature valid in India?",
      answer: "Yes. The Information Technology Act 2000 and IT (Amendment) Act 2008 recognise electronic signatures as legally valid for most contracts, agreements, and business documents in India. For government forms requiring a Digital Signature Certificate (DSC), a certified CA-issued DSC is required.",
    },
    {
      question: "Can I use this on my phone or tablet?",
      answer: "Yes! Touch input is fully supported for drawing signatures on mobile and tablet devices. The drawing canvas recognizes single-touch strokes for a natural, accurate feel on any touchscreen.",
    },
    {
      question: "What file formats can I download?",
      answer: "You can download your signature as a transparent PNG (ideal for overlaying on any document or image) or a white-background JPG (best for email footers and platforms that don't support transparency).",
    },
    {
      question: "How do I add my signature to a PDF?",
      answer: "Download your signature as a transparent PNG, then open your PDF in any editor (Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools). Use Insert → Image to place the PNG over the signature line.",
    },
    {
      question: "How do I insert a signature into Word or Google Docs?",
      answer: "Download your signature as a transparent PNG. In Microsoft Word, go to Insert → Pictures → This Device and select the file. In Google Docs, go to Insert → Image → Upload from computer. Resize and position it over the signature area.",
    },
    {
      question: "How do I use my signature in an email?",
      answer: "Download your signature as a PNG. In Gmail, go to Settings → See all settings → Signature, click Insert image, and upload your PNG. In Outlook, paste the image directly into your signature editor under File → Options → Mail → Signatures.",
    },
    {
      question: "How do I remove the background from an uploaded signature?",
      answer: "Switch to the Upload tab, upload your PNG or JPG image, then click 'Remove White Background'. The tool uses pixel-level threshold analysis to make white and near-white pixels fully transparent.",
    },
    {
      question: "Can I undo mistakes while drawing?",
      answer: "Yes! Use the Undo and Redo buttons to step back and forward through your drawing history at any point during your session. Each stroke is saved as a separate history state.",
    },
    {
      question: "What resolution is the downloaded signature?",
      answer: "Exports are rendered at 4× the display resolution — 3200×1040 px — for crisp, print-quality output that looks sharp on screen, in documents, and in print.",
    },
    {
      question: "How many fonts are available in the Type tab?",
      answer: "There are 50+ handwritten fonts across 7 style categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker styles, airy fonts, and formal calligraphy.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No. There is no registration, login, or account required. Open the tool, create your signature, and download — completely free.",
    },
    {
      question: "Can I use the downloaded signature commercially?",
      answer: "Yes. Since you are creating the signature yourself and it is your own personal mark, you may use it for commercial documents, contracts, and professional correspondence.",
    },
    {
      question: "Is this online signature generator really free?",
      answer: "Yes, completely. There are no hidden fees, no watermarks, no trial periods, and no premium tiers. This online signature generator is free forever.",
    },
  ];

  // ── Schema markup ─────────────────────────────────────────────────────────
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Online Signature Generator – Pixocraft",
    description:
      "Create your digital signature online for free. Draw, type, or upload and download as transparent PNG or JPG. 100% private — runs entirely in your browser.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                        url: "https://tools.pixocraft.in/" },
    { name: "Utilities",                   url: "https://tools.pixocraft.in/category/utility" },
    { name: "Online Signature Generator",  url: CANONICAL },
  ]);
  const webPageSchema = generateWebPageSchema({
    name: "Free Online Signature Generator – Draw, Type, Upload PNG | Pixocraft",
    description:
      "Create your digital signature online instantly. Draw, type, or upload and download as transparent PNG or JPG. Free, no signup, 100% private.",
    url: CANONICAL,
  });
  const howToSchema = generateHowToSchema({
    name: "How to Create a Digital Signature Online",
    description: "Use Pixocraft's free online signature generator to draw, type, or upload a signature and download it as a transparent PNG or JPG in seconds.",
    steps: [
      { name: "Choose your method", text: "Select the Draw tab to freehand draw with mouse or touch, the Type tab to pick a handwritten font, or the Upload tab to upload a photo of your signature." },
      { name: "Customize your signature", text: "Adjust ink color and stroke thickness for drawing, choose from 50+ fonts for typing, or remove the background for an uploaded image." },
      { name: "Preview your signature", text: "Click the Preview button to see how your signature looks on a document and in an email footer." },
      { name: "Download your signature", text: "Click 'PNG (Transparent)' for a clear background file or 'JPG (White BG)' for a white background version. The file downloads instantly." },
    ],
  });

  // ── Shared canvas style ───────────────────────────────────────────────────
  const canvasStyle: React.CSSProperties = { width: "100%", height: CH, display: "block" };

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <ToolLayout
        title="Create Your Signature Online Instantly"
        description="Draw, Type or Upload • Free Forever • No Signup • 100% Private • Instant PNG Download"
        icon={<PenTool className="h-8 w-8" />}
        toolId="signature-pad-tool"
        category="utility"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
      {/* ── TOOL CARD ───────────────────────────────────────────────────────── */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">

        {/* Card header: trust badges */}
        <div className="px-5 py-3 border-b bg-muted/30 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
            <Shield className="h-3.5 w-3.5" /> 100% Private — runs in your browser
          </span>
          <div className="flex flex-wrap gap-2 ml-auto">
            {[
              { icon: <Star className="h-3 w-3" />, label: "Free Forever" },
              { icon: <Zap className="h-3 w-3" />, label: "Instant Download" },
              { icon: <Smartphone className="h-3 w-3" />, label: "Mobile Ready" },
              { icon: <span className="text-[9px] font-bold leading-none">IN</span>, label: "Made in India" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 space-y-5">

          {/* ── TAB SELECTOR ──────────────────────────────────────────────── */}
          <div className="flex gap-1.5 p-1.5 rounded-xl bg-muted/60 border" data-testid="tabs-method">
            {(
              [
                { id: "draw",   icon: PenTool, title: "Draw",   desc: "Freehand" },
                { id: "type",   icon: Type,    title: "Type",   desc: "50+ Fonts" },
                { id: "upload", icon: Upload,   title: "Upload", desc: "From photo" },
              ] as const
            ).map(({ id, icon: Icon, title, desc }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                data-testid={`tab-${id}`}
                className={[
                  "flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-lg text-base font-semibold transition-all cursor-pointer select-none",
                  activeTab === id
                    ? "bg-background text-foreground shadow-sm border"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{title}</span>
                <span className={`hidden sm:inline text-sm font-normal ${activeTab === id ? "text-muted-foreground" : "text-muted-foreground/60"}`}>· {desc}</span>
              </button>
            ))}
          </div>

          {/* ── DRAW TAB ──────────────────────────────────────────────────── */}
          {activeTab === "draw" && (
            <div className="space-y-3">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/40 border">
                <div className="flex items-center gap-2">
                  <Label htmlFor="ink-color" className="text-xs whitespace-nowrap">Ink</Label>
                  <input
                    id="ink-color"
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="h-8 w-10 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
                    data-testid="input-stroke-color"
                  />
                  <span className="text-xs text-muted-foreground font-mono hidden sm:inline">{strokeColor}</span>
                </div>
                <div className="w-px h-5 bg-border hidden sm:block" />
                <div className="flex items-center gap-2 flex-1 min-w-32">
                  <Label className="text-xs whitespace-nowrap">Width: <span className="font-mono">{strokeWidth.toFixed(1)}</span></Label>
                  <Slider
                    min={1} max={8} step={0.5}
                    value={[strokeWidth]}
                    onValueChange={([v]) => setStrokeWidth(v)}
                    data-testid="slider-stroke-width"
                    className="flex-1"
                  />
                </div>
                <div className="w-px h-5 bg-border hidden sm:block" />
                <div className="flex items-center gap-1 ml-auto">
                  <Button size="icon" variant="ghost" onClick={undo} disabled={undoStack.length === 0} title="Undo" data-testid="button-undo">
                    <Undo2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={redo} disabled={redoStack.length === 0} title="Redo" data-testid="button-redo">
                    <Redo2 className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-5 bg-border mx-1" />
                  <Button
                    size="icon" variant="ghost"
                    onClick={() => setShowAdvanced((v) => !v)}
                    title="Advanced draw settings"
                    data-testid="button-advanced"
                    className={showAdvanced ? "text-primary bg-primary/10" : ""}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-5 bg-border mx-1" />
                  <Button size="icon" variant="ghost" onClick={clearDraw} disabled={!hasDrawn && undoStack.length === 0} title="Clear canvas" data-testid="button-clear" className="text-destructive/70 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Advanced Draw Panel */}
              {showAdvanced && (
                <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-4" data-testid="advanced-draw-panel">
                  {/* Style presets */}
                  <div>
                    <p className="text-xs font-semibold mb-2">Quick Presets</p>
                    <div className="flex flex-wrap gap-2">
                      {([
                        { id: "default" as DrawPreset, label: "Default",     desc: "Balanced" },
                        { id: "elegant" as DrawPreset, label: "Elegant",     desc: "Wide & smooth" },
                        { id: "bold"    as DrawPreset, label: "Bold",        desc: "Thick brush" },
                        { id: "quick"   as DrawPreset, label: "Quick",       desc: "Thin & fast" },
                      ]).map(({ id, label, desc }) => (
                        <button
                          key={id}
                          onClick={() => applyPreset(id)}
                          data-testid={`preset-${id}`}
                          className={[
                            "flex flex-col items-start px-3 py-2 rounded-lg text-xs font-semibold border transition-all",
                            activePreset === id
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background text-foreground border-border hover-elevate",
                          ].join(" ")}
                        >
                          <span>{label}</span>
                          <span className={`text-[10px] font-normal mt-0.5 ${activePreset === id ? "opacity-70" : "text-muted-foreground"}`}>{desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Stroke Width */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">Stroke Width</span>
                      <span className="text-xs font-mono text-muted-foreground">{strokeWidth.toFixed(1)}px</span>
                    </div>
                    <Slider
                      min={0.5} max={30} step={0.5}
                      value={[strokeWidth]}
                      onValueChange={([v]) => { setStrokeWidth(v); strokeWidthRef.current = v; setActivePreset("default"); }}
                      data-testid="slider-stroke-width-adv"
                    />
                    <p className="text-[10px] text-muted-foreground">Base thickness of every stroke</p>
                  </div>

                  {/* Thinning */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">Thinning</span>
                      <span className="text-xs font-mono text-muted-foreground">{drawThinning.toFixed(2)}</span>
                    </div>
                    <Slider
                      min={0} max={1} step={0.05}
                      value={[drawThinning]}
                      onValueChange={([v]) => { setDrawThinning(v); drawThinningRef.current = v; setActivePreset("default"); }}
                      data-testid="slider-thinning"
                    />
                    <p className="text-[10px] text-muted-foreground">Fast strokes get thin, slow strokes get thick — like real ink</p>
                  </div>

                  {/* Smoothing */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">Smoothing</span>
                      <span className="text-xs font-mono text-muted-foreground">{drawSmoothing.toFixed(2)}</span>
                    </div>
                    <Slider
                      min={0} max={1} step={0.05}
                      value={[drawSmoothing]}
                      onValueChange={([v]) => { setDrawSmoothing(v); drawSmoothingRef.current = v; setActivePreset("default"); }}
                      data-testid="slider-smoothing"
                    />
                    <p className="text-[10px] text-muted-foreground">How gradually the width transitions — high = silky, low = instant</p>
                  </div>

                  {/* Streamline */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">Streamline</span>
                      <span className="text-xs font-mono text-muted-foreground">{drawStreamline.toFixed(2)}</span>
                    </div>
                    <Slider
                      min={0} max={0.9} step={0.05}
                      value={[drawStreamline]}
                      onValueChange={([v]) => { setDrawStreamline(v); drawStreamlineRef.current = v; setActivePreset("default"); }}
                      data-testid="slider-streamline"
                    />
                    <p className="text-[10px] text-muted-foreground">Smooths out shaky paths — high removes wobble, low follows every tremor</p>
                  </div>

                  {/* Angle */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">Pen Angle</span>
                      <span className="text-xs font-mono text-muted-foreground">{drawAngle}°</span>
                    </div>
                    <Slider
                      min={-90} max={90} step={5}
                      value={[drawAngle]}
                      onValueChange={([v]) => { setDrawAngle(v); drawAngleRef.current = v; setActivePreset("default"); }}
                      data-testid="slider-angle"
                    />
                    <p className="text-[10px] text-muted-foreground">Calligraphic tilt — strokes parallel to this angle become thin, perpendicular become thick</p>
                  </div>

                  <p className="text-[10px] text-primary/70 font-medium pt-1">Tip: Thinning works best with Stroke Width 4px or higher</p>
                </div>
              )}

              {/* Canvas */}
              <div className="relative rounded-lg border border-border overflow-hidden bg-white" style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04)" }}>
                {/* Subtle horizontal guide lines rendered behind the canvas */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)",
                    opacity: 0.5,
                  }}
                />
                <canvas
                  ref={canvasRef}
                  style={{ ...canvasStyle, background: "transparent" }}
                  className="cursor-crosshair touch-none block relative z-10"
                  data-testid="canvas-draw"
                />
                {!hasDrawn && (
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 select-none">
                    <PenTool className="h-6 w-6 text-muted-foreground/20" />
                    <span className="text-sm text-muted-foreground/35">Draw your signature here</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TYPE TAB ──────────────────────────────────────────────────── */}
          {activeTab === "type" && (() => {
            // Compute filtered + sorted font list
            const q = fontSearch.toLowerCase().trim();
            let filtered = ALL_FONTS.filter((f) => {
              const matchCat = fontCategory === "all" || f.category === fontCategory;
              const matchQ   = !q || f.label.toLowerCase().includes(q);
              return matchCat && matchQ;
            });
            if (fontSort === "az") {
              filtered = [...filtered].sort((a, b) => a.label.localeCompare(b.label));
            }

            const recentFontMeta = recentFont ? FONT_MAP.get(recentFont) : null;
            const topPickFonts   = TOP_PICKS.map((v) => FONT_MAP.get(v)).filter(Boolean) as typeof ALL_FONTS;

            return (
            <div className="space-y-4">
              {/* ── Name + Color row ── */}
              <div className="flex flex-wrap gap-3 items-end">
                <div className="space-y-1.5 flex-1 min-w-52">
                  <Label htmlFor="typed-name" className="text-xs">Your Name</Label>
                  <Input
                    id="typed-name"
                    placeholder="e.g. Alex Johnson"
                    value={typedName}
                    onChange={(e) => setTypedName(e.target.value)}
                    className="text-base"
                    data-testid="input-typed-name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="type-color" className="text-xs">Ink Color</Label>
                  <input
                    id="type-color"
                    type="color"
                    value={typeColor}
                    onChange={(e) => setTypeColor(e.target.value)}
                    className="h-9 w-14 rounded-md border border-border cursor-pointer bg-transparent p-0.5 block"
                    data-testid="input-type-color"
                  />
                </div>
              </div>

              {/* ── Search + Sort row ── */}
              <div className="flex gap-2 items-center flex-wrap">
                <div className="relative flex-1 min-w-40">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search fonts…"
                    value={fontSearch}
                    onChange={(e) => setFontSearch(e.target.value)}
                    className="pl-8 h-9 text-sm"
                    data-testid="input-font-search"
                  />
                </div>
                <div className="flex rounded-lg border overflow-hidden shrink-0">
                  <button
                    onClick={() => setFontSort("popular")}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${fontSort === "popular" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
                    data-testid="sort-popular"
                  >
                    Popular
                  </button>
                  <button
                    onClick={() => setFontSort("az")}
                    className={`px-3 py-1.5 text-xs font-medium border-l transition-colors ${fontSort === "az" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}
                    data-testid="sort-az"
                  >
                    A–Z
                  </button>
                </div>
              </div>

              {/* ── Category filter tabs ── */}
              <div className="flex gap-1.5 flex-wrap">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFontCategory(tab.id)}
                    data-testid={`filter-tab-${tab.id}`}
                    className={[
                      "px-3 py-1 rounded-full text-xs font-medium transition-all",
                      fontCategory === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ── Scrollable font list ── */}
              <div className="max-h-[520px] overflow-y-auto space-y-4 pr-1 rounded-md">

                {/* Recently Used */}
                {recentFontMeta && !fontSearch && fontCategory === "all" && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5 sticky top-0 bg-background py-1 z-10">
                      <span className="h-px flex-1 bg-border" />
                      Recently Used
                      <span className="h-px flex-1 bg-border" />
                    </p>
                    <FontCard
                      font={recentFontMeta}
                      isSelected={selectedFont === recentFontMeta.value}
                      typedName={typedName}
                      typeColor={typeColor}
                      onClick={handleFontSelect}
                      badge="Recent"
                      badgeCls="bg-muted text-muted-foreground"
                    />
                  </div>
                )}

                {/* Top Picks */}
                {!fontSearch && fontCategory === "all" && (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5 sticky top-0 bg-background py-1 z-10">
                      <span className="h-px flex-1 bg-border" />
                      Top Picks
                      <span className="h-px flex-1 bg-border" />
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topPickFonts.map((font) => (
                        <FontCard
                          key={font.value}
                          font={font}
                          isSelected={selectedFont === font.value}
                          typedName={typedName}
                          typeColor={typeColor}
                          onClick={handleFontSelect}
                          badge="Top Pick"
                          badgeCls="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Main font grid */}
                {(() => {
                  const showAll = !fontSearch && fontCategory === "all";
                  if (showAll) {
                    const cats: FontCategory[] = ["signature", "elegant", "professional", "creative", "handwritten", "casual", "rare"];
                    return (
                      <div className="space-y-4">
                        {cats.map((cat) => {
                          const fonts = ALL_FONTS.filter((f) => f.category === cat);
                          return (
                            <div key={cat} className="space-y-2">
                              <p className="text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2 text-muted-foreground sticky top-0 bg-background py-1 z-10">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${CATEGORY_COLORS[cat]}`}>
                                  {CATEGORY_LABELS[cat]}
                                </span>
                                <span className="h-px flex-1 bg-border" />
                                <span className="text-[9px]">{fonts.length} fonts</span>
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {fonts.map((font) => (
                                  <FontCard
                                    key={font.value}
                                    font={font}
                                    isSelected={selectedFont === font.value}
                                    typedName={typedName}
                                    typeColor={typeColor}
                                    onClick={handleFontSelect}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  if (filtered.length === 0) {
                    return (
                      <div className="py-10 text-center text-sm text-muted-foreground">
                        No fonts match &ldquo;{fontSearch}&rdquo;
                      </div>
                    );
                  }
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {filtered.map((font) => (
                        <FontCard
                          key={font.value}
                          font={font}
                          isSelected={selectedFont === font.value}
                          typedName={typedName}
                          typeColor={typeColor}
                          onClick={handleFontSelect}
                        />
                      ))}
                    </div>
                  );
                })()}

              </div>

            </div>
            );
          })()}

          {/* ── UPLOAD TAB ────────────────────────────────────────────────── */}
          {activeTab === "upload" && (
            <div className="space-y-3">
              <label
                htmlFor="upload-input"
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-lg px-6 py-10 cursor-pointer hover-elevate transition-colors text-center bg-muted/20"
                data-testid="label-upload"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Click to upload or drag &amp; drop</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Any image format — no size limit</p>
                </div>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleUpload}
                  data-testid="input-upload"
                />
              </label>

              {/* Processing indicator for large files */}
              {uploadProcessing && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg border bg-muted/40 text-sm text-muted-foreground" data-testid="upload-processing">
                  <Clock className="h-4 w-4 shrink-0 animate-pulse text-primary" />
                  <span>
                    Loading image…
                    {uploadEstimate && (
                      <span className="ml-1 font-medium text-foreground">Estimated time: {uploadEstimate}</span>
                    )}
                  </span>
                </div>
              )}

              {uploadedImage && (
                <Button
                  variant="outline"
                  onClick={removeBackground}
                  disabled={bgRemoved}
                  data-testid="button-remove-bg"
                  className={bgRemoved ? "text-green-700 dark:text-green-400 border-green-300 dark:border-green-700" : ""}
                >
                  <Eraser className="mr-2 h-4 w-4" />
                  {bgRemoved ? "Background Removed" : "Remove White Background"}
                </Button>
              )}

              <div className="relative rounded-lg border-2 border-dashed border-border overflow-hidden bg-white">
                <canvas ref={uploadCanvasRef} style={canvasStyle} className="block" data-testid="canvas-upload" />
                {!uploadedImage && (
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-muted-foreground/40 select-none">
                    <ImageIcon className="h-6 w-6" />
                    <span className="text-sm">Upload preview will appear here</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── RESIZE & MARGIN ───────────────────────────────────────────── */}
          <div className="hidden rounded-lg border p-4 space-y-4" data-testid="section-resize-margin">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-primary" />
                Resize &amp; Margin
              </p>
              {(sigScale !== 100 || sigMargin !== 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSigScale(100); setSigMargin(0); }}
                  data-testid="button-reset-resize"
                  className="text-xs text-muted-foreground"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
            </div>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Scale</Label>
                  <span className="text-xs font-medium tabular-nums text-foreground" data-testid="text-scale-value">{sigScale}%</span>
                </div>
                <Slider
                  min={50}
                  max={200}
                  step={5}
                  value={[sigScale]}
                  onValueChange={([v]) => setSigScale(v)}
                  data-testid="slider-scale"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground/60">
                  <span>50%</span><span>100%</span><span>200%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">Margin (padding)</Label>
                  <span className="text-xs font-medium tabular-nums text-foreground" data-testid="text-margin-value">{sigMargin}px</span>
                </div>
                <Slider
                  min={0}
                  max={60}
                  step={2}
                  value={[sigMargin]}
                  onValueChange={([v]) => setSigMargin(v)}
                  data-testid="slider-margin"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground/60">
                  <span>0px</span><span>30px</span><span>60px</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── EXPORT PANEL ──────────────────────────────────────────────── */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  Export &amp; Download
                </p>
                <p className="text-xs text-muted-foreground">No watermark · Instant · 100% private</p>
              </div>
              <Button onClick={generatePreview} variant="ghost" size="sm" data-testid="button-preview">
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Preview
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={openDownloadDialog} className="gap-2" data-testid="button-download-options">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button onClick={() => {
                const raw = getExportCanvas();
                if (!raw) {
                  setDlPage("need-sig");
                  setShowDownloadDialog(true);
                  return;
                }
                const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
                setDlSigAspect(src.width / src.height || 4);
                setDlSignaturePng(src.toDataURL("image/png"));
                setDlPage("sign-doc");
                setShowDownloadDialog(true);
              }} variant="outline" className="gap-2" data-testid="button-add-to-pdf">
                <FileText className="h-4 w-4" />
                Add to Doc
              </Button>
            </div>

            <div className="border-t pt-3 grid grid-cols-2 gap-2">
              <Button onClick={copyForGmail} variant="outline" size="sm" className="gap-2" data-testid="button-copy-gmail">
                <Mail className="h-3.5 w-3.5" />
                Copy for Gmail
              </Button>
              <Button onClick={saveCurrentToHistory} variant="ghost" size="sm" className="gap-2" data-testid="button-save-history">
                <ClipboardCheck className="h-3.5 w-3.5" />
                Save to History
              </Button>
            </div>
          </div>

          {/* ── TRY SIGNATURE STYLES ──────────────────────────────────────── */}
          <div className="space-y-2.5 pt-1 border-t">
            <div className="flex items-center justify-between flex-wrap gap-2 pt-3">
              <div>
                <p className="text-sm font-semibold">Try Signature Styles Instantly</p>
                <p className="text-xs text-muted-foreground">Auto-fills a preview — just download after.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIGNATURE_STYLES.map(({ label, font, sampleName }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="sm"
                  onClick={() => trySignatureStyle(font, sampleName)}
                  data-testid={`button-style-${label.toLowerCase()}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* ── SAVED HISTORY ─────────────────────────────────────────────── */}
          {history.length > 0 && (
            <div className="space-y-3 pt-1 border-t" data-testid="section-history">
              <div className="flex items-center justify-between pt-3">
                <div>
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                    Saved Signatures
                    <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{history.length}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">Click any signature to view &amp; download</p>
                </div>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="shrink-0 w-52 rounded-xl border bg-card overflow-hidden group cursor-pointer hover-elevate transition-all"
                    onClick={() => setSelectedHistoryItem(item)}
                    data-testid={`history-item-${item.id}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-24 bg-white border-b flex items-center justify-center p-3">
                      <img
                        src={item.thumbUrl}
                        alt={item.label}
                        className="max-h-full max-w-full object-contain"
                        style={{ imageRendering: "auto" }}
                      />
                      {/* Delete on hover */}
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteFromHistory(item.id); }}
                        className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                        title="Delete"
                        data-testid={`button-delete-history-${item.id}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      {/* View hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold text-zinc-600 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                          Click to view
                        </span>
                      </div>
                    </div>
                    {/* Info + quick actions */}
                    <div className="px-3 py-2 space-y-2">
                      <div>
                        <p className="text-xs font-medium text-foreground truncate">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(item.savedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-xs gap-1"
                          onClick={(e) => { e.stopPropagation(); reDownload(item, "png"); }}
                          data-testid={`button-history-png-${item.id}`}
                        >
                          <Download className="h-3 w-3" />
                          PNG
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-7 text-xs gap-1"
                          onClick={(e) => { e.stopPropagation(); reDownload(item, "jpg"); }}
                          data-testid={`button-history-jpg-${item.id}`}
                        >
                          <Download className="h-3 w-3" />
                          JPG
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

        {/* ── LIVE PREVIEW ─────────────────────────────────────────────────── */}
        <div className="space-y-4 border-t pt-5">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            Live Preview
            {!previewUrl && (
              <span className="text-xs font-normal text-muted-foreground">— draw, type, or upload a signature to see it here</span>
            )}
          </p>

          {/* Document mockup */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Document / Contract</p>
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
              <div className="space-y-2">
                {[3, 4, 3.5, 2.5].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-zinc-100" style={{ width: `${w / 4 * 100}%` }} />
                ))}
              </div>
              <div className="border-t border-zinc-100 pt-4">
                <p className="text-[10px] text-zinc-400 mb-2">Authorized Signature</p>
                {previewUrl ? (
                  <img src={previewUrl} alt="Signature preview" className="h-16 object-contain" data-testid="img-preview-doc" />
                ) : (
                  <div className="h-16 w-52 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center">
                    <span className="text-[10px] text-zinc-300 select-none">Your signature</span>
                  </div>
                )}
                <div className="mt-2 h-px w-40 bg-zinc-200" />
              </div>
            </div>
          </div>

          {/* Email mockup */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Email Footer</p>
            <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center gap-4 flex-wrap">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <PenTool className="h-5 w-5 text-primary/60" />
              </div>
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="h-2 w-28 rounded-full bg-zinc-200" />
                <div className="h-2 w-20 rounded-full bg-zinc-100" />
              </div>
              {previewUrl ? (
                <img src={previewUrl} alt="Email signature" className="h-10 object-contain" data-testid="img-preview-email" />
              ) : (
                <div className="h-10 w-28 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center shrink-0">
                  <span className="text-[9px] text-zinc-300 select-none">Signature</span>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ── SEO CONTENT SECTION ──────────────────────────────────────────── */}
        <div className="mt-10 space-y-20 text-base leading-relaxed max-w-4xl mx-auto">

          {/* shared heading style helper — inline for reuse */}

          {/* ── Signature Examples & Ideas ─────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Signature Examples &amp; Ideas</h2>
              <p className="text-muted-foreground">
                Not sure what style suits you? Browse these signature styles — each one is live-rendered and clickable.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([
                { label: "Stylish Elegant",    font: "Great Vibes",   name: "Alexandra J.",  note: "Flowing thin script — ideal for formal documents" },
                { label: "Classic Cursive",    font: "Pinyon Script", name: "David Miller",  note: "Traditional cursive — timeless professional look" },
                { label: "Bold & Modern",      font: "Pacifico",      name: "Chris Park",    note: "Bold signature — stands out on contracts" },
                { label: "Minimal Clean",      font: "Satisfy",       name: "Priya Sharma",  note: "Simple and modern — great for email footers" },
                { label: "Casual Everyday",    font: "Caveat",        name: "Sam Roberts",   note: "Natural handwriting — approachable and personal" },
                { label: "Formal Calligraphy", font: "Norican",       name: "Dr. E. Watson", note: "Formal and authoritative — suits academic use" },
              ] as const).map(({ label, font, name, note }) => (
                <div key={label} className="rounded-xl border bg-card p-5 space-y-3 hover-elevate transition-all">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                  <p
                    style={{ fontFamily: `'${font}', cursive`, fontSize: "2rem", lineHeight: 1.2 }}
                    className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis"
                  >{name}</p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-5 text-sm">
              Switch to the <strong>Type</strong> tab, type your name, and browse 50+ fonts — all free, all high-resolution.
            </p>
          </section>

          {/* ── PDF / Documents / Email guide ──────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Create Signature for PDF, Documents &amp; Email</h2>
              <p className="text-muted-foreground">Once you've created your signature, here's how to use it across the most common platforms.</p>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "Add signature to PDF",
                  body: <>Download your signature as a transparent PNG. Open your PDF in <Link href="/tools/pdf-merger" className="text-primary underline-offset-2 hover:underline font-medium">Pixocraft's PDF tools</Link>, Adobe Acrobat, or Smallpdf. Use "Insert Image" to place your signature over the signature line.</>
                },
                {
                  icon: <FileImage className="h-5 w-5 text-primary" />,
                  title: "Insert into Word or Google Docs",
                  body: <>In <strong>Microsoft Word</strong>: Insert → Pictures → select your file. In <strong>Google Docs</strong>: Insert → Image → Upload from computer. Then <Link href="/tools/image-to-pdf" className="text-primary underline-offset-2 hover:underline font-medium">convert to PDF</Link> when done.</>
                },
                {
                  icon: <Mail className="h-5 w-5 text-primary" />,
                  title: "Use as an email signature",
                  body: <>In <strong>Gmail</strong>: Settings → Signature → Insert image. In <strong>Outlook</strong>: File → Options → Mail → Signatures → insert picture. Keep height around 60–80 px for a clean inbox look.</>
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div className="space-y-1.5">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── What is ────────────────────────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">What is an Online Signature Generator?</h2>
            </div>
            <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                An <strong>online signature generator</strong> lets you create a personal digital signature in seconds — no printing, no scanning, no software to install.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              You can draw with a mouse or touchscreen, type your name in a handwritten font, or upload a photo of your existing signature and remove the background automatically.
            </p>
            <p className="text-muted-foreground">
              Pixocraft's <strong>free signature maker</strong> is 100% client-side — your data never leaves your device, making it one of the most privacy-friendly <strong>e-signature makers</strong> available.
            </p>
          </section>

          {/* ── How to ─────────────────────────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Digital Signature Online</h2>
              <p className="text-muted-foreground">Step by step — done in under 60 seconds.</p>
            </div>
            <ol className="space-y-3">
              {[
                { n: 1, t: "Choose your method", d: "Select Draw (freehand with mouse or touch), Type (50+ handwritten fonts), or Upload (from an existing photo)." },
                { n: 2, t: "Customise it",       d: "Adjust ink color and stroke thickness for drawing, pick a font style for typing, or remove the white background for an upload." },
                { n: 3, t: "Preview",             d: "Click Preview to see your signature on a simulated document and email footer mockup." },
                { n: 4, t: "Download instantly",  d: "PNG (transparent background) or JPG (white background) — no watermark, no signup, no waiting." },
              ].map(({ n, t, d }) => (
                <li key={n} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{n}</span>
                  <div>
                    <p className="font-semibold text-foreground">{t}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Draw vs Type vs Upload vs AI ───────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload vs AI — Which is Best for You?</h2>
              <p className="text-muted-foreground">Every user has a different workflow. Pick the right method in seconds:</p>
            </div>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Pros</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { method: "Draw",   best: "Personal feel",              pros: "Natural, unique, touchscreen support",       cons: "Takes more time to perfect" },
                    { method: "Type",   best: "Consistent & fast",          pros: "50+ fonts, always legible, reproducible",   cons: "Less personal than handwriting" },
                    { method: "Upload", best: "Reuse existing signature",   pros: "Background auto-removed, high-res output",  cons: "Photo quality can affect result" },
                  ].map(({ method, best, pros, cons }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{method}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{best}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{pros}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{cons}</td>
                    </tr>
                  ))}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">AI <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold ml-1">2026</span></td>
                    <td className="px-5 py-3.5 text-muted-foreground">Instant 10 styles, zero effort</td>
                    <td className="px-5 py-3.5 text-muted-foreground">Beautiful results, Pixocraft exclusive</td>
                    <td className="px-5 py-3.5 text-muted-foreground">AI-generated, not hand-drawn</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3 px-1">
              <strong>Quick pick:</strong> New user → Type. Have a signature → Upload. Want it personal → Draw. Want instant beauty → AI.
            </p>
          </section>

          {/* ── Where to use ───────────────────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Where to Use Your Pixocraft Signature</h2>
              <p className="text-muted-foreground">Your downloaded PNG works everywhere a physical signature would — and more.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "GST Invoices & E-way Bills",         body: "Paste directly into Tally, Zoho Books, or any billing software that supports image insertion." },
                { title: "NDAs, Offer Letters & Contracts",    body: <>Insert into Word or Google Docs. <Link href="/tools/image-to-pdf" className="text-primary hover:underline underline-offset-2">Convert to PDF</Link> when done.</> },
                { title: "PDF Documents",                      body: <>Use <Link href="/tools/pdf-merger" className="text-primary hover:underline underline-offset-2">Pixocraft PDF tools</Link> or Acrobat's "Insert Image" to place over a signature line.</> },
                { title: "Google Docs & Microsoft Word",       body: 'Insert → Image → Upload from computer. Set text wrap to "In front of text" for precise placement.' },
                { title: "Email Footers (Gmail, Outlook)",     body: "A transparent PNG signature adds a professional, personal touch to every email you send." },
                { title: "Online Forms & Aadhaar Services",   body: "Many government portals and HR onboarding flows accept image-based signatures in PNG format." },
                { title: "Creative Branding & Watermarks",    body: <><Link href="/tools/background-remover" className="text-primary hover:underline underline-offset-2">Remove background</Link> first, then use as a watermark on photos or design work.</> },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Legality ───────────────────────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Is Online Signature Legal in India &amp; Worldwide?</h2>
              <p className="text-muted-foreground">Yes — in most jurisdictions an electronic signature has the same legal weight as a handwritten one.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { flag: "🇮🇳", country: "India",          law: "IT Act 2000 + Amendment 2008",         desc: "Valid for contracts, GST invoices, Aadhaar docs, company agreements." },
                { flag: "🇺🇸", country: "United States",  law: "ESIGN Act + UETA",                     desc: "Same legal effect as handwritten for most contracts and agreements." },
                { flag: "🇪🇺", country: "European Union", law: "eIDAS Regulation (2016)",              desc: "SES / AES / QES tiered framework — image signatures qualify as SES." },
                { flag: "🇬🇧", country: "United Kingdom", law: "Electronic Communications Act 2000",  desc: "Legally binding for most business agreements." },
              ].map(({ flag, country, law, desc }) => (
                <div key={country} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground flex items-center gap-2"><span>{flag}</span>{country}</p>
                  <p className="text-xs font-medium text-primary">{law}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground mb-3">Simple Digital Signature vs Qualified (QES / DSC)</p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[380px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Simple (Pixocraft)</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Qualified (DSC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Cost",             "Free",                   "Paid CA certificate"],
                    ["Setup time",       "Seconds",                "Days (KYC required)"],
                    ["Use case",         "Contracts, invoices, HR","Govt filings, MCA, court"],
                    ["India acceptance", "Most commercial use",    "Specific govt portals"],
                  ].map(([feat, a, b]) => (
                    <tr key={feat} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 text-foreground font-medium">{a}</td>
                      <td className="px-5 py-3 text-muted-foreground">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>Bottom line:</strong> For NDAs, employment contracts, GST invoices, and freelance agreements — Pixocraft is entirely sufficient. For court submissions, MCA ROC filings, or property registrations — consult a legal professional and obtain a DSC.
            </div>
          </section>

          {/* ── Tips ───────────────────────────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Tips for a Professional Digital Signature</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Use dark blue or black ink",          detail: "These colours are universally accepted in legal and corporate contexts and read best on any background." },
                { tip: "Set stroke width to 3–4 px",         detail: "Thicker strokes stay visible when the image is scaled down inside PDFs or email footers." },
                { tip: "Match font style to context",         detail: "Thin elegant scripts suit formal documents. Bold markers work well for creative or casual use." },
                { tip: "Always download as transparent PNG",  detail: "A transparent background lets your signature sit cleanly on any document colour or background." },
                { tip: "Keep a master copy",                  detail: "Save your 3200×1040 px PNG in a secure folder — you'll use it repeatedly across contracts and forms." },
                { tip: "Test at small sizes",                 detail: "Preview at 40–80 px tall (the typical document signature size) to ensure it remains readable." },
              ].map(({ tip, detail }) => (
                <div key={tip} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground text-sm">{tip}</p>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Signature Examples (second instance) ────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Signature Styles — Try Them Live</h2>
              <p className="text-muted-foreground">Click any card to auto-load that style in the tool above.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { style: "Stylish / Elegant",      desc: "Flowing thin script — perfect for artists and designers.", font: "Great Vibes" },
                { style: "Minimal / Modern",       desc: "Clean and legible — ideal for tech professionals and consultants.", font: "Caveat" },
                { style: "Bold / Confident",       desc: "Strong presence — great for executives and business owners.", font: "Pacifico" },
                { style: "Professional / Classic", desc: "Universally trusted for contracts, NDAs, and formal use.", font: "Dancing Script" },
              ].map(({ style, desc, font }) => (
                <button
                  key={style}
                  onClick={() => trySignatureStyle(font, "Alex Johnson")}
                  data-testid={`button-example-${style.replace(/[^a-z]/gi, "-").toLowerCase()}`}
                  className="rounded-xl border bg-card p-5 text-left space-y-2 hover-elevate transition-all cursor-pointer"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{style}</p>
                  <p style={{ fontFamily: `'${font}', cursive`, fontSize: "clamp(22px, 4vw, 32px)", lineHeight: 1.2 }} className="text-foreground">
                    Alex Johnson
                  </p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                  <p className="text-xs text-primary font-medium">Try This Style →</p>
                </button>
              ))}
            </div>
          </section>

          {/* ── Why Pixocraft ──────────────────────────────────────────────── */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Why Pixocraft Beats Signaturely, Canva &amp; DocuSign</h2>
              <p className="text-muted-foreground">Free, private, and India-focused — here's how we compare:</p>
            </div>
            <div className="overflow-x-auto rounded-xl border mb-6">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Signaturely</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Canva</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">DocuSign</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["100% Free Forever",       "Yes", "Limited", "Pro needed", "Limited"],
                    ["No Signup",               "Yes", "Yes",     "Yes",        "Yes"],
                    ["Browser-Only (No Server)","Yes", "Partial", "Partial",    "Partial"],
                    ["AI Generator",            "Yes", "No",      "No",         "No"],
                    ["India IT Act Focus",      "Yes", "No",      "No",         "No"],
                    ["Made in India",           "Yes", "US",      "Global",     "US"],
                  ].map(([feat, pixo, sig, canva, docu]) => (
                    <tr key={feat} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 font-semibold text-primary">{pixo}</td>
                      <td className="px-5 py-3 text-muted-foreground">{sig}</td>
                      <td className="px-5 py-3 text-muted-foreground">{canva}</td>
                      <td className="px-5 py-3 text-muted-foreground">{docu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "3200 × 1040 px output", desc: "4× scale — crisp on screen, in documents, and in print." },
                { title: "50+ Handwritten Fonts", desc: "7 style categories covering every professional use case." },
                { title: "Privacy by Design",      desc: "Your signature never touches any server — ever." },
              ].map(({ title, desc }) => (
                <div key={title} className="rounded-xl border bg-primary/5 p-4 space-y-1">
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Related tools + EEAT footer ────────────────────────────────── */}
          <section className="rounded-xl border bg-muted/30 p-6 space-y-4">
            <p className="font-semibold text-foreground text-base">Related Tools</p>
            <div className="flex flex-wrap gap-3">
              {[
                { href: "/tools/pdf-merger",          label: "PDF Merger" },
                { href: "/tools/pdf-to-image",        label: "PDF to Image" },
                { href: "/tools/image-to-pdf",        label: "Image to PDF" },
                { href: "/tools/background-remover",  label: "Background Remover" },
                { href: "/tools/pdf-compressor",      label: "PDF Compressor" },
                { href: "/tools/pdf-watermark-adder", label: "PDF Watermark" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-background text-sm font-medium hover-elevate transition-all text-foreground">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground pt-2 border-t">
              Last Updated: March 2026 &nbsp;·&nbsp; Made in India &nbsp;·&nbsp; By the Pixocraft Team
            </p>
          </section>

        </div>
    </ToolLayout>

    {/* ── GMAIL GUIDE DIALOG ──────────────────────────────────────────────── */}
    <Dialog open={showGmailGuide} onOpenChange={(o) => { setShowGmailGuide(o); if (!o) { setFallbackHtml(null); setGmailCopied(false); } }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            {gmailCopied ? "Signature copied for Gmail!" : "Copy signature for Gmail"}
          </DialogTitle>
          <DialogDescription>
            {gmailCopied
              ? "Your signature is ready. Follow the steps below to add it to Gmail."
              : "Your browser requires a manual copy step. Copy the HTML below, then follow the guide."}
          </DialogDescription>
        </DialogHeader>

        {!gmailCopied && fallbackHtml && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Copy this HTML and paste it into Gmail's Signature editor (switch editor to HTML mode):</p>
            <div className="relative">
              <textarea
                readOnly
                value={fallbackHtml}
                className="w-full h-20 text-xs font-mono rounded-lg border bg-muted p-2 resize-none"
                onFocus={(e) => e.target.select()}
                data-testid="textarea-gmail-fallback"
              />
              <Button size="sm" variant="outline" className="absolute top-1.5 right-1.5 gap-1.5 h-7 text-xs" onClick={copyFallbackHtml} data-testid="button-copy-fallback-html">
                {gmailCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {gmailCopied ? "Copied" : "Copy HTML"}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2 pt-1">
          <p className="text-sm font-semibold">How to add to Gmail:</p>
          {[
            "Open Gmail in your browser",
            "Click the gear icon → See all settings",
            "Go to the General tab → scroll to Signature",
            "Click in the signature editor and paste (Ctrl+V / Cmd+V)",
            "Click Save Changes at the bottom",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <p className="text-sm text-muted-foreground leading-snug">{step}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <Button asChild className="flex-1 gap-2" data-testid="button-open-gmail">
            <a href="https://mail.google.com/mail/u/0/#settings/general" target="_blank" rel="noopener noreferrer">
              <ArrowRight className="h-4 w-4" /> Open Gmail Settings
            </a>
          </Button>
          <Button variant="outline" onClick={() => setShowGmailGuide(false)} data-testid="button-close-gmail-guide">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    {/* ── HISTORY ITEM DETAIL POPUP ───────────────────────────────────────── */}
    <Dialog open={!!selectedHistoryItem} onOpenChange={(o) => { if (!o) setSelectedHistoryItem(null); }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {selectedHistoryItem && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                Saved Signature
              </DialogTitle>
              <DialogDescription>
                {selectedHistoryItem.label}
              </DialogDescription>
            </DialogHeader>

            {/* Large signature preview */}
            <div className="rounded-xl border bg-white p-6 flex items-center justify-center min-h-[140px]">
              <img
                src={selectedHistoryItem.pngDataUrl}
                alt="Saved signature"
                className="max-h-32 max-w-full object-contain bg-white"
                data-testid="history-detail-img"
              />
            </div>

            {/* Signature on document preview */}
            <div className="rounded-xl border bg-white p-5 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">Preview on document</p>
              <div className="space-y-2">
                {[3, 4, 2.5].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-zinc-200" style={{ width: `${w / 4 * 100}%` }} />
                ))}
              </div>
              <div className="border-t border-zinc-100 pt-3">
                <p className="text-[9px] text-zinc-400 mb-1.5 uppercase tracking-wider">Authorized Signature</p>
                <img src={selectedHistoryItem.pngDataUrl} alt="doc preview" className="h-12 object-contain bg-white" />
                <div className="mt-1.5 h-px w-36 bg-zinc-200" />
              </div>
            </div>

            {/* Save info */}
            <div className="rounded-lg bg-muted/50 border px-4 py-3 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground">Saved on</p>
                <p className="font-medium text-foreground mt-0.5">
                  {new Date(selectedHistoryItem.savedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Time</p>
                <p className="font-medium text-foreground mt-0.5">
                  {new Date(selectedHistoryItem.savedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Storage</p>
                <p className="font-medium text-foreground mt-0.5">Local browser only</p>
              </div>
              <div>
                <p className="text-muted-foreground">Formats available</p>
                <p className="font-medium text-foreground mt-0.5">PNG + JPG</p>
              </div>
            </div>

            {/* Download buttons */}
            <div className="flex gap-2">
              <Button
                className="flex-1 gap-2"
                onClick={() => reDownload(selectedHistoryItem, "png")}
                data-testid="history-detail-download-png"
              >
                <Download className="h-4 w-4" />
                Download PNG
                <span className="text-xs opacity-70 ml-1">(Transparent)</span>
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => reDownload(selectedHistoryItem, "jpg")}
                data-testid="history-detail-download-jpg"
              >
                <Download className="h-4 w-4" />
                Download JPG
                <span className="text-xs opacity-70 ml-1">(White BG)</span>
              </Button>
            </div>

            {/* Add to document */}
            <Button
              variant="outline"
              className="w-full gap-2"
              data-testid="history-detail-add-to-doc"
              onClick={() => {
                try {
                  sessionStorage.setItem("pixocraft_preload_sig_png", selectedHistoryItem.pngDataUrl);
                } catch (_) {}
                setSelectedHistoryItem(null);
                setLocation("/tools/add-signature-to-pdf");
              }}
            >
              <FilePlus2 className="h-4 w-4" />
              Add to Document
            </Button>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="flex-1 text-destructive/80 hover:text-destructive gap-2 text-sm"
                onClick={() => { deleteFromHistory(selectedHistoryItem.id); setSelectedHistoryItem(null); }}
                data-testid="history-detail-delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete from history
              </Button>
              <Button variant="ghost" className="flex-1" onClick={() => setSelectedHistoryItem(null)}>
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>

    {/* ── SAVE LOCALLY PROMPT (shown after download) ──────────────────────── */}
    <Dialog open={showSavePrompt} onOpenChange={(o) => { setShowSavePrompt(o); if (!o) pendingFormatsRef.current = null; }}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Save locally for later?
          </DialogTitle>
          <DialogDescription>
            We'll keep a copy of your signature (PNG + JPG) right here in this tool so you can re-download anytime without recreating it.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-muted/50 border px-4 py-3 text-xs text-muted-foreground space-y-0.5">
          <p>Stored in your browser — never uploaded to any server.</p>
          <p>Appears in the <strong>Saved Signatures</strong> row below the tool.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={confirmSaveFromPrompt} className="flex-1 gap-2" data-testid="button-confirm-save">
            <ClipboardCheck className="h-4 w-4" />
            Yes, Save It
          </Button>
          <Button variant="outline" onClick={() => { setShowSavePrompt(false); pendingFormatsRef.current = null; }} data-testid="button-skip-save">
            Skip
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    {/* ── DOWNLOAD DIALOG ──────────────────────────────────────────────────── */}
    <Dialog open={showDownloadDialog} onOpenChange={(o) => { setShowDownloadDialog(o); if (!o) setDlPage("options"); }}>
      <DialogContent className={dlPage === "sign-doc" ? "max-w-4xl max-h-[90vh] overflow-y-auto" : "max-w-md"}>
        {dlPage === "options" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Download Your Signature
              </DialogTitle>
              <DialogDescription>
                Choose how you want to save or use your signature.
              </DialogDescription>
            </DialogHeader>

            {dlSignaturePng && (
              <div className="rounded-lg border bg-muted/30 p-3 flex items-center justify-center">
                <img src={dlSignaturePng} alt="Signature preview" className="max-h-16 object-contain bg-white dark:bg-zinc-900 rounded" />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3"
                onClick={() => { downloadPNG(); setShowDownloadDialog(false); }}
                data-testid="dl-dialog-png"
              >
                <Download className="h-4 w-4 shrink-0 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-sm">Download PNG</p>
                  <p className="text-xs text-muted-foreground">Transparent background — best for documents &amp; emails</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3"
                onClick={() => { downloadJPG(); setShowDownloadDialog(false); }}
                data-testid="dl-dialog-jpg"
              >
                <Download className="h-4 w-4 shrink-0 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-sm">Download JPG</p>
                  <p className="text-xs text-muted-foreground">White background — smaller file size</p>
                </div>
              </Button>

              <Button
                className="w-full justify-start gap-3 h-auto py-3"
                onClick={() => setDlPage("sign-doc")}
                data-testid="dl-dialog-add-to-doc"
              >
                <FileText className="h-4 w-4 shrink-0" />
                <div className="text-left">
                  <p className="font-medium text-sm">Add to PDF or Document</p>
                  <p className="text-xs text-primary-foreground/80">Upload a file and place your signature on it</p>
                </div>
              </Button>
            </div>
          </>
        )}

        {dlPage === "need-sig" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                No Signature Yet
              </DialogTitle>
              <DialogDescription>
                Please draw or type your signature first, then add it to your document.
              </DialogDescription>
            </DialogHeader>
            <div className="rounded-lg border bg-muted/30 p-5 flex flex-col items-center gap-3 text-center">
              <PenTool className="h-10 w-10 text-primary/40" />
              <div>
                <p className="font-medium text-sm">Create your signature first</p>
                <p className="text-xs text-muted-foreground mt-1">Use the <strong>Draw</strong> tab to sign with your mouse/finger, or the <strong>Type</strong> tab to generate one from your name.</p>
              </div>
              <Button onClick={() => setShowDownloadDialog(false)} className="gap-2" data-testid="dl-need-sig-go-back">
                <ArrowRight className="h-4 w-4 rotate-180" />
                Go Back &amp; Create Signature
              </Button>
            </div>
          </>
        )}

        {dlPage === "sign-doc" && dlSignaturePng && (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>Add Signature to Document</DialogTitle>
              <DialogDescription>Upload a document and place your signature on it.</DialogDescription>
            </DialogHeader>
            <SignDocumentPanel
              signaturePng={dlSignaturePng}
              sigAspect={dlSigAspect}
              onClose={() => setDlPage("options")}
              hideClose
            />
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}
