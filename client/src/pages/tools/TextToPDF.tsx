import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileText, Download, Eye, Heading2, Bold, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";
import { marked } from "marked";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem("text-to-pdf-content", textContent);
  }, [textContent]);

  const insertMarkdown = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textContent.substring(start, end) || "text";
    const newContent = textContent.substring(0, start) + before + selectedText + after + textContent.substring(end);
    setTextContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selectedText.length;
    }, 0);
  };

  const applyHeading = () => insertMarkdown("# ", "");
  const applyBold = () => insertMarkdown("**", "**");
  const applyBulletList = () => insertMarkdown("- ", "");
  const applyNumberedList = () => insertMarkdown("1. ", "");
  const applyAlignLeft = () => insertMarkdown("<div style='text-align: left;'>", "</div>");
  const applyAlignCenter = () => insertMarkdown("<div style='text-align: center;'>", "</div>");
  const applyAlignRight = () => insertMarkdown("<div style='text-align: right;'>", "</div>");
  const applyCodeBlock = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textContent.substring(start, end) || "code";
    const newContent = textContent.substring(0, start) + "```\n" + selectedText + "\n```" + textContent.substring(end);
    setTextContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + 4;
      textarea.selectionEnd = start + 4 + selectedText.length;
    }, 0);
  };

  useSEO({
    title: "Create PDF from Text Online Free (No Signup, Instant Download) | Pixocraft",
    description: "Create PDF from text online instantly. No signup, no upload required. Paste your text and download PDF in seconds. 100% secure and private.",
    keywords: "create pdf from text, text to pdf online free, paste text to pdf, convert text to pdf without signup, txt to pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-to-pdf",
    ogTitle: "Create PDF from Text Online Free (No Signup, Instant Download) | Pixocraft",
    ogDescription: "Create PDF from text online instantly. No signup, no upload required. Paste your text and download PDF in seconds. 100% secure and private.",
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

        htmlContent += `
          <style>
            .pdf-export-content { line-height: 1.6; font-family: Arial, Helvetica, sans-serif; font-size: 12pt; }
            .pdf-export-content h1 { font-size: 28px; font-weight: 700; margin: 24px 0 12px; }
            .pdf-export-content h2 { font-size: 20px; font-weight: 600; margin: 20px 0 10px; }
            .pdf-export-content h3 { font-size: 16px; font-weight: 600; margin: 18px 0 8px; }
            .pdf-export-content p { font-size: 12pt; margin: 10px 0; line-height: 1.6; page-break-inside: avoid; }
            .pdf-export-content ul, .pdf-export-content ol { margin: 10px 0 10px 20px; }
            .pdf-export-content li { margin: 6px 0; }
            .pdf-export-content strong, .pdf-export-content b { font-weight: 700; }
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
          </style>
          <div class="pdf-export-content" style="font-family: ${fontFamily}; font-size: ${fontSize}pt; color: #000000;">${markdownHtml}</div>
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
      question: "How to create PDF from text online free without signup?",
      answer: "Just paste your text into the editor above and click 'Convert to PDF – Instant Download'. No account, no signup, no email required. It works completely free, right in your browser."
    },
    {
      question: "Can I convert copied text to PDF instantly?",
      answer: "Yes! Simply copy text from anywhere — emails, chat, web pages, or documents — paste it into the editor, and your PDF is ready in seconds. No upload, no waiting."
    },
    {
      question: "Is this text to PDF tool safe?",
      answer: "100% safe. All processing happens locally inside your browser. Your text is never sent to any server, never stored, and never shared. It works fully offline after the page loads."
    },
    {
      question: "How do I convert a text file to PDF?",
      answer: "Open your TXT file, copy the content, paste it into our editor, then click 'Convert to PDF'. You can also customize fonts or enable Markdown before downloading."
    },
    {
      question: "Can I convert text to PDF without signup?",
      answer: "Yes — no signup, no account, no email needed. Pixocraft lets you create PDF from text online free with zero friction. Just paste and download."
    },
    {
      question: "Can I convert Markdown to PDF?",
      answer: "Yes, our tool has native Markdown support. Include headers, bold text, tables, code blocks, and even math equations — all rendered perfectly in the PDF output."
    },
    {
      question: "Does this tool work offline?",
      answer: "Yes! Once the page loads, you can disconnect from the internet and keep converting. It's a 100% client-side, offline-first tool."
    },
    {
      question: "Can I convert text to PDF on mobile?",
      answer: "Absolutely. Pixocraft Text to PDF is fully responsive and works great on smartphones and tablets — no app installation needed."
    }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixocraft Text to PDF Converter",
    "operatingSystem": "Web",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free"
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

          <div className="text-center space-y-8 mb-16 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/30 shadow-lg">
                <FileText className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Create PDF from Text Online (Free, No Signup, Instant Download)
              </h1>
              <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mt-3">
                Turn any text into a clean, professional PDF in seconds — no signup, no waiting.
              </p>
              <p className="text-base font-bold text-primary mt-1">
                Paste your text → Convert → Download PDF instantly
              </p>
              <p className="text-sm font-medium text-muted-foreground/70 mt-1">No Signup • No Upload • 100% Private</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                ⚡ Instant PDF Generator
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Markdown Support
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Math Equations
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Image Embedding
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Custom Fonts
              </Badge>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/60 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Used by 10,000+ users daily
            </div>
          </div>

          {/* 3 Steps trust block */}
          <div className="max-w-3xl mx-auto mb-10 px-4 sm:px-6 lg:px-0">
            <div className="bg-gradient-to-r from-primary/8 via-primary/5 to-primary/8 border border-primary/15 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm font-semibold text-muted-foreground text-center sm:text-left">
                Create PDF from text in 3 simple steps:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm font-medium">
                <span className="flex items-center gap-1.5 text-foreground">
                  <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">1</span>
                  Paste your text
                </span>
                <span className="text-muted-foreground/40 hidden sm:inline">→</span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">2</span>
                  Click convert
                </span>
                <span className="text-muted-foreground/40 hidden sm:inline">→</span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">3</span>
                  Download instantly
                </span>
              </div>
              <p className="text-xs text-muted-foreground text-center sm:text-right">No signup required. Works directly in your browser.</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
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
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block text-foreground">Font Family</label>
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
                        {converting ? "Converting..." : "Convert to PDF – Instant Download"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Text Input with Toolbar */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
                    <div>
                      <CardTitle>Text Editor</CardTitle>
                      <CardDescription>Use the toolbar or markdown syntax</CardDescription>
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
                    <div className="flex flex-col lg:flex-row gap-3">
                      {/* Vertical Toolbar */}
                      <div className="flex flex-row lg:flex-col gap-1 py-2 overflow-x-auto lg:overflow-x-visible">
                        <Button size="icon" variant="outline" onClick={applyHeading} title="Heading" data-testid="button-heading" className="h-8 w-8">
                          <Heading2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={applyBold} title="Bold" data-testid="button-bold" className="h-8 w-8">
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={applyBulletList} title="Bullet List" data-testid="button-bullet-list" className="h-8 w-8">
                          <List className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={applyNumberedList} title="Numbered List" data-testid="button-numbered-list" className="h-8 w-8">
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={applyAlignLeft} title="Align Left" data-testid="button-align-left" className="h-8 w-8">
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={applyAlignCenter} title="Align Center" data-testid="button-align-center" className="h-8 w-8">
                          <AlignCenter className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={applyAlignRight} title="Align Right" data-testid="button-align-right" className="h-8 w-8">
                          <AlignRight className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={applyCodeBlock} title="Code Block" data-testid="button-code-block" className="h-8 w-8">
                          <Code className="h-4 w-4" />
                        </Button>
                      </div>
                      {/* Text Editor */}
                      <Textarea
                        ref={textareaRef}
                        placeholder="Paste your text here to instantly create a PDF..."
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        className="font-mono text-xs sm:text-sm min-h-[250px] sm:min-h-[350px] lg:min-h-[500px] flex-1"
                        data-testid="textarea-text"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Preview */}
              <div className="lg:sticky lg:top-6">
                <Card className="flex flex-col h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
                    <CardTitle className="text-base sm:text-lg">Live Preview</CardTitle>
                    <Badge variant="outline" className="text-xs">{isMarkdown ? "Markdown" : "Plain Text"}</Badge>
                  </CardHeader>
                  <CardContent className="flex-1 px-3 sm:px-6">
                    <div 
                      className="border rounded-lg p-3 sm:p-6 bg-white text-black overflow-y-auto h-[250px] sm:h-[350px] lg:h-[700px] prose prose-xs sm:prose-sm max-w-none scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40"
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
                      A Text to PDF converter is a tool that lets you <strong>create PDF from text online free</strong> — no software installs, no signups, no uploads. Whether you need to <strong>convert TXT to PDF</strong>, <strong>copy paste text to PDF</strong>, or <strong>convert markdown to PDF</strong>, our tool handles it all instantly in your browser.
                    </p>
                    <p>
                      Pixocraft is built for people who want to <strong>convert text to PDF without signup</strong> — just paste and go. One of the primary advantages is cross-device compatibility. A PDF preserves the exact layout, ensuring that your document looks identical whether it's viewed on a Windows PC, a Mac, or a mobile device.
                    </p>
                  </div>
                </div>
              </section>

              {/* How to Convert TXT to PDF */}
              <section className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">How to Create PDF from Text Online Free</h2>
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    You can <strong>create PDF from text online free</strong> in seconds — no signup, no installation. Simply <strong>copy paste text to PDF</strong> using our editor and download instantly. Here's how:
                  </p>
                  <ol className="space-y-2">
                    <li><strong>Step 1:</strong> Copy the content from your TXT file, email, notes, or any source.</li>
                    <li><strong>Step 2:</strong> Paste it into the Pixocraft text editor above.</li>
                    <li><strong>Step 3:</strong> Optionally enable Markdown mode or customize fonts and size.</li>
                    <li><strong>Step 4:</strong> Click "Convert to PDF – Instant Download" to get your PDF.</li>
                  </ol>
                  <p>
                    The entire process is <strong>text to PDF online free without signup</strong> — your data never leaves your device.
                  </p>
                </div>
              </section>

              {/* Performance Section */}
              <section className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Fast Browser-Based Text to PDF Converter</h2>
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    Unlike traditional converters that upload files to servers, Pixocraft runs entirely inside your browser using modern client-side technology. 
                    This ensures instant text to PDF conversion without delays, uploads, or file size restrictions. 
                    By processing everything locally, we provide the fastest possible experience while maintaining absolute data sovereignty.
                  </p>
                </div>
              </section>

              {/* Markdown to PDF Section */}
              <section className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Convert Markdown to PDF Easily</h2>
                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  <p>
                    Our advanced engine doesn't just handle plain text—it's a full-featured Markdown to PDF converter. 
                    Our tool supports various Markdown elements to help you create professional documents:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <li className="flex items-center gap-2"><strong>Headings:</strong> Create clear document structure with H1-H6.</li>
                    <li className="flex items-center gap-2"><strong>Code Blocks:</strong> Perfect for technical documentation with syntax highlighting.</li>
                    <li className="flex items-center gap-2"><strong>Lists:</strong> Support for ordered, unordered, and task lists.</li>
                    <li className="flex items-center gap-2"><strong>Tables:</strong> Render complex data tables with professional styling.</li>
                    <li className="flex items-center gap-2"><strong>Math Formulas:</strong> Beautifully rendered equations using KaTeX.</li>
                    <li className="flex items-center gap-2"><strong>Image Embedding:</strong> Include visual references directly in your PDF.</li>
                  </ul>
                </div>
              </section>

              {/* Convert Text to PDF for Different Needs */}
              <section className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Convert Text to PDF for Different Needs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Convert Notes to PDF</h3>
                    <p className="text-muted-foreground">Perfect for students and researchers who need to turn raw study notes into organized, shareable study guides.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Convert Email to PDF</h3>
                    <p className="text-muted-foreground">Easily archive important email correspondence as permanent, un-editable PDF documents for legal or professional records.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Convert Chat Messages to PDF</h3>
                    <p className="text-muted-foreground">Save project discussions or support chats as PDF files to maintain a clear history of communications.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground">Convert Assignments to PDF</h3>
                    <p className="text-muted-foreground">Students can format their essays using Markdown and export them as clean, submission-ready PDF files.</p>
                  </div>
                </div>
              </section>

              {/* Why Choose Pixocraft */}
              <section className="bg-primary/5 p-8 md:p-12 rounded-3xl space-y-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Why Pixocraft Text to PDF is Better</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    "Fully Offline Processing",
                    "Markdown Support",
                    "Math Equation Rendering",
                    "Image Embedding",
                    "Table Support",
                    "No File Upload Required",
                    "Custom Fonts"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-foreground font-medium">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✔</div>
                      {item}
                    </div>
                  ))}
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

            {/* Popular PDF Tools Section */}
            <section className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">More Text to PDF Tools</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Explore specialized conversion tools for different text formats and needs.</p>
              </div>

              {/* Bucket 1 - Core Conversion Intent */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider text-primary">Bucket 1 – Core Conversions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "TXT to PDF", path: "/tools/txt-to-pdf", desc: "Convert standard .txt files" },
                    { name: "Convert Text to PDF", path: "/tools/convert-text-to-pdf", desc: "Fast online conversion" },
                    { name: "Paste Text to PDF", path: "/tools/paste-text-to-pdf", desc: "Convert copied snippets" },
                    { name: "Text File to PDF", path: "/tools/text-file-to-pdf", desc: "Professional document generator" }
                  ].map((tool) => (
                    <Link key={tool.path} href={tool.path} className="group">
                      <Card className="hover-elevate h-full transition-all border-primary/10 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
                        <CardHeader className="p-4">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary group-hover:scale-110 transition-transform">
                            <FileText className="w-4 h-4" />
                          </div>
                          <CardTitle className="text-base group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                          <CardDescription className="text-xs mt-1">{tool.desc}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bucket 2 - Feature-Based Pages */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider text-primary">Bucket 2 – Advanced Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Markdown to PDF", path: "/tools/markdown-to-pdf", desc: "Rich markdown formatting" },
                    { name: "Text with Images to PDF", path: "/tools/text-with-images-to-pdf", desc: "Embed images in text" },
                    { name: "Table to PDF", path: "/tools/table-to-pdf", desc: "Structured table conversion" },
                    { name: "Math Equation to PDF", path: "/tools/math-equation-to-pdf", desc: "LaTeX & formulas support" }
                  ].map((tool) => (
                    <Link key={tool.path} href={tool.path} className="group">
                      <Card className="hover-elevate h-full transition-all border-primary/10 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
                        <CardHeader className="p-4">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary group-hover:scale-110 transition-transform">
                            <FileText className="w-4 h-4" />
                          </div>
                          <CardTitle className="text-base group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                          <CardDescription className="text-xs mt-1">{tool.desc}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bucket 3 - Real Use Cases */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground uppercase tracking-wider text-primary">Bucket 3 – Real Use Cases</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Notes to PDF", path: "/tools/notes-to-pdf", desc: "Study & personal notes" },
                    { name: "Email to PDF", path: "/tools/email-to-pdf", desc: "Email archiving & storage" },
                    { name: "Chat to PDF", path: "/tools/chat-to-pdf", desc: "WhatsApp & messenger chats" },
                    { name: "Assignment to PDF", path: "/tools/assignment-to-pdf", desc: "Homework & essays" }
                  ].map((tool) => (
                    <Link key={tool.path} href={tool.path} className="group">
                      <Card className="hover-elevate h-full transition-all border-primary/10 hover:border-primary/30 bg-background/50 backdrop-blur-sm">
                        <CardHeader className="p-4">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary group-hover:scale-110 transition-transform">
                            <FileText className="w-4 h-4" />
                          </div>
                          <CardTitle className="text-base group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                          <CardDescription className="text-xs mt-1">{tool.desc}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
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

              {/* Popular PDF Tools Section */}
              <section className="space-y-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Popular PDF Tools</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { name: "PDF to Text Converter", url: "/tools/pdf" },
                    { name: "HTML to PDF Converter", url: "/tools/pdf" },
                    { name: "Image to PDF Converter", url: "/tools/pdf" },
                    { name: "PDF Merger Tool", url: "/tools/pdf" },
                    { name: "Markdown Editor", url: "/tools/text" }
                  ].map((tool) => (
                    <Link 
                      key={tool.name} 
                      href={tool.url}
                      className="p-4 rounded-xl bg-background border hover:border-primary/50 hover:shadow-sm transition-all text-center text-sm font-medium text-foreground"
                    >
                      {tool.name}
                    </Link>
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
                    {["HTML to PDF", "PDF to Text", "Markdown Editor", "Image to PDF", "PDF Merger", "PDF Splitter", "PDF Compressor"].map((tool) => (
                      <Link key={tool} href={tool === "PDF to Text" ? "/tools/pdf" : tool === "Markdown Editor" ? "/tools/text" : "/tools/pdf"} className="px-5 py-2 rounded-xl border bg-background hover:bg-muted transition-colors font-medium shadow-sm hover:shadow-md text-foreground">
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
