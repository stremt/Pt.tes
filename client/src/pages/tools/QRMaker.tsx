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
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Smartphone, Shield, History, Trash2, Globe, WifiOff, Lock, HardDrive, Zap, Mail, MessageSquare, Wifi, Bitcoin, Palette, Check } from "lucide-react";
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

const QR_HISTORY_KEY = "pixocraft_qr_history";
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

const FRAME_PRESETS = [
  { id: "none", name: "Classic", image: "⬜" },
  { id: "scanme-top", name: "Scan Me (Top)", image: "📝⬜" },
  { id: "scanme-bottom", name: "Scan Me (Bottom)", image: "⬜📝" },
  { id: "border-thick", name: "Thick Border", image: "▪️⬜▪️" },
  { id: "border-gradient", name: "Gradient", image: "🎨⬜🎨" },
];

const TEMPLATES = [
  { id: "premium-blue", name: "Premium Blue", darkColor: "#0052CC", lightColor: "#E3F2FD" },
  { id: "vibrant-red", name: "Vibrant Red", darkColor: "#DC2626", lightColor: "#FEE2E2" },
  { id: "forest-green", name: "Forest Green", darkColor: "#15803D", lightColor: "#DCFCE7" },
  { id: "sunset-orange", name: "Sunset Orange", darkColor: "#EA580C", lightColor: "#FFEDD5" },
  { id: "deep-purple", name: "Deep Purple", darkColor: "#6D28D9", lightColor: "#F3E8FF" },
  { id: "classic-black", name: "Classic Black", darkColor: "#000000", lightColor: "#FFFFFF" },
];

