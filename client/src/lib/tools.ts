import { ToolMetadata } from "@shared/schema";
import { Mail, Lock, QrCode, ImageDown } from "lucide-react";

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
];

export const getToolIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Mail,
    Lock,
    QrCode,
    ImageDown,
  };
  return icons[iconName] || Mail;
};

export const getToolById = (id: string) => {
  return tools.find((tool) => tool.id === id);
};

export const getRelatedTools = (currentToolId: string, count: number = 3) => {
  return tools.filter((tool) => tool.id !== currentToolId).slice(0, count);
};
