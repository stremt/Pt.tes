import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileText, Download, Eye, Image as ImageIcon, Type, Layout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";
import { marked } from "marked";

declare global {
  interface Window {
    renderMathInElement: any;
    Prism: any;
  }
}

const PAGE_HEIGHT = 1123; // A4 height in pixels at 96 DPI
const PAGE_WIDTH = 794;   // A4 width in pixels at 96 DPI

export default function TextToPDF() {
  const [textContent, setTextContent] = useState(() => localStorage.getItem("text-to-pdf-content") || "");
  const [titleText, setTitleText] = useState(() => localStorage.getItem("text-to-pdf-title") || "");
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("text-to-pdf-font-size") || "12");
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem("text-to-pdf-font-family") || "Arial");
  const [isMarkdown, setIsMarkdown] = useState(() => {
    const saved = localStorage.getItem("text-to-pdf-is-markdown");
    return saved !== null ? saved === "true" : true;
  });
  
  const [converting, setConverting] = useState(false);
  const [renderedHtml, setRenderedHtml] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("text-to-pdf-content", textContent);
    localStorage.setItem("text-to-pdf-title", titleText);
    localStorage.setItem("text-to-pdf-font-size", fontSize);
    localStorage.setItem("text-to-pdf-font-family", fontFamily);
    localStorage.setItem("text-to-pdf-is-markdown", isMarkdown.toString());
  }, [textContent, titleText, fontSize, fontFamily, isMarkdown]);

  // Load external libraries
  useEffect(() => {
    const loadAssets = async () => {
      const loadScript = (src: string) => new Promise((res) => {
        if (document.querySelector(`script[src="${src}"]`)) return res(null);
        const s = document.createElement("script"); s.src = src; s.onload = () => res(null); document.head.appendChild(s);
      });
      const loadStyle = (href: string) => {
        if (document.querySelector(`link[href="${href}"]`)) return;
        const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; document.head.appendChild(l);
      };

      loadStyle("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css");
      loadStyle("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css");
      await loadScript("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-python.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-bash.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-json.min.js");
    };
    loadAssets();
  }, []);

  // Parse Markdown & Update Preview
  useEffect(() => {
    const updatePreview = async () => {
      marked.setOptions({ gfm: true, breaks: true });
      const html = isMarkdown ? await marked.parse(textContent) : `<div style="white-space: pre-wrap;">${textContent}</div>`;
      setRenderedHtml(html);
    };
    const timer = setTimeout(updatePreview, 300);
    return () => clearTimeout(timer);
  }, [textContent, isMarkdown]);

  // Highlight Preview & Calculate Pages
  useEffect(() => {
    if (previewRef.current) {
      if (window.renderMathInElement) window.renderMathInElement(previewRef.current, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        throwOnError: false
      });
      if (window.Prism) window.Prism.highlightAllUnder(previewRef.current);
      
      // Rough page calculation
      const contentHeight = previewRef.current.scrollHeight;
      setTotalPages(Math.max(1, Math.ceil(contentHeight / (PAGE_HEIGHT - 80))));
    }
  }, [renderedHtml, fontSize, fontFamily, titleText]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setTextContent(prev => prev + `\n![${file.name}](${base64})\n`);
      toast({ title: "Image added" });
    };
    reader.readAsDataURL(file);
  };

  const generatePDF = async () => {
    if (!textContent.trim()) return toast({ title: "Error", description: "Please enter content", variant: "destructive" });
    setConverting(true);

    try {
      const exportContainer = document.createElement("div");
      exportContainer.className = "pdf-export-content";
      Object.assign(exportContainer.style, {
        width: `${PAGE_WIDTH}px`,
        padding: "40px",
        background: "white",
        color: "black",
        fontFamily: fontFamily === "Arial" ? '"Helvetica", "Arial", sans-serif' : fontFamily,
        fontSize: `${fontSize}pt`,
        lineHeight: "1.6",
        position: "absolute",
        left: "-9999px",
        top: "0"
      });

      let finalHtml = "";
      if (titleText) finalHtml += `<h1 style="text-align:center;margin-bottom:30px;font-weight:bold;font-size:${parseInt(fontSize) + 12}pt;">${titleText}</h1>`;
      finalHtml += renderedHtml;
      exportContainer.innerHTML = finalHtml;

      const style = document.createElement("style");
      style.innerHTML = `
        .pdf-export-content h1 { font-size: 2em; margin-bottom: 0.5em; font-weight: bold; }
        .pdf-export-content h2 { font-size: 1.5em; margin-top: 1em; font-weight: bold; }
        .pdf-export-content table { border-collapse: collapse; width: 100%; margin: 1em 0; }
        .pdf-export-content th, .pdf-export-content td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        .pdf-export-content pre { background: #f5f5f5; padding: 15px; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word; }
        .pdf-export-content blockquote { border-left: 4px solid #ccc; padding-left: 12px; color: #555; margin: 1em 0; }
        .pdf-export-content img { max-width: 100%; height: auto; display: block; margin: 1em auto; }
        .pdf-export-content code { background: #f0f0f0; padding: 2px 4px; border-radius: 4px; }
      `;
      document.head.appendChild(style);
      document.body.appendChild(exportContainer);

      await document.fonts?.ready;
      
      // Render math with full delimiters
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(exportContainer, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true }
            ],
            throwOnError: false
          });
          // Small delay for KaTeX to finish rendering
          await new Promise(r => setTimeout(r, 200));
        } catch (e) {
          console.warn("Math rendering failed in export", e);
        }
      }

      // Highlight code
      if (window.Prism) {
        try {
          window.Prism.highlightAllUnder(exportContainer);
          // Small delay for Prism to finish rendering
          await new Promise(r => setTimeout(r, 200));
        } catch (e) {
          console.warn("Prism highlighting failed in export", e);
        }
      }

      // Ensure all images are loaded before capture
      const images = Array.from(exportContainer.getElementsByTagName('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }));

      // Force a reflow and ensure content is visible
      exportContainer.offsetHeight;

      // Wait rendering stability
      await new Promise(r => setTimeout(r, 1000));

      const opt = {
        margin: [15, 15],
        filename: titleText ? `${titleText}.pdf` : "document.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          backgroundColor: "#ffffff",
          letterRendering: true,
          logging: true,
          scrollY: 0,
          windowWidth: PAGE_WIDTH,
          removeContainer: false
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"] }
      };

      // Use html2pdf with the container
      const worker = html2pdf().set(opt).from(exportContainer);
      
      // Save the PDF
      await worker.save();

      document.body.removeChild(exportContainer);
      document.head.removeChild(style);
      toast({ title: "Success", description: "PDF generated" });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Generation failed", variant: "destructive" });
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Text to PDF</h1>
                <p className="text-sm text-muted-foreground">Stable Architecture Implementation</p>
              </div>
            </div>
            <Button onClick={generatePDF} disabled={converting} size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              {converting ? "Generating..." : "Generate PDF"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Editor */}
            <Card className="flex flex-col overflow-hidden">
              <CardHeader className="border-b bg-muted/30 py-3">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="markdown" checked={isMarkdown} onCheckedChange={(val) => setIsMarkdown(!!val)} />
                      <label htmlFor="markdown" className="text-sm font-medium">Markdown</label>
                    </div>
                    <Input 
                      placeholder="Document Title" 
                      value={titleText} 
                      onChange={(e) => setTitleText(e.target.value)}
                      className="h-8 w-48 bg-background"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="h-8 w-32 bg-background"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Sans-Serif</SelectItem>
                        <SelectItem value="Times New Roman">Serif</SelectItem>
                        <SelectItem value="Courier New">Monospace</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger className="h-8 w-20 bg-background"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["10", "11", "12", "14", "16", "18"].map(s => <SelectItem key={s} value={s}>{s}pt</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => fileInputRef.current?.click()}>
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1">
                <Textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Enter your content here..."
                  className="h-full w-full resize-none border-0 rounded-none focus-visible:ring-0 p-6 font-mono text-sm bg-muted/10"
                />
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="flex flex-col overflow-hidden bg-muted/20">
              <CardHeader className="border-b bg-muted/30 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm font-medium">Live Preview</CardTitle>
                  </div>
                  <Badge variant="outline" className="bg-background">Pages: {totalPages}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-auto p-8">
                <div className="max-w-fit mx-auto">
                  <div 
                    ref={previewRef}
                    className="bg-white shadow-xl border border-border mx-auto p-[40px] text-black"
                    style={{
                      width: `${PAGE_WIDTH}px`,
                      minHeight: `${PAGE_HEIGHT}px`,
                      fontFamily: fontFamily === "Arial" ? '"Helvetica", "Arial", sans-serif' : fontFamily,
                      fontSize: `${fontSize}pt`,
                      lineHeight: "1.6"
                    }}
                  >
                    {titleText && <h1 className="text-center font-bold border-b pb-4 mb-6" style={{ fontSize: `${parseInt(fontSize) + 12}pt` }}>{titleText}</h1>}
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-black" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
