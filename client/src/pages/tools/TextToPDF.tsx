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
import katex from "katex";
import "katex/dist/katex.min.css";

export default function TextToPDF() {
  const [textContent, setTextContent] = useState(() => {
    return localStorage.getItem("text-to-pdf-content") || "";
  });
  const [converting, setConverting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [fontSize, setFontSize] = useState("12");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [titleText, setTitleText] = useState("");
  const [pageOrientation, setPageOrientation] = useState("portrait");
  const [isMarkdown, setIsMarkdown] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("text-to-pdf-content", textContent);
  }, [textContent]);

  useSEO({
    title: "Text to PDF Converter Online Free – Markdown, Images, Tables & Math Supported | Pixocraft",
    description: "Convert text to professional PDF instantly. Pixocraft Text to PDF supports Markdown, images, tables, math formulas and custom formatting. 100% private, browser-based and free.",
    keywords: "text to pdf, convert text to pdf, txt to pdf converter, paste text to pdf, markdown to pdf converter, convert notes to pdf, convert email to pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-to-pdf",
    ogTitle: "Text to PDF Converter – Free Professional PDF Generator",
    ogDescription: "Create professional PDFs from plain text instantly. Supports Markdown, images, tables and math equations.",
    ogType: "website",
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
      
      if (isMarkdown) {
        marked.setOptions({
          gfm: true,
          breaks: true
        });
        let markdownHtml = await marked(textContent);
        markdownHtml = markdownHtml.replace(/<br\s*\/?>/g, "");
        
        // Render Math with KaTeX
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = markdownHtml;
        
        // Using a more robust approach for math rendering
        const mathElements = tempDiv.querySelectorAll('code.language-math, .math, [class*="math"]');
        mathElements.forEach(el => {
          try {
            const math = el.textContent || "";
            const isDisplay = el.tagName === 'DIV' || el.classList.contains('math-display');
            el.innerHTML = katex.renderToString(math, { 
              displayMode: isDisplay, 
              throwOnError: false,
              trust: true
            });
          } catch (e) {
            console.error("KaTeX error:", e);
          }
        });
        
        // Handle $...$ and $$...$$ manually if not caught by marked
        let processedHtml = tempDiv.innerHTML;
        processedHtml = processedHtml.replace(/\$\$(.*?)\$\$/g, (match, math) => {
          try {
            return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
          } catch (e) { return match; }
        });
        processedHtml = processedHtml.replace(/\$(.*?)\$/g, (match, math) => {
          try {
            return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
          } catch (e) { return match; }
        });

        htmlContent += `
          <style>
            .pdf-export-content { line-height: 1.6; font-family: Arial, Helvetica, sans-serif; font-size: 12pt; }
            .pdf-export-content h1 { font-size: 28px; font-weight: 700; margin: 24px 0 12px; }
            .pdf-export-content h2 { font-size: 20px; font-weight: 600; margin: 20px 0 10px; }
            .pdf-export-content h3 { font-size: 16px; font-weight: 600; margin: 18px 0 8px; }
            .pdf-export-content p { font-size: 12pt; margin: 10px 0; line-height: 1.6; page-break-inside: avoid; }
            .pdf-export-content ul, .pdf-export-content ol { margin: 10px 0 10px 20px; }
            .pdf-export-content li { margin: 6px 0; }
            .pdf-export-content del { 
              text-decoration: line-through; 
              text-decoration-thickness: 1.5px;
              text-decoration-color: #000;
              vertical-align: baseline;
            }
            .pdf-export-content p {
              margin: 10px 0;
              line-height: 1.6;
              page-break-inside: avoid;
            }
            .pdf-export-content hr { 
              border: none; 
              border-top: 1px solid #d0d7de; 
              margin: 28px 0; 
              page-break-before: auto;
              page-break-after: auto;
            }
            .pdf-export-content blockquote { 
              border-left: 4px solid #ccc; 
              padding-left: 12px; 
              margin: 16px 0; 
              color: #555; 
              font-style: italic; 
              page-break-inside: avoid;
            }
            .pdf-export-content pre { 
              background: #f6f8fa; 
              padding: 16px; 
              border-radius: 6px; 
              font-family: "Courier New", monospace; 
              font-size: 12px; 
              line-height: 1.6;
              overflow-x: auto; 
              margin: 20px 0;
              page-break-inside: avoid;
              white-space: pre-wrap;
            }
            .pdf-export-content pre code {
              display: block;
              width: fit-content;
              min-width: 100%;
            }
            .pdf-export-content code { 
              font-family: "Courier New", monospace;
              background: #f3f3f3; 
              padding: 2px 4px; 
              border-radius: 4px; 
            }
            .pdf-export-content table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 20px 0; 
              page-break-inside: avoid;
            }
            .pdf-export-content th, .pdf-export-content td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            .pdf-export-content th { background: #f4f4f4; font-weight: bold; }
            .pdf-export-content img {
              max-width: 100%;
              height: auto;
              max-height: 90vh;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            .pdf-export-content h1, 
            .pdf-export-content h2, 
            .pdf-export-content h3,
            .pdf-export-content h4,
            .pdf-export-content h5,
            .pdf-export-content h6 {
              page-break-inside: avoid;
              page-break-after: avoid;
              font-weight: 800;
              margin-top: 24px;
              margin-bottom: 12px;
            }
            .pdf-export-content strong,
            .pdf-export-content b {
              font-weight: 800;
            }
            .math-block {
              font-family: "Courier New", monospace;
              line-height: 1.6;
              margin: 12px 0;
            }
            .katex-display { 
              margin: 16px 0; 
              page-break-inside: avoid;
            }
          </style>
          <div class="pdf-export-content" style="font-family: ${fontFamily}; font-size: ${fontSize}pt; color: #000000;">${processedHtml}</div>
        `;
      } else {
        htmlContent += `<div style="white-space: pre-wrap; word-wrap: break-word; color: #000000;">${escapeHtml(textContent).replace(/\n/g, '<br>')}</div>`;
      }
      
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      
      const opt = {
        margin: 10,
        filename: titleText ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf' : 'document.pdf',
        html2canvas: { 
          scale: 2.5, 
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: true,
          allowTaint: true
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: pageOrientation === 'landscape' ? 'landscape' : 'portrait',
          compress: true
        },
        pagebreak: {
          mode: ["avoid-all", "css", "legacy"]
        }
      };

      // Add a small delay to ensure styles and KaTeX are fully rendered
      await new Promise(r => setTimeout(r, 500));

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
      question: "How do I convert text to PDF online for free?",
      answer: "Simply paste your text into the editor, customize the formatting if needed, and click 'Download PDF'. The conversion happens instantly in your browser."
    },
    {
      question: "Can I convert a TXT file to PDF?",
      answer: "Yes, you can copy the content of your TXT file, paste it here, and convert it to a professionally formatted PDF document."
    },
    {
      question: "Does the tool support Markdown formatting?",
      answer: "Absolutely! We have full support for Markdown, allowing you to use bold, italics, headers, lists, and even tables and math equations."
    },
    {
      question: "Can I include images inside the PDF?",
      answer: "Yes, when using Markdown mode, you can include images using standard Markdown syntax which will be rendered in your final PDF."
    },
    {
      question: "Can I convert text to PDF on mobile?",
      answer: "Yes, Pixocraft Text to PDF is fully responsive and works perfectly on smartphones and tablets."
    },
    {
      question: "Is my text stored anywhere?",
      answer: "No. All processing happens locally in your browser. Your data never leaves your device and is never stored on our servers."
    }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixocraft Text to PDF Converter",
    "operatingSystem": "Web Browser",
    "applicationCategory": "Utility",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = generateFAQSchema(faqItems);

  const sampleText = `### Markdown Test
This is **bold**, *italic*, and ~~strikethrough text~~.

---

> This is a blockquote used to test markdown rendering.

---

| ID | Tool | Category | Status |
|---|---|---|---|
| 1 | PDF | Office | Active |
| 2 | Text | Utility | Pending |

#### Code Block Test
\`\`\`javascript
function paginationTest(){
 console.log("Testing Pixocraft pagination engine");
 return true;
}
\`\`\`

#### Math Rendering
Inline math: $E = mc^2$

Display math:
$$ x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a} $$
`;

  const MarkdownPreview = ({ content }: { content: string }) => {
    const [htmlContent, setHtmlContent] = useState("");

    const renderMarkdown = async () => {
      marked.setOptions({
        gfm: true,
        breaks: true
      });
      let html = await marked(content);
      html = html.replace(/<br\s*\/?>/g, "");
      
      // Basic regex for preview math (simple version)
      html = html.replace(/\$\$(.*?)\$\$/g, (match, math) => {
        try {
          return katex.renderToString(math, { displayMode: true, throwOnError: false });
        } catch (e) { return match; }
      });
      html = html.replace(/\$(.*?)\$/g, (match, math) => {
        try {
          return katex.renderToString(math, { displayMode: false, throwOnError: false });
        } catch (e) { return match; }
      });

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
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm flex items-center gap-2 text-muted-foreground/80">
            <Link href="/" className="hover:text-primary transition-colors" data-testid="link-home">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools" className="hover:text-primary transition-colors" data-testid="link-tools">Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-medium">Text to PDF</span>
          </div>

          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center mb-2">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                <FileText className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Convert Text to Professional PDF
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform plain text into high-quality, professionally formatted PDF documents instantly. 
                <span className="block mt-1 font-medium text-primary/80 text-lg">100% Private • Offline • Free</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Markdown Support
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Math Equations
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Image Embedding
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Custom Fonts
              </Badge>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-6">
                {/* Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Formatting Options</CardTitle>
                    <CardDescription>Customize your PDF appearance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-foreground">Filename (Optional)</label>
                      <Input
                        placeholder="Enter filename..."
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        data-testid="input-filename"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-foreground">Font Family</label>
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
                            <SelectItem value="Impact">Impact</SelectItem>
                            <SelectItem value="Tahoma">Tahoma</SelectItem>
                            <SelectItem value="Trebuchet MS">Trebuchet MS</SelectItem>
                            <SelectItem value="Palatino Linotype">Palatino</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block text-foreground">Font Size (pt)</label>
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
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="markdown-toggle"
                          checked={isMarkdown}
                          onCheckedChange={(checked) => setIsMarkdown(checked as boolean)}
                          data-testid="checkbox-markdown"
                        />
                        <label htmlFor="markdown-toggle" className="text-sm font-medium cursor-pointer text-foreground">
                          Markdown
                        </label>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTextContent(sampleText)}
                        data-testid="button-sample"
                        className="text-xs"
                      >
                        Load Sample
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={convertToPDF}
                        disabled={converting || !textContent.trim()}
                        className="flex-1"
                        data-testid="button-convert"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        {converting ? "Converting..." : "Download PDF"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Text Input */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
                    <div>
                      <CardTitle>Text Input</CardTitle>
                      <CardDescription>Enter content below</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTextContent("")}
                      data-testid="button-clear"
                    >
                      Clear
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Paste your text here or load a sample..."
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="font-mono text-sm min-h-[400px] lg:min-h-[500px]"
                      data-testid="textarea-text"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Preview */}
              <div className="lg:sticky lg:top-6">
                <Card className="flex flex-col h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
                    <CardTitle>Live Preview</CardTitle>
                    <Badge variant="outline">{isMarkdown ? "Markdown" : "Plain Text"}</Badge>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div 
                      className="border rounded-lg p-6 bg-white text-black overflow-y-auto h-[500px] lg:h-[700px] prose prose-sm max-w-none scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40"
                      style={{
                        fontFamily: fontFamily,
                        fontSize: fontSize + "pt",
                        lineHeight: "1.6"
                      }}
                      data-testid="preview-text"
                    >
                      {textContent ? (
                        isMarkdown ? (
                          <MarkdownPreview content={textContent} />
                        ) : (
                          <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "#000000" }}>
                            {textContent}
                          </div>
                        )
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50 italic space-y-4">
                          <Eye className="w-12 h-12 opacity-20" />
                          <p>Preview will appear here...</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* SEO Sections */}
            <div className="mt-32 space-y-32 max-w-5xl mx-auto">
              {/* Introduction */}
              <section className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-primary/20 rounded-full hidden md:block" />
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">What is a Text to PDF Converter?</h2>
                  <div className="prose prose-lg prose-gray dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    <p>
                      A Text to PDF converter is a specialized utility that transforms plain text data into a Portable Document Format (PDF). While simple text files are great for storage and basic editing, they lack the structural integrity and visual consistency required for professional communication. Our tool bridges this gap by allowing you to paste any text—including structured Markdown—and generate a high-quality PDF document instantly.
                    </p>
                    <p>
                      One of the primary advantages of converting text to PDF is cross-device compatibility. Unlike standard text editors which might display fonts or spacing differently depending on the operating system, a PDF preserves the exact layout, ensuring that your document looks identical whether it's viewed on a Windows PC, a Mac, or a mobile device. This document preservation is critical for assignments, contracts, and research notes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Key Features */}
              <section className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Powerful Features for Professionals</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to create perfect documents directly in your browser.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Instant Conversion", desc: "Get your PDF in seconds with our optimized processing engine.", icon: Download },
                    { title: "Markdown Support", desc: "Use familiar Markdown syntax for rich text formatting.", icon: FileText },
                    { title: "Image Embedding", desc: "Easily include visual references directly within your documents.", icon: Eye },
                    { title: "Structured Content", desc: "Support for tables, lists, and hierarchical headings.", icon: FileText },
                    { title: "Mathematical Equations", desc: "Render complex formulas with built-in KaTeX support.", icon: FileText },
                    { title: "Custom Fonts", desc: "Choose from a wide range of professional typography options.", icon: FileText },
                  ].map((feature, idx) => (
                    <Card key={idx} className="hover-elevate border-primary/5 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/20">
                      <CardHeader className="pb-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                          <feature.icon className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* How to Use - Visual Flow */}
              <section className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative space-y-12">
                  <h2 className="text-3xl font-bold text-center tracking-tight text-foreground">Simple 4-Step Process</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {[
                      { step: "01", title: "Input Content", desc: "Paste or type your text into the editor" },
                      { step: "02", title: "Format", desc: "Enable Markdown or customize fonts" },
                      { step: "03", title: "Preview", desc: "Check your document in real-time" },
                      { step: "04", title: "Download", desc: "Save your professional PDF file" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                        <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-black shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                          {item.step}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Use Case Section */}
              <section className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Common Use Cases</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">Discover how professionals and students are using our converter.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Students", desc: "Converting assignments and essays for professional submission." },
                    { title: "Freelancers", desc: "Exporting clean contracts and project proposals." },
                    { title: "Researchers", desc: "Saving technical notes with complex math formulas." },
                    { title: "Business Owners", desc: "Creating quick internal documents and memos." },
                    { title: "Developers", desc: "Exporting README files and documentation as PDFs." },
                    { title: "Writers", desc: "Transforming drafts into readable manuscript formats." },
                  ].map((useCase, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-lg text-foreground">{useCase.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{useCase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Privacy - Bold Highlight */}
              <section className="relative py-12">
                <div className="absolute inset-0 bg-primary/[0.03] rounded-[2rem] -rotate-1" />
                <div className="relative p-8 md:p-12 text-center space-y-6">
                  <Badge variant="outline" className="text-primary border-primary/20 px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">Privacy First</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">100% Private & Secure Conversion</h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Your documents never leave your computer. All processing happens locally in your browser session using secure client-side technology. 
                    <span className="font-semibold text-foreground"> No uploads. No tracking. No storage.</span>
                  </p>
                </div>
              </section>

              {/* FAQ Section - Clean Accordion Style */}
              <section className="space-y-12">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-foreground">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {faqItems.map((faq, idx) => (
                    <div key={idx} className="space-y-3 group">
                      <h3 className="font-bold text-xl flex items-start gap-3 text-foreground">
                        <span className="text-primary mt-1">Q.</span>
                        {faq.question}
                      </h3>
                      <div className="pl-8">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Tools - Grid */}
              <section className="pt-20 border-t border-primary/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Related PDF Tools</h2>
                    <p className="text-muted-foreground">Check out our other free productivity tools.</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["HTML to PDF", "PDF Merger", "PDF Splitter", "Image to PDF", "PDF Compressor"].map((tool) => (
                      <Link key={tool} href="/tools/pdf" className="px-5 py-2 rounded-xl border bg-background hover:bg-muted transition-colors font-medium shadow-sm hover:shadow-md text-foreground">
                        {tool}
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