export default function QRMaker() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");

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
  }, []);

  // Auto-generate QR when customization changes
  useEffect(() => {
    if (step === 3 && selectedType && canvasRef.current) {
      const timer = setTimeout(() => renderQR(), 200);
      return () => clearTimeout(timer);
    }
  }, [darkColor, lightColor, frameStyle, logoImage, errorCorrectionLevel, step, selectedType, formData]);

  useSEO({
    title: "Free QR Code Generator - Create Professional QR Codes | Pixocraft",
    description: "Create professional QR codes free: URL, vCard, Email, SMS, WiFi, Bitcoin. Customize colors, frames, logos. Works offline. Instant PNG download.",
    keywords: "qr code generator, free qr code maker, create qr code, custom qr code, qr code frames",
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

  const getCorrectionLevel = () => {
    const levels: Record<string, any> = {
      L: { value: "L", description: "~7% recovery" },
      M: { value: "M", description: "~15% recovery" },
      Q: { value: "Q", description: "~25% recovery" },
      H: { value: "H", description: "~30% recovery" },
    };
    return levels[errorCorrectionLevel];
  };

  const drawFrame = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const { width, height } = canvas;

    if (frameStyle === "scanme-top") {
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText("SCAN ME", width / 2, 30);
    } else if (frameStyle === "scanme-bottom") {
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText("SCAN ME", width / 2, height - 15);
    } else if (frameStyle === "border-thick") {
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      ctx.strokeRect(10, 10, width - 20, height - 20);
    }
  };

  const renderQR = async () => {
    try {
      if (!canvasRef.current) return;

      const qrData = generateQRData();
      if (!qrData.trim()) return;

      const levelObj = getCorrectionLevel();

      await QRCodeLib.toCanvas(canvasRef.current, qrData, {
        width: 350,
        margin: 2,
        errorCorrectionLevel: levelObj.value,
        color: { dark: darkColor, light: lightColor },
      });

      const ctx = canvasRef.current.getContext("2d");
      if (ctx && frameStyle !== "none") {
        drawFrame(canvasRef.current, ctx);
      }

      // Add logo
      if (logoImage && ctx) {
        const img = new Image();
        img.onload = () => {
          const logoSize = 70;
          const x = (canvasRef.current!.width - logoSize) / 2;
          const y = (canvasRef.current!.height - logoSize) / 2;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(x - 6, y - 6, logoSize + 12, logoSize + 12);
          ctx.drawImage(img, x, y, logoSize, logoSize);
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
    if (canvasRef.current) {
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
        description: "QR code saved to your downloads",
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
        toast({ title: "Logo Added", description: "Embedded in your QR code" });
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTemplate = (templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setDarkColor(template.darkColor);
      setLightColor(template.lightColor);
      toast({
        title: template.name,
        description: "Template applied successfully",
      });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(QR_HISTORY_KEY);
    toast({ title: "History Cleared" });
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(QR_HISTORY_KEY, JSON.stringify(updated));
  };

  const relatedTools = getRelatedTools("qr-maker");

  const faqItems: FAQItem[] = [
    {
      question: "How do I create a QR code?",
      answer: "Select a QR code type (URL, vCard, Email, etc.), enter your information, choose customization options like colors and frames, then download. It's free and takes just seconds.",
    },
    {
      question: "Does this work offline?",
      answer: "Yes! Once loaded, generate unlimited QR codes without internet. All processing happens in your browser.",
    },
    {
      question: "Where is my data stored?",
      answer: "Nowhere. Everything processes locally in your browser. Your data never leaves your device—complete privacy.",
    },
    {
      question: "What's error correction?",
      answer: "Error correction allows QR codes to work even if damaged. Higher levels are more resistant but create more complex patterns.",
    },
    {
      question: "Can I add a logo?",
      answer: "Yes. Upload any image and it will be embedded in the center of your QR code with proper spacing.",
    },
    {
      question: "Do QR codes expire?",
      answer: "No. Static QR codes never expire. They work forever unless the destination (like a website) changes.",
    },
    {
      question: "What file formats can I download?",
      answer: "Currently PNG. High quality, perfect for print and digital use.",
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const softwareAppSchema = generateSoftwareApplicationSchema({
    name: "Free QR Code Generator",
    description: "Generate professional QR codes with 7 types, custom colors, frames, and logo support. Works offline.",
    url: "https://tools.pixocraft.in/tools/qr-maker",
    applicationCategory: "UtilityApplication",
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <span>QR Code Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Free QR Code Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional QR codes in 3 steps: Select type, enter data, customize & download. Works offline, fully free.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>7 QR Types</Badge>
              <Badge>Custom Colors</Badge>
              <Badge>Frame Styles</Badge>
              <Badge>Logo Support</Badge>
              <Badge>100% Offline</Badge>
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
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                )}
                {selectedType === "text" && (
                  <div>
                    <Label>Text Message</Label>
                    <Textarea
                      placeholder="Enter any text..."
                      value={formData.text || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Message (Optional)</Label>
                      <Textarea
                        placeholder="SMS text..."
                        value={formData.smsText || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, smsText: e.target.value }))}
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
                        onChange={(e) => setFormData(prev => ({ ...prev, wifiSsid: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="WiFi password"
                        value={formData.wifiPassword || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, wifiPassword: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Security Type</Label>
                      <select
                        className="w-full px-3 py-2 border rounded-md"
                        value={formData.wifiSecurity || "WPA"}
                        onChange={(e) => setFormData(prev => ({ ...prev, wifiSecurity: e.target.value }))}
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
                      onChange={(e) => setFormData(prev => ({ ...prev, bitcoinAddress: e.target.value }))}
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
                        onChange={(e) => setFormData(prev => ({ ...prev, vcardName: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        placeholder="+1 234 567 8900"
                        value={formData.vcardPhone || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, vcardPhone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.vcardEmail || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, vcardEmail: e.target.value }))}
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
                {/* Templates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Color Templates</CardTitle>
                    <CardDescription>Quick color presets for your QR code</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {TEMPLATES.map(template => (
                        <button
                          key={template.id}
                          onClick={() => applyTemplate(template.id)}
                          className="p-3 rounded-lg border-2 text-center hover-elevate transition-all"
                          style={{
                            borderColor: template.darkColor,
                            backgroundColor: template.lightColor + "20",
                          }}
                        >
                          <div
                            className="h-8 w-full rounded mb-2"
                            style={{
                              background: `linear-gradient(45deg, ${template.darkColor} 0%, ${template.lightColor} 100%)`,
                            }}
                          />
                          <p className="text-xs font-medium">{template.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Colors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Dark Color (QR Pattern)</Label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="h-10 w-16 rounded cursor-pointer border"
                        />
                        <Input value={darkColor} onChange={(e) => setDarkColor(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Label>Light Color (Background)</Label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="h-10 w-16 rounded cursor-pointer border"
                        />
                        <Input value={lightColor} onChange={(e) => setLightColor(e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Frames */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frame Style</CardTitle>
                    <CardDescription>Add decorative frames to your QR code</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {FRAME_PRESETS.map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setFrameStyle(frame.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            frameStyle === frame.id ? "border-primary bg-primary/10" : "border-muted hover:border-primary/50"
                          }`}
                        >
                          <p className="text-2xl mb-1">{frame.image}</p>
                          <p className="text-xs font-medium">{frame.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Error Correction */}
                <Card>
                  <CardHeader>
                    <CardTitle>Error Correction Level</CardTitle>
                    <CardDescription>How resistant your QR code is to damage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                            className={`p-3 rounded-lg border-2 text-center transition-all ${
                              errorCorrectionLevel === level ? "border-primary bg-primary/10" : "border-muted"
                            }`}
                          >
                            <p className="text-sm font-bold">{level}</p>
                            <p className="text-xs text-muted-foreground">{levels[level]}</p>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Logo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add Logo</CardTitle>
                    <CardDescription>Embed your logo in the center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                    {logoImage && (
                      <div className="mt-4 flex items-center gap-3">
                        <img src={logoImage} alt="Logo" className="h-16 w-16 rounded border object-cover" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setLogoImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={downloadQR} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <Card className="sticky top-4 h-fit">
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                  <CardDescription>Updates in real-time</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-6 bg-white rounded-lg w-full flex items-center justify-center min-h-[340px] border">
                    <canvas ref={canvasRef} className="max-w-full" />
                  </div>
                  <div className="text-xs text-muted-foreground text-center flex items-center gap-1 justify-center">
                    <Shield className="h-3 w-3" />
                    Generated in your browser
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <Card className="mt-16">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent QR Codes ({history.length})
                </CardTitle>
                <Button size="sm" variant="outline" onClick={clearHistory}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
                  {history.map(item => (
                    <div key={item.id} className="group relative">
                      <div className="bg-white p-2 rounded-lg border hover-elevate">
                        <img src={item.qrCodeUrl} alt="QR" className="w-full" />
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100"
                        onClick={() => deleteHistoryItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Sections */}
          <section className="mt-16 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">QR Code Types & Uses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <LinkIcon className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">URL / Website</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Link to any website or landing page. Perfect for marketing campaigns.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <User className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">vCard / Contact</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Share business cards digitally. Recipients save contact info instantly.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Mail className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Email Address</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Send emails directly from QR code scans.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Wifi className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">WiFi Network</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Share WiFi credentials instantly. One scan to connect.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">SMS / Text</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Send pre-filled text messages with one scan.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Plain Text</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Encode any text message or information.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bitcoin className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Bitcoin Address</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Share cryptocurrency wallet addresses securely.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Palette className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Custom Design</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Colors, frames, logos & more. Make QR codes uniquely yours.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Generator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Zap className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Completely Free</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Generate unlimited QR codes at zero cost. No signup, no email, no hidden fees.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>100% Private</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  All processing happens in your browser. Your data never touches a server.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <WifiOff className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Works Offline</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Load once, then generate QR codes anytime without internet connection.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Palette className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Fully Customizable</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Custom colors, frames, logos. Make your QR codes match your brand.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible>
                  {faqItems.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
}
