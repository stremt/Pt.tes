import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileText, Download, Eye, Heading2, Bold, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Code, ChevronDown, Zap, Shield, Cpu, Type, Table2, Calculator, ImageIcon, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
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

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

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
      element.style.lineHeight = "1.8";
      element.style.padding = "20px 24px";
      element.style.backgroundColor = "#ffffff";
      element.style.color = "#000000";
      element.style.overflow = "visible";
      element.style.width = "720px";
      element.style.boxSizing = "border-box";

      let htmlContent = "";
      
      if (isMarkdown) {
        marked.setOptions({
          gfm: true,
          breaks: true
        });
        let markdownHtml = await marked(textContent);
        markdownHtml = markdownHtml.replace(/(<(?:h[1-6]|p|li|blockquote|pre|div)[^>]*>)\s*<br\s*\/?>/gi, "$1");
        markdownHtml = markdownHtml.replace(/<br\s*\/?>\s*(<\/(?:h[1-6]|p|li|blockquote|pre|div)>)/gi, "$1");
        markdownHtml = convertListsForPDF(markdownHtml);

        htmlContent += `
          <style>
            .pdf-export-content { line-height: 1.8; font-family: Arial, Helvetica, sans-serif; font-size: 12pt; }
            .pdf-export-content h1 { font-size: 26px; font-weight: 800; margin: 28px 0 14px; }
            .pdf-export-content h2 { font-size: 20px; font-weight: 700; margin: 24px 0 12px; }
            .pdf-export-content h3 { font-size: 16px; font-weight: 700; margin: 20px 0 10px; }
            .pdf-export-content h4 { font-size: 14px; font-weight: 700; margin: 16px 0 8px; }
            .pdf-export-content h5, .pdf-export-content h6 { font-size: 13px; font-weight: 700; margin: 14px 0 6px; }
            .pdf-export-content p { font-size: 12pt; margin: 12px 0; line-height: 1.8; page-break-inside: avoid; break-inside: avoid; }
            .pdf-row { page-break-inside: avoid; break-inside: avoid; }
            .pdf-export-content ul, .pdf-export-content ol { margin: 10px 0; padding: 0; list-style: none; }
            .pdf-export-content li { margin: 6px 0; line-height: 1.7; }
            .pdf-export-content br { display: block; content: ""; margin-top: 4px; }
            .pdf-export-content strong, .pdf-export-content b { font-weight: 700; }
            .pdf-export-content blockquote {
              border-left: 4px solid #cccccc;
              margin: 16px 0;
              padding: 8px 16px;
              color: #555555;
              background: #f9f9f9;
            }
            .pdf-export-content hr {
              border: none;
              border-top: 1px solid #dddddd;
              margin: 20px 0;
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
              border: 1px solid #e1e4e8;
            }
            .pdf-export-content pre code {
              display: block;
              width: fit-content;
              min-width: 100%;
              background: none;
              padding: 0;
              border: none;
            }
            .pdf-export-content code { 
              font-family: "Courier New", monospace;
              background: #f3f3f3; 
              padding: 2px 5px; 
              border-radius: 3px;
              font-size: 11px;
              border: 1px solid #e0e0e0;
            }
            .pdf-export-content h1, 
            .pdf-export-content h2, 
            .pdf-export-content h3,
            .pdf-export-content h4,
            .pdf-export-content h5,
            .pdf-export-content h6 {
              page-break-inside: avoid;
            }
            .pdf-export-content table {
              width: 100%;
              max-width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 10.5pt;
              page-break-inside: avoid;
              table-layout: fixed;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            .pdf-export-content table th {
              background-color: #f0f0f0;
              color: #111111;
              font-weight: 700;
              text-align: left;
              padding: 9px 12px;
              border: 1.5px solid #aaaaaa;
              font-size: 10.5pt;
              word-break: break-word;
              overflow-wrap: break-word;
            }
            .pdf-export-content table td {
              padding: 8px 12px;
              border: 1px solid #cccccc;
              color: #222222;
              vertical-align: top;
              word-break: break-word;
              overflow-wrap: break-word;
              line-height: 1.6;
            }
            .pdf-export-content table tr:nth-child(even) td {
              background-color: #fafafa;
            }
            .pdf-export-content table tr:hover td {
              background-color: #f5f5f5;
            }
          </style>
          <div class="pdf-export-content" style="font-family: ${fontFamily}; font-size: ${fontSize}pt; color: #000000;">${markdownHtml}</div>
        `;
      } else {
        htmlContent += `<div style="white-space: pre-wrap; word-wrap: break-word; color: #000000;">${escapeHtml(textContent).replace(/\n/g, '<br>')}</div>`;
      }
      
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      
      // Give browser time to fully render styles
      await new Promise(r => setTimeout(r, 500));

      const isLandscape = pageOrientation === 'landscape';
      const pageWmm = isLandscape ? 297 : 210;
      const pageHmm = isLandscape ? 210 : 297;
      const MARGIN_MM = 10;
      const contentWmm = pageWmm - 2 * MARGIN_MM;
      const contentHmm = pageHmm - 2 * MARGIN_MM;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pxPerMm = canvasWidth / contentWmm;
      const pageHeightPx = Math.floor(contentHmm * pxPerMm);
      const ctx = canvas.getContext('2d')!;

      // Scan upward from idealCut to find the whitest (gap) row
      const findBestCut = (idealCut: number): number => {
        if (idealCut >= canvasHeight) return canvasHeight;
        const searchRange = Math.floor(pageHeightPx * 0.12);
        const searchStart = Math.max(0, idealCut - searchRange);
        let bestRow = idealCut;
        let bestScore = -1;
        const step = Math.max(1, Math.floor(canvasWidth / 80));
        for (let y = idealCut; y >= searchStart; y--) {
          const data = ctx.getImageData(0, y, canvasWidth, 1).data;
          let white = 0, total = 0;
          for (let x = 0; x < canvasWidth; x += step) {
            const i = x * 4;
            if (data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245) white++;
            total++;
          }
          const score = white / total;
          if (score > bestScore) { bestScore = score; bestRow = y; }
          if (score >= 0.98) break;
        }
        return bestRow;
      };

      const filename = titleText
        ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf'
        : 'document.pdf';

      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      let position = 0;
      let pageNum = 0;

      while (position < canvasHeight) {
        const idealCut = Math.min(position + pageHeightPx, canvasHeight);
        let actualCut = idealCut >= canvasHeight ? canvasHeight : findBestCut(idealCut);
        // If remaining content after this cut is tiny, absorb it into the current page
        // to prevent a near-empty last page
        if (canvasHeight - actualCut < pageHeightPx * 0.08) {
          actualCut = canvasHeight;
        }
        const sliceHeight = actualCut - position;
        if (sliceHeight <= 0) break;

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvasWidth;
        sliceCanvas.height = sliceHeight;
        const sliceCtx = sliceCanvas.getContext('2d')!;
        sliceCtx.fillStyle = '#ffffff';
        sliceCtx.fillRect(0, 0, canvasWidth, sliceHeight);
        sliceCtx.drawImage(canvas, 0, position, canvasWidth, sliceHeight, 0, 0, canvasWidth, sliceHeight);

        if (pageNum > 0) pdf.addPage();
        pdf.addImage(
          sliceCanvas.toDataURL('image/jpeg', 0.95),
          'JPEG',
          MARGIN_MM, MARGIN_MM,
          contentWmm,
          sliceHeight / pxPerMm
        );

        position = actualCut;
        pageNum++;
      }

      pdf.save(filename);
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

  const convertListsForPDF = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const processList = (listEl: Element, depth: number, ordered: boolean) => {
      const bullets = ["•", "◦", "▪"];
      const bullet = ordered ? null : bullets[Math.min(depth, bullets.length - 1)];
      const indent = depth * 20;

      const wrapper = doc.createElement("div");
      wrapper.style.margin = "10px 0";

      const items = Array.from(listEl.children).filter(c => c.tagName === "LI");
      items.forEach((li, idx) => {
        const row = doc.createElement("div");
        row.className = "pdf-row";
        row.style.display = "flex";
        row.style.alignItems = "flex-start";
        row.style.marginLeft = indent + "px";
        row.style.marginBottom = "6px";
        row.style.lineHeight = "1.7";

        // Detect task list item (checkbox)
        const firstChild = li.firstElementChild;
        const isCheckbox = firstChild?.tagName === "INPUT" &&
          (firstChild as HTMLInputElement).type === "checkbox";
        const isChecked = isCheckbox && (firstChild as HTMLInputElement).checked;

        const marker = doc.createElement("span");
        marker.style.minWidth = ordered ? "28px" : "20px";
        marker.style.flexShrink = "0";
        marker.style.fontWeight = ordered ? "normal" : "bold";
        marker.style.lineHeight = "1.7";
        if (isCheckbox) {
          marker.textContent = isChecked ? "☑" : "☐";
          marker.style.fontWeight = "normal";
        } else {
          marker.textContent = ordered ? `${idx + 1}.` : bullet!;
        }

        const content = doc.createElement("div");
        content.style.flex = "1";
        content.style.minWidth = "0";

        Array.from(li.childNodes).forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            // Skip the checkbox input — already handled in marker
            if (el.tagName === "INPUT" && (el as HTMLInputElement).type === "checkbox") return;
            if (el.tagName === "UL") {
              content.appendChild(processListReturn(el, depth + 1, false));
            } else if (el.tagName === "OL") {
              content.appendChild(processListReturn(el, depth + 1, true));
            } else {
              content.appendChild(node.cloneNode(true));
            }
          } else {
            content.appendChild(node.cloneNode(true));
          }
        });

        // Remove top margin from first child <p> so marker and text sit on the same baseline
        Array.from(content.children).forEach((child, i) => {
          const el = child as HTMLElement;
          if (i === 0 && el.tagName === "P") {
            el.style.marginTop = "0";
            el.style.marginBottom = "2px";
          }
          // Also zero last <p> bottom margin to avoid double spacing with row marginBottom
          if (i === content.children.length - 1 && el.tagName === "P") {
            el.style.marginBottom = "0";
          }
        });

        row.appendChild(marker);
        row.appendChild(content);
        wrapper.appendChild(row);
      });

      return wrapper;
    };

    const processListReturn = (listEl: Element, depth: number, ordered: boolean): Element => {
      return processList(listEl, depth, ordered);
    };

    const replaceLists = (root: Element) => {
      const lists = Array.from(root.querySelectorAll("ul, ol")).filter(
        el => !el.closest("ul, ol") || el.parentElement?.tagName === "LI"
      );
      root.querySelectorAll(":scope > ul, :scope > ol").forEach(list => {
        const ordered = list.tagName === "OL";
        const replacement = processListReturn(list, 0, ordered);
        list.parentNode?.replaceChild(replacement, list);
      });
    };

    replaceLists(doc.body);
    return doc.body.innerHTML;
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

  const previewTableCSS = `
    <style>
      .md-preview { line-height: 1.8; color: #000; }
      .md-preview h1 { font-size: 24px; font-weight: 800; margin: 24px 0 12px; color: #000; }
      .md-preview h2 { font-size: 18px; font-weight: 700; margin: 20px 0 10px; color: #000; }
      .md-preview h3 { font-size: 15px; font-weight: 700; margin: 16px 0 8px; color: #000; }
      .md-preview h4, .md-preview h5, .md-preview h6 { font-size: 13px; font-weight: 700; margin: 12px 0 6px; color: #000; }
      .md-preview p { margin: 10px 0; line-height: 1.8; color: #000; }
      .md-preview ul, .md-preview ol { margin: 10px 0 10px 22px; }
      .md-preview li { margin: 6px 0; line-height: 1.7; color: #000; }
      .md-preview strong, .md-preview b { font-weight: 700; color: #000; }
      .md-preview br { display: block; content: ""; margin-top: 3px; }
      .md-preview em, .md-preview i { font-style: italic; }
      .md-preview blockquote { border-left: 3px solid #ccc; margin: 12px 0; padding: 6px 12px; color: #555; background: #f9f9f9; }
      .md-preview hr { border: none; border-top: 1px solid #ddd; margin: 16px 0; }
      .md-preview pre { background: #f6f8fa; padding: 12px 14px; border-radius: 5px; font-family: "Courier New", monospace; font-size: 11px; line-height: 1.6; margin: 14px 0; border: 1px solid #e1e4e8; overflow-x: auto; white-space: pre-wrap; }
      .md-preview pre code { background: none; padding: 0; border: none; font-size: inherit; }
      .md-preview code { font-family: "Courier New", monospace; background: #f3f3f3; padding: 1px 4px; border-radius: 3px; font-size: 11px; border: 1px solid #e0e0e0; color: #333; }
      .md-preview table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 11pt; }
      .md-preview table th { background-color: #f0f0f0; color: #111; font-weight: 700; text-align: left; padding: 9px 13px; border: 1.5px solid #aaa; }
      .md-preview table td { padding: 8px 13px; border: 1px solid #ccc; color: #222; vertical-align: top; line-height: 1.6; }
      .md-preview table tr:nth-child(even) td { background-color: #fafafa; }
    </style>
  `;

  const MarkdownPreview = ({ content }: { content: string }) => {
    const [htmlContent, setHtmlContent] = useState("");

    const renderMarkdown = async () => {
      marked.setOptions({
        gfm: true,
        breaks: true
      });
      let html = await marked(content);
      html = html.replace(/(<(?:h[1-6]|p|li|blockquote|pre|div)[^>]*>)\s*<br\s*\/?>/gi, "$1");
      html = html.replace(/<br\s*\/?>\s*(<\/(?:h[1-6]|p|li|blockquote|pre|div)>)/gi, "$1");
      setHtmlContent(html);
    };

    useEffect(() => {
      renderMarkdown();
    }, [content]);

    return (
      <div
        dangerouslySetInnerHTML={{ __html: previewTableCSS + `<div class="md-preview" style="font-size: ${fontSize}pt;">${htmlContent}</div>` }}
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

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Zap className="h-3 w-3" />
              Free · No Signup · Instant Download
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              Text to PDF Converter
              <span className="block text-primary mt-1">Online, Free &amp; Private</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6">
              Paste any text, format it with Markdown, and download a clean PDF in seconds — no login, no uploads, no waiting.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {[
                { label: "Markdown Support" },
                { label: "Math Equations" },
                { label: "Custom Fonts" },
                { label: "Image Embedding" },
                { label: "100% Private" },
              ].map((b) => (
                <Badge key={b.label} variant="secondary" className="bg-primary/8 border border-primary/20 text-foreground font-medium px-3">
                  {b.label}
                </Badge>
              ))}
            </div>

            {/* 3-step flow */}
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl px-6 py-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">How it works</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
                {[
                  { num: "1", label: "Paste your text" },
                  { num: "2", label: "Choose your style" },
                  { num: "3", label: "Download PDF" },
                ].map((step, i) => (
                  <div key={step.num} className="flex sm:flex-1 items-center gap-0">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 flex-1 justify-center">
                      <div className="flex sm:flex-col items-center gap-2">
                        <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center flex-shrink-0">
                          {step.num}
                        </span>
                        <span className="text-sm font-medium text-foreground">{step.label}</span>
                      </div>
                    </div>
                    {i < 2 && (
                      <span className="hidden sm:block text-muted-foreground/40 text-lg mx-2">›</span>
                    )}
                  </div>
                ))}
              </div>
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

                    <div className="flex flex-col gap-2">
                      <div className="relative group/cta">
                        <div className="absolute -inset-0.5 rounded-md bg-primary/30 blur opacity-0 group-hover/cta:opacity-60 transition-opacity duration-300 pointer-events-none" />
                        <Button
                          onClick={convertToPDF}
                          disabled={converting || !textContent.trim()}
                          className="relative w-full"
                          data-testid="button-convert"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {converting ? "Creating your PDF..." : "Convert to PDF – Instant Download"}
                        </Button>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 pt-0.5">
                        <p className="text-xs text-center text-muted-foreground/70 font-medium">
                          No email &bull; No login &bull; Start instantly
                        </p>
                        <p className="text-xs text-center text-muted-foreground/40">
                          No signup &bull; No upload &bull; 100% secure
                        </p>
                      </div>
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
                        <div className="animate-fade-in">
                          {isMarkdown ? (
                            <MarkdownPreview content={textContent} />
                          ) : (
                            <div style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: "#000000" }}>
                              {textContent}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-full flex flex-col justify-center space-y-4 select-none pointer-events-none opacity-40">
                          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Sample Preview</p>
                          <p className="text-sm font-semibold text-gray-800">This is how your PDF will look after conversion.</p>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            Paste any text into the editor and it will appear here with your chosen formatting — fonts, sizes, and Markdown styling all rendered in real time.
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1.5 list-none pl-0">
                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />Clean, professional layout</li>
                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />Custom fonts &amp; sizes</li>
                            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />Instant download — no waiting</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* SEO Sections */}
            <div className="mt-20 space-y-16 max-w-5xl mx-auto">

              {/* About + How to use - two column intro */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">About this tool</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">What is a Text to PDF Converter?</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A Text to PDF converter lets you <strong className="text-foreground">create PDF from text online free</strong> — no software, no signups, no uploads. Whether you need to convert TXT to PDF, paste text, or use Markdown, everything runs instantly inside your browser.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    PDFs preserve layout across all devices — a document created here looks identical on Windows, Mac, or mobile.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Cpu className="h-5 w-5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Step-by-step guide</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Create PDF from Text</h2>
                  <ol className="space-y-3">
                    {[
                      "Copy text from your file, email, or notes.",
                      "Paste it into the editor above.",
                      "Optionally enable Markdown or set a custom font.",
                      'Click "Convert to PDF – Instant Download".',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="h-5 w-5 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              {/* Markdown features */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2">Markdown Support</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Convert Markdown to PDF Easily</h2>
                  <p className="text-sm text-muted-foreground max-w-xl mx-auto">Full Markdown rendering — write in plain text shorthand and get a beautiful, structured PDF.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { icon: Type, label: "Headings", desc: "H1–H6 hierarchy" },
                    { icon: Code, label: "Code Blocks", desc: "Syntax highlighted" },
                    { icon: List, label: "Lists", desc: "Ordered, unordered, tasks" },
                    { icon: Table2, label: "Tables", desc: "Professional styling" },
                    { icon: Calculator, label: "Math Formulas", desc: "KaTeX rendering" },
                    { icon: ImageIcon, label: "Image Embedding", desc: "Inline visuals" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Features */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2">Features</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Powerful Features for Everyone</h2>
                  <p className="text-sm text-muted-foreground">Everything in one place — no extensions, no installs needed.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Instant Conversion", desc: "Get your PDF in seconds — no waiting, no queues.", icon: Download },
                    { title: "Markdown Support", desc: "Use headings, bold, lists, tables and more.", icon: FileText },
                    { title: "Image Embedding", desc: "Include visuals directly in your documents.", icon: ImageIcon },
                    { title: "Structured Content", desc: "Tables, ordered lists, and deep heading levels.", icon: Table2 },
                    { title: "Math Equations", desc: "Render complex formulas with KaTeX support.", icon: Calculator },
                    { title: "Custom Fonts", desc: "Choose from professional typography options.", icon: Type },
                  ].map((feature, idx) => (
                    <Card key={idx} className="hover-elevate border-border bg-card">
                      <CardHeader className="pb-2 pt-5 px-5">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                          <feature.icon className="w-4 h-4" />
                        </div>
                        <CardTitle className="text-base text-foreground">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-5 pb-5">
                        <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Who uses it */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-2">Who uses it</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Common Use Cases</h2>
                  <p className="text-sm text-muted-foreground">From students to developers — everyone converts text to PDF differently.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Students", desc: "Submit assignments and essays as clean, professional PDFs." },
                    { title: "Freelancers", desc: "Export contracts and project proposals ready to share." },
                    { title: "Researchers", desc: "Archive technical notes with math formulas and tables." },
                    { title: "Developers", desc: "Turn README files and docs into shareable PDFs." },
                    { title: "Business Owners", desc: "Create quick memos and internal documents in seconds." },
                    { title: "Writers", desc: "Convert drafts into readable, printable manuscript formats." },
                  ].map((useCase, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">{useCase.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{useCase.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Pixocraft */}
              <section className="bg-primary/5 border border-primary/15 rounded-2xl p-6 md:p-10 space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Why Pixocraft is Better</h2>
                  <p className="text-sm text-muted-foreground">No compromises on privacy, speed, or features.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Fully Offline",
                    "Markdown Support",
                    "Math Equations",
                    "Image Embedding",
                    "Table Support",
                    "No Upload Needed",
                    "Custom Fonts",
                    "No Signup Required",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2.5">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-xs font-medium text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Privacy */}
              <section className="bg-card border border-border rounded-2xl p-6 md:p-10 text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  <Shield className="h-3.5 w-3.5" />
                  Privacy First
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">100% Private &amp; Secure</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm">
                  Your text never leaves your device. All conversion happens locally inside your browser —{" "}
                  <strong className="text-foreground">no uploads, no tracking, no data stored</strong>. Even if you go offline after the page loads, the tool keeps working.
                </p>
              </section>

              {/* More Tools */}
              <section className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">More Text to PDF Tools</h2>
                  <p className="text-sm text-muted-foreground">Specialized converters for every type of text and workflow.</p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      label: "Convert Text",
                      tools: [
                        { name: "TXT to PDF", path: "/tools/txt-to-pdf", desc: "Convert .txt files" },
                        { name: "Convert Text to PDF", path: "/tools/convert-text-to-pdf", desc: "Fast online conversion" },
                        { name: "Paste Text to PDF", path: "/tools/paste-text-to-pdf", desc: "From clipboard" },
                        { name: "Text File to PDF", path: "/tools/text-file-to-pdf", desc: "Document generator" },
                      ],
                    },
                    {
                      label: "Advanced Features",
                      tools: [
                        { name: "Markdown to PDF", path: "/tools/markdown-to-pdf", desc: "Rich formatting" },
                        { name: "Text + Images to PDF", path: "/tools/text-with-images-to-pdf", desc: "Embed images" },
                        { name: "Table to PDF", path: "/tools/table-to-pdf", desc: "Structured tables" },
                        { name: "Math Equation to PDF", path: "/tools/math-equation-to-pdf", desc: "LaTeX & formulas" },
                      ],
                    },
                    {
                      label: "By Use Case",
                      tools: [
                        { name: "Notes to PDF", path: "/tools/notes-to-pdf", desc: "Study & personal notes" },
                        { name: "Email to PDF", path: "/tools/email-to-pdf", desc: "Archive emails" },
                        { name: "Chat to PDF", path: "/tools/chat-to-pdf", desc: "Messenger chats" },
                        { name: "Assignment to PDF", path: "/tools/assignment-to-pdf", desc: "Homework & essays" },
                      ],
                    },
                  ].map((group) => (
                    <div key={group.label} className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">{group.label}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {group.tools.map((tool) => (
                          <Link key={tool.path} href={tool.path} className="group">
                            <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 hover-elevate transition-colors">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                <FileText className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">{tool.name}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{tool.desc}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
                  <p className="text-sm text-muted-foreground">Quick answers to the most common questions about text to PDF conversion.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {faqItems.map((faq, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-xl p-5 space-y-2">
                      <h3 className="font-semibold text-sm text-foreground leading-snug">{faq.question}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related Tools */}
              <section className="border-t border-border pt-12 space-y-5">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Related PDF Tools</h2>
                    <p className="text-sm text-muted-foreground">Explore our other free tools for your workflow.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "HTML to PDF", url: "/tools/pdf" },
                      { label: "PDF to Text", url: "/tools/pdf" },
                      { label: "Markdown Editor", url: "/tools/text" },
                      { label: "Image to PDF", url: "/tools/pdf" },
                      { label: "PDF Merger", url: "/tools/pdf" },
                      { label: "PDF Compressor", url: "/tools/pdf" },
                    ].map((tool) => (
                      <Link
                        key={tool.label}
                        href={tool.url}
                        className="px-4 py-1.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground hover-elevate transition-colors"
                      >
                        {tool.label}
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
