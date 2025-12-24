import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Palette, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ColorCategory() {
  useSEO({
    title: "Color Tools - Free Online Color Picker & Palette Generator | Pixocraft",
    description: "Create stunning color schemes, generate palettes, and pick perfect colors with Pixocraft's free online color tools. Design with confidence—offline, private, and no signup needed.",
    keywords: "color tools, color picker, color palette generator, gradient generator, hex color, rgb converter, color palette, design tools, free color tools, online color picker, palette maker",
    canonicalUrl: "https://tools.pixocraft.in/tools/color",
  });

  const colorTools = [
    {
      id: "color-picker",
      name: "Color Picker",
      description: "Pick colors from any image or enter hex, RGB values for precise color selection.",
      path: "/tools/color-picker",
    },
    {
      id: "hex-color-picker-tool",
      name: "Hex Color Picker",
      description: "Advanced hex color picker with interactive color space and format conversion.",
      path: "/tools/hex-color-picker-tool",
    },
    {
      id: "hex-rgb-converter",
      name: "Hex RGB Converter",
      description: "Convert between hex and RGB color formats instantly for web and design work.",
      path: "/tools/hex-rgb-converter",
    },
    {
      id: "color-palette-generator",
      name: "Color Palette Generator",
      description: "Generate beautiful, harmonious color palettes for your design projects.",
      path: "/tools/color-palette-generator",
    },
    {
      id: "color-palette-shuffler",
      name: "Color Palette Shuffler",
      description: "Shuffle and mix color palettes to discover new color combinations.",
      path: "/tools/color-palette-shuffler",
    },
    {
      id: "random-hex-color",
      name: "Random Hex Color",
      description: "Generate random hex color codes for inspiration and quick color selection.",
      path: "/tools/random-hex-color",
    },
    {
      id: "gradient-generator",
      name: "Gradient Generator",
      description: "Create smooth, beautiful CSS gradients with customizable colors and directions.",
      path: "/tools/gradient-generator",
    },
    {
      id: "gradient-text-generator",
      name: "Gradient Text Generator",
      description: "Apply gradient effects to text for stunning visual impact.",
      path: "/tools/gradient-text-generator",
    },
    {
      id: "box-shadow-generator",
      name: "Box Shadow Generator",
      description: "Generate beautiful box shadows for depth and visual hierarchy.",
      path: "/tools/box-shadow-generator",
    },
    {
      id: "advanced-text-shadow",
      name: "Advanced Text Shadow",
      description: "Create complex text shadow effects with multiple layers and customization.",
      path: "/tools/advanced-text-shadow",
    },
    {
      id: "border-radius-generator",
      name: "Border Radius Generator",
      description: "Design custom border radius shapes with visual preview and CSS output.",
      path: "/tools/border-radius-generator",
    },
    {
      id: "dominant-color-finder",
      name: "Dominant Color Finder",
      description: "Extract the dominant color from any image for color scheme inspiration.",
      path: "/tools/dominant-color-finder",
    },
    {
      id: "image-pixelator",
      name: "Image Pixelator",
      description: "Apply pixelation effects to images for creative and privacy-focused results.",
      path: "/tools/image-pixelator",
    },
    {
      id: "image-blur-tool",
      name: "Image Blur Tool",
      description: "Add blur effects to images for creative effects and content protection.",
      path: "/tools/image-blur-tool",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Color Tools" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Palette className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-color-category">
              Color Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Color Tools – <span className="text-primary">Free, Private & Offline</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Design with confidence using free color tools for picking, generating palettes, and creating gradients—completely private, offline, and no signup required.
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Master Colors for Stunning Designs</h2>
            <p className="text-muted-foreground leading-relaxed">
              Color tools help designers, developers, and creators select, harmonize, and apply colors strategically. Color choices impact visual appeal, user experience, and brand recognition. By having instant access to color pickers, palette generators, and gradient creators, you eliminate guesswork and work with confidence. Professional color combinations enhance design quality, improve readability, and create emotional resonance with audiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern color tools streamline the design process by generating harmonious palettes, converting between formats, and providing instant visual feedback. They're essential for anyone creating visual content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Uses Color Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Graphic designers use color pickers and palette generators for branding and visual compositions. Web developers rely on color converters and gradient generators for styling websites. UI/UX designers use color harmony tools to create accessible, appealing interfaces. Content creators choose colors for thumbnails, graphics, and social media content.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Photographers extract dominant colors from images for editing palettes. Students learning design principles use color tools to understand harmony and contrast. Artists and illustrators use palettes for traditional and digital work. Anyone designing anything visual—from websites to social posts to brand identities—benefits from systematic color selection.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Essential Color Design Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Color selection is foundational—choosing a base color and generating harmonious companions ensures visual coherence. Format conversion between hex, RGB, and HSL enables working across different tools and platforms. Gradient creation adds depth and visual interest to designs. Shadow effects create dimension and hierarchy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Palette extraction from reference images provides inspiration. Color accessibility checking ensures designs work for all users. Border radius and spacing tools work alongside color tools to create cohesive designs. Together, these elements form a complete color-design toolkit.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Offline & Private Color Work</h2>
            <p className="text-muted-foreground leading-relaxed">
              All color tools run entirely in your browser without uploading design data to external servers. This offline-first approach ensures complete privacy—your color selections, palettes, and designs stay on your device. No tracking, no logging, no analysis of your design choices.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browser-based processing means instant results without network delays, offline functionality after initial load, and zero security risks. Your proprietary color schemes and brand colors remain completely confidential. Whether designing client work, personal projects, or sensitive brand assets, local processing guarantees genuine privacy and security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Developing Color Strategies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with a base color that represents your brand or mood. Use palette generators to create complementary, analogous, or triadic color schemes. Test colors in context—apply them to designs, check contrast, verify readability. Extract dominant colors from reference images for inspiration. Build color guidelines documenting hex values, RGB equivalents, and use cases.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combine color tools strategically: pick a base color, generate supporting palette, convert to needed formats, apply gradients for depth, add shadows for dimension. Review color choices for accessibility and inclusivity. Document your palette for consistency across projects.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Color tools work best as routine companions in your design workflow, supporting everything from quick mockups to complete brand systems. Use them consistently to maintain visual coherence and develop strong color intuition.
            </p>
          </section>
        </article>

        {/* All Color Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All Color Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-color-tool-${tool.id}`}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
