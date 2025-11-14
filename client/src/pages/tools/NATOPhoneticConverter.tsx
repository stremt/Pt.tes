import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Radio, Copy, RotateCcw, Zap } from "lucide-react";

const NATO_ALPHABET: Record<string, string> = {
  'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
  'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
  'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
  'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
  'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
  'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
  '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
};

export default function NATOPhoneticConverter() {
  const [input, setInput] = useState("");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "NATO Phonetic Alphabet Converter | Text to Alpha-Bravo | Pixocraft Tools",
    description: "Convert any text into NATO phonetic alphabet words like Alpha, Bravo & Charlie.",
    keywords: "nato converter, alpha bravo converter, phonetic alphabet tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/nato-phonetic-converter",
  });

  const convertToNATO = (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => NATO_ALPHABET[char] || char)
      .join(' ');
  };

  const output = convertToNATO(input);

  return (
    <ToolLayout
      title="NATO Phonetic Converter"
      description="Enter text → get phonetic alphabet instantly."
      icon={<Radio className="h-10 w-10 text-primary" />}
      toolId="nato-phonetic-converter"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type any text, letters, or numbers." },
        { step: 2, title: "Auto Convert", description: "Instantly converts to NATO phonetic alphabet." },
        { step: 3, title: "Copy Result", description: "Copy the phonetic representation." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Conversion", description: "Real-time phonetic alphabet conversion." },
        { icon: <Radio className="h-6 w-6 text-primary" />, title: "Military Standard", description: "Uses official NATO phonetic alphabet." },
      ]}
      faqs={[
        { question: "Supports lowercase?", answer: "Yes, the tool automatically handles both uppercase and lowercase letters." },
        { question: "What is NATO phonetic alphabet?", answer: "It's a standardized phonetic alphabet used by military, aviation, and emergency services for clear communication." },
        { question: "Can I use this for spelling?", answer: "Yes, perfect for spelling out names, codes, or any text over phone or radio." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Input Text</span>
              {input && (
                <Button variant="ghost" size="sm" onClick={() => setInput("")} data-testid="button-clear">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Enter text to convert..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>NATO Phonetic Output</span>
              {output && (
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(output, "Copied!")} data-testid="button-copy">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg min-h-[100px] text-base">
              {output || <span className="text-muted-foreground italic">NATO phonetic will appear here...</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
