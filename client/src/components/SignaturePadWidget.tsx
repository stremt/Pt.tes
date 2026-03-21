import { useRef, useState, useEffect, useCallback } from "react";
import {
  PenTool, Download, Eraser, Type, Upload, Undo2, Redo2,
  Trash2, ImageIcon, FileImage, Shield, Check, Eye, Zap, Smartphone, Star,
  Mail, Copy, X, ClipboardCheck, ArrowRight, Maximize2, RotateCcw, FileText,
  SlidersHorizontal, Search, Clock, FilePlus2,
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

// ─── Font categories ─────────────────────────────────────────────────────────
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

// ─── 70+ fonts ───────────────────────────────────────────────────────────────
const HANDWRITTEN_FONTS: Array<{ label: string; value: string; size: string; category: FontCategory }> = [
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
  { label: "Playball",             value: "Playball",             size: "md", category: "elegant" },
  { label: "Rochester",            value: "Rochester",            size: "md", category: "elegant" },
  { label: "Grand Hotel",          value: "Grand Hotel",          size: "md", category: "elegant" },
  { label: "Monsieur La Doulaise", value: "Monsieur La Doulaise", size: "xl", category: "elegant" },
  { label: "Lavishly Yours",       value: "Lavishly Yours",       size: "xl", category: "elegant" },
  { label: "Lovers Quarrel",       value: "Lovers Quarrel",       size: "xl", category: "elegant" },
  { label: "Quintessential",       value: "Quintessential",       size: "md", category: "elegant" },
  { label: "Satisfy",              value: "Satisfy",              size: "md", category: "professional" },
  { label: "Marck Script",         value: "Marck Script",         size: "md", category: "professional" },
  { label: "Courgette",            value: "Courgette",            size: "md", category: "professional" },
  { label: "Merienda",             value: "Merienda",             size: "md", category: "professional" },
  { label: "Kaushan Script",       value: "Kaushan Script",       size: "md", category: "professional" },
  { label: "Niconne",              value: "Niconne",              size: "md", category: "professional" },
  { label: "Pacifico",             value: "Pacifico",             size: "sm", category: "creative" },
  { label: "Lobster",              value: "Lobster",              size: "sm", category: "creative" },
  { label: "Lobster Two",          value: "Lobster Two",          size: "sm", category: "creative" },
  { label: "Berkshire Swash",      value: "Berkshire Swash",      size: "sm", category: "creative" },
  { label: "Righteous",            value: "Righteous",            size: "sm", category: "creative" },
  { label: "Boogaloo",             value: "Boogaloo",             size: "sm", category: "creative" },
  { label: "Ruge Boogie",          value: "Ruge Boogie",          size: "sm", category: "creative" },
  { label: "Caveat",               value: "Caveat",               size: "md", category: "handwritten" },
  { label: "Patrick Hand",         value: "Patrick Hand",         size: "md", category: "handwritten" },
  { label: "Indie Flower",         value: "Indie Flower",         size: "md", category: "handwritten" },
  { label: "Shadows Into Light",   value: "Shadows Into Light",   size: "md", category: "handwritten" },
  { label: "Gloria Hallelujah",    value: "Gloria Hallelujah",    size: "sm", category: "handwritten" },
  { label: "Just Another Hand",    value: "Just Another Hand",    size: "md", category: "handwritten" },
  { label: "Gochi Hand",           value: "Gochi Hand",           size: "md", category: "handwritten" },
  { label: "Amatic SC",            value: "Amatic SC",            size: "sm", category: "casual" },
  { label: "Rock Salt",            value: "Rock Salt",            size: "sm", category: "casual" },
  { label: "Permanent Marker",     value: "Permanent Marker",     size: "sm", category: "casual" },
  { label: "Cabin Sketch",         value: "Cabin Sketch",         size: "sm", category: "casual" },
  { label: "Dekko",                value: "Dekko",                size: "md", category: "casual" },
  { label: "Itim",                 value: "Itim",                 size: "md", category: "casual" },
  { label: "Euphoria Script",      value: "Euphoria Script",      size: "lg", category: "rare" },
  { label: "Meie Script",          value: "Meie Script",          size: "lg", category: "rare" },
  { label: "Bilbo",                value: "Bilbo",                size: "lg", category: "rare" },
  { label: "Fondamento",           value: "Fondamento",           size: "md", category: "rare" },
  { label: "Rancho",               value: "Rancho",               size: "sm", category: "rare" },
  { label: "Over the Rainbow",     value: "Over the Rainbow",     size: "md", category: "rare" },
  { label: "Give You Glory",       value: "Give You Glory",       size: "md", category: "rare" },
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

const FONT_MAP = new Map(HANDWRITTEN_FONTS.map((f) => [f.value, f]));
const ALL_FONTS = Array.from(FONT_MAP.values());

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
  try { localStorage.setItem(SIG_HISTORY_KEY, JSON.stringify(items)); } catch {}
}

const CW = 800;
const CH = 260;
const EXPORT_SCALE = 4;

function buildAdjustedCanvas(src: HTMLCanvasElement, scalePct: number, marginPx: number): HTMLCanvasElement {
  const scale = scalePct / 100;
  const margin = Math.round(marginPx * EXPORT_SCALE);
  const drawW = Math.round(src.width * scale);
  const drawH = Math.round(src.height * scale);
  const totalW = Math.max(1, drawW + margin * 2);
  const totalH = Math.max(1, drawH + margin * 2);
  const oc = document.createElement("canvas");
  oc.width = totalW; oc.height = totalH;
  const ctx = oc.getContext("2d")!;
  ctx.clearRect(0, 0, totalW, totalH);
  ctx.drawImage(src, margin, margin, drawW, drawH);
  return oc;
}

function FontCard({
  font, isSelected, typedName, typeColor, onClick, badge, badgeCls,
}: {
  font: { label: string; value: string; size: string; category: FontCategory };
  isSelected: boolean; typedName: string; typeColor: string;
  onClick: (v: string) => void; badge?: string; badgeCls?: string;
}) {
  return (
    <button
      onClick={() => onClick(font.value)}
      data-testid={`font-card-${font.value.replace(/ /g, "-")}`}
      className={[
        "relative flex flex-col items-start justify-between w-full px-4 py-3 rounded-xl border transition-all cursor-pointer text-left bg-white dark:bg-zinc-900/60",
        isSelected ? "border-primary shadow-sm ring-2 ring-primary/30" : "border-border hover-elevate dark:border-zinc-700",
      ].join(" ")}
    >
      {isSelected && (
        <span className="absolute top-2 right-2 bg-primary rounded-full p-0.5 z-10">
          <Check className="h-3 w-3 text-primary-foreground" />
        </span>
      )}
      <span style={{ fontFamily: `'${font.value}', cursive`, fontSize: FONT_SIZE[font.size].card, color: typeColor, lineHeight: 1.3, display: "block", minHeight: "44px", width: "100%", backgroundColor: "#ffffff", borderRadius: "6px", padding: "4px 6px" }}>
        {typedName || "Your Name"}
      </span>
      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        <span className="text-[10px] text-muted-foreground font-medium">{font.label}</span>
        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${CATEGORY_COLORS[font.category]}`}>
          {CATEGORY_LABELS[font.category]}
        </span>
        {badge && <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${badgeCls}`}>{badge}</span>}
      </div>
    </button>
  );
}

