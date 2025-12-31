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
    title: "Canonical URL Generator - Create SEO Canonical Tags",
    description: "Generate canonical URL tags to prevent duplicate content issues. Free SEO tool, offline, no signup.",
    keywords: "canonical url generator, rel canonical, duplicate content, SEO canonical tag",
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
          <h1 className="text-4xl md:text-5xl font-bold">Canonical URL Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create canonical tags to tell search engines which version of a page is the "original".
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

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Why Canonical URLs Matter</h2>
          <p className="text-muted-foreground">
            Canonical tags solve duplicate content problems. When you have multiple URLs for the same content (like with parameters, www/non-www, or version variations), canonical tags tell search engines which is the preferred version to index.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Common Use Cases</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>URL parameters (product filters, sorting options)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>WWW vs non-WWW versions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>HTTP vs HTTPS versions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Desktop vs mobile versions</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
