import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { generateMultipleUsernames, getCategories, type UsernameCategory } from "@/lib/username-generator";
import { User, RefreshCw, Copy, Zap, Lock, Sparkles, Globe, Gamepad2, Instagram, Music } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UsernameGenerator() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [category, setCategory] = useState<UsernameCategory>("gaming");
  const [count, setCount] = useState<number>(12);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Username Generator – Create Cool & Unique Usernames Instantly | Pixocraft Tools",
    description: "Generate creative usernames instantly with our free username generator. Perfect for gaming, Instagram, TikTok, Discord, and social media profiles.",
    keywords: "username generator, cool username generator, gaming username generator, random username generator, instagram username generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/username-generator",
  });

  const handleGenerate = () => {
    const newUsernames = generateMultipleUsernames(count, { category });
    setUsernames(newUsernames);
  };

  const categoryIcons: Record<UsernameCategory, React.ReactNode> = {
    gaming: <Gamepad2 className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    tiktok: <Music className="h-5 w-5" />,
    discord: <Globe className="h-5 w-5" />,
    youtube: <Globe className="h-5 w-5" />,
    fantasy: <Sparkles className="h-5 w-5" />,
    professional: <Globe className="h-5 w-5" />,
  };

  return (
    <ToolLayout
      title="Username Generator"
      description="Generate creative and unique usernames instantly. Perfect for gaming accounts, social media profiles, and online communities."
      icon={<User className="h-10 w-10 text-primary" />}
      toolId="username-generator"
      category="Fun & Utility"
      howItWorks={[
        { step: 1, title: "Choose Category", description: "Pick the platform or style (Gaming, Instagram, TikTok, Discord, YouTube, Fantasy, or Professional)." },
        { step: 2, title: "Select Quantity", description: "Choose how many usernames to generate (12, 25, or 50)." },
        { step: 3, title: "Generate & Copy", description: "Get unique usernames instantly and copy any you like with one click." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Results", description: "Generate usernames instantly with smart algorithms." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "7 Categories", description: "Gaming, Instagram, TikTok, Discord, YouTube, Fantasy, and Professional." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "No Data Stored", description: "All usernames generated locally in your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "2000+ Words", description: "Powered by 2000+ adjectives, nouns, verbs, and more." },
      ]}
      faqs={[
        { question: "What is a username generator?", answer: "A username generator creates unique, creative usernames tailored to different platforms. Our generator uses 2000+ words to produce highly varied usernames with minimal repetition." },
        { question: "How do the categories work?", answer: "Each category is optimized for its platform. Gaming usernames are bold (ShadowNinja95), Instagram usernames use dots (neon.soul), professional usernames use dashes (swift-developer), and so on." },
        { question: "Can I use these usernames for Instagram?", answer: "Absolutely! Select 'Instagram' category to get usernames optimized for Instagram with dots and lowercase letters. Check availability on Instagram to see if they're taken." },
        { question: "Are the usernames checked for availability?", answer: "Our generator creates usernames, but availability depends on each platform. We recommend checking on your target platform (Instagram, TikTok, Discord, etc.) to see if the name is available." },
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Selector */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value as UsernameCategory)}>
                  <SelectTrigger id="category" data-testid="select-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gaming">Gamepad2 Gaming</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="discord">Discord</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Choose a category optimized for your platform
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
              <Badge variant="secondary">{usernames.length} usernames</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {usernames.map((username, index) => (
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
                      <Badge variant="outline" className="text-xs">
                        {username.length} chars
                      </Badge>
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
                  <li>• Each category is optimized for its platform</li>
                  <li>• Click any username to copy it instantly</li>
                  <li>• Generate 12, 25, or 50 usernames at once</li>
                  <li>• Check availability on your target platform</li>
                  <li>• Gaming usernames are bold and powerful</li>
                  <li>• Instagram usernames use dots and lowercase</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
