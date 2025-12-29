import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileText, Download, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";
import { marked } from "marked";

export default function TextToPDF() {
  const [textContent, setTextContent] = useState("");
  const [converting, setConverting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [fontSize, setFontSize] = useState("12");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [titleText, setTitleText] = useState("");
  const [pageOrientation, setPageOrientation] = useState("portrait");
  const [isMarkdown, setIsMarkdown] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Free Text to PDF Converter Online - Convert Text to PDF | Pixocraft Tools",
    description: "Convert plain text to PDF documents instantly with formatting options. Customize font, size, title, and more. Free, offline, no signup required.",
    keywords: "text to pdf converter, convert text to pdf free, text pdf generator, online text to pdf, text document to pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-to-pdf",
  });

  const convertToPDF = async () => {
    if (!textContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter text content to convert",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);
    try {
      const element = document.createElement('div');
      element.style.fontFamily = fontFamily;
      element.style.fontSize = fontSize + "pt";
      element.style.lineHeight = "1.6";
      element.style.padding = "20px";

      let htmlContent = "";
      
      if (titleText) {
        htmlContent += `<h1 style="text-align: center; margin-bottom: 20px; font-size: ${parseInt(fontSize) + 6}pt; font-weight: bold;">${escapeHtml(titleText)}</h1>`;
      }
      
      if (isMarkdown) {
        const markdownHtml = await marked(textContent);
        htmlContent += `<div style="font-family: ${fontFamily}; font-size: ${fontSize}pt;">${markdownHtml}</div>`;
      } else {
        htmlContent += `<p style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(textContent).replace(/\n/g, '<br>')}</p>`;
      }
      
      element.innerHTML = htmlContent;
      
      const opt = {
        margin: 10,
        filename: titleText ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf' : 'document.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: pageOrientation === 'landscape' ? 'landscape' : 'portrait'
        }
      };

      await html2pdf().set(opt).from(element).save();

      toast({
        title: "Success!",
        description: "Text converted to PDF successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert text to PDF",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const escapeHtml = (text: string) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Can I customize the appearance of my PDF?",
      answer: "Yes! You can change the font family, font size, add a title, and choose between portrait and landscape orientation. All formatting options are applied before converting to PDF."
    },
    {
      question: "What fonts are available?",
      answer: "You can choose from Arial, Times New Roman, Courier New, Georgia, Verdana, and more. These are standard web fonts that work reliably across all PDF viewers."
    },
    {
      question: "Is there a size limit for text content?",
      answer: "The limit depends on your browser's available memory. Most modern browsers can handle large text files. The more text you add, the larger the resulting PDF will be."
    },
    {
      question: "Can I add line breaks and formatting to my text?",
      answer: "Yes! Line breaks in your text will be preserved in the PDF. You can also add a title to your document. For advanced formatting like bold or italic, use HTML tags."
    },
    {
      question: "Is my text content secure?",
      answer: "Absolutely! All conversion happens entirely in your browser using JavaScript. Your text is never uploaded to our servers or transmitted over the internet. Once you close the page, all data is completely removed."
    },
    {
      question: "What is the Markdown mode?",
      answer: "Markdown mode interprets your text as Markdown formatting. This means you can use # for headings, **bold** for bold text, *italic* for italics, - for bullet points, and more. The PDF will render with proper formatting."
    },
    {
      question: "Can I mix plain text and Markdown?",
      answer: "When Markdown mode is enabled, your entire document is treated as Markdown. If you want some plain text sections, simply type them without any Markdown formatting symbols."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const sampleText = `This is a sample text document.

You can paste any plain text here and convert it to PDF with custom formatting options.

Features include:
- Custom font selection
- Adjustable font size
- Optional document title
- Portrait or landscape orientation

Click "Convert to PDF" to download your document!`;

  const MarkdownPreview = ({ content }: { content: string }) => {
    const [htmlContent, setHtmlContent] = useState("");

    const renderMarkdown = async () => {
      const html = await marked(content);
      setHtmlContent(html);
    };

    useEffect(() => {
      renderMarkdown();
    }, [content]);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        style={{
          fontSize: fontSize + "pt",
        }}
        className="prose prose-sm max-w-none dark:prose-invert"
      />
    );
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
            <Link href="/tools/pdf" className="hover:text-foreground">PDF Tools</Link>
            {" / "}
            <span className="text-foreground">Text to PDF</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Text to PDF Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert plain text to beautifully formatted PDF documents. Customize fonts, sizes, titles, and page orientation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Custom Formatting</Badge>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Formatting Options</CardTitle>
                  <CardDescription>Customize your PDF appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Document Title (Optional)</label>
                    <Input
                      placeholder="Enter document title..."
                      value={titleText}
                      onChange={(e) => setTitleText(e.target.value)}
                      data-testid="input-title"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Family</label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger data-testid="select-font">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                        <SelectItem value="Comic Sans MS">Comic Sans MS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Font Size (pt)</label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger data-testid="select-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10pt</SelectItem>
                        <SelectItem value="11">11pt</SelectItem>
                        <SelectItem value="12">12pt</SelectItem>
                        <SelectItem value="13">13pt</SelectItem>
                        <SelectItem value="14">14pt</SelectItem>
                        <SelectItem value="16">16pt</SelectItem>
                        <SelectItem value="18">18pt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Page Orientation</label>
                    <Select value={pageOrientation} onValueChange={setPageOrientation}>
                      <SelectTrigger data-testid="select-orientation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait</SelectItem>
                        <SelectItem value="landscape">Landscape</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="markdown-toggle"
                      checked={isMarkdown}
                      onCheckedChange={(checked) => setIsMarkdown(checked as boolean)}
                      data-testid="checkbox-markdown"
                    />
                    <label htmlFor="markdown-toggle" className="text-sm font-medium cursor-pointer">
                      Treat as Markdown
                    </label>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setTextContent(sampleText)}
                    data-testid="button-sample"
                  >
                    Load Sample
                  </Button>
                </CardContent>
              </Card>

              {/* Text Input & Actions */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Text Input</CardTitle>
                  <CardDescription>Paste your text content here</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Paste your text here or load a sample..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="font-mono text-sm min-h-[400px]"
                    data-testid="textarea-text"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setTextContent("")}
                      data-testid="button-clear"
                    >
                      Clear
                    </Button>
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
                      disabled={converting || !textContent.trim()}
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

            {/* Preview */}
            {showPreview && textContent && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Preview {isMarkdown && "( Markdown )"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border rounded-lg p-8 bg-white text-black overflow-auto max-h-96 prose prose-sm dark:prose-invert"
                    style={{
                      fontFamily: fontFamily,
                      fontSize: fontSize + "pt",
                      lineHeight: "1.6"
                    }}
                    data-testid="preview-text"
                  >
                    {titleText && (
                      <h1 style={{ 
                        textAlign: 'center', 
                        marginBottom: '20px',
                        fontSize: (parseInt(fontSize) + 6) + 'pt',
                        fontWeight: 'bold'
                      }}>
                        {titleText}
                      </h1>
                    )}
                    {isMarkdown ? (
                      <MarkdownPreview content={textContent} />
                    ) : (
                      <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                        {textContent}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Letters & Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Convert letters, essays, or documents to PDF format for printing, sharing, or archiving. Perfect for formal correspondence.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Notes & Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Turn your notes, to-do lists, or planning documents into professional PDF documents. Great for sharing with teams or clients.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Content Export</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Export text content from web pages, editors, or applications as PDF. Preserve your work in a portable, shareable format.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/pdf" className="text-primary hover:text-primary/80 transition-colors">PDF Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
