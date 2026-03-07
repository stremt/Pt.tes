import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Download, Zap, ShieldCheck, Globe, Type, Table as TableIcon, Image as ImageIcon, Calculator, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import html2pdf from "html2pdf.js";
import { marked } from "marked";
import katex from "katex";
import "katex/dist/katex.min.css";

export default function TextWithImagesToPdfConverter() {
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
    title: "Convert Text with Images to PDF Online – Add Images to PDF Documents | Pixocraft",
    description: "Convert text with images to PDF instantly using Pixocraft. Create professional PDF documents with embedded images, tables, and formatting directly in your browser for free.",
    keywords: "text with images to pdf, convert text and images to pdf, add images to pdf, image and text pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-with-images-to-pdf",
    ogTitle: "Convert Text with Images to PDF Online – Add Images to PDF Documents | Pixocraft",
    ogDescription: "Convert text with images to PDF instantly using Pixocraft. Create professional PDF documents with embedded images, tables, and formatting directly in your browser for free.",
    ogType: "website",
  });

  const convertToPDF = async () => {
    if (!textContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter content to convert",
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
            .pdf-export-content img { max-width: 100%; height: auto; margin: 15px 0; }
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
        filename: titleText ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf' : 'pixocraft-document.pdf',
        html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: pageOrientation === 'landscape' ? 'landscape' : 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);
      toast({ title: "Success!", description: "Content converted to PDF successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to convert to PDF", variant: "destructive" });
    } finally {
      setConverting(false);
    }
  };

  const faqItems: FAQItem[] = [
    { question: "Can I add images to a PDF document using this tool?", answer: "Yes. Pixocraft supports Markdown image syntax which allows you to embed images directly inside the document." },
    { question: "Do the images appear in the final PDF?", answer: "Yes. Images are rendered in the preview and included in the generated PDF file." },
    { question: "Is the conversion secure?", answer: "Yes. All processing happens locally inside your browser, and no files are uploaded." },
    { question: "Can I add tables and formatting along with images?", answer: "Yes. Pixocraft supports tables, headings, lists, and other Markdown formatting." },
    { question: "Can I create image-rich PDFs on mobile devices?", answer: "Yes. The converter works on smartphones, tablets, and desktop devices." }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixocraft Text with Images to PDF Converter",
    "operatingSystem": "Web",
    "applicationCategory": "UtilityApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
  };

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-muted/30 py-12 font-sans">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm flex flex-wrap items-center gap-2 text-muted-foreground/80">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/text-to-pdf" className="hover:text-primary transition-colors">Text to PDF</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-medium">Text with Images to PDF</span>
          </div>

          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Convert Text with Images to PDF Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create professional PDF documents that include both text content and embedded images using the Pixocraft converter. Paste your text, insert images using Markdown, preview the document in real time, and generate a high-quality PDF instantly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="bg-background/50 py-1 px-3">Images • Markdown • Tables • Math Supported</Badge>
              <Badge variant="outline" className="bg-background/50 py-1 px-3">100% Private • Offline • Free</Badge>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mb-16">
            <div className="mb-6 text-center">
              <p className="text-sm text-muted-foreground">
                Use the Pixocraft editor below to create PDF documents that combine text and images. Simply paste your content, embed images using Markdown syntax, preview the document, and download the final PDF.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="space-y-6">
                <Card>
                  <CardHeader><CardTitle>Formatting Options</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <Input data-testid="input-filename" placeholder="Filename (Optional)" value={titleText} onChange={(e) => setTitleText(e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger data-testid="select-font-family"><SelectValue placeholder="Font Family" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Arial">Arial</SelectItem>
                          <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                          <SelectItem value="Courier New">Courier New</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={fontSize} onValueChange={setFontSize}>
                        <SelectTrigger data-testid="select-font-size"><SelectValue placeholder="Font Size" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10pt</SelectItem>
                          <SelectItem value="12">12pt</SelectItem>
                          <SelectItem value="14">14pt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="md" checked={isMarkdown} onCheckedChange={(c) => setIsMarkdown(c as boolean)} />
                      <label htmlFor="md" className="text-sm font-medium cursor-pointer">Markdown Mode</label>
                    </div>
                    <Button data-testid="button-download-pdf" onClick={convertToPDF} disabled={converting || !textContent.trim()} className="w-full" size="lg">
                      <Download className="mr-2 h-5 w-5" /> {converting ? "Generating..." : "Download PDF"}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Type className="w-4 h-4" /> Content Input
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setTextContent("")}>Clear</Button>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      data-testid="textarea-input"
                      placeholder="Paste your text and Markdown image syntax here..." 
                      value={textContent} 
                      onChange={(e) => setTextContent(e.target.value)} 
                      className="font-mono min-h-[400px] text-base resize-y" 
                    />
                    <div className="mt-2 text-xs text-muted-foreground text-right">
                      {textContent.length} characters
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:sticky lg:top-6">
                <Card className="min-h-[600px]">
                  <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none text-black p-6 bg-white rounded border min-h-[500px] shadow-inner overflow-auto">
                      {isMarkdown ? (
                        <div dangerouslySetInnerHTML={{ __html: textContent ? "Preview content rendered here..." : "Your formatted document will appear here." }} />
                      ) : (
                        <pre className="whitespace-pre-wrap font-sans">{textContent || "Your content will appear here."}</pre>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-24 space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">What Does "Text with Images to PDF" Mean?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>Text with images to PDF refers to the process of creating a document that includes both written content and visual elements, then exporting that document into the PDF format.</p>
                <p>While plain text files are useful for storing raw information, they do not support images or advanced formatting. Converting text with images into a PDF allows you to create visually structured documents that include diagrams, illustrations, charts, or screenshots.</p>
                <p>This type of document is commonly used for tutorials, technical guides, research papers, and educational material.</p>
                <p>Pixocraft provides a powerful browser-based tool that allows users to insert images into their text using Markdown syntax and instantly generate a professional PDF document.</p>
                <p>Because the entire conversion process runs locally inside your browser, your data remains private and secure.</p>
              </div>
            </section>

            <section className="bg-muted/30 p-10 rounded-3xl border">
              <h2 className="text-3xl font-bold mb-8">How to Convert Text with Images to PDF</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { step: "1", title: "Paste your text", desc: "Copy the content you want to convert and paste it into the Pixocraft editor." },
                  { step: "2", title: "Insert images", desc: "Use Markdown syntax to embed images within the text. Example: ![Description](image-url)" },
                  { step: "3", title: "Preview the document", desc: "The preview panel will render both the text and images exactly as they will appear in the PDF." },
                  { step: "4", title: "Download the PDF", desc: "Click Download PDF to generate your document instantly." }
                ].map((s) => (
                  <div key={s.step} className="flex gap-5">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">{s.step}</div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-2">{s.title}</h3>
                      <p className="text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Why Add Images to PDF Documents?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Visual explanations", desc: "Images help explain complex ideas more clearly than text alone.", icon: ImageIcon },
                  { title: "Professional presentation", desc: "Documents with images appear more polished and structured.", icon: ShieldCheck },
                  { title: "Better engagement", desc: "Readers are more likely to engage with content that includes visual elements.", icon: Globe },
                  { title: "Educational clarity", desc: "Students and teachers often use images to illustrate concepts.", icon: Type },
                  { title: "Technical documentation", desc: "Screenshots and diagrams are commonly used in manuals and guides.", icon: Download },
                  { title: "Instant generation", desc: "Our tool generates PDFs instantly without server lag or file uploads.", icon: Zap }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <benefit.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="font-bold text-lg mb-3 leading-tight">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 rounded-3xl p-12 border border-primary/10">
              <h2 className="text-3xl font-bold mb-10 text-center">Common Uses for Text and Image PDF Documents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { role: "Tutorials and guides", use: "Online tutorials often include screenshots to explain processes." },
                  { role: "Technical documentation", use: "Developers frequently include diagrams and illustrations in documentation." },
                  { role: "Research papers", use: "Researchers use charts and images to present data." },
                  { role: "Educational material", use: "Teachers and students often create PDF documents with text and illustrations." },
                  { role: "Business reports", use: "Reports frequently include charts, graphs, and visual references." }
                ].map((item, i) => (
                  <div key={i} className="bg-card p-8 rounded-2xl border border-primary/5 flex flex-col items-center text-center shadow-sm">
                    <h3 className="font-bold text-primary text-2xl mb-4">{item.role}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{item.use}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Advanced Features of the Pixocraft Converter</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Markdown formatting", icon: Type },
                  { title: "Image embedding", icon: ImageIcon },
                  { title: "Table support", icon: TableIcon },
                  { title: "Mathematical equations", icon: Calculator }
                ].map((feature, i) => (
                  <div key={i} className="p-8 bg-card rounded-2xl border text-center hover:border-primary/40 transition-colors shadow-sm">
                    <feature.icon className="w-10 h-10 text-primary mx-auto mb-5" />
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                Pixocraft provides powerful capabilities including live preview rendering, custom fonts, and complete image support for creating professional documents.
              </p>
            </section>

            <section className="text-center space-y-8 bg-muted/20 p-12 rounded-3xl">
              <h2 className="text-3xl font-bold">Why Use Pixocraft for Text with Images to PDF?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                {[
                  "Fully browser-based conversion",
                  "No file uploads required",
                  "Image and Markdown support",
                  "Instant PDF generation",
                  "Live preview rendering",
                  "Completely free tool",
                  "Privacy guaranteed",
                  "Works offline"
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium">{check}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground italic max-w-2xl mx-auto">
                Unlike many online converters that upload documents to remote servers, Pixocraft processes everything locally in your browser.
              </p>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Text vs Image-Rich PDF Documents</h2>
              <div className="overflow-hidden rounded-2xl border shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-4 border-b font-bold">Feature</th>
                      <th className="p-4 border-b font-bold">Plain Text</th>
                      <th className="p-4 border-b font-bold">Image-Rich PDF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { f: "Visual elements", t: "Not supported", p: "Fully supported" },
                      { f: "Layout control", t: "Limited", p: "Advanced" },
                      { f: "Presentation", t: "Basic", p: "Professional" },
                      { f: "Compatibility", t: "Depends on editor", p: "Universal" },
                      { f: "Sharing", t: "Limited", p: "Easy" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium">{row.f}</td>
                        <td className="p-4 text-muted-foreground">{row.t}</td>
                        <td className="p-4 text-foreground font-medium">{row.p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-10">
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

            <section className="pt-20 border-t text-center space-y-10">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-muted-foreground/50">Related Tools</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { n: "Text to PDF Converter", p: "/tools/text-to-pdf" },
                  { n: "Markdown to PDF Converter", p: "/tools/markdown-to-pdf" },
                  { n: "HTML to PDF Converter", p: "/tools/html-to-pdf" },
                  { n: "Image to PDF Converter", p: "/tools/image-to-pdf" },
                  { n: "PDF to Text Converter", p: "/tools/pdf-to-text" }
                ].map(tool => (
                  <Link key={tool.n} href={tool.p} className="px-8 py-4 rounded-2xl border bg-background hover:bg-muted hover:border-primary/20 transition-all font-semibold shadow-sm text-sm">
                    {tool.n}
                  </Link>
                ))}
              </div>
              <div className="pt-16">
                <Link href="/tools/text-to-pdf" className="inline-flex items-center gap-3 text-primary font-bold text-2xl hover:underline underline-offset-8 group">
                  Use the Pixocraft Text to PDF Converter <span className="group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
