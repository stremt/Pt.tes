import { useRef, useState, useEffect, useCallback } from "react";
import {
  PenTool, Download, Eraser, Type, Upload, Undo2, Redo2,
  Trash2, ImageIcon, Shield, Check, Eye, Zap, Smartphone, Star,
  Mail, Copy, X, ClipboardCheck, ArrowRight, Maximize2, RotateCcw, FileText,
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

const HANDWRITTEN_FONTS = [
  { label: "Great Vibes",          value: "Great Vibes",          size: "lg" },
  { label: "Sacramento",           value: "Sacramento",           size: "lg" },
  { label: "Pinyon Script",        value: "Pinyon Script",        size: "lg" },
  { label: "Allura",               value: "Allura",               size: "lg" },
  { label: "Tangerine",            value: "Tangerine",            size: "xl" },
  { label: "Herr Von Muellerhoff", value: "Herr Von Muellerhoff", size: "xl" },
  { label: "Ruthie",               value: "Ruthie",               size: "xl" },
  { label: "Waterfall",            value: "Waterfall",            size: "lg" },
  { label: "Euphoria Script",      value: "Euphoria Script",      size: "lg" },
  { label: "Qwigley",              value: "Qwigley",              size: "xl" },
  { label: "Ms Madi",              value: "Ms Madi",              size: "xl" },
  { label: "Lavishly Yours",       value: "Lavishly Yours",       size: "xl" },
  { label: "Monsieur La Doulaise", value: "Monsieur La Doulaise", size: "xl" },
  { label: "Moon Dance",           value: "Moon Dance",           size: "lg" },
  { label: "Meie Script",          value: "Meie Script",          size: "lg" },
  { label: "Dancing Script",       value: "Dancing Script",       size: "md" },
  { label: "Parisienne",           value: "Parisienne",           size: "md" },
  { label: "Alex Brush",           value: "Alex Brush",           size: "lg" },
  { label: "Satisfy",              value: "Satisfy",              size: "md" },
  { label: "Kaushan Script",       value: "Kaushan Script",       size: "md" },
  { label: "Cookie",               value: "Cookie",               size: "md" },
  { label: "Clicker Script",       value: "Clicker Script",       size: "md" },
  { label: "Marck Script",         value: "Marck Script",         size: "md" },
  { label: "Niconne",              value: "Niconne",              size: "md" },
  { label: "Merienda",             value: "Merienda",             size: "md" },
  { label: "Italianno",            value: "Italianno",            size: "lg" },
  { label: "Courgette",            value: "Courgette",            size: "md" },
  { label: "Rouge Script",         value: "Rouge Script",         size: "lg" },
  { label: "Pacifico",             value: "Pacifico",             size: "sm" },
  { label: "Lobster",              value: "Lobster",              size: "sm" },
  { label: "Righteous",            value: "Righteous",            size: "sm" },
  { label: "Berkshire Swash",      value: "Berkshire Swash",      size: "sm" },
  { label: "Seaweed Script",       value: "Seaweed Script",       size: "sm" },
  { label: "Grand Hotel",          value: "Grand Hotel",          size: "md" },
  { label: "Rochester",            value: "Rochester",            size: "md" },
  { label: "Playball",             value: "Playball",             size: "md" },
  { label: "Boogaloo",             value: "Boogaloo",             size: "sm" },
  { label: "Ruge Boogie",          value: "Ruge Boogie",          size: "sm" },
  { label: "Lobster Two",          value: "Lobster Two",          size: "sm" },
  { label: "Caveat",               value: "Caveat",               size: "md" },
  { label: "Patrick Hand",         value: "Patrick Hand",         size: "md" },
  { label: "Indie Flower",         value: "Indie Flower",         size: "md" },
  { label: "Handlee",              value: "Handlee",              size: "md" },
  { label: "Bad Script",           value: "Bad Script",           size: "md" },
  { label: "Kristi",               value: "Kristi",               size: "lg" },
  { label: "Gochi Hand",           value: "Gochi Hand",           size: "md" },
  { label: "Itim",                 value: "Itim",                 size: "md" },
  { label: "Just Another Hand",    value: "Just Another Hand",    size: "md" },
  { label: "Over the Rainbow",     value: "Over the Rainbow",     size: "md" },
  { label: "Dekko",                value: "Dekko",                size: "md" },
  { label: "Permanent Marker",     value: "Permanent Marker",     size: "sm" },
  { label: "Rock Salt",            value: "Rock Salt",            size: "sm" },
  { label: "Gloria Hallelujah",    value: "Gloria Hallelujah",    size: "sm" },
  { label: "Rancho",               value: "Rancho",               size: "sm" },
  { label: "Cabin Sketch",         value: "Cabin Sketch",         size: "sm" },
  { label: "Shadows Into Light",   value: "Shadows Into Light",   size: "md" },
  { label: "Nothing You Could Do", value: "Nothing You Could Do", size: "md" },
  { label: "La Belle Aurore",      value: "La Belle Aurore",      size: "md" },
  { label: "Give You Glory",       value: "Give You Glory",       size: "md" },
  { label: "Swanky and Moo Moo",   value: "Swanky and Moo Moo",   size: "md" },
  { label: "Dawning of a New Day", value: "Dawning of a New Day", size: "lg" },
  { label: "Amatic SC",            value: "Amatic SC",            size: "sm" },
  { label: "Yellowtail",           value: "Yellowtail",           size: "sm" },
  { label: "Petit Formal Script",  value: "Petit Formal Script",  size: "md" },
  { label: "Norican",              value: "Norican",              size: "md" },
  { label: "Stalemate",            value: "Stalemate",            size: "lg" },
  { label: "Lovers Quartet",       value: "Lovers Quartet",       size: "md" },
  { label: "Engagement",           value: "Engagement",           size: "xl" },
  { label: "Mr De Haviland",       value: "Mr De Haviland",       size: "lg" },
  { label: "Inspiration",          value: "Inspiration",          size: "lg" },
  { label: "Fondamento",           value: "Fondamento",           size: "md" },
  { label: "Quintessential",       value: "Quintessential",       size: "md" },
  { label: "Bilbo",                value: "Bilbo",                size: "lg" },
];

const FONT_SIZE: Record<string, { card: string; canvas: number }> = {
  xl: { card: "clamp(32px, 6vw, 54px)", canvas: 82 },
  lg: { card: "clamp(26px, 5vw, 44px)", canvas: 68 },
  md: { card: "clamp(22px, 4vw, 36px)", canvas: 56 },
  sm: { card: "clamp(16px, 3vw, 26px)", canvas: 40 },
};

const SIGNATURE_STYLES = [
  { label: "Stylish",      font: "Great Vibes",    sampleName: "Alex Johnson" },
  { label: "Minimal",      font: "Caveat",         sampleName: "Alex Johnson" },
  { label: "Bold",         font: "Pacifico",       sampleName: "Alex Johnson" },
  { label: "Professional", font: "Dancing Script", sampleName: "Alex Johnson" },
];

type Tab = "draw" | "type" | "upload";
type Point = { x: number; y: number };

const CW = 800;
const CH = 260;
const EXPORT_SCALE = 4;

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
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, totalW, totalH);
  ctx.drawImage(src, margin, margin, drawW, drawH);
  return oc;
}

