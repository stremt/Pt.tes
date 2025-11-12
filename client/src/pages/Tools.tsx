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
      <Card className="hover-elevate transition-transform duration-200" data-testid={`card-tool-${tool.id}`}>
        <CardHeader className="space-y-3">
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{tool.name}</CardTitle>
            <Badge variant="secondary" className="mt-2 capitalize">
              {tool.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>{tool.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Link href={tool.path} className="w-full">
            <Button className="w-full" data-testid={`button-use-${tool.id}`}>
              Use Tool
              <ArrowRight className="ml-2 h-4 w-4" />
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
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">All Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of free, fast, and privacy-focused online tools
          </p>
        </div>

        {/* Privacy Tools */}
        {privacyTools.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Privacy Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privacyTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Generator Tools */}
        {generatorTools.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Generator Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatorTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Utility Tools */}
        {utilityTools.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Utility Tools</h2>
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
