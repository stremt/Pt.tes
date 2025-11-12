const adjectives = [
  "Happy", "Lucky", "Swift", "Brave", "Clever", "Mighty", "Wise", "Bold",
  "Gentle", "Fierce", "Noble", "Royal", "Silent", "Golden", "Silver", "Cosmic",
  "Mystic", "Rapid", "Epic", "Ninja", "Cyber", "Quantum", "Phoenix", "Dragon",
  "Thunder", "Lightning", "Shadow", "Crimson", "Azure", "Emerald", "Stellar"
];

const nouns = [
  "Tiger", "Eagle", "Wolf", "Lion", "Falcon", "Panda", "Phoenix", "Dragon",
  "Warrior", "Wizard", "Knight", "Ninja", "Samurai", "Hunter", "Ranger", "Mage",
  "Rogue", "Champion", "Legend", "Hero", "Master", "Ace", "Pro", "Elite",
  "Vortex", "Nexus", "Matrix", "Cipher", "Pixel", "Byte", "Pulse", "Storm"
];

export function generateRandomUsername(includeNumbers: boolean = true): string {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = includeNumbers ? Math.floor(Math.random() * 1000) : "";
  
  return `${adjective}${noun}${number}`;
}

export function generateMultipleUsernames(count: number = 10, includeNumbers: boolean = true): string[] {
  const usernames = new Set<string>();
  
  while (usernames.size < count) {
    usernames.add(generateRandomUsername(includeNumbers));
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
