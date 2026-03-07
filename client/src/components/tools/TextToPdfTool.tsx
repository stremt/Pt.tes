import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex";
import "katex/dist/katex.min.css";

interface TextToPdfToolProps {
  sampleText: string;
  storageKey?: string;
  defaultMarkdown?: boolean;
}

// Initialize markdown-it with KaTeX plugin for math rendering
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  gfm: true,
}).use(markdownItKatex);

export function TextToPdfTool({ 
  sampleText, 
  storageKey = "text-to-pdf-content",
  defaultMarkdown = true 
}: TextToPdfToolProps) {
  const [textContent, setTextContent] = useState(() => {
    return localStorage.getItem(storageKey) || "";
  });
  const [converting, setConverting] = useState(false);
  const [fontSize, setFontSize] = useState("12");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [titleText, setTitleText] = useState("");
  const [pageOrientation, setPageOrientation] = useState("portrait");
  const [isMarkdown, setIsMarkdown] = useState(defaultMarkdown);
  const [showPreview, setShowPreview] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(storageKey, textContent);
  }, [textContent, storageKey]);

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
        // Use markdown-it with KaTeX plugin for proper math rendering
        const processedHtml = md.render(textContent);

        htmlContent += `
          <style>
            body { margin: 0; padding: 0; }
            .pdf-export-content { line-height: 1.6; font-family: Arial, Helvetica, sans-serif; font-size: 12pt; }
            .pdf-export-content h1 { font-size: 28px; font-weight: 700; margin: 24px 0 12px; }
            .pdf-export-content h2 { font-size: 20px; font-weight: 600; margin: 20px 0 10px; }
            .pdf-export-content h3 { font-size: 16px; font-weight: 600; margin: 18px 0 8px; }
            .pdf-export-content h4 { font-size: 14px; font-weight: 600; margin: 16px 0 8px; }
            .pdf-export-content h5, .pdf-export-content h6 { font-size: 12px; font-weight: 600; margin: 12px 0 6px; }
            .pdf-export-content p { font-size: 12pt; margin: 10px 0; line-height: 1.6; page-break-inside: avoid; }
            .pdf-export-content ul, .pdf-export-content ol { margin: 10px 0 10px 20px; }
            .pdf-export-content li { margin: 6px 0; }
            .pdf-export-content del { 
              text-decoration: line-through; 
              text-decoration-thickness: 1.5px;
              text-decoration-color: #000;
            }
            .pdf-export-content hr { 
              border: none; 
              border-top: 1px solid #d0d7de; 
              margin: 28px 0; 
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
              font-size: 11px; 
              line-height: 1.6;
              overflow-x: auto; 
              margin: 20px 0;
              page-break-inside: avoid;
              white-space: pre-wrap;
              word-break: break-all;
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
              page-break-inside: avoid;
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
            }
            .katex { font-size: 1em; }
            .katex-display { 
              margin: 16px 0; 
              page-break-inside: avoid;
              display: block;
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

  const MarkdownPreview = ({ content }: { content: string }) => {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
      // Use markdown-it with KaTeX plugin for consistent rendering
      const html = md.render(content);
      setHtmlContent(html);
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
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <div className="bg-white text-black rounded border p-6 h-[500px] overflow-auto shadow-inner">
                {textContent ? (
                  isMarkdown ? (
                    <MarkdownPreview content={textContent} />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-sm">{textContent}</pre>
                  )
                ) : (
                  <p className="text-muted-foreground">Your formatted document will appear here</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
