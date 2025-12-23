import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { Diff, RotateCcw, Zap, Lock, Eye, ArrowRight } from "lucide-react";
import { diffLines, diffWords, Change } from "diff";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function TextDiffer() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState<Change[]>([]);
  const [diffMode, setDiffMode] = useState<"lines" | "words">("lines");

  useSEO({
    title: "Text Compare Tool | Code Diff Checker Online",
    description: "Compare two texts or code blocks instantly and highlight differences. Offline and free.",
    keywords: "text compare, code diff tool, diff checker online",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-differ",
  });

  const handleCompare = () => {
    const result = diffMode === "lines" ? diffLines(text1, text2) : diffWords(text1, text2);
    setDiffResult(result);
  };

  const handleClear = () => {
    setText1("");
    setText2("");
    setDiffResult([]);
  };

  return (
    <>
      <ToolLayout
        title="Text Differ"
        description="Paste text/code in both boxes and instantly see differences highlighted. Perfect for developers, editors & students."
        icon={<Diff className="h-10 w-10 text-primary" />}
        toolId="text-differ"
        category="text"
        howItWorks={[
        { step: 1, title: "Paste Texts", description: "Enter original text in left box, modified text in right box." },
        { step: 2, title: "Choose Mode", description: "Select line-by-line or word-by-word comparison." },
        { step: 3, title: "Compare", description: "See highlighted additions, deletions, and unchanged parts." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Comparison", description: "Find differences in seconds." },
        { icon: <Eye className="h-6 w-6 text-primary" />, title: "Visual Highlighting", description: "Clear color-coded differences." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Private", description: "All processing happens offline." },
      ]}
      faqs={[
        { question: "What's the difference between line and word diff?", answer: "Line diff compares entire lines, while word diff compares individual words within lines for finer detail." },
        { question: "Can I compare code files?", answer: "Yes! This tool works great for comparing code, configuration files, or any text content." },
        { question: "What do the colors mean?", answer: "Green shows additions, red shows deletions, and gray shows unchanged content." },
      ]}
    >
      <div className="max-w-7xl mx-auto space-y-6 pb-16">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 items-center">
              <Button
                onClick={() => setDiffMode("lines")}
                variant={diffMode === "lines" ? "default" : "outline"}
                data-testid="button-mode-lines"
              >
                Line by Line
              </Button>
              <Button
                onClick={() => setDiffMode("words")}
                variant={diffMode === "words" ? "default" : "outline"}
                data-testid="button-mode-words"
              >
                Word by Word
              </Button>
              <Button onClick={handleCompare} disabled={!text1 || !text2} data-testid="button-compare">
                <Diff className="h-4 w-4 mr-2" />
                Compare
              </Button>
              <Button onClick={handleClear} variant="outline" disabled={!text1 && !text2} data-testid="button-clear">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Original Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your original text here..."
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="min-h-[400px] text-sm font-mono"
                data-testid="input-text1"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modified Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your modified text here..."
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="min-h-[400px] text-sm font-mono"
                data-testid="input-text2"
              />
            </CardContent>
          </Card>
        </div>

        {diffResult.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-lg overflow-auto min-h-[300px] text-sm font-mono" data-testid="output-diff">
                {diffResult.map((part, index) => (
                  <span
                    key={index}
                    data-testid={`diff-segment-${index}`}
                    className={
                      part.added
                        ? "bg-green-200 dark:bg-green-900"
                        : part.removed
                        ? "bg-red-200 dark:bg-red-900"
                        : "text-muted-foreground"
                    }
                  >
                    {part.value}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 dark:bg-green-900 rounded"></div>
                  <span>Added</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 dark:bg-red-900 rounded"></div>
                  <span>Removed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <span>Unchanged</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Breadcrumb and Category */}
      <div className="border-t bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Home", url: "/" },
                { label: "Tools", url: "/tools" },
                { label: "Text Tools", url: "/tools/text" },
                { label: "Text Differ" },
              ]}
            />
          </div>
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold">More Text Tools</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore other tools in the Text Tools category
            </p>
            <Link href="/tools/text">
              <Button variant="default" size="lg" data-testid="button-category-link">
                View All Text Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      </ToolLayout>
    </>
  );
}
