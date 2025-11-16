import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Copy, Check, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/lib/seo";

export default function Sitemap() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Sitemap Generator | Pixocraft Tools",
    description: "Generate XML sitemap for your blog posts, categories, and tags.",
    keywords: "sitemap generator, xml sitemap, seo, blog sitemap",
    canonicalUrl: "https://tools.pixocraft.in/sitemap-generator",
  });

  const { data: posts } = useQuery<BlogPost[]>({
    queryKey: ["/blogs/data.json"],
  });

  const generateSitemap = (): string => {
    if (!posts) return '';

    const baseUrl = 'https://tools.pixocraft.in';
    const today = new Date().toISOString().split('T')[0];

    const categories = Array.from(new Set(posts.map(post => post.category)));
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';

    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blogs</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += '    <changefreq>daily</changefreq>\n';
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';

    posts.forEach(post => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blogs/${post.slug}</loc>\n`;
      xml += `    <lastmod>${post.date}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    });

    categories.forEach(category => {
      const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blogs/category/${categorySlug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    });

    allTags.forEach(tag => {
      const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blogs/tag/${tagSlug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n';
    });

    xml += '</urlset>';

    return xml;
  };

  const downloadSitemap = () => {
    const sitemap = generateSitemap();
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Sitemap downloaded!",
      description: "Your sitemap.xml file has been downloaded.",
    });
  };

  const copySitemap = () => {
    const sitemap = generateSitemap();
    navigator.clipboard.writeText(sitemap);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast({
      title: "Copied to clipboard!",
      description: "Sitemap XML has been copied.",
    });
  };

  const stats = {
    totalUrls: (posts?.length || 0) + 2 + 
      Array.from(new Set(posts?.map(p => p.category) || [])).length + 
      Array.from(new Set(posts?.flatMap(p => p.tags) || [])).length,
    blogPosts: posts?.length || 0,
    categories: Array.from(new Set(posts?.map(p => p.category) || [])).length,
    tags: Array.from(new Set(posts?.flatMap(p => p.tags) || [])).length,
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-2 sm:px-4 max-w-5xl">
        <div className="text-center space-y-4 sm:space-y-6 mb-10 sm:mb-14">
          <Badge variant="secondary" className="text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 font-semibold">
            <Globe className="mr-2 h-4 w-4" />
            Sitemap Generator
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            XML <span className="text-primary">Sitemap</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Auto-generated sitemap for all your blog posts, categories, and pages
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total URLs</CardDescription>
                <CardTitle className="text-3xl">{stats.totalUrls}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Blog Posts</CardDescription>
                <CardTitle className="text-3xl">{stats.blogPosts}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Categories</CardDescription>
                <CardTitle className="text-3xl">{stats.categories}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tags</CardDescription>
                <CardTitle className="text-3xl">{stats.tags}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sitemap Preview</CardTitle>
              <CardDescription>
                This sitemap includes all blog posts, categories, tags, and main pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-6 rounded-lg overflow-x-auto max-h-96 text-sm font-mono">
                  <code>{generateSitemap()}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Download Options</CardTitle>
              <CardDescription>
                Save or copy the generated sitemap
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button onClick={downloadSitemap} data-testid="button-download-sitemap">
                <Download className="mr-2 h-4 w-4" />
                Download sitemap.xml
              </Button>
              <Button variant="outline" onClick={copySitemap} data-testid="button-copy-sitemap">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Download the sitemap.xml file</h4>
                <p className="text-sm text-muted-foreground">
                  Click the download button to save the sitemap.xml file to your computer.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Upload to your website root</h4>
                <p className="text-sm text-muted-foreground">
                  Place the sitemap.xml file in your website's root directory (e.g., /public/sitemap.xml).
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Submit to search engines</h4>
                <p className="text-sm text-muted-foreground">
                  Submit your sitemap URL (https://tools.pixocraft.in/sitemap.xml) to Google Search Console and Bing Webmaster Tools.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">4. Update regularly</h4>
                <p className="text-sm text-muted-foreground">
                  Regenerate and update your sitemap whenever you add new blog posts or make significant changes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
