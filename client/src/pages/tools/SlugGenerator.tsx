import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Link2, Copy, RotateCcw, Zap, Lock, Globe, CheckCircle } from "lucide-react";

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he', 'in', 'is',
  'it', 'its', 'of', 'on', 'or', 'that', 'the', 'to', 'was', 'will', 'with', 'you', 'your',
  'i', 'me', 'my', 'we', 'they', 'them', 'this', 'which', 'who', 'what', 'when', 'where', 'why',
]);

type SeparatorType = 'dash' | 'underscore' | 'none';

export default function SlugGenerator() {
  const [inputText, setInputText] = useState("");
  const [separator, setSeparator] = useState<SeparatorType>('dash');
  const [removeStopWords, setRemoveStopWords] = useState(false);
  const [removeNumbers, setRemoveNumbers] = useState(false);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Free Slug Generator - Create SEO-Friendly URLs",
    description: "Convert text to SEO-friendly URL slugs instantly. Customize separators, remove stop words, filter numbers. 100% free, offline, private.",
    keywords: "slug generator, url slug generator, seo slug tool, slug creator, url generator, permalink generator, SEO URL",
    canonicalUrl: "https://tools.pixocraft.in/tools/slug-generator",
  });

  const slug = useMemo(() => {
    if (!inputText) return "";

    let text = inputText.toLowerCase().trim();

    // Remove special characters but keep spaces, hyphens, underscores
    text = text.replace(/[^\w\s-]/g, '');

    // Split into words
    let words = text.split(/[\s_-]+/).filter(word => word.length > 0);

    // Remove stop words if enabled
    if (removeStopWords) {
      words = words.filter(word => !STOP_WORDS.has(word));
    }

    // Remove numbers if enabled
    if (removeNumbers) {
      words = words.map(word => word.replace(/\d+/g, '')).filter(word => word.length > 0);
    }

    // Join with chosen separator
    let result = words.join(
      separator === 'dash' ? '-' : separator === 'underscore' ? '_' : ''
    );

    // Clean up any multiple separators
    if (separator !== 'none') {
      const sep = separator === 'dash' ? '-' : '_';
      result = result.replace(new RegExp(`${sep}+`, 'g'), sep);
    }

    // Remove leading/trailing separators
    if (separator !== 'none') {
      const sep = separator === 'dash' ? '-' : '_';
      result = result.replace(new RegExp(`^${sep}+|${sep}+$`, 'g'), '');
    }

    return result;
  }, [inputText, separator, removeStopWords, removeNumbers]);

  const handleReset = () => {
    setInputText("");
    setSeparator('dash');
    setRemoveStopWords(false);
    setRemoveNumbers(false);
  };

  const handleClear = () => {
    setInputText("");
  };

  const wordCount = slug ? slug.split(separator === 'dash' ? '-' : separator === 'underscore' ? '_' : '') : 0;

  return (
    <ToolLayout
      title="Advanced Slug Generator - Create SEO-Friendly URLs"
      description="Convert text to clean URL slugs with customizable separators, stop word removal, and number filtering. Perfect for blog posts, products, and web content."
      icon={<Link2 className="h-10 w-10 text-primary" />}
      toolId="slug-generator"
      category="SEO & Web"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type the title or text you want to convert into a URL slug." },
        { step: 2, title: "Customize Options", description: "Choose separator style, remove stop words, or filter numbers as needed." },
        { step: 3, title: "Copy & Use", description: "Copy the generated slug and use it in your URLs." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Generation", description: "Real-time slug creation with live preview." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Offline Safe", description: "Works completely in your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "SEO Friendly", description: "Customizable options for optimal search engine performance." },
      ]}
      faqs={[
        { question: "What's the difference between dash and underscore separators?", answer: "Google treats hyphens (-) as word separators, making 'my-blog-post' better for SEO. Underscores (_) are treated as word connectors, so 'my_blog_post' is less ideal for SEO. Use dashes for best results." },
        { question: "What are stop words and why remove them?", answer: "Stop words are common words like 'the', 'a', 'and' that don't add meaning. Removing them creates shorter, cleaner URLs. For example, 'the amazing blog post' becomes 'amazing-blog-post'." },
        { question: "Why would I remove numbers from slugs?", answer: "Numbers can date your content or create long slugs. Removing them helps if you're generating slugs from titles that include numbers, dates, or quantities you don't want in the URL." },
        { question: "Can I use this for blog URLs?", answer: "Absolutely! Perfect for blog posts, pages, landing pages, and any web content URL. Helps with SEO and makes URLs human-readable." },
        { question: "Is it SEO optimized?", answer: "Yes, the slug follows SEO best practices: lowercase letters, hyphens (recommended) for word separation, no special characters. Fully customizable for your specific needs." },
        { question: "Can I use this for product URLs?", answer: "Yes! Great for e-commerce product pages, portfolio items, or any content that needs a clean, readable URL." },
        { question: "Does it work with non-English text?", answer: "Yes, it converts international characters to ASCII equivalents. For example, 'café' becomes 'cafe', ensuring compatibility with all web servers." },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-6 px-2 sm:px-4">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Text to Convert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter your title or text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="text-sm sm:text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        {/* Options Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Customization Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Separator Options */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Separator Type</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button
                  variant={separator === 'dash' ? 'default' : 'outline'}
                  onClick={() => setSeparator('dash')}
                  className="w-full text-xs sm:text-sm"
                  data-testid="button-separator-dash"
                >
                  Separate with dash (-)
                </Button>
                <Button
                  variant={separator === 'underscore' ? 'default' : 'outline'}
                  onClick={() => setSeparator('underscore')}
                  className="w-full text-xs sm:text-sm"
                  data-testid="button-separator-underscore"
                >
                  Separate with underscore (_)
                </Button>
                <Button
                  variant={separator === 'none' ? 'default' : 'outline'}
                  onClick={() => setSeparator('none')}
                  className="w-full text-xs sm:text-sm"
                  data-testid="button-separator-none"
                >
                  No separator
                </Button>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex items-center space-x-2 cursor-pointer hover-elevate p-2 rounded">
                <Checkbox
                  id="remove-stop-words"
                  checked={removeStopWords}
                  onCheckedChange={(checked) => setRemoveStopWords(checked as boolean)}
                  data-testid="checkbox-remove-stop-words"
                />
                <label htmlFor="remove-stop-words" className="text-sm sm:text-base cursor-pointer">
                  Remove stop words (a, the, and, etc.)
                </label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover-elevate p-2 rounded">
                <Checkbox
                  id="remove-numbers"
                  checked={removeNumbers}
                  onCheckedChange={(checked) => setRemoveNumbers(checked as boolean)}
                  data-testid="checkbox-remove-numbers"
                />
                <label htmlFor="remove-numbers" className="text-sm sm:text-base cursor-pointer">
                  Remove numbers from slug
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl flex items-center justify-between gap-2 flex-wrap">
              <span>Generated Slug</span>
              <div className="flex gap-2 flex-wrap justify-end">
                {inputText && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClear}
                      className="text-xs sm:text-sm"
                      data-testid="button-clear"
                    >
                      <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Clear
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="text-xs sm:text-sm"
                      data-testid="button-reset"
                    >
                      <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Reset
                    </Button>
                  </>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border-2 border-dashed">
              <p className="font-mono text-xs sm:text-base text-primary font-semibold break-all">
                {slug || (
                  <span className="text-muted-foreground italic text-xs sm:text-sm">your-url-slug-will-appear-here</span>
                )}
              </p>
            </div>

            {slug && (
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={() => copyToClipboard(slug, "Slug copied!")}
                    className="flex-1 text-xs sm:text-sm"
                    data-testid="button-copy"
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Copy Slug
                  </Button>
                  <Button
                    onClick={() => copyToClipboard(`https://yoursite.com/${slug}`, "Full URL copied!")}
                    variant="secondary"
                    className="flex-1 text-xs sm:text-sm"
                    data-testid="button-copy-full-url"
                  >
                    <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Copy Full URL
                  </Button>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-900 space-y-2">
                  <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100">
                    <strong>Example URL:</strong>
                  </p>
                  <p className="font-mono text-xs sm:text-sm text-blue-800 dark:text-blue-200 break-all">
                    https://yoursite.com/{slug}
                  </p>
                </div>

                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-900 flex gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-green-900 dark:text-green-100">
                    <strong>SEO Ready!</strong> This slug follows best practices for search engine optimization.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Section */}
        {inputText && slug && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-muted rounded text-center">
                  <p className="text-xs text-muted-foreground">Original Length</p>
                  <p className="text-lg sm:text-2xl font-bold text-primary">{inputText.length}</p>
                </div>
                <div className="p-3 bg-muted rounded text-center">
                  <p className="text-xs text-muted-foreground">Slug Length</p>
                  <p className="text-lg sm:text-2xl font-bold text-primary">{slug.length}</p>
                </div>
                <div className="p-3 bg-muted rounded text-center">
                  <p className="text-xs text-muted-foreground">Words</p>
                  <p className="text-lg sm:text-2xl font-bold text-primary">{typeof wordCount === 'number' ? 1 : wordCount.length}</p>
                </div>
                <div className="p-3 bg-muted rounded text-center">
                  <p className="text-xs text-muted-foreground">Reduction</p>
                  <p className="text-lg sm:text-2xl font-bold text-primary">
                    {Math.round(((inputText.length - slug.length) / inputText.length) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
