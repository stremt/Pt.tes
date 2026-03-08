import {
  adjectives,
  nouns,
  verbs,
  prefixes,
  suffixes,
  type UsernameCategory,
  type UsernamePattern,
  categoryConfigs,
} from "./username-data";

// Fisher-Yates shuffle for non-repeating generation
function fisherYatesShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Get random item from array
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Capitalize first letter
function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Generate username based on pattern
function generateByPattern(
  pattern: UsernamePattern,
  separator: string = "",
  capitalize_: boolean = true
): string {
  let username = "";

  switch (pattern) {
    case "adjective-noun":
      username = `${getRandomItem(adjectives)}${separator}${getRandomItem(nouns)}`;
      break;
    case "adjective-noun-number":
      username = `${getRandomItem(adjectives)}${separator}${getRandomItem(nouns)}${Math.floor(Math.random() * 100)}`;
      break;
    case "noun-verb":
      username = `${getRandomItem(nouns)}${separator}${getRandomItem(verbs)}`;
      break;
    case "prefix-word":
      username = `${getRandomItem(prefixes)}${getRandomItem(nouns)}`;
      break;
    case "word-suffix":
      username = `${getRandomItem(nouns)}${separator}${getRandomItem(suffixes)}`;
      break;
    case "word-year":
      const year = new Date().getFullYear();
      username = `${getRandomItem(nouns)}${separator}${year}`;
      break;
  }

  // Apply capitalization rules
  if (capitalize_) {
    username = username
      .split(separator)
      .map(word => capitalize(word))
      .join(separator);
  } else {
    username = username.toLowerCase();
  }

  return username;
}

export interface GenerateOptions {
  category?: UsernameCategory;
  count?: number;
  customPattern?: UsernamePattern;
}

export function generateUsername(options: GenerateOptions = {}): string {
  const { category = "gaming" } = options;
  const config = categoryConfigs[category];

  const pattern = getRandomItem(config.patterns);
  const separator = getRandomItem(config.separators);

  let username = generateByPattern(pattern, separator, !config.lowercase);

  if (config.addNumbers && Math.random() > 0.5) {
    username += Math.floor(Math.random() * 100);
  }

  return username;
}

export function generateMultipleUsernames(
  count: number = 12,
  options: GenerateOptions = {}
): string[] {
  const usernames: string[] = [];

  for (let i = 0; i < count; i++) {
    usernames.push(generateUsername(options));
  }

  return usernames;
}

export function generateByCategory(
  category: UsernameCategory,
  count: number = 12
): string[] {
  return generateMultipleUsernames(count, { category });
}

// Get all available categories
export function getCategories() {
  return Object.entries(categoryConfigs).map(([key, config]) => ({
    id: key as UsernameCategory,
    name: config.name,
  }));
}
