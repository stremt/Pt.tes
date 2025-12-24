import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Triangle } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TriangleAreaCalculator() {
  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [area, setArea] = useState<number | null>(null);

  useSEO({
    title: "Triangle Area Calculator | Base Height & Heron Formula | Pixocraft Tools",
    description: "Calculate triangle area using base-height or Heron formula. Free geometry calculator for students and professionals.",
    keywords: "triangle area calculator, heron formula, geometry calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/triangle-area-calculator",
  });

  const calculateBaseHeight = () => {
    const b = parseFloat(base);
    const h = parseFloat(height);

    if (isNaN(b) || isNaN(h)) {
      return;
    }

    setArea((b * h) / 2);
  };

  const calculateHeron = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      return;
    }

    const s = (a + b + c) / 2;
    const areaValue = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    setArea(areaValue);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is Heron's formula?",
      answer: "Heron's formula calculates the area of a triangle when you know all three sides. Formula: Area = √[s(s-a)(s-b)(s-c)], where s is the semi-perimeter (a+b+c)/2."
    },
    {
      question: "Which method should I use?",
      answer: "Use base-height if you know the base and perpendicular height. Use Heron's formula if you know all three sides but not the height."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            {" / "}
            <Link href="/tools/math" className="hover:text-foreground">Math Tools</Link>
            {" / "}
            <span className="text-foreground">Triangle Area Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Triangle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Triangle Area Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter sides → calculate area
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Two Methods</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Triangle Area</CardTitle>
                <CardDescription>
                  Choose a method to calculate the area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="base-height" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="base-height">Base & Height</TabsTrigger>
                    <TabsTrigger value="heron">Heron's Formula</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="base-height" className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Base</Label>
                        <Input
                          type="number"
                          value={base}
                          onChange={(e) => setBase(e.target.value)}
                          placeholder="e.g., 10"
                          data-testid="input-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Height</Label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="e.g., 5"
                          data-testid="input-height"
                        />
                      </div>
                    </div>
                    <Button onClick={calculateBaseHeight} className="w-full" data-testid="button-calculate-base">
                      Calculate Area
                    </Button>
                  </TabsContent>

                  <TabsContent value="heron" className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Side A</Label>
                        <Input
                          type="number"
                          value={sideA}
                          onChange={(e) => setSideA(e.target.value)}
                          placeholder="e.g., 3"
                          data-testid="input-side-a"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Side B</Label>
                        <Input
                          type="number"
                          value={sideB}
                          onChange={(e) => setSideB(e.target.value)}
                          placeholder="e.g., 4"
                          data-testid="input-side-b"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Side C</Label>
                        <Input
                          type="number"
                          value={sideC}
                          onChange={(e) => setSideC(e.target.value)}
                          placeholder="e.g., 5"
                          data-testid="input-side-c"
                        />
                      </div>
                    </div>
                    <Button onClick={calculateHeron} className="w-full" data-testid="button-calculate-heron">
                      Calculate Area
                    </Button>
                  </TabsContent>
                </Tabs>

                {area !== null && (
                  <Card className="bg-primary/10 mt-6">
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Area</p>
                      <p className="text-5xl font-bold" data-testid="text-area">
                        {area.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">square units</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
