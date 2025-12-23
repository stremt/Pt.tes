import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO, StructuredData } from "@/lib/seo";
import { FileEdit, Copy, RotateCcw, Zap, Eye, Lock } from "lucide-react";
import { marked } from "marked";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "Markdown Editor", "item": "https://tools.pixocraft.in/tools/markdown-editor" }
  ]
});

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "Markdown Editor Online | Live Preview & Offline Support",
    description: "Write or paste Markdown and see instant live HTML preview. Free, offline and private.",
    keywords: "markdown editor, markdown preview, md editor online",
    canonicalUrl: "https://tools.pixocraft.in/tools/markdown-editor",
  });

  useEffect(() => {
    const convertToHtml = async () => {
      if (!markdown) {
        setHtml("");
        return;
      }
      try {
        const htmlOutput = await marked(markdown);
        setHtml(htmlOutput);
      } catch {
        setHtml("<p>Error rendering markdown</p>");
      }
    };
    convertToHtml();
  }, [markdown]);

  const handleClear = () => {
    setMarkdown("");
    setHtml("");
  };

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="container mx-auto px-4 max-w-7xl pt-8">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Developer Tools", url: "/tools/developer" }, { label: "Markdown Editor" }]} />
      </div>
      <ToolLayout
      title="Markdown Editor"
      description="Write Markdown on the left, get instant preview on the right. Simple, fast and distraction-free editor."
      icon={<FileEdit className="h-10 w-10 text-primary" />}
      toolId="markdown-editor"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Write Markdown", description: "Type or paste your markdown in the editor." },
        { step: 2, title: "Live Preview", description: "See instant HTML preview as you type." },
        { step: 3, title: "Copy HTML", description: "Copy the generated HTML for use anywhere." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Real-Time Preview", description: "See HTML output update as you type." },
        { icon: <Eye className="h-6 w-6 text-primary" />, title: "Split View", description: "Edit and preview side by side." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Private", description: "All processing happens locally." },
      ]}
      faqs={[
        { question: "What is Markdown?", answer: "Markdown is a lightweight markup language that's easy to write and read. It's commonly used for documentation, README files, and content writing." },
        { question: "What Markdown features are supported?", answer: "All standard Markdown: headings, bold, italic, links, images, lists, code blocks, blockquotes, and tables." },
        { question: "Can I export the HTML?", answer: "Yes, use the copy button to copy the generated HTML to your clipboard." },
      ]}
      footer={<p className="text-center text-sm text-muted-foreground"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleClear} variant="outline" disabled={!markdown} data-testid="button-clear">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={() => copyToClipboard(html)}
                variant="outline"
                disabled={!html}
                data-testid="button-copy-html"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied HTML!" : "Copy HTML"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Markdown Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="# Hello World\n\nWrite your **markdown** here..."
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[600px] text-sm font-mono"
                data-testid="input-markdown"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {html ? (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none min-h-[600px] p-4 bg-muted rounded-lg overflow-auto"
                  dangerouslySetInnerHTML={{ __html: html }}
                  data-testid="preview-html"
                />
              ) : (
                <div className="flex items-center justify-center min-h-[600px] text-muted-foreground bg-muted rounded-lg" data-testid="preview-empty">
                  <p className="text-sm">Preview will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
    </>
  );
}
