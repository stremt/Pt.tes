import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Code2, Copy, Zap, Lock, Globe } from "lucide-react";

export default function APISnippetBuilder() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [body, setBody] = useState("");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "API Snippet Generator | cURL & Fetch Code Builder",
    description: "Create API request snippets in cURL or JavaScript fetch instantly. Offline, secure and direct.",
    keywords: "curl generator, fetch code generator, api request builder",
    canonicalUrl: "https://tools.pixocraft.in/tools/api-snippet-builder",
  });

  const generateCurl = () => {
    let curl = `curl -X ${method} '${url}'`;
    
    if (headers) {
      const headerLines = headers.split('\n').filter(h => h.trim());
      headerLines.forEach(header => {
        curl += ` \\\n  -H '${header.trim()}'`;
      });
    }
    
    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      curl += ` \\\n  -d '${body}'`;
    }
    
    return curl;
  };

  const generateFetch = () => {
    const fetchOptions: any = { method };
    
    if (headers) {
      const headersObj: Record<string, string> = {};
      headers.split('\n').filter(h => h.trim()).forEach(header => {
        const [key, ...valueParts] = header.split(':');
        if (key && valueParts.length) {
          headersObj[key.trim()] = valueParts.join(':').trim();
        }
      });
      if (Object.keys(headersObj).length > 0) {
        fetchOptions.headers = headersObj;
      }
    }
    
    if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
      fetchOptions.body = body;
    }
    
    return `fetch('${url}', ${JSON.stringify(fetchOptions, null, 2)})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
  };

  return (
    <ToolLayout
      title="API Snippet Builder"
      description="Enter API URL, method, headers & body and instantly generate cURL or Fetch code. Perfect for backend, frontend & API developers."
      icon={<Code2 className="h-10 w-10 text-primary" />}
      toolId="api-snippet-builder"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Enter Details", description: "Fill in URL, HTTP method, headers, and request body." },
        { step: 2, title: "Choose Format", description: "Select cURL or JavaScript Fetch output." },
        { step: 3, title: "Copy & Use", description: "Copy the generated code snippet." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Generation", description: "Create API snippets in seconds." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Offline", description: "No data sent to servers." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Multi-Format", description: "Generate cURL and Fetch snippets." },
      ]}
      faqs={[
        { question: "What is cURL?", answer: "cURL is a command-line tool for making HTTP requests. It's widely used for testing APIs and debugging." },
        { question: "What is Fetch?", answer: "Fetch is a modern JavaScript API for making HTTP requests in web browsers and Node.js." },
        { question: "How do I add multiple headers?", answer: "Enter each header on a new line in the format: Header-Name: value" },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Request Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="text-sm font-medium mb-2 block">URL</label>
                <Input
                  placeholder="https://api.example.com/users"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  data-testid="input-url"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Method</label>
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger data-testid="select-method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET" data-testid="select-item-method-get">GET</SelectItem>
                    <SelectItem value="POST" data-testid="select-item-method-post">POST</SelectItem>
                    <SelectItem value="PUT" data-testid="select-item-method-put">PUT</SelectItem>
                    <SelectItem value="PATCH" data-testid="select-item-method-patch">PATCH</SelectItem>
                    <SelectItem value="DELETE" data-testid="select-item-method-delete">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Headers (one per line)</label>
              <Textarea
                placeholder="Content-Type: application/json&#10;Authorization: Bearer token"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
                className="min-h-[100px] text-sm font-mono"
                data-testid="input-headers"
              />
            </div>

            {(method === "POST" || method === "PUT" || method === "PATCH") && (
              <div>
                <label className="text-sm font-medium mb-2 block">Request Body</label>
                <Textarea
                  placeholder='{"name": "John", "email": "john@example.com"}'
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="min-h-[150px] text-sm font-mono"
                  data-testid="input-body"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Code</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="curl">
              <TabsList>
                <TabsTrigger value="curl" data-testid="tab-curl">cURL</TabsTrigger>
                <TabsTrigger value="fetch" data-testid="tab-fetch">JavaScript Fetch</TabsTrigger>
              </TabsList>
              <TabsContent value="curl" className="mt-4">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute right-2 top-2"
                    onClick={() => copyToClipboard(generateCurl())}
                    data-testid="button-copy-curl"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <pre className="p-4 bg-muted rounded-lg overflow-auto text-sm font-mono min-h-[200px]" data-testid="output-curl">
                    {url ? generateCurl() : "Enter URL to generate cURL command"}
                  </pre>
                </div>
              </TabsContent>
              <TabsContent value="fetch" className="mt-4">
                <div className="relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute right-2 top-2"
                    onClick={() => copyToClipboard(generateFetch())}
                    data-testid="button-copy-fetch"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <pre className="p-4 bg-muted rounded-lg overflow-auto text-sm font-mono min-h-[200px]" data-testid="output-fetch">
                    {url ? generateFetch() : "Enter URL to generate Fetch code"}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
