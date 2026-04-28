import { Link } from "wouter";
import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Download,
  X,
  Crop as CropIcon,
  RotateCcw,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Undo2,
  Redo2,
  Layers,
  Instagram,
  Linkedin,
  Youtube,
  FileImage,
  IdCard,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/Breadcrumb";

type AspectKey = "free" | "1:1" | "4:5" | "16:9" | "9:16" | "a4" | "passport";
type OutputFormat = "image/jpeg" | "image/png" | "image/webp";
type Mode = "single" | "batch";

const ASPECTS: { key: AspectKey; label: string; ratio: number | null }[] = [
  { key: "free", label: "Free", ratio: null },
  { key: "1:1", label: "1:1", ratio: 1 },
  { key: "4:5", label: "4:5", ratio: 4 / 5 },
  { key: "16:9", label: "16:9", ratio: 16 / 9 },
  { key: "9:16", label: "9:16", ratio: 9 / 16 },
  { key: "a4", label: "A4", ratio: 210 / 297 },
  { key: "passport", label: "Passport", ratio: 35 / 45 },
];

interface SmartTemplate {
  key: string;
  label: string;
  icon: any;
  aspect: AspectKey;
  outW: number;
  outH: number;
  hint: string;
}

const SMART_TEMPLATES: SmartTemplate[] = [
  { key: "ig-dp", label: "Instagram DP", icon: Instagram, aspect: "1:1", outW: 320, outH: 320, hint: "320×320" },
  { key: "ig-post", label: "Instagram Post", icon: Instagram, aspect: "1:1", outW: 1080, outH: 1080, hint: "1080×1080" },
  { key: "ig-story", label: "Instagram Story", icon: Instagram, aspect: "9:16", outW: 1080, outH: 1920, hint: "1080×1920" },
  { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, aspect: "1:1", outW: 400, outH: 400, hint: "400×400" },
  { key: "youtube", label: "YouTube Thumbnail", icon: Youtube, aspect: "16:9", outW: 1280, outH: 720, hint: "1280×720" },
  { key: "resume", label: "Resume Photo", icon: FileImage, aspect: "passport", outW: 413, outH: 531, hint: "35×45 mm" },
  { key: "passport", label: "Passport / Aadhaar", icon: IdCard, aspect: "passport", outW: 413, outH: 531, hint: "35×45 mm" },
];

const MAX_BATCH = 10;

interface BatchItem {
  id: string;
  name: string;
  url: string;
  natW: number;
  natH: number;
}

interface HistoryEntry {
  crop: CropBox;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  zoom: number;
  aspect: AspectKey;
}

type DragMode =
  | "move"
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw"
  | null;

interface CropBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function ImageCropper() {
  useSEO({
    title: "Image Cropper Online | Crop, Rotate, Flip & Resize Images Free",
    description:
      "Crop images in your browser with drag-to-select, preset aspect ratios (1:1, 4:5, 16:9, A4, Passport), rotate, flip, zoom and export as JPG, PNG or WebP. 100% private — no upload.",
    keywords:
      "image cropper, crop image online, instagram crop, aspect ratio crop, photo crop tool, rotate flip image, image resize",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-cropper",
  });

  const { toast } = useToast();

  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [imgNatural, setImgNatural] = useState({ w: 0, h: 0 });

  const [aspect, setAspect] = useState<AspectKey>("free");
  const [rotation, setRotation] = useState(0); // degrees, multiples of 90
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [zoom, setZoom] = useState(1);

  const [format, setFormat] = useState<OutputFormat>("image/png");
  const [quality, setQuality] = useState(0.92);

  // crop in displayed coordinates (relative to the rendered image element)
  const [crop, setCrop] = useState<CropBox>({ x: 0, y: 0, w: 0, h: 0 });
  const [displaySize, setDisplaySize] = useState({ w: 0, h: 0 });

  // Mode + smart template
  const [mode, setMode] = useState<Mode>("single");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  // Batch state
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [batchProcessing, setBatchProcessing] = useState(false);

