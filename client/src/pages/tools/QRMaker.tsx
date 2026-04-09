import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, generateBreadcrumbSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, ArrowLeft, Shield, Save, X, Smartphone, TrendingUp, Sparkles, Users, Share2, Megaphone, Briefcase, Wrench, Building2, Plus, Trash2, Upload, Globe, MessageCircle, Mail, MessageSquare, Wifi, Coins, UserCheck, Zap, Copy, CheckCheck, ScanLine, Undo2, Palette, Grid3X3, Layers, SlidersHorizontal, Check, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import QRCodeLib from "qrcode";

interface CustomTemplate {
  id: string;
  name: string;
  darkColor: string;
  lightColor: string;
  frameStyle: string;
  overlayText: string;
  overlayTextColor: string;
  logoData: string | null;
  logoSize: number;
  logoBorderRadius: number;
  logoBackground: boolean;
  bodyPattern: string;
  externalEyePattern: string;
  internalEyePattern: string;
  errorCorrectionLevel: string;
}

const TEMPLATES_KEY = "pixocraft_qr_templates_v2";

const QR_TYPES = [
  { id: "url", label: "URL / Website", icon: Globe, description: "Link to any website or page", badge: "Recommended", badgeColor: "bg-blue-500", group: "most-used", gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30", iconColor: "text-blue-600 dark:text-blue-400", iconBg: "bg-blue-100 dark:bg-blue-900/40" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, description: "Send a pre-filled WhatsApp message", badge: "Popular", badgeColor: "bg-green-500", group: "most-used", gradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30", iconColor: "text-green-600 dark:text-green-400", iconBg: "bg-green-100 dark:bg-green-900/40" },
  { id: "text", label: "Plain Text", icon: FileText, description: "Any custom text or message", badge: null, badgeColor: "", group: "most-used", gradient: "from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30", iconColor: "text-slate-600 dark:text-slate-400", iconBg: "bg-slate-100 dark:bg-slate-900/40" },
  { id: "vcard", label: "vCard / Contact", icon: UserCheck, description: "Share contact details instantly", badge: null, badgeColor: "", group: "business", gradient: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30", iconColor: "text-purple-600 dark:text-purple-400", iconBg: "bg-purple-100 dark:bg-purple-900/40" },
  { id: "email", label: "Email Address", icon: Mail, description: "Open email app with pre-filled details", badge: null, badgeColor: "", group: "business", gradient: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30", iconColor: "text-orange-600 dark:text-orange-400", iconBg: "bg-orange-100 dark:bg-orange-900/40" },
  { id: "sms", label: "SMS / Text", icon: MessageSquare, description: "Send a pre-written SMS message", badge: null, badgeColor: "", group: "business", gradient: "from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30", iconColor: "text-cyan-600 dark:text-cyan-400", iconBg: "bg-cyan-100 dark:bg-cyan-900/40" },
  { id: "wifi", label: "WiFi Network", icon: Wifi, description: "Connect to WiFi without typing password", badge: null, badgeColor: "", group: "advanced", gradient: "from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30", iconColor: "text-teal-600 dark:text-teal-400", iconBg: "bg-teal-100 dark:bg-teal-900/40" },
  { id: "bitcoin", label: "Bitcoin Address", icon: Coins, description: "Accept crypto payments easily", badge: null, badgeColor: "", group: "advanced", gradient: "from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30", iconColor: "text-yellow-600 dark:text-yellow-500", iconBg: "bg-yellow-100 dark:bg-yellow-900/40" },
];

const QR_TYPE_GROUPS = [
  { id: "most-used", label: "Most Used", indicator: "bg-green-500" },
  { id: "business", label: "Business", indicator: "bg-blue-500" },
  { id: "advanced", label: "Advanced", indicator: "bg-purple-500" },
];

const SOCIAL_LOGOS = [
  { id: "youtube", name: "YouTube", color: "#FF0000" },
  { id: "facebook", name: "Facebook", color: "#1877F2" },
  { id: "whatsapp", name: "WhatsApp", color: "#25D366" },
  { id: "instagram", name: "Instagram", color: "#E4405F" },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2" },
  { id: "telegram", name: "Telegram", color: "#0088cc" },
  { id: "twitter", name: "Twitter", color: "#000000" },
];

const FRAME_PRESETS = [
  { id: "none", name: "None" },
  { id: "scanme-top", name: "Scan Me (Top)" },
  { id: "scanme-bottom", name: "Scan Me (Bottom)" },
  { id: "border", name: "Border" },
  { id: "rounded-border", name: "Rounded" },
];

const BODY_PATTERNS = [
  { id: "square", name: "Square" },
  { id: "rounded", name: "Rounded" },
  { id: "dots", name: "Dots" },
  { id: "classy", name: "Classy" },
  { id: "classy-rounded", name: "Classy Rounded" },
  { id: "extra-rounded", name: "Extra Rounded" },
  { id: "vertical", name: "Vertical" },
  { id: "horizontal", name: "Horizontal" },
];

const EXTERNAL_EYE_PATTERNS = [
  { id: "square", name: "Square" },
  { id: "rounded", name: "Rounded" },
  { id: "circle", name: "Circle" },
  { id: "extra-rounded", name: "Extra Rounded" },
  { id: "leaf", name: "Leaf" },
];

const INTERNAL_EYE_PATTERNS = [
  { id: "square", name: "Square" },
  { id: "rounded", name: "Rounded" },
  { id: "circle", name: "Circle" },
  { id: "diamond", name: "Diamond" },
  { id: "star", name: "Star" },
];

const COLOR_TEMPLATES = [
  { id: "premium-blue", name: "Blue", darkColor: "#0052CC", lightColor: "#E3F2FD" },
  { id: "vibrant-red", name: "Red", darkColor: "#DC2626", lightColor: "#FEE2E2" },
  { id: "forest-green", name: "Green", darkColor: "#15803D", lightColor: "#DCFCE7" },
  { id: "sunset-orange", name: "Orange", darkColor: "#EA580C", lightColor: "#FFEDD5" },
  { id: "deep-purple", name: "Purple", darkColor: "#6D28D9", lightColor: "#F3E8FF" },
  { id: "classic-black", name: "Black", darkColor: "#000000", lightColor: "#FFFFFF" },
  { id: "teal", name: "Teal", darkColor: "#0D9488", lightColor: "#CCFBF1" },
  { id: "indigo", name: "Indigo", darkColor: "#4F46E5", lightColor: "#E0E7FF" },
];

interface StylePreset {
  id: string;
  name: string;
  description: string;
  darkColor: string;
  lightColor: string;
  bodyPattern: string;
  externalEyePattern: string;
  internalEyePattern: string;
  dotsGradient: boolean;
  dotsGradientColors: string[];
  dotsGradientAngle: number;
  bgGradient: boolean;
  bgGradientColors: string[];
  bgGradientAngle: number;
}

const STYLE_PRESETS: StylePreset[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean & simple",
    darkColor: "#000000",
    lightColor: "#FFFFFF",
    bodyPattern: "square",
    externalEyePattern: "square",
    internalEyePattern: "square",
    dotsGradient: false,
    dotsGradientColors: ["#000000", "#333333"],
    dotsGradientAngle: 45,
    bgGradient: false,
    bgGradientColors: ["#FFFFFF", "#F8F8F8"],
    bgGradientAngle: 135,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Rounded + gradient",
    darkColor: "#4F46E5",
    lightColor: "#EEF2FF",
    bodyPattern: "extra-rounded",
    externalEyePattern: "rounded",
    internalEyePattern: "rounded",
    dotsGradient: true,
    dotsGradientColors: ["#4F46E5", "#7C3AED", "#EC4899"],
    dotsGradientAngle: 135,
    bgGradient: false,
    bgGradientColors: ["#EEF2FF", "#F5F3FF"],
    bgGradientAngle: 135,
  },
  {
    id: "business",
    name: "Business",
    description: "Professional & bold",
    darkColor: "#0F172A",
    lightColor: "#FFFFFF",
    bodyPattern: "square",
    externalEyePattern: "square",
    internalEyePattern: "square",
    dotsGradient: false,
    dotsGradientColors: ["#0F172A", "#1E3A5F"],
    dotsGradientAngle: 45,
    bgGradient: false,
    bgGradientColors: ["#FFFFFF", "#F8FAFC"],
    bgGradientAngle: 135,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold & colorful",
    darkColor: "#EA580C",
    lightColor: "#FFF7ED",
    bodyPattern: "dots",
    externalEyePattern: "circle",
    internalEyePattern: "circle",
    dotsGradient: true,
    dotsGradientColors: ["#EA580C", "#DB2777", "#7C3AED"],
    dotsGradientAngle: 45,
    bgGradient: false,
    bgGradientColors: ["#FFF7ED", "#FDF2F8"],
    bgGradientAngle: 135,
  },
  {
    id: "nature",
    name: "Nature",
    description: "Fresh & organic",
    darkColor: "#15803D",
    lightColor: "#F0FDF4",
    bodyPattern: "classy-rounded",
    externalEyePattern: "rounded",
    internalEyePattern: "rounded",
    dotsGradient: true,
    dotsGradientColors: ["#15803D", "#0D9488"],
    dotsGradientAngle: 90,
    bgGradient: false,
    bgGradientColors: ["#F0FDF4", "#CCFBF1"],
    bgGradientAngle: 135,
  },
  {
    id: "neon",
    name: "Neon",
    description: "Dark & vibrant",
    darkColor: "#A855F7",
    lightColor: "#09090B",
    bodyPattern: "dots",
    externalEyePattern: "circle",
    internalEyePattern: "circle",
    dotsGradient: true,
    dotsGradientColors: ["#A855F7", "#3B82F6", "#06B6D4"],
    dotsGradientAngle: 45,
    bgGradient: false,
    bgGradientColors: ["#09090B", "#0F0F1A"],
    bgGradientAngle: 135,
  },
];

export default function QRMaker({ embedMode = false }: { embedMode?: boolean } = {}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const goToStep = (s: 1 | 2 | 3) => {
    window.history.pushState({ qrStep: s }, "");
    setStep(s);
  };
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoData, setLogoData] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(70);
  const [logoBorderRadius, setLogoBorderRadius] = useState(0);
  const [logoBackground, setLogoBackground] = useState(true);
  const [bodyPattern, setBodyPattern] = useState("square");
  const [externalEyePattern, setExternalEyePattern] = useState("square");
  const [internalEyePattern, setInternalEyePattern] = useState("square");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("H");
  const [overlayText, setOverlayText] = useState("");
  const [overlayTextColor, setOverlayTextColor] = useState("#000000");
  const [templateName, setTemplateName] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [floatingPreviewPos, setFloatingPreviewPos] = useState({ x: window.innerWidth - 140, y: window.innerHeight - 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showFloatingPreview, setShowFloatingPreview] = useState(true);

  // Dots gradient
  const [dotsGradient, setDotsGradient] = useState(false);
  const [dotsGradientColors, setDotsGradientColors] = useState(["#000000", "#6D28D9"]);
  const [dotsGradientAngle, setDotsGradientAngle] = useState(45);

  // Background gradient
  const [bgGradient, setBgGradient] = useState(false);
  const [bgGradientColors, setBgGradientColors] = useState(["#FFFFFF", "#E0E7FF"]);
  const [bgGradientAngle, setBgGradientAngle] = useState(135);

  // Border color / gradient
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderGradient, setBorderGradient] = useState(false);
  const [borderGradientColors, setBorderGradientColors] = useState(["#000000", "#6D28D9"]);
  const [borderGradientAngle, setBorderGradientAngle] = useState(90);

  // Active style preset tracking
  const [activeStylePreset, setActiveStylePreset] = useState<string | null>(null);

  // Logo drag-and-drop
  const [logoDragOver, setLogoDragOver] = useState(false);

  // Suggested colors from logo
  const [logoSuggestedColors, setLogoSuggestedColors] = useState<string[]>([]);

  // Copy QR to clipboard
  const [copiedQR, setCopiedQR] = useState(false);

  // Undo history
  const undoStack = useRef<object[]>([]);
  const [canUndo, setCanUndo] = useState(false);

  const captureSnapshot = () => ({
    darkColor, lightColor,
    dotsGradient, dotsGradientColors: [...dotsGradientColors], dotsGradientAngle,
    bgGradient, bgGradientColors: [...bgGradientColors], bgGradientAngle,
    borderColor, borderGradient, borderGradientColors: [...borderGradientColors], borderGradientAngle,
    frameStyle, bodyPattern, externalEyePattern, internalEyePattern,
    overlayText, overlayTextColor, logoSize, logoBorderRadius, logoBackground, activeStylePreset,
  });

  const pushUndo = () => {
    const snap = captureSnapshot();
    undoStack.current = [...undoStack.current.slice(-29), snap];
    setCanUndo(true);
  };

  const restoreSnapshot = (snap: Record<string, unknown>) => {
    setDarkColor(snap.darkColor as string);
    setLightColor(snap.lightColor as string);
    setDotsGradient(snap.dotsGradient as boolean);
    setDotsGradientColors(snap.dotsGradientColors as string[]);
    setDotsGradientAngle(snap.dotsGradientAngle as number);
    setBgGradient(snap.bgGradient as boolean);
    setBgGradientColors(snap.bgGradientColors as string[]);
    setBgGradientAngle(snap.bgGradientAngle as number);
    setBorderColor(snap.borderColor as string);
    setBorderGradient(snap.borderGradient as boolean);
    setBorderGradientColors(snap.borderGradientColors as string[]);
    setBorderGradientAngle(snap.borderGradientAngle as number);
    setFrameStyle(snap.frameStyle as string);
    setBodyPattern(snap.bodyPattern as string);
    setExternalEyePattern(snap.externalEyePattern as string);
    setInternalEyePattern(snap.internalEyePattern as string);
    setOverlayText(snap.overlayText as string);
    setOverlayTextColor(snap.overlayTextColor as string);
    setLogoSize(snap.logoSize as number);
    setLogoBorderRadius(snap.logoBorderRadius as number);
    setLogoBackground(snap.logoBackground as boolean);
    setActiveStylePreset(snap.activeStylePreset as string | null);
  };

  const undo = () => {
    if (undoStack.current.length === 0) return;
    const prev = undoStack.current[undoStack.current.length - 1];
    undoStack.current = undoStack.current.slice(0, -1);
    restoreSnapshot(prev as Record<string, unknown>);
    setCanUndo(undoStack.current.length > 0);
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const floatingCanvasRef = useRef<HTMLCanvasElement>(null);
  const editColumnRef = useRef<HTMLDivElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (step !== 3) return;
    const editCol = editColumnRef.current;
    const wrapper = previewWrapperRef.current;
    if (!editCol || !wrapper) return;

    const card = wrapper.querySelector('[data-preview-section]') as HTMLElement | null;
    if (!card) return;

    const HEADER_H = 72;

    const update = () => {
      // Keep wrapper as tall as the edit column so layout holds
      wrapper.style.minHeight = `${editCol.offsetHeight}px`;

      const wrapperRect = wrapper.getBoundingClientRect();
      const editRect = editCol.getBoundingClientRect();
      const cardH = card.offsetHeight;

      if (editRect.bottom < HEADER_H + cardH) {
        // Bottom of edit section approaching — pin card to bottom of wrapper
        card.style.position = 'absolute';
        card.style.top = 'auto';
        card.style.bottom = '0';
        card.style.left = '0';
        card.style.right = '0';
        card.style.width = '';
      } else if (wrapperRect.top < HEADER_H) {
        // Scrolled past the top — fix card to viewport
        card.style.position = 'fixed';
        card.style.top = `${HEADER_H}px`;
        card.style.left = `${wrapperRect.left}px`;
        card.style.width = `${wrapperRect.width}px`;
        card.style.bottom = 'auto';
        card.style.right = 'auto';
      } else {
        // Not yet scrolled to stick point — normal flow
        card.style.position = '';
        card.style.top = '';
        card.style.bottom = '';
        card.style.left = '';
        card.style.right = '';
        card.style.width = '';
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(editCol);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      ro.disconnect();
      card.style.position = '';
      card.style.top = '';
      card.style.bottom = '';
      card.style.left = '';
      card.style.right = '';
      card.style.width = '';
      wrapper.style.minHeight = '';
    };
  }, [step]);

  useEffect(() => {
    const savedTemplates = localStorage.getItem(TEMPLATES_KEY);
    if (savedTemplates) {
      try {
        setCustomTemplates(JSON.parse(savedTemplates));
      } catch {
        localStorage.removeItem(TEMPLATES_KEY);
      }
    }
  }, []);

  // Show floating preview only on step 3
  useEffect(() => {
    setShowFloatingPreview(step === 3);
  }, [step]);

  // Handle browser back button — navigate between steps instead of leaving page
  useEffect(() => {
    window.history.replaceState({ qrStep: 1 }, "");
    const onPop = (e: PopStateEvent) => {
      const s = e.state?.qrStep as 1 | 2 | 3 | undefined;
      if (s) {
        setStep(s);
      } else if (step > 1) {
        setStep((prev) => (prev - 1) as 1 | 2 | 3);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Ctrl+Z / Cmd+Z keyboard undo shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Handle dragging — mouse + touch
  useEffect(() => {
    if (!isDragging) return;

    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(val, max));

    const handleMouseMove = (e: MouseEvent) => {
      setFloatingPreviewPos({
        x: clamp(e.clientX - dragOffset.x, 0, window.innerWidth - 140),
        y: clamp(e.clientY - dragOffset.y, 0, window.innerHeight - 180),
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      setFloatingPreviewPos({
        x: clamp(t.clientX - dragOffset.x, 0, window.innerWidth - 140),
        y: clamp(t.clientY - dragOffset.y, 0, window.innerHeight - 180),
      });
    };
    const handleTouchEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragOffset]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!floatingPreviewRef.current) return;
    const rect = floatingPreviewRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!floatingPreviewRef.current) return;
    const rect = floatingPreviewRef.current.getBoundingClientRect();
    const t = e.touches[0];
    setDragOffset({ x: t.clientX - rect.left, y: t.clientY - rect.top });
    setIsDragging(true);
  };

  useEffect(() => {
    if (step === 3 && selectedType && canvasRef.current) {
      const timer = setTimeout(() => renderQR(), 100);
      return () => clearTimeout(timer);
    }
  }, [darkColor, lightColor, dotsGradient, dotsGradientColors, dotsGradientAngle, bgGradient, bgGradientColors, bgGradientAngle, borderColor, borderGradient, borderGradientColors, borderGradientAngle, frameStyle, logoData, logoSize, logoBorderRadius, logoBackground, bodyPattern, externalEyePattern, internalEyePattern, errorCorrectionLevel, overlayText, overlayTextColor, step, selectedType, formData]);

  useSEO({
    title: "Create QR Code in Seconds (Free, No Signup, Instant & Private)",
    description: "Generate QR codes instantly — no signup, no ads, no tracking. 100% free and works offline. Add logo & download in seconds.",
    keywords: "qr code generator, free qr code generator, qr generator online, create qr code, generate qr code online, qr code maker, qr code creator, custom qr code generator, qr code generator with logo, qr code generator free online, wifi qr code generator, whatsapp qr code generator, email qr code generator, vcard qr code generator, url qr code generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-maker",
    ogImage: OG_IMAGES.qrMaker,
  });

  const generateQRData = (): string => {
    const data = formData;
    switch (selectedType) {
      case "url": return data.url || "";
      case "text": return data.text || "";
      case "email": return data.email ? `mailto:${data.email}` : "";
      case "sms": return data.phone ? `smsto:${data.phone}${data.smsText ? ":" + data.smsText : ""}` : "";
      case "whatsapp": return data.whatsappPhone ? `https://wa.me/${data.whatsappPhone.replace(/\D/g, '')}${data.whatsappMessage ? "?text=" + encodeURIComponent(data.whatsappMessage) : ""}` : "";
      case "wifi": return data.wifiSsid ? `WIFI:T:${data.wifiSecurity};S:${data.wifiSsid};P:${data.wifiPassword};;` : "";
      case "bitcoin": return data.bitcoinAddress ? `bitcoin:${data.bitcoinAddress}` : "";
      case "vcard": return data.vcardName || data.vcardEmail || data.vcardPhone
        ? `BEGIN:VCARD\nVERSION:3.0\nFN:${data.vcardName}\nTEL:${data.vcardPhone}\nEMAIL:${data.vcardEmail}\nEND:VCARD` : "";
      default: return "";
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoData(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setLogoDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoData(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const extractDominantColors = (dataUrl: string): Promise<string[]> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const size = 80;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve([]);
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;

        const colorMap: Record<string, number> = {};
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
          if (a < 120) continue;
          // Skip near-white and near-black
          if (r > 235 && g > 235 && b > 235) continue;
          if (r < 20 && g < 20 && b < 20) continue;
          // Quantize: round to nearest 24
          const qr = Math.round(r / 24) * 24;
          const qg = Math.round(g / 24) * 24;
          const qb = Math.round(b / 24) * 24;
          const key = `${Math.min(qr, 255)},${Math.min(qg, 255)},${Math.min(qb, 255)}`;
          colorMap[key] = (colorMap[key] || 0) + 1;
        }

        const sorted = Object.entries(colorMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 20);

        // Convert to hex and dedupe visually similar colors
        const hexColors: string[] = [];
        for (const [key] of sorted) {
          const [r, g, b] = key.split(",").map(Number);
          const hex = "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");

          // Check if too similar to an already selected color
          const isTooSimilar = hexColors.some(existing => {
            const er = parseInt(existing.slice(1, 3), 16);
            const eg = parseInt(existing.slice(3, 5), 16);
            const eb = parseInt(existing.slice(5, 7), 16);
            return Math.abs(er - r) + Math.abs(eg - g) + Math.abs(eb - b) < 60;
          });

          if (!isTooSimilar) {
            hexColors.push(hex);
          }
          if (hexColors.length >= 6) break;
        }

        resolve(hexColors);
      };
      img.onerror = () => resolve([]);
      img.src = dataUrl;
    });
  };

  useEffect(() => {
    if (logoData) {
      extractDominantColors(logoData).then(setLogoSuggestedColors);
    } else {
      setLogoSuggestedColors([]);
    }
  }, [logoData]);

  type FillStyle = string | CanvasGradient | CanvasPattern;

  const createCanvasGradient = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, angle: number, colors: string[]): CanvasGradient => {
    const radians = (angle * Math.PI) / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const cx = x + w / 2;
    const cy = y + h / 2;
    const len = Math.abs((w / 2) * cos) + Math.abs((h / 2) * sin);
    const x0 = cx - cos * len;
    const y0 = cy - sin * len;
    const x1 = cx + cos * len;
    const y1 = cy + sin * len;
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    const safeColors = colors.filter(c => c && c.trim());
    if (safeColors.length === 0) {
      gradient.addColorStop(0, "#000000");
      gradient.addColorStop(1, "#000000");
    } else if (safeColors.length === 1) {
      gradient.addColorStop(0, safeColors[0]);
      gradient.addColorStop(1, safeColors[0]);
    } else {
      safeColors.forEach((color, i) => {
        gradient.addColorStop(i / (safeColors.length - 1), color);
      });
    }
    return gradient;
  };

  const drawModule = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pattern: string, color: FillStyle) => {
    ctx.fillStyle = color;
    const gap = size * 0.1;
    const moduleSize = size - gap;

    switch (pattern) {
      case "rounded":
        ctx.beginPath();
        ctx.roundRect(x + gap/2, y + gap/2, moduleSize, moduleSize, size * 0.3);
        ctx.fill();
        break;
      case "dots":
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "classy":
        ctx.beginPath();
        ctx.roundRect(x + gap/2, y + gap/2, moduleSize, moduleSize, [size * 0.4, 0, size * 0.4, 0]);
        ctx.fill();
        break;
      case "classy-rounded":
        ctx.beginPath();
        ctx.roundRect(x + gap/2, y + gap/2, moduleSize, moduleSize, [size * 0.5, size * 0.1, size * 0.5, size * 0.1]);
        ctx.fill();
        break;
      case "extra-rounded":
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size * 0.45, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "vertical":
        ctx.fillRect(x + size * 0.3, y, size * 0.4, size);
        break;
      case "horizontal":
        ctx.fillRect(x, y + size * 0.3, size, size * 0.4);
        break;
      default:
        ctx.fillRect(x, y, size, size);
    }
  };

  const drawExternalEye = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pattern: string, color: FillStyle, bgColor: FillStyle) => {
    const outerSize = size * 7;
    const innerSize = size * 5;
    const innerOffset = size;

    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, outerSize, outerSize);

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = size;

    switch (pattern) {
      case "rounded":
        ctx.beginPath();
        ctx.roundRect(x + size/2, y + size/2, outerSize - size, outerSize - size, size * 1.5);
        ctx.stroke();
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(x + outerSize/2, y + outerSize/2, outerSize/2 - size/2, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case "extra-rounded":
        ctx.beginPath();
        ctx.roundRect(x + size/2, y + size/2, outerSize - size, outerSize - size, size * 2.5);
        ctx.stroke();
        break;
      case "leaf":
        ctx.beginPath();
        ctx.roundRect(x + size/2, y + size/2, outerSize - size, outerSize - size, [size * 3, size * 0.5, size * 3, size * 0.5]);
        ctx.stroke();
        break;
      default:
        ctx.strokeRect(x + size/2, y + size/2, outerSize - size, outerSize - size);
    }
  };

  const drawInternalEye = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pattern: string, color: FillStyle) => {
    const eyeSize = size * 3;
    const centerX = x + eyeSize / 2;
    const centerY = y + eyeSize / 2;

    ctx.fillStyle = color;

    switch (pattern) {
      case "rounded":
        ctx.beginPath();
        ctx.roundRect(x, y, eyeSize, eyeSize, size * 0.8);
        ctx.fill();
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(centerX, centerY, eyeSize / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "diamond":
        ctx.beginPath();
        ctx.moveTo(centerX, y);
        ctx.lineTo(x + eyeSize, centerY);
        ctx.lineTo(centerX, y + eyeSize);
        ctx.lineTo(x, centerY);
        ctx.closePath();
        ctx.fill();
        break;
      case "star":
        const spikes = 5;
        const outerRadius = eyeSize / 2;
        const innerRadius = eyeSize / 4;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          const px = centerX + Math.cos(angle) * radius;
          const py = centerY + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        break;
      default:
        ctx.fillRect(x, y, eyeSize, eyeSize);
    }
  };

  const renderQR = async () => {
    try {
      const canvases = [canvasRef.current, floatingCanvasRef.current].filter(Boolean);
      if (canvases.length === 0) return;
      
      const qrData = generateQRData();
      if (!qrData.trim()) return;

      const qrMatrix = await QRCodeLib.create(qrData, {
        errorCorrectionLevel: errorCorrectionLevel as "L" | "M" | "Q" | "H",
      });

      const modules = qrMatrix.modules;
      const moduleCount = modules.size;
      const moduleSize = 15;
      const qrSize = moduleCount * moduleSize;
      const padding = 40;
      const extraHeight = overlayText ? 40 : 0;

      // Draw to both canvases
      canvases.forEach(canvas => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        // Set canvas size
        canvas.width = qrSize + padding * 2;
        canvas.height = qrSize + padding * 2 + extraHeight;

        // Fill background
        let bgFillStyle: FillStyle;
        if (bgGradient && bgGradientColors.length >= 2) {
          bgFillStyle = createCanvasGradient(ctx, 0, 0, canvas.width, canvas.height, bgGradientAngle, bgGradientColors);
        } else {
          bgFillStyle = lightColor;
        }
        ctx.fillStyle = bgFillStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Border fill style
        let borderFillStyle: FillStyle;
        if (borderGradient && borderGradientColors.length >= 2) {
          borderFillStyle = createCanvasGradient(ctx, 0, 0, canvas.width, canvas.height - extraHeight, borderGradientAngle, borderGradientColors);
        } else {
          borderFillStyle = borderColor;
        }

        if (frameStyle === "border") {
          ctx.strokeStyle = borderFillStyle;
          ctx.lineWidth = 4;
          ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20 - extraHeight);
        } else if (frameStyle === "rounded-border") {
          ctx.strokeStyle = borderFillStyle;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.roundRect(10, 10, canvas.width - 20, canvas.height - 20 - extraHeight, 15);
          ctx.stroke();
        }

        if (frameStyle === "scanme-top") {
          const fontSize = Math.max(14, Math.floor(qrSize * 0.08));
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.fillStyle = borderFillStyle;
          ctx.textAlign = "center";
          ctx.fillText("SCAN ME", canvas.width / 2, padding / 2 + fontSize / 2);
        } else if (frameStyle === "scanme-bottom") {
          const fontSize = Math.max(14, Math.floor(qrSize * 0.08));
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.fillStyle = borderFillStyle;
          ctx.textAlign = "center";
          ctx.fillText("SCAN ME", canvas.width / 2, canvas.height - 12);
        }

        // Dots fill style (for body modules only)
        let dotsFillStyle: FillStyle;
        if (dotsGradient && dotsGradientColors.length >= 2) {
          dotsFillStyle = createCanvasGradient(ctx, padding, padding, qrSize, qrSize, dotsGradientAngle, dotsGradientColors);
        } else {
          dotsFillStyle = darkColor;
        }

        // Eye fill style — always solid so all three eyes match consistently
        // When gradient is on, use the first gradient color for eyes
        const eyeSolidColor: string = dotsGradient && dotsGradientColors.length >= 1
          ? dotsGradientColors[0]
          : darkColor;

        const eyePositions = [
          { row: 0, col: 0 },
          { row: 0, col: moduleCount - 7 },
          { row: moduleCount - 7, col: 0 },
        ];

        const isInEyeArea = (row: number, col: number) => {
          return eyePositions.some(pos =>
            row >= pos.row && row < pos.row + 7 &&
            col >= pos.col && col < pos.col + 7
          );
        };

        for (let row = 0; row < moduleCount; row++) {
          for (let col = 0; col < moduleCount; col++) {
            if (isInEyeArea(row, col)) continue;
            if (modules.get(row, col)) {
              const x = padding + col * moduleSize;
              const y = padding + row * moduleSize;
              drawModule(ctx, x, y, moduleSize, bodyPattern, dotsFillStyle);
            }
          }
        }

        eyePositions.forEach(pos => {
          const x = padding + pos.col * moduleSize;
          const y = padding + pos.row * moduleSize;
          // Use bgFillStyle (same gradient object as main bg) so eye interior seamlessly matches background
          drawExternalEye(ctx, x, y, moduleSize, externalEyePattern, eyeSolidColor, bgFillStyle);
          drawInternalEye(ctx, x + moduleSize * 2, y + moduleSize * 2, moduleSize, internalEyePattern, eyeSolidColor);
        });

        if (logoData) {
          const scaledLogoSize = Math.max(10, Math.floor(qrSize * (logoSize / 100)));
          const logoX = (canvas.width - scaledLogoSize) / 2;
          const logoY = padding + (qrSize - scaledLogoSize) / 2;

          if (logoBackground) {
            ctx.fillStyle = lightColor;
            ctx.beginPath();
            ctx.roundRect(logoX - 5, logoY - 5, scaledLogoSize + 10, scaledLogoSize + 10, logoBorderRadius);
            ctx.fill();
          }

          try {
            const img = new Image();
            img.src = logoData;
            img.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.roundRect(logoX, logoY, scaledLogoSize, scaledLogoSize, logoBorderRadius);
              ctx.clip();
              ctx.drawImage(img, logoX, logoY, scaledLogoSize, scaledLogoSize);
              ctx.restore();
            };
          } catch (e) {}
        }

        if (overlayText) {
          const fontSize = Math.max(12, Math.floor(qrSize * 0.06));
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.fillStyle = overlayTextColor;
          ctx.textAlign = "center";
          ctx.fillText(overlayText, canvas.width / 2, canvas.height - padding / 3);
        }
      });
    } catch (error) {}
  };

  const handleNext = () => {
    const qrData = generateQRData();
    if (!qrData.trim()) {
      toast({ title: "Fill Required Fields", description: "Please enter data", variant: "destructive" });
      return;
    }
    goToStep(3);
  };

  const downloadQR = (quality?: "normal" | "high" | "ultra") => {
    const finalQuality = quality || "high";
    if (!canvasRef.current) return;

    const qualityMultipliers = {
      normal: 1,
      high: 2,
      ultra: 4,
    };

    const multiplier = qualityMultipliers[finalQuality];
    const originalCanvas = canvasRef.current;
    const highQualityCanvas = document.createElement("canvas");

    highQualityCanvas.width = originalCanvas.width * multiplier;
    highQualityCanvas.height = originalCanvas.height * multiplier;

    const ctx = highQualityCanvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(multiplier, multiplier);
    ctx.drawImage(originalCanvas, 0, 0);

    const link = document.createElement("a");
    link.download = `qr-code-${finalQuality}-${Date.now()}.png`;
    link.href = highQualityCanvas.toDataURL("image/png", 1);
    link.click();
    toast({ title: "Downloaded!", description: `QR code saved as PNG (${finalQuality} quality)` });
  };

  const copyQRToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopiedQR(true);
        toast({ title: "Copied!", description: "QR code copied to clipboard" });
        setTimeout(() => setCopiedQR(false), 2000);
      }, "image/png", 1);
    } catch {
      toast({ title: "Copy failed", description: "Use Download instead", variant: "destructive" });
    }
  };

  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast({ title: "Name Required", variant: "destructive" });
      return;
    }
    const newTemplate: CustomTemplate = {
      id: Date.now().toString(),
      name: templateName,
      darkColor, lightColor, frameStyle, overlayText, overlayTextColor,
      logoData, logoSize, logoBorderRadius, logoBackground,
      bodyPattern, externalEyePattern, internalEyePattern, errorCorrectionLevel,
    };
    const updated = [newTemplate, ...customTemplates].slice(0, 10);
    setCustomTemplates(updated);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
    setShowTemplateModal(false);
    setTemplateName("");
    toast({ title: "Template Saved!" });
  };

  const applyTemplate = (template: CustomTemplate) => {
    pushUndo();
    setDarkColor(template.darkColor);
    setLightColor(template.lightColor);
    setFrameStyle(template.frameStyle);
    setOverlayText(template.overlayText);
    setOverlayTextColor(template.overlayTextColor);
    setLogoData(template.logoData);
    setLogoSize(template.logoSize);
    setLogoBorderRadius(template.logoBorderRadius);
    setLogoBackground(template.logoBackground);
    setBodyPattern(template.bodyPattern);
    setExternalEyePattern(template.externalEyePattern);
    setInternalEyePattern(template.internalEyePattern);
    setErrorCorrectionLevel(template.errorCorrectionLevel);
    toast({ title: template.name, description: "Applied" });
  };

  const applyStylePreset = (preset: StylePreset) => {
    pushUndo();
    setActiveStylePreset(preset.id);
    setDarkColor(preset.darkColor);
    setLightColor(preset.lightColor);
    setBodyPattern(preset.bodyPattern);
    setExternalEyePattern(preset.externalEyePattern);
    setInternalEyePattern(preset.internalEyePattern);
    setDotsGradient(preset.dotsGradient);
    setDotsGradientColors(preset.dotsGradientColors);
    setDotsGradientAngle(preset.dotsGradientAngle);
    setBgGradient(preset.bgGradient);
    setBgGradientColors(preset.bgGradientColors);
    setBgGradientAngle(preset.bgGradientAngle);
  };

  const deleteTemplate = (id: string) => {
    const updated = customTemplates.filter(t => t.id !== id);
    setCustomTemplates(updated);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderPatternPreview = (type: string, pattern: string, size: number = 40) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);

    if (type === "body") {
      const moduleSize = size / 4;
      [[0,0], [1,0], [2,1], [0,2], [1,2], [2,2], [3,3]].forEach(([x, y]) => {
        drawModule(ctx, x * moduleSize, y * moduleSize, moduleSize, pattern, "#000000");
      });
    } else if (type === "external") {
      drawExternalEye(ctx, 2, 2, 5, pattern, "#000000", "#FFFFFF");
    } else if (type === "internal") {
      drawInternalEye(ctx, size/4, size/4, size/6, pattern, "#000000");
    }

    return canvas.toDataURL();
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is this QR code generator really free?",
      answer: "Yes, Pixocraft's QR code generator is 100% free with no hidden costs, scan limits, or sign-up requirements. You can generate as many static QR codes as you need for personal or commercial use."
    },
    {
      question: "Do the QR codes expire?",
      answer: "No. The static QR codes generated by our tool never expire. Since the data is encoded directly into the QR pattern, they will work indefinitely as long as the destination (like a URL) remains active."
    },
    {
      question: "Can I add my business logo to the QR code?",
      answer: "Absolutely! Our professional QR maker allows you to upload your own logo or choose from popular social media icons. We recommend using a high-contrast logo and keeping it centered for best scan reliability."
    },
    {
      question: "What is the difference between static and dynamic QR codes?",
      answer: "Static QR codes encode data directly and cannot be changed once printed. Dynamic QR codes use a redirect URL that allows you to update the destination and track scans. Our tool currently specializes in high-quality, permanent static QR codes."
    },
    {
      question: "What error correction level should I choose?",
      answer: "We recommend 'High' (H) if you are adding a logo or printing on surfaces that might get damaged. 'Medium' (M) is standard for most digital uses and provides a good balance between data density and reliability."
    },
    {
      question: "How do I ensure my QR code is scannable?",
      answer: "Ensure high contrast between the QR pattern and background. Avoid inverted colors (light pattern on dark background) as some older scanners struggle with them. Always test your code with multiple devices before printing."
    },
    {
      question: "Is it safe to use this QR generator for payments?",
      answer: "Yes. Because our tool runs 100% client-side in your browser, your sensitive payment data (like Bitcoin addresses) is never sent to our servers. It is one of the most secure ways to generate payment QR codes."
    },
    {
      question: "What size should I print my QR code?",
      answer: "For business cards, a minimum size of 2cm x 2cm is recommended. For marketing materials like posters, ensure the QR code is large enough to be scanned from a distance. Use our 'Ultra' download option for high-resolution print output."
    },
    {
      question: "What is the maximum scan distance?",
      answer: "The scan distance depends on the size of the printed QR code and the quality of the scanner camera. Generally, the ratio is 10:1 (e.g., a 10cm code can be scanned from 1 meter away)."
    },
    {
      question: "How long do QR codes last?",
      answer: "Static QR codes last forever. They are not dependent on any subscription or central database. As long as the material they are printed on remains intact, they will remain functional."
    },
    {
      question: "Does color affect scanning?",
      answer: "Yes. High contrast is vital. Dark colors on a light background work best. Avoid light-on-light or very similar shades, as scanners need to distinguish the modules clearly."
    },
    {
      question: "What is the quiet zone?",
      answer: "The quiet zone is the clear white border around the QR code. It's essential for scanners to identify the code's boundaries. A minimum of 4 modules of space is recommended."
    },
    {
      question: "Can I track scans?",
      answer: "Since we provide 100% private, static QR codes, we do not track scans. This ensures your privacy and the privacy of your users. For tracking, you would need a dynamic QR service."
    },
    {
      question: "Is there a scan limit?",
      answer: "No. Unlike some other 'free' tools, Pixocraft offers unlimited scans for every QR code you generate. There are no daily, monthly, or lifetime caps."
    },
    {
      question: "Which logo format is best?",
      answer: "We recommend using a transparent PNG or SVG for logos. This allows the logo to blend seamlessly with the QR pattern without white blocks around it."
    },
    {
      question: "Can I use QR codes on product packaging?",
      answer: "Yes, our high-resolution 'Ultra' export is specifically designed for professional printing on product packaging, labels, and boxes."
    },
    {
      question: "How to create a QR code for WiFi?",
      answer: "Select the 'WiFi Network' type, enter your network name (SSID), security type, and password. The generated code will connect users instantly when scanned."
    },
    {
      question: "Are QR codes secure?",
      answer: "Yes, especially static ones. They contain direct data without intermediate redirects. Our generator ensures all processing happens locally on your device for maximum security."
    },
    {
      question: "Can I print QR codes on transparent surfaces?",
      answer: "Yes, but you must ensure there is enough contrast. If printing on glass, use a white background block behind the code to ensure it's scannable."
    },
    {
      question: "What is the difference between QR and Barcode?",
      answer: "Barcodes are 1D and hold limited data. QR codes are 2D, hold significantly more information, and can be scanned from any orientation (360 degrees)."
    },
    {
      question: "How to resize a QR code without losing quality?",
      answer: "Always use our 'Ultra' (4x) download option. It generates a high-DPI image that can be scaled up for posters and billboards without pixelation."
    },
    {
      question: "Can I add multiple URLs to one QR code?",
      answer: "A single QR code typically points to one destination. To share multiple links, we recommend creating a 'link-in-bio' landing page and pointing the QR code to that URL."
    },
    {
      question: "Can I use QR codes for events?",
      answer: "Absolutely. QR codes are perfect for event check-ins, sharing schedules, speaker bios, and distributing digital passes securely."
    },
    {
      question: "Is signup required?",
      answer: "No. Pixocraft Tools is committed to a 'no-friction' experience. You can use all our professional features without ever creating an account."
    },
    {
      question: "Are there any hidden costs?",
      answer: "None. All features, including high-resolution downloads and custom branding, are 100% free for both personal and commercial use."
    }
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Pixocraft Professional QR Code Generator",
    "description": "High-resolution custom QR code maker with logo support, professional patterns, and offline capability. 100% free.",
    "brand": { "@type": "Brand", "name": "Pixocraft" },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free QR Code Generator with Logo | Pixocraft Tools",
    "description": "The world's most advanced free QR maker. Generate branded QR codes for WhatsApp, WiFi, and business instantly.",
    "url": "https://tools.pixocraft.in/tools/qr-maker"
  };

  const faqSchema = generateFAQSchema(faqItems);
  const softwareAppSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Professional QR Code Generator",
    description: "The world's most advanced free QR code generator. Create custom QR codes with logos, frames, and patterns. 100% private, offline-supported, and high-resolution output.",
    url: "https://tools.pixocraft.in/tools/qr-maker",
    applicationCategory: "UtilityApplication",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "QR Code Generator", url: "/tools/qr-maker" }
  ]);

  return (
    <>
      {!embedMode && <StructuredData data={faqSchema} />}
      {!embedMode && <StructuredData data={softwareAppSchema} />}
      {!embedMode && <StructuredData data={breadcrumbSchema} />}

      {/* Floating Mobile Preview - Draggable (touch + mouse) */}
      {selectedType && showFloatingPreview && (
        <div
          ref={floatingPreviewRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleTouchStart}
          className="fixed z-[9999] lg:hidden bg-black rounded-2xl p-2 shadow-lg cursor-move select-none"
          style={{
            left: `${floatingPreviewPos.x}px`,
            top: `${floatingPreviewPos.y}px`,
            width: '130px',
            userSelect: 'none'
          }}
          data-testid="floating-preview-mobile"
        >
          <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mb-2" />
          <div
            className="rounded-xl overflow-hidden"
            style={{ height: '120px' }}
          >
            <canvas ref={floatingCanvasRef} style={{ display: 'block', width: '100%', height: '100%', imageRendering: 'crisp-edges' }} />
          </div>
        </div>
      )}

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {!embedMode && (
          <div className="mb-6 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <Link href="/tools/developer">Developer Tools</Link> / <span>QR Code Generator</span>
          </div>
          )}

          {!embedMode && (
          <div className="text-center space-y-4 mb-12">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Create QR Code in Seconds
            </h1>
            <p className="text-2xl font-semibold text-primary">
              Free &bull; No Signup &bull; Instant &bull; Private
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Generate and download your QR code instantly — no login, no limits.
            </p>
            <p className="text-sm text-muted-foreground">
              Takes less than 3 seconds &bull; No account needed
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Badge variant="secondary" className="px-4 py-1 text-sm flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" /> 100% Client-Side
              </Badge>
              <Badge variant="secondary" className="px-4 py-1 text-sm flex items-center gap-1">
                <Smartphone className="h-3.5 w-3.5" /> Mobile Ready
              </Badge>
              <Badge variant="secondary" className="px-4 py-1 text-sm flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" /> No Scan Limits
              </Badge>
              <Badge variant="secondary" className="px-4 py-1 text-sm flex items-center gap-1">
                <Download className="h-3.5 w-3.5" /> 4K Ultra HD Output
              </Badge>
            </div>
          </div>
          )}

          {/* User Intent Capture Section */}
          {!embedMode && (
          <div className="mb-10 rounded-xl bg-muted/40 border px-6 py-5 max-w-3xl mx-auto text-center space-y-2">
            <p className="text-base font-semibold">Looking for a free QR code generator?</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you're searching for a fast and simple QR code tool, you're in the right place.
              Create QR codes instantly — no signup, no tracking, no limits.
            </p>
            <p className="text-xs text-muted-foreground">
              Works directly in your browser. 100% private and free forever.
            </p>
          </div>
          )}

          {/* Trust & Benefits Section */}
          {!embedMode && (
          <div className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-center mb-6">Why this QR Code Generator works better</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { icon: <Shield className="h-5 w-5 text-primary" />, text: "No signup required" },
                { icon: <Shield className="h-5 w-5 text-primary" />, text: "No tracking or data collection" },
                { icon: <Smartphone className="h-5 w-5 text-primary" />, text: "Works instantly in your browser" },
                { icon: <TrendingUp className="h-5 w-5 text-primary" />, text: "Unlimited QR codes" },
                { icon: <Download className="h-5 w-5 text-primary" />, text: "No watermark" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-card text-center">
                  {item.icon}
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          )}

          {/* TOOL INTERFACE STARTS HERE */}
          <div id="qr-generator" className="scroll-mt-16" />

          {/* Micro-proof trust signal */}
          {!embedMode && (
            <p className="text-center text-xs text-muted-foreground mb-4 flex items-center justify-center gap-1">
              <Users className="h-3.5 w-3.5" />
              Used by thousands — no data stored
            </p>
          )}

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8 mx-auto w-fit">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center">
                <button
                  onClick={() => { if (s < step) goToStep(s as 1 | 2 | 3); }}
                  disabled={s >= step}
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all ${step >= s ? "bg-primary" : "bg-muted"} ${s < step ? "cursor-pointer hover:opacity-80 active:scale-95" : "cursor-default"}`}
                  title={s < step ? `Back to Step ${s}` : undefined}
                  data-testid={`button-step-${s}`}
                >
                  {s}
                </button>
                {i < 2 && <div className={`h-1 w-12 mx-1 transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">What do you want to create?</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose a QR code type to get started</p>
              </div>
              {QR_TYPE_GROUPS.map(group => {
                const groupTypes = QR_TYPES.filter(t => t.group === group.id);
                return (
                  <div key={group.id}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2 h-2 rounded-full ${group.indicator}`} />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group.label}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {groupTypes.map(type => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => { setSelectedType(type.id); setFormData({}); goToStep(2); }}
                            className={`relative p-5 rounded-xl border border-border bg-gradient-to-br ${type.gradient} hover:border-primary hover:shadow-md transition-all duration-200 text-left group active:scale-[0.98]`}
                            data-testid={`button-qr-type-${type.id}`}
                          >
                            {type.badge && (
                              <span className={`absolute top-3 right-3 text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${type.badgeColor}`}>
                                {type.badge}
                              </span>
                            )}
                            <div className={`w-10 h-10 rounded-lg ${type.iconBg} flex items-center justify-center mb-3`}>
                              <Icon className={`w-5 h-5 ${type.iconColor}`} />
                            </div>
                            <p className="font-semibold text-sm text-foreground leading-tight">{type.label}</p>
                            <p className="text-xs text-muted-foreground mt-1 leading-snug">{type.description}</p>
                            <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-xs font-medium text-primary">Select</span>
                              <ArrowRight className="w-3 h-3 text-primary" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader><CardTitle>Enter Data</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {selectedType === "url" && (
                  <div><Label>URL</Label><Input placeholder="https://example.com" value={formData.url || ""} onChange={(e) => handleInputChange("url", e.target.value)} /></div>
                )}
                {selectedType === "text" && (
                  <div><Label>Text</Label><Textarea placeholder="Enter text..." value={formData.text || ""} onChange={(e) => handleInputChange("text", e.target.value)} rows={4} /></div>
                )}
                {selectedType === "email" && (
                  <div><Label>Email</Label><Input type="email" placeholder="user@example.com" value={formData.email || ""} onChange={(e) => handleInputChange("email", e.target.value)} /></div>
                )}
                {selectedType === "sms" && (
                  <>
                    <div><Label>Phone</Label><Input placeholder="+1234567890" value={formData.phone || ""} onChange={(e) => handleInputChange("phone", e.target.value)} /></div>
                    <div><Label>Message</Label><Textarea placeholder="Message..." value={formData.smsText || ""} onChange={(e) => handleInputChange("smsText", e.target.value)} rows={2} /></div>
                  </>
                )}
                {selectedType === "whatsapp" && (
                  <>
                    <div><Label>Phone Number</Label><Input placeholder="+1234567890 or 1234567890" value={formData.whatsappPhone || ""} onChange={(e) => handleInputChange("whatsappPhone", e.target.value)} /></div>
                    <div><Label>Message (Optional)</Label><Textarea placeholder="Premade message..." value={formData.whatsappMessage || ""} onChange={(e) => handleInputChange("whatsappMessage", e.target.value)} rows={3} /></div>
                  </>
                )}
                {selectedType === "wifi" && (
                  <>
                    <div><Label>Network Name</Label><Input placeholder="WiFi SSID" value={formData.wifiSsid || ""} onChange={(e) => handleInputChange("wifiSsid", e.target.value)} /></div>
                    <div><Label>Password</Label><Input type="password" placeholder="Password" value={formData.wifiPassword || ""} onChange={(e) => handleInputChange("wifiPassword", e.target.value)} /></div>
                    <div><Label>Security</Label><select className="w-full px-3 py-2 border rounded-md bg-background" value={formData.wifiSecurity || "WPA"} onChange={(e) => handleInputChange("wifiSecurity", e.target.value)}><option>WPA</option><option>WEP</option><option>Open</option></select></div>
                  </>
                )}
                {selectedType === "bitcoin" && (
                  <div><Label>Address</Label><Input placeholder="Bitcoin address" value={formData.bitcoinAddress || ""} onChange={(e) => handleInputChange("bitcoinAddress", e.target.value)} /></div>
                )}
                {selectedType === "vcard" && (
                  <>
                    <div><Label>Name</Label><Input placeholder="John Doe" value={formData.vcardName || ""} onChange={(e) => handleInputChange("vcardName", e.target.value)} /></div>
                    <div><Label>Phone</Label><Input placeholder="+1234567890" value={formData.vcardPhone || ""} onChange={(e) => handleInputChange("vcardPhone", e.target.value)} /></div>
                    <div><Label>Email</Label><Input type="email" placeholder="john@example.com" value={formData.vcardEmail || ""} onChange={(e) => handleInputChange("vcardEmail", e.target.value)} /></div>
                  </>
                )}
                <div className="flex gap-3 pt-4">
                  <Button variant="ghost" onClick={() => goToStep(1)} className="text-muted-foreground"><ArrowLeft className="h-4 w-4 mr-1" />Back</Button>
                  <Button onClick={handleNext} className="flex-1">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-stretch relative">
              <div ref={editColumnRef} className="flex-[2] min-w-0">
                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="w-full grid grid-cols-4 mb-7 h-11">
                    <TabsTrigger value="colors" className="text-sm font-medium">Colors</TabsTrigger>
                    <TabsTrigger value="design" className="text-sm font-medium">Design</TabsTrigger>
                    <TabsTrigger value="branding" className="text-sm font-medium">Branding</TabsTrigger>
                    <TabsTrigger value="settings" className="text-sm font-medium">Settings</TabsTrigger>
                  </TabsList>

                  {/* ── COLORS ──────────────────────────── */}
                  <TabsContent value="colors" className="space-y-7 mt-0 animate-in fade-in-0 duration-200">
                    {/* Full style presets */}
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div>
                            <CardTitle className="text-sm font-semibold">Style Presets</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">One click — full style applied instantly</p>
                          </div>
                          {activeStylePreset && (
                            <span className="text-[11px] text-muted-foreground font-medium px-2 py-0.5 rounded-full bg-muted">{STYLE_PRESETS.find(p => p.id === activeStylePreset)?.name}</span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6">
                        <div className="grid grid-cols-3 gap-3">
                          {STYLE_PRESETS.map(preset => {
                            const isActive = activeStylePreset === preset.id;
                            return (
                              <button
                                key={preset.id}
                                onClick={() => applyStylePreset(preset)}
                                className={`relative rounded-lg border-2 p-3 text-left transition-all ${isActive ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 shadow-md" : "border-muted hover:border-primary/60 hover:shadow-sm"}`}
                                data-testid={`button-preset-${preset.id}`}
                              >
                                {isActive && (
                                  <div className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                                    <svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                                  </div>
                                )}
                                <div className="flex gap-1.5 mb-2.5">
                                  <div className="h-6 w-6 rounded-sm border" style={{ background: preset.dotsGradient ? `linear-gradient(135deg, ${preset.dotsGradientColors.join(", ")})` : preset.darkColor }} />
                                  <div className="h-6 flex-1 rounded-sm border" style={{ backgroundColor: preset.lightColor }} />
                                </div>
                                <p className={`text-xs font-semibold leading-none ${isActive ? "text-primary" : ""}`}>{preset.name}</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">{preset.description}</p>
                              </button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Color palette strip */}
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3"><CardTitle className="text-sm font-semibold">Quick Colors</CardTitle></CardHeader>
                      <CardContent className="px-6 pb-6">
                        <div className="grid grid-cols-8 gap-2.5">
                          {COLOR_TEMPLATES.map(t => (
                            <button
                              key={t.id}
                              onClick={() => { setDarkColor(t.darkColor); setLightColor(t.lightColor); setDotsGradient(false); setBgGradient(false); setActiveStylePreset(null); }}
                              className="h-9 rounded-md border-2 border-muted hover:border-primary hover:ring-2 hover:ring-primary/30 transition-all"
                              style={{ background: `linear-gradient(135deg, ${t.darkColor} 50%, ${t.lightColor} 50%)` }}
                              title={t.name}
                              data-testid={`button-color-${t.id}`}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Dot color */}
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold">Dot Color</CardTitle>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-muted-foreground">Gradient</span>
                            <button
                              onClick={() => { pushUndo(); setDotsGradient(!dotsGradient); }}
                              role="switch"
                              aria-checked={dotsGradient}
                              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${dotsGradient ? "bg-primary border-primary" : "bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500"}`}
                              data-testid="toggle-dots-gradient"
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-100 shadow-md transition-all duration-300 ${dotsGradient ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6 space-y-4">
                        {!dotsGradient ? (
                          <div className="flex items-center gap-3">
                            <input type="color" value={darkColor} onMouseDown={pushUndo} onChange={(e) => setDarkColor(e.target.value)} className="h-9 w-12 rounded-md cursor-pointer border shrink-0" />
                            <Input value={darkColor} onFocus={pushUndo} onChange={(e) => setDarkColor(e.target.value)} className="font-mono text-sm" placeholder="#000000" />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Stop colors ({dotsGradientColors.length}/5)</span>
                              {dotsGradientColors.length < 5 && <Button size="sm" variant="outline" onClick={() => setDotsGradientColors([...dotsGradientColors, "#FF6B6B"])}><Plus className="h-3 w-3 mr-1" />Add</Button>}
                            </div>
                            {dotsGradientColors.map((c, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <input type="color" value={c} onChange={(e) => { const u = [...dotsGradientColors]; u[i] = e.target.value; setDotsGradientColors(u); }} className="h-9 w-12 rounded-md cursor-pointer border shrink-0" />
                                <Input value={c} onChange={(e) => { const u = [...dotsGradientColors]; u[i] = e.target.value; setDotsGradientColors(u); }} className="font-mono text-sm flex-1" />
                                {dotsGradientColors.length > 2 && <Button size="icon" variant="ghost" onClick={() => setDotsGradientColors(dotsGradientColors.filter((_, idx) => idx !== i))}><X className="h-3.5 w-3.5" /></Button>}
                              </div>
                            ))}
                            <div className="h-4 rounded-md" style={{ background: `linear-gradient(${dotsGradientAngle}deg, ${dotsGradientColors.join(", ")})` }} />
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground w-8 shrink-0 text-right">{dotsGradientAngle}°</span>
                              <input type="range" min="0" max="360" value={dotsGradientAngle} onMouseDown={pushUndo} onChange={(e) => setDotsGradientAngle(Number(e.target.value))} className="w-full" data-testid="slider-dots-gradient-angle" />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Background */}
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-semibold">Background</CardTitle>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-muted-foreground">Gradient</span>
                            <button
                              onClick={() => { pushUndo(); setBgGradient(!bgGradient); }}
                              role="switch"
                              aria-checked={bgGradient}
                              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${bgGradient ? "bg-primary border-primary" : "bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500"}`}
                              data-testid="toggle-bg-gradient"
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-100 shadow-md transition-all duration-300 ${bgGradient ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6 space-y-4">
                        {!bgGradient ? (
                          <div className="flex items-center gap-3">
                            <input type="color" value={lightColor} onMouseDown={pushUndo} onChange={(e) => setLightColor(e.target.value)} className="h-9 w-12 rounded-md cursor-pointer border shrink-0" />
                            <Input value={lightColor} onFocus={pushUndo} onChange={(e) => setLightColor(e.target.value)} className="font-mono text-sm" placeholder="#FFFFFF" />
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Stop colors ({bgGradientColors.length}/5)</span>
                              {bgGradientColors.length < 5 && <Button size="sm" variant="outline" onClick={() => setBgGradientColors([...bgGradientColors, "#F3E8FF"])}><Plus className="h-3 w-3 mr-1" />Add</Button>}
                            </div>
                            {bgGradientColors.map((c, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <input type="color" value={c} onChange={(e) => { const u = [...bgGradientColors]; u[i] = e.target.value; setBgGradientColors(u); }} className="h-9 w-12 rounded-md cursor-pointer border shrink-0" />
                                <Input value={c} onChange={(e) => { const u = [...bgGradientColors]; u[i] = e.target.value; setBgGradientColors(u); }} className="font-mono text-sm flex-1" />
                                {bgGradientColors.length > 2 && <Button size="icon" variant="ghost" onClick={() => setBgGradientColors(bgGradientColors.filter((_, idx) => idx !== i))}><X className="h-3.5 w-3.5" /></Button>}
                              </div>
                            ))}
                            <div className="h-4 rounded-md border" style={{ background: `linear-gradient(${bgGradientAngle}deg, ${bgGradientColors.join(", ")})` }} />
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-muted-foreground w-8 shrink-0 text-right">{bgGradientAngle}°</span>
                              <input type="range" min="0" max="360" value={bgGradientAngle} onMouseDown={pushUndo} onChange={(e) => setBgGradientAngle(Number(e.target.value))} className="w-full" data-testid="slider-bg-gradient-angle" />
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ── DESIGN ──────────────────────────── */}
                  <TabsContent value="design" className="space-y-7 mt-0 animate-in fade-in-0 duration-200">
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3"><CardTitle className="text-sm font-semibold">Body Pattern</CardTitle></CardHeader>
                      <CardContent className="px-6 pb-6">
                        <div className="grid grid-cols-8 gap-2">
                          {BODY_PATTERNS.map(p => (
                            <button
                              key={p.id}
                              onClick={() => { pushUndo(); setBodyPattern(p.id); }}
                              className={`aspect-square rounded-md border-2 overflow-hidden transition-all ${bodyPattern === p.id ? "border-primary ring-2 ring-primary ring-offset-2 shadow-sm" : "border-muted hover:border-primary/50"}`}
                              title={p.name}
                              data-testid={`button-body-${p.id}`}
                            >
                              <BodyPatternPreview pattern={p.id} />
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3">
                        <CardTitle className="text-sm font-semibold">Eye Style</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">Controls the three corner markers of the QR code</p>
                      </CardHeader>
                      <CardContent className="px-6 pb-6 space-y-5">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Outer Frame</p>
                          <div className="grid grid-cols-5 gap-2">
                            {EXTERNAL_EYE_PATTERNS.map(p => {
                              const eyeTooltips: Record<string, string> = { square: "Classic — better for scanning", rounded: "Modern look", circle: "Creative style", "extra-rounded": "Soft & friendly", leaf: "Unique & stylish" };
                              return (
                                <button
                                  key={p.id}
                                  onClick={() => { pushUndo(); setExternalEyePattern(p.id); }}
                                  className={`aspect-square rounded-md border-2 overflow-hidden transition-all ${externalEyePattern === p.id ? "border-primary ring-2 ring-primary ring-offset-2 shadow-sm" : "border-muted hover:border-primary/50"}`}
                                  title={eyeTooltips[p.id] || p.name}
                                  data-testid={`button-eye-outer-${p.id}`}
                                >
                                  <ExternalEyePreview pattern={p.id} />
                                </button>
                              );
                            })}
                          </div>
                          {externalEyePattern && (
                            <p className="text-[11px] text-muted-foreground mt-1.5">
                              {({ square: "Classic — better for scanning", rounded: "Modern look", circle: "Creative style", "extra-rounded": "Soft & friendly", leaf: "Unique & stylish" })[externalEyePattern]}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-2">Inner Dot</p>
                          <div className="grid grid-cols-5 gap-2">
                            {INTERNAL_EYE_PATTERNS.map(p => {
                              const innerTooltips: Record<string, string> = { square: "Standard — great for scanners", rounded: "Sleek modern feel", circle: "Minimal & clean", diamond: "Geometric pattern", star: "Eye-catching design" };
                              return (
                                <button
                                  key={p.id}
                                  onClick={() => { pushUndo(); setInternalEyePattern(p.id); }}
                                  className={`aspect-square rounded-md border-2 overflow-hidden transition-all ${internalEyePattern === p.id ? "border-primary ring-2 ring-primary ring-offset-2 shadow-sm" : "border-muted hover:border-primary/50"}`}
                                  title={innerTooltips[p.id] || p.name}
                                  data-testid={`button-eye-inner-${p.id}`}
                                >
                                  <InternalEyePreview pattern={p.id} />
                                </button>
                              );
                            })}
                          </div>
                          {internalEyePattern && (
                            <p className="text-[11px] text-muted-foreground mt-1.5">
                              {({ square: "Standard — great for scanners", rounded: "Sleek modern feel", circle: "Minimal & clean", diamond: "Geometric pattern", star: "Eye-catching design" })[internalEyePattern]}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ── BRANDING ────────────────────────── */}
                  <TabsContent value="branding" className="space-y-7 mt-0 animate-in fade-in-0 duration-200">
                    {/* Logo */}
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3"><CardTitle className="text-sm font-semibold">Logo</CardTitle></CardHeader>
                      <CardContent className="px-6 pb-6 space-y-4">
                        {!logoData ? (
                          <div
                            className={`rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center gap-3 py-8 cursor-pointer ${logoDragOver ? "border-primary bg-primary/5" : "border-muted hover:border-primary/50 hover:bg-muted/30"}`}
                            onDragOver={(e) => { e.preventDefault(); setLogoDragOver(true); }}
                            onDragLeave={() => setLogoDragOver(false)}
                            onDrop={handleLogoDrop}
                            onClick={() => document.getElementById("logo-file-input")?.click()}
                            data-testid="dropzone-logo"
                          >
                            <Upload className="h-7 w-7 text-muted-foreground" />
                            <div className="text-center">
                              <p className="text-sm font-medium">{logoDragOver ? "Drop here" : "Drag & drop or click to upload"}</p>
                              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, SVG, WebP</p>
                            </div>
                            <input id="logo-file-input" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" data-testid="input-logo-upload" />
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-muted/40 rounded-lg">
                              <div className="rounded-lg p-2 bg-background border flex items-center justify-center h-16 w-16 shrink-0">
                                <img src={logoData} alt="Logo" className="max-h-12 max-w-12 object-contain" />
                              </div>
                              <div className="flex-1 min-w-0 space-y-2">
                                <p className="text-xs text-muted-foreground">Logo ready</p>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => document.getElementById("logo-file-input-replace")?.click()} className="flex-1">Replace</Button>
                                  <Button variant="outline" size="sm" onClick={() => setLogoData(null)} data-testid="button-remove-logo"><X className="h-3.5 w-3.5 mr-1" />Remove</Button>
                                </div>
                                <input id="logo-file-input-replace" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Size: {logoSize}px</Label>
                                <input type="range" min="10" max="120" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full" data-testid="slider-logo-size" />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground">Corner radius: {logoBorderRadius}px</Label>
                                <input type="range" min="0" max="50" value={logoBorderRadius} onChange={(e) => setLogoBorderRadius(Number(e.target.value))} className="w-full" data-testid="slider-logo-radius" />
                              </div>
                            </div>

                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                              <input type="checkbox" checked={logoBackground} onChange={(e) => setLogoBackground(e.target.checked)} className="rounded" data-testid="checkbox-logo-background" />
                              <span className="text-muted-foreground">White background behind logo</span>
                            </label>

                            {logoSuggestedColors.length > 0 && (
                              <div className="pt-3 border-t space-y-3">
                                <p className="text-xs font-medium text-muted-foreground">Colors extracted from your logo</p>
                                <div className="flex flex-wrap gap-2">
                                  {logoSuggestedColors.map((color, i) => (
                                    <button
                                      key={i}
                                      className="h-8 w-8 rounded-md border-2 border-muted hover:border-primary hover:ring-2 hover:ring-primary/30 transition-all"
                                      style={{ backgroundColor: color }}
                                      title={color}
                                      onClick={() => { setDarkColor(color); setDotsGradient(false); }}
                                      data-testid={`button-logo-color-${i}`}
                                    />
                                  ))}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="flex-1" disabled={logoSuggestedColors.length < 2} onClick={() => { setDotsGradient(true); setDotsGradientColors(logoSuggestedColors.slice(0, 4)); setDotsGradientAngle(45); }} data-testid="button-apply-logo-gradient">Gradient Dots</Button>
                                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { setBgGradient(true); setBgGradientColors([logoSuggestedColors[0] + "22", "#FFFFFF"]); setBgGradientAngle(135); }} data-testid="button-apply-logo-bg">Apply to BG</Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Frame */}
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3"><CardTitle className="text-sm font-semibold">Frame Style</CardTitle></CardHeader>
                      <CardContent className="px-6 pb-6 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {FRAME_PRESETS.map(f => {
                            const frameDesc: Record<string, string> = { none: "No frame (clean look)", "scanme-top": "Adds text above QR", "scanme-bottom": "Adds text below QR", border: "Adds border around QR", "rounded-border": "Rounded corners style" };
                            const isActive = frameStyle === f.id;
                            return (
                              <button
                                key={f.id}
                                onClick={() => { pushUndo(); setFrameStyle(f.id); }}
                                style={{ transform: isActive ? "scale(1.02)" : "scale(1)" }}
                                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 text-center transition-all duration-150 ${isActive ? "border-primary bg-primary/5 ring-2 ring-primary/30 shadow-md" : "border-muted hover:border-primary/40 hover:bg-muted/20"}`}
                                data-testid={`button-frame-${f.id}`}
                              >
                                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${isActive ? "bg-primary/10" : "bg-muted/40"}`}>
                                  <FramePreviewIcon id={f.id} active={isActive} />
                                </div>
                                <div>
                                  <p className={`text-xs font-semibold leading-tight ${isActive ? "text-primary" : "text-foreground"}`}>{f.name}</p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{frameDesc[f.id]}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {frameStyle !== "none" && (
                          <div className="space-y-4 pt-5 border-t">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Border Color</Label>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-medium text-muted-foreground">Gradient</span>
                                <button
                                  onClick={() => { pushUndo(); setBorderGradient(!borderGradient); }}
                                  role="switch"
                                  aria-checked={borderGradient}
                                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${borderGradient ? "bg-primary border-primary" : "bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-500"}`}
                                  data-testid="toggle-border-gradient"
                                >
                                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-zinc-100 shadow-md transition-all duration-300 ${borderGradient ? "translate-x-6" : "translate-x-1"}`} />
                                </button>
                              </div>
                            </div>
                            {!borderGradient ? (
                              <div className="flex items-center gap-3">
                                <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="h-9 w-12 rounded-md cursor-pointer border shrink-0" />
                                <Input value={borderColor} onChange={(e) => setBorderColor(e.target.value)} className="font-mono text-sm" />
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">Colors ({borderGradientColors.length}/5)</span>
                                  {borderGradientColors.length < 5 && <Button size="sm" variant="outline" onClick={() => setBorderGradientColors([...borderGradientColors, "#FF6B6B"])}><Plus className="h-3 w-3 mr-1" />Add</Button>}
                                </div>
                                {borderGradientColors.map((c, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <input type="color" value={c} onChange={(e) => { const u = [...borderGradientColors]; u[i] = e.target.value; setBorderGradientColors(u); }} className="h-9 w-12 rounded-md cursor-pointer border shrink-0" />
                                    <Input value={c} onChange={(e) => { const u = [...borderGradientColors]; u[i] = e.target.value; setBorderGradientColors(u); }} className="font-mono text-sm flex-1" />
                                    {borderGradientColors.length > 2 && <Button size="icon" variant="ghost" onClick={() => setBorderGradientColors(borderGradientColors.filter((_, idx) => idx !== i))}><X className="h-3.5 w-3.5" /></Button>}
                                  </div>
                                ))}
                                <div className="h-4 rounded-md" style={{ background: `linear-gradient(${borderGradientAngle}deg, ${borderGradientColors.join(", ")})` }} />
                                <div className="flex items-center gap-3">
                                  <span className="text-xs text-muted-foreground w-8 shrink-0 text-right">{borderGradientAngle}°</span>
                                  <input type="range" min="0" max="360" value={borderGradientAngle} onMouseDown={pushUndo} onChange={(e) => setBorderGradientAngle(Number(e.target.value))} className="w-full" data-testid="slider-border-gradient-angle" />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Call-to-Action Text */}
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div>
                            <CardTitle className="text-sm font-semibold">Call-to-Action Text</CardTitle>
                            <p className="text-[11px] text-muted-foreground mt-0.5">Short text works best (max 32 chars)</p>
                          </div>
                          {overlayText && <span className={`text-[11px] font-medium ${overlayText.length > 28 ? "text-destructive" : "text-muted-foreground"}`}>{overlayText.length}/32</span>}
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6 space-y-3">
                        <div className="flex gap-3">
                          <Input
                            placeholder={selectedType === "url" ? "Visit Website" : selectedType === "whatsapp" ? "Chat Now" : selectedType === "email" ? "Send Email" : selectedType === "wifi" ? "Connect to WiFi" : selectedType === "vcard" ? "Save Contact" : "Scan me"}
                            value={overlayText}
                            onChange={(e) => setOverlayText(e.target.value.slice(0, 32))}
                            className="text-sm h-10"
                            data-testid="input-overlay-text"
                          />
                          {overlayText && <input type="color" value={overlayTextColor} onChange={(e) => setOverlayTextColor(e.target.value)} className="h-10 w-12 rounded-md cursor-pointer border shrink-0" title="Text color" />}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {(selectedType === "url"
                            ? ["Visit Website", "Open Link", "Learn More", "Get Offer"]
                            : selectedType === "whatsapp"
                            ? ["Chat Now", "Message Us", "Contact Us", "Get Help"]
                            : selectedType === "email"
                            ? ["Send Email", "Contact Us", "Reach Out", "Get in Touch"]
                            : selectedType === "wifi"
                            ? ["Connect to WiFi", "Free WiFi", "Scan to Connect"]
                            : selectedType === "vcard"
                            ? ["Save Contact", "Add to Contacts", "Connect with Me"]
                            : ["Scan me", "Visit website", "Open link", "Contact us", "Get offer"]
                          ).map(chip => (
                            <button
                              key={chip}
                              onClick={() => setOverlayText(chip)}
                              className={`px-2.5 py-1 rounded-full border text-[11px] font-medium transition-all ${overlayText === chip ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}
                              data-testid={`chip-cta-${chip.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* ── SETTINGS ────────────────────────── */}
                  <TabsContent value="settings" className="space-y-7 mt-0 animate-in fade-in-0 duration-200">
                    <Card>
                      <CardHeader className="px-6 pt-6 pb-3">
                        <CardTitle className="text-sm font-semibold">Scan Reliability</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">Higher = more damage-resistant, but slightly denser QR code</p>
                      </CardHeader>
                      <CardContent className="px-6 pb-6">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { l: "L", label: "Low", sub: "Faster scan", hint: "Clean environments", v: "7%" },
                            { l: "M", label: "Medium", sub: "Balanced", hint: "General use", v: "15%" },
                            { l: "Q", label: "High", sub: "Damage safe", hint: "Outdoor / print", v: "25%" },
                            { l: "H", label: "Max", sub: "Logo friendly", hint: "Use with logos", v: "30%" },
                          ].map(({ l, label, sub, hint, v }) => (
                            <button
                              key={l}
                              onClick={() => setErrorCorrectionLevel(l)}
                              className={`py-4 px-4 rounded-lg border-2 text-left transition-all ${errorCorrectionLevel === l ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 shadow-sm" : "border-muted hover:border-primary/50"}`}
                              data-testid={`button-ecl-${l}`}
                            >
                              <div className={`text-sm font-bold ${errorCorrectionLevel === l ? "text-primary" : ""}`}>{label}</div>
                              <div className="text-xs font-medium text-foreground mt-0.5">{sub}</div>
                              <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {customTemplates.length > 0 && (
                      <Card>
                        <CardHeader className="px-6 pt-6 pb-3"><CardTitle className="text-sm font-semibold">Saved Templates</CardTitle></CardHeader>
                        <CardContent className="px-6 pb-6">
                          <div className="flex flex-wrap gap-2">
                            {customTemplates.map(template => (
                              <div key={template.id} className="group relative">
                                <button onClick={() => applyTemplate(template)} className="px-3 py-2 rounded-md border text-sm font-medium hover:border-primary transition-colors">{template.name}</button>
                                <button onClick={() => deleteTemplate(template.id)} className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-destructive text-white rounded-full text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" data-testid={`button-delete-template-${template.id}`}><X className="h-2 w-2" /></button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Action bar */}
                <div className="flex items-center gap-2 mt-7 pt-5 border-t flex-wrap">
                  <Button variant="ghost" size="sm" onClick={() => goToStep(2)} className="text-muted-foreground" data-testid="button-back-to-step2"><ArrowLeft className="h-3.5 w-3.5 mr-1" />Back</Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={undo}
                    disabled={!canUndo}
                    title="Undo last change (Ctrl+Z)"
                    data-testid="button-undo"
                    className={`transition-all ${canUndo ? "" : "opacity-40"}`}
                  >
                    <Undo2 className="h-3.5 w-3.5 mr-1.5" />Undo
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowTemplateModal(true)} data-testid="button-save-template"><Save className="h-3.5 w-3.5 mr-1.5" />Save Template</Button>
                  <p className="text-xs text-muted-foreground ml-auto">Download options in preview panel</p>
                </div>
              </div>

              {/* Preview - Desktop only wrapper; JS syncs height to edit column so sticky works */}
              <div ref={previewWrapperRef} className="hidden lg:block flex-[1] relative min-w-0">
                <Card className="z-[200]" data-preview-section>
                  <CardHeader className="px-6 pt-6 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                      <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Live Preview</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 space-y-5">
                    <div
                      className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.025] cursor-default"
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        border: "1px solid var(--border)",
                        boxShadow: "0 0 0 1px var(--border), 0 8px 32px -8px rgba(0,0,0,0.12)"
                      }}
                    >
                      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%', imageRendering: 'crisp-edges' }} />
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 justify-center">
                      <Shield className="h-3 w-3" />Generated offline — never uploaded
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      <Button onClick={() => downloadQR("high")} className="w-full" data-testid="button-preview-hd">
                        <Download className="h-3.5 w-3.5 mr-2" />Download (HD)
                        <span className="ml-auto text-[10px] opacity-60 font-normal">~120 KB</span>
                      </Button>
                      <Button onClick={() => downloadQR("ultra")} variant="secondary" className="w-full" data-testid="button-preview-4k">
                        <Download className="h-3.5 w-3.5 mr-2" />Download Ultra (4K)
                        <span className="ml-auto text-[10px] opacity-60 font-normal">~480 KB</span>
                      </Button>
                      <Button onClick={copyQRToClipboard} variant="outline" className="w-full" data-testid="button-copy-qr">
                        {copiedQR ? <CheckCheck className="h-3.5 w-3.5 mr-2 text-green-500" /> : <Copy className="h-3.5 w-3.5 mr-2" />}
                        {copiedQR ? "Copied!" : "Copy QR Image"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {!embedMode && (<>
          {/* SEO Content Sections */}
          <section className="mt-20 space-y-20 border-t pt-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tight">The Science of QR Code Technology</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  QR Code (Quick Response Code) is a two-dimensional matrix barcode invented in 1994. While traditional barcodes store data linearly, QR codes utilize both vertical and horizontal axes, exponentially increasing data capacity. This technology is the backbone of modern digital-to-physical interaction.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-muted/50 rounded-2xl border">
                    <p className="font-extrabold text-primary text-3xl">7,089</p>
                    <p className="text-sm font-medium text-muted-foreground">Numeric Max Capacity</p>
                  </div>
                  <div className="p-6 bg-muted/50 rounded-2xl border">
                    <p className="font-extrabold text-primary text-3xl">Reed-Solomon</p>
                    <p className="text-sm font-medium text-muted-foreground">Advanced Error Correction</p>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <Card className="relative bg-background p-8 rounded-3xl border-2">
                  <h3 className="text-xl font-bold mb-4">How it Works: The 3 Pillars</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">1</div>
                      <div>
                        <p className="font-bold">Encoding</p>
                        <p className="text-sm text-muted-foreground">Binary data is converted into modules (dots) based on specific encoding modes.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">2</div>
                      <div>
                        <p className="font-bold">Scanning</p>
                        <p className="text-sm text-muted-foreground">Position markers allow scanners to detect the code's orientation and size instantly.</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">3</div>
                      <div>
                        <p className="font-bold">Decoding</p>
                        <p className="text-sm text-muted-foreground">The scanner interprets the pattern and triggers the encoded action or URL.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-12 py-16 border-t">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <h2 className="text-4xl font-bold">Why This QR Code Generator Is Different</h2>
                <p className="text-xl text-muted-foreground">Explore the key advantages that set our tool apart from generic QR generators.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {[
                  { title: "100% Private", desc: "All processing in your browser. No data sent to servers." },
                  { title: "Advanced Customization", desc: "Patterns, eye shapes, frames, logos, and full color control." },
                  { title: "4K Ultra Quality", desc: "Export in standard, HD (2x), or 4K (4x) resolution." },
                  { title: "No Limits", desc: "Unlimited codes, unlimited scans, forever free." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border bg-card hover:border-primary transition-all space-y-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-4xl font-bold">Static vs. Dynamic QR Codes</h2>
                <p className="text-xl text-muted-foreground">Understanding the fundamental difference for your business needs.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Save className="h-6 w-6 text-blue-500" />
                      </div>
                      Static QR Codes
                    </CardTitle>
                    <CardDescription className="text-base">Data is hard-coded into the pattern.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">Static codes are ideal for permanent information that never needs updating. They are more secure because they don't rely on external servers for redirection.</p>
                    <div className="space-y-3">
                      <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Key Benefits</p>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm">✅ <strong>Permanent:</strong> Never expires, no monthly fees</li>
                        <li className="flex items-center gap-2 text-sm">✅ <strong>Fast:</strong> Instant redirection to content</li>
                        <li className="flex items-center gap-2 text-sm">✅ <strong>Secure:</strong> 100% offline generation available</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-purple-500" />
                      </div>
                      Dynamic QR Codes
                    </CardTitle>
                    <CardDescription className="text-base">Redirects through a tracking server.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">Dynamic codes use a short URL that points to the destination. This allows you to change the link even after the code is printed and track detailed scan analytics.</p>
                    <div className="space-y-3">
                      <p className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Key Benefits</p>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm">✅ <strong>Editable:</strong> Change the URL anytime</li>
                        <li className="flex items-center gap-2 text-sm">✅ <strong>Analytics:</strong> Track location, device, and time</li>
                        <li className="flex items-center gap-2 text-sm">✅ <strong>Compact:</strong> Smaller pattern, easier to scan</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-center">Industry-Specific QR Strategies</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Restaurants & Menus", text: "Replace physical menus with contactless digital versions. Update your menu PDF via a single QR link for all tables." },
                  { title: "Real Estate", text: "Place QR codes on 'For Sale' signs to give buyers instant access to virtual tours, pricing, and agent contacts." },
                  { title: "E-commerce & Retail", text: "Add QR codes to product packaging for instructional videos, warranty registration, or re-ordering links." },
                  { title: "Event Management", text: "Simplify check-ins with QR tickets. Share event schedules and speaker bios instantly with attendees." },
                  { title: "Healthcare", text: "Provide patients with easy access to portal logins, medication instructions, and appointment booking." },
                  { title: "Educational Institutions", text: "Link textbooks to interactive learning materials, online quizzes, and supplementary video content." }
                ].map((item, i) => (
                  <div key={i} className="group p-8 rounded-3xl border bg-card hover-elevate transition-all space-y-4">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-muted/30 p-12 rounded-3xl border">
              <h2 className="text-4xl font-bold text-center">QR Code Generator vs Other QR Tools</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-base border-collapse bg-background rounded-2xl overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="p-5 text-left font-bold">Feature</th>
                      <th className="p-5 text-left font-bold">Other Generators</th>
                      <th className="p-5 text-left font-bold italic">Pixocraft</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-5 font-bold">Client-Side Processing</td>
                      <td className="p-5 text-muted-foreground">✖ Server-dependent</td>
                      <td className="p-5 font-bold text-green-600">✔ 100% Private</td>
                    </tr>
                    <tr className="border-b bg-muted/10">
                      <td className="p-5 font-bold">4K Export Quality</td>
                      <td className="p-5 text-muted-foreground">✖ Standard only</td>
                      <td className="p-5 font-bold text-green-600">✔ 4x Resolution</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-5 font-bold">No Signup Required</td>
                      <td className="p-5 text-muted-foreground">✖ Account needed</td>
                      <td className="p-5 font-bold text-green-600">✔ Instant access</td>
                    </tr>
                    <tr className="bg-muted/10">
                      <td className="p-5 font-bold">Unlimited Scans</td>
                      <td className="p-5 text-muted-foreground">✖ Limited or paid</td>
                      <td className="p-5 font-bold text-green-600">✔ Forever free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-12 pb-20">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-4xl font-bold">Advanced QR Code FAQ</h2>
                <p className="text-xl text-muted-foreground">Comprehensive answers for enterprise and personal users.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {faqItems.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-xl font-bold flex gap-3 text-primary">
                      <span className="opacity-30">Q.</span>
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed pl-8">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Supported QR Types */}
          <section className="space-y-12 py-20 border-t">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-4xl font-bold">Supported QR Code Types</h2>
              <p className="text-xl text-muted-foreground">Create QR codes for any purpose with our comprehensive type support.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">URL / Website</h3>
                <p className="text-sm text-muted-foreground">Direct users to your website, landing page, or any web link.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">WiFi Network</h3>
                <p className="text-sm text-muted-foreground">Share WiFi credentials instantly for restaurants, events, and offices.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">vCard / Contact</h3>
                <p className="text-sm text-muted-foreground">Let users save your contact info directly to their phone.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">Email Address</h3>
                <p className="text-sm text-muted-foreground">Create pre-filled email links for easy customer communication.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">SMS / Text</h3>
                <p className="text-sm text-muted-foreground">Send pre-written text messages with a single scan.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Connect users directly to WhatsApp conversations.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">Plain Text</h3>
                <p className="text-sm text-muted-foreground">Store any text, passwords, or promotional messages.</p>
              </div>
              <div className="p-6 rounded-2xl border bg-card hover:border-primary transition-all">
                <h3 className="font-bold text-lg mb-2">Bitcoin Address</h3>
                <p className="text-sm text-muted-foreground">Accept cryptocurrency payments with embedded wallet addresses.</p>
              </div>
            </div>
          </section>

          {/* QR Code Best Practices */}
          <section className="space-y-12 py-20 border-t bg-muted/30 -mx-4 px-4 md:-mx-8 md:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-4xl font-bold">QR Code Scanning Best Practices</h2>
              <p className="text-xl text-muted-foreground">Master the technical requirements for maximum scannability.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Contrast & Clarity</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Use high contrast between dark and light colors</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Black on white is the gold standard for reliability</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Avoid gradients and transparency in the QR pattern itself</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Size & Resolution</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Minimum size: 2cm x 2cm for reliable scanning</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Use 4K Ultra export for print materials</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Higher resolution prevents pixelation at larger sizes</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Quiet Zone & Placement</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Leave white space around the code (quiet zone)</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Don't crop or truncate the code</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Place on uncluttered backgrounds for easy scanning</span></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Logo & Testing</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Keep logo size under 30% of total QR code</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Always test with multiple devices before deployment</span></li>
                  <li className="flex gap-3"><span className="text-primary">✓</span> <span>Use error correction level H for logo overlay</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 border-t">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold">Create Your QR Code Now</h2>
                <p className="text-xl text-muted-foreground">Generate unlimited QR codes instantly with advanced customization.</p>
              </div>
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg"
                onClick={() => {
                  const toolSection = document.querySelector('[data-preview-section]')?.parentElement?.parentElement;
                  if (toolSection) {
                    toolSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                data-testid="button-cta-create-qr"
              >
                Create QR Code Now
              </Button>
            </div>
          </section>

          {/* QR Code Hub - All Use Cases */}
          <section className="mt-16 max-w-5xl mx-auto border-t pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">QR Code Hub: All Use Cases</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore dedicated guides for every QR code use case — each with tips, examples, and the generator built in.
              </p>
            </div>

            {[
              {
                icon: Share2,
                label: "Social QR Codes",
                pages: [
                  { href: "/tools/qr-code-for-instagram", title: "QR Code for Instagram", desc: "Drive followers to your Instagram profile instantly with a scannable QR code." },
                  { href: "/tools/qr-code-for-facebook", title: "QR Code for Facebook", desc: "Share your Facebook page or profile with a single scan — no typing required." },
                  { href: "/tools/qr-code-for-youtube", title: "QR Code for YouTube", desc: "Link viewers directly to your YouTube channel or video with a QR code." },
                  { href: "/tools/qr-code-for-linkedin", title: "QR Code for LinkedIn", desc: "Share your LinkedIn profile at events or on business cards effortlessly." },
                  { href: "/tools/qr-code-for-whatsapp", title: "QR Code for WhatsApp", desc: "Let people message you on WhatsApp instantly by scanning your QR code." },
                ],
              },
              {
                icon: Megaphone,
                label: "Marketing QR Codes",
                pages: [
                  { href: "/tools/qr-code-for-flyers", title: "QR Code for Flyers", desc: "Turn printed flyers into interactive experiences with embedded QR codes." },
                  { href: "/tools/qr-code-for-posters", title: "QR Code for Posters", desc: "Add a scannable QR code to posters to connect offline audiences to online content." },
                  { href: "/tools/qr-code-for-coupons", title: "QR Code for Coupons", desc: "Distribute digital discount coupons via QR codes for easy redemption." },
                  { href: "/tools/qr-code-for-business-promotion", title: "QR Code for Business Promotion", desc: "Promote your business with branded QR codes across all marketing materials." },
                  { href: "/tools/qr-code-for-product-marketing", title: "QR Code for Product Marketing", desc: "Link product QR codes to landing pages, demos, or promotional videos." },
                ],
              },
              {
                icon: Briefcase,
                label: "Business QR Codes",
                pages: [
                  { href: "/tools/qr-code-for-google-reviews", title: "QR Code for Google Reviews", desc: "Make it easy for customers to leave Google reviews by scanning a QR code." },
                  { href: "/tools/qr-code-for-contact-forms", title: "QR Code for Contact Forms", desc: "Direct customers to your contact form instantly with a scannable QR code." },
                  { href: "/tools/qr-code-for-feedback-forms", title: "QR Code for Feedback Forms", desc: "Collect customer feedback quickly by linking your feedback form to a QR code." },
                  { href: "/tools/qr-code-for-surveys", title: "QR Code for Surveys", desc: "Increase survey response rates by sharing your survey via QR code." },
                  { href: "/tools/qr-code-for-lead-capture", title: "QR Code for Lead Capture", desc: "Capture leads at events and in-store by scanning directly into your CRM." },
                ],
              },
              {
                icon: Wrench,
                label: "Utility QR Codes",
                pages: [
                  { href: "/tools/qr-code-for-wifi", title: "QR Code for WiFi", desc: "Let guests connect to your WiFi network instantly — no password typing needed." },
                  { href: "/tools/qr-code-for-payments", title: "QR Code for Payments", desc: "Accept payments seamlessly by encoding your payment link into a QR code." },
                  { href: "/tools/qr-code-for-vcard-contacts", title: "QR Code for vCard Contacts", desc: "Share your contact details digitally with a scannable vCard QR code." },
                  { href: "/tools/qr-code-for-email", title: "QR Code for Email", desc: "Pre-fill an email to your address when someone scans your QR code." },
                  { href: "/tools/qr-code-for-sms", title: "QR Code for SMS", desc: "Allow users to send a pre-written SMS message with one scan." },
                ],
              },
              {
                icon: Building2,
                label: "Industry QR Codes",
                pages: [
                  { href: "/tools/qr-code-for-restaurant-menu", title: "QR Code for Restaurant Menu", desc: "Offer a contactless digital menu experience for your restaurant or café." },
                  { href: "/tools/qr-code-for-property-listings", title: "QR Code for Property Listings", desc: "Display QR codes on for-sale signs to instantly share virtual tours and details." },
                  { href: "/tools/qr-code-for-product-packaging", title: "QR Code for Product Packaging", desc: "Add QR codes to packaging linking to instructions, warranties, or reviews." },
                  { href: "/tools/qr-code-for-event-tickets", title: "QR Code for Event Tickets", desc: "Generate scannable event tickets and streamline check-in at any venue." },
                ],
              },
            ].map((category) => (
              <div key={category.label} className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <category.icon className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">{category.label}</h3>
                </div>
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
                >
                  {category.pages.map((page) => (
                    <Link key={page.href} href={page.href}>
                      <div
                        className="flex flex-col gap-2 p-5 rounded-lg border bg-card hover-elevate cursor-pointer h-full"
                        data-testid={`card-qr-usecase-${page.href.split("/").pop()}`}
                      >
                        <h4 className="font-semibold text-sm leading-snug">{page.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed flex-1">{page.desc}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-1">
                          Learn More <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Related Tools */}
          <section className="mt-16 max-w-4xl mx-auto border-t pt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/tools/barcode-generator">
                <div className="p-4 rounded-lg border bg-card hover:border-primary transition-all cursor-pointer">
                  <p className="font-semibold text-sm mb-1">Barcode Generator</p>
                  <p className="text-xs text-muted-foreground">Create barcodes for products and inventory</p>
                </div>
              </Link>
              <Link href="/tools/url-shortener">
                <div className="p-4 rounded-lg border bg-card hover:border-primary transition-all cursor-pointer">
                  <p className="font-semibold text-sm mb-1">URL Shortener</p>
                  <p className="text-xs text-muted-foreground">Shorten long URLs for sharing</p>
                </div>
              </Link>
              <Link href="/tools/image-compressor">
                <div className="p-4 rounded-lg border bg-card hover:border-primary transition-all cursor-pointer">
                  <p className="font-semibold text-sm mb-1">Image Compressor</p>
                  <p className="text-xs text-muted-foreground">Compress images while maintaining quality</p>
                </div>
              </Link>
              <Link href="/tools/password-generator">
                <div className="p-4 rounded-lg border bg-card hover:border-primary transition-all cursor-pointer">
                  <p className="font-semibold text-sm mb-1">Password Generator</p>
                  <p className="text-xs text-muted-foreground">Create strong secure passwords</p>
                </div>
              </Link>
              <Link href="/tools/html-beautifier">
                <div className="p-4 rounded-lg border bg-card hover:border-primary transition-all cursor-pointer">
                  <p className="font-semibold text-sm mb-1">HTML Beautifier</p>
                  <p className="text-xs text-muted-foreground">Format and beautify HTML code</p>
                </div>
              </Link>
              <Link href="/tools/pdf-merger">
                <div className="p-4 rounded-lg border bg-card hover:border-primary transition-all cursor-pointer">
                  <p className="font-semibold text-sm mb-1">PDF Merger</p>
                  <p className="text-xs text-muted-foreground">Combine multiple PDF files</p>
                </div>
              </Link>
            </div>
          </section>

          {/* Create QR Code Online Section - Keyword Rich Content */}
          <section className="py-20 max-w-4xl mx-auto border-t">
            <h2 className="text-3xl font-bold mb-6">Create QR Code Online for Any Purpose</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                You can create QR codes online for websites, WiFi networks, contact cards, social media profiles, payments, and more. Our free QR code generator lets you design and download high-resolution QR codes instantly without signup. Whether you need to generate QR codes for marketing campaigns, product packaging, event management, or customer engagement, our powerful online QR code maker provides everything you need in one easy-to-use platform.
              </p>
              <p>
                Create custom QR codes with advanced features like logo branding, custom colors, frames, and pattern designs. Our QR code maker free tool supports all QR code types including dynamic links, WiFi credentials, vCards, emails, SMS, Bitcoin addresses, and plain text. Generate unlimited QR codes and download them in multiple resolutions (Normal, High Quality, Ultra High Definition) for both digital and print use.
              </p>
            </div>
          </section>

          {/* Free QR Code Maker - Keyword Focused Section */}
          <section className="py-20 max-w-4xl mx-auto border-t">
            <h2 className="text-3xl font-bold mb-6">Free QR Code Maker – Generate QR Codes Instantly</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                Our free QR code maker allows you to generate QR codes instantly for websites, WiFi networks, business cards, and social media profiles. Create unlimited QR codes online and download them in high resolution without signup or registration. Whether you need a simple QR code for a URL or a complex code with branding, customization, and logo overlay, our free online QR code generator handles it all.
              </p>
              <p>
                Best of all, this QR code maker is completely free and works offline. No limits on the number of codes you can generate, no watermarks, and no paid subscriptions. Generate QR codes for personal use, business marketing, event management, product packaging, or any other purpose instantly.
              </p>
            </div>
          </section>

          {/* How to Create a QR Code Online - Structured How-To Section */}
          <section className="py-20 max-w-4xl mx-auto border-t bg-muted/30 -mx-4 px-4 md:-mx-8 md:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">How to Generate a QR Code Online</h2>
              <p className="text-lg text-muted-foreground mb-12">Follow these simple steps to create your custom QR code in minutes.</p>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Enter Your Data</h3>
                    <p className="text-muted-foreground">Select the QR code type (URL, WiFi, vCard, Email, SMS, or Bitcoin address) and enter the data you want to encode. Our online QR code generator supports all major QR code formats.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Customize Your Design</h3>
                    <p className="text-muted-foreground">Choose colors, patterns, add a logo, select eye patterns, and apply frames. Preview your custom QR code in real-time as you make changes. Save your design as a template for future use.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Download in High Resolution</h3>
                    <p className="text-muted-foreground">Download your QR code in high-resolution PNG format. Choose from Normal (1x), High Quality (2x), or Ultra High Definition (4x) for print and digital applications.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real Examples of QR Code Usage */}
          <section className="py-20 max-w-4xl mx-auto border-t">
            <h2 className="text-3xl font-bold mb-8 text-center">Real Examples of QR Code Usage</h2>
            <p className="text-lg text-muted-foreground text-center mb-12">See how QR codes are used in real-world scenarios across different industries.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-xl font-bold">QR Code on Restaurant Menu</h3>
                <p className="text-muted-foreground text-sm">Restaurants display QR codes on tables that link to digital menus. Customers scan with their phones to view menu items, prices, and place orders without touching a physical menu. This enables faster ordering, easy menu updates, and contactless service during busy hours.</p>
                <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground">
                  Scan to view menu → Place order → Receive food
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-xl font-bold">QR Code on Product Packaging</h3>
                <p className="text-muted-foreground text-sm">E-commerce brands print QR codes on product boxes that link to product pages, authenticity verification, user manuals, or customer feedback surveys. This increases customer engagement and helps verify that products are genuine and not counterfeit.</p>
                <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground">
                  Scan to verify product → Access manual → Leave review
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-xl font-bold">QR Code on Business Cards</h3>
                <p className="text-muted-foreground text-sm">Professionals add QR codes to business cards that link to their contact information (vCard), LinkedIn profile, or website. When someone scans the QR code, contact details are automatically saved to their phone, making networking effortless and eliminating manual data entry.</p>
                <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground">
                  Scan business card → Save contact → Connect on LinkedIn
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6 space-y-4">
                <h3 className="text-xl font-bold">QR Code on Event Tickets</h3>
                <p className="text-muted-foreground text-sm">Event organizers include QR codes on digital or printed tickets. At the event entrance, staff scan the QR codes to verify tickets, check attendance, and prevent fraud. This streamlines check-in and provides real-time attendee data to event planners.</p>
                <div className="bg-muted p-4 rounded-md text-center text-sm text-muted-foreground">
                  Scan ticket → Verify entry → Track attendance
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices for QR Code Marketing - Authority Content */}
          <section className="py-20 max-w-4xl mx-auto border-t">
            <h2 className="text-3xl font-bold mb-6 text-center">Best Practices for QR Code Marketing</h2>
            <p className="text-lg text-muted-foreground mb-12 text-center">Maximize the effectiveness of your QR codes with these proven marketing strategies.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">QR Codes for Packaging</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Place QR codes on product packaging to link customers to unboxing videos, usage instructions, or exclusive discounts</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Enable product authentication by scanning QR codes to verify genuine products and prevent counterfeits</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Create branded QR code designs that match your packaging aesthetic and reinforce brand identity</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">QR Codes for Payments</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Generate Bitcoin and cryptocurrency QR codes for seamless payment processing at point-of-sale</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Link QR codes to digital wallets and payment platforms to reduce checkout friction and increase conversions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Display QR codes in invoices and receipts to enable instant payment links and improve cash flow</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">QR Codes for Marketing Campaigns</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Include QR codes in print advertising, billboards, and posters to drive online traffic and track campaign performance</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Use QR codes in email campaigns and social media posts to increase engagement and click-through rates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Create time-limited promotional QR codes for seasonal campaigns and special offers to create urgency</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">QR Codes for Contactless Services</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Display QR codes for touchless menus, WiFi access, and contactless check-ins in hospitality businesses</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Generate vCard QR codes for contactless business card sharing and easy contact information exchange</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Create WiFi QR codes to provide secure guest network access without manually sharing passwords</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">QR Codes for Customer Feedback</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Link QR codes to customer feedback forms and surveys to gather insights and improve your products or services</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Place QR codes on receipts to encourage product reviews and ratings on popular review platforms</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Generate SMS QR codes to collect customer feedback via text messages for instant response collection</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">QR Code Analytics & Tracking</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Use unique QR codes for different marketing channels to track which campaigns drive the most engagement</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Monitor scan counts, locations, and device types to understand customer behavior and optimize campaigns</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Test different QR code designs and colors to identify which variations generate higher scan rates</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          </>)}

          {/* Popular QR Code Tools — Internal Linking */}
          {!embedMode && (
          <section className="py-16 max-w-4xl mx-auto border-t">
            <h2 className="text-2xl font-bold mb-6 text-center">Popular QR Code Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: "/tools/qr-code-for-wifi", label: "WiFi QR Code Generator" },
                { href: "/tools/qr-code-for-whatsapp", label: "WhatsApp QR Code Generator" },
                { href: "/tools/qr-code-for-instagram", label: "Instagram QR Code Generator" },
                { href: "/tools/qr-code-for-payments", label: "Payment QR Code Generator" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 p-4 rounded-lg border bg-card hover-elevate text-sm font-medium"
                >
                  <QrCode className="h-4 w-4 text-primary shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
          )}

          {/* Quick FAQ Section */}
          {!embedMode && (
          <section className="py-16 max-w-3xl mx-auto border-t">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is this QR code generator free?", a: "Yes, it is completely free with no hidden costs." },
                { q: "Do I need to sign up?", a: "No, you can generate QR codes instantly without creating an account." },
                { q: "Is my data safe?", a: "Yes, everything works locally in your browser with no tracking." },
                { q: "Can I add a logo to my QR code?", a: "Yes, you can customize your QR code with logos and colors." },
                { q: "Do QR codes expire?", a: "No, generated QR codes do not expire." },
              ].map((item, i) => (
                <div key={i} className="border rounded-lg px-5 py-4 bg-card space-y-1">
                  <p className="font-semibold text-sm">{item.q}</p>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
          )}

          {/* Save Template Modal */}
          {showTemplateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-sm">
                <CardHeader><CardTitle>Save Template</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Template name" value={templateName} onChange={(e) => setTemplateName(e.target.value)} autoFocus />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setShowTemplateModal(false)}>Cancel</Button>
                    <Button className="flex-1" onClick={saveTemplate}>Save</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

    </>
  );
}

function FrameQRSquare({ active }: { active?: boolean }) {
  const qrColor = active ? "bg-primary/60" : "bg-muted-foreground/40";
  const borderColor = active ? "border-primary/50" : "border-muted-foreground/30";
  return (
    <div className={`w-9 h-9 border ${borderColor} bg-background flex items-center justify-center flex-shrink-0`}>
      <div className="grid grid-cols-3 gap-[2px] p-[2px] w-full h-full">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className={`rounded-[1px] ${[0,2,6,8].includes(i) ? qrColor : i === 4 ? "bg-transparent" : `${qrColor} opacity-50`}`} />
        ))}
      </div>
    </div>
  );
}

function FramePreviewIcon({ id, active }: { id: string; active?: boolean }) {
  const textBarColor = active ? "bg-primary/40" : "bg-muted-foreground/30";
  const ringColor = active ? "border-primary/50" : "border-muted-foreground/40";

  if (id === "none") return (
    <div className="flex flex-col items-center justify-center gap-1">
      <FrameQRSquare active={active} />
      <span className="text-[8px] text-muted-foreground/50 font-medium tracking-wide">CLEAN</span>
    </div>
  );
  if (id === "scanme-top") return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-11 h-2.5 rounded-[2px] ${textBarColor} flex items-center justify-center`}>
        <span className="text-[5px] text-white font-bold tracking-wider">SCAN ME</span>
      </div>
      <FrameQRSquare active={active} />
    </div>
  );
  if (id === "scanme-bottom") return (
    <div className="flex flex-col items-center gap-1">
      <FrameQRSquare active={active} />
      <div className={`w-11 h-2.5 rounded-[2px] ${textBarColor} flex items-center justify-center`}>
        <span className="text-[5px] text-white font-bold tracking-wider">SCAN ME</span>
      </div>
    </div>
  );
  if (id === "border") return (
    <div className={`p-1.5 border-2 ${ringColor}`}>
      <FrameQRSquare active={active} />
    </div>
  );
  if (id === "rounded-border") return (
    <div className={`p-1.5 border-2 rounded-lg ${ringColor}`}>
      <FrameQRSquare active={active} />
    </div>
  );
  return <FrameQRSquare active={active} />;
}

function BodyPatternPreview({ pattern }: { pattern: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 40;
    canvas.height = 40;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 40, 40);

    const moduleSize = 8;
    const positions = [[0,0],[1,0],[2,0],[3,1],[0,2],[1,2],[2,2],[3,3],[1,3]];
    
    positions.forEach(([x, y]) => {
      ctx.fillStyle = "#000000";
      const px = x * moduleSize + 4;
      const py = y * moduleSize + 4;
      const gap = moduleSize * 0.1;
      const ms = moduleSize - gap;

      switch (pattern) {
        case "rounded":
          ctx.beginPath();
          ctx.roundRect(px, py, ms, ms, moduleSize * 0.3);
          ctx.fill();
          break;
        case "dots":
          ctx.beginPath();
          ctx.arc(px + moduleSize/2, py + moduleSize/2, moduleSize * 0.35, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "classy":
          ctx.beginPath();
          ctx.roundRect(px, py, ms, ms, [moduleSize * 0.4, 0, moduleSize * 0.4, 0]);
          ctx.fill();
          break;
        case "classy-rounded":
          ctx.beginPath();
          ctx.roundRect(px, py, ms, ms, [moduleSize * 0.5, moduleSize * 0.1, moduleSize * 0.5, moduleSize * 0.1]);
          ctx.fill();
          break;
        case "extra-rounded":
          ctx.beginPath();
          ctx.arc(px + moduleSize/2, py + moduleSize/2, moduleSize * 0.4, 0, Math.PI * 2);
          ctx.fill();
          break;
        case "vertical":
          ctx.fillRect(px + moduleSize * 0.25, py, moduleSize * 0.5, moduleSize);
          break;
        case "horizontal":
          ctx.fillRect(px, py + moduleSize * 0.25, moduleSize, moduleSize * 0.5);
          break;
        default:
          ctx.fillRect(px, py, ms, ms);
      }
    });
  }, [pattern]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function ExternalEyePreview({ pattern }: { pattern: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 40;
    canvas.height = 40;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 40, 40);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4;

    switch (pattern) {
      case "rounded":
        ctx.beginPath();
        ctx.roundRect(6, 6, 28, 28, 6);
        ctx.stroke();
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(20, 20, 14, 0, Math.PI * 2);
        ctx.stroke();
        break;
      case "extra-rounded":
        ctx.beginPath();
        ctx.roundRect(6, 6, 28, 28, 10);
        ctx.stroke();
        break;
      case "leaf":
        ctx.beginPath();
        ctx.roundRect(6, 6, 28, 28, [12, 2, 12, 2]);
        ctx.stroke();
        break;
      default:
        ctx.strokeRect(6, 6, 28, 28);
    }
  }, [pattern]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function InternalEyePreview({ pattern }: { pattern: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 40;
    canvas.height = 40;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 40, 40);

    ctx.fillStyle = "#000000";
    const size = 20;
    const x = 10;
    const y = 10;
    const cx = 20;
    const cy = 20;

    switch (pattern) {
      case "rounded":
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, 5);
        ctx.fill();
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(cx, cy, size/2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "diamond":
        ctx.beginPath();
        ctx.moveTo(cx, y);
        ctx.lineTo(x + size, cy);
        ctx.lineTo(cx, y + size);
        ctx.lineTo(x, cy);
        ctx.closePath();
        ctx.fill();
        break;
      case "star":
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = size / 4;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        break;
      default:
        ctx.fillRect(x, y, size, size);
    }
  }, [pattern]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
