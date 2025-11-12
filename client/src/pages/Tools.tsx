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
      <Card className="hover-elevate transition-all duration-200 group h-full" data-testid={`card-tool-${tool.id}`}>
        <CardHeader className="space-y-4">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
            <Badge variant="secondary" className="capitalize text-xs">
              {tool.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="leading-relaxed">{tool.description}</CardDescription>
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
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-6 mb-20">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">All Tools</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Complete Tool <span className="text-primary">Collection</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Browse our handcrafted suite of free, lightning-fast tools. Each designed to solve a specific problem with zero compromise on privacy.
          </p>
        </div>

        {/* Privacy Tools */}
        {privacyTools.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Privacy Tools</h2>
              <Badge variant="outline" className="text-xs">{privacyTools.length}</Badge>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Protect your identity and secure your data with our privacy-focused utilities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privacyTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Generator Tools */}
        {generatorTools.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Generator Tools</h2>
              <Badge variant="outline" className="text-xs">{generatorTools.length}</Badge>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Create QR codes, passwords, and more with our instant generation tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatorTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Utility Tools */}
        {utilityTools.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Utility Tools</h2>
              <Badge variant="outline" className="text-xs">{utilityTools.length}</Badge>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Optimize and enhance your workflow with our practical utility tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
