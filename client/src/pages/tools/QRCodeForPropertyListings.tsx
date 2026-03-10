import { useSEO, OG_IMAGES } from "@/lib/seo";
import QRMaker from "./QRMaker";

export default function QRCodeForPropertyListings() {
  useSEO({
    title: "QR Code for Real Estate | Property Listing QR Generator",
    description: "Create QR codes for real estate property listings. Share virtual tours, floor plans, and property details instantly. Free online real estate QR code maker.",
    keywords: "qr code for real estate, property listing qr code, real estate qr code generator, virtual tour qr code, real estate marketing",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-property-listings",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <div>
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12 mb-8 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">QR Code for Real Estate Property Listings</h1>
          <p className="text-lg text-muted-foreground">Generate custom QR codes to share virtual property tours, floor plans, and listing details with potential buyers</p>
        </div>
      </div>
      <QRMaker />
    </div>
  );
}
