import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema } from "@/lib/seo";
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

// Logical canvas dimensions (drawing coordinate space)
const CW = 800;
const CH = 260;
// Export scale: internal buffer is EXPORT_SCALE × larger → high-res downloads
const EXPORT_SCALE = 4; // 3200 × 1040 px output

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
  // Buffer is EXPORT_SCALE × larger than display; ctx.scale maps drawing
  // coords to 0–CW × 0–CH while the actual pixel buffer is 4× that.
  const initDrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const BW = CW * EXPORT_SCALE;
    const BH = CH * EXPORT_SCALE;
    // Only reinitialise when not yet sized (avoids clearing user's drawing)
    if (canvas.width !== BW || canvas.height !== BH) {
      canvas.width = BW;
      canvas.height = BH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Scale so all draw calls use logical 0–CW × 0–CH coordinates
      ctx.scale(EXPORT_SCALE, EXPORT_SCALE);
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
    // Map CSS pixels → logical drawing coords (0–CW × 0–CH).
    // ctx.scale(EXPORT_SCALE) already maps these to the 4× buffer internally.
    const sx = CW / rect.width;
    const sy = CH / rect.height;
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
    // Use logical coords — ctx.scale(EXPORT_SCALE) maps to the full buffer
    ctx.fillRect(0, 0, CW, CH);
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
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, BW, BH);
      const fontMeta = HANDWRITTEN_FONTS.find((f) => f.value === font);
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
    // 4× high-res buffer for crisp exports
    const BW = CW * EXPORT_SCALE;
    const BH = CH * EXPORT_SCALE;
    canvas.width = BW;
    canvas.height = BH;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, BW, BH);
      const ratio = Math.min((BW * 0.85) / img.width, (BH * 0.85) / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      ctx.drawImage(img, (BW - w) / 2, (BH - h) / 2, w, h);
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
  const CANONICAL = "https://tools.pixocraft.in/tools/signature-pad-tool";
  useSEO({
    title: "Online Signature Generator (Draw, Type, Upload) – Free PNG Download | Pixocraft",
    description:
      "Create your digital signature online instantly. Draw, type, or upload and download as transparent PNG or JPG. 100% free, private, and runs entirely in your browser. No signup required.",
    keywords:
      "online signature generator, signature maker free, digital signature online, handwritten signature generator, e signature maker, create signature online, draw signature, type signature, free e-signature",
    canonicalUrl: CANONICAL,
  });

  const howItWorks = [
    { step: 1, title: "Choose a Method", description: "Draw with your mouse/finger, type your name in a handwritten font, or upload a photo of your existing signature." },
    { step: 2, title: "Customize", description: "Adjust color, stroke thickness, font style, and more until it looks exactly right." },
    { step: 3, title: "Download", description: "Export as transparent PNG or white-background JPG — high-resolution and ready to use." },
  ];

  const benefits = [
    { icon: <PenTool className="h-5 w-5" />, title: "Smooth Drawing", description: "Bezier curve smoothing for natural, professional-looking signatures." },
    { icon: <Type className="h-5 w-5" />, title: "50+ Handwritten Fonts", description: "Type your name and instantly see it in 50+ beautiful calligraphic styles." },
    { icon: <ImageIcon className="h-5 w-5" />, title: "Upload & Clean", description: "Upload a signature photo and automatically remove the white background." },
    { icon: <Shield className="h-5 w-5" />, title: "100% Private", description: "Your signature never leaves your browser. Zero data storage, zero uploads." },
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
      question: "Can I use this on my phone or tablet?",
      answer: "Yes! Touch input is fully supported for drawing signatures on mobile and tablet devices. The canvas recognizes multi-touch and single-touch strokes for a natural feel.",
    },
    {
      question: "What file formats can I download?",
      answer: "You can download your signature as a transparent PNG (ideal for overlaying on documents and images) or a white-background JPG (best for email footers and documents that don't support transparency).",
    },
    {
      question: "How do I remove the background from an uploaded signature?",
      answer: "Switch to the Upload tab, upload your PNG or JPG image, then click 'Remove White Background'. The tool uses pixel-level threshold logic to make white and near-white areas transparent.",
    },
    {
      question: "Can I undo mistakes while drawing?",
      answer: "Yes! Use the Undo and Redo buttons to step back and forward through your drawing history at any point during your session.",
    },
    {
      question: "How do I add my signature to a PDF?",
      answer: "Download your signature as a transparent PNG, then use a PDF editor (such as Adobe Acrobat, PDFescape, or Pixocraft's PDF tools) to insert the image onto your document.",
    },
    {
      question: "What resolution is the downloaded signature?",
      answer: "Exports are rendered at 4× the display resolution (3200×1040 px) for crisp, print-quality output suitable for both digital and printed documents.",
    },
  ];

  // ── Schema markup ─────────────────────────────────────────────────────────
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Online Signature Generator – Pixocraft",
    description:
      "Create your digital signature online for free. Draw, type, or upload and download as transparent PNG or JPG. 100% private — runs entirely in your browser.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { price: "0", priceCurrency: "USD" },
  });
  const faqSchema = generateFAQSchema(faqs);

  // ── Shared canvas style ───────────────────────────────────────────────────
  const canvasStyle: React.CSSProperties = { width: "100%", height: CH, display: "block" };

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Online Signature Generator (Free &amp; Private)"
        description="Create your digital signature online. Draw, type, or upload — export as transparent PNG or JPG. Free and 100% private."
        icon={<PenTool className="h-8 w-8" />}
        toolId="signature-pad-tool"
        category="utility"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
      <div className="space-y-6">
        {/* Trust badges + privacy notice */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-md px-4 py-2.5">
            <Shield className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
            <span>
              Your signature is <strong>never stored</strong>. Everything runs entirely in your browser — no uploads, no servers.
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Shield className="h-3.5 w-3.5" />, label: "100% Private" },
              { icon: <Check className="h-3.5 w-3.5" />, label: "No Signup Required" },
              { icon: <Check className="h-3.5 w-3.5" />, label: "Free Forever" },
              { icon: <Check className="h-3.5 w-3.5" />, label: "High-Res Export" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
              >
                {icon}
                {label}
              </span>
            ))}
          </div>
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
        {/* ── SEO CONTENT SECTION ──────────────────────────────────────────── */}
        <div className="border-t pt-8 mt-4 space-y-10 text-sm leading-relaxed">

          {/* H2 - What is */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">What is an Online Signature Generator?</h2>
            <p className="text-muted-foreground mb-3">
              An <strong>online signature generator</strong> is a browser-based tool that lets you create a personal signature digitally — without needing to print, sign, and scan a document. You can draw your signature with a mouse or touchscreen, type your name in a handwritten font, or upload a photo of your existing signature and have the white background automatically removed.
            </p>
            <p className="text-muted-foreground">
              Modern digital signatures are widely accepted for contracts, agreements, onboarding forms, and email footers. Pixocraft's <strong>signature maker</strong> is 100% client-side, meaning your data never leaves your device — making it one of the most privacy-friendly <strong>e-signature makers</strong> available.
            </p>
          </section>

          {/* H2 - How to */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">How to Create a Digital Signature Online</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li><strong>Choose your method:</strong> Select the Draw, Type, or Upload tab depending on how you want to create your signature.</li>
              <li><strong>Customise appearance:</strong> For drawing — adjust stroke thickness and ink color. For typing — pick one of 50+ handwritten fonts. For uploads — remove the background automatically.</li>
              <li><strong>Preview your signature:</strong> Hit the Preview button to see how it looks in a document or email footer context.</li>
              <li><strong>Download:</strong> Click "PNG (Transparent)" for a clear-background file ready to overlay on any document, or "JPG (White BG)" for standard use.</li>
            </ol>
          </section>

          {/* H2 - Draw vs Type vs Upload */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Draw vs. Type vs. Upload — Which Method Should You Use?</h2>
            <div className="space-y-3 text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground mb-1">Draw Signature</p>
                <p>Best for users who want a personal, handwritten feel. Use a mouse on desktop or your finger on a touchscreen device. Bezier curve smoothing makes your strokes look natural and polished, unlike the jagged lines you get from raw mouse input. Undo/redo support means you can refine until it's perfect.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Type Signature</p>
                <p>Ideal when you want a consistent, legible signature across multiple documents without the variability of hand-drawing. Choose from 50+ handwritten fonts spanning elegant thin scripts, bold marker styles, casual everyday handwriting, and formal calligraphy. The font is rendered at 4× resolution so it's always crisp.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Upload Signature</p>
                <p>Perfect if you already have a physical signature you love. Photograph or scan it, upload the image, and use the white background removal feature to extract just the ink — giving you a clean transparent PNG suitable for any document or colour background.</p>
              </div>
            </div>
          </section>

          {/* H2 - Where to use */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Where Can You Use Digital Signatures?</h2>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li><strong>PDF documents:</strong> Insert your downloaded PNG into contracts, NDAs, offer letters, and invoices using a PDF editor or{" "}
                <Link href="/tools/pdf-merger" className="text-primary underline-offset-2 hover:underline">Pixocraft's PDF tools</Link>.
              </li>
              <li><strong>Email footers:</strong> Add a personal touch to your professional email sign-off with a transparent PNG signature.</li>
              <li><strong>Google Docs / Word:</strong> Insert → Image to place your signature on any document.</li>
              <li><strong>Online forms:</strong> Many web-based forms accept an uploaded image as a signature field.</li>
              <li><strong>Images and graphics:</strong> Combine your signature with{" "}
                <Link href="/tools/background-remover" className="text-primary underline-offset-2 hover:underline">background removal</Link>{" "}
                or{" "}
                <Link href="/tools/image-to-pdf" className="text-primary underline-offset-2 hover:underline">image-to-PDF conversion</Link>{" "}
                for professional output.
              </li>
              <li><strong>Social profiles and branding:</strong> Use your signature as a watermark on photos or creative work.</li>
            </ul>
          </section>

          {/* H2 - Legality */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Is an Online Signature Legal?</h2>
            <p className="text-muted-foreground mb-3">
              In many jurisdictions, yes. Electronic signatures carry legal weight under multiple international laws:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground mb-3">
              <li><strong>USA:</strong> ESIGN Act (2000) and UETA grant e-signatures the same legal effect as handwritten signatures for most commercial and personal contracts.</li>
              <li><strong>European Union:</strong> eIDAS Regulation (2016) establishes a tiered framework of electronic signatures accepted across all EU member states.</li>
              <li><strong>India:</strong> The Information Technology Act 2000 and the IT (Amendment) Act 2008 recognise electronic signatures for contracts and agreements.</li>
              <li><strong>UK:</strong> Electronic Communications Act 2000 and subsequent guidance confirm that e-signatures are legally binding.</li>
            </ul>
            <p className="text-muted-foreground">
              For routine business documents, a simple digital signature generated here is generally sufficient. For high-value legal documents — such as wills, real estate deeds, or notarised agreements — consult a legal professional and consider a qualified electronic signature (QES) platform.
            </p>
          </section>

          {/* H2 - Tips */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Tips for Creating a Professional Digital Signature</h2>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Use a consistent ink color — dark blue or black reads best on printed and digital documents.</li>
              <li>Keep it concise — a shorter, flowing signature is more legible and harder to forge.</li>
              <li>For drawn signatures, increase stroke thickness slightly (3–4 px) to ensure it remains visible when scaled down.</li>
              <li>For typed signatures, try the ultra-thin elegant script fonts for a formal tone, or marker-style fonts for a casual professional look.</li>
              <li>Always export as PNG with transparent background so your signature looks natural on any document background colour.</li>
              <li>Save your exported file in a secure location — you may need it repeatedly for contracts and forms.</li>
            </ul>
          </section>

          {/* H2 - Why Pixocraft */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Why Use Pixocraft's Signature Generator?</h2>
            <p className="text-muted-foreground mb-3">
              Unlike many online <strong>signature maker free</strong> tools, Pixocraft's generator runs entirely in your browser using the HTML5 Canvas API. There are no server uploads, no third-party analytics on your signature data, and no paywalls.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li><strong>High-resolution output</strong> — exports at 3200×1040 px (4× scale) for crisp results on screen and in print.</li>
              <li><strong>50+ diverse fonts</strong> — spanning 7 style categories to cover every professional need.</li>
              <li><strong>Bezier smoothing</strong> — hand-drawn strokes look natural, not blocky.</li>
              <li><strong>No account needed</strong> — open the tool, create, download. Done.</li>
              <li><strong>Completely free</strong> — no hidden costs, no watermarks, no trial periods.</li>
              <li><strong>Privacy first</strong> — your signature never touches our servers.</li>
            </ul>
          </section>

          {/* Internal links */}
          <section className="border rounded-md p-4 bg-muted/30">
            <p className="font-semibold text-foreground mb-2">Related Tools</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-muted-foreground">
              <Link href="/tools/pdf-merger" className="text-primary underline-offset-2 hover:underline text-sm">PDF Merger</Link>
              <Link href="/tools/pdf-to-image" className="text-primary underline-offset-2 hover:underline text-sm">PDF to Image</Link>
              <Link href="/tools/image-to-pdf" className="text-primary underline-offset-2 hover:underline text-sm">Image to PDF</Link>
              <Link href="/tools/background-remover" className="text-primary underline-offset-2 hover:underline text-sm">Background Remover</Link>
              <Link href="/tools/pdf-compressor" className="text-primary underline-offset-2 hover:underline text-sm">PDF Compressor</Link>
            </div>
          </section>

        </div>
      </div>
    </ToolLayout>
    </>
  );
}
