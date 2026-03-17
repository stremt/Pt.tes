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
  Sliders,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Handwritten-style Google Fonts ─────────────────────────────────────────
const HANDWRITTEN_FONTS = [
  { label: "Dancing Script", value: "Dancing Script" },
  { label: "Great Vibes", value: "Great Vibes" },
  { label: "Pacifico", value: "Pacifico" },
  { label: "Sacramento", value: "Sacramento" },
  { label: "Satisfy", value: "Satisfy" },
  { label: "Alex Brush", value: "Alex Brush" },
  { label: "Allura", value: "Allura" },
  { label: "Clicker Script", value: "Clicker Script" },
  { label: "Cookie", value: "Cookie" },
  { label: "Courgette", value: "Courgette" },
  { label: "Caveat", value: "Caveat" },
  { label: "Kaushan Script", value: "Kaushan Script" },
  { label: "Lobster", value: "Lobster" },
  { label: "Marck Script", value: "Marck Script" },
  { label: "Parisienne", value: "Parisienne" },
  { label: "Pinyon Script", value: "Pinyon Script" },
  { label: "Playball", value: "Playball" },
  { label: "Qwitcher Grypen", value: "Qwitcher Grypen" },
  { label: "Vibes", value: "Vibes" },
  { label: "Yellowtail", value: "Yellowtail" },
];

// ─── Canvas resolution multiplier ───────────────────────────────────────────
const SCALE = 2;
const CANVAS_W = 800;
const CANVAS_H = 300;

// ─── Point type for Bezier smoothing ────────────────────────────────────────
interface Point {
  x: number;
  y: number;
}

