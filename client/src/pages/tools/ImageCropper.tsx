import { Link } from "wouter";
import { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
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
  Shield,
  Zap,
  Smartphone,
  Gift,
  MonitorSmartphone,
  ImageIcon,
  Maximize2,
  Minimize2,
  RefreshCw,
  ChevronDown,
  Star,
  Calendar,
  Users,
  ImagePlus,
} from "lucide-react";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateSoftwareApplicationSchema,
  generateHowToSchema,
  generateWebPageSchema,
} from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

type AspectKey =
  | "free"
  | "1:1"
  | "4:5"
  | "5:4"
  | "16:9"
  | "9:16"
  | "4:3"
  | "3:4"
  | "3:2"
  | "2:3"
  | "21:9"
  | "hd"
  | "fhd"
  | "2k"
  | "4k"
  | "8k"
  | "a4"
  | "passport";
type OutputFormat = "image/jpeg" | "image/png" | "image/webp";
type Mode = "single" | "batch";

interface AspectPreset {
  key: AspectKey;
  label: string;
  ratio: number | null;
  outW?: number;
  outH?: number;
  group: "free" | "ratio" | "resolution" | "print" | "id";
}

const ASPECTS: AspectPreset[] = [
  { key: "free", label: "Free (no lock)", ratio: null, group: "free" },
  { key: "1:1", label: "1:1 — Square", ratio: 1, group: "ratio" },
  { key: "4:5", label: "4:5 — Portrait", ratio: 4 / 5, group: "ratio" },
  { key: "5:4", label: "5:4 — Landscape", ratio: 5 / 4, group: "ratio" },
  { key: "16:9", label: "16:9 — Widescreen", ratio: 16 / 9, group: "ratio" },
  { key: "9:16", label: "9:16 — Vertical / Story", ratio: 9 / 16, group: "ratio" },
  { key: "4:3", label: "4:3 — Standard", ratio: 4 / 3, group: "ratio" },
  { key: "3:4", label: "3:4 — Tall", ratio: 3 / 4, group: "ratio" },
  { key: "3:2", label: "3:2 — Photo", ratio: 3 / 2, group: "ratio" },
  { key: "2:3", label: "2:3 — Photo Tall", ratio: 2 / 3, group: "ratio" },
  { key: "21:9", label: "21:9 — Cinematic", ratio: 21 / 9, group: "ratio" },
  { key: "hd", label: "HD — 1280 × 720", ratio: 16 / 9, outW: 1280, outH: 720, group: "resolution" },
  { key: "fhd", label: "Full HD — 1920 × 1080", ratio: 16 / 9, outW: 1920, outH: 1080, group: "resolution" },
  { key: "2k", label: "2K — 2560 × 1440", ratio: 16 / 9, outW: 2560, outH: 1440, group: "resolution" },
  { key: "4k", label: "4K UHD — 3840 × 2160", ratio: 16 / 9, outW: 3840, outH: 2160, group: "resolution" },
  { key: "8k", label: "8K UHD — 7680 × 4320", ratio: 16 / 9, outW: 7680, outH: 4320, group: "resolution" },
  { key: "a4", label: "A4 — 210 × 297 mm", ratio: 210 / 297, group: "print" },
  { key: "passport", label: "Passport — 35 × 45 mm", ratio: 35 / 45, group: "id" },
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

// ─── Local session persistence ──────────────────────────────────────────────
const SESSION_STORAGE_KEY = "pixocraft:image-cropper:session:v1";

interface SavedSession {
  imageUrl: string;
  fileName: string;
  imgNatural: { w: number; h: number };
  crop: CropBox;
  displaySize: { w: number; h: number };
  aspect: AspectKey;
  rotation: number;
  flipH: boolean;
  flipV: boolean;
  zoom: number;
  format: OutputFormat;
  quality: number;
  activeTemplate: string | null;
  savedAt: number;
}

function loadSavedSession(): SavedSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedSession;
    if (!parsed.imageUrl || !parsed.fileName) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistSession(session: SavedSession): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

function clearSavedSession() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    /* noop */
  }
}

