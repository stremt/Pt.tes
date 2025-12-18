import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Shield, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import QRCodeLib from "qrcode";

interface QRHistoryItem {
  id: string;
  type: string;
  label: string;
  qrCodeUrl: string;
  createdAt: string;
}

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
  errorCorrectionLevel: string;
}

const QR_HISTORY_KEY = "pixocraft_qr_history";
const TEMPLATES_KEY = "pixocraft_qr_templates";
const MAX_HISTORY_ITEMS = 20;

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
  { id: "dots", name: "Dotted" },
  { id: "circle", name: "Circle" },
];

const COLOR_TEMPLATES = [
  { id: "premium-blue", name: "Premium Blue", darkColor: "#0052CC", lightColor: "#E3F2FD" },
  { id: "vibrant-red", name: "Vibrant Red", darkColor: "#DC2626", lightColor: "#FEE2E2" },
  { id: "forest-green", name: "Forest Green", darkColor: "#15803D", lightColor: "#DCFCE7" },
  { id: "sunset-orange", name: "Sunset Orange", darkColor: "#EA580C", lightColor: "#FFEDD5" },
  { id: "deep-purple", name: "Deep Purple", darkColor: "#6D28D9", lightColor: "#F3E8FF" },
  { id: "classic-black", name: "Classic Black", darkColor: "#000000", lightColor: "#FFFFFF" },
  { id: "teal", name: "Teal", darkColor: "#0D9488", lightColor: "#CCFBF1" },
  { id: "indigo", name: "Indigo", darkColor: "#4F46E5", lightColor: "#E0E7FF" },
];

