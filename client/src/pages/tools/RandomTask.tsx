import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CheckSquare, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tasks } from "@/lib/random-data";

export default function RandomTask() {
  const [task, setTask] = useState<string | null>(null);

  useSEO({
    title: "Random Task Generator | Offline Challenge Ideas | Pixocraft Tools",
    description: "Generate challenge tasks (study, fitness, fun). Perfect for breaking monotony and building healthy habits.",
    keywords: "task generator, challenge idea, random task generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-task",
  });

  const generateTask = () => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    setTask(tasks[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get random task instantly" },
    { step: 2, title: "Read Task", description: "See what to do" },
    { step: 3, title: "Complete It", description: "Take action now" },
  ];

  const benefits = [
    { icon: <CheckSquare className="h-5 w-5" />, title: "Productivity", description: "Quick action items" },
    { icon: <CheckSquare className="h-5 w-5" />, title: "Variety", description: "Study, fitness & fun tasks" },
    { icon: <CheckSquare className="h-5 w-5" />, title: "Motivation", description: "Break procrastination" },
    { icon: <CheckSquare className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "What kind of tasks are included?",
      answer: "Tasks range from productivity (organizing, learning) to fitness (exercises) to self-care (meditation, gratitude). Perfect for breaking monotony and building habits."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Task Generator"
        description="Click → get task"
        icon={<CheckSquare className="h-8 w-8" />}
        toolId="random-task"
        category="random"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-6 px-4 pt-4">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "Random Tools", url: "/tools/random" },
              { label: "Random Task" },
            ]}
          />
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateTask}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Random Task
          </Button>

          {task && (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold" data-testid="text-task">{task}</h3>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
