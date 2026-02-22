import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Volume2 } from "lucide-react";
import { Link } from "wouter";
import { useSEO, Breadcrumb } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { RelatedUseCases } from "@/components/RelatedUseCases";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

export default function AudioNoiseRemover() {
  useSEO({
    title: "Free Audio Noise Remover Online - Remove Background Noise | Pixocraft Tools",
    description: "Remove background noise from audio files online for free. Clean up audio recordings with noise reduction filters. Fast, secure, works offline.",
    keywords: "audio noise remover, remove background noise free, audio cleaner, noise reduction, clean audio online",
    canonicalUrl: "https://tools.pixocraft.in/tools/audio-noise-remover",
  });

  const relatedTools = getRelatedTools("audio-noise-remover");

  return (
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "Audio Noise Remover" },
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Audio Noise Remover Under Maintenance</h1>
            <p className="text-xl text-muted-foreground">
              Bhai, audio noise remover service abhi maintenance mein hai. Hum ise jald hi wapas layenge!
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
              <Link href="/tools/media">
                Media Tools
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl py-12">
        <RelatedUseCases toolId="audio-noise-remover" toolName="Audio Noise Remover" />
        <LongTailPagesSection toolId="audio-noise-remover" />
        
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
