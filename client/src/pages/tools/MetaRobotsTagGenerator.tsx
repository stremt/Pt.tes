import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { Copy, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MetaRobotsTagGenerator() {
  const [index, setIndex] = useState(true);
  const [follow, setFollow] = useState(true);
  const [nosnippet, setNosnippet] = useState(false);
  const [noarchive, setNoarchive] = useState(false);
  const [noimage, setNoimage] = useState(false);
  const [generatedTag, setGeneratedTag] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Meta Robots Tag Generator – Free SEO Control Tool",
    description: "Create meta robots tags for on-page SEO control. Manage indexing, snippets, and crawler behavior instantly. Free tool, no signup.",
    keywords: "meta robots tag generator, robots meta tag, seo meta tags, robots noindex, crawler control directives",
    canonicalUrl: "https://tools.pixocraft.in/tools/meta-robots-tag-generator",
  });

  const generateTag = () => {
    const directives = [];
    if (!index) directives.push("noindex");
    if (!follow) directives.push("nofollow");
    if (nosnippet) directives.push("nosnippet");
    if (noarchive) directives.push("noarchive");
    if (noimage) directives.push("noimageindex");

    const content = `<meta name="robots" content="${directives.length > 0 ? directives.join(', ') : 'index, follow'}">`;
    setGeneratedTag(content);
    toast({ title: "Meta robots tag generated!" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedTag);
    toast({ title: "Copied to clipboard!" });
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/html;charset=utf-8," + encodeURIComponent(generatedTag));
    element.setAttribute("download", "meta-robots.html");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "Meta tag downloaded!" });
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
          <span className="text-foreground">Meta Robots Tag Generator</span>
        </div>

        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Meta Robots Tag Generator – Control Page Indexing & Crawling</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create meta robots tags for on-page SEO control. Manage indexing, snippets, and crawler behavior instantly. Free tool, no signup.
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
              <CardTitle>Configure Options</CardTitle>
              <CardDescription>Choose your crawler directives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="index"
                    checked={index}
                    onCheckedChange={(checked) => setIndex(checked as boolean)}
                  />
                  <label htmlFor="index" className="text-sm font-medium cursor-pointer">
                    Allow Indexing (index)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="follow"
                    checked={follow}
                    onCheckedChange={(checked) => setFollow(checked as boolean)}
                  />
                  <label htmlFor="follow" className="text-sm font-medium cursor-pointer">
                    Follow Links (follow)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nosnippet"
                    checked={nosnippet}
                    onCheckedChange={(checked) => setNosnippet(checked as boolean)}
                  />
                  <label htmlFor="nosnippet" className="text-sm font-medium cursor-pointer">
                    No Snippet
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noarchive"
                    checked={noarchive}
                    onCheckedChange={(checked) => setNoarchive(checked as boolean)}
                  />
                  <label htmlFor="noarchive" className="text-sm font-medium cursor-pointer">
                    No Archive
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noimage"
                    checked={noimage}
                    onCheckedChange={(checked) => setNoimage(checked as boolean)}
                  />
                  <label htmlFor="noimage" className="text-sm font-medium cursor-pointer">
                    No Image Index
                  </label>
                </div>
              </div>

              <Button onClick={generateTag} size="lg" className="w-full">
                Generate Tag
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
          <h2 className="text-3xl font-bold">Master On-Page SEO Control with Meta Robots Tags</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>The meta robots tag is an HTML meta tag that gives you granular control over how search engines treat individual pages. While robots.txt blocks entire pages from crawling, meta robots tags let you crawl a page but prevent indexing – or allow indexing while preventing snippets. This flexibility is essential for managing your site's search presence with precision. You can control crawling, indexing, snippet display, image indexing, and even whether Google shows cached versions of your pages.</p>
            
            <p>Many webmasters think robots.txt is enough for SEO control, but it has limitations. For example, you might want Google to crawl a page for analytics purposes but not include it in search results – robots.txt can't do that. Meta robots tags solve this problem. You can add directives like "noindex" to keep low-value pages out of search results while still having them crawled, "nosnippet" to prevent search engines from displaying page snippets, or "noimageindex" to exclude images from image search.</p>
            
            <p>Understanding when to use which meta robots directive is crucial. Pages with thin content, duplicate content, affiliate pages, or staging environments should use noindex. Pages with sensitive content that shouldn't appear in search results need this tag. Pagination pages, filter pages, or automatically generated pages often benefit from noindex+follow to avoid search result clutter. This free generator helps you create the perfect combination of directives without memorizing syntax.</p>
            
            <p>The tool provides checkboxes for each directive – index/noindex, follow/nofollow, nosnippet, noarchive, and noimageindex – and generates the exact HTML code to paste into your page's head section. Works entirely offline in your browser, nothing stored on servers. Copy the generated code and add it to your webpage's HTML. Monitor the effects in Google Search Console to ensure pages are handling correctly. Proper meta robots tag implementation is a cornerstone of advanced SEO strategy.</p>
          </div>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What's the difference between "noindex" and "disallow" in robots.txt?</h3>
              <p className="text-muted-foreground">"Disallow" in robots.txt prevents crawling entirely. "Noindex" in meta robots allows crawling but prevents indexing. Use noindex when you want crawled pages out of search results – robots.txt when you want them completely untouched.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">If I use noindex, will the page still appear in Google Search Console?</h3>
              <p className="text-muted-foreground">Yes, Google will show noindex pages in Search Console as "Excluded" from index. This helps you monitor what's happening even though they won't appear in search results.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use meta robots tags on images or PDFs?</h3>
              <p className="text-muted-foreground">Meta robots tags only work on HTML pages. For images, use the noimageindex directive. For PDFs, you'd need to use X-Robots-Tag HTTP headers instead.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How long does it take for noindex to take effect?</h3>
              <p className="text-muted-foreground">Usually 1-2 weeks for Google to remove noindex pages from search results. You can check progress in Google Search Console under the "Coverage" report.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What does "noarchive" do and when should I use it?</h3>
              <p className="text-muted-foreground">"Noarchive" prevents Google from storing a cached version of your page. Use it for pages with time-sensitive content, legal documents, or pages you update frequently and don't want old versions visible.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">Related Tools You Might Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
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
              <a href="/tools/canonical-url-generator" className="hover:text-foreground underline">Canonical URL Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/open-graph-tag-generator" className="hover:text-foreground underline">Open Graph Tag Generator</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
