import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { generateMultipleUsernames, type UsernameStyle, type Separator } from "@/lib/random-utils";
import { User, RefreshCw, Copy, Zap, Lock, Sparkles, Globe, Hash, Minus, Circle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function UsernameGenerator() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [customWords, setCustomWords] = useState("");
  const [style, setStyle] = useState<UsernameStyle>("classic");
  const [separator, setSeparator] = useState<Separator>("none");
  const [maxLength, setMaxLength] = useState<number>(20);
  const [prioritizeCustomWords, setPrioritizeCustomWords] = useState(false);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Username Generator | Create Unique Usernames | Pixocraft Tools",
    description: "Generate creative and unique usernames instantly. Perfect for gaming, social media, and online accounts. Free username generator with customizable options.",
    keywords: "username generator, random username, gamer tag, username ideas, name generator, gaming names",
    canonicalUrl: "https://tools.pixocraft.in/tools/username-generator",
  });

  const handleGenerate = () => {
    const customWordArray = customWords
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);
    
    const newUsernames = generateMultipleUsernames(12, {
      includeNumbers,
      customWords: customWordArray,
      style,
      separator,
      maxLength,
      prioritizeCustomWords: customWordArray.length > 0 ? prioritizeCustomWords : false
    });
    
    setUsernames(newUsernames);
  };

  const styleDescriptions = {
    classic: "AdjectiveNoun123 - Clean and professional",
    modern: "Adjective_Noun_123 - With separators",
    prefix: "MrAdjectiveNoun - Add cool prefixes",
    suffix: "AdjectiveNounPro - Gaming style",
    minimal: "Word1234 - Simple and short",
    cool: "word123_noun - Lowercase vibe"
  };

  return (
    <ToolLayout
      title="Username Generator"
      description="Generate creative and unique usernames instantly. Perfect for gaming accounts, social media profiles, and online communities."
      icon={<User className="h-10 w-10 text-primary" />}
      toolId="username-generator"
      category="Fun & Utility"
      howItWorks={[
        { step: 1, title: "Add Custom Words", description: "Enter your own words to personalize usernames." },
        { step: 2, title: "Choose Style", description: "Pick from 6 different username formats and styles." },
        { step: 3, title: "Generate & Copy", description: "Get 12 unique usernames instantly and copy any you like." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Results", description: "Generate 12 unique usernames with a single click." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "6 Unique Styles", description: "Choose from Classic, Modern, Prefix, Suffix, Minimal, or Cool formats." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "No Data Stored", description: "All usernames generated locally in your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Custom Words", description: "Add your own words for truly personalized usernames." },
      ]}
      faqs={[
        { question: "How do custom words work?", answer: "Custom words you enter will be mixed into the username generation, appearing in place of our default adjectives and nouns. Enable 'Prioritize Custom Words' to use them more frequently." },
        { question: "What are the different styles?", answer: "Classic (SwiftDragon123), Modern (Swift_Dragon_123), Prefix (MrSwiftDragon), Suffix (SwiftDragonPro), Minimal (Dragon1234), and Cool (swift123_dragon). Each has a unique format!" },
        { question: "Can I control username length?", answer: "Yes! Use the max length slider to set how long usernames can be. Usernames longer than your limit will be automatically trimmed." },
        { question: "What separators are available?", answer: "You can choose None (SwiftDragon), Underscore (Swift_Dragon), Dash (Swift-Dragon), or Dot (Swift.Dragon) separators." },
        { question: "Can I use these usernames for any platform?", answer: "Yes! These usernames work great for gaming platforms, social media, forums, and any online service. However, availability depends on whether someone else has already taken the name." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Card */}
        <Card>
          <CardHeader>
            <CardTitle>Customize Your Username</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Custom Words Input */}
            <div className="space-y-2">
              <Label htmlFor="custom-words" className="text-base font-semibold">Custom Words</Label>
              <Input
                id="custom-words"
                placeholder="Enter words separated by commas (e.g., Cool, Epic, Super, Gaming)"
                value={customWords}
                onChange={(e) => setCustomWords(e.target.value)}
                data-testid="input-custom-words"
                className="text-base"
              />
              <p className="text-xs text-muted-foreground">
                💡 Your words will be used throughout the usernames!
              </p>
            </div>

            {/* Prioritize Custom Words */}
            {customWords.trim().length > 0 && (
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border">
                <div className="space-y-0.5">
                  <Label htmlFor="prioritize-custom" className="text-base">Prioritize Custom Words</Label>
                  <p className="text-sm text-muted-foreground">Use your words more frequently (3x more likely)</p>
                </div>
                <Switch
                  id="prioritize-custom"
                  checked={prioritizeCustomWords}
                  onCheckedChange={setPrioritizeCustomWords}
                  data-testid="switch-prioritize-custom"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Style Selector */}
              <div className="space-y-2">
                <Label htmlFor="style" className="text-base font-semibold">Username Style</Label>
                <Select value={style} onValueChange={(value) => setStyle(value as UsernameStyle)}>
                  <SelectTrigger id="style" data-testid="select-style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="prefix">Prefix</SelectItem>
                    <SelectItem value="suffix">Suffix</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="cool">Cool</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {styleDescriptions[style]}
                </p>
              </div>

              {/* Separator Selector */}
              <div className="space-y-2">
                <Label htmlFor="separator" className="text-base font-semibold">Separator</Label>
                <Select value={separator} onValueChange={(value) => setSeparator(value as Separator)}>
                  <SelectTrigger id="separator" data-testid="select-separator">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4" />
                        <span>None</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="underscore">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4" />
                        <span>Underscore (_)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dash">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4" />
                        <span>Dash (-)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dot">
                      <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4" />
                        <span>Dot (.)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Character between words
                </p>
              </div>
            </div>

            {/* Max Length Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Max Length</Label>
                <Badge variant="secondary">{maxLength} characters</Badge>
              </div>
              <Slider
                value={[maxLength]}
                onValueChange={(value) => setMaxLength(value[0])}
                min={8}
                max={30}
                step={1}
                data-testid="slider-max-length"
              />
              <p className="text-xs text-muted-foreground">
                Longer usernames = more words, Shorter = more concise
              </p>
            </div>

            {/* Include Numbers Toggle */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="include-numbers" className="text-base">Include Numbers</Label>
                <p className="text-sm text-muted-foreground">Add random numbers for uniqueness</p>
              </div>
              <Switch
                id="include-numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
                data-testid="switch-include-numbers"
              />
            </div>

            {/* Generate Button */}
            <Button onClick={handleGenerate} size="lg" className="w-full" data-testid="button-generate">
              <RefreshCw className="h-5 w-5 mr-2" />
              {usernames.length > 0 ? "Generate New Usernames" : "Generate Usernames"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Grid */}
        {usernames.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated Usernames</h3>
              <Badge variant="secondary">{usernames.length} ideas</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {usernames.map((username, index) => {
                const hasCustomWord = customWords.split(',')
                  .map(w => w.trim().toLowerCase())
                  .filter(w => w.length > 0)
                  .some(word => username.toLowerCase().includes(word));
                
                return (
                  <Card
                    key={`${username}-${index}`}
                    className="hover-elevate cursor-pointer transition-all group relative"
                    onClick={() => copyToClipboard(username, "Username copied!")}
                    data-testid={`card-username-${index}`}
                  >
                    <CardContent className="pt-6 pb-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-lg truncate" data-testid={`text-username-${index}`}>
                            {username}
                          </span>
                          <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {username.length} chars
                          </Badge>
                          {hasCustomWord && (
                            <Badge variant="default" className="text-xs">
                              ✨ Custom
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Box */}
        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Pro Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Add custom words like your name, hobby, or favorite things</li>
                  <li>• Enable "Prioritize Custom Words" to see them more often</li>
                  <li>• Try different styles - "Cool" and "Modern" work great for gaming!</li>
                  <li>• Use the length slider to match platform requirements</li>
                  <li>• Mix separators with different styles for unique combinations</li>
                  <li>• Look for the ✨ Custom badge to find usernames with your words</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
