import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Grid3x3, Copy } from "lucide-react";

export default function CSSGridGenerator() {
  const [columns, setColumns] = useState([3]);
  const [rows, setRows] = useState([2]);
  const [gap, setGap] = useState([16]);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "CSS Grid Generator | Create Grid Layouts | Pixocraft Tools",
    description: "Create CSS grid layouts visually and copy clean CSS code.",
    keywords: "css grid generator, grid maker tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/css-grid-generator",
  });

  const cssCode = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns[0]}, 1fr);
  grid-template-rows: repeat(${rows[0]}, auto);
  gap: ${gap[0]}px;
}`;

  const totalItems = columns[0] * rows[0];

  return (
    <ToolLayout
      title="CSS Grid Generator"
      description="Design grid layouts visually and copy CSS."
      icon={<Grid3x3 className="h-10 w-10 text-primary" />}
      toolId="css-grid-generator"
      category="CSS & Design"
      howItWorks={[
        { step: 1, title: "Set Dimensions", description: "Choose columns, rows, and gap size." },
        { step: 2, title: "Preview Grid", description: "See the grid layout in real-time." },
        { step: 3, title: "Copy CSS", description: "Use the generated grid CSS." },
      ]}
      benefits={[
        { icon: <Grid3x3 className="h-6 w-6 text-primary" />, title: "Visual Builder", description: "Create grids without memorizing syntax." },
      ]}
      faqs={[
        { question: "What is CSS Grid?", answer: "CSS Grid is a powerful layout system for creating two-dimensional layouts with rows and columns." },
        { question: "Can I make responsive grids?", answer: "Yes! Use media queries with the generated CSS to make grids responsive." },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Grid Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Columns: {columns[0]}</Label>
              <Slider
                value={columns}
                onValueChange={setColumns}
                min={1}
                max={6}
                step={1}
                className="mt-2"
                data-testid="slider-columns"
              />
            </div>
            <div>
              <Label>Rows: {rows[0]}</Label>
              <Slider
                value={rows}
                onValueChange={setRows}
                min={1}
                max={6}
                step={1}
                className="mt-2"
                data-testid="slider-rows"
              />
            </div>
            <div>
              <Label>Gap: {gap[0]}px</Label>
              <Slider
                value={gap}
                onValueChange={setGap}
                min={0}
                max={48}
                step={4}
                className="mt-2"
                data-testid="slider-gap"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grid Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns[0]}, 1fr)`,
                gridTemplateRows: `repeat(${rows[0]}, auto)`,
                gap: `${gap[0]}px`,
              }}
              data-testid="grid-preview"
            >
              {Array.from({ length: totalItems }, (_, i) => (
                <div
                  key={i}
                  className="bg-primary/20 border-2 border-primary rounded p-4 flex items-center justify-center font-mono min-h-[80px]"
                >
                  {i + 1}
                </div>
              ))}
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
    </ToolLayout>
  );
}