interface SignaturePadWidgetProps {
  initialTab?: Tab;
  initialFont?: string;
  initialName?: string;
  savedId?: string;
}

const LS_PREFIX = "pixocraft_sig_";

function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export default function SignaturePadWidget({
  initialTab = "draw",
  initialFont = null as string | null,
  initialName = "",
  savedId,
}: SignaturePadWidgetProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasLogicalWRef = useRef(CW);
  const hasDrawnRef = useRef(false);
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);
  const pendingRestoreRef = useRef<string | null>(null);
  const [strokeColor, setStrokeColor] = useState("#111111");
  const [strokeWidth, setStrokeWidth] = useState(2.5);
  const strokeColorRef = useRef("#111111");
  const strokeWidthRef = useRef(2.5);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);
  // Keep ref in sync for use in ResizeObserver closure
  useEffect(() => { hasDrawnRef.current = hasDrawn; }, [hasDrawn]);

  const [typedName, setTypedName] = useState(initialName);
  const [selectedFont, setSelectedFont] = useState<string | null>(initialFont);
  const [typeColor, setTypeColor] = useState("#111111");

  const uploadCanvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [bgRemoved, setBgRemoved] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const liveRafRef = useRef<number | null>(null);

  const [sigScale, setSigScale] = useState(100);
  const [sigMargin, setSigMargin] = useState(0);
  const sigScaleRef = useRef(100);
  const sigMarginRef = useRef(0);

  const [showGmailGuide, setShowGmailGuide] = useState(false);
  const [fallbackHtml, setFallbackHtml] = useState<string | null>(null);
  const [gmailCopied, setGmailCopied] = useState(false);

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savedLink, setSavedLink] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const [dlPage, setDlPage] = useState<"options" | "sign-doc" | "need-sig">("options");
  const [dlSignaturePng, setDlSignaturePng] = useState<string | null>(null);
  const [dlSigAspect, setDlSigAspect] = useState(4);

  const { toast } = useToast();

  useEffect(() => {
    const existing = document.getElementById("sig-widget-gfonts");
    if (existing) existing.remove();
    const params = HANDWRITTEN_FONTS.map((f) => `family=${encodeURIComponent(f.value)}`).join("&");
    const link = document.createElement("link");
    link.id = "sig-widget-gfonts";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${params}&display=swap`;
    document.head.appendChild(link);
  }, []);

  const resizeCanvasToContainer = useCallback((logW: number, restoreUrl?: string | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const newPhysW = Math.round(logW * dpr);
    const newPhysH = Math.round(CH * dpr);
    // Save current drawing before resize if content exists
    let savedUrl: string | null = restoreUrl ?? null;
    if (!savedUrl && hasDrawnRef.current) {
      savedUrl = canvas.toDataURL("image/png");
    }
    canvasLogicalWRef.current = logW;
    canvas.width = newPhysW;
    canvas.height = newPhysH;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (savedUrl) {
      const img = new Image();
      img.onload = () => {
        const c = canvasRef.current;
        if (!c) return;
        const cx = c.getContext("2d");
        if (!cx) return;
        cx.drawImage(img, 0, 0, logW, CH);
      };
      img.src = savedUrl;
    }
  }, []);

  // ResizeObserver: keeps canvas pixel buffer exactly matching its CSS display size
  useEffect(() => {
    const wrapper = canvasWrapperRef.current;
    if (!wrapper) return;
    let firstRun = true;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (!w || w <= 0) return;
      if (firstRun) {
        firstRun = false;
        // On first run, also handle pendingRestore
        resizeCanvasToContainer(w, pendingRestoreRef.current);
        if (pendingRestoreRef.current) {
          pendingRestoreRef.current = null;
          setHasDrawn(true);
        }
      } else {
        resizeCanvasToContainer(w);
      }
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [resizeCanvasToContainer]);

  // When switching back to the draw tab, re-apply the transform (canvas may have been reset)
  useEffect(() => {
    if (activeTab !== "draw") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, [activeTab]);

  // Keep stroke refs in sync
  useEffect(() => { strokeColorRef.current = strokeColor; }, [strokeColor]);
  useEffect(() => { strokeWidthRef.current = strokeWidth; }, [strokeWidth]);

  useEffect(() => {
    if (!savedId) return;
    try {
      const raw = localStorage.getItem(LS_PREFIX + savedId);
      if (!raw) return;
      const data = JSON.parse(raw);
      setActiveTab(data.tab ?? "draw");
      if (data.strokeColor) setStrokeColor(data.strokeColor);
      if (data.strokeWidth) setStrokeWidth(data.strokeWidth);
      if (data.typedName !== undefined) setTypedName(data.typedName);
      if (data.selectedFont) setSelectedFont(data.selectedFont);
      if (data.typeColor) setTypeColor(data.typeColor);
      if (data.uploadedImage) { setUploadedImage(data.uploadedImage); setBgRemoved(data.bgRemoved ?? false); }
      if (data.tab === "draw" && data.drawDataUrl) {
        pendingRestoreRef.current = data.drawDataUrl;
      }
      try { (window as any).gtag?.("event", "edit_link_opened", { id: savedId }); } catch {}
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedId]);

  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev.slice(-19), snap]);
    setRedoStack([]);
  }, []);
  const saveStateRef = useRef<() => void>(() => {});
  useEffect(() => { saveStateRef.current = saveState; }, [saveState]);

  // Native pointer-event drawing — bypasses React batching for butter-smooth strokes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPt = (e: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      const logW = canvasLogicalWRef.current;
      const sx = logW / rect.width;
      const sy = CH / rect.height;
      return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      saveStateRef.current();
      const ctx = canvas.getContext("2d")!;
      ctx.strokeStyle = strokeColorRef.current;
      ctx.lineWidth = strokeWidthRef.current;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const pos = getPt(e);
      pointsRef.current = [pos];
      isDrawingRef.current = true;
      setHasDrawn(true);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDrawingRef.current) return;
      e.preventDefault();
      const ctx = canvas.getContext("2d")!;
      const pos = getPt(e);
      pointsRef.current.push(pos);
      const pts = pointsRef.current;
      if (pts.length >= 3) {
        const p1 = pts[pts.length - 2];
        const p2 = pts[pts.length - 1];
        const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        ctx.quadraticCurveTo(p1.x, p1.y, mid.x, mid.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mid.x, mid.y);
      } else {
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
      if (pts.length) { const last = pts[pts.length - 1]; ctx.lineTo(last.x, last.y); ctx.stroke(); }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const clearDraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    saveState();
    ctx.clearRect(0, 0, canvasLogicalWRef.current, CH);
    setHasDrawn(false);
    setUndoStack([]);
    setRedoStack([]);
  }, [saveState]);

  const renderTypeCanvas = useCallback(
    (font: string, color: string): HTMLCanvasElement => {
      const BW = CW * EXPORT_SCALE;
      const BH = CH * EXPORT_SCALE;
      const oc = document.createElement("canvas");
      oc.width = BW; oc.height = BH;
      const ctx = oc.getContext("2d")!;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, BW, BH);
      const fontMeta = HANDWRITTEN_FONTS.find((f) => f.value === font);
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

  // ── Keep refs in sync ─────────────────────────────────────────────────────
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

  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: "Please upload a PNG or JPG image." });
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => { setUploadedImage(ev.target?.result as string); setBgRemoved(false); };
      reader.readAsDataURL(file);
    },
    [toast]
  );

  useEffect(() => {
    const canvas = uploadCanvasRef.current;
    if (!canvas || !uploadedImage) return;
    const BW = CW * EXPORT_SCALE; const BH = CH * EXPORT_SCALE;
    canvas.width = BW; canvas.height = BH;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "white"; ctx.fillRect(0, 0, BW, BH);
      const ratio = Math.min((BW * 0.85) / img.width, (BH * 0.85) / img.height);
      const w = img.width * ratio; const h = img.height * ratio;
      ctx.drawImage(img, (BW - w) / 2, (BH - h) / 2, w, h);
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
      if (!display) return null;
      if (!hasDrawn) return null;
      const logW = canvasLogicalWRef.current;
      const exp = document.createElement("canvas");
      exp.width = logW * EXPORT_SCALE;
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

  const downloadPNG = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) { toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." }); return; }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    const oc = document.createElement("canvas");
    oc.width = src.width; oc.height = src.height;
    const ctx = oc.getContext("2d")!;
    ctx.drawImage(src, 0, 0);
    const id = ctx.getImageData(0, 0, oc.width, oc.height);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i] > 240 && d[i + 1] > 240 && d[i + 2] > 240) d[i + 3] = 0;
    }
    ctx.clearRect(0, 0, oc.width, oc.height);
    ctx.putImageData(id, 0, 0);
    oc.toBlob((b) => {
      if (!b) return;
      const url = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = url; a.download = `signature-${Date.now()}.png`; a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded!", description: "Saved as transparent PNG." });
    }, "image/png");
  }, [getExportCanvas, toast, sigScale, sigMargin]);

  const downloadJPG = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) { toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." }); return; }
    const src = buildAdjustedCanvas(raw, sigScale, sigMargin);
    const oc = document.createElement("canvas");
    oc.width = src.width; oc.height = src.height;
    const ctx = oc.getContext("2d")!;
    ctx.fillStyle = "white"; ctx.fillRect(0, 0, oc.width, oc.height);
    ctx.drawImage(src, 0, 0);
    oc.toBlob((b) => {
      if (!b) return;
      const url = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = url; a.download = `signature-${Date.now()}.jpg`; a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded!", description: "Saved as JPG." });
    }, "image/jpeg", 0.95);
  }, [getExportCanvas, toast, sigScale, sigMargin]);

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

  const generatePreview = useCallback(() => {
    const raw = getExportCanvas();
    if (!raw) { toast({ title: "Nothing to preview", description: "Draw, type, or upload a signature first." }); return; }
    setPreviewUrl(buildAdjustedCanvas(raw, sigScale, sigMargin).toDataURL("image/png"));
  }, [getExportCanvas, toast, sigScale, sigMargin]);

  const copyForGmail = useCallback(async () => {
    const src = getExportCanvas();
    if (!src) {
      toast({ title: "Nothing to copy", description: "Draw, type, or upload a signature first." });
      return;
    }

    const oc = document.createElement("canvas");
    oc.width = src.width; oc.height = src.height;
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

  const saveSignature = useCallback(async () => {
    const tab = activeTab;
    const hasContent =
      (tab === "draw" && hasDrawn) ||
      (tab === "type" && typedName && selectedFont) ||
      (tab === "upload" && uploadedImage);

    if (!hasContent) {
      toast({ title: "Nothing to save", description: "Draw, type, or upload a signature first." });
      return;
    }

    try { (window as any).gtag?.("event", "save_signature_clicked", { method: tab }); } catch {}

    let drawDataUrl: string | undefined;
    if (tab === "draw" && canvasRef.current) {
      drawDataUrl = canvasRef.current.toDataURL("image/png");
    }

    const id = generateId();
    const payload = {
      tab,
      strokeColor,
      strokeWidth,
      typedName,
      selectedFont,
      typeColor,
      uploadedImage: tab === "upload" ? uploadedImage : undefined,
      bgRemoved,
      drawDataUrl,
      savedAt: Date.now(),
    };

    localStorage.setItem(LS_PREFIX + id, JSON.stringify(payload));

    const link = `${window.location.origin}/edit/signature-${id}`;
    setSavedLink(link);
    setLinkCopied(false);
    setShowSaveDialog(true);
  }, [activeTab, hasDrawn, typedName, selectedFont, uploadedImage, strokeColor, strokeWidth, typeColor, bgRemoved, toast]);

  const copyLink = useCallback(async () => {
    if (!savedLink) return;
    try {
      await navigator.clipboard.writeText(savedLink);
      setLinkCopied(true);
      toast({ title: "Link copied!", description: "Share this link to edit your signature anytime." });
    } catch {
      toast({ title: "Copy failed", description: "Please copy the link manually from the box below." });
    }
  }, [savedLink, toast]);

  const trySignatureStyle = useCallback(
    (font: string, sampleName: string) => {
      setActiveTab("type");
      if (!typedName) setTypedName(sampleName);
      setSelectedFont(font);
    },
    [typedName]
  );

  const canvasStyle: React.CSSProperties = { width: "100%", height: CH, display: "block" };

  return (
    <>
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
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
        <div className="flex gap-1.5 p-1.5 rounded-xl bg-muted/60 border" data-testid="widget-tabs-method">
          {([
            { id: "draw",   icon: PenTool, title: "Draw",   desc: "Freehand" },
            { id: "type",   icon: Type,    title: "Type",   desc: "50+ Fonts" },
            { id: "upload", icon: Upload,   title: "Upload", desc: "From photo" },
          ] as const).map(({ id, icon: Icon, title, desc }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              data-testid={`widget-tab-${id}`}
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

        {activeTab === "draw" && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/40 border">
              <div className="flex items-center gap-2">
                <Label htmlFor="w-ink-color" className="text-xs whitespace-nowrap">Ink</Label>
                <input
                  id="w-ink-color"
                  type="color"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="h-8 w-10 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
                  data-testid="widget-input-stroke-color"
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
                  data-testid="widget-slider-stroke-width"
                  className="flex-1"
                />
              </div>
              <div className="w-px h-5 bg-border hidden sm:block" />
              <div className="flex items-center gap-1 ml-auto">
                <Button size="icon" variant="ghost" onClick={undo} disabled={undoStack.length === 0} title="Undo" data-testid="widget-button-undo">
                  <Undo2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={redo} disabled={redoStack.length === 0} title="Redo" data-testid="widget-button-redo">
                  <Redo2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-5 bg-border mx-1" />
                <Button size="icon" variant="ghost" onClick={clearDraw} disabled={!hasDrawn && undoStack.length === 0} title="Clear" data-testid="widget-button-clear" className="text-destructive/70 hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative rounded-lg border border-border overflow-hidden bg-white" style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04)" }}>
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)", opacity: 0.5 }}
              />
              <div ref={canvasWrapperRef} style={{ width: "100%", height: CH, position: "relative", zIndex: 10 }}>
                <canvas
                  ref={canvasRef}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent" }}
                  className="cursor-crosshair touch-none block"
                  data-testid="widget-canvas-draw"
                />
              </div>
              {!hasDrawn && (
                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 select-none">
                  <PenTool className="h-6 w-6 text-muted-foreground/20" />
                  <span className="text-sm text-muted-foreground/35">Draw your signature here</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "type" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="space-y-1.5 flex-1 min-w-52">
                <Label htmlFor="w-typed-name" className="text-xs">Your Name</Label>
                <Input
                  id="w-typed-name"
                  placeholder="e.g. Alex Johnson"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  className="text-base"
                  data-testid="widget-input-typed-name"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="w-type-color" className="text-xs">Ink Color</Label>
                <input
                  id="w-type-color"
                  type="color"
                  value={typeColor}
                  onChange={(e) => setTypeColor(e.target.value)}
                  className="h-9 w-14 rounded-md border border-border cursor-pointer bg-transparent p-0.5 block"
                  data-testid="widget-input-type-color"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {typedName ? "Click a style to select it, then download below." : "Type your name above to preview all 50+ styles."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[480px] overflow-y-auto pr-1 rounded-md">
              {HANDWRITTEN_FONTS.map((font) => {
                const isSelected = selectedFont === font.value;
                return (
                  <button
                    key={font.value}
                    onClick={() => setSelectedFont(font.value)}
                    data-testid={`widget-font-${font.value.replace(/ /g, "-")}`}
                    className={[
                      "relative flex flex-col items-center justify-center px-4 py-4 rounded-lg border transition-all cursor-pointer text-center bg-white dark:bg-zinc-900",
                      isSelected
                        ? "border-primary shadow-sm ring-2 ring-primary/40"
                        : "border-border hover-elevate dark:border-zinc-300/20",
                    ].join(" ")}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </span>
                    )}
                    <span style={{ fontFamily: `'${font.value}', cursive`, fontSize: FONT_SIZE[font.size].card, color: typeColor, lineHeight: 1.3, display: "block", minHeight: "46px" }}>
                      {typedName || "Your Name"}
                    </span>
                    <span className="mt-1.5 text-[10px] text-muted-foreground">{font.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "upload" && (
          <div className="space-y-3">
            <label
              htmlFor="w-upload-input"
              className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-lg px-6 py-10 cursor-pointer hover-elevate transition-colors text-center bg-muted/20"
              data-testid="widget-label-upload"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Click to upload or drag &amp; drop</p>
                <p className="text-xs text-muted-foreground mt-0.5">PNG or JPG — up to 10 MB</p>
              </div>
              <input
                id="w-upload-input"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="sr-only"
                onChange={handleUpload}
                data-testid="widget-input-upload"
              />
            </label>
            {uploadedImage && (
              <Button
                variant="outline"
                onClick={removeBackground}
                disabled={bgRemoved}
                data-testid="widget-button-remove-bg"
                className={bgRemoved ? "text-green-700 dark:text-green-400 border-green-300 dark:border-green-700" : ""}
              >
                <Eraser className="mr-2 h-4 w-4" />
                {bgRemoved ? "Background Removed" : "Remove White Background"}
              </Button>
            )}
            <div className="relative rounded-lg border-2 border-dashed border-border overflow-hidden bg-white dark:bg-zinc-900">
              <canvas ref={uploadCanvasRef} style={canvasStyle} className="block" data-testid="widget-canvas-upload" />
              {!uploadedImage && (
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-muted-foreground/40 select-none">
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-sm">Upload preview will appear here</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── RESIZE & MARGIN ─────────────────────────────────────────── */}
        <div className="hidden rounded-lg border p-4 space-y-4" data-testid="widget-section-resize-margin">
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
                data-testid="widget-button-reset-resize"
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
                <span className="text-xs font-medium tabular-nums text-foreground" data-testid="widget-text-scale-value">{sigScale}%</span>
              </div>
              <Slider
                min={50}
                max={200}
                step={5}
                value={[sigScale]}
                onValueChange={([v]) => setSigScale(v)}
                data-testid="widget-slider-scale"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground/60">
                <span>50%</span><span>100%</span><span>200%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">Margin (padding)</Label>
                <span className="text-xs font-medium tabular-nums text-foreground" data-testid="widget-text-margin-value">{sigMargin}px</span>
              </div>
              <Slider
                min={0}
                max={60}
                step={2}
                value={[sigMargin]}
                onValueChange={([v]) => setSigMargin(v)}
                data-testid="widget-slider-margin"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground/60">
                <span>0px</span><span>30px</span><span>60px</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <p className="text-sm font-semibold flex items-center gap-2">
                <Download className="h-4 w-4 text-primary" />
                Export &amp; Download
              </p>
              <p className="text-xs text-muted-foreground">No watermark · Instant · 100% private</p>
            </div>
            <Button onClick={generatePreview} variant="ghost" size="sm" data-testid="widget-button-preview">
              <Eye className="mr-1.5 h-3.5 w-3.5" />
              Preview
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={openDownloadDialog} className="gap-2 col-span-1" data-testid="widget-button-download-options">
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
            }} variant="outline" className="gap-2 col-span-1" data-testid="widget-button-add-to-pdf">
              <FileText className="h-4 w-4" />
              Add to Doc
            </Button>
          </div>

          <div className="border-t pt-3 grid grid-cols-2 gap-2">
            <Button onClick={copyForGmail} variant="outline" size="sm" className="gap-2" data-testid="widget-button-copy-gmail">
              <Mail className="h-3.5 w-3.5" />
              Copy for Gmail
            </Button>
            <Button onClick={saveSignature} variant="ghost" size="sm" className="gap-2" data-testid="widget-button-save-signature">
              <ClipboardCheck className="h-3.5 w-3.5" />
              Save &amp; Link
            </Button>
          </div>
        </div>

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
                data-testid={`widget-button-style-${label.toLowerCase()}`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {previewUrl && (
        <div className="space-y-4 border-t p-5">
          <p className="text-sm font-semibold flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Live Preview
          </p>
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Document / Contract</p>
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
              <div className="space-y-2">
                {[3, 4, 3.5, 2.5].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-zinc-200" style={{ width: `${w / 4 * 100}%` }} />
                ))}
              </div>
              <div className="border-t border-zinc-200 pt-4">
                <p className="text-[10px] text-zinc-400 mb-1">Authorized Signature</p>
                <img src={previewUrl} alt="Signature preview on document" className="h-16 object-contain" data-testid="widget-img-preview-doc" />
                <div className="mt-1 h-px w-40 bg-zinc-200" />
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground">Email Footer</p>
            <div className="bg-white border rounded-xl p-4 shadow-sm flex items-center gap-4 flex-wrap">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <PenTool className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <div className="h-2 w-28 rounded-full bg-zinc-200" />
                <div className="h-2 w-20 rounded-full bg-zinc-100" />
              </div>
              <img src={previewUrl} alt="Email signature preview" className="h-10 object-contain" data-testid="widget-img-preview-email" />
            </div>
          </div>
        </div>
      )}
    </div>

    {/* ── GMAIL GUIDE DIALOG ───────────────────────────────────────── */}
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
                data-testid="widget-textarea-gmail-fallback"
              />
              <Button size="sm" variant="outline" className="absolute top-1.5 right-1.5 gap-1.5 h-7 text-xs" onClick={copyFallbackHtml} data-testid="widget-button-copy-fallback-html">
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
          <Button asChild className="flex-1 gap-2" data-testid="widget-button-open-gmail">
            <a href="https://mail.google.com/mail/u/0/#settings/general" target="_blank" rel="noopener noreferrer">
              <ArrowRight className="h-4 w-4" /> Open Gmail Settings
            </a>
          </Button>
          <Button variant="outline" onClick={() => setShowGmailGuide(false)} data-testid="widget-button-close-gmail-guide">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    {/* ── SAVE & EDIT LINK DIALOG ───────────────────────────────────── */}
    <Dialog open={showSaveDialog} onOpenChange={(o) => { setShowSaveDialog(o); if (!o) setLinkCopied(false); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" />
            Your signature is saved!
          </DialogTitle>
          <DialogDescription>
            You can edit it anytime using the link below — even after closing this tab.
          </DialogDescription>
        </DialogHeader>

        {savedLink && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Your edit link:</p>
            <div className="relative">
              <input
                readOnly
                value={savedLink}
                className="w-full text-xs font-mono rounded-lg border bg-muted px-3 py-2.5 pr-24"
                onFocus={(e) => e.target.select()}
                data-testid="widget-input-saved-link"
              />
              <Button
                size="sm"
                variant="outline"
                className="absolute top-1 right-1 gap-1.5 h-7 text-xs"
                onClick={copyLink}
                data-testid="widget-button-copy-link"
              >
                {linkCopied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                {linkCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        )}

        <div className="rounded-lg border bg-muted/40 px-4 py-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground text-sm">What this link does:</p>
          <p>Opening the link on <strong>this browser</strong> restores your full signature — ready to edit, re-download, or copy for Gmail.</p>
          <p className="text-muted-foreground/70">Saved locally on this device. Clearing browser data will remove it.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={copyLink} className="flex-1 gap-2" data-testid="widget-button-copy-link-primary">
            {linkCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {linkCopied ? "Link Copied!" : "Copy Link"}
          </Button>
          {savedLink && (
            <Button asChild variant="outline" className="flex-1 gap-2" data-testid="widget-button-open-link">
              <a href={savedLink} target="_blank" rel="noopener noreferrer">
                <ArrowRight className="h-4 w-4" /> Open Link
              </a>
            </Button>
          )}
          <Button variant="ghost" onClick={() => setShowSaveDialog(false)} className="w-full" data-testid="widget-button-close-save-dialog">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    {/* ── DOWNLOAD DIALOG ──────────────────────────────────────────── */}
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
