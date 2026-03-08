import { useState, useEffect, useRef } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Box, RefreshCw, Copy, Download, Sparkles, Zap, Palette, Gift } from "lucide-react";
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

// Fisher-Yates shuffle algorithm
function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface GeneratorState {
  [key: string]: {
    shuffled: string[];
    index: number;
  };
}

export default function RandomObjectGenerator() {
  const { toast } = useToast();
  const [category, setCategory] = useState<string>("All Objects");
  const [numberOfObjects, setNumberOfObjects] = useState<number>(1);
  const [generatedObjects, setGeneratedObjects] = useState<string[]>([]);
  const [creativeMode, setCreativeMode] = useState(false);
  const [drawingPrompt, setDrawingPrompt] = useState<string>("");
  const generatorStateRef = useRef<GeneratorState>({});
  const recentlyGeneratedRef = useRef<Set<string>>(new Set());

  // Initialize generator state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rogg-generator-state");
      if (saved) {
        generatorStateRef.current = JSON.parse(saved);
      }
      const recentSaved = localStorage.getItem("rogg-recent-objects");
      if (recentSaved) {
        recentlyGeneratedRef.current = new Set(JSON.parse(recentSaved));
      }
    } catch (e) {
      // If parsing fails, start fresh
      generatorStateRef.current = {};
      recentlyGeneratedRef.current = new Set();
    }
  }, []);

  // Save generator state to localStorage whenever it changes
  const saveState = () => {
    try {
      localStorage.setItem("rogg-generator-state", JSON.stringify(generatorStateRef.current));
      localStorage.setItem("rogg-recent-objects", JSON.stringify(Array.from(recentlyGeneratedRef.current)));
    } catch (e) {
      // Silently fail if localStorage is unavailable
    }
  };

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

  const initializeCategory = (categoryName: string) => {
    const pool = categoryName === "All Objects" 
      ? Object.values(objectCategories).flat() 
      : objectCategories[categoryName as keyof typeof objectCategories] || [];
    
    if (pool.length === 0) return;

    const state = generatorStateRef.current;
    if (!state[categoryName]) {
      state[categoryName] = {
        shuffled: fisherYatesShuffle(pool),
        index: 0
      };
      saveState();
    }
  };

  const getNextObject = (categoryName: string): string => {
    const pool = categoryName === "All Objects" 
      ? Object.values(objectCategories).flat() 
      : objectCategories[categoryName as keyof typeof objectCategories] || [];
    
    if (pool.length === 0) return "";

    const state = generatorStateRef.current;
    if (!state[categoryName]) {
      state[categoryName] = {
        shuffled: fisherYatesShuffle(pool),
        index: 0
      };
    }

    const catState = state[categoryName];
    if (catState.index >= catState.shuffled.length) {
      catState.shuffled = fisherYatesShuffle(pool);
      catState.index = 0;
    }

    const object = catState.shuffled[catState.index];
    catState.index++;
    saveState();
    return object;
  };

  const generateRandomObjects = () => {
    const pool = getObjectsForCategory();
    if (pool.length === 0) return;

    if (creativeMode) {
      const generated = Array.from({ length: numberOfObjects }, () => {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const object = getNextObject(category);
        return `${adjective} ${action} ${object}`;
      });
      setGeneratedObjects(generated);
      recentlyGeneratedRef.current = new Set([...recentlyGeneratedRef.current, ...generated]);
      if (recentlyGeneratedRef.current.size > 100) {
        const arr = Array.from(recentlyGeneratedRef.current);
        recentlyGeneratedRef.current = new Set(arr.slice(-100));
      }
      saveState();
    } else {
      const generated = Array.from({ length: numberOfObjects }, () => getNextObject(category));
      setGeneratedObjects(generated);
      recentlyGeneratedRef.current = new Set([...recentlyGeneratedRef.current, ...generated]);
      if (recentlyGeneratedRef.current.size > 100) {
        const arr = Array.from(recentlyGeneratedRef.current);
        recentlyGeneratedRef.current = new Set(arr.slice(-100));
      }
      saveState();
    }
  };

  const generateDrawingPrompt = () => {
    const pool = getObjectsForCategory();
    if (pool.length === 0) return;

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const object = getNextObject(category);
    setDrawingPrompt(`Draw a ${adjective.toLowerCase()} ${object.toLowerCase()}`);
    recentlyGeneratedRef.current.add(object);
    if (recentlyGeneratedRef.current.size > 100) {
      const arr = Array.from(recentlyGeneratedRef.current);
      recentlyGeneratedRef.current = new Set(arr.slice(-100));
    }
    saveState();
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
    { icon: <Sparkles className="h-5 w-5" />, title: "2500+ Objects", description: "Comprehensive dataset across 10+ categories" },
    { icon: <Palette className="h-5 w-5" />, title: "Creative Mode", description: "Generate imaginative combinations with adjectives and actions" },
    { icon: <Zap className="h-5 w-5" />, title: "Drawing Prompts", description: "Perfect for artists needing inspiration" },
    { icon: <Gift className="h-5 w-5" />, title: "Download Options", description: "Export as TXT or CSV format instantly" },
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
        description="Instantly generate random objects from 2500+ items. Perfect for creativity, games, and brainstorming."
        icon={<Sparkles className="h-8 w-8" />}
        toolId="random-object-generator"
        category="random"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 px-4 pt-4">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "Random Tools", url: "/tools/random" },
              { label: "Random Object Generator" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <div className="mb-6 sm:mb-8 px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-950 p-5 sm:p-8 md:p-12 border border-slate-200 dark:border-slate-800">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 text-slate-600 dark:text-slate-400" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">SMART GENERATOR</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight">
                  Never Get Repeats Again
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 mb-4 sm:mb-6 max-w-2xl leading-relaxed">
                  Generate unique random objects from 2500+ items with our intelligent shuffle algorithm. No repeats until you've seen everything.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-300 dark:border-slate-700">
                    <Zap className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Instant Results</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-300 dark:border-slate-700">
                    <Gift className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">100% Free</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-white dark:bg-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-300 dark:border-slate-700">
                    <Palette className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">Creative Mode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto px-3 sm:px-4">
          {/* Controls - Enhanced Design */}
          <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg">
            <CardHeader className="bg-slate-50 dark:bg-slate-900 rounded-t-lg border-b-2 border-slate-200 dark:border-slate-800 py-3 sm:py-4">
              <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
                <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 dark:text-slate-400" />
                Generator Settings
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Configure your random object generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 sm:pt-6">
              {/* Category Selector */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Choose Category
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category" data-testid="select-category" className="border-2 border-slate-300 dark:border-slate-700 h-10 sm:h-11 text-sm">
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
                <label htmlFor="count" className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  How Many Objects?
                </label>
                <Select value={numberOfObjects.toString()} onValueChange={val => setNumberOfObjects(parseInt(val))}>
                  <SelectTrigger id="count" data-testid="select-count" className="border-2 border-slate-300 dark:border-slate-700 h-10 sm:h-11 text-sm">
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
              <div className="flex items-start sm:items-center space-x-3 pt-2 sm:pt-3 p-3 sm:p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700">
                <input
                  type="checkbox"
                  id="creative"
                  checked={creativeMode}
                  onChange={e => setCreativeMode(e.target.checked)}
                  className="rounded w-5 h-5 cursor-pointer accent-slate-600 mt-1 sm:mt-0 flex-shrink-0"
                  data-testid="toggle-creative-mode"
                  aria-label="Enable Creative Mode"
                />
                <label htmlFor="creative" className="text-xs sm:text-sm font-semibold cursor-pointer flex-1">
                  <span className="text-slate-700 dark:text-slate-300">Creative Mode</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-normal mt-0.5">Adjective + Action + Object</p>
                </label>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateRandomObjects}
                size="lg"
                className="w-full mt-4 sm:mt-6 h-11 sm:h-12 text-sm sm:text-base font-semibold bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 shadow-lg"
                data-testid="button-generate"
              >
                <Sparkles className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Generate
              </Button>
            </CardContent>
          </Card>

          {/* Results Display - Enhanced */}
          {generatedObjects.length > 0 && (
            <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg">
              <CardHeader className="bg-slate-50 dark:bg-slate-900 rounded-t-lg border-b-2 border-slate-200 dark:border-slate-800 py-3 sm:py-4">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <Gift className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 dark:text-slate-400" />
                  Your Generated Objects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 sm:pt-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 rounded-xl space-y-2 sm:space-y-3 border border-slate-300 dark:border-slate-700" data-testid="container-results">
                  {generatedObjects.map((obj, idx) => (
                    <div key={idx} className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-start gap-2 sm:gap-3" data-testid={`text-result-${idx}`}>
                      <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-700 dark:bg-slate-600 text-white flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5 sm:mt-0">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{obj}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                    data-testid="button-copy"
                    aria-label="Copy results to clipboard"
                    className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm h-9 sm:h-10"
                  >
                    <Copy className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-slate-600 dark:text-slate-400" />
                    <span className="hidden sm:inline">Copy</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadTxt}
                    data-testid="button-download-txt"
                    aria-label="Download as text file"
                    className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm h-9 sm:h-10"
                  >
                    <Download className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-slate-600 dark:text-slate-400" />
                    <span className="hidden sm:inline">TXT</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadCsv}
                    data-testid="button-download-csv"
                    aria-label="Download as CSV file"
                    className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm h-9 sm:h-10"
                  >
                    <Download className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-slate-600 dark:text-slate-400" />
                    <span className="hidden sm:inline">CSV</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateRandomObjects}
                    data-testid="button-generate-again"
                    aria-label="Generate another set of objects"
                    className="border-2 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm h-9 sm:h-10"
                  >
                    <RefreshCw className="h-3.5 sm:h-4 w-3.5 sm:w-4 mr-1 text-slate-600 dark:text-slate-400" />
                    <span className="hidden sm:inline">Again</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Drawing Prompt Generator */}
          <Card className="border-2 border-slate-200 dark:border-slate-800 shadow-lg">
            <CardHeader className="bg-slate-50 dark:bg-slate-900 rounded-t-lg border-b-2 border-slate-200 dark:border-slate-800 py-3 sm:py-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Palette className="h-4 sm:h-5 w-4 sm:w-5 text-slate-600 dark:text-slate-400" />
                Random Drawing Prompt
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Get inspired with random drawing prompts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 sm:pt-6">
              <Button
                onClick={generateDrawingPrompt}
                size="lg"
                className="w-full bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white font-semibold h-11 sm:h-12 text-sm sm:text-base"
                data-testid="button-generate-prompt"
              >
                <Sparkles className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                Generate Drawing Prompt
              </Button>
              {drawingPrompt && (
                <div className="bg-slate-100 dark:bg-slate-800 p-4 sm:p-6 rounded-xl text-center border border-slate-300 dark:border-slate-700">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 break-words" data-testid="text-drawing-prompt">
                    {drawingPrompt}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Example Objects Section */}
        <section className="py-8 sm:py-12 md:py-16 border-t px-3 sm:px-4">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-slate-900 dark:text-white">
              Explore Our 2500+ Objects
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 mb-6 sm:mb-8 md:mb-10">
              Browse sample objects from our comprehensive dataset. Generate unlimited unique combinations.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
              {exampleObjects.map((obj, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg p-2.5 sm:p-4 text-center hover-elevate cursor-default transition-all"
                  data-testid={`card-example-${idx}`}
                >
                  <p className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100 line-clamp-2">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-8 sm:py-12 md:py-16 border-t bg-slate-50 dark:bg-slate-900 px-3 sm:px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">What is a Random Object Generator?</h2>
            <div className="space-y-4 sm:space-y-6 prose dark:prose-invert max-w-none">
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                A random object generator is a tool that randomly selects objects from a predefined dataset. Our generator features over 2500 unique objects organized across 10+ different categories: Everyday Objects, Household Items, School Objects, Office Items, Technology Objects, Kitchen Items, Nature Objects, and more.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-slate-900 dark:text-white">How a Random Object Generator Works</h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Our random object generator uses advanced Fisher-Yates shuffle algorithms to select items from a curated dataset. When you click generate, the tool intelligently picks objects from your selected category without repeats until you've seen everything. In Creative Mode, it combines random adjectives and actions with the selected objects to create imaginative combinations. All processing happens in your browser—no data is sent to servers, ensuring instant results and complete privacy.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-slate-900 dark:text-white">Why Use a Random Object Generator?</h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Random object generators are incredibly versatile tools used for:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Creative Writing:</strong> Generate plot elements and character props for stories</li>
                <li><strong className="text-slate-900 dark:text-white">Game Design:</strong> Create randomized loot, inventory items, and game mechanics</li>
                <li><strong className="text-slate-900 dark:text-white">Brainstorming:</strong> Combine random objects to spark innovative ideas</li>
                <li><strong className="text-slate-900 dark:text-white">Drawing Practice:</strong> Get random subjects to sketch and improve your art skills</li>
                <li><strong className="text-slate-900 dark:text-white">Classroom Activities:</strong> Engage students with creative exercises and word association games</li>
                <li><strong className="text-slate-900 dark:text-white">Writing Prompts:</strong> Generate unique scenarios for creative fiction and storytelling</li>
              </ul>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-slate-900 dark:text-white">Creative Ways to Use Random Objects</h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Here are some innovative ways to use our random object generator:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300">
                <li><strong className="text-slate-900 dark:text-white">Story Prompts:</strong> Use generated objects as plot devices or settings for your next story</li>
                <li><strong className="text-slate-900 dark:text-white">Drawing Challenges:</strong> Take our drawing prompts and create artwork based on the suggestions</li>
                <li><strong className="text-slate-900 dark:text-white">Game Loot Generation:</strong> Create randomized items and rewards for video games or tabletop RPGs</li>
                <li><strong className="text-slate-900 dark:text-white">Scavenger Hunts:</strong> Generate object lists for indoor or outdoor scavenger hunt games</li>
                <li><strong className="text-slate-900 dark:text-white">Icebreaker Games:</strong> Use random objects as topics for conversation starters</li>
                <li><strong className="text-slate-900 dark:text-white">Product Ideation:</strong> Combine random objects to conceptualize new product ideas</li>
                <li><strong className="text-slate-900 dark:text-white">Art Inspiration:</strong> Generate unexpected object combinations for surreal artwork</li>
              </ul>
            </div>
          </div>
        </section>
      </ToolLayout>
    </>
  );
}
