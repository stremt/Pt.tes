import { useState, useEffect } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Monitor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function ScreenResolutionChecker() {
  const [screenInfo, setScreenInfo] = useState({
    width: 0,
    height: 0,
    availWidth: 0,
    availHeight: 0,
    colorDepth: 0,
    pixelDepth: 0,
    dpr: 0,
    viewportWidth: 0,
    viewportHeight: 0,
  });

  useSEO({
    title: "Screen Resolution Checker | Device Width & Height | Pixocraft Tools",
    description: "Check your screen resolution, DPR, viewport size & browser window instantly.",
    keywords: "screen resolution checker, screen size, viewport size tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/screen-resolution-checker",
  });

  useEffect(() => {
    const updateScreenInfo = () => {
      setScreenInfo({
        width: window.screen.width,
        height: window.screen.height,
        availWidth: window.screen.availWidth,
        availHeight: window.screen.availHeight,
        colorDepth: window.screen.colorDepth,
        pixelDepth: window.screen.pixelDepth,
        dpr: window.devicePixelRatio,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });
    };

    updateScreenInfo();
    window.addEventListener("resize", updateScreenInfo);
    return () => window.removeEventListener("resize", updateScreenInfo);
  }, []);

  const howItWorks = [
    { step: 1, title: "Open Tool", description: "Visit this page on any device" },
    { step: 2, title: "Auto Detect", description: "Screen info loads automatically" },
    { step: 3, title: "View Details", description: "See resolution, DPR, viewport & more" },
  ];

  const benefits = [
    { icon: <Monitor className="h-5 w-5" />, title: "Mobile Supported", description: "Auto detects all screen sizes" },
    { icon: <Monitor className="h-5 w-5" />, title: "Real-Time", description: "Updates on window resize" },
    { icon: <Monitor className="h-5 w-5" />, title: "Complete Info", description: "Resolution, DPR, viewport & more" },
    { icon: <Monitor className="h-5 w-5" />, title: "Instant", description: "No configuration needed" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Mobile supported?",
      answer: "Yes — auto detects all sizes. Works perfectly on smartphones, tablets, laptops, and desktop monitors."
    },
    {
      question: "What is DPR?",
      answer: "Device Pixel Ratio (DPR) shows how many physical pixels represent one CSS pixel. Higher DPR means sharper displays (Retina displays have DPR of 2 or more)."
    },
    {
      question: "What's the difference between screen size and viewport?",
      answer: "Screen size is your physical display dimensions. Viewport is the visible browser window area, which can be smaller due to browser UI, zoom level, or window size."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Screen Resolution Checker"
        description="Shows screen size, viewport, DPR & device info instantly."
        icon={<Monitor className="h-8 w-8" />}
        toolId="screen-resolution-checker"
        category="utility"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Screen Resolution Checker</span>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Screen Resolution</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Width</p>
                    <p className="text-3xl font-bold" data-testid="text-screen-width">{screenInfo.width}px</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="text-3xl font-bold" data-testid="text-screen-height">{screenInfo.height}px</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Viewport Size</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Width</p>
                    <p className="text-3xl font-bold" data-testid="text-viewport-width">{screenInfo.viewportWidth}px</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="text-3xl font-bold" data-testid="text-viewport-height">{screenInfo.viewportHeight}px</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Display Info</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">DPR</p>
                    <p className="text-2xl font-bold" data-testid="text-dpr">{screenInfo.dpr}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Color Depth</p>
                    <p className="text-2xl font-bold" data-testid="text-color-depth">{screenInfo.colorDepth}-bit</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Pixel Depth</p>
                    <p className="text-2xl font-bold" data-testid="text-pixel-depth">{screenInfo.pixelDepth}-bit</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
