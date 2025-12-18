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
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { QrCode, Download, Link as LinkIcon, FileText, User, ArrowRight, Smartphone, Shield, History, Trash2, Clock, CheckCircle, Globe, CreditCard, Building2, CalendarDays, WifiOff, Lock, HardDrive, Zap, Mail, MessageSquare, Wifi, Bitcoin, Share2, Music, Store, Image as ImageIcon, Palette, Frame as FrameIcon, UploadCloud } from "lucide-react";
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
  { id: "url", label: "URL", icon: LinkIcon, description: "Website link" },
  { id: "vcard", label: "vCard", icon: User, description: "Contact info" },
  { id: "text", label: "Text", icon: FileText, description: "Plain text" },
  { id: "email", label: "E-mail", icon: Mail, description: "Email address" },
  { id: "sms", label: "SMS", icon: MessageSquare, description: "Text message" },
  { id: "wifi", label: "WiFi", icon: Wifi, description: "Network login" },
  { id: "bitcoin", label: "Bitcoin", icon: Bitcoin, description: "BTC address" },
  { id: "twitter", label: "Twitter", icon: Share2, description: "Twitter profile" },
  { id: "facebook", label: "Facebook", icon: Share2, description: "Facebook profile" },
  { id: "app", label: "App Stores", icon: Store, description: "App download" },
];

const FRAME_STYLES = [
  { id: "none", label: "No Frame", description: "Classic QR code" },
  { id: "scan-top", label: "Scan Me Top", description: "Scan me text at top" },
  { id: "scan-bottom", label: "Scan Me Bottom", description: "Scan me text at bottom" },
  { id: "play-button", label: "Play Button", description: "Video play icon" },
  { id: "envelope", label: "Envelope Frame", description: "Envelope style frame" },
  { id: "arrow", label: "Arrow Frame", description: "Arrow pointing to QR" },
  { id: "outline", label: "Black Outline", description: "Bold outline frame" },
  { id: "shopping-bag", label: "Shopping Bag", description: "Shopping bag frame" },
  { id: "banner", label: "Banner Frame", description: "Banner at bottom" },
];

