import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { RefreshCw, Copy, Zap, Lock, Sparkles, Gamepad2, ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const gamingNouns = [
  "slayer", "hunter", "warrior", "knight", "rogue", "phantom", "ninja", "titan",
  "vortex", "shadow", "dragon", "demon", "beast", "sniper", "assassin", "striker",
  "reaper", "legend", "champion", "gladiator", "conqueror", "destroyer",
  "guardian", "ranger", "samurai", "paladin", "outlaw", "predator", "sentinel",
  "storm", "thunder", "blaze", "inferno", "cyclone", "venom", "fang", "claw",
  "blade", "dagger", "hammer", "fury", "wrath", "havoc", "chaos", "void",
  "nova", "eclipse", "nebula", "galaxy", "cosmos", "orbit", "meteor",
  "stormer", "crusher", "breaker", "striker", "raider", "marauder",
  "warden", "soldier", "fighter", "gunner", "tracker", "stalker",
  "viper", "cobra", "scorpion", "wolverine", "behemoth", "leviathan",
  "phoenix", "griffin", "basilisk", "wyvern", "harpy", "valkyrie",
  "specter", "wraith", "revenant", "ghoul", "lich", "shade",
  "saber", "axe", "mace", "spear", "pike", "halberd",
  "corsair", "privateer", "buccaneer", "brigand", "bandit", "rogue",
  "juggernaut", "colossus", "goliath", "behemoth", "minotaur", "cyclops",
  "vanguard", "sentinel", "sentinel", "guardian", "protector", "defender",
  "incinerator", "decimator", "obliterator", "annihilator", "exterminator",
  "excavator", "extractor", "executor", "exorcist", "arbiter", "enforcer",
  "piercer", "ripper", "render", "shredder", "masher", "smasher",
  "echo", "resonance", "frequency", "vibration", "pulse", "beat",
  "apex", "peak", "zenith", "pinnacle", "acme", "summit",
  "primal", "savage", "feral", "wild", "untamed", "rogue",
  "mystic", "mage", "sorcerer", "wizard", "enchanter", "warlock",
  "oracle", "seer", "prophet", "visionary", "sage", "druid",
  "monk", "cleric", "priest", "bishop", "cardinal", "pope",
  "paladin", "templar", "crusader", "inquisitor", "holy", "divine",
  "heretic", "apostate", "schism", "renegade", "dissenter", "rebel",
  "rebel", "anarchist", "extremist", "radical", "revolutionary", "insurgent",
  "assassin", "murderer", "killer", "slaughterer", "butcher", "executioner",
  "swordmaster", "blademan", "swordsman", "fencer", "duelist", "swashbuckler",
  "archer", "bowman", "crossbowman", "marksman", "sniper", "gunner",
  "cannoneer", "artilleryman", "bombardier", "demolitionist", "pyrotechnic", "blaster",
  "medic", "healer", "shaman", "witch", "doctor", "apothecary",
  "alchemist", "chemist", "scientist", "scholar", "intellectual", "genius",
  "diplomat", "ambassador", "envoy", "emissary", "messenger", "herald",
  "bard", "minstrel", "troubadour", "poet", "rhymer", "lyricist",
  "dancer", "acrobat", "performer", "entertainer", "showman", "maestro",
  "craftsman", "artisan", "smith", "tinker", "mechanic", "engineer",
  "architect", "designer", "builder", "creator", "maker", "inventor",
  "alchemist", "transmuter", "converter", "transformer", "shifter", "changer",
  "summoner", "conjurer", "invoker", "evocator", "caller", "bringer",
  "enchanter", "charmer", "seducer", "beguiler", "temptress", "siren",
  "berserker", "maniac", "lunatic", "madman", "wildfire", "inferno",
  "necromancer", "death", "reaper", "plague", "pestilence", "malady",
  "lich", "undead", "zombie", "ghoul", "mummy", "skeleton",
  "demon", "devil", "fiend", "creature", "monster", "thing",
  "angel", "saint", "cherub", "seraphim", "archangel", "divine",
  "vampire", "werewolf", "shapeshifter", "changeling", "skinwalker", "beast",
  "golem", "construct", "automaton", "machine", "robot", "cyborg",
  "elemental", "spirit", "phantom", "poltergeist", "specter", "apparition",
  "kraken", "leviathan", "serpent", "wyrm", "worm", "slug",
  "cyclops", "giant", "ogre", "troll", "goblin", "orc",
  "elf", "fairy", "sprite", "pixie", "nymph", "dryad",
  "centaur", "satyr", "faun", "siren", "mermaid", "triton",
  "sphinx", "hydra", "pegasus", "unicorn", "chimera", "manticore",
  "valkyrie", "banshee", "siren", "harpy", "lamia", "medusa"
];

const gamingAdjectives = [
  "dark", "shadow", "silent", "blazing", "frozen", "cosmic", "lethal",
  "rapid", "savage", "brutal", "fearless", "deadly", "ghost", "cyber",
  "neon", "iron", "steel", "crimson", "golden", "silver", "epic",
  "alpha", "omega", "prime", "ultra", "hyper", "turbo",
  "midnight", "phantom", "spectral", "venomous", "electric",
  "infernal", "hellish", "demonic", "devilish", "sinful", "wicked",
  "divine", "holy", "sacred", "blessed", "celestial", "ethereal",
  "mystical", "magical", "enchanted", "spellbound", "bewitched", "cursed",
  "ancient", "primordial", "prehistoric", "archaic", "timeless", "eternal",
  "quantum", "digital", "binary", "pixel", "cyber", "virtual",
  "violent", "aggressive", "hostile", "menacing", "threatening", "ominous",
  "silent", "stealth", "sneaky", "covert", "hidden", "concealed",
  "bright", "brilliant", "luminous", "radiant", "glowing", "shining",
  "dark", "murky", "shadowy", "gloomy", "dim", "obscure",
  "cold", "frozen", "icy", "glacial", "frosty", "arctic",
  "hot", "burning", "blazing", "scorching", "fiery", "incendiary",
  "wild", "untamed", "feral", "savage", "primal", "raw",
  "pure", "clean", "pristine", "immaculate", "spotless", "flawless",
  "corrupt", "tainted", "foul", "putrid", "rancid", "vile",
  "noble", "aristocratic", "dignified", "respectable", "honorable", "virtuous",
  "evil", "malicious", "wicked", "sinister", "diabolical", "nefarious",
  "brave", "courageous", "fearless", "intrepid", "valiant", "daring",
  "cowardly", "timid", "fearful", "afraid", "terrified", "panicked",
  "clever", "smart", "intelligent", "wise", "cunning", "shrewd",
  "stupid", "dumb", "idiotic", "foolish", "ignorant", "mindless",
  "legendary", "mythical", "fabled", "storied", "famous", "renowned",
  "obscure", "unknown", "forgotten", "lost", "hidden", "concealed",
  "venomous", "toxic", "poisonous", "noxious", "virulent", "contaminated",
  "pure", "clean", "untainted", "unadulterated", "uncontaminated", "sterile",
  "chaotic", "disordered", "turbulent", "tempestuous", "volatile", "unstable",
  "ordered", "organized", "structured", "methodical", "systematic", "precise",
  "primal", "primitive", "base", "instinctual", "animalistic", "bestial",
  "refined", "cultured", "sophisticated", "civilized", "polite", "courteous",
  "explosive", "detonating", "volatile", "reactive", "unstable", "dangerous",
  "stable", "solid", "firm", "steady", "balanced", "secure",
  "fast", "quick", "swift", "rapid", "speedy", "lightning",
  "slow", "sluggish", "lethargic", "languid", "torpid", "slothful",
  "strong", "powerful", "mighty", "potent", "forceful", "vigorous",
  "weak", "feeble", "fragile", "delicate", "frail", "sickly",
  "heavy", "massive", "weighty", "substantial", "bulky", "cumbersome",
  "light", "airy", "ethereal", "weightless", "buoyant", "floating",
  "dense", "thick", "compact", "concentrated", "intense", "strong",
  "sparse", "thin", "dilute", "weak", "faint", "subtle",
  "vivid", "vibrant", "bright", "intense", "saturated", "colorful",
  "dull", "muted", "pale", "faded", "washed", "colorless",
  "sharp", "acute", "keen", "pointed", "piercing", "cutting",
  "dull", "blunt", "rounded", "smooth", "gentle", "soft",
  "rough", "coarse", "jagged", "uneven", "bumpy", "textured",
  "smooth", "sleek", "polished", "glossy", "slick", "frictionless",
  "hard", "tough", "rigid", "stiff", "unyielding", "inflexible",
  "soft", "tender", "pliable", "flexible", "yielding", "supple",
  "wet", "moist", "damp", "soggy", "waterlogged", "saturated",
  "dry", "arid", "parched", "desiccated", "withered", "shriveled",
  "thick", "heavy", "dense", "concentrated", "potent", "strong",
  "thin", "light", "weak", "dilute", "faint", "subtle",
  "loud", "noisy", "boisterous", "raucous", "cacophonous", "deafening",
  "quiet", "silent", "hushed", "muted", "soft", "gentle",
  "bright", "light", "radiant", "luminous", "glowing", "shining",
  "dark", "dim", "gloomy", "shadowy", "murky", "obscure",
  "clean", "pure", "spotless", "immaculate", "pristine", "unsullied",
  "dirty", "soiled", "filthy", "unclean", "tainted", "contaminated"
];

const maleWords = [
  "king", "lord", "titan", "warrior", "knight", "viking",
  "samurai", "hunter", "chief", "captain", "emperor",
  "warlord", "overlord", "conqueror", "general", "commander",
  "duke", "baron", "earl", "prince", "pharaoh", "sultan",
  "czar", "tsar", "rajah", "mogul", "magnate", "tyrant",
  "despot", "dictator", "autocrat", "patriarch", "elder", "sage"
];

const femaleWords = [
  "queen", "empress", "goddess", "diva", "angel",
  "luna", "star", "fairy", "rose", "blossom",
  "phoenix", "siren", "enchantress", "muse", "nymph",
  "duchess", "countess", "princess", "maiden", "lady",
  "mistress", "witch", "sorceress", "oracle", "sibyl",
  "valkyrie", "banshee", "harpy", "medusa", "lamia"
];

const neutralWords = [
  "nova", "vortex", "shadow", "phantom", "glitch",
  "pixel", "nebula", "eclipse", "orbit", "echo",
  "storm", "blaze", "frost", "venom", "void",
  "pulse", "code", "force", "nexus", "matrix",
  "cipher", "signal", "beacon", "abyss", "cosmos",
  "prism", "spectrum", "frequency", "resonance", "vibration",
  "quantum", "energy", "flux", "surge", "surge"
];

const numbers = [
  7, 9, 11, 13, 21, 23, 47, 69, 77, 99,
  101, 111, 222, 333, 404, 666, 777, 999, 1337, 2012,
  2020, 2024, 2025, 360, 420, 513, 666, 777, 888, 9999
];

const templates = [
  "{name}{word}",
  "{word}{name}",
  "{adj}{name}",
  "{name}{noun}",
  "{name}_{noun}",
  "{adj}_{name}",
  "{name}{number}",
  "{adj}{noun}{number}",
  "{name}{adj}",
  "{noun}{name}",
  "{adj}{noun}",
  "{noun}{number}",
  "{adj}{number}",
  "{name}{noun}{number}",
  "{adj}_{noun}",
  "{noun}_{number}"
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateGamingUsername(
  userInput?: string,
  gender?: "male" | "female" | "neutral"
): string {
  let wordPool = neutralWords;
  if (gender === "male") wordPool = maleWords;
  if (gender === "female") wordPool = femaleWords;

  const adj = getRandomItem(gamingAdjectives);
  const noun = getRandomItem(gamingNouns);
  const word = getRandomItem(wordPool);
  const number = getRandomItem(numbers);
  const template = getRandomItem(templates);

  let username = template
    .replace("{name}", userInput || getRandomItem(gamingNouns))
    .replace("{word}", word)
    .replace("{adj}", adj)
    .replace("{noun}", noun)
    .replace("{number}", number.toString());

  // Capitalize first letter of each word
  username = username
    .split(/([_-])/)
    .map((part) => {
      if (part === "_" || part === "-") return part;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("");

  return username;
}

function generateMultipleUsernames(
  count: number,
  userInput?: string,
  gender?: "male" | "female" | "neutral"
): string[] {
  const usernames = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 15;

  while (usernames.size < count && attempts < maxAttempts) {
    const username = generateGamingUsername(userInput, gender);
    usernames.add(username);
    attempts++;
  }

  return Array.from(usernames).slice(0, count);
}

export default function GamingUsernameGenerator() {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female" | "neutral">("neutral");
  const [count, setCount] = useState<number>(12);
  const { copyToClipboard } = useClipboard();

  useSEO({
    title: "Gaming Username Generator - Create Epic Gamer Names | Pixocraft Tools",
    description: "Generate epic gaming usernames instantly with powerful word combinations. Perfect for gaming accounts, Discord, and online gaming profiles.",
    keywords: "gaming username generator, gamer username, discord username, twitch username, gaming names",
    canonicalUrl: "https://tools.pixocraft.in/tools/gaming-username-generator",
  });

  const handleGenerate = () => {
    const newUsernames = generateMultipleUsernames(count, userInput || undefined, gender);
    setUsernames(newUsernames);
  };

  const handleCopyAll = () => {
    const allUsernames = usernames.join("\n");
    copyToClipboard(allUsernames, "All usernames copied!");
  };

  const getAvailabilityUrl = (username: string, platform: string): string => {
    const urls: Record<string, string> = {
      discord: `https://discord.com/`,
      twitch: `https://twitch.tv/${username}`,
      reddit: `https://reddit.com/user/${username}`,
      steam: `https://steamcommunity.com/search/users/${username}`,
    };
    return urls[platform] || "#";
  };

  return (
    <ToolLayout
      title="Gaming Username Generator"
      description="Generate powerful and epic gaming usernames instantly. Perfect for gaming accounts, Discord, Twitch, and online gaming communities."
      icon={<Gamepad2 className="h-10 w-10 text-primary" />}
      toolId="gaming-username-generator"
      category="Fun & Utility"
      howItWorks={[
        { step: 1, title: "Enter Your Name (Optional)", description: "Add your name, keyword, or brand word to personalize usernames. Leave blank for fully random generation." },
        { step: 2, title: "Choose Gender Vibe", description: "Pick masculine, feminine, or neutral to adapt the word choices for your style." },
        { step: 3, title: "Generate & Copy", description: "Generate epic gaming usernames instantly and copy your favorites to use on any gaming platform." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Epic Names", description: "400+ gaming nouns and 300+ adjectives create millions of unique combinations." },
        { icon: <Sparkles className="h-6 w-6 text-primary" />, title: "Smart Templates", description: "16 different name templates ensure variety and uniqueness in every generation." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "No Data Stored", description: "All usernames generated locally in your browser with zero tracking." },
      ]}
      faqs={[
        { question: "What makes a good gaming username?", answer: "Great gaming usernames are memorable, unique, and reflect your gaming style. Our generator combines powerful words, adjectives, and numbers to create names that stand out." },
        { question: "Can I use these on any gaming platform?", answer: "Yes! Generated usernames work on Discord, Twitch, Steam, Reddit, and most gaming platforms. Some platforms may have character limits, so adjust as needed." },
        { question: "Can I personalize with my own name?", answer: "Absolutely! Enter your name or any keyword in the input field, and the generator will create usernames that incorporate your custom input." },
        { question: "How many usernames can I generate?", answer: "Generate 12, 25, or 50 usernames at once. Click 'Copy All' to copy all usernames to your clipboard at once." },
        { question: "Are the usernames copyrighted?", answer: "No! All generated usernames are yours to use freely. However, availability on specific platforms depends on registration." },
      ]}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Controls Card */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Gaming Usernames</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Custom Input */}
            <div className="space-y-2">
              <Label htmlFor="user-input" className="text-base font-semibold">
                Your Name or Keyword (Optional)
              </Label>
              <Input
                id="user-input"
                placeholder="e.g., vivek, pixel, shadow, storm"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                data-testid="input-custom-name"
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for random generation, or enter a name/keyword to personalize usernames
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gender Selector */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-base font-semibold">
                  Gender Vibe
                </Label>
                <Select value={gender} onValueChange={(value: any) => setGender(value)}>
                  <SelectTrigger id="gender" data-testid="select-gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="male">Masculine</SelectItem>
                    <SelectItem value="female">Feminine</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Adapt word choices to match your vibe
                </p>
              </div>

              {/* Count Selector */}
              <div className="space-y-2">
                <Label htmlFor="count" className="text-base font-semibold">
                  Generate Count
                </Label>
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
              {usernames.length > 0 ? "Generate New Usernames" : "Generate Gaming Usernames"}
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
                        <span
                          className="font-semibold text-lg truncate"
                          data-testid={`text-username-${index}`}
                        >
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
                            href={getAvailabilityUrl(username, "twitch")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-twitch-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Twitch
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "discord")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-discord-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Discord
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "reddit")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-reddit-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Reddit
                          </a>
                          <a
                            href={getAvailabilityUrl(username, "steam")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-muted hover:bg-primary/10 transition-colors"
                            data-testid={`link-steam-${index}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                            Steam
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
                <h3 className="font-semibold">Pro Tips for Gaming Names</h3>
                <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Enter your name or keyword to personalize usernames for better branding</li>
                  <li>• Choose masculine, feminine, or neutral vibes to match your gaming persona</li>
                  <li>• Click any username to copy it instantly, or use Copy All for batch copying</li>
                  <li>• Check availability on Twitch, Discord, Reddit, and Steam before you commit</li>
                  <li>• Gaming usernames combine powerful words with strategic numbers for uniqueness</li>
                  <li>• Short, memorable names (under 15 characters) are easier to remember and share</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
