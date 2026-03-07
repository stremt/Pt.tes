import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Mathematics: Complex Equations Guide

## Quadratic Formula

The quadratic formula solves equations of the form $ax^2 + bx + c = 0$:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

## Pythagorean Theorem

In a right triangle with sides $a$ and $b$ and hypotenuse $c$:

$$a^2 + b^2 = c^2$$

## Euler's Identity

One of the most beautiful equations in mathematics:

$$e^{i\\pi} + 1 = 0$$

## Inline Math Examples

We can write inline equations like $E = mc^2$ (Einstein's mass-energy equivalence) or $\\sin^2(x) + \\cos^2(x) = 1$ (trigonometric identity).

## Calculus

### Derivative
The derivative of $f(x) = x^n$ is:

$$\\frac{d}{dx}(x^n) = nx^{n-1}$$

### Integral
The fundamental theorem of calculus:

$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$

## Complex Numbers

For a complex number $z = a + bi$:

$$|z| = \\sqrt{a^2 + b^2}$$

## Matrix Operations

Matrix multiplication:

$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}$$

## Summation Notation

$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

## Conclusion

Mathematical equations render perfectly in PDF format using LaTeX notation.`;

const faqItems: FAQItem[] = [
  { question: "How do I write math equations for PDF conversion?", answer: "Use LaTeX notation. Inline equations: $equation$. Display equations: $$equation$$. Our converter renders them beautifully." },
  { question: "What math syntax is supported?", answer: "Full LaTeX math syntax including fractions, square roots, subscripts, superscripts, Greek letters, matrices, and more." },
  { question: "Can I mix text and equations?", answer: "Yes! Write regular Markdown text with embedded LaTeX equations anywhere in your document." },
  { question: "Are equations rendered as images or text?", answer: "Equations are rendered as high-quality mathematical typography using KaTeX, ensuring perfect clarity in PDFs." },
  { question: "Do complex equations work?", answer: "Yes! Even complex equations with matrices, integrals, summations, and nested expressions render perfectly." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Math Equation to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function MathEquationToPdf() {
  useSEO({
    title: "Math Equation to PDF Converter – Convert LaTeX Formulas to PDF | Pixocraft",
    description: "Convert math equations to PDF instantly with Pixocraft. Write formulas using LaTeX or Markdown and generate professional PDF documents with perfectly rendered mathematical expressions.",
    keywords: "math to pdf, equation to pdf, latex to pdf, math equation converter, convert equations to pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/math-equation-to-pdf",
    ogTitle: "Math Equation to PDF Converter – Convert LaTeX Formulas to PDF | Pixocraft",
    ogDescription: "Convert math equations to PDF instantly with Pixocraft. Write formulas using LaTeX or Markdown and generate professional PDF documents with perfectly rendered mathematical expressions.",
    ogType: "website",
  });

  const faqSchema = generateFAQSchema(faqItems);

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
            <Link href="/tools/text-to-pdf" className="hover:text-primary transition-colors">Text to PDF</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-medium">Math Equations to PDF</span>
          </div>

          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center mb-2">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                <Type className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Math Equations to PDF Online
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Create professional PDFs with perfectly rendered mathematical equations and formulas
                <span className="block mt-1 font-medium text-primary/80 text-lg">100% Private • Offline • Free</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                LaTeX Support
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Professional Rendering
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Scientific Documents
              </Badge>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="math-equation-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-24 space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">Professional Math Equation PDFs</h2>
              <p className="text-muted-foreground leading-relaxed">Convert scientific and mathematical documents to PDF with perfectly rendered equations. Ideal for academic papers, scientific reports, and mathematical documentation.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Supported Math Content</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Fractions and exponents", "Calculus equations", "Matrix operations", "Greek letters", "Trigonometry", "Complex expressions"].map((content, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{content}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Use Cases for Math PDFs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Academic papers", desc: "Create professional research papers with equations.", icon: Download },
                  { title: "Scientific reports", desc: "Document scientific findings with precision.", icon: Zap },
                  { title: "Educational materials", desc: "Create learning resources for students.", icon: Globe },
                  { title: "Technical documentation", desc: "Write technical specs with formulas.", icon: ShieldCheck },
                  { title: "Mathematics coursework", desc: "Submit homework and assignments professionally.", icon: Type },
                  { title: "Engineering documents", desc: "Create technical drawings and specifications.", icon: ShieldCheck }
                ].map((use, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <use.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="font-bold text-lg mb-3">{use.title}</h3>
                    <p className="text-sm text-muted-foreground">{use.desc}</p>
                  </div>
                ))}
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

            <section className="bg-primary/5 rounded-3xl p-12 border border-primary/10 text-center">
              <h2 className="text-3xl font-bold mb-6">Convert Your Math Equations Today</h2>
              <Link href="/tools/text-to-pdf" className="inline-block">
                <Badge className="cursor-pointer hover-elevate py-2 px-6 text-base">
                  Visit Main Text to PDF Tool
                </Badge>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
