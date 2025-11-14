import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Volume2, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { removeAudioNoise, formatFileSize } from "@/lib/ffmpeg-client";

export default function AudioNoiseRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [cleanBlob, setCleanBlob] = useState<Blob | null>(null);
  const [noiseReduction, setNoiseReduction] = useState(0.21);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Audio Noise Remover Online - Remove Background Noise | Pixocraft Tools",
    description: "Remove background noise from audio files online for free. Clean up audio recordings with noise reduction filters. Fast, secure, works offline.",
    keywords: "audio noise remover, remove background noise free, audio cleaner, noise reduction, clean audio online",
    canonicalUrl: "https://tools.pixocraft.in/tools/audio-noise-remover",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type.startsWith('audio/')) {
      setFile(selectedFile);
      setCleanBlob(null);
    } else {
      toast({ title: "Invalid File", description: "Please select an audio file", variant: "destructive" });
    }
  };

  const process = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const result = await removeAudioNoise(file, noiseReduction);
      setCleanBlob(result);
      toast({ title: "Success!", description: "Noise removed from audio" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to process audio", variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  const download = () => {
    if (cleanBlob) {
      const url = URL.createObjectURL(cleanBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.[^.]+$/, '-clean.mp3') || "clean.mp3";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <StructuredData data={generateFAQSchema([{question: "How does noise removal work?", answer: "The tool applies audio filters to reduce background noise while preserving the main audio content. Higher reduction values remove more noise but may affect audio quality."}])} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / Audio Noise Remover
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Volume2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Audio Noise Remover</h1>
            <p className="text-xl text-muted-foreground">Remove background noise from audio</p>
            <div className="flex gap-2 justify-center"><Badge>Free</Badge><Badge>Offline</Badge></div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload Audio</CardTitle></CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>Click to upload audio</p>
                    <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileSelect} className="hidden" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{file.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setCleanBlob(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><Label>Noise Reduction: {noiseReduction.toFixed(2)}</Label><Slider value={[noiseReduction]} onValueChange={(v) => setNoiseReduction(v[0])} min={0.1} max={0.5} step={0.01} /></div>
                  <div className="flex gap-2">
                    <Button onClick={process} disabled={processing} className="flex-1">{processing ? "Processing..." : "Remove Noise"}</Button>
                    {cleanBlob && (
                      <Button onClick={download} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download ({formatFileSize(cleanBlob.size)})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
