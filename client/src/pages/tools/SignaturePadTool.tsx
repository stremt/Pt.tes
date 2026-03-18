import { useRef, useState, useEffect, useCallback } from "react";
import { useSEO } from "@/lib/seo";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

// ─── 40+ visually diverse signature fonts ────────────────────────────────────
const HANDWRITTEN_FONTS = [
  // ── Ultra-thin elegant scripts ──────────────────────────────────────────
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
  // ── Classic flowing cursive ─────────────────────────────────────────────
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
  // ── Bold / chunky scripts ───────────────────────────────────────────────
  { label: "Pacifico",             value: "Pacifico",             size: "sm" },
  { label: "Lobster",              value: "Lobster",              size: "sm" },
  { label: "Righteous",            value: "Righteous",            size: "sm" },
  { label: "Berkshire Swash",      value: "Berkshire Swash",      size: "sm" },
  { label: "Seaweed Script",       value: "Seaweed Script",       size: "sm" },
  { label: "Grand Hotel",          value: "Grand Hotel",          size: "md" },
  { label: "Rochester",            value: "Rochester",            size: "md" },
  { label: "Playball",             value: "Playball",             size: "md" },
  // ── Casual handwriting ──────────────────────────────────────────────────
  { label: "Caveat",               value: "Caveat",               size: "md" },
  { label: "Patrick Hand",         value: "Patrick Hand",         size: "md" },
  { label: "Indie Flower",         value: "Indie Flower",         size: "md" },
  { label: "Handlee",              value: "Handlee",              size: "md" },
  { label: "Courgette",            value: "Courgette",            size: "md" },
  { label: "Bad Script",           value: "Bad Script",           size: "md" },
  { label: "Kristi",               value: "Kristi",               size: "lg" },
  // ── Marker / rough / textured ───────────────────────────────────────────
  { label: "Permanent Marker",     value: "Permanent Marker",     size: "sm" },
  { label: "Rock Salt",            value: "Rock Salt",            size: "sm" },
  { label: "Gloria Hallelujah",    value: "Gloria Hallelujah",    size: "sm" },
  // ── Light & airy ────────────────────────────────────────────────────────
  { label: "Shadows Into Light",   value: "Shadows Into Light",   size: "md" },
  { label: "Nothing You Could Do", value: "Nothing You Could Do", size: "md" },
  { label: "La Belle Aurore",      value: "La Belle Aurore",      size: "md" },
  { label: "Give You Glory",       value: "Give You Glory",       size: "md" },
  // ── Condensed / tall ────────────────────────────────────────────────────
  { label: "Amatic SC",            value: "Amatic SC",            size: "sm" },
  { label: "Yellowtail",           value: "Yellowtail",           size: "sm" },
  // ── Formal calligraphy ──────────────────────────────────────────────────
  { label: "Petit Formal Script",  value: "Petit Formal Script",  size: "md" },
  { label: "Norican",              value: "Norican",              size: "md" },
  { label: "Stalemate",            value: "Stalemate",            size: "lg" },
  { label: "Lovers Quartet",       value: "Lovers Quartet",       size: "md" },
  { label: "Engagement",           value: "Engagement",           size: "xl" },
];

// Font size px values for card previews and canvas export
const FONT_SIZE: Record<string, { card: string; canvas: number }> = {
  xl: { card: "clamp(32px, 6vw, 54px)", canvas: 82 },
  lg: { card: "clamp(26px, 5vw, 44px)", canvas: 68 },
  md: { card: "clamp(22px, 4vw, 36px)", canvas: 56 },
  sm: { card: "clamp(16px, 3vw, 26px)", canvas: 40 },
};

type Tab = "draw" | "type" | "upload";
type Point = { x: number; y: number };

// Canvas logical dimensions (no DPR scaling needed — keeps coordinate math simple)
const CW = 800;
const CH = 260;

