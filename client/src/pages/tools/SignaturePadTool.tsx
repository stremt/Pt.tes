import { useRef, useState, useEffect } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { PenTool, Download, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SignaturePadTool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Signature Maker | Draw E-Signature to PNG",
    description: "Draw your signature and download it as a PNG file. Offline.",
    keywords: "signature maker, draw signature online",
    canonicalUrl: "https://tools.pixocraft.in/tools/signature-pad-tool",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    
    toast({
      title: "Cleared!",
      description: "Signature pad cleared",
    });
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `signature-${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);
        
        toast({
          title: "Downloaded!",
          description: "Signature saved as PNG",
        });
      }
    });
  };

  const howItWorks = [
    { step: 1, title: "Draw", description: "Use mouse or touch to draw your signature" },
    { step: 2, title: "Review", description: "Check your signature on the canvas" },
    { step: 3, title: "Download", description: "Save as PNG image file" },
  ];

  const benefits = [
    { icon: <PenTool className="h-5 w-5" />, title: "Easy Drawing", description: "Smooth drawing experience on any device" },
    { icon: <Download className="h-5 w-5" />, title: "PNG Export", description: "Download signature as high-quality PNG" },
    { icon: <Eraser className="h-5 w-5" />, title: "Offline", description: "Works completely offline in your browser" },
  ];

  const faqs = [
    {
      question: "Can I use this on mobile?",
      answer: "Yes! The signature pad works with touch on mobile devices and tablets.",
    },
    {
      question: "What format is the signature saved in?",
      answer: "Your signature is saved as a PNG image with a transparent or white background.",
    },
    {
      question: "Is my signature stored anywhere?",
      answer: "No, everything happens in your browser. Your signature is never uploaded or stored on any server.",
    },
  ];

  return (
    <ToolLayout
      title="Signature Pad Tool"
      description="Draw your signature and download it as a PNG file. Offline."
      icon={<PenTool className="h-8 w-8" />}
      toolId="signature-pad-tool"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Draw Your Signature
          </Label>
          <div className="border-2 border-dashed rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={300}
              className="w-full cursor-crosshair bg-white touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              data-testid="canvas-signature"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={downloadSignature}
            size="lg"
            disabled={!hasDrawn}
            data-testid="button-download"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Signature
          </Button>
          <Button
            onClick={clearSignature}
            variant="outline"
            size="lg"
            disabled={!hasDrawn}
            data-testid="button-clear"
          >
            <Eraser className="mr-2 h-5 w-5" />
            Clear
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
