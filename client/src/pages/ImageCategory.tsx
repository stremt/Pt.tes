import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";

export default function ImageCategory() {
  useSEO({
    title: "Image Tools - Free Online Image Editor & Converter | Pixocraft",
    description: "Transform, edit, and convert images instantly with Pixocraft's free online image tools. Compress, crop, resize, convert formats, apply effects—all offline and private.",
    keywords: "image tools, image editor, image converter, image compressor, resize image, crop image, free image tools, online image tools, image effects",
    canonicalUrl: "https://tools.pixocraft.in/tools/image",
  });

  const imageTools = [
    { id: "image-compressor", name: "Image Compressor", description: "Reduce image file size while maintaining quality. Compress JPEG, PNG, WebP and more.", path: "/tools/image-compressor" },
    { id: "image-resizer", name: "Image Resizer", description: "Resize images to custom dimensions instantly. Perfect for social media, websites, and profiles.", path: "/tools/image-resizer" },
    { id: "image-cropper", name: "Image Cropper", description: "Crop images to custom aspect ratios and dimensions with interactive controls.", path: "/tools/image-cropper" },
    { id: "image-to-base64", name: "Image to Base64", description: "Convert images to Base64 encoding for embedding in HTML and CSS.", path: "/tools/image-to-base64" },
    { id: "base64-to-image", name: "Base64 to Image", description: "Decode Base64 strings back to downloadable image files instantly.", path: "/tools/base64-to-image" },
    { id: "image-to-pdf", name: "Image to PDF", description: "Convert images (JPG, PNG, WebP) to PDF documents in seconds.", path: "/tools/image-to-pdf" },
    { id: "pdf-to-image", name: "PDF to Image", description: "Extract and convert PDF pages to individual image files.", path: "/tools/pdf-to-image" },
    { id: "jpg-to-png", name: "JPG to PNG", description: "Convert JPG images to PNG format with high quality preservation.", path: "/tools/jpg-to-png" },
    { id: "png-to-jpg", name: "PNG to JPG", description: "Convert PNG images to JPG format with customizable compression.", path: "/tools/png-to-jpg" },
    { id: "heic-to-jpg", name: "HEIC to JPG", description: "Convert HEIC/HEIF images to JPG format for broader compatibility.", path: "/tools/heic-to-jpg" },
    { id: "background-remover", name: "Background Remover", description: "Remove image backgrounds instantly with one click for product photos.", path: "/tools/background-remover" },
    { id: "exif-remover", name: "EXIF Remover", description: "Strip metadata and EXIF data from images to protect privacy.", path: "/tools/exif-remover" },
    { id: "gif-compressor", name: "GIF Compressor", description: "Compress GIF files while maintaining animation quality and smoothness.", path: "/tools/gif-compressor" },
    { id: "gif-to-mp4", name: "GIF to MP4", description: "Convert animated GIFs to MP4 video format for smaller file sizes.", path: "/tools/gif-to-mp4" },
    { id: "video-to-gif", name: "Video to GIF", description: "Convert video files to animated GIFs with custom frame selection.", path: "/tools/video-to-gif" },
    { id: "video-compressor", name: "Video Compressor", description: "Compress video files to reduce size while maintaining quality.", path: "/tools/video-compressor" },
    { id: "color-picker", name: "Color Picker", description: "Pick colors from anywhere on your screen with hex and RGB output.", path: "/tools/color-picker" },
    { id: "hex-color-picker", name: "Hex Color Picker", description: "Advanced color picker with hex code generation and color swatches.", path: "/tools/hex-color-picker-tool" },
    { id: "hex-rgb-converter", name: "Hex RGB Converter", description: "Convert between hexadecimal and RGB color codes instantly.", path: "/tools/hex-rgb-converter" },
    { id: "color-palette-generator", name: "Color Palette Generator", description: "Generate beautiful color palettes with custom number of colors.", path: "/tools/color-palette-generator" },
    { id: "color-palette-shuffler", name: "Color Palette Shuffler", description: "Shuffle and regenerate color palettes with one click.", path: "/tools/color-palette-shuffler" },
    { id: "random-hex-color", name: "Random Hex Color", description: "Generate random hex color codes with one click.", path: "/tools/random-hex-color" },
    { id: "dominant-color-finder", name: "Dominant Color Finder", description: "Extract the dominant color from any image instantly.", path: "/tools/dominant-color-finder" },
    { id: "gradient-generator", name: "Gradient Generator", description: "Create beautiful CSS gradients with live preview and code export.", path: "/tools/gradient-generator" },
    { id: "image-pixelator", name: "Image Pixelator", description: "Pixelate or blur sensitive areas of images for privacy protection.", path: "/tools/image-pixelator" },
    { id: "image-blur", name: "Image Blur Tool", description: "Blur or soften images with adjustable blur strength.", path: "/tools/image-blur-tool" },
    { id: "image-darken", name: "Image Darken Tool", description: "Darken images with adjustable darkness level.", path: "/tools/image-darken-tool" },
    { id: "image-lighten", name: "Image Lighten Tool", description: "Lighten images and adjust brightness for better visibility.", path: "/tools/image-lighten-tool" },
    { id: "image-mirror", name: "Image Mirror Tool", description: "Flip images horizontally or vertically instantly.", path: "/tools/image-mirror-tool" },
    { id: "image-invert", name: "Image Invert Tool", description: "Invert colors in images for negative effects and creative uses.", path: "/tools/image-invert-tool" },
    { id: "image-grayscale", name: "Image Grayscale Tool", description: "Convert color images to grayscale or black and white.", path: "/tools/image-grayscale-tool" },
    { id: "image-rotate", name: "Image Rotate Tool", description: "Rotate images by 90 degrees or custom angles instantly.", path: "/tools/image-rotate-tool" },
    { id: "image-upscaler", name: "Image Upscaler", description: "Enlarge and upscale images while maintaining quality using AI.", path: "/tools/image-upscaler" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Tools", url: "/tools/image" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <ImageIcon className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-image-category">
              Image Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Edit & Transform <span className="text-primary">Images Instantly</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Free, offline image editing tools for compression, conversion, effects, and color manipulation
          </p>
          <div className="pt-4">
            <Link href="/tools">
              <Button variant="outline" data-testid="button-browse-all-tools">
                Browse All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Edit and Transform Images Without Downloads</h2>
            <p className="text-muted-foreground leading-relaxed">
              Image editing tools help you resize, compress, convert, and apply effects to photos and graphics instantly. Whether you need to optimize images for web, convert between formats, or create visual effects, image tools eliminate the need for complex software installations. From reducing file sizes to extracting colors, image tools handle common editing tasks in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern image tools provide everything from basic operations like cropping and resizing to advanced features like color extraction and AI upscaling, all accessible through your browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Benefits from Image Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Content creators use image tools to resize photos for social media, compress images for websites, and apply creative effects. Developers leverage image-to-base64 converters for embedding images in code. Designers extract color palettes and generate gradients. Photographers compress and resize bulk images for faster uploads. Students create visual presentations with properly formatted images. Businesses optimize product images for e-commerce sites.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Privacy-conscious users appreciate local processing that keeps images on their device. Quick online workers save time with one-click operations that eliminate software overhead.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Common Image Editing Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Image compression reduces file sizes for faster uploads and downloads while maintaining visual quality. Resizing adjusts dimensions for different platforms—social media, websites, print. Format conversion changes between JPEG, PNG, WebP, and PDF. Cropping removes unwanted areas and adjusts aspect ratios. Effects like blur, pixelate, and grayscale add creative or functional touches.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Color tools extract dominant colors, generate palettes, and convert color codes. Mirror and rotate operations flip and adjust image orientation. Upscaling enlarges images while preserving quality using advanced algorithms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Private & Offline Image Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All image tools run entirely in your browser—no uploads to external servers. This offline-first approach ensures complete privacy for sensitive images, proprietary graphics, and personal photos. No tracking, no logging, no third-party analysis. Your images stay on your device throughout the entire process.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Local image processing means instant results without network delays, offline functionality after initial load, and zero security risks. Whether processing confidential business graphics, personal photos, or sensitive documents, browser-based processing guarantees genuine privacy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using Image Tools Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with compression to reduce file sizes without quality loss. Use resizing to optimize images for specific platforms and use cases. Convert formats to ensure compatibility across different systems. Crop to remove unwanted areas and improve composition. Apply effects like blur or pixelate for privacy or creative purposes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Leverage color tools to extract palettes for design inspiration or match colors across projects. Upscale low-resolution images when quality is important. Convert between image and PDF formats as needed. Most importantly, use image tools as part of your regular workflow—whether managing social media assets, optimizing web content, or creating visual designs.
            </p>
          </section>
        </article>

        {/* All Image Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All Image Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <ImageIcon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-image-tool-${tool.id}`}>
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
