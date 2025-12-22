import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const TOOL_NAMES: Record<string, string> = {
  "/": "Home", "/tools": "Tools Directory", "/tools/qr-maker": "QR Code Generator",
  "/tools/password-generator": "Password Generator", "/tools/image-compressor": "Image Compressor",
  "/tools/slug-generator": "Slug Generator", "/tools/regex-tester": "Regex Tester",
};

export function FeedbackButton() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const currentToolName = TOOL_NAMES[location] || location;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({ title: "Error", description: "Please enter your feedback", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const feedbackData = {
        email: email || "anonymous",
        message,
        page: location,
        pageName: currentToolName,
        timestamp: new Date().toISOString(),
      };
      const feedbackList = JSON.parse(localStorage.getItem("pixocraft_feedback") || "[]");
      feedbackList.push(feedbackData);
      localStorage.setItem("pixocraft_feedback", JSON.stringify(feedbackList));

      toast({ title: "Thank you!", description: `Feedback from "${currentToolName}" received!` });
      setEmail("");
      setMessage("");
      setIsOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit feedback", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
        }}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover-elevate flex items-center justify-center feedback-float-btn"
        title="Send feedback"
        data-testid="button-feedback-float"
      >
        <div className="absolute inset-0 rounded-full feedback-pulse" />
        <MessageSquare className="w-6 h-6 relative z-10" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4 border border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Feedback</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded" data-testid="button-feedback-close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-muted/50 p-3 rounded text-sm">
              <p className="text-muted-foreground"><span className="font-semibold">Page:</span> {currentToolName}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Email (optional)</label>
                <Input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="input-feedback-email" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Feedback</label>
                <Textarea placeholder="Tell us what you think..." value={message} onChange={(e) => setMessage(e.target.value)} className="resize-none h-20" data-testid="textarea-feedback-message" />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1" data-testid="button-feedback-cancel">Cancel</Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1" data-testid="button-feedback-submit">
                  <Send className="w-4 h-4 mr-1" />
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>

            <p className="text-xs text-muted-foreground text-center">No data is sent. Feedback is stored locally.</p>
          </div>
        </div>
      )}
    </>
  );
}
