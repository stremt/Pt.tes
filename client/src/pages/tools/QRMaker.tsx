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
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Shield, History, Trash2, Lock, HardDrive, Zap, Mail, MessageSquare, Wifi, Bitcoin, Palette, Save, X } from "lucide-react";
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
  bgType: "solid" | "gradient" | "transparent";
  externalEyePattern: string;
  internalEyePattern: string;
  bodyPattern: string;
  frameStyle: string;
  overlayText: string;
  logoPreset: string | null;
  logoImage: string | null;
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
  { id: "youtube", name: "YouTube", emoji: "🔴" },
  { id: "facebook", name: "Facebook", emoji: "👤" },
  { id: "whatsapp", name: "WhatsApp", emoji: "💬" },
  { id: "instagram", name: "Instagram", emoji: "📷" },
  { id: "linkedin", name: "LinkedIn", emoji: "💼" },
  { id: "telegram", name: "Telegram", emoji: "✈️" },
  { id: "twitter", name: "Twitter", emoji: "𝕏" },
];

const EYE_PATTERNS = {
  external: [
    { id: "square", name: "Square", emoji: "⬜" },
    { id: "circle", name: "Circle", emoji: "⭕" },
    { id: "roundsquare", name: "Round Square", emoji: "▯" },
  ],
  internal: [
    { id: "square", name: "Square", emoji: "▪️" },
    { id: "dot", name: "Dot", emoji: "●" },
    { id: "diamond", name: "Diamond", emoji: "◆" },
  ],
};

const BODY_PATTERNS = [
  { id: "square", name: "Square", emoji: "◼️" },
  { id: "dots", name: "Dots", emoji: "••" },
  { id: "circle", name: "Circle", emoji: "●●" },
];

