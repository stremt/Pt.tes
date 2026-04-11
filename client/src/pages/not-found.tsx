import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, ArrowLeft, Ghost, Compass } from "lucide-react";
import { useState } from "react";
import { tools } from "@/lib/tools";
import { useSEO } from "@/lib/seo";

export default function NotFound() {
  useSEO({ title: "404 - Page Not Found | Pixocraft Tools", description: "The page you are looking for does not exist.", robots: "noindex, nofollow" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools
    .filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-muted/20 to-background p-4 sm:p-6">
      <div className="max-w-3xl w-full text-center space-y-8 animate-[fadeInUp_0.5s_ease-out]">
        {/* Floating Ghost Icon - pure CSS animation */}
        <div className="flex justify-center animate-[float_4s_ease-in-out_infinite]">
          <div className="relative">
            <Ghost className="h-24 w-24 text-primary opacity-20" />
            <Compass className="h-12 w-12 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-primary/10 select-none">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Lost in Tool-land?</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            This page took a coffee break. But don't worry, we've got 200+ other tools ready to work for you!
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-md mx-auto w-full relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input 
            placeholder="Search for a tool (e.g. PDF, Image...)" 
            className="pl-10 h-12 text-lg bg-background/50 backdrop-blur-sm border-2 focus-visible:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Results or Suggestions */}
        {searchQuery ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-[fadeIn_0.2s_ease-out]">
            {filteredTools.length > 0 ? (
              filteredTools.map(tool => (
                <Link key={tool.id} href={tool.path}>
                  <Card className="hover-elevate cursor-pointer border-none bg-muted/30 text-left">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Search className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground capitalize">{tool.category}</div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-muted-foreground py-4 italic">No tools found matching your search.</div>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/">
              <Button variant="default" size="lg" className="h-12 px-8 rounded-xl font-semibold gap-2">
                <Home className="h-5 w-5" />
                Go Home
              </Button>
            </Link>
            <Link href="/tools">
              <Button variant="outline" size="lg" className="h-12 px-8 rounded-xl font-semibold gap-2 bg-background">
                <ArrowLeft className="h-5 w-5" />
                Back to Tools
              </Button>
            </Link>
          </div>
        )}

        {/* Bottom Tagline */}
        <div className="pt-12 text-sm text-muted-foreground/60 font-medium italic">
          Fun fact: Our QR Maker can even make WhatsApp links!
        </div>
      </div>
    </div>
  );
}