export default function QRMaker() {
  const [inputType, setInputType] = useState("url");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [history, setHistory] = useState<QRHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isDarkColor, setIsDarkColor] = useState(true);
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [darkColor, setDarkColor] = useState("#000000");
  const [frameStyle, setFrameStyle] = useState("none");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
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

  useSEO({
    title: "Free QR Code Generator - Create Custom QR Codes | Pixocraft",
    description: "Create professional QR codes free with customization. Generate QR codes for URLs, vCard, Email, SMS, WiFi, Bitcoin, and more. Add frames, logos, custom colors. Instant download.",
    keywords: "qr code generator, free qr code maker, create qr code, qr code customizer, vcard qr code, wifi qr code, custom qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-maker",
    ogImage: OG_IMAGES.qrMaker,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
        setLogoFile(file);
        toast({
          title: "Logo Uploaded",
          description: "Logo added to your QR code design",
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const generateQRData = (): string => {
    const data = formData;
    
    switch (inputType) {
      case "url":
        return data.url || "";
      case "text":
        return data.text || "";
      case "email":
        return `mailto:${data.email || ""}`;
      case "sms":
        return `smsto:${data.phone || ""}:${data.smsText || ""}`;
      case "wifi":
        return `WIFI:T:${data.wifiSecurity || "WPA"};S:${data.wifiSsid || ""};P:${data.wifiPassword || ""};;`;
      case "bitcoin":
        return `bitcoin:${data.bitcoinAddress || ""}`;
      case "twitter":
        return `https://twitter.com/${data.twitter || ""}`;
      case "facebook":
        return `https://facebook.com/${data.facebook || ""}`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${data.vcardName || ""}\nTEL:${data.vcardPhone || ""}\nEMAIL:${data.vcardEmail || ""}\nEND:VCARD`;
      case "app":
        return data.appUrl || "";
      default:
        return "";
    }
  };

  const drawFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const frameSize = 40;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#FFFFFF";

    if (frameStyle === "scan-top" || frameStyle === "scan-bottom") {
      ctx.font = "bold 14px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      if (frameStyle === "scan-top") {
        ctx.fillText("SCAN ME", width / 2, 20);
      } else {
        ctx.fillText("SCAN ME", width / 2, height - 10);
      }
    } else if (frameStyle === "outline") {
      ctx.strokeRect(5, 5, width - 10, height - 10);
      ctx.strokeRect(10, 10, width - 20, height - 20);
    } else if (frameStyle === "arrow") {
      ctx.font = "30px Arial";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText("↓", width / 2, height - 15);
      ctx.font = "bold 12px Arial";
      ctx.fillText("SCAN ME", width / 2, height - 35);
    }
  };

  const generateQR = async () => {
    const qrData = generateQRData();

    if (!qrData.trim()) {
      toast({
        title: "Missing Data",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        await QRCodeLib.toCanvas(canvas, qrData, {
          width: 400,
          margin: 2,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        });

        const ctx = canvas.getContext("2d");
        if (ctx && frameStyle !== "none") {
          drawFrame(ctx, canvas.width, canvas.height);
        }

        if (logoImage && ctx) {
          const img = new Image();
          img.onload = () => {
            const logoSize = 60;
            const x = (canvas.width - logoSize) / 2;
            const y = (canvas.height - logoSize) / 2;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
            ctx.drawImage(img, x, y, logoSize, logoSize);
            const url = canvas.toDataURL();
            setQrCodeUrl(url);
            saveToHistory(qrData, url);
          };
          img.src = logoImage;
        } else {
          const url = canvas.toDataURL();
          setQrCodeUrl(url);
          saveToHistory(qrData, url);
        }

        toast({
          title: "QR Code Generated!",
          description: "Your QR code is ready to download",
        });
      }
    } catch (error) {
      console.error("QR generation error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate QR code",
        variant: "destructive",
      });
    }
  };

  const saveToHistory = (data: string, url: string) => {
    const label = Object.values(formData).join(" ").substring(0, 50);
    const newItem: QRHistoryItem = {
      id: Date.now().toString(),
      type: inputType,
      content: data,
      label,
      qrCodeUrl: url,
      createdAt: new Date().toISOString(),
    };

    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    setHistory(updatedHistory);
    localStorage.setItem(QR_HISTORY_KEY, JSON.stringify(updatedHistory));
  };

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a");
      link.download = `pixocraft-qr-${Date.now()}.png`;
      link.href = qrCodeUrl;
      link.click();

      toast({
        title: "Downloaded!",
        description: "QR code saved to your downloads",
      });
    }
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem(QR_HISTORY_KEY);
    toast({
      title: "History Cleared",
      description: "All QR codes removed",
    });
  };

  const deleteHistoryItem = (id: string) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem(QR_HISTORY_KEY, JSON.stringify(updated));
  };

  const getTypeIcon = (typeId: string) => {
    const type = QR_TYPES.find(t => t.id === typeId);
    return type?.icon || FileText;
  };

  return (
    <>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            {" / "}
            <span className="text-foreground">QR Code Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Professional QR Code Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create custom QR codes with 10+ data types, frames, colors, and logos. Download instantly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">10+ QR Types</Badge>
              <Badge variant="secondary">Custom Colors</Badge>
              <Badge variant="secondary">Frame Styles</Badge>
              <Badge variant="secondary">Logo Support</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
            <div className="lg:col-span-2 space-y-6">
              {/* QR Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5" />
                    Select QR Code Type
                  </CardTitle>
                  <CardDescription>Choose what data to encode</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {QR_TYPES.map(type => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => { setInputType(type.id); setFormData({}); }}
                          className={`p-3 rounded-lg border-2 text-center transition-all hover-elevate ${
                            inputType === type.id 
                              ? "border-primary bg-primary/5" 
                              : "border-muted"
                          }`}
                          data-testid={`button-type-${type.id}`}
                        >
                          <Icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                          <p className="text-xs font-medium">{type.label}</p>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Data Input */}
              <Card>
                <CardHeader>
                  <CardTitle>Enter Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {inputType === "url" && (
                    <div className="space-y-2">
                      <Label>Website URL</Label>
                      <Input
                        placeholder="https://example.com"
                        value={formData.url || ""}
                        onChange={(e) => handleInputChange("url", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "text" && (
                    <div className="space-y-2">
                      <Label>Text Content</Label>
                      <Textarea
                        placeholder="Enter any text..."
                        value={formData.text || ""}
                        onChange={(e) => handleInputChange("text", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "email" && (
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        value={formData.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "sms" && (
                    <>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input
                          placeholder="+1234567890"
                          value={formData.phone || ""}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>SMS Message</Label>
                        <Textarea
                          placeholder="Message text..."
                          value={formData.smsText || ""}
                          onChange={(e) => handleInputChange("smsText", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {inputType === "wifi" && (
                    <>
                      <div className="space-y-2">
                        <Label>Network Name (SSID)</Label>
                        <Input
                          placeholder="WiFi name"
                          value={formData.wifiSsid || ""}
                          onChange={(e) => handleInputChange("wifiSsid", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input
                          type="password"
                          placeholder="WiFi password"
                          value={formData.wifiPassword || ""}
                          onChange={(e) => handleInputChange("wifiPassword", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
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
                  {inputType === "bitcoin" && (
                    <div className="space-y-2">
                      <Label>Bitcoin Address</Label>
                      <Input
                        placeholder="1A1z7agoat..."
                        value={formData.bitcoinAddress || ""}
                        onChange={(e) => handleInputChange("bitcoinAddress", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "twitter" && (
                    <div className="space-y-2">
                      <Label>Twitter Handle</Label>
                      <Input
                        placeholder="username"
                        value={formData.twitter || ""}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "facebook" && (
                    <div className="space-y-2">
                      <Label>Facebook Profile</Label>
                      <Input
                        placeholder="username or profile URL"
                        value={formData.facebook || ""}
                        onChange={(e) => handleInputChange("facebook", e.target.value)}
                      />
                    </div>
                  )}
                  {inputType === "vcard" && (
                    <>
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input
                          placeholder="John Doe"
                          value={formData.vcardName || ""}
                          onChange={(e) => handleInputChange("vcardName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          placeholder="+1 234 567 8900"
                          value={formData.vcardPhone || ""}
                          onChange={(e) => handleInputChange("vcardPhone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.vcardEmail || ""}
                          onChange={(e) => handleInputChange("vcardEmail", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  {inputType === "app" && (
                    <div className="space-y-2">
                      <Label>App Store URL</Label>
                      <Input
                        placeholder="https://play.google.com/store/apps/..."
                        value={formData.appUrl || ""}
                        onChange={(e) => handleInputChange("appUrl", e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Customization */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Customize Design
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dark Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          className="h-10 w-16 rounded cursor-pointer"
                        />
                        <Input
                          value={darkColor}
                          onChange={(e) => setDarkColor(e.target.value)}
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Light Color</Label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          className="h-10 w-16 rounded cursor-pointer"
                        />
                        <Input
                          value={lightColor}
                          onChange={(e) => setLightColor(e.target.value)}
                          placeholder="#FFFFFF"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FrameIcon className="h-4 w-4" />
                      Frame Style
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {FRAME_STYLES.map(frame => (
                        <button
                          key={frame.id}
                          onClick={() => setFrameStyle(frame.id)}
                          className={`p-2 rounded border-2 text-xs text-center transition-all ${
                            frameStyle === frame.id
                              ? "border-primary bg-primary/5"
                              : "border-muted"
                          }`}
                        >
                          {frame.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" />
                      Add Logo
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="flex-1"
                      />
                      {logoImage && (
                        <Button
                          variant="outline"
                          onClick={() => { setLogoImage(null); setLogoFile(null); }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    {logoImage && (
                      <div className="mt-2">
                        <img src={logoImage} alt="Logo preview" className="h-16 w-16 rounded border" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button onClick={generateQR} className="w-full" size="lg">
                <QrCode className="mr-2 h-5 w-5" />
                Generate QR Code
              </Button>
            </div>

            {/* Preview */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <div className="p-4 bg-white rounded-lg w-full flex items-center justify-center min-h-[300px]">
                    {!qrCodeUrl ? (
                      <div className="text-center text-muted-foreground">
                        <QrCode className="h-20 w-20 mx-auto mb-3 opacity-20" />
                        <p className="font-medium">No QR code yet</p>
                        <p className="text-sm">Fill data and click generate</p>
                      </div>
                    ) : (
                      <canvas ref={canvasRef} className="max-w-full" />
                    )}
                  </div>
                  {qrCodeUrl && (
                    <Button onClick={downloadQR} className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download PNG
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* History */}
          {history.length > 0 && (
            <Card className="mb-16 max-w-7xl mx-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Recent QR Codes ({history.length})
                  </CardTitle>
                </div>
                <Button variant="outline" size="sm" onClick={clearAllHistory}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {history.map(item => (
                    <div key={item.id} className="group relative">
                      <div className="bg-white p-2 rounded-lg border hover-elevate">
                        <img src={item.qrCodeUrl} alt="QR" className="w-full" />
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => deleteHistoryItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
