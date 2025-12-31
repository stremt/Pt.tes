import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { Copy, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OpenGraphTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("website");
  const [generatedTags, setGeneratedTags] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Open Graph Tag Generator – Create Social Media Meta Tags Free",
    description: "Generate Open Graph tags for Facebook, Twitter, LinkedIn sharing. Control link previews and social media appearance instantly. No signup.",
    keywords: "open graph generator, og tags, social media tags, meta tags generator, facebook og tags, twitter card tags",
    canonicalUrl: "https://tools.pixocraft.in/tools/open-graph-tag-generator",
  });

  const generateTags = () => {
    if (!title || !description || !url) {
      toast({ title: "Error", description: "Title, description, and URL are required", variant: "destructive" });
      return;
    }

    const tags = `<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="${type}">${image ? `\n<meta property="og:image" content="${image}">` : ''}
<meta property="og:site_name" content="Your Site Name">`;

    setGeneratedTags(tags);
    toast({ title: "Open Graph tags generated!" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    toast({ title: "Copied to clipboard!" });
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(generatedTags));
    element.setAttribute("download", "og-tags.html");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "OG tags downloaded!" });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <Link href="/tools/developer" className="hover:text-foreground">Developer Tools</Link>
          {" / "}
          <span className="text-foreground">Open Graph Tag Generator</span>
        </div>

        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Open Graph Tag Generator – Perfect Social Media Link Previews</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate Open Graph tags for Facebook, Twitter, LinkedIn sharing. Control link previews and social media appearance instantly. No signup.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">Free</Badge>
            <Badge variant="secondary">Offline</Badge>
            <Badge variant="secondary">No Signup</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Configure Open Graph</CardTitle>
              <CardDescription>Enter your content details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title *</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page Title"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description *</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your page"
                  className="min-h-24"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">URL *</label>
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Image URL</label>
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="website">Website</option>
                  <option value="article">Article</option>
                  <option value="blog">Blog</option>
                  <option value="product">Product</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <Button onClick={generateTags} size="lg" className="w-full">
                Generate OG Tags
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {generatedTags && (
                <>
                  <Textarea
                    value={generatedTags}
                    readOnly
                    className="min-h-48 font-mono text-xs"
                  />
                  <Button onClick={copyToClipboard} variant="outline" className="w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button onClick={downloadFile} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">Why Open Graph Tags Are Essential for Social Sharing</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>When you share a link on Facebook, Twitter, LinkedIn, or WhatsApp, the platform automatically generates a preview showing the page title, description, image, and sometimes the website. This preview is controlled by Open Graph tags – special meta tags in your page's HTML that tell social networks exactly what information to display. Without proper Open Graph tags, social shares look unprofessional, unattractive, and get fewer clicks. With them, your content looks polished, engaging, and drives significantly more traffic.</p>
            
            <p>Open Graph tags were created by Facebook and have become the social media standard. Every social platform – Facebook, Twitter, LinkedIn, Pinterest, Slack, WhatsApp, and more – uses them to generate link previews. You can control exactly what image appears (crucial for thumbnails), what title displays, what description shows, and what type of content it is (article, video, product, etc.). For businesses, bloggers, and marketers, this level of control is essential for social media engagement and click-through rates.</p>
            
            <p>Without optimized Open Graph tags, social shares often look broken or unappealing. The image might be the wrong one, the title might be truncated, the description might be poorly formatted. People are visual and make split-second decisions about whether to click links in their feed. A compelling preview with a great image and clear title drastically improves clicks. This free generator helps you create perfect Open Graph tags without coding knowledge – just fill in your content details and copy the code.</p>
            
            <p>The tool lets you customize every important Open Graph property: og:title, og:description, og:image, og:type, og:url, and more. Generate tags for blog posts, products, videos, articles, or any content type. The generated HTML code goes in your page's head section. Test your tags directly using Facebook's Share Debugger or other preview tools to ensure they display correctly. Well-optimized Open Graph tags are a simple way to maximize your social media traffic and engagement.</p>
          </div>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What's the ideal image size for Open Graph tags?</h3>
              <p className="text-muted-foreground">Facebook recommends 1200x630 pixels (1.91:1 ratio) for optimal display. Minimum is 200x200 pixels. LinkedIn prefers 1200x627 pixels. Keep file size under 5MB.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">If I don't have Open Graph tags, what will social platforms display?</h3>
              <p className="text-muted-foreground">Platforms will try to auto-detect content – often picking a random image, truncating titles, or showing incomplete descriptions. Results are unreliable and unprofessional. Always use explicit Open Graph tags.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Should I use Twitter Cards instead of Open Graph tags?</h3>
              <p className="text-muted-foreground">Twitter reads Open Graph tags first, then falls back to Twitter Card tags. For maximum compatibility, use both. However, Open Graph is sufficient for most purposes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use different Open Graph tags for different pages on my site?</h3>
              <p className="text-muted-foreground">Yes, and you should! Each page should have unique og:title, og:description, and og:image that accurately represent that specific page's content. This is best practice for SEO and social engagement.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I test if my Open Graph tags are working correctly?</h3>
              <p className="text-muted-foreground">Use Facebook's Share Debugger (facebook.com/developers/tools/debug/) or LinkedIn's Post Inspector. Paste your URL and see exactly what each platform will display.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is this generator completely private and offline?</h3>
              <p className="text-muted-foreground">Yes, 100% offline. All processing happens in your browser – your content and URLs never touch any server. Complete privacy and security guaranteed.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's the "og:type" property and how should I use it?</h3>
              <p className="text-muted-foreground">og:type specifies content type: "website" for pages, "article" for blog posts, "video.movie" for videos, "product" for e-commerce items. Use the type that best matches your content.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">Related Tools You Might Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/meta-tag-generator" className="hover:text-foreground underline">Meta Tag Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/meta-robots-tag-generator" className="hover:text-foreground underline">Meta Robots Tag Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/canonical-url-generator" className="hover:text-foreground underline">Canonical URL Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/robots-txt-generator" className="hover:text-foreground underline">Robots.txt Generator</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
