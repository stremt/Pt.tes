import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Code, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";

export default function HTMLtoPDF() {
  const [htmlContent, setHtmlContent] = useState("");
  const [converting, setConverting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Free HTML to PDF Converter Online - Convert HTML Code to PDF | Pixocraft Tools",
    description: "Convert HTML to PDF online for free. Transform HTML code, web pages to PDF documents instantly. Supports CSS styling. No installation required, works offline.",
    keywords: "html to pdf converter, convert html to pdf free, html pdf generator, webpage to pdf, html2pdf online, save html as pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/html-to-pdf",
  });

  const convertToPDF = async () => {
    if (!htmlContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter HTML content to convert",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);
    try {
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      
      const opt = {
        margin: 10,
        filename: 'document.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();

      toast({
        title: "Success!",
        description: "HTML converted to PDF successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert HTML to PDF",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "How does HTML to PDF conversion work?",
      answer: "Our tool takes your HTML code and renders it into a PDF document. It supports standard HTML tags, CSS styling, and basic formatting. The conversion happens entirely in your browser, ensuring your HTML code remains private and secure."
    },
    {
      question: "Can I include CSS styling in my HTML?",
      answer: "Yes! You can include inline styles, style tags, or CSS classes in your HTML. The converter will render your HTML with all the styling applied before generating the PDF. For best results, use inline styles or include CSS within style tags."
    },
    {
      question: "Is there a size limit for HTML content?",
      answer: "The limit depends on your browser's available memory. Most modern browsers can handle several megabytes of HTML content. Very complex HTML with thousands of elements may take longer to process or may exceed browser limits."
    },
    {
      question: "Will images in my HTML be included in the PDF?",
      answer: "Yes, images included in your HTML using img tags with proper src attributes will be rendered in the PDF. For best results, use absolute URLs or data URIs for images. Local file paths may not work due to browser security restrictions."
    },
    {
      question: "Is my HTML code secure?",
      answer: "Absolutely! All conversion happens entirely in your browser using JavaScript. Your HTML code is never uploaded to our servers or transmitted over the internet. Once you close the page, all data is completely removed from memory."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const sampleHTML = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1 { color: #2563eb; }
    .highlight { background: #fef3c7; padding: 2px 5px; }
  </style>
</head>
<body>
  <h1>Sample HTML Document</h1>
  <p>This is a sample HTML document with <span class="highlight">styled content</span>.</p>
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
</body>
</html>`;

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
            <span className="text-foreground">HTML to PDF</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Code className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">HTML to PDF Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert HTML code to PDF documents. Supports CSS styling and renders your HTML beautifully.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">CSS Support</Badge>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>HTML Input</CardTitle>
                  <CardDescription>Paste your HTML code here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your HTML code..."
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    className="font-mono text-sm min-h-[400px]"
                    data-testid="textarea-html"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setHtmlContent(sampleHTML)}
                      data-testid="button-sample"
                    >
                      Load Sample
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setHtmlContent("")}
                      data-testid="button-clear"
                    >
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview & Convert</CardTitle>
                  <CardDescription>See how your HTML will look</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {showPreview && htmlContent && (
                    <div 
                      className="border rounded-lg p-4 min-h-[300px] bg-white text-black overflow-auto"
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                      data-testid="preview-html"
                    />
                  )}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex-1"
                      data-testid="button-preview"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {showPreview ? "Hide Preview" : "Show Preview"}
                    </Button>
                    <Button
                      onClick={convertToPDF}
                      disabled={converting || !htmlContent.trim()}
                      className="flex-1"
                      data-testid="button-convert"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {converting ? "Converting..." : "Convert to PDF"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Web Page Archiving</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Save web page content as PDF for offline viewing, archiving, or documentation purposes. Perfect for preserving important web content.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Email Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Convert HTML email templates to PDF for previewing, sharing with clients, or including in presentations and documentation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Generate PDF reports from HTML templates, convert web-based reports to PDF, or create printable documents from HTML content.
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
