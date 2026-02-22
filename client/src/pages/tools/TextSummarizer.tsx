import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Brain } from "lucide-react";
import { Link } from "wouter";
import { useSEO, StructuredData, OG_IMAGES } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedUseCases } from "@/components/RelatedUseCases";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

export default function TextSummarizer() {
  useSEO({
    title: "AI Text Summarizer — Free Online Text Summary Tool | Pixocraft Tools",
    description: "Free online text summarizer that works 100% offline in your browser. Summarize essays, PDFs, articles and long text instantly. No login, no server, full privacy.",
    keywords: "free text summarizer, AI summarizing tool, offline summarizer, browser summarizer, paragraph shortener, article summary tool, text summarizer, summarize text, pdf summarizer",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-summarizer",
    ogImage: OG_IMAGES.textSummarizer,
  });

  const relatedTools = getRelatedTools("text-summarizer");

  return (
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "AI Tools", url: "/tools/ai" },
            { label: "Text Summarizer" },
          ]}
        />
      </div>
      
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="max-w-2xl w-full space-y-8">
          <div className="flex items-center justify-center">
            <div className="h-24 w-24 rounded-2xl bg-yellow-500/10 flex items-center justify-center animate-pulse">
              <AlertTriangle className="h-12 w-12 text-yellow-500" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Text Summarizer Under Maintenance</h1>
            <p className="text-xl text-muted-foreground">
              Bhai, text summarizer service abhi maintenance mein hai. Hum ise jald hi wapas layenge!
            </p>
            <p className="text-lg text-muted-foreground/80">
              Tab tak aap hamare baaki tools check kar sakte hain.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="hover-elevate">
              <Link href="/tools">
                Explore All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="hover-elevate">
              <Link href="/tools/ai">
                AI Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <RelatedUseCases toolId="text-summarizer" toolName="Text Summarizer" />
        <LongTailPagesSection toolId="text-summarizer" />
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Explore Other Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedTools.map((tool) => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card className="hover-elevate cursor-pointer h-full transition-all border-muted hover:border-primary/50">
                  <CardContent className="p-4 flex flex-col items-center text-center justify-center space-y-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {getToolIcon(tool.id)}
                    </div>
                    <span className="text-sm font-medium line-clamp-1">{tool.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
