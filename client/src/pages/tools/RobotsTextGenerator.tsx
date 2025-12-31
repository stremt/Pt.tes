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
    title: "Robots.txt Generator – Free SEO Tool for Crawler Control",
    description: "Create SEO-friendly robots.txt files instantly. Control search engine crawler access and improve indexing. Free online generator, no signup.",
    keywords: "robots.txt generator, robots file generator, SEO robots.txt, google crawl directives, crawler control",
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
          <h1 className="text-4xl md:text-5xl font-bold">Free Robots.txt Generator – Control Search Engine Crawlers</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create SEO-friendly robots.txt files instantly. Control search engine crawler access and improve indexing. Free online generator, no signup.
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
          <h2 className="text-3xl font-bold">What Problem Does Robots.txt Solve?</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>A robots.txt file is one of the most important yet overlooked SEO tools available. It acts as a set of instructions for search engine crawlers like Google, Bing, and other bots that visit your website. By creating the right robots.txt file, you tell these crawlers which pages they can visit, which ones to skip, and how frequently they should crawl your site. This simple text file can dramatically improve your website's crawl budget efficiency and SEO performance.</p>
            
            <p>Many webmasters don't realize that crawlers have limited resources for visiting your site – especially if you have thousands of pages. Without proper crawler directives, Google might waste precious crawl budget on duplicate pages, staging environments, admin areas, or low-value pages. This means important pages might get crawled less frequently. A well-configured robots.txt file ensures that search engines spend their crawl budget wisely, focusing on the pages that matter most for your business.</p>
            
            <p>This free robots.txt generator helps you create proper crawler directives without any technical knowledge. Whether you want to block user-agent bots, set crawl delays, or define your sitemap location, this tool provides templates and a simple interface to generate the perfect robots.txt for your needs. You can also specify which directories or file types crawlers should avoid, protecting your server resources and keeping private areas hidden from search engines.</p>
            
            <p>The generator works completely offline in your browser – no servers, no data transmission, 100% private. Create your robots.txt file, download it, and upload it to your website's root directory. It's that simple. Whether you're running a small blog, an e-commerce site, or a large corporate website, proper crawler control is essential for SEO success. This tool gives you professional-grade robot.txt configuration at no cost.</p>
          </div>
          
          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold">Who Should Use This Tool?</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Bloggers:</strong> Control crawling of category pages and tag archives to improve crawl efficiency</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>E-commerce Sites:</strong> Prevent crawling of filter pages and duplicate product URLs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Corporate Websites:</strong> Protect admin areas, staging environments, and private sections</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Web Developers:</strong> Implement SEO best practices during site setup</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">What is a robots.txt file and why do I need it?</h3>
              <p className="text-muted-foreground">A robots.txt file is a text file placed in your website's root directory that tells search engine crawlers which pages they can and cannot access. It helps you control crawl budget, protect private pages, and improve SEO efficiency.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will blocking bots in robots.txt prevent my pages from appearing in search results?</h3>
              <p className="text-muted-foreground">Yes, if you use "Disallow" for a page in robots.txt, Google won't crawl or index it. Use this carefully – only block pages you truly don't want indexed. Use meta robots tags instead if you want pages crawled but not indexed.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Can I use robots.txt to block user-agent bots like scrapers or bad bots?</h3>
              <p className="text-muted-foreground">Yes, you can block specific user-agents. However, robots.txt is a request-based standard, and malicious bots might ignore it. Use server-level blocking or firewall rules for security threats.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is it safe to use an online generator for my robots.txt?</h3>
              <p className="text-muted-foreground">Yes, this generator works 100% offline in your browser. Your data never leaves your device – it's completely private and secure. You have full control before uploading to your site.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Where should I place the robots.txt file on my website?</h3>
              <p className="text-muted-foreground">Always place robots.txt in your website's root directory (example.com/robots.txt). Search engines look for it there first. Never put it in subdirectories.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How long does it take for robots.txt changes to take effect?</h3>
              <p className="text-muted-foreground">Google typically recrawls robots.txt within a few days, but major changes can take 1-2 weeks to fully propagate. Monitor crawl stats in Google Search Console.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="text-2xl font-bold">Related Tools You Might Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">→</span>
              <a href="/tools/sitemap-xml-generator" className="hover:text-foreground underline">Sitemap.xml Generator</a>
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
              <a href="/tools/open-graph-tag-generator" className="hover:text-foreground underline">Open Graph Tag Generator</a>
            </div>
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
