import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Copy, Trash2, Download, Zap, Lock, Languages, ExternalLink, AlertCircle } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function SpeechToText() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [interimText, setInterimText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const recognitionRef = useRef<any>(null);
  const { toast } = useToast();

  useSEO({
    title: "Speech to Text Converter | Free Voice Typing Online (No Login) | Pixocraft Tools",
    description: "Type with your voice using your browser's speech engine. Fast, accurate, free & private. Perfect for notes & productivity.",
    keywords: "speech to text, voice typing tool, dictation online, speech converter, voice to text, voice recognition",
    canonicalUrl: "https://tools.pixocraft.in/tools/speech-to-text",
  });

  useEffect(() => {
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setInterimText("");
      };

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

        if (finalTranscript) {
          setText(prev => prev + finalTranscript);
          setInterimText("");
        } else {
          setInterimText(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setInterimText("");
        
        let errorMessage = "Speech recognition error. Please try again.";
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          errorMessage = "Microphone permission denied. Please allow microphone access and try again.";
        } else if (event.error === 'no-speech') {
          errorMessage = "No speech detected. Please try speaking again.";
        } else if (event.error === 'network') {
          errorMessage = "Network error. Please check your connection.";
        } else if (event.error === 'aborted') {
          return;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInterimText("");
      };
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current && isListening) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error('Error stopping recognition:', e);
        }
      }
    };
  }, []);

  useEffect(() => {
    setCharCount(text.length);
  }, [text]);

  const startListening = async () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in your browser. Try Chrome or Edge.",
        variant: "destructive",
      });
      return;
    }

    if (!recognitionRef.current) {
      toast({
        title: "Error",
        description: "Speech recognition is not initialized. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    try {
      await recognitionRef.current.start();
      toast({
        title: "Listening",
        description: "Start speaking now...",
      });
    } catch (error: any) {
      console.error('Failed to start recognition:', error);
      
      if (error.message && error.message.includes('already started')) {
        recognitionRef.current.stop();
        setTimeout(() => startListening(), 100);
      } else {
        toast({
          title: "Error",
          description: "Failed to start speech recognition. Try opening in a new tab.",
          variant: "destructive",
        });
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error('Error stopping recognition:', e);
      }
    }
    setIsListening(false);
    setInterimText("");
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
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

  const downloadText = () => {
    if (!text) return;
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speech-to-text-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Text file saved successfully",
    });
  };

  const clearText = () => {
    setText("");
    setInterimText("");
  };

  const handleOpenInNewTab = () => {
    window.open(window.location.href, '_blank');
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
              <Badge variant="secondary">Offline Ready</Badge>
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
                {isInIframe && (
                  <div className="p-4 border border-yellow-500/50 rounded-lg bg-yellow-500/10 space-y-3">
                    <div className="flex items-start gap-3">
                      <ExternalLink className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div className="space-y-2 text-left flex-1">
                        <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                          Speech recognition may not work in embedded views
                        </p>
                        <p className="text-xs text-yellow-800 dark:text-yellow-200">
                          Microphone access is restricted in embedded/iframe contexts. 
                          Click below to open this tool in a new tab for full functionality.
                        </p>
                        <Button 
                          onClick={handleOpenInNewTab} 
                          variant="outline" 
                          size="sm" 
                          className="bg-background mt-2"
                          data-testid="button-open-new-tab"
                        >
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Open in New Tab
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!isSupported && (
                  <div className="p-4 border border-destructive/50 rounded-lg bg-destructive/10 space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div className="space-y-2 text-left flex-1">
                        <p className="text-sm font-medium text-destructive">
                          Speech recognition not supported
                        </p>
                        <p className="text-xs text-destructive/80">
                          Your browser doesn't support the Web Speech API. Try using Chrome, Edge, or Safari.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <Button
                    onClick={toggleListening}
                    size="lg"
                    variant={isListening ? "destructive" : "default"}
                    className="w-48 h-48 rounded-full"
                    disabled={!isSupported}
                    data-testid={isListening ? "button-stop-listening" : "button-start-listening"}
                  >
                    {isListening ? (
                      <div className="flex flex-col items-center gap-2">
                        <MicOff className="h-16 w-16 animate-pulse" />
                        <span className="text-xs">Listening...</span>
                      </div>
                    ) : (
                      <Mic className="h-20 w-20" />
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {isListening ? "Listening... Speak now" : "Click microphone to start"}
                  </p>
                  {isListening && interimText && (
                    <p className="text-sm text-primary mt-2 italic">
                      "{interimText}"
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Transcribed Text</label>
                      <span className="text-xs text-muted-foreground">
                        {charCount} character{charCount !== 1 ? 's' : ''}
                      </span>
                    </div>
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
                        onClick={downloadText}
                        variant="outline"
                        size="sm"
                        disabled={!text}
                        data-testid="button-download"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
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
                    className="min-h-[300px] resize-y"
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
                      Click the microphone button and allow microphone access
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
                      Speak 3x faster than typing. Perfect for notes, messages, and essays
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
                      Your voice is processed locally in your browser. Nothing is uploaded to servers
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
                      Chrome and Edge have the best support. Safari works on iOS/macOS. Firefox has limited support. We recommend using Chrome for the best experience.
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
                    <CardTitle className="text-lg">Why doesn't it work in embedded views?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Browsers restrict microphone access in embedded/iframe contexts for security and privacy. Simply click the "Open in New Tab" button to use the tool in a regular browser tab.
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
