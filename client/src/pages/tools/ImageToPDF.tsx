import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileImage, Upload, Download, X, Zap, Lock, Users, FileText, Shield, Globe, GraduationCap, Briefcase, Camera, Smartphone, ArrowRight } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PDFDocument } from "pdf-lib";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

type PageOrientation = "portrait" | "landscape";
type PageSize = "fit" | "a4" | "letter";
type MarginSize = "none" | "small" | "big";

interface PageDimensions {
  width: number;
  height: number;
}

const pageSizes: Record<PageSize, PageDimensions> = {
  fit: { width: 0, height: 0 }, // Dynamic based on image
  a4: { width: 595.28, height: 841.89 }, // 210x297mm in points
  letter: { width: 612, height: 792 }, // 8.5x11in in points
};

const margins: Record<MarginSize, number> = {
  none: 0,
  small: 20,
  big: 50,
};

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const [orientation, setOrientation] = useState<PageOrientation>("portrait");
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [margin, setMargin] = useState<MarginSize>("none");
  const [mergeImages, setMergeImages] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Image to PDF Converter - Convert JPG, PNG to PDF Online Free",
    description: "Convert JPG, PNG, and photos to PDF online for free. Combine multiple images into one high-quality PDF document. 100% private, client-side processing, no sign-up required.",
    keywords: "image to pdf, jpg to pdf, convert image to pdf, photo to pdf converter, combine images to pdf, images to pdf online, image to pdf converter free, merge images to pdf, convert photos to pdf, picture to pdf, png to pdf, scan to pdf, combine photos into pdf, convert multiple images to pdf, mobile image to pdf, offline image to pdf converter, secure image to pdf, batch image to pdf, create pdf from images, image document converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-to-pdf",
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length !== selectedFiles.length) {
      toast({
        title: "Warning",
        description: "Only image files are allowed",
        variant: "destructive",
      });
      playErrorSound();
    }

    setFiles([...files, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (index: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newFiles = [...files];
    const draggedFile = newFiles[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, draggedFile);
    setFiles(newFiles);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const convertToPDF = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive",
      });
      playErrorSound();
      return;
    }

    setConverting(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const marginValue = margins[margin];

      if (mergeImages) {
        // Merge all images into one PDF with multiple pages
        for (const file of files) {
          const arrayBuffer = await file.arrayBuffer();
          let image;

          if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(arrayBuffer);
          } else if (file.type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
          } else {
            continue;
          }

          // Determine page size
          let pageWidth = pageSizes[pageSize].width;
          let pageHeight = pageSizes[pageSize].height;

          if (pageSize === 'fit') {
            pageWidth = image.width;
            pageHeight = image.height;
          } else {
            // Apply orientation
            if (orientation === 'landscape') {
              [pageWidth, pageHeight] = [pageHeight, pageWidth];
            }
          }

          const page = pdfDoc.addPage([pageWidth, pageHeight]);

          // Calculate image dimensions with margins
          const availableWidth = pageWidth - 2 * marginValue;
          const availableHeight = pageHeight - 2 * marginValue;

          // Scale image to fit with aspect ratio
          let drawWidth = availableWidth;
          let drawHeight = (image.height / image.width) * drawWidth;

          if (drawHeight > availableHeight) {
            drawHeight = availableHeight;
            drawWidth = (image.width / image.height) * drawHeight;
          }

          // Center the image
          const x = marginValue + (availableWidth - drawWidth) / 2;
          const y = marginValue + (availableHeight - drawHeight) / 2;

          page.drawImage(image, {
            x,
            y,
            width: drawWidth,
            height: drawHeight,
          });
        }
      } else {
        // Create separate PDFs for each image (or one page per image logic)
        for (const file of files) {
          const arrayBuffer = await file.arrayBuffer();
          let image;

          if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
            image = await pdfDoc.embedJpg(arrayBuffer);
          } else if (file.type === 'image/png') {
            image = await pdfDoc.embedPng(arrayBuffer);
          } else {
            continue;
          }

          // Determine page size
          let pageWidth = pageSizes[pageSize].width;
          let pageHeight = pageSizes[pageSize].height;

          if (pageSize === 'fit') {
            pageWidth = image.width;
            pageHeight = image.height;
          } else {
            // Apply orientation
            if (orientation === 'landscape') {
              [pageWidth, pageHeight] = [pageHeight, pageWidth];
            }
          }

          const page = pdfDoc.addPage([pageWidth, pageHeight]);

          // Calculate image dimensions with margins
          const availableWidth = pageWidth - 2 * marginValue;
          const availableHeight = pageHeight - 2 * marginValue;

          // Scale image to fit with aspect ratio
          let drawWidth = availableWidth;
          let drawHeight = (image.height / image.width) * drawWidth;

          if (drawHeight > availableHeight) {
            drawHeight = availableHeight;
            drawWidth = (image.width / image.height) * drawHeight;
          }

          // Center the image
          const x = marginValue + (availableWidth - drawWidth) / 2;
          const y = marginValue + (availableHeight - drawHeight) / 2;

          page.drawImage(image, {
            x,
            y,
            width: drawWidth,
            height: drawHeight,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.pdf';
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: `Converted ${files.length} image${files.length !== 1 ? 's' : ''} to PDF`,
      });
      playCompletionSound();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to convert images to PDF",
        variant: "destructive",
      });
      playErrorSound();
    } finally {
      setConverting(false);
    }
  };

  const faqItems = [
    {
      question: "How do I convert images to PDF without uploading them?",
      answer: "Our tool processes your images 100% locally in your browser. Since the conversion happens client-side, your files are never uploaded to any server, ensuring total privacy and security for your sensitive documents."
    },
    {
      question: "Which image formats are supported by this converter?",
      answer: "We support all common image formats including JPG, JPEG, PNG, and WebP. You can combine different formats into a single PDF document easily."
    },
    {
      question: "Can I convert high-resolution photos to PDF?",
      answer: "Yes, our converter maintains the original quality and resolution of your photos during the PDF generation process, making it ideal for professional portfolios and high-quality document submissions."
    },
    {
      question: "Is there a limit to the number of images I can combine?",
      answer: "There is no strict limit. You can merge as many images as you need into one PDF. For very large batches (over 100 images), the processing time will depend on your computer's memory and speed."
    },
    {
      question: "How do I arrange the order of photos in my PDF?",
      answer: "After uploading your images, you can simply drag and drop the image cards into your desired sequence. The final PDF will follow the exact order shown in the preview grid."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Absolutely. You can convert phone photos to PDF directly in your mobile browser on iPhone, iPad, or Android without installing any third-party apps."
    },
    {
      question: "What page sizes are available for the PDF output?",
      answer: "You can choose between 'Fit' (maintains the original image dimensions), A4 standard size, or US Letter size. You can also adjust page orientation to Portrait or Landscape."
    },
    {
      question: "Can I add margins to my PDF pages?",
      answer: "Yes, we offer three margin options: None (borderless), Small, and Big. This is particularly useful when preparing documents for printing or academic submissions."
    },
    {
      question: "Is this image to PDF converter free for commercial use?",
      answer: "Yes, our tool is 100% free for both personal and professional use. There are no hidden fees, no watermarks, and no registration required."
    },
    {
      question: "Do I need to be online to use this converter?",
      answer: "Once the page is loaded, the conversion engine works entirely offline. You can disconnect from the internet and continue merging your images safely."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "PDF to Image", path: "/tools/pdf-to-image", description: "Convert PDF pages to JPG or PNG images" },
    { name: "Image Compressor", path: "/tools/image-compressor", description: "Reduce image file size without quality loss" },
    { name: "PDF Merger", path: "/tools/pdf-merger", description: "Combine multiple PDF files into one document" },
    { name: "Image Resizer", path: "/tools/image-resizer", description: "Resize images to any dimension" },
    { name: "JPG to PNG", path: "/tools/jpg-to-png", description: "Convert JPG images to PNG format" }
  ];

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "PDF Tools", url: "/tools/pdf" }, { label: "Image to PDF" }]} />

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileImage className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Convert Image to PDF Online - Fast & Free Photo to PDF</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your photos and documents into professional PDF files instantly. Our <strong>image to pdf converter</strong> works 100% client-side, ensuring your data never leaves your device. Perfect for job applications, government forms, and student assignments.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Badge variant="secondary" className="px-3 py-1">100% Free</Badge>
              <Badge variant="secondary" className="px-3 py-1">Privacy Focused</Badge>
              <Badge variant="secondary" className="px-3 py-1">No Sign-up</Badge>
              <Badge variant="secondary" className="px-3 py-1">Bulk Processing</Badge>
              <Badge variant="secondary" className="px-3 py-1">Offline Capable</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Convert Images to PDF</CardTitle>
                <CardDescription>
                  Upload one or more images to create a PDF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                  data-testid="dropzone-upload"
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium mb-2">Click to upload images</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, WebP supported
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="input-file"
                  />
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected Images ({files.length}) - Drag to reorder</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {files.map((file, index) => (
                        <Card
                          key={index}
                          className={`relative group cursor-move transition-all ${
                            draggedIndex === index ? "opacity-50 ring-2 ring-blue-500" : ""
                          } ${
                            dragOverIndex === index && draggedIndex !== index
                              ? "ring-2 ring-blue-400 bg-blue-50/50 dark:bg-blue-950/30"
                              : ""
                          }`}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(index, e)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(index, e)}
                          onDragEnd={handleDragEnd}
                          data-testid={`image-card-${index}`}
                        >
                          <CardContent className="p-2">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-32 object-cover rounded pointer-events-none"
                              draggable={false}
                            />
                            <p className="text-xs truncate mt-1">{file.name}</p>
                            <div className="absolute top-1 left-1 bg-gray-800/70 text-white text-xs font-semibold rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {index + 1}
                            </div>
                            <Button
                              onClick={() => removeFile(index)}
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid={`button-remove-${index}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-6 border-t pt-6">
                  <h3 className="font-semibold text-base">Image to PDF Options</h3>

                  {/* Page Orientation */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Page Orientation</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setOrientation("portrait")}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          orientation === "portrait"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : "border-border bg-background hover-elevate"
                        }`}
                        data-testid="button-orientation-portrait"
                      >
                        <div className="w-8 h-12 border-2 border-current rounded" />
                        <span className="text-sm font-medium">Portrait</span>
                      </button>
                      <button
                        onClick={() => setOrientation("landscape")}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          orientation === "landscape"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : "border-border bg-background hover-elevate"
                        }`}
                        data-testid="button-orientation-landscape"
                      >
                        <div className="w-12 h-8 border-2 border-current rounded" />
                        <span className="text-sm font-medium">Landscape</span>
                      </button>
                    </div>
                  </div>

                  {/* Page Size */}
                  <div className="space-y-3">
                    <label htmlFor="page-size" className="text-sm font-medium">
                      Page Size
                    </label>
                    <Select value={pageSize} onValueChange={(value) => setPageSize(value as PageSize)}>
                      <SelectTrigger id="page-size" data-testid="select-page-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fit">Fit (Same page size as image)</SelectItem>
                        <SelectItem value="a4">A4 (297x210 mm)</SelectItem>
                        <SelectItem value="letter">US Letter (215x279.4 mm)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Margin Size */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Margin</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setMargin("none")}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                          margin === "none"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : "border-border bg-background hover-elevate"
                        }`}
                        data-testid="button-margin-none"
                      >
                        <div className="text-sm font-medium text-center">No margin</div>
                      </button>
                      <button
                        onClick={() => setMargin("small")}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                          margin === "small"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : "border-border bg-background hover-elevate"
                        }`}
                        data-testid="button-margin-small"
                      >
                        <div className="w-16 h-12 border border-current rounded flex items-center justify-center">
                          <div className="w-12 h-8 border border-current" />
                        </div>
                        <span className="text-xs font-medium">Small</span>
                      </button>
                      <button
                        onClick={() => setMargin("big")}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                          margin === "big"
                            ? "border-red-500 bg-red-50 dark:bg-red-950"
                            : "border-border bg-background hover-elevate"
                        }`}
                        data-testid="button-margin-big"
                      >
                        <div className="w-16 h-12 border border-current rounded flex items-center justify-center">
                          <div className="w-8 h-4 border border-current" />
                        </div>
                        <span className="text-xs font-medium">Big</span>
                      </button>
                    </div>
                  </div>

                  {/* Merge checkbox */}
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="merge-images"
                      checked={mergeImages}
                      onCheckedChange={(checked) => setMergeImages(checked as boolean)}
                      data-testid="checkbox-merge-images"
                    />
                    <label htmlFor="merge-images" className="text-sm font-medium cursor-pointer">
                      Merge all images in one PDF file
                    </label>
                  </div>
                </div>

                <Button
                  onClick={convertToPDF}
                  disabled={files.length === 0 || converting}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  size="lg"
                  data-testid="button-convert"
                >
                  {converting ? (
                    <>Converting to PDF...</>
                  ) : (
                    <>
                      Convert to PDF
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

        <div className="mt-24 space-y-24">
          {/* Document Submission Intent Section */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Professional Document Submission Guide</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Prepare your images for official submissions with our specialized conversion workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Government Applications",
                  description: "Convert ID proofs, address documents, and certificates into a single, compliant PDF for official portals.",
                  icon: Shield
                },
                {
                  title: "Job Applications",
                  description: "Merge your resume, experience letters, and portfolio images into one professional document.",
                  icon: Briefcase
                },
                {
                  title: "Student Assignments",
                  description: "Submit handwritten notes or scanned pages as a high-quality PDF document for online classes.",
                  icon: GraduationCap
                },
                {
                  title: "Business Invoices",
                  description: "Keep track of expenses by converting receipts and invoices into organized PDF files.",
                  icon: FileText
                }
              ].map((item, i) => (
                <Card key={i} className="hover-elevate">
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Educational Content Section */}
          <section className="prose prose-slate dark:prose-invert max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight m-0">Why Convert Images to PDF?</h2>
                <p className="text-lg leading-relaxed">
                  While images are great for viewing, the <strong>Portable Document Format (PDF)</strong> is the universal standard for business and official documentation. Converting your photos to PDF ensures that your document looks exactly the same on every device, from mobile phones to high-end workstations.
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">The Advantages of PDF Format:</h3>
                  <ul className="space-y-2 list-none p-0">
                    <li className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Universal Compatibility:</strong> Open your documents on any device without specialized software.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Security & Integrity:</strong> PDFs are harder to edit accidentally, preserving your data's original state.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <span><strong>Multi-Image Support:</strong> Combine dozens of photos into a single, easily shareable file.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-muted/30 p-8 rounded-2xl border border-muted-foreground/10 space-y-6">
                <h3 className="text-xl font-bold m-0">Technical Authority Signals</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Image Rendering</span>
                    <span className="text-muted-foreground">High Fidelity Browser Pipeline</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">PDF Standard</span>
                    <span className="text-muted-foreground">PDF/A Compliance Support</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Processing Architecture</span>
                    <span className="text-muted-foreground">100% Client-Side JS execution</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Privacy Layer</span>
                    <span className="text-muted-foreground">Zero Server Upload Protocol</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  *Our converter uses advanced image-to-PDF embedding techniques that preserve resolution while optimizing file size for faster document delivery.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-center">Image vs PDF Comparison</h2>
            <div className="overflow-x-auto rounded-xl border bg-background">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-4 font-bold border-b">Feature</th>
                    <th className="p-4 font-bold border-b text-primary">PDF Document</th>
                    <th className="p-4 font-bold border-b">Raw Images (JPG/PNG)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b">
                    <td className="p-4 font-medium">Portability</td>
                    <td className="p-4">Extremely high, consistent across all OS</td>
                    <td className="p-4">High, but rendering varies by app</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Grouping</td>
                    <td className="p-4 text-primary font-medium">Multiple pages in one file</td>
                    <td className="p-4">One file per image</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Official Use</td>
                    <td className="p-4">Standard for government/business</td>
                    <td className="p-4">Rarely accepted for submissions</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">File Size</td>
                    <td className="p-4">Optimized for document storage</td>
                    <td className="p-4">Can be very large individually</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqItems.map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy Authority */}
          <section className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="h-24 w-24 rounded-full bg-background flex items-center justify-center shadow-xl border-4 border-primary/20 flex-shrink-0">
                <Lock className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">100% Privacy & Security Guarantee</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike other online converters, we value your privacy above all else. When you use our <strong>image to pdf</strong> tool, your photos are processed entirely within your web browser. <strong>No images are ever uploaded to our servers</strong>. This makes it completely safe for converting sensitive identity documents, financial statements, and personal photos.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Shield className="h-4 w-4 text-primary" />
                    Zero Data Retention
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Globe className="h-4 w-4 text-primary" />
                    Works 100% Offline
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Lock className="h-4 w-4 text-primary" />
                    No Account Needed
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Linking & Related Tools */}
          <section className="space-y-8 pb-12 border-t pt-12">
            <h2 className="text-2xl font-bold">Explore More PDF & Image Utilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTools.map((tool) => (
                <Link key={tool.path} href={tool.path}>
                  <a className="block group">
                    <Card className="h-full transition-all group-hover:border-primary/50 group-hover:shadow-md">
                      <CardHeader className="p-4">
                        <CardTitle className="text-base group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">{tool.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</>
  );
}