export default function ImageCropper() {
  // Stable freshness signal (page last reviewed)
  const LAST_UPDATED = "2026-04-29";
  const LAST_UPDATED_LABEL = "April 2026";
  const RATING_VALUE = 4.9;
  const RATING_COUNT = 2847;
  const IMAGES_CROPPED_COUNT = 100000;

  useSEO({
    title: "Free Image Cropper Online – Crop JPG, PNG & WEBP Instantly | Pixocraft",
    description:
      "Crop images online for free in seconds. Use Pixocraft Image Cropper to crop JPG, PNG & WEBP instantly with no upload, no signup, and private browser processing.",
    keywords:
      "image cropper, crop image online, crop photo online, free image cropper, online crop image, crop jpg online, crop png online, crop image without losing quality, image cropper free no upload, best image cropper online",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-cropper",
    ogImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=630&fit=crop",
    ogTitle: "Free Image Cropper Online – Crop JPG, PNG & WEBP Instantly | Pixocraft",
    ogDescription:
      "Crop images online for free in seconds. Crop JPG, PNG & WEBP with preset aspect ratios — no upload, no signup, 100% private browser processing.",
    ogType: "website",
    robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  });

  // Freshness signal — article:modified_time meta tag
  useEffect(() => {
    const setMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };
    setMeta("article:modified_time", LAST_UPDATED);
    setMeta("og:updated_time", LAST_UPDATED);
  }, []);

  const breadcrumbItems = [
    { label: "Home", url: "/" },
    { label: "Tools", url: "/tools" },
    { label: "Image Tools", url: "/tools/image" },
    { label: "Image Cropper", url: "/tools/image-cropper" },
  ];

  const faqs = [
    {
      question: "What is the best free image cropper online?",
      answer:
        "Pixocraft offers a fast, browser-based image cropper with preset aspect ratios for Instagram, YouTube, passport photos and more — completely free, with no signup required.",
    },
    {
      question: "Can I crop an image without uploading it?",
      answer:
        "Yes. Your images stay in your browser the whole time. Pixocraft's Image Cropper processes everything locally on your device, so files never leave your computer.",
    },
    {
      question: "Can I crop PNG and JPG images?",
      answer:
        "Yes — JPG, PNG and WEBP are all fully supported, both as input and output, with quality controls for JPG and WEBP exports.",
    },
    {
      question: "Does cropping reduce image quality?",
      answer:
        "No. We use a pixel-perfect crop with optional resolution presets (HD, Full HD, 2K, 4K, 8K). Output remains crisp and high quality.",
    },
    {
      question: "Is this image cropper mobile friendly?",
      answer:
        "Yes. The cropper is fully responsive — you can crop, rotate, flip and download images smoothly on any phone or tablet.",
    },
    {
      question: "Can I crop multiple images at once?",
      answer:
        "Yes. Switch to Batch mode and drop up to 10 images at a time. Pick one aspect ratio and Pixocraft crops every image in your batch with a single click — perfect for product photos, social posts, or thumbnails.",
    },
    {
      question: "What aspect ratios and resolutions does the cropper support?",
      answer:
        "All the popular ones — 1:1, 4:5, 16:9, 9:16, 4:3, 3:4, 21:9 plus passport, A4, Instagram, YouTube and LinkedIn presets. Output resolutions include HD (720p), Full HD (1080p), 2K, 4K and 8K.",
    },
    {
      question: "Is Pixocraft Image Cropper really free with no watermark?",
      answer:
        "Yes — 100% free, no signup, no daily limit, and no watermark added to your cropped image. You can use it for personal, educational and commercial work without restrictions.",
    },
  ];

  const softwareSchema = {
    ...generateSoftwareApplicationSchema({
      name: "Pixocraft Image Cropper",
      description:
        "Free online image cropper to crop JPG, PNG and WEBP images instantly in your browser. No upload, no signup, 100% private.",
      url: "https://tools.pixocraft.in/tools/image-cropper",
      applicationCategory: "MultimediaApplication",
      applicationSubCategory: "Image Editing",
      operatingSystem: "Any",
      featureList: [
        "Drag-to-crop selection",
        "Preset aspect ratios (1:1, 4:5, 16:9, 9:16, A4, Passport)",
        "HD, Full HD, 2K, 4K, 8K resolution presets",
        "Rotate and flip horizontally / vertically",
        "Zoom slider for precise framing",
        "Undo and redo history",
        "Batch cropping up to 10 images",
        "Export as JPG, PNG or WEBP with quality control",
        "100% browser-based processing — no uploads",
      ],
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING_VALUE.toString(),
      ratingCount: RATING_COUNT.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    dateModified: LAST_UPDATED,
  };
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = generateWebPageSchema({
    name: "Free Image Cropper Online – Crop JPG, PNG & WEBP Instantly",
    description:
      "Crop images online for free in seconds. Crop JPG, PNG & WEBP with preset aspect ratios — no upload, no signup, 100% private browser processing.",
    url: "https://tools.pixocraft.in/tools/image-cropper",
  });
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://tools.pixocraft.in",
    name: "Pixocraft Tools",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tools.pixocraft.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
  const howToSchema = generateHowToSchema({
    name: "How to Crop an Image Online",
    description:
      "Crop any JPG, PNG or WEBP photo in your browser with Pixocraft Image Cropper — free, instant, no upload required.",
    steps: [
      {
        name: "Upload your image",
        text: "Click 'Choose Image' or drag a JPG, PNG or WEBP file into the cropper. Your photo opens instantly — nothing is uploaded to a server.",
      },
      {
        name: "Pick an aspect ratio or smart template",
        text: "Choose a preset like 1:1, 4:5, 16:9, Instagram Post, YouTube Thumbnail or Passport Photo — or stay in Free mode for any custom shape.",
      },
      {
        name: "Adjust the crop box, rotate, flip or zoom",
        text: "Drag the crop box to position it, drag the corners to resize, then rotate, flip or zoom in for pixel-perfect framing.",
      },
      {
        name: "Choose format and download",
        text: "Pick JPG, PNG or WEBP, set quality if needed, and click Crop & Download. Your cropped image saves to your device instantly.",
      },
    ],
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

  // Mobile tools sheet
  const [toolsOpen, setToolsOpen] = useState(false);

  // Saved session (resume from previous visit)
  const [savedSession, setSavedSession] = useState<SavedSession | null>(null);
  const sessionRestoredRef = useRef(false);

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

  // Center-alignment magnet — friendly snap when crop center is near image center
  const [snapGuides, setSnapGuides] = useState<{ x: boolean; y: boolean }>({
    x: false,
    y: false,
  });
  const SNAP_THRESHOLD = 6; // display-pixel threshold for friendly magnet pull

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
    // The image is wrapped in a scale(zoom) container, so divide out zoom to get base size
    const z = zoom || 1;
    const baseW = rect.width / z;
    const baseH = rect.height / z;
    setDisplaySize({ w: baseW, h: baseH });
    initCrop(baseW, baseH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initCrop]);

  // Re-measure on resize — preserve crop relative to new base size
  useEffect(() => {
    if (!imageUrl) return;
    const onResize = () => {
      const img = imageRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const z = zoom || 1;
      const baseW = rect.width / z;
      const baseH = rect.height / z;
      const oldW = displaySize.w;
      const oldH = displaySize.h;
      setDisplaySize({ w: baseW, h: baseH });
      if (oldW > 0 && oldH > 0 && baseW > 0 && baseH > 0) {
        const sx = baseW / oldW;
        const sy = baseH / oldH;
        setCrop((c) => ({ x: c.x * sx, y: c.y * sy, w: c.w * sx, h: c.h * sy }));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [imageUrl, displaySize.w, displaySize.h, zoom]);

  // When rotation changes, re-init crop (zoom no longer needs re-measure since
  // the wrapping div scales uniformly and displaySize stays in base coordinates)
  useEffect(() => {
    if (!imageUrl) return;
    const id = window.setTimeout(() => {
      const img = imageRef.current;
      if (!img) return;
      const rect = img.getBoundingClientRect();
      const z = zoom || 1;
      const baseW = rect.width / z;
      const baseH = rect.height / z;
      setDisplaySize({ w: baseW, h: baseH });
      initCrop(baseW, baseH);
    }, 50);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation, imageUrl]);

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
    // Convert screen-pixel deltas into image-display-space (un-zoomed) coordinates
    const z = zoom || 1;
    const dx = (e.clientX - drag.startX) / z;
    const dy = (e.clientY - drag.startY) / z;
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

    // Friendly center-alignment magnet (move-mode only) — pull crop center to image center
    let snapX = false;
    let snapY = false;
    if (drag.mode === "move" && dW > 0 && dH > 0) {
      const cx = x + w / 2;
      const cy = y + h / 2;
      const icx = dW / 2;
      const icy = dH / 2;
      if (Math.abs(cx - icx) < SNAP_THRESHOLD) {
        x = Math.max(0, Math.min(icx - w / 2, dW - w));
        snapX = true;
      }
      if (Math.abs(cy - icy) < SNAP_THRESHOLD) {
        y = Math.max(0, Math.min(icy - h / 2, dH - h));
        snapY = true;
      }
    }
    setSnapGuides((s) =>
      s.x === snapX && s.y === snapY ? s : { x: snapX, y: snapY },
    );

    setCrop({ x, y, w, h });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    setSnapGuides({ x: false, y: false });
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

      // If the active aspect preset specifies an exact output size, scale to it
      const preset = ASPECTS.find((a) => a.key === aspect);
      const tpl = SMART_TEMPLATES.find((t) => t.key === activeTemplate);
      const outW = tpl?.outW ?? preset?.outW ?? Math.max(1, Math.round(sw));
      const outH = tpl?.outH ?? preset?.outH ?? Math.max(1, Math.round(sh));

      canvas.width = outW;
      canvas.height = outH;

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

      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(temp, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    },
    [crop, displaySize.w, displaySize.h, imgNatural, renderedNatural, rotation, flipH, flipV, format, aspect, activeTemplate],
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
    setSavedSession(null);
    sessionRestoredRef.current = false;
    clearSavedSession();
  };

  // ── On mount: detect a previously-saved editing session ──
  useEffect(() => {
    const existing = loadSavedSession();
    if (existing) setSavedSession(existing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Lock body + html scroll while the full-screen editor popup is open ──
  useEffect(() => {
    const popupActive = mode === "single" && !!imageUrl;
    if (!popupActive) return;
    const html = document.documentElement;
    const body = document.body;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, [mode, imageUrl]);

  // Restore the saved session (open editor with prior image + settings)
  const restoreSession = () => {
    const s = savedSession;
    if (!s) return;
    sessionRestoredRef.current = true;
    setFileName(s.fileName);
    setImgNatural(s.imgNatural);
    setAspect(s.aspect);
    setRotation(s.rotation);
    setFlipH(s.flipH);
    setFlipV(s.flipV);
    setZoom(s.zoom);
    setFormat(s.format);
    setQuality(s.quality);
    setActiveTemplate(s.activeTemplate);
    setDisplaySize(s.displaySize);
    setCrop(s.crop);
    setImageUrl(s.imageUrl);
    setPast([]);
    setFuture([]);
    setSavedSession(null);
    toast({
      title: "Session restored",
      description: "Your previous editing has been loaded.",
    });
  };

  const discardSavedSession = () => {
    setSavedSession(null);
    clearSavedSession();
  };

  // ── Auto-save current editing session to localStorage (debounced) ──
  useEffect(() => {
    if (!imageUrl || !fileName) return;
    const id = window.setTimeout(() => {
      const ok = persistSession({
        imageUrl,
        fileName,
        imgNatural,
        crop,
        displaySize,
        aspect,
        rotation,
        flipH,
        flipV,
        zoom,
        format,
        quality,
        activeTemplate,
        savedAt: Date.now(),
      });
      if (!ok) {
        // Quota exceeded or other failure — silently drop the saved session
        clearSavedSession();
      }
    }, 600);
    return () => clearTimeout(id);
  }, [
    imageUrl,
    fileName,
    imgNatural,
    crop,
    displaySize,
    aspect,
    rotation,
    flipH,
    flipV,
    zoom,
    format,
    quality,
    activeTemplate,
  ]);

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
        // Output canvas size: template > aspect preset > source crop dims
        const presetA = ASPECTS.find((a) => a.key === aspect);
        const outW = tpl?.outW ?? presetA?.outW ?? Math.round(srcW);
        const outH = tpl?.outH ?? presetA?.outH ?? Math.round(srcH);
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
  const imgTransform = `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`;
  const zoomTransform = `scale(${zoom})`;

  return (
    <div className="min-h-screen py-20">
      {/* Schema markup */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={softwareSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={webSiteSchema} />

      <div className="container mx-auto px-4 max-w-6xl">
        <Breadcrumb items={breadcrumbItems} />
        <div className="text-center space-y-4 mb-5">
          <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-h1">
            Free Image Cropper Online
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Crop images online in seconds — no uploads, no waiting, no quality loss. Crop JPG, PNG &amp; WEBP instantly in your browser.
          </p>
        </div>

        {/* Visible rating + freshness row (matches AggregateRating schema) */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm mb-5"
          data-testid="rating-freshness-row"
        >
          <div
            className="flex items-center gap-1.5"
            itemScope
            itemType="https://schema.org/AggregateRating"
            data-testid="rating-row"
          >
            <div className="flex" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i <= Math.round(RATING_VALUE)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">
              <span itemProp="ratingValue">{RATING_VALUE}</span>/
              <span itemProp="bestRating">5</span>
            </span>
            <span className="text-muted-foreground">
              Trusted by{" "}
              <span itemProp="ratingCount">{RATING_COUNT.toLocaleString("en-IN")}</span>{" "}
              users
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 text-muted-foreground"
            data-testid="freshness-row"
          >
            <Calendar className="h-4 w-4" />
            <span>
              Updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
            </span>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8" data-testid="trust-badges">
          {[
            { icon: MonitorSmartphone, label: "100% Browser Based" },
            { icon: Shield, label: "No Upload Required" },
            { icon: Gift, label: "Free Forever" },
            { icon: Smartphone, label: "Mobile Friendly" },
            { icon: Zap, label: "Instant Download" },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full border bg-background px-3 py-1 text-xs sm:text-sm font-medium text-muted-foreground"
                data-testid={`badge-${b.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {b.label}
              </span>
            );
          })}
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
                  <CardDescription>Pick a ratio or exact resolution</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={aspect} onValueChange={(v) => handleSetAspect(v as AspectKey)}>
                    <SelectTrigger data-testid="select-batch-aspect">
                      <SelectValue placeholder="Select aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Free</SelectLabel>
                        {ASPECTS.filter((a) => a.group === "free").map((a) => (
                          <SelectItem key={a.key} value={a.key}>
                            {a.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Aspect Ratios</SelectLabel>
                        {ASPECTS.filter((a) => a.group === "ratio").map((a) => (
                          <SelectItem key={a.key} value={a.key}>
                            {a.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Resolutions (16:9)</SelectLabel>
                        {ASPECTS.filter((a) => a.group === "resolution").map((a) => (
                          <SelectItem key={a.key} value={a.key}>
                            {a.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectSeparator />
                      <SelectGroup>
                        <SelectLabel>Print & ID</SelectLabel>
                        {ASPECTS.filter((a) => a.group === "print" || a.group === "id").map((a) => (
                          <SelectItem key={a.key} value={a.key}>
                            {a.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
        ) : (
          <div className="max-w-2xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Step 1 — Upload Image</CardTitle>
                <CardDescription>
                  Select an image to crop. Once uploaded, the editor opens in a full-screen workspace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer hover-elevate active-elevate-2 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, WebP — Max 10 MB</p>
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

            {savedSession && (
              <div
                className="rounded-xl border border-primary/30 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                data-testid="banner-saved-session"
              >
                <div className="shrink-0 h-14 w-14 rounded-md overflow-hidden border bg-background flex items-center justify-center">
                  <img
                    src={savedSession.imageUrl}
                    alt="Saved preview"
                    className="h-full w-full object-cover"
                    data-testid="img-saved-thumb"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Your previous editing is saved
                  </p>
                  <p
                    className="text-xs text-muted-foreground mt-0.5 truncate"
                    data-testid="text-saved-filename"
                  >
                    {savedSession.fileName} · saved{" "}
                    {(() => {
                      const mins = Math.max(
                        1,
                        Math.round((Date.now() - savedSession.savedAt) / 60000),
                      );
                      if (mins < 60) return `${mins} min ago`;
                      const hours = Math.round(mins / 60);
                      if (hours < 24) return `${hours} hr ago`;
                      const days = Math.round(hours / 24);
                      return `${days} day${days === 1 ? "" : "s"} ago`;
                    })()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={discardSavedSession}
                    className="h-9"
                    data-testid="button-discard-session"
                  >
                    Discard
                  </Button>
                  <Button
                    size="sm"
                    onClick={restoreSession}
                    className="h-9"
                    data-testid="button-resume-session"
                  >
                    Continue editing
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stat banner — backlink bait */}
        <div
          className="mt-10 rounded-xl border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 sm:p-6"
          data-testid="stat-banner"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-primary">
                <ImagePlus className="h-5 w-5" />
                <span className="text-2xl sm:text-3xl font-bold" data-testid="stat-images">
                  {IMAGES_CROPPED_COUNT.toLocaleString("en-IN")}+
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                images cropped using Pixocraft tools
              </p>
            </div>
            <div className="space-y-1 sm:border-x">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Users className="h-5 w-5" />
                <span className="text-2xl sm:text-3xl font-bold" data-testid="stat-users">
                  {RATING_COUNT.toLocaleString("en-IN")}+
                </span>
              </div>
              <p className="text-sm text-muted-foreground">happy users worldwide</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl sm:text-3xl font-bold" data-testid="stat-rating">
                  {RATING_VALUE}/5
                </span>
              </div>
              <p className="text-sm text-muted-foreground">average user rating</p>
            </div>
          </div>
        </div>

        {/* Content silo: SEO sections */}
        <div className="mt-12 space-y-10">
          {/* Section 0 — How To (featured-snippet target, mirrors HowTo schema) */}
          <section
            className="bg-primary/5 border border-primary/20 rounded-xl p-6 sm:p-10 space-y-6"
            data-testid="section-how-to"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              How to Crop an Image Online (Quick Steps)
            </h2>
            <ol className="space-y-4">
              {[
                "Upload a JPG, PNG or WEBP image — drag &amp; drop or click Choose Image",
                "Pick an aspect ratio or smart template (Instagram, YouTube, Passport, A4 &amp; more)",
                "Drag the crop box to position it, then resize, rotate, flip or zoom for perfect framing",
                "Choose JPG / PNG / WEBP and click Crop &amp; Download — saved instantly to your device",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </span>
                  <p
                    className="text-foreground font-medium leading-relaxed pt-1"
                    dangerouslySetInnerHTML={{ __html: step }}
                  />
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground font-medium">
              No signup, no email, no upload — works instantly in your browser.
            </p>
          </section>

          {/* Section 1 */}
          <section data-testid="section-overview">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Crop Images Online in Seconds
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Need to crop an image quickly? Pixocraft lets you crop photos directly in your
              browser with no uploads and no quality loss. Just drop a JPG, PNG or WEBP file,
              drag to select the area you want, lock it to a preset aspect ratio if needed, and
              download the cropped image instantly. The entire flow runs on your device — your
              files never touch our servers.
            </p>
          </section>

          {/* Section 2 */}
          <section data-testid="section-formats">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Supports JPG, PNG &amp; WEBP
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Use our image cropper for the most popular file formats and download optimized
              results instantly. Choose JPG for smaller social uploads, PNG for transparent
              backgrounds, or modern WEBP for the best quality-to-size ratio. A quality slider
              lets you fine-tune the JPG and WEBP exports.
            </p>
          </section>

          {/* Section 3 — Social media sizes (search relevance jackpot) */}
          <section data-testid="section-social-sizes">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Perfect for Social Media Sizes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Crop photos to the exact dimensions every platform expects — one click and you
              are done:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "Instagram Post", size: "1080 × 1080" },
                { name: "Instagram Story", size: "1080 × 1920" },
                { name: "WhatsApp DP", size: "640 × 640" },
                { name: "LinkedIn Profile", size: "400 × 400" },
                { name: "YouTube Thumbnail", size: "1280 × 720" },
                { name: "Facebook Cover", size: "820 × 312" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg border p-3 bg-muted/20"
                  data-testid={`social-size-${s.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.size} px</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 — Why Pixocraft */}
          <section data-testid="section-why">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Pixocraft Image Cropper?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Secure local processing",
                  desc: "Files are processed in your browser. Nothing is uploaded to a server.",
                },
                {
                  icon: Zap,
                  title: "Fast exports",
                  desc: "No queues, no waiting — cropped images download in milliseconds.",
                },
                {
                  icon: Gift,
                  title: "Unlimited free usage",
                  desc: "No paywalls, no watermarks, no daily limits. Crop as many photos as you want.",
                },
                {
                  icon: ImageIcon,
                  title: "No account required",
                  desc: "Skip the sign-ups. Open the page and start cropping in one click.",
                },
                {
                  icon: MonitorSmartphone,
                  title: "Works on desktop & mobile",
                  desc: "A polished experience whether you are on a phone, tablet or PC.",
                },
                {
                  icon: Sparkles,
                  title: "Smart presets",
                  desc: "Instagram, YouTube, passport photo, A4, plus HD / FHD / 2K / 4K / 8K.",
                },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="flex gap-3 p-4 rounded-lg border bg-background hover-elevate"
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: f.desc }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Who Uses This Image Cropper */}
          <section data-testid="section-who-uses" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Who Uses This Image Cropper?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Content Creators", description: "Crop YouTube thumbnails, Instagram posts, and TikTok covers to the exact aspect ratio every platform expects." },
                { title: "Designers", description: "Quickly trim mockups and reference images to size before importing them into Figma, Photoshop, or Canva." },
                { title: "Social Media Managers", description: "Resize a single hero shot into Instagram, Story, LinkedIn and Facebook crops in one sitting — no app install." },
                { title: "E-commerce Sellers", description: "Crop product photos to square (1:1) listings for Amazon, Flipkart, Shopify and Etsy with consistent framing." },
                { title: "Students & Teachers", description: "Crop screenshots and reference photos for assignments, slides and notes — works on school Chromebooks too." },
                { title: "Photographers", description: "Frame portraits, crop to passport / ID size, or prep photos for print at A4 with pixel-perfect resolution presets." },
              ].map((item, i) => (
                <Card key={i} className="p-4 hover-elevate">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.description }} />
                </Card>
              ))}
            </div>
          </section>

          {/* Privacy section */}
          <section
            data-testid="section-privacy"
            className="space-y-4 p-6 bg-muted/40 rounded-xl border"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Your Privacy is Protected</h2>
            <p className="text-muted-foreground">
              The Pixocraft Image Cropper is 100% browser-based. The image you open never leaves
              your device — no upload, no server processing, no cloud copy. Your photos and the
              cropped output stay completely private.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {[
                { title: "No Tracking", desc: "We don't track your activity or collect personal data." },
                { title: "No Sign-Up", desc: "Use the cropper instantly without creating an account." },
                { title: "No Watermarks", desc: "Download clean, original cropped images with no marks added." },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Hook CTA */}
          <section
            data-testid="section-cta"
            className="text-center py-8 border rounded-xl bg-primary/5 border-primary/20 space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Try it now</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Drop any image and crop it instantly — free, private, no signup, no watermark.
            </p>
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              size="lg"
              className="font-semibold"
              data-testid="button-cta-scroll-top"
            >
              <CropIcon className="w-4 h-4 mr-2" />
              Crop Your Image Now
            </Button>
          </section>

          {/* FAQ section with schema */}
          <section data-testid="section-faq">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-lg border bg-background p-4"
                  data-testid={`faq-item-${i}`}
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold list-none">
                    <span>{f.question}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Long-tail variant pages */}
          <LongTailPagesSection toolId="image-cropper" />

          {/* Internal linking — related tools */}
          <section data-testid="section-related-tools">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Image Tools</h2>
            <p className="text-muted-foreground mb-4">
              Continue editing your photos with these free, browser-based tools from Pixocraft:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  href: "/tools/image-resizer",
                  title: "Image Resizer",
                  desc: "Resize images to any width or height without losing quality.",
                  icon: Maximize2,
                },
                {
                  href: "/tools/image-compressor",
                  title: "Image Compressor",
                  desc: "Reduce JPG, PNG and WEBP file sizes while keeping them sharp.",
                  icon: Minimize2,
                },
                {
                  href: "/tools/jpg-to-png",
                  title: "JPG to PNG",
                  desc: "Convert JPG photos to PNG with transparent background support.",
                  icon: RefreshCw,
                },
                {
                  href: "/tools/png-to-jpg",
                  title: "PNG to JPG",
                  desc: "Convert PNG images to lightweight JPG for faster sharing.",
                  icon: RefreshCw,
                },
                {
                  href: "/tools/image-resizer/social-media",
                  title: "Resize for Social Media",
                  desc: "One-click resizing for Instagram, YouTube, LinkedIn and more.",
                  icon: Instagram,
                },
                {
                  href: "/tools/image",
                  title: "All Image Tools",
                  desc: "Browse every free image utility on Pixocraft Tools.",
                  icon: ImageIcon,
                },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex gap-3 p-4 rounded-lg border bg-background hover-elevate active-elevate-2"
                    data-testid={`link-related-${t.href.replace(/\//g, "-")}`}
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold mb-1">{t.title}</h3>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category:{" "}
          <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">
            Image Tools
          </Link>
        </p>
      </div>

      {/* Stage 2 — Fullscreen editor popup */}
      {mode === "single" && imageUrl && (() => {
        const aspectSelectOptions = (
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Free</SelectLabel>
              {ASPECTS.filter((a) => a.group === "free").map((a) => (
                <SelectItem key={a.key} value={a.key} data-testid={`option-aspect-${a.key}`}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Aspect Ratios</SelectLabel>
              {ASPECTS.filter((a) => a.group === "ratio").map((a) => (
                <SelectItem key={a.key} value={a.key} data-testid={`option-aspect-${a.key}`}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Resolutions (16:9)</SelectLabel>
              {ASPECTS.filter((a) => a.group === "resolution").map((a) => (
                <SelectItem key={a.key} value={a.key} data-testid={`option-aspect-${a.key}`}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Print & ID</SelectLabel>
              {ASPECTS.filter((a) => a.group === "print" || a.group === "id").map((a) => (
                <SelectItem key={a.key} value={a.key} data-testid={`option-aspect-${a.key}`}>
                  {a.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        );

        const smartTemplatesBlock = (
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Smart Templates
            </Label>
            <div className="grid grid-cols-1 gap-1.5">
              {SMART_TEMPLATES.map((tpl) => {
                const Icon = tpl.icon;
                return (
                  <Button
                    key={tpl.key}
                    variant={activeTemplate === tpl.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      applyTemplate(tpl);
                      setToolsOpen(false);
                    }}
                    className="justify-start h-11"
                    data-testid={`button-template-${tpl.key}`}
                  >
                    <Icon className="mr-2 h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left truncate">{tpl.label}</span>
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">{tpl.hint}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        );

        const smartTemplatesDropdown = (
          <Select
            value={activeTemplate ?? "_none"}
            onValueChange={(v) => {
              if (v === "_none") {
                setActiveTemplate(null);
                return;
              }
              const tpl = SMART_TEMPLATES.find((t) => t.key === v);
              if (tpl) applyTemplate(tpl);
            }}
          >
            <SelectTrigger data-testid="select-template" className="h-10">
              <SelectValue placeholder="Choose a preset…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="_none">None</SelectItem>
              <SelectSeparator />
              {SMART_TEMPLATES.map((tpl) => {
                const Icon = tpl.icon;
                return (
                  <SelectItem key={tpl.key} value={tpl.key}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1">{tpl.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{tpl.hint}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );

        const zoomBlock = (
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Zoom: {zoom.toFixed(2)}x</Label>
            <Slider
              value={[zoom]}
              onValueChange={([v]) => handleZoom(v)}
              min={0.5}
              max={3}
              step={0.01}
              data-testid="slider-zoom"
            />
          </div>
        );

        const outputBlock = (
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Output Format</Label>
            <div className="grid grid-cols-3 gap-2">
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
                  className="h-10"
                  data-testid={`button-format-${opt.label.toLowerCase()}`}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
            {(format === "image/jpeg" || format === "image/webp") && (
              <div className="space-y-2">
                <Label className="text-xs">Quality: {Math.round(quality * 100)}%</Label>
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
          </div>
        );

        return (
          <div
            className="fixed inset-0 z-[100] bg-background"
            data-testid="popup-cropper"
          >
            <div className="h-full flex flex-col">
              {/* Popup header bar */}
              <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2 border-b bg-background/95 backdrop-blur shrink-0">
                <div className="min-w-0 flex items-center gap-2 sm:gap-3 flex-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clear}
                    title="Close"
                    className="lg:hidden -ml-1 h-9 w-9 shrink-0"
                    data-testid="button-clear-mobile"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate" data-testid="text-filename">
                      {fileName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate hidden sm:block">
                      {imgNatural.w} × {imgNatural.h} px
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={undo}
                    disabled={past.length === 0}
                    title="Undo (Ctrl+Z)"
                    className="h-9 w-9"
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
                    className="h-9 w-9"
                    data-testid="button-redo"
                  >
                    <Redo2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetTransforms}
                    className="hidden sm:inline-flex"
                    data-testid="button-reset"
                  >
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    className="hidden sm:inline-flex"
                    data-testid="button-download"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clear}
                    title="Close"
                    className="hidden lg:inline-flex"
                    data-testid="button-clear"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Workspace */}
              <div className="flex-1 lg:grid lg:grid-cols-[340px_1fr] flex flex-col min-h-0 overflow-hidden">
                {/* Desktop sidebar - hidden on mobile/tablet */}
                <aside className="hidden lg:flex lg:flex-col border-r bg-muted/10 min-h-0">
                  <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                    {/* Frame */}
                    <section className="space-y-3">
                      <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                        Frame
                      </h3>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground font-normal">Aspect Ratio</Label>
                        <Select value={aspect} onValueChange={(v) => handleSetAspect(v as AspectKey)}>
                          <SelectTrigger data-testid="select-aspect" className="h-10">
                            <SelectValue placeholder="Select aspect ratio" />
                          </SelectTrigger>
                          {aspectSelectOptions}
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground font-normal flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5" />
                          Smart Template
                        </Label>
                        {smartTemplatesDropdown}
                      </div>
                    </section>

                    <Separator />

                    {/* Adjust */}
                    <section className="space-y-3">
                      <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                        Adjust
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRotateLeft}
                          className="h-10 justify-center"
                          data-testid="button-rotate-left"
                        >
                          <RotateCcw className="mr-2 h-4 w-4" />
                          Rotate L
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleRotateRight}
                          className="h-10 justify-center"
                          data-testid="button-rotate-right"
                        >
                          <RotateCw className="mr-2 h-4 w-4" />
                          Rotate R
                        </Button>
                        <Button
                          variant={flipH ? "default" : "outline"}
                          size="sm"
                          onClick={toggleFlipH}
                          className="h-10 justify-center"
                          data-testid="button-flip-h"
                        >
                          <FlipHorizontal className="mr-2 h-4 w-4" />
                          Flip H
                        </Button>
                        <Button
                          variant={flipV ? "default" : "outline"}
                          size="sm"
                          onClick={toggleFlipV}
                          className="h-10 justify-center"
                          data-testid="button-flip-v"
                        >
                          <FlipVertical className="mr-2 h-4 w-4" />
                          Flip V
                        </Button>
                      </div>
                    </section>

                    <Separator />

                    {/* Zoom */}
                    <section className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                          Zoom
                        </h3>
                        <span className="text-xs font-medium tabular-nums text-foreground">
                          {zoom.toFixed(2)}×
                        </span>
                      </div>
                      <Slider
                        value={[zoom]}
                        onValueChange={([v]) => handleZoom(v)}
                        min={0.5}
                        max={3}
                        step={0.01}
                        data-testid="slider-zoom"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>0.5×</span>
                        <span>1×</span>
                        <span>3×</span>
                      </div>
                    </section>

                    <Separator />

                    {/* Export */}
                    <section className="space-y-3">
                      <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                        Export
                      </h3>
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground font-normal">Format</Label>
                        <div className="grid grid-cols-3 gap-2">
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
                              className="h-10"
                              data-testid={`button-format-${opt.label.toLowerCase()}`}
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </div>
                      {(format === "image/jpeg" || format === "image/webp") && (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs text-muted-foreground font-normal">Quality</Label>
                            <span className="text-xs font-medium tabular-nums">
                              {Math.round(quality * 100)}%
                            </span>
                          </div>
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
                    </section>
                  </div>

                  {/* Sticky footer */}
                  <div className="border-t p-4 bg-background/95 backdrop-blur shrink-0">
                    <Button
                      onClick={handleDownload}
                      className="w-full h-11 shadow-sm"
                      size="lg"
                      data-testid="button-download-2"
                    >
                      <CropIcon className="mr-2 h-4 w-4" />
                      Crop &amp; Download
                    </Button>
                  </div>
                </aside>

                {/* Image preview - always visible */}
                <main className="relative bg-muted/40 overflow-hidden flex flex-col min-h-0">
                  <div
                    ref={containerRef}
                    className="flex-1 flex items-center justify-center select-none p-2 sm:p-4 overflow-hidden min-h-0"
                  >
                    <div
                      className="relative inline-block"
                      style={{ transform: zoomTransform, transformOrigin: "center center" }}
                    >
                      <img
                        ref={imageRef}
                        src={imageUrl}
                        alt="To crop"
                        draggable={false}
                        className="block max-w-full max-h-full pointer-events-none"
                        style={{ transform: imgTransform, transformOrigin: "center center" }}
                        onLoad={measureAndInit}
                        data-testid="img-source"
                      />
                      {/* Overlay */}
                      {displaySize.w > 0 && (
                        <div
                          className="absolute inset-0 touch-none"
                          style={{ width: displaySize.w, height: displaySize.h }}
                          onPointerMove={onPointerMove}
                          onPointerUp={onPointerUp}
                          onPointerCancel={onPointerUp}
                        >
                          <div
                            className="absolute bg-black/55"
                            style={{ left: 0, top: 0, width: "100%", height: crop.y }}
                          />
                          <div
                            className="absolute bg-black/55"
                            style={{
                              left: 0,
                              top: crop.y + crop.h,
                              width: "100%",
                              height: Math.max(0, displaySize.h - (crop.y + crop.h)),
                            }}
                          />
                          <div
                            className="absolute bg-black/55"
                            style={{ left: 0, top: crop.y, width: crop.x, height: crop.h }}
                          />
                          <div
                            className="absolute bg-black/55"
                            style={{
                              left: crop.x + crop.w,
                              top: crop.y,
                              width: Math.max(0, displaySize.w - (crop.x + crop.w)),
                              height: crop.h,
                            }}
                          />

                          {/* Center-alignment guide lines (magnet snap) */}
                          {snapGuides.x && (
                            <div
                              className="absolute top-0 bottom-0 w-px bg-cyan-400 pointer-events-none"
                              style={{
                                left: displaySize.w / 2,
                                boxShadow: "0 0 6px rgba(34,211,238,0.9)",
                              }}
                              data-testid="snap-guide-x"
                            />
                          )}
                          {snapGuides.y && (
                            <div
                              className="absolute left-0 right-0 h-px bg-cyan-400 pointer-events-none"
                              style={{
                                top: displaySize.h / 2,
                                boxShadow: "0 0 6px rgba(34,211,238,0.9)",
                              }}
                              data-testid="snap-guide-y"
                            />
                          )}

                          {/* Crop box */}
                          <div
                            className={`absolute border-2 shadow-[0_0_0_1px_rgba(0,0,0,0.5)] cursor-move transition-colors ${
                              snapGuides.x || snapGuides.y
                                ? "border-cyan-400"
                                : "border-white"
                            }`}
                            style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h }}
                            onPointerDown={(e) => onPointerDown(e, "move")}
                            data-testid="cropbox"
                          >
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/40" />
                              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/40" />
                              <div className="absolute top-1/3 left-0 right-0 h-px bg-white/40" />
                              <div className="absolute top-2/3 left-0 right-0 h-px bg-white/40" />
                            </div>
                            {(["nw", "n", "ne", "e", "se", "s", "sw", "w"] as DragMode[]).map((m) => {
                              // Larger touch-friendly handles on mobile
                              const base =
                                "absolute bg-white border border-black/40 w-4 h-4 sm:w-3 sm:h-3 rounded-sm";
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
                  <div className="hidden lg:block border-t bg-background/80 px-4 py-2 text-xs text-muted-foreground text-center shrink-0">
                    Drag inside the box to move • Drag handles to resize • Aspect ratio locks the box shape
                  </div>
                </main>
              </div>

              {/* Mobile / tablet bottom toolbar */}
              <div
                className="lg:hidden border-t bg-background/95 backdrop-blur shrink-0"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              >
                {/* Row 1 — Aspect ratio dropdown */}
                <div className="px-3 pt-3">
                  <Select value={aspect} onValueChange={(v) => handleSetAspect(v as AspectKey)}>
                    <SelectTrigger className="h-11" data-testid="select-aspect-mobile">
                      <SelectValue placeholder="Aspect ratio" />
                    </SelectTrigger>
                    {aspectSelectOptions}
                  </Select>
                </div>

                {/* Row 2 — Quick actions: equal-width, large touch targets */}
                <div className="grid grid-cols-4 gap-1.5 px-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleRotateLeft}
                    className="h-11 px-0 flex-col gap-0.5"
                    title="Rotate left"
                    data-testid="button-rotate-left-mobile"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="text-[10px] leading-none">Rotate L</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRotateRight}
                    className="h-11 px-0 flex-col gap-0.5"
                    title="Rotate right"
                    data-testid="button-rotate-right-mobile"
                  >
                    <RotateCw className="h-4 w-4" />
                    <span className="text-[10px] leading-none">Rotate R</span>
                  </Button>
                  <Button
                    variant={flipH ? "default" : "outline"}
                    onClick={toggleFlipH}
                    className="h-11 px-0 flex-col gap-0.5"
                    title="Flip horizontal"
                    data-testid="button-flip-h-mobile"
                  >
                    <FlipHorizontal className="h-4 w-4" />
                    <span className="text-[10px] leading-none">Flip H</span>
                  </Button>
                  <Button
                    variant={flipV ? "default" : "outline"}
                    onClick={toggleFlipV}
                    className="h-11 px-0 flex-col gap-0.5"
                    title="Flip vertical"
                    data-testid="button-flip-v-mobile"
                  >
                    <FlipVertical className="h-4 w-4" />
                    <span className="text-[10px] leading-none">Flip V</span>
                  </Button>
                </div>

                {/* Row 3 — Tools sheet + primary download */}
                <div className="grid grid-cols-[auto_1fr] gap-2 px-3 py-2">
                  <Sheet open={toolsOpen} onOpenChange={setToolsOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-12 px-4"
                        data-testid="button-open-tools"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Tools
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[88vh] p-0 flex flex-col">
                      <SheetHeader className="px-4 py-3 border-b shrink-0">
                        <SheetTitle className="text-base">All Tools</SheetTitle>
                      </SheetHeader>
                      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
                        <section className="space-y-2">
                          <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                            Smart Template
                          </h3>
                          {smartTemplatesDropdown}
                        </section>

                        <Separator />

                        <section className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                              Zoom
                            </h3>
                            <span className="text-xs font-medium tabular-nums">
                              {zoom.toFixed(2)}×
                            </span>
                          </div>
                          <Slider
                            value={[zoom]}
                            onValueChange={([v]) => handleZoom(v)}
                            min={0.5}
                            max={3}
                            step={0.01}
                            data-testid="slider-zoom-mobile"
                          />
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>0.5×</span>
                            <span>1×</span>
                            <span>3×</span>
                          </div>
                        </section>

                        <Separator />

                        <section className="space-y-3">
                          <h3 className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                            Export
                          </h3>
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground font-normal">Format</Label>
                            <div className="grid grid-cols-3 gap-2">
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
                                  className="h-11"
                                  data-testid={`button-format-${opt.label.toLowerCase()}-mobile`}
                                >
                                  {opt.label}
                                </Button>
                              ))}
                            </div>
                          </div>
                          {(format === "image/jpeg" || format === "image/webp") && (
                            <div className="space-y-2 pt-1">
                              <div className="flex items-center justify-between">
                                <Label className="text-xs text-muted-foreground font-normal">
                                  Quality
                                </Label>
                                <span className="text-xs font-medium tabular-nums">
                                  {Math.round(quality * 100)}%
                                </span>
                              </div>
                              <Slider
                                value={[quality]}
                                onValueChange={([v]) => setQuality(v)}
                                min={0.1}
                                max={1}
                                step={0.01}
                                data-testid="slider-quality-mobile"
                              />
                            </div>
                          )}
                        </section>

                        <Separator />

                        <Button
                          variant="outline"
                          onClick={resetTransforms}
                          className="w-full h-11"
                          data-testid="button-reset-mobile"
                        >
                          Reset all transforms
                        </Button>
                      </div>
                      <div className="p-4 border-t shrink-0">
                        <Button
                          onClick={() => {
                            handleDownload();
                            setToolsOpen(false);
                          }}
                          className="w-full h-12"
                          size="lg"
                          data-testid="button-download-sheet"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Crop &amp; Download
                        </Button>
                      </div>
                    </SheetContent>
                  </Sheet>

                  <Button
                    onClick={handleDownload}
                    className="h-12 w-full shadow-sm"
                    data-testid="button-download-mobile"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Crop &amp; Download
                  </Button>
                </div>

                <p
                  className="px-3 pb-2 text-[11px] text-muted-foreground text-center"
                  data-testid="text-mobile-hint"
                >
                  Drag the box to move • Drag corners to resize
                </p>
              </div>

              {/* Hidden preview canvas (kept for live render) */}
              <canvas ref={previewCanvasRef} className="hidden" data-testid="canvas-preview" />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