  // History (undo/redo)
  const [past, setPast] = useState<HistoryEntry[]>([]);
  const [future, setFuture] = useState<HistoryEntry[]>([]);
  const skipHistoryRef = useRef(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const dragRef = useRef<{
    mode: DragMode;
    startX: number;
    startY: number;
    startBox: CropBox;
  } | null>(null);

  // Aspect ratio of the rendered image (after rotation)
  const rotated = rotation % 180 !== 0;
  const renderedNatural = rotated
    ? { w: imgNatural.h, h: imgNatural.w }
    : { w: imgNatural.w, h: imgNatural.h };

  const initCrop = useCallback(
    (dispW: number, dispH: number, ratioKey: AspectKey = aspect) => {
      const ratio = ASPECTS.find((a) => a.key === ratioKey)?.ratio ?? null;
      let w = dispW * 0.8;
      let h = dispH * 0.8;
      if (ratio) {
        // fit ratio inside 80% of display
        if (w / h > ratio) {
          w = h * ratio;
        } else {
          h = w / ratio;
        }
      }
      const x = (dispW - w) / 2;
      const y = (dispH - h) / 2;
      setCrop({ x, y, w, h });
    },
    [aspect],
  );

  // ===== History helpers =====
  const snapshot = useCallback(
    (): HistoryEntry => ({
      crop: { ...crop },
      rotation,
      flipH,
      flipV,
      zoom,
      aspect,
    }),
    [crop, rotation, flipH, flipV, zoom, aspect],
  );

  const pushHistory = useCallback(() => {
    if (skipHistoryRef.current) return;
    setPast((p) => [...p.slice(-49), snapshot()]);
    setFuture([]);
  }, [snapshot]);

  const applyEntry = (e: HistoryEntry) => {
    skipHistoryRef.current = true;
    setCrop(e.crop);
    setRotation(e.rotation);
    setFlipH(e.flipH);
    setFlipV(e.flipV);
    setZoom(e.zoom);
    setAspect(e.aspect);
    requestAnimationFrame(() => {
      skipHistoryRef.current = false;
    });
  };

  const undo = () => {
    setPast((p) => {
      if (p.length === 0) return p;
      const prev = p[p.length - 1];
      setFuture((f) => [snapshot(), ...f].slice(0, 50));
      applyEntry(prev);
      return p.slice(0, -1);
    });
  };

  const redo = () => {
    setFuture((f) => {
      if (f.length === 0) return f;
      const next = f[0];
      setPast((p) => [...p.slice(-49), snapshot()]);
      applyEntry(next);
      return f.slice(1);
    });
  };

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!imageUrl) return;
      const meta = e.ctrlKey || e.metaKey;
      if (meta && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((meta && e.key.toLowerCase() === "y") || (meta && e.shiftKey && e.key.toLowerCase() === "z")) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, past, future, snapshot]);

  const measureAndInit = useCallback(() => {
    const img = imageRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    setDisplaySize({ w: rect.width, h: rect.height });
    initCrop(rect.width, rect.height);
  }, [initCrop]);

  // Re-measure on resize
  useEffect(() => {
    if (!imageUrl) return;
    const onResize = () => {
      const img = imageRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const oldW = displaySize.w;
      const oldH = displaySize.h;
      setDisplaySize({ w: rect.width, h: rect.height });
      if (oldW > 0 && oldH > 0 && rect.width > 0 && rect.height > 0) {
        const sx = rect.width / oldW;
        const sy = rect.height / oldH;
        setCrop((c) => ({ x: c.x * sx, y: c.y * sy, w: c.w * sx, h: c.h * sy }));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [imageUrl, displaySize.w, displaySize.h]);

  // When rotation/zoom changes, re-measure after the image transforms
  useEffect(() => {
    if (!imageUrl) return;
    const id = window.setTimeout(() => {
      const img = imageRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      setDisplaySize({ w: rect.width, h: rect.height });
      initCrop(rect.width, rect.height);
    }, 50);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation, zoom, imageUrl]);

  // When aspect changes, refit crop to current display
  useEffect(() => {
    if (!displaySize.w || !displaySize.h) return;
    initCrop(displaySize.w, displaySize.h, aspect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspect]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setImgNatural({ w: img.width, h: img.height });
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
        setZoom(1);
        setImageUrl(result);
        setFileName(file.name);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Drag & resize logic
  const onPointerDown = (e: React.PointerEvent, mode: DragMode) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pushHistory();
    dragRef.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      startBox: { ...crop },
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag || !drag.mode) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const ratio = ASPECTS.find((a) => a.key === aspect)?.ratio ?? null;
    const minSize = 20;

    let { x, y, w, h } = drag.startBox;

    if (drag.mode === "move") {
      x = drag.startBox.x + dx;
      y = drag.startBox.y + dy;
    } else {
      const m = drag.mode;
      let newX = x;
      let newY = y;
      let newW = w;
      let newH = h;

      if (m.includes("e")) newW = Math.max(minSize, w + dx);
      if (m.includes("s")) newH = Math.max(minSize, h + dy);
      if (m.includes("w")) {
        newW = Math.max(minSize, w - dx);
        newX = x + (w - newW);
      }
      if (m.includes("n")) {
        newH = Math.max(minSize, h - dy);
        newY = y + (h - newH);
      }

      if (ratio) {
        const ms = m as string;
        // Pure vertical handles: drive width from height. Otherwise drive height from width.
        if (ms === "n" || ms === "s") {
          newW = newH * ratio;
        } else {
          newH = newW / ratio;
        }
        // re-anchor for west/north handles so the opposite edge stays put
        if (ms.includes("w")) newX = x + w - newW;
        if (ms.includes("n")) newY = y + h - newH;
      }

      x = newX;
      y = newY;
      w = newW;
      h = newH;
    }

    // Clamp inside display bounds
    const dW = displaySize.w;
    const dH = displaySize.h;
    if (w > dW) {
      const factor = dW / w;
      w = dW;
      h = h * factor;
    }
    if (h > dH) {
      const factor = dH / h;
      h = dH;
      w = w * factor;
    }
    x = Math.max(0, Math.min(x, dW - w));
    y = Math.max(0, Math.min(y, dH - h));

    setCrop({ x, y, w, h });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  // Render preview canvas from current crop + transforms
  const renderToCanvas = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (!imgNatural.w || !imgNatural.h || !displaySize.w || !displaySize.h) return;
      const img = imageRef.current;
      if (!img) return;

      // Map display coords -> rendered-natural coords (post-rotation)
      const scaleX = renderedNatural.w / displaySize.w;
      const scaleY = renderedNatural.h / displaySize.h;
      const sx = crop.x * scaleX;
      const sy = crop.y * scaleY;
      const sw = crop.w * scaleX;
      const sh = crop.h * scaleY;

      canvas.width = Math.max(1, Math.round(sw));
      canvas.height = Math.max(1, Math.round(sh));

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill background for JPEG (no alpha)
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Build a transformed source: translate, rotate, flip, then drawImage of the natural image
      // Strategy: draw onto a temp canvas at rendered-natural size first, then crop from it.
      const temp = document.createElement("canvas");
      temp.width = renderedNatural.w;
      temp.height = renderedNatural.h;
      const tctx = temp.getContext("2d");
      if (!tctx) return;

      tctx.save();
      tctx.translate(temp.width / 2, temp.height / 2);
      tctx.rotate((rotation * Math.PI) / 180);
      tctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      tctx.drawImage(img, -imgNatural.w / 2, -imgNatural.h / 2, imgNatural.w, imgNatural.h);
      tctx.restore();

      ctx.drawImage(temp, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    },
    [crop, displaySize.w, displaySize.h, imgNatural, renderedNatural, rotation, flipH, flipV, format],
  );

  // Update preview canvas reactively
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    renderToCanvas(canvas);
  }, [renderToCanvas]);

  const handleDownload = () => {
    if (!imageUrl) return;
    // Render fresh to be safe
    const canvas = document.createElement("canvas");
    renderToCanvas(canvas);
    if (!canvas.width || !canvas.height) {
      toast({ title: "Nothing to crop", description: "Please select a crop area", variant: "destructive" });
      return;
    }
    const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
    const base = (fileName || "image").replace(/\.[^.]+$/, "");
    const useQuality = format === "image/jpeg" || format === "image/webp";
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `cropped-${base}.${ext}`;
        link.click();
        URL.revokeObjectURL(url);
        toast({ title: "Downloaded", description: `Saved as ${ext.toUpperCase()}` });
      },
      format,
      useQuality ? quality : undefined,
    );
  };

  const clear = () => {
    setImageUrl("");
    setFileName("");
    setImgNatural({ w: 0, h: 0 });
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoom(1);
    setCrop({ x: 0, y: 0, w: 0, h: 0 });
    setActiveTemplate(null);
    setPast([]);
    setFuture([]);
  };

  const resetTransforms = () => {
    pushHistory();
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setZoom(1);
  };

  const handleRotateLeft = () => {
    pushHistory();
    setRotation((r) => (r - 90 + 360) % 360);
  };
  const handleRotateRight = () => {
    pushHistory();
    setRotation((r) => (r + 90) % 360);
  };
  const toggleFlipH = () => {
    pushHistory();
    setFlipH((v) => !v);
  };
  const toggleFlipV = () => {
    pushHistory();
    setFlipV((v) => !v);
  };
  const handleSetAspect = (k: AspectKey) => {
    pushHistory();
    setActiveTemplate(null);
    setAspect(k);
  };
  const handleZoom = (v: number) => {
    // Don't push every drag tick; throttle by checking change is meaningful
    if (Math.abs(v - zoom) > 0.001) pushHistory();
    setZoom(v);
  };

  // Smart template applies aspect ratio + remembers output dimensions
  const applyTemplate = (tpl: SmartTemplate) => {
    pushHistory();
    setActiveTemplate(tpl.key);
    setAspect(tpl.aspect);
    toast({ title: tpl.label, description: `Crop set to ${tpl.hint}` });
  };

  // ===== Batch =====
  const handleBatchSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const remaining = MAX_BATCH - batchItems.length;
    if (remaining <= 0) {
      toast({ title: "Batch full", description: `Max ${MAX_BATCH} images`, variant: "destructive" });
      return;
    }
    const accepted = files.filter((f) => f.type.startsWith("image/")).slice(0, remaining);
    accepted.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        const im = new Image();
        im.onload = () => {
          setBatchItems((prev) => [
            ...prev,
            { id: `${Date.now()}-${Math.random()}`, name: file.name, url, natW: im.width, natH: im.height },
          ]);
        };
        im.src = url;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeBatchItem = (id: string) => {
    setBatchItems((prev) => prev.filter((b) => b.id !== id));
  };

  const clearBatch = () => setBatchItems([]);

  const cropBatchItem = (item: BatchItem): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const im = new Image();
      im.onload = () => {
        const ratio = ASPECTS.find((a) => a.key === aspect)?.ratio ?? null;
        const tpl = SMART_TEMPLATES.find((t) => t.key === activeTemplate);
        // Determine source crop centered (auto)
        let srcW = im.width;
        let srcH = im.height;
        if (ratio) {
          if (im.width / im.height > ratio) {
            // wider than ratio, trim width
            srcH = im.height;
            srcW = srcH * ratio;
          } else {
            srcW = im.width;
            srcH = srcW / ratio;
          }
        }
        const sx = (im.width - srcW) / 2;
        const sy = (im.height - srcH) / 2;
        // Output canvas size: template dimensions if set, otherwise source crop dims
        const outW = tpl?.outW ?? Math.round(srcW);
        const outH = tpl?.outH ?? Math.round(srcH);
        const canvas = document.createElement("canvas");
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        if (format === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, outW, outH);
        }
        // Apply rotation/flip on the source first
        const tmp = document.createElement("canvas");
        const rot = rotation % 180 !== 0;
        tmp.width = rot ? im.height : im.width;
        tmp.height = rot ? im.width : im.height;
        const tctx = tmp.getContext("2d")!;
        tctx.translate(tmp.width / 2, tmp.height / 2);
        tctx.rotate((rotation * Math.PI) / 180);
        tctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
        tctx.drawImage(im, -im.width / 2, -im.height / 2);
        // Recompute source crop from transformed dims
        const tw = tmp.width;
        const th = tmp.height;
        let sw = tw;
        let sh = th;
        if (ratio) {
          if (tw / th > ratio) {
            sh = th;
            sw = sh * ratio;
          } else {
            sw = tw;
            sh = sw / ratio;
          }
        }
        const sx2 = (tw - sw) / 2;
        const sy2 = (th - sh) / 2;
        ctx.drawImage(tmp, sx2, sy2, sw, sh, 0, 0, outW, outH);
        const useQuality = format === "image/jpeg" || format === "image/webp";
        canvas.toBlob((b) => resolve(b), format, useQuality ? quality : undefined);
        // sx, sy unused but kept for clarity
        void sx;
        void sy;
      };
      im.onerror = () => resolve(null);
      im.src = item.url;
    });
  };

  const downloadBatch = async () => {
    if (batchItems.length === 0) return;
    setBatchProcessing(true);
    const ext = format === "image/jpeg" ? "jpg" : format === "image/webp" ? "webp" : "png";
    try {
      for (const item of batchItems) {
        const blob = await cropBatchItem(item);
        if (!blob) continue;
        const base = item.name.replace(/\.[^.]+$/, "");
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `cropped-${base}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        await new Promise((r) => setTimeout(r, 250));
      }
      toast({ title: "Batch complete", description: `Cropped ${batchItems.length} images` });
    } finally {
      setBatchProcessing(false);
    }
  };

  // Image transform style
  const imgTransform = `scale(${zoom}) rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`;

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Tools", url: "/tools/image" },
            { label: "Image Cropper" },
          ]}
        />
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">Image Cropper</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag to select, lock to a preset aspect ratio, rotate, flip and export — all in your browser.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md border p-1 gap-1 bg-muted">
            <Button
              size="sm"
              variant={mode === "single" ? "default" : "ghost"}
              onClick={() => setMode("single")}
              data-testid="button-mode-single"
            >
              <CropIcon className="mr-2 h-4 w-4" />
              Single Image
            </Button>
            <Button
              size="sm"
              variant={mode === "batch" ? "default" : "ghost"}
              onClick={() => setMode("batch")}
              data-testid="button-mode-batch"
            >
              <Layers className="mr-2 h-4 w-4" />
              Batch ({batchItems.length}/{MAX_BATCH})
            </Button>
          </div>
        </div>

        {mode === "batch" ? (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 flex-wrap">
                  <div>
                    <CardTitle>Batch Upload</CardTitle>
                    <CardDescription>
                      Up to {MAX_BATCH} images — same crop ratio applied (centered) to each
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {batchItems.length > 0 && (
                      <Button variant="outline" size="sm" onClick={clearBatch} data-testid="button-batch-clear">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear
                      </Button>
                    )}
                    <Button
                      onClick={downloadBatch}
                      disabled={batchItems.length === 0 || batchProcessing}
                      data-testid="button-batch-download"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {batchProcessing ? "Processing..." : "Crop & Download All"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-md cursor-pointer hover-elevate active-elevate-2 transition-all mb-4">
                    <Upload className="w-10 h-10 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Click to add images</span> ({MAX_BATCH - batchItems.length} slots left)
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WebP</p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleBatchSelect}
                      data-testid="input-batch-files"
                    />
                  </label>

                  {batchItems.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-8">No images yet</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {batchItems.map((b) => (
                        <div
                          key={b.id}
                          className="relative border rounded-md overflow-hidden bg-muted group"
                          data-testid={`batch-item-${b.id}`}
                        >
                          <img src={b.url} alt={b.name} className="w-full h-32 object-cover" />
                          <div className="p-2 text-xs truncate" title={b.name}>
                            {b.name}
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-7 w-7"
                            onClick={() => removeBatchItem(b.id)}
                            data-testid={`button-remove-${b.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Smart Templates
                  </CardTitle>
                  <CardDescription>One-click presets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {SMART_TEMPLATES.map((tpl) => {
                      const Icon = tpl.icon;
                      return (
                        <Button
                          key={tpl.key}
                          variant={activeTemplate === tpl.key ? "default" : "outline"}
                          size="sm"
                          onClick={() => applyTemplate(tpl)}
                          className="justify-start"
                          data-testid={`button-template-batch-${tpl.key}`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          <span className="flex-1 text-left">{tpl.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">{tpl.hint}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aspect Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {ASPECTS.map((a) => (
                      <Button
                        key={a.key}
                        variant={aspect === a.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSetAspect(a.key)}
                        data-testid={`button-batch-aspect-${a.key}`}
                      >
                        {a.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                  <CardDescription>Format & quality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Format</Label>
                    <div className="flex gap-2">
                      {([
                        { v: "image/jpeg" as OutputFormat, label: "JPG" },
                        { v: "image/png" as OutputFormat, label: "PNG" },
                        { v: "image/webp" as OutputFormat, label: "WEBP" },
                      ]).map((opt) => (
                        <Button
                          key={opt.v}
                          variant={format === opt.v ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormat(opt.v)}
                          data-testid={`button-batch-format-${opt.label.toLowerCase()}`}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {(format === "image/jpeg" || format === "image/webp") && (
                    <div className="space-y-2">
                      <Label>Quality: {Math.round(quality * 100)}%</Label>
                      <Slider
                        value={[quality]}
                        onValueChange={([v]) => setQuality(v)}
                        min={0.1}
                        max={1}
                        step={0.01}
                        data-testid="slider-batch-quality"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : !imageUrl ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Select an image to crop</CardDescription>
            </CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer hover-elevate active-elevate-2 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, WebP</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                  data-testid="input-file"
                />
              </label>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Crop area */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 flex-wrap">
                  <div>
                    <CardTitle>Select Crop Area</CardTitle>
                    <CardDescription className="truncate max-w-xs" data-testid="text-filename">
                      {fileName}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={undo}
                      disabled={past.length === 0}
                      title="Undo (Ctrl+Z)"
                      data-testid="button-undo"
                    >
                      <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={redo}
                      disabled={future.length === 0}
                      title="Redo (Ctrl+Y)"
                      data-testid="button-redo"
                    >
                      <Redo2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetTransforms} data-testid="button-reset">
                      Reset
                    </Button>
                    <Button variant="ghost" size="icon" onClick={clear} data-testid="button-clear">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    ref={containerRef}
                    className="relative w-full bg-muted rounded-md overflow-hidden flex items-center justify-center select-none"
                    style={{ minHeight: 360 }}
                  >
                    <div className="relative inline-block">
                      <img
                        ref={imageRef}
                        src={imageUrl}
                        alt="To crop"
                        draggable={false}
                        className="block max-w-full max-h-[70vh] pointer-events-none"
                        style={{ transform: imgTransform, transformOrigin: "center center" }}
                        onLoad={measureAndInit}
                        data-testid="img-source"
                      />
                      {/* Overlay */}
                      {displaySize.w > 0 && (
                        <div
                          className="absolute inset-0"
                          style={{ width: displaySize.w, height: displaySize.h }}
                          onPointerMove={onPointerMove}
                          onPointerUp={onPointerUp}
                          onPointerCancel={onPointerUp}
                        >
                          {/* Dark mask using 4 rects */}
                          <div
                            className="absolute bg-black/50"
                            style={{ left: 0, top: 0, width: "100%", height: crop.y }}
                          />
                          <div
                            className="absolute bg-black/50"
                            style={{
                              left: 0,
                              top: crop.y + crop.h,
                              width: "100%",
                              height: Math.max(0, displaySize.h - (crop.y + crop.h)),
                            }}
                          />
                          <div
                            className="absolute bg-black/50"
                            style={{ left: 0, top: crop.y, width: crop.x, height: crop.h }}
                          />
                          <div
                            className="absolute bg-black/50"
                            style={{
                              left: crop.x + crop.w,
                              top: crop.y,
                              width: Math.max(0, displaySize.w - (crop.x + crop.w)),
                              height: crop.h,
                            }}
                          />

                          {/* Crop box */}
                          <div
                            className="absolute border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)] cursor-move"
                            style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h }}
                            onPointerDown={(e) => onPointerDown(e, "move")}
                            data-testid="cropbox"
                          >
                            {/* Grid */}
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/40" />
                              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/40" />
                              <div className="absolute top-1/3 left-0 right-0 h-px bg-white/40" />
                              <div className="absolute top-2/3 left-0 right-0 h-px bg-white/40" />
                            </div>
                            {/* Handles */}
                            {(["nw", "n", "ne", "e", "se", "s", "sw", "w"] as DragMode[]).map((m) => {
                              const base =
                                "absolute bg-white border border-black/40 w-3 h-3 rounded-sm";
                              const positions: Record<string, string> = {
                                nw: "left-0 top-0 -translate-x-1/2 -translate-y-1/2 cursor-nw-resize",
                                n: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 cursor-n-resize",
                                ne: "right-0 top-0 translate-x-1/2 -translate-y-1/2 cursor-ne-resize",
                                e: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 cursor-e-resize",
                                se: "right-0 bottom-0 translate-x-1/2 translate-y-1/2 cursor-se-resize",
                                s: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-s-resize",
                                sw: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2 cursor-sw-resize",
                                w: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-w-resize",
                              };
                              return (
                                <div
                                  key={m as string}
                                  className={`${base} ${positions[m as string]}`}
                                  onPointerDown={(e) => onPointerDown(e, m)}
                                  data-testid={`handle-${m}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Drag inside the box to move. Drag handles to resize. Aspect ratio locks the box shape.
                  </p>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 flex-wrap">
                  <div>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>Live preview of the crop</CardDescription>
                  </div>
                  <Button onClick={handleDownload} data-testid="button-download">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md bg-muted flex items-center justify-center p-4 overflow-auto">
                    <canvas
                      ref={previewCanvasRef}
                      className="max-w-full max-h-[40vh]"
                      data-testid="canvas-preview"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Smart Templates
                  </CardTitle>
                  <CardDescription>One-click presets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {SMART_TEMPLATES.map((tpl) => {
                      const Icon = tpl.icon;
                      return (
                        <Button
                          key={tpl.key}
                          variant={activeTemplate === tpl.key ? "default" : "outline"}
                          size="sm"
                          onClick={() => applyTemplate(tpl)}
                          className="justify-start"
                          data-testid={`button-template-${tpl.key}`}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          <span className="flex-1 text-left">{tpl.label}</span>
                          <span className="text-xs text-muted-foreground ml-2">{tpl.hint}</span>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Aspect Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {ASPECTS.map((a) => (
                      <Button
                        key={a.key}
                        variant={aspect === a.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleSetAspect(a.key)}
                        data-testid={`button-aspect-${a.key}`}
                      >
                        {a.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rotate & Flip</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={handleRotateLeft} data-testid="button-rotate-left">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Rotate L
                    </Button>
                    <Button variant="outline" onClick={handleRotateRight} data-testid="button-rotate-right">
                      <RotateCw className="mr-2 h-4 w-4" />
                      Rotate R
                    </Button>
                    <Button
                      variant={flipH ? "default" : "outline"}
                      onClick={toggleFlipH}
                      data-testid="button-flip-h"
                    >
                      <FlipHorizontal className="mr-2 h-4 w-4" />
                      Flip H
                    </Button>
                    <Button
                      variant={flipV ? "default" : "outline"}
                      onClick={toggleFlipV}
                      data-testid="button-flip-v"
                    >
                      <FlipVertical className="mr-2 h-4 w-4" />
                      Flip V
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zoom</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label>Zoom: {zoom.toFixed(2)}x</Label>
                  <Slider
                    value={[zoom]}
                    onValueChange={([v]) => handleZoom(v)}
                    min={0.5}
                    max={3}
                    step={0.01}
                    data-testid="slider-zoom"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                  <CardDescription>Format & quality</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Format</Label>
                    <div className="flex gap-2">
                      {(
                        [
                          { v: "image/jpeg" as OutputFormat, label: "JPG" },
                          { v: "image/png" as OutputFormat, label: "PNG" },
                          { v: "image/webp" as OutputFormat, label: "WEBP" },
                        ]
                      ).map((opt) => (
                        <Button
                          key={opt.v}
                          variant={format === opt.v ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFormat(opt.v)}
                          data-testid={`button-format-${opt.label.toLowerCase()}`}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {(format === "image/jpeg" || format === "image/webp") && (
                    <div className="space-y-2">
                      <Label>Quality: {Math.round(quality * 100)}%</Label>
                      <Slider
                        value={[quality]}
                        onValueChange={([v]) => setQuality(v)}
                        min={0.1}
                        max={1}
                        step={0.01}
                        data-testid="slider-quality"
                      />
                    </div>
                  )}
                  <Button onClick={handleDownload} className="w-full" data-testid="button-download-2">
                    <CropIcon className="mr-2 h-4 w-4" />
                    Crop & Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Drag-to-Crop</h3>
              <p className="text-muted-foreground">
                Select your crop area visually with a draggable, resizable selection box — just like Instagram.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Preset Aspect Ratios</h3>
              <p className="text-muted-foreground">
                One-click presets for 1:1, 4:5, 16:9, 9:16, A4 and Passport, plus a free mode.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rotate, Flip, Zoom</h3>
              <p className="text-muted-foreground">
                Rotate in 90° steps, flip horizontally or vertically, and zoom in for precise selection.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Export Anywhere</h3>
              <p className="text-muted-foreground">
                Export as JPG, PNG, or WebP with adjustable quality for social, print, or web.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">100% Private</h3>
              <p className="text-muted-foreground">
                All image processing happens in your browser. Nothing is uploaded.
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category:{" "}
          <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">
            Image Tools
          </Link>
        </p>
      </div>
    </div>
  );
}
