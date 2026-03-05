import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileText, Download, Eye, AlertCircle, Image as ImageIcon, Code, Type, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";
import { marked } from "marked";
import katex from "katex";

declare global {
  interface Window {
    renderMathInElement: any;
    Prism: any;
  }
}

export default function TextToPDF() {
  const [textContent, setTextContent] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("text-to-pdf-content") || "";
    }
    return "";
  });
  const [converting, setConverting] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("text-to-pdf-font-size") || "12";
    }
    return "12";
  });
  const [fontFamily, setFontFamily] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("text-to-pdf-font-family") || "Arial";
    }
    return "Arial";
  });
  const [titleText, setTitleText] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("text-to-pdf-title") || "";
    }
    return "";
  });
  const [pageOrientation, setPageOrientation] = useState("portrait");
  const [isMarkdown, setIsMarkdown] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("text-to-pdf-is-markdown");
      return saved !== null ? saved === "true" : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem("text-to-pdf-content", textContent);
  }, [textContent]);

  useEffect(() => {
    localStorage.setItem("text-to-pdf-title", titleText);
  }, [titleText]);

  useEffect(() => {
    localStorage.setItem("text-to-pdf-font-size", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("text-to-pdf-font-family", fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem("text-to-pdf-is-markdown", isMarkdown.toString());
  }, [isMarkdown]);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [renderedHtml, setRenderedHtml] = useState("");

  const PAGE_HEIGHT = 1123; // A4 height in pixels at 96 DPI
  const PAGE_WIDTH = 794;   // A4 width in pixels at 96 DPI

  useEffect(() => {
    const timer = setTimeout(async () => {
      const html = isMarkdown ? await marked(textContent) : `<div style="white-space: pre-wrap;">${textContent}</div>`;
      setRenderedHtml(html);
    }, 300);
    return () => clearTimeout(timer);
  }, [textContent, isMarkdown]);

  useEffect(() => {
    const calculatePages = () => {
      if (!previewRef.current) return;
      // Use a hidden element to measure the actual content height
      const measureEl = document.createElement('div');
      measureEl.style.width = `${PAGE_WIDTH - 80}px`; // Accounting for 40px padding on each side
      measureEl.style.visibility = 'hidden';
      measureEl.style.position = 'absolute';
      measureEl.style.fontFamily = fontFamily === "Arial" ? '"Helvetica", "Arial", sans-serif' : fontFamily;
      measureEl.style.fontSize = fontSize + "pt";
      measureEl.style.lineHeight = "1.6";
      measureEl.className = "markdown-body prose prose-slate max-w-none text-black";
      
      let fullHtml = "";
      if (titleText) {
        fullHtml += `<h1 style="text-align: center; font-bold border-b pb-4 mb-6; font-size: ${parseInt(fontSize) + 12}pt;">${titleText}</h1>`;
      }
      fullHtml += renderedHtml;
      measureEl.innerHTML = fullHtml;
      
      document.body.appendChild(measureEl);
      const contentHeight = measureEl.scrollHeight;
      document.body.removeChild(measureEl);
      
      const pages = Math.max(1, Math.ceil(contentHeight / (PAGE_HEIGHT - 80))); // Accounting for vertical padding
      setTotalPages(pages);
    };

    calculatePages();
  }, [renderedHtml, titleText, fontSize, fontFamily]);

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadStyle = (href: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve();
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = () => resolve();
      link.onerror = reject;
      document.head.appendChild(link);
    });
  };

  useEffect(() => {
    const initLibraries = async () => {
      try {
        await Promise.all([
          loadStyle("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css"),
          loadStyle("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css"),
          loadScript("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"),
          loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"),
        ]);
        await Promise.all([
          loadScript("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"),
          loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js"),
          loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js"),
          loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-json.min.js"),
        ]);
      } catch (e) {
        console.error("Library loading error:", e);
      }
    };
    initLibraries();
  }, []);

  useEffect(() => {
    const renderContent = async () => {
      if (showPreview && previewRef.current) {
        if (window.renderMathInElement) {
          window.renderMathInElement(previewRef.current, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true }
            ],
            throwOnError: false
          });
        }
        if (window.Prism) {
          window.Prism.highlightAllUnder(previewRef.current);
        }
      }
    };
    renderContent();
  }, [showPreview, textContent, isMarkdown, fontSize, fontFamily]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const imageMarkdown = `\n![${file.name}](${base64})\n`;
      setTextContent(prev => prev + imageMarkdown);
      toast({ title: "Image added", description: "Image inserted at the end of text" });
    };
    reader.readAsDataURL(file);
  };

  const convertToPDF = async () => {
    if (!textContent.trim()) {
      toast({ title: "Error", description: "Please enter text content to convert", variant: "destructive" });
      return;
    }

    setConverting(true);
    try {
      const element = document.createElement('div');
      element.className = "pdf-content-wrapper";
      element.style.fontFamily = fontFamily === "Arial" ? '"Helvetica", "Arial", sans-serif' : fontFamily;
      element.style.fontSize = fontSize + "pt";
      element.style.lineHeight = "1.6";
      element.style.padding = "40px";
      element.style.backgroundColor = "#ffffff";
      element.style.color = "#000000";
      element.style.width = "794px"; // Match A4 pixel width at 96 DPI
      element.style.boxSizing = "border-box";

      const style = document.createElement('style');
      style.textContent = `
        .pdf-content-wrapper { color: black !important; width: 794px !important; padding: 40px !important; box-sizing: border-box !important; overflow-wrap: break-word; }
        .pdf-content-wrapper * { max-width: 100% !important; box-sizing: border-box !important; }
        .pdf-content-wrapper table { border-collapse: collapse; width: 100% !important; margin: 20px 0; table-layout: fixed; border: 1px solid #000; }
        .pdf-content-wrapper th, .pdf-content-wrapper td { border: 1px solid #000; padding: 12px; text-align: left; word-break: break-word; }
        .pdf-content-wrapper pre { background-color: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #e9ecef; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; margin: 20px 0; max-width: 100%; }
        .katex-display { max-width: 100%; overflow-x: auto; overflow-y: hidden; }
        .pdf-content-wrapper img { max-width: 100%; height: auto; display: block; margin: 16px auto; border-radius: 4px; page-break-inside: avoid; }
      `;
        .katex { font-size: 1.1em !important; }
        /* Prism styles for PDF */
        .token.comment { color: #708090; }
        .token.string { color: #690; }
        .token.keyword { color: #07a; font-weight: bold; }
        .token.function { color: #dd4a68; }
        .token.operator { color: #9a6e3a; }
      `;
      document.head.appendChild(style);

      let htmlContent = "";
      if (titleText) {
        htmlContent += `<h1 style="text-align: center; margin-bottom: 30px; font-size: ${parseInt(fontSize) + 12}pt; font-weight: bold;">${escapeHtml(titleText)}</h1>`;
      }
      
      if (isMarkdown) {
        htmlContent += marked(textContent);
      } else {
        htmlContent += `<div style="white-space: pre-wrap;">${escapeHtml(textContent).replace(/\n/g, '<br>')}</div>`;
      }
      
      element.innerHTML = htmlContent;

      // Add crossOrigin="anonymous" to all images
      const images = element.getElementsByTagName('img');
      const imagePromises = Array.from(images).map(img => {
        img.crossOrigin = "anonymous";
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(null);
          } else {
            img.onload = () => resolve(null);
            img.onerror = () => resolve(null); // Continue even if image fails
          }
        });
      });

      document.body.appendChild(element);

      // Wait for all images to load
      await Promise.all(imagePromises);

      if (window.renderMathInElement) {
        window.renderMathInElement(element, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false },
            { left: "\\(", right: "\\)", display: false },
            { left: "\\[", right: "\\]", display: true }
          ],
          throwOnError: false
        });
      }
      if (window.Prism) {
        window.Prism.highlightAllUnder(element);
      }

      const opt = {
        margin: [15, 15, 15, 15],
        filename: titleText ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf' : 'professional-document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          allowTaint: true,
          letterRendering: true, 
          backgroundColor: '#ffffff' 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: pageOrientation, compress: true },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);
      document.head.removeChild(style);
      toast({ title: "Success!", description: "High-quality PDF generated successfully" });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({ title: "Error", description: "Failed to generate PDF", variant: "destructive" });
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

  const sampleText = `# Advanced PDF Generation Sample

## 1. Mathematical Equations (KaTeX)
The tool supports professional LaTeX rendering:

**The Quadratic Formula:**
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

**Euler's Identity:**
$$e^{i\\pi} + 1 = 0$$

## 2. Syntax-Highlighted Code Blocks
Write code in your favorite languages:

\`\`\`javascript
function calculateSum(a, b) {
  console.log("Adding numbers...");
  return a + b;
}
\`\`\`

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
\`\`\`

## 3. Image Support
Embed images using Markdown or HTML:

![Logo](https://tools.pixocraft.in/logo.png)

## 4. Professional Tables
| Feature | Support | Performance |
| :--- | :---: | :--- |
| Markdown | Yes | High |
| KaTeX Math | Yes | Vector |
| Syntax Highlighting | Yes | Prism.js |
| Images | Yes | Static |

## 5. Rich Typography
You can use **bold**, *italic*, ~~strikethrough~~, and [links](https://tools.pixocraft.in).

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

Click the **Download** button to see this document in high-quality PDF format!`;

  const MarkdownPreview = ({ content, html }: { content: string, html: string }) => {
    const previewContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (html && previewContainerRef.current && window.Prism) {
        window.Prism.highlightAllUnder(previewContainerRef.current);
      }
    }, [html]);

    if (!content.trim() && !titleText.trim()) return null;

    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <div 
          key={i} 
          className="pdf-page-preview relative bg-white shadow-lg mx-auto mb-8 border border-gray-200 overflow-hidden"
          style={{
            width: `${PAGE_WIDTH}px`,
            height: `${PAGE_HEIGHT}px`,
            padding: "40px",
            boxSizing: "border-box"
          }}
        >
          <div 
            className="pdf-page-content markdown-body prose prose-slate max-w-none text-black"
            style={{
              transform: `translateY(-${i * (PAGE_HEIGHT - 80)}px)`,
              width: "100%"
            }}
          >
            {i === 0 && titleText && (
              <h1 className="text-center font-bold border-b pb-4 mb-6" style={{ fontSize: (parseInt(fontSize) + 12) + 'pt', color: 'black' }}>
                {titleText}
              </h1>
            )}
            <div dangerouslySetInnerHTML={{ __html: html }} className="text-black" />
          </div>
          <div className="absolute bottom-4 right-8 text-xs text-muted-foreground font-medium bg-white/80 px-2 py-1 rounded">
            Page {i + 1} of {totalPages}
          </div>
        </div>
      );
    }

    return (
      <div className="pdf-preview-container bg-muted/20 p-8 min-h-full overflow-auto" ref={previewContainerRef}>
        <div className="max-w-fit mx-auto">
          {pages}
        </div>
      </div>
    );
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-6 text-sm text-muted-foreground flex items-center gap-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            <span>/</span>
            <span className="text-foreground">Text to PDF</span>
          </div>

          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Advanced Text to PDF Generator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional document creation with Markdown, LaTeX Math, Syntax Highlighting, and Image support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Editor Side */}
            <div className="space-y-4">
              <Card className="h-full flex flex-col border-primary/20">
                <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0 gap-2">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4 text-primary" />
                    <CardTitle className="text-lg">Editor</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8"
                    >
                      <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
                      Add Image
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setTextContent(sampleText)}
                      className="h-8"
                    >
                      Load Sample
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <Textarea
                    placeholder="Write your content here using Markdown or paste your text..."
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    className="w-full h-[600px] border-0 rounded-none focus-visible:ring-0 resize-none font-mono text-sm p-4 bg-muted/30"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Preview Side */}
            <div className="space-y-4">
              <Card className="h-full flex flex-col border-primary/20">
                <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0 gap-2">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <CardTitle className="text-lg">Live Preview</CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-primary/5">Total Pages: {totalPages}</Badge>
                    <Badge variant="outline" className="bg-primary/5">Real-time Rendering</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <div 
                    ref={previewRef}
                    className="w-full h-[600px] overflow-auto bg-muted/10 text-black"
                    style={{
                      fontFamily: fontFamily === "Arial" ? '"Helvetica", "Arial", sans-serif' : fontFamily,
                      fontSize: fontSize + "pt",
                      lineHeight: "1.6"
                    }}
                  >
                    <MarkdownPreview content={textContent} html={renderedHtml} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Controls Bar */}
          <Card className="mb-12 sticky bottom-4 z-50 shadow-lg border-primary/30">
            <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 flex-1">
                <div className="w-48">
                  <Input
                    placeholder="Document Title (Optional)"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                    className="h-9"
                  />
                </div>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger className="w-40 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Sans-Serif</SelectItem>
                    <SelectItem value="Times New Roman">Serif</SelectItem>
                    <SelectItem value="Courier New">Monospace</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger className="w-24 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10pt</SelectItem>
                    <SelectItem value="12">12pt</SelectItem>
                    <SelectItem value="14">14pt</SelectItem>
                    <SelectItem value="16">16pt</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 px-2 border-l pl-4">
                  <Checkbox
                    id="markdown-mode"
                    checked={isMarkdown}
                    onCheckedChange={(checked) => setIsMarkdown(checked as boolean)}
                  />
                  <label htmlFor="markdown-mode" className="text-sm font-medium cursor-pointer">Markdown</label>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setTextContent("")}
                  className="text-muted-foreground h-9"
                >
                  Clear
                </Button>
                <Button
                  onClick={convertToPDF}
                  disabled={converting || !textContent.trim()}
                  size="lg"
                  className="h-10 px-8 font-bold"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {converting ? "Processing..." : "Generate PDF"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-muted/30">
              <CardContent className="p-6 space-y-2">
                <Code className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-bold">Syntax Highlighting</h3>
                <p className="text-sm text-muted-foreground">Beautiful code blocks for JS, Python, HTML, CSS, and more with Prism.js.</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-6 space-y-2">
                <ImageIcon className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-bold">Image Positioning</h3>
                <p className="text-sm text-muted-foreground">Insert images exactly where you want them. Supports drag & drop and local uploads.</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-6 space-y-2">
                <Zap className="h-5 w-5 text-primary mb-2" />
                <h3 className="font-bold">Vector Math</h3>
                <p className="text-sm text-muted-foreground">Crystal clear LaTeX equations that look perfect at any zoom level in your PDF.</p>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-primary mb-1">New Features Available!</p>
                    <p className="text-muted-foreground">This tool now supports <strong>Markdown</strong> and <strong>Math Equations (LaTeX)</strong>. Use <code>$$ ... $$</code> for display math and <code>$ ... $</code> for inline math. Complex tables and Unicode characters are now rendered with high precision.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
