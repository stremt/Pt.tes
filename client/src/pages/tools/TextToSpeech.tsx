import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Volume2, Play, Square, Zap, Lock, Globe } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [volume, setVolume] = useState([1]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Text to Speech Online | Free TTS Voice Reader (Browser-Based) | Pixocraft Tools",
    description: "Convert text into natural speech instantly using your browser's built-in voice engine. No login, no data upload, 100% private.",
    keywords: "text to speech, tts reader, text voice converter, online voice generator, read aloud, text to voice",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-to-speech",
  });

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to speak",
        variant: "destructive",
      });
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    utterance.volume = volume[0];

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Error",
        description: "Failed to speak text",
        variant: "destructive",
      });
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does this use AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, it uses your browser's native voice engine."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work offline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, after page load it can speak offline."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Text to Speech</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Volume2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Text to Speech</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert text into natural speech instantly using your browser's built-in voice engine
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">No Login</Badge>
              <Badge variant="secondary">100% Private</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Enter Text</CardTitle>
                <CardDescription>
                  Type or paste text below and click speak to hear it read aloud
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Your Text</Label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to be spoken..."
                    className="min-h-[200px] resize-none"
                    data-testid="textarea-input"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Voice</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                      <SelectTrigger data-testid="select-voice">
                        <SelectValue placeholder="Select a voice" />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Speed: {rate[0].toFixed(1)}x</Label>
                    <Slider
                      value={rate}
                      onValueChange={setRate}
                      min={0.5}
                      max={2}
                      step={0.1}
                      data-testid="slider-rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Pitch: {pitch[0].toFixed(1)}</Label>
                    <Slider
                      value={pitch}
                      onValueChange={setPitch}
                      min={0.5}
                      max={2}
                      step={0.1}
                      data-testid="slider-pitch"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Volume: {Math.round(volume[0] * 100)}%</Label>
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      min={0}
                      max={1}
                      step={0.1}
                      data-testid="slider-volume"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  {!isSpeaking ? (
                    <Button onClick={handleSpeak} size="lg" className="flex-1" data-testid="button-speak">
                      <Play className="mr-2 h-4 w-4" />
                      Speak
                    </Button>
                  ) : (
                    <Button onClick={handleStop} variant="destructive" size="lg" className="flex-1" data-testid="button-stop">
                      <Square className="mr-2 h-4 w-4" />
                      Stop
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Simple, fast, and effective. Get started in seconds.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-none bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <CardTitle className="text-xl">Enter Text</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Type or paste your text into the input field
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <CardTitle className="text-xl">Customize Voice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Adjust voice, speed, pitch, and volume settings
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <CardTitle className="text-xl">Click Speak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Hit the speak button and hear your text read aloud
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Use Text to Speech?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Instant Conversion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Uses your browser's built-in speech engine for immediate results
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>100% Private</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No data sent to servers. All processing happens locally in your browser
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Multiple Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Access various voices and languages based on your browser's capabilities
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does this use AI?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No, it uses your browser's native voice engine. This is built into modern browsers and doesn't require AI or cloud processing.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does it work offline?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, after the page loads it can speak offline since it uses the browser's built-in speech synthesis API.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What languages are supported?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The available languages depend on your browser and operating system. Most modern browsers support multiple languages including English, Spanish, French, German, Chinese, and many more.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is my text saved or uploaded anywhere?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No, your text never leaves your device. All speech synthesis happens locally in your browser, ensuring complete privacy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
