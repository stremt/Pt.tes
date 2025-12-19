import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Link2, Copy, RotateCcw, Zap, Lock, Globe } from "lucide-react";

export default function SlugGenerator() {
  const [inputText, setInputText] = useState("");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Free Slug Generator - Create SEO-Friendly URLs",
    description: "Convert text to SEO-friendly URL slugs instantly. Remove special characters, convert spaces to hyphens. 100% free, offline, private.",
    keywords: "slug generator, url slug generator, seo slug tool, slug creator, url generator, permalink generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/slug-generator",
  });

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const slug = generateSlug(inputText);

  return (
    <ToolLayout
      title="Slug Generator"
      description="Enter text → get clean URL-friendly slug with hyphens."
      icon={<Link2 className="h-10 w-10 text-primary" />}
      toolId="slug-generator"
      category="SEO & Web"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type the title or text you want to convert." },
        { step: 2, title: "Auto Generate", description: "Slug is automatically created as you type." },
        { step: 3, title: "Copy & Use", description: "Copy the slug for your URL." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Generation", description: "Real-time slug creation as you type." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Offline Safe", description: "Works completely in your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "SEO Friendly", description: "Creates clean, search engine optimized URLs." },
      ]}
      faqs={[
        { question: "Does it remove symbols?", answer: "Yes — automatically removes special characters, spaces, and punctuation. Converts them to hyphens for clean, SEO-friendly slugs." },
        { question: "Is it SEO optimized?", answer: "Yes, the slug follows SEO best practices: lowercase letters, hyphens instead of spaces, no special characters. Perfect for search engines and readability." },
        { question: "Can I use this for blog URLs?", answer: "Absolutely! Perfect for blog posts, pages, landing pages, and any web content URL. Helps with SEO and makes URLs human-readable." },
        { question: "Why use hyphens instead of underscores?", answer: "Search engines (like Google) treat hyphens as word separators, so slugs like 'my-blog-post' are better for SEO than 'my_blog_post'." },
        { question: "Can I use this for product URLs?", answer: "Yes! Great for e-commerce product pages, portfolio items, or any content that needs a clean, readable URL." },
        { question: "Does it work with non-English text?", answer: "Yes, it converts international characters to ASCII equivalents. For example, 'café' becomes 'cafe', ensuring compatibility with all web servers." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Text to Convert</span>
              {inputText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInputText("")}
                  data-testid="button-clear"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter your title or text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>URL Slug</span>
              {slug && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(slug, "Slug copied!")}
                  data-testid="button-copy"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg text-base font-mono text-primary">
              {slug || <span className="text-muted-foreground italic">your-url-slug-will-appear-here</span>}
            </div>
            {slug && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-900">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Example URL:</strong> https://yoursite.com/{slug}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
