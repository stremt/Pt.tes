import { useSEO, OG_IMAGES } from "@/lib/seo";
import QRMaker from "./QRMaker";

export default function QRCodeForRestaurantMenu() {
  useSEO({
    title: "QR Code for Restaurant Menu | Free Digital Menu Generator",
    description: "Create touchless QR code menus for restaurants and cafes. Generate custom digital menus for contactless ordering. Free online QR code maker for restaurants.",
    keywords: "qr code for restaurant menu, restaurant menu qr code, digital menu qr code, touchless menu, cafe qr code, contactless menu",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-restaurant-menu",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <div>
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12 mb-8 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">QR Code for Restaurant Menus</h1>
          <p className="text-lg text-muted-foreground">Create professional digital menus with QR codes for touchless ordering and customer convenience</p>
        </div>
      </div>
      <QRMaker />
    </div>
  );
}
