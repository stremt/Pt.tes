import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Smartphone, Zap, Shield, Monitor } from "lucide-react";
import { Link } from "wouter";

export default function ExcelViewerMobile() {
  useSEO({
    title: "Mobile Friendly Excel Viewer - Open XLSX on Phone",
    description: "The best mobile-friendly Excel viewer. Open and read XLSX files on your iPhone, Android, or tablet without any app downloads.",
    keywords: "open excel on mobile, xlsx viewer android, iphone excel opener, tablet spreadsheet viewer",
    canonicalUrl: "https://tools.pixocraft.in/tools/excel-viewer/mobile",
  });

  return (
    <ToolLayout 
      title="Mobile Excel Viewer" 
      description="Optimized for touch screens and mobile browsers." 
      toolId="excel-viewer-mobile" 
      category="developer" 
      icon={<Smartphone className="h-10 w-10" />}
      howItWorks={[
        { step: 1, title: "Access URL", description: "Open this page on your mobile browser." },
        { step: 2, title: "Select File", description: "Choose an Excel file from your device storage." },
        { step: 3, title: "Read Easily", description: "View data in a mobile-optimized table." }
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6" />, title: "Mobile Optimized", description: "Touch friendly UI." },
        { icon: <Monitor className="h-6 w-6" />, title: "Universal", description: "Works on iOS and Android." }
      ]}
      faqs={[
        { question: "Do I need an app?", answer: "No, it works directly in your mobile browser." }
      ]}
    >
      <Card>
        <CardHeader><CardTitle>Mobile Access</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4">No need for bulky apps. View your spreadsheets directly on the go.</p>
          <Link href="/tools/excel-viewer"><Button className="w-full">Launch Mobile Viewer</Button></Link>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
