import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Box, RefreshCw, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { objectCategories, adjectives, actions } from "@/lib/random-data";
import { useToast } from "@/hooks/use-toast";

const exampleObjects = [
  "Pencil", "Chair", "Lamp", "Camera", "Backpack", "Keyboard", "Bottle",
  "Plant", "Spoon", "Notebook", "Phone Charger", "Headphones", "Watch",
  "Desk", "Mirror", "Cup", "Book", "Pen", "Mouse", "Folder", "Glasses",
  "Wallet", "Bag", "Hat", "Blanket", "Picture Frame", "Clock", "Door",
  "Window", "Table", "Pillow", "Candle", "Vase", "Compass", "Calendar",
  "Ruler", "Scissors", "Tape", "Glue", "Marker", "Eraser", "Stapler",
  "Monitor", "Smartwatch", "USB Drive", "Charger", "Cable", "Router", "Speaker",
  "Bicycle", "Skateboard", "Tent", "Fishing rod", "Kite", "Helmet",
  "Smartphone", "Tablet", "Drone", "VR Headset", "Gaming Controller", "Projector",
  "Tie", "Boots", "Jacket", "Sweater", "Jeans", "Scarf",
  "Car", "Airplane", "Train", "Bus", "Truck", "Motorcycle",
  "Dog", "Cat", "Lion", "Elephant", "Giraffe", "Penguin"
];

