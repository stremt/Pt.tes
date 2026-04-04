import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FilePlus, Shield, Zap } from "lucide-react";

export default function CombinePdfFilesOnline() {
  useSEO({
    title: "Combine PDF Files Online - Free & Secure Merger | Pixocraft",
    description: "Merge multiple PDF documents into a single file instantly. Our secure online tool works in your browser with no uploads, keeping your data private.",
    keywords: "combine pdf files online, merge pdf online free, secure pdf merger, join pdf documents, online pdf joiner",
    canonical: "https://tools.pixocraft.in/tools/pdf-merger/combine"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Combine PDF Files", url: "/tools/pdf-merger/combine" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Combine PDF Files Online - Free & Secure</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Managing separate PDF documents can be frustrating. Whether it's reports, school assignments, or legal papers, combining them into one file makes everything easier to organize and share. Our online tool provides a seamless way to join your PDF files instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Instant Merging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Join your documents in seconds. Our optimized engine handles multiple files with lightning speed directly in your browser.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">100% Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your files never leave your computer. We use client-side technology to ensure complete privacy for your sensitive documents.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why People Need to Combine PDF Files</h2>
            <p className="text-muted-foreground leading-relaxed">
              In a digital workspace, fragmented information is a major hurdle. Combining PDF files allows you to create cohesive documents that are easier to read and archive. Students often need to merge different sections of a project, while businesses use it to compile monthly reports from various departments. By joining these files, you ensure that the recipient views the information in the correct order without missing any attachments.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How the Pixocraft PDF Merger Helps</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft offers a distraction-free environment for document management. Our tool is designed to be intuitive, allowing you to drag and drop your files, arrange them in the desired order, and merge them with a single click. Unlike other tools that require complex software installations, Pixocraft works natively in your browser, saving you time and system resources.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes When Merging PDFs</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using untrusted websites that store your personal data on their servers.</li>
              <li>Merging files in the wrong order, leading to confusion for the reader.</li>
              <li>Ignoring file size limits that can cause browsers to crash during the process.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Security First</h2>
            <p className="text-muted-foreground leading-relaxed">
              We take your privacy seriously. The Pixocraft PDF Merger performs all operations locally. This means your sensitive business reports or personal documents are never uploaded to any external server. You maintain full control over your data throughout the entire merging process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is there a limit on the number of files I can combine?", a: "No, you can merge as many files as your browser memory can handle." },
                { q: "Will the quality of my PDF decrease after merging?", a: "No, our tool preserves the original quality and formatting of all merged documents." },
                { q: "Can I use this tool on my mobile phone?", a: "Yes, it is fully optimized for all mobile browsers." },
                { q: "Do I need to sign up to use the merger?", a: "No, all our tools are free to use without any registration." },
                { q: "What happens to my files after I close the browser?", a: "Since we don't upload them, they are never stored and are gone once you close the tab." }
              ].map((faq, i) => (
                <Card key={i} className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{faq.a}</CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-center py-8">
            <h2 className="text-3xl font-bold">Merge Your PDF Files Today</h2>
            <p className="text-muted-foreground">Experience the fastest and most secure way to join your documents.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-merger">
                <Button size="lg" className="gap-2">
                  Use PDF Merger Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">Main PDF Merger Tool</Link>
              <Link href="/tools/pdf-splitter" className="text-primary hover:underline">PDF Splitter</Link>
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">PDF Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
