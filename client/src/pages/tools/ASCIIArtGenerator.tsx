import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Type, Copy } from "lucide-react";

export default function ASCIIArtGenerator() {
  const [text, setText] = useState("HI");
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "ASCII Art Generator | Text to ASCII Art | Pixocraft Tools",
    description: "Convert text into retro ASCII art for banners & comments.",
    keywords: "ascii art generator, text banner tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/ascii-art-generator",
  });

  const ASCII_FONT: Record<string, string[]> = {
    'A': ['  A  ', ' A A ', 'AAAAA', 'A   A', 'A   A'],
    'B': ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
    'C': [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
    'D': ['DDDD ', 'D   D', 'D   D', 'D   D', 'DDDD '],
    'E': ['EEEEE', 'E    ', 'EEE  ', 'E    ', 'EEEEE'],
    'F': ['FFFFF', 'F    ', 'FFF  ', 'F    ', 'F    '],
    'G': [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
    'H': ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
    'I': ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
    'J': ['JJJJJ', '    J', '    J', 'J   J', ' JJJ '],
    'K': ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
    'L': ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
    'M': ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
    'N': ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
    'O': [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
    'P': ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
    'Q': [' QQQ ', 'Q   Q', 'Q   Q', 'Q  Q ', ' QQ Q'],
    'R': ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
    'S': [' SSS ', 'S    ', ' SSS ', '    S', 'SSSS '],
    'T': ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
    'U': ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
    'V': ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
    'W': ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
    'X': ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
    'Y': ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
    'Z': ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
    ' ': ['     ', '     ', '     ', '     ', '     '],
    '0': [' 000 ', '0   0', '0   0', '0   0', ' 000 '],
    '1': ['  1  ', ' 11  ', '  1  ', '  1  ', '11111'],
    '2': [' 222 ', '2   2', '   2 ', '  2  ', '22222'],
    '3': [' 333 ', '3   3', '  33 ', '3   3', ' 333 '],
    '4': ['4   4', '4   4', '44444', '    4', '    4'],
    '5': ['55555', '5    ', '5555 ', '    5', '5555 '],
    '6': [' 666 ', '6    ', '6666 ', '6   6', ' 666 '],
    '7': ['77777', '    7', '   7 ', '  7  ', ' 7   '],
    '8': [' 888 ', '8   8', ' 888 ', '8   8', ' 888 '],
    '9': [' 999 ', '9   9', ' 9999', '    9', ' 999 '],
  };

  const generateASCII = (input: string): string => {
    const chars = input.toUpperCase().split('');
    const lines = ['', '', '', '', ''];
    
    chars.forEach(char => {
      const charArt = ASCII_FONT[char] || ASCII_FONT[' '];
      charArt.forEach((line, i) => {
        lines[i] += line + '  ';
      });
    });
    
    return lines.join('\n');
  };

  const asciiArt = generateASCII(text);

  return (
    <ToolLayout
      title="ASCII Art Generator"
      description="Turn text into retro ASCII banners."
      icon={<Type className="h-10 w-10 text-primary" />}
      toolId="ascii-art-generator"
      category="Text & Writing"
      howItWorks={[
        { step: 1, title: "Enter Text", description: "Type a short word or phrase." },
        { step: 2, title: "Generate Art", description: "ASCII art is created instantly." },
        { step: 3, title: "Copy & Share", description: "Use in comments, READMEs, or anywhere!" },
      ]}
      benefits={[
        { icon: <Type className="h-6 w-6 text-primary" />, title: "Retro Style", description: "Perfect for banners and headers." },
      ]}
      faqs={[
        { question: "What characters are supported?", answer: "Letters A-Z, numbers 0-9, and spaces are supported." },
        { question: "Where can I use ASCII art?", answer: "Great for README files, code comments, terminal banners, and retro designs!" },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 10))}
              className="text-base"
              placeholder="Enter text (max 10 chars)..."
              maxLength={10}
              data-testid="input-text"
            />
            <p className="text-sm text-muted-foreground mt-2">Maximum 10 characters for best display</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>ASCII Art</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(asciiArt, "ASCII art copied!")}
                data-testid="button-copy"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="p-6 bg-muted/50 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre" data-testid="ascii-output">
              {asciiArt}
            </pre>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
