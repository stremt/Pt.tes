import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Copy, Trash2, Zap, Lock, Languages } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useSEO({
    title: "Speech to Text Converter | Free Voice Typing Online (No Login) | Pixocraft Tools",
    description: "Type with your voice using your browser's speech engine. Fast, accurate, free & private. Perfect for notes & productivity.",
    keywords: "speech to text, voice typing tool, dictation online, speech converter, voice to text, voice recognition",
    canonicalUrl: "https://tools.pixocraft.in/tools/speech-to-text",
  });

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setText(prev => prev + finalTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Error",
          description: "Speech recognition error. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast({
        title: "Listening",
        description: "Start speaking now...",
      });
    }
  };

  const copyText = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Text copied to clipboard",
      });
    }
  };

  const clearText = () => {
    setText("");
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does my voice upload?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, processed inside your browser."
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
            <span className="text-foreground">Speech to Text</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mic className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Speech to Text</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Type with your voice using your browser's speech engine. Fast, accurate, free & private
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
                <CardTitle>Voice Typing</CardTitle>
                <CardDescription>
                  Click the microphone button and start speaking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <Button
                    onClick={toggleListening}
                    size="lg"
                    variant={isListening ? "destructive" : "default"}
                    className="w-48 h-48 rounded-full"
                    data-testid={isListening ? "button-stop-listening" : "button-start-listening"}
                  >
                    {isListening ? (
                      <MicOff className="h-20 w-20" />
                    ) : (
                      <Mic className="h-20 w-20" />
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {isListening ? "Listening... Speak now" : "Click to start voice typing"}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Transcribed Text</label>
                    <div className="flex gap-2">
                      <Button
                        onClick={copyText}
                        variant="outline"
                        size="sm"
                        disabled={!text}
                        data-testid="button-copy"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        onClick={clearText}
                        variant="outline"
                        size="sm"
                        disabled={!text}
                        data-testid="button-clear"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Your transcribed text will appear here..."
                    className="min-h-[300px] resize-none"
                    data-testid="textarea-output"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-none bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <CardTitle className="text-xl">Click Microphone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click the microphone button to start listening
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <CardTitle className="text-xl">Speak Clearly</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Start speaking naturally in your preferred language
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-none bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <CardTitle className="text-xl">Get Text</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      See your speech converted to text instantly
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Use Speech to Text?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Fast Typing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Speak faster than you can type. Perfect for notes, messages, and essays
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
                      Your voice is processed locally in your browser. Nothing is uploaded
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Languages className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Multi-Language</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Supports multiple languages based on your browser's capabilities
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
                    <CardTitle className="text-lg">Does my voice upload to a server?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No, all speech recognition is processed inside your browser using the Web Speech API. Your voice data never leaves your device.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Which browsers support this?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Chrome, Edge, Safari, and most modern browsers support the Web Speech API. Firefox has limited support.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I use this for long dictation?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, the tool supports continuous speech recognition. You can dictate for as long as needed without interruption.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What languages are supported?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The tool supports most major languages including English, Spanish, French, German, Chinese, Hindi, and many more depending on your browser.
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
