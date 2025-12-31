import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { Copy, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RobotsTextGenerator() {
  const [robotsContent, setRobotsContent] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Free Robots.txt Generator - Create SEO-Friendly Robots Files",
    description: "Generate robots.txt files instantly. Control crawler access to your website. Free, no signup, offline tool.",
    keywords: "robots.txt generator, robots file maker, SEO robots.txt, google crawl directives",
    canonicalUrl: "https://tools.pixocraft.in/tools/robots-txt-generator",
  });

  const generateBasicRobots = () => {
    const content = `User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml`;
    setRobotsContent(content);
    toast({ title: "Basic robots.txt generated" });
  };

  const generateRestrictive = () => {
    const content = `User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /temp/

Allow: /public/

Crawl-delay: 1

Sitemap: https://example.com/sitemap.xml`;
    setRobotsContent(content);
    toast({ title: "Restrictive robots.txt generated" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(robotsContent);
    toast({ title: "Copied to clipboard!" });
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(robotsContent));
    element.setAttribute("download", "robots.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast({ title: "robots.txt downloaded!" });
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
          <span className="text-foreground">Robots.txt Generator</span>
        </div>

        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Robots.txt Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create SEO-friendly robots.txt files to control search engine crawler access to your website.
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
              <CardTitle>Robots.txt Content</CardTitle>
              <CardDescription>Your generated robots.txt file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={robotsContent}
                onChange={(e) => setRobotsContent(e.target.value)}
                placeholder="Your robots.txt content will appear here..."
                className="min-h-80 font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
                <Button onClick={downloadFile} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Quick start options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={generateBasicRobots} variant="outline" className="w-full justify-start">
                Basic Setup
              </Button>
              <Button onClick={generateRestrictive} variant="outline" className="w-full justify-start">
                Restrictive Setup
              </Button>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold">What is Robots.txt?</h2>
          <p className="text-muted-foreground">
            A robots.txt file is a text file placed in your website's root directory that tells search engine crawlers which pages they can and cannot access. It's a crucial SEO tool that helps you control how search engines index your site.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Common Use Cases</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Prevent crawling of duplicate content or test pages</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Block access to admin areas and login pages</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Control crawler bandwidth consumption</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Direct search engines to your sitemap</span>
              </li>
            </ul>
          </div>
        </section>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Privacy Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This generator creates robots.txt files entirely in your browser. Your content is never sent to any server. The file is generated locally and is completely private.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