export default function RandomObjectGenerator() {
  const { toast } = useToast();
  const [category, setCategory] = useState<string>("All Objects");
  const [numberOfObjects, setNumberOfObjects] = useState<number>(1);
  const [generatedObjects, setGeneratedObjects] = useState<string[]>([]);
  const [creativeMode, setCreativeMode] = useState(false);
  const [drawingPrompt, setDrawingPrompt] = useState<string>("");

  useSEO({
    title: "Random Object Generator – Generate Random Items Instantly | Pixocraft Tools",
    description: "Generate random objects instantly with our free Random Object Generator. Create random items for creativity, games, brainstorming, or drawing prompts.",
    keywords: "random object generator, random item generator, random things generator, generate random objects, random object picker",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-object-generator",
  });

  const getObjectsForCategory = () => {
    if (category === "All Objects") {
      return Object.values(objectCategories).flat();
    }
    return objectCategories[category as keyof typeof objectCategories] || [];
  };

  const generateRandomObjects = () => {
    const pool = getObjectsForCategory();
    if (pool.length === 0) return;

    if (creativeMode) {
      const generated = Array.from({ length: numberOfObjects }, () => {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const object = pool[Math.floor(Math.random() * pool.length)];
        return `${adjective} ${action} ${object}`;
      });
      setGeneratedObjects(generated);
    } else {
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(numberOfObjects, pool.length));
      setGeneratedObjects(selected);
    }
  };

  const generateDrawingPrompt = () => {
    const pool = getObjectsForCategory();
    if (pool.length === 0) return;

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const object = pool[Math.floor(Math.random() * pool.length)];
    setDrawingPrompt(`Draw a ${adjective.toLowerCase()} ${object.toLowerCase()}`);
  };

  const copyToClipboard = async () => {
    const text = generatedObjects.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Objects copied to clipboard",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadTxt = () => {
    const text = generatedObjects.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-objects.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCsv = () => {
    const csv = generatedObjects.map((obj, idx) => `${idx + 1},${obj}`).join("\n");
    const header = "Number,Object\n";
    const blob = new Blob([header + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-objects.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const howItWorks = [
    { step: 1, title: "Select Category", description: "Choose from different object categories or all objects" },
    { step: 2, title: "Choose Count", description: "Pick how many random objects you want to generate" },
    { step: 3, title: "Generate", description: "Click generate to get your random objects instantly" },
  ];

  const benefits = [
    { icon: <Box className="h-5 w-5" />, title: "1000+ Objects", description: "Comprehensive dataset across 7 categories" },
    { icon: <Box className="h-5 w-5" />, title: "Creative Mode", description: "Generate imaginative combinations with adjectives and actions" },
    { icon: <Box className="h-5 w-5" />, title: "Drawing Prompts", description: "Perfect for artists needing inspiration" },
    { icon: <Box className="h-5 w-5" />, title: "Download Options", description: "Export as TXT or CSV format instantly" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "What is a random object generator?",
      answer: "A random object generator randomly selects objects from a dataset. It's perfect for creative writing prompts, drawing challenges, game design, brainstorming sessions, and educational activities."
    },
    {
      question: "How many objects can I generate at once?",
      answer: "You can generate 1, 5, 10, 20, or 50 objects at a time. The generator ensures all selected objects are unique within each generation."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes! Our Random Object Generator is completely free. No registration, no ads, and no hidden costs."
    },
    {
      question: "Does the generator work offline?",
      answer: "Yes! Once the page loads, the entire generator works offline. No internet connection required after the initial page load."
    },
    {
      question: "Can I copy or download the generated objects?",
      answer: "Absolutely! You can copy objects to clipboard, download as a plain text file, or export as CSV with numbered rows."
    },
    {
      question: "What is Creative Mode?",
      answer: "Creative Mode generates imaginative combinations by pairing random adjectives and actions with objects. For example: 'Flying umbrella' or 'Glowing backpack'. Perfect for creative exercises!"
    },
    {
      question: "How does the Random Drawing Prompt Generator work?",
      answer: "It creates drawing prompts by combining adjectives with random objects. Great for artists looking for inspiration or overcoming creative block."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  // Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Random Object Generator",
    "description": "Free online random object generator for creativity, games, brainstorming, and drawing prompts.",
    "url": "https://tools.pixocraft.in/tools/random-object-generator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareSchema} />
      <ToolLayout
        title="Random Object Generator"
        description="Instantly generate random objects from 1000+ items. Perfect for creativity, games, and brainstorming."
        icon={<Box className="h-8 w-8" />}
        toolId="random-object-generator"
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
              { label: "Random Object Generator" },
            ]}
          />
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Generator Settings</CardTitle>
              <CardDescription>Configure your random object generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category Selector */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Objects">All Objects</SelectItem>
                    {Object.keys(objectCategories).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Number Selector */}
              <div className="space-y-2">
                <label htmlFor="count" className="text-sm font-medium">Number of Objects</label>
                <Select value={numberOfObjects.toString()} onValueChange={val => setNumberOfObjects(parseInt(val))}>
                  <SelectTrigger id="count" data-testid="select-count">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 object</SelectItem>
                    <SelectItem value="5">5 objects</SelectItem>
                    <SelectItem value="10">10 objects</SelectItem>
                    <SelectItem value="20">20 objects</SelectItem>
                    <SelectItem value="50">50 objects</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Creative Mode Toggle */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="creative"
                  checked={creativeMode}
                  onChange={e => setCreativeMode(e.target.checked)}
                  className="rounded"
                  data-testid="toggle-creative-mode"
                  aria-label="Enable Creative Mode"
                />
                <label htmlFor="creative" className="text-sm font-medium cursor-pointer">
                  Creative Mode (adjective + action + object)
                </label>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateRandomObjects}
                size="lg"
                className="w-full mt-4"
                data-testid="button-generate"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate Random Objects
              </Button>
            </CardContent>
          </Card>

          {/* Results Display */}
          {generatedObjects.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Objects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-6 rounded-lg space-y-2" data-testid="container-results">
                  {generatedObjects.map((obj, idx) => (
                    <div key={idx} className="text-lg font-medium" data-testid={`text-result-${idx}`}>
                      {idx + 1}. {obj}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    data-testid="button-copy"
                    aria-label="Copy results to clipboard"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadTxt}
                    data-testid="button-download-txt"
                    aria-label="Download as text file"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    TXT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadCsv}
                    data-testid="button-download-csv"
                    aria-label="Download as CSV file"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateRandomObjects}
                    data-testid="button-generate-again"
                    aria-label="Generate another set of objects"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Drawing Prompt Generator */}
          <Card>
            <CardHeader>
              <CardTitle>Random Drawing Prompt Generator</CardTitle>
              <CardDescription>Get inspired with random drawing prompts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={generateDrawingPrompt}
                variant="secondary"
                className="w-full"
                data-testid="button-generate-prompt"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate Drawing Prompt
              </Button>
              {drawingPrompt && (
                <div className="bg-primary/10 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary" data-testid="text-drawing-prompt">
                    {drawingPrompt}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Example Objects Section */}
        <section className="py-16 border-t">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Example Random Objects</h2>
            <p className="text-muted-foreground mb-8">
              Get inspired with some example objects from our dataset. Generate thousands more with our tool above.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {exampleObjects.map((obj, idx) => (
                <div
                  key={idx}
                  className="bg-card border rounded-lg p-4 text-center hover-elevate"
                  data-testid={`card-example-${idx}`}
                >
                  <p className="font-medium text-sm">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 border-t bg-muted/30">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">What is a Random Object Generator?</h2>
            <div className="space-y-6 prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                A random object generator is a tool that randomly selects objects from a predefined dataset. Our generator features over 1000 unique objects organized across 7 different categories: Everyday Objects, Household Items, School Objects, Office Items, Technology Objects, Kitchen Items, and Nature Objects.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">How a Random Object Generator Works</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our random object generator uses JavaScript algorithms to select items from a curated dataset. When you click generate, the tool uses a randomization function to pick objects from your selected category. In Creative Mode, it combines random adjectives and actions with the selected objects to create imaginative combinations. All processing happens in your browser—no data is sent to servers, ensuring instant results and complete privacy.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Why Use a Random Object Generator?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Random object generators are incredibly versatile tools used for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Creative Writing:</strong> Generate plot elements and character props for stories</li>
                <li><strong>Game Design:</strong> Create randomized loot, inventory items, and game mechanics</li>
                <li><strong>Brainstorming:</strong> Combine random objects to spark innovative ideas</li>
                <li><strong>Drawing Practice:</strong> Get random subjects to sketch and improve your art skills</li>
                <li><strong>Classroom Activities:</strong> Engage students with creative exercises and word association games</li>
                <li><strong>Writing Prompts:</strong> Generate unique scenarios for creative fiction and storytelling</li>
              </ul>

              <h3 className="text-2xl font-bold mt-8 mb-4">Creative Ways to Use Random Objects</h3>
              <p className="text-muted-foreground leading-relaxed">
                Here are some innovative ways to use our random object generator:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Story Prompts:</strong> Use generated objects as plot devices or settings for your next story</li>
                <li><strong>Drawing Challenges:</strong> Take our drawing prompts and create artwork based on the suggestions</li>
                <li><strong>Game Loot Generation:</strong> Create randomized items and rewards for video games or tabletop RPGs</li>
                <li><strong>Scavenger Hunts:</strong> Generate object lists for indoor or outdoor scavenger hunt games</li>
                <li><strong>Icebreaker Games:</strong> Use random objects as topics for conversation starters</li>
                <li><strong>Product Ideation:</strong> Combine random objects to conceptualize new product ideas</li>
                <li><strong>Art Inspiration:</strong> Generate unexpected object combinations for surreal artwork</li>
              </ul>
            </div>
          </div>
        </section>
      </ToolLayout>
    </>
  );
}