export default function SignaturePadTool() {
  // ── Active tab ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<Tab>("draw");

  // ── Draw tab ──────────────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);
  const [strokeColor, setStrokeColor] = useState("#111111");
  const [strokeWidth, setStrokeWidth] = useState(2.5);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // ── Type tab ──────────────────────────────────────────────────────────────
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState<string | null>(null);
  const [typeColor, setTypeColor] = useState("#111111");

  // ── Upload tab ────────────────────────────────────────────────────────────
  const uploadCanvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [bgRemoved, setBgRemoved] = useState(false);

  // ── Preview ───────────────────────────────────────────────────────────────
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { toast } = useToast();

  // ── Load Google Fonts (v2 API: separate family= param per font) ──────────
  useEffect(() => {
    // Remove stale link if present so we always get fresh fonts
    const existing = document.getElementById("sig-gfonts");
    if (existing) existing.remove();

    // Build proper v2 URL: family=Font+Name&family=Font+Name2 ...
    const params = HANDWRITTEN_FONTS.map(
      (f) => `family=${encodeURIComponent(f.value)}`
    ).join("&");
    const link = document.createElement("link");
    link.id = "sig-gfonts";
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?${params}&display=swap`;
    document.head.appendChild(link);
  }, []);

  // ── Init / reinit draw canvas ─────────────────────────────────────────────
  // Called on mount and every time we switch back to draw tab
  const initDrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Set intrinsic size only if not yet set (avoids clearing user's drawing)
    if (canvas.width !== CW || canvas.height !== CH) {
      canvas.width = CW;
      canvas.height = CH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, CW, CH);
    }
  }, []);

  useEffect(() => {
    initDrawCanvas();
  }, [initDrawCanvas]);

  // Reinit when switching back to draw
  useEffect(() => {
    if (activeTab === "draw") initDrawCanvas();
  }, [activeTab, initDrawCanvas]);

  // ── Get canvas-space coordinates from mouse/touch event ───────────────────
  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ): Point => {
    const rect = canvas.getBoundingClientRect();
    // rect gives CSS display size; canvas.width/height is the buffer size
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * sx,
        y: (e.touches[0].clientY - rect.top) * sy,
      };
    }
    return {
      x: (e.clientX - rect.left) * sx,
      y: (e.clientY - rect.top) * sy,
    };
  };

  // ── Save imageData for undo ───────────────────────────────────────────────
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev.slice(-19), snap]);
    setRedoStack([]);
  }, []);

  // ── Draw: pointer down ────────────────────────────────────────────────────
  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if ("touches" in e) e.preventDefault();

      saveState();
      const pos = getPos(e, canvas);
      pointsRef.current = [pos];
      isDrawingRef.current = true;
      setHasDrawn(true);

      const ctx = canvas.getContext("2d")!;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    },
    [saveState, strokeColor, strokeWidth]
  );

  // ── Draw: pointer move (quadratic Bezier smoothing) ───────────────────────
  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawingRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      if ("touches" in e) e.preventDefault();

      const pos = getPos(e, canvas);
      const ctx = canvas.getContext("2d")!;
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
    },
    []
  );

  // ── Draw: pointer up ──────────────────────────────────────────────────────
  const stopDrawing = useCallback(() => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const pts = pointsRef.current;
        if (pts.length) {
          const last = pts[pts.length - 1];
          ctx.lineTo(last.x, last.y);
          ctx.stroke();
        }
      }
    }
    isDrawingRef.current = false;
    pointsRef.current = [];
  }, []);

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
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setUndoStack([]);
    setRedoStack([]);
  }, [saveState]);

  // ── Render typed signature on an offscreen canvas ─────────────────────────
  const renderTypeCanvas = useCallback(
    (font: string, color: string): HTMLCanvasElement => {
      const oc = document.createElement("canvas");
      oc.width = CW;
      oc.height = CH;
      const ctx = oc.getContext("2d")!;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, CW, CH);
      const fontMeta = HANDWRITTEN_FONTS.find((f) => f.value === font);
      const sizePx = FONT_SIZE[fontMeta?.size ?? "md"].canvas;
      ctx.font = `${sizePx}px '${font}', cursive`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(typedName || "Your Name", CW / 2, CH / 2);
      return oc;
    },
    [typedName]
  );

  // ── Upload image ──────────────────────────────────────────────────────────
  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: "Please upload a PNG or JPG image." });
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        setBgRemoved(false);
      };
      reader.readAsDataURL(file);
    },
    [toast]
  );

  // ── Draw uploaded image onto upload canvas ────────────────────────────────
  useEffect(() => {
    const canvas = uploadCanvasRef.current;
    if (!canvas || !uploadedImage) return;
    canvas.width = CW;
    canvas.height = CH;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, CW, CH);
      const ratio = Math.min((CW * 0.85) / img.width, (CH * 0.85) / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      ctx.drawImage(img, (CW - w) / 2, (CH - h) / 2, w, h);
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
    toast({ title: "Done!", description: "White background removed." });
  }, [toast]);

  // ── Get the active canvas for export ─────────────────────────────────────
  const getExportCanvas = useCallback((): HTMLCanvasElement | null => {
    if (activeTab === "draw") return canvasRef.current;
    if (activeTab === "type") {
      if (!selectedFont || !typedName) return null;
      return renderTypeCanvas(selectedFont, typeColor);
    }
    if (activeTab === "upload") return uploadCanvasRef.current;
    return null;
  }, [activeTab, selectedFont, typedName, typeColor, renderTypeCanvas]);

  // ── Download helpers ──────────────────────────────────────────────────────
  const downloadPNG = useCallback(() => {
    const src = getExportCanvas();
    if (!src) {
      toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." });
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
    oc.toBlob((b) => {
      if (!b) return;
      const url = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = url;
      a.download = `signature-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Downloaded!", description: "Saved as transparent PNG." });
    }, "image/png");
  }, [getExportCanvas, toast]);

  const downloadJPG = useCallback(() => {
    const src = getExportCanvas();
    if (!src) {
      toast({ title: "Nothing to export", description: "Draw, type, or upload a signature first." });
      return;
    }
    const oc = document.createElement("canvas");
    oc.width = src.width;
    oc.height = src.height;
    const ctx = oc.getContext("2d")!;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, oc.width, oc.height);
    ctx.drawImage(src, 0, 0);
    oc.toBlob(
      (b) => {
        if (!b) return;
        const url = URL.createObjectURL(b);
        const a = document.createElement("a");
        a.href = url;
        a.download = `signature-${Date.now()}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        toast({ title: "Downloaded!", description: "Saved as JPG." });
      },
      "image/jpeg",
      0.95
    );
  }, [getExportCanvas, toast]);

  // ── Preview ───────────────────────────────────────────────────────────────
  const generatePreview = useCallback(() => {
    const src = getExportCanvas();
    if (!src) {
      toast({ title: "Nothing to preview", description: "Draw, type, or upload a signature first." });
      return;
    }
    setPreviewUrl(src.toDataURL("image/png"));
  }, [getExportCanvas, toast]);

  // ── SEO ───────────────────────────────────────────────────────────────────
  useSEO({
    title: "Online Signature Generator | Draw, Type & Upload – Free",
    description:
      "Create your digital signature online for free. Draw, type, or upload your signature and export as transparent PNG, JPG, or SVG. 100% private — runs in your browser.",
    keywords:
      "online signature generator, draw signature online, create e-signature, digital signature maker, free signature tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/signature-pad-tool",
  });

  const howItWorks = [
    { step: 1, title: "Choose a Method", description: "Draw with your mouse/finger, type your name in a handwritten font, or upload a photo of your existing signature." },
    { step: 2, title: "Customize", description: "Adjust color, stroke thickness, font style, and more until it looks exactly right." },
    { step: 3, title: "Download", description: "Export as transparent PNG or white-background JPG — high-resolution and ready to use." },
  ];

  const benefits = [
    { icon: <PenTool className="h-5 w-5" />, title: "Smooth Drawing", description: "Bezier curve smoothing for natural, professional-looking signatures." },
    { icon: <Type className="h-5 w-5" />, title: "20 Handwritten Fonts", description: "Type your name and instantly see it in 20 beautiful calligraphic styles." },
    { icon: <ImageIcon className="h-5 w-5" />, title: "Upload & Clean", description: "Upload a signature photo and automatically remove the white background." },
    { icon: <Shield className="h-5 w-5" />, title: "100% Private", description: "Your signature never leaves your browser. Zero data storage, zero uploads." },
  ];

  const faqs = [
    { question: "Is my signature stored anywhere?", answer: "No. This tool is entirely client-side. Your signature data never leaves your browser and is never sent to any server." },
    { question: "Can I use this on my phone?", answer: "Yes! Touch input is fully supported for drawing signatures on mobile and tablet devices." },
    { question: "What file formats can I download?", answer: "You can download your signature as a transparent PNG or a white-background JPG." },
    { question: "How do I remove the background from an uploaded image?", answer: "Switch to the Upload tab, upload your image, then click 'Remove White Background'. It makes white/near-white pixels transparent." },
    { question: "Can I undo mistakes while drawing?", answer: "Yes! Use the Undo and Redo buttons to step back and forward through your drawing history." },
  ];

  // ── Shared canvas style ───────────────────────────────────────────────────
  const canvasStyle: React.CSSProperties = { width: "100%", height: CH, display: "block" };

  return (
    <ToolLayout
      title="Online Signature Generator"
      description="Create your digital signature online. Draw, type, or upload — export as transparent PNG or JPG. Free and 100% private."
      icon={<PenTool className="h-8 w-8" />}
      toolId="signature-pad-tool"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        {/* Privacy badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-md px-4 py-2.5">
          <Shield className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
          <span>
            Your signature is <strong>never stored</strong>. Everything runs entirely in your browser — no uploads, no servers.
          </span>
        </div>

        {/* ── TAB SELECTOR (large cards) ──────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3" data-testid="tabs-method">
          {(
            [
              { id: "draw", icon: PenTool, title: "Draw", desc: "Freehand drawing" },
              { id: "type", icon: Type, title: "Type", desc: "Pick a font style" },
              { id: "upload", icon: Upload, title: "Upload", desc: "Upload an image" },
            ] as const
          ).map(({ id, icon: Icon, title, desc }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              data-testid={`tab-${id}`}
              className={[
                "flex flex-col items-center justify-center gap-2 py-5 px-3 rounded-xl border-2 transition-all",
                "font-medium text-center cursor-pointer select-none",
                activeTab === id
                  ? "border-primary bg-primary/8 text-primary shadow-sm"
                  : "border-border bg-card text-muted-foreground hover-elevate",
              ].join(" ")}
            >
              <Icon className={`h-7 w-7 ${activeTab === id ? "text-primary" : ""}`} />
              <span className="text-base font-semibold">{title}</span>
              <span className="text-xs hidden sm:block">{desc}</span>
            </button>
          ))}
        </div>

        {/* ── DRAW TAB ────────────────────────────────────────────────────── */}
        {activeTab === "draw" && (
          <div className="space-y-4">
            {/* Controls row */}
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-1.5">
                <Label htmlFor="ink-color">Ink Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="ink-color"
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="h-9 w-14 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
                    data-testid="input-stroke-color"
                  />
                  <span className="text-xs text-muted-foreground font-mono">{strokeColor}</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-40">
                <Label>Stroke: {strokeWidth.toFixed(1)}px</Label>
                <Slider
                  min={1}
                  max={8}
                  step={0.5}
                  value={[strokeWidth]}
                  onValueChange={([v]) => setStrokeWidth(v)}
                  data-testid="slider-stroke-width"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <Button size="icon" variant="outline" onClick={undo} disabled={undoStack.length === 0} title="Undo" data-testid="button-undo">
                  <Undo2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={redo} disabled={redoStack.length === 0} title="Redo" data-testid="button-redo">
                  <Redo2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" onClick={clearDraw} disabled={!hasDrawn && undoStack.length === 0} title="Clear" data-testid="button-clear">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative rounded-xl border-2 border-dashed border-border overflow-hidden bg-white">
              <canvas
                ref={canvasRef}
                style={canvasStyle}
                className="cursor-crosshair touch-none block"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                data-testid="canvas-draw"
              />
              {!hasDrawn && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-muted-foreground/40 text-sm select-none">
                  Draw your signature here
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TYPE TAB ────────────────────────────────────────────────────── */}
        {activeTab === "type" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-1.5 flex-1 min-w-52">
                <Label htmlFor="typed-name">Your Name</Label>
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
                <Label htmlFor="type-color">Ink Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="type-color"
                    type="color"
                    value={typeColor}
                    onChange={(e) => setTypeColor(e.target.value)}
                    className="h-9 w-14 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
                    data-testid="input-type-color"
                  />
                </div>
              </div>
            </div>

            {/* Font card grid */}
            <p className="text-sm text-muted-foreground">
              {typedName
                ? `Click a style to select it, then download below.`
                : `Type your name above to preview all styles.`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
              {HANDWRITTEN_FONTS.map((font) => {
                const isSelected = selectedFont === font.value;
                return (
                  <button
                    key={font.value}
                    onClick={() => setSelectedFont(font.value)}
                    data-testid={`font-card-${font.value.replace(/ /g, "-")}`}
                    className="relative flex flex-col items-center justify-center px-4 py-5 rounded-xl border-2 transition-all cursor-pointer text-center hover-elevate"
                    style={{
                      backgroundColor: "white",
                      borderColor: isSelected ? "var(--primary)" : undefined,
                      boxShadow: isSelected ? "0 0 0 2px var(--primary, #6366f1)22" : undefined,
                    }}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 bg-primary rounded-full p-0.5">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: `'${font.value}', cursive`,
                        fontSize: FONT_SIZE[font.size].card,
                        color: typeColor,
                        lineHeight: 1.4,
                        display: "block",
                        minHeight: "52px",
                      }}
                    >
                      {typedName || "Your Name"}
                    </span>
                    <span className="mt-2 text-[11px]" style={{ color: "#888" }}>{font.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── UPLOAD TAB ──────────────────────────────────────────────────── */}
        {activeTab === "upload" && (
          <div className="space-y-4">
            <label
              htmlFor="upload-input"
              className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-xl px-6 py-12 cursor-pointer hover-elevate transition-colors text-center bg-card"
              data-testid="label-upload"
            >
              <Upload className="h-9 w-9 text-muted-foreground" />
              <span className="text-base font-medium">Click to upload or drag & drop</span>
              <span className="text-xs text-muted-foreground/70">PNG, JPG up to 10 MB</span>
              <input
                id="upload-input"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="sr-only"
                onChange={handleUpload}
                data-testid="input-upload"
              />
            </label>

            {uploadedImage && (
              <Button
                variant="outline"
                onClick={removeBackground}
                disabled={bgRemoved}
                data-testid="button-remove-bg"
              >
                <Eraser className="mr-2 h-4 w-4" />
                {bgRemoved ? "Background Removed" : "Remove White Background"}
              </Button>
            )}

            <div className="relative rounded-xl border-2 border-dashed border-border overflow-hidden bg-white">
              <canvas
                ref={uploadCanvasRef}
                style={canvasStyle}
                className="block"
                data-testid="canvas-upload"
              />
              {!uploadedImage && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-muted-foreground/40 text-sm select-none">
                  Upload preview will appear here
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── EXPORT ──────────────────────────────────────────────────────── */}
        <div className="border-t pt-5">
          <p className="text-sm font-semibold mb-3 flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            Export Your Signature
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={downloadPNG} data-testid="button-download-png">
              <Download className="mr-2 h-4 w-4" />
              PNG (Transparent)
            </Button>
            <Button onClick={downloadJPG} variant="outline" data-testid="button-download-jpg">
              <Download className="mr-2 h-4 w-4" />
              JPG (White BG)
            </Button>
            <Button onClick={generatePreview} variant="ghost" data-testid="button-preview">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>

        {/* ── LIVE PREVIEW ─────────────────────────────────────────────────── */}
        {previewUrl && (
          <div className="space-y-4 border-t pt-5">
            <p className="text-sm font-semibold flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Preview
            </p>
            {/* Document mockup */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">Document / Contract</p>
              <div className="bg-white dark:bg-zinc-900 border rounded-xl p-6 shadow-sm space-y-3">
                <div className="space-y-2">
                  {[3, 4, 3.5, 2.5].map((w, i) => (
                    <div key={i} className="h-2 rounded-full bg-muted" style={{ width: `${w / 4 * 100}%` }} />
                  ))}
                </div>
                <div className="border-t pt-4">
                  <p className="text-[10px] text-muted-foreground mb-1">Authorized Signature</p>
                  <img src={previewUrl} alt="Signature preview" className="h-16 object-contain" data-testid="img-preview-doc" />
                  <div className="mt-1 h-px w-40 bg-border" />
                </div>
              </div>
            </div>

            {/* Email mockup */}
            <div className="space-y-1.5">
              <p className="text-xs text-muted-foreground">Email Footer</p>
              <div className="bg-white dark:bg-zinc-900 border rounded-xl p-4 shadow-sm flex items-center gap-4 flex-wrap">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <PenTool className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="h-2 w-28 rounded-full bg-muted" />
                  <div className="h-2 w-20 rounded-full bg-muted/60" />
                </div>
                <img src={previewUrl} alt="Email signature" className="h-10 object-contain" data-testid="img-preview-email" />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
