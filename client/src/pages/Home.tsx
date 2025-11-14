import { useMemo } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { tools, getToolIcon } from "@/lib/tools";
import { useSEO, StructuredData } from "@/lib/seo";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Sparkles, 
  Users, 
  Clock, 
  Lock,
  Globe,
  TrendingUp,
  Star,
  FileText,
  Image,
  Code,
  Calculator,
  Palette,
  Wand2,
  Database,
  Type
} from "lucide-react";

export default function Home() {
  useSEO({
    title: "Pixocraft Tools — India's Biggest Free Online Tool Hub (200+ Tools)",
    description: "Access 200+ fast, fully browser-based tools for text, images, PDF, coding, math, AI, writing and productivity. No signup. No tracking. 100% private & offline supported. India's biggest free online tool hub.",
    keywords: "pixocraft tools, India's biggest tool hub, free online tools, text tools, image tools, PDF tools, developer tools, offline tools, static tools, privacy tools, fastest online tools, 200+ tools",
    canonicalUrl: "https://tools.pixocraft.in/",
  });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pixocraft Tools",
    "alternateName": "India's Biggest Free Online Tool Hub",
    "url": "https://tools.pixocraft.in",
    "logo": "https://tools.pixocraft.in/favicon.png",
    "description": "India's biggest free online tool hub with 200+ static, offline-supported tools for text, images, PDF, coding, math, AI, and productivity",
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
    "alternateName": "India's Biggest Tool Hub",
    "url": "https://tools.pixocraft.in",
    "description": "200+ free browser-based tools including temp mail, password generator, QR code maker, image compressor, PDF tools, and more",
    "publisher": {
      "@type": "Organization",
      "name": "Pixocraft Tools"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Pixocraft Tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pixocraft Tools is India's biggest free online tool hub offering 200+ browser-based tools for text processing, image editing, PDF manipulation, developer utilities, math calculations, and productivity. All tools are 100% free, work offline, and require no signup."
        }
      },
      {
        "@type": "Question",
        "name": "Why is Pixocraft India's biggest tool hub?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pixocraft Tools is India's biggest tool hub because we offer 200+ completely free, static, browser-based tools with zero tracking, no login requirements, and full offline support. All tools run entirely in your browser with 0ms server delay."
        }
      },
      {
        "@type": "Question",
        "name": "Are all tools completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all 200+ tools on Pixocraft are 100% free forever. There are no premium tiers, no paywalls, no credits system, and no hidden costs. Every feature is completely free with no limitations."
        }
      },
      {
        "@type": "Question",
        "name": "Do tools work offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all tools on Pixocraft are fully browser-based and work offline once the page is loaded. Your data never leaves your device and everything processes locally in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Pixocraft Tools processes everything locally in your browser. We don't upload, store, or track any of your data. Your files and information never leave your device, ensuring 100% privacy and security."
        }
      },
      {
        "@type": "Question",
        "name": "Do you track users?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Pixocraft Tools does not track users, collect analytics, or store any personal information. We are committed to your privacy with zero tracking and zero data collection."
        }
      },
      {
        "@type": "Question",
        "name": "How many tools are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pixocraft Tools currently offers 200+ free tools and is continuously growing. Our collection includes text tools, image tools, PDF tools, developer tools, math tools, AI tools, productivity tools, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Are files uploaded to a server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. All processing happens entirely in your browser. Files are never uploaded to any server. This ensures maximum privacy, security, and blazing-fast performance with 0ms server delay."
        }
      }
    ]
  };

  // Featured popular tools (12-16 tools) - memoized to prevent recalculation
  const popularTools = useMemo(() => tools.slice(0, 16), []);

  // Categories with precomputed counts - memoized for performance
  const categories = useMemo(() => {
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
          case "developer":
            return keywords.includes("json") || keywords.includes("code") || keywords.includes("html") ||
                   keywords.includes("css") || keywords.includes("javascript") || keywords.includes("beautifier") ||
                   keywords.includes("minifier") || keywords.includes("base64") || keywords.includes("encoder") ||
                   keywords.includes("regex") || keywords.includes("api");
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
                   keywords.includes("receipt") || keywords.includes("tracker");
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

    return [
      {
        id: "privacy",
        name: "Privacy Tools",
        description: "Secure your digital identity with temporary email generators, robust password creators, hash generators, and encryption utilities. Keep your personal information private with India's most trusted offline privacy tools.",
        icon: Lock,
        toolCount: getToolsByCategory("privacy").length
      },
      {
        id: "text",
        name: "Text Tools",
        description: "Powerful text manipulation suite including case converters, word counters, text cleaners, format tools, and advanced text analyzers. Perfect for writers, students, developers, and content creators across India.",
        icon: Type,
        toolCount: getToolsByCategory("text").length
      },
      {
        id: "image",
        name: "Image Tools",
        description: "Professional-grade image editing tools for compression, resizing, cropping, rotating, filtering, and format conversion. Process images instantly in your browser with zero uploads and full privacy protection.",
        icon: Image,
        toolCount: getToolsByCategory("image").length
      },
      {
        id: "pdf",
        name: "PDF Tools",
        description: "Complete PDF toolkit to merge, split, rotate, compress, and convert PDF documents. All processing happens locally in your browser ensuring your sensitive documents never leave your device.",
        icon: FileText,
        toolCount: getToolsByCategory("pdf").length
      },
      {
        id: "developer",
        name: "Developer Tools",
        description: "Essential developer utilities including JSON formatters, code beautifiers, minifiers, Base64 converters, regex testers, API builders, and syntax validators. Built for India's thriving developer community.",
        icon: Code,
        toolCount: getToolsByCategory("developer").length
      },
      {
        id: "math",
        name: "Math Tools",
        description: "Advanced calculators for EMI, loans, mortgages, percentages, fractions, prime numbers, geometry, compound interest, and financial planning. Accurate, fast, and completely free for students and professionals.",
        icon: Calculator,
        toolCount: getToolsByCategory("math").length
      },
      {
        id: "random",
        name: "Random Tools",
        description: "Creative random generators for numbers, passwords, usernames, names, dates, countries, quotes, ideas, and more. Perfect for developers, content creators, and anyone needing instant randomized data.",
        icon: Sparkles,
        toolCount: getToolsByCategory("random").length
      },
      {
        id: "productivity",
        name: "Productivity Tools",
        description: "Boost your efficiency with todo lists, timers, stopwatches, expense trackers, invoice generators, receipt makers, and workflow automation tools. Streamline your daily tasks with India's best productivity suite.",
        icon: TrendingUp,
        toolCount: getToolsByCategory("productivity").length
      },
      {
        id: "color",
        name: "Color Tools",
        description: "Designer's essential color toolkit featuring color pickers, palette generators, gradient creators, HEX/RGB converters, and CSS shadow generators. Create stunning color schemes instantly for web and graphic design.",
        icon: Palette,
        toolCount: getToolsByCategory("color").length
      },
      {
        id: "ai",
        name: "AI Tools",
        description: "Harness AI power with intelligent text summarizers, speech-to-text converters, text-to-speech generators, and smart writing assistants. Experience cutting-edge AI technology running entirely in your browser.",
        icon: Wand2,
        toolCount: getToolsByCategory("ai").length
      }
    ];
  }, []);

  // Featured premium tools - filtered to remove undefined entries
  const premiumTools = useMemo(() => {
    const toolIds = ["temp-mail", "image-compressor", "json-formatter", "password-generator", "qr-maker"];
    return toolIds.map(id => tools.find(t => t.id === id)).filter((tool): tool is NonNullable<typeof tool> => tool !== undefined);
  }, []);

  // Testimonials
  const testimonials = [
    {
      name: "Rajat Kumar",
      role: "Software Developer",
      content: "India's fastest offline tool website. I use it daily for JSON formatting and Base64 encoding. No ads, no nonsense!",
      rating: 5
    },
    {
      name: "Vivaan Patel",
      role: "Designer",
      content: "No ads, no login. Instant speed. The image tools and color generators are absolutely perfect for my workflow.",
      rating: 5
    },
    {
      name: "Maria Singh",
      role: "Content Writer",
      content: "Love the 200+ tools in one place! Word counter, text summarizer, and case converters save me hours every week.",
      rating: 5
    }
  ];

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-muted/30 to-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-4 py-24 md:py-32 lg:py-40 max-w-7xl relative">
            <div className="mx-auto max-w-4xl text-center space-y-8">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5" data-testid="badge-india-biggest">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                India's Biggest Tool Hub
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Pixocraft Tools — India's Biggest Free Online Tool Hub
                <br />
                <span className="text-primary">(200+ Tools)</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Access 200+ fast, fully browser-based tools for text, images, PDF, coding, math, AI, writing and productivity. No signup. No tracking. 100% private & offline supported.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Link href="/tools">
                  <Button size="lg" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-explore-tools">
                    Explore Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button size="lg" variant="outline" className="text-base px-8 h-12 w-full sm:w-auto" data-testid="button-popular-tools">
                    Popular Tools
                  </Button>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="pt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground" data-testid="trust-india-biggest">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="font-medium">India's Biggest Tool Hub</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground" data-testid="trust-200-tools">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="font-medium">200+ Tools & Growing</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground" data-testid="trust-offline">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="font-medium">Offline Supported</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground" data-testid="trust-no-login">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="font-medium">No Login • No Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground" data-testid="trust-performance">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="font-medium">Super Fast Performance</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badge Section */}
        <section className="py-16 bg-muted/30 border-b">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="text-center" data-testid="card-trust-largest">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">India's Largest</CardTitle>
                  <CardDescription>Static Tool Hub</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-tools">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">200+ Tools</CardTitle>
                  <CardDescription>Free Forever</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-users">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">10,000+</CardTitle>
                  <CardDescription>Daily Users</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-privacy">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Zero Tracking</CardTitle>
                  <CardDescription>Full Privacy</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-speed">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">0ms Delay</CardTitle>
                  <CardDescription>Browser-Based</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Pixocraft Section */}
        <section className="py-20 border-b">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Why India Chooses Pixocraft Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The most comprehensive free online tool hub built for speed, privacy, and convenience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-fast">
                <CardHeader className="text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Blazing Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    Runs entirely in your browser with 0ms server delay. No waiting, no loading spinners—just instant results every time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-privacy">
                <CardHeader className="text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    No uploads, no tracking, no data collection. Everything processes locally in your browser for maximum privacy and security.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-free">
                <CardHeader className="text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Always Free</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    Every feature, every tool, 100% free forever. No premium tiers, no paywalls, no hidden costs or limitations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-india">
                <CardHeader className="text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">India's Biggest</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    With 200+ tools and growing, Pixocraft is India's largest free online tool hub serving thousands daily.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-static">
                <CardHeader className="text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">100% Static</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    Fully browser-based tools that work offline. No backend servers, no databases—complete client-side processing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-no-limits">
                <CardHeader className="text-center">
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">No Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    No ads, no login requirements, no usage limits. Use any tool as many times as you want, completely unrestricted.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* SEO Paragraph */}
            <div className="max-w-4xl mx-auto bg-muted/30 rounded-xl p-8" data-testid="section-seo-content">
              <h3 className="text-2xl font-bold mb-4 text-center">India's Most Comprehensive Free Online Tool Hub</h3>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Pixocraft Tools has established itself as <strong>India's biggest free online tool hub</strong>, offering an unparalleled collection of <strong>200+ static, browser-based tools</strong> that cater to every digital need. Whether you're looking for powerful <strong>text tools</strong> like word counters, case converters, and text summarizers, or advanced <strong>image tools</strong> including compressors, resizers, and format converters, Pixocraft delivers instant results without any signup or registration.
                </p>
                <p>
                  Our comprehensive suite includes professional <strong>PDF tools</strong> for merging, splitting, and rotating documents, essential <strong>developer tools</strong> like JSON formatters, code beautifiers, minifiers, and Base64 encoders, along with powerful <strong>math tools</strong> featuring EMI calculators, loan calculators, and fraction solvers. The platform also features innovative <strong>AI tools</strong> for text summarization and speech processing, creative <strong>color tools</strong> for designers, and productivity enhancers like todo lists and expense trackers.
                </p>
                <p>
                  What makes Pixocraft truly special is our commitment to <strong>privacy-based tools</strong> and <strong>offline-friendly tools</strong>. Every tool runs entirely in your browser, ensuring <strong>zero tracking</strong>, no data uploads, and complete privacy protection. As India's fastest online tool platform with <strong>0ms server delay</strong>, we've built the most extensive collection of <strong>static tools</strong> that work seamlessly offline, making us the go-to destination for professionals, students, developers, and creators across India who demand speed, privacy, and reliability from their online tools.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="py-20 border-b">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary">Most Popular</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Popular Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Handpicked favorites from our collection of 200+ tools, used by thousands daily
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTools.map((tool) => {
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
                          Use Tool
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
                  View All 200+ Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by Category Section */}
        <section className="py-20 border-b bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary">Categories</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Browse by Category</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our organized collection of tools across different categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.id} className="hover-elevate transition-all duration-200 group" data-testid={`card-category-${category.id}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">{category.toolCount}+ tools</Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{category.name}</CardTitle>
                      <CardDescription className="leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href="/tools" className="w-full">
                        <Button variant="outline" className="w-full" data-testid={`button-category-${category.id}`}>
                          View Tools
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Premium Tools Section */}
        <section className="py-20 border-b">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary">Premium Features, Zero Cost</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Premium Tools</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced tools that would cost money elsewhere—completely free here
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {premiumTools.map((tool) => {
                if (!tool) return null;
                const Icon = getToolIcon(tool.icon);
                return (
                  <Card key={tool.id} className="hover-elevate transition-all duration-200 group text-center" data-testid={`card-premium-${tool.id}`}>
                    <CardHeader className="space-y-3">
                      <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Link href={tool.path} className="w-full">
                        <Button size="sm" className="w-full" data-testid={`button-premium-${tool.id}`}>
                          Try Free
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 border-b bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary">Testimonials</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Loved by Users Across India</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied users who trust Pixocraft Tools daily
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background" data-testid={`card-testimonial-${index}`}>
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <CardDescription className="text-base leading-relaxed text-foreground">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-b">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="secondary">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about Pixocraft Tools
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4" data-testid="accordion-faq">
              <AccordionItem value="item-1" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-what-is">
                  What is Pixocraft Tools?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Pixocraft Tools is India's biggest free online tool hub offering 200+ browser-based tools for text processing, image editing, PDF manipulation, developer utilities, math calculations, and productivity. All tools are 100% free, work offline, and require no signup.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-why-biggest">
                  Why is Pixocraft India's biggest tool hub?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Pixocraft Tools is India's biggest tool hub because we offer 200+ completely free, static, browser-based tools with zero tracking, no login requirements, and full offline support. All tools run entirely in your browser with 0ms server delay.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-free">
                  Are all tools completely free?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, all 200+ tools on Pixocraft are 100% free forever. There are no premium tiers, no paywalls, no credits system, and no hidden costs. Every feature is completely free with no limitations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-offline">
                  Do tools work offline?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, all tools on Pixocraft are fully browser-based and work offline once the page is loaded. Your data never leaves your device and everything processes locally in your browser.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-data-safe">
                  Is my data safe?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Absolutely. Pixocraft Tools processes everything locally in your browser. We don't upload, store, or track any of your data. Your files and information never leave your device, ensuring 100% privacy and security.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-tracking">
                  Do you track users?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No. Pixocraft Tools does not track users, collect analytics, or store any personal information. We are committed to your privacy with zero tracking and zero data collection.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-how-many">
                  How many tools are available?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Pixocraft Tools currently offers 200+ free tools and is continuously growing. Our collection includes text tools, image tools, PDF tools, developer tools, math tools, AI tools, productivity tools, and more.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border rounded-lg px-6">
                <AccordionTrigger className="text-left" data-testid="faq-trigger-upload">
                  Are files uploaded to a server?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No. All processing happens entirely in your browser. Files are never uploaded to any server. This ensures maximum privacy, security, and blazing-fast performance with 0ms server delay.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-lg">
              <CardContent className="p-12 text-center space-y-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">Ready to Get Started?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Join 10,000+ daily users who trust India's biggest tool hub for their workflows. No signup, no credit card, completely free.
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
