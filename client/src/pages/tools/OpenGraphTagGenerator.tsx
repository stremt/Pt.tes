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
    title: "Open Graph Tag Generator - Create Social Meta Tags",
    description: "Generate Open Graph tags for social media sharing. Free SEO tool for better link previews.",
    keywords: "open graph generator, og tags, social media tags, meta tags generator",
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
          <h1 className="text-4xl md:text-5xl font-bold">Open Graph Tag Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create Open Graph tags to control how your content appears when shared on social media.
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

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">What Are Open Graph Tags?</h2>
          <p className="text-muted-foreground">
            Open Graph tags are meta tags that control how your content appears when shared on Facebook, Twitter, LinkedIn, and other social platforms. They determine the title, description, image, and other details shown in the preview.
          </p>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Key Benefits</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Increase click-through rates with attractive previews</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Control how your brand appears on social media</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Boost social sharing and engagement</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span>Improve consistency across platforms</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
