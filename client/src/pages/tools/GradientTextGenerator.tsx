import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Rainbow, Copy } from "lucide-react";

export default function GradientTextGenerator() {
  const [text, setText] = useState("Gradient Text");
  const [color1, setColor1] = useState("#ff0080");
  const [color2, setColor2] = useState("#7928ca");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Gradient Text Generator | CSS Text Gradient Maker | Pixocraft Tools",
    description: "Generate stunning gradient text with live preview & CSS copy.",
    keywords: "gradient text generator, css text gradient tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/gradient-text-generator",
  });

  const cssCode = `background: linear-gradient(90deg, ${color1}, ${color2});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;`;

  return (
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Text Tools", url: "/tools/text" },
            { label: "Gradient Text Generator" },
          ]}
        />
      </div>
      <ToolLayout
        title="Gradient Text Generator"
        description="Create beautiful gradient text with custom colors."
        icon={<Rainbow className="h-10 w-10 text-primary" />}
        toolId="gradient-text-generator"
        category="CSS & Design"
        howItWorks={[
        { step: 1, title: "Enter Text", description: "Type the text you want to stylize." },
        { step: 2, title: "Pick Colors", description: "Choose two colors for the gradient." },
        { step: 3, title: "Copy CSS", description: "Use the generated CSS in your project." },
      ]}
      benefits={[
        { icon: <Rainbow className="h-6 w-6 text-primary" />, title: "Live Preview", description: "See gradient text in real-time." },
      ]}
      faqs={[
        { question: "Does it work in all browsers?", answer: "Works in modern browsers that support background-clip CSS property." },
        { question: "Can I use more than 2 colors?", answer: "This tool uses 2 colors, but you can manually edit the CSS for more gradient stops." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Configure Gradient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Text</Label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-base mt-2"
                data-testid="input-text"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="h-10 w-20 rounded cursor-pointer"
                    data-testid="input-color1"
                  />
                  <Input
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="font-mono"
                    data-testid="input-color1-text"
                  />
                </div>
              </div>
              <div>
                <Label>End Color</Label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="h-10 w-20 rounded cursor-pointer"
                    data-testid="input-color2"
                  />
                  <Input
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="font-mono"
                    data-testid="input-color2-text"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center p-8 bg-muted/50 rounded-lg">
              <h1
                className="text-6xl font-bold"
                style={{
                  background: `linear-gradient(90deg, ${color1}, ${color2})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
                data-testid="text-preview"
              >
                {text}
              </h1>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>CSS Code</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(cssCode, "CSS copied!")}
                data-testid="button-copy"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy CSS
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-muted/50 rounded-lg overflow-x-auto font-mono text-sm" data-testid="css-code">
              {cssCode}
            </pre>
          </CardContent>
        </Card>
      </div>
        {/* Category Footer */}
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/text" className="text-primary hover:text-primary/80 transition-colors">Text Tools</Link>
        </p>
      </ToolLayout>
    </>
  );
}
