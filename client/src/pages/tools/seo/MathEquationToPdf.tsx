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

export default function MathEquationToPdfConverter() {
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
    title: "Math Equation to PDF Converter – Convert LaTeX Formulas to PDF | Pixocraft",
    description: "Convert math equations to PDF instantly with Pixocraft. Write formulas using LaTeX or Markdown and generate professional PDF documents with perfectly rendered mathematical expressions.",
    keywords: "math to pdf, equation to pdf, latex to pdf, math equation converter, convert equations to pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/math-equation-to-pdf",
    ogTitle: "Math Equation to PDF Converter – Convert LaTeX Formulas to PDF | Pixocraft",
    ogDescription: "Convert math equations to PDF instantly with Pixocraft. Write formulas using LaTeX or Markdown and generate professional PDF documents with perfectly rendered mathematical expressions.",
    ogType: "website",
  });

  const convertToPDF = async () => {
    if (!textContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter mathematical equations to convert",
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
        filename: titleText ? titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf' : 'pixocraft-equations.pdf',
        html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: pageOrientation === 'landscape' ? 'landscape' : 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();
      document.body.removeChild(element);
      toast({ title: "Success!", description: "Equations converted to PDF successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to convert equations to PDF", variant: "destructive" });
    } finally {
      setConverting(false);
    }
  };

  const faqItems: FAQItem[] = [
    { question: "Can I convert LaTeX equations to PDF?", answer: "Yes. Pixocraft supports LaTeX-style syntax which can be rendered and exported into a PDF document." },
    { question: "Does the tool support complex formulas?", answer: "Yes. Integrals, fractions, matrices, and summations are supported." },
    { question: "Are the equations rendered before export?", answer: "Yes. The preview panel renders equations exactly as they will appear in the PDF." },
    { question: "Is the conversion secure?", answer: "Yes. All processing happens locally inside your browser." },
    { question: "Can I generate math PDFs on mobile devices?", answer: "Yes. Pixocraft works on smartphones, tablets, and desktop computers." }
  ];

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixocraft Math Equation to PDF Converter",
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
            <span className="text-foreground font-medium">Math Equation to PDF</span>
          </div>

          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Convert Math Equations to PDF Online
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create professional documents containing mathematical equations and formulas using the Pixocraft Math Equation to PDF converter. Write equations using LaTeX or Markdown syntax, preview them instantly, and download a perfectly formatted PDF document.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="bg-background/50 py-1 px-3">Math Equations • Markdown • Tables • Images Supported</Badge>
              <Badge variant="outline" className="bg-background/50 py-1 px-3">100% Private • Offline • Free</Badge>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mb-16">
            <div className="mb-6 text-center">
              <p className="text-sm text-muted-foreground">
                Use the Pixocraft editor below to convert mathematical equations into a professional PDF document. Write formulas using Markdown or LaTeX syntax, preview them instantly, and export a clean PDF.
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
                      <Calculator className="w-4 h-4" /> Equation Input
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setTextContent("")}>Clear</Button>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      data-testid="textarea-input"
                      placeholder="Write your equations using LaTeX or Markdown syntax..." 
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
                        <div dangerouslySetInnerHTML={{ __html: textContent ? "Preview content rendered here..." : "Your formatted equations will appear here." }} />
                      ) : (
                        <pre className="whitespace-pre-wrap font-sans">{textContent || "Your equations will appear here."}</pre>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-24 space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">What is a Math Equation to PDF Converter?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>A math equation to PDF converter is a tool that transforms mathematical expressions and formulas into professionally formatted PDF documents.</p>
                <p>Mathematical equations are commonly written using LaTeX or Markdown syntax because they allow precise representation of complex formulas. However, these expressions are often stored in plain text format and require rendering before they can be shared or printed.</p>
                <p>By converting mathematical expressions to PDF, the formulas are rendered clearly and preserved in a universal document format that can be viewed on any device.</p>
                <p>Pixocraft uses advanced rendering technology based on KaTeX to display mathematical equations accurately before exporting them into PDF format.</p>
                <p>This allows students, engineers, and researchers to generate clean scientific documents without needing specialized software.</p>
              </div>
            </section>

            <section className="bg-muted/30 p-10 rounded-3xl border">
              <h2 className="text-3xl font-bold mb-8">How to Convert Math Equations to PDF</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { step: "1", title: "Write your equation", desc: "Enter your formula using LaTeX or Markdown syntax. Example: E = mc^2" },
                  { step: "2", title: "Enable Markdown mode", desc: "Activate Markdown rendering so mathematical expressions can be processed." },
                  { step: "3", title: "Preview the equation", desc: "The preview panel will render the equation exactly as it will appear in the final PDF." },
                  { step: "4", title: "Download the PDF", desc: "Click Download PDF to generate the document instantly." }
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
              <h2 className="text-3xl font-bold text-center">Mathematical Syntax Supported</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Fractions</h3>
                    <p className="text-muted-foreground mb-3">Write fractions with proper formatting.</p>
                    <pre className="bg-muted p-3 rounded text-sm overflow-auto">{"\\frac{a}{b}"}</pre>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Integrals</h3>
                    <p className="text-muted-foreground mb-3">Render definite and indefinite integrals.</p>
                    <pre className="bg-muted p-3 rounded text-sm overflow-auto">{"\\int_a^b f(x) dx"}</pre>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Square Roots</h3>
                    <p className="text-muted-foreground mb-3">Display square root expressions.</p>
                    <pre className="bg-muted p-3 rounded text-sm overflow-auto">{"\\sqrt{x}"}</pre>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Summation</h3>
                    <p className="text-muted-foreground mb-3">Write summation expressions.</p>
                    <pre className="bg-muted p-3 rounded text-sm overflow-auto">{"\\sum_{i=1}^{n} i"}</pre>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Matrices</h3>
                    <p className="text-muted-foreground mb-3">Create mathematical matrices.</p>
                    <pre className="bg-muted p-3 rounded text-sm overflow-auto">{"\\begin{bmatrix}\n1 & 2 \\\\\n3 & 4\n\\end{bmatrix}"}</pre>
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground">All equations are rendered using KaTeX, ensuring fast and accurate mathematical display.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Why Convert Math Equations to PDF?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Clear formula rendering", desc: "PDF documents display equations exactly as intended.", icon: Type },
                  { title: "Professional academic documents", desc: "PDF files are commonly used for research papers and academic assignments.", icon: ShieldCheck },
                  { title: "Consistent formatting", desc: "The layout remains identical across all devices.", icon: Globe },
                  { title: "Print-ready scientific documents", desc: "PDF files can be printed with perfect formatting.", icon: Download },
                  { title: "Easy document sharing", desc: "PDF documents are easy to send via email or messaging platforms.", icon: Zap },
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
              <h2 className="text-3xl font-bold mb-10 text-center">Common Uses for Equation to PDF Conversion</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { role: "Student assignments", use: "Students often need to submit homework containing mathematical equations." },
                  { role: "Research papers", use: "Researchers frequently write scientific documents containing formulas." },
                  { role: "Engineering documentation", use: "Engineers use equations to explain calculations and models." },
                  { role: "Mathematics notes", use: "Teachers and students often convert math notes into structured documents." },
                  { role: "Technical tutorials", use: "Educational tutorials often contain formulas and calculations." }
                ].map((item, i) => (
                  <div key={i} className="bg-card p-8 rounded-2xl border border-primary/5 flex flex-col items-center text-center shadow-sm">
                    <h3 className="font-bold text-primary text-2xl mb-4">{item.role}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{item.use}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Advanced Features of Pixocraft Equation Converter</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "KaTeX rendering", icon: Calculator },
                  { title: "Markdown formatting", icon: Type },
                  { title: "Table support", icon: TableIcon },
                  { title: "Image embedding", icon: ImageIcon }
                ].map((feature, i) => (
                  <div key={i} className="p-8 bg-card rounded-2xl border text-center hover:border-primary/40 transition-colors shadow-sm">
                    <feature.icon className="w-10 h-10 text-primary mx-auto mb-5" />
                    <h3 className="font-bold text-lg">{feature.title}</h3>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                Pixocraft provides advanced capabilities for technical documents including live preview rendering, custom fonts, and complete equation support.
              </p>
            </section>

            <section className="text-center space-y-8 bg-muted/20 p-12 rounded-3xl">
              <h2 className="text-3xl font-bold">Why Use Pixocraft for Mathematical PDF Documents?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                {[
                  "Browser-based equation rendering",
                  "No file uploads required",
                  "Instant PDF generation",
                  "LaTeX-style formula support",
                  "Markdown formatting support",
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
                Because everything runs locally inside your browser, your equations and documents remain private.
              </p>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Math Text vs PDF Documents</h2>
              <div className="overflow-hidden rounded-2xl border shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-4 border-b font-bold">Feature</th>
                      <th className="p-4 border-b font-bold">Plain Text Equation</th>
                      <th className="p-4 border-b font-bold">PDF Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { f: "Readability", t: "Difficult", p: "Clear" },
                      { f: "Formatting", t: "Limited", p: "Advanced" },
                      { f: "Compatibility", t: "Depends on editor", p: "Universal" },
                      { f: "Printing", t: "Not ideal", p: "Perfect" },
                      { f: "Professional use", t: "Limited", p: "Ideal" }
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
                  { n: "Table to PDF Converter", p: "/tools/table-to-pdf" },
                  { n: "HTML to PDF Converter", p: "/tools/html-to-pdf" },
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
