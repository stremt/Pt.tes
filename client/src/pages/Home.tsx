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
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-24 md:py-32 max-w-7xl">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Free & Fast Tools
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Smart Online Tools for{" "}
              <span className="text-primary">Everyone</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate temporary emails, create strong passwords, make QR codes, compress images, and more. All free, no signup required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/tools">
                <Button size="lg" data-testid="button-explore-tools">
                  Explore Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blogs">
                <Button size="lg" variant="outline" data-testid="button-read-blog">
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3 p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                All tools work instantly in your browser. No waiting, no delays.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                No data collection, no tracking. Your privacy is our priority.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3 p-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Always Free</h3>
              <p className="text-sm text-muted-foreground">
                No hidden fees, no premium plans. Everything is completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Popular Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most-used tools, trusted by thousands of users every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => {
              const Icon = getToolIcon(tool.icon);
              return (
                <Card key={tool.id} className="hover-elevate transition-transform duration-200" data-testid={`card-tool-${tool.id}`}>
                  <CardHeader className="space-y-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Link href={tool.path} className="w-full">
                      <Button variant="outline" className="w-full" data-testid={`button-use-${tool.id}`}>
                        Use Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button variant="outline" size="lg" data-testid="button-view-all-tools">
                View All Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to get started?</h2>
          <p className="text-muted-foreground text-lg">
            Choose from our collection of free tools and boost your productivity today.
          </p>
          <Link href="/tools">
            <Button size="lg" data-testid="button-cta-start">
              Start Using Tools
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
