import { useState } from "react";
import { useSEO, StructuredData } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Tags, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "Meta Tag Generator", "item": "https://tools.pixocraft.in/tools/meta-tag-generator" }
  ]
});

export default function MetaTagGenerator() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [ogImage, setOgImage] = useState<string>("");
  const [generatedTags, setGeneratedTags] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "Meta Tag Generator | SEO Title & Description Maker | Pixocraft Tools",
    description: "Generate SEO-friendly meta tags for websites. Free, fast & offline.",
    keywords: "meta tag generator, seo meta generator, meta description tool, seo tags",
    canonicalUrl: "https://tools.pixocraft.in/tools/meta-tag-generator",
  });

  const generateMetaTags = () => {
    if (!title || !description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in Title and Description",
        variant: "destructive",
      });
      return;
    }

    const tags = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}">
<meta name="description" content="${description}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
${author ? `<meta name="author" content="${author}">` : ''}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ''}

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
${ogImage ? `<meta property="twitter:image" content="${ogImage}">` : ''}`;

    setGeneratedTags(tags);
    toast({
      title: "Meta Tags Generated!",
      description: "Your SEO meta tags are ready",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedTags);
    toast({
      title: "Copied!",
      description: "Meta tags copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Enter Details", description: "Fill in title, description, and optional fields" },
    { step: 2, title: "Generate Tags", description: "Click to create SEO-optimized meta tags" },
    { step: 3, title: "Add to Website", description: "Copy and paste into your HTML <head> section" },
  ];

  const benefits = [
    { icon: <Tags className="h-5 w-5" />, title: "SEO Optimized", description: "Includes all essential meta tags for search engines" },
    { icon: <Tags className="h-5 w-5" />, title: "Social Ready", description: "Generates Open Graph and Twitter Card tags" },
    { icon: <Copy className="h-5 w-5" />, title: "Copy & Paste", description: "Ready-to-use HTML code for your website" },
  ];

  const faqs = [
    {
      question: "What are meta tags?",
      answer: "Meta tags are HTML elements that provide information about your webpage to search engines and social media platforms.",
    },
    {
      question: "Why are meta tags important?",
      answer: "Meta tags help improve SEO, control how your content appears in search results, and determine how links look when shared on social media.",
    },
    {
      question: "What's the ideal meta description length?",
      answer: "Meta descriptions should be 150-160 characters. Longer descriptions may be truncated in search results.",
    },
  ];

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="container mx-auto px-4 max-w-7xl pt-8">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Developer Tools", url: "/tools/developer" }, { label: "Meta Tag Generator" }]} />
      </div>
      <ToolLayout
      title="Meta Tag Generator"
      description="Generate SEO-friendly meta tags for websites. Free, fast & offline."
      icon={<Tags className="h-8 w-8" />}
      toolId="meta-tag-generator"
      category="generator"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
      footer={<p className="text-center text-sm text-muted-foreground"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Page Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Awesome Website | Home"
              maxLength={60}
              data-testid="input-title"
            />
            <p className="text-xs text-muted-foreground">{title.length}/60 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Meta Description *
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A compelling description of your page content..."
              maxLength={160}
              className="min-h-[80px]"
              data-testid="input-description"
            />
            <p className="text-xs text-muted-foreground">{description.length}/160 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-base font-semibold">
              Keywords (Optional)
            </Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
              data-testid="input-keywords"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author" className="text-base font-semibold">
                Author (Optional)
              </Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="John Doe"
                data-testid="input-author"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og-image" className="text-base font-semibold">
                OG Image URL (Optional)
              </Label>
              <Input
                id="og-image"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                data-testid="input-og-image"
              />
            </div>
          </div>

          <Button
            onClick={generateMetaTags}
            size="lg"
            data-testid="button-generate"
          >
            <Tags className="mr-2 h-5 w-5" />
            Generate Meta Tags
          </Button>
        </div>

        {generatedTags && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Generated Meta Tags
              </Label>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                data-testid="button-copy"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              value={generatedTags}
              readOnly
              className="min-h-[400px] font-mono text-sm"
              data-testid="textarea-output"
            />
          </div>
        )}
      </div>
    </ToolLayout>
    </>
  );
}
