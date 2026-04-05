import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, ShieldCheck, AlertTriangle, CheckCircle2, Smartphone, Monitor } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Open tools.pixocraft.in in your browser",
    description: "Visit the site and click on the lock / settings icon next to the URL in the address bar.",
    image: "/guide/step1.png",
    alt: "Step 1 — Open Pixocraft Tools in browser",
  },
  {
    number: 2,
    title: "Click on \"Cookies and site data\"",
    description: "A small panel will open. Select \"Cookies and site data\" to proceed.",
    image: "/guide/step2.png",
    alt: "Step 2 — Click Cookies and site data",
  },
  {
    number: 3,
    title: "Open \"Manage on-device site data\"",
    description: "Click on \"Manage on-device site data\" — this shows you all locally stored data for Pixocraft.",
    image: "/guide/step3.png",
    alt: "Step 3 — Manage on-device site data",
  },
  {
    number: 4,
    title: "Delete pixocraft.in and tools.pixocraft.in data",
    description: "You'll see both sites listed. Click the delete (trash) icon next to each one, then tap Done.",
    image: "/guide/step4.png",
    alt: "Step 4 — Delete Pixocraft site data",
  },
];

export default function UpdateGuide() {
  useSEO({
    title: "How to Get the Latest Updates — Pixocraft Tools",
    description: "Learn how to clear your browser's site data for Pixocraft Tools to instantly get the latest features, bug fixes, and tool updates. Safe and easy — only removes Pixocraft data.",
    keywords: "pixocraft tools update, clear site data, get latest tools, refresh pixocraft, browser cache, update guide",
    canonicalUrl: "https://tools.pixocraft.in/update-guide",
  });

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="text-center space-y-5 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Update Guide
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Get the Latest Version of <span className="text-primary">Pixocraft Tools</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We update our tools every week with new features and bug fixes. Since all tools run locally in your browser, you may need to clear your site data once to load the freshest version.
          </p>
        </div>

        {/* Why notice */}
        <Card className="mb-10 border-blue-400/30 bg-blue-400/5">
          <CardContent className="p-5 flex gap-4 items-start">
            <ShieldCheck className="h-6 w-6 text-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-foreground">Your data is completely safe</p>
              <p className="text-muted-foreground leading-relaxed">
                This process only removes <strong>Pixocraft Tools'</strong> locally cached files — it does not affect your passwords, bookmarks, history, or any other website's data. The only thing that may be removed is any data <em>you</em> saved inside a Pixocraft tool (such as notes or saved inputs). If you're happy with the current version, you can skip this entirely.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="mb-12 border-yellow-400/30 bg-yellow-400/5">
          <CardContent className="p-5 flex gap-4 items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Note: </span>
              If you have stored any data inside a Pixocraft tool (for example, saved notes in the notepad), that data will be removed. Back it up first if needed.
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-center">Step-by-Step Instructions</h2>
          <p className="text-center text-muted-foreground text-sm -mt-4">Works on both Chrome desktop and mobile</p>

          <div className="space-y-6">
            {steps.map((step) => (
              <Card key={step.number} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Step number + text */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                          {step.number}
                        </span>
                        <h3 className="font-semibold text-base leading-snug">{step.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-11">
                        {step.description}
                      </p>
                    </div>
                    {/* Screenshot */}
                    <div className="sm:w-64 flex-shrink-0 bg-muted/30 flex items-center justify-center p-3">
                      <img
                        src={step.image}
                        alt={step.alt}
                        className="rounded-md max-h-44 w-auto object-contain"
                        data-testid={`img-update-step-${step.number}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <Card>
            <CardContent className="p-5 flex gap-4 items-start">
              <Monitor className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold">Desktop (Chrome / Edge)</p>
                <p className="text-muted-foreground leading-relaxed">Click the lock icon in the address bar → Cookies and site data → Manage on-device site data → Delete both entries.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 flex gap-4 items-start">
              <Smartphone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-semibold">Mobile (Chrome Android)</p>
                <p className="text-muted-foreground leading-relaxed">Tap the lock icon in the address bar → Cookies and site data → Manage on-device site data → Delete both entries.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Done notice */}
        <Card className="border-green-400/30 bg-green-400/5">
          <CardContent className="p-5 flex gap-4 items-start">
            <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
            <div className="text-sm space-y-1">
              <p className="font-semibold text-foreground">You're all set!</p>
              <p className="text-muted-foreground leading-relaxed">
                After deleting the data, refresh <strong>tools.pixocraft.in</strong> and the latest version will load automatically. You only need to do this when you want to pick up new updates — not every visit.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Update frequency note */}
        <p className="text-center text-xs text-muted-foreground mt-10">
          We ship tool updates and bug fixes every week. Thank you for using Pixocraft Tools!
        </p>

      </div>
    </div>
  );
}
