import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tools, getToolIcon } from "@/lib/tools";
import { ArrowRight, Layers } from "lucide-react";

const FEATURED_IDS = [
  "image-compressor",
  "qr-maker",
  "password-generator",
  "temp-mail",
  "text-case-converter",
  "word-counter",
  "json-formatter",
  "pdf-merge",
  "image-resizer",
  "color-picker",
  "base64-encoder",
  "text-summarizer",
];

const featuredTools = FEATURED_IDS
  .map((id) => tools.find((t) => t.id === id))
  .filter(Boolean) as typeof tools;

export default function ToolsSection() {
  return (
    <section className="mt-16 pt-12 border-t">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary flex-shrink-0" />
          <h2 className="text-2xl md:text-3xl font-bold">Explore More Free Tools</h2>
        </div>
        <Link href="/tools">
          <Button variant="outline" size="sm" data-testid="button-browse-all-tools">
            Browse All 200+ Tools
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
      <p className="text-muted-foreground mb-8">
        Pixocraft offers 200+ free browser-based tools for images, PDF, text, privacy, developer needs and more — all private, no login required.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {featuredTools.map((tool) => {
          const Icon = getToolIcon(tool.icon);
          return (
            <Card
              key={tool.id}
              className="hover-elevate active-elevate-2 transition-all duration-300 group h-full flex flex-col"
              data-testid={`card-tool-${tool.id}`}
            >
              <CardHeader className="space-y-2 pb-3 p-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <CardTitle className="text-base font-bold group-hover:text-primary transition-colors duration-200">
                    {tool.name}
                  </CardTitle>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {tool.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-3 px-4">
                <CardDescription className="text-sm leading-relaxed line-clamp-2">
                  {tool.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="pt-0 px-4 pb-4">
                <Link href={tool.path} className="w-full">
                  <Button size="default" className="w-full text-sm" data-testid={`button-use-${tool.id}`}>
                    Use Tool
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link href="/tools">
          <Button className="font-semibold px-8" data-testid="button-view-all-tools-bottom">
            View All 200+ Free Tools
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
