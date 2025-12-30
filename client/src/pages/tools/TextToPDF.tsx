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
    title: "Free Text to PDF Converter - No Signup, Offline & Secure",
    description: "Convert text files to PDF instantly, offline. Customize fonts, sizes, and formatting. 100% free, no signup, no tracking. Works on all devices.",
    keywords: "text to pdf converter, convert text to pdf free, text pdf generator, online text to pdf, text document to pdf, offline text to pdf, free pdf converter",
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
      element.style.backgroundColor = "#ffffff";
      element.style.color = "#000000";

      let htmlContent = "";
      
      if (titleText) {
        htmlContent += `<h1 style="text-align: center; margin-bottom: 20px; font-size: ${parseInt(fontSize) + 6}pt; font-weight: bold; color: #000000;">${escapeHtml(titleText)}</h1>`;
      }
      
      if (isMarkdown) {
        const markdownHtml = await marked(textContent);
        htmlContent += `<div style="font-family: ${fontFamily}; font-size: ${fontSize}pt; color: #000000;">${markdownHtml}</div>`;
      } else {
        htmlContent += `<div style="white-space: pre-wrap; word-wrap: break-word; color: #000000;">${escapeHtml(textContent).replace(/\n/g, '<br>')}</div>`;
      }
      
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      
      const opt = {
        margin: 10,
        filename: titleText ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf' : 'document.pdf',
        html2canvas: { scale: 2, backgroundColor: '#ffffff' },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: pageOrientation === 'landscape' ? 'landscape' : 'portrait'
        }
      };

      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);

      toast({
        title: "Success!",
        description: "Text converted to PDF successfully",
      });
    } catch (error) {
      console.error("PDF conversion error:", error);
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
      question: "Is my text secure when I convert it to PDF?",
      answer: "Yes. All conversion happens in your browser on your device. Your text never leaves your computer and isn't stored anywhere. Once you close the page, there's no record of what you converted."
    },
    {
      question: "Can I use this tool offline?",
      answer: "The page loads online, but once loaded, conversion happens offline. You don't need internet to convert text after the page is loaded."
    },
    {
      question: "Why is there no signup or login required?",
      answer: "Because we don't need to track you or store anything. Your conversion happens locally, so there's no need for accounts, emails, or passwords."
    },
    {
      question: "What's the file size limit for conversion?",
      answer: "There's no strict limit. Your browser's memory is the limit. Most modern browsers handle very large text files without issues. A 100MB file should work fine on most devices."
    },
    {
      question: "Will the PDF look the same on someone else's computer?",
      answer: "Yes. PDFs are designed to look identical everywhere. The fonts, spacing, and layout you set will appear the same on any device that opens the PDF."
    },
    {
      question: "What happens if I include special characters or non-English text?",
      answer: "Special characters and non-English languages work fine. The converter handles Unicode text perfectly, so any language or symbol converts correctly."
    },
    {
      question: "Can I edit the PDF after converting it?",
      answer: "Text-to-PDF creates read-only PDFs. If you need to edit, modify the text first, then convert again. For more advanced editing, use a PDF editor tool."
    },
    {
      question: "Can I convert multiple files at once?",
      answer: "Currently, you convert one file at a time. For batch conversions, use the tool repeatedly or explore our bulk conversion guides for large batches."
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
          color: "#000000",
        }}
        className="prose prose-sm max-w-none prose-h1:text-black prose-h2:text-black prose-h3:text-black prose-h4:text-black prose-h5:text-black prose-h6:text-black prose-p:text-black prose-li:text-black prose-strong:text-black prose-em:text-black"
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
            <h1 className="text-4xl md:text-5xl font-bold">Convert Text to Professional PDF Documents</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform plain text into professionally formatted PDFs instantly. Offline, secure, and completely free. No signup, no tracking, no limits.
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

                  <div className="flex items-center gap-2 pt-2">
                    <Checkbox
                      id="markdown-toggle"
                      checked={isMarkdown}
                      onCheckedChange={(checked) => setIsMarkdown(checked as boolean)}
                      data-testid="checkbox-markdown"
                    />
                    <label htmlFor="markdown-toggle" className="text-sm font-medium cursor-pointer text-foreground">
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
            <h2 className="text-3xl font-bold mb-8 text-center">Why Convert Text to PDF?</h2>
            <div className="prose prose-sm dark:prose-invert max-w-4xl mx-auto text-muted-foreground space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">The Problem with Plain Text</h3>
                <p>Text files are everywhere—in your email, notes apps, documents, and more. But when you need to share them professionally, archive them long-term, or print them nicely formatted, plain text falls short. PDF is the universal standard for documents that need to look consistent across devices, remain un-editable, and feel professional. Converting text to PDF solves this instantly.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Who Benefits Most</h3>
                <p><strong>Students</strong> converting essays and assignments to PDF for submission. <strong>Professionals</strong> archiving important correspondence and documentation. <strong>Business owners</strong> creating formal documents without expensive software. <strong>Developers and writers</strong> who work primarily in plain text but need portable formats. Anyone who wants to preserve text documents as permanent, shareable records that look professional everywhere.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Real-Life Examples</h3>
                <p>A student has notes in plain text and needs to submit an essay in PDF format—five minutes of formatting, then download. A freelancer receives a contract via email as plain text and converts it to PDF to archive as legal documentation. A researcher collects data in text format and converts it to PDF for backup and sharing with colleagues. A small business owner creates invoices or receipts in text and converts them to professional-looking PDFs. A writer exports their manuscript from a text editor and converts to PDF for agent submission. A journalist archives email interviews as timestamped PDFs for record-keeping.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Privacy & Offline Guarantee</h3>
                <p>Here's what makes this tool different: the entire conversion happens on your computer using your browser. Your text is processed locally, not sent anywhere. Once you close the page, nothing is stored or logged. This matters for students protecting academic work, professionals keeping contracts private, and anyone handling sensitive information. You can use this tool offline after the page loads—no internet required for conversion, and no data transmission at any point.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Customization & Control</h3>
                <p>You're not locked into a single format. Choose your font from standard options, adjust the size, set page orientation (portrait or landscape), and add a title to your document. Want to preview before downloading? You can. Working with structured content? Optional Markdown mode lets you use formatting like headings, bold, lists, and more. Your preferences are applied before conversion, giving you complete control over the final PDF without needing complex software.</p>
              </div>
            </div>
          </section>

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

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Other PDF Tools You Might Need</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">HTML to PDF Converter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Convert web pages and HTML code directly to PDF format with full styling preserved.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PDF Merger</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Combine multiple PDF files into a single document for easier sharing and organization.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Image to PDF Converter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Convert JPG, PNG, and other image formats into professional PDF documents.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PDF Splitter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Extract specific pages or divide large PDFs into smaller, manageable files.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PDF Compressor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Reduce PDF file size for easier sharing and storage without losing quality.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PDF Rotator</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Rotate PDF pages and adjust orientation for correct viewing and printing.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">More Text-to-PDF Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/tools/text-to-pdf/convert-online">
                <Card className="h-full hover-elevate cursor-pointer transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Convert Text File to PDF Online Free</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Instant conversion with no signup required. Free and secure document conversion in seconds.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/text-to-pdf/formatting-guide">
                <Card className="h-full hover-elevate cursor-pointer transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Convert Document Text with Formatting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Preserve indentation, spacing, and structure. Complete guide for formatting-aware conversion.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/text-to-pdf/email-converter">
                <Card className="h-full hover-elevate cursor-pointer transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Convert Email Content to PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Archive important emails permanently. Save messages and threads as timestamped PDF records.</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/text-to-pdf/bulk-conversion">
                <Card className="h-full hover-elevate cursor-pointer transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">Bulk Convert Text Files to PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Process hundreds of files efficiently. Fast, organized bulk conversion for large batches.</p>
                  </CardContent>
                </Card>
              </Link>
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
