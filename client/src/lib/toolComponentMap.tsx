import { lazy, Suspense, ComponentType } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TempMailTool = lazy(() => import("@/pages/tools/TempMail"));
const PasswordGeneratorTool = lazy(() => import("@/pages/tools/PasswordGenerator"));
const PasswordStrengthCheckerTool = lazy(() => import("@/pages/tools/PasswordStrengthChecker"));
const HashGeneratorTool = lazy(() => import("@/pages/tools/HashGenerator"));
const TextEncryptDecryptTool = lazy(() => import("@/pages/tools/TextEncryptDecrypt"));
const PDFMergerTool = lazy(() => import("@/pages/tools/PDFMerger"));
const PDFSplitterTool = lazy(() => import("@/pages/tools/PDFSplitter"));
const PDFCompressorTool = lazy(() => import("@/pages/tools/PDFCompressor"));
const ImageToPDFTool = lazy(() => import("@/pages/tools/ImageToPDF"));
const PDFPasswordRemoverTool = lazy(() => import("@/pages/tools/PDFPasswordRemover"));
const ImageCompressorTool = lazy(() => import("@/pages/tools/ImageCompressor"));
const ImageResizerTool = lazy(() => import("@/pages/tools/ImageResizer"));
const JPGtoPNGTool = lazy(() => import("@/pages/tools/JPGtoPNG"));
const PNGtoJPGTool = lazy(() => import("@/pages/tools/PNGtoJPG"));
const ExifRemoverTool = lazy(() => import("@/pages/tools/ExifRemover"));
const ImageToBase64Tool = lazy(() => import("@/pages/tools/ImageToBase64"));

function ToolLoadingFallback() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

type LazyComponent = ReturnType<typeof lazy>;

const componentRegistry: Record<string, LazyComponent> = {
  "temp-mail": TempMailTool,
  "password-generator": PasswordGeneratorTool,
  "password-strength-checker": PasswordStrengthCheckerTool,
  "hash-generator": HashGeneratorTool,
  "text-encrypt-decrypt": TextEncryptDecryptTool,
  "pdf-merger": PDFMergerTool,
  "pdf-splitter": PDFSplitterTool,
  "pdf-compressor": PDFCompressorTool,
  "image-to-pdf": ImageToPDFTool,
  "pdf-password-remover": PDFPasswordRemoverTool,
  "image-compressor": ImageCompressorTool,
  "image-resizer": ImageResizerTool,
  "jpg-to-png": JPGtoPNGTool,
  "png-to-jpg": PNGtoJPGTool,
  "exif-remover": ExifRemoverTool,
  "image-to-base64": ImageToBase64Tool,
};

export function getToolComponent(toolId: string): ComponentType | null {
  const LazyComponent = componentRegistry[toolId];
  if (!LazyComponent) return null;
  
  return function WrappedToolComponent() {
    return (
      <Suspense fallback={<ToolLoadingFallback />}>
        <LazyComponent />
      </Suspense>
    );
  };
}

export function hasToolComponent(toolId: string): boolean {
  return toolId in componentRegistry;
}

export const supportedToolIds = Object.keys(componentRegistry);
