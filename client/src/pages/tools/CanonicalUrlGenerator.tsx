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

export default function CanonicalUrlGenerator() {
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [generatedTag, setGeneratedTag] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Canonical URL Generator – Fix Duplicate Content SEO Issues",
    description: "Create rel canonical tags instantly. Prevent duplicate content problems and SEO penalties. Free tool for all websites.",
    keywords: "canonical url generator, rel canonical, duplicate content fix, seo canonical tag, canonical link",
    canonicalUrl: "https://tools.pixocraft.in/tools/canonical-url-generator",
  });

  const generateTag = () => {
    if (!canonicalUrl.trim()) {
      toast({ title: "Error", description: "Please enter a canonical URL", variant: "destructive" });
      return;
    }

    const content = `<link rel="canonical" href="${canonicalUrl}">`;
    setGeneratedTag(content);
    toast({ title: "Canonical tag generated!" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTag);
    toast({ title: "Copied to clipboard!" });
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(generatedTag));
    element.setAttribute("download", "canonical-tag.html");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Canonical tag downloaded!" });
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
          <span className="text-foreground">Canonical URL Generator</span>
        </div>

        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Canonical URL Generator – Stop Duplicate Content SEO Issues</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create rel canonical tags instantly. Prevent duplicate content problems and SEO penalties. Free tool for all websites.
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
              <CardTitle>Create Canonical Tag</CardTitle>
              <CardDescription>Enter the preferred URL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Canonical URL</label>
                <Input
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/article"
                />
              </div>

              <Button onClick={generateTag} size="lg" className="w-full">
                Generate Canonical Tag
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Tag</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {generatedTag && (
                <>
                  <Textarea
                    value={generatedTag}
                    readOnly
                    className="min-h-32 font-mono text-xs"
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
          <h2 className="text-3xl font-bold">Solve Duplicate Content Problems with Canonical Tags</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>Duplicate content is one of the most common SEO problems affecting website rankings. When you have multiple URLs serving similar or identical content – whether through URL parameters, www vs. non-www versions, HTTP vs. HTTPS, or accidentally published duplicate pages – search engines become confused about which version to index and rank. A canonical tag solves this by telling Google "this is the primary version, index this one." Without canonicalization, you risk dividing link equity across multiple URLs, diluting your ranking power.</p>
            
            <p>Duplicate content happens more often than you'd think. E-commerce sites often have the same product accessible through different category filters. Blog platforms might serve pages with and without trailing slashes. CMS systems can create version duplicates. Even simple parameter variations like ?ref=social or ?utm_source=email create separate URLs with identical content. Search engines waste crawl budget processing these duplicates instead of discovering new content. A canonical tag consolidates ranking signals onto your preferred version.</p>
            
            <p>The canonical tag (rel="canonical") is a simple HTML element that belongs in your page's head section. It tells search engines: "This page is a duplicate or variation of [URL], so credit the original." When implemented correctly, Google consolidates rankings, backlinks, and authority signals to your canonical URL, massively improving SEO performance. This free generator creates the exact code you need – just enter your preferred URL and copy the generated HTML tag into each duplicate page.</p>
            
            <p>Using this tool, you can instantly generate proper canonical tags for all your website pages. Unlike robots.txt which blocks crawling entirely or meta robots which prevents indexing, canonical tags encourage crawling while consolidating authority. They're essential for managing pagination, international versions, AMP pages, and parameter-based pages. Check your site structure in Google Search Console to identify duplicate content issues, then use this generator to create proper canonicalization quickly and correctly.</p>
          </div>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Should I use rel="canonical" or the canonical HTTP header?</h3>
              <p className="text-muted-foreground">Both work, but rel="canonical" in HTML is easier to implement. HTTP headers are better for PDFs and non-HTML files. Most websites use HTML rel="canonical" tags.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I point a canonical tag to a different domain?</h3>
              <p className="text-muted-foreground">Yes, Google supports cross-domain canonicalization. You can tell Google that your page at example.com/product is the canonical version of example2.com/product. Useful for syndicated content.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">If I use canonical tags, will the duplicate pages still show in search results?</h3>
              <p className="text-muted-foreground">Usually not – Google consolidates them to the canonical version. However, if the duplicate has more backlinks, Google might ignore your canonical and rank the duplicate instead.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How many canonical tags can one page have?</h3>
              <p className="text-muted-foreground">One page should have only ONE canonical tag. Multiple canonicals create conflicts. If you need to specify multiple canonical URLs, use a sitemap instead.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is this generator private and offline?</h3>
              <p className="text-muted-foreground">Yes, 100% offline. All processing happens in your browser. Your URLs are never sent to any server – completely private and secure.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What's the difference between canonical tags and 301 redirects?</h3>
              <p className="text-muted-foreground">301 redirects permanently move users and link equity to a new URL. Canonical tags keep both URLs live but consolidate ranking power to one. Use 301 for permanent changes, canonical for parameter variations.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">Related Tools You Might Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/meta-robots-tag-generator" className="hover:text-foreground underline">Meta Robots Tag Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/robots-txt-generator" className="hover:text-foreground underline">Robots.txt Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/sitemap-xml-generator" className="hover:text-foreground underline">Sitemap.xml Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/meta-tag-generator" className="hover:text-foreground underline">Meta Tag Generator</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
