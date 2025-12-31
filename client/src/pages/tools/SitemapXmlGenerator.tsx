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
    title: "Free Sitemap.xml Generator - Create XML Sitemaps for SEO",
    description: "Generate sitemap.xml files instantly. Submit to Google Search Console. Free, offline, no signup required.",
    keywords: "sitemap generator, sitemap.xml creator, XML sitemap maker, SEO sitemap",
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
          <h1 className="text-4xl md:text-5xl font-bold">Sitemap.xml Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create XML sitemaps to help search engines discover and index all your web pages.
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

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why You Need a Sitemap</h2>
          <p className="text-muted-foreground">
            XML sitemaps help search engines find all pages on your website, especially newly published content. They increase crawl efficiency and ensure all important pages are indexed.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Key Benefits</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Faster indexing of new pages</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Inform Google of page priority and update frequency</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Discover pages that might otherwise be missed</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