export default function SignaturePadWidget() {
  const [activeTab, setActiveTab] = useState<Tab>("draw");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);
  const [strokeColor, setStrokeColor] = useState("#111111");
  const [strokeWidth, setStrokeWidth] = useState(2.5);
  const strokeColorRef = useRef(strokeColor);
  const strokeWidthRef = useRef(strokeWidth);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

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

  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [typeColor, setTypeColor] = useState("#111111");
  const [fontCategory, setFontCategory] = useState<"all" | FontCategory>("all");
  const [fontSearch, setFontSearch] = useState("");
  const [fontSort, setFontSort] = useState<"popular" | "az">("popular");
  const [recentFont, setRecentFont] = useState<string | null>(loadRecentFont);

  const uploadCanvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [bgRemoved, setBgRemoved] = useState(false);
  const [uploadProcessing, setUploadProcessing] = useState(false);
  const [uploadEstimate, setUploadEstimate] = useState<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [sigScale, setSigScale] = useState(100);
  const [sigMargin, setSigMargin] = useState(0);
  const sigScaleRef = useRef(100);
  const sigMarginRef = useRef(0);

  const [showGmailGuide, setShowGmailGuide] = useState(false);
  const [fallbackHtml, setFallbackHtml] = useState<string | null>(null);
  const [gmailCopied, setGmailCopied] = useState(false);

  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [dlPage, setDlPage] = useState<"options" | "sign-doc" | "need-sig">("options");
  const [dlSignaturePng, setDlSignaturePng] = useState<string | null>(null);
  const [dlSigAspect, setDlSigAspect] = useState(4);
  const [history, setHistory] = useState<SigHistoryItem[]>(loadHistory);
  const pendingFormatsRef = useRef<{ png: string; jpg: string; thumb: string } | null>(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<SigHistoryItem | null>(null);

  const { toast } = useToast();

  // ── Load Google Fonts ──────────────────────────────────────────────────────
  useEffect(() => {
    const existing = document.getElementById("sig-gfonts");
    if (existing) existing.remove();
    const params = ALL_FONTS.map((f) => `family=${encodeURIComponent(f.value)}`).join("&");
    const link = document.createElement("link");
    link.id = "sig-gfonts";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${params}&display=swap`;
    document.head.appendChild(link);
  }, []);

  // ── Init draw canvas ───────────────────────────────────────────────────────
  const initDrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const physW = CW * dpr;
    const physH = CH * dpr;
    if (canvas.width !== physW || canvas.height !== physH) {
      canvas.width = physW; canvas.height = physH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  useEffect(() => { initDrawCanvas(); }, [initDrawCanvas]);
  useEffect(() => { if (activeTab === "draw") initDrawCanvas(); }, [activeTab, initDrawCanvas]);

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

  // ── Native pointer drawing ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPt = (e: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (CW / rect.width),
        y: (e.clientY - rect.top) * (CH / rect.height),
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
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const ctx = canvas.getContext("2d")!;
      const rawPos = getPt(e);
      const sl = drawStreamlineRef.current;
      const filteredPos: Point = {
        x: streamlinedPosRef.current.x * sl + rawPos.x * (1 - sl),
        y: streamlinedPosRef.current.y * sl + rawPos.y * (1 - sl),
      };
      streamlinedPosRef.current = filteredPos;
      const pos = filteredPos;
      pointsRef.current.push(pos);
      const pts = pointsRef.current;
      const dt = Math.max(1, e.timeStamp - lastTimestampRef.current);
      lastTimestampRef.current = e.timeStamp;
      if (pts.length >= 2) {
        const prev = pts[pts.length - 2];
        const dist = Math.hypot(pos.x - prev.x, pos.y - prev.y);
        const velocity = dist / dt;
        const base = strokeWidthRef.current;
        const thinning = drawThinningRef.current;
        const thick = base * (1 + thinning * 1.2);
        const thin = Math.max(base * (1 - thinning * 0.95), 0.3);
        const velFactor = Math.min(velocity / 3, 1);
        let target = thick * (1 - velFactor) + thin * velFactor;
        if (drawAngleRef.current !== 0) {
          const dx = pos.x - prev.x; const dy = pos.y - prev.y;
          const strokeAngle = Math.atan2(dy, dx) * (180 / Math.PI);
          const diff = Math.abs(((strokeAngle - drawAngleRef.current + 360) % 360) - 180);
          target *= (0.1 + 0.9 * (diff / 180));
        }
        const smoothing = drawSmoothingRef.current;
        const lerpFactor = 0.02 + (1 - smoothing) * 0.88;
        currentWidthRef.current = currentWidthRef.current * (1 - lerpFactor) + target * lerpFactor;
        currentWidthRef.current = Math.max(0.3, currentWidthRef.current);
      }
      if (pts.length >= 3) {
        const p1 = pts[pts.length - 2]; const p2 = pts[pts.length - 1];
        const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        ctx.lineWidth = currentWidthRef.current;
        ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
        ctx.stroke(); ctx.beginPath(); ctx.moveTo(mid.x, mid.y);
      } else {
        ctx.lineWidth = currentWidthRef.current;
        ctx.lineTo(pos.x, pos.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
      }
    };

    const onUp = (e: PointerEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const ctx = canvas.getContext("2d")!;
      const pts = pointsRef.current;
      if (pts.length) { ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y); ctx.stroke(); }
      setPreviewUrl(buildAdjustedCanvas(canvas, sigScaleRef.current, sigMarginRef.current).toDataURL("image/png"));
      isDrawingRef.current = false; pointsRef.current = [];
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    setRedoStack((p) => [...p, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(undoStack[undoStack.length - 1], 0, 0);
    setUndoStack((s) => s.slice(0, -1));
    if (undoStack.length === 1) setHasDrawn(false);
  }, [undoStack]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;
    const ctx = canvas.getContext("2d")!;
    setUndoStack((p) => [...p, ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    ctx.putImageData(redoStack[redoStack.length - 1], 0, 0);
    setRedoStack((s) => s.slice(0, -1));
    setHasDrawn(true);
  }, [redoStack]);

  const clearDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveState();
    canvas.getContext("2d")!.clearRect(0, 0, CW, CH);
    setHasDrawn(false); setUndoStack([]); setRedoStack([]);
  }, [saveState]);

  const renderTypeCanvas = useCallback((font: string, color: string): HTMLCanvasElement => {
    const BW = CW * EXPORT_SCALE; const BH = CH * EXPORT_SCALE;
    const oc = document.createElement("canvas");
    oc.width = BW; oc.height = BH;
    const ctx = oc.getContext("2d")!;
    ctx.clearRect(0, 0, BW, BH);
    const fontMeta = FONT_MAP.get(font);
    const sizePx = FONT_SIZE[fontMeta?.size ?? "md"].canvas * EXPORT_SCALE;
    ctx.font = `${sizePx}px '${font}', cursive`;
    ctx.fillStyle = color;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(typedName || "Your Name", BW / 2, BH / 2);
    return oc;
  }, [typedName]);

  useEffect(() => { sigScaleRef.current = sigScale; }, [sigScale]);
  useEffect(() => { sigMarginRef.current = sigMargin; }, [sigMargin]);

  useEffect(() => {
    if (activeTab !== "type") return;
    if (!typedName || !selectedFont) { setPreviewUrl(null); return; }
    const raw = renderTypeCanvas(selectedFont, typeColor);
    if (raw) setPreviewUrl(buildAdjustedCanvas(raw, sigScale, sigMargin).toDataURL("image/png"));
  }, [activeTab, typedName, selectedFont, typeColor, renderTypeCanvas, sigScale, sigMargin]);

  useEffect(() => {
    if (activeTab !== "upload") return;
    const canvas = uploadCanvasRef.current;
    if (canvas && uploadedImage) setPreviewUrl(buildAdjustedCanvas(canvas, sigScale, sigMargin).toDataURL("image/png"));
    else if (!uploadedImage) setPreviewUrl(null);
  }, [activeTab, uploadedImage, bgRemoved, sigScale, sigMargin]);

  useEffect(() => {
    if (activeTab !== "draw") return;
    const canvas = canvasRef.current;
    if (canvas && hasDrawn) setPreviewUrl(buildAdjustedCanvas(canvas, sigScale, sigMargin).toDataURL("image/png"));
    else if (!hasDrawn) setPreviewUrl(null);
  }, [activeTab, hasDrawn, sigScale, sigMargin]);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please upload an image file." });
      return;
    }
    const sizeMB = file.size / (1024 * 1024);
    let estimate: string | null = null;
    if (sizeMB > 50) estimate = "~10–30 seconds";
    else if (sizeMB > 20) estimate = "~5–10 seconds";
    else if (sizeMB > 10) estimate = "~2–5 seconds";
    else if (sizeMB > 5) estimate = "~1–2 seconds";
    setUploadEstimate(estimate);
    setUploadProcessing(true);
    const reader = new FileReader();
    reader.onload = (ev) => { setUploadedImage(ev.target?.result as string); setBgRemoved(false); setUploadProcessing(false); setUploadEstimate(null); };
    reader.onerror = () => { setUploadProcessing(false); setUploadEstimate(null); toast({ title: "Upload failed", description: "Could not read the file." }); };
    reader.readAsDataURL(file);
  }, [toast]);

  useEffect(() => {
    const canvas = uploadCanvasRef.current;
    if (!canvas || !uploadedImage) return;
    const BW = CW * EXPORT_SCALE; const BH = CH * EXPORT_SCALE;
    canvas.width = BW; canvas.height = BH;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, BW, BH);
      const ratio = Math.min((BW * 0.85) / img.width, (BH * 0.85) / img.height);
      ctx.drawImage(img, (BW - img.width * ratio) / 2, (BH - img.height * ratio) / 2, img.width * ratio, img.height * ratio);
      setPreviewUrl(buildAdjustedCanvas(canvas, sigScaleRef.current, sigMarginRef.current).toDataURL("image/png"));
    };
    img.src = uploadedImage;
  }, [uploadedImage]);

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

  const getExportCanvas = useCallback((): HTMLCanvasElement | null => {
    if (activeTab === "draw") {
      const display = canvasRef.current;
      if (!display || !hasDrawn) return null;
      const exp = document.createElement("canvas");
      exp.width = CW * EXPORT_SCALE; exp.height = CH * EXPORT_SCALE;
      const ctx = exp.getContext("2d")!;
      ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
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

  const buildFormats = useCallback((src: HTMLCanvasElement) => {
    const pngC = document.createElement("canvas");
    pngC.width = src.width; pngC.height = src.height;
    const pngCtx = pngC.getContext("2d")!;
    pngCtx.drawImage(src, 0, 0);
    const id = pngCtx.getImageData(0, 0, pngC.width, pngC.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) d[i + 3] = 0;
    }
    pngCtx.clearRect(0, 0, pngC.width, pngC.height); pngCtx.putImageData(id, 0, 0);
    const png = pngC.toDataURL("image/png");
    const jpgC = document.createElement("canvas");
    jpgC.width = src.width; jpgC.height = src.height;
    const jpgCtx = jpgC.getContext("2d")!;
    jpgCtx.fillStyle = "white"; jpgCtx.fillRect(0, 0, jpgC.width, jpgC.height);
    jpgCtx.drawImage(src, 0, 0);
    const jpg = jpgC.toDataURL("image/jpeg", 0.92);
    const tC = document.createElement("canvas");
    tC.width = 400; tC.height = 130;
    const tCtx = tC.getContext("2d")!;
    tCtx.fillStyle = "white"; tCtx.fillRect(0, 0, 400, 130);
    tCtx.drawImage(src, 0, 0, 400, 130);
    const thumb = tC.toDataURL("image/jpeg", 0.7);
    return { png, jpg, thumb };
  }, []);

  const downloadPNG = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) { toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." }); return; }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    const formats = buildFormats(src);
    pendingFormatsRef.current = formats;
    const a = document.createElement("a");
    a.href = formats.png; a.download = `signature-${Date.now()}.png`; a.click();
    toast({ title: "Downloaded!", description: "Saved as transparent PNG." });
    setShowSavePrompt(true);
  }, [getExportCanvas, toast, buildFormats, sigScale, sigMargin]);

  const downloadJPG = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) { toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." }); return; }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    const formats = buildFormats(src);
    pendingFormatsRef.current = formats;
    const a = document.createElement("a");
    a.href = formats.jpg; a.download = `signature-${Date.now()}.jpg`; a.click();
    toast({ title: "Downloaded!", description: "Saved as JPG." });
    setShowSavePrompt(true);
  }, [getExportCanvas, toast, buildFormats, sigScale, sigMargin]);

  const openDownloadDialog = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) { setDlPage("need-sig"); setShowDownloadDialog(true); return; }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    setDlSigAspect(src.width / src.height || 4);
    setDlSignaturePng(src.toDataURL("image/png"));
    setDlPage("options"); setShowDownloadDialog(true);
  }, [getExportCanvas, sigScale, sigMargin]);

  const generatePreview = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) { toast({ title: "Nothing to preview", description: "Draw, type, or upload a signature first." }); return; }
    setPreviewUrl(buildAdjustedCanvas(raw, sigScale, sigMargin).toDataURL("image/png"));
  }, [getExportCanvas, toast, sigScale, sigMargin]);

  const copyForGmail = useCallback(async () => {
    const src = getExportCanvas();
    if (!src) { toast({ title: "Nothing to copy", description: "Draw, type, or upload a signature first." }); return; }
    const oc = document.createElement("canvas");
    oc.width = src.width; oc.height = src.height;
    const ctx = oc.getContext("2d")!;
    ctx.drawImage(src, 0, 0);
    const id = ctx.getImageData(0, 0, oc.width, oc.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) d[i + 3] = 0;
    }
    ctx.clearRect(0, 0, oc.width, oc.height); ctx.putImageData(id, 0, 0);
    const displayW = 200;
    const displayH = Math.round(oc.height * (displayW / oc.width));
    const dataUrl = oc.toDataURL("image/png");
    const html = `<img src="${dataUrl}" width="${displayW}" height="${displayH}" alt="Signature" style="display:block;max-width:${displayW}px;height:auto;" />`;
    try {
      if (navigator.clipboard && typeof ClipboardItem !== "undefined") {
        const htmlBlob = new Blob([html], { type: "text/html" });
        const textBlob = new Blob(["[Signature image — paste into Gmail Signature editor]"], { type: "text/plain" });
        await navigator.clipboard.write([new ClipboardItem({ "text/html": htmlBlob, "text/plain": textBlob })]);
        setFallbackHtml(null); setGmailCopied(true); setShowGmailGuide(true);
        toast({ title: "Signature copied!", description: "Paste it in Gmail Settings → Signature." });
      } else { throw new Error("ClipboardItem not supported"); }
    } catch { setFallbackHtml(html); setGmailCopied(false); setShowGmailGuide(true); }
  }, [getExportCanvas, toast]);

  const copyFallbackHtml = useCallback(async () => {
    if (!fallbackHtml) return;
    try { await navigator.clipboard.writeText(fallbackHtml); setGmailCopied(true); toast({ title: "HTML copied!" }); }
    catch { toast({ title: "Copy failed", description: "Select all text and copy manually." }); }
  }, [fallbackHtml, toast]);

  const saveToHistory = useCallback((formats: { png: string; jpg: string; thumb: string }) => {
    const now = new Date();
    const label = `Signature · ${now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`;
    const item: SigHistoryItem = {
      id: Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4),
      pngDataUrl: formats.png, jpgDataUrl: formats.jpg, thumbUrl: formats.thumb,
      label, savedAt: Date.now(),
    };
    setHistory((prev) => { const next = [item, ...prev].slice(0, 12); persistHistory(next); return next; });
    toast({ title: "Saved!", description: "Signature added to your local history." });
  }, [toast]);

  const confirmSaveFromPrompt = useCallback(() => {
    if (pendingFormatsRef.current) { saveToHistory(pendingFormatsRef.current); pendingFormatsRef.current = null; }
    setShowSavePrompt(false);
  }, [saveToHistory]);

  const saveCurrentToHistory = useCallback(() => {
    const src = getExportCanvas();
    if (!src) { toast({ title: "Nothing to save", description: "Draw, type, or upload a signature first." }); return; }
    saveToHistory(buildFormats(src));
  }, [getExportCanvas, buildFormats, saveToHistory, toast]);

  const deleteFromHistory = useCallback((id: string) => {
    setHistory((prev) => { const next = prev.filter((h) => h.id !== id); persistHistory(next); return next; });
  }, []);

  const reDownload = useCallback((item: SigHistoryItem, format: "png" | "jpg") => {
    const a = document.createElement("a");
    a.href = format === "png" ? item.pngDataUrl : item.jpgDataUrl;
    a.download = `signature-${format === "png" ? "transparent" : "white"}-${item.id}.${format}`;
    a.click();
  }, []);

  const SIGNATURE_STYLES = [
    { label: "Stylish",      font: "Great Vibes",    sampleName: "Alex Johnson" },
    { label: "Minimal",      font: "Caveat",         sampleName: "Alex Johnson" },
    { label: "Bold",         font: "Pacifico",       sampleName: "Alex Johnson" },
    { label: "Professional", font: "Dancing Script", sampleName: "Alex Johnson" },
  ];

  const trySignatureStyle = useCallback((font: string, sampleName: string) => {
    setActiveTab("type");
    if (!typedName) setTypedName(sampleName);
    setSelectedFont(font); setRecentFont(font); saveRecentFont(font);
  }, [typedName]);

  const handleFontSelect = useCallback((fontValue: string) => {
    setSelectedFont(fontValue); setRecentFont(fontValue); saveRecentFont(fontValue);
  }, []);

  const canvasStyle: React.CSSProperties = { width: "100%", height: CH, display: "block" };

  return (
    <>
      {/* ── TOOL CARD ──────────────────────────────────────────────────────── */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">

        {/* Trust header */}
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

          {/* ── TAB SELECTOR ─────────────────────────────────────────────── */}
          <div className="flex gap-1.5 p-1.5 rounded-xl bg-muted/60 border" data-testid="tabs-method">
            {([
              { id: "draw",   icon: PenTool, title: "Draw",   desc: "Freehand" },
              { id: "type",   icon: Type,    title: "Type",   desc: "50+ Fonts" },
              { id: "upload", icon: Upload,   title: "Upload", desc: "From photo" },
            ] as const).map(({ id, icon: Icon, title, desc }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                data-testid={`tab-${id}`}
                className={[
                  "flex-1 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-lg text-base font-semibold transition-all cursor-pointer select-none",
                  activeTab === id ? "bg-background text-foreground shadow-sm border" : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{title}</span>
                <span className={`hidden sm:inline text-sm font-normal ${activeTab === id ? "text-muted-foreground" : "text-muted-foreground/60"}`}>· {desc}</span>
              </button>
            ))}
          </div>

          {/* ── DRAW TAB ─────────────────────────────────────────────────── */}
          {activeTab === "draw" && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/40 border">
                <div className="flex items-center gap-2">
                  <Label htmlFor="ink-color" className="text-xs whitespace-nowrap">Ink</Label>
                  <input id="ink-color" type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)}
                    className="h-8 w-10 rounded-md border border-border cursor-pointer bg-transparent p-0.5" data-testid="input-stroke-color" />
                  <span className="text-xs text-muted-foreground font-mono hidden sm:inline">{strokeColor}</span>
                </div>
                <div className="w-px h-5 bg-border hidden sm:block" />
                <div className="flex items-center gap-2 flex-1 min-w-32">
                  <Label className="text-xs whitespace-nowrap">Width: <span className="font-mono">{strokeWidth.toFixed(1)}</span></Label>
                  <Slider min={1} max={8} step={0.5} value={[strokeWidth]} onValueChange={([v]) => setStrokeWidth(v)} data-testid="slider-stroke-width" className="flex-1" />
                </div>
                <div className="w-px h-5 bg-border hidden sm:block" />
                <div className="flex items-center gap-1 ml-auto">
                  <Button size="icon" variant="ghost" onClick={undo} disabled={undoStack.length === 0} title="Undo" data-testid="button-undo"><Undo2 className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={redo} disabled={redoStack.length === 0} title="Redo" data-testid="button-redo"><Redo2 className="h-4 w-4" /></Button>
                  <div className="w-px h-5 bg-border mx-1" />
                  <Button size="icon" variant="ghost" onClick={() => setShowAdvanced((v) => !v)} title="Advanced draw settings" data-testid="button-advanced"
                    className={showAdvanced ? "text-primary bg-primary/10" : ""}>
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                  <div className="w-px h-5 bg-border mx-1" />
                  <Button size="icon" variant="ghost" onClick={clearDraw} disabled={!hasDrawn && undoStack.length === 0}
                    title="Clear canvas" data-testid="button-clear" className="text-destructive/70 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {showAdvanced && (
                <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-4" data-testid="advanced-draw-panel">
                  <div>
                    <p className="text-xs font-semibold mb-2">Quick Presets</p>
                    <div className="flex flex-wrap gap-2">
                      {([
                        { id: "default" as DrawPreset, label: "Default", desc: "Balanced" },
                        { id: "elegant" as DrawPreset, label: "Elegant", desc: "Wide & smooth" },
                        { id: "bold"    as DrawPreset, label: "Bold",    desc: "Thick brush" },
                        { id: "quick"   as DrawPreset, label: "Quick",   desc: "Thin & fast" },
                      ]).map(({ id, label, desc }) => (
                        <button key={id} onClick={() => applyPreset(id)} data-testid={`preset-${id}`}
                          className={["flex flex-col items-start px-3 py-2 rounded-lg text-xs font-semibold border transition-all",
                            activePreset === id ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover-elevate",
                          ].join(" ")}>
                          <span>{label}</span>
                          <span className={`text-[10px] font-normal mt-0.5 ${activePreset === id ? "opacity-70" : "text-muted-foreground"}`}>{desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  {[
                    { label: "Stroke Width", val: strokeWidth, min: 0.5, max: 30, step: 0.5, fmt: (v: number) => `${v.toFixed(1)}px`, desc: "Base thickness of every stroke",
                      onChange: ([v]: number[]) => { setStrokeWidth(v); strokeWidthRef.current = v; setActivePreset("default"); }, testid: "slider-stroke-width-adv" },
                    { label: "Thinning", val: drawThinning, min: 0, max: 1, step: 0.05, fmt: (v: number) => v.toFixed(2), desc: "Fast strokes get thin, slow get thick",
                      onChange: ([v]: number[]) => { setDrawThinning(v); drawThinningRef.current = v; setActivePreset("default"); }, testid: "slider-thinning" },
                    { label: "Smoothing", val: drawSmoothing, min: 0, max: 1, step: 0.05, fmt: (v: number) => v.toFixed(2), desc: "Width transition — high = silky, low = instant",
                      onChange: ([v]: number[]) => { setDrawSmoothing(v); drawSmoothingRef.current = v; setActivePreset("default"); }, testid: "slider-smoothing" },
                    { label: "Streamline", val: drawStreamline, min: 0, max: 0.9, step: 0.05, fmt: (v: number) => v.toFixed(2), desc: "Smooths shaky paths",
                      onChange: ([v]: number[]) => { setDrawStreamline(v); drawStreamlineRef.current = v; setActivePreset("default"); }, testid: "slider-streamline" },
                    { label: "Pen Angle", val: drawAngle, min: -90, max: 90, step: 5, fmt: (v: number) => `${v}°`, desc: "Calligraphic tilt",
                      onChange: ([v]: number[]) => { setDrawAngle(v); drawAngleRef.current = v; setActivePreset("default"); }, testid: "slider-angle" },
                  ].map(({ label, val, min, max, step, fmt, desc, onChange, testid }) => (
                    <div key={label} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{label}</span>
                        <span className="text-xs font-mono text-muted-foreground">{fmt(val)}</span>
                      </div>
                      <Slider min={min} max={max} step={step} value={[val]} onValueChange={onChange} data-testid={testid} />
                      <p className="text-[10px] text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                  <p className="text-[10px] text-primary/70 font-medium pt-1">Tip: Thinning works best with Stroke Width 4px or higher</p>
                </div>
              )}

              <div className="relative rounded-lg border border-border overflow-hidden bg-white" style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04)" }}>
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
                  style={{ backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)", opacity: 0.5 }} />
                <canvas ref={canvasRef} style={{ ...canvasStyle, background: "transparent" }} className="cursor-crosshair touch-none block relative z-10" data-testid="canvas-draw" />
                {!hasDrawn && (
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 select-none">
                    <PenTool className="h-6 w-6 text-muted-foreground/20" />
                    <span className="text-sm text-muted-foreground/35">Draw your signature here</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TYPE TAB ─────────────────────────────────────────────────── */}
          {activeTab === "type" && (() => {
            const q = fontSearch.toLowerCase().trim();
            let filtered = ALL_FONTS.filter((f) => {
              const matchCat = fontCategory === "all" || f.category === fontCategory;
              const matchQ = !q || f.label.toLowerCase().includes(q);
              return matchCat && matchQ;
            });
            if (fontSort === "az") filtered = [...filtered].sort((a, b) => a.label.localeCompare(b.label));
            const recentFontMeta = recentFont ? FONT_MAP.get(recentFont) : null;
            const topPickFonts = TOP_PICKS.map((v) => FONT_MAP.get(v)).filter(Boolean) as typeof ALL_FONTS;
            return (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3 items-end">
                  <div className="space-y-1.5 flex-1 min-w-52">
                    <Label htmlFor="typed-name" className="text-xs">Your Name</Label>
                    <Input id="typed-name" placeholder="e.g. Alex Johnson" value={typedName}
                      onChange={(e) => setTypedName(e.target.value)} className="text-base" data-testid="input-typed-name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="type-color" className="text-xs">Ink Color</Label>
                    <input id="type-color" type="color" value={typeColor} onChange={(e) => setTypeColor(e.target.value)}
                      className="h-9 w-14 rounded-md border border-border cursor-pointer bg-transparent p-0.5 block" data-testid="input-type-color" />
                  </div>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <div className="relative flex-1 min-w-40">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    <Input placeholder="Search fonts…" value={fontSearch} onChange={(e) => setFontSearch(e.target.value)} className="pl-8 h-9 text-sm" data-testid="input-font-search" />
                  </div>
                  <div className="flex rounded-lg border overflow-hidden shrink-0">
                    <button onClick={() => setFontSort("popular")} data-testid="sort-popular"
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${fontSort === "popular" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}>
                      Popular
                    </button>
                    <button onClick={() => setFontSort("az")} data-testid="sort-az"
                      className={`px-3 py-1.5 text-xs font-medium border-l transition-colors ${fontSort === "az" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:bg-muted"}`}>
                      A–Z
                    </button>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {FILTER_TABS.map((tab) => (
                    <button key={tab.id} onClick={() => setFontCategory(tab.id)} data-testid={`filter-tab-${tab.id}`}
                      className={["px-3 py-1 rounded-full text-xs font-medium transition-all",
                        fontCategory === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80",
                      ].join(" ")}>
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="max-h-[520px] overflow-y-auto space-y-4 pr-1 rounded-md">
                  {recentFontMeta && !fontSearch && fontCategory === "all" && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5 sticky top-0 bg-background py-1 z-10">
                        <span className="h-px flex-1 bg-border" />Recently Used<span className="h-px flex-1 bg-border" />
                      </p>
                      <FontCard font={recentFontMeta} isSelected={selectedFont === recentFontMeta.value} typedName={typedName}
                        typeColor={typeColor} onClick={handleFontSelect} badge="Recent" badgeCls="bg-muted text-muted-foreground" />
                    </div>
                  )}
                  {!fontSearch && fontCategory === "all" && (
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-1.5 sticky top-0 bg-background py-1 z-10">
                        <span className="h-px flex-1 bg-border" />Top Picks<span className="h-px flex-1 bg-border" />
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {topPickFonts.map((font) => (
                          <FontCard key={font.value} font={font} isSelected={selectedFont === font.value} typedName={typedName}
                            typeColor={typeColor} onClick={handleFontSelect} badge="Top Pick" badgeCls="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" />
                        ))}
                      </div>
                    </div>
                  )}
                  {(() => {
                    if (!fontSearch && fontCategory === "all") {
                      const cats: FontCategory[] = ["signature", "elegant", "professional", "creative", "handwritten", "casual", "rare"];
                      return (
                        <div className="space-y-4">
                          {cats.map((cat) => {
                            const fonts = ALL_FONTS.filter((f) => f.category === cat);
                            return (
                              <div key={cat} className="space-y-2">
                                <p className="text-[10px] uppercase tracking-widest font-semibold flex items-center gap-2 text-muted-foreground sticky top-0 bg-background py-1 z-10">
                                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${CATEGORY_COLORS[cat]}`}>{CATEGORY_LABELS[cat]}</span>
                                  <span className="h-px flex-1 bg-border" />
                                  <span className="text-[9px]">{fonts.length} fonts</span>
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {fonts.map((font) => (
                                    <FontCard key={font.value} font={font} isSelected={selectedFont === font.value}
                                      typedName={typedName} typeColor={typeColor} onClick={handleFontSelect} />
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    if (filtered.length === 0) return <div className="py-10 text-center text-sm text-muted-foreground">No fonts match &ldquo;{fontSearch}&rdquo;</div>;
                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {filtered.map((font) => (
                          <FontCard key={font.value} font={font} isSelected={selectedFont === font.value}
                            typedName={typedName} typeColor={typeColor} onClick={handleFontSelect} />
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })()}

          {/* ── UPLOAD TAB ───────────────────────────────────────────────── */}
          {activeTab === "upload" && (
            <div className="space-y-3">
              <label htmlFor="upload-input" data-testid="label-upload"
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-lg px-6 py-10 cursor-pointer hover-elevate transition-colors text-center bg-muted/20">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Click to upload or drag &amp; drop</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Any image format — no size limit</p>
                </div>
                <input id="upload-input" type="file" accept="image/*" className="sr-only" onChange={handleUpload} data-testid="input-upload" />
              </label>
              {uploadProcessing && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg border bg-muted/40 text-sm text-muted-foreground" data-testid="upload-processing">
                  <Clock className="h-4 w-4 shrink-0 animate-pulse text-primary" />
                  <span>Loading image…{uploadEstimate && <span className="ml-1 font-medium text-foreground">Estimated: {uploadEstimate}</span>}</span>
                </div>
              )}
              {uploadedImage && (
                <Button variant="outline" onClick={removeBackground} disabled={bgRemoved} data-testid="button-remove-bg"
                  className={bgRemoved ? "text-green-700 dark:text-green-400 border-green-300 dark:border-green-700" : ""}>
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

          {/* ── EXPORT PANEL ─────────────────────────────────────────────── */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" /> Export &amp; Download
                </p>
                <p className="text-xs text-muted-foreground">No watermark · Instant · 100% private</p>
              </div>
              <Button onClick={generatePreview} variant="ghost" size="sm" data-testid="button-preview">
                <Eye className="mr-1.5 h-3.5 w-3.5" /> Preview
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={openDownloadDialog} className="gap-2" data-testid="button-download-options">
                <Download className="h-4 w-4" /> Download
              </Button>
              <Button onClick={() => {
                const raw = getExportCanvas();
                if (!raw) { setDlPage("need-sig"); setShowDownloadDialog(true); return; }
                const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
                setDlSigAspect(src.width / src.height || 4);
                setDlSignaturePng(src.toDataURL("image/png"));
                setDlPage("sign-doc"); setShowDownloadDialog(true);
              }} variant="outline" className="gap-2" data-testid="button-add-to-pdf">
                <FileText className="h-4 w-4" /> Add to Doc
              </Button>
            </div>
            <div className="border-t pt-3 grid grid-cols-2 gap-2">
              <Button onClick={copyForGmail} variant="outline" size="sm" className="gap-2" data-testid="button-copy-gmail">
                <Mail className="h-3.5 w-3.5" /> Copy for Gmail
              </Button>
              <Button onClick={saveCurrentToHistory} variant="ghost" size="sm" className="gap-2" data-testid="button-save-history">
                <ClipboardCheck className="h-3.5 w-3.5" /> Save to History
              </Button>
            </div>
          </div>

          {/* ── TRY SIGNATURE STYLES ─────────────────────────────────────── */}
          <div className="space-y-2.5 pt-1 border-t">
            <div className="flex items-center justify-between flex-wrap gap-2 pt-3">
              <div>
                <p className="text-sm font-semibold">Try Signature Styles Instantly</p>
                <p className="text-xs text-muted-foreground">Auto-fills a preview — just download after.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIGNATURE_STYLES.map(({ label, font, sampleName }) => (
                <Button key={label} variant="outline" size="sm" onClick={() => trySignatureStyle(font, sampleName)}
                  data-testid={`button-style-${label.toLowerCase()}`}>
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
                  <div key={item.id} className="shrink-0 w-52 rounded-xl border bg-card overflow-hidden group cursor-pointer hover-elevate transition-all"
                    onClick={() => setSelectedHistoryItem(item)} data-testid={`history-item-${item.id}`}>
                    <div className="relative h-24 bg-white border-b flex items-center justify-center p-3">
                      <img src={item.thumbUrl} alt={item.label} className="max-h-full max-w-full object-contain" />
                      <button onClick={(e) => { e.stopPropagation(); deleteFromHistory(item.id); }}
                        className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
                        title="Delete" data-testid={`button-delete-history-${item.id}`}>
                        <Trash2 className="h-3 w-3" />
                      </button>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-semibold text-zinc-600 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                          Click to view
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-2 space-y-2">
                      <div>
                        <p className="text-xs font-medium text-foreground truncate">{item.label}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(item.savedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex gap-1.5">
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1"
                          onClick={(e) => { e.stopPropagation(); reDownload(item, "png"); }} data-testid={`button-history-png-${item.id}`}>
                          <Download className="h-3 w-3" /> PNG
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs gap-1"
                          onClick={(e) => { e.stopPropagation(); reDownload(item, "jpg"); }} data-testid={`button-history-jpg-${item.id}`}>
                          <Download className="h-3 w-3" /> JPG
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

      {/* ── LIVE PREVIEW ───────────────────────────────────────────────────── */}
      <div className="space-y-4 border-t pt-5 mt-5">
        <p className="text-sm font-semibold flex items-center gap-2">
          <Eye className="h-4 w-4 text-primary" />
          Live Preview
          {!previewUrl && <span className="text-xs font-normal text-muted-foreground">— draw, type, or upload a signature to see it here</span>}
        </p>
        <div className="space-y-1.5">
          <p className="text-xs text-muted-foreground">Document / Contract</p>
          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
            <div className="space-y-2">
              {[3, 4, 3.5, 2.5].map((w, i) => <div key={i} className="h-2 rounded-full bg-zinc-100" style={{ width: `${w / 4 * 100}%` }} />)}
            </div>
            <div className="border-t border-zinc-100 pt-4">
              <p className="text-[10px] text-zinc-400 mb-2">Authorized Signature</p>
              {previewUrl
                ? <img src={previewUrl} alt="Signature preview" className="h-16 object-contain" data-testid="img-preview-doc" />
                : <div className="h-16 w-52 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center"><span className="text-[10px] text-zinc-300 select-none">Your signature</span></div>
              }
              <div className="mt-2 h-px w-40 bg-zinc-200" />
            </div>
          </div>
        </div>
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
            {previewUrl
              ? <img src={previewUrl} alt="Email signature" className="h-10 object-contain" data-testid="img-preview-email" />
              : <div className="h-10 w-28 rounded-lg border-2 border-dashed border-zinc-200 flex items-center justify-center shrink-0"><span className="text-[9px] text-zinc-300 select-none">Signature</span></div>
            }
          </div>
        </div>
      </div>

      {/* ── GMAIL GUIDE DIALOG ─────────────────────────────────────────────── */}
      <Dialog open={showGmailGuide} onOpenChange={(o) => { setShowGmailGuide(o); if (!o) { setFallbackHtml(null); setGmailCopied(false); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              {gmailCopied ? "Signature copied for Gmail!" : "Copy signature for Gmail"}
            </DialogTitle>
            <DialogDescription>
              {gmailCopied ? "Your signature is ready. Follow the steps below." : "Your browser requires a manual copy step."}
            </DialogDescription>
          </DialogHeader>
          {!gmailCopied && fallbackHtml && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Copy this HTML and paste it into Gmail's Signature editor:</p>
              <div className="relative">
                <textarea readOnly value={fallbackHtml} className="w-full h-20 text-xs font-mono rounded-lg border bg-muted p-2 resize-none"
                  onFocus={(e) => e.target.select()} data-testid="textarea-gmail-fallback" />
                <Button size="sm" variant="outline" className="absolute top-1.5 right-1.5 gap-1.5 h-7 text-xs" onClick={copyFallbackHtml} data-testid="button-copy-fallback-html">
                  {gmailCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {gmailCopied ? "Copied" : "Copy HTML"}
                </Button>
              </div>
            </div>
          )}
          <div className="space-y-2 pt-1">
            <p className="text-sm font-semibold">How to add to Gmail:</p>
            {["Open Gmail in your browser", "Click the gear icon → See all settings", "Go to the General tab → scroll to Signature",
              "Click in the signature editor and paste (Ctrl+V / Cmd+V)", "Click Save Changes at the bottom"].map((step, i) => (
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
            <Button variant="outline" onClick={() => setShowGmailGuide(false)} data-testid="button-close-gmail-guide">Done</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── HISTORY DETAIL DIALOG ──────────────────────────────────────────── */}
      <Dialog open={!!selectedHistoryItem} onOpenChange={(o) => { if (!o) setSelectedHistoryItem(null); }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {selectedHistoryItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-primary" />Saved Signature</DialogTitle>
                <DialogDescription>{selectedHistoryItem.label}</DialogDescription>
              </DialogHeader>
              <div className="rounded-xl border bg-white p-6 flex items-center justify-center min-h-[140px]">
                <img src={selectedHistoryItem.pngDataUrl} alt="Saved signature" className="max-h-32 max-w-full object-contain" data-testid="history-detail-img" />
              </div>
              <div className="rounded-xl border bg-white p-5 space-y-3">
                <p className="text-xs text-muted-foreground font-medium">Preview on document</p>
                <div className="space-y-2">{[3, 4, 2.5].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-zinc-200" style={{ width: `${w / 4 * 100}%` }} />)}</div>
                <div className="border-t border-zinc-100 pt-3">
                  <p className="text-[9px] text-zinc-400 mb-1.5 uppercase tracking-wider">Authorized Signature</p>
                  <img src={selectedHistoryItem.pngDataUrl} alt="doc preview" className="h-12 object-contain bg-white" />
                  <div className="mt-1.5 h-px w-36 bg-zinc-200" />
                </div>
              </div>
              <div className="rounded-lg bg-muted/50 border px-4 py-3 grid grid-cols-2 gap-3 text-xs">
                <div><p className="text-muted-foreground">Saved on</p><p className="font-medium text-foreground mt-0.5">{new Date(selectedHistoryItem.savedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p></div>
                <div><p className="text-muted-foreground">Time</p><p className="font-medium text-foreground mt-0.5">{new Date(selectedHistoryItem.savedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p></div>
                <div><p className="text-muted-foreground">Storage</p><p className="font-medium text-foreground mt-0.5">Local browser only</p></div>
                <div><p className="text-muted-foreground">Formats</p><p className="font-medium text-foreground mt-0.5">PNG + JPG</p></div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2" onClick={() => reDownload(selectedHistoryItem, "png")} data-testid="history-detail-download-png">
                  <Download className="h-4 w-4" /> Download PNG <span className="text-xs opacity-70 ml-1">(Transparent)</span>
                </Button>
                <Button variant="outline" className="flex-1 gap-2" onClick={() => reDownload(selectedHistoryItem, "jpg")} data-testid="history-detail-download-jpg">
                  <Download className="h-4 w-4" /> Download JPG <span className="text-xs opacity-70 ml-1">(White BG)</span>
                </Button>
              </div>
              <Button variant="outline" className="w-full gap-2" data-testid="history-detail-add-to-doc"
                onClick={() => { try { sessionStorage.setItem("pixocraft_preload_sig_png", selectedHistoryItem.pngDataUrl); } catch (_) {} setSelectedHistoryItem(null); window.location.href = "/tools/add-signature-to-pdf"; }}>
                <FilePlus2 className="h-4 w-4" /> Add to Document
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" className="flex-1 text-destructive/80 hover:text-destructive gap-2 text-sm"
                  onClick={() => { deleteFromHistory(selectedHistoryItem.id); setSelectedHistoryItem(null); }} data-testid="history-detail-delete">
                  <Trash2 className="h-3.5 w-3.5" /> Delete from history
                </Button>
                <Button variant="ghost" className="flex-1" onClick={() => setSelectedHistoryItem(null)}>Close</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── SAVE PROMPT DIALOG ─────────────────────────────────────────────── */}
      <Dialog open={showSavePrompt} onOpenChange={(o) => { setShowSavePrompt(o); if (!o) pendingFormatsRef.current = null; }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-primary" />Save locally for later?</DialogTitle>
            <DialogDescription>We'll keep a copy here so you can re-download anytime without recreating it.</DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-muted/50 border px-4 py-3 text-xs text-muted-foreground space-y-0.5">
            <p>Stored in your browser — never uploaded to any server.</p>
            <p>Appears in the <strong>Saved Signatures</strong> row below the tool.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={confirmSaveFromPrompt} className="flex-1 gap-2" data-testid="button-confirm-save">
              <ClipboardCheck className="h-4 w-4" /> Yes, Save It
            </Button>
            <Button variant="outline" onClick={() => { setShowSavePrompt(false); pendingFormatsRef.current = null; }} data-testid="button-skip-save">Skip</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── DOWNLOAD DIALOG ────────────────────────────────────────────────── */}
      <Dialog open={showDownloadDialog} onOpenChange={(o) => { setShowDownloadDialog(o); if (!o) setDlPage("options"); }}>
        <DialogContent className={dlPage === "sign-doc" ? "max-w-4xl max-h-[90vh] overflow-y-auto" : "max-w-md"}>
          {dlPage === "options" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><Download className="h-5 w-5 text-primary" />Download Your Signature</DialogTitle>
                <DialogDescription>Choose how you want to save or use your signature.</DialogDescription>
              </DialogHeader>
              {dlSignaturePng && (
                <div className="rounded-lg border bg-muted/30 p-3 flex items-center justify-center">
                  <img src={dlSignaturePng} alt="Signature preview" className="max-h-16 object-contain bg-white dark:bg-zinc-900 rounded" />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => { downloadPNG(); setShowDownloadDialog(false); }} data-testid="dl-dialog-png">
                  <Download className="h-4 w-4 shrink-0 text-primary" />
                  <div className="text-left"><p className="font-medium text-sm">Download PNG</p><p className="text-xs text-muted-foreground">Transparent background — best for documents &amp; emails</p></div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3"
                  onClick={() => { downloadJPG(); setShowDownloadDialog(false); }} data-testid="dl-dialog-jpg">
                  <Download className="h-4 w-4 shrink-0 text-primary" />
                  <div className="text-left"><p className="font-medium text-sm">Download JPG</p><p className="text-xs text-muted-foreground">White background — smaller file size</p></div>
                </Button>
                <Button className="w-full justify-start gap-3 h-auto py-3" onClick={() => setDlPage("sign-doc")} data-testid="dl-dialog-add-to-doc">
                  <FileText className="h-4 w-4 shrink-0" />
                  <div className="text-left"><p className="font-medium text-sm">Add to PDF or Document</p><p className="text-xs text-primary-foreground/80">Upload a file and place your signature on it</p></div>
                </Button>
              </div>
            </>
          )}
          {dlPage === "need-sig" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />No Signature Yet</DialogTitle>
                <DialogDescription>Please draw or type your signature first.</DialogDescription>
              </DialogHeader>
              <div className="rounded-lg border bg-muted/30 p-5 flex flex-col items-center gap-3 text-center">
                <PenTool className="h-10 w-10 text-primary/40" />
                <div>
                  <p className="font-medium text-sm">Create your signature first</p>
                  <p className="text-xs text-muted-foreground mt-1">Use the <strong>Draw</strong> tab to sign with your mouse/finger, or the <strong>Type</strong> tab to generate one.</p>
                </div>
                <Button onClick={() => setShowDownloadDialog(false)} className="gap-2" data-testid="dl-need-sig-go-back">
                  <ArrowRight className="h-4 w-4 rotate-180" /> Go Back &amp; Create Signature
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
              <SignDocumentPanel signaturePng={dlSignaturePng} sigAspect={dlSigAspect} onClose={() => setDlPage("options")} hideClose />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
