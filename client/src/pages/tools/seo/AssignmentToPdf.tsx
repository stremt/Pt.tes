import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Climate Change: A Global Challenge

**Student Name**: Alex Johnson
**Course**: Environmental Science 101
**Date**: March 7, 2026
**Assignment**: Research Paper

## Introduction

Climate change represents one of the most significant challenges facing humanity in the 21st century. Rising global temperatures are causing widespread environmental, economic, and social impacts that affect every region on Earth.

## Definition and Causes

Climate change refers to long-term shifts in global temperatures and weather patterns. Primary causes include:

- Greenhouse gas emissions from fossil fuel combustion
- Industrial activities and manufacturing
- Deforestation and land use changes
- Agricultural practices and livestock raising

## Environmental Impact

### Rising Temperatures
- Average global temperature increase of 1.1°C since 1850
- More frequent heat waves and extreme weather events
- Melting glaciers and polar ice sheets

### Ocean Acidification
- Increased CO₂ absorption by oceans
- Threatens marine ecosystems and fisheries
- Impacts coral reefs and shellfish industries

## Solutions and Mitigation

### Individual Actions
- Reduce energy consumption
- Use renewable energy sources
- Support sustainable practices
- Reduce carbon footprint

### Policy Measures
- International climate agreements
- Carbon pricing mechanisms
- Investment in green technology
- Renewable energy transitions

## Conclusion

Addressing climate change requires coordinated global action combining individual responsibility, corporate accountability, and government policy. The time to act is now, as the window for preventing the worst impacts continues to close.

## References

1. IPCC Fourth Assessment Report (2021)
2. UNEP Global Environmental Outlook (2022)
3. Climate Reality Project Research Data (2023)`;

const faqItems: FAQItem[] = [
  { question: "How do I convert my assignment to PDF?", answer: "Copy your assignment text, paste it into our converter, enable Markdown formatting if needed, and download as PDF." },
  { question: "Can I format academic assignments?", answer: "Yes! Use Markdown for headers, lists, citations, and formatting. Our tool supports all academic formatting needs." },
  { question: "Is my assignment content private?", answer: "Completely private. All conversion happens in your browser. No assignments are uploaded to any server." },
  { question: "Can I include citations and references?", answer: "Yes. You can include full citations, reference lists, and academic formatting in your PDF." },
  { question: "Does this work for all assignment types?", answer: "Yes! Essays, research papers, lab reports, case studies, and all text-based assignments can be converted." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Assignment to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function AssignmentToPdfConverter() {
  useSEO({
    title: "Assignment to PDF Converter Online Free – Convert Assignments to PDF | Pixocraft",
    description: "Convert your essays, research papers, and assignments to professional PDF instantly with Pixocraft. Free assignment to PDF converter. No uploads. Completely private.",
    keywords: "assignment to pdf, convert assignment to pdf, essay to pdf, research paper to pdf, assignment pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/assignment-to-pdf",
    ogTitle: "Assignment to PDF Converter Online Free – Convert Assignments to PDF | Pixocraft",
    ogDescription: "Convert your essays and research papers to professional PDF. Free assignment to PDF converter. No uploads required.",
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
            <span className="text-foreground font-medium">Assignment to PDF</span>
          </div>

          <div className="text-center space-y-8 mb-16 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/30 shadow-lg">
                <Type className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Assignment to PDF Online Free
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Turn essays, research papers, and assignments into professional PDF submissions
                <span className="block mt-2 font-semibold text-primary text-base">100% Private • Offline • Free</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Academic Formatting
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Professional Output
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Citation Support
              </Badge>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="assignment-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Why Convert Assignments to PDF?</h2>
              <p className="text-muted-foreground leading-relaxed">Converting assignments to PDF ensures consistent formatting, professional appearance, and compatibility across all devices. PDFs preserve your academic work exactly as intended.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Assignment Types Supported</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Essays and papers", "Research assignments", "Lab reports", "Case studies", "Thesis chapters", "Reflective essays", "Group projects", "Literature reviews"].map((type, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{type}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Academic Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { title: "Professional formatting", desc: "Create polished documents suitable for academic submission.", icon: ShieldCheck },
                  { title: "Consistent appearance", desc: "PDFs look identical on all devices and operating systems.", icon: Globe },
                  { title: "Easy submission", desc: "Upload one PDF file instead of multiple formats.", icon: Download },
                  { title: "Citation support", desc: "Include full bibliographies and reference lists.", icon: Type },
                  { title: "Presentation ready", desc: "Create presentation-quality academic documents.", icon: Zap },
                  { title: "Archival format", desc: "PDFs are ideal for maintaining academic records.", icon: ShieldCheck }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <benefit.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {faqItems.map((faq, i) => (
                  <Card key={i} className="border-none shadow-none bg-muted/20">
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 rounded-3xl p-12 border border-primary/10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Submit Your Assignment as PDF Today</h2>
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
