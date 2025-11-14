import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Link, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function UTMBuilder() {
  const [baseUrl, setBaseUrl] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [medium, setMedium] = useState<string>("");
  const [campaign, setCampaign] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const { toast } = useToast();

  useSEO({
    title: "UTM Builder Online | Create Trackable Links Easily | Pixocraft Tools",
    description: "Generate UTM tracking links for Google Analytics. Free, fast and 100% offline.",
    keywords: "utm builder, utm generator, tracking link creator, google analytics, utm parameters",
    canonicalUrl: "https://tools.pixocraft.in/tools/utm-builder",
  });

  const buildUTMUrl = () => {
    if (!baseUrl || !source || !medium || !campaign) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in URL, Source, Medium, and Campaign",
        variant: "destructive",
      });
      return;
    }

    const params = new URLSearchParams();
    params.append('utm_source', source);
    params.append('utm_medium', medium);
    params.append('utm_campaign', campaign);
    if (term) params.append('utm_term', term);
    if (content) params.append('utm_content', content);

    const url = baseUrl.includes('?') 
      ? `${baseUrl}&${params.toString()}`
      : `${baseUrl}?${params.toString()}`;

    setGeneratedUrl(url);
    toast({
      title: "UTM Link Generated!",
      description: "Your tracking link is ready",
    });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedUrl);
    toast({
      title: "Copied!",
      description: "UTM link copied to clipboard",
    });
  };

  const howItWorks = [
    { step: 1, title: "Enter URL", description: "Provide your website URL" },
    { step: 2, title: "Add UTM Parameters", description: "Fill in source, medium, campaign, and optional fields" },
    { step: 3, title: "Generate & Track", description: "Use the link in your campaigns and track in Google Analytics" },
  ];

  const benefits = [
    { icon: <Link className="h-5 w-5" />, title: "Track Everything", description: "Monitor campaign performance in Google Analytics" },
    { icon: <Link className="h-5 w-5" />, title: "100% Offline", description: "Generate UTM links without sending data anywhere" },
    { icon: <Copy className="h-5 w-5" />, title: "Marketing Ready", description: "Perfect for ads, emails, and social media" },
  ];

  const faqs = [
    {
      question: "What are UTM parameters?",
      answer: "UTM parameters are tags added to URLs to track the effectiveness of marketing campaigns in analytics tools like Google Analytics.",
    },
    {
      question: "Which parameters are required?",
      answer: "Source, Medium, and Campaign are required. Term and Content are optional for more detailed tracking.",
    },
    {
      question: "Can I track social media posts?",
      answer: "Yes! UTM links are perfect for tracking clicks from social media, email campaigns, and paid ads.",
    },
  ];

  return (
    <ToolLayout
      title="UTM Link Builder"
      description="Generate UTM tracking links for Google Analytics. Free, fast and 100% offline."
      icon={<Link className="h-8 w-8" />}
      toolId="utm-builder"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="base-url" className="text-base font-semibold">
              Website URL *
            </Label>
            <Input
              id="base-url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/page"
              data-testid="input-url"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source" className="text-base font-semibold">
                Campaign Source *
              </Label>
              <Input
                id="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="google, facebook, newsletter"
                data-testid="input-source"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medium" className="text-base font-semibold">
                Campaign Medium *
              </Label>
              <Input
                id="medium"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="cpc, email, social"
                data-testid="input-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign" className="text-base font-semibold">
                Campaign Name *
              </Label>
              <Input
                id="campaign"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="summer_sale, product_launch"
                data-testid="input-campaign"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="term" className="text-base font-semibold">
                Campaign Term (Optional)
              </Label>
              <Input
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="running+shoes"
                data-testid="input-term"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-base font-semibold">
                Campaign Content (Optional)
              </Label>
              <Input
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="logolink, textlink"
                data-testid="input-content"
              />
            </div>
          </div>

          <Button
            onClick={buildUTMUrl}
            size="lg"
            data-testid="button-generate"
          >
            <Link className="mr-2 h-5 w-5" />
            Generate UTM Link
          </Button>
        </div>

        {generatedUrl && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Generated UTM Link
              </Label>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                data-testid="button-copy"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-mono break-all" data-testid="text-utm-url">
                {generatedUrl}
              </p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
