import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Shield, Save, X, Smartphone } from "lucide-react";
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
  logoPreset: string | null;
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
  { id: "url", label: "URL / Website", icon: LinkIcon, description: "Link to website" },
  { id: "vcard", label: "vCard / Contact", icon: User, description: "Save contact info" },
  { id: "text", label: "Plain Text", icon: FileText, description: "Any text message" },
  { id: "email", label: "Email Address", icon: User, description: "Send email" },
  { id: "sms", label: "SMS / Text", icon: User, description: "Send SMS" },
  { id: "wifi", label: "WiFi Network", icon: User, description: "Connect to WiFi" },
  { id: "bitcoin", label: "Bitcoin Address", icon: User, description: "Send payment" },
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

export default function QRMaker() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoPreset, setLogoPreset] = useState<string | null>(null);
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setFloatingPreviewPos({
        x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 130)),
        y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 180))
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!floatingPreviewRef.current) return;
    const rect = floatingPreviewRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  useEffect(() => {
    if (step === 3 && selectedType && canvasRef.current) {
      const timer = setTimeout(() => renderQR(), 100);
      return () => clearTimeout(timer);
    }
  }, [darkColor, lightColor, frameStyle, logoPreset, logoSize, logoBorderRadius, logoBackground, bodyPattern, externalEyePattern, internalEyePattern, errorCorrectionLevel, overlayText, overlayTextColor, step, selectedType, formData]);

  useSEO({
    title: "Free QR Code Generator | Custom Patterns & Logos",
    description: "Create professional QR codes with custom patterns, colors & logos. No signup needed. 100% offline & private. Perfect for businesses & marketing.",
    keywords: "qr code generator, free qr code maker, custom qr codes, qr code designer, qr code with logo",
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
      case "wifi": return data.wifiSsid ? `WIFI:T:${data.wifiSecurity};S:${data.wifiSsid};P:${data.wifiPassword};;` : "";
      case "bitcoin": return data.bitcoinAddress ? `bitcoin:${data.bitcoinAddress}` : "";
      case "vcard": return data.vcardName || data.vcardEmail || data.vcardPhone
        ? `BEGIN:VCARD\nVERSION:3.0\nFN:${data.vcardName}\nTEL:${data.vcardPhone}\nEMAIL:${data.vcardEmail}\nEND:VCARD` : "";
      default: return "";
    }
  };

  const getSocialLogoSvg = (presetId: string): string => {
    const logoPresets: Record<string, string> = {
      youtube: '<circle cx="50" cy="50" r="45" fill="#FF0000"/><polygon points="35,30 35,70 70,50" fill="white"/>',
      facebook: '<circle cx="50" cy="50" r="45" fill="#1877F2"/><text x="50" y="65" font-size="50" fill="white" text-anchor="middle" font-weight="bold">f</text>',
      whatsapp: '<circle cx="50" cy="50" r="45" fill="#25D366"/><text x="50" y="65" font-size="40" fill="white" text-anchor="middle" font-weight="bold">W</text>',
      instagram: '<circle cx="50" cy="50" r="45" fill="#E4405F"/><rect x="25" y="25" width="50" height="50" rx="10" fill="none" stroke="white" stroke-width="3"/><circle cx="50" cy="50" r="12" fill="none" stroke="white" stroke-width="3"/><circle cx="62" cy="38" r="3" fill="white"/>',
      linkedin: '<circle cx="50" cy="50" r="45" fill="#0A66C2"/><text x="50" y="65" font-size="40" fill="white" text-anchor="middle" font-weight="bold">in</text>',
      telegram: '<circle cx="50" cy="50" r="45" fill="#0088cc"/><text x="50" y="65" font-size="40" fill="white" text-anchor="middle">T</text>',
      twitter: '<circle cx="50" cy="50" r="45" fill="#000000"/><text x="50" y="65" font-size="40" fill="white" text-anchor="middle" font-weight="bold">X</text>',
    };
    return `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">${logoPresets[presetId] || ""}</svg>`;
  };

  const drawModule = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pattern: string, color: string) => {
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

  const drawExternalEye = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pattern: string, color: string, bgColor: string) => {
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

  const drawInternalEye = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, pattern: string, color: string) => {
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
      if (!canvasRef.current) return;
      const qrData = generateQRData();
      if (!qrData.trim()) return;

      const qrMatrix = await QRCodeLib.create(qrData, {
        errorCorrectionLevel: errorCorrectionLevel as "L" | "M" | "Q" | "H",
      });

      const modules = qrMatrix.modules;
      const moduleCount = modules.size;
      const moduleSize = 10;
      const qrSize = moduleCount * moduleSize;
      const padding = 40;
      const extraHeight = overlayText ? 40 : 0;

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      canvasRef.current.width = qrSize + padding * 2;
      canvasRef.current.height = qrSize + padding * 2 + extraHeight;

      ctx.fillStyle = lightColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (frameStyle === "border") {
        ctx.strokeStyle = darkColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, canvasRef.current.width - 20, canvasRef.current.height - 20 - extraHeight);
      } else if (frameStyle === "rounded-border") {
        ctx.strokeStyle = darkColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(10, 10, canvasRef.current.width - 20, canvasRef.current.height - 20 - extraHeight, 15);
        ctx.stroke();
      }

      if (frameStyle === "scanme-top") {
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = darkColor;
        ctx.textAlign = "center";
        ctx.fillText("SCAN ME", canvasRef.current.width / 2, 25);
      } else if (frameStyle === "scanme-bottom") {
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = darkColor;
        ctx.textAlign = "center";
        ctx.fillText("SCAN ME", canvasRef.current.width / 2, canvasRef.current.height - 10);
      }

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
            drawModule(ctx, x, y, moduleSize, bodyPattern, darkColor);
          }
        }
      }

      eyePositions.forEach(pos => {
        const x = padding + pos.col * moduleSize;
        const y = padding + pos.row * moduleSize;
        drawExternalEye(ctx, x, y, moduleSize, externalEyePattern, darkColor, lightColor);
        drawInternalEye(ctx, x + moduleSize * 2, y + moduleSize * 2, moduleSize, internalEyePattern, darkColor);
      });

      if (logoPreset) {
        const logoX = (canvasRef.current.width - logoSize) / 2;
        const logoY = padding + (qrSize - logoSize) / 2;

        if (logoBackground) {
          ctx.fillStyle = lightColor;
          ctx.beginPath();
          ctx.roundRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10, logoBorderRadius);
          ctx.fill();
        }

        try {
          const svg = getSocialLogoSvg(logoPreset);
          const img = new Image();
          img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
          await new Promise((resolve) => {
            img.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.roundRect(logoX, logoY, logoSize, logoSize, logoBorderRadius);
              ctx.clip();
              ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
              ctx.restore();
              resolve(null);
            };
          });
        } catch (e) {}
      }

      if (overlayText) {
        ctx.font = "bold 14px Arial";
        ctx.fillStyle = overlayTextColor;
        ctx.textAlign = "center";
        ctx.fillText(overlayText, canvasRef.current.width / 2, canvasRef.current.height - 15);
      }
    } catch (error) {}
  };

  const handleNext = () => {
    const qrData = generateQRData();
    if (!qrData.trim()) {
      toast({ title: "Fill Required Fields", description: "Please enter data", variant: "destructive" });
      return;
    }
    setStep(3);
  };

  const downloadQR = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
    toast({ title: "Downloaded!", description: "QR code saved as PNG" });
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
      logoPreset, logoSize, logoBorderRadius, logoBackground,
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
    setDarkColor(template.darkColor);
    setLightColor(template.lightColor);
    setFrameStyle(template.frameStyle);
    setOverlayText(template.overlayText);
    setOverlayTextColor(template.overlayTextColor);
    setLogoPreset(template.logoPreset);
    setLogoSize(template.logoSize);
    setLogoBorderRadius(template.logoBorderRadius);
    setLogoBackground(template.logoBackground);
    setBodyPattern(template.bodyPattern);
    setExternalEyePattern(template.externalEyePattern);
    setInternalEyePattern(template.internalEyePattern);
    setErrorCorrectionLevel(template.errorCorrectionLevel);
    toast({ title: template.name, description: "Applied" });
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
    { question: "What are body patterns?", answer: "Body patterns change the shape of QR code modules - squares, dots, rounded, etc." },
    { question: "What are eye patterns?", answer: "Eye patterns customize the three corner markers. External is the outer border, internal is the center." },
    { question: "Can I add a logo?", answer: "Yes! Choose from 7 social media logos with customizable size and border radius." },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const softwareAppSchema = generateSoftwareApplicationSchema({
    name: "Advanced QR Code Generator",
    description: "Professional QR codes with body patterns, eye patterns, logos, and templates.",
    url: "https://tools.pixocraft.in/tools/qr-maker",
    applicationCategory: "UtilityApplication",
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareAppSchema} />
      
      {/* Floating Mobile Preview - Draggable */}
      {selectedType && showFloatingPreview && (
        <div
          ref={floatingPreviewRef}
          onMouseDown={handleDragStart}
          className="fixed z-40 lg:hidden bg-black rounded-2xl p-2 shadow-lg cursor-move touch-none"
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
            className="rounded-xl overflow-hidden flex items-center justify-center p-2"
            style={{ backgroundColor: lightColor, height: '120px' }}
          >
            <canvas ref={canvasRef} className="max-w-full max-h-full" />
          </div>
        </div>
      )}

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <span>QR Code Generator</span>
          </div>

          <div className="text-center space-y-3 mb-8">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <QrCode className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">QR Code Generator</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced customization with body patterns, eye patterns, colors, logos. 100% offline.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Body Patterns</Badge>
              <Badge>Eye Patterns</Badge>
              <Badge>Social Logos</Badge>
              <Badge>Templates</Badge>
            </div>
          </div>

          {/* TOOL INTERFACE STARTS HERE */}

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8 mx-auto w-fit">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= s ? "bg-primary" : "bg-muted"}`}>
                  {s}
                </div>
                {i < 2 && <div className={`h-1 w-12 mx-1 ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Select Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {QR_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => { setSelectedType(type.id); setFormData({}); setStep(2); }}
                      className="p-3 rounded-lg border-2 border-muted hover:border-primary transition-all text-left"
                      data-testid={`button-qr-type-${type.id}`}
                    >
                      <p className="font-semibold">{type.label}</p>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button onClick={handleNext} className="flex-1">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Templates */}
                {customTemplates.length > 0 && (
                  <Card>
                    <CardHeader className="py-3"><CardTitle className="text-base">Saved Templates</CardTitle></CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex flex-wrap gap-2">
                        {customTemplates.map(template => (
                          <div key={template.id} className="group relative">
                            <button onClick={() => applyTemplate(template)} className="px-3 py-1 rounded border text-xs font-medium hover:border-primary">{template.name}</button>
                            <button onClick={() => deleteTemplate(template.id)} className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-white rounded-full text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center"><X className="h-2 w-2" /></button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Color Templates */}
                <Card>
                  <CardHeader className="py-3"><CardTitle className="text-base">Colors</CardTitle></CardHeader>
                  <CardContent className="pb-3 space-y-3">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {COLOR_TEMPLATES.map(t => (
                        <button key={t.id} onClick={() => { setDarkColor(t.darkColor); setLightColor(t.lightColor); }} className="h-8 rounded border-2 border-muted hover:border-primary" style={{ background: `linear-gradient(135deg, ${t.darkColor} 50%, ${t.lightColor} 50%)` }} title={t.name} />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <input type="color" value={darkColor} onChange={(e) => setDarkColor(e.target.value)} className="h-8 w-10 rounded cursor-pointer border" />
                        <Input value={darkColor} onChange={(e) => setDarkColor(e.target.value)} className="text-xs h-8" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="h-8 w-10 rounded cursor-pointer border" />
                        <Input value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="text-xs h-8" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Body Patterns */}
                <Card>
                  <CardHeader className="py-3"><CardTitle className="text-base">Body Patterns</CardTitle></CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {BODY_PATTERNS.map(p => (
                        <button
                          key={p.id}
                          onClick={() => setBodyPattern(p.id)}
                          className={`aspect-square rounded border-2 overflow-hidden ${bodyPattern === p.id ? "border-primary" : "border-muted"}`}
                          title={p.name}
                        >
                          <BodyPatternPreview pattern={p.id} />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Eye Patterns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="py-3"><CardTitle className="text-base">External Eye</CardTitle></CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid grid-cols-5 gap-2">
                        {EXTERNAL_EYE_PATTERNS.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setExternalEyePattern(p.id)}
                            className={`aspect-square rounded border-2 overflow-hidden ${externalEyePattern === p.id ? "border-primary" : "border-muted"}`}
                            title={p.name}
                          >
                            <ExternalEyePreview pattern={p.id} />
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-3"><CardTitle className="text-base">Internal Eye</CardTitle></CardHeader>
                    <CardContent className="pb-3">
                      <div className="grid grid-cols-5 gap-2">
                        {INTERNAL_EYE_PATTERNS.map(p => (
                          <button
                            key={p.id}
                            onClick={() => setInternalEyePattern(p.id)}
                            className={`aspect-square rounded border-2 overflow-hidden ${internalEyePattern === p.id ? "border-primary" : "border-muted"}`}
                            title={p.name}
                          >
                            <InternalEyePreview pattern={p.id} />
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Frames */}
                <Card>
                  <CardHeader className="py-3"><CardTitle className="text-base">Frames</CardTitle></CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-5 gap-2">
                      {FRAME_PRESETS.map(f => (
                        <button key={f.id} onClick={() => setFrameStyle(f.id)} className={`p-2 rounded border-2 text-xs ${frameStyle === f.id ? "border-primary bg-primary/10" : "border-muted"}`}>{f.name}</button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Logo */}
                <Card>
                  <CardHeader className="py-3"><CardTitle className="text-base">Logo</CardTitle></CardHeader>
                  <CardContent className="pb-3 space-y-3">
                    <div className="grid grid-cols-7 gap-2">
                      {SOCIAL_LOGOS.map(logo => (
                        <button
                          key={logo.id}
                          onClick={() => setLogoPreset(logo.id)}
                          className={`aspect-square rounded-full border-2 text-white text-sm font-bold flex items-center justify-center ${logoPreset === logo.id ? "border-primary ring-2 ring-primary" : "border-transparent"}`}
                          style={{ backgroundColor: logo.color }}
                          title={logo.name}
                        >
                          {logo.id.charAt(0).toUpperCase()}
                        </button>
                      ))}
                    </div>
                    {logoPreset && (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Size: {logoSize}px</Label>
                            <input type="range" min="40" max="120" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full" />
                          </div>
                          <div>
                            <Label className="text-xs">Radius: {logoBorderRadius}px</Label>
                            <input type="range" min="0" max="50" value={logoBorderRadius} onChange={(e) => setLogoBorderRadius(Number(e.target.value))} className="w-full" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input type="checkbox" checked={logoBackground} onChange={(e) => setLogoBackground(e.target.checked)} />
                            Background
                          </label>
                          <Button variant="outline" size="sm" onClick={() => setLogoPreset(null)} className="text-xs h-7">Remove</Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Text Overlay */}
                <Card>
                  <CardHeader className="py-3"><CardTitle className="text-base">Text</CardTitle></CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex gap-2">
                      <Input placeholder="Add text below QR..." value={overlayText} onChange={(e) => setOverlayText(e.target.value)} className="text-sm h-8" />
                      {overlayText && <input type="color" value={overlayTextColor} onChange={(e) => setOverlayTextColor(e.target.value)} className="h-8 w-10 rounded cursor-pointer border" />}
                    </div>
                  </CardContent>
                </Card>

                {/* Error Correction */}
                <Card>
                  <CardHeader className="py-3"><CardTitle className="text-base">Error Correction</CardTitle></CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-4 gap-2">
                      {["L", "M", "Q", "H"].map(level => (
                        <button key={level} onClick={() => setErrorCorrectionLevel(level)} className={`p-2 rounded border-2 text-xs ${errorCorrectionLevel === level ? "border-primary bg-primary/10" : "border-muted"}`}>
                          <span className="font-bold">{level}</span>
                          <span className="text-muted-foreground ml-1">{{"L":"7%","M":"15%","Q":"25%","H":"30%"}[level]}</span>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1" size="sm">Back</Button>
                  <Button onClick={() => setShowTemplateModal(true)} variant="outline" size="sm" className="flex-1"><Save className="h-4 w-4 mr-1" />Save</Button>
                  <Button onClick={downloadQR} size="sm" className="flex-1"><Download className="h-4 w-4 mr-1" />Download</Button>
                </div>
              </div>

              {/* Preview - Desktop & Mobile Detection */}
              <Card className="sticky top-4 h-fit hidden lg:block" data-preview-section>
                <CardHeader className="py-3"><CardTitle className="text-base">Preview</CardTitle></CardHeader>
                <CardContent className="pb-3 space-y-3">
                  <div className="rounded-lg p-4 flex items-center justify-center overflow-hidden" style={{ backgroundColor: lightColor, minHeight: 340, maxHeight: 500, border: "1px solid var(--border)" }}>
                    <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Shield className="h-3 w-3" />Offline & Private
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* FAQ Section */}
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Are my QR codes scanned anywhere?</h3>
                <p className="text-muted-foreground">No. Everything is generated offline in your browser. We don't collect data, track scans, or store your QR codes. They're yours to use however you want.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Do I need to create an account?</h3>
                <p className="text-muted-foreground">No account needed. Just open the tool and start generating. Use templates feature to save your favorite designs locally.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Will custom patterns affect scannability?</h3>
                <p className="text-muted-foreground">No. All patterns, colors, and customizations maintain full scannability. Error correction ensures codes work even if partially damaged.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">What formats can I use the QR codes in?</h3>
                <p className="text-muted-foreground">Download as PNG. Works in print, digital, email, social media, and anywhere you need high-quality codes. Print settings apply scaling automatically.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Can I use these for commercial purposes?</h3>
                <p className="text-muted-foreground">Yes. Generate as many QR codes as you want for business use, marketing, packaging, or resale. No restrictions, no licensing fees.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">How do I choose the right error correction level?</h3>
                <p className="text-muted-foreground">For clean designs, use L (7%). For print/outdoor use with potential damage, use H (30%). M and Q are good middle grounds. Higher = more recovery ability.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Can I edit a QR code after saving it?</h3>
                <p className="text-muted-foreground">Your saved templates store design settings (colors, patterns, logos). Reload them anytime to generate new codes with same design, or modify and create variations.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">What's the best use case for logo overlay?</h3>
                <p className="text-muted-foreground">Perfect for branding and social media links. Add YouTube, WhatsApp, Instagram logos to make your codes instantly recognizable on marketing materials.</p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Other Useful Tools</h2>
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
              <Link href="/tools">
                <div className="p-4 rounded-lg border bg-card hover:border-primary transition-all cursor-pointer">
                  <p className="font-semibold text-sm mb-1">All Tools</p>
                  <p className="text-xs text-muted-foreground">Browse all available tools</p>
                </div>
              </Link>
            </div>
          </section>

          {/* SEO Content Sections */}
          {step === 1 && (
            <div className="mt-16 space-y-12 max-w-4xl mx-auto">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Why Create Custom QR Codes?</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">Standard QR codes work, but custom QR codes stand out. They're on-brand, memorable, and users actually want to scan them. Whether for marketing, events, education, or business - custom patterns and colors make all the difference.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Perfect For:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-card"><h3 className="font-semibold mb-2">Businesses & Marketing</h3><p className="text-sm text-muted-foreground">Add logos and brand colors to flyers, packaging, and campaigns.</p></div>
                  <div className="p-4 rounded-lg border bg-card"><h3 className="font-semibold mb-2">Events</h3><p className="text-sm text-muted-foreground">Create unique QR codes for tickets, WiFi, and speaker bios.</p></div>
                  <div className="p-4 rounded-lg border bg-card"><h3 className="font-semibold mb-2">Students & Educators</h3><p className="text-sm text-muted-foreground">Share assignments and resources with professional-looking codes.</p></div>
                  <div className="p-4 rounded-lg border bg-card"><h3 className="font-semibold mb-2">Developers</h3><p className="text-sm text-muted-foreground">Generate codes for APIs, documentation, and portfolios.</p></div>
                  <div className="p-4 rounded-lg border bg-card"><h3 className="font-semibold mb-2">E-commerce & Retail</h3><p className="text-sm text-muted-foreground">Product codes, payment links, and social media connections.</p></div>
                  <div className="p-4 rounded-lg border bg-card"><h3 className="font-semibold mb-2">Personal & Creative</h3><p className="text-sm text-muted-foreground">Design unique codes for portfolios and social sharing.</p></div>
                </div>
              </section>

              <section className="p-6 bg-primary/5 rounded-lg border">
                <div className="flex gap-3">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div><h3 className="text-lg font-bold mb-2">100% Private & Offline</h3><p className="text-muted-foreground">Everything happens in your browser. No uploads, no tracking, no data collection. Your QR codes never leave your device. No signup required.</p></div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" /><p><span className="font-semibold">8 Body Patterns</span> - Square, dots, rounded, classy, vertical</p></div>
                  <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" /><p><span className="font-semibold">10 Eye Patterns</span> - External + internal customization</p></div>
                  <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" /><p><span className="font-semibold">Custom Colors</span> - 8 templates + unlimited colors</p></div>
                  <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" /><p><span className="font-semibold">Social Logos</span> - YouTube, WhatsApp, Instagram, Facebook</p></div>
                  <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" /><p><span className="font-semibold">Text Overlay</span> - Add labels below QR code</p></div>
                  <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" /><p><span className="font-semibold">Frames & Effects</span> - Borders and Scan Me text</p></div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">FAQs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2"><h3 className="font-semibold">Are my QR codes scanned anywhere?</h3><p className="text-sm text-muted-foreground">No. Everything is offline. We don't track scans or store data.</p></div>
                  <div className="space-y-2"><h3 className="font-semibold">Do I need an account?</h3><p className="text-sm text-muted-foreground">No account needed. Use templates to save designs locally.</p></div>
                  <div className="space-y-2"><h3 className="font-semibold">Will custom patterns work?</h3><p className="text-sm text-muted-foreground">Yes. All patterns maintain full scannability and error correction.</p></div>
                  <div className="space-y-2"><h3 className="font-semibold">Can I use commercially?</h3><p className="text-sm text-muted-foreground">Yes. No restrictions. Use for business, marketing, or resale.</p></div>
                </div>
              </section>
            </div>
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
