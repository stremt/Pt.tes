import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Link2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ParsedURL {
  protocol: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
}

export default function URLParser() {
  const [inputURL, setInputURL] = useState<string>("");
  const [parsedURL, setParsedURL] = useState<ParsedURL | null>(null);
  const { toast } = useToast();

  useSEO({
    title: "URL Parser | Extract URL Components",
    description: "Parse URL and extract protocol, domain, path, query parameters.",
    keywords: "url parser, extract url parts",
    canonicalUrl: "https://tools.pixocraft.in/tools/url-parser",
  });

  const handleParse = () => {
    if (!inputURL) {
      toast({
        title: "Enter URL",
        description: "Please enter a URL to parse",
        variant: "destructive",
      });
      return;
    }

    try {
      const url = new URL(inputURL);
      const params: Record<string, string> = {};
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });

      setParsedURL({
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || '(default)',
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        params,
      });

      toast({
        title: "URL Parsed!",
        description: "All components extracted successfully",
      });
    } catch (error) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
    }
  };

  const howItWorks = [
    { step: 1, title: "Enter URL", description: "Paste any complete URL" },
    { step: 2, title: "Parse", description: "Click to extract all components" },
    { step: 3, title: "View Details", description: "See protocol, domain, path, params, etc." },
  ];

  const benefits = [
    { icon: <Link2 className="h-5 w-5" />, title: "Complete Parsing", description: "Extracts all URL components" },
    { icon: <Search className="h-5 w-5" />, title: "Query Params", description: "Lists all query parameters" },
    { icon: <Link2 className="h-5 w-5" />, title: "Instant Analysis", description: "Parse in milliseconds" },
  ];

  const faqs = [
    {
      question: "What is URL parsing?",
      answer: "URL parsing breaks down a URL into its components: protocol (http/https), domain, port, path, query parameters, and hash.",
    },
    {
      question: "What are query parameters?",
      answer: "Query parameters are key-value pairs in the URL after the '?' symbol. For example, in 'site.com?id=123&name=test', 'id' and 'name' are parameters.",
    },
    {
      question: "Can I parse any URL?",
      answer: "You can parse any valid URL. The URL must include a protocol (http:// or https://) and domain name.",
    },
  ];

  const toolContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="input-url" data-testid="label-input">Enter URL</Label>
          <Input
            id="input-url"
            data-testid="input-url"
            type="url"
            placeholder="https://example.com/path?param=value#section"
            value={inputURL}
            onChange={(e) => setInputURL(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleParse} 
          className="w-full" 
          data-testid="button-parse"
        >
          <Search className="mr-2 h-4 w-4" />
          Parse URL
        </Button>

        {parsedURL && (
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4" data-testid="text-title">URL Components</h3>
              
              <div className="grid gap-3">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-medium text-muted-foreground">Protocol:</span>
                  <span className="col-span-2 font-mono" data-testid="text-protocol">{parsedURL.protocol}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="font-medium text-muted-foreground">Hostname:</span>
                  <span className="col-span-2 font-mono" data-testid="text-hostname">{parsedURL.hostname}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="font-medium text-muted-foreground">Port:</span>
                  <span className="col-span-2 font-mono" data-testid="text-port">{parsedURL.port}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <span className="font-medium text-muted-foreground">Path:</span>
                  <span className="col-span-2 font-mono" data-testid="text-path">{parsedURL.pathname || '/'}</span>
                </div>

                {parsedURL.search && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-muted-foreground">Query String:</span>
                    <span className="col-span-2 font-mono text-sm" data-testid="text-search">{parsedURL.search}</span>
                  </div>
                )}

                {parsedURL.hash && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="font-medium text-muted-foreground">Hash:</span>
                    <span className="col-span-2 font-mono" data-testid="text-hash">{parsedURL.hash}</span>
                  </div>
                )}
              </div>

              {Object.keys(parsedURL.params).length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-3" data-testid="text-params-title">Query Parameters</h4>
                  <div className="space-y-2" data-testid="list-params">
                    {Object.entries(parsedURL.params).map(([key, value], index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-sm">
                        <span className="font-medium text-primary" data-testid={`param-key-${index}`}>{key}:</span>
                        <span className="col-span-2 font-mono" data-testid={`param-value-${index}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <ToolLayout
      title="URL Parser"
      description="Parse URL and extract protocol, domain, path, query parameters."
      icon={<Link2 className="h-6 w-6" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      {toolContent}
    </ToolLayout>
  );
}
