import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { FileDown, Upload, Download, FileText, ArrowRight, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { compressPDF, formatFileSize, getPDFInfo, type CompressionLevel } from "@/lib/pdf-utils";

export default function PDFCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [originalInfo, setOriginalInfo] = useState<{ pageCount: number; fileSize: string } | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('standard');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free PDF Compressor Online - Reduce PDF File Size | Pixocraft Tools",
    description: "Compress PDF files online for free. Reduce PDF size by up to 90% while maintaining quality. Fast, secure, and works completely offline in your browser. No file upload required.",
    keywords: "pdf compressor, reduce pdf size, compress pdf online free, pdf optimizer, shrink pdf file, pdf size reducer, compress pdf without losing quality",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-compressor",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid File",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }

      setOriginalFile(file);
      setCompressedFile(null);
      
      getPDFInfo(file).then(info => setOriginalInfo(info));
    }
  };

  const compressPDFFile = async () => {
    if (!originalFile) return;

    setLoading(true);
    try {
      const compressed = await compressPDF(originalFile, { 
        level: compressionLevel,
        removeMetadata: compressionLevel === 'maximum' // Only remove metadata in maximum mode
      });
      
      const reductionPercent = Math.round((1 - compressed.size / originalFile.size) * 100);
      
      setCompressedFile(compressed);

      toast({
        title: "Success!",
        description: `PDF compressed successfully. Reduced by ${reductionPercent}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to compress PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadCompressed = () => {
    if (compressedFile) {
      const url = URL.createObjectURL(compressedFile);
      const link = document.createElement("a");
      link.download = `compressed-${originalFile?.name || "document.pdf"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Downloaded!",
        description: "Compressed PDF saved to your downloads",
      });
    }
  };

  const resetTool = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const relatedTools = getRelatedTools("pdf-compressor");

  const faqItems: FAQItem[] = [
    {
      question: "How does PDF compression work?",
      answer: "PDF compression reduces file size by removing unnecessary metadata, optimizing images, and restructuring the document data. Our tool uses advanced algorithms to compress PDFs while maintaining visual quality and text clarity. All processing happens in your browser, ensuring your documents remain private and secure."
    },
    {
      question: "Will compressing reduce PDF quality?",
      answer: "Our PDF compressor is designed to maintain document quality while reducing file size. Text remains crisp and clear, and images are optimized without significant visible quality loss. For most business documents, presentations, and reports, you won't notice any difference in quality after compression."
    },
    {
      question: "Is there a file size limit for PDF compression?",
      answer: "The limit depends on your browser's available memory. Most modern browsers can handle PDFs up to several hundred megabytes. Very large files may take longer to process. For best performance, we recommend files under 50MB."
    },
    {
      question: "Is my PDF data safe and private?",
      answer: "Absolutely! All PDF compression happens entirely in your browser using JavaScript. Your files are never uploaded to our servers or transmitted over the internet. Once you close or refresh the page, everything is completely gone from memory. This makes our tool perfect for compressing confidential documents."
    },
    {
      question: "What's the typical compression ratio?",
      answer: "Compression results vary depending on the original PDF content. Documents with high-resolution images can often be reduced by 60-90%, while text-heavy documents may see 20-40% reduction. PDFs that are already optimized may see minimal size reduction."
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
            <span className="text-foreground">PDF Compressor</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileDown className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF Compressor</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reduce PDF file size instantly. Compress PDFs while maintaining quality, completely free and offline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Secure</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {!originalFile ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>
                    Select a PDF file to compress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload a PDF</p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF files up to 50MB
                    </p>
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
                        <CardTitle>Compress PDF</CardTitle>
                        <CardDescription>
                          {originalFile.name}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetTool}
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {originalInfo && (
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Pages:</span> {originalInfo.pageCount}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {originalInfo.fileSize}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Compression Mode</Label>
                        <Select 
                          value={compressionLevel} 
                          onValueChange={(v: CompressionLevel) => setCompressionLevel(v)}
                        >
                          <SelectTrigger data-testid="select-compression-level">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (Recommended)</SelectItem>
                            <SelectItem value="maximum">Maximum (Remove All Metadata)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          {compressionLevel === 'standard' && 'Optimizes PDF structure while preserving document metadata. Works for most files.'}
                          {compressionLevel === 'maximum' && 'Removes all metadata and timestamps for maximum file size reduction.'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={compressPDFFile}
                          disabled={loading}
                          className="flex-1"
                          size="lg"
                          data-testid="button-compress"
                        >
                        {loading ? (
                          <>
                            <FileDown className="mr-2 h-4 w-4 animate-pulse" />
                            Compressing...
                          </>
                        ) : (
                          <>
                            <FileDown className="mr-2 h-4 w-4" />
                            Compress PDF
                          </>
                        )}
                      </Button>
                      {compressedFile && (
                        <Button
                          onClick={downloadCompressed}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                          data-testid="button-download"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download ({formatFileSize(compressedFile.size)})
                        </Button>
                      )}
                      </div>
                    </div>

                    {compressedFile && (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          Compressed by {Math.round((1 - compressedFile.size / originalFile.size) * 100)}%
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                          Original: {formatFileSize(originalFile.size)} → Compressed: {formatFileSize(compressedFile.size)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Compress PDFs?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Faster Email Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most email providers have attachment size limits (typically 25MB for Gmail). Compress large PDFs to easily share them via email without hitting size restrictions or slowing down sending/receiving times.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Save Storage Space</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Compressed PDFs take up significantly less space on your hard drive, cloud storage, or servers. This is especially valuable for businesses and individuals managing large document archives or backups.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Faster Website Loading</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you host PDFs on your website (product catalogs, whitepapers, manuals), compressed files load faster for visitors, improving user experience and reducing bandwidth costs. This also helps with SEO rankings.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>100% Private & Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unlike online PDF compressors that upload your files to servers, our tool processes everything locally in your browser. Your confidential documents, contracts, and sensitive information never leave your device.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {relatedTools.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.slice(0, 3).map(tool => {
                  const Icon = getToolIcon(tool.icon);
                  return (
                    <Link key={tool.id} href={tool.path}>
                      <Card className="hover-elevate transition-all cursor-pointer h-full">
                        <CardHeader>
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Button variant="ghost" className="w-full">
                            Try it now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
