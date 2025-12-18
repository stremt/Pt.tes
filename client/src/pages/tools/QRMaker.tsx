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
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Smartphone, Shield, History, Trash2, Globe, WifiOff, Lock, HardDrive, Zap, Mail, MessageSquare, Wifi, Bitcoin, Share2, Store, Image as ImageIcon, Palette, FrameIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import QRCodeLib from "qrcode";

interface QRHistoryItem {
  id: string;
  type: string;
  content: string;
  label: string;
  qrCodeUrl: string;
  createdAt: string;
}

const QR_HISTORY_KEY = "pixocraft_qr_history";
const MAX_HISTORY_ITEMS = 20;

const QR_TYPES = [
  { id: "url", label: "URL", icon: LinkIcon, description: "Website" },
  { id: "vcard", label: "vCard", icon: User, description: "Contact" },
  { id: "text", label: "Text", icon: FileText, description: "Plain text" },
  { id: "email", label: "Email", icon: Mail, description: "Email" },
  { id: "sms", label: "SMS", icon: MessageSquare, description: "Message" },
  { id: "wifi", label: "WiFi", icon: Wifi, description: "Network" },
  { id: "bitcoin", label: "Bitcoin", icon: Bitcoin, description: "Payment" },
  { id: "twitter", label: "Twitter", icon: Share2, description: "Social" },
  { id: "facebook", label: "Facebook", icon: Share2, description: "Social" },
  { id: "app", label: "App Store", icon: Store, description: "App" },
];

const FRAME_STYLES = [
  { id: "none", label: "Classic", preview: "Plain black & white QR code" },
  { id: "outline", label: "Outline", preview: "Bold black border frame" },
  { id: "scan-me-top", label: "Scan Top", preview: "Text: SCAN ME above code" },
  { id: "scan-me-bottom", label: "Scan Bottom", preview: "Text: SCAN ME below code" },
  { id: "banner", label: "Banner", preview: "Decorative banner at bottom" },
];

