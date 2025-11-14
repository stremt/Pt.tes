import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Eraser, Upload, Download, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { attemptWatermarkRemoval, formatFileSize } from "@/lib/pdf-utils";

export default function PDFWatermarkRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "PDF Watermark Remover Online Free - Remove Watermarks from PDF | Pixocraft Tools",
    description: "Attempt to remove watermarks from PDF files online for free. Process PDFs to reduce watermark visibility. Secure, fast, and works offline in your browser.",
    keywords: "remove watermark from pdf, pdf watermark remover, delete watermark pdf, remove text from pdf, clean pdf watermark, pdf watermark cleaner",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-watermark-remover",
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
      setProcessedFile(null);
    }
  };

  const processWatermark = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const result = await attemptWatermarkRemoval(file);
      setProcessedFile(result);
      toast({
        title: "Processed",
        description: "PDF processed. Note: Complete watermark removal may not be possible.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadProcessed = () => {
    if (processedFile) {
      const url = URL.createObjectURL(processedFile);
      const link = document.createElement("a");
      link.download = `processed-${file?.name || "document.pdf"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Can this tool completely remove all watermarks?",
      answer: "Browser-based watermark removal has limitations. This tool attempts to process the PDF and may reduce watermark visibility, but complete removal is not guaranteed. Professional watermarks embedded deeply in PDF structure may require specialized desktop software."
    },
    {
      question: "Is removing watermarks legal?",
      answer: "Only remove watermarks from documents you own or have permission to modify. Removing watermarks from copyrighted material or documents you don't have rights to is illegal and unethical. This tool is designed for legitimate use cases only."
    },
    {
      question: "Why can't all watermarks be removed?",
      answer: "Watermarks can be embedded in PDFs in various ways - as text layers, image overlays, or integrated into the document structure. Browser-based tools have limitations compared to professional desktop software. Success depends on how the watermark was originally added."
    },
    {
      question: "Is my PDF secure during processing?",
      answer: "Yes! All processing happens entirely in your browser. Your PDF never leaves your device, ensuring complete privacy. We don't upload, store, or have any access to your files."
    },
    {
      question: "What should I do if the watermark isn't removed?",
      answer: "If this tool doesn't achieve the desired results, you may need professional PDF editing software. Consider whether you have the right to remove the watermark, and contact the document owner if necessary."
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
            <span className="text-foreground">PDF Watermark Remover</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eraser className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF Watermark Remover</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Attempt to remove or reduce watermarks from PDF files. Process PDFs securely in your browser.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Private</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  <p className="font-medium mb-1">Important Notice</p>
                  <p>This tool has limitations and may not remove all watermarks completely. Only use on documents you own or have permission to modify. Complete watermark removal may not be possible with browser-based tools.</p>
                </div>
              </div>
            </div>

            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>Select a PDF file with watermark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload a PDF</p>
                    <p className="text-sm text-muted-foreground">Attempt to process watermarks</p>
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
                        <CardTitle>Process Watermark</CardTitle>
                        <CardDescription>{file.name} ({formatFileSize(file.size)})</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFile(null);
                          setProcessedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-2">
                      <Button
                        onClick={processWatermark}
                        disabled={loading}
                        className="flex-1"
                        size="lg"
                        data-testid="button-process"
                      >
                        {loading ? "Processing..." : "Process PDF"}
                      </Button>
                      {processedFile && (
                        <Button
                          onClick={downloadProcessed}
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

                    {processedFile && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                          PDF Processed
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Review the processed PDF. Complete watermark removal may not be achievable with browser-based tools. Consider professional software for better results.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
