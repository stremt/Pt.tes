import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { tools, getToolIcon } from "@/lib/tools";
import { useSEO } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export default function Tools() {
  useSEO({
    title: "All Tools | Pixocraft Tools",
    description: "Explore our complete collection of free online tools including Temp Mail, Password Generator, QR Code Maker, Image Compressor and more.",
    keywords: "online tools, free tools, pixocraft, temp mail, password generator, qr code, image compressor",
    canonicalUrl: "https://tools.pixocraft.in/tools",
  });

  const privacyTools = tools.filter((t) => t.category === "privacy");
  const generatorTools = tools.filter((t) => t.category === "generator");
  const utilityTools = tools.filter((t) => t.category === "utility");

  const ToolCard = ({ tool }: { tool: typeof tools[0] }) => {
    const Icon = getToolIcon(tool.icon);
    return (
      <Card className="hover-elevate active-elevate-2 transition-all duration-300 group h-full flex flex-col border-2 border-border hover:border-primary/50" data-testid={`card-tool-${tool.id}`}>
        <CardHeader className="space-y-8 pb-8">
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300 group-hover:scale-110">
            <Icon className="h-12 w-12 text-primary" />
          </div>
          <div className="space-y-4">
            <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors duration-200">{tool.name}</CardTitle>
            <Badge variant="secondary" className="capitalize font-medium text-sm">
              {tool.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-8">
          <CardDescription className="text-base leading-relaxed">{tool.description}</CardDescription>
        </CardContent>
        <CardFooter className="pt-0">
          <Link href={tool.path} className="w-full">
            <Button size="lg" className="w-full group-hover:shadow-lg transition-all duration-200" data-testid={`button-use-${tool.id}`}>
              Try Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-8 mb-24">
          <Badge variant="secondary" className="text-base px-6 py-2 font-medium">All Tools</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Complete Tool <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Collection</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse our handcrafted suite of free, lightning-fast tools. Each designed to solve a specific problem with zero compromise on privacy.
          </p>
        </div>

        {/* Privacy Tools */}
        {privacyTools.length > 0 && (
          <section className="mb-24">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">Privacy Tools</h2>
              <Badge variant="outline" className="text-base font-semibold px-3 py-1">{privacyTools.length}</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
              Protect your identity and secure your data with our privacy-focused utilities. Stay anonymous and safe online.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {privacyTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Generator Tools */}
        {generatorTools.length > 0 && (
          <section className="mb-24">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">Generator Tools</h2>
              <Badge variant="outline" className="text-base font-semibold px-3 py-1">{generatorTools.length}</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
              Create QR codes, passwords, and more with our instant generation tools. Fast, secure, and completely free.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {generatorTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Utility Tools */}
        {utilityTools.length > 0 && (
          <section className="mb-24">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-bold">Utility Tools</h2>
              <Badge variant="outline" className="text-base font-semibold px-3 py-1">{utilityTools.length}</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl leading-relaxed">
              Optimize and enhance your workflow with our practical utility tools. Simplify complex tasks in seconds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {utilityTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
