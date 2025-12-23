import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Code2, ArrowRight } from "lucide-react";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" }
  ]
});

const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Developer Tools – Free, Private & Offline",
  "description": "Essential developer tools for code formatting, conversion, API testing, and utilities. All tools run offline in your browser with no signup or tracking.",
  "url": "https://tools.pixocraft.in/tools/developer",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "SoftwareApplication", "name": "Code Beautifier", "url": "https://tools.pixocraft.in/tools/code-beautifier" },
      { "@type": "SoftwareApplication", "name": "HTML Beautifier", "url": "https://tools.pixocraft.in/tools/html-beautifier" },
      { "@type": "SoftwareApplication", "name": "API Snippet Builder", "url": "https://tools.pixocraft.in/tools/api-snippet-builder" },
      { "@type": "SoftwareApplication", "name": "JSON CSV Converter", "url": "https://tools.pixocraft.in/tools/json-csv-converter" },
      { "@type": "SoftwareApplication", "name": "JSON YAML Converter", "url": "https://tools.pixocraft.in/tools/json-yaml-converter" },
      { "@type": "SoftwareApplication", "name": "Markdown Editor", "url": "https://tools.pixocraft.in/tools/markdown-editor" },
      { "@type": "SoftwareApplication", "name": "Box Shadow Generator", "url": "https://tools.pixocraft.in/tools/box-shadow-generator" },
      { "@type": "SoftwareApplication", "name": "Border Radius Generator", "url": "https://tools.pixocraft.in/tools/border-radius-generator" },
      { "@type": "SoftwareApplication", "name": "File to Base64", "url": "https://tools.pixocraft.in/tools/file-to-base64" },
      { "@type": "SoftwareApplication", "name": "Meta Tag Generator", "url": "https://tools.pixocraft.in/tools/meta-tag-generator" }
    ]
  }
});

const developerTools = [
  {
    name: "Code Beautifier",
    slug: "code-beautifier",
    description: "Format and beautify JavaScript code for improved readability and consistency"
  },
  {
    name: "HTML Beautifier",
    slug: "html-beautifier",
    description: "Transform minified or messy HTML into clean, properly indented code"
  },
  {
    name: "API Snippet Builder",
    slug: "api-snippet-builder",
    description: "Generate cURL and JavaScript fetch snippets for API requests instantly"
  },
  {
    name: "JSON CSV Converter",
    slug: "json-csv-converter",
    description: "Convert JSON data to CSV format and vice versa for data interchange"
  },
  {
    name: "JSON YAML Converter",
    slug: "json-yaml-converter",
    description: "Transform between JSON and YAML formats for configuration files"
  },
  {
    name: "Markdown Editor",
    slug: "markdown-editor",
    description: "Write and preview Markdown with live rendering and code syntax highlighting"
  },
  {
    name: "Box Shadow Generator",
    slug: "box-shadow-generator",
    description: "Visually create CSS box shadows and copy the code instantly"
  },
  {
    name: "Border Radius Generator",
    slug: "border-radius-generator",
    description: "Design rounded corners with a visual editor and export CSS code"
  },
  {
    name: "File to Base64",
    slug: "file-to-base64",
    description: "Convert files to Base64 encoding for embedding in code or APIs"
  },
  {
    name: "Meta Tag Generator",
    slug: "meta-tag-generator",
    description: "Generate SEO meta tags and Open Graph tags for web pages"
  }
];

export default function DeveloperCategory() {
  useSEO({
    title: "Developer Tools – Free, Private & Offline | Pixocraft Tools",
    description: "Essential developer tools for code formatting, API testing, data conversion, and CSS generation. All tools run offline in your browser with no signup or tracking. Fast, free, and completely private."
  });

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateOrganizationSchema()} />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 max-w-6xl py-12">
          {/* Breadcrumbs */}
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Developer Tools" }
          ]} />

          {/* Hero Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Developer Tools – Free, Private & Offline</h1>
            </div>

            {/* SEO Intro */}
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-8">
              Developer tools designed for every programmer, designer, and technical professional. Our collection includes code formatters, API utilities, data converters, and CSS generators to streamline your workflow. All tools run completely offline in your browser – no server uploads, no tracking, no signup required. Whether you're formatting minified code, converting data formats, building API requests, or generating CSS, these free utilities are always available and completely private.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>100% Private – Offline Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>No Signup Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>No Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Completely Free</span>
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {developerTools.map((tool) => (
              <Card key={tool.slug} className="hover-elevate transition-all flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex items-end">
                  <Link href={`/tools/${tool.slug}`} asChild>
                    <Button className="w-full gap-2" data-testid={`button-use-tool-${tool.slug}`}>
                      Use Tool
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="bg-muted/30 rounded-lg p-8 border border-border/50 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Use Developer Tools?</h2>
              <p className="text-muted-foreground mb-4">
                Developer tools are essential utilities that save time and eliminate manual effort. Our collection addresses common development tasks:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Code Formatting:</strong> Convert minified code into readable formats instantly</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Data Conversion:</strong> Transform between JSON, CSV, and YAML formats</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>API Development:</strong> Generate ready-to-use cURL and fetch code snippets</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>CSS Generation:</strong> Visually design shadows, borders, and effects</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>SEO Optimization:</strong> Generate meta tags and Open Graph data</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                All processing happens in your browser. No files are uploaded to servers, no data is tracked, and no personal information is collected. Use these tools with complete confidence.
              </p>
            </div>
          </div>

          {/* Related Categories */}
          <div className="mt-16 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6">Explore Other Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Media Tools", slug: "media" },
                { name: "Image Tools", slug: "image" },
                { name: "Text Tools", slug: "text" },
                { name: "PDF Tools", slug: "pdf" },
                { name: "Privacy Tools", slug: "privacy" }
              ].map((category) => (
                <Link key={category.slug} href={`/tools/${category.slug}`} asChild>
                  <Button variant="outline" className="w-full justify-center" data-testid={`button-category-${category.slug}`}>
                    {category.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
