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
    title: "Meta Robots Tag Generator - Create SEO Meta Tags",
    description: "Generate meta robots tags for SEO control. Manage indexing, snippets, and crawler behavior. Free tool.",
    keywords: "meta robots tag generator, robots meta tag, SEO meta tags, robots noindex",
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
          <h1 className="text-4xl md:text-5xl font-bold">Meta Robots Tag Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create meta robots tags to control how search engines index and display your pages.
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

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Understanding Meta Robots Tags</h2>
          <p className="text-muted-foreground">
            Meta robots tags tell search engines whether to index a page, follow its links, and how to display it in search results. They're essential for SEO control.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Common Directives</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>index/noindex:</strong> Allow or prevent page indexing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>follow/nofollow:</strong> Follow or ignore links on the page</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>nosnippet:</strong> Don't show page snippet in search results</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>noarchive:</strong> Don't cache the page</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
