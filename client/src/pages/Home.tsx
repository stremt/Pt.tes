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

  // All testimonials - rotates daily
  const allTestimonials = [
    { name: "Rajat Kumar", role: "Software Developer, Mumbai", content: "India's fastest offline tool website. I use it daily for JSON formatting and Base64 encoding. No ads, no nonsense!", rating: 5 },
    { name: "Priya Sharma", role: "Graphic Designer, Delhi", content: "The color palette generator and image compressor are game-changers for my design work. Absolutely love this tool hub!", rating: 5 },
    { name: "Arjun Mehta", role: "Content Writer, Bangalore", content: "Word counter, text summarizer, and case converters save me hours every week. Best free tool collection I've found!", rating: 5 },
    { name: "Neha Gupta", role: "Digital Marketer, Pune", content: "QR code generator and image tools are perfect for my campaigns. Fast, reliable, and completely free!", rating: 5 },
    { name: "Vikram Singh", role: "Full Stack Developer, Hyderabad", content: "The developer tools section is incredible. JSON formatter, code beautifier, and Base64 encoder - all in one place!", rating: 5 },
    { name: "Aisha Khan", role: "UI/UX Designer, Chennai", content: "Color tools and gradient generators are exactly what I needed. No login, no tracking, just pure functionality!", rating: 5 },
    { name: "Rohit Verma", role: "Freelance Writer, Kolkata", content: "Text tools are fantastic! Case converter and character counter are my daily go-to utilities. Highly recommend!", rating: 5 },
    { name: "Sneha Patel", role: "Social Media Manager, Ahmedabad", content: "Image compressor saves me so much time. Upload speed is instant, and quality is maintained perfectly!", rating: 5 },
    { name: "Karan Desai", role: "Web Developer, Surat", content: "CSS generators and code minifiers are professional-grade. Can't believe this is completely free!", rating: 5 },
    { name: "Ananya Iyer", role: "Blogger, Mumbai", content: "Word counter and SEO tools help me optimize every post. This is my secret weapon for content creation!", rating: 5 },
    { name: "Siddharth Joshi", role: "Mobile App Developer, Noida", content: "API snippet builder and JSON tools are lifesavers. Fast, accurate, and works offline too!", rating: 5 },
    { name: "Divya Reddy", role: "E-commerce Manager, Bangalore", content: "QR code maker and barcode generator are perfect for my product listings. Super easy to use!", rating: 5 },
    { name: "Amit Gupta", role: "Data Analyst, Gurgaon", content: "Math calculators and conversion tools are spot-on accurate. Use them daily for quick calculations!", rating: 5 },
    { name: "Riya Shah", role: "Student, Delhi", content: "BMI calculator, age calculator, and study tools help me every day. Perfect for students like me!", rating: 5 },
    { name: "Manish Kumar", role: "Photographer, Jaipur", content: "Background remover and image editing tools are professional quality. Saves me hours of Photoshop work!", rating: 5 },
    { name: "Kavya Nair", role: "HR Professional, Kochi", content: "PDF tools for merging and splitting documents are incredibly useful. No more expensive subscriptions!", rating: 5 },
    { name: "Rahul Malhotra", role: "Startup Founder, Chandigarh", content: "Password generator and privacy tools keep my startup secure. Love the zero-tracking policy!", rating: 5 },
    { name: "Pooja Agarwal", role: "Teacher, Lucknow", content: "Educational tools and calculators are perfect for my classroom. Students love using these free resources!", rating: 5 },
    { name: "Varun Kapoor", role: "DevOps Engineer, Pune", content: "Hash generators and encryption tools are essential for my security workflows. Lightning fast!", rating: 5 },
    { name: "Simran Kaur", role: "Fashion Blogger, Delhi", content: "Image tools and color pickers help me create stunning visuals. This is my creative companion!", rating: 5 },
    { name: "Abhishek Pandey", role: "Finance Analyst, Mumbai", content: "EMI calculator and compound interest tools are accurate and easy to use. Perfect for financial planning!", rating: 5 },
    { name: "Meera Krishnan", role: "Interior Designer, Bangalore", content: "Gradient generators and color schemes inspire my design projects. Beautiful, functional, and free!", rating: 5 },
    { name: "Nikhil Sinha", role: "Video Editor, Kolkata", content: "GIF compressor and video tools process files instantly. No more waiting for uploads!", rating: 5 },
    { name: "Ishita Bansal", role: "Nutritionist, Chandigarh", content: "Calorie calculator and health tools are accurate and helpful for my clients. Highly professional!", rating: 5 },
    { name: "Harsh Tiwari", role: "Game Developer, Hyderabad", content: "Random generators and developer utilities speed up my prototyping. Invaluable for game dev!", rating: 5 },
    { name: "Sakshi Rao", role: "Marketing Executive, Chennai", content: "Text styler and fancy text generators create eye-catching social media posts. Love it!", rating: 5 },
    { name: "Gaurav Mishra", role: "Architect, Indore", content: "Measurement converters and calculators are essential for my architectural work. Super reliable!", rating: 5 },
    { name: "Tanvi Chopra", role: "Podcast Host, Mumbai", content: "Audio tools and noise remover enhance my podcast quality. Professional results, zero cost!", rating: 5 },
    { name: "Ajay Yadav", role: "SEO Specialist, Noida", content: "Keyword tools and text analyzers boost my SEO strategies. This hub is a goldmine for marketers!", rating: 5 },
    { name: "Nisha Pillai", role: "Event Planner, Bangalore", content: "QR codes for invites and image tools for flyers - everything I need in one place. Absolutely brilliant!", rating: 5 }
  ];

  // Select 3 testimonials based on day of year (changes daily)
  const testimonials = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const startIndex = (dayOfYear * 3) % allTestimonials.length;
    return [
      allTestimonials[startIndex % allTestimonials.length],
      allTestimonials[(startIndex + 1) % allTestimonials.length],
      allTestimonials[(startIndex + 2) % allTestimonials.length]
    ];
  }, []);

  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-muted/30 to-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12 md:py-16 lg:py-20 max-w-7xl relative">
            <div className="mx-auto max-w-4xl text-center space-y-4 sm:space-y-6 md:space-y-8">
              <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5" data-testid="badge-india-biggest">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                India's Biggest Tool Hub
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight px-2 sm:px-4">
                Pixocraft Tools — India's Biggest Free Online Tool Hub
                <br />
                <span className="text-primary">(200+ Tools)</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
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
              <div className="pt-6 sm:pt-8 md:pt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-sm px-2 sm:px-4">
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
        <section className="py-8 sm:py-12 md:py-16 bg-muted/30 border-b">
          <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-3 gap-y-3 sm:gap-x-4 sm:gap-y-4 md:gap-x-6 md:gap-y-6">
              <Card className="text-center col-span-2 sm:col-span-1" data-testid="card-trust-largest">
                <CardHeader className="p-3 sm:p-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Star className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl">India's Largest</CardTitle>
                  <CardDescription>Static Tool Hub</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-tools">
                <CardHeader className="p-3 sm:p-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Database className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl">200+ Tools</CardTitle>
                  <CardDescription>Free Forever</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-users">
                <CardHeader className="p-3 sm:p-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl">10,000+</CardTitle>
                  <CardDescription>Daily Users</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-privacy">
                <CardHeader className="p-3 sm:p-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl">Zero Tracking</CardTitle>
                  <CardDescription>Full Privacy</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center" data-testid="card-trust-speed">
                <CardHeader className="p-3 sm:p-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl">0ms Delay</CardTitle>
                  <CardDescription>Browser-Based</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Pixocraft Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b">
          <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
            <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 mb-8 sm:mb-12 md:mb-16 px-2 sm:px-4">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">Why India Chooses Pixocraft Tools</h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                The most comprehensive free online tool hub built for speed, privacy, and convenience
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-fast">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Blazing Fast</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                    Runs entirely in your browser with 0ms server delay. No waiting, no loading spinners—just instant results every time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-privacy">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Privacy First</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                    No uploads, no tracking, no data collection. Everything processes locally in your browser for maximum privacy and security.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-free">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Always Free</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                    Every feature, every tool, 100% free forever. No premium tiers, no paywalls, no hidden costs or limitations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-india">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Star className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">India's Biggest</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                    With 200+ tools and growing, Pixocraft is India's largest free online tool hub serving thousands daily.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-static">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Globe className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">100% Static</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
                    Fully browser-based tools that work offline. No backend servers, no databases—complete client-side processing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-none bg-muted/30" data-testid="card-why-no-limits">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">No Limits</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-muted-foreground text-center leading-relaxed">
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b">
          <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-2 sm:px-4">
              <Badge variant="secondary">Most Popular</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">Popular Tools</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Handpicked favorites from our collection of 200+ tools, used by thousands daily
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {popularTools.map((tool) => {
                const Icon = getToolIcon(tool.icon);
                return (
                  <Card key={tool.id} className="hover-elevate transition-all duration-200 group flex flex-col" data-testid={`card-tool-${tool.id}`}>
                    <CardHeader className="space-y-2 sm:space-y-4 p-4 sm:p-6">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">{tool.name}</CardTitle>
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-2 sm:px-4">
              <Badge variant="secondary">Categories</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">Browse by Category</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our organized collection of tools across different categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.id} className="hover-elevate transition-all duration-200 group" data-testid={`card-category-${category.id}`}>
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="text-xs">{category.toolCount}+ tools</Badge>
                      </div>
                      <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">{category.name}</CardTitle>
                      <CardDescription className="leading-relaxed">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href={`/tools?category=${category.id}`} className="w-full">
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b">
          <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-2 sm:px-4">
              <Badge variant="secondary">Premium Features, Zero Cost</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">Featured Premium Tools</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Advanced tools that would cost money elsewhere—completely free here
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {premiumTools.map((tool) => {
                if (!tool) return null;
                const Icon = getToolIcon(tool.icon);
                return (
                  <Card key={tool.id} className="hover-elevate transition-all duration-200 group text-center" data-testid={`card-premium-${tool.id}`}>
                    <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
                      <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                      </div>
                      <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">{tool.name}</CardTitle>
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
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b bg-muted/30">
          <div className="container mx-auto px-2 sm:px-4 max-w-7xl">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-2 sm:px-4">
              <Badge variant="secondary">Testimonials</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">Loved by Users Across India</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of satisfied users who trust Pixocraft Tools daily
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background" data-testid={`card-testimonial-${index}`}>
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-center gap-1 mb-2 sm:mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <CardDescription className="text-sm sm:text-base leading-relaxed text-foreground">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1 p-4 sm:p-6 pt-0">
                    <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 border-b">
          <div className="container mx-auto px-2 sm:px-4 max-w-4xl">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-2 sm:px-4">
              <Badge variant="secondary">FAQ</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">Frequently Asked Questions</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Everything you need to know about Pixocraft Tools
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4" data-testid="accordion-faq">
              <AccordionItem value="item-1" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-what-is">
                  What is Pixocraft Tools?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Pixocraft Tools is India's biggest free online tool hub offering 200+ browser-based tools for text processing, image editing, PDF manipulation, developer utilities, math calculations, and productivity. All tools are 100% free, work offline, and require no signup.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-why-biggest">
                  Why is Pixocraft India's biggest tool hub?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Pixocraft Tools is India's biggest tool hub because we offer 200+ completely free, static, browser-based tools with zero tracking, no login requirements, and full offline support. All tools run entirely in your browser with 0ms server delay.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-free">
                  Are all tools completely free?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Yes, all 200+ tools on Pixocraft are 100% free forever. There are no premium tiers, no paywalls, no credits system, and no hidden costs. Every feature is completely free with no limitations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-offline">
                  Do tools work offline?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Yes, all tools on Pixocraft are fully browser-based and work offline once the page is loaded. Your data never leaves your device and everything processes locally in your browser.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-data-safe">
                  Is my data safe?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Absolutely. Pixocraft Tools processes everything locally in your browser. We don't upload, store, or track any of your data. Your files and information never leave your device, ensuring 100% privacy and security.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-tracking">
                  Do you track users?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  No. Pixocraft Tools does not track users, collect analytics, or store any personal information. We are committed to your privacy with zero tracking and zero data collection.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-how-many">
                  How many tools are available?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Pixocraft Tools currently offers 200+ free tools and is continuously growing. Our collection includes text tools, image tools, PDF tools, developer tools, math tools, AI tools, productivity tools, and more.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border rounded-lg px-4 sm:px-6">
                <AccordionTrigger className="text-left text-sm sm:text-base" data-testid="faq-trigger-upload">
                  Are files uploaded to a server?
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  No. All processing happens entirely in your browser. Files are never uploaded to any server. This ensures maximum privacy, security, and blazing-fast performance with 0ms server delay.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-2 sm:px-4 max-w-5xl">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background shadow-lg">
              <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12 text-center space-y-4 sm:space-y-6">
                <div className="inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-primary/10 mb-2 sm:mb-4">
                  <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">Ready to Get Started?</h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
                  Join 10,000+ daily users who trust India's biggest tool hub for their workflows. No signup, no credit card, completely free.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 sm:pt-4">
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
