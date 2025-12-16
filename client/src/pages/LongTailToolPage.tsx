import { Link, useParams } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { getUseCasePage, getRelatedUseCasesForPage, getClusterSiblingTools, getUseCasesForTool } from "@/lib/toolClusters";
import { tools, getToolIcon } from "@/lib/tools";
import { ArrowRight, ArrowLeft, CheckCircle2, Target, Lightbulb, Users, Shield, Zap, ExternalLink } from "lucide-react";
import NotFound from "@/pages/not-found";

export default function LongTailToolPage() {
  const params = useParams<{ toolId: string; useCaseSlug: string }>();
  const { toolId, useCaseSlug } = params;
  
  const useCasePage = getUseCasePage(toolId || "", useCaseSlug || "");
  const parentTool = tools.find(t => t.id === toolId);
  
  if (!useCasePage || !parentTool) {
    return <NotFound />;
  }

  const { seo, content, internalLinks } = useCasePage;
  const relatedUseCases = getRelatedUseCasesForPage(useCasePage);
  const clusterSiblings = getClusterSiblingTools(toolId || "");
  const siblingTools = tools.filter(t => clusterSiblings.includes(t.id)).slice(0, 3);
  const allToolUseCases = getUseCasesForTool(toolId || "").filter(uc => uc.slug !== useCaseSlug).slice(0, 4);

  const canonicalUrl = `https://tools.pixocraft.in/tools/${toolId}/${useCaseSlug}`;

  useSEO({
    title: seo.title,
    description: seo.metaDescription,
    keywords: seo.keywords.join(", "),
    canonicalUrl,
  });

  const breadcrumbs = [
    { name: "Home", url: "https://tools.pixocraft.in" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: parentTool.name, url: `https://tools.pixocraft.in${parentTool.path}` },
    { name: content.h1, url: canonicalUrl }
  ];

  const ParentIcon = getToolIcon(parentTool.icon);

  return (
    <div className="min-h-screen">
      <StructuredData data={generateFAQSchema(content.faqs)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Breadcrumb Navigation */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3 max-w-7xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
              Home
            </Link>
            <span>/</span>
            <Link href="/tools" className="hover:text-foreground transition-colors" data-testid="breadcrumb-tools">
              Tools
            </Link>
            <span>/</span>
            <Link href={parentTool.path} className="hover:text-foreground transition-colors" data-testid="breadcrumb-parent">
              {parentTool.name}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{content.h1}</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl relative">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5" data-testid="badge-category">
              {parentTool.category}
            </Badge>
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <ParentIcon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight" data-testid="heading-h1">
              {content.h1}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" data-testid="text-intro">
              {content.intro}
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Link href={parentTool.path}>
                <Button size="lg" className="text-base" data-testid="button-use-tool">
                  Use {parentTool.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools">
                <Button variant="outline" size="lg" className="text-base" data-testid="button-all-tools">
                  Browse All Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-destructive" />
                </div>
                <CardTitle className="text-xl">The Problem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-problem">
                  {content.problemStatement}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">The Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-solution">
                  {content.solutionExplanation}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Case Narrative */}
      <section className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Why This Matters</h2>
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed text-lg" data-testid="text-narrative">
              {content.useCaseNarrative}
            </p>
          </div>
          {content.industries && content.industries.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Popular in:</span>
              {content.industries.map((industry, idx) => (
                <Badge key={idx} variant="outline" className="text-sm">
                  {industry}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 border-t">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get started
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.howItWorks.map((step) => (
              <Card key={step.step} className="border-none shadow-none bg-muted/30" data-testid={`card-step-${step.step}`}>
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

      {/* Benefits */}
      <section className="py-12 md:py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Key Benefits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Why users choose this solution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.benefits.map((benefit, index) => {
              const icons = [Shield, Zap, CheckCircle2, Target];
              const Icon = icons[index % icons.length];
              return (
                <Card key={index} className="border-none shadow-none bg-background" data-testid={`card-benefit-${index}`}>
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about this use case
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {content.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-muted/30 rounded-lg px-6 border" data-testid={`accordion-faq-${index}`}>
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

      {/* Related Use Cases */}
      {allToolUseCases.length > 0 && (
        <section className="py-12 md:py-16 border-t bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Related Use Cases</h2>
              <p className="text-muted-foreground">
                Explore more ways to use {parentTool.name}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allToolUseCases.map((useCase) => (
                <Card key={useCase.slug} className="hover-elevate transition-all duration-200 group" data-testid={`card-usecase-${useCase.slug}`}>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                      {useCase.content.h1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3 leading-relaxed mb-4">
                      {useCase.content.intro.slice(0, 120)}...
                    </CardDescription>
                    <Link href={`/tools/${useCase.parentToolId}/${useCase.slug}`}>
                      <Button variant="outline" size="sm" className="w-full" data-testid={`button-usecase-${useCase.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Tools from Same Cluster */}
      {siblingTools.length > 0 && (
        <section className="py-12 md:py-16 border-t">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">Related Tools</h2>
              <p className="text-muted-foreground">
                Other tools you might find useful
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siblingTools.map((tool) => {
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
                        <Button className="w-full" data-testid={`button-related-${tool.id}`}>
                          Try Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 border-t bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-lg">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <ParentIcon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Use {parentTool.name} now - completely free, no signup required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href={parentTool.path}>
                  <Button size="lg" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-cta-main">
                    Use {parentTool.name}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button variant="outline" size="lg" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-cta-browse">
                    Browse All Tools
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Back to Parent Link */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link href={parentTool.path} className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back-parent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {parentTool.name}
          </Link>
        </div>
      </section>
    </div>
  );
}
