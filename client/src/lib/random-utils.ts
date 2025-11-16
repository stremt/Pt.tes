const adjectives = [
  "Happy", "Lucky", "Swift", "Brave", "Clever", "Mighty", "Wise", "Bold",
  "Gentle", "Fierce", "Noble", "Royal", "Silent", "Golden", "Silver", "Cosmic",
  "Mystic", "Rapid", "Epic", "Ninja", "Cyber", "Quantum", "Phoenix", "Dragon",
  "Thunder", "Lightning", "Shadow", "Crimson", "Azure", "Emerald", "Stellar",
  "Ultra", "Super", "Mega", "Hyper", "Neo", "Retro", "Alpha", "Omega", "Prime",
  "Dark", "Light", "Fire", "Ice", "Storm", "Wild", "Pure", "True", "Real",
  "Electric", "Atomic", "Neon", "Chrome", "Steel", "Iron", "Jade", "Ruby"
];

const nouns = [
  "Tiger", "Eagle", "Wolf", "Lion", "Falcon", "Panda", "Phoenix", "Dragon",
  "Warrior", "Wizard", "Knight", "Ninja", "Samurai", "Hunter", "Ranger", "Mage",
  "Rogue", "Champion", "Legend", "Hero", "Master", "Ace", "Pro", "Elite",
  "Vortex", "Nexus", "Matrix", "Cipher", "Pixel", "Byte", "Pulse", "Storm",
  "Beast", "Ghost", "Reaper", "Demon", "Angel", "Titan", "God", "King", "Queen",
  "Slayer", "Crusher", "Blade", "Fang", "Claw", "Spirit", "Soul", "Force"
];

const prefixes = ["Mr", "Dr", "Sir", "Lord", "Lady", "Captain", "Agent", "Master"];
const suffixes = ["X", "Z", "Pro", "YT", "TV", "Live", "Gaming", "Plays", "Official"];

export type UsernameStyle = "classic" | "modern" | "prefix" | "suffix" | "minimal" | "cool";
export type Separator = "none" | "underscore" | "dash" | "dot";

export interface UsernameOptions {
  includeNumbers?: boolean;
  customWords?: string[];
  style?: UsernameStyle;
  separator?: Separator;
  maxLength?: number;
  prioritizeCustomWords?: boolean;
}

function getSeparatorChar(separator: Separator): string {
  switch (separator) {
    case "underscore": return "_";
    case "dash": return "-";
    case "dot": return ".";
    case "none": 
    default: return "";
  }
}

function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function generateRandomUsername(options: UsernameOptions = {}): string {
  const {
    includeNumbers = true,
    customWords = [],
    style = "classic",
    separator = "none",
    maxLength = 20,
    prioritizeCustomWords = false
  } = options;

  const sep = getSeparatorChar(separator);
  
  // Create word pools with custom words
  const customAdj = customWords.filter(w => w.length > 0).map(capitalizeWord);
  const customNoun = [...customAdj];
  
  const allAdjectives = prioritizeCustomWords && customAdj.length > 0 
    ? [...customAdj, ...customAdj, ...customAdj, ...adjectives]
    : [...customAdj, ...adjectives];
    
  const allNouns = prioritizeCustomWords && customNoun.length > 0
    ? [...customNoun, ...customNoun, ...customNoun, ...nouns]
    : [...customNoun, ...nouns];

  const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  
  let username = "";
  
  switch (style) {
    case "classic":
      // AdjectiveNoun123
      username = `${getRandomItem(allAdjectives)}${getRandomItem(allNouns)}${includeNumbers ? Math.floor(Math.random() * 1000) : ""}`;
      break;
      
    case "modern":
      // adjective_noun_123 or Adjective.Noun.123
      const adj = getRandomItem(allAdjectives);
      const noun = getRandomItem(allNouns);
      const num = includeNumbers ? Math.floor(Math.random() * 1000) : "";
      username = [adj, noun, num].filter(Boolean).join(sep || "_");
      break;
      
    case "prefix":
      // MrAdjectiveNoun or Mr_Adjective_Noun
      const prefix = getRandomItem(prefixes);
      const adj2 = getRandomItem(allAdjectives);
      const noun2 = getRandomItem(allNouns);
      username = [prefix, adj2 + noun2].join(sep);
      if (includeNumbers) username += (sep || "") + Math.floor(Math.random() * 100);
      break;
      
    case "suffix":
      // AdjectiveNounPro or Adjective_Noun_Pro
      const adj3 = getRandomItem(allAdjectives);
      const noun3 = getRandomItem(allNouns);
      const suffix = getRandomItem(suffixes);
      const num3 = includeNumbers ? Math.floor(Math.random() * 100) : "";
      username = [adj3 + noun3, num3, suffix].filter(Boolean).join(sep);
      break;
      
    case "minimal":
      // Just one word + optional number
      const word = Math.random() > 0.5 ? getRandomItem(allAdjectives) : getRandomItem(allNouns);
      username = word + (includeNumbers ? Math.floor(Math.random() * 10000) : "");
      break;
      
    case "cool":
      // Mix it up with lowercase and numbers in between
      const w1 = getRandomItem(allAdjectives).toLowerCase();
      const w2 = getRandomItem(allNouns).toLowerCase();
      const num4 = includeNumbers ? Math.floor(Math.random() * 100) : "";
      username = `${w1}${num4}${sep}${w2}`;
      break;
  }
  
  // Trim to max length if needed
  if (username.length > maxLength) {
    username = username.substring(0, maxLength);
  }
  
  return username;
}

export function generateMultipleUsernames(
  count: number = 10,
  options: UsernameOptions = {}
): string[] {
  const usernames = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 20;
  
  while (usernames.size < count && attempts < maxAttempts) {
    usernames.add(generateRandomUsername(options));
    attempts++;
  }
  
  return Array.from(usernames);
}

export function generateRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
