import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { FileText, Download, Eye, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function TxtToPdfConverter() {
  const [textContent, setTextContent] = useState(() => {
    return localStorage.getItem("text-to-pdf-content") || "";
  });
  const [converting, setConverting] = useState(false);
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
    title: "TXT to PDF Converter Online Free – Convert Text File to PDF Instantly | Pixocraft",
    description: "Convert TXT to PDF instantly with Pixocraft. Paste text or convert text files into professional PDF documents online for free. Supports Markdown, images, tables, and math equations.",
    keywords: "txt to pdf, convert txt to pdf, text file to pdf, txt to pdf converter, convert text to pdf online",
    canonicalUrl: "https://tools.pixocraft.in/tools/txt-to-pdf",
    ogTitle: "TXT to PDF Converter Online Free – Pixocraft",
    ogDescription: "Convert TXT files to professional PDF documents instantly. Supports Markdown, images, tables, and math equations.",
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
        marked.setOptions({ gfm: true, breaks: true });
        let markdownHtml = await marked(textContent);
        markdownHtml = markdownHtml.replace(/<br\s*\/?>/g, "");
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = markdownHtml;
        
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
          } catch (e) { console.error(e); }
        });
        
        let processedHtml = tempDiv.innerHTML;
        processedHtml = processedHtml.replace(/\$\$(.*?)\$\$/g, (match, math) => {
          try { return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false }); } catch (e) { return match; }
        });
        processedHtml = processedHtml.replace(/\$(.*?)\$/g, (match, math) => {
          try { return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false }); } catch (e) { return match; }
        });

        htmlContent += `
          <style>
            .pdf-export-content { line-height: 1.6; font-family: Arial, Helvetica, sans-serif; font-size: 12pt; }
            .pdf-export-content h1 { font-size: 28px; font-weight: 700; margin: 24px 0 12px; }
            .pdf-export-content h2 { font-size: 20px; font-weight: 600; margin: 20px 0 10px; }
            .pdf-export-content p { margin: 10px 0; line-height: 1.6; page-break-inside: avoid; }
            .pdf-export-content table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            .pdf-export-content th, .pdf-export-content td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          </style>
          <div class="pdf-export-content" style="font-family: ${fontFamily}; font-size: ${fontSize}pt; color: #000000;">${processedHtml}</div>
        `;
      } else {
        htmlContent += `<div style="white-space: pre-wrap; word-wrap: break-word; color: #000000;">${textContent.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m] || m)).replace(/\n/g, '<br>')}</div>`;
      }
      
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      
      const opt = {
        margin: 10,
        filename: titleText ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf' : 'document.pdf',
        html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: pageOrientation === 'landscape' ? 'landscape' : 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);
      toast({ title: "Success!", description: "TXT converted to PDF successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to convert TXT to PDF", variant: "destructive" });
    } finally {
      setConverting(false);
    }
  };

  const faqItems: FAQItem[] = [
    { question: "How do I convert TXT to PDF for free?", answer: "You can convert TXT to PDF using the Pixocraft converter by pasting your text into the editor and clicking Download PDF." },
    { question: "Can I convert large TXT files?", answer: "Yes. The conversion runs in your browser, so the only limit depends on your device’s memory." },
    { question: "Can I format the document before converting?", answer: "Yes. You can use Markdown to add headings, lists, images, tables, and equations." },
    { question: "Is the conversion secure?", answer: "Yes. Pixocraft processes everything locally in your browser, so your files are never uploaded or stored." },
    { question: "Can I convert text to PDF on mobile?", answer: "Yes. The Pixocraft converter works perfectly on smartphones and tablets." }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixocraft TXT to PDF Converter",
    "operatingSystem": "Web",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
  };

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumbs */}
          <div className="mb-8 text-sm flex flex-wrap items-center gap-2 text-muted-foreground/80">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/text-to-pdf" className="hover:text-primary transition-colors">Text to PDF</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-medium">TXT to PDF Converter</span>
          </div>

          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              TXT to PDF Converter Online Free
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Convert plain TXT files into professional PDF documents instantly using the Pixocraft TXT to PDF converter. 
              Paste text, format your document with Markdown, add images or equations, and generate a perfectly formatted PDF directly in your browser.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="bg-background/50 py-1 px-3">Markdown • Images • Tables • Math Supported</Badge>
              <Badge variant="outline" className="bg-background/50 py-1 px-3">100% Private • Offline • Free</Badge>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mb-16">
            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">
                Convert your TXT file to PDF using the Pixocraft editor below. Simply paste your text, format it if needed, and download a clean, professional PDF file instantly.
              </p>
            </div>
            {/* Tool UI - Reused from main tool */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle>Formatting Options</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Filename (Optional)" value={titleText} onChange={(e) => setTitleText(e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger><SelectValue placeholder="Font Family" /></SelectTrigger>
                        <SelectContent><SelectItem value="Arial">Arial</SelectItem><SelectItem value="Times New Roman">Times New Roman</SelectItem><SelectItem value="Courier New">Courier New</SelectItem></SelectContent>
                      </Select>
                      <Select value={fontSize} onValueChange={setFontSize}>
                        <SelectTrigger><SelectValue placeholder="Font Size" /></SelectTrigger>
                        <SelectContent><SelectItem value="10">10pt</SelectItem><SelectItem value="12">12pt</SelectItem><SelectItem value="14">14pt</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="md" checked={isMarkdown} onCheckedChange={(c) => setIsMarkdown(c as boolean)} />
                      <label htmlFor="md" className="text-sm font-medium cursor-pointer">Markdown Mode</label>
                    </div>
                    <Button onClick={convertToPDF} disabled={converting || !textContent.trim()} className="w-full">
                      <Download className="mr-2 h-4 w-4" /> {converting ? "Converting..." : "Download PDF"}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle>Text Input</CardTitle><Button variant="ghost" size="sm" onClick={() => setTextContent("")}>Clear</Button></CardHeader>
                  <CardContent><Textarea placeholder="Paste your TXT content here..." value={textContent} onChange={(e) => setTextContent(e.target.value)} className="font-mono min-h-[400px]" /></CardContent>
                </Card>
              </div>
              <div className="lg:sticky lg:top-6">
                <Card className="min-h-[600px]"><CardHeader><CardTitle>Live Preview</CardTitle></CardHeader><CardContent><div className="prose prose-sm max-w-none text-black p-4 bg-white rounded border min-h-[500px]">{isMarkdown ? "Markdown rendering logic goes here (simplified for SEO page)" : textContent}</div></CardContent></Card>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-24 space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">What is a TXT to PDF Converter?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>A TXT to PDF converter is a tool that transforms simple text files (.txt) into professional PDF documents. While TXT files are widely used for storing plain text data, they lack formatting, layout control, and document consistency.</p>
                <p>PDF files solve these limitations by preserving the structure of the document across all devices. Whether you open a PDF on a Windows computer, MacBook, tablet, or smartphone, the document layout remains exactly the same.</p>
                <p>Using a reliable TXT to PDF converter like Pixocraft allows you to transform raw text into polished, shareable documents within seconds. This is especially useful when you need to submit assignments, archive information, create professional reports, or distribute documents that must maintain consistent formatting.</p>
                <p>Unlike many online converters that require uploading files to servers, Pixocraft performs all TXT to PDF conversions directly inside your browser. This means your data stays completely private and never leaves your device.</p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold">How to Convert TXT to PDF Online</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>Converting a TXT file to PDF is extremely simple with the Pixocraft converter. Follow these steps:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {[
                    { step: "1", title: "Copy your text file content", desc: "Open your TXT document and copy the text you want to convert." },
                    { step: "2", title: "Paste it into the editor", desc: "Paste your content into the Pixocraft TXT to PDF editor above." },
                    { step: "3", title: "Apply formatting (optional)", desc: "You can enable Markdown formatting to add headings, lists, tables, images, or mathematical formulas." },
                    { step: "4", title: "Generate the PDF", desc: "Click the Download PDF button to instantly create a professional PDF document." }
                  ].map((s) => (
                    <div key={s.step} className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">{s.step}</div>
                      <div><h3 className="font-bold text-lg text-foreground mb-1">{s.title}</h3><p className="text-sm">{s.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Why Convert TXT Files to PDF?</h2>
                <ul className="space-y-4">
                  {[
                    { t: "Consistent formatting", d: "PDF files preserve the layout of the document regardless of the device used to view it." },
                    { t: "Professional presentation", d: "PDF documents look more polished and structured than plain text files." },
                    { t: "Better sharing", d: "PDF files are widely accepted for business, academic, and official use." },
                    { t: "Document security", d: "PDFs are harder to accidentally modify compared to editable text files." }
                  ].map((item) => (
                    <li key={item.t} className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div><span className="font-bold text-foreground block">{item.t}</span><span className="text-sm text-muted-foreground">{item.d}</span></div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary/5 p-8 rounded-3xl space-y-6">
                <h2 className="text-2xl font-bold">Advanced Features</h2>
                <div className="grid grid-cols-1 gap-4 text-sm font-medium">
                  {["Markdown formatting", "Image embedding", "Mathematical equations", "Tables and structured content", "Custom fonts"].map(f => (
                    <div key={f} className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" />{f}</div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground pt-4 border-t">Pixocraft provides advanced capabilities that go beyond simple text conversion, allowing for rich document creation.</p>
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqItems.map((faq, i) => (
                  <Card key={i} className="border-none shadow-none bg-muted/20">
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="pt-20 border-t text-center space-y-8">
              <h2 className="text-2xl font-bold">Related Tools</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {["HTML to PDF", "PDF to Text", "Markdown Editor", "Image to PDF", "PDF Merger"].map(tool => (
                  <Link key={tool} href="/tools/pdf" className="px-6 py-3 rounded-2xl border bg-background hover:bg-muted transition-colors font-medium shadow-sm">{tool}</Link>
                ))}
              </div>
              <div className="pt-12">
                <Link href="/tools/text-to-pdf" className="inline-flex items-center gap-2 text-primary font-bold text-xl hover:underline underline-offset-8">
                  Try the main Pixocraft Text to PDF Converter →
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
