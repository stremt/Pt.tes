import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
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
      ctx.scale(EXPORT_SCALE, EXPORT_SCALE);
      ctx.clearRect(0, 0, CW, CH);
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
    },
    [typedName]
  );

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
                  <Button size="icon" variant="ghost" onClick={clearDraw} disabled={!hasDrawn && undoStack.length === 0} title="Clear canvas" data-testid="button-clear" className="text-destructive/70 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

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
                  <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 select-none">
                    <PenTool className="h-6 w-6 text-muted-foreground/20" />
                    <span className="text-sm text-muted-foreground/35">Draw your signature here</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── TYPE TAB ──────────────────────────────────────────────────── */}
          {activeTab === "type" && (
            <div className="space-y-4">
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
                      data-testid={`font-card-${font.value.replace(/ /g, "-")}`}
                      className={[
                        "relative flex flex-col items-center justify-center px-4 py-4 rounded-lg border transition-all cursor-pointer text-center bg-white",
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
                      <span
                        style={{
                          fontFamily: `'${font.value}', cursive`,
                          fontSize: FONT_SIZE[font.size].card,
                          color: typeColor,
                          lineHeight: 1.3,
                          display: "block",
                          minHeight: "46px",
                        }}
                      >
                        {typedName || "Your Name"}
                      </span>
                      <span className="mt-1.5 text-[10px] text-muted-foreground">{font.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

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
                  <p className="text-xs text-muted-foreground mt-0.5">PNG or JPG — up to 10 MB</p>
                </div>
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

          {/* ── EXPORT PANEL ──────────────────────────────────────────────── */}
          <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-transparent p-4 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-sm font-semibold flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  Download Your Signature
                </p>
                <p className="text-xs text-muted-foreground">No watermark · Instant · Works offline</p>
              </div>
              <Button onClick={generatePreview} variant="ghost" size="sm" data-testid="button-preview">
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Preview
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={downloadPNG} size="lg" className="flex-1 sm:flex-none" data-testid="button-download-png">
                <Download className="mr-2 h-4 w-4" />
                PNG — Transparent
              </Button>
              <Button onClick={downloadJPG} variant="outline" className="flex-1 sm:flex-none" data-testid="button-download-jpg">
                <Download className="mr-2 h-4 w-4" />
                JPG — White BG
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
              <div className="bg-white border rounded-xl p-6 shadow-sm space-y-3">
                <div className="space-y-2">
                  {[3, 4, 3.5, 2.5].map((w, i) => (
                    <div key={i} className="h-2 rounded-full bg-zinc-200" style={{ width: `${w / 4 * 100}%` }} />
                  ))}
                </div>
                <div className="border-t border-zinc-200 pt-4">
                  <p className="text-[10px] text-zinc-400 mb-1">Authorized Signature</p>
                  <img src={previewUrl} alt="Signature preview" className="h-16 object-contain" data-testid="img-preview-doc" />
                  <div className="mt-1 h-px w-40 bg-zinc-200" />
                </div>
              </div>
            </div>

            {/* Email mockup */}
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
                <img src={previewUrl} alt="Email signature" className="h-10 object-contain" data-testid="img-preview-email" />
              </div>
            </div>
          </div>
        )}
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
    </>
  );
}
