import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Upload, Download, Zap, Lock, FileImage, Users, Shield, Globe, GraduationCap, Briefcase, Presentation, Share2 } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { renderPDFToImages, downloadPageImage, downloadAllPageImages, type PDFPageImage } from "@/lib/pdf-rendering-utils";

export default function PDFToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [images, setImages] = useState<PDFPageImage[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "PDF to Image Converter Free - Convert PDF to PNG JPG | Pixocraft",
    description: "Convert PDF to PNG or JPG images for free. Export all pages as high-quality images. 100% offline, no uploads, works on any device. Trusted in India.",
    keywords: "pdf to image, pdf to png, pdf to jpg, convert pdf to image, pdf to picture, pdf page to image, extract images from pdf, pdf to image converter free, pdf to jpeg online",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-to-image",
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setImages([]);
    setProgress({ current: 0, total: 0 });
  };

  const convertToImages = async () => {
    if (!file) return;

    setConverting(true);
    setProgress({ current: 0, total: 0 });
    
    try {
      const renderedImages = await renderPDFToImages(
        file,
        { scale: 2, format: 'png' },
        (current, total) => {
          setProgress({ current, total });
        }
      );
      
      setImages(renderedImages);
      toast({
        title: "Success!",
        description: `Converted ${renderedImages.length} ${renderedImages.length === 1 ? 'page' : 'pages'} to images`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to convert PDF to images",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
      setProgress({ current: 0, total: 0 });
    }
  };

  const handleDownloadPage = (pageImage: PDFPageImage) => {
    const filename = `${file?.name.replace('.pdf', '')}_page_${pageImage.pageNumber}.png`;
    downloadPageImage(pageImage, filename);
    toast({
      title: "Downloaded!",
      description: `Page ${pageImage.pageNumber} saved`,
    });
  };

  const handleDownloadAll = () => {
    if (!file) return;
    const baseFilename = file.name.replace('.pdf', '');
    downloadAllPageImages(images, baseFilename);
    toast({
      title: "Downloading All Pages",
      description: `${images.length} ${images.length === 1 ? 'image' : 'images'} will be downloaded`,
    });
  };

  const faqItems = [
    {
      question: "How do I convert a PDF to images?",
      answer: "Simply upload your PDF file using the upload area. Click 'Convert to Images' and wait for processing. Each page of your PDF will be converted to a separate high-quality PNG image. You can then download individual pages or all images at once."
    },
    {
      question: "What image format are the pages converted to?",
      answer: "Pages are converted to PNG format by default. PNG provides lossless quality, meaning your images look exactly like the original PDF pages with no compression artifacts. PNG also supports transparency if your PDF has transparent elements."
    },
    {
      question: "Will the image quality be reduced during conversion?",
      answer: "No. Our converter renders PDF pages at 2x resolution, producing crisp, high-quality images suitable for printing, presentations, or digital use. The output maintains all text clarity, graphics quality, and color accuracy from the original PDF."
    },
    {
      question: "Does my PDF get uploaded to any server?",
      answer: "No. All conversion happens directly in your browser using your device's processing power. Your PDF never leaves your device, ensuring complete privacy for sensitive documents like contracts, ID proofs, or financial statements."
    },
    {
      question: "Can I convert a PDF with many pages?",
      answer: "Yes. The tool handles multi-page PDFs and converts each page to a separate image. A progress indicator shows conversion status. For very large PDFs (50+ pages), processing time depends on your device's capabilities."
    },
    {
      question: "Can I download all pages at once?",
      answer: "Yes. After conversion, you'll see a 'Download All' button that downloads every page image. You can also download individual pages by clicking the download button on each page preview."
    },
    {
      question: "Does this tool work on mobile phones?",
      answer: "Yes. Our PDF to image converter works on any modern browser—Android, iPhone, iPad, or desktop. No app installation needed. Just open the page and start converting."
    },
    {
      question: "Is this PDF to image converter free?",
      answer: "Yes, completely free with no hidden charges, no watermarks, and no sign-up required. Convert unlimited PDFs for personal or professional use."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "Image to PDF", path: "/tools/image-to-pdf", description: "Combine multiple images into one PDF document" },
    { name: "PDF Splitter", path: "/tools/pdf-splitter", description: "Extract specific pages from PDF files" },
    { name: "PDF Merger", path: "/tools/pdf-merger", description: "Combine multiple PDF files into one" },
    { name: "Image Compressor", path: "/tools/image-compressor", description: "Reduce image file size without quality loss" },
    { name: "PDF Rotator", path: "/tools/pdf-rotator", description: "Rotate PDF pages to correct orientation" }
  ];

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Image Tools", url: "/tools/image" }, { label: "PDFToImage" }]} />
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">PDF to Image</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Image className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Free PDF to Image Converter - Export PDF Pages as PNG</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Convert any PDF document to high-quality PNG images. Each page becomes a separate image file. No software needed, no uploads, complete privacy guaranteed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">100% Free</Badge>
              <Badge variant="secondary">Works Offline</Badge>
              <Badge variant="secondary">No Sign-up</Badge>
              <Badge variant="secondary">High Quality</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16 space-y-6">
            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Convert PDF to Images</CardTitle>
                  <CardDescription>
                    Upload a PDF to convert each page into high-quality PNG images
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload PDF file</p>
                    <p className="text-sm text-muted-foreground">
                      Each page will be converted to a separate PNG image
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
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <CardTitle>Convert PDF</CardTitle>
                        <CardDescription>{file.name}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFile(null);
                          setImages([]);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        data-testid="button-reset"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={convertToImages}
                        disabled={converting}
                        className="flex-1"
                        size="lg"
                        data-testid="button-convert"
                      >
                        {converting ? (
                          <>
                            <FileImage className="mr-2 h-4 w-4 animate-pulse" />
                            Converting {progress.current}/{progress.total}...
                          </>
                        ) : (
                          <>
                            <FileImage className="mr-2 h-4 w-4" />
                            Convert to Images
                          </>
                        )}
                      </Button>
                      {images.length > 0 && (
                        <Button
                          onClick={handleDownloadAll}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                          data-testid="button-download-all"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download All ({images.length})
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {images.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Converted Pages</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {images.map((pageImage) => (
                        <Card key={pageImage.pageNumber}>
                          <CardHeader>
                            <CardTitle className="text-base flex items-center justify-between gap-2 flex-wrap">
                              <span>Page {pageImage.pageNumber}</span>
                              <Button
                                size="sm"
                                onClick={() => handleDownloadPage(pageImage)}
                                data-testid={`button-download-page-${pageImage.pageNumber}`}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <img
                              src={pageImage.imageUrl}
                              alt={`Page ${pageImage.pageNumber}`}
                              className="w-full border rounded-lg"
                              data-testid={`img-page-${pageImage.pageNumber}`}
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Convert PDF to Images?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  PDF documents are excellent for preserving formatting, but they come with limitations. Many platforms don't support direct PDF uploads. Social media sites, messaging apps, and presentation tools often work better with images. When you need to share a specific page from a report or include a document page in a slide deck, images are the practical choice.
                </p>
                <p>
                  Converting PDF pages to images also makes content more accessible. Images load faster on web pages, work in email signatures, and can be easily inserted into Word documents, spreadsheets, or design projects. Teachers frequently convert PDF worksheets to images for online learning platforms that don't support PDF embedding.
                </p>
                <p>
                  Our free PDF to image converter handles all of this instantly in your browser. No software to install, no accounts to create, and most importantly—your documents never get uploaded to any server. Everything processes locally on your device, keeping your sensitive information completely private.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Convert PDF to Image - 3 Simple Steps</h2>
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
                      Click the upload area and select your PDF file. The tool accepts any standard PDF document.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <CardTitle className="text-lg">Convert Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click 'Convert to Images' and watch as each page is rendered into a high-quality PNG image with progress tracking.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <CardTitle className="text-lg">Download Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Preview converted pages and download individually or use 'Download All' to get every page at once.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Common Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Share2 className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Social Media Sharing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert PDF infographics, flyers, or announcements to images for sharing on Instagram, Facebook, LinkedIn, or WhatsApp where PDFs aren't supported.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Presentation className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Presentations & Slides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Insert PDF pages as images into PowerPoint, Google Slides, or Canva presentations. Perfect for including charts, tables, or document excerpts.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <GraduationCap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Education & E-Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Teachers convert PDF worksheets, textbook pages, and study materials to images for online learning platforms that don't support PDF embedding.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Business Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Extract specific pages from reports or contracts to share via email or messaging apps. Create quick previews of documents for stakeholders.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <FileImage className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Extract Graphics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Pull charts, diagrams, illustrations, and other graphics from PDF documents for use in other projects, websites, or marketing materials.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Portfolio Creation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert PDF portfolios, certificates, or design work to images for uploading to websites, job portals, or freelance platforms.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">Privacy & Security - Your PDFs Stay Private</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Unlike cloud-based converters, our tool processes everything locally. Your sensitive documents never leave your device.
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
                      Your PDF is processed entirely in your browser. Nothing is sent to any server. Safe for contracts, financial documents, ID proofs, medical records, and confidential business files.
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
                      We don't store, copy, or access your documents. Once you close the page, your files exist only on your device. No tracking, no logging, no data collection.
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
                      Use immediately without registration, email verification, or providing any personal information. Just open the tool and start converting.
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
                      After the page loads, you can disconnect from the internet and continue converting. Perfect for handling confidential documents in secure environments.
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
                <h2 className="text-2xl md:text-3xl font-bold">Related PDF & Image Tools</h2>
                <p className="text-muted-foreground">Explore more free tools for your PDF and image needs</p>
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

          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
