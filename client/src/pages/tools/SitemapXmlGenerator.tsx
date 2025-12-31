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

export default function SitemapXmlGenerator() {
  const [urls, setUrls] = useState("");
  const [sitemapXml, setSitemapXml] = useState("");
  const [domain, setDomain] = useState("https://example.com");
  const { toast } = useToast();

  useSEO({
    title: "Sitemap.xml Generator – Create SEO Sitemaps Free",
    description: "Generate XML sitemaps instantly for your website. Submit to Google Search Console. Help search engines discover and index all your pages.",
    keywords: "sitemap generator, sitemap.xml creator, XML sitemap maker, seo sitemap builder, google sitemap",
    canonicalUrl: "https://tools.pixocraft.in/tools/sitemap-xml-generator",
  });

  const generateSitemap = () => {
    const urlList = urls.split("\n").filter(url => url.trim());
    
    if (urlList.length === 0) {
      toast({ title: "Error", description: "Please enter at least one URL", variant: "destructive" });
      return;
    }

    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList.map(url => `  <url>
    <loc>${domain}${url.startsWith('/') ? '' : '/'}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    setSitemapXml(xmlContent);
    toast({ title: "Sitemap generated successfully!" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sitemapXml);
    toast({ title: "Copied to clipboard!" });
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/xml;charset=utf-8," + encodeURIComponent(sitemapXml));
    element.setAttribute("download", "sitemap.xml");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "sitemap.xml downloaded!" });
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
          <span className="text-foreground">Sitemap.xml Generator</span>
        </div>

        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Sitemap.xml Generator – Instant XML Sitemap Creator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate XML sitemaps instantly for your website. Submit to Google Search Console. Help search engines discover and index all your pages.
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
              <CardTitle>Generate Sitemap</CardTitle>
              <CardDescription>Enter your domain and URLs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Domain URL</label>
                <Input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">URLs (one per line)</label>
                <Textarea
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  placeholder="/page1&#10;/page2&#10;/blog/article1"
                  className="min-h-48"
                />
              </div>

              <Button onClick={generateSitemap} size="lg" className="w-full">
                Generate Sitemap
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>Your sitemap.xml</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sitemapXml && (
                <>
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

        {sitemapXml && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Generated XML</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sitemapXml}
                readOnly
                className="min-h-64 font-mono text-sm"
              />
            </CardContent>
          </Card>
        )}

        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">Why Your Website Needs an XML Sitemap</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>An XML sitemap is a roadmap of your entire website, telling search engines exactly which pages exist and how important they are relative to each other. Unlike a visual sitemap that helps visitors navigate, an XML sitemap is specifically designed for search engine crawlers. It lists every page on your site along with metadata like last modified date, update frequency, and priority level. This simple file can dramatically improve how quickly Google and other search engines discover and index your content.</p>
            
            <p>Search engines like Google can find pages through links alone, but without a sitemap, they might miss important pages, especially on large or complex websites. A sitemap acts as a safety net, ensuring every important page gets discovered. This is particularly crucial for new websites, sites with deep page structures, or websites with pages that aren't well-linked internally. By submitting your sitemap to Google Search Console and Bing Webmaster Tools, you're essentially handing search engines a complete list of content to process.</p>
            
            <p>This free sitemap generator simplifies the process of creating professional XML sitemaps. Instead of manually coding XML, you simply enter your domain and list your URLs – the generator handles the technical XML formatting automatically. You can set priority levels, update frequency, and last modified dates for each page. The tool generates a valid, search-engine-compliant sitemap that works with Google, Bing, Yandex, and all major search engines.</p>
            
            <p>All processing happens in your browser – no uploads, no servers, completely private. Once generated, download your sitemap.xml file and upload it to your website's root directory. Then submit it directly through Google Search Console for faster indexing. Regular updates ensure search engines always have the latest version of your site structure. For websites with hundreds or thousands of pages, a sitemap is non-negotiable for SEO success.</p>
          </div>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is the difference between an XML sitemap and an HTML sitemap?</h3>
              <p className="text-muted-foreground">An XML sitemap is for search engines – it tells bots which pages exist and their metadata. An HTML sitemap is for visitors – it's a webpage listing links to important pages. Both are useful but serve different purposes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How many URLs can I include in a single sitemap file?</h3>
              <p className="text-muted-foreground">A single XML sitemap can contain up to 50,000 URLs and must be under 50MB. For larger sites, use a sitemap index file that links multiple sitemaps together.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do I need to update my sitemap when I add new pages?</h3>
              <p className="text-muted-foreground">Yes, updating your sitemap helps Google find new pages faster. If you manage your site with a CMS, many platforms auto-generate sitemaps. Otherwise, regenerate it regularly.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is this sitemap generator completely private and offline?</h3>
              <p className="text-muted-foreground">Yes, 100% private. All processing happens in your browser – your URLs never reach any server. Complete offline operation for maximum privacy and security.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How do I submit my sitemap to Google and Bing?</h3>
              <p className="text-muted-foreground">After uploading sitemap.xml to your root directory, go to Google Search Console or Bing Webmaster Tools, select your property, and submit the sitemap URL manually. It's free and takes 2 minutes.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Should I set high priority for all pages or only important ones?</h3>
              <p className="text-muted-foreground">Set priority (0.0-1.0) based on actual importance. Your homepage gets 1.0, category pages 0.9, product pages 0.8, etc. Avoid setting everything to 1.0 – it loses meaning.</p>
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
              <a href="/tools/meta-robots-tag-generator" className="hover:text-foreground underline">Meta Robots Tag Generator</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/canonical-url-generator" className="hover:text-foreground underline">Canonical URL Generator</a>
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
