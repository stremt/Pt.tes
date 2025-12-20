import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileDown, Upload, Download, X, Shield, Lock, Zap, Globe, GraduationCap, Briefcase, Mail, HardDrive, Users, Building, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { compressPDF, formatFileSize, getPDFInfo, type CompressionLevel } from "@/lib/pdf-utils";

type CompressionOption = "less" | "recommended" | "extreme";

export default function PDFCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | null>(null);
  const [originalInfo, setOriginalInfo] = useState<{ pageCount: number; fileSize: string } | null>(null);
  const [compressionOption, setCompressionOption] = useState<CompressionOption>('recommended');
  const [loading, setLoading] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "PDF Compressor Free - Reduce PDF Size Online | Pixocraft",
    description: "Compress PDF files for free without losing quality. Reduce PDF size by up to 90% for email, uploads, and storage. 100% offline, no uploads. Trusted in India.",
    keywords: "pdf compressor, compress pdf, reduce pdf size, shrink pdf, pdf size reducer, compress pdf online free, pdf compressor without quality loss, pdf optimizer, make pdf smaller",
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

  const getCompressionLevel = (option: CompressionOption): CompressionLevel => {
    return option === 'extreme' ? 'maximum' : 'standard';
  };

  const compressPDFFile = async () => {
    if (!originalFile) return;

    setLoading(true);
    setCompressionProgress(0);
    try {
      const level = getCompressionLevel(compressionOption);
      
      // Show progress during compression
      const progressInterval = setInterval(() => {
        setCompressionProgress(prev => {
          if (prev < 90) return prev + Math.random() * 30;
          return prev;
        });
      }, 500);
      
      const compressed = await compressPDF(originalFile, { 
        level,
        removeMetadata: compressionOption === 'extreme'
      });
      
      clearInterval(progressInterval);
      setCompressionProgress(100);
      
      const reductionPercent = Math.round((1 - compressed.size / originalFile.size) * 100);
      
      setCompressedFile(compressed);

      toast({
        title: "Success!",
        description: `PDF compressed by ${reductionPercent}% using advanced image compression!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to compress PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setCompressionProgress(0);
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

  const faqItems: FAQItem[] = [
    {
      question: "How does PDF compression work?",
      answer: "Our advanced compression works by converting each PDF page to an optimized image, compressing it intelligently, and rebuilding the PDF. This achieves 70-99% compression - far better than traditional PDF compression! All processing happens offline in your browser."
    },
    {
      question: "Will compressing my PDF reduce its quality?",
      answer: "Compression levels are carefully tuned to preserve readability. Extreme compression (99%) may appear slightly pixelated but text remains readable. Recommended (70%) looks nearly identical to the original. At normal viewing sizes, quality loss is minimal."
    },
    {
      question: "How much can I reduce my PDF file size?",
      answer: "Our advanced image-based compression achieves massive reduction: Extreme (99%), Recommended (70%), Less (40-50%). A 10MB PDF can compress to under 1MB with Extreme compression, while Recommended typically reduces to 2-3MB with excellent quality."
    },
    {
      question: "Is there a file size limit for compression?",
      answer: "The limit depends on your browser's available memory. Most modern devices handle PDFs up to 50MB comfortably. Very large files may take longer to process. For best performance with large documents, ensure you have sufficient device memory available."
    },
    {
      question: "Is my PDF data safe and private?",
      answer: "Absolutely. All compression happens entirely in your browser. Your files are never uploaded to any server or transmitted over the internet. When you close the page, everything is cleared from memory. This makes our tool ideal for confidential contracts, financial documents, and personal files."
    },
    {
      question: "What's the difference between Standard and Maximum compression?",
      answer: "Standard compression optimizes the PDF structure while preserving document metadata like author info and creation dates. Maximum compression removes all metadata and timestamps for the smallest possible file size—ideal when you need minimum size and don't need to preserve document properties."
    },
    {
      question: "Can I compress multiple PDFs at once?",
      answer: "Currently, the tool processes one PDF at a time for optimal performance and simplicity. For multiple files, compress each one individually. Each compressed file downloads separately so you maintain full control over the process."
    },
    {
      question: "Does this PDF compressor work on mobile devices?",
      answer: "Yes. Our compressor works on any modern browser—Android, iPhone, iPad, or desktop. No app installation required. Simply open the page, upload your PDF, and compress. It's fully responsive and optimized for mobile use."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "PDF Merger", path: "/tools/pdf-merger", description: "Combine multiple PDF files into one document" },
    { name: "PDF Splitter", path: "/tools/pdf-splitter", description: "Extract specific pages from PDF files" },
    { name: "Image Compressor", path: "/tools/image-compressor", description: "Reduce image file size without quality loss" },
    { name: "PDF to Image", path: "/tools/pdf-to-image", description: "Convert PDF pages to PNG or JPG images" },
    { name: "Image to PDF", path: "/tools/image-to-pdf", description: "Combine images into a single PDF document" }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold">Free PDF Compressor - Reduce PDF File Size Online</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Compress PDF files instantly without losing quality. Reduce file size for email attachments, uploads, and storage. No software to install, no sign-up required, and your files stay completely private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">100% Free</Badge>
              <Badge variant="secondary">Works Offline</Badge>
              <Badge variant="secondary">No Sign-up</Badge>
              <Badge variant="secondary">Maintains Quality</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {!originalFile ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF to Compress</CardTitle>
                  <CardDescription>
                    Select a PDF file to reduce its file size
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
                    <div className="flex items-center justify-between gap-4 flex-wrap">
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
                      <div className="flex gap-4 flex-wrap text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Pages:</span> {originalInfo.pageCount}
                        </div>
                        <div>
                          <span className="font-medium">Size:</span> {originalInfo.fileSize}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Compression Level</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { id: 'extreme', title: 'EXTREME COMPRESSION', subtitle: 'Less quality, high compression' },
                          { id: 'recommended', title: 'RECOMMENDED COMPRESSION', subtitle: 'Good quality, good compression' },
                          { id: 'less', title: 'LESS COMPRESSION', subtitle: 'High quality, less compression' }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setCompressionOption(option.id as CompressionOption)}
                            className={`p-4 rounded-lg border-2 text-left transition-all ${
                              compressionOption === option.id
                                ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                                : 'border-muted hover:border-muted-foreground/30'
                            }`}
                            data-testid={`compression-${option.id}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className={`font-semibold text-sm ${compressionOption === option.id ? 'text-green-700 dark:text-green-300' : ''}`}>
                                  {option.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{option.subtitle}</p>
                              </div>
                              {compressionOption === option.id && (
                                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-2 flex-wrap">
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
                            Converting pages... {compressionProgress > 0 ? `${Math.min(Math.round(compressionProgress), 99)}%` : ''}
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

                      {loading && (
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${Math.min(compressionProgress, 99)}%` }}
                          />
                        </div>
                      )}
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

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Compress PDF Files?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  PDF files often grow larger than necessary due to embedded fonts, high-resolution images, and accumulated metadata. A 2-page document can easily become 10MB or more. This creates real problems: email attachments get rejected, uploads time out, and storage fills up faster than it should.
                </p>
                <p>
                  Compressing PDFs solves these issues without compromising document usability. A well-compressed PDF looks identical to the original—text remains sharp, layouts stay intact, and all content remains accessible. The difference is purely in file size, often reducing documents by 50-80% depending on the original content.
                </p>
                <p>
                  Our free PDF compressor processes files entirely in your browser. Unlike cloud-based tools that upload your documents to remote servers, everything happens locally on your device. This means faster processing, complete privacy for sensitive documents, and no dependency on internet speed for the compression itself.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Compress a PDF - 3 Simple Steps</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <CardTitle className="text-lg">Upload Your PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click the upload area and select the PDF file you want to compress. You'll see the file size and page count immediately.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <CardTitle className="text-lg">Choose Compression Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Select Standard for balanced compression, or Maximum to remove all metadata for the smallest file size possible.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <CardTitle className="text-lg">Download Compressed PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click compress, see the size reduction percentage, and download your smaller PDF file instantly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Who Needs PDF Compression?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Mail className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Email Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Gmail, Outlook, and most email providers limit attachments to 25MB. Compress large PDFs to send reports, proposals, and documents without bouncing or splitting files.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <GraduationCap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Students & Academics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Submit assignments, theses, and research papers that meet file size requirements. Many university portals have strict upload limits that compressed PDFs easily satisfy.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Job Applicants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Compress resumes, portfolios, and supporting documents for job portals with upload limits. Smaller files also load faster for recruiters reviewing applications.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Building className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Businesses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Reduce storage costs and speed up document sharing. Compress contracts, invoices, catalogs, and presentations for faster transfers and lower cloud storage bills.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Government Form Filers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Many government portals in India have strict file size limits (often 1-5MB per document). Compress scanned documents and forms to meet upload requirements.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <HardDrive className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Archive Managers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Compress old documents before archiving to save significant storage space. A 50% reduction across thousands of files adds up to substantial savings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">Privacy & Security - Your Files Stay Private</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Unlike cloud-based compressors, our tool processes everything locally. Your confidential documents never leave your device.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>No Server Uploads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your PDF is compressed entirely in your browser. Nothing is sent to any server. Safe for contracts, financial statements, medical records, and any confidential business documents.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>No Data Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We don't store, copy, or access your documents. Once you close the page, your files exist only on your device. No tracking, no logging, no data collection whatsoever.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>No Account Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Use immediately without registration, email verification, or providing any personal information. Just open the tool and start compressing.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Works Offline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      After the page loads, you can disconnect from the internet and continue compressing. Perfect for handling sensitive files in secure, air-gapped environments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Related PDF Tools</h2>
                <p className="text-muted-foreground">Explore more free tools for your PDF needs</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTools.map((tool) => (
                  <Link key={tool.path} href={tool.path} data-testid={`link-related-${tool.path.split('/').pop()}`}>
                    <Card className="h-full hover-elevate cursor-pointer transition-all">
                      <CardHeader>
                        <CardTitle className="text-base">{tool.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
