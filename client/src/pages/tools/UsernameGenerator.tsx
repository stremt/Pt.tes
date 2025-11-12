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
import { generateMultipleUsernames } from "@/lib/random-utils";
import { User, RefreshCw, Copy, Zap, Lock, Sparkles, Globe } from "lucide-react";

export default function UsernameGenerator() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [customWords, setCustomWords] = useState("");
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
    const newUsernames = generateMultipleUsernames(12, includeNumbers, customWordArray);
    setUsernames(newUsernames);
  };

  return (
    <ToolLayout
      title="Username Generator"
      description="Generate creative and unique usernames instantly. Perfect for gaming accounts, social media profiles, and online communities."
      icon={<User className="h-10 w-10 text-primary" />}
      toolId="username-generator"
      category="Fun & Utility"
      howItWorks={[
        { step: 1, title: "Choose Options", description: "Toggle whether to include numbers in usernames." },
        { step: 2, title: "Generate", description: "Click the button to create 12 unique username ideas." },
        { step: 3, title: "Copy & Use", description: "Click any username to copy it instantly." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Results", description: "Generate 12 unique usernames with a single click." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Creative Combos", description: "Combines adjectives and nouns for memorable usernames." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "No Data Stored", description: "All usernames generated locally in your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Unlimited Use", description: "Generate as many usernames as you need, completely free." },
      ]}
      faqs={[
        { question: "How are usernames generated?", answer: "Usernames are created by combining creative adjectives (like 'Swift', 'Mystic', 'Golden') with powerful nouns (like 'Dragon', 'Phoenix', 'Warrior'), optionally followed by random numbers." },
        { question: "Can I use these usernames for any platform?", answer: "Yes! These usernames work great for gaming platforms, social media, forums, and any online service. However, availability depends on whether someone else has already taken the name." },
        { question: "Why should I include numbers?", answer: "Numbers increase uniqueness and make it more likely the username is available. If you prefer cleaner names, you can disable numbers." },
        { question: "How do I know if a username is available?", answer: "You'll need to check availability on each platform individually. This tool generates ideas, but doesn't check if they're already taken." },
        { question: "Can I generate more usernames?", answer: "Yes! Simply click the 'Generate New Usernames' button as many times as you want to get fresh ideas." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Card */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Usernames</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="custom-words" className="text-base">Custom Words (Optional)</Label>
              <Input
                id="custom-words"
                placeholder="Enter words separated by commas (e.g., Cool, Epic, Super)"
                value={customWords}
                onChange={(e) => setCustomWords(e.target.value)}
                data-testid="input-custom-words"
              />
              <p className="text-xs text-muted-foreground">
                Add your own words to be included in username generation
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="include-numbers" className="text-base">Include Numbers</Label>
                <p className="text-sm text-muted-foreground">Add random numbers to make usernames more unique</p>
              </div>
              <Switch
                id="include-numbers"
                checked={includeNumbers}
                onCheckedChange={setIncludeNumbers}
                data-testid="switch-include-numbers"
              />
            </div>
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
              {usernames.map((username, index) => (
                <Card
                  key={`${username}-${index}`}
                  className="hover-elevate cursor-pointer transition-all group"
                  onClick={() => copyToClipboard(username, "Username copied!")}
                  data-testid={`card-username-${index}`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-lg truncate" data-testid={`text-username-${index}`}>
                        {username}
                      </span>
                      <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                  <li>• Add your birth year or favorite number for personalization</li>
                  <li>• Try variations like adding underscores or extra letters</li>
                  <li>• Keep generating until you find the perfect fit</li>
                  <li>• Check availability on your target platform before committing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
