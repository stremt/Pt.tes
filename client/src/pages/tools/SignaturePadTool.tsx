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

  // ── Sticky download visibility ─────────────────────────────────────────────
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      {/* ── STICKY DOWNLOAD BUTTON ─────────────────────────────────────────── */}
      {showSticky && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-1"
          data-testid="sticky-download-bar"
        >
          <Button
            size="lg"
            onClick={downloadPNG}
            className="shadow-lg px-6"
            data-testid="button-sticky-download"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Your Signature Now
          </Button>
          <span className="text-[11px] text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full px-3 py-0.5">
            No signup &nbsp;·&nbsp; Free forever &nbsp;·&nbsp; Private
          </span>
        </div>
      )}

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
          <div className="flex gap-1 p-1 rounded-lg bg-muted/50 border" data-testid="tabs-method">
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
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md text-sm font-semibold transition-all cursor-pointer select-none",
                  activeTab === id
                    ? "bg-background text-foreground shadow-sm border"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{title}</span>
                <span className={`hidden sm:inline text-xs font-normal ${activeTab === id ? "text-muted-foreground" : "text-muted-foreground/60"}`}>· {desc}</span>
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
                        "relative flex flex-col items-center justify-center px-4 py-4 rounded-lg border transition-all cursor-pointer text-center",
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/30"
                          : "border-border bg-white dark:bg-zinc-950 hover-elevate",
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
        <div className="border-t pt-8 mt-4 space-y-12 text-sm leading-relaxed">

          {/* ── Signature Examples & Ideas ─────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-1 text-foreground">Signature Examples &amp; Ideas</h2>
            <p className="text-muted-foreground mb-5">
              Not sure what style suits you? Browse these handwritten signature styles — each represents a different aesthetic you can recreate using the Type tab above.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {([
                { label: "Stylish Elegant",  font: "Great Vibes",     name: "Alexandra J.",  note: "Flowing thin script — ideal for formal documents" },
                { label: "Classic Cursive",  font: "Pinyon Script",   name: "David Miller",  note: "Traditional cursive — timeless professional look" },
                { label: "Bold & Modern",    font: "Pacifico",        name: "Chris Park",    note: "Bold signature — stands out on contracts" },
                { label: "Minimal Clean",    font: "Satisfy",         name: "Priya Sharma",  note: "Simple and modern — great for email footers" },
                { label: "Casual Everyday",  font: "Caveat",          name: "Sam Roberts",   note: "Natural handwriting — approachable and personal" },
                { label: "Formal Calligraphy", font: "IM Fell English", name: "Dr. E. Watson", note: "Formal and authoritative — suits academic use" },
              ] as const).map(({ label, font, name, note }) => (
                <div key={label} className="border rounded-md p-3 bg-card space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
                  <p
                    style={{ fontFamily: `'${font}', cursive`, fontSize: "1.6rem", lineHeight: 1.3 }}
                    className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-4">
              To recreate any of these styles, switch to the <strong>Type</strong> tab, type your name, and browse the font grid — all 50+ fonts are free and export at full resolution.
            </p>
          </section>

          {/* ── PDF / Documents / Email guide ──────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-1 text-foreground">Create Signature for PDF, Documents &amp; Email</h2>
            <p className="text-muted-foreground mb-5">
              Once you've created your <strong>digital signature online</strong>, here's exactly how to use it across the most common platforms.
            </p>
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Add signature to PDF</p>
                  <p className="text-muted-foreground">
                    Download your signature as a transparent PNG. Open your PDF in{" "}
                    <Link href="/tools/pdf-merger" className="text-primary underline-offset-2 hover:underline">Pixocraft's PDF tools</Link>,
                    Adobe Acrobat, or Smallpdf. Use the "Insert Image" or "Stamp" feature to place your <strong>signature for PDF</strong> directly onto the document over the signature line. Resize as needed and save.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <FileImage className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Insert signature into Word or Google Docs</p>
                  <p className="text-muted-foreground">
                    Download the transparent PNG and open your document. In <strong>Microsoft Word</strong>: Insert → Pictures → select your file. In <strong>Google Docs</strong>: Insert → Image → Upload from computer. Position the image over the signature area, resize, and set text wrap to "In front of text" for precise placement. Then{" "}
                    <Link href="/tools/image-to-pdf" className="text-primary underline-offset-2 hover:underline">convert to PDF</Link>{" "}
                    when done.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Use as an email signature image</p>
                  <p className="text-muted-foreground">
                    Your <strong>email signature image</strong> should be a transparent PNG exported at a reasonable display size. In <strong>Gmail</strong>: Settings → See all settings → Signature → Insert image. In <strong>Outlook</strong>: File → Options → Mail → Signatures → insert picture. Keep the height around 60–80 px at display size for a clean look in any inbox.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── What is ────────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">What is an Online Signature Generator?</h2>
            <p className="text-muted-foreground mb-3">
              An <strong>online signature generator</strong> is a browser-based tool that lets you create a personal signature digitally — without printing, signing, and scanning. You can draw your signature with a mouse or touchscreen, type your name in a handwritten font, or upload a photo of your existing signature and have the white background automatically removed.
            </p>
            <p className="text-muted-foreground">
              Modern digital signatures are accepted for contracts, agreements, onboarding forms, and email footers worldwide. Pixocraft's <strong>free signature maker</strong> is 100% client-side, meaning your data never leaves your device — making it one of the most privacy-friendly <strong>e-signature makers</strong> available online.
            </p>
          </section>

          {/* ── How to ─────────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">How to Create a Digital Signature Online — Step by Step</h2>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li><strong>Choose your method:</strong> Select Draw (freehand), Type (50+ fonts), or Upload (from a photo).</li>
              <li><strong>Customise:</strong> Adjust ink color and stroke thickness for drawing, pick a font for typing, or remove the background for uploads.</li>
              <li><strong>Preview:</strong> Click Preview to see your <strong>digital signature online</strong> on a simulated document and email footer.</li>
              <li><strong>Download instantly:</strong> PNG (transparent background) or JPG (white background) — no watermark, no signup.</li>
            </ol>
          </section>

          {/* ── Draw vs Type vs Upload vs AI ───────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Draw vs Type vs Upload vs AI – Which One is Best for You?</h2>
            <p className="text-muted-foreground mb-4">
              Every user has a different workflow. Here's an honest breakdown so you can pick the right method in seconds:
            </p>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-2.5 font-semibold text-foreground">Method</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-foreground">Pros</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-foreground">Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">Draw</td>
                    <td className="px-4 py-3">Personal feel</td>
                    <td className="px-4 py-3">Natural, unique, touchscreen support</td>
                    <td className="px-4 py-3">Takes more time to perfect</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">Type</td>
                    <td className="px-4 py-3">Consistent &amp; fast</td>
                    <td className="px-4 py-3">50+ fonts, always legible, reproducible</td>
                    <td className="px-4 py-3">Less personal than handwriting</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">Upload</td>
                    <td className="px-4 py-3">Reuse existing signature</td>
                    <td className="px-4 py-3">Background auto-removed, high-res output</td>
                    <td className="px-4 py-3">Photo quality can affect result</td>
                  </tr>
                  <tr className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">AI <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-semibold ml-1">2026</span></td>
                    <td className="px-4 py-3">Instant 10 styles, zero effort</td>
                    <td className="px-4 py-3">Beautiful results, Pixocraft exclusive</td>
                    <td className="px-4 py-3">Style is AI-generated, not hand-drawn</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <strong>Quick pick:</strong> New user? Start with Type. Have an existing signature? Use Upload. Want maximum personalisation? Draw it. Looking for the most beautiful result instantly? Try AI styles.
            </p>
          </section>

          {/* ── Where to use ───────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Where to Use Your Pixocraft Signature</h2>
            <p className="text-muted-foreground mb-3">
              Your downloaded PNG works everywhere a physical signature would — and in many more places besides. Here are the most common use cases:
            </p>
            <ul className="space-y-2.5 text-muted-foreground">
              <li className="flex gap-2"><span className="shrink-0 mt-0.5 text-primary font-bold">✓</span><span><strong>GST Invoices &amp; E-way Bills</strong> — Paste your signature image onto GST invoices in Tally, Zoho Books, or any billing software that supports image insertion.</span></li>
              <li className="flex gap-2"><span className="shrink-0 mt-0.5 text-primary font-bold">✓</span><span><strong>NDAs, Offer Letters &amp; Contracts</strong> — Download as transparent PNG and insert into any Word or Google Docs contract. <Link href="/tools/image-to-pdf" className="text-primary underline-offset-2 hover:underline">Convert to PDF</Link> when done.</span></li>
              <li className="flex gap-2"><span className="shrink-0 mt-0.5 text-primary font-bold">✓</span><span><strong>PDF Documents</strong> — Use <Link href="/tools/pdf-merger" className="text-primary underline-offset-2 hover:underline">Pixocraft PDF tools</Link> or Adobe Acrobat's "Insert Image" to place your signature directly over a signature line.</span></li>
              <li className="flex gap-2"><span className="shrink-0 mt-0.5 text-primary font-bold">✓</span><span><strong>Google Docs &amp; Microsoft Word</strong> — Insert → Image → Upload from computer. Set text wrap to "In front of text" for precise placement.</span></li>
              <li className="flex gap-2"><span className="shrink-0 mt-0.5 text-primary font-bold">✓</span><span><strong>Email Footers (Gmail, Outlook)</strong> — A transparent PNG in your email signature adds professionalism to every message you send.</span></li>
              <li className="flex gap-2"><span className="shrink-0 mt-0.5 text-primary font-bold">✓</span><span><strong>Online Forms &amp; Aadhaar-Linked Services</strong> — Many government portals and HR onboarding flows accept image-based signatures in PNG format.</span></li>
              <li className="flex gap-2"><span className="shrink-0 mt-0.5 text-primary font-bold">✓</span><span><strong>Creative Branding &amp; Watermarks</strong> — Use your signature as a logo watermark on photos, portfolios, and design work. <Link href="/tools/background-remover" className="text-primary underline-offset-2 hover:underline">Remove background</Link> first for the cleanest result.</span></li>
            </ul>
          </section>

          {/* ── Legality ───────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Is Online Signature Legal in India &amp; Worldwide?</h2>
            <p className="text-muted-foreground mb-4">
              Yes — in most jurisdictions an electronic signature image carries the same legal weight as a handwritten one for routine business documents. Here's what the law says by region:
            </p>
            <div className="space-y-2.5 text-muted-foreground mb-4">
              <div className="border rounded-md p-3 bg-card space-y-1">
                <p className="font-semibold text-foreground">India 🇮🇳</p>
                <p><strong>Information Technology Act 2000 + IT (Amendment) Act 2008</strong> — Fully legal for contracts, GST invoices, Aadhaar-linked documents, company agreements, and most commercial transactions. The IT Act defines an "electronic signature" broadly enough to include PNG-based image signatures when both parties consent.</p>
              </div>
              <div className="border rounded-md p-3 bg-card space-y-1">
                <p className="font-semibold text-foreground">United States 🇺🇸</p>
                <p><strong>ESIGN Act (2000) + UETA</strong> — Electronic signatures have the same legal effect as handwritten ones for most contracts and agreements.</p>
              </div>
              <div className="border rounded-md p-3 bg-card space-y-1">
                <p className="font-semibold text-foreground">European Union 🇪🇺</p>
                <p><strong>eIDAS Regulation (2016)</strong> — Tiered framework (SES / AES / QES) accepted across all EU member states. Image signatures qualify as Simple Electronic Signatures (SES).</p>
              </div>
              <div className="border rounded-md p-3 bg-card space-y-1">
                <p className="font-semibold text-foreground">United Kingdom 🇬🇧</p>
                <p><strong>Electronic Communications Act 2000</strong> — Legally binding for most agreements.</p>
              </div>
            </div>

            <p className="text-sm font-semibold text-foreground mb-2">Simple Digital Signature vs Qualified Electronic Signature (QES)</p>
            <div className="overflow-x-auto rounded-md border mb-4">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-4 py-2.5 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-foreground">Simple Digital Signature</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-foreground">Qualified (QES / DSC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted-foreground">
                  <tr><td className="px-4 py-2.5">Cost</td><td className="px-4 py-2.5">Free</td><td className="px-4 py-2.5">Paid CA certificate</td></tr>
                  <tr><td className="px-4 py-2.5">Setup time</td><td className="px-4 py-2.5">Seconds</td><td className="px-4 py-2.5">Days (KYC required)</td></tr>
                  <tr><td className="px-4 py-2.5">Use case</td><td className="px-4 py-2.5">Contracts, invoices, HR forms</td><td className="px-4 py-2.5">Govt filings, MCA, court docs</td></tr>
                  <tr><td className="px-4 py-2.5">India acceptance</td><td className="px-4 py-2.5">Most commercial use</td><td className="px-4 py-2.5">Required for specific govt portals</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm">
              <strong>Bottom line:</strong> For routine business — NDAs, employment contracts, GST invoices, freelance agreements — this <strong>free signature maker</strong> is entirely sufficient. For court submissions, MCA ROC filings, or property registrations, consult a legal professional and obtain a DSC.
            </p>
          </section>

          {/* ── Tips ───────────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Tips for a Professional Digital Signature</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { tip: "Use dark blue or black ink", detail: "These colours read best on printed and digital documents alike, and are universally accepted in legal and corporate contexts." },
                { tip: "Set stroke width to 3–4 px", detail: "For drawn signatures, thicker strokes remain visible when the image is scaled down inside PDFs or email footers." },
                { tip: "Choose font style by context", detail: "Thin elegant scripts (Great Vibes, Pinyon) suit formal documents. Bold markers (Pacifico, Lobster) work for creative or casual use." },
                { tip: "Always download as transparent PNG", detail: "A transparent background lets your signature sit cleanly on any document colour — white, cream, or coloured paper." },
                { tip: "Keep a master copy", detail: "Save your high-resolution PNG (3200×1040 px) in a secure folder. You'll use it repeatedly for contracts, GST invoices, and forms." },
                { tip: "Test at small sizes", detail: "Before finalising, preview your signature at the size it will appear on documents (roughly 40–80 px tall). Ensure it remains legible." },
              ].map(({ tip, detail }) => (
                <div key={tip} className="border rounded-md p-3 bg-card space-y-1">
                  <p className="font-semibold text-foreground text-sm">{tip}</p>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Signature Examples ─────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Signature Examples &amp; Ideas</h2>
            <p className="text-muted-foreground mb-3">
              Not sure where to start? Here are popular signature styles used by professionals around the world — all achievable with the Type tab above:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { style: "Stylish / Elegant", desc: "Use thin script fonts like Great Vibes or Sacramento. Perfect for artists, designers, and creative professionals who want a sophisticated, flowing mark.", font: "Great Vibes" },
                { style: "Minimal / Modern", desc: "Clean, legible fonts like Caveat or Handlee. Ideal for tech professionals, consultants, and anyone who values clarity over flourish.", font: "Caveat" },
                { style: "Bold / Confident", desc: "Strong scripts like Pacifico or Lobster. Great for business owners, executives, and anyone who wants their signature to command attention.", font: "Pacifico" },
                { style: "Professional / Corporate", desc: "Classic scripts like Dancing Script or Merienda. Universally trusted for contracts, NDAs, and formal correspondence.", font: "Dancing Script" },
              ].map(({ style, desc, font }) => (
                <div key={style} className="border rounded-md p-4 space-y-2 bg-card">
                  <p className="font-semibold text-foreground text-sm">{style}</p>
                  <p
                    className="text-muted-foreground"
                    style={{ fontFamily: `'${font}', cursive`, fontSize: "clamp(22px, 4vw, 32px)", lineHeight: 1.3 }}
                  >
                    Alex Johnson
                  </p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => trySignatureStyle(font, "Alex Johnson")}
                    data-testid={`button-example-${style.replace(/[^a-z]/gi, "-").toLowerCase()}`}
                  >
                    Try This Style
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Why Pixocraft ──────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl font-bold mb-3 text-foreground">Why Use This Online Signature Generator?</h2>
            <p className="text-muted-foreground mb-3">
              Unlike most <strong>signature maker free</strong> tools, Pixocraft's <strong>online signature generator</strong> runs entirely in your browser — no server uploads, no data collection, no paywalls.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li><strong>3200×1040 px output</strong> — 4× scale for crisp print and screen quality.</li>
              <li><strong>50+ fonts in 7 categories</strong> — covers every professional style need.</li>
              <li><strong>Bezier smoothing</strong> — drawn strokes look natural, not pixelated.</li>
              <li><strong>No account required</strong> — open, create, download in under 60 seconds.</li>
              <li><strong>Free forever</strong> — no watermarks, no limits, no hidden fees.</li>
              <li><strong>Privacy by design</strong> — your signature never touches any server.</li>
            </ul>
          </section>

          {/* ── Related tools + EEAT footer ────────────────────────────────── */}
          <section className="border rounded-md p-4 bg-muted/30 space-y-3">
            <p className="font-semibold text-foreground">Related Tools</p>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              <Link href="/tools/pdf-merger"          className="text-primary underline-offset-2 hover:underline text-sm">PDF Merger</Link>
              <Link href="/tools/pdf-to-image"        className="text-primary underline-offset-2 hover:underline text-sm">PDF to Image</Link>
              <Link href="/tools/image-to-pdf"        className="text-primary underline-offset-2 hover:underline text-sm">Image to PDF</Link>
              <Link href="/tools/background-remover"  className="text-primary underline-offset-2 hover:underline text-sm">Background Remover</Link>
              <Link href="/tools/pdf-compressor"      className="text-primary underline-offset-2 hover:underline text-sm">PDF Compressor</Link>
              <Link href="/tools/pdf-watermark-adder" className="text-primary underline-offset-2 hover:underline text-sm">PDF Watermark</Link>
            </div>
            <p className="text-xs text-muted-foreground pt-1 border-t">
              Last Updated: March 2026 &nbsp;·&nbsp; Made in India &nbsp;·&nbsp; By the Pixocraft Team
            </p>
          </section>

        </div>
      </div>
    </ToolLayout>
    </>
  );
}
