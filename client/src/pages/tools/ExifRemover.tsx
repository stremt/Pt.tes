import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { FileX, Upload, Download, Shield } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

export default function ExifRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [cleanedImage, setCleanedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useSEO({
    title: "EXIF Remover - Remove Metadata & GPS from Photos Online",
    description: "Remove EXIF data from images online for free. Strip GPS location, camera settings, and timestamps to protect your privacy. No uploads, 100% private.",
    keywords: "exif remover, remove metadata from photos, remove gps location from images, photo metadata remover, remove exif data online, exif remover free",
    canonicalUrl: "https://tools.pixocraft.in/tools/exif-remover",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target?.result as string);
        removeExif(img);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const removeExif = (img: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const cleanDataUrl = canvas.toDataURL('image/png');
    setCleanedImage(cleanDataUrl);
  };

  const downloadImage = () => {
    if (!cleanedImage) return;

    const link = document.createElement('a');
    link.download = 'no-exif-image.png';
    link.href = cleanedImage;
    link.click();
  };

  return (
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Tools", url: "/tools/image" },
            { label: "EXIF Remover" },
          ]}
        />
      </div>
      <ToolLayout
        title="EXIF Remover: Remove Metadata from Photos Online"
        description="Upload photo → strip metadata → download clean image. Remove GPS, camera settings, timestamps."
        icon={<FileX className="h-10 w-10 text-primary" />}
        toolId="exif-remover"
        category="Privacy & Security"
      howItWorks={[
        { step: 1, title: "Upload Image", description: "Select any photo with EXIF data from your device." },
        { step: 2, title: "Auto Remove", description: "EXIF metadata (location, camera, date) is stripped automatically." },
        { step: 3, title: "Download Clean", description: "Get image without any embedded metadata or location data." },
      ]}
      benefits={[
        { icon: <Shield className="h-6 w-6 text-primary" />, title: "Location Privacy", description: "Remove GPS coordinates that reveal where photos were taken." },
        { icon: <FileX className="h-6 w-6 text-primary" />, title: "Complete Metadata Removal", description: "Strip camera model, timestamps, and device information." },
      ]}
      faqs={[
        { question: "What is EXIF data and what does it contain?", answer: "EXIF (Exchangeable Image File Format) is metadata embedded in your photos. It typically contains GPS coordinates (exact location), camera model, shutter speed, aperture, date & time taken, phone model, and sometimes even thumbnail images. It is essentially a digital footprint of when and where a photo was captured." },
        { question: "How does GPS data in photos affect my privacy?", answer: "GPS coordinates reveal exactly where a photo was taken, often down to a few meters. Sharing these images on social media or public forums can expose your home address, workplace, or travel patterns, creating significant safety and privacy risks." },
        { question: "Does removing EXIF data reduce image quality?", answer: "No, using this EXIF remover does not reduce the visual quality of your image. Our tool strips the invisible metadata while keeping the pixels intact. Your photo remains just as sharp and clear as the original." },
        { question: "Is it possible to remove EXIF from multiple images?", answer: "Currently, this tool processes images individually to ensure maximum privacy and speed. You can quickly clean multiple photos by uploading and downloading them one after another." },
        { question: "Is my privacy guaranteed when using this online EXIF remover?", answer: "Yes. Unlike other tools that upload your files to a server, our EXIF remover processes everything locally in your browser. Your images never leave your computer, ensuring 100% privacy and security." },
        { question: "When should I remove EXIF data from my photos?", answer: "It is best practice to remove metadata before selling items on platforms like OLX or eBay, sharing travel photos on social media, sending proofs to clients, or whenever you want to keep your location and device details private." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
          data-testid="input-file"
        />

        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={() => fileInputRef.current?.click()} data-testid="button-upload">
              <Upload className="h-4 w-4 mr-2" />
              Choose Image
            </Button>

            {image && (
              <div className="mt-4">
                <img src={image} alt="Original" className="max-w-full h-auto max-h-[400px] rounded-lg" data-testid="image-preview" />
              </div>
            )}
          </CardContent>
        </Card>

        {cleanedImage && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                EXIF Data Removed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your image is now clean and ready to download without any metadata.
                </p>
                <Button onClick={downloadImage} data-testid="button-download">
                  <Download className="h-4 w-4 mr-2" />
                  Download Clean Image
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <LongTailPagesSection toolId="image-exif-remover" />

        <div className="prose prose-slate dark:prose-invert max-w-none mt-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold">Understanding EXIF Data</h2>
            <p>
              Every time you take a photo with a digital camera or smartphone, a hidden layer of information is stored within the file. This is known as EXIF (Exchangeable Image File Format) data. While it serves a technical purpose by recording camera settings like ISO, aperture, and shutter speed, it also captures highly sensitive personal information.
            </p>
            <p>
              Most notably, digital images often include GPS coordinates that pin-point exactly where the photo was taken. When you share these photos online, you aren't just sharing an image; you are sharing a digital map to your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Why EXIF Data is a Privacy Risk</h2>
            <p>
              Privacy is more than just keeping a secret; it is about controlling your personal information. EXIF metadata can be exploited by third parties to track your movements or identify your home and work addresses. For example, a photo of a product you are selling online could reveal your exact front door to a total stranger.
            </p>
            <p>
              Beyond location, metadata also includes device signatures. This info tells people exactly what kind of phone or camera you use, which can be used for targeted social engineering or even identifying your lifestyle habits based on the gear you own.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Who Should Use an EXIF Remover?</h2>
            <p>
              In today's connected world, everyone can benefit from stripping metadata from their photos, but certain groups find it essential:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Social Media Users:</strong> Protect your home and family's location before posting on Instagram, Facebook, or X.</li>
              <li><strong>Photographers:</strong> Maintain professional control over your proprietary camera settings and technical secrets.</li>
              <li><strong>Journalists & Activists:</strong> Safeguard your sources and your own physical safety when reporting from sensitive locations.</li>
              <li><strong>Businesses:</strong> Prevent competitors from analyzing your production facilities or identifying specific equipment used in your operations.</li>
              <li><strong>Everyday Users:</strong> Ensure that your private life stays private whenever you send a photo via email or messaging apps.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Real-Life Use Cases for Metadata Removal</h2>
            <p>
              There are several common scenarios where using an EXIF remover is a crucial step:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Selling Online:</strong> When listing items on marketplaces, strip the metadata so buyers only see the product, not your home location.</li>
              <li><strong>Sharing Travel Photos:</strong> Post your vacation highlights without alerting the world to exactly which hotel or private villa you are staying in.</li>
              <li><strong>Professional Delivery:</strong> Send clean images to clients to maintain a professional standard and protect your workflow details.</li>
              <li><strong>Public Forums:</strong> Upload images to community boards without leaving a trail of your personal device history.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">A Privacy-First Metadata Tool</h2>
            <p>
              Our EXIF remover is designed with a "Privacy-First" philosophy. Unlike traditional online tools, our processor runs entirely within your web browser. This means your images are never uploaded to our servers, and we never see or store your data.
            </p>
            <p>
              You maintain 100% control over your files. The process is instantaneous, secure, and completely free. By stripping the invisible metadata, we give you the confidence to share your visual stories without compromising your personal security.
            </p>
          </section>

          <section className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Related Tools:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0 m-0">
              <li><Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link></li>
              <li><Link href="/tools/background-remover" className="text-primary hover:underline">Background Remover</Link></li>
              <li><Link href="/tools/image-upscaler" className="text-primary hover:underline">Image Upscaler</Link></li>
              <li><Link href="/tools/png-to-jpg" className="text-primary hover:underline">PNG to JPG Converter</Link></li>
              <li><Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link></li>
            </ul>
          </section>
        </div>

      </div>
      {/* Category Footer */}
      <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
        Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
      </p>
    </ToolLayout>
    </>
  );
}
