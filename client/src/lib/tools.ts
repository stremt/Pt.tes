import { ToolMetadata } from "@shared/schema";
import { 
  Mail, 
  Lock, 
  QrCode, 
  ImageDown, 
  Type, 
  FileText, 
  Code, 
  Link2, 
  Palette, 
  User, 
  ShieldCheck,
  Sparkles
} from "lucide-react";

export const tools: ToolMetadata[] = [
  {
    id: "temp-mail",
    name: "Temp Mail Generator",
    description: "Generate temporary disposable emails instantly. Protect your privacy and avoid spam with free temporary email addresses.",
    icon: "Mail",
    path: "/tools/temp-mail",
    category: "privacy",
    keywords: ["temp mail", "temporary email", "disposable email", "free email", "privacy", "spam protection"],
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Create strong, secure passwords instantly. Customize length and complexity for maximum security.",
    icon: "Lock",
    path: "/tools/password-generator",
    category: "privacy",
    keywords: ["password generator", "strong password", "secure password", "random password", "password maker"],
  },
  {
    id: "qr-maker",
    name: "QR Code Maker",
    description: "Generate custom QR codes for URLs, text, or contact information. Download instantly in high quality.",
    icon: "QrCode",
    path: "/tools/qr-maker",
    category: "generator",
    keywords: ["qr code generator", "qr maker", "create qr code", "free qr code", "qr code creator"],
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Compress images without losing quality. Reduce file size instantly and download optimized images.",
    icon: "ImageDown",
    path: "/tools/image-compressor",
    category: "utility",
    keywords: ["image compressor", "compress image", "reduce image size", "optimize image", "image optimizer"],
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    description: "Convert text to uppercase, lowercase, title case, camel case, and more. Fast and simple text transformation.",
    icon: "Type",
    path: "/tools/text-case-converter",
    category: "utility",
    keywords: ["text case converter", "uppercase", "lowercase", "title case", "camel case", "snake case", "text transform"],
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs instantly. Perfect for writers and students.",
    icon: "FileText",
    path: "/tools/word-counter",
    category: "utility",
    keywords: ["word counter", "character counter", "text analyzer", "word count", "writing tool"],
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Beautify and validate JSON data. Format, minify, and fix JSON syntax errors instantly.",
    icon: "Code",
    path: "/tools/json-formatter",
    category: "generator",
    keywords: ["json formatter", "json beautifier", "json validator", "json minifier", "format json"],
  },
  {
    id: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs instantly. Convert special characters for safe URL transmission.",
    icon: "Link2",
    path: "/tools/url-encoder",
    category: "utility",
    keywords: ["url encoder", "url decoder", "encode url", "decode url", "url escape"],
  },
  {
    id: "color-picker",
    name: "Color Picker",
    description: "Select and copy colors in HEX, RGB, and HSL formats. Perfect for designers and developers.",
    icon: "Palette",
    path: "/tools/color-picker",
    category: "generator",
    keywords: ["color picker", "hex color", "rgb color", "color converter", "color tool"],
  },
  {
    id: "username-generator",
    name: "Username Generator",
    description: "Generate creative and unique usernames instantly. Perfect for gaming, social media, and more.",
    icon: "User",
    path: "/tools/username-generator",
    category: "generator",
    keywords: ["username generator", "random username", "gamer tag", "username ideas", "name generator"],
  },
  {
    id: "password-strength-checker",
    name: "Password Strength Checker",
    description: "Check how strong your password is. Get instant feedback and security recommendations.",
    icon: "ShieldCheck",
    path: "/tools/password-strength-checker",
    category: "privacy",
    keywords: ["password strength", "password checker", "security checker", "password test", "strong password"],
  },
  {
    id: "text-summarizer",
    name: "AI Text Summarizer",
    description: "Summarize any text with AI power using HuggingFace BART model. Upload PDFs or paste articles for instant summaries.",
    icon: "Sparkles",
    path: "/tools/text-summarizer",
    category: "utility",
    keywords: ["text summarizer", "ai summarizer", "summarize text", "pdf summarizer", "article summarizer", "huggingface"],
  },
];

export const getToolIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Mail,
    Lock,
    QrCode,
    ImageDown,
    Type,
    FileText,
    Code,
    Link2,
    Palette,
    User,
    ShieldCheck,
    Sparkles,
  };
  return icons[iconName] || Mail;
};

export const getToolById = (id: string) => {
  return tools.find((tool) => tool.id === id);
};

export const getRelatedTools = (currentToolId: string, count: number = 3) => {
  return tools.filter((tool) => tool.id !== currentToolId).slice(0, count);
};
