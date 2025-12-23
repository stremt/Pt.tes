import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Image as ImageIcon, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getRelatedTools, getToolIcon } from "@/lib/tools";

export default function JPGtoPNG() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free JPG to PNG Converter - Convert JPEG Online & Offline",
    description: "Convert JPG to PNG online for free with transparent backgrounds. Works offline, no uploads, no watermarks. Instant conversion in your browser.",
    keywords: "jpg to png converter, convert jpg to png free, jpeg to png, convert jpg to png online, jpg to png converter online, image format converter, convert jpeg to png, transparent png, png converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/jpg-to-png",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.match(/image\/(jpeg|jpg)/)) {
      toast({ title: "Invalid File", description: "Please select a JPG file", variant: "destructive" });
      return;
    }

    setFile(selectedFile);
    setConvertedBlob(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const convertToPNG = () => {
    if (!file || !preview) return;
    setConverting(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedBlob(blob);
            toast({ title: "Success!", description: "JPG converted to PNG successfully" });
          }
          setConverting(false);
        }, 'image/png');
      }
    };
    img.src = preview;
  };

  const downloadPNG = () => {
    if (convertedBlob) {
      const url = URL.createObjectURL(convertedBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.(jpg|jpeg)$/i, '.png') || "converted.png";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is this JPG to PNG converter completely free?",
      answer: "Yes, 100% free with no hidden charges, no login required, no watermarks, and unlimited conversions. Use it as many times as you want at no cost."
    },
    {
      question: "What's the difference between JPG and PNG formats?",
      answer: "JPG uses lossy compression (smaller files, slight quality loss). PNG uses lossless compression (larger files, no quality loss, supports transparency). PNG is better for graphics, logos, and designs."
    },
    {
      question: "Does converting JPG to PNG improve image quality?",
      answer: "No. JPG already applied compression, so converting to PNG won't restore lost details. However, PNG is ideal if you need transparency or plan to edit the image further."
    },
    {
      question: "When should I convert images from JPG to PNG?",
      answer: "Convert to PNG when you need: transparent backgrounds, graphics/logos with clean edges, lossless quality for editing, professional design work, or web graphics. Keep JPG for photos."
    },
    {
      question: "Will the file size be larger as PNG?",
      answer: "Yes, PNG files are typically 2-3x larger than JPG because PNG uses lossless compression. This is normal and necessary for transparency support and quality preservation."
    },
    {
      question: "Are my images completely secure and private?",
      answer: "Completely safe. All conversion happens offline in your browser. Your images never leave your device, ensuring 100% privacy with no server uploads."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes! After the page loads once, the converter works completely offline. All processing happens in your browser with no internet connection needed after initial load."
    },
    {
      question: "Can PNG support transparency like GIF?",
      answer: "Yes, PNG supports full transparency including partial transparency (alpha channel). This makes PNG perfect for logos, icons, and graphics with transparent backgrounds."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const relatedTools = getRelatedTools("jpg-to-png");

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Image Tools", url: "/tools/image" }, { label: "JPGtoPNG" }]} />
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / JPG to PNG
          </div>
          
          <div className="text-center space-y-3 mb-8 md:mb-12">
            <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <ImageIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h1 className="text-2xl md:text-5xl font-bold">Free JPG to PNG Converter - Convert Images Online, Works Offline</h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">Convert JPG to PNG instantly with transparent backgrounds. 100% offline, no uploads, no watermarks. Works on all devices.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge>Free</Badge>
              <Badge>Offline</Badge>
              <Badge>No Login</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload JPG File</CardTitle></CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-6 md:p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-muted-foreground" />
                    <p className="font-medium mb-1 md:mb-2 text-sm md:text-base">Click to upload JPG file</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Only JPEG/JPG files supported</p>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg" onChange={handleFileSelect} className="hidden" data-testid="input-file-jpg-to-png" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-sm md:text-base">{file.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setConvertedBlob(null); setPreview(""); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {preview && <img src={preview} alt="Preview" className="w-full rounded-lg max-h-96 object-contain" />}
                  <div className="flex flex-col md:flex-row gap-2">
                    <Button onClick={convertToPNG} disabled={converting} className="flex-1 text-sm md:text-base">
                      {converting ? "Converting..." : "Convert to PNG"}
                    </Button>
                    {convertedBlob && (
                      <Button onClick={downloadPNG} variant="outline" className="flex-1 text-sm md:text-base">
                        <Download className="mr-2 h-4 w-4" />Download PNG
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="max-w-4xl mx-auto mb-12 md:mb-16">
            <Card>
              <CardContent className="pt-8 space-y-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">What is a JPG to PNG Converter?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A JPG to PNG converter is a tool that instantly changes image files from JPEG format to PNG format. JPG and PNG are both image formats, but they work differently. JPG is optimized for photographs and uses compression that makes files smaller, while PNG is better for graphics, logos, and images that need transparent backgrounds. This converter makes the switch easy—just upload your JPG file and download the PNG version in seconds.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The best part? Everything happens in your browser. No files go to any server, no internet connection needed after the page loads, and complete privacy for your images.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Who Should Use This Tool?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    This JPG to PNG converter is perfect for:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-muted-foreground"><strong>Graphic Designers:</strong> Convert product images, logos, and design assets to PNG for transparency and editing.</li>
                    <li className="text-muted-foreground"><strong>Web Developers:</strong> Prepare images for websites, apps, and digital projects requiring transparency.</li>
                    <li className="text-muted-foreground"><strong>Small Business Owners:</strong> Convert product photos to PNG for websites, social media, or e-commerce platforms.</li>
                    <li className="text-muted-foreground"><strong>Content Creators:</strong> Convert images for YouTube, Instagram, blogs, and digital marketing materials.</li>
                    <li className="text-muted-foreground"><strong>Anyone Needing Transparency:</strong> Add transparent backgrounds to images for various creative projects.</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Common Use Cases</h2>
                  <div className="space-y-3 ml-4">
                    <p className="text-muted-foreground"><strong>Logo & Icon Conversion:</strong> Convert company logos from JPG to PNG to add transparent backgrounds for web use.</p>
                    <p className="text-muted-foreground"><strong>Design Projects:</strong> Convert images for layering in graphics editors like Photoshop or GIMP with transparency support.</p>
                    <p className="text-muted-foreground"><strong>E-Commerce Product Images:</strong> Convert product photos to PNG for transparent backgrounds on online stores.</p>
                    <p className="text-muted-foreground"><strong>Web & App Development:</strong> Prepare images with transparency for responsive websites and mobile apps.</p>
                    <p className="text-muted-foreground"><strong>Print & Marketing Materials:</strong> Convert digital images to PNG for transparent backgrounds in print design software.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Privacy & Offline Safety</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Your privacy is guaranteed with this converter:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-muted-foreground">✓ Images never leave your device or reach any server</li>
                    <li className="text-muted-foreground">✓ No accounts, logins, or registrations required</li>
                    <li className="text-muted-foreground">✓ Works 100% offline after the initial page load</li>
                    <li className="text-muted-foreground">✓ No tracking, ads, or data collection</li>
                    <li className="text-muted-foreground">✓ Safe for confidential or sensitive images</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    All image conversion happens on your computer using your browser. This means complete privacy, fast processing, and the ability to work offline anytime.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {relatedTools.length > 0 && (
            <div className="max-w-4xl mx-auto mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Related Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {relatedTools.map((tool) => {
                  const Icon = getToolIcon(tool.icon);
                  return (
                    <Link key={tool.id} href={tool.path}>
                      <Card className="hover-elevate cursor-pointer h-full">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-sm leading-tight">{tool.name}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {tool.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-sm md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