const FRAME_PRESETS = [
  { id: "none", name: "Classic", emoji: "⬜" },
  { id: "scanme-top", name: "Scan Me (Top)", emoji: "📝⬜" },
  { id: "scanme-bottom", name: "Scan Me (Bottom)", emoji: "⬜📝" },
  { id: "border-thick", name: "Thick Border", emoji: "▪️⬜▪️" },
  { id: "border-gradient", name: "Gradient", emoji: "🎨⬜🎨" },
  { id: "rounded", name: "Rounded", emoji: "⭕" },
  { id: "banner-top", name: "Banner Top", emoji: "🎀⬜" },
  { id: "banner-bottom", name: "Banner Bottom", emoji: "⬜🎀" },
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
  const [bgType, setBgType] = useState<"solid" | "gradient" | "transparent">("solid");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPreset, setLogoPreset] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(70);
  const [logoBackground, setLogoBackground] = useState(true);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  const [externalEyePattern, setExternalEyePattern] = useState("square");
  const [internalEyePattern, setInternalEyePattern] = useState("square");
  const [bodyPattern, setBodyPattern] = useState("square");
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
      const timer = setTimeout(() => renderQR(), 200);
      return () => clearTimeout(timer);
    }
  }, [darkColor, lightColor, bgType, frameStyle, logoImage, logoPreset, logoSize, logoBackground, errorCorrectionLevel, externalEyePattern, internalEyePattern, bodyPattern, overlayText, step, selectedType, formData]);

  useSEO({
    title: "Free QR Code Generator - Advanced Customization | Pixocraft",
    description: "Professional QR codes with eye patterns, body patterns, social logos, text overlay, custom templates. 7 QR types. Works offline.",
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

  const renderQR = async () => {
    try {
      if (!canvasRef.current) return;

      const qrData = generateQRData();
      if (!qrData.trim()) return;

      const levelObj = { L: "L", M: "M", Q: "Q", H: "H" }[errorCorrectionLevel];

      await QRCodeLib.toCanvas(canvasRef.current, qrData, {
        width: 350,
        margin: 2,
        errorCorrectionLevel: levelObj as "L" | "M" | "Q" | "H",
        color: { dark: darkColor, light: bgType === "transparent" ? "transparent" : lightColor },
      });

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      // Draw frame
      if (frameStyle !== "none") {
        const { width, height } = canvasRef.current;
        if (frameStyle === "scanme-top") {
          ctx.font = "bold 18px Arial";
          ctx.fillStyle = darkColor;
          ctx.textAlign = "center";
          ctx.fillText("SCAN ME", width / 2, 30);
        } else if (frameStyle === "scanme-bottom") {
          ctx.font = "bold 18px Arial";
          ctx.fillStyle = darkColor;
          ctx.textAlign = "center";
          ctx.fillText("SCAN ME", width / 2, height - 15);
        } else if (frameStyle === "border-thick") {
          ctx.strokeStyle = darkColor;
          ctx.lineWidth = 5;
          ctx.strokeRect(10, 10, width - 20, height - 20);
        }
      }

      // Add overlay text
      if (overlayText) {
        const { width, height } = canvasRef.current;
        ctx.font = "14px Arial";
        ctx.fillStyle = overlayTextColor;
        ctx.textAlign = "center";
        ctx.fillText(overlayText, width / 2, height - 25);
      }

      // Add logo
      if (logoImage) {
        const img = new Image();
        img.onload = () => {
          const size = logoSize;
          const x = (canvasRef.current!.width - size) / 2;
          const y = (canvasRef.current!.height - size) / 2;
          
          if (logoBackground) {
            ctx.fillStyle = bgType === "transparent" ? "#FFFFFF" : lightColor;
            ctx.fillRect(x - 8, y - 8, size + 16, size + 16);
          }
          
          ctx.drawImage(img, x, y, size, size);
        };
        img.src = logoImage;
      }
    } catch (error) {
      console.error("QR render error:", error);
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
      bgType,
      externalEyePattern,
      internalEyePattern,
      bodyPattern,
      frameStyle,
      overlayText,
      logoPreset,
      logoImage,
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
    setBgType(template.bgType);
    setExternalEyePattern(template.externalEyePattern);
    setInternalEyePattern(template.internalEyePattern);
    setBodyPattern(template.bodyPattern);
    setFrameStyle(template.frameStyle);
    setOverlayText(template.overlayText);
    setLogoPreset(template.logoPreset);
    setLogoImage(template.logoImage);
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
        toast({ title: "Logo Added" });
      };
      reader.readAsDataURL(file);
    }
  };

  const applySocialLogo = (presetId: string) => {
    setLogoPreset(presetId);
    setLogoImage(null);
    toast({
      title: "Social Logo Applied",
      description: "Logo embedded in QR code",
    });
  };

  const applyColorTemplate = (template: typeof COLOR_TEMPLATES[0]) => {
    setDarkColor(template.darkColor);
    setLightColor(template.lightColor);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const relatedTools = getRelatedTools("qr-maker");

  const faqItems: FAQItem[] = [
    {
      question: "How do I create a QR code?",
      answer: "Select a QR code type, enter your information, customize the design with colors and patterns, then download as PNG or SVG.",
    },
    {
      question: "What are eye patterns?",
      answer: "Eye patterns are the corner markers of QR codes. External patterns are the outer corners, internal patterns are the inner dots.",
    },
    {
      question: "Can I save my design as a template?",
      answer: "Yes! Complete your design then click 'Save Template' to reuse the same customization for future QR codes.",
    },
    {
      question: "What's the difference between PNG and SVG?",
      answer: "PNG is a raster image (pixels), SVG is vector (scalable). SVG is better for print and large sizes.",
    },
    {
      question: "Does error correction affect scannability?",
      answer: "Higher levels make QR codes more damage-resistant but create more complex patterns. All levels are fully scannable.",
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const softwareAppSchema = generateSoftwareApplicationSchema({
    name: "Advanced QR Code Generator",
    description: "Professional QR codes with custom patterns, eye styles, social logos, text overlay, and template saving.",
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
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Professional QR Code Generator</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced customization with eye patterns, body patterns, social logos, overlays, templates. Download as PNG or SVG.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>Eye Patterns</Badge>
              <Badge>Body Patterns</Badge>
              <Badge>Social Logos</Badge>
              <Badge>Text Overlay</Badge>
              <Badge>Save Templates</Badge>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex justify-between items-center mb-12 max-w-2xl mx-auto">
            <div className="flex items-center flex-1">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 1 ? "bg-primary" : "bg-muted"}`}>
                1
              </div>
              <div className={`flex-1 h-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            </div>
            <div className="flex items-center flex-1">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 2 ? "bg-primary" : "bg-muted"}`}>
                2
              </div>
              <div className={`flex-1 h-1 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
            </div>
            <div className="flex items-center">
              <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold ${step >= 3 ? "bg-primary" : "bg-muted"}`}>
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
                    <Label>Website URL</Label>
                    <Input
                      placeholder="https://example.com"
                      value={formData.url || ""}
                      onChange={(e) => handleInputChange("url", e.target.value)}
                    />
                  </div>
                )}
                {selectedType === "text" && (
                  <div>
                    <Label>Text Message</Label>
                    <Textarea
                      placeholder="Enter any text..."
                      value={formData.text || ""}
                      onChange={(e) => handleInputChange("text", e.target.value)}
                      rows={5}
                    />
                  </div>
                )}
                {selectedType === "email" && (
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                )}
                {selectedType === "sms" && (
                  <>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+1234567890"
                        value={formData.phone || ""}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Message (Optional)</Label>
                      <Textarea
                        placeholder="SMS text..."
                        value={formData.smsText || ""}
                        onChange={(e) => handleInputChange("smsText", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}
                {selectedType === "wifi" && (
                  <>
                    <div>
                      <Label>Network Name (SSID)</Label>
                      <Input
                        placeholder="WiFi name"
                        value={formData.wifiSsid || ""}
                        onChange={(e) => handleInputChange("wifiSsid", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="WiFi password"
                        value={formData.wifiPassword || ""}
                        onChange={(e) => handleInputChange("wifiPassword", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Security Type</Label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={formData.wifiSecurity || "WPA"}
                        onChange={(e) => handleInputChange("wifiSecurity", e.target.value)}
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
                    <Label>Bitcoin Address</Label>
                    <Input
                      placeholder="1A1z7agoat..."
                      value={formData.bitcoinAddress || ""}
                      onChange={(e) => handleInputChange("bitcoinAddress", e.target.value)}
                    />
                  </div>
                )}
                {selectedType === "vcard" && (
                  <>
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        placeholder="John Doe"
                        value={formData.vcardName || ""}
                        onChange={(e) => handleInputChange("vcardName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+1 234 567 8900"
                        value={formData.vcardPhone || ""}
                        onChange={(e) => handleInputChange("vcardPhone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.vcardEmail || ""}
                        onChange={(e) => handleInputChange("vcardEmail", e.target.value)}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
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
                  <Card>
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
                            >
                              <p className="text-xs font-medium truncate">{template.name}</p>
                            </button>
                            <button
                              onClick={() => deleteTemplate(template.id)}
                              className="absolute -top-2 -right-2 h-5 w-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
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
                <Card>
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

                {/* Background */}
                <Card>
                  <CardHeader>
                    <CardTitle>Background</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      {["solid", "gradient", "transparent"].map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={bgType === type}
                            onChange={() => setBgType(type as typeof bgType)}
                            className="cursor-pointer"
                          />
                          <span className="text-sm capitalize">{type === "gradient" ? "Color Gradient" : type === "transparent" ? "Transparent" : "Single Color"}</span>
                        </label>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Dark Color</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={darkColor}
                            onChange={(e) => setDarkColor(e.target.value)}
                            className="h-10 w-16 rounded cursor-pointer border"
                          />
                          <Input value={darkColor} onChange={(e) => setDarkColor(e.target.value)} />
                        </div>
                      </div>
                      {bgType !== "transparent" && (
                        <div>
                          <Label>Light Color</Label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={lightColor}
                              onChange={(e) => setLightColor(e.target.value)}
                              className="h-10 w-16 rounded cursor-pointer border"
                            />
                            <Input value={lightColor} onChange={(e) => setLightColor(e.target.value)} />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Patterns - Eye */}
                <Card>
                  <CardHeader>
                    <CardTitle>Eye Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>External Eye Pattern</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {EYE_PATTERNS.external.map(pattern => (
                          <button
                            key={pattern.id}
                            onClick={() => setExternalEyePattern(pattern.id)}
                            className={`p-3 rounded border-2 text-center ${
                              externalEyePattern === pattern.id ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                            title={pattern.name}
                          >
                            <p className="text-2xl">{pattern.emoji}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Internal Eye Pattern</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {EYE_PATTERNS.internal.map(pattern => (
                          <button
                            key={pattern.id}
                            onClick={() => setInternalEyePattern(pattern.id)}
                            className={`p-3 rounded border-2 text-center ${
                              internalEyePattern === pattern.id ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                            title={pattern.name}
                          >
                            <p className="text-2xl">{pattern.emoji}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Body Patterns */}
                <Card>
                  <CardHeader>
                    <CardTitle>Body Patterns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {BODY_PATTERNS.map(pattern => (
                        <button
                          key={pattern.id}
                          onClick={() => setBodyPattern(pattern.id)}
                          className={`p-3 rounded border-2 text-center ${
                            bodyPattern === pattern.id ? "border-primary bg-primary/10" : "border-muted"
                          }`}
                          title={pattern.name}
                        >
                          <p className="text-2xl">{pattern.emoji}</p>
                          <p className="text-xs mt-1">{pattern.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Frames */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frame Styles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {FRAME_PRESETS.map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setFrameStyle(frame.id)}
                          className={`p-3 rounded border-2 text-center ${
                            frameStyle === frame.id ? "border-primary bg-primary/10" : "border-muted"
                          }`}
                        >
                          <p className="text-2xl">{frame.emoji}</p>
                          <p className="text-xs mt-1 font-medium">{frame.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Logo Section */}
                <Card>
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
                            className={`p-3 rounded border-2 text-center text-2xl ${
                              logoPreset === logo.id ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                            title={logo.name}
                          >
                            {logo.emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Upload Custom Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </div>

                    {(logoImage || logoPreset) && (
                      <>
                        <div>
                          <Label>Logo Size: {logoSize}px</Label>
                          <input
                            type="range"
                            min="30"
                            max="150"
                            value={logoSize}
                            onChange={(e) => setLogoSize(Number(e.target.value))}
                            className="w-full"
                          />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={logoBackground}
                            onChange={(e) => setLogoBackground(e.target.checked)}
                            className="cursor-pointer"
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
                        >
                          Clear Logo
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Overlay Text */}
                <Card>
                  <CardHeader>
                    <CardTitle>Overlay Text</CardTitle>
                    <CardDescription>Add text to your QR code</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Text</Label>
                      <Input
                        placeholder="Optional overlay text"
                        value={overlayText}
                        onChange={(e) => setOverlayText(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={overlayTextColor}
                          onChange={(e) => setOverlayTextColor(e.target.value)}
                          className="h-10 w-16 rounded cursor-pointer border"
                        />
                        <Input value={overlayTextColor} onChange={(e) => setOverlayTextColor(e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Error Correction */}
                <Card>
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
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={() => setShowTemplateModal(true)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save Template
                  </Button>
                  <Button onClick={downloadQR} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <Card className="sticky top-4 h-fit">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div
                    className="p-6 rounded-lg w-full flex items-center justify-center min-h-[340px] border"
                    style={{ backgroundColor: bgType === "transparent" ? "#f5f5f5" : lightColor }}
                  >
                    <canvas ref={canvasRef} className="max-w-full" />
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
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowTemplateModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={saveTemplate}
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