export default function QRMaker() {
  const [inputType, setInputType] = useState("url");
  const [formData, setFormData] = useState<Record<string, string>>({
    url: "",
    text: "",
    email: "",
    phone: "",
    smsText: "",
    wifiSsid: "",
    wifiPassword: "",
    wifiSecurity: "WPA",
    bitcoinAddress: "",
    twitter: "",
    facebook: "",
    vcardName: "",
    vcardPhone: "",
    vcardEmail: "",
    appUrl: "",
  });
  
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [darkColor, setDarkColor] = useState("#000000");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedHistory = localStorage.getItem(QR_HISTORY_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        localStorage.removeItem(QR_HISTORY_KEY);
      }
    }
  }, []);

  // Auto-generate QR on input change
  useEffect(() => {
    const timer = setTimeout(() => {
      const data = generateQRData();
      if (data.trim() && canvasRef.current) {
        renderQRCode(data);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [formData, inputType, darkColor, lightColor, frameStyle, logoImage]);

  useSEO({
    title: "Free QR Code Generator - Custom QR Maker with Frames & Logos | Pixocraft",
    description: "Create professional QR codes free: 10+ types (URL, vCard, Email, SMS, WiFi, Bitcoin, social). Add frames, custom colors, logos. Works offline. Instant PNG download.",
    keywords: "qr code generator, free qr code maker, create qr code, qr code frames, wifi qr code, vcard qr code, custom qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-maker",
    ogImage: OG_IMAGES.qrMaker,
  });

  const generateQRData = (): string => {
    const data = formData;
    
    switch (inputType) {
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
      case "twitter":
        return data.twitter ? `https://twitter.com/${data.twitter}` : "";
      case "facebook":
        return data.facebook ? `https://facebook.com/${data.facebook}` : "";
      case "vcard":
        return data.vcardName || data.vcardEmail || data.vcardPhone
          ? `BEGIN:VCARD\nVERSION:3.0\nFN:${data.vcardName}\nTEL:${data.vcardPhone}\nEMAIL:${data.vcardEmail}\nEND:VCARD`
          : "";
      case "app":
        return data.appUrl || "";
      default:
        return "";
    }
  };

  const drawFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";

    if (frameStyle === "scan-me-top") {
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("SCAN ME", width / 2, 25);
    } else if (frameStyle === "scan-me-bottom") {
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("SCAN ME", width / 2, height - 10);
    } else if (frameStyle === "outline") {
      ctx.lineWidth = 3;
      ctx.strokeRect(8, 8, width - 16, height - 16);
    } else if (frameStyle === "banner") {
      ctx.fillRect(0, height - 30, width, 30);
    }
  };

  const renderQRCode = async (qrData: string) => {
    try {
      if (!canvasRef.current) return;

      await QRCodeLib.toCanvas(canvasRef.current, qrData, {
        width: 350,
        margin: 2,
        color: { dark: darkColor, light: lightColor },
      });

      const ctx = canvasRef.current.getContext("2d");
      if (ctx && frameStyle !== "none") {
        drawFrame(ctx, canvasRef.current.width, canvasRef.current.height);
      }

      // Add logo if present
      if (logoImage && ctx) {
        const img = new Image();
        img.onload = () => {
          const logoSize = 70;
          const x = (canvasRef.current!.width - logoSize) / 2;
          const y = (canvasRef.current!.height - logoSize) / 2;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
          ctx.drawImage(img, x, y, logoSize, logoSize);
        };
        img.src = logoImage;
      }
    } catch (error) {
      console.error("QR render error:", error);
    }
  };

  const generateQR = async () => {
    const qrData = generateQRData();
    if (!qrData.trim()) {
      toast({
        title: "Missing Data",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (canvasRef.current) {
        const url = canvasRef.current.toDataURL();
        setQrCodeUrl(url);
        saveToHistory(qrData, url);
        toast({ title: "QR Generated!", description: "Ready to download" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const saveToHistory = (data: string, url: string) => {
    const label = Object.values(formData).filter(v => v).join(" ").substring(0, 40);
    const newItem: QRHistoryItem = {
      id: Date.now().toString(),
      type: inputType,
      content: data,
      label: label || "QR Code",
      qrCodeUrl: url,
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(updated);
    localStorage.setItem(QR_HISTORY_KEY, JSON.stringify(updated));
  };

  const downloadQR = () => {
    if (qrCodeUrl && canvasRef.current) {
      const link = document.createElement("a");
      link.download = `qr-code-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      toast({ title: "Downloaded!", description: "QR code saved" });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
        toast({ title: "Logo Added", description: "Embedded in QR code" });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(QR_HISTORY_KEY);
    toast({ title: "Cleared", description: "History removed" });
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(QR_HISTORY_KEY, JSON.stringify(updated));
  };

  const relatedTools = getRelatedTools("qr-maker");

  const faqItems: FAQItem[] = [
    {
      question: "How do I create a QR code for free?",
      answer: "Creating a QR code is completely free with Pixocraft Tools. Simply choose your QR type (URL, Text, Email, vCard, or other), enter your information, and the code generates instantly. Customize with colors and frames, then download as PNG. No signup, no email, no fees—unlimited QR codes at no cost.",
    },
    {
      question: "Does this QR code generator work offline?",
      answer: "Yes! Once the page loads, the QR generator works completely offline. All processing happens in your browser without needing the internet. Generate unlimited QR codes anywhere—perfect for secure environments, travel, or low-bandwidth situations.",
    },
    {
      question: "Where is my QR code data stored?",
      answer: "Your data never leaves your device. Everything processes locally in your browser. QR codes are saved to your browser's local storage for convenience, and you're in full control—clear history anytime.",
    },
    {
      question: "Can I customize QR codes with colors and frames?",
      answer: "Yes! Customize dark and light colors, add 5+ frame styles (outline, text frames, banners), and upload your logo. All customization happens instantly with live preview.",
    },
    {
      question: "What are the 10+ QR code types?",
      answer: "URL (websites), vCard (contact info), Email, SMS, WiFi (network login), Bitcoin, Twitter profile, Facebook profile, plain Text, and App Store links. Each auto-formats the data correctly.",
    },
    {
      question: "Do QR codes expire?",
      answer: "QR codes generated here never expire. They're static codes containing permanent information. They work forever as long as the destination (like a website) remains active.",
    },
    {
      question: "Can I add a logo to my QR code?",
      answer: "Yes! Upload any image file. It will be embedded in the center of your QR code with a white background for maximum scannability.",
    },
    {
      question: "Are QR codes secure?",
      answer: "QR codes themselves are secure—they're just visual data encoding. Always scan from trusted sources, and scan codes will show a preview before opening. Our tool processes everything locally with zero tracking.",
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const softwareAppSchema = generateSoftwareApplicationSchema({
    name: "Free QR Code Generator",
    description: "Generate professional QR codes with 10+ types, custom colors, frames, and logo support. Works offline, instant PNG download.",
    url: "https://tools.pixocraft.in/tools/qr-maker",
    applicationCategory: "UtilityApplication",
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareAppSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <span>QR Code Generator</span>
          </div>

          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Free QR Code Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create professional QR codes with 10+ data types, custom colors, frame styles, and logo support. Works offline, no limits, no signup.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge>10+ QR Types</Badge>
              <Badge>Custom Colors</Badge>
              <Badge>Frame Styles</Badge>
              <Badge>Logo Support</Badge>
              <Badge>Works Offline</Badge>
            </div>
          </div>

          {/* Main Tool */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 space-y-6">
              {/* Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Select QR Type</CardTitle>
                  <CardDescription>Choose what to encode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {QR_TYPES.map(type => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setInputType(type.id)}
                          className={`p-3 rounded-lg border-2 text-center transition-all hover-elevate ${
                            inputType === type.id ? "border-primary bg-primary/5" : "border-muted"
                          }`}
                          data-testid={`btn-type-${type.id}`}
                        >
                          <Icon className="h-5 w-5 mx-auto mb-1" />
                          <p className="text-xs font-medium">{type.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Data Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Enter Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inputType === "url" && (
                    <div>
                      <Label>Website URL</Label>
                      <Input
                        placeholder="https://example.com"
                        value={formData.url}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "text" && (
                    <div>
                      <Label>Text</Label>
                      <Textarea
                        placeholder="Any text..."
                        value={formData.text}
                        onChange={(e) => handleInputChange("text", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "email" && (
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "sms" && (
                    <>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          placeholder="+1234567890"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Message</Label>
                        <Textarea
                          placeholder="Text message..."
                          value={formData.smsText}
                          onChange={(e) => handleInputChange("smsText", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {inputType === "wifi" && (
                    <>
                      <div>
                        <Label>Network Name</Label>
                        <Input
                          placeholder="WiFi SSID"
                          value={formData.wifiSsid}
                          onChange={(e) => handleInputChange("wifiSsid", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          placeholder="WiFi password"
                          value={formData.wifiPassword}
                          onChange={(e) => handleInputChange("wifiPassword", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Security</Label>
                        <select
                          className="w-full px-3 py-2 border rounded-md"
                          value={formData.wifiSecurity}
                          onChange={(e) => handleInputChange("wifiSecurity", e.target.value)}
                        >
                          <option>WPA</option>
                          <option>WEP</option>
                          <option>Open</option>
                        </select>
                      </div>
                    </>
                  )}
                  {inputType === "bitcoin" && (
                    <div>
                      <Label>Bitcoin Address</Label>
                      <Input
                        placeholder="1A1z7agoat..."
                        value={formData.bitcoinAddress}
                        onChange={(e) => handleInputChange("bitcoinAddress", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "twitter" && (
                    <div>
                      <Label>Twitter Handle</Label>
                      <Input
                        placeholder="username"
                        value={formData.twitter}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "facebook" && (
                    <div>
                      <Label>Facebook Profile</Label>
                      <Input
                        placeholder="username"
                        value={formData.facebook}
                        onChange={(e) => handleInputChange("facebook", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "vcard" && (
                    <>
                      <div>
                        <Label>Name</Label>
                        <Input
                          placeholder="John Doe"
                          value={formData.vcardName}
                          onChange={(e) => handleInputChange("vcardName", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          placeholder="+1 234 567 8900"
                          value={formData.vcardPhone}
                          onChange={(e) => handleInputChange("vcardPhone", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.vcardEmail}
                          onChange={(e) => handleInputChange("vcardEmail", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {inputType === "app" && (
                    <div>
                      <Label>App Store URL</Label>
                      <Input
                        placeholder="https://..."
                        value={formData.appUrl}
                        onChange={(e) => handleInputChange("appUrl", e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customization */}
              <Card>
                <CardHeader>
                  <CardTitle>Customize Design</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Dark Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="h-10 w-14 rounded cursor-pointer"
                        />
                        <Input value={darkColor} onChange={(e) => setDarkColor(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Label>Light Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="h-10 w-14 rounded cursor-pointer"
                        />
                        <Input value={lightColor} onChange={(e) => setLightColor(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Frame Style</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {FRAME_STYLES.map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setFrameStyle(frame.id)}
                          className={`p-2 rounded border-2 text-xs text-center transition-all ${
                            frameStyle === frame.id ? "border-primary bg-primary/5" : "border-muted"
                          }`}
                          title={frame.preview}
                        >
                          <p className="font-medium">{frame.label}</p>
                          <p className="text-xs text-muted-foreground">{frame.preview}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Add Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      data-testid="input-logo"
                    />
                    {logoImage && (
                      <div className="mt-2 flex items-center gap-2">
                        <img src={logoImage} alt="Logo" className="h-12 w-12 rounded border" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setLogoImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button onClick={generateQR} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            </div>

            {/* Preview */}
            <Card className="sticky top-4 h-fit">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>Updates as you type</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <div className="p-6 bg-white rounded-lg w-full flex items-center justify-center min-h-[320px]">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full"
                    data-testid="canvas-qr"
                  />
                </div>
                {qrCodeUrl && (
                  <Button onClick={downloadQR} className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                )}
                <div className="text-xs text-muted-foreground text-center flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Generated locally in your browser
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          {history.length > 0 && (
            <Card className="mb-16">
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
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
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
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">10+ QR Code Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <LinkIcon className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>URL / Website</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Link to any website, landing page, or online resource. Perfect for marketing, social media, and campaigns.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <User className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>vCard / Contact</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Share contact info instantly. Recipients save your details directly to their phone with one scan.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <FileText className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Text / Message</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Encode any text message up to 500 characters. Great for instructions, codes, or event details.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Mail className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Email Address</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Scanning sends users directly to their email client ready to compose to you.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <MessageSquare className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>SMS / Text Message</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Pre-fill phone number and message text. Perfect for promotions and customer engagement.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Wifi className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>WiFi Network</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Share WiFi credentials instantly. Guests connect with one scan—no typing required.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Bitcoin className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Bitcoin Address</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Share crypto wallet addresses securely. Perfect for payments and fundraising.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Share2 className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Direct links to Twitter, Facebook, and other social profiles for easy following.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Store className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>App Store Links</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Link to app downloads on Google Play, Apple App Store, or other app marketplaces.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business & Networking</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Add vCard QR codes to business cards, email signatures, and LinkedIn profiles. Enable professionals to save your contact info instantly.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Restaurants & Events</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Digital menus, contactless payments, event registration, and ticketing. Enhance customer experience with instant QR access.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Marketing & Campaigns</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Drive engagement on posters, flyers, and product packaging. Track campaigns and measure ROI with scannable links.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
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

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our QR Generator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Zap className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Instant & Free</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Generate unlimited QR codes instantly. No signup, no email, no hidden fees—completely free forever.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>100% Private</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  All processing happens in your browser. Your data never touches any server—complete privacy guaranteed.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <WifiOff className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Works Offline</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Load once, then generate QR codes anytime without internet. Perfect for secure or remote environments.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Palette className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Full Customization</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Custom colors, frame styles, and logo embedding. Make your QR codes match your brand perfectly.
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center">Other Useful Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map(tool => (
                  <Link key={tool.id} href={`/tools/${tool.id}`}>
                    <Card className="hover-elevate cursor-pointer h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-2xl">{tool.icon}</span>
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        {tool.description}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
