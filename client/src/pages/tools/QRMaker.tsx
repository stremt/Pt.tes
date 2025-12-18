import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Shield, History, Trash2, Lock, HardDrive, Zap, Mail, MessageSquare, Wifi, Bitcoin, Palette, Save, X, Copy } from "lucide-react";
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
  logoImage: string | null;
  logoSize: number;
  logoBackground: boolean;
  errorCorrectionLevel: string;
}

const QR_HISTORY_KEY = "pixocraft_qr_history";
const TEMPLATES_KEY = "pixocraft_qr_templates";
const MAX_HISTORY_ITEMS = 20;

const QR_TYPES = [
  { id: "url", label: "URL / Website", icon: LinkIcon, description: "Link to website" },
  { id: "vcard", label: "vCard / Contact", icon: User, description: "Save contact info" },
  { id: "text", label: "Plain Text", icon: FileText, description: "Any text message" },
  { id: "email", label: "Email Address", icon: Mail, description: "Send email" },
  { id: "sms", label: "SMS / Text", icon: MessageSquare, description: "Send SMS" },
  { id: "wifi", label: "WiFi Network", icon: Wifi, description: "Connect to WiFi" },
  { id: "bitcoin", label: "Bitcoin Address", icon: Bitcoin, description: "Send payment" },
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
  { id: "none", name: "Classic", description: "No frame" },
  { id: "scanme-top", name: "Scan Me (Top)", description: "SCAN ME text at top" },
  { id: "scanme-bottom", name: "Scan Me (Bottom)", description: "SCAN ME text at bottom" },
  { id: "border", name: "Simple Border", description: "Solid border" },
  { id: "rounded-border", name: "Rounded Border", description: "Rounded corners" },
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
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);

  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPreset, setLogoPreset] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(70);
  const [logoBackground, setLogoBackground] = useState(true);
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
  }, [darkColor, lightColor, frameStyle, logoImage, logoPreset, logoSize, logoBackground, errorCorrectionLevel, overlayText, overlayTextColor, step, selectedType, formData]);

  useSEO({
    title: "Free QR Code Generator - Advanced Customization | Pixocraft",
    description: "Professional QR codes with colors, logos, text overlay, and templates. 7 QR types. Works offline.",
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
      youtube: '<circle cx="50" cy="50" r="45" fill="#FF0000"/><text x="50" y="65" font-size="50" fill="white" text-anchor="middle" font-weight="bold">▶</text>',
      facebook: '<circle cx="50" cy="50" r="45" fill="#1877F2"/><text x="50" y="60" font-size="40" fill="white" text-anchor="middle" font-weight="bold">f</text>',
      whatsapp: '<circle cx="50" cy="50" r="45" fill="#25D366"/><text x="50" y="65" font-size="45" fill="white" text-anchor="middle" font-weight="bold">✓✓</text>',
      instagram: '<circle cx="50" cy="50" r="45" fill="#E4405F"/><rect x="30" y="30" width="40" height="40" rx="8" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="12" fill="none" stroke="white" stroke-width="2"/><circle cx="60" cy="40" r="2" fill="white"/>',
      linkedin: '<circle cx="50" cy="50" r="45" fill="#0A66C2"/><text x="50" y="65" font-size="40" fill="white" text-anchor="middle" font-weight="bold">in</text>',
      telegram: '<circle cx="50" cy="50" r="45" fill="#0088cc"/><text x="50" y="60" font-size="35" fill="white" text-anchor="middle" font-weight="bold">✈</text>',
      twitter: '<circle cx="50" cy="50" r="45" fill="#000000"/><text x="50" y="65" font-size="45" fill="white" text-anchor="middle" font-weight="bold">𝕏</text>',
    };
    return `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">${logoPresets[presetId] || ""}</svg>`;
  };

  const renderQR = async () => {
    try {
      if (!canvasRef.current) return;

      const qrData = generateQRData();
      if (!qrData.trim()) return;

      const levelObj = { L: "L", M: "M", Q: "Q", H: "H" }[errorCorrectionLevel];

      // Create temporary canvas for QR code
      const tempCanvas = document.createElement("canvas");
      await QRCodeLib.toCanvas(tempCanvas, qrData, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: levelObj as "L" | "M" | "Q" | "H",
        color: { dark: darkColor, light: lightColor },
      });

      // Get context from main canvas
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      // Set canvas size with extra space for frame and text
      canvasRef.current.width = 400;
      canvasRef.current.height = 450;

      // Draw background
      ctx.fillStyle = lightColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Draw frame if needed
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

      // Draw frame text
      if (frameStyle === "scanme-top") {
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = darkColor;
        ctx.textAlign = "center";
        ctx.fillText("SCAN ME", 200, 35);
      } else if (frameStyle === "scanme-bottom") {
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = darkColor;
        ctx.textAlign = "center";
        ctx.fillText("SCAN ME", 200, 430);
      }

      // Draw QR code in center
      const qrX = (canvasRef.current.width - tempCanvas.width) / 2;
      const qrY = (frameStyle === "scanme-top" ? 50 : 20);
      ctx.drawImage(tempCanvas, qrX, qrY);

      // Draw logo if present
      if (logoImage || logoPreset) {
        const logoX = (canvasRef.current.width - logoSize) / 2;
        const logoY = qrY + (tempCanvas.height - logoSize) / 2;

        if (logoBackground) {
          ctx.fillStyle = lightColor;
          ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
          ctx.strokeStyle = darkColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
        }

        if (logoImage) {
          try {
            const img = new Image();
            await new Promise((resolve) => {
              img.onload = () => {
                ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
                resolve(null);
              };
              img.src = logoImage;
            });
          } catch (e) {
            console.error("Logo error:", e);
          }
        } else if (logoPreset) {
          try {
            const svg = getSocialLogoSvg(logoPreset);
            const img = new Image();
            img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
            await new Promise((resolve) => {
              img.onload = () => {
                ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
                resolve(null);
              };
            });
          } catch (e) {
            console.error("Social logo error:", e);
          }
        }
      }

      // Draw overlay text
      if (overlayText) {
        ctx.font = "16px Arial";
        ctx.fillStyle = overlayTextColor;
        ctx.textAlign = "center";
        ctx.fillText(overlayText, 200, 410);
      }

      // Update preview state
      setQrCodeUrl(canvasRef.current.toDataURL());
    } catch (error) {
      console.error("QR render error:", error);
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
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

    const qrData = generateQRData();
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
      logoImage,
      logoSize,
      logoBackground,
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
    setLogoImage(template.logoImage);
    setLogoSize(template.logoSize);
    setLogoBackground(template.logoBackground);
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
        setLogoPreset(null);
        toast({ title: "Logo Added", description: "Custom logo applied" });
      };
      reader.readAsDataURL(file);
    }
  };

  const applySocialLogo = (presetId: string) => {
    setLogoPreset(presetId);
    setLogoImage(null);
    const logoName = SOCIAL_LOGOS.find(l => l.id === presetId)?.name || "";
    toast({
      title: "Logo Applied",
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

  const relatedTools = getRelatedTools("qr-maker");

  const faqItems: FAQItem[] = [
    {
      question: "How do I create a QR code?",
      answer: "Select a QR code type, enter your information, customize with colors, logos, and text, then download as PNG.",
    },
    {
      question: "What QR types can I generate?",
      answer: "We support URL, vCard/Contact, Plain Text, Email, SMS, WiFi Network, and Bitcoin Address.",
    },
    {
      question: "Can I add a logo to my QR code?",
      answer: "Yes! Upload a custom image or choose from social media logos. Logo is placed in the center.",
    },
    {
      question: "Can I save my design as a template?",
      answer: "Yes! Complete your design then click 'Save Template' to reuse the same customization for future QR codes.",
    },
    {
      question: "Does error correction affect scannability?",
      answer: "Higher levels make QR codes more damage-resistant but create more complex patterns. All levels are fully scannable.",
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const softwareAppSchema = generateSoftwareApplicationSchema({
    name: "Advanced QR Code Generator",
    description: "Professional QR codes with custom colors, logos, text overlay, and template saving.",
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
            <h1 className="text-4xl md:text-5xl font-bold">Professional QR Code Generator</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced customization with colors, logos, text overlay, frames, and templates. Download as PNG. Works 100% offline.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Custom Colors</Badge>
              <Badge>Social Logos</Badge>
              <Badge>Text Overlay</Badge>
              <Badge>Frames</Badge>
              <Badge>Save Templates</Badge>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
            <div className="flex items-center flex-1">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? "bg-primary" : "bg-muted"}`} data-testid="step-1">
                1
              </div>
              <div className={`flex-1 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>
            <div className="flex items-center flex-1">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? "bg-primary" : "bg-muted"}`} data-testid="step-2">
                2
              </div>
              <div className={`flex-1 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
            </div>
            <div className="flex items-center">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 3 ? "bg-primary" : "bg-muted"}`} data-testid="step-3">
                3
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Step 1: Select QR Code Type</CardTitle>
                <CardDescription>Choose what you want to encode</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QR_TYPES.map(type => {
                    const Icon = type.icon;
                    return (
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
                        <div className="flex items-start gap-3">
                          <Icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">{type.label}</p>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Step 2: Enter Information</CardTitle>
                <CardDescription>Fill in the data for your QR code</CardDescription>
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
                    <Label htmlFor="text-input">Text Message</Label>
                    <Textarea
                      id="text-input"
                      placeholder="Enter any text..."
                      value={formData.text || ""}
                      onChange={(e) => handleInputChange("text", e.target.value)}
                      rows={5}
                      data-testid="input-text"
                    />
                  </div>
                )}
                {selectedType === "email" && (
                  <div>
                    <Label htmlFor="email-input">Email Address</Label>
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
                      <Label htmlFor="phone-input">Phone Number</Label>
                      <Input
                        id="phone-input"
                        placeholder="+1234567890"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sms-input">Message (Optional)</Label>
                      <Textarea
                        id="sms-input"
                        placeholder="SMS text..."
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
                      <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
                      <Input
                        id="wifi-ssid"
                        placeholder="WiFi name"
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
                        placeholder="WiFi password"
                        value={formData.wifiPassword || ""}
                        onChange={(e) => handleInputChange("wifiPassword", e.target.value)}
                        data-testid="input-wifi-pass"
                      />
                    </div>
                    <div>
                      <Label htmlFor="wifi-sec">Security Type</Label>
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
                    <Label htmlFor="bitcoin-input">Bitcoin Address</Label>
                    <Input
                      id="bitcoin-input"
                      placeholder="1A1z7agoat..."
                      value={formData.bitcoinAddress || ""}
                      onChange={(e) => handleInputChange("bitcoinAddress", e.target.value)}
                      data-testid="input-bitcoin"
                    />
                  </div>
                )}
                {selectedType === "vcard" && (
                  <>
                    <div>
                      <Label htmlFor="vcard-name">Full Name</Label>
                      <Input
                        id="vcard-name"
                        placeholder="John Doe"
                        value={formData.vcardName || ""}
                        onChange={(e) => handleInputChange("vcardName", e.target.value)}
                        data-testid="input-vcard-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vcard-phone">Phone Number</Label>
                      <Input
                        id="vcard-phone"
                        placeholder="+1 234 567 8900"
                        value={formData.vcardPhone || ""}
                        onChange={(e) => handleInputChange("vcardPhone", e.target.value)}
                        data-testid="input-vcard-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vcard-email">Email Address</Label>
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
                    Next: Customize <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* My Templates */}
                {customTemplates.length > 0 && (
                  <Card data-testid="card-templates">
                    <CardHeader>
                      <CardTitle>My Templates</CardTitle>
                      <CardDescription>Your saved QR code designs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {customTemplates.map(template => (
                          <div key={template.id} className="group relative">
                            <button
                              onClick={() => applyTemplate(template)}
                              className="w-full p-3 rounded-lg border-2 border-primary/50 hover:border-primary hover-elevate text-center"
                              data-testid={`button-template-${template.id}`}
                            >
                              <p className="text-xs font-medium truncate">{template.name}</p>
                            </button>
                            <button
                              onClick={() => deleteTemplate(template.id)}
                              className="absolute -top-2 -right-2 h-5 w-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
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
                    <CardTitle>Color Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {COLOR_TEMPLATES.map(template => (
                        <button
                          key={template.id}
                          onClick={() => applyColorTemplate(template)}
                          className="p-3 rounded-lg border-2 border-muted hover:border-primary hover-elevate text-center"
                          data-testid={`button-color-${template.id}`}
                        >
                          <div
                            className="h-8 w-full rounded mb-1"
                            style={{
                              background: `linear-gradient(45deg, ${template.darkColor}, ${template.lightColor})`,
                            }}
                          />
                          <p className="text-xs font-medium">{template.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Colors */}
                <Card data-testid="card-color-picker">
                  <CardHeader>
                    <CardTitle>Colors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dark-color">Dark Color (QR Pattern)</Label>
                        <div className="flex gap-2">
                          <input
                            id="dark-color"
                            type="color"
                            value={darkColor}
                            onChange={(e) => setDarkColor(e.target.value)}
                            className="h-10 w-16 rounded cursor-pointer border"
                            data-testid="input-dark-color"
                          />
                          <Input value={darkColor} onChange={(e) => setDarkColor(e.target.value)} data-testid="input-dark-color-hex" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="light-color">Light Color (Background)</Label>
                        <div className="flex gap-2">
                          <input
                            id="light-color"
                            type="color"
                            value={lightColor}
                            onChange={(e) => setLightColor(e.target.value)}
                            className="h-10 w-16 rounded cursor-pointer border"
                            data-testid="input-light-color"
                          />
                          <Input value={lightColor} onChange={(e) => setLightColor(e.target.value)} data-testid="input-light-color-hex" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Frames */}
                <Card data-testid="card-frames">
                  <CardHeader>
                    <CardTitle>Frame Styles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {FRAME_PRESETS.map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setFrameStyle(frame.id)}
                          className={`p-3 rounded border-2 text-center text-sm ${
                            frameStyle === frame.id ? "border-primary bg-primary/10" : "border-muted"
                          }`}
                          data-testid={`button-frame-${frame.id}`}
                          title={frame.description}
                        >
                          <p className="font-medium">{frame.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Logo Section */}
                <Card data-testid="card-logo">
                  <CardHeader>
                    <CardTitle>Logo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Social Media Icons</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {SOCIAL_LOGOS.map(logo => (
                          <button
                            key={logo.id}
                            onClick={() => applySocialLogo(logo.id)}
                            className={`p-3 rounded border-2 text-center ${
                              logoPreset === logo.id ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                            title={logo.name}
                            data-testid={`button-social-logo-${logo.id}`}
                          >
                            <div className="w-full h-6 rounded flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: logo.color }}>
                              {logo.id.charAt(0).toUpperCase()}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="logo-upload">Upload Custom Image</Label>
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        data-testid="input-logo-upload"
                      />
                    </div>

                    {(logoImage || logoPreset) && (
                      <>
                        <div>
                          <Label htmlFor="logo-size">Logo Size: {logoSize}px</Label>
                          <input
                            id="logo-size"
                            type="range"
                            min="30"
                            max="150"
                            value={logoSize}
                            onChange={(e) => setLogoSize(Number(e.target.value))}
                            className="w-full"
                            data-testid="slider-logo-size"
                          />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={logoBackground}
                            onChange={(e) => setLogoBackground(e.target.checked)}
                            className="cursor-pointer"
                            data-testid="checkbox-logo-background"
                          />
                          <span className="text-sm">White Background Behind Logo</span>
                        </label>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setLogoImage(null);
                            setLogoPreset(null);
                          }}
                          data-testid="button-clear-logo"
                        >
                          Clear Logo
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Overlay Text */}
                <Card data-testid="card-overlay">
                  <CardHeader>
                    <CardTitle>Overlay Text</CardTitle>
                    <CardDescription>Add text below the QR code</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="overlay-text">Text</Label>
                      <Input
                        id="overlay-text"
                        placeholder="Optional overlay text"
                        value={overlayText}
                        onChange={(e) => setOverlayText(e.target.value)}
                        data-testid="input-overlay-text"
                      />
                    </div>
                    <div>
                      <Label htmlFor="overlay-color">Text Color</Label>
                      <div className="flex gap-2">
                        <input
                          id="overlay-color"
                          type="color"
                          value={overlayTextColor}
                          onChange={(e) => setOverlayTextColor(e.target.value)}
                          className="h-10 w-16 rounded cursor-pointer border"
                          data-testid="input-overlay-color"
                        />
                        <Input value={overlayTextColor} onChange={(e) => setOverlayTextColor(e.target.value)} data-testid="input-overlay-color-hex" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Error Correction */}
                <Card data-testid="card-error-correction">
                  <CardHeader>
                    <CardTitle>Error Correction Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["L", "M", "Q", "H"].map(level => {
                        const levels: Record<string, string> = {
                          L: "~7% recovery",
                          M: "~15% recovery",
                          Q: "~25% recovery",
                          H: "~30% recovery",
                        };
                        return (
                          <button
                            key={level}
                            onClick={() => setErrorCorrectionLevel(level)}
                            className={`p-3 rounded border-2 text-center ${
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

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1" data-testid="button-back-step2">
                    Back
                  </Button>
                  <Button
                    onClick={() => setShowTemplateModal(true)}
                    variant="outline"
                    className="flex-1"
                    data-testid="button-save-template"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save Template
                  </Button>
                  <Button onClick={downloadQR} className="flex-1" data-testid="button-download">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <Card className="sticky top-4 h-fit" data-testid="card-preview">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div
                    className="p-4 rounded-lg w-full flex items-center justify-center min-h-[450px] border"
                    style={{ backgroundColor: lightColor }}
                    data-testid="preview-container"
                  >
                    <canvas ref={canvasRef} className="max-w-full" data-testid="canvas-qr" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center flex items-center gap-1 justify-center">
                    <Shield className="h-3 w-3" />
                    Generated offline
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
                  <CardDescription>Name your QR code design for future use</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Template name (e.g., Business Blue)"
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
