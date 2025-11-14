import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Code, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { techStacks } from "@/lib/random-data";

export default function RandomTechStack() {
  const [stack, setStack] = useState<typeof techStacks[0] | null>(null);

  useSEO({
    title: "Tech Stack Generator | Random Stack Selector | Pixocraft Tools",
    description: "Randomly generate tech stacks for fun or projects. Perfect for learning, brainstorming, and project planning.",
    keywords: "tech stack generator, random technology stack, web dev stack",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-tech-stack",
  });

  const generateStack = () => {
    const randomIndex = Math.floor(Math.random() * techStacks.length);
    setStack(techStacks[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get random tech stack" },
    { step: 2, title: "View Stack", description: "See technologies included" },
    { step: 3, title: "Start Building", description: "Use for your next project" },
  ];

  const benefits = [
    { icon: <Code className="h-5 w-5" />, title: "Popular Stacks", description: "Industry-standard combinations" },
    { icon: <Code className="h-5 w-5" />, title: "Learning", description: "Discover new technologies" },
    { icon: <Code className="h-5 w-5" />, title: "Decision Helper", description: "Choose stack for projects" },
    { icon: <Code className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "What tech stacks are included?",
      answer: "We include popular stacks like MERN, MEAN, LAMP, JAMstack, T3 Stack, and more. Each stack includes a curated set of technologies that work well together."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Tech Stack Generator"
        description="Click → get a random tech stack"
        icon={<Code className="h-8 w-8" />}
        toolId="random-tech-stack"
        category="generator"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Random Tech Stack</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateStack}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Random Stack
          </Button>

          {stack && (
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6" data-testid="text-stack">
                  <h3 className="text-4xl font-bold text-center">{stack.name}</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {stack.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-base px-4 py-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
