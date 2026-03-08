import {
  adjectives,
  nouns,
  verbs,
  prefixes,
  suffixes,
  feminineAdjectives,
  feminineNouns,
  masculineAdjectives,
  masculineNouns,
  neutralAdjectives,
  neutralNouns,
  type UsernameCategory,
  type UsernameStyle,
  type UsernameGender,
  type UsernamePattern,
  categoryConfigs,
  styleConfigs,
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

// Get gender-specific word lists
function getGenderWords(gender?: UsernameGender) {
  if (!gender || gender === "neutral") {
    return { adjectives, nouns };
  }
  if (gender === "feminine") {
    return { adjectives: feminineAdjectives, nouns: feminineNouns };
  }
  if (gender === "masculine") {
    return { adjectives: masculineAdjectives, nouns: masculineNouns };
  }
  return { adjectives, nouns };
}

// Generate username based on pattern
function generateByPattern(
  pattern: UsernamePattern,
  separator: string = "",
  capitalize_: boolean = true,
  customWords?: string[],
  userInput?: string,
  gender?: UsernameGender
): string {
  const genderWords = getGenderWords(gender);
  let username = "";

  switch (pattern) {
    case "custom-word":
      if (userInput) {
        username = userInput;
      } else if (customWords && customWords.length > 0) {
        username = getRandomItem(customWords);
      } else {
        username = getRandomItem(genderWords.nouns);
      }
      break;
    case "adjective-noun":
      if (userInput) {
        username = `${getRandomItem(genderWords.adjectives)}${separator}${userInput}`;
      } else {
        username = `${getRandomItem(genderWords.adjectives)}${separator}${getRandomItem(genderWords.nouns)}`;
      }
      break;
    case "adjective-noun-number":
      if (userInput) {
        username = `${getRandomItem(genderWords.adjectives)}${separator}${userInput}${Math.floor(Math.random() * 100)}`;
      } else {
        username = `${getRandomItem(genderWords.adjectives)}${separator}${getRandomItem(genderWords.nouns)}${Math.floor(Math.random() * 100)}`;
      }
      break;
    case "noun-verb":
      username = `${getRandomItem(genderWords.nouns)}${separator}${getRandomItem(verbs)}`;
      break;
    case "prefix-word":
      username = `${getRandomItem(prefixes)}${getRandomItem(genderWords.nouns)}`;
      break;
    case "word-suffix":
      if (userInput) {
        username = `${userInput}${separator}${getRandomItem(suffixes)}`;
      } else {
        username = `${getRandomItem(genderWords.nouns)}${separator}${getRandomItem(suffixes)}`;
      }
      break;
    case "word-year":
      const year = new Date().getFullYear();
      username = `${getRandomItem(genderWords.nouns)}${separator}${year}`;
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
  style?: UsernameStyle;
  gender?: UsernameGender;
  count?: number;
  customPattern?: UsernamePattern;
  userInput?: string;
  minLength?: number;
  maxLength?: number;
}

export function generateUsername(options: GenerateOptions = {}): string {
  const { category = "gaming", style, gender, userInput, minLength = 0, maxLength = 999 } = options;
  
  let config = style ? styleConfigs[style] : categoryConfigs[category];

  const pattern = getRandomItem(config.patterns);
  const separator = getRandomItem(config.separators);

  let username = generateByPattern(pattern, separator, !config.lowercase, config.customWords, userInput, gender);

  if (config.addNumbers && Math.random() > 0.5) {
    username += Math.floor(Math.random() * 100);
  }

  // Check length constraints
  if (username.length < minLength || username.length > maxLength) {
    return generateUsername(options);
  }

  return username;
}

export function generateMultipleUsernames(
  count: number = 12,
  options: GenerateOptions = {}
): string[] {
  const usernames = new Set<string>();
  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loops

  while (usernames.size < count && attempts < maxAttempts) {
    const username = generateUsername(options);
    usernames.add(username);
    attempts++;
  }

  return Array.from(usernames).slice(0, count);
}

export function generateByCategory(
  category: UsernameCategory,
  count: number = 12
): string[] {
  return generateMultipleUsernames(count, { category });
}

export function generateByStyle(
  style: UsernameStyle,
  count: number = 12,
  userInput?: string,
  gender?: UsernameGender,
  minLength?: number,
  maxLength?: number
): string[] {
  return generateMultipleUsernames(count, { style, userInput, gender, minLength, maxLength });
}

// Get all available categories
export function getCategories() {
  return Object.entries(categoryConfigs).map(([key, config]) => ({
    id: key as UsernameCategory,
    name: config.name,
  }));
}

// Get all available styles
export function getStyles() {
  return Object.entries(styleConfigs).map(([key, config]) => ({
    id: key as UsernameStyle,
    name: config.name,
  }));
}
