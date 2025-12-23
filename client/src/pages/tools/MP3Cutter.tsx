import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Scissors, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { cutAudio, formatFileSize } from "@/lib/ffmpeg-client";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "MP3 Cutter", "item": "https://tools.pixocraft.in/tools/mp3-cutter" }
  ]
});

export default function MP3Cutter() {
  const [file, setFile] = useState<File | null>(null);
  const [cutBlob, setCutBlob] = useState<Blob | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(30);
  const [cutting, setCutting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free MP3 Cutter Online - Trim Audio Files | Pixocraft Tools",
    description: "Cut and trim MP3 audio files online for free. Extract audio clips, trim songs. Fast, secure, works offline in your browser.",
    keywords: "mp3 cutter, audio trimmer, cut mp3 online free, trim audio, mp3 editor, audio cutter",
    canonicalUrl: "https://tools.pixocraft.in/tools/mp3-cutter",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type.startsWith('audio/')) {
      setFile(selectedFile);
      setCutBlob(null);
    } else {
      toast({ title: "Invalid File", description: "Please select an audio file", variant: "destructive" });
    }
  };

  const cut = async () => {
    if (!file) return;
    setCutting(true);
    try {
      const result = await cutAudio(file, startTime, endTime);
      setCutBlob(result);
      toast({ title: "Success!", description: "Audio cut successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to cut audio", variant: "destructive" });
    } finally {
      setCutting(false);
    }
  };

  const download = () => {
    if (cutBlob) {
      const url = URL.createObjectURL(cutBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.[^.]+$/, '-cut.mp3') || "cut.mp3";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <StructuredData data={generateFAQSchema([{question: "How do I cut an MP3 file?", answer: "Upload your audio file, set the start and end times in seconds, then click Cut Audio. The tool will extract that portion and let you download it."}])} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Media Tools", url: "/tools/media" }, { label: "MP3 Cutter" }]} />
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Scissors className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">MP3 Cutter</h1>
            <p className="text-xl text-muted-foreground">Cut and trim audio files</p>
            <div className="flex gap-2 justify-center"><Badge>Free</Badge><Badge>Offline</Badge></div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload Audio File</CardTitle></CardHeader>
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
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setCutBlob(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><Label>Start Time (seconds)</Label><Input type="number" value={startTime} onChange={(e) => setStartTime(Number(e.target.value))} /></div>
                  <div><Label>End Time (seconds)</Label><Input type="number" value={endTime} onChange={(e) => setEndTime(Number(e.target.value))} /></div>
                  <div className="flex gap-2">
                    <Button onClick={cut} disabled={cutting} className="flex-1">{cutting ? "Cutting..." : "Cut Audio"}</Button>
                    {cutBlob && (
                      <Button onClick={download} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download ({formatFileSize(cutBlob.size)})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/media" className="text-primary hover:text-primary/80 transition-colors">Media Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
