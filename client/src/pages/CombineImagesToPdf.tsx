import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Image as ImageIcon, Shield, PlusCircle } from "lucide-react";

export default function CombineImagesToPdf() {
  useSEO({
    title: "Combine Multiple Images into One PDF - Fast & Easy | Pixocraft",
    description: "Merge multiple photos, scans, and graphics into a single professional PDF document. Easy drag-and-drop organization, high quality, and completely secure.",
    keywords: "combine images to pdf, merge photos to pdf, multiple images to one pdf, photo to pdf merger, offline image combiner",
    canonical: "https://tools.pixocraft.in/tools/image-to-pdf/combine"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Image to PDF", url: "/tools/image-to-pdf" },
            { name: "Combine Images into PDF", url: "/tools/image-to-pdf/combine" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
              Combine Multiple Images into One PDF - Fast & Easy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Handling scattered image files can be a logistical nightmare. Whether it's a series of scanned documents for a contract or a collection of vacation photos, combining them into a single PDF document is the ultimate way to stay organized and professional.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <PlusCircle className="h-8 w-8 text-primary" />
              <h3 className="font-bold">Batch Processing</h3>
              <p className="text-sm text-muted-foreground">Upload dozens of images and merge them in a single click.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <ImageIcon className="h-8 w-8 text-secondary" />
              <h3 className="font-bold">Visual Sorting</h3>
              <p className="text-sm text-muted-foreground">Easily rearrange your images to get the perfect document flow.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Secure Local Merging</h3>
              <p className="text-sm text-muted-foreground">Your images never leave your device. Total privacy guaranteed.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Combine Images into a Single PDF?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Managing a dozen separate image files is inefficient for both you and your recipients. A single PDF document is easier to share, simpler to print, and provides a professional structure to your content. It also allows you to add a layer of organization, ensuring that the recipient views your images in the exact order you intended.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Merging Experience</h2>
            <p className="text-muted-foreground leading-relaxed">
              We've designed our image combiner to be as intuitive as possible. Our drag-and-drop interface allows you to quickly upload and organize your assets. We handle the heavy lifting of adjusting resolutions and aligning pages, so you can focus on the content of your document rather than the technical details of the file format.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Merging</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using tools that mix up the order of your pages during the merge.</li>
              <li>Merging high-res images without compression, creating massive, unshareable files.</li>
              <li>Trusting sites that keep a copy of your combined document on their servers.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy at the Core</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you combine personal photos or sensitive documents, you need to know they're safe. Pixocraft's merging process happens entirely in your browser's local sandbox. No data is transmitted to our servers, and we have no access to your files. It's the most secure way to manage your digital assets.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Merging Multiple Images</h2>
            <div className="space-y-4">
              {[
                { q: "How many images can I combine?", a: "You can combine as many images as your browser's memory can handle—usually dozens or even hundreds at a time." },
                { q: "Will the final PDF be very large?", a: "We apply intelligent compression to ensure that the final document is optimized for sharing while maintaining high quality." },
                { q: "Can I combine different image formats?", a: "Yes, you can mix JPG, PNG, and other supported formats into a single PDF document." },
                { q: "Can I delete an image after uploading?", a: "Absolutely. Our interface allows you to remove individual images before you start the merging process." },
                { q: "What is the best order for my images?", a: "That's entirely up to you! Our tool gives you full control over the sequence of your pages." },
                { q: "Is this tool free for everyone?", a: "Yes, we provide high-quality document tools for free, with no signup and no watermarks." }
              ].map((faq, i) => (
                <Card key={i} className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {faq.a}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-center py-8">
            <h2 className="text-3xl font-bold">Create Your Combined PDF Now</h2>
            <p className="text-muted-foreground">The most efficient way to turn a collection of images into a professional document.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/image-to-pdf">
                <Button size="lg" className="gap-2">
                  Use the Image Combiner
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Main Image to PDF Tool</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
              <Link href="/tools/pdf-splitter" className="text-primary hover:underline">PDF Splitter</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
