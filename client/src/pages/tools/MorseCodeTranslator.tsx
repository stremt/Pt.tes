import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Radio, Copy, RotateCcw, ArrowRightLeft, Volume2 } from "lucide-react";

const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

const MORSE_TO_TEXT_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_CODE_MAP).map(([k, v]) => [v, k])
);

export default function MorseCodeTranslator() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Morse Code Translator | Text ↔ Morse Converter | Pixocraft Tools",
    description: "Convert any text to Morse code and decode Morse instantly. Offline and secure.",
    keywords: "morse code translator, text to morse, morse decoder",
    canonicalUrl: "https://tools.pixocraft.in/tools/morse-code-translator",
  });

  const textToMorse = (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => MORSE_CODE_MAP[char] || char)
      .join(' ');
  };

  const morseToText = (morse: string): string => {
    return morse
      .split(' ')
      .map(code => MORSE_TO_TEXT_MAP[code] || code)
      .join('');
  };

  const output = mode === "encode" ? textToMorse(input) : morseToText(input);

  const playMorse = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const dotDuration = 60;
    let currentTime = audioContext.currentTime;

    output.split('').forEach(char => {
      if (char === '.') {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = 800;
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dotDuration / 1000);
        currentTime += dotDuration / 1000 + 0.05;
      } else if (char === '-') {
        const oscillator = audioContext.createOscillator();
        oscillator.frequency.value = 800;
        oscillator.connect(audioContext.destination);
        oscillator.start(currentTime);
        oscillator.stop(currentTime + (dotDuration * 3) / 1000);
        currentTime += (dotDuration * 3) / 1000 + 0.05;
      } else if (char === ' ') {
        currentTime += 0.1;
      }
    });
  };

  return (
    <ToolLayout
      title="Morse Code Translator"
      description="Write text → convert to Morse code instantly with optional beeps."
      icon={<Radio className="h-10 w-10 text-primary" />}
      toolId="morse-code-translator"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Choose Mode", description: "Select encode (text to Morse) or decode (Morse to text)." },
        { step: 2, title: "Enter Input", description: "Type your text or Morse code." },
        { step: 3, title: "Get Result", description: "Instantly see the converted output." },
      ]}
      benefits={[
        { icon: <ArrowRightLeft className="h-6 w-6 text-primary" />, title: "Bidirectional", description: "Convert text to Morse and vice versa." },
        { icon: <Volume2 className="h-6 w-6 text-primary" />, title: "Audio Support", description: "Listen to Morse code beeps." },
        { icon: <Radio className="h-6 w-6 text-primary" />, title: "Offline Tool", description: "Works completely in your browser." },
      ]}
      faqs={[
        { question: "Does it support beep sound?", answer: "Yes, click the play button to hear the Morse code audio." },
        { question: "Can I decode Morse to text?", answer: "Yes, switch to decode mode to convert Morse code back to text." },
        { question: "What symbols are supported?", answer: "Letters A-Z, numbers 0-9, and spaces are fully supported." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Tabs value={mode} onValueChange={(v) => setMode(v as "encode" | "decode")}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="encode" data-testid="tab-encode">Text to Morse</TabsTrigger>
            <TabsTrigger value="decode" data-testid="tab-decode">Morse to Text</TabsTrigger>
          </TabsList>

          <TabsContent value="encode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Enter Text</span>
                  {input && (
                    <Button variant="ghost" size="sm" onClick={() => setInput("")} data-testid="button-clear">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Type your text here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[120px]"
                  data-testid="input-text"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decode" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Enter Morse Code</span>
                  {input && (
                    <Button variant="ghost" size="sm" onClick={() => setInput("")} data-testid="button-clear">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="... --- ..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[120px] font-mono"
                  data-testid="input-morse"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Output</span>
              <div className="flex gap-2">
                {mode === "encode" && output && (
                  <Button variant="outline" size="sm" onClick={playMorse} data-testid="button-play">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Play
                  </Button>
                )}
                {output && (
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(output, "Copied!")} data-testid="button-copy">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-muted/50 rounded-lg min-h-[120px] font-mono text-base break-all">
              {output || <span className="text-muted-foreground italic">Output will appear here...</span>}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
