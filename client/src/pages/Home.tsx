import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tools, getToolIcon } from "@/lib/tools";
import { useSEO, StructuredData } from "@/lib/seo";
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export default function Home() {
  useSEO({
    title: "Pixocraft Tools | Free Online Tools for Everyone",
    description: "Pixocraft Tools offers free, fast online utilities like Temp Mail, Password Generator, QR Maker, and more. Trusted by creators and developers worldwide.",
    keywords: "pixocraft tools, temp mail, password generator, qr code, free tools, online utilities, india",
    canonicalUrl: "https://tools.pixocraft.in/",
  });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pixocraft Tools",
    "url": "https://tools.pixocraft.in",
    "logo": "https://tools.pixocraft.in/favicon.png",
    "description": "Free, fast, and privacy-focused online tools for everyone",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@pixocraft.in",
      "contactType": "Customer Support"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pixocraft Tools",
    "url": "https://tools.pixocraft.in",
    "description": "Free online tools including temp mail, password generator, QR code maker, and image compressor",
    "publisher": {
      "@type": "Organization",
      "name": "Pixocraft Tools"
    }
  };

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-muted/30 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 max-w-7xl relative">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Trusted by 10,000+ Users Daily
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Free Online Tools That
              <br />
              <span className="text-primary">Just Work</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              No signup. No tracking. No BS. Generate temporary emails, create bulletproof passwords, design QR codes, and compress images—all instantly in your browser.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link href="/tools">
                <Button size="lg" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-explore-tools">
                  Explore All Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>100% Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Always Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Daily Users</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free Forever</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">0ms</div>
              <div className="text-sm text-muted-foreground">Server Delays</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">4+</div>
              <div className="text-sm text-muted-foreground">Premium Tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Pixocraft Tools?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We built the tools we wished existed. Fast, private, and genuinely free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-none bg-muted/30">
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  All tools work instantly in your browser. No server roundtrips, no loading spinners. Just pure speed.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/30">
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  Zero data collection. Zero tracking. Your data never leaves your device. That's a promise.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-none bg-muted/30">
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Always Free</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  No premium tiers, no paywalls, no "credits". Every feature is 100% free, forever.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <Badge variant="secondary">Our Tools</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Most Popular Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Handpicked favorites used by thousands daily. Each tool is designed to solve a specific problem, fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => {
              const Icon = getToolIcon(tool.icon);
              return (
                <Card key={tool.id} className="hover-elevate transition-all duration-200 group flex flex-col" data-testid={`card-tool-${tool.id}`}>
                  <CardHeader className="space-y-4">
                    <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="line-clamp-3 leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href={tool.path} className="w-full">
                      <Button className="w-full group-hover:shadow-md transition-shadow" data-testid={`button-use-${tool.id}`}>
                        Try Now
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link href="/tools">
              <Button variant="outline" size="lg" className="px-8" data-testid="button-view-all-tools">
                View All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-lg">
            <CardContent className="p-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join thousands of users who trust Pixocraft Tools for their daily workflows. No signup, no credit card, no catch.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/tools">
                  <Button size="lg" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-cta-start">
                    Browse All Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-cta-contact">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
}
