import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Upload, Download, Zap, Lock, FileImage } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
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
    title: "PDF to Image Converter | Convert PDF to PNG/JPG Free | Pixocraft Tools",
    description: "Convert PDF pages into images offline. Export all pages as high-quality PNG/JPG. Fully secure.",
    keywords: "pdf to image, pdf to png, pdf to jpg, convert pdf to image, pdf page to image",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does quality reduce?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, exported as high-quality PNG."
        }
      }
    ]
  };

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
            <span className="text-foreground">PDF to Image</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Image className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF to Image Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert PDF pages to high-quality PNG or JPG images. Fully offline & secure
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
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
                    <div className="flex items-center justify-between">
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
                    <div className="flex gap-2">
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
                            <CardTitle className="text-base flex items-center justify-between">
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

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Use Cases</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Share on Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert PDF pages to images for easy sharing on social platforms
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Extract Diagrams</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Extract charts, diagrams, and graphics from PDF documents
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does quality reduce?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No! When using proper rendering, PDFs are exported as high-quality PNG images with no quality loss.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What formats are supported?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The tool exports to PNG format by default, which provides lossless quality and transparency support.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
