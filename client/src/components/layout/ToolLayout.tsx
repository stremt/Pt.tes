import { ReactNode, useState, useEffect, Suspense, lazy } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, CheckCircle2, ChevronDown, QrCode, ImageDown, KeyRound, Youtube, Music, PenLine } from "lucide-react";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Breadcrumb } from "./Breadcrumb";

// Lazy load secondary sections to improve initial load speed
const HowItWorks = ({ steps }: { steps: any[] }) => (
  <section className="py-16 border-t bg-muted/30">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Simple, fast, and effective. Get started in seconds.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <Card key={step.step} className="border-none shadow-none bg-background">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">{step.step}</span>
              </div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-relaxed">
                {step.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = ({ benefits }: { benefits: any[] }) => (
  <section className="py-16 border-t">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Why Use This Tool?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Powerful features designed with you in mind.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="border-none shadow-none bg-muted/30">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <CardTitle className="text-lg">{benefit.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {benefit.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const FAQ = ({ faqs }: { faqs: any[] }) => (
  <section className="py-16 border-t bg-muted/30">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Everything you need to know about this tool.
        </p>
      </div>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="bg-background rounded-lg px-6 border">
            <AccordionTrigger className="text-left hover:no-underline">
              <span className="font-semibold">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  toolId: string;
  category: string;
  children: ReactNode;
  howItWorks: { step: number; title: string; description: string }[];
  benefits: { icon: ReactNode; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

const categoryMap: Record<string, { name: string; path: string }> = {
  "text": { name: "Text Tools", path: "/tools/text" },
  "image": { name: "Image Tools", path: "/tools/image" },
  "pdf": { name: "PDF Tools", path: "/tools/pdf" },
  "privacy": { name: "Privacy & Security", path: "/tools/privacy" },
  "developer": { name: "Developer Tools", path: "/tools/developer" },
  "Developer Tool": { name: "Developer Tools", path: "/tools/developer" },
  "math": { name: "Math Tools", path: "/tools/math" },
  "converter": { name: "Converters", path: "/tools/converter" },
  "calculator": { name: "Calculators", path: "/tools/calculator" },
  "utility": { name: "Utilities", path: "/tools/utility" },
  "productivity": { name: "Productivity", path: "/tools/productivity" },
  "signature-tools": { name: "Signature Tools", path: "/tools/signature-tools" },
  "CSS & Design": { name: "CSS & Design", path: "/tools/developer" },
  "Typography & Fonts": { name: "Typography & Fonts", path: "/tools/text" },
  "SEO & Web": { name: "SEO & Web", path: "/tools/seo" },
  "Fun & Utility": { name: "Fun & Utility", path: "/tools" },
};

export function ToolLayout({
  title,
  description,
  icon,
  toolId,
  category,
  children,
  howItWorks,
  benefits,
  faqs,
}: ToolLayoutProps) {
  const relatedTools = getRelatedTools(toolId, 3);
  const categoryInfo = categoryMap[category] || { name: category, path: `/tools/${category}` };

  const [showSecondaryContent, setShowSecondaryContent] = useState(false);

  useEffect(() => {
    // Priority 1: Render Hero & Tool immediately
    // Priority 2: Render secondary content after a tiny delay or on scroll
    const timer = setTimeout(() => setShowSecondaryContent(true), 100);
    
    const handleScroll = () => {
      if (!showSecondaryContent) setShowSecondaryContent(true);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showSecondaryContent]);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Priority Rendering */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-muted/30 to-background pt-8 sm:pt-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-7xl relative">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
              {category}
            </Badge>
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                {icon}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              data-testid={`button-scroll-to-tool-${category}`}
              onClick={() => {
                document.getElementById("tool-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Use Tool
              <ChevronDown className="ml-2 h-4 w-4 animate-bounce" />
            </Button>
          </div>
        </div>
      </section>

      {/* Main Tool Interface - Priority Rendering */}
      <section id="tool-section" className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          {children}
        </div>
      </section>

      {/* Secondary Content - Loaded with Priority 2 */}
      {showSecondaryContent && (
        <div className="animate-in fade-in duration-500">
          <HowItWorks steps={howItWorks} />
          <Benefits benefits={benefits} />
          <FAQ faqs={faqs} />

          {/* Related Tools */}
          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Related Tools</h2>
                <p className="text-muted-foreground">
                  Explore more tools that might interest you.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((tool) => {
                  const Icon = getToolIcon(tool.icon);
                  return (
                    <Card key={tool.id} className="hover-elevate transition-all duration-200 group" data-testid={`card-related-${tool.id}`}>
                      <CardHeader className="space-y-4">
                        <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {tool.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 leading-relaxed mb-6">
                          {tool.description}
                        </CardDescription>
                        <Link href={tool.path}>
                          <Button className="w-full group-hover:shadow-md transition-shadow" data-testid={`button-related-${tool.id}`}>
                            Try Now
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="text-center mt-12">
                <Link href="/tools">
                  <Button variant="outline" size="lg" className="px-8" data-testid="button-all-tools">
                    View All Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Most Popular Tools - Money Tool Cluster (Internal Linking) */}
          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-3 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">Most Popular Tools</h2>
                <p className="text-muted-foreground">
                  Trusted by millions — our highest-used free tools
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { href: "/tools/qr-maker", label: "QR Code Generator", Icon: QrCode },
                  { href: "/tools/image-compressor", label: "Image Compressor", Icon: ImageDown },
                  { href: "/tools/password-generator", label: "Password Generator", Icon: KeyRound },
                  { href: "/tools/youtube-thumbnail-downloader", label: "YouTube Thumbnail", Icon: Youtube },
                  { href: "/tools/mp4-to-mp3", label: "MP4 to MP3", Icon: Music },
                  { href: "/tools/online-signature-generator", label: "Signature Generator", Icon: PenLine },
                ].map((tool) => (
                  <Link key={tool.href} href={tool.href}>
                    <div
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background border hover-elevate active-elevate-2 text-center cursor-pointer h-full"
                      data-testid={`link-popular-${tool.href.split("/").pop()}`}
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <tool.Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-tight">{tool.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/tools">
                  <Button variant="outline" data-testid="button-popular-browse-all">
                    Browse All 200+ Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 border-t bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-lg">
                <CardContent className="p-12 text-center space-y-6">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Join thousands of users who trust Pixocraft Tools for their daily workflows. Completely free, no signup required.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/tools">
                      <Button size="lg" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-cta-browse">
                        Browse All Tools
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Footer Category Links */}
          <section className="py-12 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">More {categoryInfo.name}</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore other tools in the {categoryInfo.name} category
                </p>
                <Link href={categoryInfo.path}>
                  <Button variant="default" size="lg" data-testid="button-category-link">
                    View All {categoryInfo.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
