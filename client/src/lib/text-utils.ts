export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toSentenceCase(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function toCapitalCase(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function toTitleCase(text: string): string {
  const smallWords = ["a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", "or", "the", "to", "up"];
  
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word, index) => {
      if (index === 0 || !smallWords.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

export function toCamelCase(text: string): string {
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export function toSnakeCase(text: string): string {
  return text
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
}

export function toKebabCase(text: string): string {
  return text
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("-");
}

export function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function countCharacters(text: string, includeSpaces: boolean = true): number {
  if (includeSpaces) return text.length;
  return text.replace(/\s/g, "").length;
}

export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

export function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n+/).filter((p) => p.trim().length > 0).length;
}

export function estimateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = countWords(text);
  return Math.ceil(words / wordsPerMinute);
}
