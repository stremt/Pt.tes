import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileImage, Upload, Download, X, Zap, Lock, Users, FileText, Shield, Globe, GraduationCap, Briefcase, Camera, Smartphone } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PDFDocument } from "pdf-lib";

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Image to PDF Converter Free - JPG PNG to PDF Online | Pixocraft",
    description: "Convert JPG, PNG images to PDF for free. Combine multiple photos into one PDF document. 100% offline, no uploads, works on any device. Trusted in India.",
    keywords: "image to pdf, jpg to pdf, png to pdf, convert image to pdf, combine images to pdf, photo to pdf, image to pdf converter free, multiple images to pdf, picture to pdf online",
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
    }

    setFiles([...files, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const convertToPDF = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);

    try {
      const pdfDoc = await PDFDocument.create();

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

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
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
        description: `Converted ${files.length} images to PDF`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to convert images to PDF",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const faqItems = [
    {
      question: "How do I convert multiple images to one PDF?",
      answer: "Simply upload all your images using the upload area. You can select multiple files at once or add them one by one. Once all images are added, click 'Convert & Download PDF' and all images will be combined into a single PDF document with one image per page."
    },
    {
      question: "What image formats can I convert to PDF?",
      answer: "Our tool supports the most common image formats including JPG/JPEG and PNG. These formats cover the vast majority of photos and images. Each image maintains its original quality and dimensions in the final PDF."
    },
    {
      question: "Is there a limit on how many images I can convert?",
      answer: "No, there's no fixed limit. You can add as many images as you need. However, very large batches (50+ high-resolution images) may take longer to process depending on your device's capabilities."
    },
    {
      question: "Do my images get uploaded to any server?",
      answer: "No, absolutely not. All conversion happens directly in your browser using your device's processing power. Your images never leave your device, ensuring complete privacy for personal photos and sensitive documents."
    },
    {
      question: "Can I change the order of images in the PDF?",
      answer: "Currently, images appear in the PDF in the order you add them. To control the sequence, add images in your preferred order, or remove and re-add images to adjust their position."
    },
    {
      question: "Will my images lose quality when converted to PDF?",
      answer: "No. The tool preserves the original resolution and quality of your images. Each image is embedded at its full size and clarity in the PDF document."
    },
    {
      question: "Can I use this tool on my mobile phone?",
      answer: "Yes. Our image to PDF converter works on any modern browser—Android, iPhone, iPad, or desktop. No app installation required. Just open the page and start converting."
    },
    {
      question: "Is this image to PDF converter really free?",
      answer: "Yes, completely free with no hidden charges, no watermarks, and no sign-up required. Use it unlimited times for personal or professional work."
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
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Image to PDF</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileImage className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Free Image to PDF Converter - Combine Photos to PDF</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Convert JPG, PNG and other images to PDF instantly. Combine multiple photos into one document. No software installation, no account needed, and your images stay private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">100% Free</Badge>
              <Badge variant="secondary">Works Offline</Badge>
              <Badge variant="secondary">No Sign-up</Badge>
              <Badge variant="secondary">Unlimited Images</Badge>
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
                    <p className="text-sm font-medium">Selected Images ({files.length})</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {files.map((file, index) => (
                        <Card key={index} className="relative group">
                          <CardContent className="p-2">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-32 object-cover rounded"
                            />
                            <p className="text-xs truncate mt-1">{file.name}</p>
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

                <Button
                  onClick={convertToPDF}
                  disabled={files.length === 0 || converting}
                  className="w-full"
                  size="lg"
                  data-testid="button-convert"
                >
                  {converting ? (
                    <>Converting to PDF...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Convert & Download PDF
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Convert Images to PDF?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  Images are great for viewing, but they come with limitations. When you need to share multiple photos, present a portfolio, or submit documents officially, individual image files become impractical. Recipients may receive files out of order, some images might not open on their device, and large batches can overwhelm email attachments.
                </p>
                <p>
                  Converting images to PDF solves these problems instantly. A PDF bundles all your photos into a single, universally readable file. It preserves the exact look of each image, maintains the sequence you intended, and works on virtually every device and operating system without special software.
                </p>
                <p>
                  Whether you're compiling scanned documents, creating a photo album, preparing ID proofs for an application, or organizing receipts for reimbursement, our free image to PDF converter handles it all—right in your browser, without uploading anything to external servers.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Convert Images to PDF - 3 Easy Steps</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <CardTitle className="text-lg">Upload Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click the upload area and select your JPG, PNG, or other image files. You can select multiple images at once.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <CardTitle className="text-lg">Review & Arrange</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Preview your selected images. Remove any you don't need. Images will appear in the PDF in the order shown.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <CardTitle className="text-lg">Download PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click convert and your PDF downloads instantly. Each image becomes one page in the final document.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Who Uses Image to PDF Conversion?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <GraduationCap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Combine assignment photos, handwritten notes, and diagrams into a single PDF for easy submission. Perfect for online assignments and project documentation.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Job Seekers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Compile certificates, ID proofs, and qualification documents into one PDF for job applications. Many portals require single-file uploads for documentation.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Camera className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Photographers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Create professional photo portfolios or client proofs as PDF documents. Share your work in a polished, universally viewable format.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Business Owners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert product images, receipts, and invoices to PDF for accounting, insurance claims, or official records. Maintains organized documentation.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Government Applicants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Combine Aadhaar, PAN, passport photos and other ID documents into one PDF for passport applications, visa submissions, and official forms.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Smartphone className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Mobile Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Quickly convert phone photos to PDF without installing any app. Works directly in your mobile browser for instant document creation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">Privacy & Security - Your Images Stay Private</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Unlike cloud-based converters, our tool processes everything locally. Your personal photos and documents never leave your device.
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
                      Your images are processed entirely in your browser. Nothing is sent to any server. Safe for personal photos, ID documents, medical records, and confidential business materials.
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
                      We don't store, copy, or access your images. Once you close the page, your files exist only on your device. No tracking, no logging, no data collection.
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
                      After the page loads, you can disconnect from the internet and continue converting. Perfect for areas with slow connectivity or when handling sensitive files.
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
                <h2 className="text-2xl md:text-3xl font-bold">Related Image & PDF Tools</h2>
                <p className="text-muted-foreground">Explore more free tools for your image and document needs</p>
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
