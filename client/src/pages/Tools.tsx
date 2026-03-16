import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { tools, getToolIcon } from "@/lib/tools";
import { useSEO } from "@/lib/seo";
import { 
  ArrowRight, 
  Search,
  Type,
  Image,
  FileText,
  Code,
  Calculator,
  Sparkles,
  TrendingUp,
  Palette,
  Wand2,
  Lock,
  Zap,
  Film
} from "lucide-react";

export default function Tools() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const validCategoryIds = ["privacy", "text", "image", "pdf", "media", "developer", "math", "random", "productivity", "color", "ai"];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const category = params.get('category');
      if (category && validCategoryIds.includes(category)) {
        setSelectedCategory(category);
      }
    }
  }, [location]);

  // Adjust canonical based on selected category to avoid "Alternative page with proper canonical tag" issues
  const canonicalUrl = useMemo(() => {
    const base = "https://tools.pixocraft.in/tools";
    if (selectedCategory) {
      return `${base}?category=${selectedCategory}`;
    }
    return base;
  }, [selectedCategory]);

  useSEO({
    title: selectedCategory 
      ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Tools — Pixocraft Tools`
      : "All Tools — Pixocraft Tools (India's Biggest Free Tool Hub — 200+ Tools)",
    description: "Explore 200+ free, lightning-fast, offline-supported tools on Pixocraft Tools — India's biggest tool hub for text, images, PDFs, coding, math, AI, writing and productivity.",
    keywords: "free tools online, India tool hub, 200 tools, PDF tools, image tools, developer tools, static browser tools, text tools, privacy tools, math calculators",
    canonicalUrl,
  });

  // Helper function to categorize tools accurately
  const getToolsByCategory = (categoryId: string) => {
    return tools.filter(t => {
      const name = t.name.toLowerCase();
      const keywords = t.keywords.join(' ').toLowerCase();
      const category = t.category;
      
      switch (categoryId) {
        case "text":
          return keywords.includes("text") || name.includes("text") || name.includes("word") || 
                 name.includes("case") || name.includes("character") || name.includes("sentence");
        case "image":
          return keywords.includes("image") || name.includes("image") || name.includes("photo") ||
                 name.includes("picture") || name.includes("compress") && category === "utility";
        case "pdf":
          return keywords.includes("pdf") || name.includes("pdf");
        case "media":
          return category === "media" || keywords.includes("video") || keywords.includes("audio") ||
                 keywords.includes("mp3") || keywords.includes("mp4") || keywords.includes("gif") ||
                 name.includes("video") || name.includes("audio") || name.includes("gif");
        case "developer":
          return keywords.includes("json") || keywords.includes("code") || keywords.includes("html") ||
                 keywords.includes("css") || keywords.includes("javascript") || keywords.includes("beautifier") ||
                 keywords.includes("minifier") || keywords.includes("base64") || keywords.includes("encoder") ||
                 keywords.includes("regex") || keywords.includes("api") || keywords.includes("csv") ||
                 keywords.includes("xlsx") || keywords.includes("excel") || keywords.includes("converter") ||
                 keywords.includes("yaml") || name.includes("converter") || name.includes("viewer");
        case "math":
          return keywords.includes("calculator") || name.includes("calculator") || keywords.includes("math") ||
                 name.includes("emi") || name.includes("loan") || name.includes("percentage") || 
                 name.includes("fraction") || name.includes("prime");
        case "random":
          return keywords.includes("random") || keywords.includes("generator") && category === "generator" ||
                 name.includes("random") || name.includes("generator") && !name.includes("qr");
        case "productivity":
          return keywords.includes("timer") || keywords.includes("todo") || keywords.includes("notes") ||
                 keywords.includes("expense") || keywords.includes("stopwatch") || keywords.includes("invoice") ||
                 keywords.includes("receipt") || keywords.includes("tracker") ||
                 keywords.includes("ingredient") || keywords.includes("food") || keywords.includes("health analyzer") ||
                 name.includes("ingredient") || name.includes("health analyzer");
        case "color":
          return keywords.includes("color") || keywords.includes("palette") || keywords.includes("gradient") ||
                 keywords.includes("hex") || keywords.includes("rgb") || name.includes("color");
        case "ai":
          return keywords.includes("ai") || keywords.includes("summarizer") || keywords.includes("speech") ||
                 name.includes("ai ") || name.includes("text to speech") || name.includes("speech to text");
        case "privacy":
          return category === "privacy" || keywords.includes("privacy") || keywords.includes("password") ||
                 keywords.includes("temp mail") || keywords.includes("hash") || keywords.includes("encrypt");
        default:
          return false;
      }
    });
  };

  // Categories configuration
  const categories = useMemo(() => [
    {
      id: "privacy",
      name: "Privacy Tools",
      description: "Secure your digital identity with temporary email generators, robust password creators, hash generators, and encryption utilities. Keep your personal information private with India's most trusted offline privacy tools.",
      icon: Lock,
      tools: getToolsByCategory("privacy")
    },
    {
      id: "text",
      name: "Text Tools",
      description: "Powerful text manipulation suite including case converters, word counters, text cleaners, format tools, and advanced text analyzers. Perfect for writers, students, developers, and content creators across India.",
      icon: Type,
      tools: getToolsByCategory("text")
    },
    {
      id: "image",
      name: "Image Tools",
      description: "Professional-grade image editing tools for compression, resizing, cropping, rotating, filtering, and format conversion. Process images instantly in your browser with zero uploads and full privacy protection.",
      icon: Image,
      tools: getToolsByCategory("image")
    },
    {
      id: "pdf",
      name: "PDF Tools",
      description: "Complete PDF toolkit to merge, split, rotate, compress, and convert PDF documents. All processing happens locally in your browser ensuring your sensitive documents never leave your device.",
      icon: FileText,
      tools: getToolsByCategory("pdf")
    },
    {
      id: "media",
      name: "Media Tools",
      description: "Professional media toolkit for video compression, audio conversion, GIF creation, background removal, and format transformation. Process videos, audio, and animated images instantly in your browser with zero uploads.",
      icon: Film,
      tools: getToolsByCategory("media")
    },
    {
      id: "developer",
      name: "Developer Tools",
      description: "Essential developer utilities including JSON formatters, code beautifiers, minifiers, Base64 converters, regex testers, API builders, and syntax validators. Built for India's thriving developer community.",
      icon: Code,
      tools: getToolsByCategory("developer")
    },
    {
      id: "math",
      name: "Math Tools",
      description: "Advanced calculators for EMI, loans, mortgages, percentages, fractions, prime numbers, geometry, compound interest, and financial planning. Accurate, fast, and completely free for students and professionals.",
      icon: Calculator,
      tools: getToolsByCategory("math")
    },
    {
      id: "random",
      name: "Random Tools",
      description: "Creative random generators for numbers, passwords, usernames, names, dates, countries, quotes, ideas, and more. Perfect for developers, content creators, and anyone needing instant randomized data.",
      icon: Sparkles,
      tools: getToolsByCategory("random")
    },
    {
      id: "productivity",
      name: "Productivity Tools",
      description: "Boost your efficiency with todo lists, timers, stopwatches, expense trackers, invoice generators, receipt makers, and workflow automation tools. Streamline your daily tasks with India's best productivity suite.",
      icon: TrendingUp,
      tools: getToolsByCategory("productivity")
    },
    {
      id: "color",
      name: "Color Tools",
      description: "Designer's essential color toolkit featuring color pickers, palette generators, gradient creators, HEX/RGB converters, and CSS shadow generators. Create stunning color schemes instantly for web and graphic design.",
      icon: Palette,
      tools: getToolsByCategory("color")
    },
    {
      id: "ai",
      name: "AI Tools",
      description: "Harness AI power with intelligent text summarizers, speech-to-text converters, text-to-speech generators, and smart writing assistants. Experience cutting-edge AI technology running entirely in your browser.",
      icon: Wand2,
      tools: getToolsByCategory("ai")
    }
  ], []);

  // Filter tools based on search and category
  const filteredCategories = useMemo(() => {
    if (!searchQuery && !selectedCategory) {
      return categories;
    }

    return categories.map(category => {
      let categoryTools = category.tools;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        categoryTools = categoryTools.filter(tool =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.keywords.some(k => k.toLowerCase().includes(query))
        );
      }

      // Filter by selected category
      if (selectedCategory && category.id !== selectedCategory) {
        return { ...category, tools: [] };
      }

      return { ...category, tools: categoryTools };
    }).filter(cat => cat.tools.length > 0);
  }, [searchQuery, selectedCategory, categories]);

  const ToolCard = ({ tool }: { tool: typeof tools[0] }) => {
    const Icon = getToolIcon(tool.icon);
    return (
      <Card className="hover-elevate active-elevate-2 transition-all duration-300 group h-full flex flex-col" data-testid={`card-tool-${tool.id}`}>
        <CardHeader className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 p-3 sm:p-4 md:p-6">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <CardTitle className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors duration-200">{tool.name}</CardTitle>
            <Badge variant="secondary" className="capitalize text-xs">
              {tool.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-3 sm:pb-4 px-3 sm:px-4 md:px-6">
          <CardDescription className="text-sm sm:text-base leading-relaxed line-clamp-2">{tool.description}</CardDescription>
        </CardContent>
        <CardFooter className="pt-0 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
          <Link href={tool.path} className="w-full">
            <Button size="default" className="w-full text-sm sm:text-base" data-testid={`button-use-${tool.id}`}>
              Use Tool
              <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <Badge variant="outline" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 font-semibold border-primary/50 text-primary" data-testid="badge-india-biggest">
            India's Largest Static Tool Library (200+ Tools)
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight px-2" data-testid="heading-all-tools">
            All Tools — India's Biggest <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Free Online Tool Hub</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2" data-testid="text-subheading">
            Browse the complete collection of 200+ browser-based tools for text, image, PDF, coding, privacy, design, math and productivity. No signup. No tracking. 100% client-side.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-2 sm:pt-4 px-2">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search 200+ tools instantly..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base"
                data-testid="input-search-tools"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center pt-2 sm:pt-4 px-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              data-testid="button-filter-all"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                data-testid={`button-filter-${category.id}`}
              >
                <category.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
                <span className="text-xs sm:text-sm">{category.name.replace(" Tools", "")}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tool Categories */}
        {filteredCategories.length > 0 ? (
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {filteredCategories.map((category) => (
              <section key={category.id} className="scroll-mt-24" id={category.id} data-testid={`section-${category.id}`}>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-2 sm:px-0">
                  <category.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold" data-testid={`heading-${category.id}`}>{category.name}</h2>
                  <Badge variant="outline" className="text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1" data-testid={`badge-count-${category.id}`}>
                    {category.tools.length} {category.tools.length === 1 ? 'Tool' : 'Tools'}
                  </Badge>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 md:mb-8 max-w-3xl leading-relaxed px-2 sm:px-0" data-testid={`text-description-${category.id}`}>
                  {category.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 md:py-20 px-4" data-testid="section-no-results">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">No tools found</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}

        {/* SEO Text Block */}
        <section className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 md:pt-12 border-t border-border px-2 sm:px-0" data-testid="section-seo">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Why Pixocraft is India's Biggest Free Online Tool Hub</h2>
            </div>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-muted-foreground leading-relaxed space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base">
                Pixocraft Tools stands as <strong>India's biggest free online tool hub</strong>, offering over <strong>200+ fully static, offline-supported browser tools</strong> that process everything locally on your device. Unlike traditional online tools that upload your data to remote servers, every single tool on Pixocraft runs entirely in your browser with zero tracking, ensuring complete privacy and instant performance with 0ms server delay.
              </p>
              <p className="text-sm sm:text-base">
                Our comprehensive collection includes premium <strong>text tools</strong> (case converters, word counters, text cleaners), professional <strong>image tools</strong> (compressors, resizers, croppers, filters), powerful <strong>PDF tools</strong> (merge, split, rotate, convert), essential <strong>developer tools</strong> (JSON formatters, code beautifiers, minifiers, Base64 encoders), advanced <strong>math calculators</strong> (EMI, loans, percentages, geometry), intelligent <strong>AI tools</strong> (text summarizers, speech converters), secure <strong>privacy tools</strong> (temp mail, password generators, encryption), creative <strong>color tools</strong> (pickers, palette generators, gradient makers), versatile <strong>random generators</strong> (passwords, usernames, data), and efficient <strong>productivity tools</strong> (timers, todo lists, expense trackers, invoice generators).
              </p>
              <p className="text-sm sm:text-base">
                What makes Pixocraft India's largest tool library is our commitment to being <strong>100% free forever</strong> with no premium tiers, paywalls, or hidden costs. Every tool works completely <strong>offline after loading</strong>, requires <strong>no signup or login</strong>, performs <strong>zero tracking or data collection</strong>, and delivers <strong>lightning-fast browser-based processing</strong>. Whether you're a developer building apps, a designer creating graphics, a student working on assignments, a content creator writing articles, or a business professional managing documents, Pixocraft Tools provides the most comprehensive free tool hub in India for all your digital needs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
