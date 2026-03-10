import { useSEO, OG_IMAGES } from "@/lib/seo";
import QRMaker from "./QRMaker";

export default function QRCodeForEventTickets() {
  useSEO({
    title: "QR Code for Event Tickets | Event Management QR Generator",
    description: "Create QR codes for event tickets and check-ins. Generate custom ticketing QR codes for events, conferences, and registration. Free online event QR maker.",
    keywords: "qr code for event tickets, event ticket qr code, event registration qr, event checkin qr code, ticketing qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-event-tickets",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <div>
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12 mb-8 -mx-4 px-4 md:-mx-8 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">QR Code for Event Tickets & Registration</h1>
          <p className="text-lg text-muted-foreground">Generate custom event QR codes for ticketing, registration, and check-ins. Track attendance with scannable codes</p>
        </div>
      </div>
      <QRMaker />
    </div>
  );
}