export default function SignaturePadTool() {
  // ─── Draw tab state ──────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#1a1a1a");
  const [strokeWidth, setStrokeWidth] = useState(2.5);
  const [undoStack, setUndoStack] = useState<ImageData[]>([]);
  const [redoStack, setRedoStack] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Bezier smoothing: keep last 4 points
  const pointsRef = useRef<Point[]>([]);
  const lastPosRef = useRef<Point>({ x: 0, y: 0 });

  // ─── Type tab state ──────────────────────────────────────────────────────
  const typeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState("Dancing Script");
  const [fontSize, setFontSize] = useState(64);
  const [letterSpacing, setLetterSpacing] = useState(2);
  const [typeColor, setTypeColor] = useState("#1a1a1a");

  // ─── Upload tab state ────────────────────────────────────────────────────
  const uploadCanvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [bgRemoved, setBgRemoved] = useState(false);

  // ─── Active tab ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("draw");

  // ─── Preview mode ────────────────────────────────────────────────────────
  const [showPreview, setShowPreview] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  const { toast } = useToast();

  // ─── Load Google Fonts dynamically ──────────────────────────────────────
  useEffect(() => {
    const fontNames = HANDWRITTEN_FONTS.map((f) =>
      f.value.replace(/ /g, "+")
    ).join("|");
    const existing = document.getElementById("signature-gfonts");
    if (!existing) {
      const link = document.createElement("link");
      link.id = "signature-gfonts";
      link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${fontNames}&display=swap`;
      document.head.appendChild(link);
    }
  }, []);

  // ─── Init draw canvas ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = CANVAS_W * SCALE;
    canvas.height = CANVAS_H * SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(SCALE, SCALE);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  // ─── Get canvas position adjusted for scale ──────────────────────────────
  const getPos = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ): Point => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // ─── Save state for undo ─────────────────────────────────────────────────
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev.slice(-19), imageData]);
    setRedoStack([]);
  }, []);

  // ─── Draw: start ─────────────────────────────────────────────────────────
  const startDrawing = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      if ("touches" in e) e.preventDefault();
      const pos = getPos(e, canvas);
      saveState();
      pointsRef.current = [pos];
      lastPosRef.current = pos;
      setIsDrawing(true);
      setHasDrawn(true);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    },
    [saveState, strokeColor, strokeWidth]
  );

  // ─── Draw: move (Bezier smoothing via quadratic curves) ──────────────────
  const draw = useCallback(
    (
      e:
        | React.MouseEvent<HTMLCanvasElement>
        | React.TouchEvent<HTMLCanvasElement>
    ) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      if ("touches" in e) e.preventDefault();

      const pos = getPos(e, canvas);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      pointsRef.current.push(pos);
      const pts = pointsRef.current;

      if (pts.length >= 3) {
        const last = pts[pts.length - 1];
        const prev = pts[pts.length - 2];
        const mid = { x: (prev.x + last.x) / 2, y: (prev.y + last.y) / 2 };
        ctx.quadraticCurveTo(prev.x, prev.y, mid.x, mid.y);
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
    [isDrawing]
  );

  // ─── Draw: stop ──────────────────────────────────────────────────────────
  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const pts = pointsRef.current;
        if (pts.length > 0) {
          const last = pts[pts.length - 1];
          ctx.lineTo(last.x, last.y);
          ctx.stroke();
        }
      }
    }
    pointsRef.current = [];
    setIsDrawing(false);
  }, [isDrawing]);

  // ─── Undo ────────────────────────────────────────────────────────────────
  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRedoStack((prev) => [...prev, current]);
    const prev = undoStack[undoStack.length - 1];
    ctx.putImageData(prev, 0, 0);
    setUndoStack((s) => s.slice(0, -1));
    if (undoStack.length === 1) setHasDrawn(false);
  }, [undoStack]);

  // ─── Redo ────────────────────────────────────────────────────────────────
  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack((prev) => [...prev, current]);
    const next = redoStack[redoStack.length - 1];
    ctx.putImageData(next, 0, 0);
    setRedoStack((s) => s.slice(0, -1));
    setHasDrawn(true);
  }, [redoStack]);

  // ─── Clear draw canvas ───────────────────────────────────────────────────
  const clearDrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    saveState();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    setHasDrawn(false);
    setUndoStack([]);
    setRedoStack([]);
  }, [saveState]);

  // ─── Render type signature onto canvas ──────────────────────────────────
  useEffect(() => {
    const canvas = typeCanvasRef.current;
    if (!canvas) return;
    canvas.width = CANVAS_W * SCALE;
    canvas.height = CANVAS_H * SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(SCALE, SCALE);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    if (!typedName.trim()) return;

    ctx.font = `${fontSize}px '${selectedFont}', cursive`;
    ctx.fillStyle = typeColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    (ctx as unknown as { letterSpacing: string }).letterSpacing = `${letterSpacing}px`;

    ctx.fillText(typedName, CANVAS_W / 2, CANVAS_H / 2);
  }, [typedName, selectedFont, fontSize, letterSpacing, typeColor]);

  // ─── Upload: handle file ─────────────────────────────────────────────────
  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file", description: "Please upload an image (PNG/JPG)." });
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

  // ─── Draw uploaded image onto canvas ────────────────────────────────────
  useEffect(() => {
    const canvas = uploadCanvasRef.current;
    if (!canvas || !uploadedImage) return;
    canvas.width = CANVAS_W * SCALE;
    canvas.height = CANVAS_H * SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(SCALE, SCALE);

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      const ratio = Math.min(CANVAS_W / img.width, CANVAS_H / img.height) * 0.85;
      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (CANVAS_W - w) / 2;
      const y = (CANVAS_H - h) / 2;
      ctx.drawImage(img, x, y, w, h);
    };
    img.src = uploadedImage;
  }, [uploadedImage]);

  // ─── Remove white background from upload ────────────────────────────────
  const removeBackground = useCallback(() => {
    const canvas = uploadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const threshold = 230;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r > threshold && g > threshold && b > threshold) {
        data[i + 3] = 0;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);
    setBgRemoved(true);
    toast({ title: "Background removed", description: "White areas made transparent." });
  }, [toast]);

  // ─── Get active canvas reference ─────────────────────────────────────────
  const getActiveCanvas = useCallback((): HTMLCanvasElement | null => {
    if (activeTab === "draw") return canvasRef.current;
    if (activeTab === "type") return typeCanvasRef.current;
    if (activeTab === "upload") return uploadCanvasRef.current;
    return null;
  }, [activeTab]);

  // ─── Generate preview ────────────────────────────────────────────────────
  const generatePreview = useCallback(() => {
    const canvas = getActiveCanvas();
    if (!canvas) return;
    setPreviewDataUrl(canvas.toDataURL("image/png"));
    setShowPreview(true);
  }, [getActiveCanvas]);

  // ─── Export helpers ──────────────────────────────────────────────────────
  const downloadPNG = useCallback(() => {
    const canvas = getActiveCanvas();
    if (!canvas) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(canvas, 0, 0);

    // Make white pixels transparent for transparent PNG
    const imageData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(imageData, 0, 0);

    offscreen.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `signature-${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast({ title: "Downloaded!", description: "Signature saved as transparent PNG." });
      }
    }, "image/png");
  }, [getActiveCanvas, toast]);

  const downloadJPG = useCallback(() => {
    const canvas = getActiveCanvas();
    if (!canvas) return;

    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, offscreen.width, offscreen.height);
    ctx.drawImage(canvas, 0, 0);

    offscreen.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `signature-${Date.now()}.jpg`;
          a.click();
          URL.revokeObjectURL(url);
          toast({ title: "Downloaded!", description: "Signature saved as JPG." });
        }
      },
      "image/jpeg",
      0.95
    );
  }, [getActiveCanvas, toast]);

  const downloadSVG = useCallback(() => {
    const canvas = getActiveCanvas();
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS_W}" height="${CANVAS_H}">
  <image href="${dataUrl}" width="${CANVAS_W}" height="${CANVAS_H}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `signature-${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded!", description: "Signature saved as SVG." });
  }, [getActiveCanvas, toast]);

  // ─── SEO ─────────────────────────────────────────────────────────────────
  useSEO({
    title: "Online Signature Generator | Draw, Type & Upload – Free",
    description:
      "Create your digital signature online for free. Draw, type, or upload your signature and export as transparent PNG, JPG, or SVG. 100% private — runs in your browser.",
    keywords:
      "online signature generator, draw signature online, create e-signature, digital signature maker, free signature tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/signature-pad-tool",
  });

  // ─── ToolLayout metadata ─────────────────────────────────────────────────
  const howItWorks = [
    {
      step: 1,
      title: "Choose a Method",
      description: "Draw with your mouse/finger, type your name in a handwritten font, or upload a photo of your signature.",
    },
    {
      step: 2,
      title: "Customize",
      description: "Adjust color, stroke thickness, font style, size, and spacing until it looks exactly right.",
    },
    {
      step: 3,
      title: "Download",
      description: "Export as transparent PNG, white-background JPG, or SVG — high-resolution and ready to use anywhere.",
    },
  ];

  const benefits = [
    {
      icon: <PenTool className="h-5 w-5" />,
      title: "Smooth Drawing",
      description: "Bezier curve smoothing for natural, professional signatures.",
    },
    {
      icon: <Type className="h-5 w-5" />,
      title: "20 Handwritten Fonts",
      description: "Type your name and pick from premium calligraphic fonts.",
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: "Upload & Clean",
      description: "Upload a photo and remove the white background automatically.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "100% Private",
      description: "Your signature never leaves your browser. Zero data storage.",
    },
  ];

  const faqs = [
    {
      question: "Is my signature stored anywhere?",
      answer:
        "No. This tool is entirely client-side. Your signature data never leaves your browser and is never sent to any server.",
    },
    {
      question: "Can I use this on my phone?",
      answer:
        "Yes! Touch input is fully supported for drawing signatures on mobile and tablet devices.",
    },
    {
      question: "What file formats can I download?",
      answer:
        "You can download your signature as a transparent PNG, a white-background JPG, or an SVG file.",
    },
    {
      question: "How do I remove the background from an uploaded signature?",
      answer:
        "Switch to the Upload tab, upload your image, then click 'Remove White Background'. It applies a threshold filter to make white/near-white pixels transparent.",
    },
    {
      question: "Can I undo mistakes while drawing?",
      answer: "Yes! Use the Undo and Redo buttons to step back and forth through your drawing history.",
    },
  ];

  // ─── Shared canvas class ─────────────────────────────────────────────────
  const canvasClass =
    "w-full cursor-crosshair touch-none rounded-md bg-white border border-dashed border-border";

  return (
    <ToolLayout
      title="Online Signature Generator"
      description="Create your digital signature online. Draw, type, or upload — export as transparent PNG, JPG, or SVG. Free and 100% private."
      icon={<PenTool className="h-8 w-8" />}
      toolId="signature-pad-tool"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        {/* Privacy badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 rounded-md px-4 py-2">
          <Shield className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
          <span>
            Your signature is <strong>never stored</strong>. Everything runs
            entirely in your browser — no uploads, no servers.
          </span>
        </div>

        {/* ── TABS ─────────────────────────────────────────────────────────── */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3" data-testid="tabs-method">
            <TabsTrigger value="draw" data-testid="tab-draw">
              <PenTool className="h-4 w-4 mr-2" />
              Draw
            </TabsTrigger>
            <TabsTrigger value="type" data-testid="tab-type">
              <Type className="h-4 w-4 mr-2" />
              Type
            </TabsTrigger>
            <TabsTrigger value="upload" data-testid="tab-upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>

          {/* ── DRAW TAB ───────────────────────────────────────────────────── */}
          <TabsContent value="draw" className="space-y-4 mt-4">
            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stroke-color">Ink Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    id="stroke-color"
                    type="color"
                    value={strokeColor}
                    onChange={(e) => setStrokeColor(e.target.value)}
                    className="h-9 w-14 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
                    data-testid="input-stroke-color"
                  />
                  <span className="text-sm text-muted-foreground font-mono">
                    {strokeColor}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Stroke Width: {strokeWidth.toFixed(1)}px</Label>
                <Slider
                  min={1}
                  max={8}
                  step={0.5}
                  value={[strokeWidth]}
                  onValueChange={([v]) => setStrokeWidth(v)}
                  data-testid="slider-stroke-width"
                />
              </div>

              <div className="flex items-end gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={undo}
                  disabled={undoStack.length === 0}
                  title="Undo"
                  data-testid="button-undo"
                >
                  <Undo2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={redo}
                  disabled={redoStack.length === 0}
                  title="Redo"
                  data-testid="button-redo"
                >
                  <Redo2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={clearDrawCanvas}
                  disabled={!hasDrawn && undoStack.length === 0}
                  title="Clear"
                  data-testid="button-clear-draw"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Canvas */}
            <div className="relative">
              <canvas
                ref={canvasRef}
                style={{ height: CANVAS_H, width: "100%", display: "block" }}
                className={canvasClass}
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
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-muted-foreground/50 text-sm select-none">
                  Draw your signature here
                </div>
              )}
            </div>
          </TabsContent>

          {/* ── TYPE TAB ───────────────────────────────────────────────────── */}
          <TabsContent value="type" className="space-y-4 mt-4">
            <div className="space-y-2">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Font Style</Label>
                <Select
                  value={selectedFont}
                  onValueChange={setSelectedFont}
                >
                  <SelectTrigger data-testid="select-font">
                    <SelectValue placeholder="Pick a font" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {HANDWRITTEN_FONTS.map((f) => (
                      <SelectItem
                        key={f.value}
                        value={f.value}
                        style={{ fontFamily: `'${f.value}', cursive` }}
                      >
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ink Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={typeColor}
                    onChange={(e) => setTypeColor(e.target.value)}
                    className="h-9 w-14 rounded-md border border-border cursor-pointer bg-transparent p-0.5"
                    data-testid="input-type-color"
                  />
                  <span className="text-sm text-muted-foreground font-mono">
                    {typeColor}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Font Size: {fontSize}px</Label>
                <Slider
                  min={32}
                  max={120}
                  step={4}
                  value={[fontSize]}
                  onValueChange={([v]) => setFontSize(v)}
                  data-testid="slider-font-size"
                />
              </div>

              <div className="space-y-2">
                <Label>Letter Spacing: {letterSpacing}px</Label>
                <Slider
                  min={-4}
                  max={20}
                  step={1}
                  value={[letterSpacing]}
                  onValueChange={([v]) => setLetterSpacing(v)}
                  data-testid="slider-letter-spacing"
                />
              </div>
            </div>

            {/* Type canvas preview */}
            <canvas
              ref={typeCanvasRef}
              style={{ height: CANVAS_H, width: "100%", display: "block" }}
              className={canvasClass}
              data-testid="canvas-type"
            />

            {!typedName && (
              <p className="text-center text-sm text-muted-foreground -mt-2">
                Type your name above to see the preview
              </p>
            )}
          </TabsContent>

          {/* ── UPLOAD TAB ─────────────────────────────────────────────────── */}
          <TabsContent value="upload" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="upload-input">Upload Signature Image (PNG or JPG)</Label>
              <label
                htmlFor="upload-input"
                className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border rounded-md px-6 py-10 cursor-pointer hover-elevate transition-colors text-center"
                data-testid="label-upload"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-muted-foreground/60">PNG, JPG up to 10MB</span>
                <input
                  id="upload-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="sr-only"
                  onChange={handleUpload}
                  data-testid="input-upload"
                />
              </label>
            </div>

            {uploadedImage && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="default"
                  onClick={removeBackground}
                  disabled={bgRemoved}
                  data-testid="button-remove-bg"
                >
                  <Eraser className="mr-2 h-4 w-4" />
                  {bgRemoved ? "Background Removed" : "Remove White Background"}
                </Button>
              </div>
            )}

            {/* Upload preview canvas */}
            <canvas
              ref={uploadCanvasRef}
              style={{ height: CANVAS_H, width: "100%", display: "block" }}
              className={canvasClass}
              data-testid="canvas-upload"
            />
            {!uploadedImage && (
              <p className="text-center text-sm text-muted-foreground -mt-2">
                Upload an image to preview it here
              </p>
            )}
          </TabsContent>
        </Tabs>

        {/* ── EXPORT SECTION ───────────────────────────────────────────────── */}
        <div className="border-t pt-5">
          <p className="text-sm font-medium mb-3 flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            Export Signature
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={downloadPNG}
              size="default"
              data-testid="button-download-png"
            >
              <Download className="mr-2 h-4 w-4" />
              PNG (Transparent)
            </Button>
            <Button
              onClick={downloadJPG}
              size="default"
              variant="outline"
              data-testid="button-download-jpg"
            >
              <Download className="mr-2 h-4 w-4" />
              JPG (White BG)
            </Button>
            <Button
              onClick={downloadSVG}
              size="default"
              variant="outline"
              data-testid="button-download-svg"
            >
              <Download className="mr-2 h-4 w-4" />
              SVG
            </Button>
            <Button
              onClick={generatePreview}
              size="default"
              variant="ghost"
              data-testid="button-preview"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </div>

        {/* ── LIVE PREVIEW ─────────────────────────────────────────────────── */}
        {showPreview && previewDataUrl && (
          <div className="space-y-4 border-t pt-5">
            <p className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Preview
            </p>

            {/* Document mockup */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Document / Contract</p>
              <div className="bg-white dark:bg-zinc-900 border rounded-md p-6 shadow-sm space-y-4">
                <div className="space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-muted" />
                  <div className="h-2 w-full rounded-full bg-muted" />
                  <div className="h-2 w-5/6 rounded-full bg-muted" />
                  <div className="h-2 w-2/3 rounded-full bg-muted" />
                </div>
                <div className="border-t pt-4">
                  <p className="text-[10px] text-muted-foreground mb-1">Signature</p>
                  <img
                    src={previewDataUrl}
                    alt="Signature preview on document"
                    className="h-16 object-contain"
                    data-testid="img-preview-document"
                  />
                  <div className="mt-1 h-px w-48 bg-border" />
                </div>
              </div>
            </div>

            {/* Email signature mockup */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Email Signature</p>
              <div className="bg-white dark:bg-zinc-900 border rounded-md p-4 shadow-sm flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <PenTool className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="h-2 w-32 rounded-full bg-muted" />
                  <div className="h-2 w-24 rounded-full bg-muted/60" />
                </div>
                <img
                  src={previewDataUrl}
                  alt="Signature preview in email"
                  className="h-10 object-contain"
                  data-testid="img-preview-email"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
