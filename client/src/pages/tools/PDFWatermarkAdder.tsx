import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Droplets, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { addWatermarkToPDF, formatFileSize } from "@/lib/pdf-utils";

export default function PDFWatermarkAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkedFile, setWatermarkedFile] = useState<Blob | null>(null);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(50);
  const [position, setPosition] = useState<'center' | 'diagonal' | 'bottom' | 'top'>('diagonal');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "PDF Watermark Adder Online Free - Add Text Watermark to PDF | Pixocraft Tools",
    description: "Add custom watermarks to PDF files online for free. Protect your documents with text watermarks. Secure, fast, and works completely offline in your browser.",
    keywords: "add watermark to pdf, pdf watermark online, watermark pdf free, protect pdf, pdf security, add text to pdf, pdf watermarking tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-watermark-adder",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid File",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setWatermarkedFile(null);
    }
  };

  const addWatermark = async () => {
    if (!file || !watermarkText.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and enter watermark text",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await addWatermarkToPDF(file, {
        text: watermarkText,
        opacity: opacity / 100,
        fontSize,
        position,
      });

      setWatermarkedFile(result);
      toast({
        title: "Success!",
        description: "Watermark added to PDF successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add watermark",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadWatermarked = () => {
    if (watermarkedFile) {
      const url = URL.createObjectURL(watermarkedFile);
      const link = document.createElement("a");
      link.download = `watermarked-${file?.name || "document.pdf"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Why add watermarks to PDFs?",
      answer: "Watermarks help protect your intellectual property, mark documents as confidential, indicate ownership, prevent unauthorized distribution, and add professional branding to your PDFs. They're essential for legal documents, contracts, proposals, and any sensitive materials."
    },
    {
      question: "Can watermarks be removed from PDFs?",
      answer: "While watermarks can potentially be removed with specialized software, adding them still provides a layer of protection and clearly indicates document ownership. For maximum security, combine watermarks with password protection and encryption."
    },
    {
      question: "Is my PDF secure when adding watermarks?",
      answer: "Yes! All processing happens entirely in your browser. Your PDF never leaves your device, ensuring complete privacy. This is especially important for confidential documents, contracts, and sensitive business materials."
    },
    {
      question: "Can I customize the watermark appearance?",
      answer: "Absolutely! You can customize the watermark text, size, opacity, rotation angle, and position. This allows you to create subtle background watermarks or prominent protective marks based on your needs."
    },
    {
      question: "Will watermarks affect PDF quality?",
      answer: "No, watermarks are added as a layer on top of your existing PDF content without degrading the original document quality. Text remains crisp, images stay clear, and the file structure is preserved."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">PDF Watermark Adder</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF Watermark Adder</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Add custom text watermarks to your PDFs. Protect documents, mark as confidential, or add branding.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Customizable</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>Select a PDF file to add watermark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload a PDF</p>
                    <p className="text-sm text-muted-foreground">Add watermark to protect your document</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Watermark Settings</CardTitle>
                        <CardDescription>{file.name}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFile(null);
                          setWatermarkedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="watermark-text">Watermark Text</Label>
                      <Input
                        id="watermark-text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="Enter watermark text"
                        data-testid="input-watermark-text"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select value={position} onValueChange={(v: any) => setPosition(v)}>
                        <SelectTrigger data-testid="select-position">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diagonal">Diagonal (Center)</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Opacity</Label>
                        <span className="text-sm text-muted-foreground">{opacity}%</span>
                      </div>
                      <Slider
                        value={[opacity]}
                        onValueChange={(v) => setOpacity(v[0])}
                        min={10}
                        max={100}
                        step={5}
                        data-testid="slider-opacity"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Font Size</Label>
                        <span className="text-sm text-muted-foreground">{fontSize}pt</span>
                      </div>
                      <Slider
                        value={[fontSize]}
                        onValueChange={(v) => setFontSize(v[0])}
                        min={20}
                        max={100}
                        step={5}
                        data-testid="slider-fontsize"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={addWatermark}
                        disabled={loading || !watermarkText.trim()}
                        className="flex-1"
                        size="lg"
                        data-testid="button-add-watermark"
                      >
                        {loading ? "Adding Watermark..." : "Add Watermark"}
                      </Button>
                      {watermarkedFile && (
                        <Button
                          onClick={downloadWatermarked}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                          data-testid="button-download"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Watermark Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Confidential Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mark sensitive business documents, contracts, and internal reports as "CONFIDENTIAL" or "INTERNAL USE ONLY" to prevent unauthorized sharing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Copyright Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Add your company name or copyright notice to PDFs to establish ownership and discourage unauthorized use or distribution of your content.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Draft Versions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mark documents as "DRAFT", "PREVIEW", or "NOT FOR DISTRIBUTION" to clearly indicate the document status and prevent confusion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