export default function QRMaker() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);

  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoPreset, setLogoPreset] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(70);
  const [logoBorderRadius, setLogoBorderRadius] = useState(0);
  const [logoBackground, setLogoBackground] = useState(true);
  const [bodyPattern, setBodyPattern] = useState("square");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  const [overlayText, setOverlayText] = useState("");
  const [overlayTextColor, setOverlayTextColor] = useState("#000000");
  const [templateName, setTemplateName] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem(QR_HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        localStorage.removeItem(QR_HISTORY_KEY);
      }
    }

    const savedTemplates = localStorage.getItem(TEMPLATES_KEY);
    if (savedTemplates) {
      try {
        setCustomTemplates(JSON.parse(savedTemplates));
      } catch {
        localStorage.removeItem(TEMPLATES_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (step === 3 && selectedType && canvasRef.current) {
      const timer = setTimeout(() => renderQR(), 100);
      return () => clearTimeout(timer);
    }
  }, [darkColor, lightColor, frameStyle, logoPreset, logoSize, logoBorderRadius, logoBackground, bodyPattern, errorCorrectionLevel, overlayText, overlayTextColor, step, selectedType, formData]);

  useSEO({
    title: "Free QR Code Generator - Advanced Customization | Pixocraft",
    description: "Professional QR codes with custom colors, logos, patterns, text overlay, and templates. 7 QR types. Works offline.",
    keywords: "qr code generator, free qr code maker, custom qr code, qr code templates",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-maker",
    ogImage: OG_IMAGES.qrMaker,
  });

  const generateQRData = (): string => {
    const data = formData;

    switch (selectedType) {
      case "url":
        return data.url || "";
      case "text":
        return data.text || "";
      case "email":
        return data.email ? `mailto:${data.email}` : "";
      case "sms":
        return data.phone ? `smsto:${data.phone}${data.smsText ? ":" + data.smsText : ""}` : "";
      case "wifi":
        return data.wifiSsid ? `WIFI:T:${data.wifiSecurity};S:${data.wifiSsid};P:${data.wifiPassword};;` : "";
      case "bitcoin":
        return data.bitcoinAddress ? `bitcoin:${data.bitcoinAddress}` : "";
      case "vcard":
        return data.vcardName || data.vcardEmail || data.vcardPhone
          ? `BEGIN:VCARD\nVERSION:3.0\nFN:${data.vcardName}\nTEL:${data.vcardPhone}\nEMAIL:${data.vcardEmail}\nEND:VCARD`
          : "";
      default:
        return "";
    }
  };

  const getSocialLogoSvg = (presetId: string): string => {
    const logoPresets: Record<string, string> = {
      youtube: '<circle cx="50" cy="50" r="45" fill="#FF0000"/><polygon points="35,30 35,70 70,50" fill="white"/>',
      facebook: '<circle cx="50" cy="50" r="45" fill="#1877F2"/><text x="50" y="65" font-size="50" fill="white" text-anchor="middle" font-weight="bold">f</text>',
      whatsapp: '<circle cx="50" cy="50" r="45" fill="#25D366"/><text x="50" y="65" font-size="40" fill="white" text-anchor="middle" font-weight="bold">✓</text>',
      instagram: '<circle cx="50" cy="50" r="45" fill="#E4405F"/><rect x="25" y="25" width="50" height="50" rx="10" fill="none" stroke="white" stroke-width="3"/><circle cx="50" cy="50" r="12" fill="none" stroke="white" stroke-width="3"/><circle cx="62" cy="38" r="3" fill="white"/>',
      linkedin: '<circle cx="50" cy="50" r="45" fill="#0A66C2"/><rect x="30" y="35" width="8" height="24" fill="white"/><circle cx="34" cy="28" r="4" fill="white"/><path d="M 42 59 Q 42 35 50 35 Q 58 35 58 45 L 58 59" fill="none" stroke="white" stroke-width="3"/>',
      telegram: '<circle cx="50" cy="50" r="45" fill="#0088cc"/><text x="50" y="65" font-size="45" fill="white" text-anchor="middle">✈</text>',
      twitter: '<circle cx="50" cy="50" r="45" fill="#000000"/><text x="50" y="65" font-size="40" fill="white" text-anchor="middle" font-weight="bold">𝕏</text>',
    };
    return `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">${logoPresets[presetId] || ""}</svg>`;
  };

  const renderQR = async () => {
    try {
      if (!canvasRef.current) return;

      const qrData = generateQRData();
      if (!qrData.trim()) return;

      const levelObj = { L: "L", M: "M", Q: "Q", H: "H" }[errorCorrectionLevel];

      const tempCanvas = document.createElement("canvas");
      await QRCodeLib.toCanvas(tempCanvas, qrData, {
        width: 280,
        margin: 2,
        errorCorrectionLevel: levelObj as "L" | "M" | "Q" | "H",
        color: { dark: darkColor, light: lightColor },
      });

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      canvasRef.current.width = 400;
      canvasRef.current.height = overlayText ? 460 : 420;

      ctx.fillStyle = lightColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (frameStyle === "border") {
        ctx.strokeStyle = darkColor;
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, 360, 360);
      } else if (frameStyle === "rounded-border") {
        ctx.strokeStyle = darkColor;
        ctx.lineWidth = 6;
        const radius = 15;
        ctx.beginPath();
        ctx.moveTo(20 + radius, 20);
        ctx.lineTo(380 - radius, 20);
        ctx.quadraticCurveTo(380, 20, 380, 20 + radius);
        ctx.lineTo(380, 380 - radius);
        ctx.quadraticCurveTo(380, 380, 380 - radius, 380);
        ctx.lineTo(20 + radius, 380);
        ctx.quadraticCurveTo(20, 380, 20, 380 - radius);
        ctx.lineTo(20, 20 + radius);
        ctx.quadraticCurveTo(20, 20, 20 + radius, 20);
        ctx.stroke();
      }

      if (frameStyle === "scanme-top") {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = darkColor;
        ctx.textAlign = "center";
        ctx.fillText("SCAN ME", 200, 30);
      } else if (frameStyle === "scanme-bottom") {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = darkColor;
        ctx.textAlign = "center";
        ctx.fillText("SCAN ME", 200, canvasRef.current.height - 15);
      }

      const qrX = (canvasRef.current.width - tempCanvas.width) / 2;
      const qrY = frameStyle === "scanme-top" ? 40 : 20;
      ctx.drawImage(tempCanvas, qrX, qrY);

      if (logoPreset) {
        const logoX = (canvasRef.current.width - logoSize) / 2;
        const logoY = qrY + (tempCanvas.height - logoSize) / 2;

        if (logoBackground) {
          ctx.fillStyle = lightColor;
          ctx.strokeStyle = darkColor;
          ctx.lineWidth = 2;
          ctx.save();
          ctx.translate(logoX + logoSize / 2, logoY + logoSize / 2);
          ctx.beginPath();
          ctx.roundRect(
            -logoSize / 2,
            -logoSize / 2,
            logoSize,
            logoSize,
            logoBorderRadius
          );
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }

        try {
          const svg = getSocialLogoSvg(logoPreset);
          const img = new Image();
          img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
          await new Promise((resolve) => {
            img.onload = () => {
              ctx.save();
              ctx.translate(logoX + logoSize / 2, logoY + logoSize / 2);
              ctx.beginPath();
              ctx.roundRect(
                -logoSize / 2,
                -logoSize / 2,
                logoSize,
                logoSize,
                logoBorderRadius
              );
              ctx.clip();
              ctx.drawImage(img, -logoSize / 2, -logoSize / 2, logoSize, logoSize);
              ctx.restore();
              resolve(null);
            };
          });
        } catch (e) {
          console.error("Logo render error");
        }
      }

      if (overlayText) {
        ctx.font = "bold 16px Arial";
        ctx.fillStyle = overlayTextColor;
        ctx.textAlign = "center";
        ctx.fillText(overlayText, 200, canvasRef.current.height - 15);
      }
    } catch (error) {
      console.error("QR render error");
    }
  };

  const handleNext = () => {
    const qrData = generateQRData();
    if (!qrData.trim()) {
      toast({
        title: "Fill Required Fields",
        description: "Please enter data for the QR code",
        variant: "destructive",
      });
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

    const label = Object.values(formData).filter(v => v).join(" ").substring(0, 40);
    const newItem: QRHistoryItem = {
      id: Date.now().toString(),
      type: selectedType,
      label: label || "QR Code",
      qrCodeUrl: canvasRef.current.toDataURL(),
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(updated);
    localStorage.setItem(QR_HISTORY_KEY, JSON.stringify(updated));

    toast({
      title: "Downloaded!",
      description: "QR code saved as PNG",
    });
  };

  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a template name",
        variant: "destructive",
      });
      return;
    }

    const newTemplate: CustomTemplate = {
      id: Date.now().toString(),
      name: templateName,
      darkColor,
      lightColor,
      frameStyle,
      overlayText,
      overlayTextColor,
      logoPreset,
      logoSize,
      logoBorderRadius,
      logoBackground,
      bodyPattern,
      errorCorrectionLevel,
    };

    const updated = [newTemplate, ...customTemplates];
    setCustomTemplates(updated);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
    setShowTemplateModal(false);
    setTemplateName("");
    toast({
      title: "Template Saved!",
      description: "You can use this template later",
    });
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
    setErrorCorrectionLevel(template.errorCorrectionLevel);
    toast({
      title: template.name,
      description: "Template applied",
    });
  };

  const deleteTemplate = (id: string) => {
    const updated = customTemplates.filter(t => t.id !== id);
    setCustomTemplates(updated);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
  };

  const applySocialLogo = (presetId: string) => {
    setLogoPreset(presetId);
    const logoName = SOCIAL_LOGOS.find(l => l.id === presetId)?.name || "";
    toast({
      title: "Logo Added",
      description: `${logoName} logo added to QR code`,
    });
  };

  const applyColorTemplate = (template: typeof COLOR_TEMPLATES[0]) => {
    setDarkColor(template.darkColor);
    setLightColor(template.lightColor);
    toast({
      title: template.name,
      description: "Colors applied",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const faqItems: FAQItem[] = [
    {
      question: "How do I create a QR code?",
      answer: "Select a QR code type, enter your information, customize colors and logos, then download as PNG.",
    },
    {
      question: "Can I add a logo to my QR code?",
      answer: "Yes! Choose from 7 social media logos. Customize size and border radius to your preference.",
    },
    {
      question: "Can I save my design as a template?",
      answer: "Yes! Click 'Save Template' to reuse your customization for future QR codes.",
    },
    {
      question: "What's the difference between error correction levels?",
      answer: "Higher levels add redundancy, making QR codes more damage-resistant. L=7%, M=15%, Q=25%, H=30%",
    },
    {
      question: "Can I add text to my QR code?",
      answer: "Yes! Use the overlay text feature to add text below your QR code.",
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const softwareAppSchema = generateSoftwareApplicationSchema({
    name: "Advanced QR Code Generator",
    description: "Professional QR codes with custom colors, social logos, text overlay, and template saving.",
    url: "https://tools.pixocraft.in/tools/qr-maker",
    applicationCategory: "UtilityApplication",
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <span>QR Code Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <QrCode className="h-8 w-8 text-primary" data-testid="icon-qr" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">QR Code Generator</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Create professional QR codes with custom colors, social logos, text overlay, and save templates. 100% offline.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Custom Colors</Badge>
              <Badge>Social Logos</Badge>
              <Badge>Text Overlay</Badge>
              <Badge>Templates</Badge>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
            <div className="flex items-center flex-1">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= 1 ? "bg-primary" : "bg-muted"}`} data-testid="step-1">
                1
              </div>
              <div className={`flex-1 h-1 mx-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>
            <div className="flex items-center flex-1">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= 2 ? "bg-primary" : "bg-muted"}`} data-testid="step-2">
                2
              </div>
              <div className={`flex-1 h-1 mx-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
            </div>
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${step >= 3 ? "bg-primary" : "bg-muted"}`} data-testid="step-3">
                3
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Step 1: Select Type</CardTitle>
                <CardDescription>Choose what to encode in your QR code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {QR_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        setFormData({});
                        setStep(2);
                      }}
                      className="p-4 rounded-lg border-2 border-muted hover:border-primary transition-all hover-elevate text-left"
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
              <CardHeader>
                <CardTitle>Step 2: Enter Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedType === "url" && (
                  <div>
                    <Label htmlFor="url-input">Website URL</Label>
                    <Input
                      id="url-input"
                      placeholder="https://example.com"
                      value={formData.url || ""}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                      data-testid="input-url"
                    />
                  </div>
                )}
                {selectedType === "text" && (
                  <div>
                    <Label htmlFor="text-input">Text</Label>
                    <Textarea
                      id="text-input"
                      placeholder="Enter text..."
                      value={formData.text || ""}
                      onChange={(e) => handleInputChange("text", e.target.value)}
                      rows={5}
                      data-testid="input-text"
                    />
                  </div>
                )}
                {selectedType === "email" && (
                  <div>
                    <Label htmlFor="email-input">Email</Label>
                    <Input
                      id="email-input"
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      data-testid="input-email"
                    />
                  </div>
                )}
                {selectedType === "sms" && (
                  <>
                    <div>
                      <Label htmlFor="phone-input">Phone</Label>
                      <Input
                        id="phone-input"
                        placeholder="+1234567890"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sms-input">Message</Label>
                      <Textarea
                        id="sms-input"
                        placeholder="Message text..."
                        value={formData.smsText || ""}
                        onChange={(e) => handleInputChange("smsText", e.target.value)}
                        rows={3}
                        data-testid="input-sms"
                      />
                    </div>
                  </>
                )}
                {selectedType === "wifi" && (
                  <>
                    <div>
                      <Label htmlFor="wifi-ssid">Network Name</Label>
                      <Input
                        id="wifi-ssid"
                        placeholder="WiFi SSID"
                        value={formData.wifiSsid || ""}
                        onChange={(e) => handleInputChange("wifiSsid", e.target.value)}
                        data-testid="input-wifi-ssid"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-pass">Password</Label>
                      <Input
                        id="wifi-pass"
                        type="password"
                        placeholder="Password"
                        value={formData.wifiPassword || ""}
                        onChange={(e) => handleInputChange("wifiPassword", e.target.value)}
                        data-testid="input-wifi-pass"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-sec">Security</Label>
                      <select
                        id="wifi-sec"
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        value={formData.wifiSecurity || "WPA"}
                        onChange={(e) => handleInputChange("wifiSecurity", e.target.value)}
                        data-testid="select-wifi-security"
                      >
                        <option>WPA</option>
                        <option>WEP</option>
                        <option>Open</option>
                      </select>
                    </div>
                  </>
                )}
                {selectedType === "bitcoin" && (
                  <div>
                    <Label htmlFor="bitcoin-input">Address</Label>
                    <Input
                      id="bitcoin-input"
                      placeholder="Bitcoin address"
                      value={formData.bitcoinAddress || ""}
                      onChange={(e) => handleInputChange("bitcoinAddress", e.target.value)}
                      data-testid="input-bitcoin"
                    />
                  </div>
                )}
                {selectedType === "vcard" && (
                  <>
                    <div>
                      <Label htmlFor="vcard-name">Name</Label>
                      <Input
                        id="vcard-name"
                        placeholder="John Doe"
                        value={formData.vcardName || ""}
                        onChange={(e) => handleInputChange("vcardName", e.target.value)}
                        data-testid="input-vcard-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vcard-phone">Phone</Label>
                      <Input
                        id="vcard-phone"
                        placeholder="+1 234 567 8900"
                        value={formData.vcardPhone || ""}
                        onChange={(e) => handleInputChange("vcardPhone", e.target.value)}
                        data-testid="input-vcard-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vcard-email">Email</Label>
                      <Input
                        id="vcard-email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.vcardEmail || ""}
                        onChange={(e) => handleInputChange("vcardEmail", e.target.value)}
                        data-testid="input-vcard-email"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1" data-testid="button-back-step1">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="flex-1" data-testid="button-next-step3">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* My Templates */}
                {customTemplates.length > 0 && (
                  <Card data-testid="card-templates">
                    <CardHeader>
                      <CardTitle className="text-lg">Saved Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {customTemplates.map(template => (
                          <div key={template.id} className="group relative">
                            <button
                              onClick={() => applyTemplate(template)}
                              className="w-full p-2 rounded-lg border-2 border-primary/50 hover:border-primary text-center text-xs font-medium"
                              data-testid={`button-template-${template.id}`}
                            >
                              {template.name}
                            </button>
                            <button
                              onClick={() => deleteTemplate(template.id)}
                              className="absolute -top-2 -right-2 h-5 w-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs"
                              data-testid={`button-delete-template-${template.id}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Color Templates */}
                <Card data-testid="card-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">Color Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {COLOR_TEMPLATES.map(template => (
                        <button
                          key={template.id}
                          onClick={() => applyColorTemplate(template)}
                          className="p-2 rounded-lg border-2 border-muted hover:border-primary text-center"
                          data-testid={`button-color-${template.id}`}
                          title={template.name}
                        >
                          <div
                            className="h-6 w-full rounded mb-1"
                            style={{
                              background: `linear-gradient(45deg, ${template.darkColor}, ${template.lightColor})`,
                            }}
                          />
                          <p className="text-xs font-medium truncate">{template.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Colors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="dark-color" className="text-sm">Dark</Label>
                        <div className="flex gap-2">
                          <input
                            id="dark-color"
                            type="color"
                            value={darkColor}
                            onChange={(e) => setDarkColor(e.target.value)}
                            className="h-9 w-12 rounded cursor-pointer border"
                            data-testid="input-dark-color"
                          />
                          <Input value={darkColor} onChange={(e) => setDarkColor(e.target.value)} className="text-xs" data-testid="input-dark-color-hex" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="light-color" className="text-sm">Light</Label>
                        <div className="flex gap-2">
                          <input
                            id="light-color"
                            type="color"
                            value={lightColor}
                            onChange={(e) => setLightColor(e.target.value)}
                            className="h-9 w-12 rounded cursor-pointer border"
                            data-testid="input-light-color"
                          />
                          <Input value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="text-xs" data-testid="input-light-color-hex" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Frames */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Frames</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {FRAME_PRESETS.map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setFrameStyle(frame.id)}
                          className={`p-2 rounded border-2 text-xs font-medium ${
                            frameStyle === frame.id ? "border-primary bg-primary/10" : "border-muted"
                          }`}
                          data-testid={`button-frame-${frame.id}`}
                        >
                          {frame.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Body Patterns */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {BODY_PATTERNS.map(pattern => (
                        <button
                          key={pattern.id}
                          onClick={() => setBodyPattern(pattern.id)}
                          className={`p-2 rounded border-2 text-xs font-medium ${
                            bodyPattern === pattern.id ? "border-primary bg-primary/10" : "border-muted"
                          }`}
                          data-testid={`button-pattern-${pattern.id}`}
                        >
                          {pattern.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Logo Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Logo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm">Social Logos</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {SOCIAL_LOGOS.map(logo => (
                          <button
                            key={logo.id}
                            onClick={() => applySocialLogo(logo.id)}
                            className={`p-2 rounded border-2 text-sm font-bold text-white ${
                              logoPreset === logo.id ? "border-primary" : "border-muted"
                            }`}
                            title={logo.name}
                            style={{
                              backgroundColor: logoPreset === logo.id ? logo.color : logo.color + "80",
                            }}
                            data-testid={`button-social-logo-${logo.id}`}
                          >
                            {logo.id.charAt(0).toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {logoPreset && (
                      <>
                        <div>
                          <Label htmlFor="logo-size" className="text-sm">Size: {logoSize}px</Label>
                          <input
                            id="logo-size"
                            type="range"
                            min="40"
                            max="140"
                            value={logoSize}
                            onChange={(e) => setLogoSize(Number(e.target.value))}
                            className="w-full"
                            data-testid="slider-logo-size"
                          />
                        </div>

                        <div>
                          <Label htmlFor="logo-radius" className="text-sm">Border Radius: {logoBorderRadius}px</Label>
                          <input
                            id="logo-radius"
                            type="range"
                            min="0"
                            max="50"
                            value={logoBorderRadius}
                            onChange={(e) => setLogoBorderRadius(Number(e.target.value))}
                            className="w-full"
                            data-testid="slider-logo-radius"
                          />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={logoBackground}
                            onChange={(e) => setLogoBackground(e.target.checked)}
                            className="cursor-pointer"
                            data-testid="checkbox-logo-background"
                          />
                          White Background
                        </label>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLogoPreset(null)}
                          className="w-full text-xs"
                          data-testid="button-clear-logo"
                        >
                          Remove Logo
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Overlay Text */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Text Overlay</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="overlay-text" className="text-sm">Text</Label>
                      <Input
                        id="overlay-text"
                        placeholder="Add text below QR..."
                        value={overlayText}
                        onChange={(e) => setOverlayText(e.target.value)}
                        className="text-sm"
                        data-testid="input-overlay-text"
                      />
                    </div>
                    {overlayText && (
                      <div>
                        <Label htmlFor="overlay-color" className="text-sm">Color</Label>
                        <div className="flex gap-2">
                          <input
                            id="overlay-color"
                            type="color"
                            value={overlayTextColor}
                            onChange={(e) => setOverlayTextColor(e.target.value)}
                            className="h-9 w-12 rounded cursor-pointer border"
                            data-testid="input-overlay-color"
                          />
                          <Input value={overlayTextColor} onChange={(e) => setOverlayTextColor(e.target.value)} className="text-xs" data-testid="input-overlay-color-hex" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Error Correction */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Error Correction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-2">
                      {["L", "M", "Q", "H"].map(level => {
                        const levels: Record<string, string> = {
                          L: "7%",
                          M: "15%",
                          Q: "25%",
                          H: "30%",
                        };
                        return (
                          <button
                            key={level}
                            onClick={() => setErrorCorrectionLevel(level)}
                            className={`p-2 rounded border-2 text-center text-xs ${
                              errorCorrectionLevel === level ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                            data-testid={`button-error-level-${level}`}
                          >
                            <p className="font-bold">{level}</p>
                            <p className="text-xs text-muted-foreground">{levels[level]}</p>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1" data-testid="button-back-step2">
                    Back
                  </Button>
                  <Button
                    onClick={() => setShowTemplateModal(true)}
                    variant="outline"
                    className="flex-1"
                    size="sm"
                    data-testid="button-save-template"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button onClick={downloadQR} className="flex-1" size="sm" data-testid="button-download">
                    <Download className="mr-1 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <Card className="sticky top-4 h-fit" data-testid="card-preview">
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-3">
                  <div
                    className="p-3 rounded-lg w-full flex items-center justify-center"
                    style={{
                      backgroundColor: lightColor,
                      minHeight: overlayText ? "480px" : "440px",
                      border: "1px solid var(--border)",
                    }}
                    data-testid="preview-container"
                  >
                    <canvas ref={canvasRef} className="max-w-full" data-testid="canvas-qr" />
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                    <Shield className="h-3 w-3" />
                    Offline
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Save Template Modal */}
          {showTemplateModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Save Template</CardTitle>
                  <CardDescription>Name this design</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="e.g., Business Blue"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    autoFocus
                    data-testid="input-template-name"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowTemplateModal(false)}
                      data-testid="button-cancel-template"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={saveTemplate}
                      data-testid="button-confirm-save-template"
                    >
                      Save
                    </Button>
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
