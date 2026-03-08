import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { generateByStyle, type UsernameStyle, type UsernameGender } from "@/lib/username-generator";
import { User, RefreshCw, Copy, Zap, Lock, Sparkles, Globe, Gamepad2, Music, CopyCheckmark, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsernameGenerator() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [style, setStyle] = useState<UsernameStyle>("gaming");
  const [gender, setGender] = useState<UsernameGender>("neutral");
  const [count, setCount] = useState<number>(12);
  const [minLength, setMinLength] = useState<number>(6);
  const [maxLength, setMaxLength] = useState<number>(20);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Username Generator – Create Cool & Unique Usernames Instantly | Pixocraft Tools",
    description: "Generate creative usernames instantly with our free username generator. Perfect for gaming, Instagram, TikTok, Discord, and social media profiles.",
    keywords: "username generator, cool username generator, gaming username generator, random username generator, instagram username generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/username-generator",
  });

  const handleGenerate = () => {
    const newUsernames = generateByStyle(style, count, userInput || undefined, gender, minLength, maxLength);
    setUsernames(newUsernames);
  };

  const handleCopyAll = () => {
    const allUsernames = usernames.join("\n");
    copyToClipboard(allUsernames, "All usernames copied!");
  };

  const getAvailabilityUrl = (username: string, platform: string): string => {
    const encoded = encodeURIComponent(username);
    const urls: Record<string, string> = {
      instagram: `https://instagram.com/${username}`,
      tiktok: `https://tiktok.com/@${username}`,
      twitter: `https://twitter.com/${username}`,
      github: `https://github.com/${username}`,
    };
    return urls[platform] || "#";
  };

  return (
    <ToolLayout
      title="Username Generator"
      description="Generate creative and unique usernames instantly. Perfect for gaming accounts, social media profiles, and online communities."
      icon={<User className="h-10 w-10 text-primary" />}
      toolId="username-generator"
      category="Fun & Utility"
      howItWorks={[
        { step: 1, title: "Enter Your Name", description: "Optional: Add your name, keyword, or brand word to personalize usernames." },
        { step: 2, title: "Choose Style & Gender", description: "Pick a style and gender vibe to adapt the word choices and overall feel of usernames." },
        { step: 3, title: "Customize & Generate", description: "Set length preferences and quantity, then generate unique usernames instantly." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Results", description: "Generate usernames instantly with smart algorithms." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "8 Styles", description: "Aesthetic, Fancy, Gaming, Minimal, Professional, Cute, Dark, and Random." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "No Data Stored", description: "All usernames generated locally in your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Custom Input", description: "Use your own name or keyword to personalize results." },
      ]}
      faqs={[
        { question: "What is a username generator?", answer: "A username generator creates unique, creative usernames tailored to different styles. Our generator uses 2000+ words to produce highly varied usernames with minimal repetition." },
        { question: "Can I generate usernames using my name?", answer: "Absolutely! Enter your name or keyword in the input field and the generator will create usernames that incorporate your custom input." },
        { question: "Are the usernames unique?", answer: "Our generator uses a deduplication system to prevent repetition. Each batch of usernames is unique within that generation." },
        { question: "Can I use these for Instagram or gaming?", answer: "Yes! Click the availability links to check if your chosen username is available on platforms like Instagram, TikTok, Twitter, or GitHub." },
        { question: "Is the username generator free?", answer: "Yes! Completely free. Generate as many usernames as you want with no limits or registration needed." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Card */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Usernames</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Custom Input */}
            <div className="space-y-2">
              <Label htmlFor="user-input" className="text-base font-semibold">Your Name or Keyword (Optional)</Label>
              <Input
                id="user-input"
                placeholder="e.g., vivek, pixel, neon, shadow"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                data-testid="input-custom-name"
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for random generation, or enter a name/keyword to personalize usernames
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Style Selector */}
              <div className="space-y-2">
                <Label htmlFor="style" className="text-base font-semibold">Username Style</Label>
                <Select value={style} onValueChange={(value) => setStyle(value as UsernameStyle)}>
                  <SelectTrigger id="style" data-testid="select-style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aesthetic">Aesthetic</SelectItem>
                    <SelectItem value="fancy">Fancy</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="cute">Cute</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose a style for your usernames
                </p>
              </div>

              {/* Gender Selector */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-base font-semibold">Gender Vibe</Label>
                <Select value={gender} onValueChange={(value) => setGender(value as UsernameGender)}>
                  <SelectTrigger id="gender" data-testid="select-gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="masculine">Masculine</SelectItem>
                    <SelectItem value="feminine">Feminine</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Adapt word choices to match your vibe
                </p>
              </div>

              {/* Count Selector */}
              <div className="space-y-2">
                <Label htmlFor="count" className="text-base font-semibold">Generate Count</Label>
                <Select value={count.toString()} onValueChange={(value) => setCount(parseInt(value))}>
                  <SelectTrigger id="count" data-testid="select-count">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 usernames</SelectItem>
                    <SelectItem value="25">25 usernames</SelectItem>
                    <SelectItem value="50">50 usernames</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  How many usernames to generate
                </p>
              </div>
            </div>

            {/* Length Control */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Minimum Length: {minLength} characters</Label>
                <input
                  type="range"
                  min="3"
                  max="19"
                  value={minLength}
                  onChange={(e) => setMinLength(Math.min(parseInt(e.target.value), maxLength))}
                  className="w-full"
                  data-testid="slider-min-length"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-base font-semibold">Maximum Length: {maxLength} characters</Label>
                <input
                  type="range"
                  min="7"
                  max="30"
                  value={maxLength}
                  onChange={(e) => setMaxLength(Math.max(parseInt(e.target.value), minLength))}
                  className="w-full"
                  data-testid="slider-max-length"
                />
              </div>
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h3 className="text-lg font-semibold">Generated Usernames</h3>
              <div className="flex gap-2">
                <Badge variant="secondary">{usernames.length} usernames</Badge>
                <Button 
                  onClick={handleCopyAll} 
                  size="sm" 
                  variant="outline"
                  data-testid="button-copy-all"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {usernames.map((username, index) => (
                <Card
                  key={`${username}-${index}`}
                  className="hover-elevate transition-all group relative flex flex-col"
                  data-testid={`card-username-${index}`}
                >
                  <CardContent className="pt-6 pb-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-lg truncate" data-testid={`text-username-${index}`}>
                          {username}
                        </span>
                        <button
                          onClick={() => copyToClipboard(username, "Username copied!")}
                          className="p-1 rounded hover:bg-muted transition-colors"
                          data-testid={`button-copy-username-${index}`}
                        >
                          <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </button>
                      </div>
                      <Badge variant="outline" className="text-xs w-fit">
                        {username.length} chars
                      </Badge>
                      
                      <div className="pt-2 border-t space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground">Check availability:</p>
                        <div className="flex flex-wrap gap-1">
                          <a
                            href={getAvailabilityUrl(username, "instagram")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-instagram-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Instagram
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "tiktok")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-tiktok-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            TikTok
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "twitter")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-twitter-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Twitter
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "github")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-github-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            GitHub
                          </a>
                        </div>
                      </div>
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
                  <li>• Enter your name or keyword to personalize usernames</li>
                  <li>• Click any username to copy it instantly, or use Copy All</li>
                  <li>• Adjust length slider to filter by character count</li>
                  <li>• Check availability on Instagram, TikTok, Twitter, or GitHub</li>
                  <li>• Aesthetic usernames use soft, elegant words</li>
                  <li>• Gaming usernames are bold and powerful</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
