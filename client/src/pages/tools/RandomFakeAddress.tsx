import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { indianAddresses } from "@/lib/random-data";

export default function RandomFakeAddress() {
  const [address, setAddress] = useState<typeof indianAddresses[0] | null>(null);

  useSEO({
    title: "Fake Indian Address Generator | Offline Static Addresses | Pixocraft Tools",
    description: "Generate random Indian-style addresses (static safe). Perfect for testing and development purposes.",
    keywords: "fake address, random indian address, test address generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-fake-address",
  });

  const generateAddress = () => {
    const randomIndex = Math.floor(Math.random() * indianAddresses.length);
    setAddress(indianAddresses[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get random address instantly" },
    { step: 2, title: "View Details", description: "See street, city, state & pincode" },
    { step: 3, title: "Use for Testing", description: "Perfect for development" },
  ];

  const benefits = [
    { icon: <MapPin className="h-5 w-5" />, title: "Static & Safe", description: "Pre-defined addresses only" },
    { icon: <MapPin className="h-5 w-5" />, title: "Testing Ready", description: "Perfect for demos" },
    { icon: <MapPin className="h-5 w-5" />, title: "Indian Cities", description: "Major Indian locations" },
    { icon: <MapPin className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Are these real addresses?",
      answer: "No, these are fictional addresses created for testing and development purposes only. They should not be used for any real transactions or purposes."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Fake Address Generator"
        description="Click → show random address"
        icon={<MapPin className="h-8 w-8" />}
        toolId="random-fake-address"
        category="random"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-6 px-4 pt-4">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "Random Tools", url: "/tools/random" },
              { label: "Random Fake Address" },
            ]}
          />
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateAddress}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Random Address
          </Button>

          {address && (
            <Card>
              <CardContent className="p-8">
                <div className="space-y-3" data-testid="text-address">
                  <p className="text-xl font-semibold">{address.street}</p>
                  <p className="text-lg">{address.city}, {address.state}</p>
                  <p className="text-lg">PIN: {address.pincode}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
