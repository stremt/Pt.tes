import { useSEO, OG_IMAGES } from "@/lib/seo";
import QRMaker from "./QRMaker";

export default function QRCodeForProductPackaging() {
  useSEO({
    title: "QR Code for Product Packaging | E-commerce QR Generator",
    description: "Create QR codes for product packaging and e-commerce. Link customers to product pages, authenticity verification, and reviews. Free online QR maker.",
    keywords: "qr code for product packaging, product qr code, ecommerce qr code, packaging qr code, product authentication qr",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-product-packaging",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <div>
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12 mb-8 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">QR Code for E-commerce Product Packaging</h1>
          <p className="text-lg text-muted-foreground">Generate custom QR codes for product packaging to link customers to product pages, authenticity verification, and customer reviews</p>
        </div>
      </div>
      <QRMaker />
    </div>
  );
}
