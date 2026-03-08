import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, generateBreadcrumbSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Shield, Save, X, Smartphone, TrendingUp, Sparkles, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import QRCodeLib from "qrcode";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

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
  { id: "url", label: "URL / Website", icon: LinkIcon, description: "Link to website" },
  { id: "whatsapp", label: "WhatsApp", icon: User, description: "Message on WhatsApp" },
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const floatingCanvasRef = useRef<HTMLCanvasElement>(null);
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
  }, [darkColor, lightColor, frameStyle, logoData, logoSize, logoBorderRadius, logoBackground, bodyPattern, externalEyePattern, internalEyePattern, errorCorrectionLevel, overlayText, overlayTextColor, step, selectedType, formData]);

  useSEO({
    title: "Free QR Code Generator with Logo | Create Custom QR Codes Online",
    description: "Generate professional QR codes for free. Custom QR code maker with logo, frames, and patterns. Support for WiFi, WhatsApp, URL, vCard, Bitcoin. 100% Private & Offline.",
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
        ctx.fillStyle = lightColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (frameStyle === "border") {
          ctx.strokeStyle = darkColor;
          ctx.lineWidth = 4;
          ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20 - extraHeight);
        } else if (frameStyle === "rounded-border") {
          ctx.strokeStyle = darkColor;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.roundRect(10, 10, canvas.width - 20, canvas.height - 20 - extraHeight, 15);
          ctx.stroke();
        }

        if (frameStyle === "scanme-top") {
          const fontSize = Math.max(14, Math.floor(qrSize * 0.08));
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.fillStyle = darkColor;
          ctx.textAlign = "center";
          ctx.fillText("SCAN ME", canvas.width / 2, padding / 2 + fontSize / 2);
        } else if (frameStyle === "scanme-bottom") {
          const fontSize = Math.max(14, Math.floor(qrSize * 0.08));
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.fillStyle = darkColor;
          ctx.textAlign = "center";
          ctx.fillText("SCAN ME", canvas.width / 2, canvas.height - 12);
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
    setStep(3);
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
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareAppSchema} />
      <StructuredData data={breadcrumbSchema} />

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
            <canvas ref={floatingCanvasRef} className="max-w-full max-h-full" style={{ imageRendering: 'crisp-edges' }} />
          </div>
        </div>
      )}

      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <Link href="/tools/developer">Developer Tools</Link> / <span>QR Code Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Free QR Code Generator
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">(Create Custom QR Codes with Logo Online)</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The world's most advanced 100% free QR maker. Create high-resolution custom QR codes with logos, frames, and patterns. Secure, private, and works offline.
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
                    <div className="flex gap-2">
                      <Input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm" placeholder="Upload logo..." data-testid="input-logo-upload" />
                      {logoData && <Button variant="outline" size="sm" onClick={() => setLogoData(null)} className="text-xs" data-testid="button-remove-logo">Remove</Button>}
                    </div>
                    {logoData && (
                      <div className="flex flex-col gap-3">
                        <div className="rounded-lg p-3 bg-muted flex items-center justify-center h-24 w-24 mx-auto">
                          <img src={logoData} alt="Logo preview" className="max-h-20 max-w-20 object-contain" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Size: {logoSize}px</Label>
                            <input type="range" min="10" max="120" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full" data-testid="slider-logo-size" />
                          </div>
                          <div>
                            <Label className="text-xs">Radius: {logoBorderRadius}px</Label>
                            <input type="range" min="0" max="50" value={logoBorderRadius} onChange={(e) => setLogoBorderRadius(Number(e.target.value))} className="w-full" data-testid="slider-logo-radius" />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-xs cursor-pointer">
                          <input type="checkbox" checked={logoBackground} onChange={(e) => setLogoBackground(e.target.checked)} data-testid="checkbox-logo-background" />
                          Background
                        </label>
                      </div>
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

                <div className="flex gap-2 flex-col sm:flex-row sm:flex-wrap">
                  <Button variant="outline" onClick={() => setStep(2)} className="w-full sm:flex-1 sm:min-w-20" size="sm" data-testid="button-back">Back</Button>
                  <Button onClick={() => setShowTemplateModal(true)} variant="outline" size="sm" className="w-full sm:flex-1 sm:min-w-20" data-testid="button-save-template"><Save className="h-4 w-4 mr-1" />Save</Button>
                  <div className="w-full sm:flex-1 sm:min-w-20 flex gap-1">
                    <Button onClick={() => downloadQR("normal")} size="sm" className="flex-1 text-xs" title="Standard quality" variant="outline" data-testid="button-download-normal">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button onClick={() => downloadQR("high")} size="sm" className="flex-1 text-xs sm:text-base" title="2x quality" data-testid="button-download-hd">
                      <Download className="h-4 w-4 mr-1" />HD
                    </Button>
                    <Button onClick={() => downloadQR("ultra")} size="sm" className="flex-1 text-xs" title="4x ultra quality" data-testid="button-download-4k">
                      4K
                    </Button>
                  </div>
                </div>
              </div>

              {/* Preview - Desktop & Mobile Detection */}
              <Card className="sticky top-4 h-fit hidden lg:block" data-preview-section>
                <CardHeader className="py-3"><CardTitle className="text-base">Preview</CardTitle></CardHeader>
                <CardContent className="pb-3 space-y-3">
                  <div className="rounded-lg flex items-center justify-center" style={{ backgroundColor: lightColor, width: '350px', height: '350px', border: "1px solid var(--border)" }}>
                    <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', imageRendering: 'crisp-edges' }} />
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Shield className="h-3 w-3" />Offline & Private
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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

          {/* How to Create QR Code in 3 Steps - HowTo Schema */}
          <section className="space-y-12 py-20 border-t">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-4xl font-bold">How to Create a QR Code in 3 Steps</h2>
              <p className="text-xl text-muted-foreground">Generate custom QR codes in seconds with our intuitive interface.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4" itemScope itemType="https://schema.org/HowToStep">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">1</div>
                </div>
                <h3 className="text-2xl font-bold" itemProp="name">Enter Your Data</h3>
                <p className="text-muted-foreground" itemProp="text">Choose a QR code type (URL, WiFi, contact, email, SMS, etc.) and enter your information. Our tool supports 8+ different data types.</p>
              </div>
              <div className="space-y-4" itemScope itemType="https://schema.org/HowToStep">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                </div>
                <h3 className="text-2xl font-bold" itemProp="name">Customize Design</h3>
                <p className="text-muted-foreground" itemProp="text">Personalize colors, add your logo, choose eye patterns, select body styles, and add frames. Make your QR code on-brand.</p>
              </div>
              <div className="space-y-4" itemScope itemType="https://schema.org/HowToStep">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                </div>
                <h3 className="text-2xl font-bold" itemProp="name">Download & Use</h3>
                <p className="text-muted-foreground" itemProp="text">Download in high resolution (4K Ultra for print) and use instantly. No signup, no limits, completely free.</p>
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
                Start Creating QR Codes
              </Button>
            </div>
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

          {/* SEO Content Sections (Step-specific content removed to allow authority expansion below) */}

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

      <LongTailPagesSection toolId="qr-code-maker" />
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
